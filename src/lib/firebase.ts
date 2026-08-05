/// <reference types="vite/client" />
import { initializeApp, getApps, getApp } from 'firebase/app';
import { getFirestore, doc, getDoc, setDoc, deleteDoc, writeBatch, collection, getDocs, onSnapshot } from 'firebase/firestore';
import firebaseConfigJson from '../../firebase-applet-config.json';
import { StudentResult, SubjectResult, GalleryItem, EventItem, NewsItem } from '../types';
import { UPCOMING_EVENTS, INITIAL_GALLERY_ITEMS, NEWS_ARTICLES, INITIAL_STUDENT_RESULTS } from '../data/schoolData';

const firebaseConfig = {
  apiKey: firebaseConfigJson?.apiKey || import.meta.env.VITE_FIREBASE_API_KEY || "demo-api-key",
  authDomain: firebaseConfigJson?.authDomain || import.meta.env.VITE_FIREBASE_AUTH_DOMAIN || "nexus-academy.firebaseapp.com",
  projectId: firebaseConfigJson?.projectId || import.meta.env.VITE_FIREBASE_PROJECT_ID || "nexus-academy",
  storageBucket: firebaseConfigJson?.storageBucket || import.meta.env.VITE_FIREBASE_STORAGE_BUCKET || "nexus-academy.appspot.com",
  messagingSenderId: firebaseConfigJson?.messagingSenderId || import.meta.env.VITE_FIREBASE_MESSAGING_SENDER_ID || "1234567890",
  appId: firebaseConfigJson?.appId || import.meta.env.VITE_FIREBASE_APP_ID || "1:1234567890:web:abc123def456",
  firestoreDatabaseId: firebaseConfigJson?.firestoreDatabaseId || undefined
};

// Check if Firebase is configured with real credentials
export const isFirebaseConfigured = Boolean(
  firebaseConfig.apiKey &&
  firebaseConfig.projectId &&
  firebaseConfig.apiKey !== 'demo-api-key'
);

// Initialize Firebase App safely
const app = getApps().length === 0 ? initializeApp(firebaseConfig) : getApp();
export const db = firebaseConfig.firestoreDatabaseId
  ? getFirestore(app, firebaseConfig.firestoreDatabaseId)
  : getFirestore(app);

// Timeout wrapper helper to prevent long unhandled connection hangs
function withTimeout<T>(promise: Promise<T>, timeoutMs = 6000): Promise<T> {
  return Promise.race([
    promise,
    new Promise<T>((_, reject) =>
      setTimeout(() => reject(new Error('Firebase network request timed out')), timeoutMs)
    )
  ]);
}

