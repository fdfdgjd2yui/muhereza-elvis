import React from 'react';
import { Shield, Send, Heart, FileCheck } from 'lucide-react';

interface FooterProps {
  onOpenApply: () => void;
  onOpenResultsPage: () => void;
  scrollToSection: (id: string) => void;
}

export const Footer: React.FC<FooterProps> = ({
  onOpenApply,
  onOpenResultsPage,
  scrollToSection
}) => {
  return (
    <footer className="bg-[#030914] border-t border-white/10 pt-20 pb-12 text-gray-300 text-xs relative overflow-hidden">
      
      {/* Background radial glow */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-4xl h-24 bg-[#D4AF37]/10 blur-[100px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 space-y-16">
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-10">
          
          {/* Col 1: Large Brand Logo & About */}
          <div className="lg:col-span-2 space-y-4">
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-[#10253C] to-[#07111F] border border-[#D4AF37]/40 flex items-center justify-center shadow-lg">
                <Shield className="w-6 h-6 text-[#D4AF37]" />
              </div>
              <div>
                <div className="luxury-font text-2xl font-bold tracking-wider text-white">
                  NEXUS <span className="text-[#D4AF37]">ACADEMY</span>
                </div>
                <p className="text-[10px] text-gray-400 uppercase tracking-widest">
                  Future-Ready International School
                </p>
              </div>
            </div>

            <p className="text-gray-400 text-xs leading-relaxed max-w-sm">
              Empowering tomorrow’s visionaries through academic rigor, cutting-edge STEM and AI innovation, and holistic leadership excellence.
            </p>

            <div className="pt-2">
              <button
                onClick={onOpenResultsPage}
                className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-sky-500/15 border border-sky-400/40 text-sky-300 text-xs font-bold hover:bg-sky-500/25 transition-all"
              >
                <FileCheck className="w-3.5 h-3.5" />
                <span>Exam Results Portal →</span>
              </button>
            </div>
          </div>

          {/* Col 2: Academics */}
          <div className="space-y-3">
            <h4 className="text-sm font-bold text-white uppercase tracking-wider">Academics</h4>
            <ul className="space-y-2 text-gray-400">
              <li>
                <button onClick={() => scrollToSection('programs')} className="hover:text-[#D4AF37] transition-colors">
                  O Level Program (UCE)
                </button>
              </li>
              <li>
                <button onClick={() => scrollToSection('programs')} className="hover:text-[#D4AF37] transition-colors">
                  A Level Science (PCM / BCM)
                </button>
              </li>
              <li>
                <button onClick={() => scrollToSection('programs')} className="hover:text-[#D4AF37] transition-colors">
                  Holiday STEM & AI Bootcamp
                </button>
              </li>
              <li>
                <button onClick={() => scrollToSection('academic-excellence')} className="hover:text-[#D4AF37] transition-colors">
                  Academic Progression Roadmap
                </button>
              </li>
              <li>
                <button onClick={onOpenResultsPage} className="hover:text-[#D4AF37] transition-colors text-amber-300 font-semibold">
                  Google Sheets Results Portal
                </button>
              </li>
            </ul>
          </div>

          {/* Col 3: Admissions & Life */}
          <div className="space-y-3">
            <h4 className="text-sm font-bold text-white uppercase tracking-wider">Admissions & Life</h4>
            <ul className="space-y-2 text-gray-400">
              <li>
                <button onClick={() => scrollToSection('admissions-process')} className="hover:text-[#D4AF37] transition-colors">
                  4-Step Admission Flow
                </button>
              </li>
              <li>
                <button onClick={onOpenApply} className="hover:text-[#D4AF37] transition-colors font-bold text-white">
                  Apply Now Online
                </button>
              </li>
              <li>
                <button onClick={() => scrollToSection('student-life')} className="hover:text-sky-300 transition-colors">
                  Student Life & Gallery
                </button>
              </li>
              <li>
                <button onClick={() => scrollToSection('faq')} className="hover:text-[#D4AF37] transition-colors">
                  FAQs & Fees Guidance
                </button>
              </li>
            </ul>
          </div>

          {/* Col 4: Newsletter Subscription */}
          <div className="space-y-3">
            <h4 className="text-sm font-bold text-white uppercase tracking-wider">Newsletter</h4>
            <p className="text-gray-400 text-xs">
              Subscribe to receive national exam updates, campus news, and event invitations.
            </p>
            
            <form
              onSubmit={(e) => {
                e.preventDefault();
                alert('Thank you for subscribing to Nexus Academy Newsletter!');
              }}
              className="space-y-2"
            >
              <input
                type="email"
                required
                placeholder="Enter your email..."
                className="w-full px-3 py-2.5 rounded-xl glass-input text-xs"
              />
              <button
                type="submit"
                className="w-full py-2.5 rounded-xl bg-gradient-to-r from-sky-400 to-blue-500 text-slate-950 font-extrabold text-xs shadow-lg hover:scale-[1.02] transition-all"
              >
                Subscribe to Press
              </button>
            </form>
          </div>

        </div>

        {/* Bottom Legal Copyright */}
        <div className="pt-8 border-t border-white/10 flex flex-col sm:flex-row items-center justify-between gap-4 text-[11px] text-gray-400">
          <div>
            © 2026 Nexus Academy. All rights reserved. Registered Educational Institution.
          </div>
          <div className="flex items-center gap-6">
            <a href="#privacy" className="hover:text-white transition-colors">Privacy Policy</a>
            <a href="#terms" className="hover:text-white transition-colors">Terms of Admission</a>
            <a href="#map" className="hover:text-white transition-colors">Campus Map</a>
          </div>
        </div>

      </div>
    </footer>
  );
};
