import React, { useState } from 'react';
import { GraduationCap, Award, BookOpen, Rocket, CheckCircle2, Globe, Shield } from 'lucide-react';

const ACADEMIC_STAGES = [
  {
    stage: 'S1 - S4',
    title: 'O-Level Foundation',
    sub: 'Senior 1 to Senior 4',
    badge: 'UNEB & IGCSE Track',
    description: 'Comprehensive core grounding in sciences, mathematics, humanities, and computational logic.',
    motivation: 'Igniting curiosity and building unshakeable study habits right from Senior 1 to foster analytical confidence.',
    targetOutcome: 'Solid 8-Subject Mastery & Computational STEM Literacy',
    metric: '100% Practical Lab Exposure',
    milestones: [
      'Interactive STEM and ICT clubs',
      'Personal Academic Mentorship',
      'Science Practical Mastery',
      'Continuous Assessment Guidance'
    ],
    icon: BookOpen
  },
  {
    stage: 'UCE',
    title: 'Uganda Certificate of Education',
    sub: 'Senior 4 UNEB Milestone',
    badge: '98.4% Division 1 Rate',
    description: 'Official national examination testing breadth of knowledge, problem solving, and distinction performance.',
    motivation: 'Refining exam technique and critical inquiry so scholars walk into UNEB sittings expecting super distinctions.',
    targetOutcome: 'Aggregate 8 - 12 Super Distinction Level',
    metric: '98.4% Division 1 History',
    milestones: [
      'Super Distinction Preparation',
      'Mock Exam Feedback Loops',
      'Distinction 1 Subject Clinics',
      'Scholarship Eligibility Rewards'
    ],
    icon: Award
  },
  {
    stage: 'S5 - S6',
    title: 'A-Level Specialization',
    sub: 'Senior 5 to Senior 6',
    badge: 'PCM, BCM, HEG & Arts',
    description: 'Specialized advanced scientific and humanities combinations preparing scholars for direct university entry.',
    motivation: 'Deepening academic specialization in chosen principal subjects while cultivating university-grade research skills.',
    targetOutcome: '3 Principal Passes & Original Capstone Thesis',
    metric: '100% Principal Pass Rate',
    milestones: [
      'High-Rigor Science Combinations',
      'Research Thesis & Field Projects',
      'SAT & IELTS Preparatory Workshops',
      'University Faculty Mentorships'
    ],
    icon: GraduationCap
  },
  {
    stage: 'UACE',
    title: 'UACE National Certification',
    sub: 'Senior 6 Final Board Exams',
    badge: 'Top Tier 20-Point Scholars',
    description: 'The pinnacle of secondary academic rigor resulting in official UACE principal pass certificates and top honors.',
    motivation: 'Translating two years of dedicated A-Level mastery into maximum point scores and national merit awards.',
    targetOutcome: 'Maximum 20 Points & Distinction A Grade Standard',
    metric: 'National Rank #1 Placement',
    milestones: [
      'Maximum 20-Point Achievement Focus',
      'National Rank #1 Placement History',
      'Government & Merit Sponsorships',
      'International Transcript Equivalence'
    ],
    icon: Shield
  },
  {
    stage: 'University',
    title: 'University Placement & Merit Sponsorships',
    sub: 'Makerere, MUST, Kyambogo & Overseas Universities',
    badge: 'High Sponsorship Record',
    description: 'Seamless transition into top degree programs in Medicine, Engineering, Law, Computing, Business, and Education.',
    motivation: 'Launching ethical, patriotic, and skilled Ugandan leaders equipped to serve nation and global communities.',
    targetOutcome: 'Direct University Admission & Government Sponsorships',
    metric: '100% Tertiary Transition',
    milestones: [
      'Makerere, MUST & Kyambogo Government Entry',
      'PUJO University Placement Guidance',
      'Overseas Merit Scholarship Mentorship',
      'Leadership & Public Service Values'
    ],
    icon: Globe
  }
];

