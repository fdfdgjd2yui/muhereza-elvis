import React, { useState, useEffect } from 'react';
import { StudentResult, EventItem } from '../types';
import { 
  parseSpreadsheetData, 
  syncStudentsToFirestore, 
  deleteStudentFromFirestore, 
  clearAllStudentsFromFirestore,
  getEventsFromFirestore,
  addEventToFirestore,
  deleteEventFromFirestore
} from '../lib/firebase';
import { 
  Lock, 
  X, 
  UploadCloud, 
  Trash2, 
  Calendar, 
  CheckCircle2, 
  AlertCircle,
  Eye,
  EyeOff,
  Plus,
  RefreshCw,
  Search,
  BookOpen
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
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [passwordInput, setPasswordInput] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [authError, setAuthError] = useState('');

  // Active Tab: 'paste' | 'events' | 'students'
  const [activeTab, setActiveTab] = useState<'paste' | 'events' | 'students'>('paste');

  // Search query for students table
  const [searchQuery, setSearchQuery] = useState('');

  // Excel/CSV paste state
  const [pastedData, setPastedData] = useState('');
  const [isProcessing, setIsProcessing] = useState(false);

  // Status message
  const [toastMessage, setToastMessage] = useState<{ type: 'success' | 'error'; text: string } | null>(null);

  // Events Manager Form State (No Images!)
  const [eventItems, setEventItems] = useState<EventItem[]>([]);
  const [eventTitle, setEventTitle] = useState('');
  const [eventDate, setEventDate] = useState('');
  const [eventDescription, setEventDescription] = useState('');

  useEffect(() => {
    if (isOpen && isAuthenticated) {
      loadEventsData();
    }
  }, [isOpen, isAuthenticated]);

  const loadEventsData = async () => {
    const e = await getEventsFromFirestore();
    setEventItems(e);
  };

  if (!isOpen) return null;

  const handlePasswordSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (passwordInput === 'nexusadmin2026') {
      setIsAuthenticated(true);
      setAuthError('');
    } else {
      setAuthError('Incorrect Admin Password. (Default: nexusadmin2026)');
    }
  };

  const showToast = (type: 'success' | 'error', text: string) => {
    setToastMessage({ type, text });
    setTimeout(() => setToastMessage(null), 5000);
  };

  // Sync Pasted Student Data to Firestore
  const handleProcessAndSync = async () => {
    if (!pastedData.trim()) {
      showToast('error', 'Please paste student rows into the text area before uploading.');
      return;
    }

    setIsProcessing(true);
    setToastMessage(null);

    try {
      const parsedStudents = parseSpreadsheetData(pastedData);
      
      if (parsedStudents.length === 0) {
        showToast('error', 'Could not parse student records. Please ensure text contains valid rows.');
        setIsProcessing(false);
        return;
      }

      const mergedMap = new Map<string, StudentResult>();
      studentResults.forEach(s => mergedMap.set(s.indexNumber.trim().toUpperCase(), s));
      parsedStudents.forEach(s => mergedMap.set(s.indexNumber.trim().toUpperCase(), s));

      const updatedList = Array.from(mergedMap.values());
      onUpdateResults(updatedList);

      const syncResult = await syncStudentsToFirestore(parsedStudents);

      showToast(
        'success',
        `Successfully uploaded and synced ${syncResult.count} student record(s)!`
      );
      setPastedData('');
    } catch (err: any) {
      showToast('error', `Sync failed: ${err?.message || 'Error parsing data'}`);
    } finally {
      setIsProcessing(false);
    }
  };

  // Add Event (Simple text form, no image upload)
  const handleAddEvent = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!eventTitle.trim() || !eventDate.trim() || !eventDescription.trim()) {
      showToast('error', 'Please fill in Title, Date, and Description.');
      return;
    }

    const newEvent: EventItem = {
      id: 'evt_' + Date.now(),
      title: eventTitle.trim(),
      date: eventDate.trim(),
      description: eventDescription.trim(),
      time: '09:00 AM',
      location: 'Main Campus',
      category: 'General',
      image: ''
    };

    await addEventToFirestore(newEvent);
    window.dispatchEvent(new Event('nexus_events_updated'));
    await loadEventsData();

    setEventTitle('');
    setEventDate('');
    setEventDescription('');
    showToast('success', 'Event published successfully.');
  };

  // Delete Event
  const handleDeleteEvent = async (id: string) => {
    if (!window.confirm('Delete this event?')) return;
    await deleteEventFromFirestore(id);
    window.dispatchEvent(new Event('nexus_events_updated'));
    await loadEventsData();
    showToast('success', 'Event deleted.');
  };

  // Delete Single Student
  const handleDeleteStudent = async (indexNumber: string) => {
    if (!window.confirm(`Delete record for Index Number ${indexNumber}?`)) return;
    try {
      await deleteStudentFromFirestore(indexNumber);
      const targetId = indexNumber.trim().toUpperCase();
      const updated = studentResults.filter(s => s.indexNumber.trim().toUpperCase() !== targetId);
      onUpdateResults(updated);
      showToast('success', `Deleted record ${indexNumber}.`);
    } catch (err: any) {
      showToast('error', `Deletion failed: ${err?.message || 'Error'}`);
    }
  };

  // Clear All Students
  const handleClearAllStudents = async () => {
    if (!window.confirm('Are you sure you want to clear ALL student records?')) return;
    try {
      const ids = studentResults.map(s => s.indexNumber);
      await clearAllStudentsFromFirestore(ids);
      onUpdateResults([]);
      showToast('success', 'Cleared all student records.');
    } catch (err: any) {
      showToast('error', `Failed to clear students: ${err?.message}`);
    }
  };

  const filteredStudents = studentResults.filter(s =>
    s.studentName.toLowerCase().includes(searchQuery.toLowerCase()) ||
    s.indexNumber.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/70 backdrop-blur-sm animate-in fade-in overflow-y-auto">
      <div className="w-full max-w-4xl bg-white border border-slate-300 text-slate-900 rounded shadow-xl overflow-hidden my-8">
        
        {/* Header */}
        <div className="bg-[#0B1A30] text-white px-6 py-4 flex items-center justify-between">
          <div className="flex items-center gap-2.5">
            <Lock className="w-5 h-5 text-amber-400" />
            <h2 className="text-base font-bold">Nexus Academy Admin Portal</h2>
          </div>
          <button
            onClick={onClose}
            className="p-1 rounded text-slate-300 hover:text-white hover:bg-slate-800 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Modal Body */}
        {!isAuthenticated ? (
          <div className="p-8 max-w-md mx-auto text-center space-y-4">
            <h3 className="text-lg font-bold text-[#0B1A30]">Admin Password Required</h3>
            <p className="text-xs text-slate-600">Enter the administrator password to manage UNEB records & events.</p>

            <form onSubmit={handlePasswordSubmit} className="space-y-3 text-left">
              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">Password</label>
                <div className="relative">
                  <input
                    type={showPassword ? 'text' : 'password'}
                    value={passwordInput}
                    onChange={(e) => setPasswordInput(e.target.value)}
                    placeholder="Enter admin password"
                    className="w-full px-3 py-2 rounded border border-slate-300 text-sm focus:outline-none focus:border-[#0B1A30]"
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-2.5 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600"
                  >
                    {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                  </button>
                </div>
                {authError && <p className="text-xs text-red-600 mt-1">{authError}</p>}
              </div>

              <button
                type="submit"
                className="w-full py-2.5 rounded bg-[#0B1A30] text-white font-bold text-xs hover:bg-slate-800 transition-colors"
              >
                Log In
              </button>
            </form>
          </div>
        ) : (
          <div className="p-6 space-y-4">
            
            {/* Status Toast Banner */}
            {toastMessage && (
              <div className={`p-3 rounded border text-xs font-semibold flex items-center justify-between ${
                toastMessage.type === 'success' 
                  ? 'bg-emerald-50 border-emerald-300 text-emerald-800' 
                  : 'bg-red-50 border-red-300 text-red-800'
              }`}>
                <div className="flex items-center gap-2">
                  {toastMessage.type === 'success' ? <CheckCircle2 className="w-4 h-4" /> : <AlertCircle className="w-4 h-4" />}
                  <span>{toastMessage.text}</span>
                </div>
                <button onClick={() => setToastMessage(null)} className="text-slate-500 hover:text-slate-800">
                  <X className="w-4 h-4" />
                </button>
              </div>
            )}

            {/* Tabs */}
            <div className="flex items-center gap-2 border-b border-slate-200 pb-3">
              <button
                onClick={() => setActiveTab('paste')}
                className={`px-3 py-1.5 rounded text-xs font-bold transition-colors ${
                  activeTab === 'paste'
                    ? 'bg-[#0B1A30] text-white'
                    : 'bg-slate-100 text-slate-700 hover:bg-slate-200'
                }`}
              >
                Sync Student Data
              </button>

              <button
                onClick={() => setActiveTab('events')}
                className={`px-3 py-1.5 rounded text-xs font-bold transition-colors ${
                  activeTab === 'events'
                    ? 'bg-[#0B1A30] text-white'
                    : 'bg-slate-100 text-slate-700 hover:bg-slate-200'
                }`}
              >
                Manage Events ({eventItems.length})
              </button>

              <button
                onClick={() => setActiveTab('students')}
                className={`px-3 py-1.5 rounded text-xs font-bold transition-colors ${
                  activeTab === 'students'
                    ? 'bg-[#0B1A30] text-white'
                    : 'bg-slate-100 text-slate-700 hover:bg-slate-200'
                }`}
              >
                Student Records ({studentResults.length})
              </button>
            </div>

            {/* TAB 1: PASTE & SYNC STUDENT DATA */}
            {activeTab === 'paste' && (
              <div className="space-y-3">
                <div className="p-3 bg-slate-50 border border-slate-200 rounded text-xs text-slate-700">
                  <p className="font-bold text-[#0B1A30] mb-1">Paste Excel or CSV Student Rows</p>
                  <p>Input columns: Index Number, Name, Level (UCE/UACE), Year, Stream, Aggregates/Points, Division.</p>
                  <p className="text-slate-500 mt-0.5">Saves directly to candidate records database.</p>
                </div>

                <textarea
                  rows={8}
                  value={pastedData}
                  onChange={(e) => setPastedData(e.target.value)}
                  placeholder={`U0001/501\tKATO JOHN\tUCE\t2025\tM\tSTREAM A\t10 AGGREGATES\tDIVISION 1\nU0001/502\tNAKATO MARY\tUACE\t2025\tF\tPCM/ICT\t18 POINTS\tCLASS 1`}
                  className="w-full p-3 rounded border border-slate-300 font-mono text-xs text-slate-800 focus:outline-none focus:border-[#0B1A30]"
                />

                <div className="flex justify-end">
                  <button
                    onClick={handleProcessAndSync}
                    disabled={isProcessing}
                    className="px-5 py-2 rounded bg-[#0B1A30] text-white font-bold text-xs hover:bg-slate-800 transition-colors flex items-center gap-2 disabled:opacity-50"
                  >
                    {isProcessing ? <RefreshCw className="w-4 h-4 animate-spin" /> : <UploadCloud className="w-4 h-4" />}
                    <span>Upload & Sync Records</span>
                  </button>
                </div>
              </div>
            )}

            {/* TAB 2: SIMPLE TEXT FORM TO ADD EVENTS (NO IMAGES) */}
            {activeTab === 'events' && (
              <div className="space-y-5">
                <form onSubmit={handleAddEvent} className="p-4 rounded border border-slate-300 bg-slate-50 space-y-3">
                  <h3 className="text-xs font-bold text-[#0B1A30] uppercase tracking-wider flex items-center gap-1.5">
                    <Plus className="w-4 h-4" /> Add New School Event
                  </h3>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    <div>
                      <label className="block text-xs font-semibold text-slate-700 mb-1">Event Title</label>
                      <input
                        type="text"
                        value={eventTitle}
                        onChange={(e) => setEventTitle(e.target.value)}
                        placeholder="e.g. End of Term Parent Teacher Conference"
                        className="w-full px-3 py-2 rounded border border-slate-300 text-xs text-slate-800 focus:outline-none focus:border-[#0B1A30]"
                      />
                    </div>

                    <div>
                      <label className="block text-xs font-semibold text-slate-700 mb-1">Date</label>
                      <input
                        type="text"
                        value={eventDate}
                        onChange={(e) => setEventDate(e.target.value)}
                        placeholder="e.g. August 15, 2026"
                        className="w-full px-3 py-2 rounded border border-slate-300 text-xs text-slate-800 focus:outline-none focus:border-[#0B1A30]"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-slate-700 mb-1">Description</label>
                    <textarea
                      rows={2}
                      value={eventDescription}
                      onChange={(e) => setEventDescription(e.target.value)}
                      placeholder="Brief details about the event..."
                      className="w-full p-2.5 rounded border border-slate-300 text-xs text-slate-800 focus:outline-none focus:border-[#0B1A30]"
                    />
                  </div>

                  <button
                    type="submit"
                    className="px-4 py-2 rounded bg-[#0B1A30] text-white font-bold text-xs hover:bg-slate-800 transition-colors flex items-center gap-1.5"
                  >
                    <Calendar className="w-4 h-4" /> Save Event
                  </button>
                </form>

                {/* Published Events List */}
                <div className="space-y-2">
                  <h4 className="text-xs font-bold text-slate-700 uppercase">Existing Events ({eventItems.length})</h4>
                  {eventItems.length === 0 ? (
                    <p className="text-xs text-slate-500 italic">No events currently posted.</p>
                  ) : (
                    <ul className="divide-y divide-slate-200 border border-slate-200 rounded">
                      {eventItems.map((evt) => (
                        <li key={evt.id} className="p-3 flex items-start justify-between gap-4 hover:bg-slate-50">
                          <div>
                            <p className="text-xs font-bold text-[#0B1A30]">{evt.title}</p>
                            <p className="text-[11px] text-slate-500 font-semibold">{evt.date}</p>
                            <p className="text-xs text-slate-700 mt-1">{evt.description}</p>
                          </div>
                          <button
                            onClick={() => handleDeleteEvent(evt.id)}
                            className="p-1.5 rounded bg-red-50 text-red-600 hover:bg-red-100 transition-colors shrink-0"
                            title="Delete Event"
                          >
                            <Trash2 className="w-4 h-4" />
                          </button>
                        </li>
                      ))}
                    </ul>
                  )}
                </div>
              </div>
            )}

            {/* TAB 3: STUDENT RECORDS MANAGEMENT */}
            {activeTab === 'students' && (
              <div className="space-y-3">
                <div className="flex flex-col sm:flex-row items-center justify-between gap-3">
                  <div className="relative w-full sm:w-64">
                    <Search className="w-3.5 h-3.5 text-slate-400 absolute left-2.5 top-1/2 -translate-y-1/2" />
                    <input
                      type="text"
                      placeholder="Search candidate or index..."
                      value={searchQuery}
                      onChange={(e) => setSearchQuery(e.target.value)}
                      className="w-full pl-8 pr-3 py-1.5 rounded border border-slate-300 text-xs text-slate-800 focus:outline-none focus:border-[#0B1A30]"
                    />
                  </div>

                  <button
                    onClick={handleClearAllStudents}
                    className="px-3 py-1.5 rounded bg-red-50 text-red-700 border border-red-200 text-xs font-bold hover:bg-red-100 transition-colors flex items-center gap-1.5"
                  >
                    <Trash2 className="w-3.5 h-3.5" />
                    <span>Clear All Student Records</span>
                  </button>
                </div>

                <div className="overflow-x-auto border border-slate-200 rounded max-h-72">
                  <table className="w-full text-left text-xs">
                    <thead className="bg-slate-100 text-slate-700 font-bold border-b border-slate-200">
                      <tr>
                        <th className="p-2.5">Index No</th>
                        <th className="p-2.5">Student Name</th>
                        <th className="p-2.5">Level</th>
                        <th className="p-2.5">Division / Class</th>
                        <th className="p-2.5">Aggs / Pts</th>
                        <th className="p-2.5 text-right">Action</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-200">
                      {filteredStudents.length === 0 ? (
                        <tr>
                          <td colSpan={6} className="p-4 text-center text-slate-500 italic">
                            No student records found.
                          </td>
                        </tr>
                      ) : (
                        filteredStudents.map((s) => (
                          <tr key={s.indexNumber} className="hover:bg-slate-50">
                            <td className="p-2.5 font-mono font-bold text-[#0B1A30]">{s.indexNumber}</td>
                            <td className="p-2.5 font-semibold text-slate-800">{s.studentName}</td>
                            <td className="p-2.5 text-slate-600">{s.level}</td>
                            <td className="p-2.5 text-slate-600">{s.divisionOrClass}</td>
                            <td className="p-2.5 text-slate-600">{s.aggregatesOrPoints}</td>
                            <td className="p-2.5 text-right">
                              <button
                                onClick={() => handleDeleteStudent(s.indexNumber)}
                                className="p-1 rounded bg-red-50 text-red-600 hover:bg-red-100 transition-colors"
                              >
                                <Trash2 className="w-3.5 h-3.5" />
                              </button>
                            </td>
                          </tr>
                        ))
                      )}
                    </tbody>
                  </table>
                </div>
              </div>
            )}

          </div>
        )}

      </div>
    </div>
  );
};
