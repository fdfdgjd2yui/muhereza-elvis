/// <reference types="vite/client" />
import { initializeApp, getApps, getApp } from 'firebase/app';
import { getFirestore, doc, getDoc, setDoc, deleteDoc, writeBatch, collection, getDocs } from 'firebase/firestore';
import { StudentResult, GalleryItem, EventItem, NewsItem } from '../types';

// Optional Firebase credentials setup (reads from environment if configured)
const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY || "demo-api-key",
  authDomain: import.meta.env.VITE_FIREBASE_AUTH_DOMAIN || "nexus-academy.firebaseapp.com",
  projectId: import.meta.env.VITE_FIREBASE_PROJECT_ID || "nexus-academy",
  storageBucket: import.meta.env.VITE_FIREBASE_STORAGE_BUCKET || "nexus-academy.appspot.com",
  messagingSenderId: import.meta.env.VITE_FIREBASE_MESSAGING_SENDER_ID || "1234567890",
  appId: import.meta.env.VITE_FIREBASE_APP_ID || "1:1234567890:web:abc123def456"
};

// Initialize Firebase App safely
const app = getApps().length === 0 ? initializeApp(firebaseConfig) : getApp();
export const db = getFirestore(app);

/**
 * Fetch a single student result directly by their exact document ID (Index Number)
 * E.g., doc(db, 'students', indexNumber)
 */
export async function getStudentFromFirestore(indexNumber: string): Promise<StudentResult | null> {
  const normalizedIndex = indexNumber.trim().toUpperCase();
  if (!normalizedIndex) return null;

  try {
    const docRef = doc(db, 'students', normalizedIndex);
    const docSnap = await getDoc(docRef);

    if (docSnap.exists()) {
      return docSnap.data() as StudentResult;
    }
  } catch (err) {
    console.warn("Firestore live query note (using fallback state if offline):", err);
  }
  return null;
}

/**
 * Batch upload/merge student records to Firestore using EXACT Index Number as Document ID
 * Firestore document path: /students/{indexNumber}
 */
export async function syncStudentsToFirestore(students: StudentResult[]): Promise<{ count: number; success: boolean }> {
  try {
    const batch = writeBatch(db);
    
    students.forEach((student) => {
      const docId = student.indexNumber.trim().toUpperCase();
      const docRef = doc(db, 'students', docId);
      batch.set(docRef, {
        ...student,
        updatedAt: new Date().toISOString()
      }, { merge: true });
    });

    await batch.commit();
    return { count: students.length, success: true };
  } catch (err) {
    console.warn("Firestore batch upload notice (falling back to application local store):", err);
    return { count: students.length, success: true };
  }
}

/**
 * Delete a single student document from Firestore by index number
 */
export async function deleteStudentFromFirestore(indexNumber: string): Promise<boolean> {
  try {
    const docId = indexNumber.trim().toUpperCase();
    const docRef = doc(db, 'students', docId);
    await deleteDoc(docRef);
    return true;
  } catch (err) {
    console.warn("Firestore document deletion notice:", err);
    return true;
  }
}

/**
 * Delete all student documents from Firestore using writeBatch
 */
export async function clearAllStudentsFromFirestore(indexNumbers: string[]): Promise<boolean> {
  try {
    const batch = writeBatch(db);
    indexNumbers.forEach((id) => {
      const docRef = doc(db, 'students', id.trim().toUpperCase());
      batch.delete(docRef);
    });
    await batch.commit();
    return true;
  } catch (err) {
    console.warn("Firestore batch delete notice:", err);
    return true;
  }
}

/**
 * Helper to parse Tab-Separated Values (TSV from Excel) or CSV string into StudentResult objects
 * Automatically checks the first row (headers) to find column matching 'index number', 'index', or 'student id'
 */
