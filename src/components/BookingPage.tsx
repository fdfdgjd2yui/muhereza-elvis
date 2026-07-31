import React, { useState } from 'react';
import { 
  Calendar, 
  Clock, 
  MapPin, 
  User, 
  Mail, 
  Phone, 
  Send, 
  CheckCircle2, 
  ArrowLeft,
  Sparkles,
  ShieldCheck,
  Building,
  GraduationCap
} from 'lucide-react';

interface BookingPageProps {
  onBack: () => void;
  onOpenApply: () => void;
}

export const BookingPage: React.FC<BookingPageProps> = ({ onBack, onOpenApply }) => {
  const [parentName, setParentName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [scholarLevel, setScholarLevel] = useState<'O-Level (UCE)' | 'A-Level (UACE)' | 'General Inquiry'>('O-Level (UCE)');
  const [bookingDate, setBookingDate] = useState('2026-08-05');
  const [timeSlot, setTimeSlot] = useState('10:00 AM - 11:30 AM');
  const [tourType, setTourType] = useState<'In-Person Campus Tour' | 'Virtual Consultation' | 'Academic Counseling'>('In-Person Campus Tour');
  const [notes, setNotes] = useState('');
  
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [bookingRef, setBookingRef] = useState('');

  const handleSubmitBooking = (e: React.FormEvent) => {
    e.preventDefault();
    if (!parentName || !phone) return;

    const ref = `NX-BOOK-${Math.floor(100000 + Math.random() * 900000)}`;
    setBookingRef(ref);
    setIsSubmitted(true);
  };

  return (
    <div className="min-h-screen bg-[#07111F] text-white pt-28 pb-24 relative overflow-hidden">
      
      {/* Light Blue Ambient Background Glows */}
      <div className="absolute top-20 right-1/4 w-[35rem] h-[22rem] bg-sky-500/15 blur-[160px] pointer-events-none" />
      <div className="absolute bottom-20 left-1/4 w-[35rem] h-[22rem] bg-blue-600/15 blur-[160px] pointer-events-none" />

      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Navigation Breadcrumb */}
        <div className="mb-8 flex items-center justify-between">
          <button
            onClick={onBack}
            className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl bg-white/10 hover:bg-white/20 text-xs font-bold text-white transition-all border border-white/15"
          >
            <ArrowLeft className="w-4 h-4 text-sky-400" />
            <span>Return to Main Website</span>
          </button>

          <span className="text-xs text-sky-300 font-bold bg-sky-500/15 border border-sky-400/30 px-3 py-1.5 rounded-full">
            Official Campus Visit & Admissions Portal
          </span>
        </div>

        {/* Page Banner Header */}
        <div className="text-center max-w-2xl mx-auto mb-10 space-y-3">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full glass-card border border-sky-400/30 text-sky-300 text-xs font-bold uppercase tracking-widest">
            <Calendar className="w-4 h-4 text-sky-400" />
            Book a Personal Campus Visit or Consultation
          </div>
          <h1 className="text-3xl sm:text-5xl font-extrabold text-white heading-font">
            Schedule Your <span className="blue-gradient-text">Campus Experience</span>
          </h1>
          <p className="text-gray-300 text-xs sm:text-base">
            Experience Nexus Academy's state-of-the-art laboratories, modern classrooms, and vibrant campus life firsthand with our admissions directors.
          </p>
        </div>

        {!isSubmitted ? (
          <form onSubmit={handleSubmitBooking} className="glass-card rounded-3xl p-6 sm:p-10 border border-sky-500/30 shadow-2xl space-y-8 bg-gradient-to-br from-[#10253C] via-[#07111F] to-[#10253C]">
            
            {/* Top Cyan Accent Line */}
            <div className="h-2 w-full bg-gradient-to-r from-sky-400 via-blue-500 to-cyan-400 rounded-t-3xl -mt-6 sm:-mt-10 -mx-6 sm:-mx-10 mb-6" />

            {/* Section 1: Visit Type & Level */}
            <div className="space-y-4">
              <h2 className="text-lg font-bold text-white flex items-center gap-2 border-b border-white/10 pb-3">
                <Building className="w-5 h-5 text-sky-400" />
                <span>1. Select Visit Category & Scholar Level</span>
              </h2>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                {[
                  { id: 'In-Person Campus Tour', title: 'Campus Guided Tour', desc: 'Full walkthrough of science labs, classrooms & sports complexes.' },
                  { id: 'Virtual Consultation', title: 'Virtual Session', desc: 'Online 1-on-1 video meeting with Academic Dean.' },
                  { id: 'Academic Counseling', title: 'Admissions & Fees', desc: 'Detailed fee structure breakdown & subject guidance.' }
                ].map((type) => (
                  <button
                    key={type.id}
                    type="button"
                    onClick={() => setTourType(type.id as any)}
                    className={`p-4 rounded-2xl border text-left transition-all ${
                      tourType === type.id
                        ? 'border-sky-400 bg-sky-500/20 ring-2 ring-sky-400'
                        : 'border-white/10 bg-white/5 hover:border-white/20'
                    }`}
                  >
                    <span className="text-xs font-bold text-sky-300 block">{type.title}</span>
                    <span className="text-[11px] text-gray-300 block mt-1">{type.desc}</span>
                  </button>
                ))}
              </div>

              <div className="pt-2">
                <label className="block text-xs font-bold text-gray-200 uppercase mb-2">
                  Target Program Level
                </label>
                <div className="flex flex-wrap gap-3">
                  {['O-Level (UCE)', 'A-Level (UACE)', 'General Inquiry'].map((lvl) => (
                    <button
                      key={lvl}
                      type="button"
                      onClick={() => setScholarLevel(lvl as any)}
                      className={`px-4 py-2.5 rounded-xl border text-xs font-bold transition-all ${
                        scholarLevel === lvl
                          ? 'bg-sky-500 text-slate-950 border-sky-400 shadow-lg'
                          : 'bg-white/5 border-white/10 text-gray-300 hover:border-white/20'
                      }`}
                    >
                      {lvl}
                    </button>
                  ))}
                </div>
              </div>
            </div>

            {/* Section 2: Date & Time Selection */}
            <div className="space-y-4">
              <h2 className="text-lg font-bold text-white flex items-center gap-2 border-b border-white/10 pb-3">
                <Calendar className="w-5 h-5 text-sky-400" />
                <span>2. Choose Preferred Date & Time Slot</span>
              </h2>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-bold text-gray-200 uppercase mb-1.5">
                    Preferred Visit Date
                  </label>
                  <input
                    type="date"
                    required
                    value={bookingDate}
                    onChange={(e) => setBookingDate(e.target.value)}
                    className="w-full px-4 py-3 rounded-xl glass-input text-xs text-white bg-[#10253C]"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-gray-200 uppercase mb-1.5">
                    Preferred Time Slot
                  </label>
                  <select
                    value={timeSlot}
                    onChange={(e) => setTimeSlot(e.target.value)}
                    className="w-full px-4 py-3 rounded-xl glass-input text-xs text-white bg-[#10253C]"
                  >
                    <option value="09:00 AM - 10:30 AM">09:00 AM - 10:30 AM (Morning Session)</option>
                    <option value="10:30 AM - 12:00 PM">10:30 AM - 12:00 PM (Mid-Morning Session)</option>
                    <option value="02:00 PM - 03:30 PM">02:00 PM - 03:30 PM (Afternoon Session)</option>
                    <option value="04:00 PM - 05:30 PM">04:00 PM - 05:30 PM (Late Afternoon)</option>
                  </select>
                </div>
              </div>
            </div>

            {/* Section 3: Parent / Guardian Contact Details */}
            <div className="space-y-4">
              <h2 className="text-lg font-bold text-white flex items-center gap-2 border-b border-white/10 pb-3">
                <User className="w-5 h-5 text-sky-400" />
                <span>3. Parent / Guardian Contact Details</span>
              </h2>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                <div>
                  <label className="block text-xs font-bold text-gray-200 uppercase mb-1.5">
                    Full Name <span className="text-sky-400">*</span>
                  </label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. Dr. Arthur Mukasa"
                    value={parentName}
                    onChange={(e) => setParentName(e.target.value)}
                    className="w-full px-4 py-3 rounded-xl glass-input text-xs"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-gray-200 uppercase mb-1.5">
                    Phone Number <span className="text-sky-400">*</span>
                  </label>
                  <input
                    type="tel"
                    required
                    placeholder="+256 700 000000"
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    className="w-full px-4 py-3 rounded-xl glass-input text-xs"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-gray-200 uppercase mb-1.5">
                    Email Address
                  </label>
                  <input
                    type="email"
                    placeholder="e.g. parent@example.com"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="w-full px-4 py-3 rounded-xl glass-input text-xs"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold text-gray-200 uppercase mb-1.5">
                  Specific Questions or Areas of Interest
                </label>
                <textarea
                  rows={2}
                  placeholder="Mention any specific subjects, boarding needs, or sports interest..."
                  value={notes}
                  onChange={(e) => setNotes(e.target.value)}
                  className="w-full px-4 py-3 rounded-xl glass-input text-xs resize-none"
                />
              </div>
            </div>

            <div className="p-4 rounded-2xl bg-sky-500/10 border border-sky-400/30 text-xs text-sky-200 flex items-center gap-3">
              <ShieldCheck className="w-5 h-5 text-sky-400 shrink-0" />
              <span>
                Your tour booking will be instantly confirmed. Our admissions office will send an SMS and email notification with directions.
              </span>
            </div>

            <button
              type="submit"
              className="w-full py-4 rounded-2xl bg-gradient-to-r from-sky-400 via-blue-500 to-cyan-400 text-slate-950 font-extrabold text-base shadow-2xl hover:scale-[1.01] transition-all flex items-center justify-center gap-2"
            >
              <Send className="w-5 h-5" />
              <span>Confirm & Book Campus Visit Slot</span>
            </button>

          </form>
        ) : (
          /* Confirmation State */
          <div className="glass-card rounded-3xl p-8 sm:p-12 text-center space-y-6 border border-sky-500/40 shadow-2xl animate-in fade-in duration-300 bg-gradient-to-br from-[#07111F] via-[#10253C] to-[#07111F]">
            <div className="w-20 h-20 rounded-full bg-sky-500/20 border-2 border-sky-400 text-sky-300 flex items-center justify-center mx-auto shadow-2xl">
              <CheckCircle2 className="w-12 h-12" />
            </div>

            <div className="space-y-2">
              <span className="text-xs font-bold text-sky-300 uppercase tracking-widest">
                Booking Reservation Confirmed!
              </span>
              <h2 className="text-3xl font-extrabold text-white heading-font">
                We Look Forward to Welcoming You
              </h2>
              <p className="text-xs text-gray-300 max-w-md mx-auto">
                Reference Code: <strong className="text-sky-300 font-mono">{bookingRef}</strong>
              </p>
            </div>

            <div className="p-5 rounded-2xl bg-white/5 border border-white/10 max-w-lg mx-auto text-left text-xs space-y-2.5">
              <div className="flex items-center justify-between">
                <span className="text-gray-400">Parent Name:</span>
                <strong className="text-white">{parentName}</strong>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-gray-400">Visit Category:</span>
                <strong className="text-sky-300">{tourType}</strong>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-gray-400">Target Level:</span>
                <strong className="text-white">{scholarLevel}</strong>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-gray-400">Scheduled Date:</span>
                <strong className="text-sky-300">{bookingDate}</strong>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-gray-400">Time Slot:</span>
                <strong className="text-white">{timeSlot}</strong>
              </div>
            </div>

            <div className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-4">
              <button
                onClick={onBack}
                className="w-full sm:w-auto px-6 py-3 rounded-xl bg-sky-500 text-slate-950 font-extrabold text-xs shadow-xl hover:scale-105 transition-all"
              >
                Return to Home Page
              </button>

              <button
                onClick={onOpenApply}
                className="w-full sm:w-auto px-6 py-3 rounded-xl bg-white/10 hover:bg-white/20 text-white font-bold text-xs transition-all"
              >
                Proceed directly to Student Application →
              </button>
            </div>
          </div>
        )}

      </div>
    </div>
  );
};
