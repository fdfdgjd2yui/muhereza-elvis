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
  ShieldCheck,
  Building,
  MessageSquare
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

    // Build WhatsApp message and open link
    const text = encodeURIComponent(
      `Hello Nexus Academy Admissions,\n\nI would like to book a campus visit/consultation.\n\nBooking Reference: ${ref}\nParent/Guardian Name: ${parentName}\nPhone: ${phone}\nEmail: ${email || 'N/A'}\nTarget Level: ${scholarLevel}\nVisit Type: ${tourType}\nPreferred Date: ${bookingDate}\nPreferred Time: ${timeSlot}\nNotes: ${notes || 'None'}`
    );
    window.open(`https://wa.me/256772100200?text=${text}`, '_blank');
  };

  return (
    <div className="min-h-screen bg-slate-50 text-slate-900 pt-24 pb-24 relative overflow-hidden">
      
      {/* Light Ambient Background Glows */}
      <div className="absolute top-20 right-1/4 w-96 h-96 bg-sky-100/60 rounded-full blur-[140px] pointer-events-none" />
      <div className="absolute bottom-20 left-1/4 w-96 h-96 bg-amber-100/50 rounded-full blur-[140px] pointer-events-none" />

      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Navigation Breadcrumb */}
        <div className="mb-8 flex items-center justify-between">
          <button
            onClick={onBack}
            className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl bg-white hover:bg-slate-100 text-xs font-bold text-[#0B1A30] transition-all border border-slate-200 shadow-sm"
          >
            <ArrowLeft className="w-4 h-4 text-sky-700" />
            <span>Return to Main Website</span>
          </button>

          <span className="text-xs text-sky-900 font-bold bg-sky-50 border border-sky-200 px-3 py-1.5 rounded-full">
            Official Campus Visit & Admissions Portal
          </span>
        </div>

        {/* Page Banner Header */}
        <div className="text-center max-w-2xl mx-auto mb-10 space-y-3">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-amber-50 border border-amber-300 text-amber-900 text-xs font-bold uppercase tracking-widest">
            <Calendar className="w-4 h-4 text-amber-600" />
            Book a Personal Campus Visit or Consultation
          </div>
          <h1 className="text-3xl sm:text-5xl font-black text-[#0B1A30] heading-font tracking-tight">
            Schedule Your <span className="text-sky-600">Campus Experience</span>
          </h1>
          <p className="text-slate-600 text-xs sm:text-base">
            Experience Nexus Academy's state-of-the-art laboratories, modern classrooms, and vibrant campus life firsthand with our admissions directors.
          </p>
        </div>

        {!isSubmitted ? (
          <form onSubmit={handleSubmitBooking} className="bg-white rounded-3xl p-6 sm:p-10 border border-slate-200 shadow-xl space-y-8">
            
            {/* Top Cyan Accent Line */}
            <div className="h-2 w-full bg-gradient-to-r from-sky-500 via-blue-600 to-amber-500 rounded-t-3xl -mt-6 sm:-mt-10 -mx-6 sm:-mx-10 mb-6" />

            {/* Section 1: Visit Type & Level */}
            <div className="space-y-4">
              <h2 className="text-lg font-black text-[#0B1A30] flex items-center gap-2 border-b border-slate-200 pb-3">
                <Building className="w-5 h-5 text-sky-600" />
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
                        ? 'border-sky-500 bg-sky-50 ring-2 ring-sky-500/20'
                        : 'border-slate-200 bg-slate-50 hover:bg-slate-100'
                    }`}
                  >
                    <span className="text-xs font-bold text-[#0B1A30] block">{type.title}</span>
                    <span className="text-[11px] text-slate-600 block mt-1">{type.desc}</span>
                  </button>
                ))}
              </div>

              <div className="pt-2">
                <label className="block text-xs font-bold text-[#0B1A30] uppercase mb-2">
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
                          ? 'bg-[#0B1A30] text-white border-[#0B1A30] shadow-md'
                          : 'bg-white border-slate-200 text-slate-700 hover:bg-slate-100'
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
              <h2 className="text-lg font-black text-[#0B1A30] flex items-center gap-2 border-b border-slate-200 pb-3">
                <Calendar className="w-5 h-5 text-sky-600" />
                <span>2. Choose Preferred Date & Time Slot</span>
              </h2>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-bold text-[#0B1A30] uppercase mb-1.5">
                    Preferred Visit Date
                  </label>
                  <input
                    type="date"
                    required
                    value={bookingDate}
                    onChange={(e) => setBookingDate(e.target.value)}
                    className="w-full px-4 py-3 rounded-xl border border-slate-300 text-xs text-slate-900 bg-slate-50 focus:outline-none focus:border-[#0B1A30]"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-[#0B1A30] uppercase mb-1.5">
                    Preferred Time Slot
                  </label>
                  <select
                    value={timeSlot}
                    onChange={(e) => setTimeSlot(e.target.value)}
                    className="w-full px-4 py-3 rounded-xl border border-slate-300 text-xs text-slate-900 bg-slate-50 focus:outline-none focus:border-[#0B1A30]"
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
              <h2 className="text-lg font-black text-[#0B1A30] flex items-center gap-2 border-b border-slate-200 pb-3">
                <User className="w-5 h-5 text-sky-600" />
                <span>3. Parent / Guardian Contact Details</span>
              </h2>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                <div>
                  <label className="block text-xs font-bold text-[#0B1A30] uppercase mb-1.5">
                    Full Name <span className="text-amber-600">*</span>
                  </label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. Dr. Arthur Mukasa"
                    value={parentName}
                    onChange={(e) => setParentName(e.target.value)}
                    className="w-full px-4 py-3 rounded-xl border border-slate-300 text-xs text-slate-900 bg-slate-50 focus:outline-none focus:border-[#0B1A30]"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-[#0B1A30] uppercase mb-1.5">
                    Phone Number <span className="text-amber-600">*</span>
                  </label>
                  <input
                    type="tel"
                    required
                    placeholder="+256 700 000000"
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    className="w-full px-4 py-3 rounded-xl border border-slate-300 text-xs text-slate-900 bg-slate-50 focus:outline-none focus:border-[#0B1A30]"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-[#0B1A30] uppercase mb-1.5">
                    Email Address
                  </label>
                  <input
                    type="email"
                    placeholder="e.g. parent@example.com"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="w-full px-4 py-3 rounded-xl border border-slate-300 text-xs text-slate-900 bg-slate-50 focus:outline-none focus:border-[#0B1A30]"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold text-[#0B1A30] uppercase mb-1.5">
                  Specific Questions or Areas of Interest
                </label>
                <textarea
                  rows={2}
                  placeholder="Mention any specific subjects, boarding needs, or sports interest..."
                  value={notes}
                  onChange={(e) => setNotes(e.target.value)}
                  className="w-full px-4 py-3 rounded-xl border border-slate-300 text-xs text-slate-900 bg-slate-50 resize-none focus:outline-none focus:border-[#0B1A30]"
                />
              </div>
            </div>

            <div className="p-4 rounded-2xl bg-sky-50 border border-sky-200 text-xs text-sky-900 flex items-center gap-3 font-medium">
              <ShieldCheck className="w-5 h-5 text-sky-600 shrink-0" />
              <span>
                Submitting this form will automatically open a pre-filled WhatsApp inquiry line with our admissions director for instant confirmation.
              </span>
            </div>

            <button
              type="submit"
              className="w-full py-4 rounded-2xl bg-[#0B1A30] text-white font-extrabold text-base shadow-xl hover:bg-slate-800 transition-all flex items-center justify-center gap-2"
            >
              <MessageSquare className="w-5 h-5 text-emerald-400" />
              <span>Confirm Visit & Open WhatsApp Inquiry</span>
            </button>

          </form>
        ) : (
          /* Confirmation State */
          <div className="bg-white rounded-3xl p-8 sm:p-12 text-center space-y-6 border border-slate-200 shadow-xl animate-in fade-in duration-300">
            <div className="w-20 h-20 rounded-full bg-emerald-100 border-2 border-emerald-400 text-emerald-700 flex items-center justify-center mx-auto shadow-md">
              <CheckCircle2 className="w-12 h-12" />
            </div>

            <div className="space-y-2">
              <span className="text-xs font-bold text-emerald-700 uppercase tracking-widest">
                Booking Reservation Generated & Sent to WhatsApp!
              </span>
              <h2 className="text-3xl font-black text-[#0B1A30] heading-font">
                We Look Forward to Welcoming You
              </h2>
              <p className="text-xs text-slate-600 max-w-md mx-auto">
                Reference Code: <strong className="text-sky-800 font-mono text-sm">{bookingRef}</strong>
              </p>
            </div>

            <div className="p-5 rounded-2xl bg-slate-50 border border-slate-200 max-w-lg mx-auto text-left text-xs space-y-2.5">
              <div className="flex items-center justify-between">
                <span className="text-slate-500">Parent Name:</span>
                <strong className="text-[#0B1A30]">{parentName}</strong>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-slate-500">Visit Category:</span>
                <strong className="text-sky-800">{tourType}</strong>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-slate-500">Target Level:</span>
                <strong className="text-[#0B1A30]">{scholarLevel}</strong>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-slate-500">Scheduled Date:</span>
                <strong className="text-sky-800">{bookingDate}</strong>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-slate-500">Time Slot:</span>
                <strong className="text-[#0B1A30]">{timeSlot}</strong>
              </div>
            </div>

            <div className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-4">
              <button
                onClick={onBack}
                className="w-full sm:w-auto px-6 py-3 rounded-xl bg-[#0B1A30] text-white font-extrabold text-xs shadow-md hover:bg-slate-800 transition-all"
              >
                Return to Home Page
              </button>

              <button
                onClick={onOpenApply}
                className="w-full sm:w-auto px-6 py-3 rounded-xl bg-slate-100 hover:bg-slate-200 text-[#0B1A30] font-bold text-xs border border-slate-300 transition-all"
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
