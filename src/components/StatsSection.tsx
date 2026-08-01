import React, { useState, useEffect, useRef } from 'react';
import { GraduationCap, Users } from 'lucide-react';

export const StatsSection: React.FC = () => {
  const [studentsCount, setStudentsCount] = useState(0);
  const [staffCount, setStaffCount] = useState(0);
  const [hasAnimated, setHasAnimated] = useState(false);
  const sectionRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        const [entry] = entries;
        if (entry.isIntersecting && !hasAnimated) {
          setHasAnimated(true);

          const duration = 2000; // 2 seconds
          const startTime = performance.now();

          const animate = (currentTime: number) => {
            const elapsed = currentTime - startTime;
            const progress = Math.min(elapsed / duration, 1);

            // Smooth cubic ease out
            const easeProgress = 1 - Math.pow(1 - progress, 3);

            setStudentsCount(Math.floor(easeProgress * 1000));
            setStaffCount(Math.floor(easeProgress * 50));

            if (progress < 1) {
              requestAnimationFrame(animate);
            } else {
              setStudentsCount(1000);
              setStaffCount(50);
            }
          };

          requestAnimationFrame(animate);
        }
      },
      { threshold: 0.15 }
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => observer.disconnect();
  }, [hasAnimated]);

  return (
    <section ref={sectionRef} className="py-12 bg-slate-100/80 border-y border-slate-200 relative overflow-hidden">
      {/* Background ambient light */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-3/4 h-full bg-gradient-to-r from-sky-100/50 via-amber-50/40 to-sky-100/50 blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 lg:gap-8">
          
          {/* 1. Students Counter */}
          <div className="group relative bg-white/90 backdrop-blur-md rounded-3xl p-7 sm:p-9 border border-slate-200/80 shadow-md hover:shadow-xl hover:-translate-y-1 transition-all duration-300 overflow-hidden">
            <div className="absolute top-0 right-0 w-36 h-36 bg-amber-500/10 rounded-full blur-2xl group-hover:bg-amber-500/20 transition-all pointer-events-none" />
            
            <div className="flex items-center gap-6">
              <div className="w-16 h-16 sm:w-20 sm:h-20 rounded-2xl bg-gradient-to-br from-[#0B1A30] to-slate-800 flex items-center justify-center text-amber-400 shadow-md shrink-0 group-hover:scale-105 transition-transform">
                <GraduationCap className="w-9 h-9 sm:w-11 sm:h-11" />
              </div>
              <div>
                <div className="text-4xl sm:text-5xl lg:text-6xl font-black text-[#0B1A30] heading-font tracking-tight flex items-baseline gap-1">
                  <span>{studentsCount}</span>
                  <span className="text-amber-500 font-extrabold">+</span>
                </div>
                <p className="text-sm sm:text-base font-bold text-slate-700 mt-1 uppercase tracking-wider">
                  Students Enrolled
                </p>
                <p className="text-xs text-slate-500 mt-0.5">Active UCE & UACE Scholars across all streams</p>
              </div>
            </div>
          </div>

          {/* 2. Staff Counter */}
          <div className="group relative bg-white/90 backdrop-blur-md rounded-3xl p-7 sm:p-9 border border-slate-200/80 shadow-md hover:shadow-xl hover:-translate-y-1 transition-all duration-300 overflow-hidden">
            <div className="absolute top-0 right-0 w-36 h-36 bg-sky-500/10 rounded-full blur-2xl group-hover:bg-sky-500/20 transition-all pointer-events-none" />
            
            <div className="flex items-center gap-6">
              <div className="w-16 h-16 sm:w-20 sm:h-20 rounded-2xl bg-gradient-to-br from-[#0B1A30] to-slate-800 flex items-center justify-center text-sky-400 shadow-md shrink-0 group-hover:scale-105 transition-transform">
                <Users className="w-9 h-9 sm:w-11 sm:h-11" />
              </div>
              <div>
                <div className="text-4xl sm:text-5xl lg:text-6xl font-black text-[#0B1A30] heading-font tracking-tight flex items-baseline gap-1">
                  <span>{staffCount}</span>
                  <span className="text-sky-600 font-extrabold">+</span>
                </div>
                <p className="text-sm sm:text-base font-bold text-slate-700 mt-1 uppercase tracking-wider">
                  Teaching & Support Staff
                </p>
                <p className="text-xs text-slate-500 mt-0.5">Dedicated master educators & support professionals</p>
              </div>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
};
