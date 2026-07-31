import React from 'react';
import { TEACHERS } from '../data/schoolData';
import { Award, GraduationCap, Users, BookOpen } from 'lucide-react';

export const TeachersSection: React.FC = () => {
  return (
    <section id="teachers" className="py-24 bg-[#07111F] relative overflow-hidden border-t border-white/10">
      
      {/* Background radial glow */}
      <div className="absolute bottom-10 left-10 w-96 h-96 rounded-full bg-blue-600/10 blur-[140px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        <div className="text-center max-w-3xl mx-auto mb-16 space-y-3">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full glass-card border border-[#D4AF37]/30 text-amber-300 text-xs font-bold uppercase tracking-widest">
            <Users className="w-3.5 h-3.5 text-[#D4AF37]" />
            Faculty & Mentors
          </div>
          <h2 className="text-3xl sm:text-5xl font-extrabold text-white heading-font">
            Meet Our <span className="gold-gradient-text">Master Educators</span>
          </h2>
          <p className="text-gray-300 text-base sm:text-lg">
            World-class PhD & Master’s qualified scholars passionate about nurturing intellect, character, and global vision.
          </p>
        </div>

        {/* Teachers Large Portraits Grid with Hover Card Reveal */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {TEACHERS.map((teacher) => (
            <div
              key={teacher.id}
              className="group relative rounded-3xl overflow-hidden glass-card border border-white/15 hover:border-[#D4AF37]/50 transition-all duration-500 shadow-2xl flex flex-col"
            >
              {/* Clean Faculty Header Container (No Photo Images) */}
              <div className="relative p-6 bg-gradient-to-br from-[#10253C] via-[#0D1F33] to-[#07111F] border-b border-white/10 flex flex-col justify-between min-h-[180px]">
                {/* Badge top right */}
                <div className="self-end px-2.5 py-1 rounded-full bg-black/60 backdrop-blur-md border border-white/20 text-[10px] font-bold text-amber-300">
                  {teacher.experience}
                </div>

                {/* Avatar Icon / Initial */}
                <div className="w-14 h-14 rounded-2xl bg-[#D4AF37]/20 border border-[#D4AF37]/40 flex items-center justify-center text-amber-300 text-xl font-black shadow-lg">
                  {teacher.name.split(' ').map(n => n[0]).join('')}
                </div>

                {/* Overlay Info */}
                <div className="mt-4">
                  <span className="text-[10px] font-extrabold uppercase tracking-widest text-[#D4AF37] bg-black/40 px-2 py-0.5 rounded backdrop-blur-md border border-amber-500/20">
                    {teacher.subject}
                  </span>
                  <h3 className="text-lg font-bold text-white mt-2 leading-snug">
                    {teacher.name}
                  </h3>
                  <p className="text-xs text-gray-300 font-medium">
                    {teacher.role}
                  </p>
                </div>
              </div>

              {/* Hover Full Reveal Drawer */}
              <div className="p-5 bg-[#10253C] border-t border-white/10 space-y-3 flex-grow flex flex-col justify-between">
                <div>
                  <div className="flex items-start gap-2 text-xs text-amber-200 mb-2">
                    <GraduationCap className="w-4 h-4 text-[#D4AF37] shrink-0 mt-0.5" />
                    <span className="font-semibold">{teacher.qualification}</span>
                  </div>
                  <p className="text-xs text-gray-300 leading-relaxed italic">
                    "{teacher.bio}"
                  </p>
                </div>

                <div className="pt-3 border-t border-white/10 flex items-center justify-between text-[11px] text-gray-400">
                  <span>Nexus Faculty</span>
                  <span className="text-[#D4AF37] font-semibold group-hover:underline">Contact Office →</span>
                </div>
              </div>

            </div>
          ))}
        </div>

      </div>
    </section>
  );
};
