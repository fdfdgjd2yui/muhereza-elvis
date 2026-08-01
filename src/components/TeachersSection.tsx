import React from 'react';
import { TEACHERS } from '../data/schoolData';
import { Award, GraduationCap, Users, BookOpen } from 'lucide-react';

export const TeachersSection: React.FC = () => {
  return (
    <section id="teachers" className="py-24 bg-white text-slate-900 relative overflow-hidden border-t border-slate-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        <div className="text-center max-w-3xl mx-auto mb-16 space-y-3">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-amber-50 border border-amber-300 text-amber-900 text-xs font-bold uppercase tracking-wider">
            <Users className="w-4 h-4 text-amber-600" />
            Faculty & Academic Mentors
          </div>
          <h2 className="text-3xl sm:text-5xl font-black text-[#0B1A30] tracking-tight heading-font">
            Meet Our <span className="text-amber-600">Master Educators</span>
          </h2>
          <p className="text-slate-600 text-base sm:text-lg">
            PhD & Master’s qualified scholars passionate about nurturing intellect, research, and leadership.
          </p>
        </div>

        {/* Teachers Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {TEACHERS.map((teacher) => (
            <div
              key={teacher.id}
              className="group relative rounded-3xl overflow-hidden bg-slate-50 border border-slate-200 hover:border-amber-500 transition-all duration-300 shadow-md hover:shadow-xl flex flex-col justify-between"
            >
              <div className="p-6 bg-[#0B1A30] text-white flex flex-col justify-between min-h-[170px] relative">
                <div className="self-end px-2.5 py-1 rounded-full bg-amber-500 text-slate-950 text-[10px] font-black uppercase">
                  {teacher.experience}
                </div>

                <div className="w-14 h-14 rounded-2xl bg-amber-400 text-slate-950 flex items-center justify-center text-xl font-black shadow-md">
                  {teacher.name.split(' ').map(n => n[0]).join('')}
                </div>

                <div className="mt-3">
                  <span className="text-[10px] font-extrabold uppercase tracking-widest text-amber-300">
                    {teacher.subject}
                  </span>
                  <h3 className="text-base font-black text-white leading-snug">
                    {teacher.name}
                  </h3>
                  <p className="text-xs text-slate-300">
                    {teacher.role}
                  </p>
                </div>
              </div>

              <div className="p-5 space-y-3 flex-grow flex flex-col justify-between bg-white text-slate-900">
                <div>
                  <div className="flex items-start gap-2 text-xs text-amber-700 mb-2 font-bold">
                    <GraduationCap className="w-4 h-4 text-amber-600 shrink-0 mt-0.5" />
                    <span>{teacher.qualification}</span>
                  </div>
                  <p className="text-xs text-slate-600 leading-relaxed italic">
                    "{teacher.bio}"
                  </p>
                </div>

                <div className="pt-3 border-t border-slate-100 flex items-center justify-between text-[11px] text-slate-500 font-semibold">
                  <span>Nexus Senior Faculty</span>
                  <span className="text-amber-600 group-hover:underline">Contact Office →</span>
                </div>
              </div>

            </div>
          ))}
        </div>

      </div>
    </section>
  );
};
