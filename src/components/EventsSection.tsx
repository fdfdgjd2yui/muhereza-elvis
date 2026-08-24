import React, { useState, useEffect } from 'react';
import { EventItem } from '../types';
import { subscribeToEvents } from '../lib/firebase';
import { 
  Calendar, 
  Clock, 
  MapPin, 
  Tag, 
  Search, 
  X, 
  CheckCircle2, 
  Bell, 
  Share2,
  ChevronRight,
  ImageIcon
} from 'lucide-react';

export const EventsSection: React.FC = () => {
  const [events, setEvents] = useState<EventItem[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [selectedEvent, setSelectedEvent] = useState<EventItem | null>(null);
  const [showReminderMenu, setShowReminderMenu] = useState(false);
  const [reminderConfirmed, setReminderConfirmed] = useState(false);

  const downloadIcsFile = (evt: EventItem) => {
    const title = evt.title || 'Nexus Academy Event';
    const description = evt.description || 'Nexus Academy Official Event';
    const location = evt.location || 'Nexus Academy Campus';
    
    let startDateStr = '20260815T090000Z';
    let endDateStr = '20260815T160000Z';
    
    try {
      if (evt.date) {
        const parsedDate = new Date(evt.date);
        if (!isNaN(parsedDate.getTime())) {
          const y = parsedDate.getUTCFullYear();
          const m = String(parsedDate.getUTCMonth() + 1).padStart(2, '0');
          const d = String(parsedDate.getUTCDate()).padStart(2, '0');
          startDateStr = `${y}${m}${d}T090000Z`;
          endDateStr = `${y}${m}${d}T160000Z`;
        }
      }
    } catch (e) {
      // fallback
    }

    const cleanDesc = description.replace(/\r?\n/g, '\\n').replace(/[,;]/g, '\\$&');
    const cleanTitle = title.replace(/[,;]/g, '\\$&');

    const icsContent = [
      'BEGIN:VCALENDAR',
      'VERSION:2.0',
      'PRODID:-//Nexus Academy Uganda//Events//EN',
      'CALSCALE:GREGORIAN',
      'METHOD:PUBLISH',
      'BEGIN:VEVENT',
      `SUMMARY:${cleanTitle}`,
      `DESCRIPTION:${cleanDesc}`,
      `LOCATION:${location}`,
      `DTSTART:${startDateStr}`,
      `DTEND:${endDateStr}`,
      'STATUS:CONFIRMED',
      'BEGIN:VALARM',
      'TRIGGER:-PT1H',
      'ACTION:DISPLAY',
      `DESCRIPTION:Reminder for ${cleanTitle}`,
      'END:VALARM',
      'END:VEVENT',
      'END:VCALENDAR'
    ].join('\r\n');

    const blob = new Blob([icsContent], { type: 'text/calendar;charset=utf-8' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.setAttribute('download', `${title.replace(/[^a-z0-9]/gi, '_').toLowerCase()}.ics`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    setReminderConfirmed(true);
  };

  const getGoogleCalendarUrl = (evt: EventItem) => {
    const title = encodeURIComponent(evt.title || 'Nexus Academy Event');
    const details = encodeURIComponent(`${evt.description || ''}\n\nNexus Academy Uganda`);
    const location = encodeURIComponent(evt.location || 'Nexus Academy Campus');
    
    let dates = '20260815T090000Z/20260815T170000Z';
    try {
      if (evt.date) {
        const parsedDate = new Date(evt.date);
        if (!isNaN(parsedDate.getTime())) {
          const y = parsedDate.getUTCFullYear();
          const m = String(parsedDate.getUTCMonth() + 1).padStart(2, '0');
          const d = String(parsedDate.getUTCDate()).padStart(2, '0');
          dates = `${y}${m}${d}T090000Z/${y}${m}${d}T170000Z`;
        }
      }
    } catch (e) {}

    return `https://calendar.google.com/calendar/render?action=TEMPLATE&text=${title}&dates=${dates}&details=${details}&location=${location}`;
  };

  useEffect(() => {
    setIsLoading(true);
    const unsubscribe = subscribeToEvents((data) => {
      setEvents(data);
      setIsLoading(false);
    });
    return () => unsubscribe();
  }, []);

  const categories = [
    { id: 'all', label: 'All Events' },
    { id: 'Academics', label: 'Academics' },
    { id: 'Examinations', label: 'Examinations' },
    { id: 'Sports', label: 'Sports & Athletics' },
    { id: 'Cultural', label: 'Arts & Cultural' }
  ];

  const filteredEvents = events.filter((evt) => {
    const matchesCat = selectedCategory === 'all' || 
      evt.category?.toLowerCase() === selectedCategory.toLowerCase();
    const matchesSearch = !searchQuery ||
      evt.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      evt.description?.toLowerCase().includes(searchQuery.toLowerCase()) ||
      evt.location?.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCat && matchesSearch;
  });

  return (
    <section id="events" className="py-20 bg-white text-slate-900 relative border-t border-slate-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12 border-b border-slate-200 pb-8">
          <div>
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-amber-50 border border-amber-300 text-amber-900 text-xs font-bold uppercase tracking-wider mb-3">
              <Calendar className="w-4 h-4 text-amber-600" />
              School Calendar & Key Dates
            </div>
            <h2 className="text-3xl sm:text-5xl font-black text-[#0B1A30] tracking-tight heading-font">
              Upcoming <span className="text-amber-600">Events & Activities</span>
            </h2>
            <p className="text-slate-600 text-base sm:text-lg mt-2 max-w-2xl">
              Stay connected with academic benchmarks, examination briefings, athletics galas, and official school ceremonies.
            </p>
          </div>

          {/* Search Box */}
          <div className="relative w-full md:w-72 shrink-0">
            <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              placeholder="Search school events..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-10 pr-4 py-2.5 rounded-xl border border-slate-300 text-xs font-semibold text-slate-800 focus:outline-none focus:border-[#0B1A30] bg-slate-50 focus:bg-white transition-all shadow-sm"
            />
            {searchQuery && (
              <button onClick={() => setSearchQuery('')} className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600">
                <X className="w-4 h-4" />
              </button>
            )}
          </div>
        </div>

        {/* Category Pills */}
        <div className="flex flex-wrap items-center gap-2 mb-10">
          {categories.map((cat) => (
            <button
              key={cat.id}
              onClick={() => setSelectedCategory(cat.id)}
              className={`px-4 py-2 rounded-xl text-xs font-bold transition-all border ${
                selectedCategory === cat.id
                  ? 'bg-[#0B1A30] text-white border-[#0B1A30] shadow-md scale-105'
                  : 'bg-slate-100 text-slate-700 border-slate-200 hover:bg-slate-200 hover:border-slate-300'
              }`}
            >
              {cat.label}
            </button>
          ))}
        </div>

        {/* Big Bold Event Grid */}
        {isLoading ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[1, 2, 3].map((n) => (
              <div key={n} className="rounded-2xl border border-slate-200 bg-slate-50 p-6 animate-pulse space-y-4">
                <div className="h-40 rounded-xl bg-slate-200" />
                <div className="h-6 w-3/4 rounded bg-slate-200" />
                <div className="h-4 w-1/2 rounded bg-slate-200" />
              </div>
            ))}
          </div>
        ) : filteredEvents.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredEvents.map((evt) => (
              <div
                key={evt.id}
                onClick={() => setSelectedEvent(evt)}
                className="group bg-white rounded-3xl border border-slate-200 hover:border-amber-500 shadow-md hover:shadow-xl transition-all duration-300 overflow-hidden flex flex-col justify-between cursor-pointer transform hover:-translate-y-1"
              >
                <div>
                  {/* Event Top Banner / Photo */}
                  <div className="relative h-48 w-full bg-slate-100 overflow-hidden border-b border-slate-100">
                    {evt.image ? (
                      <img
                        src={evt.image}
                        alt={evt.title}
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                      />
                    ) : (
                      <div className="w-full h-full bg-gradient-to-br from-[#0B1A30] via-[#10253C] to-slate-800 p-6 flex flex-col justify-between relative text-white">
                        <div className="flex items-center justify-between">
                          <span className="px-3 py-1 rounded-full bg-amber-500/20 border border-amber-400/30 text-amber-300 text-[11px] font-extrabold uppercase tracking-wider">
                            {evt.category || 'School Event'}
                          </span>
                          <Calendar className="w-6 h-6 text-amber-400" />
                        </div>
                        <div>
                          <p className="text-2xl font-black text-white opacity-20 uppercase tracking-tighter">NEXUS ACADEMY</p>
                        </div>
                      </div>
                    )}

                    {/* Date Badge */}
                    <div className="absolute top-4 left-4 bg-white/95 backdrop-blur-md px-3 py-2 rounded-2xl shadow-lg border border-slate-200 text-center min-w-[64px]">
                      <span className="block text-xs font-black uppercase text-amber-600 tracking-wider">
                        {evt.date ? evt.date.split(' ')[0] : 'UPCOMING'}
                      </span>
                      <span className="block text-lg font-black text-[#0B1A30] leading-none mt-0.5">
                        {evt.date && evt.date.split(' ')[1] ? evt.date.split(' ')[1].replace(',', '') : '★'}
                      </span>
                    </div>
                  </div>

                  {/* Body Details */}
                  <div className="p-6 space-y-3">
                    <div className="flex items-center gap-2 text-xs font-bold text-amber-700">
                      <Tag className="w-3.5 h-3.5" />
                      <span>{evt.category || 'School Official'}</span>
                    </div>

                    <h3 className="text-xl font-black text-[#0B1A30] leading-snug group-hover:text-amber-600 transition-colors">
                      {evt.title}
                    </h3>

                    {/* Time & Location Chips */}
                    <div className="flex flex-wrap items-center gap-3 text-xs text-slate-600 font-medium pt-1">
                      {evt.date && (
                        <span className="flex items-center gap-1.5 bg-slate-100 px-2.5 py-1 rounded-lg">
                          <Calendar className="w-3.5 h-3.5 text-slate-500" />
                          {evt.date}
                        </span>
                      )}
                      {evt.time && (
                        <span className="flex items-center gap-1.5 bg-slate-100 px-2.5 py-1 rounded-lg">
                          <Clock className="w-3.5 h-3.5 text-slate-500" />
                          {evt.time}
                        </span>
                      )}
                    </div>

                    {evt.location && (
                      <p className="flex items-center gap-1.5 text-xs font-semibold text-slate-500">
                        <MapPin className="w-3.5 h-3.5 text-amber-600 shrink-0" />
                        <span>{evt.location}</span>
                      </p>
                    )}

                    {evt.description && (
                      <p className="text-xs text-slate-600 line-clamp-3 leading-relaxed pt-1">
                        {evt.description}
                      </p>
                    )}
                  </div>
                </div>

                {/* Card Footer Action */}
                <div className="px-6 py-4 bg-slate-50 border-t border-slate-100 flex items-center justify-between text-xs font-bold text-[#0B1A30]">
                  <span>View Details & Schedule</span>
                  <ChevronRight className="w-4 h-4 text-amber-600 group-hover:translate-x-1 transition-transform" />
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="p-12 text-center bg-slate-50 border border-slate-200 rounded-3xl space-y-3">
            <Calendar className="w-10 h-10 text-slate-400 mx-auto" />
            <p className="text-sm font-bold text-[#0B1A30]">No events match your current filter.</p>
            <p className="text-xs text-slate-500">Try selecting "All Events" or resetting your search term.</p>
          </div>
        )}

      </div>

      {/* Event Details Modal */}
      {selectedEvent && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/70 backdrop-blur-sm animate-in fade-in duration-200">
          <div className="bg-white max-w-2xl w-full rounded-3xl border border-slate-200 shadow-2xl overflow-hidden relative text-slate-900 max-h-[90vh] flex flex-col">
            
            {/* Header / Image */}
            <div className="relative h-64 bg-slate-900 overflow-hidden shrink-0">
              {selectedEvent.image ? (
                <img src={selectedEvent.image} alt={selectedEvent.title} className="w-full h-full object-cover" />
              ) : (
                <div className="w-full h-full bg-gradient-to-br from-[#0B1A30] to-slate-800 p-8 flex flex-col justify-between text-white">
                  <div className="flex justify-between items-start">
                    <span className="px-3 py-1 rounded-full bg-amber-500 text-slate-950 font-black text-xs uppercase">
                      {selectedEvent.category || 'Official Event'}
                    </span>
                  </div>
                  <div>
                    <h3 className="text-2xl font-black text-white leading-snug">{selectedEvent.title}</h3>
                  </div>
                </div>
              )}

              <button
                onClick={() => setSelectedEvent(null)}
                className="absolute top-4 right-4 p-2 rounded-full bg-black/60 text-white hover:bg-black transition-colors"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Modal Body */}
            <div className="p-6 sm:p-8 overflow-y-auto space-y-6">
              <div>
                <span className="text-xs font-extrabold uppercase tracking-wider text-amber-600">{selectedEvent.category || 'School Event'}</span>
                <h3 className="text-2xl font-black text-[#0B1A30] mt-1">{selectedEvent.title}</h3>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 p-4 rounded-2xl bg-slate-50 border border-slate-200 text-xs font-semibold">
                <div className="flex items-center gap-3">
                  <Calendar className="w-5 h-5 text-amber-600 shrink-0" />
                  <div>
                    <span className="text-slate-400 block text-[10px] uppercase">Date</span>
                    <span className="text-[#0B1A30]">{selectedEvent.date || 'TBA'}</span>
                  </div>
                </div>

                <div className="flex items-center gap-3">
                  <Clock className="w-5 h-5 text-amber-600 shrink-0" />
                  <div>
                    <span className="text-slate-400 block text-[10px] uppercase">Time</span>
                    <span className="text-[#0B1A30]">{selectedEvent.time || '09:00 AM'}</span>
                  </div>
                </div>

                {selectedEvent.location && (
                  <div className="flex items-center gap-3 sm:col-span-2 border-t border-slate-200 pt-3">
                    <MapPin className="w-5 h-5 text-amber-600 shrink-0" />
                    <div>
                      <span className="text-slate-400 block text-[10px] uppercase">Venue & Location</span>
                      <span className="text-[#0B1A30]">{selectedEvent.location}</span>
                    </div>
                  </div>
                )}
              </div>

              {selectedEvent.description && (
                <div className="space-y-2">
                  <h4 className="text-xs font-bold uppercase text-slate-500">Event Overview & Agenda</h4>
                  <p className="text-sm text-slate-700 leading-relaxed whitespace-pre-wrap">
                    {selectedEvent.description}
                  </p>
                </div>
              )}

              {/* Calendar Reminder Options Box */}
              {showReminderMenu && (
                <div className="p-4 rounded-2xl bg-amber-50 border border-amber-300 space-y-3 animate-in fade-in duration-200">
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-black text-amber-950 uppercase tracking-wider flex items-center gap-1.5">
                      <Bell className="w-4 h-4 text-amber-600" /> Choose Mobile / Desktop Calendar Option
                    </span>
                    <button
                      onClick={() => setShowReminderMenu(false)}
                      className="text-amber-800 hover:text-amber-950 text-xs font-bold"
                    >
                      <X className="w-4 h-4" />
                    </button>
                  </div>

                  {reminderConfirmed && (
                    <div className="p-2.5 rounded-xl bg-emerald-100 border border-emerald-300 text-emerald-900 text-xs font-bold flex items-center gap-2">
                      <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                      <span>Reminder scheduled! Event file downloaded for your phone calendar.</span>
                    </div>
                  )}

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs">
                    <a
                      href={getGoogleCalendarUrl(selectedEvent)}
                      target="_blank"
                      rel="noopener noreferrer"
                      onClick={() => setReminderConfirmed(true)}
                      className="p-3 rounded-xl bg-white border border-amber-200 hover:border-amber-400 font-bold text-[#0B1A30] flex items-center gap-2.5 shadow-sm hover:shadow transition-all"
                    >
                      <Calendar className="w-4 h-4 text-amber-600" />
                      <div>
                        <span className="block font-black">Google Calendar</span>
                        <span className="text-[10px] text-slate-500 font-normal">Opens Google Calendar app</span>
                      </div>
                    </a>

                    <button
                      type="button"
                      onClick={() => downloadIcsFile(selectedEvent)}
                      className="p-3 rounded-xl bg-white border border-amber-200 hover:border-amber-400 font-bold text-[#0B1A30] flex items-center gap-2.5 shadow-sm hover:shadow transition-all text-left"
                    >
                      <Bell className="w-4 h-4 text-amber-600" />
                      <div>
                        <span className="block font-black">iPhone / Android (.ics)</span>
                        <span className="text-[10px] text-slate-500 font-normal">Syncs with native Phone Calendar</span>
                      </div>
                    </button>
                  </div>
                </div>
              )}

              <div className="pt-4 border-t border-slate-200 flex flex-col sm:flex-row items-center justify-between gap-3">
                <button
                  onClick={() => setShowReminderMenu(!showReminderMenu)}
                  className="w-full sm:w-auto px-5 py-2.5 rounded-xl bg-[#0B1A30] text-white text-xs font-bold hover:bg-slate-800 transition-colors flex items-center justify-center gap-2 shadow"
                >
                  <Bell className="w-4 h-4 text-amber-400" />
                  <span>{showReminderMenu ? 'Hide Reminder Options' : '📅 Set Calendar Reminder'}</span>
                </button>

                <button
                  onClick={() => {
                    setSelectedEvent(null);
                    setShowReminderMenu(false);
                    setReminderConfirmed(false);
                  }}
                  className="w-full sm:w-auto px-5 py-2.5 rounded-xl bg-slate-100 text-slate-700 text-xs font-bold hover:bg-slate-200 transition-colors"
                >
                  Close Window
                </button>
              </div>
            </div>

          </div>
        </div>
      )}
    </section>
  );
};
