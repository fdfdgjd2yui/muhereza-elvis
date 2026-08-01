import React, { useState } from 'react';
import { X, Send, CheckCircle2, Shield, Upload, FileCheck, Trash2 } from 'lucide-react';

interface ApplyModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const ApplyModal: React.FC<ApplyModalProps> = ({ isOpen, onClose }) => {
  const [submitted, setSubmitted] = useState(false);
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
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

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setSelectedFile(e.target.files[0]);
    }
  };

  const removeFile = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setSelectedFile(null);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
  };

  const formatFileSize = (bytes: number) => {
    if (bytes < 1024) return bytes + ' bytes';
    else if (bytes < 1048576) return (bytes / 1024).toFixed(1) + ' KB';
    return (bytes / 1048576).toFixed(1) + ' MB';
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/75 backdrop-blur-sm animate-in fade-in duration-200">
      <div className="bg-white text-slate-900 w-full max-w-2xl rounded-3xl p-6 sm:p-8 border border-slate-200 shadow-2xl relative max-h-[90vh] overflow-y-auto">
        
        <button
          onClick={onClose}
          className="absolute top-6 right-6 p-2 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-700 transition-colors"
        >
          <X className="w-5 h-5" />
        </button>

        {!submitted ? (
          <form onSubmit={handleSubmit} className="space-y-5 text-left">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-2xl bg-[#0B1A30] text-white flex items-center justify-center shrink-0">
                <Shield className="w-5 h-5 text-amber-400" />
              </div>
              <div>
                <span className="text-xs font-bold text-amber-800 uppercase tracking-wider">Official Application 2026/2027</span>
                <h3 className="text-2xl font-black text-[#0B1A30] heading-font">Nexus Scholar Admission</h3>
              </div>
            </div>

            <p className="text-xs text-slate-600">
              Submit your candidate's preliminary application form for review by our admissions board.
            </p>

            <div className="space-y-4 pt-2 border-t border-slate-200">
              <p className="text-xs font-extrabold text-[#0B1A30] uppercase tracking-wider">1. Candidate Information</p>
              
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-bold text-[#0B1A30] uppercase mb-1">Scholar Full Name *</label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. Kato Mark Joel"
                    value={formData.studentName}
                    onChange={(e) => setFormData({ ...formData, studentName: e.target.value })}
                    className="w-full px-4 py-3 rounded-xl border border-slate-300 text-xs bg-slate-50 text-slate-900 focus:outline-none focus:border-[#0B1A30]"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-[#0B1A30] uppercase mb-1">Date of Birth *</label>
                  <input
                    type="date"
                    required
                    value={formData.dob}
                    onChange={(e) => setFormData({ ...formData, dob: e.target.value })}
                    className="w-full px-4 py-3 rounded-xl border border-slate-300 text-xs bg-slate-50 text-slate-900 focus:outline-none focus:border-[#0B1A30]"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-bold text-[#0B1A30] uppercase mb-1">Academic Program Choice</label>
                  <select
                    value={formData.program}
                    onChange={(e) => setFormData({ ...formData, program: e.target.value })}
                    className="w-full px-4 py-3 rounded-xl border border-slate-300 text-xs bg-slate-50 text-slate-900 focus:outline-none focus:border-[#0B1A30]"
                  >
                    <option value="O Level (UCE)">O Level (Senior 1 - Senior 4)</option>
                    <option value="A Level Science (PCM/BCM)">A Level Science (PCM / BCM Specialization)</option>
                    <option value="A Level Arts (HEG/MEG)">A Level Arts & Humanities (HEG / MEG)</option>
                    <option value="Holiday Science & Computer Classes">Holiday Science & Computer Coaching</option>
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-bold text-[#0B1A30] uppercase mb-1">Boarding Preference</label>
                  <select
                    value={formData.boardingPreference}
                    onChange={(e) => setFormData({ ...formData, boardingPreference: e.target.value })}
                    className="w-full px-4 py-3 rounded-xl border border-slate-300 text-xs bg-slate-50 text-slate-900 focus:outline-none focus:border-[#0B1A30]"
                  >
                    <option value="Boarding">Full Boarding Scholar</option>
                    <option value="Day Scholar">Day Scholar (With Transport Shuttle)</option>
                  </select>
                </div>
              </div>
            </div>

            <div className="space-y-4 pt-2 border-t border-slate-200">
              <p className="text-xs font-extrabold text-[#0B1A30] uppercase tracking-wider">2. Parent / Guardian Contact</p>
              
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-bold text-[#0B1A30] uppercase mb-1">Parent Full Name *</label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. Dr. Arthur Mukasa"
                    value={formData.parentName}
                    onChange={(e) => setFormData({ ...formData, parentName: e.target.value })}
                    className="w-full px-4 py-3 rounded-xl border border-slate-300 text-xs bg-slate-50 text-slate-900 focus:outline-none focus:border-[#0B1A30]"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-[#0B1A30] uppercase mb-1">Parent Phone Number *</label>
                  <input
                    type="tel"
                    required
                    placeholder="+256 772 000 000"
                    value={formData.parentPhone}
                    onChange={(e) => setFormData({ ...formData, parentPhone: e.target.value })}
                    className="w-full px-4 py-3 rounded-xl border border-slate-300 text-xs bg-slate-50 text-slate-900 focus:outline-none focus:border-[#0B1A30]"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold text-[#0B1A30] uppercase mb-1">Parent Email Address</label>
                <input
                  type="email"
                  placeholder="parent@example.com"
                  value={formData.parentEmail}
                  onChange={(e) => setFormData({ ...formData, parentEmail: e.target.value })}
                  className="w-full px-4 py-3 rounded-xl border border-slate-300 text-xs bg-slate-50 text-slate-900 focus:outline-none focus:border-[#0B1A30]"
                />
              </div>
            </div>

            {/* Functional Attach Transcript Section */}
            <div>
              <input
                type="file"
                id="transcript-file-input"
                className="hidden"
                accept=".pdf,.png,.jpg,.jpeg,.doc,.docx"
                onChange={handleFileChange}
              />
              
              {!selectedFile ? (
                <label
                  htmlFor="transcript-file-input"
                  className="p-4 rounded-xl bg-slate-50 border border-dashed border-slate-300 hover:border-sky-500 hover:bg-sky-50/50 transition-all cursor-pointer block text-center space-y-1"
                >
                  <Upload className="w-5 h-5 text-amber-600 mx-auto" />
                  <p className="text-xs font-bold text-[#0B1A30]">Attach Academic Transcript (PLE / UCE Result Slip)</p>
                  <p className="text-[10px] text-slate-500">Click to browse file (PDF, PNG, JPG up to 10MB)</p>
                </label>
              ) : (
                <div className="p-4 rounded-xl bg-emerald-50 border border-emerald-300 flex items-center justify-between text-xs">
                  <div className="flex items-center gap-3">
                    <FileCheck className="w-6 h-6 text-emerald-600 shrink-0" />
                    <div>
                      <p className="font-bold text-emerald-950 truncate max-w-[240px] sm:max-w-xs">{selectedFile.name}</p>
                      <p className="text-[10px] text-emerald-700">{formatFileSize(selectedFile.size)} • Attached Successfully</p>
                    </div>
                  </div>
                  <button
                    onClick={removeFile}
                    className="p-1.5 rounded-lg bg-emerald-100 hover:bg-emerald-200 text-emerald-800 transition-colors"
                    title="Remove attached file"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
              )}
            </div>

            <button
              type="submit"
              className="w-full py-4 rounded-xl bg-[#0B1A30] text-white font-extrabold text-sm shadow-xl hover:bg-slate-800 transition-all flex items-center justify-center gap-2"
            >
              <Send className="w-4 h-4 text-amber-400" />
              <span>Submit Application</span>
            </button>
          </form>
        ) : (
          <div className="py-12 text-center space-y-4 animate-in fade-in duration-300">
            <div className="w-16 h-16 rounded-full bg-emerald-100 border border-emerald-400 text-emerald-700 flex items-center justify-center mx-auto">
              <CheckCircle2 className="w-10 h-10" />
            </div>
            <h3 className="text-2xl font-black text-[#0B1A30]">Application Submitted!</h3>
            <p className="text-xs text-slate-600 max-w-md mx-auto">
              Your candidate application details {selectedFile ? 'and attached transcript ' : ''}have been successfully submitted to our admissions desk.
            </p>
            <button
              onClick={() => {
                setSubmitted(false);
                setSelectedFile(null);
                onClose();
              }}
              className="px-6 py-2.5 rounded-xl bg-[#0B1A30] text-white font-bold text-xs hover:bg-slate-800"
            >
              Done & Return to Homepage
            </button>
          </div>
        )}

      </div>
    </div>
  );
};
