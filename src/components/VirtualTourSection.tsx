import React, { useState } from 'react';
import { Play, Compass, Volume2, VolumeX, Maximize2, Eye, Shield, GraduationCap } from 'lucide-react';

const TOUR_HOTSPOTS = [
  {
    id: '1',
    title: 'Robotics & AI Wing',
    category: 'STEM Innovation',
    description: 'Equipped with 3D printers, robotics testing rigs, and GPU workstations.'
  },
  {
    id: '2',
    title: 'Olympic Aquatic & Athletic Complex',
    category: 'Sports Excellence',
    description: 'Competition pool, athletic track, and FIFA-standard turf pitch.'
  },
  {
    id: '3',
    title: 'Digital Library & Research Pods',
    category: 'Academics',
    description: 'Acoustically insulated study pods with digital database access.'
  }
];

export const VirtualTourSection: React.FC = () => {
  const [isPlaying, setIsPlaying] = useState(false);
  const [activeHotspot, setActiveHotspot] = useState(TOUR_HOTSPOTS[0]);
  const [isMuted, setIsMuted] = useState(true);

  return (
    <section id="virtual-tour" className="py-24 bg-[#07111F] relative overflow-hidden">
      <div className="absolute top-1/2 left-0 w-96 h-96 rounded-full bg-blue-600/15 blur-[140px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="text-center max-w-3xl mx-auto mb-14 space-y-3">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full glass-card border border-[#D4AF37]/30 text-amber-300 text-xs font-bold uppercase tracking-widest">
            <Compass className="w-3.5 h-3.5 text-[#D4AF37]" />
            Immersive Walkthrough
          </div>
          <h2 className="text-3xl sm:text-5xl font-extrabold text-white heading-font">
            Virtual <span className="gold-gradient-text">Campus Tour</span>
          </h2>
          <p className="text-gray-300 text-base sm:text-lg">
            Explore our modern academic architecture, science wings, and sports facilities.
          </p>
        </div>

        {/* Tour Showcase Frame (No External Photos) */}
        <div className="relative rounded-3xl overflow-hidden glass-card p-3 border border-white/20 shadow-2xl gold-border-glow">
          <div className="relative aspect-video w-full rounded-2xl overflow-hidden bg-gradient-to-br from-[#10253C] via-[#0B1A2F] to-[#040A14] group">
            {!isPlaying ? (
              <>
                <div className="absolute inset-0 flex flex-col items-center justify-center p-6 text-center">
                  <button
                    onClick={() => setIsPlaying(true)}
                    aria-label="Play virtual tour video"
                    className="relative w-24 h-24 rounded-full glass-card border-2 border-[#D4AF37] flex items-center justify-center text-[#D4AF37] shadow-2xl hover:scale-110 active:scale-95 transition-all duration-300 group/play mb-4"
                  >
                    <Play className="w-10 h-10 fill-[#D4AF37] translate-x-1 group-hover/play:scale-110 transition-transform" />
                    <div className="absolute inset-0 rounded-full bg-[#D4AF37]/20 animate-ping" />
                  </button>
                  <p className="text-xs font-bold text-white tracking-widest uppercase bg-black/60 px-4 py-1.5 rounded-full backdrop-blur-md border border-white/10">
                    Launch Interactive Campus Walkthrough
                  </p>
                </div>

                <div className="absolute bottom-6 left-6 right-6 p-5 rounded-2xl glass-card border border-white/20 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
                  <div>
                    <span className="text-xs font-bold text-[#D4AF37] uppercase">{activeHotspot.category}</span>
                    <h3 className="text-xl font-bold text-white">{activeHotspot.title}</h3>
                    <p className="text-xs text-gray-300 mt-1">{activeHotspot.description}</p>
                  </div>
                  <span className="text-xs font-semibold text-amber-200 bg-amber-500/20 border border-amber-500/30 px-3 py-1 rounded-full shrink-0">
                    Interactive Hotspot
                  </span>
                </div>
              </>
            ) : (
              <div className="relative w-full h-full flex flex-col justify-between p-6 bg-gradient-to-br from-[#0F2035] via-[#081526] to-black">
                <div className="flex justify-between items-center">
                  <div className="flex items-center gap-2">
                    <span className="w-3 h-3 rounded-full bg-red-500 animate-ping" />
                    <span className="text-xs font-bold text-white uppercase tracking-wider">LIVE VIRTUAL TOUR VIEW</span>
                  </div>
                  <button
                    onClick={() => setIsPlaying(false)}
                    className="px-3 py-1 rounded-lg bg-white/20 text-xs font-bold text-white hover:bg-white/30"
                  >
                    Exit Tour
                  </button>
                </div>

                <div className="text-center my-auto space-y-3">
                  <GraduationCap className="w-16 h-16 text-[#D4AF37] mx-auto animate-bounce" />
                  <h3 className="text-2xl font-bold text-white">{activeHotspot.title}</h3>
                  <p className="text-xs text-gray-300 max-w-md mx-auto">{activeHotspot.description}</p>
                </div>

                <div className="flex items-center justify-between pt-4 border-t border-white/10">
                  <button
                    onClick={() => setIsMuted(!isMuted)}
                    className="p-2 rounded-lg bg-black/60 text-white hover:bg-black"
                  >
                    {isMuted ? <VolumeX className="w-5 h-5" /> : <Volume2 className="w-5 h-5" />}
                  </button>
                  <span className="text-xs text-gray-200">Narrated Tour Active</span>
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Hotspot Switchers */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mt-8">
          {TOUR_HOTSPOTS.map((hotspot) => (
            <button
              key={hotspot.id}
              onClick={() => {
                setActiveHotspot(hotspot);
                setIsPlaying(false);
              }}
              className={`p-4 rounded-2xl glass-card text-left border transition-all duration-300 flex items-center gap-3 ${
                activeHotspot.id === hotspot.id
                  ? 'border-[#D4AF37] bg-[#D4AF37]/15 shadow-xl'
                  : 'border-white/10 hover:border-white/25 hover:bg-white/5'
              }`}
            >
              <div className="w-10 h-10 rounded-xl bg-white/10 flex items-center justify-center shrink-0">
                <Eye className={`w-5 h-5 ${activeHotspot.id === hotspot.id ? 'text-[#D4AF37]' : 'text-gray-400'}`} />
              </div>
              <div>
                <p className="text-xs font-bold text-white">{hotspot.title}</p>
                <p className="text-[10px] text-gray-400">{hotspot.category}</p>
              </div>
            </button>
          ))}
        </div>
      </div>
    </section>
  );
};
