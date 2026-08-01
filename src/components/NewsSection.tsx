import React, { useState, useEffect } from 'react';
import { NewsItem } from '../types';
import { getNewsFromFirestore } from '../lib/firebase';
import { BookOpen, ArrowRight, X, Clock, User, Newspaper } from 'lucide-react';

export const NewsSection: React.FC = () => {
  const [selectedNews, setSelectedNews] = useState<NewsItem | null>(null);
  const [newsList, setNewsList] = useState<NewsItem[]>([]);

  const fetchNews = async () => {
    const data = await getNewsFromFirestore();
    setNewsList(data);
  };

  useEffect(() => {
    fetchNews();
    window.addEventListener('nexus_news_updated', fetchNews);
    return () => window.removeEventListener('nexus_news_updated', fetchNews);
  }, []);

  return (
    <section id="news" className="py-24 bg-slate-50 text-slate-900 relative overflow-hidden border-t border-slate-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        <div className="text-center max-w-3xl mx-auto mb-16 space-y-3">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-amber-50 border border-amber-300 text-amber-900 text-xs font-bold uppercase tracking-wider">
            <BookOpen className="w-4 h-4 text-amber-600" />
            Institutional Press & News
          </div>
          <h2 className="text-3xl sm:text-5xl font-black text-[#0B1A30] tracking-tight heading-font">
            Latest <span className="text-amber-600">News & Announcements</span>
          </h2>
          <p className="text-slate-600 text-base sm:text-lg">
            Read official press releases, national UNEB examination results, and school milestones.
          </p>
        </div>

        {newsList.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {newsList.map((article) => (
              <div
                key={article.id}
                className="bg-white rounded-3xl overflow-hidden border border-slate-200 shadow-md hover:shadow-xl transition-all duration-300 flex flex-col justify-between group hover:border-amber-500 transform hover:-translate-y-1"
              >
                <div>
                  <div className="p-6 bg-[#0B1A30] text-white flex justify-between items-start">
                    <span className="px-3 py-1 rounded-full bg-amber-500 text-slate-950 text-[10px] font-black uppercase">
                      {article.category || 'Official Press'}
                    </span>
                    <Newspaper className="w-5 h-5 text-amber-400" />
                  </div>

                  <div className="p-6 space-y-3">
                    <div className="flex items-center gap-3 text-xs text-slate-500 font-semibold">
                      <span className="flex items-center gap-1">
                        <Clock className="w-3.5 h-3.5 text-amber-600" />
                        {article.date}
                      </span>
                      {article.author && (
                        <>
                          <span>•</span>
                          <span className="flex items-center gap-1">
                            <User className="w-3.5 h-3.5" />
                            {article.author}
                          </span>
                        </>
                      )}
                    </div>

                    <h3 className="text-lg font-black text-[#0B1A30] group-hover:text-amber-600 transition-colors leading-snug">
                      {article.title}
                    </h3>

                    <p className="text-xs text-slate-600 leading-relaxed line-clamp-3">
                      {article.summary || article.content}
                    </p>
                  </div>
                </div>

                <div className="p-6 pt-0">
                  <button
                    onClick={() => setSelectedNews(article)}
                    className="flex items-center gap-2 text-xs font-bold text-[#0B1A30] hover:text-amber-600 transition-colors group/link"
                  >
                    <span>Read Full Release</span>
                    <ArrowRight className="w-4 h-4 group-hover/link:translate-x-1.5 transition-transform text-amber-600" />
                  </button>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="p-12 text-center bg-white border border-slate-200 rounded-3xl space-y-3">
            <Newspaper className="w-10 h-10 text-slate-400 mx-auto" />
            <p className="text-sm font-bold text-[#0B1A30]">No news articles posted yet.</p>
            <p className="text-xs text-slate-500">School administrators can add official press releases in the Admin Portal.</p>
          </div>
        )}
      </div>

      {/* Article Modal */}
      {selectedNews && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/70 backdrop-blur-sm animate-in fade-in duration-200">
          <div className="bg-white w-full max-w-3xl rounded-3xl p-6 sm:p-8 border border-slate-200 shadow-2xl relative max-h-[90vh] overflow-y-auto text-slate-900">
            <button
              onClick={() => setSelectedNews(null)}
              className="absolute top-6 right-6 p-2 rounded-full bg-slate-100 text-slate-700 hover:bg-[#0B1A30] hover:text-white transition-colors"
            >
              <X className="w-5 h-5" />
            </button>

            <div className="p-4 rounded-2xl bg-slate-100 border border-slate-200 mb-6 flex items-center justify-between">
              <div>
                <span className="text-xs font-black text-amber-700 uppercase">{selectedNews.category || 'Press Release'}</span>
                <p className="text-xs text-slate-500 font-semibold mt-0.5">{selectedNews.date} {selectedNews.author && `• ${selectedNews.author}`}</p>
              </div>
              <BookOpen className="w-6 h-6 text-[#0B1A30]" />
            </div>

            <div className="space-y-4">
              <h3 className="text-2xl sm:text-3xl font-black text-[#0B1A30]">
                {selectedNews.title}
              </h3>

              <p className="text-sm text-slate-700 leading-relaxed font-medium pt-3 border-t border-slate-100 whitespace-pre-wrap">
                {selectedNews.content}
              </p>
            </div>
          </div>
        </div>
      )}
    </section>
  );
};
