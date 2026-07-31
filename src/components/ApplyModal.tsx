import React, { useState } from 'react';
import { X, Send, CheckCircle2, Shield, Sparkles, Upload } from 'lucide-react';

interface ApplyModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const ApplyModal: React.FC<ApplyModalProps> = ({ isOpen, onClose }) => {
  const [submitted, setSubmitted] = useState(false);
  const [formData, setFormData] = useState({
    studentName: '',
    dob: '',
    gender: 'M',
    program: 'O Level (UCE)',
    previousSchool: '',
    parentName: '',
    parentPhone: '',
    parentEmail: '',
    boardingPreference: 'Boarding',
    comments: ''
  });

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/85 backdrop-blur-md animate-in fade-in duration-200">
      <div className="glass-card w-full max-w-2xl rounded-3xl p-6 sm:p-8 border border-white/20 shadow-2xl relative max-h-[90vh] overflow-y-auto">
        
        <button
          onClick={onClose}
          className="absolute top-6 right-6 p-2 rounded-xl bg-white/10 hover:bg-white/20 text-white transition-colors"
        >
          <X className="w-5 h-5" />
        </button>

        {!submitted ? (
          <form onSubmit={handleSubmit} className="space-y-5 text-left">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-2xl bg-[#D4AF37]/20 border border-[#D4AF37] flex items-center justify-center shrink-0">
                <Shield className="w-5 h-5 text-[#D4AF37]" />
              </div>
              <div>
                <span className="text-xs font-bold text-[#D4AF37] uppercase tracking-wider">Official Application 2026/2027</span>
                <h3 className="text-2xl font-extrabold text-white heading-font">Nexus Scholar Admission</h3>
              </div>
            </div>

            <p className="text-xs text-gray-300">
              Submit your candidate's preliminary application. Our admissions office will verify records and schedule an aptitude assessment.
            </p>

            <div className="space-y-4 pt-2 border-t border-white/10">
              <p className="text-xs font-extrabold text-[#D4AF37] uppercase tracking-wider">1. Candidate Information</p>
              
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-bold text-gray-200 uppercase mb-1">Scholar Full Name</label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. Kato Mark Joel"
                    value={formData.studentName}
                    onChange={(e) => setFormData({ ...formData, studentName: e.target.value })}
                    className="w-full px-4 py-3 rounded-xl glass-input text-xs"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-gray-200 uppercase mb-1">Date of Birth</label>
                  <input
                    type="date"
                    required
                    value={formData.dob}
                    onChange={(e) => setFormData({ ...formData, dob: e.target.value })}
                    className="w-full px-4 py-3 rounded-xl glass-input text-xs bg-[#10253C]"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-bold text-gray-200 uppercase mb-1">Academic Program Choice</label>
                  <select
                    value={formData.program}
                    onChange={(e) => setFormData({ ...formData, program: e.target.value })}
                    className="w-full px-4 py-3 rounded-xl glass-input text-xs bg-[#10253C]"
                  >
                    <option value="O Level (UCE)">O Level (Senior 1 - Senior 4)</option>
                    <option value="A Level Science (PCM/BCM)">A Level Science (PCM / BCM Specialization)</option>
                    <option value="A Level Arts (HEG/MEG)">A Level Arts & Humanities (HEG / MEG)</option>
                    <option value="Holiday STEM Bootcamp">Holiday STEM & AI Bootcamp</option>
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-bold text-gray-200 uppercase mb-1">Boarding Preference</label>
                  <select
                    value={formData.boardingPreference}
                    onChange={(e) => setFormData({ ...formData, boardingPreference: e.target.value })}
                    className="w-full px-4 py-3 rounded-xl glass-input text-xs bg-[#10253C]"
                  >
                    <option value="Boarding">Full Boarding Scholar</option>
                    <option value="Day Scholar">Day Scholar (With Transport Shuttle)</option>
                  </select>
                </div>
              </div>
            </div>

            <div className="space-y-4 pt-2 border-t border-white/10">
              <p className="text-xs font-extrabold text-[#D4AF37] uppercase tracking-wider">2. Parent / Guardian Contact</p>
              
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-bold text-gray-200 uppercase mb-1">Parent Full Name</label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. Dr. Arthur Mukasa"
                    value={formData.parentName}
                    onChange={(e) => setFormData({ ...formData, parentName: e.target.value })}
                    className="w-full px-4 py-3 rounded-xl glass-input text-xs"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-gray-200 uppercase mb-1">Parent Phone Number</label>
                  <input
                    type="tel"
                    required
                    placeholder="+256 772 000 000"
                    value={formData.parentPhone}
                    onChange={(e) => setFormData({ ...formData, parentPhone: e.target.value })}
                    className="w-full px-4 py-3 rounded-xl glass-input text-xs"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold text-gray-200 uppercase mb-1">Parent Email Address</label>
                <input
                  type="email"
                  required
                  placeholder="parent@example.com"
                  value={formData.parentEmail}
                  onChange={(e) => setFormData({ ...formData, parentEmail: e.target.value })}
                  className="w-full px-4 py-3 rounded-xl glass-input text-xs"
                />
              </div>
            </div>

            <div className="p-4 rounded-xl bg-white/5 border border-dashed border-white/20 text-center space-y-1">
              <Upload className="w-5 h-5 text-[#D4AF37] mx-auto" />
              <p className="text-xs font-bold text-white">Attach Academic Transcript (PLE / UCE Result Slip)</p>
              <p className="text-[10px] text-gray-400">PDF, PNG, JPG up to 10MB accepted</p>
            </div>

            <button
              type="submit"
              className="w-full py-4 rounded-xl bg-gradient-to-r from-[#D4AF37] via-amber-500 to-amber-600 text-black font-extrabold text-sm shadow-xl hover:scale-[1.01] transition-all"
            >
              Submit Official Application
            </button>
          </form>
        ) : (
          <div className="py-12 text-center space-y-4 animate-in fade-in duration-300">
            <div className="w-16 h-16 rounded-full bg-emerald-500/20 border border-emerald-500 text-emerald-400 flex items-center justify-center mx-auto">
              <CheckCircle2 className="w-10 h-10" />
            </div>
            <h3 className="text-2xl font-bold text-white">Application Submitted!</h3>
            <p className="text-sm text-gray-300 max-w-md mx-auto">
              Application Ref: <strong className="text-[#D4AF37] font-mono">NX-2026-{Math.floor(1000 + Math.random() * 9000)}</strong>
            </p>
            <p className="text-xs text-gray-400 max-w-md mx-auto">
              An official admission confirmation package has been generated and emailed to <span className="text-amber-200">{formData.parentEmail}</span>. Our admissions director will call you shortly.
            </p>
            <button
              onClick={() => {
                setSubmitted(false);
                onClose();
              }}
              className="px-6 py-2.5 rounded-xl bg-[#D4AF37] text-black font-bold text-xs"
            >
              Done & Return to Homepage
            </button>
          </div>
        )}

      </div>
    </div>
  );
};
