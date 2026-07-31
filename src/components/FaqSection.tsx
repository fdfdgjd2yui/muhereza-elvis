import React, { useState } from 'react';
import { FAQS } from '../data/schoolData';
import { HelpCircle, ChevronDown, Sparkles } from 'lucide-react';

export const FaqSection: React.FC = () => {
  const [openId, setOpenId] = useState<string | null>('1');

  const toggleFaq = (id: string) => {
    setOpenId(openId === id ? null : id);
  };

  return (
    <section id="faq" className="py-24 bg-[#07111F] relative overflow-hidden border-t border-white/10">
      
      {/* Background glow */}
      <div className="absolute top-1/3 left-1/2 -translate-x-1/2 w-96 h-96 rounded-full bg-blue-600/10 blur-[150px] pointer-events-none" />

      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        <div className="text-center max-w-2xl mx-auto mb-16 space-y-3">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full glass-card border border-[#D4AF37]/30 text-amber-300 text-xs font-bold uppercase tracking-widest">
            <HelpCircle className="w-3.5 h-3.5 text-[#D4AF37]" />
            Clarifications & Guidance
          </div>
          <h2 className="text-3xl sm:text-5xl font-extrabold text-white heading-font">
            Frequently Asked <span className="gold-gradient-text">Questions</span>
          </h2>
          <p className="text-gray-300 text-base">
            Everything you need to know about curriculums, boarding facilities, and results verification.
          </p>
        </div>

        {/* Glass Accordion */}
        <div className="space-y-4">
          {FAQS.map((faq) => {
            const isOpen = openId === faq.id;
            return (
              <div
                key={faq.id}
                className={`glass-card rounded-2xl border transition-all duration-300 overflow-hidden ${
                  isOpen ? 'border-[#D4AF37]/60 bg-[#10253C]/80 shadow-2xl' : 'border-white/12 hover:border-white/25'
                }`}
              >
                <button
                  onClick={() => toggleFaq(faq.id)}
                  className="w-full flex items-center justify-between p-6 text-left"
                >
                  <span className="text-base sm:text-lg font-bold text-white pr-4">
                    {faq.question}
                  </span>
                  <div className={`p-2 rounded-xl bg-white/5 shrink-0 transition-transform duration-300 ${isOpen ? 'rotate-180 bg-[#D4AF37]/20 text-[#D4AF37]' : 'text-gray-400'}`}>
                    <ChevronDown className="w-5 h-5" />
                  </div>
                </button>

                {isOpen && (
                  <div className="px-6 pb-6 text-xs sm:text-sm text-gray-300 leading-relaxed border-t border-white/10 pt-4 animate-in fade-in duration-200">
                    <p>{faq.answer}</p>
                    <div className="mt-3 flex items-center gap-2 text-[11px] text-[#D4AF37] font-semibold">
                      <Sparkles className="w-3.5 h-3.5" />
                      <span>Category: {faq.category}</span>
                    </div>
                  </div>
                )}
              </div>
            );
          })}
        </div>

      </div>
    </section>
  );
};
