import React, { useState, useEffect } from 'react';
import { EventItem } from '../types';
import { getEventsFromFirestore } from '../lib/firebase';
import { Calendar } from 'lucide-react';

export const EventsSection: React.FC = () => {
  const [events, setEvents] = useState<EventItem[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  const fetchEvents = async () => {
    setIsLoading(true);
    const data = await getEventsFromFirestore();
    setEvents(data);
    setIsLoading(false);
  };

  useEffect(() => {
    fetchEvents();
    window.addEventListener('nexus_events_updated', fetchEvents);
    return () => window.removeEventListener('nexus_events_updated', fetchEvents);
  }, []);

  return (
    <section id="events" className="py-10 bg-white text-slate-900 border-t border-slate-200">
      <div className="max-w-4xl mx-auto px-4">
        <div className="border-b border-slate-300 pb-3 mb-4 flex items-center gap-2">
          <Calendar className="w-5 h-5 text-[#0B1A30]" />
          <h2 className="text-xl font-bold text-[#0B1A30]">Upcoming School Events</h2>
        </div>

        {isLoading ? (
          <p className="text-xs text-slate-500 italic">Loading events...</p>
        ) : events.length > 0 ? (
          <ul className="list-disc list-inside space-y-3 text-xs text-slate-800">
            {events.map((evt) => (
              <li key={evt.id} className="leading-relaxed">
                <strong className="text-[#0B1A30] font-bold text-sm">{evt.title}</strong>
                {evt.date && <span className="text-slate-500 font-semibold ml-2">({evt.date})</span>}
                {evt.description && <p className="pl-5 text-slate-700 mt-0.5">{evt.description}</p>}
              </li>
            ))}
          </ul>
        ) : (
          <p className="text-xs text-slate-500 italic">No upcoming events scheduled at this time.</p>
        )}
      </div>
    </section>
  );
};
