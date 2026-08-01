import React from 'react';
import { ADMISSION_STEPS } from '../data/schoolData';
import { FileEdit, UserCheck, MailCheck, Rocket, Send, ArrowRight } from 'lucide-react';

interface AdmissionsSectionProps {
  onOpenApply: () => void;
}

const iconMap: Record<string, React.ReactNode> = {
  FileEdit: <FileEdit className="w-7 h-7 text-amber-600" />,
  UserCheck: <UserCheck className="w-7 h-7 text-sky-600" />,
  MailCheck: <MailCheck className="w-7 h-7 text-emerald-600" />,
  Rocket: <Rocket className="w-7 h-7 text-indigo-600" />
};

export const AdmissionsSection: React.FC<AdmissionsSectionProps> = ({ onOpenApply }) => {
  return (
    <section id="admissions-process" className="py-24 bg-white text-slate-900 relative overflow-hidden border-t border-slate-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        <div className="text-center max-w-3xl mx-auto mb-16 space-y-3">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-amber-50 border border-amber-300 text-amber-900 text-xs font-bold uppercase tracking-wider">
            <Send className="w-4 h-4 text-amber-600" />
            Join Our Scholar Community
          </div>
          <h2 className="text-3xl sm:text-5xl font-black text-[#0B1A30] tracking-tight heading-font">
            Streamlined <span className="text-amber-600">Admissions Process</span>
          </h2>
          <p className="text-slate-600 text-base sm:text-lg">
            Four simple steps to secure your child’s enrollment at Nexus Academy.
          </p>
        </div>

        {/* 4 Steps Grid */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 relative">
          {ADMISSION_STEPS.map((step) => (
            <div
              key={step.stepNumber}
              className="bg-slate-50 border border-slate-200 rounded-3xl p-6 relative flex flex-col justify-between hover:border-amber-500 shadow-md transition-all group"
            >
              <div>
                <div className="flex items-center justify-between mb-4">
                  <div className="w-12 h-12 rounded-2xl bg-white border border-slate-200 shadow flex items-center justify-center">
                    {iconMap[step.icon] || <FileEdit className="w-6 h-6 text-amber-600" />}
                  </div>
                  <span className="text-2xl font-black text-slate-300 group-hover:text-amber-600 transition-colors">
                    0{step.stepNumber}
                  </span>
                </div>

                <h3 className="text-lg font-black text-[#0B1A30] mb-2">{step.title}</h3>
                <p className="text-xs text-slate-600 leading-relaxed font-medium mb-3">{step.description}</p>
                <p className="text-[11px] text-amber-800 bg-amber-50 p-2.5 rounded-xl border border-amber-200">{step.detail}</p>
              </div>
            </div>
          ))}
        </div>

        <div className="mt-12 text-center">
          <button
            onClick={onOpenApply}
            className="px-8 py-3.5 rounded-2xl bg-[#0B1A30] text-white text-xs font-black hover:bg-slate-800 transition-colors inline-flex items-center gap-2 shadow-lg hover:scale-105 transform"
          >
            <span>Start Online Application Now</span>
            <ArrowRight className="w-4 h-4 text-amber-400" />
          </button>
        </div>

      </div>
    </section>
  );
};