export const AcademicExcellenceSection: React.FC = () => {
  const [activeStage, setActiveStage] = useState(0);

  const currentStage = ACADEMIC_STAGES[activeStage];

  return (
    <section id="academic-excellence" className="py-24 bg-slate-50 relative overflow-hidden border-t border-slate-200 text-slate-900">
      
      {/* Background glow */}
      <div className="absolute top-1/2 right-10 w-96 h-96 rounded-full bg-amber-200/40 blur-[140px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        <div className="text-center max-w-3xl mx-auto mb-16 space-y-3">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-amber-50 border border-amber-300 text-amber-900 text-xs font-bold uppercase tracking-widest">
            <GraduationCap className="w-3.5 h-3.5 text-amber-700" />
            Academic Roadmap
          </div>
          <h2 className="text-3xl sm:text-5xl font-extrabold text-[#0B1A30] heading-font">
            Journey to <span className="text-amber-700">Academic Distinction</span>
          </h2>
          <p className="text-slate-600 text-base sm:text-lg">
            A structured, high-support academic progression from Senior 1 foundational mastery to top university placement.
          </p>
        </div>

        {/* Mobile & Tablet Stage Switcher Pills */}
        <div className="flex lg:hidden overflow-x-auto pb-4 mb-6 gap-2 no-scrollbar">
          {ACADEMIC_STAGES.map((item, idx) => {
            const isActive = idx === activeStage;
            return (
              <button
                key={idx}
                onClick={() => setActiveStage(idx)}
                className={`flex items-center gap-2 px-4 py-2 rounded-2xl text-xs font-bold whitespace-nowrap transition-all border ${
                  isActive
                    ? 'bg-amber-600 text-white border-amber-600 shadow-md'
                    : 'bg-white text-slate-700 border-slate-200 hover:border-slate-300'
                }`}
              >
                <span>{item.stage}</span>
                <span className="opacity-80">({item.title.split(' ')[0]})</span>
              </button>
            );
          })}
        </div>

        {/* Desktop Connected Stage Progress Line */}
        <div className="hidden lg:grid grid-cols-5 gap-4 relative mb-12">
          
          {/* Background Connecting Bar */}
          <div className="absolute top-1/2 left-10 right-10 h-1 bg-slate-200 -translate-y-1/2 z-0" />
          <div
            className="absolute top-1/2 left-10 h-1 bg-amber-500 -translate-y-1/2 z-0 transition-all duration-500"
            style={{ width: `${(activeStage / (ACADEMIC_STAGES.length - 1)) * 80}%` }}
          />

          {ACADEMIC_STAGES.map((item, idx) => {
            const IconComponent = item.icon;
            const isActive = idx === activeStage;
            const isPassed = idx <= activeStage;

            return (
              <button
                key={idx}
                onClick={() => setActiveStage(idx)}
                className={`relative z-10 flex flex-col items-center p-4 rounded-2xl transition-all duration-300 text-center ${
                  isActive
                    ? 'bg-white border-2 border-amber-500 scale-105 shadow-xl'
                    : 'bg-white border border-slate-200 hover:border-slate-300 opacity-90'
                }`}
              >
                <div
                  className={`w-14 h-14 rounded-2xl flex items-center justify-center mb-3 transition-transform duration-300 ${
                    isPassed
                      ? 'bg-amber-500 text-white shadow-md'
                      : 'bg-slate-100 text-slate-500'
                  }`}
                >
                  <IconComponent className="w-7 h-7" />
                </div>

                <span className="text-xs font-black tracking-wider text-amber-800 uppercase">
                  {item.stage}
                </span>
                <span className="text-sm font-bold text-[#0B1A30] mt-0.5 leading-snug">
                  {item.title}
                </span>
              </button>
            );
          })}
        </div>

        {/* Selected Stage Detail Card */}
        <div className="bg-white rounded-3xl p-6 sm:p-10 border border-slate-200 shadow-xl relative overflow-hidden text-slate-900">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
            
            {/* Left Column: Stage Specs & Milestones */}
            <div className="lg:col-span-7 space-y-4">
              <div className="flex flex-wrap items-center gap-2">
                <span className="px-3 py-1 rounded-full bg-amber-100 border border-amber-300 text-amber-900 text-xs font-extrabold uppercase">
                  {currentStage.badge}
                </span>
                <span className="text-xs text-sky-800 font-mono bg-sky-50 border border-sky-200 px-2.5 py-0.5 rounded-full">
                  Stage {activeStage + 1} of 5
                </span>
              </div>

              <h3 className="text-3xl font-extrabold text-[#0B1A30] heading-font">
                {currentStage.title}
              </h3>
              <p className="text-xs font-semibold text-slate-600">
                {currentStage.sub}
              </p>

              <p className="text-sm sm:text-base text-slate-700 leading-relaxed pt-2">
                {currentStage.description}
              </p>

              {/* Class Motivation Banner */}
              <div className="p-4 rounded-2xl bg-amber-50 border border-amber-200 text-amber-950 text-xs italic flex items-start gap-3">
                <Award className="w-4 h-4 text-amber-700 shrink-0 mt-0.5" />
                <div>
                  <span className="font-bold text-amber-900 not-italic block mb-0.5 uppercase tracking-wider text-[10px]">
                    Class Motivation & Guidance:
                  </span>
                  "{currentStage.motivation}"
                </div>
              </div>

              {/* Milestones grid */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2">
                {currentStage.milestones.map((ms, i) => (
                  <div key={i} className="flex items-center gap-2.5 p-3 rounded-xl bg-slate-50 border border-slate-200">
                    <CheckCircle2 className="w-4 h-4 text-amber-700 shrink-0" />
                    <span className="text-xs font-medium text-slate-800">{ms}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Right Column: Dynamic Stage Outcome & Metric */}
            <div className="lg:col-span-5 flex flex-col justify-between p-7 rounded-3xl bg-slate-50 border border-slate-200 text-center relative overflow-hidden shadow-sm">
              <div className="absolute top-0 right-0 w-32 h-32 bg-amber-100/50 rounded-full blur-2xl pointer-events-none" />

              <div>
                <div className="w-14 h-14 rounded-2xl bg-amber-100 border border-amber-300 flex items-center justify-center mx-auto mb-3 shadow-sm">
                  <Rocket className="w-7 h-7 text-amber-700" />
                </div>
                
                <span className="text-[10px] font-extrabold uppercase tracking-widest text-amber-800">
                  Target Scholar Outcome
                </span>
                
                <h4 className="text-lg font-extrabold text-[#0B1A30] mt-1 leading-snug">
                  {currentStage.targetOutcome}
                </h4>

                {/* Metric pill */}
                <div className="mt-4 py-2 px-4 rounded-2xl bg-white border border-slate-200 inline-block">
                  <span className="text-xs text-slate-500 block">Class Benchmark Metric</span>
                  <span className="text-base font-black text-amber-800">{currentStage.metric}</span>
                </div>
              </div>

              {/* Action buttons */}
              <div className="mt-6 pt-4 border-t border-slate-200 space-y-2">
                <div className="text-[11px] text-slate-600">
                  Next Step: <strong className="text-slate-900">{ACADEMIC_STAGES[(activeStage + 1) % ACADEMIC_STAGES.length].title}</strong>
                </div>
                <button
                  onClick={() => setActiveStage((prev) => (prev + 1) % ACADEMIC_STAGES.length)}
                  className="w-full py-3 rounded-2xl bg-[#0B1A30] hover:bg-slate-800 text-white font-extrabold text-xs transition-all shadow-md hover:scale-[1.01]"
                >
                  Advance to Next Academic Stage →
                </button>
              </div>

            </div>

          </div>
        </div>

      </div>
    </section>
  );
};

