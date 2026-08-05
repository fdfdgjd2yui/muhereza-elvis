import React, { useState, useEffect } from 'react';
import { NewsItem } from '../types';
import { subscribeToNews } from '../lib/firebase';
import { Newspaper, Calendar, ArrowRight, X, Megaphone, Clock } from 'lucide-react';

export const NewsSection: React.FC = () => {
  const [news, setNews] = useState<NewsItem[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [selectedArticle, setSelectedArticle] = useState<NewsItem | null>(null);

  useEffect(() => {
    setIsLoading(true);
    const unsubscribe = subscribeToNews((data) => {
      setNews(data);
      setIsLoading(false);
    });
    return () => unsubscribe();
  }, []);

  return (
    <section id="news" className="py-20 bg-slate-50 text-slate-900 relative border-t border-slate-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-12 space-y-3">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-amber-100/80 border border-amber-300 text-amber-900 text-xs font-bold uppercase tracking-wider">
            <Newspaper className="w-4 h-4 text-amber-600" />
            Official Announcements
          </div>
          <h2 className="text-3xl sm:text-5xl font-black text-[#0B1A30] tracking-tight heading-font">
            News & <span className="text-amber-600">Updates</span>
          </h2>
          <p className="text-slate-600 text-base sm:text-lg">
            Stay informed with official school press releases, academic term notices, and administrative announcements.
          </p>
        </div>

        {/* News Grid or Empty State */}
        {isLoading ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[1, 2, 3].map((n) => (
              <div key={n} className="rounded-3xl border border-slate-200 bg-white p-6 animate-pulse space-y-4 shadow-sm">
                <div className="h-6 w-1/3 rounded-lg bg-slate-200" />
                <div className="h-6 w-3/4 rounded bg-slate-200" />
                <div className="h-16 w-full rounded bg-slate-200" />
              </div>
            ))}
          </div>
        ) : news.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {news.map((item) => (
              <div
                key={item.id}
                onClick={() => setSelectedArticle(item)}
                className="group bg-white rounded-3xl border border-slate-200 hover:border-amber-500 shadow-md hover:shadow-xl transition-all duration-300 p-6 flex flex-col justify-between cursor-pointer transform hover:-translate-y-1"
              >
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <span className="inline-flex items-center gap-1.5 text-xs font-bold text-amber-700 bg-amber-50 px-3 py-1 rounded-full border border-amber-200">
                      <Calendar className="w-3.5 h-3.5 text-amber-600" />
                      {item.date || 'Recent Update'}
                    </span>
                    <Megaphone className="w-4 h-4 text-slate-400 group-hover:text-amber-600 transition-colors" />
                  </div>

                  <h3 className="text-xl font-black text-[#0B1A30] leading-snug group-hover:text-amber-600 transition-colors">
                    {item.title}
                  </h3>

                  <p className="text-xs text-slate-600 leading-relaxed line-clamp-4">
                    {item.description}
                  </p>
                </div>

                <div className="pt-6 mt-6 border-t border-slate-100 flex items-center justify-between text-xs font-bold text-[#0B1A30]">
                  <span>Read Announcement</span>
                  <ArrowRight className="w-4 h-4 text-amber-600 group-hover:translate-x-1 transition-transform" />
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="p-12 text-center bg-white border border-slate-200 rounded-3xl max-w-2xl mx-auto shadow-sm space-y-3">
            <div className="w-12 h-12 rounded-2xl bg-amber-50 border border-amber-200 text-amber-600 flex items-center justify-center mx-auto">
              <Megaphone className="w-6 h-6" />
            </div>
            <h3 className="text-lg font-bold text-[#0B1A30]">No News & Updates Published Yet</h3>
            <p className="text-xs text-slate-500 leading-relaxed max-w-md mx-auto">
              Official school updates and administrative press releases will be displayed here once published by the school administration.
            </p>
          </div>
        )}

      </div>

      {/* Full Article Modal */}
      {selectedArticle && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/70 backdrop-blur-sm animate-in fade-in duration-200">
          <div className="bg-white max-w-2xl w-full rounded-3xl border border-slate-200 shadow-2xl overflow-hidden relative text-slate-900 max-h-[90vh] flex flex-col">
            
            {/* Modal Header */}
            <div className="bg-[#0B1A30] p-6 text-white flex items-center justify-between relative">
              <div className="flex items-center gap-2">
                <Newspaper className="w-5 h-5 text-amber-400" />
                <span className="text-xs font-bold uppercase tracking-wider text-amber-300">Nexus Official Announcement</span>
              </div>
              <button
                onClick={() => setSelectedArticle(null)}
                className="p-1.5 rounded-full bg-white/10 hover:bg-white/20 text-white transition-colors"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Modal Content */}
            <div className="p-6 sm:p-8 overflow-y-auto space-y-6">
              <div className="space-y-2">
                <div className="flex items-center gap-2 text-xs font-bold text-amber-700">
                  <Calendar className="w-4 h-4 text-amber-600" />
                  <span>{selectedArticle.date || 'Published Update'}</span>
                </div>
                <h3 className="text-2xl font-black text-[#0B1A30] leading-snug">
                  {selectedArticle.title}
                </h3>
              </div>

              <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200 text-xs sm:text-sm text-slate-800 leading-relaxed whitespace-pre-wrap">
                {selectedArticle.description}
              </div>

              <div className="pt-4 border-t border-slate-200 flex justify-end">
                <button
                  onClick={() => setSelectedArticle(null)}
                  className="px-6 py-2.5 rounded-xl bg-[#0B1A30] text-white text-xs font-bold hover:bg-slate-800 transition-colors"
                >
                  Close Notice
                </button>
              </div>
            </div>

          </div>
        </div>
      )}
    </section>
  );
};
