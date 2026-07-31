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
    specs: ['AI-Assisted Study Advisory', 'Real-time Cognitive Pace Analytics', 'Personalized UNEB Revision Dashboards'],
    quote: 'Adapting continuous assessment to cultivate every scholar’s natural intelligence.',
    image: 'https://images.unsplash.com/photo-1581092335397-9583fe92d232?q=80&w=1200&auto=format&fit=crop'
  },
  '2': {
    specs: ['Ergonomic Acoustic Tuning', 'Interactive 4K Multi-touch Boards', '1Gbps High-Speed Fiber Mesh'],
    quote: 'Designed for effortless visual clarity and collaborative student projects.',
    image: 'https://images.unsplash.com/photo-1509062522246-3755977927d7?q=80&w=1200&auto=format&fit=crop'
  },
  '3': {
    specs: ['Industrial Robotics Workbenches', 'Biotech Gene Amplification Units', 'Advanced Spectrometry Equipment'],
    quote: 'Hands-on experimentation matching premier international university research labs.',
    image: 'https://images.unsplash.com/photo-1532094349884-543bc11b234d?q=80&w=1200&auto=format&fit=crop'
  },
  '4': {
    specs: ['150,000+ Digital Titles', 'JSTOR Academic Journal Access', 'Acoustically Isolated Focus Pods'],
    quote: 'Comprehensive digital research repositories for deep academic thesis work.',
    image: 'https://images.unsplash.com/photo-1524995997946-a1c2e315a42f?q=80&w=1200&auto=format&fit=crop'
  },
  '5': {
    specs: ['FIFA-Standard Synthetic Pitch', 'Heated 50m Competition Pool', 'Multi-sport Indoor Gymnasium'],
    quote: 'Nurturing physical vitality, teamwork, and championship athletic resilience.',
    image: 'https://images.unsplash.com/photo-1530549387789-4c1017266635?q=80&w=1200&auto=format&fit=crop'
  },
  '6': {
    specs: ['Global Youth Diplomacy Forum', 'Community Impact Grants', 'Oxford-Style Debate Society'],
    quote: 'Instilling ethical integrity, public service values, and articulate speech.',
    image: 'https://images.unsplash.com/photo-1541829070764-84a7d30dd3f3?q=80&w=1200&auto=format&fit=crop'
  }
};

