import React, { useState } from 'react';
import { GraduationCap, Award, BookOpen, Rocket, CheckCircle2, Globe, Shield, Sparkles } from 'lucide-react';

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
      'Interactive STEM & AI Coding',
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
    title: 'Ivy League & Global Placement',
    sub: 'Harvard, Oxford, Makerere & Beyond',
    badge: '100% Placement Record',
    description: 'Seamless transition into world-renowned medicine, engineering, law, technology, and business faculties.',
    motivation: 'Launching ethical, tech-forward global visionaries equipped to lead industries and transform communities.',
    targetOutcome: 'Direct University Admission & Merit Sponsorships',
    metric: '100% Global Transition',
    milestones: [
      'Harvard, MIT, Oxford & Makerere Entry',
      'Global Alumni Mentorship Network',
      'Tech Startup Incubation Support',
      'Leadership & Public Policy Fellows'
    ],
    icon: Globe
  }
];

export const AcademicExcellenceSection: React.FC = () => {
  const [activeStage, setActiveStage] = useState(0);

  const currentStage = ACADEMIC_STAGES[activeStage];

  return (
    <section id="academic-excellence" className="py-24 bg-[#07111F] relative overflow-hidden border-t border-white/10">
      
      {/* Background glow */}
      <div className="absolute top-1/2 right-10 w-96 h-96 rounded-full bg-amber-500/10 blur-[140px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        <div className="text-center max-w-3xl mx-auto mb-16 space-y-3">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full glass-card border border-[#D4AF37]/30 text-amber-300 text-xs font-bold uppercase tracking-widest">
            <GraduationCap className="w-3.5 h-3.5 text-[#D4AF37]" />
            Academic Roadmap
          </div>
          <h2 className="text-3xl sm:text-5xl font-extrabold text-white heading-font">
            Journey to <span className="gold-gradient-text">Academic Distinction</span>
          </h2>
          <p className="text-gray-300 text-base sm:text-lg">
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
                    ? 'bg-[#D4AF37] text-slate-950 border-[#D4AF37] shadow-lg shadow-amber-500/20'
                    : 'bg-white/5 text-gray-300 border-white/10 hover:border-white/20'
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
          <div className="absolute top-1/2 left-10 right-10 h-1 bg-white/10 -translate-y-1/2 z-0" />
          <div
            className="absolute top-1/2 left-10 h-1 bg-gradient-to-r from-[#D4AF37] to-amber-500 -translate-y-1/2 z-0 transition-all duration-500"
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
                    ? 'glass-card border border-[#D4AF37] scale-105 shadow-2xl bg-[#10253C]'
                    : 'glass-card border border-white/10 hover:border-white/30 opacity-80'
                }`}
              >
                <div
                  className={`w-14 h-14 rounded-2xl flex items-center justify-center mb-3 transition-transform duration-300 ${
                    isPassed
                      ? 'bg-gradient-to-br from-[#D4AF37] to-amber-600 text-black shadow-lg shadow-amber-500/20'
                      : 'bg-white/10 text-gray-400'
                  }`}
                >
                  <IconComponent className="w-7 h-7" />
                </div>

                <span className="text-xs font-black tracking-wider text-[#D4AF37] uppercase">
                  {item.stage}
                </span>
                <span className="text-sm font-bold text-white mt-0.5 leading-snug">
                  {item.title}
                </span>
              </button>
            );
          })}
        </div>

        {/* Selected Stage Detail Card */}
        <div className="glass-card rounded-3xl p-6 sm:p-10 border border-white/20 shadow-2xl relative overflow-hidden bg-gradient-to-b from-[#10253C]/80 to-[#07111F]/90">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
            
            {/* Left Column: Stage Specs & Milestones */}
            <div className="lg:col-span-7 space-y-4">
              <div className="flex flex-wrap items-center gap-2">
                <span className="px-3 py-1 rounded-full bg-[#D4AF37]/20 border border-[#D4AF37]/40 text-[#D4AF37] text-xs font-extrabold uppercase">
                  {currentStage.badge}
                </span>
                <span className="text-xs text-sky-300 font-mono bg-sky-500/10 border border-sky-400/20 px-2.5 py-0.5 rounded-full">
                  Stage {activeStage + 1} of 5
                </span>
              </div>

              <h3 className="text-3xl font-extrabold text-white heading-font">
                {currentStage.title}
              </h3>
              <p className="text-xs font-semibold text-gray-300">
                {currentStage.sub}
              </p>

              <p className="text-sm sm:text-base text-gray-200 leading-relaxed pt-2">
                {currentStage.description}
              </p>

              {/* Class Motivation Banner */}
              <div className="p-4 rounded-2xl bg-amber-500/10 border border-amber-500/30 text-amber-200 text-xs italic flex items-start gap-3">
                <Sparkles className="w-4 h-4 text-[#D4AF37] shrink-0 mt-0.5" />
                <div>
                  <span className="font-bold text-[#D4AF37] not-italic block mb-0.5 uppercase tracking-wider text-[10px]">
                    Class Motivation & Guidance:
                  </span>
                  "{currentStage.motivation}"
                </div>
              </div>

              {/* Milestones grid */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2">
                {currentStage.milestones.map((ms, i) => (
                  <div key={i} className="flex items-center gap-2.5 p-3 rounded-xl bg-white/5 border border-white/10">
                    <CheckCircle2 className="w-4 h-4 text-[#D4AF37] shrink-0" />
                    <span className="text-xs font-medium text-white">{ms}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Right Column: Dynamic Stage Outcome & Metric */}
            <div className="lg:col-span-5 flex flex-col justify-between p-7 rounded-3xl bg-gradient-to-br from-[#10253C] to-[#07111F] border border-amber-500/30 text-center relative overflow-hidden shadow-xl">
              <div className="absolute top-0 right-0 w-32 h-32 bg-[#D4AF37]/10 rounded-full blur-2xl pointer-events-none" />

              <div>
                <div className="w-14 h-14 rounded-2xl bg-[#D4AF37]/20 border border-[#D4AF37] flex items-center justify-center mx-auto mb-3 shadow-md">
                  <Rocket className="w-7 h-7 text-[#D4AF37]" />
                </div>
                
                <span className="text-[10px] font-extrabold uppercase tracking-widest text-[#D4AF37]">
                  Target Scholar Outcome
                </span>
                
                <h4 className="text-lg font-extrabold text-white mt-1 leading-snug">
                  {currentStage.targetOutcome}
                </h4>

                {/* Metric pill */}
                <div className="mt-4 py-2 px-4 rounded-2xl bg-white/5 border border-white/10 inline-block">
                  <span className="text-xs text-gray-400 block">Class Benchmark Metric</span>
                  <span className="text-base font-black text-amber-300">{currentStage.metric}</span>
                </div>
              </div>

              {/* Action buttons */}
              <div className="mt-6 pt-4 border-t border-white/10 space-y-2">
                <div className="text-[11px] text-gray-400">
                  Next Step: <strong className="text-white">{ACADEMIC_STAGES[(activeStage + 1) % ACADEMIC_STAGES.length].title}</strong>
                </div>
                <button
                  onClick={() => setActiveStage((prev) => (prev + 1) % ACADEMIC_STAGES.length)}
                  className="w-full py-3 rounded-2xl bg-[#D4AF37] hover:bg-amber-400 text-slate-950 font-extrabold text-xs transition-all shadow-lg hover:scale-[1.02]"
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

