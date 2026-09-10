import React, { useState } from 'react';
import { X, CheckCircle2, Shield, Upload, FileCheck, Trash2, Send, AlertCircle } from 'lucide-react';
import { isValidUgandanPhone, isValidGmail } from '../lib/validation';
import { AdmissionCharacters, AdmissionCharacterState } from './AdmissionCharacters';

interface ApplyModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const ApplyModal: React.FC<ApplyModalProps> = ({ isOpen, onClose }) => {
  const [submitted, setSubmitted] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  
  // Character active state & ball bouncing typing counter
  const [characterState, setCharacterState] = useState<AdmissionCharacterState>('idle');
  const [typingCount, setTypingCount] = useState<number>(0);

  // Field validation error states
  const [nameError, setNameError] = useState<string | null>(null);
  const [dobError, setDobError] = useState<string | null>(null);
  const [parentNameError, setParentNameError] = useState<string | null>(null);
  const [phoneError, setPhoneError] = useState<string | null>(null);
  const [emailError, setEmailError] = useState<string | null>(null);

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

  const handleInputChange = (field: keyof typeof formData, value: string, activeState: AdmissionCharacterState) => {
    setFormData(prev => ({ ...prev, [field]: value }));
    // Increment typing trigger for ball bouncing physics
    setTypingCount(c => c + 1);

    // If characters are in hurt state, typing in any field immediately comforts them!
    if (characterState === 'hurt') {
      setCharacterState(activeState);
    }

    // Clear validation error on field edit
    if (field === 'studentName') setNameError(null);
    if (field === 'dob') setDobError(null);
    if (field === 'parentName') setParentNameError(null);
    if (field === 'parentPhone') setPhoneError(null);
    if (field === 'parentEmail') setEmailError(null);
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setSelectedFile(e.target.files[0]);
      setCharacterState('uploadFocused');
      setTimeout(() => setCharacterState('idle'), 1500);
    }
  };

  const removeFile = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setSelectedFile(null);
    setCharacterState('idle');
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setNameError(null);
    setDobError(null);
    setParentNameError(null);
    setPhoneError(null);
    setEmailError(null);

    let hasEmpty = false;
    let firstMissingId = '';

    if (!formData.studentName.trim()) {
      setNameError("Scholar's full name is required");
      hasEmpty = true;
      if (!firstMissingId) firstMissingId = 'student-name-input';
    }

    if (!formData.dob.trim()) {
      setDobError("Candidate's date of birth is required");
      hasEmpty = true;
      if (!firstMissingId) firstMissingId = 'dob-input';
    }

    if (!formData.parentName.trim()) {
      setParentNameError("Parent / Guardian name is required");
      hasEmpty = true;
      if (!firstMissingId) firstMissingId = 'parent-name-input';
    }

    if (!formData.parentPhone.trim()) {
      setPhoneError("Parent contact number is required");
      hasEmpty = true;
      if (!firstMissingId) firstMissingId = 'parent-phone-input';
    } else if (!isValidUgandanPhone(formData.parentPhone)) {
      setPhoneError('Invalid phone number. Must be a valid Ugandan MTN (077, 078, 076) or Airtel (070, 075, 074) number (e.g. 0772123456 or +256772123456).');
      hasEmpty = true;
      if (!firstMissingId) firstMissingId = 'parent-phone-input';
    }

    if (formData.parentEmail && !isValidGmail(formData.parentEmail)) {
      setEmailError('Invalid email address. Must be a valid Gmail account terminating with @gmail.com.');
      hasEmpty = true;
      if (!firstMissingId) firstMissingId = 'parent-email-input';
    }

    // "If any field is empty then one send application the characters should act by sahking then hurt face"
    if (hasEmpty) {
      setCharacterState('hurt');
      if (firstMissingId) {
        const el = document.getElementById(firstMissingId);
        if (el) el.focus();
      }
      return;
    }

    setIsSubmitting(true);
    setCharacterState('submitting');
    setTimeout(() => {
      setIsSubmitting(false);
      setSubmitted(true);
      setCharacterState('success');
    }, 900);
  };

  const formatFileSize = (bytes: number) => {
    if (bytes < 1024) return bytes + ' bytes';
    else if (bytes < 1048576) return (bytes / 1024).toFixed(1) + ' KB';
    return (bytes / 1048576).toFixed(1) + ' MB';
  };

  const handleClose = () => {
    setCharacterState('idle');
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 md:p-6 bg-black/75 backdrop-blur-sm overflow-y-auto animate-in fade-in duration-200">
      <div className="relative w-full max-w-5xl my-auto flex flex-col lg:flex-row items-stretch lg:items-start justify-center gap-5">
        
        {/* DESKTOP: Dedicated character area BESIDE the main admission form */}
        <div className="hidden lg:flex flex-col w-72 xl:w-80 shrink-0 sticky top-6 self-start z-20">
          <AdmissionCharacters
            state={characterState}
            variant="sidebar"
            typingTrigger={typingCount}
          />
        </div>

        {/* MAIN ADMISSION FORM */}
        <div className="bg-white text-slate-900 w-full max-w-2xl rounded-3xl p-6 sm:p-8 border border-slate-200 shadow-2xl relative max-h-[90vh] overflow-y-auto">
          
          {/* Desktop close button */}
          <button
            onClick={handleClose}
            className="hidden lg:block absolute top-6 right-6 p-2 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-700 transition-colors z-20"
            aria-label="Close application modal"
          >
            <X className="w-5 h-5" />
          </button>

          {/* MOBILE & TABLET: Pinned sticky character stage overlaying top of section while fields scroll up */}
          <div className="block lg:hidden sticky top-0 z-30 bg-white/95 backdrop-blur-md pt-1 pb-3 -mx-6 px-6 sm:-mx-8 sm:px-8 border-b border-slate-200 mb-5 shadow-xs">
            <div className="flex items-center justify-between gap-2">
              <div className="flex-1 min-w-0">
                <AdmissionCharacters
                  state={characterState}
                  variant="horizontal"
                  typingTrigger={typingCount}
                />
              </div>
              <button
                type="button"
                onClick={handleClose}
                className="p-2 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-700 transition-colors shrink-0 ml-2"
                aria-label="Close application modal"
              >
                <X className="w-4 h-4" />
              </button>
            </div>
          </div>

          {!submitted ? (
            <form onSubmit={handleSubmit} noValidate className="space-y-6 pt-2">
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
                      id="student-name-input"
                      type="text"
                      placeholder="e.g. Kato Mark Joel"
                      value={formData.studentName}
                      onFocus={() => setCharacterState('nameFocused')}
                      onTouchStart={() => setCharacterState('nameFocused')}
                      onBlur={() => {
                        if (characterState !== 'hurt') setCharacterState('idle');
                      }}
                      onKeyDown={() => setTypingCount(c => c + 1)}
                      onChange={(e) => handleInputChange('studentName', e.target.value, 'nameFocused')}
                      className={`w-full px-4 py-3 rounded-xl border text-xs bg-slate-50 text-slate-900 focus:outline-none transition-colors ${
                        nameError ? 'border-rose-500 bg-rose-50/40 ring-1 ring-rose-400' : 'border-slate-300 focus:border-[#0B1A30]'
                      }`}
                    />
                    {nameError && (
                      <p className="text-[11px] font-semibold text-rose-600 mt-1 flex items-center gap-1">
                        <AlertCircle className="w-3.5 h-3.5 shrink-0" />
                        <span>{nameError}</span>
                      </p>
                    )}
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-[#0B1A30] uppercase mb-1">Date of Birth *</label>
                    <input
                      id="dob-input"
                      type="date"
                      value={formData.dob}
                      onFocus={() => setCharacterState('dateFocused')}
                      onTouchStart={() => setCharacterState('dateFocused')}
                      onBlur={() => {
                        if (characterState !== 'hurt') setCharacterState('idle');
                      }}
                      onKeyDown={() => setTypingCount(c => c + 1)}
                      onChange={(e) => handleInputChange('dob', e.target.value, 'dateFocused')}
                      className={`w-full px-4 py-3 rounded-xl border text-xs bg-slate-50 text-slate-900 focus:outline-none transition-colors ${
                        dobError ? 'border-rose-500 bg-rose-50/40 ring-1 ring-rose-400' : 'border-slate-300 focus:border-[#0B1A30]'
                      }`}
                    />
                    {dobError && (
                      <p className="text-[11px] font-semibold text-rose-600 mt-1 flex items-center gap-1">
                        <AlertCircle className="w-3.5 h-3.5 shrink-0" />
                        <span>{dobError}</span>
                      </p>
                    )}
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-bold text-[#0B1A30] uppercase mb-1">Academic Program Choice</label>
                    <select
                      value={formData.program}
                      onFocus={() => setCharacterState('programFocused')}
                      onTouchStart={() => setCharacterState('programFocused')}
                      onBlur={() => {
                        if (characterState !== 'hurt') setCharacterState('idle');
                      }}
                      onChange={(e) => {
                        handleInputChange('program', e.target.value, 'programFocused');
                        setCharacterState('programFocused');
                      }}
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
                      onFocus={() => setCharacterState('boardingFocused')}
                      onTouchStart={() => setCharacterState('boardingFocused')}
                      onBlur={() => {
                        if (characterState !== 'hurt') setCharacterState('idle');
                      }}
                      onChange={(e) => {
                        handleInputChange('boardingPreference', e.target.value, 'boardingFocused');
                        setCharacterState('boardingFocused');
                      }}
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
                      id="parent-name-input"
                      type="text"
                      placeholder="e.g. Dr. Arthur Mukasa"
                      value={formData.parentName}
                      onFocus={() => setCharacterState('guardianFocused')}
                      onTouchStart={() => setCharacterState('guardianFocused')}
                      onBlur={() => {
                        if (characterState !== 'hurt') setCharacterState('idle');
                      }}
                      onKeyDown={() => setTypingCount(c => c + 1)}
                      onChange={(e) => handleInputChange('parentName', e.target.value, 'guardianFocused')}
                      className={`w-full px-4 py-3 rounded-xl border text-xs bg-slate-50 text-slate-900 focus:outline-none transition-colors ${
                        parentNameError ? 'border-rose-500 bg-rose-50/40 ring-1 ring-rose-400' : 'border-slate-300 focus:border-[#0B1A30]'
                      }`}
                    />
                    {parentNameError && (
                      <p className="text-[11px] font-semibold text-rose-600 mt-1 flex items-center gap-1">
                        <AlertCircle className="w-3.5 h-3.5 shrink-0" />
                        <span>{parentNameError}</span>
                      </p>
                    )}
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-[#0B1A30] uppercase mb-1">Parent Phone Number (MTN/Airtel) *</label>
                    <input
                      id="parent-phone-input"
                      type="tel"
                      placeholder="e.g. 0772123456 or +256772123456"
                      value={formData.parentPhone}
                      onFocus={() => setCharacterState('phoneFocused')}
                      onTouchStart={() => setCharacterState('phoneFocused')}
                      onBlur={() => {
                        if (characterState !== 'hurt') setCharacterState('idle');
                      }}
                      onKeyDown={() => setTypingCount(c => c + 1)}
                      onChange={(e) => handleInputChange('parentPhone', e.target.value, 'phoneFocused')}
                      className={`w-full px-4 py-3 rounded-xl border text-xs bg-slate-50 text-slate-900 focus:outline-none transition-colors ${
                        phoneError ? 'border-rose-500 bg-rose-50/40 ring-1 ring-rose-400' : 'border-slate-300 focus:border-[#0B1A30]'
                      }`}
                    />
                    {phoneError && (
                      <p className="text-[11px] font-semibold text-rose-600 mt-1 flex items-center gap-1">
                        <AlertCircle className="w-3.5 h-3.5 shrink-0" />
                        <span>{phoneError}</span>
                      </p>
                    )}
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-bold text-[#0B1A30] uppercase mb-1">Parent Gmail Address (@gmail.com)</label>
                  <input
                    id="parent-email-input"
                    type="email"
                    placeholder="e.g. parent@gmail.com"
                    value={formData.parentEmail}
                    onFocus={() => setCharacterState('emailFocused')}
                    onTouchStart={() => setCharacterState('emailFocused')}
                    onBlur={() => {
                      if (characterState !== 'hurt') setCharacterState('idle');
                    }}
                    onKeyDown={() => setTypingCount(c => c + 1)}
                    onChange={(e) => handleInputChange('parentEmail', e.target.value, 'emailFocused')}
                    className={`w-full px-4 py-3 rounded-xl border text-xs bg-slate-50 text-slate-900 focus:outline-none transition-colors ${
                      emailError ? 'border-rose-500 bg-rose-50/40 ring-1 ring-rose-400' : 'border-slate-300 focus:border-[#0B1A30]'
                    }`}
                  />
                  {emailError && (
                    <p className="text-[11px] font-semibold text-rose-600 mt-1 flex items-center gap-1">
                      <AlertCircle className="w-3.5 h-3.5 shrink-0" />
                      <span>{emailError}</span>
                    </p>
                  )}
                </div>
              </div>

              {/* Attach Transcript Section */}
              <div>
                <input
                  type="file"
                  id="transcript-file-input"
                  className="hidden"
                  accept=".pdf,.png,.jpg,.jpeg,.doc,.docx"
                  onFocus={() => setCharacterState('uploadFocused')}
                  onTouchStart={() => setCharacterState('uploadFocused')}
                  onBlur={() => {
                    if (characterState !== 'hurt') setCharacterState('idle');
                  }}
                  onChange={handleFileChange}
                />
                
                {!selectedFile ? (
                  <label
                    htmlFor="transcript-file-input"
                    onMouseEnter={() => setCharacterState('uploadFocused')}
                    onMouseLeave={() => {
                      if (characterState !== 'hurt') setCharacterState('idle');
                    }}
                    onTouchStart={() => setCharacterState('uploadFocused')}
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
                      type="button"
                      onClick={removeFile}
                      className="p-1.5 rounded-lg bg-emerald-100 hover:bg-emerald-200 text-emerald-800 transition-colors"
                      title="Remove attached file"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                )}
              </div>

              {/* Send Application Button */}
              <button
                type="submit"
                disabled={isSubmitting}
                className="w-full py-4 rounded-xl bg-[#0B1A30] text-white font-extrabold text-sm shadow-xl hover:bg-slate-800 active:scale-98 disabled:opacity-75 transition-all flex items-center justify-center gap-2 cursor-pointer"
              >
                <Send className="w-4 h-4 text-amber-400" />
                <span>{isSubmitting ? 'Sending Application...' : 'Send Application'}</span>
              </button>
            </form>
          ) : (
            <div className="py-12 text-center space-y-4 animate-in fade-in duration-300">
              <div className="w-16 h-16 rounded-full bg-emerald-100 border border-emerald-400 text-emerald-700 flex items-center justify-center mx-auto">
                <CheckCircle2 className="w-10 h-10" />
              </div>
              <h3 className="text-2xl font-black text-[#0B1A30]">Application Submitted!</h3>
              <p className="text-xs text-slate-600 max-w-md mx-auto">
                Your candidate application details {selectedFile ? 'and attached transcript ' : ''}have been successfully submitted to our admissions board.
              </p>
              <button
                onClick={() => {
                  setSubmitted(false);
                  setSelectedFile(null);
                  setCharacterState('idle');
                  onClose();
                }}
                className="px-6 py-2.5 rounded-xl bg-[#0B1A30] text-white font-bold text-xs hover:bg-slate-800 cursor-pointer"
              >
                Done & Return to Homepage
              </button>
            </div>
          )}

        </div>
      </div>
    </div>
  );
};