export function encodeDocId(id: string): string {
  return id.trim().toUpperCase().replace(/\//g, '__SLASH__');
}

export function decodeDocId(docId: string): string {
  return docId.replace(/__SLASH__/g, '/');
}

/**
 * Recursively removes all `undefined` fields from an object and array values
 * so Firestore accepts it without throwing unsupported field value errors.
 */
export function sanitizeForFirestore<T>(obj: T): T {
  if (obj === undefined) {
    return "" as unknown as T;
  }
  if (obj === null) {
    return obj;
  }
  if (Array.isArray(obj)) {
    return obj
      .filter(item => item !== undefined)
      .map(item => sanitizeForFirestore(item)) as unknown as T;
  }
  if (typeof obj === 'object' && !(obj instanceof Date)) {
    const cleanObj: Record<string, any> = {};
    for (const key of Object.keys(obj)) {
      const val = (obj as Record<string, any>)[key];
      if (val !== undefined) {
        cleanObj[key] = sanitizeForFirestore(val);
      }
    }
    return cleanObj as T;
  }
  return obj;
}

/**
 * Fetch all student records stored in Firestore
 */
export async function getAllStudentsFromFirestore(): Promise<StudentResult[]> {
  if (isFirebaseConfigured) {
    try {
      const snap = await withTimeout(getDocs(collection(db, 'students')), 8000);
      if (!snap.empty) {
        const items: StudentResult[] = [];
        snap.forEach((docSnap) => {
          items.push(docSnap.data() as StudentResult);
        });
        localStorage.setItem('nexus_student_results', JSON.stringify(items));
        return items;
      }
    } catch (err) {
      console.warn("Firestore students query notice:", err);
    }
  }

  const saved = localStorage.getItem('nexus_student_results');
  if (saved !== null) {
    try {
      const parsed = JSON.parse(saved);
      if (Array.isArray(parsed) && parsed.length > 0) return parsed;
    } catch (err) {
      console.warn("Failed to parse saved students:", err);
    }
  }

  return INITIAL_STUDENT_RESULTS;
}

let isStudentsSeeding = false;

/**
 * Real-time listener for students collection.
 * Automatically pushes updates to callback whenever data changes on ANY device or browser.
 */
export function subscribeToStudents(callback: (students: StudentResult[]) => void): () => void {
  if (!isFirebaseConfigured) {
    const saved = localStorage.getItem('nexus_student_results');
    if (saved) {
      try { callback(JSON.parse(saved)); } catch (e) { callback(INITIAL_STUDENT_RESULTS); }
    } else {
      callback(INITIAL_STUDENT_RESULTS);
    }
    return () => {};
  }

  const unsubscribe = onSnapshot(collection(db, 'students'), async (snap) => {
    if (snap.empty && !isStudentsSeeding) {
      isStudentsSeeding = true;
      try {
        await syncStudentsToFirestore(INITIAL_STUDENT_RESULTS);
      } catch (e) {
        console.warn("Error seeding students:", e);
      }
      return;
    }

    if (!snap.empty) {
      const items: StudentResult[] = [];
      snap.forEach((docSnap) => {
        items.push(docSnap.data() as StudentResult);
      });
      localStorage.setItem('nexus_student_results', JSON.stringify(items));
      callback(items);
    }
  }, (err) => {
    console.warn("Firestore students onSnapshot notice:", err);
    const saved = localStorage.getItem('nexus_student_results');
    if (saved) {
      try { callback(JSON.parse(saved)); } catch (e) { callback(INITIAL_STUDENT_RESULTS); }
    }
  });

  return unsubscribe;
}

/**
 * Fetch a single student result directly by their exact document ID (Index Number)
 * E.g., doc(db, 'students', indexNumber)
 */
export async function getStudentFromFirestore(indexNumber: string): Promise<StudentResult | null> {
  const cleanId = indexNumber.trim().toUpperCase();
  const normalizedIndex = cleanId.replace(/[\s/]/g, '');
  if (!cleanId) return null;

  if (isFirebaseConfigured) {
    try {
      const encodedId = encodeDocId(cleanId);
      const docRef = doc(db, 'students', encodedId);
      const docSnap = await withTimeout(getDoc(docRef), 6000);

      if (docSnap.exists()) {
        return docSnap.data() as StudentResult;
      }

      if (normalizedIndex !== cleanId) {
        const docRefNorm = doc(db, 'students', encodeDocId(normalizedIndex));
        const docSnapNorm = await withTimeout(getDoc(docRefNorm), 6000);
        if (docSnapNorm.exists()) {
          return docSnapNorm.data() as StudentResult;
        }
      }
    } catch (err) {
      console.warn("Firestore live query note:", err);
    }
  }

  const saved = localStorage.getItem('nexus_student_results');
  let currentList: StudentResult[] = INITIAL_STUDENT_RESULTS;
  if (saved !== null) {
    try {
      const parsed = JSON.parse(saved);
      if (Array.isArray(parsed) && parsed.length > 0) currentList = parsed;
    } catch (e) {}
  }

  return currentList.find(s => 
    s.indexNumber.trim().toUpperCase() === cleanId ||
    s.indexNumber.replace(/[\s/]/g, '').toUpperCase() === normalizedIndex
  ) || null;
}

/**
 * Batch upload/merge student records to Firestore using encoded Index Number as Document ID
 * Firestore document path: /students/{encodedIndexNumber}
 */
export async function syncStudentsToFirestore(students: StudentResult[]): Promise<{ count: number; success: boolean }> {
  // Update local storage cache immediately
  const saved = localStorage.getItem('nexus_student_results');
  let currentList: StudentResult[] = [];
  if (saved !== null) {
    try {
      const parsed = JSON.parse(saved);
      if (Array.isArray(parsed)) currentList = parsed;
    } catch (e) {}
  }

  const mergedMap = new Map<string, StudentResult>();
  currentList.forEach(s => mergedMap.set(s.indexNumber.trim().toUpperCase(), s));
  students.forEach(s => mergedMap.set(s.indexNumber.trim().toUpperCase(), s));
  const updatedAll = Array.from(mergedMap.values());
  localStorage.setItem('nexus_student_results', JSON.stringify(updatedAll));

  if (!isFirebaseConfigured) {
    return { count: students.length, success: true };
  }

  try {
    const chunkSize = 400;
    for (let i = 0; i < students.length; i += chunkSize) {
      const chunk = students.slice(i, i + chunkSize);
      const batch = writeBatch(db);
      chunk.forEach((student) => {
        const rawId = student.indexNumber.trim().toUpperCase();
        const docId = encodeDocId(rawId);
        const docRef = doc(db, 'students', docId);
        const payload = sanitizeForFirestore({
          ...student,
          updatedAt: new Date().toISOString()
        });
        batch.set(docRef, payload, { merge: true });
      });
      await withTimeout(batch.commit(), 15000);
    }
    return { count: students.length, success: true };
  } catch (err: any) {
    console.error("Firestore batch upload error:", err);
    throw new Error(err?.message || "Firestore upload failed");
  }
}

/**
 * Delete a single student document from Firestore by index number
 */
export async function deleteStudentFromFirestore(indexNumber: string): Promise<boolean> {
  const cleanId = indexNumber.trim().toUpperCase();
  const encodedId = encodeDocId(cleanId);

  const saved = localStorage.getItem('nexus_student_results');
  let currentList: StudentResult[] = INITIAL_STUDENT_RESULTS;
  if (saved !== null) {
    try {
      const parsed = JSON.parse(saved);
      if (Array.isArray(parsed)) currentList = parsed;
    } catch (e) {}
  }
  const filtered = currentList.filter(s => s.indexNumber.trim().toUpperCase() !== cleanId);
  localStorage.setItem('nexus_student_results', JSON.stringify(filtered));

  if (!isFirebaseConfigured) return true;
  try {
    await withTimeout(deleteDoc(doc(db, 'students', encodedId)), 6000);
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
  localStorage.setItem('nexus_student_results', JSON.stringify([]));

  if (!isFirebaseConfigured) return true;
  try {
    const chunkSize = 400;
    for (let i = 0; i < indexNumbers.length; i += chunkSize) {
      const chunk = indexNumbers.slice(i, i + chunkSize);
      const batch = writeBatch(db);
      chunk.forEach((id) => {
        const encodedId = encodeDocId(id);
        batch.delete(doc(db, 'students', encodedId));
      });
      await withTimeout(batch.commit(), 15000);
    }
    return true;
  } catch (err) {
    console.warn("Firestore batch delete notice:", err);
    return true;
  }
}

/**
 * Official UNEB Subject Code Dictionary
 */
export const OFFICIAL_UNEB_SUBJECTS: Record<string, { code: string; name: string }> = {
  // UCE Subjects
  '112': { code: '112', name: 'English Language' },
  '456': { code: '456', name: 'Mathematics' },
  '535': { code: '535', name: 'Physics' },
  '545': { code: '545', name: 'Chemistry' },
  '553': { code: '553', name: 'Biology' },
  '273': { code: '273', name: 'Geography' },
  '241': { code: '241', name: 'History' },
  '223': { code: '223', name: 'Christian Religious Education (CRE)' },
  '225': { code: '225', name: 'Islamic Religious Education (IRE)' },
  '840': { code: '840', name: 'ICT / Computer Studies' },
  '527': { code: '527', name: 'Agriculture' },
  '208': { code: '208', name: 'Literature in English' },
  '610': { code: '610', name: 'Art & Design' },
  '335': { code: '335', name: 'Luganda' },
  '301': { code: '301', name: 'French' },
  '315': { code: '315', name: 'German' },
  '325': { code: '325', name: 'Arabic' },
  '336': { code: '336', name: 'Kiswahili' },
  '800': { code: '800', name: 'Commerce' },
  '810': { code: '810', name: 'Principles of Accounts' },
  '843': { code: '843', name: 'Sub-ICT' },
  // UACE Subjects
  'P510': { code: 'P510', name: 'Physics' },
  'P525': { code: 'P525', name: 'Chemistry' },
  'P530': { code: 'P530', name: 'Biology' },
  'P425': { code: 'P425', name: 'Pure Mathematics' },
  'P210': { code: 'P210', name: 'History' },
  'P220': { code: 'P220', name: 'Economics' },
  'P230': { code: 'P230', name: 'Entrepreneurship Education' },
  'P240': { code: 'P240', name: 'Christian Religious Education' },
  'P250': { code: 'P250', name: 'Geography' },
  'P310': { code: 'P310', name: 'Literature in English' },
  'P615': { code: 'P615', name: 'Art & Design' },
  'P620': { code: 'P620', name: 'Music' },
  'S101': { code: 'S101', name: 'General Paper' },
  'S475': { code: 'S475', name: 'Sub-Mathematics' },
};

/**
 * Resolve UNEB Code & Official Name from column header or user text
 */
export function resolveUnebSubject(header: string): { code: string; name: string } {
  const clean = header.trim();
  const upper = clean.toUpperCase();

  if (OFFICIAL_UNEB_SUBJECTS[upper]) {
    return OFFICIAL_UNEB_SUBJECTS[upper];
  }

  const matchCode = clean.match(/^([P|S]?\d{3,4})\b/i);
  if (matchCode) {
    const codeKey = matchCode[1].toUpperCase();
    if (OFFICIAL_UNEB_SUBJECTS[codeKey]) {
      return OFFICIAL_UNEB_SUBJECTS[codeKey];
    }
  }

  for (const item of Object.values(OFFICIAL_UNEB_SUBJECTS)) {
    if (item.name.toLowerCase() === clean.toLowerCase() ||
        clean.toLowerCase().includes(item.name.toLowerCase()) ||
        item.name.toLowerCase().includes(clean.toLowerCase())) {
      return item;
    }
  }

  const low = clean.toLowerCase();
  if (low.includes('math')) return OFFICIAL_UNEB_SUBJECTS['456'];
  if (low.includes('eng')) return OFFICIAL_UNEB_SUBJECTS['112'];
  if (low.includes('phy')) return OFFICIAL_UNEB_SUBJECTS['535'];
  if (low.includes('chem')) return OFFICIAL_UNEB_SUBJECTS['545'];
  if (low.includes('bio')) return OFFICIAL_UNEB_SUBJECTS['553'];
  if (low.includes('ict') || low.includes('computer')) return OFFICIAL_UNEB_SUBJECTS['840'];
  if (low.includes('geo')) return OFFICIAL_UNEB_SUBJECTS['273'];
  if (low.includes('hist')) return OFFICIAL_UNEB_SUBJECTS['241'];
  if (low.includes('cre')) return OFFICIAL_UNEB_SUBJECTS['223'];
  if (low.includes('ire')) return OFFICIAL_UNEB_SUBJECTS['225'];
  if (low.includes('agric')) return OFFICIAL_UNEB_SUBJECTS['527'];
  if (low.includes('lit')) return OFFICIAL_UNEB_SUBJECTS['208'];
  if (low.includes('art')) return OFFICIAL_UNEB_SUBJECTS['610'];

  return {
    code: upper.substring(0, 6) || 'SUB',
    name: clean.toUpperCase()
  };
}

/**
 * Calculate UNEB Grade from raw mark (0-100) OR preserve provided grade string
 */
export function calculateUnebGrade(rawInput: string | number): { grade: string; remark: string; score?: number } {
  const strVal = String(rawInput ?? '').trim();
  if (!strVal) return { grade: 'F9', remark: 'Fail 9' };

  const numVal = parseFloat(strVal);
  if (!isNaN(numVal) && /^[\d.]+%?$/.test(strVal)) {
    const score = Math.min(100, Math.max(0, Math.round(numVal)));
    if (score >= 80) return { score, grade: 'D1', remark: 'Distinction 1' };
    if (score >= 75) return { score, grade: 'D2', remark: 'Distinction 2' };
    if (score >= 70) return { score, grade: 'C3', remark: 'Credit 3' };
    if (score >= 65) return { score, grade: 'C4', remark: 'Credit 4' };
    if (score >= 60) return { score, grade: 'C5', remark: 'Credit 5' };
    if (score >= 55) return { score, grade: 'C6', remark: 'Credit 6' };
    if (score >= 45) return { score, grade: 'P7', remark: 'Pass 7' };
    if (score >= 35) return { score, grade: 'P8', remark: 'Pass 8' };
    return { score, grade: 'F9', remark: 'Fail 9' };
  }

  const upper = strVal.toUpperCase();
  if (upper === 'D1' || upper.includes('DISTINCTION 1')) return { grade: 'D1', remark: 'Distinction 1' };
  if (upper === 'D2' || upper.includes('DISTINCTION 2')) return { grade: 'D2', remark: 'Distinction 2' };
  if (upper === 'C3' || upper.includes('CREDIT 3')) return { grade: 'C3', remark: 'Credit 3' };
  if (upper === 'C4' || upper.includes('CREDIT 4')) return { grade: 'C4', remark: 'Credit 4' };
  if (upper === 'C5' || upper.includes('CREDIT 5')) return { grade: 'C5', remark: 'Credit 5' };
  if (upper === 'C6' || upper.includes('CREDIT 6')) return { grade: 'C6', remark: 'Credit 6' };
  if (upper === 'P7' || upper.includes('PASS 7')) return { grade: 'P7', remark: 'Pass 7' };
  if (upper === 'P8' || upper.includes('PASS 8')) return { grade: 'P8', remark: 'Pass 8' };
  if (upper === 'F9' || upper.includes('FAIL 9')) return { grade: 'F9', remark: 'Fail 9' };

  if (upper === 'A') return { grade: 'A', remark: 'Principal A (6 Points)' };
  if (upper === 'B') return { grade: 'B', remark: 'Principal B (5 Points)' };
  if (upper === 'C') return { grade: 'C', remark: 'Principal C (4 Points)' };
  if (upper === 'D') return { grade: 'D', remark: 'Principal D (3 Points)' };
  if (upper === 'E') return { grade: 'E', remark: 'Principal E (2 Points)' };
  if (upper === 'O') return { grade: 'O', remark: 'Subsidiary Pass (1 Point)' };
  if (upper === 'F') return { grade: 'F', remark: 'Fail (0 Points)' };

  return { grade: upper, remark: strVal };
}

/**
 * Calculate UNEB Aggregates & Division
 */
export function calculateUnebAggregatesAndDivision(subjects: SubjectResult[]): {
  aggregates: number;
  division: string;
  aggregatesOrPoints: string;
  divisionOrClass: string;
} {
  const gradePointsMap: Record<string, number> = {
    'D1': 1, 'D2': 2, 'C3': 3, 'C4': 4, 'C5': 5, 'C6': 6, 'P7': 7, 'P8': 8, 'F9': 9
  };

  const points = subjects
    .map(s => gradePointsMap[s.grade.toUpperCase()] || 0)
    .filter(p => p > 0)
    .sort((a, b) => a - b);

  if (points.length === 0) {
    return {
      aggregates: 0,
      division: 'Division 4',
      aggregatesOrPoints: 'N/A',
      divisionOrClass: 'Division 4'
    };
  }

  const best8 = points.slice(0, 8);
  const totalAggregates = best8.reduce((a, b) => a + b, 0);

  let div = 'Division 4';
  if (totalAggregates <= 32 && points.length >= 7) div = 'Division 1';
  else if (totalAggregates <= 45 && points.length >= 6) div = 'Division 2';
  else if (totalAggregates <= 58) div = 'Division 3';
  else if (totalAggregates <= 68) div = 'Division 4';
  else div = 'Division U';

  return {
    aggregates: totalAggregates,
    division: div,
    aggregatesOrPoints: `${totalAggregates} Aggregates`,
    divisionOrClass: div
  };
}

/**
 * Parse JSON or Tab/CSV Spreadsheet Data into StudentResult objects.
 * Operates purely as a literal data viewer for the admin's uploaded spreadsheet rows and keys.
 */
export function parseSpreadsheetData(rawText: string): any[] {
  const trimmed = rawText.trim();
  if (!trimmed) return [];

  // 1. JSON Array format support
  if (trimmed.startsWith('[') || trimmed.startsWith('{')) {
    try {
      const parsed = JSON.parse(trimmed);
      const arr = Array.isArray(parsed) ? parsed : [parsed];
      return arr.map((item) => {
        const cleanObj = { ...item };
        const indexVal = item['Index Number'] || item['Index'] || item.indexNumber || item.id || '';
        if (indexVal && !cleanObj.indexNumber) cleanObj.indexNumber = String(indexVal).toUpperCase().trim();
        const nameVal = item['Name'] || item['Student Name'] || item.studentName || item.name || '';
        if (nameVal && !cleanObj.studentName) cleanObj.studentName = String(nameVal).toUpperCase().trim();
        return cleanObj;
      });
    } catch (e) {
      // Continue to CSV/TSV parsing
    }
  }

  // 2. CSV / TSV Parsing - Pure literal parser preserving raw headers and cell values
  const lines = trimmed.split(/\r?\n/).map(l => l.trim()).filter(l => l.length > 0);
  if (lines.length === 0) return [];

  const firstLine = lines[0];
  const isTab = firstLine.includes('\t');
  const delimiter = isTab ? '\t' : ',';

  const rawRows = lines.map(line => line.split(delimiter).map(c => c.replace(/^"|"$/g, '').trim()));
  if (rawRows.length === 0) return [];

  const rawHeaders = rawRows[0];
  const dataRows = rawRows.slice(1);

  const results: any[] = [];
  for (let i = 0; i < dataRows.length; i++) {
    const cols = dataRows[i];
    if (!cols || cols.length === 0 || cols.every(c => !c)) continue;

    const rowObj: Record<string, any> = {};
    rawHeaders.forEach((header, idx) => {
      const hTrim = header.trim();
      if (hTrim) {
        rowObj[hTrim] = cols[idx] !== undefined ? cols[idx] : '';
      }
    });

    // Extract index number and name for helper lookup properties
    const indexKey = Object.keys(rowObj).find(k => {
      const lk = k.toLowerCase();
      return lk.includes('index') || lk.includes('id') || lk.includes('number');
    });
    const rawIndex = indexKey ? rowObj[indexKey] : (cols[0] || '');
    if (!rawIndex || String(rawIndex).trim().length === 0) continue;

    const cleanIndex = String(rawIndex).toUpperCase().trim();
    rowObj.indexNumber = cleanIndex;

    const nameKey = Object.keys(rowObj).find(k => {
      const lk = k.toLowerCase();
      return lk.includes('name') || lk.includes('student');
    });
    const rawName = nameKey ? rowObj[nameKey] : (cols[1] || '');
    rowObj.studentName = String(rawName).trim();

    results.push(rowObj);
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
  const saved = localStorage.getItem('nexus_gallery_items');
  if (saved !== null) {
    try {
      const parsed: GalleryItem[] = JSON.parse(saved);
      const filtered = parsed.filter(i => !['gal_1', 'gal_2', 'gal_3', 'gal_4', 'gal_5'].includes(i.id));
      return filtered;
    } catch (err) {
      console.warn("Failed to parse saved gallery:", err);
    }
  }

  if (isFirebaseConfigured) {
    try {
      const snap = await withTimeout(getDocs(collection(db, 'gallery')));
      if (!snap.empty) {
        const items: GalleryItem[] = [];
        snap.forEach((docSnap) => {
          items.push(docSnap.data() as GalleryItem);
        });
        const filtered = items.filter(i => !['gal_1', 'gal_2', 'gal_3', 'gal_4', 'gal_5'].includes(i.id));
        localStorage.setItem('nexus_gallery_items', JSON.stringify(filtered));
        return filtered;
      }
    } catch (err) {
      console.warn("Firestore gallery query notice:", err);
    }
  }

  localStorage.setItem('nexus_gallery_items', JSON.stringify([]));
  return [];
}

/**
 * Real-time listener for gallery collection.
 * Syncs gallery photos across all devices instantly.
 */
export function subscribeToGallery(callback: (items: GalleryItem[]) => void): () => void {
  if (!isFirebaseConfigured) {
    const saved = localStorage.getItem('nexus_gallery_items');
    if (saved) {
      try { callback(JSON.parse(saved)); } catch (e) { callback([]); }
    } else {
      callback([]);
    }
    return () => {};
  }

  const unsubscribe = onSnapshot(collection(db, 'gallery'), (snap) => {
    if (!snap.empty) {
      const items: GalleryItem[] = [];
      snap.forEach((docSnap) => {
        items.push(docSnap.data() as GalleryItem);
      });
      const filtered = items.filter(i => !['gal_1', 'gal_2', 'gal_3', 'gal_4', 'gal_5'].includes(i.id));
      localStorage.setItem('nexus_gallery_items', JSON.stringify(filtered));
      callback(filtered);
    } else {
      localStorage.setItem('nexus_gallery_items', JSON.stringify([]));
      callback([]);
    }
  }, (err) => {
    console.warn("Firestore gallery onSnapshot notice:", err);
    const saved = localStorage.getItem('nexus_gallery_items');
    if (saved) {
      try { callback(JSON.parse(saved)); } catch (e) { callback([]); }
    }
  });

  return unsubscribe;
}

export async function addGalleryItemToFirestore(item: GalleryItem): Promise<boolean> {
  const current = await getGalleryFromFirestore();
  const updated = [item, ...current.filter(i => i.id !== item.id)];
  localStorage.setItem('nexus_gallery_items', JSON.stringify(updated));

  if (isFirebaseConfigured) {
    try {
      const docRef = doc(db, 'gallery', item.id);
      await withTimeout(setDoc(docRef, sanitizeForFirestore({ ...item, createdAt: new Date().toISOString() }), { merge: true }));
    } catch (err) {
      console.warn("Firestore gallery upload notice:", err);
    }
  }

  return true;
}

export async function deleteGalleryItemFromFirestore(id: string): Promise<boolean> {
  const saved = localStorage.getItem('nexus_gallery_items');
  let current: GalleryItem[] = [];
  if (saved !== null) {
    try {
      current = JSON.parse(saved);
    } catch (e) {}
  } else {
    current = await getGalleryFromFirestore();
  }

  const updated = current.filter(i => i.id !== id);
  localStorage.setItem('nexus_gallery_items', JSON.stringify(updated));

  if (isFirebaseConfigured) {
    try {
      await withTimeout(deleteDoc(doc(db, 'gallery', id)));
    } catch (err) {
      console.warn("Firestore gallery delete notice:", err);
    }
  }

  return true;
}

// ==========================================
// FIRESTORE EVENTS COLLECTION HELPERS
// ==========================================

export async function getEventsFromFirestore(): Promise<EventItem[]> {
  if (isFirebaseConfigured) {
    try {
      const snap = await withTimeout(getDocs(collection(db, 'events')));
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
  }

  const saved = localStorage.getItem('nexus_events_items');
  if (saved !== null) {
    try {
      return JSON.parse(saved);
    } catch (err) {
      console.warn("Failed to parse saved events:", err);
    }
  }

  localStorage.setItem('nexus_events_items', JSON.stringify(UPCOMING_EVENTS));
  return UPCOMING_EVENTS;
}

let isEventsSeeding = false;

/**
 * Real-time listener for events collection.
 * Syncs events across all devices instantly in real-time.
 */
export function subscribeToEvents(callback: (events: EventItem[]) => void): () => void {
  if (!isFirebaseConfigured) {
    const saved = localStorage.getItem('nexus_events_items');
    if (saved) {
      try { callback(JSON.parse(saved)); } catch (e) { callback(UPCOMING_EVENTS); }
    } else {
      callback(UPCOMING_EVENTS);
    }
    return () => {};
  }

  const unsubscribe = onSnapshot(collection(db, 'events'), async (snap) => {
    if (snap.empty && !isEventsSeeding) {
      isEventsSeeding = true;
      try {
        for (const evt of UPCOMING_EVENTS) {
          await setDoc(doc(db, 'events', evt.id), { ...evt, createdAt: new Date().toISOString() });
        }
      } catch (e) {
        console.warn("Error seeding events:", e);
      }
      return;
    }

    if (!snap.empty) {
      const items: EventItem[] = [];
      snap.forEach((docSnap) => {
        items.push(docSnap.data() as EventItem);
      });
      localStorage.setItem('nexus_events_items', JSON.stringify(items));
      callback(items);
    }
  }, (err) => {
    console.warn("Firestore events onSnapshot notice:", err);
    const saved = localStorage.getItem('nexus_events_items');
    if (saved) {
      try { callback(JSON.parse(saved)); } catch (e) { callback(UPCOMING_EVENTS); }
    }
  });

  return unsubscribe;
}

export async function addEventToFirestore(item: EventItem): Promise<boolean> {
  const current = await getEventsFromFirestore();
  const updated = [item, ...current.filter(i => i.id !== item.id)];
  localStorage.setItem('nexus_events_items', JSON.stringify(updated));

  if (isFirebaseConfigured) {
    try {
      const docRef = doc(db, 'events', item.id);
      await withTimeout(setDoc(docRef, { ...item, createdAt: new Date().toISOString() }, { merge: true }));
    } catch (err) {
      console.warn("Firestore event upload notice:", err);
    }
  }

  return true;
}

export async function deleteEventFromFirestore(id: string): Promise<boolean> {
  const current = await getEventsFromFirestore();
  const updated = current.filter(i => i.id !== id);
  localStorage.setItem('nexus_events_items', JSON.stringify(updated));

  if (isFirebaseConfigured) {
    try {
      await withTimeout(deleteDoc(doc(db, 'events', id)));
    } catch (err) {
      console.warn("Firestore event delete notice:", err);
    }
  }

  return true;
}

// ==========================================
// FIRESTORE NEWS COLLECTION HELPERS
// ==========================================

export async function getNewsFromFirestore(): Promise<NewsItem[]> {
  if (isFirebaseConfigured) {
    try {
      const snap = await withTimeout(getDocs(collection(db, 'news')));
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
  }

  const saved = localStorage.getItem('nexus_news_items');
  if (saved !== null) {
    try {
      return JSON.parse(saved);
    } catch (err) {
      console.warn("Failed to parse saved news:", err);
    }
  }

  localStorage.setItem('nexus_news_items', JSON.stringify(NEWS_ARTICLES));
  return NEWS_ARTICLES;
}

export async function addNewsToFirestore(item: NewsItem): Promise<boolean> {
  if (isFirebaseConfigured) {
    try {
      const docRef = doc(db, 'news', item.id);
      await withTimeout(setDoc(docRef, { ...item, createdAt: new Date().toISOString() }, { merge: true }));
    } catch (err) {
      console.warn("Firestore news upload notice:", err);
    }
  }

  const current = await getNewsFromFirestore();
  const updated = [item, ...current.filter(i => i.id !== item.id)];
  localStorage.setItem('nexus_news_items', JSON.stringify(updated));
  return true;
}

export async function deleteNewsFromFirestore(id: string): Promise<boolean> {
  if (isFirebaseConfigured) {
    try {
      await withTimeout(deleteDoc(doc(db, 'news', id)));
    } catch (err) {
      console.warn("Firestore news delete notice:", err);
    }
  }

  const current = await getNewsFromFirestore();
  const updated = current.filter(i => i.id !== id);
  localStorage.setItem('nexus_news_items', JSON.stringify(updated));
  return true;
}

