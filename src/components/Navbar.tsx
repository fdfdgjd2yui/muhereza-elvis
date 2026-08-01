import React, { useState, useRef, useEffect } from 'react';
import { Lock, FileCheck, Calendar, Shield, Search, ChevronDown, GraduationCap, ArrowRight } from 'lucide-react';

interface NavbarProps {
  onOpenAdmin?: () => void;
  onOpenSearch?: () => void;
  activeTab: string;
  setActiveTab: (tab: string) => void;
  scrollToSection: (id: string) => void;
}

export const Navbar: React.FC<NavbarProps> = ({
  onOpenAdmin,
  onOpenSearch,
  activeTab,
  setActiveTab,
  scrollToSection
}) => {
  const [isPortalDropdownOpen, setIsPortalDropdownOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsPortalDropdownOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  return (
    <header className="sticky top-0 z-40 bg-white border-b border-slate-200 text-[#0B1A30] shadow-sm">
      <div className="max-w-6xl mx-auto px-4 py-3 flex flex-wrap items-center justify-between gap-4">
        {/* Brand Header */}
        <button
          onClick={() => setActiveTab('home')}
          className="flex items-center gap-2.5 text-left focus:outline-none group"
        >
          <div className="p-2 rounded bg-[#0B1A30] text-white group-hover:bg-slate-800 transition-colors">
            <Shield className="w-5 h-5" />
          </div>
          <div>
            <h1 className="text-lg font-bold tracking-tight text-[#0B1A30] uppercase">
              Nexus Academy
            </h1>
            <p className="text-[11px] text-slate-500 font-medium">
              Secondary School & UNEB Information Portal
            </p>
          </div>
        </button>

        {/* Action Controls */}
        <div className="flex items-center gap-2 sm:gap-3">
          
          {/* Search Icon Button */}
          {onOpenSearch && (
            <button
              onClick={onOpenSearch}
              className="p-2 sm:px-3 sm:py-1.5 rounded-xl text-xs font-semibold bg-slate-100 text-slate-700 border border-slate-200 hover:bg-slate-200 transition-all flex items-center gap-2"
              title="Search website"
              aria-label="Search website"
            >
              <Search className="w-4 h-4 text-sky-700" />
              <span className="hidden sm:inline text-slate-700">Search...</span>
            </button>
          )}

          {/* Portals Dropdown Menu */}
          <div className="relative" ref={dropdownRef}>
            <button
              onClick={() => setIsPortalDropdownOpen((prev) => !prev)}
              className={`px-3.5 py-1.5 rounded-xl text-xs font-bold border transition-all flex items-center gap-2 ${
                activeTab === 'results' || isPortalDropdownOpen
                  ? 'bg-sky-50 text-sky-900 border-sky-300 shadow-sm'
                  : 'bg-white text-[#0B1A30] border-slate-200 hover:bg-slate-100'
              }`}
            >
              <GraduationCap className="w-4 h-4 text-sky-700" />
              <span>Portals</span>
              <ChevronDown className={`w-3.5 h-3.5 text-slate-500 transition-transform duration-200 ${isPortalDropdownOpen ? 'rotate-180' : ''}`} />
            </button>

            {/* Dropdown Content */}
            {isPortalDropdownOpen && (
              <div className="absolute right-0 mt-2 w-64 bg-white border border-slate-200 rounded-2xl shadow-xl py-2 z-50 text-left animate-in fade-in duration-150">
                <div className="px-3.5 py-1.5 border-b border-slate-100 text-[10px] font-bold text-slate-400 uppercase tracking-wider">
                  Access Portals & Tools
                </div>

                {/* Dropdown Option 1: UNEB Results Portal */}
                <button
                  onClick={() => {
                    setIsPortalDropdownOpen(false);
                    setActiveTab('results');
                  }}
                  className="w-full px-3 py-2.5 hover:bg-sky-50 transition-colors flex items-start gap-2.5 text-left group"
                >
                  <div className="p-1.5 rounded bg-sky-100 text-sky-800 group-hover:bg-sky-200 transition-colors mt-0.5">
                    <FileCheck className="w-4 h-4" />
                  </div>
                  <div>
                    <div className="text-xs font-bold text-[#0B1A30] flex items-center gap-1">
                      UNEB Results Portal
                      <ArrowRight className="w-3 h-3 text-sky-600 opacity-0 group-hover:opacity-100 transition-opacity" />
                    </div>
                    <div className="text-[11px] text-slate-500">Official candidate examination lookup</div>
                  </div>
                </button>

                {/* Dropdown Option 2: Events & Calendar */}
                <button
                  onClick={() => {
                    setIsPortalDropdownOpen(false);
                    setActiveTab('home');
                    setTimeout(() => {
                      const el = document.getElementById('events');
                      if (el) el.scrollIntoView({ behavior: 'smooth' });
                    }, 50);
                  }}
                  className="w-full px-3 py-2.5 hover:bg-slate-50 transition-colors flex items-start gap-2.5 text-left group"
                >
                  <div className="p-1.5 rounded bg-slate-100 text-slate-700 group-hover:bg-slate-200 transition-colors mt-0.5">
                    <Calendar className="w-4 h-4" />
                  </div>
                  <div>
                    <div className="text-xs font-bold text-[#0B1A30]">Campus Events & Calendar</div>
                    <div className="text-[11px] text-slate-500">View upcoming expos & schedules</div>
                  </div>
                </button>

                {/* Dropdown Option 3: Admin Access */}
                {onOpenAdmin && (
                  <button
                    onClick={() => {
                      setIsPortalDropdownOpen(false);
                      onOpenAdmin();
                    }}
                    className="w-full px-3 py-2.5 hover:bg-slate-50 border-t border-slate-100 transition-colors flex items-start gap-2.5 text-left group"
                  >
                    <div className="p-1.5 rounded bg-slate-800 text-white mt-0.5">
                      <Lock className="w-4 h-4" />
                    </div>
                    <div>
                      <div className="text-xs font-bold text-[#0B1A30]">Admin Portal Access</div>
                      <div className="text-[11px] text-slate-500">Upload candidate CSVs & data</div>
                    </div>
                  </button>
                )}
              </div>
            )}
          </div>

        </div>
      </div>
    </header>
  );
};

