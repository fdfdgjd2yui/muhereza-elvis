import React, { useState } from 'react';
import { Play, Compass, Sparkles, Volume2, VolumeX, Maximize2, Shield, Eye } from 'lucide-react';

const TOUR_HOTSPOTS = [
  {
    id: '1',
    title: 'Quantum Robotics & AI Wing',
    category: 'STEM Innovation',
    image: 'https://images.unsplash.com/photo-1581092335397-9583fe92d232?q=80&w=1200&auto=format&fit=crop',
    description: 'Equipped with 3D printers, humanoid robotics testing rigs, and GPU workstations.'
  },
  {
    id: '2',
    title: 'Olympic Aquatic & Athletic Complex',
    category: 'Sports Excellence',
    image: 'https://images.unsplash.com/photo-1530549387789-4c1017266635?q=80&w=1200&auto=format&fit=crop',
    description: 'Heated 50-meter 10-lane competition pool and FIFA-standard turf pitch.'
  },
  {
    id: '3',
    title: 'Modern Digital Library & Pods',
    category: 'Academics',
    image: 'https://images.unsplash.com/photo-1521587760476-6c12a4b040da?q=80&w=1200&auto=format&fit=crop',
    description: 'Acoustically insulated glass study pods with full access to JSTOR databases.'
  }
];

export const VirtualTourSection: React.FC = () => {
  const [isPlaying, setIsPlaying] = useState(false);
  const [activeHotspot, setActiveHotspot] = useState(TOUR_HOTSPOTS[0]);
  const [isMuted, setIsMuted] = useState(true);

  return (
    <section id="virtual-tour" className="py-24 bg-[#07111F] relative overflow-hidden">
      
      {/* Background glow orb */}
      <div className="absolute top-1/2 left-0 w-96 h-96 rounded-full bg-blue-600/15 blur-[140px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        <div className="text-center max-w-3xl mx-auto mb-14 space-y-3">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full glass-card border border-[#D4AF37]/30 text-amber-300 text-xs font-bold uppercase tracking-widest">
            <Compass className="w-3.5 h-3.5 text-[#D4AF37]" />
            Immersive Experience
          </div>
          <h2 className="text-3xl sm:text-5xl font-extrabold text-white heading-font">
            Virtual <span className="gold-gradient-text">Campus Tour</span>
          </h2>
          <p className="text-gray-300 text-base sm:text-lg">
            Experience our ultra-modern glass architecture, science wings, and world-class sports grounds from anywhere in the world.
          </p>
        </div>

        {/* Large Main Video / Tour Showcase Frame */}
        <div className="relative rounded-3xl overflow-hidden glass-card p-3 border border-white/20 shadow-2xl gold-border-glow">
          
          <div className="relative aspect-video w-full rounded-2xl overflow-hidden bg-slate-900 group">
            
            {!isPlaying ? (
              <>
                <div className="w-full h-full bg-gradient-to-br from-[#10253C] via-[#07111F] to-[#040A14] flex items-center justify-center" />

                {/* Big Center Glass Play Button */}
                <div className="absolute inset-0 flex flex-col items-center justify-center">
                  <button
                    onClick={() => setIsPlaying(true)}
                    aria-label="Play virtual tour video"
                    className="relative w-24 h-24 rounded-full glass-card border-2 border-[#D4AF37] flex items-center justify-center text-[#D4AF37] shadow-2xl hover:scale-110 active:scale-95 transition-all duration-300 group/play"
                  >
                    <Play className="w-10 h-10 fill-[#D4AF37] translate-x-1 group-hover/play:scale-110 transition-transform" />
                    <div className="absolute inset-0 rounded-full bg-[#D4AF37]/20 animate-ping" />
                  </button>
                  <p className="text-xs font-bold text-white tracking-widest uppercase mt-4 bg-black/60 px-4 py-1.5 rounded-full backdrop-blur-md border border-white/10">
                    Click to Launch 4K Virtual Walkthrough
                  </p>
                </div>

                {/* Bottom Active Spot Info */}
                <div className="absolute bottom-6 left-6 right-6 p-5 rounded-2xl glass-card border border-white/20 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
                  <div>
                    <span className="text-xs font-bold text-[#D4AF37] uppercase">{activeHotspot.category}</span>
                    <h3 className="text-xl font-bold text-white">{activeHotspot.title}</h3>
                    <p className="text-xs text-gray-300 mt-1">{activeHotspot.description}</p>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="text-xs font-semibold text-amber-200 bg-amber-500/20 border border-amber-500/30 px-3 py-1 rounded-full">
                      Interactive Hotspot
                    </span>
                  </div>
                </div>
              </>
            ) : (
              <div className="relative w-full h-full flex items-center justify-center bg-black">
                {/* Simulated High Definition Video Player */}
                <div className="w-full h-full relative">
                  <img
                    src={activeHotspot.image}
                    alt={activeHotspot.title}
                    referrerPolicy="no-referrer"
                    className="w-full h-full object-cover animate-pulse-glow"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-black/60 flex flex-col justify-between p-6">
                    <div className="flex justify-between items-center">
                      <div className="flex items-center gap-2">
                        <span className="w-3 h-3 rounded-full bg-red-500 animate-ping" />
                        <span className="text-xs font-bold text-white uppercase tracking-wider">LIVE 4K VIRTUAL TOUR</span>
                      </div>
                      <button
                        onClick={() => setIsPlaying(false)}
                        className="px-3 py-1 rounded-lg bg-white/20 text-xs font-bold text-white hover:bg-white/30"
                      >
                        Exit Tour
                      </button>
                    </div>

                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-4">
                        <button
                          onClick={() => setIsMuted(!isMuted)}
                          className="p-2 rounded-lg bg-black/60 text-white hover:bg-black"
                        >
                          {isMuted ? <VolumeX className="w-5 h-5" /> : <Volume2 className="w-5 h-5" />}
                        </button>
                        <span className="text-xs text-gray-200">Narrated by Dean of Admissions</span>
                      </div>
                      <button
                        onClick={() => setIsPlaying(false)}
                        className="p-2 rounded-lg bg-black/60 text-white"
                      >
                        <Maximize2 className="w-5 h-5" />
                      </button>
                    </div>
                  </div>
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
