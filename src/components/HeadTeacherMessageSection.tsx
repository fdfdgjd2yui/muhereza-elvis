import React from 'react';
import { Quote, Award, UserCheck } from 'lucide-react';

export const HeadTeacherMessageSection: React.FC = () => {
  return (
    <section id="head-teacher" className="py-20 bg-white text-slate-900 border-t border-slate-200 relative overflow-hidden">
      {/* Background ambient lighting */}
      <div className="absolute top-1/2 left-0 -translate-y-1/2 w-96 h-96 bg-amber-100/40 rounded-full blur-[140px] pointer-events-none" />
      <div className="absolute top-10 right-0 w-96 h-96 bg-sky-100/40 rounded-full blur-[140px] pointer-events-none" />

      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="bg-gradient-to-br from-slate-50 via-white to-sky-50/30 border border-slate-200 rounded-3xl p-8 sm:p-12 lg:p-14 shadow-xl relative overflow-hidden">
          
          {/* Subtle Decorative Quote Icon */}
          <div className="absolute top-6 right-8 text-slate-200/60 pointer-events-none">
            <Quote className="w-28 h-28 sm:w-36 sm:h-36 -rotate-12" />
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
            
            {/* Left/Head Teacher Profile Avatar */}
            <div className="lg:col-span-4 flex flex-col items-center text-center">
              <div className="relative">
                <div className="w-36 h-36 sm:w-44 sm:h-44 rounded-3xl bg-gradient-to-br from-[#0B1A30] to-slate-800 border-4 border-white shadow-xl flex items-center justify-center text-amber-400 overflow-hidden">
                  <UserCheck className="w-20 h-20 sm:w-24 sm:h-24 text-amber-400" />
                </div>
                <div className="absolute -bottom-3 -right-3 bg-amber-500 text-white p-2.5 rounded-2xl shadow-lg border-2 border-white">
                  <Award className="w-6 h-6" />
                </div>
              </div>

              <div className="mt-5 space-y-1">
                <h3 className="text-xl sm:text-2xl font-black text-[#0B1A30] heading-font">
                  Muhereza Elvis
                </h3>
                <p className="text-xs font-extrabold text-amber-600 uppercase tracking-widest">
                  Head Teacher
                </p>
                <div className="inline-flex items-center gap-1.5 px-3 py-1 mt-2 rounded-full bg-slate-200/70 text-slate-700 text-[11px] font-semibold">
                  <span>Nexus Academy Administration</span>
                </div>
              </div>
            </div>

            {/* Right/Message Content */}
            <div className="lg:col-span-8 space-y-6">
              
              <div className="space-y-2">
                <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-amber-100 border border-amber-300 text-amber-900 text-xs font-bold uppercase tracking-widest">
                  Official School Address
                </div>
                <h2 className="text-3xl sm:text-4xl font-black text-[#0B1A30] heading-font">
                  Message from the Head Teacher
                </h2>
                <h3 className="text-lg sm:text-xl font-bold text-sky-800">
                  Welcome to Our School
                </h3>
              </div>

              <div className="space-y-4 text-slate-700 text-sm sm:text-base leading-relaxed font-normal">
                <p>Dear Parents, Students, and Visitors,</p>

                <p>
                  It is my pleasure to welcome you to our school website. Our school is committed to providing quality education in a safe, disciplined, and supportive learning environment where every student is encouraged to discover and develop their full potential.
                </p>

                <p>
                  We believe that education goes beyond the classroom. Through academics, sports, leadership, and co-curricular activities, we prepare our learners to become responsible, confident, and successful members of society.
                </p>

                <p>
                  I thank our dedicated teachers, supportive parents, and hardworking students for their continued commitment to excellence. Together, we shall continue to build a brighter future for every learner.
                </p>

                <p>
                  Thank you for visiting our website. We look forward to welcoming you to our school family.
                </p>
              </div>

              {/* Official Signature line */}
              <div className="pt-4 border-t border-slate-200/80">
                <p className="text-base font-extrabold text-[#0B1A30]">Muhereza Elvis</p>
                <p className="text-xs font-semibold text-slate-500 italic">Head Teacher</p>
              </div>

            </div>

          </div>

        </div>
      </div>
    </section>
  );
};
