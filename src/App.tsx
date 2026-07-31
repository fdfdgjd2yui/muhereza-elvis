import React, { useState } from 'react';
import { Navbar } from './components/Navbar';
import { ResultsPortalPage } from './components/ResultsPortalPage';
import { EventsSection } from './components/EventsSection';
import { AdminDashboardModal } from './components/AdminDashboardModal';
import { Footer } from './components/Footer';
import { INITIAL_STUDENT_RESULTS } from './data/schoolData';
import { StudentResult } from './types';

export default function App() {
  const [activeTab, setActiveTab] = useState<'home' | 'results'>('home');
  const [studentResults, setStudentResults] = useState<StudentResult[]>(INITIAL_STUDENT_RESULTS);
  const [isAdminOpen, setIsAdminOpen] = useState(false);

  const handleUpdateResults = (newResults: StudentResult[]) => {
    setStudentResults(newResults);
  };

  const scrollToSection = (id: string) => {
    const el = document.getElementById(id);
    if (el) el.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <div className="min-h-screen bg-white text-slate-900 font-sans flex flex-col justify-between">
      <div>
        {/* Top Header Navbar */}
        <Navbar
          onOpenAdmin={() => setIsAdminOpen(true)}
          activeTab={activeTab}
          setActiveTab={(tab) => setActiveTab(tab as any)}
          scrollToSection={scrollToSection}
        />

        {/* Main Content */}
        <main className="max-w-4xl mx-auto px-4 py-8 space-y-10">
          
          {/* Welcome Banner */}
          <div className="bg-slate-50 border border-slate-200 rounded p-6">
            <h1 className="text-2xl font-bold text-[#0B1A30] tracking-tight">
              Nexus Academy Uganda — Public Information & UNEB Portal
            </h1>
            <p className="text-xs text-slate-600 mt-2 leading-relaxed">
              Welcome to the official Nexus Academy public portal. Use the tools below to verify UNEB examination candidate result slips directly from Cloud Firestore or view upcoming campus activities.
            </p>
          </div>

          {/* Feature 1: Public Student Results Portal */}
          <section className="border border-slate-200 rounded p-2 sm:p-4 bg-white">
            <ResultsPortalPage
              studentResults={studentResults}
              onOpenAdminModal={() => setIsAdminOpen(true)}
            />
          </section>

          {/* Feature 2: Dynamic Events Section */}
          <section className="border border-slate-200 rounded p-2 sm:p-4 bg-white">
            <EventsSection />
          </section>

        </main>
      </div>

      {/* Footer */}
      <Footer />

      {/* Admin Modal */}
      <AdminDashboardModal
        isOpen={isAdminOpen}
        onClose={() => setIsAdminOpen(false)}
        studentResults={studentResults}
        onUpdateResults={handleUpdateResults}
      />
    </div>
  );
}
