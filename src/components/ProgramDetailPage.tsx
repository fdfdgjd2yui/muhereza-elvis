import React from 'react';
import { Program } from '../types';
import { 
  ArrowLeft, 
  GraduationCap, 
  BookMarked, 
  CheckCircle2, 
  Clock, 
  Sparkles, 
  Award, 
  Calendar, 
  Users, 
  ChevronRight,
  Send,
  FileCheck
} from 'lucide-react';

interface ProgramDetailPageProps {
  program: Program;
  onBack: () => void;
  onOpenApply: () => void;
}

export const ProgramDetailPage: React.FC<ProgramDetailPageProps> = ({
  program,
  onBack,
  onOpenApply
}) => {
  const isALevel = program.id === 'a-level';

  return (
    <div className="min-h-screen bg-[#07111F] text-white pt-28 pb-24 relative overflow-hidden">
      
      {/* Light Blue Ambient Glowing Orbs */}
      <div className="absolute top-20 left-1/4 w-[35rem] h-[22rem] bg-sky-500/15 blur-[160px] pointer-events-none" />
      <div className="absolute bottom-20 right-1/4 w-[35rem] h-[22rem] bg-blue-600/15 blur-[160px] pointer-events-none" />

      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Back Navigation Bar */}
        <div className="mb-8">
          <button
            onClick={onBack}
            className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl bg-white/10 hover:bg-white/20 text-xs font-bold text-white transition-all border border-white/15"
          >
            <ArrowLeft className="w-4 h-4 text-sky-400" />
            <span>Return to Main Page & Curriculum Overview</span>
          </button>
        </div>

        {/* Full Page Header Banner */}
        <div className="glass-card rounded-3xl p-8 sm:p-12 border border-sky-500/30 shadow-2xl relative overflow-hidden bg-gradient-to-br from-[#10253C] via-[#07111F] to-[#10253C] mb-12">
          {/* Top Light Blue Accent Bar */}
          <div className="h-2 w-full bg-gradient-to-r from-sky-400 via-blue-500 to-cyan-400 absolute top-0 left-0 right-0" />

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
            <div className="lg:col-span-8 space-y-4">
              <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-sky-500/20 border border-sky-400/40 text-sky-300 text-xs font-bold uppercase tracking-widest">
                {isALevel ? <GraduationCap className="w-4 h-4 text-sky-400" /> : <BookMarked className="w-4 h-4 text-sky-400" />}
                <span>{program.code}</span>
              </div>

              <h1 className="text-3xl sm:text-5xl font-extrabold text-white heading-font leading-tight">
                {program.title}
              </h1>

              <p className="text-base sm:text-xl text-sky-200 font-medium italic">
                "{program.tagline}"
              </p>

              <p className="text-xs sm:text-sm text-gray-300 leading-relaxed max-w-2xl">
                {program.description}
              </p>

              <div className="pt-2 flex flex-wrap items-center gap-4 text-xs font-semibold text-gray-300">
                <span className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-white/5 border border-white/10">
                  <Clock className="w-4 h-4 text-sky-400" />
                  Duration: <strong className="text-white">{program.duration}</strong>
                </span>
                <span className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-white/5 border border-white/10">
                  <Award className="w-4 h-4 text-sky-400" />
                  Exam Body: <strong className="text-white">UNEB National Board</strong>
                </span>
              </div>
            </div>

            {/* Banner Call-To-Action Card */}
            <div className="lg:col-span-4 glass-card p-6 rounded-2xl border border-white/20 text-center space-y-4 bg-white/5">
              <div className="text-xs text-sky-300 uppercase tracking-wider font-bold">
                Enrollment Open for 2026 / 2027
              </div>
              <p className="text-xs text-gray-300">
                Admissions for {program.title} are currently active. Apply now or book a consultation with our dean.
              </p>
              <button
                onClick={onOpenApply}
                className="w-full py-3.5 rounded-xl bg-gradient-to-r from-sky-400 to-blue-600 text-slate-950 font-extrabold text-sm shadow-xl hover:scale-105 transition-all flex items-center justify-center gap-2"
              >
                <Send className="w-4 h-4" />
                <span>Apply For {program.title}</span>
              </button>
            </div>
          </div>
        </div>

        {/* Content Section 1: Curriculum Subjects & Modules */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 mb-12">
          
          <div className="lg:col-span-8 space-y-8">
            
            {/* Subjects Grid Card */}
            <div className="glass-card rounded-3xl p-6 sm:p-8 border border-white/15 shadow-xl space-y-6">
              <div className="flex items-center justify-between border-b border-white/10 pb-4">
                <h2 className="text-xl font-bold text-white flex items-center gap-2">
                  <Sparkles className="w-5 h-5 text-sky-400" />
                  <span>Official Subject Directory & Combinations</span>
                </h2>
                <span className="text-xs text-sky-300 font-bold">
                  {program.subjects.length} Principal Modules
                </span>
              </div>

              <p className="text-xs sm:text-sm text-gray-300">
                Scholars in {program.title} undergo comprehensive theoretical grounding paired with mandatory laboratory practicals and research projects.
              </p>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {program.subjects.map((subject, index) => (
                  <div
                    key={index}
                    className="p-4 rounded-2xl bg-white/5 border border-white/10 hover:border-sky-400/50 hover:bg-sky-500/10 transition-all flex items-center gap-3"
                  >
                    <div className="w-8 h-8 rounded-xl bg-sky-500/20 border border-sky-400/40 text-sky-300 font-mono text-xs font-bold flex items-center justify-center shrink-0">
                      0{index + 1}
                    </div>
                    <div>
                      <h3 className="text-sm font-bold text-white">{subject}</h3>
                      <p className="text-[11px] text-gray-400">UNEB Syllabus Standard</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Key Academic Program Highlights */}
            <div className="glass-card rounded-3xl p-6 sm:p-8 border border-white/15 shadow-xl space-y-6">
              <h2 className="text-xl font-bold text-white flex items-center gap-2 border-b border-white/10 pb-4">
                <CheckCircle2 className="w-5 h-5 text-sky-400" />
                <span>Program Core Features & Advantages</span>
              </h2>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {program.highlights.map((highlight, index) => (
                  <div key={index} className="p-4 rounded-2xl bg-white/5 border border-white/10 space-y-2">
                    <div className="flex items-center gap-2 text-sky-300 font-bold text-xs uppercase">
                      <ChevronRight className="w-4 h-4 text-sky-400" />
                      <span>Feature 0{index + 1}</span>
                    </div>
                    <p className="text-sm font-bold text-white">{highlight}</p>
                    <p className="text-xs text-gray-400">
                      Fully integrated with state-of-the-art laboratory access and personalized faculty advisory.
                    </p>
                  </div>
                ))}
              </div>
            </div>

          </div>

          {/* Right Sidebar: Program Overview Stats & Requirements */}
          <div className="lg:col-span-4 space-y-6">
            
            {/* Admission Eligibility Card */}
            <div className="glass-card rounded-3xl p-6 border border-white/15 space-y-4">
              <h3 className="text-lg font-bold text-white border-b border-white/10 pb-3">
                Admission Requirements
              </h3>

              <ul className="space-y-3 text-xs text-gray-300">
                <li className="flex items-start gap-2">
                  <CheckCircle2 className="w-4 h-4 text-sky-400 shrink-0 mt-0.5" />
                  <span>{isALevel ? 'Official UCE Pass Certificate or equivalent international transcripts.' : 'PLE Result Slip or Primary School Leaving Assessment.'}</span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle2 className="w-4 h-4 text-sky-400 shrink-0 mt-0.5" />
                  <span>Completed online application form with two passport photographs.</span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle2 className="w-4 h-4 text-sky-400 shrink-0 mt-0.5" />
                  <span>Brief candidate interactive interview & placement guidance test.</span>
                </li>
              </ul>

              <button
                onClick={onOpenApply}
                className="w-full py-3 rounded-xl bg-sky-500 hover:bg-sky-400 text-slate-950 font-extrabold text-xs shadow-lg transition-all"
              >
                Submit Application Form →
              </button>
            </div>

            {/* Examination & Assessment Card */}
            <div className="glass-card rounded-3xl p-6 border border-white/15 space-y-3">
              <h3 className="text-lg font-bold text-white">Assessment Structure</h3>
              <p className="text-xs text-gray-300">
                Continuous monthly progress assessments (40%), midterm mocks (20%), and final mock examination sittings (40%).
              </p>
              <div className="p-3 rounded-xl bg-sky-500/10 border border-sky-400/30 text-xs text-sky-300 font-semibold">
                90% Passing Excellence record maintained across all national exam sittings.
              </div>
            </div>

          </div>

        </div>

        {/* Bottom Navigation */}
        <div className="flex justify-between items-center pt-6 border-t border-white/10">
          <button
            onClick={onBack}
            className="px-6 py-3 rounded-xl bg-white/10 hover:bg-white/20 text-white font-bold text-xs transition-all flex items-center gap-2"
          >
            <ArrowLeft className="w-4 h-4 text-sky-400" />
            <span>Back to Main Page</span>
          </button>

          <button
            onClick={onOpenApply}
            className="px-8 py-3.5 rounded-xl bg-gradient-to-r from-sky-400 to-blue-600 text-slate-950 font-extrabold text-xs shadow-xl"
          >
            Apply Now →
          </button>
        </div>

      </div>
    </div>
  );
};
