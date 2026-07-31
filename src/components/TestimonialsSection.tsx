import React, { useState } from 'react';
import { TESTIMONIALS } from '../data/schoolData';
import { Star, ChevronLeft, ChevronRight, Quote, MessageSquare } from 'lucide-react';

export const TestimonialsSection: React.FC = () => {
  const [currentIndex, setCurrentIndex] = useState(0);

  const prevSlide = () => {
    setCurrentIndex((prev) => (prev - 1 + TESTIMONIALS.length) % TESTIMONIALS.length);
  };

  const nextSlide = () => {
    setCurrentIndex((prev) => (prev + 1) % TESTIMONIALS.length);
  };

  const testimonial = TESTIMONIALS[currentIndex];

  return (
    <section id="testimonials" className="py-24 bg-[#07111F] relative overflow-hidden border-t border-white/10">
      
      {/* Background glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[35rem] h-[20rem] bg-blue-600/10 blur-[140px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        <div className="text-center max-w-3xl mx-auto mb-16 space-y-3">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full glass-card border border-[#D4AF37]/30 text-amber-300 text-xs font-bold uppercase tracking-widest">
            <MessageSquare className="w-3.5 h-3.5 text-[#D4AF37]" />
            Voices of Nexus
          </div>
          <h2 className="text-3xl sm:text-5xl font-extrabold text-white heading-font">
            Parent & Alumni <span className="gold-gradient-text">Testimonials</span>
          </h2>
          <p className="text-gray-300 text-base sm:text-lg">
            Hear from parents, top UNEB performers, and alumni making strides across Ivy League universities and global tech firms.
          </p>
        </div>

        {/* Large Featured Testimonial Glass Card */}
        <div className="max-w-4xl mx-auto glass-card rounded-3xl p-8 sm:p-12 border border-white/20 shadow-2xl relative">
          
          <Quote className="absolute top-8 right-8 w-16 h-16 text-[#D4AF37]/15 pointer-events-none" />

          <div className="flex flex-col sm:flex-row items-center sm:items-start gap-8">
            
            {/* Avatar Icon Badge (No Photo Images) */}
            <div className="w-20 h-20 rounded-2xl bg-[#D4AF37]/20 border border-[#D4AF37]/50 flex items-center justify-center text-[#D4AF37] font-black text-2xl shrink-0 shadow-lg">
              {testimonial.name.split(' ').map(n => n[0]).join('')}
            </div>

            {/* Content */}
            <div className="space-y-4 text-center sm:text-left flex-1">
              
              {/* Star Rating */}
              <div className="flex items-center justify-center sm:justify-start gap-1">
                {[...Array(testimonial.rating)].map((_, i) => (
                  <Star key={i} className="w-5 h-5 fill-[#D4AF37] text-[#D4AF37]" />
                ))}
              </div>

              {/* Quote Comment */}
              <p className="text-lg sm:text-xl text-white font-medium italic leading-relaxed">
                "{testimonial.comment}"
              </p>

              {/* Author Details */}
              <div>
                <h3 className="text-lg font-bold text-white leading-tight">
                  {testimonial.name}
                </h3>
                <p className="text-xs text-[#D4AF37] font-semibold mt-0.5">
                  {testimonial.role} • <span className="text-gray-400">{testimonial.year}</span>
                </p>
              </div>

            </div>

          </div>

          {/* Slider Controls */}
          <div className="flex items-center justify-between pt-8 mt-8 border-t border-white/10">
            <div className="flex items-center gap-2">
              {TESTIMONIALS.map((_, idx) => (
                <button
                  key={idx}
                  onClick={() => setCurrentIndex(idx)}
                  className={`h-2 rounded-full transition-all duration-300 ${
                    idx === currentIndex ? 'w-8 bg-[#D4AF37]' : 'w-2 bg-white/20'
                  }`}
                />
              ))}
            </div>

            <div className="flex items-center gap-2">
              <button
                onClick={prevSlide}
                aria-label="Previous testimonial"
                className="p-3 rounded-xl glass-card hover:bg-white/15 text-white transition-colors"
              >
                <ChevronLeft className="w-5 h-5" />
              </button>
              <button
                onClick={nextSlide}
                aria-label="Next testimonial"
                className="p-3 rounded-xl glass-card hover:bg-white/15 text-white transition-colors"
              >
                <ChevronRight className="w-5 h-5" />
              </button>
            </div>
          </div>

        </div>

      </div>
    </section>
  );
};
