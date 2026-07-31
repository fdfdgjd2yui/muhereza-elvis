import React, { useState, useEffect } from 'react';
import { 
  Shield, 
  ChevronDown, 
  Search, 
  GraduationCap, 
  Sparkles, 
  Compass, 
  BookOpen, 
  Award, 
  Calendar, 
  Users, 
  FileCheck, 
  FileText,
  Menu, 
  X,
  Send,
  PhoneCall,
  Lock
} from 'lucide-react';

interface NavbarProps {
  onOpenApply: () => void;
  onOpenSearch: () => void;
  onOpenAdmin?: () => void;
  activeTab: string;
  setActiveTab: (tab: string) => void;
  scrollToSection: (id: string) => void;
}

export const Navbar: React.FC<NavbarProps> = ({
  onOpenApply,
  onOpenSearch,
  onOpenAdmin,
  activeTab,
  setActiveTab,
  scrollToSection
}) => {
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [activeDropdown, setActiveDropdown] = useState<string | null>(null);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 30);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleNavClick = (sectionId: string) => {
    setActiveTab('home');
    setActiveDropdown(null);
    setMobileMenuOpen(false);
    setTimeout(() => {
      scrollToSection(sectionId);
    }, 100);
  };

  const handlePageSelect = (page: string) => {
    setActiveTab(page);
    setActiveDropdown(null);
    setMobileMenuOpen(false);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-40 transition-all duration-500 ${
        scrolled
          ? 'bg-[#07111F]/85 backdrop-blur-xl border-b border-white/10 shadow-2xl py-3'
          : 'bg-gradient-to-b from-[#07111F]/90 via-[#07111F]/50 to-transparent py-5'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between">
          
          {/* Logo Branding */}
          <button
            onClick={() => handlePageSelect('home')}
            className="flex items-center gap-3 group text-left focus:outline-none"
          >
            <div className="relative w-11 h-11 rounded-xl bg-gradient-to-br from-[#10253C] to-[#07111F] border border-sky-400/40 flex items-center justify-center shadow-lg group-hover:border-sky-300 transition-all duration-300">
              <Shield className="w-6 h-6 text-sky-400 group-hover:scale-110 transition-transform duration-300" />
              <div className="absolute inset-0 rounded-xl bg-sky-400/10 blur-md opacity-0 group-hover:opacity-100 transition-opacity" />
            </div>
            <div>
              <div className="flex items-center gap-1.5">
                <span className="luxury-font text-xl font-bold tracking-wider text-white group-hover:text-sky-200 transition-colors">
                  NEXUS
                </span>
                <span className="text-xs px-1.5 py-0.5 rounded bg-sky-500/20 text-sky-300 font-semibold tracking-wider">
                  ACADEMY
                </span>
              </div>
              <p className="text-[10px] text-sky-200/70 font-medium tracking-widest uppercase">
                Future-Ready Education
              </p>
            </div>
          </button>

          {/* Desktop Navigation Links with Clean Dropdowns */}
          <nav className="hidden lg:flex items-center gap-1">
            
            {/* Home */}
            <button
              onClick={() => handlePageSelect('home')}
              className={`px-3 py-2 text-sm font-medium rounded-lg transition-all ${
                activeTab === 'home'
                  ? 'text-sky-300 bg-white/5 font-semibold'
                  : 'text-gray-300 hover:text-white hover:bg-white/5'
              }`}
            >
              Home
            </button>

            {/* Dropdown: Academics */}
            <div
              className="relative"
              onMouseEnter={() => setActiveDropdown('academics')}
              onMouseLeave={() => setActiveDropdown(null)}
            >
              <button className="flex items-center gap-1.5 px-3 py-2 text-sm font-medium text-gray-300 hover:text-white hover:bg-white/5 rounded-lg transition-all">
                Academics
                <ChevronDown className={`w-4 h-4 transition-transform duration-300 ${activeDropdown === 'academics' ? 'rotate-180 text-sky-400' : ''}`} />
              </button>

              {activeDropdown === 'academics' && (
                <div className="absolute top-full left-0 mt-1 w-72 glass-card rounded-2xl p-3 shadow-2xl border border-white/15 animate-in fade-in slide-in-from-top-2 duration-200">
                  <div className="p-2 border-b border-white/10 mb-2">
                    <p className="text-xs font-semibold text-sky-300 uppercase tracking-wider">Academic Programs</p>
                  </div>
                  <button
                    onClick={() => handleNavClick('programs')}
                    className="w-full flex items-start gap-3 p-2.5 rounded-xl hover:bg-white/10 transition-colors text-left"
                  >
                    <BookOpen className="w-5 h-5 text-sky-400 shrink-0 mt-0.5" />
                    <div>
                      <div className="text-sm font-medium text-white">O & A Level Programs</div>
                      <div className="text-xs text-gray-400">Full-Page UCE & UACE Curriculum</div>
                    </div>
                  </button>
                  <button
                    onClick={() => handleNavClick('academic-excellence')}
                    className="w-full flex items-start gap-3 p-2.5 rounded-xl hover:bg-white/10 transition-colors text-left"
                  >
                    <GraduationCap className="w-5 h-5 text-blue-400 shrink-0 mt-0.5" />
                    <div>
                      <div className="text-sm font-medium text-white">Academic Roadmap</div>
                      <div className="text-xs text-gray-400">S1 to UNEB Pathway</div>
                    </div>
                  </button>
                  <button
                    onClick={() => handlePageSelect('results')}
                    className="w-full flex items-start gap-3 p-2.5 rounded-xl bg-sky-500/10 hover:bg-sky-500/20 border border-sky-400/30 transition-all text-left group"
                  >
                    <FileCheck className="w-5 h-5 text-sky-400 shrink-0 mt-0.5 group-hover:scale-110 transition-transform" />
                    <div>
                      <div className="text-sm font-semibold text-sky-300 flex items-center gap-1.5">
                        Exam Results Portal
                        <span className="text-[10px] bg-sky-500/20 px-1.5 py-0.2 rounded text-sky-200 font-bold">LIVE</span>
                      </div>
                      <div className="text-xs text-gray-300">Check exam grades & Google Sheets sync</div>
                    </div>
                  </button>
                </div>
              )}
            </div>

            {/* Dropdown: Campus Life */}
            <div
              className="relative"
              onMouseEnter={() => setActiveDropdown('campus')}
              onMouseLeave={() => setActiveDropdown(null)}
            >
              <button className="flex items-center gap-1.5 px-3 py-2 text-sm font-medium text-gray-300 hover:text-white hover:bg-white/5 rounded-lg transition-all">
                Campus Life
                <ChevronDown className={`w-4 h-4 transition-transform duration-300 ${activeDropdown === 'campus' ? 'rotate-180 text-sky-400' : ''}`} />
              </button>

              {activeDropdown === 'campus' && (
                <div className="absolute top-full left-0 mt-1 w-72 glass-card rounded-2xl p-3 shadow-2xl border border-white/15 animate-in fade-in slide-in-from-top-2 duration-200">
                  <button
                    onClick={() => handleNavClick('student-life')}
                    className="w-full flex items-start gap-3 p-2.5 rounded-xl hover:bg-white/10 transition-colors text-left"
                  >
                    <Sparkles className="w-5 h-5 text-sky-400 shrink-0 mt-0.5" />
                    <div>
                      <div className="text-sm font-medium text-white">Student Life Gallery</div>
                      <div className="text-xs text-gray-400">Sports, Arts, Robotics & Leadership</div>
                    </div>
                  </button>
                  <button
                    onClick={() => handleNavClick('events')}
                    className="w-full flex items-start gap-3 p-2.5 rounded-xl hover:bg-white/10 transition-colors text-left"
                  >
                    <Calendar className="w-5 h-5 text-cyan-400 shrink-0 mt-0.5" />
                    <div>
                      <div className="text-sm font-medium text-white">Upcoming Events</div>
                      <div className="text-xs text-gray-400">Expos, Galas & Open Days</div>
                    </div>
                  </button>
                </div>
              )}
            </div>

            {/* Dropdown: Admissions */}
            <div
              className="relative"
              onMouseEnter={() => setActiveDropdown('admissions')}
              onMouseLeave={() => setActiveDropdown(null)}
            >
              <button className="flex items-center gap-1.5 px-3 py-2 text-sm font-medium text-gray-300 hover:text-white hover:bg-white/5 rounded-lg transition-all">
                Admissions
                <ChevronDown className={`w-4 h-4 transition-transform duration-300 ${activeDropdown === 'admissions' ? 'rotate-180 text-sky-400' : ''}`} />
              </button>

              {activeDropdown === 'admissions' && (
                <div className="absolute top-full left-0 mt-1 w-72 glass-card rounded-2xl p-3 shadow-2xl border border-white/15 animate-in fade-in slide-in-from-top-2 duration-200">
                  <button
                    onClick={() => handleNavClick('admissions-process')}
                    className="w-full flex items-start gap-3 p-2.5 rounded-xl hover:bg-white/10 transition-colors text-left"
                  >
                    <Award className="w-5 h-5 text-sky-400 shrink-0 mt-0.5" />
                    <div>
                      <div className="text-sm font-medium text-white">4-Step Admission Flow</div>
                      <div className="text-xs text-gray-400">Application to orientation guide</div>
                    </div>
                  </button>
                  <button
                    onClick={() => handlePageSelect('booking')}
                    className="w-full flex items-start gap-3 p-2.5 rounded-xl bg-sky-500/15 hover:bg-sky-500/25 border border-sky-400/30 transition-colors text-left"
                  >
                    <Calendar className="w-5 h-5 text-sky-300 shrink-0 mt-0.5" />
                    <div>
                      <div className="text-sm font-bold text-sky-300">Book Campus Visit</div>
                      <div className="text-xs text-gray-300">Full-Page Appointment Booking</div>
                    </div>
                  </button>
                  <button
                    onClick={() => handleNavClick('faq')}
                    className="w-full flex items-start gap-3 p-2.5 rounded-xl hover:bg-white/10 transition-colors text-left"
                  >
                    <BookOpen className="w-5 h-5 text-teal-400 shrink-0 mt-0.5" />
                    <div>
                      <div className="text-sm font-medium text-white">Frequently Asked Questions</div>
                      <div className="text-xs text-gray-400">Fees, boarding & scholarships</div>
                    </div>
                  </button>
                </div>
              )}
            </div>

            {/* Dropdown: About Us */}
            <div
              className="relative"
              onMouseEnter={() => setActiveDropdown('about')}
              onMouseLeave={() => setActiveDropdown(null)}
            >
              <button className="flex items-center gap-1.5 px-3 py-2 text-sm font-medium text-gray-300 hover:text-white hover:bg-white/5 rounded-lg transition-all">
                About Us
                <ChevronDown className={`w-4 h-4 transition-transform duration-300 ${activeDropdown === 'about' ? 'rotate-180 text-[#D4AF37]' : ''}`} />
              </button>

              {activeDropdown === 'about' && (
                <div className="absolute top-full right-0 mt-1 w-72 glass-card rounded-2xl p-3 shadow-2xl border border-white/15 animate-in fade-in slide-in-from-top-2 duration-200">
                  <button
                    onClick={() => handleNavClick('why-nexus')}
                    className="w-full flex items-start gap-3 p-2.5 rounded-xl hover:bg-white/10 transition-colors text-left"
                  >
                    <Sparkles className="w-5 h-5 text-amber-400 shrink-0 mt-0.5" />
                    <div>
                      <div className="text-sm font-medium text-white">Why Choose Nexus</div>
                      <div className="text-xs text-gray-400">Our vision, values & STEM focus</div>
                    </div>
                  </button>
                  <button
                    onClick={() => handleNavClick('teachers')}
                    className="w-full flex items-start gap-3 p-2.5 rounded-xl hover:bg-white/10 transition-colors text-left"
                  >
                    <Users className="w-5 h-5 text-blue-400 shrink-0 mt-0.5" />
                    <div>
                      <div className="text-sm font-medium text-white">Faculty & Educators</div>
                      <div className="text-xs text-gray-400">Meet our master teaching team</div>
                    </div>
                  </button>
                  <button
                    onClick={() => handleNavClick('news')}
                    className="w-full flex items-start gap-3 p-2.5 rounded-xl hover:bg-white/10 transition-colors text-left"
                  >
                    <BookOpen className="w-5 h-5 text-purple-400 shrink-0 mt-0.5" />
                    <div>
                      <div className="text-sm font-medium text-white">News & Press</div>
                      <div className="text-xs text-gray-400">Achievements & campus updates</div>
                    </div>
                  </button>
                  <button
                    onClick={() => handleNavClick('contact')}
                    className="w-full flex items-start gap-3 p-2.5 rounded-xl hover:bg-white/10 transition-colors text-left"
                  >
                    <PhoneCall className="w-5 h-5 text-emerald-400 shrink-0 mt-0.5" />
                    <div>
                      <div className="text-sm font-medium text-white">Contact & Campus Map</div>
                      <div className="text-xs text-gray-400">Inquiries, visits & directions</div>
                    </div>
                  </button>
                </div>
              )}
            </div>

            {/* Direct Links Buttons */}
            <button
              onClick={() => handlePageSelect('results')}
              className={`flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-semibold transition-all border ${
                activeTab === 'results'
                  ? 'bg-sky-400 text-slate-950 border-sky-300 shadow-lg shadow-sky-500/20'
                  : 'bg-sky-500/15 text-sky-300 border-sky-400/40 hover:bg-sky-500/25'
              }`}
            >
              <FileCheck className="w-3.5 h-3.5" />
              <span>Results Portal</span>
            </button>

            <button
              onClick={() => handlePageSelect('booking')}
              className={`flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-semibold transition-all border ${
                activeTab === 'booking'
                  ? 'bg-cyan-400 text-slate-950 border-cyan-300 shadow-lg shadow-cyan-500/20'
                  : 'bg-cyan-500/15 text-cyan-300 border-cyan-400/40 hover:bg-cyan-500/25'
              }`}
            >
              <Calendar className="w-3.5 h-3.5" />
              <span>Book Visit</span>
            </button>
          </nav>

          {/* Right Action Controls */}
          <div className="flex items-center gap-3">
            {/* Search Trigger */}
            <button
              onClick={onOpenSearch}
              aria-label="Search school website"
              className="p-2.5 rounded-xl bg-white/5 border border-white/10 text-gray-300 hover:text-white hover:border-sky-400/40 hover:bg-white/10 transition-all"
            >
              <Search className="w-4 h-4" />
            </button>

            {/* Admin Lock Button */}
            {onOpenAdmin && (
              <button
                onClick={onOpenAdmin}
                title="Admin Dashboard (Google Sheets & Firestore Rules)"
                className="p-2.5 rounded-xl bg-sky-500/15 border border-sky-400/30 text-sky-300 hover:text-white hover:bg-sky-500/25 transition-all"
              >
                <Lock className="w-4 h-4 text-sky-400" />
              </button>
            )}

            {/* Apply Now Button */}
            <button
              onClick={onOpenApply}
              className="hidden sm:flex items-center gap-2 px-5 py-2.5 rounded-xl bg-gradient-to-r from-sky-400 via-blue-500 to-sky-600 text-slate-950 font-bold text-sm shadow-xl hover:shadow-sky-500/30 hover:scale-[1.02] active:scale-[0.98] transition-all"
            >
              <Send className="w-4 h-4" />
              <span>Apply Now</span>
            </button>

            {/* Mobile Hamburger Toggle */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="lg:hidden p-2.5 rounded-xl bg-white/5 border border-white/10 text-white hover:bg-white/10 transition-colors"
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Drawer Navigation */}
      {mobileMenuOpen && (
        <div className="lg:hidden glass-card border-b border-white/15 px-4 pt-4 pb-6 mt-3 space-y-3 animate-in fade-in slide-in-from-top-4 duration-300">
          <div className="space-y-1">
            <button
              onClick={() => handlePageSelect('home')}
              className="w-full text-left px-3 py-2 text-sm font-semibold text-white hover:bg-white/10 rounded-lg"
            >
              Home
            </button>

            <button
              onClick={() => handlePageSelect('results')}
              className="w-full flex items-center justify-between px-3 py-2 text-sm font-bold text-sky-300 bg-sky-500/10 border border-sky-400/30 rounded-lg"
            >
              <span className="flex items-center gap-2">
                <FileCheck className="w-4 h-4" /> Exam Results Portal
              </span>
              <span className="text-[10px] bg-sky-500/20 px-2 py-0.5 rounded">LIVE</span>
            </button>

            <button
              onClick={() => handlePageSelect('booking')}
              className="w-full flex items-center justify-between px-3 py-2 text-sm font-bold text-cyan-300 bg-cyan-500/10 border border-cyan-400/30 rounded-lg"
            >
              <span className="flex items-center gap-2">
                <Calendar className="w-4 h-4" /> Book Campus Consultation
              </span>
              <span className="text-[10px] bg-cyan-500/20 px-2 py-0.5 rounded">FULL PAGE</span>
            </button>

            <div className="py-2 border-t border-white/10">
              <p className="px-3 text-xs font-semibold text-sky-300 uppercase tracking-wider mb-1">Navigation & Sections</p>
              <button
                onClick={() => handleNavClick('why-nexus')}
                className="w-full text-left px-3 py-2 text-xs text-gray-300 hover:text-white hover:bg-white/5 rounded-lg"
              >
                Why Choose Nexus
              </button>
              <button
                onClick={() => handleNavClick('programs')}
                className="w-full text-left px-3 py-2 text-xs text-gray-300 hover:text-white hover:bg-white/5 rounded-lg"
              >
                Academic Programs (O & A Level)
              </button>
              <button
                onClick={() => handleNavClick('teachers')}
                className="w-full text-left px-3 py-2 text-xs text-gray-300 hover:text-white hover:bg-white/5 rounded-lg"
              >
                Faculty & Teachers
              </button>
              <button
                onClick={() => handleNavClick('student-life')}
                className="w-full text-left px-3 py-2 text-xs text-gray-300 hover:text-white hover:bg-white/5 rounded-lg"
              >
                Student Life & Gallery
              </button>
              <button
                onClick={() => handleNavClick('admissions-process')}
                className="w-full text-left px-3 py-2 text-xs text-gray-300 hover:text-white hover:bg-white/5 rounded-lg"
              >
                Admissions Process
              </button>
              <button
                onClick={() => handleNavClick('contact')}
                className="w-full text-left px-3 py-2 text-xs text-gray-300 hover:text-white hover:bg-white/5 rounded-lg"
              >
                Contact & Campus Map
              </button>
            </div>
          </div>

          <button
            onClick={() => {
              setMobileMenuOpen(false);
              onOpenApply();
            }}
            className="w-full flex items-center justify-center gap-2 py-3 rounded-xl bg-gradient-to-r from-sky-400 to-blue-500 text-slate-950 font-bold text-sm shadow-lg"
          >
            <Send className="w-4 h-4" />
            <span>Apply Now Online</span>
          </button>
        </div>
      )}
    </header>
  );
};
