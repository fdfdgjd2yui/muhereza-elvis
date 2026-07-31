import React, { useState, useEffect } from 'react';
import { HERO_SLIDES } from '../data/schoolData';
import { Sparkles, Compass, Send, Award, GraduationCap } from 'lucide-react';

interface HeroSectionProps {
  onOpenApply: () => void;
  scrollToSection: (id: string) => void;
  onSelectResultsPortal: () => void;
}

export const HeroSection: React.FC<HeroSectionProps> = ({
  onOpenApply,
  scrollToSection,
  onSelectResultsPortal
}) => {
  const [currentSlideIndex, setCurrentSlideIndex] = useState(0);
  const [isPaused, setIsPaused] = useState(false);

  // 5-second automatic image loop with Ken Burns zoom
  useEffect(() => {
    if (isPaused) return;
    const interval = setInterval(() => {
      setCurrentSlideIndex((prevIndex) => (prevIndex + 1) % HERO_SLIDES.length);
    }, 5000);

    return () => clearInterval(interval);
  }, [isPaused]);

  const currentSlide = HERO_SLIDES[currentSlideIndex];

  return (
    <section className="relative w-full min-h-screen flex items-center justify-center pt-24 pb-16 overflow-hidden bg-[#07111F]">
      
      {/* Clean Ambient Glass Grid Background (No Photo Images) */}
      <div className="absolute inset-0 z-0 overflow-hidden bg-gradient-to-b from-[#0B1A2F] via-[#07111F] to-[#040A14]">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-sky-500/10 via-transparent to-transparent" />
      </div>

      {/* Large Blurred Glowing Light Blue Orbs in Background */}
      <div className="absolute -top-24 -left-24 w-96 h-96 bg-sky-600/20 rounded-full blur-[120px] pointer-events-none" />
      <div className="absolute top-1/2 -right-24 w-[500px] h-[500px] bg-blue-500/15 rounded-full blur-[140px] pointer-events-none" />
      <div className="absolute -bottom-24 left-1/3 w-80 h-80 bg-cyan-500/15 rounded-full blur-[100px] pointer-events-none" />
      
      {/* Background Mesh Grid Pattern */}
      <div className="absolute inset-0 bg-mesh-pattern opacity-[0.05] pointer-events-none" />

      {/* Main Hero Grid Content */}
      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          
          {/* Left Column: Heading & Call To Action */}
          <div className="lg:col-span-7 space-y-6 text-left">
            
            {/* Light Blue Badge Indicator */}
            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-sky-500/20 border border-sky-400/40 shadow-xl animate-fade-in backdrop-blur-md">
              <span className="w-2 h-2 bg-sky-400 rounded-full animate-ping" />
              <span className="text-[10px] sm:text-xs font-bold uppercase tracking-widest text-sky-300">
                {currentSlide.badge}
              </span>
            </div>

            {/* Main Headline */}
            <div className="space-y-3">
              <h1 className="text-4xl sm:text-6xl lg:text-7xl font-extrabold tracking-tight text-white leading-[1.05] heading-font">
                Building <br />
                <span className="blue-gradient-text">Tomorrow's Leaders</span>.
              </h1>
              <p className="text-lg sm:text-2xl text-sky-100 font-light max-w-2xl leading-relaxed">
                Premium Education for Future Innovators & Visionaries
              </p>
            </div>

            <p className="text-sm sm:text-base text-gray-300 max-w-xl font-normal leading-relaxed">
              Fostering academic rigor, STEM exploration, and holistic leadership excellence in an environment designed for global impact.
            </p>

            {/* Action Buttons */}
            <div className="flex flex-wrap items-center gap-4 pt-2">
              <button
                onClick={onOpenApply}
                className="group relative inline-flex items-center justify-center gap-3 px-8 py-4 rounded-full bg-gradient-to-r from-sky-400 via-blue-500 to-cyan-400 text-slate-950 font-extrabold text-base shadow-lg shadow-sky-500/25 hover:scale-105 active:scale-95 transition-all duration-300"
              >
                <Send className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                <span>Apply Now</span>
              </button>

              <button
                onClick={() => scrollToSection('programs')}
                className="inline-flex items-center justify-center gap-3 px-8 py-4 rounded-full bg-white/10 border border-white/20 backdrop-blur-md text-white font-bold text-base hover:bg-white/20 hover:border-sky-400/50 transition-all duration-300"
              >
                <Compass className="w-5 h-5 text-sky-400" />
                <span>Explore Curriculum</span>
              </button>

              <button
                onClick={onSelectResultsPortal}
                className="inline-flex items-center justify-center gap-2 px-6 py-4 rounded-full bg-sky-500/10 hover:bg-sky-500/20 border border-sky-400/30 text-sky-300 font-semibold text-sm backdrop-blur-md transition-all"
              >
                <span>Check UNEB Results</span>
              </button>
            </div>

            {/* Slide Automatic Loop Progress Dots Only (No buttons, no 03/04 indicator) */}
            <div className="flex items-center gap-2 pt-4">
              {HERO_SLIDES.map((_, idx) => (
                <button
                  key={idx}
                  onClick={() => setCurrentSlideIndex(idx)}
                  aria-label={`Go to slide ${idx + 1}`}
                  className={`h-2 rounded-full transition-all duration-500 ${
                    idx === currentSlideIndex
                      ? 'w-10 bg-sky-400 shadow-md shadow-sky-400/50'
                      : 'w-2 bg-white/30 hover:bg-white/60'
                  }`}
                />
              ))}
            </div>

          </div>

          {/* Right Column: Hero Student Portrait & Floating Glass Cards */}
          <div className="lg:col-span-5 relative flex justify-center items-center">
            
            {/* Center Container with Glowing Light Blue Glass Border (No External Photos) */}
            <div className="relative w-full max-w-md aspect-[4/5] rounded-3xl overflow-hidden glass-card p-6 border border-sky-400/30 shadow-2xl blue-border-glow flex flex-col justify-between bg-gradient-to-br from-[#10253C] via-[#0B1A2F] to-[#040A14]">
              <div className="flex justify-between items-center">
                <span className="px-3 py-1 rounded-full bg-sky-500/20 border border-sky-400/30 text-[10px] font-bold text-sky-300 uppercase tracking-widest">
                  Nexus Academy
                </span>
                <GraduationCap className="w-8 h-8 text-sky-400" />
              </div>

              <div className="my-auto text-center space-y-4 py-8">
                <div className="w-20 h-20 rounded-2xl bg-sky-500/20 border border-sky-400/40 flex items-center justify-center mx-auto text-sky-400">
                  <GraduationCap className="w-10 h-10" />
                </div>
                <h3 className="text-2xl font-bold text-white heading-font">Nexus Excellence</h3>
                <p className="text-xs text-sky-200 max-w-xs mx-auto leading-relaxed">
                  Fostering academic rigor, STEM exploration, and character leadership.
                </p>
              </div>

              <div className="p-4 rounded-2xl glass-card border border-white/10 bg-black/40">
                <p className="text-xs font-semibold text-sky-300 uppercase tracking-wider">Nexus Scholar Focus</p>
                <p className="text-sm font-bold text-white mt-0.5">Empowered for University & Beyond</p>
              </div>
            </div>

            {/* Floating Glass Metric Card 1 (Top Left) - 90% Passing Excellence */}
            <div className="absolute -top-4 -left-6 sm:-left-10 p-4 rounded-2xl glass-card border border-sky-400/30 shadow-2xl animate-float max-w-[170px] bg-[#10253C]/90">
              <div className="flex items-center gap-2 mb-1">
                <Award className="w-5 h-5 text-sky-400" />
                <span className="text-xl font-extrabold text-white">90%</span>
              </div>
              <p className="text-[11px] font-semibold text-gray-200 leading-tight">
                Passing Excellence
              </p>
              <p className="text-[9px] text-sky-300 mt-0.5">National & International</p>
            </div>

            {/* Floating Glass Metric Card 2 (Right Middle) - 17 Years Excellence */}
            <div className="absolute top-1/3 -right-6 sm:-right-10 p-4 rounded-2xl glass-card border border-sky-400/30 shadow-2xl animate-float-reverse max-w-[170px] bg-[#10253C]/90">
              <div className="flex items-center gap-2 mb-1">
                <GraduationCap className="w-5 h-5 text-sky-400" />
                <span className="text-xl font-extrabold text-white">17+</span>
              </div>
              <p className="text-[11px] font-semibold text-gray-200 leading-tight">
                Years Excellence
              </p>
              <p className="text-[9px] text-sky-300 mt-0.5">Established 2009</p>
            </div>

          </div>

        </div>
      </div>

    </section>
  );
};