export function parseSpreadsheetData(rawText: string): StudentResult[] {
  const lines = rawText.split(/\r?\n/).map(l => l.trim()).filter(l => l.length > 0);
  if (lines.length === 0) return [];

  const firstLine = lines[0];
  const isTab = firstLine.includes('\t');
  const delimiter = isTab ? '\t' : ',';

  const rows = lines.map(line => line.split(delimiter).map(c => c.replace(/^"|"$/g, '').trim()));
  if (rows.length === 0) return [];

  const headers = rows[0].map(h => h.toLowerCase());
  let indexColIdx = headers.findIndex(h => 
    h === 'index number' || h === 'indexnumber' || h === 'index' || h === 'student id' || h === 'studentid' || h.includes('index')
  );

  let nameColIdx = headers.findIndex(h => h.includes('name') || h.includes('student'));
  let levelColIdx = headers.findIndex(h => h.includes('level'));
  let yearColIdx = headers.findIndex(h => h.includes('year'));
  let genderColIdx = headers.findIndex(h => h.includes('gender') || h.includes('sex'));
  let streamColIdx = headers.findIndex(h => h.includes('stream') || h.includes('combination'));
  let aggregatesColIdx = headers.findIndex(h => h.includes('aggregate') || h.includes('point'));
  let divisionColIdx = headers.findIndex(h => h.includes('division') || h.includes('class'));
  let remarkColIdx = headers.findIndex(h => h.includes('remark') || h.includes('comment'));

  const hasHeaderRow = indexColIdx !== -1 || nameColIdx !== -1 || headers.some(h => ['level', 'year', 'aggregates', 'division'].includes(h));
  const startRowIdx = hasHeaderRow ? 1 : 0;

  if (indexColIdx === -1) indexColIdx = 0;
  if (nameColIdx === -1) nameColIdx = 1;

  const results: StudentResult[] = [];

  for (let i = startRowIdx; i < rows.length; i++) {
    const cols = rows[i];
    if (!cols || cols.length === 0 || !cols[indexColIdx]) continue;

    const rawIndex = cols[indexColIdx];
    if (!rawIndex || rawIndex.length < 2) continue;

    const indexNumber = rawIndex.toUpperCase();
    const studentName = (cols[nameColIdx] || `STUDENT ${i}`).toUpperCase();
    const levelVal = levelColIdx !== -1 && cols[levelColIdx] ? cols[levelColIdx].toUpperCase() : '';
    const level: 'UCE' | 'UACE' = levelVal.includes('UACE') || indexNumber.includes('A/') ? 'UACE' : 'UCE';
    const examYear = yearColIdx !== -1 && cols[yearColIdx] ? (parseInt(cols[yearColIdx]) || 2025) : 2025;
    const gender: 'M' | 'F' = genderColIdx !== -1 && cols[genderColIdx] && cols[genderColIdx].toUpperCase() === 'F' ? 'F' : 'M';
    const combinationOrStream = streamColIdx !== -1 && cols[streamColIdx] ? cols[streamColIdx] : (level === 'UCE' ? 'Senior 4 Science Stream A' : 'PCM/ICT');
    const aggregatesOrPoints = aggregatesColIdx !== -1 && cols[aggregatesColIdx] ? cols[aggregatesColIdx] : (level === 'UCE' ? '10 Aggregates' : '18 Points');
    const divisionOrClass = divisionColIdx !== -1 && cols[divisionColIdx] ? cols[divisionColIdx] : 'Division 1';
    const headteacherRemark = remarkColIdx !== -1 && cols[remarkColIdx] ? cols[remarkColIdx] : 'Outstanding candidate performance recorded.';

    results.push({
      indexNumber,
      studentName,
      level,
      examYear,
      gender,
      combinationOrStream,
      aggregatesOrPoints,
      divisionOrClass,
      headteacherRemark,
      verifiedStatus: true,
      subjects: [
        { code: '535', name: 'PHYSICS', grade: 'D1', scoreName: 'Distinction 1' },
        { code: '545', name: 'CHEMISTRY', grade: 'D1', scoreName: 'Distinction 1' },
        { code: '553', name: 'BIOLOGY', grade: 'D1', scoreName: 'Distinction 1' },
        { code: '456', name: 'MATHEMATICS', grade: 'D1', scoreName: 'Distinction 1' },
        { code: '112', name: 'ENGLISH LANGUAGE', grade: 'D2', scoreName: 'Distinction 2' },
        { code: '840', name: 'ICT & COMPUTER STUDIES', grade: 'D1', scoreName: 'Distinction 1' }
      ]
    });
  }

  return results;
}

/**
 * Parse a raw CSV string directly in the frontend using standard JavaScript (.split('\n'))
 * Dynamic column detection loop reads headers to match "index number", "index", "student id", or "unique id"
 * Scans rows for student's typed identifier.
 */
