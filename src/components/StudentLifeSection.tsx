import React, { useState, useEffect } from 'react';
import { GalleryItem } from '../types';
import { subscribeToGallery } from '../lib/firebase';
import { Maximize2, X, Camera, Image as ImageIcon, Sparkles } from 'lucide-react';

export const StudentLifeSection: React.FC = () => {
  const [activeCategory, setActiveCategory] = useState<string>('all');
  const [selectedImage, setSelectedImage] = useState<GalleryItem | null>(null);
  const [items, setItems] = useState<GalleryItem[]>([]);

  useEffect(() => {
    const unsubscribe = subscribeToGallery((data) => {
      setItems(data);
    });
    return () => unsubscribe();
  }, []);

  const filteredItems = items;

  return (
    <section id="student-life" className="py-24 bg-white text-slate-900 relative overflow-hidden border-t border-slate-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-12 space-y-3">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-amber-50 border border-amber-300 text-amber-900 text-xs font-bold uppercase tracking-wider">
            <Camera className="w-4 h-4 text-amber-600" />
            Vibrant Campus Gallery
          </div>
          <h2 className="text-3xl sm:text-5xl font-black text-[#0B1A30] tracking-tight heading-font">
            School <span className="text-amber-600">Gallery & Life</span>
          </h2>
          <p className="text-slate-600 text-base sm:text-lg">
            Explore academic projects, athletic galas, fine arts, and campus facilities captured across the school year.
          </p>
        </div>

        {/* All Activities Header Badge */}
        <div className="flex justify-center mb-10">
          <span className="px-5 py-2 rounded-xl text-xs font-bold bg-[#0B1A30] text-white shadow-sm border border-[#0B1A30]">
            All Activities
          </span>
        </div>

        {/* Gallery Grid */}
        {filteredItems.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredItems.map((item) => (
              <div
                key={item.id}
                onClick={() => setSelectedImage(item)}
                className="group relative rounded-3xl overflow-hidden bg-white border border-slate-200 cursor-pointer shadow-md hover:shadow-xl transition-all duration-300 flex flex-col justify-between hover:border-amber-500 transform hover:-translate-y-1"
              >
                {/* Image or Placeholder Header */}
                <div className="relative h-56 w-full bg-slate-100 overflow-hidden border-b border-slate-100">
                  {item.image ? (
                    <img
                      src={item.image}
                      alt={item.title}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    />
                  ) : (
                    <div className="w-full h-full bg-gradient-to-br from-[#0B1A30] via-[#10253C] to-slate-800 p-6 flex flex-col justify-between text-white">
                      <div className="flex justify-between items-start">
                        <span className="text-[10px] font-extrabold uppercase tracking-wider bg-amber-500/20 text-amber-300 px-3 py-1 rounded-full border border-amber-400/30">
                          {item.category}
                        </span>
                        <Camera className="w-6 h-6 text-amber-400" />
                      </div>
                      <p className="text-xl font-black text-white opacity-20 uppercase tracking-tighter">CAMPUS GALLERY</p>
                    </div>
                  )}

                  <div className="absolute top-4 right-4 p-2 rounded-xl bg-white/90 backdrop-blur-md text-slate-900 border border-slate-200 shadow group-hover:bg-[#0B1A30] group-hover:text-white transition-all">
                    <Maximize2 className="w-4 h-4" />
                  </div>
                </div>

                {/* Content */}
                <div className="p-6 space-y-2">
                  <span className="text-[11px] font-extrabold uppercase text-amber-700 tracking-wider">
                    {item.category}
                  </span>
                  <h3 className="text-lg font-black text-[#0B1A30] group-hover:text-amber-600 transition-colors leading-snug">
                    {item.title}
                  </h3>
                  <p className="text-xs text-slate-600 line-clamp-2 leading-relaxed">
                    {item.description}
                  </p>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="p-16 text-center bg-slate-50 border border-slate-200 rounded-3xl space-y-3">
            <ImageIcon className="w-12 h-12 text-slate-300 mx-auto" />
            <p className="text-base font-bold text-[#0B1A30]">No photos uploaded yet</p>
            <p className="text-xs text-slate-500 max-w-md mx-auto">
              The campus gallery is currently empty. School administrators can upload campus photos from local storage anytime using the Admin Portal.
            </p>
          </div>
        )}

      </div>

      {/* Item Zoom Modal */}
      {selectedImage && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/80 backdrop-blur-sm animate-in fade-in duration-200">
          <div className="relative max-w-3xl w-full bg-white rounded-3xl p-6 sm:p-8 border border-slate-200 shadow-2xl overflow-hidden max-h-[90vh] flex flex-col">
            <button
              onClick={() => setSelectedImage(null)}
              className="absolute top-4 right-4 z-10 p-2.5 rounded-full bg-slate-100 text-slate-800 hover:bg-[#0B1A30] hover:text-white transition-colors"
            >
              <X className="w-5 h-5" />
            </button>

            <div className="space-y-4 overflow-y-auto">
              <span className="text-xs font-black text-amber-600 uppercase tracking-wider">{selectedImage.category}</span>
              <h3 className="text-2xl font-black text-[#0B1A30]">{selectedImage.title}</h3>

              {selectedImage.image ? (
                <div className="rounded-2xl overflow-hidden border border-slate-200 shadow-inner max-h-96">
                  <img src={selectedImage.image} alt={selectedImage.title} className="w-full h-full object-cover" />
                </div>
              ) : (
                <div className="p-10 rounded-2xl bg-gradient-to-br from-[#0B1A30] to-slate-800 text-white text-center space-y-2">
                  <Camera className="w-10 h-10 text-amber-400 mx-auto" />
                  <p className="text-xs text-slate-300">Nexus Campus Photo Record</p>
                </div>
              )}

              <p className="text-sm text-slate-700 leading-relaxed font-medium pt-2 border-t border-slate-100">
                {selectedImage.description}
              </p>
            </div>
          </div>
        </div>
      )}
    </section>
  );
};
