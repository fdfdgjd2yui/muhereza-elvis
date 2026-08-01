import React, { useState } from 'react';
import { WHY_NEXUS_FEATURES } from '../data/schoolData';
import { Sparkles, Monitor, FlaskConical, BookOpen, Trophy, HeartHandshake, CheckCircle2, X, ArrowRight } from 'lucide-react';

const iconMap: Record<string, React.ReactNode> = {
  Sparkles: <Sparkles className="w-5 h-5 text-sky-400" />,
  Monitor: <Monitor className="w-5 h-5 text-sky-400" />,
  FlaskConical: <FlaskConical className="w-5 h-5 text-cyan-400" />,
  BookOpen: <BookOpen className="w-5 h-5 text-blue-400" />,
  Trophy: <Trophy className="w-5 h-5 text-sky-300" />,
  HeartHandshake: <HeartHandshake className="w-5 h-5 text-teal-300" />
};

const FEATURE_DETAILS: Record<string, { specs: string[]; quote: string; image: string }> = {
  '1': {
    specs: ['Continuous UNEB Assessment', 'Saturday Joint Mock Clinics', 'Personalized Student Target Sheets'],
    quote: 'Targeted continuous assessment to prepare every candidate for UNEB UCE and UACE distinction results.',
    image: 'https://images.unsplash.com/photo-1581092335397-9583fe92d232?q=80&w=1200&auto=format&fit=crop'
  },
  '2': {
    specs: ['Spacious Well-Ventilated Rooms', 'Digital Projectors & Whiteboards', 'Comfortable Single Desks'],
    quote: 'Conducive learning environment tailored for focused study and student participation.',
    image: 'https://images.unsplash.com/photo-1509062522246-3755977927d7?q=80&w=1200&auto=format&fit=crop'
  },
  '3': {
    specs: ['Fully Stocked Chemistry Reagents', 'Physics Mechanics & Optics Kits', 'Biology Microscope & Specimen Station'],
    quote: 'Practical lab work empowering students to master UNEB practical examinations with confidence.',
    image: 'https://images.unsplash.com/photo-1532094349884-543bc11b234d?q=80&w=1200&auto=format&fit=crop'
  },
  '4': {
    specs: ['Comprehensive Textbooks Repository', 'UNEB Past Papers Collection (2000-2025)', 'High-Speed Computer & ICT Center'],
    quote: 'Rich learning resources to support independent research and revision for both O-Level & A-Level.',
    image: 'https://images.unsplash.com/photo-1524995997946-a1c2e315a42f?q=80&w=1200&auto=format&fit=crop'
  },
  '5': {
    specs: ['Standard Football Grass Pitch', 'Basketball & Netball Courts', 'Inter-House Sports Competitions'],
    quote: 'Fostering teamwork, physical wellness, and talent development through sports.',
    image: 'https://images.unsplash.com/photo-1530549387789-4c1017266635?q=80&w=1200&auto=format&fit=crop'
  },
  '6': {
    specs: ['Scripture Union & Chaplaincy', 'Student Executive Council', 'Debate & Wildlife Clubs'],
    quote: 'Cultivating spiritual growth, moral integrity, public speaking, and responsible student leadership.',
    image: 'https://images.unsplash.com/photo-1541829070764-84a7d30dd3f3?q=80&w=1200&auto=format&fit=crop'
  }
};