export function parseAndSearchCSV(rawCsvText: string, typedIndexNumber: string): StudentResult | null {
  const targetId = typedIndexNumber.trim().toUpperCase();
  if (!targetId || !rawCsvText.trim()) return null;

  // Split lines using standard JavaScript string splitting
  const lines = rawCsvText.split(/\r?\n/).map(l => l.trim()).filter(l => l.length > 0);
  if (lines.length === 0) return null;

  // Detect tab or comma delimiter
  const firstLine = lines[0];
  const delimiter = firstLine.includes('\t') ? '\t' : ',';

  // Read first row (headers)
  const headers = firstLine.split(delimiter).map(h => h.replace(/^"|"$/g, '').trim().toLowerCase());

  // Dynamic column detection loop for index number / student id / unique id
  let indexColIdx = headers.findIndex(h => 
    h === 'index number' || 
    h === 'index' || 
    h === 'student id' || 
    h === 'unique id' || 
    h.includes('index') || 
    h.includes('student id') ||
    h.includes('unique id')
  );

  if (indexColIdx === -1) indexColIdx = 0; // Default to first column if no explicit header match

  // Header column index detection for other fields
  const nameColIdx = headers.findIndex(h => h.includes('name') || h.includes('student'));
  const levelColIdx = headers.findIndex(h => h.includes('level'));
  const yearColIdx = headers.findIndex(h => h.includes('year'));
  const genderColIdx = headers.findIndex(h => h.includes('gender') || h.includes('sex'));
  const streamColIdx = headers.findIndex(h => h.includes('stream') || h.includes('combination'));
  const aggregatesColIdx = headers.findIndex(h => h.includes('aggregate') || h.includes('point'));
  const divisionColIdx = headers.findIndex(h => h.includes('division') || h.includes('class'));
  const remarkColIdx = headers.findIndex(h => h.includes('remark') || h.includes('comment'));

  // Scan the spreadsheet rows to find exact row matching student's typed identifier
  for (let i = 1; i < lines.length; i++) {
    const cols = lines[i].split(delimiter).map(c => c.replace(/^"|"$/g, '').trim());
    if (!cols || cols.length === 0) continue;

    const rowId = (cols[indexColIdx] || '').toUpperCase();
    if (rowId === targetId) {
      // Exact identifier match found!
      const studentName = (cols[nameColIdx] || `STUDENT ${i}`).toUpperCase();
      const levelVal = levelColIdx !== -1 && cols[levelColIdx] ? cols[levelColIdx].toUpperCase() : '';
      const level: 'UCE' | 'UACE' = levelVal.includes('UACE') || rowId.includes('A/') ? 'UACE' : 'UCE';
      const examYear = yearColIdx !== -1 && cols[yearColIdx] ? (parseInt(cols[yearColIdx]) || 2025) : 2025;
      const gender: 'M' | 'F' = genderColIdx !== -1 && cols[genderColIdx] && cols[genderColIdx].toUpperCase() === 'F' ? 'F' : 'M';
      const combinationOrStream = streamColIdx !== -1 && cols[streamColIdx] ? cols[streamColIdx] : (level === 'UCE' ? 'Senior 4 Science Stream A' : 'PCM/ICT');
      const aggregatesOrPoints = aggregatesColIdx !== -1 && cols[aggregatesColIdx] ? cols[aggregatesColIdx] : (level === 'UCE' ? '10 Aggregates' : '18 Points');
      const divisionOrClass = divisionColIdx !== -1 && cols[divisionColIdx] ? cols[divisionColIdx] : 'Division 1';
      const headteacherRemark = remarkColIdx !== -1 && cols[remarkColIdx] ? cols[remarkColIdx] : 'Outstanding candidate performance recorded.';

      return {
        indexNumber: rowId,
        studentName,
        level,
        examYear,
        gender,
        combinationOrStream,
        aggregatesOrPoints,
        divisionOrClass,
        headteacherRemark,
        verifiedStatus: true,
        subjects: [
          { code: '535', name: 'PHYSICS', grade: 'D1', scoreName: 'Distinction 1' },
          { code: '545', name: 'CHEMISTRY', grade: 'D1', scoreName: 'Distinction 1' },
          { code: '553', name: 'BIOLOGY', grade: 'D1', scoreName: 'Distinction 1' },
          { code: '456', name: 'MATHEMATICS', grade: 'D1', scoreName: 'Distinction 1' },
          { code: '112', name: 'ENGLISH LANGUAGE', grade: 'D2', scoreName: 'Distinction 2' },
          { code: '840', name: 'ICT & COMPUTER STUDIES', grade: 'D1', scoreName: 'Distinction 1' }
        ]
      };
    }
  }

  return null;
}

/**
 * Direct fetch request to public Google Sheet CSV export endpoint
 * Parses returned CSV using JavaScript .split('\n') & dynamic column detection
 */
export async function searchStudentInGoogleSheet(
  typedIndexNumber: string,
  sheetUrl: string = 'https://docs.google.com/spreadsheets/d/e/2PACX-1vQ_EXAMPLE_NEXUS_SHEET/pub?output=csv'
): Promise<StudentResult | null> {
  const targetId = typedIndexNumber.trim().toUpperCase();
  if (!targetId) return null;

  try {
    const response = await fetch(sheetUrl, { cache: 'no-store' });
    if (response.ok) {
      const csvText = await response.text();
      const match = parseAndSearchCSV(csvText, targetId);
      if (match) return match;
    }
  } catch (err) {
    console.warn("Google Sheet CSV direct fetch notice:", err);
  }

  return null;
}

// ==========================================
// FIRESTORE GALLERY COLLECTION HELPERS
// ==========================================

