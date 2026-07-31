import React, { useState } from 'react';
import { GALLERY_ITEMS } from '../data/schoolData';
import { GalleryItem } from '../types';
import { Sparkles, Maximize2, X, Camera } from 'lucide-react';

export const StudentLifeSection: React.FC = () => {
  const [activeCategory, setActiveCategory] = useState<string>('all');
  const [selectedImage, setSelectedImage] = useState<GalleryItem | null>(null);

  const categories = [
    { id: 'all', label: 'All Activities' },
    { id: 'stem', label: 'STEM & AI Labs' },
    { id: 'sports', label: 'Sports & Aquatics' },
    { id: 'arts', label: 'Symphonic & Arts' },
    { id: 'leadership', label: 'Leadership & MUN' },
    { id: 'campus', label: 'Campus Grounds' }
  ];

  const filteredItems = activeCategory === 'all'
    ? GALLERY_ITEMS
    : GALLERY_ITEMS.filter((item) => item.category === activeCategory);

  return (
    <section id="student-life" className="py-24 bg-[#07111F] relative overflow-hidden border-t border-white/10">
      
      {/* Background radial glow */}
      <div className="absolute top-10 right-10 w-96 h-96 rounded-full bg-amber-500/10 blur-[150px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        <div className="text-center max-w-3xl mx-auto mb-12 space-y-3">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full glass-card border border-[#D4AF37]/30 text-amber-300 text-xs font-bold uppercase tracking-widest">
            <Camera className="w-3.5 h-3.5 text-[#D4AF37]" />
            Vibrant Campus Experience
          </div>
          <h2 className="text-3xl sm:text-5xl font-extrabold text-white heading-font">
            Student Life & <span className="gold-gradient-text">Co-Curriculars</span>
          </h2>
          <p className="text-gray-300 text-base sm:text-lg">
            Beyond academics, Nexus scholars excel in athletics, performing arts, robotics championships, and international diplomacy.
          </p>
        </div>

        {/* Filter Pills */}
        <div className="flex flex-wrap items-center justify-center gap-2 mb-12">
          {categories.map((cat) => (
            <button
              key={cat.id}
              onClick={() => setActiveCategory(cat.id)}
              className={`px-4 py-2 rounded-full text-xs font-bold transition-all border ${
                activeCategory === cat.id
                  ? 'bg-[#D4AF37] text-black border-[#D4AF37] shadow-lg shadow-amber-500/20'
                  : 'glass-card text-gray-300 border-white/10 hover:border-white/30 hover:text-white'
              }`}
            >
              {cat.label}
            </button>
          ))}
        </div>

        {/* Pinterest / Bento Style Masonry Gallery Cards (No Photo Images) */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredItems.map((item) => (
            <div
              key={item.id}
              onClick={() => setSelectedImage(item)}
              className="group relative rounded-3xl overflow-hidden glass-card border border-white/15 cursor-pointer shadow-2xl h-64 p-6 transition-all duration-500 hover:border-[#D4AF37]/60 bg-gradient-to-br from-[#10253C] via-[#0B1A2F] to-[#07111F] flex flex-col justify-between"
            >
              <div className="flex justify-between items-start">
                <span className="text-[10px] font-bold text-[#D4AF37] uppercase tracking-wider bg-black/50 px-2.5 py-1 rounded-full border border-amber-500/20">
                  {item.category}
                </span>
                <span className="p-2 rounded-xl bg-black/40 border border-white/10 text-white group-hover:bg-[#D4AF37] group-hover:text-black transition-all">
                  <Maximize2 className="w-4 h-4" />
                </span>
              </div>

              <div className="space-y-2">
                <h3 className="text-xl font-bold text-white group-hover:text-amber-200 transition-colors">
                  {item.title}
                </h3>
                <p className="text-xs text-gray-300 line-clamp-3">
                  {item.description}
                </p>
              </div>
            </div>
          ))}
        </div>

      </div>

      {/* Full Modal Image Preview */}
      {selectedImage && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/90 backdrop-blur-md animate-in fade-in duration-200">
          <div className="relative max-w-4xl w-full glass-card rounded-3xl p-4 border border-white/20 shadow-2xl overflow-hidden">
            <button
              onClick={() => setSelectedImage(null)}
              className="absolute top-6 right-6 z-10 p-2.5 rounded-full bg-black/80 text-white hover:bg-[#D4AF37] hover:text-black transition-colors"
            >
              <X className="w-5 h-5" />
            </button>

            <div className="p-8 rounded-2xl bg-gradient-to-br from-[#10253C] to-[#07111F] border border-amber-500/30 mb-4 text-center">
              <span className="text-xs font-bold text-[#D4AF37] uppercase tracking-widest">{selectedImage.category}</span>
              <h3 className="text-2xl font-bold text-white mt-2">{selectedImage.title}</h3>
              <p className="text-sm text-gray-300 mt-2 max-w-lg mx-auto">{selectedImage.description}</p>
            </div>
          </div>
        </div>
      )}

    </section>
  );
};
