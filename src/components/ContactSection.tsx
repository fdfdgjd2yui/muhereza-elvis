import React, { useState } from 'react';
import { MapPin, Phone, Mail, Clock, Send, CheckCircle2, MessageSquare } from 'lucide-react';

export const ContactSection: React.FC = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    programInterest: 'O Level',
    message: ''
  });
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.name) return;
    setSubmitted(true);

    // Open WhatsApp directly with inquiry text
    const text = encodeURIComponent(
      `Hello Nexus Academy Admissions,\n\nOfficial Inquiry from Website:\nName: ${formData.name}\nEmail: ${formData.email || 'N/A'}\nPhone: ${formData.phone || 'N/A'}\nProgram Interest: ${formData.programInterest}\nMessage: ${formData.message || 'General Inquiry'}`
    );
    window.open(`https://wa.me/256772100200?text=${text}`, '_blank');
  };

  return (
    <section id="contact" className="py-24 bg-white text-slate-900 relative overflow-hidden border-t border-slate-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        <div className="text-center max-w-3xl mx-auto mb-16 space-y-3">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-amber-50 border border-amber-300 text-amber-900 text-xs font-bold uppercase tracking-wider">
            <MapPin className="w-4 h-4 text-amber-600" />
            Connect With Admissions
          </div>
          <h2 className="text-3xl sm:text-5xl font-black text-[#0B1A30] tracking-tight heading-font">
            Campus Location & <span className="text-amber-600">Inquiries</span>
          </h2>
          <p className="text-slate-600 text-base sm:text-lg">
            Schedule a private campus tour, request a prospectus, or speak with our dean of admissions.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          
          {/* Left Column: Contact Details */}
          <div className="lg:col-span-5 space-y-6">
            <div className="bg-slate-50 border border-slate-200 rounded-3xl p-6 space-y-6 shadow-sm">
              <h3 className="text-xl font-black text-[#0B1A30]">Direct Contacts</h3>

              <div className="space-y-4 text-xs font-semibold text-slate-700">
                <div className="flex items-start gap-3">
                  <MapPin className="w-5 h-5 text-amber-600 shrink-0 mt-0.5" />
                  <div>
                    <span className="text-slate-400 block text-[10px] uppercase">Main Campus</span>
                    <span className="text-[#0B1A30]">Nexus Academy Campus, Entebbe Road, Kampala, Uganda</span>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <Phone className="w-5 h-5 text-amber-600 shrink-0 mt-0.5" />
                  <div>
                    <span className="text-slate-400 block text-[10px] uppercase">Phone & WhatsApp Hotline</span>
                    <span className="text-[#0B1A30]">+256 (0) 772 100 200 / +256 (0) 414 555 123</span>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <Mail className="w-5 h-5 text-amber-600 shrink-0 mt-0.5" />
                  <div>
                    <span className="text-slate-400 block text-[10px] uppercase">Email Desk</span>
                    <span className="text-[#0B1A30]">admissions@nexusacademy.ac.ug</span>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <Clock className="w-5 h-5 text-amber-600 shrink-0 mt-0.5" />
                  <div>
                    <span className="text-slate-400 block text-[10px] uppercase">Working Hours</span>
                    <span className="text-[#0B1A30]">Monday – Friday: 08:00 AM – 05:00 PM | Saturday: 09:00 AM – 01:00 PM</span>
                  </div>
                </div>
              </div>

              {/* Direct WhatsApp Quick Chat Button */}
              <a
                href="https://wa.me/256772100200?text=Hello%20Nexus%20Academy%20Admissions%2C%20I%20have%20an%20inquiry%20regarding%20enrolment."
                target="_blank"
                rel="noreferrer"
                className="w-full py-3 px-4 rounded-2xl bg-emerald-600 hover:bg-emerald-700 text-white font-extrabold text-xs transition-colors flex items-center justify-center gap-2 shadow-sm"
              >
                <MessageSquare className="w-4 h-4 text-emerald-200" />
                <span>Chat Directly on WhatsApp (+256 772 100 200)</span>
              </a>
            </div>
          </div>

          {/* Right Column: Inquiry Form */}
          <div className="lg:col-span-7">
            <div className="bg-slate-50 border border-slate-200 rounded-3xl p-6 sm:p-8 shadow-sm">
              <h3 className="text-xl font-black text-[#0B1A30] mb-2">Send an Official Inquiry</h3>
              <p className="text-xs text-slate-600 mb-6">Submitting will automatically launch a direct WhatsApp chat with our admissions office.</p>

              {submitted ? (
                <div className="p-8 bg-emerald-50 border border-emerald-300 rounded-2xl text-center space-y-4">
                  <CheckCircle2 className="w-12 h-12 text-emerald-600 mx-auto" />
                  <h4 className="text-lg font-black text-emerald-900">Inquiry Sent to WhatsApp</h4>
                  <p className="text-xs text-emerald-800">
                    Thank you for reaching out to Nexus Academy! A WhatsApp chat window has opened for immediate response from our admissions dean.
                  </p>
                  <button
                    type="button"
                    onClick={() => {
                      setSubmitted(false);
                      setFormData({ name: '', email: '', phone: '', programInterest: 'O Level', message: '' });
                    }}
                    className="px-4 py-2 bg-emerald-700 text-white font-bold text-xs rounded-xl hover:bg-emerald-800"
                  >
                    Send Another Message
                  </button>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-4 text-xs font-bold text-slate-700">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block mb-1">Full Name *</label>
                      <input
                        type="text"
                        required
                        value={formData.name}
                        onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                        placeholder="e.g. Dr. Joseph Okello"
                        className="w-full px-3 py-2.5 rounded-xl border border-slate-300 text-slate-900 bg-white focus:outline-none focus:border-[#0B1A30]"
                      />
                    </div>

                    <div>
                      <label className="block mb-1">Email Address</label>
                      <input
                        type="email"
                        value={formData.email}
                        onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                        placeholder="joseph@example.com"
                        className="w-full px-3 py-2.5 rounded-xl border border-slate-300 text-slate-900 bg-white focus:outline-none focus:border-[#0B1A30]"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block mb-1">Phone Number *</label>
                      <input
                        type="tel"
                        required
                        value={formData.phone}
                        onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                        placeholder="+256 700 000 000"
                        className="w-full px-3 py-2.5 rounded-xl border border-slate-300 text-slate-900 bg-white focus:outline-none focus:border-[#0B1A30]"
                      />
                    </div>

                    <div>
                      <label className="block mb-1">Program Interest</label>
                      <select
                        value={formData.programInterest}
                        onChange={(e) => setFormData({ ...formData, programInterest: e.target.value })}
                        className="w-full px-3 py-2.5 rounded-xl border border-slate-300 text-slate-900 bg-white focus:outline-none focus:border-[#0B1A30]"
                      >
                        <option value="O Level">UCE (Senior 1 - Senior 4)</option>
                        <option value="A Level">UACE (Senior 5 - Senior 6)</option>
                        <option value="Boarding">Boarding & Dormitory Life</option>
                        <option value="General">General Inquiry</option>
                      </select>
                    </div>
                  </div>

                  <div>
                    <label className="block mb-1">Message / Questions</label>
                    <textarea
                      rows={4}
                      value={formData.message}
                      onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                      placeholder="Specify your questions regarding admission, fee structure, or campus tours..."
                      className="w-full p-3 rounded-xl border border-slate-300 text-slate-900 bg-white focus:outline-none focus:border-[#0B1A30]"
                    />
                  </div>

                  <button
                    type="submit"
                    className="w-full py-3.5 rounded-xl bg-[#0B1A30] text-white text-xs font-black hover:bg-slate-800 transition-colors flex items-center justify-center gap-2 shadow"
                  >
                    <MessageSquare className="w-4 h-4 text-emerald-400" />
                    <span>Submit Inquiry & Open WhatsApp</span>
                  </button>
                </form>
              )}
            </div>
          </div>

        </div>

      </div>
    </section>
  );
};
