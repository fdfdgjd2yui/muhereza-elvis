import React from 'react';
import { TRUSTED_METRICS } from '../data/schoolData';
import { Award, GraduationCap, UserCheck } from 'lucide-react';

const iconMap: Record<string, React.ReactNode> = {
  Award: <Award className="w-8 h-8 text-sky-400" />,
  GraduationCap: <GraduationCap className="w-8 h-8 text-sky-400" />,
  UserCheck: <UserCheck className="w-8 h-8 text-cyan-400" />
};

export const StatsSection: React.FC = () => {
  return (
    <section className="relative py-16 bg-[#07111F] border-y border-white/10 overflow-hidden">
      
      {/* Background glow orb */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full max-w-5xl h-32 bg-sky-500/15 blur-[100px] pointer-events-none" />

      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        <div className="text-center max-w-2xl mx-auto mb-10">
          <p className="text-xs font-bold text-sky-300 uppercase tracking-widest">
            Institutional Legacy
          </p>
          <h2 className="text-2xl sm:text-3xl font-bold text-white heading-font mt-1">
            Proven Academic & Institutional Distinction
          </h2>
        </div>

        {/* 3 Glass Statistics Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {TRUSTED_METRICS.map((metric) => (
            <div
              key={metric.id}
              className="glass-card glass-card-hover rounded-2xl p-8 border border-white/15 text-center flex flex-col items-center justify-between group"
            >
              <div className="p-4 rounded-2xl bg-white/5 border border-white/10 mb-4 group-hover:scale-110 group-hover:border-sky-400/50 transition-all duration-300">
                {iconMap[metric.iconName] || <Award className="w-8 h-8 text-sky-400" />}
              </div>

              <div className="space-y-1 my-2">
                <div className="text-4xl sm:text-5xl font-black text-white blue-gradient-text tracking-tight heading-font">
                  {metric.value}
                </div>
                <div className="text-base font-bold text-gray-100">
                  {metric.label}
                </div>
              </div>

              <p className="text-xs text-gray-400 leading-relaxed mt-2 pt-3 border-t border-white/10 w-full">
                {metric.description}
              </p>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
};

