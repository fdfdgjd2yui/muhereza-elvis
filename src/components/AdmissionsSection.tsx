import React from 'react';
import { ADMISSION_STEPS } from '../data/schoolData';
import { FileEdit, UserCheck, MailCheck, Rocket, Send, ArrowRight } from 'lucide-react';

interface AdmissionsSectionProps {
  onOpenApply: () => void;
}

const iconMap: Record<string, React.ReactNode> = {
  FileEdit: <FileEdit className="w-7 h-7 text-[#D4AF37]" />,
  UserCheck: <UserCheck className="w-7 h-7 text-blue-400" />,
  MailCheck: <MailCheck className="w-7 h-7 text-emerald-400" />,
  Rocket: <Rocket className="w-7 h-7 text-indigo-400" />
};

export const AdmissionsSection: React.FC<AdmissionsSectionProps> = ({ onOpenApply }) => {
  return (
    <section id="admissions-process" className="py-24 bg-[#07111F] relative overflow-hidden border-t border-white/10">
      
      {/* Background glow */}
      <div className="absolute top-1/2 right-0 w-96 h-96 rounded-full bg-amber-500/10 blur-[150px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        <div className="text-center max-w-3xl mx-auto mb-16 space-y-3">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full glass-card border border-[#D4AF37]/30 text-amber-300 text-xs font-bold uppercase tracking-widest">
            <Send className="w-3.5 h-3.5 text-[#D4AF37]" />
            Join Our Scholar Community
          </div>
          <h2 className="text-3xl sm:text-5xl font-extrabold text-white heading-font">
            Streamlined <span className="gold-gradient-text">Admissions Process</span>
          </h2>
          <p className="text-gray-300 text-base sm:text-lg">
            Four simple steps to secure your position at Uganda’s premier future-ready international school.
          </p>
        </div>

        {/* 4 Steps Flow Grid with Connected Line */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 relative">
          
          {/* Animated Connecting Line on Large Screens */}
          <div className="hidden md:block absolute top-1/2 left-16 right-16 h-1 bg-gradient-to-r from-[#D4AF37] via-blue-500 to-emerald-500 -translate-y-12 z-0 opacity-40" />

          {ADMISSION_STEPS.map((step) => (
            <div
              key={step.stepNumber}
              className="glass-card glass-card-hover rounded-3xl p-6 border border-white/15 relative z-10 flex flex-col justify-between group"
            >
              <div>
                {/* Step Icon & Number Badge */}
                <div className="flex items-center justify-between mb-6">
                  <div className="w-14 h-14 rounded-2xl bg-white/5 border border-white/10 flex items-center justify-center group-hover:scale-110 group-hover:border-[#D4AF37] transition-all duration-300">
                    {iconMap[step.icon]}
                  </div>
                  <span className="luxury-font text-2xl font-bold text-[#D4AF37] bg-[#D4AF37]/10 px-3 py-1 rounded-xl border border-[#D4AF37]/30">
                    0{step.stepNumber}
                  </span>
                </div>

                <h3 className="text-xl font-bold text-white group-hover:text-amber-200 transition-colors mb-2">
                  {step.title}
                </h3>

                <p className="text-xs text-gray-300 leading-relaxed mb-4">
                  {step.description}
                </p>
              </div>

              <div className="pt-3 border-t border-white/10 text-[11px] text-gray-400">
                {step.detail}
              </div>
            </div>
          ))}
        </div>

        {/* CTA Banner */}
        <div className="mt-16 text-center">
          <button
            onClick={onOpenApply}
            className="inline-flex items-center gap-3 px-10 py-5 rounded-2xl bg-gradient-to-r from-[#D4AF37] via-amber-500 to-amber-600 text-black font-extrabold text-lg shadow-2xl shadow-amber-500/30 hover:scale-105 active:scale-95 transition-all"
          >
            <span>Begin Your Application Now</span>
            <ArrowRight className="w-6 h-6" />
          </button>
          <p className="text-xs text-gray-400 mt-3">
            Admissions open for Term 1, Term 2 & Holiday Innovation Bootcamps.
          </p>
        </div>

      </div>
    </section>
  );
};
