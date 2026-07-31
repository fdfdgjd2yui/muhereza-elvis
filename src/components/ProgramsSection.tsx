import React, { useState } from 'react';
import { PROGRAMS } from '../data/schoolData';
import { Program } from '../types';
import { BookMarked, GraduationCap, ArrowRight, CheckCircle2, BookOpen, Layers, Sparkles, Send, ChevronDown, ChevronUp } from 'lucide-react';

interface ProgramsSectionProps {
  onOpenApply: () => void;
  onSelectProgram: (program: Program) => void;
}

const iconMap: Record<string, React.ReactNode> = {
  BookMarked: <BookMarked className="w-10 h-10 text-sky-400" />,
  GraduationCap: <GraduationCap className="w-10 h-10 text-emerald-400" />
};

export const ProgramsSection: React.FC<ProgramsSectionProps> = ({ onOpenApply, onSelectProgram }) => {
  const [filter, setFilter] = useState<'all' | 'o-level' | 'a-level'>('all');
  const [expandedSubjects, setExpandedSubjects] = useState<Record<string, boolean>>({
    'o-level': true,
    'a-level': true
  });

  const filteredPrograms = PROGRAMS.filter((p) => {
    if (filter === 'all') return true;
    return p.id === filter;
  });

  const toggleSubjects = (id: string) => {
    setExpandedSubjects((prev) => ({ ...prev, [id]: !prev[id] }));
  };

  return (
    <section id="programs" className="py-24 bg-[#07111F] relative overflow-hidden border-t border-white/10">
      
      {/* Background radial glow */}
      <div className="absolute top-1/3 left-1/2 -translate-x-1/2 w-[40rem] h-[25rem] bg-sky-500/10 blur-[150px] pointer-events-none" />

      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        <div className="text-center max-w-3xl mx-auto mb-12 space-y-4">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full glass-card border border-sky-400/30 text-sky-300 text-xs font-bold uppercase tracking-widest">
            <BookOpen className="w-3.5 h-3.5 text-sky-400" />
            Academic Pathways & Syllabus
          </div>
          <h2 className="text-3xl sm:text-5xl font-extrabold text-white heading-font">
            Curriculum & <span className="blue-gradient-text">Programs</span>
          </h2>
          <p className="text-gray-300 text-base sm:text-lg">
            Empowering scholars with recognized national UNEB certification (UCE & UACE), international Cambridge standards, and advanced STEM mastery.
          </p>

          {/* UCE & UACE Interactive Tab Switcher */}
          <div className="pt-4 flex items-center justify-center gap-2">
            {[
              { id: 'all', label: 'All Pathways (UCE & UACE)', icon: Layers },
              { id: 'o-level', label: 'UCE (O-Level / S1-S4)', icon: BookMarked },
              { id: 'a-level', label: 'UACE (A-Level / S5-S6)', icon: GraduationCap }
            ].map((tab) => {
              const Icon = tab.icon;
              const isActive = filter === tab.id;
              return (
                <button
                  key={tab.id}
                  onClick={() => setFilter(tab.id as any)}
                  className={`flex items-center gap-2 px-4 py-2.5 rounded-2xl text-xs font-bold transition-all border ${
                    isActive
                      ? 'bg-sky-500 text-slate-950 border-sky-400 shadow-lg shadow-sky-500/20 scale-105'
                      : 'bg-white/5 text-gray-300 border-white/10 hover:border-white/20 hover:text-white'
                  }`}
                >
                  <Icon className={`w-4 h-4 ${isActive ? 'text-slate-950' : 'text-sky-400'}`} />
                  <span>{tab.label}</span>
                </button>
              );
            })}
          </div>
        </div>

        {/* Full-Featured Program Cards (O Level & A Level) */}
        <div className={`grid grid-cols-1 ${filter === 'all' ? 'md:grid-cols-2' : 'max-w-3xl mx-auto'} gap-8`}>
          {filteredPrograms.map((program) => {
            const isALevel = program.id === 'a-level';
            const showSubjects = expandedSubjects[program.id];

            return (
              <div
                key={program.id}
                className="glass-card glass-card-hover rounded-3xl p-8 border border-sky-400/25 flex flex-col justify-between group relative overflow-hidden transition-all duration-500 bg-gradient-to-b from-[#10253C]/70 to-[#07111F]/90"
              >
                {/* Subtle top light blue accent line */}
                <div className={`absolute top-0 left-0 right-0 h-1.5 bg-gradient-to-r ${
                  isALevel ? 'from-emerald-400 via-teal-400 to-sky-400' : 'from-sky-400 via-blue-500 to-cyan-400'
                } opacity-90 group-hover:opacity-100 transition-opacity`} />

                <div>
                  {/* Header Icon & Duration Badge */}
                  <div className="flex items-center justify-between mb-6">
                    <div className={`p-4 rounded-2xl ${isALevel ? 'bg-emerald-500/15 border border-emerald-400/40' : 'bg-sky-500/15 border border-sky-400/40'} group-hover:scale-110 transition-all duration-300`}>
                      {iconMap[program.icon] || <BookMarked className="w-10 h-10 text-sky-400" />}
                    </div>
                    <div className="flex items-center gap-2">
                      <span className={`text-xs font-bold px-3 py-1 rounded-full ${
                        isALevel ? 'bg-emerald-500/20 text-emerald-300 border border-emerald-500/30' : 'bg-sky-500/20 text-sky-300 border border-sky-500/30'
                      }`}>
                        {program.duration}
                      </span>
                    </div>
                  </div>

                  {/* Title & Syllabus Code */}
                  <div className="space-y-1 mb-4">
                    <span className={`text-xs font-bold uppercase tracking-wider ${isALevel ? 'text-emerald-300' : 'text-sky-300'}`}>
                      {program.code}
                    </span>
                    <h3 className="text-3xl font-bold text-white group-hover:text-sky-200 transition-colors heading-font">
                      {program.title}
                    </h3>
                  </div>

                  <p className="text-xs sm:text-sm text-sky-200 font-medium mb-4 italic">
                    "{program.tagline}"
                  </p>

                  <p className="text-xs sm:text-sm text-gray-300 leading-relaxed mb-6">
                    {program.description}
                  </p>

                  {/* Key Highlights Bullet points */}
                  <div className="space-y-2.5 mb-6">
                    {program.highlights.map((highlight, idx) => (
                      <div key={idx} className="flex items-start gap-2.5 text-xs text-gray-200">
                        <CheckCircle2 className={`w-4 h-4 ${isALevel ? 'text-emerald-400' : 'text-sky-400'} shrink-0 mt-0.5`} />
                        <span>{highlight}</span>
                      </div>
                    ))}
                  </div>

                  {/* Interactive Subject Preview Accordion */}
                  <div className="mb-8 rounded-2xl bg-white/5 border border-white/10 p-4">
                    <button
                      type="button"
                      onClick={() => toggleSubjects(program.id)}
                      className="w-full flex items-center justify-between text-xs font-bold text-white hover:text-sky-300 transition-colors"
                    >
                      <span className="flex items-center gap-2">
                        <Sparkles className={`w-3.5 h-3.5 ${isALevel ? 'text-emerald-400' : 'text-sky-400'}`} />
                        {isALevel ? 'UACE Principal Combinations & Subjects' : 'UCE Compulsory & Elective Subjects'} ({program.subjects.length})
                      </span>
                      {showSubjects ? <ChevronUp className="w-4 h-4 text-gray-400" /> : <ChevronDown className="w-4 h-4 text-gray-400" />}
                    </button>

                    {showSubjects && (
                      <div className="mt-3 pt-3 border-t border-white/10 flex flex-wrap gap-1.5 animate-in fade-in duration-200">
                        {program.subjects.map((sub, idx) => (
                          <span
                            key={idx}
                            className={`px-2.5 py-1 rounded-lg text-[11px] font-medium ${
                              isALevel 
                                ? 'bg-emerald-500/10 text-emerald-200 border border-emerald-500/20' 
                                : 'bg-sky-500/10 text-sky-200 border border-sky-500/20'
                            }`}
                          >
                            {sub}
                          </span>
                        ))}
                      </div>
                    )}
                  </div>
                </div>

                {/* Card Action Buttons */}
                <div className="space-y-3 pt-2">
                  <button
                    onClick={() => onSelectProgram(program)}
                    className={`w-full flex items-center justify-center gap-2 py-3.5 rounded-2xl bg-gradient-to-r ${
                      isALevel ? 'from-emerald-400 via-teal-400 to-sky-400' : 'from-sky-400 via-blue-500 to-cyan-400'
                    } text-slate-950 font-extrabold text-xs shadow-lg hover:scale-[1.02] transition-all duration-300 group/btn`}
                  >
                    <span>View Full {program.title} Page & Syllabus</span>
                    <ArrowRight className="w-4 h-4 group-hover/btn:translate-x-1.5 transition-transform" />
                  </button>

                  <button
                    onClick={onOpenApply}
                    className="w-full flex items-center justify-center gap-2 py-3 rounded-2xl bg-white/10 hover:bg-white/20 border border-white/15 text-white font-bold text-xs transition-all"
                  >
                    <Send className="w-3.5 h-3.5 text-sky-400" />
                    <span>Apply For {isALevel ? 'UACE A-Level' : 'UCE O-Level'}</span>
                  </button>
                </div>

              </div>
            );
          })}
        </div>

      </div>

    </section>
  );
};

