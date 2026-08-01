import React from 'react';

interface FooterProps {
  onOpenApply?: () => void;
  onOpenResultsPage?: () => void;
  scrollToSection?: (id: string) => void;
}

export const Footer: React.FC<FooterProps> = () => {
  return (
    <footer className="bg-white border-t border-slate-200 py-8 px-4 text-slate-700 text-xs">
      <div className="max-w-4xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-4">
        <div>
          <strong className="text-[#0B1A30] font-bold block text-sm">Nexus Academy Uganda</strong>
          <p className="text-slate-500 mt-0.5">Plot 12 ishaka, Uganda • Phone: +256 7569 08963</p>
        </div>
        <div className="text-slate-500 text-right sm:text-right">
          <p>© 2026 Nexus Academy. All rights reserved.</p>
          <p className="text-[11px] text-slate-400 mt-0.5">Optimized ultra-lightweight text layout for fast network loading.</p>
        </div>
      </div>
    </footer>
  );
};
