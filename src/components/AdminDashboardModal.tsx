import React, { useState, useEffect } from 'react';
import { StudentResult, EventItem, GalleryItem, NewsItem } from '../types';
import { compressImageToThumbnail } from '../lib/imageUtils';
import { 
  parseSpreadsheetData, 
  syncStudentsToFirestore, 
  deleteStudentFromFirestore, 
  clearAllStudentsFromFirestore,
  getStudentIndexNumber,
  getEventsFromFirestore,
  subscribeToEvents,
  addEventToFirestore,
  deleteEventFromFirestore,
  getGalleryFromFirestore,
  subscribeToGallery,
  addGalleryItemToFirestore,
  deleteGalleryItemFromFirestore,
  getNewsFromFirestore,
  subscribeToNews,
  addNewsToFirestore,
  deleteNewsFromFirestore
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
  Image as ImageIcon,
  Upload,
  MapPin,
  Clock,
  Tag,
  Edit2,
  Newspaper,
  Megaphone
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

  // Active Tab: 'paste' | 'events' | 'gallery' | 'news' | 'students'
  const [activeTab, setActiveTab] = useState<'paste' | 'events' | 'gallery' | 'news' | 'students'>('paste');

  // Search query for students table
  const [searchQuery, setSearchQuery] = useState('');
  const [studentExamFilter, setStudentExamFilter] = useState<'all' | 'uneb' | 'mock'>('all');
  const [studentLevelFilter, setStudentLevelFilter] = useState<'all' | 'o-level' | 'a-level'>('all');

  // Excel/CSV paste state
  const [pastedData, setPastedData] = useState('');
  const [isProcessing, setIsProcessing] = useState(false);

  // Toast notification
  const [toastMessage, setToastMessage] = useState<{ type: 'success' | 'error'; text: string } | null>(null);

  // Events Manager State
  const [eventItems, setEventItems] = useState<EventItem[]>([]);
  const [eventTitle, setEventTitle] = useState('');
  const [eventDate, setEventDate] = useState('');
  const [eventTime, setEventTime] = useState('09:00 AM');
  const [eventLocation, setEventLocation] = useState('Nexus Main Auditorium');
  const [eventCategory, setEventCategory] = useState('Academics');
  const [eventDescription, setEventDescription] = useState('');
  const [eventImageBase64, setEventImageBase64] = useState('');

  // Gallery Manager State
  const [galleryItems, setGalleryItems] = useState<GalleryItem[]>([]);
  const [galleryTitle, setGalleryTitle] = useState('');
  const [galleryCategory, setGalleryCategory] = useState('stem');
  const [galleryDescription, setGalleryDescription] = useState('');
  const [galleryImageBase64, setGalleryImageBase64] = useState('');

  // News Manager State
  const [newsItems, setNewsItems] = useState<NewsItem[]>([]);
  const [newsTitle, setNewsTitle] = useState('');
  const [newsDescription, setNewsDescription] = useState('');

  // Confirm deletion inline state
  const [deletingEventId, setDeletingEventId] = useState<string | null>(null);
  const [deletingGalleryId, setDeletingGalleryId] = useState<string | null>(null);
  const [deletingNewsId, setDeletingNewsId] = useState<string | null>(null);
  const [deletingStudentId, setDeletingStudentId] = useState<string | null>(null);
  const [isConfirmingClearAll, setIsConfirmingClearAll] = useState<boolean>(false);

  useEffect(() => {
    if (isOpen && isAuthenticated) {
      loadData();
      const unsubEvents = subscribeToEvents((data) => setEventItems(data));
      const unsubGallery = subscribeToGallery((data) => setGalleryItems(data));
      const unsubNews = subscribeToNews((data) => setNewsItems(data));
      return () => {
        unsubEvents();
        unsubGallery();
        unsubNews();
      };
    }
  }, [isOpen, isAuthenticated]);

  const loadData = async () => {
    const e = await getEventsFromFirestore();
    setEventItems(e);
    const g = await getGalleryFromFirestore();
    setGalleryItems(g);
    const n = await getNewsFromFirestore();
    setNewsItems(n);
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

  // Convert device photo to compressed light-speed thumbnail
  const handleEventImageSelect = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      try {
        const thumb = await compressImageToThumbnail(file, 800, 800, 0.75);
        setEventImageBase64(thumb);
      } catch (err) {
        showToast('error', 'Could not process image photo.');
      }
    }
  };

  const handleGalleryImageSelect = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      try {
        const thumb = await compressImageToThumbnail(file, 800, 800, 0.75);
        setGalleryImageBase64(thumb);
      } catch (err) {
        showToast('error', 'Could not process image photo.');
      }
    }
  };

  // Sync Pasted Student Data
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
        showToast('error', 'Could not parse student records. Ensure text contains valid rows.');
        setIsProcessing(false);
        return;
      }

      const mergedMap = new Map<string, StudentResult>();
      studentResults.forEach(s => {
        const rawIdx = getStudentId(s);
        const safeIdx = rawIdx ? String(rawIdx).trim() : null;
        if (safeIdx) mergedMap.set(safeIdx.toUpperCase(), s);
      });
      parsedStudents.forEach(s => {
        const rawIdx = getStudentId(s);
        const safeIdx = rawIdx ? String(rawIdx).trim() : null;
        if (safeIdx) mergedMap.set(safeIdx.toUpperCase(), s);
      });

      const updatedList = Array.from(mergedMap.values());
      onUpdateResults(updatedList);

      const syncResult = await syncStudentsToFirestore(parsedStudents);

      showToast(
        'success',
        `Successfully uploaded and saved ${syncResult.count} student record(s)!`
      );
      setPastedData('');
    } catch (err: any) {
      showToast('error', `Sync failed: ${err?.message || 'Error parsing data'}`);
    } finally {
      setIsProcessing(false);
    }
  };

  // Add / Update Event
  const handleAddEvent = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!eventTitle.trim() || !eventDate.trim()) {
      showToast('error', 'Please fill in Event Title and Date.');
      return;
    }

    // Format date string nicely if HTML date picker format YYYY-MM-DD was selected
    let formattedDate = eventDate.trim();
    if (formattedDate.includes('-') && formattedDate.length === 10) {
      const d = new Date(formattedDate);
      if (!isNaN(d.getTime())) {
        formattedDate = d.toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' });
      }
    }

    const newEvent: EventItem = {
      id: 'evt_' + Date.now(),
      title: eventTitle.trim(),
      date: formattedDate,
      time: eventTime.trim() || '09:00 AM',
      location: eventLocation.trim() || 'Nexus Auditorium',
      category: eventCategory,
      description: eventDescription.trim() || 'Official Nexus Academy event.',
      image: eventImageBase64
    };

    await addEventToFirestore(newEvent);
    window.dispatchEvent(new Event('nexus_events_updated'));
    await loadData();

    setEventTitle('');
    setEventDate('');
    setEventDescription('');
    setEventImageBase64('');
    showToast('success', 'Event published and saved to database successfully!');
  };

  const handleDeleteEvent = async (id: string) => {
    try {
      await deleteEventFromFirestore(id);
      window.dispatchEvent(new Event('nexus_events_updated'));
      await loadData();
      setDeletingEventId(null);
      showToast('success', 'Event deleted successfully.');
    } catch (err: any) {
      showToast('error', `Failed to delete event: ${err?.message || 'Error'}`);
    }
  };

  // Add Gallery Item
  const handleAddGallery = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!galleryTitle.trim()) {
      showToast('error', 'Please enter a title for the gallery item.');
      return;
    }

    const newItem: GalleryItem = {
      id: 'gal_' + Date.now(),
      title: galleryTitle.trim(),
      category: galleryCategory,
      description: galleryDescription.trim(),
      image: galleryImageBase64
    };

    await addGalleryItemToFirestore(newItem);
    window.dispatchEvent(new Event('nexus_gallery_updated'));
    await loadData();

    setGalleryTitle('');
    setGalleryDescription('');
    setGalleryImageBase64('');
    showToast('success', 'Campus Gallery item added!');
  };

  const handleDeleteGallery = async (id: string) => {
    try {
      await deleteGalleryItemFromFirestore(id);
      window.dispatchEvent(new Event('nexus_gallery_updated'));
      await loadData();
      setDeletingGalleryId(null);
      showToast('success', 'Gallery item deleted successfully.');
    } catch (err: any) {
      showToast('error', `Failed to delete photo: ${err?.message || 'Error'}`);
    }
  };

  // Add News Item (Title & Description only)
  const handleAddNews = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!newsTitle.trim()) {
      showToast('error', 'Please enter a title for the news update.');
      return;
    }
    if (!newsDescription.trim()) {
      showToast('error', 'Please enter a description for the news update.');
      return;
    }

    const newArticle: NewsItem = {
      id: 'news_' + Date.now(),
      title: newsTitle.trim(),
      description: newsDescription.trim(),
      date: new Date().toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' }),
      summary: newsDescription.trim(),
      content: newsDescription.trim()
    };

    await addNewsToFirestore(newArticle);
    window.dispatchEvent(new Event('nexus_news_updated'));
    await loadData();

    setNewsTitle('');
    setNewsDescription('');
    showToast('success', 'News Update published successfully!');
  };

  const handleDeleteNews = async (id: string) => {
    try {
      await deleteNewsFromFirestore(id);
      window.dispatchEvent(new Event('nexus_news_updated'));
      await loadData();
      setDeletingNewsId(null);
      showToast('success', 'News Update deleted successfully.');
    } catch (err: any) {
      showToast('error', `Failed to delete news: ${err?.message || 'Error'}`);
    }
  };

  // Helper to extract primary student identifier from flexible keys
  const getStudentId = (student: any): string => {
    return getStudentIndexNumber(student);
  };

  // Student Deletion
  const handleDeleteStudent = async (studentId: string) => {
    try {
      const targetId = studentId.trim().toUpperCase();
      await deleteStudentFromFirestore(targetId);
      const updated = studentResults.filter(s => getStudentId(s).trim().toUpperCase() !== targetId);
      onUpdateResults(updated);
      setDeletingStudentId(null);
      showToast('success', `Deleted student record: ${studentId}`);
    } catch (err: any) {
      showToast('error', `Deletion failed: ${err?.message || 'Error'}`);
    }
  };

  const handleClearAllStudents = async () => {
    try {
      const ids = studentResults.map(s => getStudentId(s));
      await clearAllStudentsFromFirestore(ids);
      onUpdateResults([]);
      setIsConfirmingClearAll(false);
      showToast('success', 'Cleared all student records.');
    } catch (err: any) {
      showToast('error', `Failed to clear students: ${err?.message}`);
    }
  };

  // Flexible search and level/exam filter across all record fields
  const filteredStudents = studentResults.filter(s => {
    // Exam Type filter (UNEB vs Mock)
    if (studentExamFilter !== 'all') {
      const typeStr = JSON.stringify(s).toLowerCase();
      const isMock = typeStr.includes('mock');
      if (studentExamFilter === 'mock' && !isMock) return false;
      if (studentExamFilter === 'uneb' && isMock) return false;
    }

    // Level filter (O-Level vs A-Level)
    if (studentLevelFilter !== 'all') {
      const lvlStr = JSON.stringify(s).toLowerCase();
      const isALevel = lvlStr.includes('a-level') || lvlStr.includes('uace') || lvlStr.includes('combination') || lvlStr.includes('total points');
      if (studentLevelFilter === 'a-level' && !isALevel) return false;
      if (studentLevelFilter === 'o-level' && isALevel) return false;
    }

    if (!searchQuery.trim()) return true;
    const q = searchQuery.toLowerCase();
    return Object.values(s).some(val => {
      if (val === null || val === undefined) return false;
      if (typeof val === 'string' || typeof val === 'number' || typeof val === 'boolean') {
        return String(val).toLowerCase().includes(q);
      }
      if (Array.isArray(val)) {
        return val.some(item => {
          if (typeof item === 'object' && item !== null) {
            return Object.values(item).some(v => String(v).toLowerCase().includes(q));
          }
          return String(item).toLowerCase().includes(q);
        });
      }
      if (typeof val === 'object') {
        return Object.values(val).some(v => String(v).toLowerCase().includes(q));
      }
      return false;
    });
  });

  // Dynamic headers extracted directly from the keys of the first object in data array
  const dynamicHeaders = studentResults.length > 0 ? Object.keys(studentResults[0]) : [];

  // Capitalize first letter of each word in dynamic header title
  const formatHeaderTitle = (key: string): string => {
    const words = key
      .replace(/([a-z])([A-Z])/g, '$1 $2')
      .replace(/[_-]+/g, ' ')
      .trim();
    return words
      .split(/\s+/)
      .map(w => w.charAt(0).toUpperCase() + w.slice(1).toLowerCase())
      .join(' ');
  };

  // Format dynamic cell value (arrays, objects, dash-lists, or strings)
  const formatCellValue = (val: any): string => {
    if (val === null || val === undefined || val === '') {
      return '-';
    }
    if (Array.isArray(val)) {
      if (val.length === 0) return '-';
      return val
        .map(item => {
          if (typeof item === 'object' && item !== null) {
            if (item.name && item.grade) return `${item.name} (${item.grade})`;
            if (item.name && item.score) return `${item.name} (${item.score})`;
            if (item.code && item.grade) return `${item.code}: ${item.grade}`;
            return Object.values(item).filter(Boolean).join(' ');
          }
          return String(item);
        })
        .join(', ');
    }
    if (typeof val === 'object') {
      return Object.entries(val)
        .map(([k, v]) => `${k}: ${v}`)
        .join(', ');
    }
    return String(val);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/70 backdrop-blur-sm animate-in fade-in overflow-y-auto">
      <div className="w-full max-w-4xl bg-white border border-slate-300 text-slate-900 rounded-2xl shadow-2xl overflow-hidden my-8">
        
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
            <p className="text-xs text-slate-600">Enter the administrator password to manage UNEB records & campus events.</p>

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
              <div className={`p-3 rounded-xl border text-xs font-semibold flex items-center justify-between ${
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

            {/* Navigation Tabs */}
            <div className="flex flex-wrap items-center gap-2 border-b border-slate-200 pb-3">
              <button
                onClick={() => setActiveTab('paste')}
                className={`px-3.5 py-2 rounded-xl text-xs font-bold transition-all ${
                  activeTab === 'paste'
                    ? 'bg-[#0B1A30] text-white shadow-md'
                    : 'bg-slate-100 text-slate-700 hover:bg-slate-200'
                }`}
              >
                Sync Student Data
              </button>

              <button
                onClick={() => setActiveTab('events')}
                className={`px-3.5 py-2 rounded-xl text-xs font-bold transition-all ${
                  activeTab === 'events'
                    ? 'bg-[#0B1A30] text-white shadow-md'
                    : 'bg-slate-100 text-slate-700 hover:bg-slate-200'
                }`}
              >
                Manage Events ({eventItems.length})
              </button>

              <button
                onClick={() => setActiveTab('gallery')}
                className={`px-3.5 py-2 rounded-xl text-xs font-bold transition-all ${
                  activeTab === 'gallery'
                    ? 'bg-[#0B1A30] text-white shadow-md'
                    : 'bg-slate-100 text-slate-700 hover:bg-slate-200'
                }`}
              >
                Campus Gallery ({galleryItems.length})
              </button>

              <button
                onClick={() => setActiveTab('news')}
                className={`px-3.5 py-2 rounded-xl text-xs font-bold transition-all ${
                  activeTab === 'news'
                    ? 'bg-[#0B1A30] text-white shadow-md'
                    : 'bg-slate-100 text-slate-700 hover:bg-slate-200'
                }`}
              >
                News & Updates ({newsItems.length})
              </button>

              <button
                onClick={() => setActiveTab('students')}
                className={`px-3.5 py-2 rounded-xl text-xs font-bold transition-all ${
                  activeTab === 'students'
                    ? 'bg-[#0B1A30] text-white shadow-md'
                    : 'bg-slate-100 text-slate-700 hover:bg-slate-200'
                }`}
              >
                Student Records ({studentResults.length})
              </button>
            </div>

            {/* TAB 1: PASTE STUDENT DATA */}
            {activeTab === 'paste' && (
              <div className="space-y-3">
                <div className="p-4 bg-slate-50 border border-slate-200 rounded-xl text-xs text-slate-700">
                  <p className="font-bold text-[#0B1A30] mb-1">Paste Excel or CSV Student Rows</p>
                  <p>Columns: Index Number, Name, Level (UCE/UACE), Year, Gender, Stream, Aggregates/Points, Division.</p>
                  <p className="text-slate-500 mt-1">Saves directly into permanent student results database.</p>
                </div>

                <textarea
                  rows={8}
                  value={pastedData}
                  onChange={(e) => setPastedData(e.target.value)}
                  placeholder={`U0001/501\tKATO JOHN\tUCE\t2025\tM\tSTREAM A\t10 AGGREGATES\tDIVISION 1\nU0001/502\tNAKATO MARY\tUACE\t2025\tF\tPCM/ICT\t18 POINTS\tCLASS 1`}
                  className="w-full p-3 rounded-xl border border-slate-300 font-mono text-xs text-slate-800 focus:outline-none focus:border-[#0B1A30]"
                />

                <div className="flex justify-end">
                  <button
                    onClick={handleProcessAndSync}
                    disabled={isProcessing}
                    className="px-5 py-2.5 rounded-xl bg-[#0B1A30] text-white font-bold text-xs hover:bg-slate-800 transition-colors flex items-center gap-2 disabled:opacity-50 shadow"
                  >
                    {isProcessing ? <RefreshCw className="w-4 h-4 animate-spin" /> : <UploadCloud className="w-4 h-4" />}
                    <span>Upload & Sync Student Records</span>
                  </button>
                </div>
              </div>
            )}

            {/* TAB 2: EVENTS MANAGER WITH DEVICE IMAGE SELECTION */}
            {activeTab === 'events' && (
              <div className="space-y-6">
                <form onSubmit={handleAddEvent} className="p-5 rounded-2xl border border-slate-300 bg-slate-50 space-y-4">
                  <h3 className="text-xs font-bold text-[#0B1A30] uppercase tracking-wider flex items-center gap-1.5 border-b border-slate-200 pb-2">
                    <Plus className="w-4 h-4 text-amber-600" /> Create / Update Event with Device Storage Photo
                  </h3>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs font-bold text-slate-700 mb-1">Event Title *</label>
                      <input
                        type="text"
                        value={eventTitle}
                        onChange={(e) => setEventTitle(e.target.value)}
                        placeholder="e.g. Annual Science & STEM Fair"
                        className="w-full px-3 py-2 rounded-xl border border-slate-300 text-xs text-slate-800 focus:outline-none focus:border-[#0B1A30]"
                        required
                      />
                    </div>

                    <div>
                      <label className="block text-xs font-bold text-slate-700 mb-1">Category</label>
                      <select
                        value={eventCategory}
                        onChange={(e) => setEventCategory(e.target.value)}
                        className="w-full px-3 py-2 rounded-xl border border-slate-300 text-xs text-slate-800 focus:outline-none focus:border-[#0B1A30]"
                      >
                        <option value="Academics">Academics</option>
                        <option value="Examinations">Examinations</option>
                        <option value="Sports">Sports</option>
                        <option value="Cultural">Cultural & Arts</option>
                        <option value="General">General School</option>
                      </select>
                    </div>

                    <div>
                      <label className="block text-xs font-bold text-slate-700 mb-1 flex items-center gap-1">
                        <Calendar className="w-3.5 h-3.5 text-amber-600" /> Date (Select from Calendar) *
                      </label>
                      <input
                        type="date"
                        value={eventDate}
                        onChange={(e) => setEventDate(e.target.value)}
                        className="w-full px-3 py-2 rounded-xl border border-slate-300 text-xs text-slate-800 focus:outline-none focus:border-[#0B1A30] cursor-pointer"
                        required
                      />
                    </div>

                    <div>
                      <label className="block text-xs font-bold text-slate-700 mb-1">Time & Venue</label>
                      <div className="flex gap-2">
                        <input
                          type="text"
                          value={eventTime}
                          onChange={(e) => setEventTime(e.target.value)}
                          placeholder="09:00 AM"
                          className="w-1/3 px-3 py-2 rounded-xl border border-slate-300 text-xs text-slate-800 focus:outline-none focus:border-[#0B1A30]"
                        />
                        <input
                          type="text"
                          value={eventLocation}
                          onChange={(e) => setEventLocation(e.target.value)}
                          placeholder="Nexus Main Auditorium"
                          className="w-2/3 px-3 py-2 rounded-xl border border-slate-300 text-xs text-slate-800 focus:outline-none focus:border-[#0B1A30]"
                        />
                      </div>
                    </div>
                  </div>

                  {/* Device Image Picker (No URLs required!) */}
                  <div>
                    <label className="block text-xs font-bold text-slate-700 mb-1 flex items-center gap-1.5">
                      <ImageIcon className="w-4 h-4 text-amber-600" />
                      Select Photo from Device Storage
                    </label>

                    <div className="flex flex-col sm:flex-row items-center gap-4 p-3 bg-white border border-slate-300 rounded-xl">
                      <input
                        type="file"
                        accept="image/*"
                        onChange={handleEventImageSelect}
                        className="text-xs text-slate-600 file:mr-3 file:py-1.5 file:px-3 file:rounded-lg file:border-0 file:text-xs file:font-bold file:bg-[#0B1A30] file:text-white hover:file:bg-slate-800 cursor-pointer"
                      />

                      {eventImageBase64 && (
                        <div className="flex items-center gap-3 border-l border-slate-200 pl-4">
                          <img src={eventImageBase64} alt="Preview" className="w-12 h-12 rounded-lg object-cover border border-slate-300" />
                          <button
                            type="button"
                            onClick={() => setEventImageBase64('')}
                            className="text-[11px] font-bold text-red-600 hover:underline"
                          >
                            Remove Photo
                          </button>
                        </div>
                      )}
                    </div>
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-slate-700 mb-1">Description</label>
                    <textarea
                      rows={2}
                      value={eventDescription}
                      onChange={(e) => setEventDescription(e.target.value)}
                      placeholder="Enter event agenda, guest information, or parent instructions..."
                      className="w-full p-2.5 rounded-xl border border-slate-300 text-xs text-slate-800 focus:outline-none focus:border-[#0B1A30]"
                    />
                  </div>

                  <button
                    type="submit"
                    className="px-5 py-2.5 rounded-xl bg-[#0B1A30] text-white font-bold text-xs hover:bg-slate-800 transition-colors flex items-center gap-2 shadow"
                  >
                    <Calendar className="w-4 h-4 text-amber-400" /> Save Event to Database
                  </button>
                </form>

                {/* Published Events List */}
                <div className="space-y-3">
                  <h4 className="text-xs font-bold text-slate-700 uppercase">Existing Events ({eventItems.length})</h4>
                  {eventItems.length === 0 ? (
                    <p className="text-xs text-slate-500 italic">No events posted yet.</p>
                  ) : (
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 max-h-72 overflow-y-auto">
                      {eventItems.map((evt) => (
                        <div key={evt.id} className="p-3 bg-slate-50 border border-slate-200 rounded-xl flex items-start justify-between gap-3">
                          <div className="flex items-start gap-3">
                            {evt.image ? (
                              <img src={evt.image} alt={evt.title} className="w-14 h-14 rounded-lg object-cover border border-slate-300 shrink-0" />
                            ) : (
                              <div className="w-14 h-14 rounded-lg bg-[#0B1A30] text-white font-black text-xs flex items-center justify-center shrink-0">
                                EVT
                              </div>
                            )}
                            <div>
                              <p className="text-xs font-bold text-[#0B1A30] leading-tight">{evt.title}</p>
                              <p className="text-[11px] text-amber-700 font-semibold mt-0.5">{evt.date} • {evt.category}</p>
                              <p className="text-[11px] text-slate-600 line-clamp-1 mt-1">{evt.description}</p>
                            </div>
                          </div>
                          <div className="flex items-center gap-1.5 shrink-0">
                            {deletingEventId === evt.id ? (
                              <div className="flex items-center gap-1 bg-red-100 p-1 rounded-lg border border-red-300">
                                <button
                                  type="button"
                                  onClick={() => handleDeleteEvent(evt.id)}
                                  className="px-2 py-1 rounded bg-red-600 text-white text-[10px] font-extrabold hover:bg-red-700 transition-colors"
                                >
                                  Confirm
                                </button>
                                <button
                                  type="button"
                                  onClick={() => setDeletingEventId(null)}
                                  className="px-2 py-1 rounded bg-slate-200 text-slate-700 text-[10px] font-bold hover:bg-slate-300 transition-colors"
                                >
                                  Cancel
                                </button>
                              </div>
                            ) : (
                              <button
                                type="button"
                                onClick={() => setDeletingEventId(evt.id)}
                                className="p-1.5 rounded-lg bg-red-50 text-red-600 hover:bg-red-100 transition-colors"
                                title="Delete Event"
                              >
                                <Trash2 className="w-4 h-4" />
                              </button>
                            )}
                          </div>
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              </div>
            )}

            {/* TAB 3: CAMPUS GALLERY MANAGEMENT WITH DEVICE STORAGE UPLOAD */}
            {activeTab === 'gallery' && (
              <div className="space-y-6">
                <form onSubmit={handleAddGallery} className="p-5 rounded-2xl border border-slate-300 bg-slate-50 space-y-4">
                  <h3 className="text-xs font-bold text-[#0B1A30] uppercase tracking-wider flex items-center gap-1.5 border-b border-slate-200 pb-2">
                    <ImageIcon className="w-4 h-4 text-amber-600" /> Add Campus Gallery Photo from Device Storage
                  </h3>

                  <div>
                    <label className="block text-xs font-bold text-slate-700 mb-1">Photo Title *</label>
                    <input
                      type="text"
                      value={galleryTitle}
                      onChange={(e) => setGalleryTitle(e.target.value)}
                      placeholder="e.g. Science Fair Showcase"
                      className="w-full px-3 py-2 rounded-xl border border-slate-300 text-xs text-slate-800 focus:outline-none focus:border-[#0B1A30]"
                      required
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-slate-700 mb-1">Select Photo from Device Storage *</label>
                    <div className="flex flex-col sm:flex-row items-center gap-4 p-3 bg-white border border-slate-300 rounded-xl">
                      <input
                        type="file"
                        accept="image/*"
                        onChange={handleGalleryImageSelect}
                        className="text-xs text-slate-600 file:mr-3 file:py-1.5 file:px-3 file:rounded-lg file:border-0 file:text-xs file:font-bold file:bg-[#0B1A30] file:text-white hover:file:bg-slate-800 cursor-pointer"
                      />

                      {galleryImageBase64 && (
                        <div className="flex items-center gap-3 border-l border-slate-200 pl-4">
                          <img src={galleryImageBase64} alt="Preview" className="w-12 h-12 rounded-lg object-cover border border-slate-300" />
                          <button
                            type="button"
                            onClick={() => setGalleryImageBase64('')}
                            className="text-[11px] font-bold text-red-600 hover:underline"
                          >
                            Remove Photo
                          </button>
                        </div>
                      )}
                    </div>
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-slate-700 mb-1">Caption / Description</label>
                    <textarea
                      rows={2}
                      value={galleryDescription}
                      onChange={(e) => setGalleryDescription(e.target.value)}
                      placeholder="Brief details about this campus photo..."
                      className="w-full p-2.5 rounded-xl border border-slate-300 text-xs text-slate-800 focus:outline-none focus:border-[#0B1A30]"
                    />
                  </div>

                  <button
                    type="submit"
                    className="px-5 py-2.5 rounded-xl bg-[#0B1A30] text-white font-bold text-xs hover:bg-slate-800 transition-colors flex items-center gap-2 shadow"
                  >
                    <Upload className="w-4 h-4 text-amber-400" /> Add to Campus Gallery
                  </button>
                </form>

                {/* Current Gallery Grid */}
                <div className="space-y-3">
                  <h4 className="text-xs font-bold text-slate-700 uppercase">Current Campus Gallery ({galleryItems.length})</h4>
                  <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 max-h-72 overflow-y-auto">
                    {galleryItems.map((g) => (
                      <div key={g.id} className="relative rounded-xl border border-slate-200 overflow-hidden bg-slate-50 p-2 space-y-2 group">
                        {g.image ? (
                          <img src={g.image} alt={g.title} className="w-full h-24 object-cover rounded-lg" />
                        ) : (
                          <div className="w-full h-24 bg-[#0B1A30] text-white font-bold text-xs flex items-center justify-center rounded-lg">
                            Campus Photo
                          </div>
                        )}
                        <p className="text-[11px] font-bold text-[#0B1A30] truncate">{g.title}</p>
                        {deletingGalleryId === g.id ? (
                          <div className="flex items-center gap-1 pt-1">
                            <button
                              type="button"
                              onClick={() => handleDeleteGallery(g.id)}
                              className="flex-1 py-1 rounded bg-red-600 text-white text-[10px] font-extrabold hover:bg-red-700 transition-colors"
                            >
                              Confirm
                            </button>
                            <button
                              type="button"
                              onClick={() => setDeletingGalleryId(null)}
                              className="flex-1 py-1 rounded bg-slate-200 text-slate-700 text-[10px] font-bold hover:bg-slate-300 transition-colors"
                            >
                              Cancel
                            </button>
                          </div>
                        ) : (
                          <button
                            type="button"
                            onClick={() => setDeletingGalleryId(g.id)}
                            className="w-full py-1 rounded bg-red-50 text-red-600 text-[10px] font-bold hover:bg-red-100 transition-colors"
                          >
                            Delete Photo
                          </button>
                        )}
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            )}

            {/* TAB 4: NEWS & UPDATES MANAGEMENT */}
            {activeTab === 'news' && (
              <div className="space-y-6">
                <form onSubmit={handleAddNews} className="p-5 rounded-2xl border border-slate-300 bg-slate-50 space-y-4">
                  <h3 className="text-xs font-bold text-[#0B1A30] uppercase tracking-wider flex items-center gap-1.5 border-b border-slate-200 pb-2">
                    <Newspaper className="w-4 h-4 text-amber-600" /> Publish School News & Announcement
                  </h3>

                  <div>
                    <label className="block text-xs font-bold text-slate-700 mb-1">News Title *</label>
                    <input
                      type="text"
                      value={newsTitle}
                      onChange={(e) => setNewsTitle(e.target.value)}
                      placeholder="e.g. End of Term Circular & Resumption Date Notice"
                      className="w-full px-3 py-2 rounded-xl border border-slate-300 text-xs text-slate-800 focus:outline-none focus:border-[#0B1A30]"
                      required
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-slate-700 mb-1">News Description / Notice Content *</label>
                    <textarea
                      rows={4}
                      value={newsDescription}
                      onChange={(e) => setNewsDescription(e.target.value)}
                      placeholder="Enter the full news update or announcement details here..."
                      className="w-full p-3 rounded-xl border border-slate-300 text-xs text-slate-800 focus:outline-none focus:border-[#0B1A30]"
                      required
                    />
                  </div>

                  <button
                    type="submit"
                    className="px-5 py-2.5 rounded-xl bg-[#0B1A30] text-white font-bold text-xs hover:bg-slate-800 transition-colors flex items-center gap-2 shadow"
                  >
                    <Plus className="w-4 h-4 text-amber-400" /> Publish News Update
                  </button>
                </form>

                {/* Published News List */}
                <div className="space-y-3">
                  <h4 className="text-xs font-bold text-slate-700 uppercase">Published News Updates ({newsItems.length})</h4>
                  {newsItems.length === 0 ? (
                    <div className="p-6 text-center border border-dashed border-slate-300 rounded-xl bg-slate-50 text-xs text-slate-500">
                      No news updates published yet. Fill the form above to add an announcement.
                    </div>
                  ) : (
                    <div className="space-y-3 max-h-72 overflow-y-auto">
                      {newsItems.map((article) => (
                        <div key={article.id} className="p-4 rounded-xl border border-slate-200 bg-white flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 shadow-sm">
                          <div className="space-y-1 max-w-xl">
                            <div className="flex items-center gap-2 text-[10px] font-bold text-amber-700">
                              <Calendar className="w-3 h-3 text-amber-600" />
                              <span>{article.date || 'Published Notice'}</span>
                            </div>
                            <h5 className="text-xs font-bold text-[#0B1A30]">{article.title}</h5>
                            <p className="text-[11px] text-slate-600 line-clamp-2">{article.description}</p>
                          </div>

                          <div className="shrink-0">
                            {deletingNewsId === article.id ? (
                              <div className="flex items-center gap-1.5 bg-red-50 p-1.5 rounded-xl border border-red-200">
                                <button
                                  type="button"
                                  onClick={() => handleDeleteNews(article.id)}
                                  className="px-2.5 py-1 rounded-lg bg-red-600 text-white text-[10px] font-extrabold hover:bg-red-700 transition-colors"
                                >
                                  Confirm
                                </button>
                                <button
                                  type="button"
                                  onClick={() => setDeletingNewsId(null)}
                                  className="px-2 py-1 rounded-lg bg-slate-200 text-slate-700 text-[10px] font-bold hover:bg-slate-300 transition-colors"
                                >
                                  Cancel
                                </button>
                              </div>
                            ) : (
                              <button
                                type="button"
                                onClick={() => setDeletingNewsId(article.id)}
                                className="px-3 py-1.5 rounded-xl bg-red-50 text-red-600 border border-red-200 text-xs font-bold hover:bg-red-100 transition-colors flex items-center gap-1"
                              >
                                <Trash2 className="w-3.5 h-3.5" />
                                <span>Delete Update</span>
                              </button>
                            )}
                          </div>
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              </div>
            )}

            {/* TAB 5: STUDENT RECORDS MANAGEMENT */}
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
                      className="w-full pl-8 pr-3 py-1.5 rounded-xl border border-slate-300 text-xs text-slate-800 focus:outline-none focus:border-[#0B1A30]"
                    />
                  </div>

                  {/* Level & Exam Type Filters */}
                  <div className="flex flex-wrap items-center gap-1.5 text-xs">
                    <div className="inline-flex rounded-lg border border-slate-200 bg-slate-100 p-0.5">
                      <button
                        type="button"
                        onClick={() => setStudentExamFilter('all')}
                        className={`px-2 py-1 rounded text-[11px] font-bold ${studentExamFilter === 'all' ? 'bg-[#0B1A30] text-white shadow-xs' : 'text-slate-600 hover:text-slate-900'}`}
                      >
                        All Exams
                      </button>
                      <button
                        type="button"
                        onClick={() => setStudentExamFilter('uneb')}
                        className={`px-2 py-1 rounded text-[11px] font-bold ${studentExamFilter === 'uneb' ? 'bg-[#0B1A30] text-white shadow-xs' : 'text-slate-600 hover:text-slate-900'}`}
                      >
                        UNEB
                      </button>
                      <button
                        type="button"
                        onClick={() => setStudentExamFilter('mock')}
                        className={`px-2 py-1 rounded text-[11px] font-bold ${studentExamFilter === 'mock' ? 'bg-[#0B1A30] text-white shadow-xs' : 'text-slate-600 hover:text-slate-900'}`}
                      >
                        Mocks
                      </button>
                    </div>

                    <div className="inline-flex rounded-lg border border-slate-200 bg-slate-100 p-0.5">
                      <button
                        type="button"
                        onClick={() => setStudentLevelFilter('all')}
                        className={`px-2 py-1 rounded text-[11px] font-bold ${studentLevelFilter === 'all' ? 'bg-sky-700 text-white shadow-xs' : 'text-slate-600 hover:text-slate-900'}`}
                      >
                        All Levels
                      </button>
                      <button
                        type="button"
                        onClick={() => setStudentLevelFilter('o-level')}
                        className={`px-2 py-1 rounded text-[11px] font-bold ${studentLevelFilter === 'o-level' ? 'bg-sky-700 text-white shadow-xs' : 'text-slate-600 hover:text-slate-900'}`}
                      >
                        O-Level (UCE)
                      </button>
                      <button
                        type="button"
                        onClick={() => setStudentLevelFilter('a-level')}
                        className={`px-2 py-1 rounded text-[11px] font-bold ${studentLevelFilter === 'a-level' ? 'bg-sky-700 text-white shadow-xs' : 'text-slate-600 hover:text-slate-900'}`}
                      >
                        A-Level (UACE)
                      </button>
                    </div>
                  </div>

                  {isConfirmingClearAll ? (
                    <div className="flex items-center gap-1.5 bg-red-100 border border-red-300 p-1 rounded-xl">
                      <span className="text-[11px] font-bold text-red-900 px-1">Clear ALL student records?</span>
                      <button
                        type="button"
                        onClick={handleClearAllStudents}
                        className="px-2.5 py-1 rounded-lg bg-red-600 text-white text-xs font-black hover:bg-red-700 transition-colors"
                      >
                        Yes, Clear All
                      </button>
                      <button
                        type="button"
                        onClick={() => setIsConfirmingClearAll(false)}
                        className="px-2 py-1 rounded-lg bg-slate-200 text-slate-700 text-xs font-bold hover:bg-slate-300 transition-colors"
                      >
                        Cancel
                      </button>
                    </div>
                  ) : (
                    <button
                      type="button"
                      onClick={() => setIsConfirmingClearAll(true)}
                      className="px-3.5 py-2 rounded-xl bg-red-50 text-red-700 border border-red-200 text-xs font-bold hover:bg-red-100 transition-colors flex items-center gap-1.5"
                    >
                      <Trash2 className="w-3.5 h-3.5" />
                      <span>Clear All Records</span>
                    </button>
                  )}
                </div>

                <div className="overflow-x-auto border border-slate-200 rounded-xl max-h-72">
                  <table className="w-full text-left text-xs">
                    <thead className="bg-slate-100 text-slate-700 font-bold border-b border-slate-200 sticky top-0 z-10">
                      <tr>
                        {dynamicHeaders.map((headerKey) => (
                          <th key={headerKey} className="p-2.5 whitespace-nowrap">
                            {formatHeaderTitle(headerKey)}
                          </th>
                        ))}
                        <th className="p-2.5 text-right whitespace-nowrap">Action</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-200">
                      {filteredStudents.length === 0 ? (
                        <tr>
                          <td colSpan={dynamicHeaders.length + 1} className="p-6 text-center text-slate-500 italic">
                            No records found.
                          </td>
                        </tr>
                      ) : (
                        filteredStudents.map((s, sIdx) => {
                          const studentId = getStudentId(s);
                          const rowKey = studentId || `student-${sIdx}`;
                          return (
                            <tr key={rowKey} className="hover:bg-slate-50">
                              {dynamicHeaders.map((headerKey) => {
                                const cellVal = (s as any)[headerKey];
                                const lk = headerKey.toLowerCase();
                                const isAnchor = lk.includes('index') || lk.includes('id') || lk.includes('number');
                                return (
                                  <td
                                    key={headerKey}
                                    className={`p-2.5 ${
                                      isAnchor
                                        ? 'font-mono font-bold text-[#0B1A30] whitespace-nowrap'
                                        : 'text-slate-800'
                                    }`}
                                  >
                                    {formatCellValue(cellVal)}
                                  </td>
                                );
                              })}
                              <td className="p-2.5 text-right whitespace-nowrap">
                                {deletingStudentId === studentId ? (
                                  <div className="inline-flex items-center gap-1 bg-red-100 p-1 rounded-lg border border-red-300">
                                    <button
                                      type="button"
                                      onClick={() => handleDeleteStudent(studentId)}
                                      className="px-2 py-0.5 rounded bg-red-600 text-white text-[10px] font-extrabold hover:bg-red-700 transition-colors"
                                    >
                                      Confirm
                                    </button>
                                    <button
                                      type="button"
                                      onClick={() => setDeletingStudentId(null)}
                                      className="px-2 py-0.5 rounded bg-slate-200 text-slate-700 text-[10px] font-bold hover:bg-slate-300 transition-colors"
                                    >
                                      Cancel
                                    </button>
                                  </div>
                                ) : (
                                  <button
                                    type="button"
                                    onClick={() => setDeletingStudentId(studentId)}
                                    className="p-1 rounded bg-red-50 text-red-600 hover:bg-red-100 transition-colors"
                                    title="Delete student record"
                                  >
                                    <Trash2 className="w-3.5 h-3.5" />
                                  </button>
                                )}
                              </td>
                            </tr>
                          );
                        })
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
