import React, { useState, useEffect, useCallback } from 'react';
import { FacilityItem, FacilityImage } from '../types';
import { X, Maximize2, ChevronLeft, ChevronRight, Camera } from 'lucide-react';

interface FacilityDetailModalProps {
  isOpen: boolean;
  facility: FacilityItem | null;
  allFacilities?: FacilityItem[];
  onClose: () => void;
  onSelectFacility?: (facility: FacilityItem) => void;
}

export const FacilityDetailModal: React.FC<FacilityDetailModalProps> = ({
  isOpen,
  facility,
  allFacilities = [],
  onClose,
  onSelectFacility
}) => {
  const [activeImageIndex, setActiveImageIndex] = useState<number>(0);
  const [isLightboxOpen, setIsLightboxOpen] = useState<boolean>(false);

  // Reset active image when facility changes
  useEffect(() => {
    if (facility && facility.images && facility.images.length > 0) {
      const mainIdx = facility.images.findIndex((img) => img.isMain);
      setActiveImageIndex(mainIdx >= 0 ? mainIdx : 0);
    } else {
      setActiveImageIndex(0);
    }
  }, [facility?.id]);

  // Keyboard navigation for lightbox & modal
  const handleKeyDown = useCallback(
    (e: KeyboardEvent) => {
      if (!isOpen) return;
      if (e.key === 'Escape') {
        if (isLightboxOpen) {
          setIsLightboxOpen(false);
        } else {
          onClose();
        }
      } else if (isLightboxOpen && facility?.images?.length) {
        if (e.key === 'ArrowRight') {
          setActiveImageIndex((prev) => (prev + 1) % facility.images.length);
        } else if (e.key === 'ArrowLeft') {
          setActiveImageIndex((prev) => (prev - 1 + facility.images.length) % facility.images.length);
        }
      }
    },
    [isOpen, isLightboxOpen, facility?.images?.length, onClose]
  );

  useEffect(() => {
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [handleKeyDown]);

  if (!isOpen || !facility) return null;

  const images: FacilityImage[] = facility.images || [];
  const currentImage = images[activeImageIndex] || images[0];

  const handleNext = (e?: React.MouseEvent) => {
    e?.stopPropagation();
    if (images.length > 0) {
      setActiveImageIndex((prev) => (prev + 1) % images.length);
    }
  };

  const handlePrev = (e?: React.MouseEvent) => {
    e?.stopPropagation();
    if (images.length > 0) {
      setActiveImageIndex((prev) => (prev - 1 + images.length) % images.length);
    }
  };

  return (
    <>
      {/* Primary Dedicated Facility Detail Modal */}
      <div 
        className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-5 md:p-8 bg-slate-950/80 backdrop-blur-md overflow-y-auto animate-in fade-in duration-200"
        onClick={onClose}
      >
        <div 
          className="bg-white w-full max-w-5xl rounded-3xl border border-slate-200 shadow-2xl overflow-hidden relative text-slate-900 my-auto flex flex-col max-h-[92vh]"
          onClick={(e) => e.stopPropagation()}
        >
          {/* Header Bar: Facility Name clearly displayed + minimal supporting text */}
          <div className="px-5 sm:px-8 py-5 border-b border-slate-100 flex items-start justify-between bg-white">
            <div className="space-y-1 pr-4">
              <h2 className="text-xl sm:text-2xl md:text-3xl font-black text-[#0B1A30] tracking-tight heading-font uppercase">
                {facility.title}
              </h2>
              {facility.subtitle && (
                <p className="text-xs sm:text-sm text-black font-medium leading-relaxed">
                  {facility.subtitle}
                </p>
              )}
            </div>

            <button
              type="button"
              onClick={onClose}
              className="p-2 sm:p-2.5 rounded-2xl bg-slate-100 hover:bg-slate-200 text-slate-700 hover:text-slate-900 transition-colors shrink-0"
              aria-label="Close Facility Gallery"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Modal Body: Responsive Visual Facility Gallery */}
          <div className="p-4 sm:p-6 md:p-8 overflow-y-auto space-y-6">
            
            {/* 1. Large Main Facility Image (Clean, unobstructed photo view) */}
            {currentImage ? (
              <div className="space-y-3">
                <div className="relative rounded-2xl overflow-hidden bg-slate-950 group shadow-md border border-slate-200">
                  <div 
                    onClick={() => setIsLightboxOpen(true)}
                    className="relative aspect-[16/10] sm:aspect-[16/9] md:aspect-[21/11] w-full max-h-[520px] cursor-zoom-in overflow-hidden flex items-center justify-center bg-slate-900"
                  >
                    <img
                      src={currentImage.url}
                      alt={facility.title}
                      className="w-full h-full object-cover group-hover:scale-102 transition-transform duration-500"
                    />

                    {/* Floating Full Screen Button - Top Right */}
                    <div className="absolute top-4 right-4 flex items-center gap-2">
                      <button
                        type="button"
                        onClick={(e) => {
                          e.stopPropagation();
                          setIsLightboxOpen(true);
                        }}
                        className="p-2 sm:px-3 sm:py-1.5 rounded-xl bg-black/60 hover:bg-black/80 backdrop-blur-md text-white text-xs font-semibold flex items-center gap-1.5 border border-white/20 transition-all shadow-md"
                        title="Full Screen View"
                      >
                        <Maximize2 className="w-4 h-4" />
                        <span className="hidden sm:inline">Full Screen</span>
                      </button>
                    </div>

                    {/* Previous / Next Arrow Controls */}
                    {images.length > 1 && (
                      <>
                        <button
                          type="button"
                          onClick={handlePrev}
                          aria-label="Previous Image"
                          className="absolute left-3 top-1/2 -translate-y-1/2 p-2.5 sm:p-3 rounded-full bg-black/60 hover:bg-black/90 backdrop-blur-md text-white border border-white/20 transition-all hover:scale-110 shadow-lg"
                        >
                          <ChevronLeft className="w-5 h-5" />
                        </button>
                        <button
                          type="button"
                          onClick={handleNext}
                          aria-label="Next Image"
                          className="absolute right-3 top-1/2 -translate-y-1/2 p-2.5 sm:p-3 rounded-full bg-black/60 hover:bg-black/90 backdrop-blur-md text-white border border-white/20 transition-all hover:scale-110 shadow-lg"
                        >
                          <ChevronRight className="w-5 h-5" />
                        </button>
                      </>
                    )}
                  </div>
                </div>

                {/* Clean Navigation Dots */}
                {images.length > 1 && (
                  <div className="flex items-center justify-center gap-2 py-1">
                    {images.map((_, idx) => (
                      <button
                        key={idx}
                        type="button"
                        onClick={() => setActiveImageIndex(idx)}
                        className={`transition-all rounded-full ${
                          idx === activeImageIndex
                            ? 'w-6 h-2 bg-[#0B1A30]'
                            : 'w-2 h-2 bg-slate-300 hover:bg-slate-500'
                        }`}
                        aria-label={`Photo ${idx + 1}`}
                      />
                    ))}
                  </div>
                )}
              </div>
            ) : (
              <div className="h-64 rounded-2xl bg-slate-100 flex flex-col items-center justify-center text-slate-400 p-6 text-center">
                <Camera className="w-12 h-12 mb-2 text-slate-300" />
                <p className="font-bold text-slate-600">No images configured for this facility yet.</p>
                <p className="text-xs text-slate-400 mt-1">Images can be added via the School Admin Dashboard.</p>
              </div>
            )}

          </div>

        </div>
      </div>

      {/* Lightbox / Immersive Full-Screen Photo Viewer */}
      {isLightboxOpen && currentImage && (
        <div 
          className="fixed inset-0 z-[100] bg-white flex flex-col justify-between p-4 sm:p-6 md:p-8 animate-in fade-in duration-200"
          onClick={() => setIsLightboxOpen(false)}
        >
          {/* Lightbox Top Bar */}
          <div className="flex items-center justify-between text-black z-10 pb-3 border-b border-slate-200" onClick={(e) => e.stopPropagation()}>
            <div className="space-y-1 pr-4">
              <span className="text-xs sm:text-sm font-black text-black tracking-wider uppercase block">
                {facility.title}
              </span>
              <p className="text-sm sm:text-base font-extrabold text-black">
                {currentImage.caption || `${facility.title} - View ${activeImageIndex + 1}`}
              </p>
            </div>

            <div className="flex items-center gap-3 shrink-0">
              <span className="text-xs sm:text-sm font-mono font-bold bg-slate-100 border border-slate-300 px-3 py-1.5 rounded-full text-black shadow-xs">
                {activeImageIndex + 1} / {images.length}
              </span>
              <button
                type="button"
                onClick={() => setIsLightboxOpen(false)}
                className="p-2 sm:p-2.5 rounded-full bg-slate-100 hover:bg-slate-200 text-black border border-slate-300 transition-colors shadow-xs"
                aria-label="Close Lightbox"
              >
                <X className="w-5 h-5 text-black" />
              </button>
            </div>
          </div>

          {/* Lightbox Main Image Area */}
          <div 
            className="flex-1 flex items-center justify-center relative p-2 my-auto"
            onClick={(e) => e.stopPropagation()}
          >
            {images.length > 1 && (
              <button
                type="button"
                onClick={handlePrev}
                aria-label="Previous Photo"
                className="absolute left-2 sm:left-6 p-3 sm:p-3.5 rounded-full bg-white/95 hover:bg-white text-black border border-slate-300 shadow-xl hover:scale-110 transition-all z-10"
              >
                <ChevronLeft className="w-6 h-6 text-black" />
              </button>
            )}

            <img
              src={currentImage.url}
              alt={currentImage.caption || facility.title}
              className="max-h-[75vh] max-w-[92vw] object-contain rounded-2xl shadow-xl border border-slate-200 bg-slate-50"
            />

            {images.length > 1 && (
              <button
                type="button"
                onClick={handleNext}
                aria-label="Next Photo"
                className="absolute right-2 sm:right-6 p-3 sm:p-3.5 rounded-full bg-white/95 hover:bg-white text-black border border-slate-300 shadow-xl hover:scale-110 transition-all z-10"
              >
                <ChevronRight className="w-6 h-6 text-black" />
              </button>
            )}
          </div>

          {/* Lightbox Bottom Caption */}
          <div className="text-center text-xs sm:text-sm font-semibold text-black z-10 pt-2 border-t border-slate-200" onClick={(e) => e.stopPropagation()}>
            <p className="text-black">Use keyboard Left / Right arrow keys to navigate, Esc to close.</p>
          </div>
        </div>
      )}
    </>
  );
};
