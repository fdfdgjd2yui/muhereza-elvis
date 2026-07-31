import React, { useState } from 'react';
import { Navbar } from './components/Navbar';
import { HeroSection } from './components/HeroSection';
import { StatsSection } from './components/StatsSection';
import { WhyNexusSection } from './components/WhyNexusSection';
import { ProgramsSection } from './components/ProgramsSection';
import { AcademicExcellenceSection } from './components/AcademicExcellenceSection';
import { TeachersSection } from './components/TeachersSection';
import { StudentLifeSection } from './components/StudentLifeSection';
import { TestimonialsSection } from './components/TestimonialsSection';
import { AdmissionsSection } from './components/AdmissionsSection';
import { EventsSection } from './components/EventsSection';
import { NewsSection } from './components/NewsSection';
import { FaqSection } from './components/FaqSection';
import { ContactSection } from './components/ContactSection';
import { ResultsPortalPage } from './components/ResultsPortalPage';
import { AdminDashboardModal } from './components/AdminDashboardModal';
import { ApplyModal } from './components/ApplyModal';
import { SearchModal } from './components/SearchModal';
import { Footer } from './components/Footer';
import { CursorGlow } from './components/CursorGlow';
import { ProgramDetailPage } from './components/ProgramDetailPage';
import { INITIAL_STUDENT_RESULTS } from './data/schoolData';
import { StudentResult, Program } from './types';

export default function App() {
  const [activeTab, setActiveTab] = useState<'home' | 'results'>('home');
  const [selectedProgram, setSelectedProgram] = useState<Program | null>(null);
  const [studentResults, setStudentResults] = useState<StudentResult[]>(INITIAL_STUDENT_RESULTS);
  const [isApplyOpen, setIsApplyOpen] = useState(false);
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [isAdminOpen, setIsAdminOpen] = useState(false);

  const handleUpdateResults = (newResults: StudentResult[]) => {
    setStudentResults(newResults);
  };

  const scrollToSection = (id: string) => {
    setActiveTab('home');
    setSelectedProgram(null);
    setTimeout(() => {
      const element = document.getElementById(id);
      if (element) {
        element.scrollIntoView({ behavior: 'smooth' });
      }
    }, 100);
  };

  return (
    <div className="min-h-screen bg-[#07111F] text-white selection:bg-[#D4AF37]/30 selection:text-amber-200 relative editorial-bg-pattern overflow-x-hidden">
      
      {/* Editorial Decorative Background Orbs */}
      <div className="fixed -top-24 -left-24 w-96 h-96 bg-[#10253C] rounded-full blur-[100px] opacity-60 pointer-events-none z-0" />
      <div className="fixed top-1/2 -right-24 w-[500px] h-[500px] bg-[#D4AF37]/10 rounded-full blur-[120px] opacity-40 pointer-events-none z-0" />
      <div className="fixed -bottom-24 left-1/3 w-80 h-80 bg-blue-500/10 rounded-full blur-[100px] opacity-30 pointer-events-none z-0" />

      {/* Ambient Luxury Cursor Glow Effect */}
      <CursorGlow />

      {/* Glassmorphism Header Navbar with Dropdown Menus */}
      <Navbar
        onOpenApply={() => setIsApplyOpen(true)}
        onOpenSearch={() => setIsSearchOpen(true)}
        onOpenAdmin={() => setIsAdminOpen(true)}
        activeTab={activeTab}
        setActiveTab={(tab) => setActiveTab(tab as any)}
        scrollToSection={scrollToSection}
      />

      {/* Main View Router */}
      {activeTab === 'home' && (
        selectedProgram ? (
          <ProgramDetailPage
            program={selectedProgram}
            onBack={() => setSelectedProgram(null)}
            onOpenApply={() => setIsApplyOpen(true)}
          />
        ) : (
          <main>
            {/* 1. Hero Section (100vh with 5-second image loop) */}
            <HeroSection
              onOpenApply={() => setIsApplyOpen(true)}
              scrollToSection={scrollToSection}
              onSelectResultsPortal={() => setActiveTab('results')}
            />

            {/* 2. Trusted Statistics */}
            <StatsSection />

            {/* 3. Why Choose Nexus AI School */}
            <WhyNexusSection />

            {/* 4. Programs */}
            <ProgramsSection
              onOpenApply={() => setIsApplyOpen(true)}
              onSelectProgram={(program) => setSelectedProgram(program)}
            />

            {/* 5. Academic Excellence Roadmap */}
            <AcademicExcellenceSection />

            {/* 7. Meet Our Teachers */}
            <TeachersSection />

            {/* 8. Student Life Gallery */}
            <StudentLifeSection />

            {/* 9. Testimonials Slider */}
            <TestimonialsSection />

            {/* 10. Admissions Process Flow */}
            <AdmissionsSection onOpenApply={() => setIsApplyOpen(true)} />

            {/* 11. Upcoming Events */}
            <EventsSection />

            {/* 12. News & Achievements */}
            <NewsSection />

            {/* 13. FAQ Glass Accordion */}
            <FaqSection />

            {/* 14. Contact & Interactive Campus Map */}
            <ContactSection />
          </main>
        )
      )}

      {activeTab === 'results' && (
        <ResultsPortalPage
          studentResults={studentResults}
          onOpenAdminModal={() => setIsAdminOpen(true)}
        />
      )}

      {/* 15. Footer */}
      <Footer
        onOpenApply={() => setIsApplyOpen(true)}
        onOpenResultsPage={() => setActiveTab('results')}
        scrollToSection={scrollToSection}
      />

      {/* Modals */}
      <AdminDashboardModal
        isOpen={isAdminOpen}
        onClose={() => setIsAdminOpen(false)}
        studentResults={studentResults}
        onUpdateResults={handleUpdateResults}
      />

      <ApplyModal
        isOpen={isApplyOpen}
        onClose={() => setIsApplyOpen(false)}
      />

      <SearchModal
        isOpen={isSearchOpen}
        onClose={() => setIsSearchOpen(false)}
        onNavigateToSection={scrollToSection}
        onOpenResultsPage={() => setActiveTab('results')}
      />

    </div>
  );
}
