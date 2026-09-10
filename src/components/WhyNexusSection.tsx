import React, { useState, useEffect } from 'react';
import { WHY_NEXUS_FEATURES, INITIAL_FACILITY_ITEMS } from '../data/schoolData';
import { FacilityItem } from '../types';
import { subscribeToFacilities } from '../lib/firebase';
import { FacilityDetailModal } from './FacilityDetailModal';
import { Award, Monitor, FlaskConical, BookOpen, Trophy, HeartHandshake, CheckCircle2 } from 'lucide-react';

const iconMap: Record<string, React.ReactNode> = {
  Award: <Award className="w-5 h-5 text-sky-400" />,
  Monitor: <Monitor className="w-5 h-5 text-sky-400" />,
  FlaskConical: <FlaskConical className="w-5 h-5 text-cyan-400" />,
  BookOpen: <BookOpen className="w-5 h-5 text-blue-400" />,
  Trophy: <Trophy className="w-5 h-5 text-sky-300" />,
  HeartHandshake: <HeartHandshake className="w-5 h-5 text-teal-300" />
};

export const WhyNexusSection: React.FC = () => {
  const [facilities, setFacilities] = useState<FacilityItem[]>(() => {
    const saved = localStorage.getItem('nexus_facility_items');
    if (saved) {
      try {
        const parsed = JSON.parse(saved);
        if (Array.isArray(parsed) && parsed.length > 0) return parsed;
      } catch (e) {
        console.warn('Failed to parse saved facilities', e);
      }
    }
    return INITIAL_FACILITY_ITEMS;
  });

  const [selectedFacility, setSelectedFacility] = useState<FacilityItem | null>(null);

  useEffect(() => {
    const unsubscribe = subscribeToFacilities((data) => {
      if (data && data.length > 0) {
        setFacilities(data);
      }
    });

    const handleUpdateEvent = () => {
      const saved = localStorage.getItem('nexus_facility_items');
      if (saved) {
        try {
          const parsed = JSON.parse(saved);
          if (Array.isArray(parsed) && parsed.length > 0) setFacilities(parsed);
        } catch (e) {}
      }
    };

    window.addEventListener('nexus_facilities_updated', handleUpdateEvent);

    return () => {
      unsubscribe();
      window.removeEventListener('nexus_facilities_updated', handleUpdateEvent);
    };
  }, []);

  const handleOpenFacility = (featureId: string) => {
    const found = facilities.find((f) => f.id === featureId) || INITIAL_FACILITY_ITEMS.find((f) => f.id === featureId);
    if (found) {
      setSelectedFacility(found);
    }
  };

  return (
    <section id="why-nexus" className="py-24 bg-slate-50 relative overflow-hidden text-slate-900 border-t border-slate-200">
      
      {/* Background glow orb */}
      <div className="absolute -top-24 right-0 w-96 h-96 rounded-full bg-sky-200/40 blur-[130px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        <div className="text-center max-w-3xl mx-auto mb-16 space-y-3">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-sky-100 border border-sky-300 text-sky-900 text-xs font-bold uppercase tracking-widest">
            <Award className="w-3.5 h-3.5 text-sky-700" />
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
                <Award className="w-6 h-6 text-sky-600" />
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
                onClick={() => handleOpenFacility(feature.id)}
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

      {/* Dedicated Visual Facility Detail Modal */}
      <FacilityDetailModal
        isOpen={!!selectedFacility}
        facility={selectedFacility}
        allFacilities={facilities}
        onClose={() => setSelectedFacility(null)}
        onSelectFacility={(fac) => setSelectedFacility(fac)}
      />

    </section>
  );
};

