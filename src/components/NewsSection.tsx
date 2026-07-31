import React, { useState } from 'react';
import { NEWS_ARTICLES } from '../data/schoolData';
import { NewsItem } from '../types';
import { BookOpen, ArrowRight, X, Clock, User, Sparkles } from 'lucide-react';

export const NewsSection: React.FC = () => {
  const [selectedNews, setSelectedNews] = useState<NewsItem | null>(null);

  return (
    <section id="news" className="py-24 bg-[#07111F] relative overflow-hidden border-t border-white/10">
      
      {/* Background glow */}
      <div className="absolute top-10 right-10 w-96 h-96 rounded-full bg-amber-500/10 blur-[150px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        <div className="text-center max-w-3xl mx-auto mb-16 space-y-3">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full glass-card border border-[#D4AF37]/30 text-amber-300 text-xs font-bold uppercase tracking-widest">
            <BookOpen className="w-3.5 h-3.5 text-[#D4AF37]" />
            Institutional Press
          </div>
          <h2 className="text-3xl sm:text-5xl font-extrabold text-white heading-font">
            Latest <span className="gold-gradient-text">News & Achievements</span>
          </h2>
          <p className="text-gray-300 text-base sm:text-lg">
            Stay updated with national examination releases, STEM wing inaugurations, and sports victories.
          </p>
        </div>

        {/* 3 Premium News Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {NEWS_ARTICLES.map((article) => (
            <div
              key={article.id}
              className="glass-card glass-card-hover rounded-3xl overflow-hidden border border-white/15 shadow-2xl flex flex-col justify-between group"
            >
              <div>
                {/* News Banner (No Photo Images) */}
                <div className="relative p-6 bg-gradient-to-r from-[#10253C] to-[#0D1F33] border-b border-white/10 flex justify-between items-start">
                  <div className="px-3 py-1 rounded-full bg-black/60 backdrop-blur-md border border-amber-500/30 text-[10px] font-bold text-[#D4AF37]">
                    {article.category}
                  </div>
                  <Sparkles className="w-5 h-5 text-[#D4AF37]/80" />
                </div>

                <div className="p-6 space-y-3">
                  <div className="flex items-center gap-3 text-xs text-gray-400">
                    <span className="flex items-center gap-1">
                      <Clock className="w-3.5 h-3.5 text-[#D4AF37]" />
                      {article.date}
                    </span>
                    <span>•</span>
                    <span className="flex items-center gap-1">
                      <User className="w-3.5 h-3.5" />
                      {article.author}
                    </span>
                  </div>

                  <h3 className="text-xl font-bold text-white group-hover:text-amber-200 transition-colors leading-snug">
                    {article.title}
                  </h3>

                  <p className="text-xs text-gray-300 leading-relaxed line-clamp-3">
                    {article.summary}
                  </p>
                </div>
              </div>

              <div className="p-6 pt-0">
                <button
                  onClick={() => setSelectedNews(article)}
                  className="flex items-center gap-2 text-xs font-bold text-[#D4AF37] hover:text-white transition-colors group/link"
                >
                  <span>Read Full Press Release</span>
                  <ArrowRight className="w-4 h-4 group-hover/link:translate-x-1.5 transition-transform" />
                </button>
              </div>

            </div>
          ))}
        </div>

      </div>

      {/* Article Detail Modal */}
      {selectedNews && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md animate-in fade-in duration-200">
          <div className="glass-card w-full max-w-3xl rounded-3xl p-6 sm:p-8 border border-white/20 shadow-2xl relative max-h-[90vh] overflow-y-auto">
            <button
              onClick={() => setSelectedNews(null)}
              className="absolute top-6 right-6 p-2 rounded-xl bg-white/10 hover:bg-white/20 text-white transition-colors"
            >
              <X className="w-5 h-5" />
            </button>

            <div className="p-6 rounded-2xl bg-gradient-to-br from-[#10253C] to-[#07111F] border border-amber-500/30 mb-6 flex items-center justify-between">
              <div>
                <span className="text-xs font-bold text-[#D4AF37] uppercase">{selectedNews.category}</span>
                <p className="text-xs text-gray-400 mt-1">{selectedNews.date} • {selectedNews.author}</p>
              </div>
              <Sparkles className="w-6 h-6 text-[#D4AF37]" />
            </div>

            <div className="space-y-4">
              <div className="flex items-center gap-3 text-xs text-[#D4AF37]">
                <span className="bg-amber-500/20 px-2.5 py-1 rounded-full font-bold">{selectedNews.category}</span>
                <span>•</span>
                <span>{selectedNews.date}</span>
              </div>

              <h3 className="text-2xl sm:text-3xl font-bold text-white heading-font">
                {selectedNews.title}
              </h3>

              <p className="text-sm text-gray-200 leading-relaxed font-normal pt-2 border-t border-white/10">
                {selectedNews.content}
              </p>
            </div>
          </div>
        </div>
      )}

    </section>
  );
};