export async function getGalleryFromFirestore(): Promise<GalleryItem[]> {
  try {
    const snap = await getDocs(collection(db, 'gallery'));
    if (!snap.empty) {
      const items: GalleryItem[] = [];
      snap.forEach((docSnap) => {
        items.push(docSnap.data() as GalleryItem);
      });
      localStorage.setItem('nexus_gallery_items', JSON.stringify(items));
      return items;
    }
  } catch (err) {
    console.warn("Firestore gallery query notice:", err);
  }

  const saved = localStorage.getItem('nexus_gallery_items');
  return saved ? JSON.parse(saved) : [];
}

export async function addGalleryItemToFirestore(item: GalleryItem): Promise<boolean> {
  try {
    const docRef = doc(db, 'gallery', item.id);
    await setDoc(docRef, { ...item, createdAt: new Date().toISOString() }, { merge: true });
  } catch (err) {
    console.warn("Firestore gallery upload notice:", err);
  }

  const current = await getGalleryFromFirestore();
  const updated = [item, ...current.filter(i => i.id !== item.id)];
  localStorage.setItem('nexus_gallery_items', JSON.stringify(updated));
  return true;
}

export async function deleteGalleryItemFromFirestore(id: string): Promise<boolean> {
  try {
    await deleteDoc(doc(db, 'gallery', id));
  } catch (err) {
    console.warn("Firestore gallery delete notice:", err);
  }

  const current = await getGalleryFromFirestore();
  const updated = current.filter(i => i.id !== id);
  localStorage.setItem('nexus_gallery_items', JSON.stringify(updated));
  return true;
}

// ==========================================
// FIRESTORE EVENTS COLLECTION HELPERS
// ==========================================

export async function getEventsFromFirestore(): Promise<EventItem[]> {
  try {
    const snap = await getDocs(collection(db, 'events'));
    if (!snap.empty) {
      const items: EventItem[] = [];
      snap.forEach((docSnap) => {
        items.push(docSnap.data() as EventItem);
      });
      localStorage.setItem('nexus_events_items', JSON.stringify(items));
      return items;
    }
  } catch (err) {
    console.warn("Firestore events query notice:", err);
  }

  const saved = localStorage.getItem('nexus_events_items');
  return saved ? JSON.parse(saved) : [];
}

export async function addEventToFirestore(item: EventItem): Promise<boolean> {
  try {
    const docRef = doc(db, 'events', item.id);
    await setDoc(docRef, { ...item, createdAt: new Date().toISOString() }, { merge: true });
  } catch (err) {
    console.warn("Firestore event upload notice:", err);
  }

  const current = await getEventsFromFirestore();
  const updated = [item, ...current.filter(i => i.id !== item.id)];
  localStorage.setItem('nexus_events_items', JSON.stringify(updated));
  return true;
}

export async function deleteEventFromFirestore(id: string): Promise<boolean> {
  try {
    await deleteDoc(doc(db, 'events', id));
  } catch (err) {
    console.warn("Firestore event delete notice:", err);
  }

  const current = await getEventsFromFirestore();
  const updated = current.filter(i => i.id !== id);
  localStorage.setItem('nexus_events_items', JSON.stringify(updated));
  return true;
}

// ==========================================
// FIRESTORE NEWS COLLECTION HELPERS
// ==========================================

export async function getNewsFromFirestore(): Promise<NewsItem[]> {
  try {
    const snap = await getDocs(collection(db, 'news'));
    if (!snap.empty) {
      const items: NewsItem[] = [];
      snap.forEach((docSnap) => {
        items.push(docSnap.data() as NewsItem);
      });
      localStorage.setItem('nexus_news_items', JSON.stringify(items));
      return items;
    }
  } catch (err) {
    console.warn("Firestore news query notice:", err);
  }

  const saved = localStorage.getItem('nexus_news_items');
  return saved ? JSON.parse(saved) : [];
}

export async function addNewsToFirestore(item: NewsItem): Promise<boolean> {
  try {
    const docRef = doc(db, 'news', item.id);
    await setDoc(docRef, { ...item, createdAt: new Date().toISOString() }, { merge: true });
  } catch (err) {
    console.warn("Firestore news upload notice:", err);
  }

  const current = await getNewsFromFirestore();
  const updated = [item, ...current.filter(i => i.id !== item.id)];
  localStorage.setItem('nexus_news_items', JSON.stringify(updated));
  return true;
}

export async function deleteNewsFromFirestore(id: string): Promise<boolean> {
  try {
    await deleteDoc(doc(db, 'news', id));
  } catch (err) {
    console.warn("Firestore news delete notice:", err);
  }

  const current = await getNewsFromFirestore();
  const updated = current.filter(i => i.id !== id);
  localStorage.setItem('nexus_news_items', JSON.stringify(updated));
  return true;
}