export const WhyNexusSection: React.FC = () => {
  const [selectedFeature, setSelectedFeature] = useState<typeof WHY_NEXUS_FEATURES[0] | null>(null);

  const detail = selectedFeature ? FEATURE_DETAILS[selectedFeature.id] : null;

  return (
    <section id="why-nexus" className="py-24 bg-[#07111F] relative overflow-hidden">
      
      {/* Background glow orb */}
      <div className="absolute -top-24 right-0 w-96 h-96 rounded-full bg-sky-600/15 blur-[130px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        <div className="text-center max-w-3xl mx-auto mb-16 space-y-3">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full glass-card border border-sky-400/30 text-sky-300 text-xs font-bold uppercase tracking-widest">
            <Sparkles className="w-3.5 h-3.5 text-sky-400" />
            Educational Distinction
          </div>
          <h2 className="text-3xl sm:text-5xl font-extrabold text-white heading-font">
            Why Choose <span className="blue-gradient-text">Nexus Academy</span>
          </h2>
          <p className="text-gray-300 text-base sm:text-lg max-w-2xl mx-auto">
            Combining rigorous national academics with STEM innovation and holistic character formation for both UCE & UACE.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          
          {/* Left Column: Campus Spotlight Glass Box (No External Photos) */}
          <div className="lg:col-span-5 relative">
            <div className="relative rounded-3xl overflow-hidden glass-card p-6 border border-sky-400/30 shadow-2xl h-[480px] flex flex-col justify-between bg-gradient-to-br from-[#10253C] via-[#0B1A2F] to-[#040A14]">
              <div className="flex justify-between items-center">
                <span className="px-3 py-1 rounded-full bg-sky-500/20 border border-sky-400/30 text-[10px] font-bold text-sky-300 uppercase tracking-widest">
                  Nexus Campus
                </span>
                <Sparkles className="w-6 h-6 text-sky-400" />
              </div>

              <div className="my-auto text-center space-y-3 py-6">
                <div className="w-16 h-16 rounded-2xl bg-sky-500/20 border border-sky-400/30 flex items-center justify-center mx-auto text-sky-300">
                  <Monitor className="w-8 h-8" />
                </div>
                <h3 className="text-xl font-bold text-white heading-font">Future-Ready Architecture</h3>
                <p className="text-xs text-sky-200 max-w-xs mx-auto leading-relaxed">
                  Designed for student collaboration, academic focus, and creative spark.
                </p>
              </div>

              <div className="p-4 rounded-2xl glass-card border border-white/10 bg-black/40">
                <p className="text-xs font-semibold text-sky-300 uppercase tracking-wider">Campus Facilities</p>
                <p className="text-xs font-bold text-white mt-0.5">Dual Curriculums & Modern Science Labs</p>
              </div>
            </div>

            {/* Accent badge card */}
            <div className="absolute -bottom-6 -right-6 hidden sm:flex p-4 rounded-2xl glass-card border border-sky-400/40 shadow-2xl bg-[#10253C]/90 max-w-[200px]">
              <div className="space-y-1">
                <p className="text-2xl font-black text-sky-400 heading-font">100%</p>
                <p className="text-xs font-semibold text-white">Digital Smart Classrooms</p>
                <p className="text-[10px] text-gray-400">High-speed fiber & smart tools</p>
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
                className="glass-card glass-card-hover rounded-2xl p-6 border border-white/12 flex flex-col justify-between group text-left cursor-pointer transition-all"
              >
                <div>
                  <div className="flex items-center justify-between mb-4">
                    <div className="p-3 rounded-xl bg-white/5 border border-white/10 group-hover:scale-110 group-hover:border-sky-400/40 transition-all">
                      {iconMap[feature.icon]}
                    </div>
                    <CheckCircle2 className="w-4 h-4 text-sky-400/40 group-hover:text-sky-400 transition-colors" />
                  </div>

                  <h3 className="text-lg font-bold text-white group-hover:text-sky-200 transition-colors">
                    {feature.title}
                  </h3>

                  <p className="text-xs sm:text-sm text-gray-300 mt-2 leading-relaxed font-normal">
                    {feature.description}
                  </p>
                </div>

                <div className="mt-4 pt-3 border-t border-white/10 flex items-center gap-1.5 text-xs text-sky-300 font-semibold opacity-80 group-hover:opacity-100">
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
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md animate-in fade-in duration-200">
          <div className="glass-card w-full max-w-lg rounded-3xl p-6 border border-sky-400/30 shadow-2xl relative overflow-hidden bg-[#07111F]/95">
            <div className="flex items-center justify-between border-b border-white/10 pb-3 mb-4">
              <div className="flex items-center gap-2">
                <div className="p-2 rounded-xl bg-sky-500/20 border border-sky-400/30">
                  {iconMap[selectedFeature.icon]}
                </div>
                <div>
                  <h3 className="text-base font-bold text-white">{selectedFeature.title}</h3>
                  <p className="text-[11px] text-sky-300 font-mono">Nexus Campus Facilities</p>
                </div>
              </div>
              <button
                type="button"
                onClick={() => setSelectedFeature(null)}
                className="p-1.5 rounded-xl bg-white/10 hover:bg-white/20 text-white"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            <div className="space-y-4">
              <div className="p-4 rounded-2xl bg-sky-500/10 border border-sky-400/30">
                <p className="text-xs text-sky-200 italic font-medium">
                  "{detail.quote}"
                </p>
              </div>

              <p className="text-xs text-gray-300 leading-relaxed">
                {selectedFeature.description}
              </p>

              <div className="space-y-2 pt-2 border-t border-white/10">
                <p className="text-[11px] font-bold text-sky-300 uppercase tracking-wider">Facility Highlights</p>
                {detail.specs.map((spec, idx) => (
                  <div key={idx} className="flex items-center gap-2 text-xs text-white">
                    <CheckCircle2 className="w-3.5 h-3.5 text-sky-400 shrink-0" />
                    <span>{spec}</span>
                  </div>
                ))}
              </div>
            </div>

            <div className="mt-6 pt-3 border-t border-white/10 flex justify-end">
              <button
                type="button"
                onClick={() => setSelectedFeature(null)}
                className="px-5 py-2 rounded-xl bg-sky-500 hover:bg-sky-400 text-slate-950 font-bold text-xs"
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

