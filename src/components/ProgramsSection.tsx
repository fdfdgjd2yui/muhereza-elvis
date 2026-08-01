import React, { useState } from 'react';
import { PROGRAMS } from '../data/schoolData';
import { Program } from '../types';
import { BookMarked, GraduationCap, ArrowRight, CheckCircle2, BookOpen, Layers, Sparkles, Send } from 'lucide-react';

interface ProgramsSectionProps {
  onOpenApply: () => void;
  onSelectProgram: (program: Program) => void;
}

export const ProgramsSection: React.FC<ProgramsSectionProps> = ({ onOpenApply, onSelectProgram }) => {
  const [filter, setFilter] = useState<'all' | 'o-level' | 'a-level'>('all');

  const filteredPrograms = PROGRAMS.filter((p) => {
    if (filter === 'all') return true;
    return p.id === filter;
  });

  return (
    <section id="programs" className="py-24 bg-slate-50 text-slate-900 relative overflow-hidden border-t border-slate-200">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        <div className="text-center max-w-3xl mx-auto mb-12 space-y-3">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-amber-50 border border-amber-300 text-amber-900 text-xs font-bold uppercase tracking-wider">
            <BookOpen className="w-4 h-4 text-amber-600" />
            Academic Curriculum & Pathways
          </div>
          <h2 className="text-3xl sm:text-5xl font-black text-[#0B1A30] tracking-tight heading-font">
            Our Academic <span className="text-amber-600">Programs</span>
          </h2>
          <p className="text-slate-600 text-base sm:text-lg">
            National UNEB curriculum pathways (UCE & UACE) integrated with future-ready STEM, robotics, and leadership tracks.
          </p>
        </div>

        {/* Filter Pills */}
        <div className="flex justify-center gap-2 mb-12">
          <button
            onClick={() => setFilter('all')}
            className={`px-4 py-2 rounded-xl text-xs font-bold transition-all border ${
              filter === 'all'
                ? 'bg-[#0B1A30] text-white border-[#0B1A30] shadow-md'
                : 'bg-white text-slate-700 border-slate-200 hover:bg-slate-100'
            }`}
          >
            All Levels
          </button>
          <button
            onClick={() => setFilter('o-level')}
            className={`px-4 py-2 rounded-xl text-xs font-bold transition-all border ${
              filter === 'o-level'
                ? 'bg-[#0B1A30] text-white border-[#0B1A30] shadow-md'
                : 'bg-white text-slate-700 border-slate-200 hover:bg-slate-100'
            }`}
          >
            UCE (Senior 1 - Senior 4)
          </button>
          <button
            onClick={() => setFilter('a-level')}
            className={`px-4 py-2 rounded-xl text-xs font-bold transition-all border ${
              filter === 'a-level'
                ? 'bg-[#0B1A30] text-white border-[#0B1A30] shadow-md'
                : 'bg-white text-slate-700 border-slate-200 hover:bg-slate-100'
            }`}
          >
            UACE (Senior 5 - Senior 6)
          </button>
        </div>

        {/* Programs Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {filteredPrograms.map((program) => (
            <div
              key={program.id}
              className="bg-white rounded-3xl border border-slate-200 shadow-md hover:shadow-xl transition-all duration-300 p-8 flex flex-col justify-between hover:border-amber-500"
            >
              <div className="space-y-6">
                <div className="flex items-center justify-between border-b border-slate-100 pb-4">
                  <div>
                    <span className="text-xs font-black uppercase text-amber-600 tracking-wider">{program.tagline}</span>
                    <h3 className="text-2xl font-black text-[#0B1A30] mt-1">{program.title}</h3>
                  </div>
                  <div className="w-12 h-12 rounded-2xl bg-[#0B1A30] text-amber-400 flex items-center justify-center font-black">
                    {program.id === 'o-level' ? 'UCE' : 'UACE'}
                  </div>
                </div>

                <p className="text-sm text-slate-600 leading-relaxed font-medium">
                  {program.description}
                </p>

                <div className="space-y-3">
                  <h4 className="text-xs font-bold uppercase text-slate-500">Core Subject Highlights</h4>
                  <div className="grid grid-cols-2 gap-2 text-xs font-semibold text-slate-800">
                    {program.subjects.slice(0, 8).map((subject, idx) => (
                      <div key={idx} className="flex items-center gap-2 p-2 rounded-lg bg-slate-50 border border-slate-100">
                        <CheckCircle2 className="w-3.5 h-3.5 text-amber-600 shrink-0" />
                        <span className="truncate">{subject}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              <div className="pt-8 flex flex-col sm:flex-row gap-3">
                <button
                  onClick={onOpenApply}
                  className="w-full sm:w-auto px-5 py-2.5 rounded-xl bg-[#0B1A30] text-white text-xs font-bold hover:bg-slate-800 transition-colors flex items-center justify-center gap-2 shadow"
                >
                  <span>Apply for Admission</span>
                  <ArrowRight className="w-4 h-4 text-amber-400" />
                </button>
              </div>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
};
