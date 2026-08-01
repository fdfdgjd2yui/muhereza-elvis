import React, { useState } from 'react';
import { Navbar } from './components/Navbar';
import { HeroSection } from './components/HeroSection';
import { WhyNexusSection } from './components/WhyNexusSection';
import { AcademicExcellenceSection } from './components/AcademicExcellenceSection';
import { EventsSection } from './components/EventsSection';
import { StudentLifeSection } from './components/StudentLifeSection';
import { ProgramsSection } from './components/ProgramsSection';
import { TeachersSection } from './components/TeachersSection';
import { NewsSection } from './components/NewsSection';
import { AdmissionsSection } from './components/AdmissionsSection';
import { FaqSection } from './components/FaqSection';
import { ContactSection } from './components/ContactSection';
import { ResultsPortalPage } from './components/ResultsPortalPage';
import { AdminDashboardModal } from './components/AdminDashboardModal';
import { ApplyModal } from './components/ApplyModal';
import { SearchModal } from './components/SearchModal';
import { ProgramDetailPage } from './components/ProgramDetailPage';
import { Footer } from './components/Footer';
import { INITIAL_STUDENT_RESULTS } from './data/schoolData';
import { StudentResult, Program } from './types';
import { ArrowLeft } from 'lucide-react';

export default function App() {
  const [activeTab, setActiveTab] = useState<'home' | 'results'>('home');
  const [selectedProgram, setSelectedProgram] = useState<Program | null>(null);
  const [studentResults, setStudentResults] = useState<StudentResult[]>(() => {
    const saved = localStorage.getItem('nexus_student_results');
    if (saved !== null) {
      try {
        const parsed = JSON.parse(saved);
        if (Array.isArray(parsed)) return parsed;
      } catch (err) {
        console.warn('Failed to parse saved student results:', err);
      }
    }
    return INITIAL_STUDENT_RESULTS;
  });
  const [isAdminOpen, setIsAdminOpen] = useState(false);
  const [isApplyOpen, setIsApplyOpen] = useState(false);
  const [isSearchOpen, setIsSearchOpen] = useState(false);

  const handleUpdateResults = (newResults: StudentResult[]) => {
    setStudentResults(newResults);
    localStorage.setItem('nexus_student_results', JSON.stringify(newResults));
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
          onOpenSearch={() => setIsSearchOpen(true)}
          activeTab={activeTab}
          setActiveTab={(tab) => {
            setSelectedProgram(null);
            setActiveTab(tab as any);
          }}
          scrollToSection={scrollToSection}
        />

        {/* View Switch: Master Homepage vs Program Detail vs Dedicated Results Page */}
        {selectedProgram ? (
          <ProgramDetailPage
            program={selectedProgram}
            onBack={() => setSelectedProgram(null)}
            onOpenApply={() => setIsApplyOpen(true)}
          />
        ) : activeTab === 'home' ? (
          <>
            {/* Hero Section */}
            <HeroSection
              onOpenApply={() => setIsApplyOpen(true)}
              scrollToSection={scrollToSection}
              onSelectResultsPortal={() => {
                setActiveTab('results');
              }}
            />

            {/* Why Choose Nexus Academy */}
            <WhyNexusSection />

            {/* Academic Excellence Roadmap */}
            <AcademicExcellenceSection />

            {/* Events Section (Big & Bold!) */}
            <EventsSection />

            {/* Vibrant Campus Gallery Section */}
            <StudentLifeSection />

            {/* Academic Programs & Syllabus */}
            <ProgramsSection
              onOpenApply={() => setIsApplyOpen(true)}
              onSelectProgram={(prog) => setSelectedProgram(prog)}
            />

            {/* Master Educators Faculty */}
            <TeachersSection />

            {/* Institutional Press & News */}
            <NewsSection />

            {/* Admissions 4-Step Process */}
            <AdmissionsSection onOpenApply={() => setIsApplyOpen(true)} />

            {/* Frequently Asked Questions */}
            <FaqSection />

            {/* Contact & Inquiries */}
            <ContactSection />
          </>
        ) : (
          /* Dedicated UNEB Student Results Portal View */
          <main className="max-w-4xl mx-auto px-4 py-8 space-y-6 animate-in fade-in duration-200">
            <button
              onClick={() => setActiveTab('home')}
              className="inline-flex items-center gap-2 px-3.5 py-2 text-xs font-bold text-slate-700 hover:text-[#0B1A30] bg-slate-100 hover:bg-slate-200 rounded-xl transition-colors border border-slate-200"
            >
              <ArrowLeft className="w-4 h-4 text-amber-600" />
              <span>Return to Homepage</span>
            </button>

            <section className="border border-slate-200 rounded-3xl p-4 sm:p-6 bg-white shadow-md">
              <ResultsPortalPage
                studentResults={studentResults}
                onOpenAdminModal={() => setIsAdminOpen(true)}
              />
            </section>
          </main>
        )}
      </div>

      {/* Footer */}
      <Footer onOpenApply={() => setIsApplyOpen(true)} />

      {/* Search Modal */}
      <SearchModal
        isOpen={isSearchOpen}
        onClose={() => setIsSearchOpen(false)}
        onNavigateToSection={(id) => {
          setSelectedProgram(null);
          setActiveTab('home');
          setTimeout(() => scrollToSection(id), 50);
        }}
        onOpenResultsPage={() => {
          setSelectedProgram(null);
          setActiveTab('results');
        }}
      />

      {/* Application Modal */}
      <ApplyModal
        isOpen={isApplyOpen}
        onClose={() => setIsApplyOpen(false)}
      />

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
