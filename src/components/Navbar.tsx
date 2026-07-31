import React from 'react';
import { Lock, FileCheck, Calendar, Shield } from 'lucide-react';

interface NavbarProps {
  onOpenAdmin?: () => void;
  activeTab: string;
  setActiveTab: (tab: string) => void;
  scrollToSection: (id: string) => void;
}

export const Navbar: React.FC<NavbarProps> = ({
  onOpenAdmin,
  activeTab,
  setActiveTab,
  scrollToSection
}) => {
  return (
    <header className="sticky top-0 z-40 bg-white border-b border-slate-200 text-[#0B1A30]">
      <div className="max-w-6xl mx-auto px-4 py-3 flex flex-wrap items-center justify-between gap-4">
        {/* Brand Header */}
        <button
          onClick={() => setActiveTab('home')}
          className="flex items-center gap-2.5 text-left focus:outline-none"
        >
          <div className="p-2 rounded bg-[#0B1A30] text-white">
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
          <button
            onClick={() => setActiveTab('home')}
            className={`px-3 py-1.5 rounded text-xs font-semibold border transition-colors ${
              activeTab === 'home'
                ? 'bg-[#0B1A30] text-white border-[#0B1A30]'
                : 'bg-white text-slate-700 border-slate-300 hover:bg-slate-100'
            }`}
          >
            Homepage
          </button>

          <button
            onClick={() => {
              setActiveTab('home');
              setTimeout(() => {
                const el = document.getElementById('uneb-results');
                if (el) el.scrollIntoView({ behavior: 'smooth' });
              }, 50);
            }}
            className="px-3 py-1.5 rounded text-xs font-semibold bg-white text-[#0B1A30] border border-slate-300 hover:bg-slate-100 transition-colors flex items-center gap-1.5"
          >
            <FileCheck className="w-3.5 h-3.5 text-[#0B1A30]" />
            <span>Check Results</span>
          </button>

          <button
            onClick={() => {
              setActiveTab('home');
              setTimeout(() => {
                const el = document.getElementById('events');
                if (el) el.scrollIntoView({ behavior: 'smooth' });
              }, 50);
            }}
            className="px-3 py-1.5 rounded text-xs font-semibold bg-white text-[#0B1A30] border border-slate-300 hover:bg-slate-100 transition-colors flex items-center gap-1.5"
          >
            <Calendar className="w-3.5 h-3.5 text-[#0B1A30]" />
            <span>Events</span>
          </button>

          {onOpenAdmin && (
            <button
              onClick={onOpenAdmin}
              className="px-3 py-1.5 rounded text-xs font-semibold bg-[#0B1A30] text-white hover:bg-slate-800 transition-colors flex items-center gap-1.5"
            >
              <Lock className="w-3.5 h-3.5" />
              <span>Admin Access</span>
            </button>
          )}
        </div>
      </div>
    </header>
  );
};
