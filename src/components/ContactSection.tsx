import React, { useState } from 'react';
import { MapPin, Phone, Mail, Clock, Send, CheckCircle2, Shield } from 'lucide-react';

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
    setSubmitted(true);
  };

  return (
    <section id="contact" className="py-24 bg-[#07111F] relative overflow-hidden border-t border-white/10">
      
      {/* Background glow */}
      <div className="absolute bottom-0 right-10 w-96 h-96 rounded-full bg-blue-600/10 blur-[150px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        <div className="text-center max-w-3xl mx-auto mb-16 space-y-3">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full glass-card border border-[#D4AF37]/30 text-amber-300 text-xs font-bold uppercase tracking-widest">
            <MapPin className="w-3.5 h-3.5 text-[#D4AF37]" />
            Connect With Admissions
          </div>
          <h2 className="text-3xl sm:text-5xl font-extrabold text-white heading-font">
            Campus Location & <span className="gold-gradient-text">Inquiries</span>
          </h2>
          <p className="text-gray-300 text-base sm:text-lg">
            Schedule a private campus tour, request a detailed prospectus, or speak with our dean of admissions.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          
          {/* Left Column: Glass Contact Information Card & Interactive Map */}
          <div className="lg:col-span-5 space-y-6">
            
            {/* Contact Details Card */}
            <div className="glass-card rounded-3xl p-8 border border-white/15 space-y-6 shadow-2xl">
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 rounded-2xl bg-[#D4AF37]/20 border border-[#D4AF37] flex items-center justify-center shrink-0">
                  <Shield className="w-6 h-6 text-[#D4AF37]" />
                </div>
                <div>
                  <h3 className="text-xl font-bold text-white">Admissions Directorate</h3>
                  <p className="text-xs text-amber-200">Nexus Academy Main Campus</p>
                </div>
              </div>

              <div className="space-y-4 pt-2 border-t border-white/10 text-sm text-gray-200">
                <div className="flex items-start gap-3">
                  <MapPin className="w-5 h-5 text-[#D4AF37] shrink-0 mt-1" />
                  <div>
                    <strong className="text-white block">Main Campus Address</strong>
                    <span className="text-xs text-gray-300">Nexus Innovation Boulevard, Hilltop Campus District, Kampala, Uganda</span>
                  </div>
                </div>

                <div className="flex items-center gap-3">
                  <Phone className="w-5 h-5 text-blue-400 shrink-0" />
                  <div>
                    <strong className="text-white block">Direct Admissions Line</strong>
                    <span className="text-xs text-gray-300">+256 414 800 900 / +256 772 100 200</span>
                  </div>
                </div>

                <div className="flex items-center gap-3">
                  <Mail className="w-5 h-5 text-emerald-400 shrink-0" />
                  <div>
                    <strong className="text-white block">Official Email</strong>
                    <span className="text-xs text-gray-300">admissions@nexusacademy.edu.ug</span>
                  </div>
                </div>

                <div className="flex items-center gap-3">
                  <Clock className="w-5 h-5 text-indigo-400 shrink-0" />
                  <div>
                    <strong className="text-white block">Office Hours</strong>
                    <span className="text-xs text-gray-300">Monday – Saturday: 08:00 AM – 05:00 PM</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Interactive Campus Map Placeholder */}
            <div className="relative aspect-video w-full rounded-3xl overflow-hidden glass-card border border-white/15 shadow-2xl">
              <iframe
                title="Nexus Academy Map Location"
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d127672.26129806456!2d32.51862544256239!3d0.3130282467262657!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x177dbb6f51af6969%3A0x92122606554b455d!2sKampala!5e0!3m2!1sen!2sug!4v1700000000000!5m2!1sen!2sug"
                className="w-full h-full border-0 filter grayscale opacity-80 hover:opacity-100 hover:grayscale-0 transition-all duration-500"
                allowFullScreen={false}
                loading="lazy"
                referrerPolicy="no-referrer"
              />
              <div className="absolute top-3 left-3 px-3 py-1 rounded-full bg-black/80 border border-amber-500/30 text-[10px] font-bold text-[#D4AF37] pointer-events-none">
                📍 Nexus Academy Hilltop Grounds
              </div>
            </div>

          </div>

          {/* Right Column: Glass Inquiry Form */}
          <div className="lg:col-span-7 glass-card rounded-3xl p-8 border border-white/20 shadow-2xl">
            
            {!submitted ? (
              <form onSubmit={handleSubmit} className="space-y-5">
                <div>
                  <h3 className="text-2xl font-extrabold text-white heading-font">
                    Send an Official Inquiry
                  </h3>
                  <p className="text-xs text-gray-300 mt-1">
                    Fill out the form below and our admissions officers will respond within 2 hours.
                  </p>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-bold text-gray-200 uppercase mb-1">
                      Parent / Guardian Full Name
                    </label>
                    <input
                      type="text"
                      required
                      placeholder="e.g. Dr. Arthur Mukasa"
                      value={formData.name}
                      onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                      className="w-full px-4 py-3 rounded-xl glass-input text-sm"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-gray-200 uppercase mb-1">
                      Email Address
                    </label>
                    <input
                      type="email"
                      required
                      placeholder="parent@example.com"
                      value={formData.email}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                      className="w-full px-4 py-3 rounded-xl glass-input text-sm"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-bold text-gray-200 uppercase mb-1">
                      Phone Number
                    </label>
                    <input
                      type="tel"
                      required
                      placeholder="+256 772 000 000"
                      value={formData.phone}
                      onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                      className="w-full px-4 py-3 rounded-xl glass-input text-sm"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-gray-200 uppercase mb-1">
                      Program Choice
                    </label>
                    <select
                      value={formData.programInterest}
                      onChange={(e) => setFormData({ ...formData, programInterest: e.target.value })}
                      className="w-full px-4 py-3 rounded-xl glass-input text-sm bg-[#10253C]"
                    >
                      <option value="O Level">O Level (S1 - S4)</option>
                      <option value="A Level">A Level (S5 - S6 PCM/BCM/Arts)</option>
                      <option value="Holiday Program">Holiday STEM Bootcamp</option>
                      <option value="Campus Tour">General Campus Inquiry</option>
                    </select>
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-bold text-gray-200 uppercase mb-1">
                    Your Question or Specific Guidance Request
                  </label>
                  <textarea
                    rows={4}
                    required
                    placeholder="Tell us about your scholar’s academic background, preferred subject combination, or boarding queries..."
                    value={formData.message}
                    onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                    className="w-full px-4 py-3 rounded-xl glass-input text-sm resize-none"
                  />
                </div>

                <button
                  type="submit"
                  className="w-full flex items-center justify-center gap-2 py-4 rounded-xl bg-gradient-to-r from-[#D4AF37] via-amber-500 to-amber-600 text-black font-extrabold text-base shadow-xl hover:scale-[1.01] transition-all"
                >
                  <Send className="w-5 h-5" />
                  <span>Submit Inquiry to Admissions</span>
                </button>
              </form>
            ) : (
              <div className="py-12 text-center space-y-4 animate-in fade-in duration-300">
                <div className="w-16 h-16 rounded-full bg-emerald-500/20 border border-emerald-500 text-emerald-400 flex items-center justify-center mx-auto">
                  <CheckCircle2 className="w-10 h-10" />
                </div>
                <h3 className="text-2xl font-bold text-white">Inquiry Received Successfully!</h3>
                <p className="text-sm text-gray-300 max-w-md mx-auto">
                  Thank you <strong className="text-white">{formData.name}</strong>. Our admissions officer has received your inquiry for the <strong className="text-[#D4AF37]">{formData.programInterest}</strong> program and will contact you shortly at <span className="text-amber-200">{formData.email}</span>.
                </p>
                <button
                  onClick={() => setSubmitted(false)}
                  className="px-6 py-2.5 rounded-xl bg-white/10 hover:bg-white/20 text-white text-xs font-bold"
                >
                  Send Another Message
                </button>
              </div>
            )}

          </div>

        </div>

      </div>
    </section>
  );
};
