import React from 'react';
import { UPCOMING_EVENTS } from '../data/schoolData';
import { Calendar, Clock, MapPin, Sparkles, ArrowRight } from 'lucide-react';

export const EventsSection: React.FC = () => {
  return (
    <section id="events" className="py-24 bg-[#07111F] relative overflow-hidden border-t border-white/10">
      
      {/* Background glow */}
      <div className="absolute top-1/2 left-10 w-96 h-96 rounded-full bg-blue-600/10 blur-[150px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        <div className="text-center max-w-3xl mx-auto mb-16 space-y-3">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full glass-card border border-[#D4AF37]/30 text-amber-300 text-xs font-bold uppercase tracking-widest">
            <Calendar className="w-3.5 h-3.5 text-[#D4AF37]" />
            Campus Calendar
          </div>
          <h2 className="text-3xl sm:text-5xl font-extrabold text-white heading-font">
            Upcoming <span className="gold-gradient-text">Events & Expos</span>
          </h2>
          <p className="text-gray-300 text-base sm:text-lg">
            Join us for science fairs, aquatics galas, global youth forums, and parent open days.
          </p>
        </div>

        {/* Events Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {UPCOMING_EVENTS.map((event) => (
            <div
              key={event.id}
              className="glass-card glass-card-hover rounded-3xl overflow-hidden border border-white/15 shadow-2xl flex flex-col justify-between group"
            >
              <div>
                {/* Event Header Banner (No Photo Images) */}
                <div className="relative p-6 bg-gradient-to-r from-[#10253C] to-[#0D1F33] border-b border-white/10 flex justify-between items-start">
                  <div className="px-3 py-1 rounded-full bg-black/60 backdrop-blur-md border border-amber-500/30 text-[10px] font-bold text-[#D4AF37]">
                    {event.category}
                  </div>
                  <Calendar className="w-6 h-6 text-[#D4AF37]/80" />
                </div>

                {/* Event Details */}
                <div className="p-6 space-y-4">
                  <h3 className="text-xl font-bold text-white group-hover:text-amber-200 transition-colors leading-snug">
                    {event.title}
                  </h3>

                  <p className="text-xs text-gray-300 leading-relaxed">
                    {event.description}
                  </p>

                  <div className="space-y-2 pt-2 border-t border-white/10 text-xs text-gray-300">
                    <div className="flex items-center gap-2 text-amber-300 font-medium">
                      <Calendar className="w-4 h-4 text-[#D4AF37]" />
                      <span>{event.date}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Clock className="w-4 h-4 text-gray-400" />
                      <span>{event.time}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <MapPin className="w-4 h-4 text-gray-400" />
                      <span className="truncate">{event.location}</span>
                    </div>
                  </div>
                </div>
              </div>

              <div className="p-6 pt-0">
                <button
                  onClick={() => alert(`RSVP registration for "${event.title}" confirmed! Confirmation details sent to your contact.`)}
                  className="w-full flex items-center justify-center gap-2 py-3 rounded-xl bg-white/5 hover:bg-[#D4AF37] text-white hover:text-black font-bold text-xs border border-white/15 hover:border-[#D4AF37] transition-all"
                >
                  <span>RSVP & Attend Event</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </button>
              </div>

            </div>
          ))}
        </div>

      </div>
    </section>
  );
};
