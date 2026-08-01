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
  ChevronRight,
  Send
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
    <div className="min-h-screen bg-slate-50 text-slate-900 pt-24 pb-24 relative overflow-hidden">
      
      {/* Light Ambient Glowing Orbs */}
      <div className="absolute top-20 left-1/4 w-96 h-96 bg-sky-100/60 rounded-full blur-[140px] pointer-events-none" />
      <div className="absolute bottom-20 right-1/4 w-96 h-96 bg-amber-100/50 rounded-full blur-[140px] pointer-events-none" />

      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Back Navigation Bar */}
        <div className="mb-8">
          <button
            onClick={onBack}
            className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl bg-white hover:bg-slate-100 text-xs font-bold text-[#0B1A30] transition-all border border-slate-200 shadow-sm"
          >
            <ArrowLeft className="w-4 h-4 text-sky-700" />
            <span>Return to Main Page & Curriculum Overview</span>
          </button>
        </div>

        {/* Full Page Header Banner */}
        <div className="bg-white rounded-3xl p-8 sm:p-12 border border-slate-200 shadow-xl relative overflow-hidden mb-12">
          {/* Top Light Blue Accent Bar */}
          <div className="h-2 w-full bg-gradient-to-r from-sky-500 via-blue-600 to-amber-500 absolute top-0 left-0 right-0" />

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
            <div className="lg:col-span-8 space-y-4">
              <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-sky-100 border border-sky-300 text-sky-900 text-xs font-bold uppercase tracking-widest">
                {isALevel ? <GraduationCap className="w-4 h-4 text-sky-700" /> : <BookMarked className="w-4 h-4 text-sky-700" />}
                <span>{program.code}</span>
              </div>

              <h1 className="text-3xl sm:text-5xl font-black text-[#0B1A30] heading-font leading-tight">
                {program.title}
              </h1>

              <p className="text-base sm:text-xl text-sky-800 font-bold italic">
                "{program.tagline}"
              </p>

              <p className="text-xs sm:text-sm text-slate-600 leading-relaxed max-w-2xl font-normal">
                {program.description}
              </p>

              <div className="pt-2 flex flex-wrap items-center gap-4 text-xs font-semibold text-slate-700">
                <span className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-slate-50 border border-slate-200">
                  <Clock className="w-4 h-4 text-sky-700" />
                  Duration: <strong className="text-[#0B1A30]">{program.duration}</strong>
                </span>
                <span className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-slate-50 border border-slate-200">
                  <Award className="w-4 h-4 text-sky-700" />
                  Exam Body: <strong className="text-[#0B1A30]">UNEB National Board</strong>
                </span>
              </div>
            </div>

            {/* Banner Call-To-Action Card */}
            <div className="lg:col-span-4 bg-slate-50 p-6 rounded-2xl border border-slate-200 text-center space-y-4">
              <div className="text-xs text-amber-800 uppercase tracking-wider font-extrabold">
                Enrollment Open for 2026 / 2027
              </div>
              <p className="text-xs text-slate-600">
                Admissions for {program.title} are currently active. Apply now or book a consultation with our dean.
              </p>
              <button
                onClick={onOpenApply}
                className="w-full py-3.5 rounded-xl bg-[#0B1A30] text-white font-extrabold text-sm shadow-lg hover:bg-slate-800 transition-all flex items-center justify-center gap-2"
              >
                <Send className="w-4 h-4 text-amber-400" />
                <span>Apply For {program.title}</span>
              </button>
            </div>
          </div>
        </div>

        {/* Content Section 1: Curriculum Subjects & Modules */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 mb-12">
          
          <div className="lg:col-span-8 space-y-8">
            
            {/* Subjects Grid Card */}
            <div className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-200 shadow-md space-y-6">
              <div className="flex items-center justify-between border-b border-slate-200 pb-4">
                <h2 className="text-xl font-black text-[#0B1A30] flex items-center gap-2">
                  <Sparkles className="w-5 h-5 text-sky-700" />
                  <span>Official Subject Directory & Combinations</span>
                </h2>
                <span className="text-xs text-sky-800 font-bold bg-sky-50 px-3 py-1 rounded-full border border-sky-200">
                  {program.subjects.length} Principal Modules
                </span>
              </div>

              <p className="text-xs sm:text-sm text-slate-600">
                Scholars in {program.title} undergo comprehensive theoretical grounding paired with mandatory laboratory practicals and research projects.
              </p>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {program.subjects.map((subject, index) => (
                  <div
                    key={index}
                    className="p-4 rounded-2xl bg-slate-50 border border-slate-200 hover:border-sky-400 transition-all flex items-center gap-3"
                  >
                    <div className="w-8 h-8 rounded-xl bg-sky-100 border border-sky-300 text-sky-900 font-mono text-xs font-bold flex items-center justify-center shrink-0">
                      0{index + 1}
                    </div>
                    <div>
                      <h3 className="text-sm font-bold text-[#0B1A30]">{subject}</h3>
                      <p className="text-[11px] text-slate-500">UNEB Syllabus Standard</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Key Academic Program Highlights */}
            <div className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-200 shadow-md space-y-6">
              <h2 className="text-xl font-black text-[#0B1A30] flex items-center gap-2 border-b border-slate-200 pb-4">
                <CheckCircle2 className="w-5 h-5 text-sky-700" />
                <span>Program Core Features & Advantages</span>
              </h2>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {program.highlights.map((highlight, index) => (
                  <div key={index} className="p-4 rounded-2xl bg-slate-50 border border-slate-200 space-y-2">
                    <div className="flex items-center gap-2 text-sky-800 font-bold text-xs uppercase">
                      <ChevronRight className="w-4 h-4 text-sky-600" />
                      <span>Feature 0{index + 1}</span>
                    </div>
                    <p className="text-sm font-bold text-[#0B1A30]">{highlight}</p>
                    <p className="text-xs text-slate-600">
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
            <div className="bg-white rounded-3xl p-6 border border-slate-200 shadow-md space-y-4">
              <h3 className="text-lg font-black text-[#0B1A30] border-b border-slate-200 pb-3">
                Admission Requirements
              </h3>

              <ul className="space-y-3 text-xs text-slate-700 font-medium">
                <li className="flex items-start gap-2">
                  <CheckCircle2 className="w-4 h-4 text-sky-600 shrink-0 mt-0.5" />
                  <span>{isALevel ? 'Official UCE Pass Certificate or equivalent international transcripts.' : 'PLE Result Slip or Primary School Leaving Assessment.'}</span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle2 className="w-4 h-4 text-sky-600 shrink-0 mt-0.5" />
                  <span>Completed online application form with two passport photographs.</span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle2 className="w-4 h-4 text-sky-600 shrink-0 mt-0.5" />
                  <span>Brief candidate interactive interview & placement guidance test.</span>
                </li>
              </ul>

              <button
                onClick={onOpenApply}
                className="w-full py-3 rounded-xl bg-[#0B1A30] text-white font-extrabold text-xs shadow-md hover:bg-slate-800 transition-all"
              >
                Submit Application Form →
              </button>
            </div>

            {/* Examination & Assessment Card */}
            <div className="bg-white rounded-3xl p-6 border border-slate-200 shadow-md space-y-3">
              <h3 className="text-lg font-black text-[#0B1A30]">Assessment Structure</h3>
              <p className="text-xs text-slate-600 leading-relaxed">
                Continuous monthly progress assessments (40%), midterm mocks (20%), and final mock examination sittings (40%).
              </p>
              <div className="p-3 rounded-xl bg-amber-50 border border-amber-200 text-xs text-amber-900 font-bold">
                90% Passing Excellence record maintained across all national exam sittings.
              </div>
            </div>

          </div>

        </div>

        {/* Bottom Navigation */}
        <div className="flex justify-between items-center pt-6 border-t border-slate-200">
          <button
            onClick={onBack}
            className="px-6 py-3 rounded-xl bg-white hover:bg-slate-100 text-[#0B1A30] font-bold text-xs border border-slate-300 transition-all flex items-center gap-2 shadow-sm"
          >
            <ArrowLeft className="w-4 h-4 text-sky-700" />
            <span>Back to Main Page</span>
          </button>

          <button
            onClick={onOpenApply}
            className="px-8 py-3.5 rounded-xl bg-[#0B1A30] text-white font-extrabold text-xs shadow-lg hover:bg-slate-800"
          >
            Apply Now →
          </button>
        </div>

      </div>
    </div>
  );
};
