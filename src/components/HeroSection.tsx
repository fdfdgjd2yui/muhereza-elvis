import React, { useState, useEffect } from 'react';
import { HERO_SLIDES } from '../data/schoolData';
import { Compass, Send, Award, GraduationCap } from 'lucide-react';

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
    <section className="relative w-full min-h-screen flex items-center justify-center pt-20 pb-16 overflow-hidden bg-white text-slate-900">
      
      {/* Clean Light Background Gradients */}
      <div className="absolute inset-0 z-0 overflow-hidden bg-slate-50">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-sky-100/70 via-white to-white" />
      </div>

      {/* Subtle Glowing Light Orbs in Background */}
      <div className="absolute -top-24 -left-24 w-96 h-96 bg-sky-200/50 rounded-full blur-[120px] pointer-events-none" />
      <div className="absolute top-1/2 -right-24 w-[500px] h-[500px] bg-blue-100/40 rounded-full blur-[140px] pointer-events-none" />
      <div className="absolute -bottom-24 left-1/3 w-80 h-80 bg-cyan-100/40 rounded-full blur-[100px] pointer-events-none" />

      {/* Main Hero Grid Content */}
      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          
          {/* Left Column: Heading & Call To Action */}
          <div className="lg:col-span-7 space-y-6 text-left">
            
            {/* School Motto Badge */}
            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-sky-100 border border-sky-300 shadow-sm animate-fade-in">
              <span className="w-2 h-2 bg-sky-600 rounded-full animate-ping" />
              <span className="text-[10px] sm:text-xs font-bold uppercase tracking-widest text-sky-900">
                Nexus Academy — Motto: Excellence & Integrity
              </span>
            </div>

            {/* Main Headline */}
            <div className="space-y-3">
              <h1 className="text-4xl sm:text-6xl lg:text-7xl font-extrabold tracking-tight text-[#0B1A30] leading-[1.05] heading-font">
                Nexus Academy <br />
                <span className="bg-gradient-to-r from-blue-700 via-sky-600 to-cyan-600 bg-clip-text text-transparent">
                  Building Tomorrow's Leaders
                </span>
              </h1>
              <p className="text-lg sm:text-2xl text-slate-700 font-medium max-w-2xl leading-relaxed">
                "Excellence and Integrity in Secondary Education"
              </p>
            </div>

            <p className="text-sm sm:text-base text-slate-600 max-w-xl font-normal leading-relaxed">
              Fostering academic rigor, STEM exploration, and holistic leadership excellence in an environment designed for global impact.
            </p>

            {/* Action Buttons */}
            <div className="flex flex-wrap items-center gap-4 pt-2">
              <button
                onClick={onOpenApply}
                className="group relative inline-flex items-center justify-center gap-3 px-8 py-4 rounded-full bg-[#0B1A30] text-white font-extrabold text-base shadow-lg hover:bg-slate-800 hover:scale-105 active:scale-95 transition-all duration-300"
              >
                <Send className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                <span>Apply Now</span>
              </button>

              <button
                onClick={() => scrollToSection('programs')}
                className="inline-flex items-center justify-center gap-3 px-8 py-4 rounded-full bg-white border border-slate-300 text-[#0B1A30] font-bold text-base shadow-sm hover:bg-slate-100 transition-all duration-300"
              >
                <Compass className="w-5 h-5 text-sky-600" />
                <span>Explore Curriculum</span>
              </button>

              <button
                onClick={onSelectResultsPortal}
                className="inline-flex items-center justify-center gap-2 px-6 py-4 rounded-full bg-sky-50 hover:bg-sky-100 border border-sky-300 text-sky-900 font-semibold text-sm transition-all"
              >
                <span>Check UNEB Results</span>
              </button>
            </div>

            {/* Slide Automatic Loop Progress Dots */}
            <div className="flex items-center gap-2 pt-4">
              {HERO_SLIDES.map((_, idx) => (
                <button
                  key={idx}
                  onClick={() => setCurrentSlideIndex(idx)}
                  aria-label={`Go to slide ${idx + 1}`}
                  className={`h-2 rounded-full transition-all duration-500 ${
                    idx === currentSlideIndex
                      ? 'w-10 bg-[#0B1A30]'
                      : 'w-2 bg-slate-300 hover:bg-slate-400'
                  }`}
                />
              ))}
            </div>

          </div>

          {/* Right Column: Hero Cards */}
          <div className="lg:col-span-5 relative flex justify-center items-center">
            
            {/* Center Container with Light Card Styling */}
            <div className="relative w-full max-w-md aspect-[4/5] rounded-3xl overflow-hidden p-6 border border-slate-200 shadow-xl flex flex-col justify-between bg-white text-slate-900">
              <div className="flex justify-between items-center">
                <span className="px-3 py-1 rounded-full bg-sky-100 border border-sky-300 text-[10px] font-bold text-sky-900 uppercase tracking-widest">
                  Nexus Academy
                </span>
                <GraduationCap className="w-8 h-8 text-sky-600" />
              </div>

              <div className="my-auto text-center space-y-4 py-8">
                <div className="w-20 h-20 rounded-2xl bg-sky-50 border border-sky-200 flex items-center justify-center mx-auto text-sky-700">
                  <GraduationCap className="w-10 h-10" />
                </div>
                <h3 className="text-2xl font-bold text-[#0B1A30] heading-font">Nexus Excellence</h3>
                <p className="text-xs text-slate-600 max-w-xs mx-auto leading-relaxed">
                  Fostering academic rigor, STEM exploration, and character leadership.
                </p>
              </div>

              <div className="p-4 rounded-2xl border border-slate-200 bg-slate-50">
                <p className="text-xs font-semibold text-sky-800 uppercase tracking-wider">Nexus Scholar Focus</p>
                <p className="text-sm font-bold text-[#0B1A30] mt-0.5">Empowered for University & Beyond</p>
              </div>
            </div>

            {/* Floating Metric Card 1 (Top Left) */}
            <div className="absolute -top-4 -left-6 sm:-left-10 p-4 rounded-2xl border border-slate-200 shadow-lg max-w-[170px] bg-white text-slate-900">
              <div className="flex items-center gap-2 mb-1">
                <Award className="w-5 h-5 text-sky-600" />
                <span className="text-xl font-extrabold text-[#0B1A30]">90%</span>
              </div>
              <p className="text-[11px] font-semibold text-slate-700 leading-tight">
                Passing Excellence
              </p>
              <p className="text-[9px] text-sky-700 font-medium mt-0.5">National & International</p>
            </div>

            {/* Floating Metric Card 2 (Right Middle) */}
            <div className="absolute top-1/3 -right-6 sm:-right-10 p-4 rounded-2xl border border-slate-200 shadow-lg max-w-[170px] bg-white text-slate-900">
              <div className="flex items-center gap-2 mb-1">
                <GraduationCap className="w-5 h-5 text-sky-600" />
                <span className="text-xl font-extrabold text-[#0B1A30]">17+</span>
              </div>
              <p className="text-[11px] font-semibold text-slate-700 leading-tight">
                Years Excellence
              </p>
              <p className="text-[9px] text-sky-700 font-medium mt-0.5">Established 2009</p>
            </div>

          </div>

        </div>
      </div>

    </section>
  );
};