export const WhyNexusSection: React.FC = () => {
  const [selectedFeature, setSelectedFeature] = useState<typeof WHY_NEXUS_FEATURES[0] | null>(null);

  const detail = selectedFeature ? FEATURE_DETAILS[selectedFeature.id] : null;

  return (
    <section id="why-nexus" className="py-24 bg-slate-50 relative overflow-hidden text-slate-900 border-t border-slate-200">
      
      {/* Background glow orb */}
      <div className="absolute -top-24 right-0 w-96 h-96 rounded-full bg-sky-200/40 blur-[130px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        <div className="text-center max-w-3xl mx-auto mb-16 space-y-3">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-sky-100 border border-sky-300 text-sky-900 text-xs font-bold uppercase tracking-widest">
            <Sparkles className="w-3.5 h-3.5 text-sky-700" />
            Educational Distinction
          </div>
          <h2 className="text-3xl sm:text-5xl font-extrabold text-[#0B1A30] heading-font">
            Why Choose <span className="text-sky-700">Nexus Academy</span>
          </h2>
          <p className="text-slate-600 text-base sm:text-lg max-w-2xl mx-auto">
            Combining rigorous national academics with STEM innovation and holistic character formation for both UCE & UACE.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          
          {/* Left Column: Campus Spotlight Box */}
          <div className="lg:col-span-5 relative">
            <div className="relative rounded-3xl overflow-hidden p-6 border border-slate-200 shadow-xl h-[480px] flex flex-col justify-between bg-white text-slate-900">
              <div className="flex justify-between items-center">
                <span className="px-3 py-1 rounded-full bg-sky-100 border border-sky-300 text-[10px] font-bold text-sky-900 uppercase tracking-widest">
                  Nexus Campus
                </span>
                <Sparkles className="w-6 h-6 text-sky-600" />
              </div>

              <div className="my-auto text-center space-y-3 py-6">
                <div className="w-16 h-16 rounded-2xl bg-sky-50 border border-sky-200 flex items-center justify-center mx-auto text-sky-700">
                  <Monitor className="w-8 h-8" />
                </div>
                <h3 className="text-xl font-bold text-[#0B1A30] heading-font">Future-Ready Architecture</h3>
                <p className="text-xs text-slate-600 max-w-xs mx-auto leading-relaxed">
                  Designed for student collaboration, academic focus, and creative spark.
                </p>
              </div>

              <div className="p-4 rounded-2xl border border-slate-200 bg-slate-50">
                <p className="text-xs font-semibold text-sky-800 uppercase tracking-wider">Campus Facilities</p>
                <p className="text-xs font-bold text-[#0B1A30] mt-0.5">Dual Curriculums & Modern Science Labs</p>
              </div>
            </div>

            {/* Accent badge card */}
            <div className="absolute -bottom-6 -right-6 hidden sm:flex p-4 rounded-2xl border border-slate-200 shadow-xl bg-white max-w-[200px] text-slate-900">
              <div className="space-y-1">
                <p className="text-2xl font-black text-sky-700 heading-font">100%</p>
                <p className="text-xs font-semibold text-[#0B1A30]">Digital Smart Classrooms</p>
                <p className="text-[10px] text-slate-500">High-speed fiber & smart tools</p>
              </div>
            </div>
          </div>

          {/* Right Column: 6 Feature Cards */}
          <div className="lg:col-span-7 grid grid-cols-1 sm:grid-cols-2 gap-5">
            {WHY_NEXUS_FEATURES.map((feature) => (
              <button
                key={feature.id}
                type="button"
                onClick={() => setSelectedFeature(feature)}
                className="bg-white rounded-2xl p-6 border border-slate-200 shadow-sm hover:shadow-md flex flex-col justify-between group text-left cursor-pointer transition-all"
              >
                <div>
                  <div className="flex items-center justify-between mb-4">
                    <div className="p-3 rounded-xl bg-sky-50 border border-sky-100 group-hover:scale-110 transition-all">
                      {iconMap[feature.icon]}
                    </div>
                    <CheckCircle2 className="w-4 h-4 text-sky-600/60 group-hover:text-sky-600 transition-colors" />
                  </div>

                  <h3 className="text-lg font-bold text-[#0B1A30] group-hover:text-sky-800 transition-colors">
                    {feature.title}
                  </h3>

                  <p className="text-xs sm:text-sm text-slate-600 mt-2 leading-relaxed font-normal">
                    {feature.description}
                  </p>
                </div>

                <div className="mt-4 pt-3 border-t border-slate-100 flex items-center gap-1.5 text-xs text-sky-700 font-semibold group-hover:text-sky-900">
                  <span>Explore facility</span>
                  <span className="group-hover:translate-x-1 transition-transform">→</span>
                </div>
              </button>
            ))}
          </div>

        </div>

      </div>

      {/* Interactive Facility Feature Modal */}
      {selectedFeature && detail && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/50 backdrop-blur-sm animate-in fade-in duration-200">
          <div className="bg-white w-full max-w-lg rounded-3xl p-6 border border-slate-200 shadow-2xl relative overflow-hidden text-slate-900">
            <div className="flex items-center justify-between border-b border-slate-100 pb-3 mb-4">
              <div className="flex items-center gap-2">
                <div className="p-2 rounded-xl bg-sky-50 border border-sky-200">
                  {iconMap[selectedFeature.icon]}
                </div>
                <div>
                  <h3 className="text-base font-bold text-[#0B1A30]">{selectedFeature.title}</h3>
                  <p className="text-[11px] text-sky-800 font-mono">Nexus Campus Facilities</p>
                </div>
              </div>
              <button
                type="button"
                onClick={() => setSelectedFeature(null)}
                className="p-1.5 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-700"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            <div className="space-y-4">
              <div className="p-4 rounded-2xl bg-sky-50 border border-sky-200">
                <p className="text-xs text-sky-900 italic font-medium">
                  "{detail.quote}"
                </p>
              </div>

              <p className="text-xs text-slate-600 leading-relaxed">
                {selectedFeature.description}
              </p>

              <div className="space-y-2 pt-2 border-t border-slate-100">
                <p className="text-[11px] font-bold text-[#0B1A30] uppercase tracking-wider">Facility Highlights</p>
                {detail.specs.map((spec, idx) => (
                  <div key={idx} className="flex items-center gap-2 text-xs text-slate-700">
                    <CheckCircle2 className="w-3.5 h-3.5 text-sky-600 shrink-0" />
                    <span>{spec}</span>
                  </div>
                ))}
              </div>
            </div>

            <div className="mt-6 pt-3 border-t border-slate-100 flex justify-end">
              <button
                type="button"
                onClick={() => setSelectedFeature(null)}
                className="px-5 py-2 rounded-xl bg-[#0B1A30] hover:bg-slate-800 text-white font-bold text-xs"
              >
                Close Facility Overview
              </button>
            </div>
          </div>
        </div>
      )}

    </section>
  );
};

