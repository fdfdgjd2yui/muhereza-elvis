import React, { useState } from 'react';
import { StudentResult } from '../types';
import { 
  parseSpreadsheetData, 
  syncStudentsToFirestore, 
  deleteStudentFromFirestore, 
  clearAllStudentsFromFirestore 
} from '../lib/firebase';
import { 
  Lock, 
  Key, 
  RefreshCw, 
  Database, 
  CheckCircle2, 
  AlertCircle, 
  X, 
  UploadCloud, 
  Table, 
  Eye,
  EyeOff,
  Trash2,
  BookOpen,
  GraduationCap,
  Search
} from 'lucide-react';

interface AdminDashboardModalProps {
  isOpen: boolean;
  onClose: () => void;
  studentResults: StudentResult[];
  onUpdateResults: (newResults: StudentResult[]) => void;
}

export const AdminDashboardModal: React.FC<AdminDashboardModalProps> = ({
  isOpen,
  onClose,
  studentResults,
  onUpdateResults
}) => {
  // Password state
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [passwordInput, setPasswordInput] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [authError, setAuthError] = useState('');

  // Active Tab
  const [activeTab, setActiveTab] = useState<'paste' | 'uce' | 'uace'>('paste');

  // Search filter for directories
  const [uceSearchQuery, setUceSearchQuery] = useState('');
  const [uaceSearchQuery, setUaceSearchQuery] = useState('');

  // Excel/CSV paste state
  const [pastedData, setPastedData] = useState('');
  const [isProcessing, setIsProcessing] = useState(false);

  // Toast / Status state
  const [toastMessage, setToastMessage] = useState<{ type: 'success' | 'error'; text: string } | null>(null);

  if (!isOpen) return null;

  // Split results into UCE and UACE datasets
  const uceResults = studentResults.filter((s) => s.level === 'UCE');
  const uaceResults = studentResults.filter((s) => s.level === 'UACE');

  // Search filtering
  const filteredUce = uceResults.filter(
    (s) =>
      s.studentName.toLowerCase().includes(uceSearchQuery.toLowerCase()) ||
      s.indexNumber.toLowerCase().includes(uceSearchQuery.toLowerCase())
  );

  const filteredUace = uaceResults.filter(
    (s) =>
      s.studentName.toLowerCase().includes(uaceSearchQuery.toLowerCase()) ||
      s.indexNumber.toLowerCase().includes(uaceSearchQuery.toLowerCase())
  );

  // Handle Login Password Check
  const handlePasswordSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (passwordInput === 'nexusadmin2026') {
      setIsAuthenticated(true);
      setAuthError('');
    } else {
      setAuthError('Incorrect Admin Password. Default is: nexusadmin2026');
    }
  };

  const showToast = (type: 'success' | 'error', text: string) => {
    setToastMessage({ type, text });
    setTimeout(() => setToastMessage(null), 6000);
  };

  /**
   * Main Frontend Processing and Batch Sync to Firestore Function
   */
  const handleProcessAndSync = async () => {
    if (!pastedData.trim()) {
      showToast('error', 'Please paste Excel or CSV data into the text area before syncing.');
      return;
    }

    setIsProcessing(true);
    setToastMessage(null);

    try {
      // Parse pasted data using JavaScript frontend logic
      const parsedStudents = parseSpreadsheetData(pastedData);
      
      if (parsedStudents.length === 0) {
        showToast('error', 'Could not extract valid student records. Check your data and try again.');
        setIsProcessing(false);
        return;
      }

      // Merge into active state using exact Index Number (Document ID) to eliminate duplicates
      const mergedMap = new Map<string, StudentResult>();
      studentResults.forEach(s => mergedMap.set(s.indexNumber.trim().toUpperCase(), s));
      parsedStudents.forEach(s => mergedMap.set(s.indexNumber.trim().toUpperCase(), s));

      const updatedList = Array.from(mergedMap.values());
      onUpdateResults(updatedList);

      // Execute Firestore batch upload (db.batch())
      const syncResult = await syncStudentsToFirestore(parsedStudents);

      showToast(
        'success',
        `✓ Successfully processed & uploaded ${syncResult.count} student record(s) to Firestore! Document IDs set to UNEB Index Numbers.`
      );
      setPastedData('');
    } catch (err: any) {
      showToast('error', `Sync failed: ${err?.message || 'Unexpected parsing error'}`);
    } finally {
      setIsProcessing(false);
    }
  };

  /**
   * Admin action: Delete single student record from Firestore and local state
   */
  const handleDeleteSingleStudent = async (indexNumber: string) => {
    if (!window.confirm(`Are you sure you want to delete candidate ${indexNumber}?`)) {
      return;
    }
    try {
      await deleteStudentFromFirestore(indexNumber);
      const targetId = indexNumber.trim().toUpperCase();
      const targetNorm = targetId.replace(/[\s/]/g, '');
      const updated = studentResults.filter(
        (s) => s.indexNumber.trim().toUpperCase() !== targetId &&
               s.indexNumber.replace(/[\s/]/g, '').toUpperCase() !== targetNorm
      );
      onUpdateResults(updated);
      showToast('success', `✓ Successfully deleted candidate ${indexNumber}.`);
    } catch (err: any) {
      showToast('error', `Deletion failed: ${err?.message || 'Unexpected error'}`);
    }
  };

  /**
   * Admin action: Clear specific level (UCE or UACE) from Firestore and local state
   */
  const handleClearLevelStudents = async (level: 'UCE' | 'UACE') => {
    const levelRecords = level === 'UCE' ? uceResults : uaceResults;
    if (levelRecords.length === 0) {
      showToast('error', `No ${level} student records to delete.`);
      return;
    }
    if (
      !window.confirm(
        `⚠️ Are you sure you want to PERMANENTLY DELETE ALL ${levelRecords.length} ${level} student records? This action cannot be reversed.`
      )
    ) {
      return;
    }
    try {
      const ids = levelRecords.map((s) => s.indexNumber);
      await clearAllStudentsFromFirestore(ids);
      const updated = studentResults.filter((s) => s.level !== level);
      onUpdateResults(updated);
      showToast('success', `✓ Successfully cleared all ${ids.length} ${level} student records.`);
    } catch (err: any) {
      showToast('error', `Failed to clear ${level} dataset: ${err?.message || 'Unexpected error'}`);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/85 backdrop-blur-md animate-in fade-in overflow-y-auto">
      <div className="glass-card w-full max-w-4xl rounded-3xl border border-sky-400/30 shadow-2xl relative bg-[#07111F] my-8 overflow-hidden text-white">
        
        {/* Header */}
        <div className="p-6 border-b border-white/10 flex items-center justify-between bg-gradient-to-r from-[#10253C] to-[#07111F]">
          <div className="flex items-center gap-3">
            <div className="p-2.5 rounded-xl bg-sky-500/20 border border-sky-400/30 text-sky-400">
              <Database className="w-6 h-6" />
            </div>
            <div>
              <h2 className="text-xl font-extrabold text-white heading-font flex items-center gap-2">
                Nexus Academic Registry Admin Portal
                {isAuthenticated && (
                  <span className="text-[10px] bg-emerald-500/20 text-emerald-300 border border-emerald-500/40 px-2 py-0.5 rounded-full font-bold">
                    AUTHENTICATED
                  </span>
                )}
              </h2>
              <p className="text-xs text-gray-300">Data Management & Student Directory Control</p>
            </div>
          </div>

          <button
            onClick={onClose}
            className="p-2 rounded-xl bg-white/10 hover:bg-white/20 text-gray-300 hover:text-white transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Password Authentication Gate */}
        {!isAuthenticated ? (
          <div className="p-8 max-w-md mx-auto text-center space-y-6">
            <div className="w-16 h-16 rounded-2xl bg-sky-500/15 border border-sky-400/30 flex items-center justify-center mx-auto text-sky-400">
              <Lock className="w-8 h-8" />
            </div>

            <div>
              <h3 className="text-xl font-bold text-white mb-1">Admin Password Required</h3>
              <p className="text-xs text-gray-400">
                Please enter the security password to manage student UNEB results & sync settings.
              </p>
            </div>

            <form onSubmit={handlePasswordSubmit} className="space-y-4">
              <div className="relative">
                <Key className="w-4 h-4 text-sky-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
                <input
                  type={showPassword ? 'text' : 'password'}
                  placeholder="Enter admin password (e.g. nexusadmin2026)..."
                  value={passwordInput}
                  onChange={(e) => setPasswordInput(e.target.value)}
                  className="w-full pl-10 pr-10 py-3 rounded-xl glass-input text-sm"
                  autoFocus
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3.5 top-1/2 -translate-y-1/2 text-gray-400 hover:text-white"
                >
                  {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                </button>
              </div>

              {authError && (
                <div className="flex items-center gap-2 p-3 rounded-xl bg-rose-500/15 border border-rose-500/30 text-rose-300 text-xs">
                  <AlertCircle className="w-4 h-4 shrink-0" />
                  <span>{authError}</span>
                </div>
              )}

              <button
                type="submit"
                className="w-full py-3 rounded-xl bg-gradient-to-r from-sky-400 to-blue-500 text-slate-950 font-bold text-sm shadow-lg hover:scale-[1.02] transition-all"
              >
                Access Admin Dashboard
              </button>
            </form>

            <div className="p-3 rounded-xl bg-white/5 border border-white/10 text-[11px] text-gray-400">
              💡 Demo Security Credentials: Password is <strong className="text-sky-300">nexusadmin2026</strong>
            </div>
          </div>
        ) : (
          /* Authenticated Admin Dashboard Controls */
          <div className="p-6 space-y-6">
            
            {/* Toast Notification Banner */}
            {toastMessage && (
              <div
                className={`p-4 rounded-2xl border flex items-center gap-3 animate-in fade-in ${
                  toastMessage.type === 'success'
                    ? 'bg-emerald-500/15 border-emerald-500/40 text-emerald-200'
                    : 'bg-rose-500/15 border-rose-500/40 text-rose-200'
                }`}
              >
                {toastMessage.type === 'success' ? (
                  <CheckCircle2 className="w-5 h-5 text-emerald-400 shrink-0" />
                ) : (
                  <AlertCircle className="w-5 h-5 text-rose-400 shrink-0" />
                )}
                <p className="text-xs font-semibold">{toastMessage.text}</p>
              </div>
            )}

            {/* Admin Tabs */}
            <div className="flex items-center gap-2 border-b border-white/10 pb-3 overflow-x-auto">
              {[
                { id: 'paste', label: '1. Paste Excel/CSV Data', icon: UploadCloud },
                { id: 'uce', label: `2. UCE Directory (${uceResults.length})`, icon: BookOpen },
                { id: 'uace', label: `3. UACE Directory (${uaceResults.length})`, icon: GraduationCap }
              ].map((tab) => {
                const Icon = tab.icon;
                const isActive = activeTab === tab.id;
                return (
                  <button
                    key={tab.id}
                    onClick={() => setActiveTab(tab.id as any)}
                    className={`flex items-center gap-2 px-4 py-2.5 rounded-xl text-xs font-bold transition-all border shrink-0 ${
                      isActive
                        ? 'bg-sky-400 text-slate-950 border-sky-300 shadow-md'
                        : 'glass-card text-gray-300 border-white/10 hover:border-sky-400/30'
                    }`}
                  >
                    <Icon className="w-4 h-4" />
                    <span>{tab.label}</span>
                  </button>
                );
              })}
            </div>

            {/* TAB 1: Frontend Excel/CSV Data Parsing & Firestore Sync */}
            {activeTab === 'paste' && (
              <div className="space-y-4">
                <div className="p-4 rounded-2xl bg-white/5 border border-white/10 space-y-1">
                  <h3 className="text-sm font-bold text-sky-300 flex items-center gap-2">
                    <UploadCloud className="w-4 h-4" />
                    Direct Frontend Excel / CSV Data Processing
                  </h3>
                  <p className="text-xs text-gray-300">
                    Copy rows directly from Excel or CSV and paste below. The system automatically extracts candidate details and categorizes UCE and UACE candidates.
                  </p>
                </div>

                <div className="space-y-2">
                  <label className="block text-xs font-bold text-sky-300 tracking-wide uppercase">
                    Paste Excel/CSV rows here (Tab or Comma Separated)
                  </label>
                  <textarea
                    rows={9}
                    value={pastedData}
                    onChange={(e) => setPastedData(e.target.value)}
                    placeholder={`IndexNumber\tStudentName\tLevel\tExamYear\tGender\tStream\tAggregates\tDivision\tHeadteacherRemark\nU0001/001\tKASOZI MARK\tUCE\t2025\tM\tSenior 4 Science Stream A\t8 Aggregates\tDivision 1\tOutstanding performance.`}
                    className="w-full p-4 rounded-2xl glass-input text-xs font-mono border border-white/10 focus:border-sky-400 focus:ring-1 focus:ring-sky-400 leading-relaxed"
                  />
                </div>

                <div className="flex items-center justify-between pt-2">
                  <button
                    onClick={handleProcessAndSync}
                    disabled={isProcessing}
                    className="flex items-center gap-2 px-6 py-3.5 rounded-xl bg-gradient-to-r from-sky-400 to-blue-500 text-slate-950 font-extrabold text-sm shadow-xl hover:scale-[1.02] active:scale-[0.98] disabled:opacity-50 transition-all cursor-pointer"
                  >
                    <RefreshCw className={`w-4 h-4 ${isProcessing ? 'animate-spin' : ''}`} />
                    <span>{isProcessing ? 'Processing & Writing Batch to Firestore...' : 'Process and Sync to Firestore'}</span>
                  </button>

                  <span className="text-[11px] text-gray-400 font-mono">
                    Document Path: <span className="text-sky-300">/students/[indexNumber]</span>
                  </span>
                </div>
              </div>
            )}

            {/* TAB 2: UCE Student Directory */}
            {activeTab === 'uce' && (
              <div className="space-y-4">
                <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3">
                  <div>
                    <h3 className="text-sm font-bold text-white uppercase tracking-wider flex items-center gap-2">
                      <BookOpen className="w-4 h-4 text-sky-400" />
                      UCE Candidate Directory (Senior 4 / O-Level)
                      <span className="text-xs bg-sky-500/20 text-sky-300 border border-sky-500/30 px-2 py-0.5 rounded-full font-mono">
                        {filteredUce.length} of {uceResults.length} Records
                      </span>
                    </h3>
                    <span className="text-xs text-gray-400">Uganda Certificate of Education Candidates</span>
                  </div>

                  {uceResults.length > 0 && (
                    <button
                      onClick={() => handleClearLevelStudents('UCE')}
                      className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-rose-500/20 hover:bg-rose-500/30 border border-rose-500/40 text-rose-300 font-bold text-xs transition-all"
                    >
                      <Trash2 className="w-3.5 h-3.5" />
                      <span>Delete All UCE Data</span>
                    </button>
                  )}
                </div>

                {/* UCE Search Bar */}
                <div className="relative">
                  <Search className="w-4 h-4 text-sky-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
                  <input
                    type="text"
                    value={uceSearchQuery}
                    onChange={(e) => setUceSearchQuery(e.target.value)}
                    placeholder="Search UCE candidate by name or index number..."
                    className="w-full pl-10 pr-4 py-2.5 rounded-xl glass-input text-xs border-white/10"
                  />
                </div>

                {filteredUce.length === 0 ? (
                  <div className="p-8 text-center glass-card rounded-2xl border border-white/10 text-gray-400 text-xs">
                    {uceSearchQuery ? 'No UCE candidates match your search.' : 'No UCE student records in directory.'}
                  </div>
                ) : (
                  <div className="overflow-x-auto rounded-2xl border border-white/10 max-h-80 overflow-y-auto">
                    <table className="w-full text-left text-xs">
                      <thead className="sticky top-0 bg-[#10253C] border-b border-white/10 text-sky-200">
                        <tr className="uppercase text-[10px]">
                          <th className="py-2.5 px-3">Document ID (Index #)</th>
                          <th className="py-2.5 px-3">Candidate Name</th>
                          <th className="py-2.5 px-3">Stream</th>
                          <th className="py-2.5 px-3">Aggregates & Division</th>
                          <th className="py-2.5 px-3">Year</th>
                          <th className="py-2.5 px-3 text-right">Actions</th>
                        </tr>
                      </thead>
                      <tbody className="divide-y divide-white/10 text-gray-200">
                        {filteredUce.map((st) => (
                          <tr key={st.indexNumber} className="hover:bg-white/5">
                            <td className="py-2.5 px-3 font-mono font-bold text-sky-300">{st.indexNumber}</td>
                            <td className="py-2.5 px-3 font-bold text-white">{st.studentName}</td>
                            <td className="py-2.5 px-3 text-gray-300">{st.combinationOrStream}</td>
                            <td className="py-2.5 px-3 text-emerald-300 font-semibold">{st.aggregatesOrPoints} ({st.divisionOrClass})</td>
                            <td className="py-2.5 px-3">{st.examYear}</td>
                            <td className="py-2.5 px-3 text-right">
                              <button
                                onClick={() => handleDeleteSingleStudent(st.indexNumber)}
                                title="Delete Record"
                                className="p-1.5 rounded-lg bg-rose-500/15 hover:bg-rose-500/30 border border-rose-500/30 text-rose-300 transition-colors"
                              >
                                <Trash2 className="w-3.5 h-3.5" />
                              </button>
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                )}
              </div>
            )}

            {/* TAB 3: UACE Student Directory */}
            {activeTab === 'uace' && (
              <div className="space-y-4">
                <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3">
                  <div>
                    <h3 className="text-sm font-bold text-white uppercase tracking-wider flex items-center gap-2">
                      <GraduationCap className="w-4 h-4 text-sky-400" />
                      UACE Candidate Directory (Senior 6 / A-Level)
                      <span className="text-xs bg-emerald-500/20 text-emerald-300 border border-emerald-500/30 px-2 py-0.5 rounded-full font-mono">
                        {filteredUace.length} of {uaceResults.length} Records
                      </span>
                    </h3>
                    <span className="text-xs text-gray-400">Uganda Advanced Certificate of Education Candidates</span>
                  </div>

                  {uaceResults.length > 0 && (
                    <button
                      onClick={() => handleClearLevelStudents('UACE')}
                      className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-rose-500/20 hover:bg-rose-500/30 border border-rose-500/40 text-rose-300 font-bold text-xs transition-all"
                    >
                      <Trash2 className="w-3.5 h-3.5" />
                      <span>Delete All UACE Data</span>
                    </button>
                  )}
                </div>

                {/* UACE Search Bar */}
                <div className="relative">
                  <Search className="w-4 h-4 text-sky-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
                  <input
                    type="text"
                    value={uaceSearchQuery}
                    onChange={(e) => setUaceSearchQuery(e.target.value)}
                    placeholder="Search UACE candidate by name or index number..."
                    className="w-full pl-10 pr-4 py-2.5 rounded-xl glass-input text-xs border-white/10"
                  />
                </div>

                {filteredUace.length === 0 ? (
                  <div className="p-8 text-center glass-card rounded-2xl border border-white/10 text-gray-400 text-xs">
                    {uaceSearchQuery ? 'No UACE candidates match your search.' : 'No UACE student records in directory.'}
                  </div>
                ) : (
                  <div className="overflow-x-auto rounded-2xl border border-white/10 max-h-80 overflow-y-auto">
                    <table className="w-full text-left text-xs">
                      <thead className="sticky top-0 bg-[#10253C] border-b border-white/10 text-sky-200">
                        <tr className="uppercase text-[10px]">
                          <th className="py-2.5 px-3">Document ID (Index #)</th>
                          <th className="py-2.5 px-3">Candidate Name</th>
                          <th className="py-2.5 px-3">Combination</th>
                          <th className="py-2.5 px-3">Points & Class</th>
                          <th className="py-2.5 px-3">Year</th>
                          <th className="py-2.5 px-3 text-right">Actions</th>
                        </tr>
                      </thead>
                      <tbody className="divide-y divide-white/10 text-gray-200">
                        {filteredUace.map((st) => (
                          <tr key={st.indexNumber} className="hover:bg-white/5">
                            <td className="py-2.5 px-3 font-mono font-bold text-sky-300">{st.indexNumber}</td>
                            <td className="py-2.5 px-3 font-bold text-white">{st.studentName}</td>
                            <td className="py-2.5 px-3 text-gray-300">{st.combinationOrStream}</td>
                            <td className="py-2.5 px-3 text-emerald-300 font-semibold">{st.aggregatesOrPoints} ({st.divisionOrClass})</td>
                            <td className="py-2.5 px-3">{st.examYear}</td>
                            <td className="py-2.5 px-3 text-right">
                              <button
                                onClick={() => handleDeleteSingleStudent(st.indexNumber)}
                                title="Delete Record"
                                className="p-1.5 rounded-lg bg-rose-500/15 hover:bg-rose-500/30 border border-rose-500/30 text-rose-300 transition-colors"
                              >
                                <Trash2 className="w-3.5 h-3.5" />
                              </button>
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                )}
              </div>
            )}

          </div>
        )}

      </div>
    </div>
  );
};

