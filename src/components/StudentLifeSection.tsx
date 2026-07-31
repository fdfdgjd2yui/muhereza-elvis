import React, { useState, useEffect } from 'react';
import { GalleryItem } from '../types';
import { getGalleryFromFirestore } from '../lib/firebase';
import { Maximize2, X, Camera, Image as ImageIcon } from 'lucide-react';

export const StudentLifeSection: React.FC = () => {
  const [activeCategory, setActiveCategory] = useState<string>('all');
  const [selectedImage, setSelectedImage] = useState<GalleryItem | null>(null);
  const [items, setItems] = useState<GalleryItem[]>([]);

  const fetchItems = async () => {
    const data = await getGalleryFromFirestore();
    setItems(data);
  };

  useEffect(() => {
    fetchItems();
    window.addEventListener('nexus_gallery_updated', fetchItems);
    return () => window.removeEventListener('nexus_gallery_updated', fetchItems);
  }, []);

  const categories = [
    { id: 'all', label: 'All Activities' },
    { id: 'stem', label: 'STEM & AI Labs' },
    { id: 'sports', label: 'Sports & Aquatics' },
    { id: 'arts', label: 'Symphonic & Arts' },
    { id: 'leadership', label: 'Leadership & MUN' },
    { id: 'campus', label: 'Campus Grounds' }
  ];

  const filteredItems = activeCategory === 'all'
    ? items
    : items.filter((item) => item.category === activeCategory);

  return (
    <section id="student-life" className="py-24 bg-[#07111F] relative overflow-hidden border-t border-white/10">
      <div className="absolute top-10 right-10 w-96 h-96 rounded-full bg-amber-500/10 blur-[150px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="text-center max-w-3xl mx-auto mb-12 space-y-3">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full glass-card border border-[#D4AF37]/30 text-amber-300 text-xs font-bold uppercase tracking-widest">
            <Camera className="w-3.5 h-3.5 text-[#D4AF37]" />
            Vibrant Campus Gallery
          </div>
          <h2 className="text-3xl sm:text-5xl font-extrabold text-white heading-font">
            School <span className="gold-gradient-text">Gallery & Activities</span>
          </h2>
          <p className="text-gray-300 text-base sm:text-lg">
            Explore academic activities, athletics, arts, and campus events.
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

        {/* Masonry / Structural Gallery Grid */}
        {filteredItems.length > 0 ? (
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

                {item.image && (
                  <div className="w-full h-24 rounded-xl overflow-hidden bg-black/40 border border-white/10 mb-2">
                    <img src={item.image} alt={item.title} className="w-full h-full object-cover" />
                  </div>
                )}

                <div className="space-y-1">
                  <h3 className="text-lg font-bold text-white group-hover:text-amber-200 transition-colors">
                    {item.title}
                  </h3>
                  <p className="text-xs text-gray-300 line-clamp-2">
                    {item.description}
                  </p>
                </div>
              </div>
            ))}
          </div>
        ) : (
          /* Structural Layout Placeholder for Gallery */
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {[1, 2, 3].map((num) => (
              <div key={num} className="rounded-3xl border border-white/10 bg-[#0B1A2F]/60 p-6 h-64 flex flex-col justify-between relative">
                <div className="flex items-center justify-between">
                  <div className="w-24 h-5 rounded-full bg-white/10"></div>
                  <ImageIcon className="w-5 h-5 text-gray-500" />
                </div>
                <div className="w-full h-24 rounded-xl border border-dashed border-white/15 bg-white/5 flex items-center justify-center text-xs text-gray-400">
                  <span>Gallery Item Placeholder #{num}</span>
                </div>
                <div className="space-y-2">
                  <div className="w-3/4 h-4 rounded bg-white/10"></div>
                  <div className="w-1/2 h-3 rounded bg-white/5"></div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Modal Image/Item Preview */}
      {selectedImage && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/90 backdrop-blur-md animate-in fade-in duration-200">
          <div className="relative max-w-2xl w-full glass-card rounded-3xl p-6 border border-white/20 shadow-2xl overflow-hidden">
            <button
              onClick={() => setSelectedImage(null)}
              className="absolute top-6 right-6 z-10 p-2.5 rounded-full bg-black/80 text-white hover:bg-[#D4AF37] hover:text-black transition-colors"
            >
              <X className="w-5 h-5" />
            </button>

            <div className="p-6 rounded-2xl bg-gradient-to-br from-[#10253C] to-[#07111F] border border-amber-500/30 text-center">
              <span className="text-xs font-bold text-[#D4AF37] uppercase tracking-widest">{selectedImage.category}</span>
              <h3 className="text-2xl font-bold text-white mt-2">{selectedImage.title}</h3>
              {selectedImage.image && (
                <div className="my-4 rounded-xl overflow-hidden border border-white/15 max-h-64">
                  <img src={selectedImage.image} alt={selectedImage.title} className="w-full h-full object-cover" />
                </div>
              )}
              <p className="text-sm text-gray-300 mt-2">{selectedImage.description}</p>
            </div>
          </div>
        </div>
      )}
    </section>
  );
};
