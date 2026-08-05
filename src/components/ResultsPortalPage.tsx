import React, { useState } from 'react';
import { INITIAL_STUDENT_RESULTS } from '../data/schoolData';
import { StudentResult } from '../types';
import { getStudentFromFirestore } from '../lib/firebase';
import { Search, AlertCircle, RefreshCw } from 'lucide-react';

interface ResultsPortalPageProps {
  studentResults?: StudentResult[];
  onOpenAdminModal?: () => void;
}

export const ResultsPortalPage: React.FC<ResultsPortalPageProps> = ({
  studentResults: externalResults
}) => {
  const [indexNumberInput, setIndexNumberInput] = useState('');
  const [isSearching, setIsSearching] = useState(false);
  const [queriedResult, setQueriedResult] = useState<StudentResult | null>(null);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [hasSearched, setHasSearched] = useState(false);

  const allResults = externalResults || INITIAL_STUDENT_RESULTS;

  const handleCheckResults = async (e: React.FormEvent) => {
    e.preventDefault();
    const cleanIndex = indexNumberInput.trim().toUpperCase();
    const normalizedIndex = cleanIndex.replace(/[\s/]/g, '');

    if (!cleanIndex) {
      setErrorMessage('Index number not found.');
      setQueriedResult(null);
      setHasSearched(true);
      return;
    }

    setIsSearching(true);
    setErrorMessage(null);
    setQueriedResult(null);
    setHasSearched(true);

    try {
      // Network delay simulation for UNEB server query
      await new Promise((resolve) => setTimeout(resolve, 800));

      // 1. Check in local admin array first
      const matchedLocal = allResults.find(
        (s: any) => {
          const sIdx = String(s['Index Number'] || s['Index'] || s.indexNumber || s.id || '').trim().toUpperCase();
          const sNorm = sIdx.replace(/[\s/]/g, '');
          return sIdx === cleanIndex || sNorm === normalizedIndex;
        }
      );

      if (matchedLocal) {
        setQueriedResult(matchedLocal);
        return;
      }

      // 2. Fallback check in Cloud Firestore if configured
      const firestoreResult = await getStudentFromFirestore(cleanIndex);
      if (firestoreResult) {
        setQueriedResult(firestoreResult);
        return;
      }

      // 3. Not found
      setErrorMessage('Index number not found.');
    } catch {
      setErrorMessage('Index number not found.');
    } finally {
      setIsSearching(false);
    }
  };

  const getCandidateMeta = (result: any) => {
    if (!result) return [];

    const metaList: { label: string; value: string }[] = [];

    // Always extract Student Name if present
    const nameVal = result['Name'] || result['Student Name'] || result.studentName || result['name'];
    if (nameVal) metaList.push({ label: 'Student Name', value: String(nameVal) });

    // Always extract Index Number if present
    const indexVal = result['Index Number'] || result['Index'] || result.indexNumber || result['id'];
    if (indexVal) metaList.push({ label: 'Index Number', value: String(indexVal) });

    // Extract any other metadata fields (e.g., Gender, Age)
    const EXCLUDED_KEYS = new Set([
      'indexNumber', 'studentName', 'index', 'name', 'id',
      'Index Number', 'Student Name', 'Name', 'Index', 'ID',
      'updatedAt', 'createdAt', 'subjects', 'verifiedStatus',
      'level', 'examYear', 'combinationOrStream', 'headteacherRemark',
      'aggregates', 'division', 'aggregatesOrPoints', 'divisionOrClass'
    ]);

    Object.keys(result).forEach((key) => {
      if (EXCLUDED_KEYS.has(key)) return;
      const lk = key.toLowerCase();
      if (lk.includes('gender') || lk.includes('sex') || lk.includes('age') || lk.includes('class') || lk.includes('stream')) {
        metaList.push({ label: key, value: String(result[key]) });
      }
    });

    return metaList;
  };

  const getCandidateSubjects = (result: any): { subject: string; score: string }[] => {
    if (!result) return [];

    // 1. Array format
    if (Array.isArray(result.subjects) && result.subjects.length > 0) {
      return result.subjects.map((s: any) => ({
        subject: s.name || s.subject || s.code || 'Subject',
        score: s.score !== undefined ? String(s.score) : String(s.grade || s.scoreName || s.remark || '-')
      }));
    }

    // 2. Direct key-value format (e.g. Math: 54, English: 72)
    const EXCLUDED_KEYS = new Set([
      'indexNumber', 'studentName', 'index', 'name', 'id',
      'Index Number', 'Student Name', 'Name', 'Index', 'ID',
      'Gender', 'gender', 'Sex', 'sex', 'Age', 'age',
      'updatedAt', 'createdAt', 'subjects', 'verifiedStatus',
      'level', 'examYear', 'combinationOrStream', 'headteacherRemark',
      'aggregates', 'division', 'aggregatesOrPoints', 'divisionOrClass'
    ]);

    const subjectList: { subject: string; score: string }[] = [];
    Object.keys(result).forEach((key) => {
      if (EXCLUDED_KEYS.has(key)) return;
      const val = result[key];
      if (val !== undefined && val !== null && val !== '') {
        subjectList.push({
          subject: key,
          score: String(val)
        });
      }
    });

    return subjectList;
  };

  return (
    <div id="uneb-results" className="bg-white text-slate-900 py-6 px-4 sm:px-6 max-w-4xl mx-auto">
      <div className="border-b border-slate-300 pb-4 mb-6">
        <h2 className="text-2xl font-bold text-[#0B1A30]">Official UNEB Results Verification</h2>
        <p className="text-xs text-slate-600 mt-1">
          Direct lookup and verification of candidate examination score sheets.
        </p>
      </div>

      {/* Input Box & Button */}
      <form onSubmit={handleCheckResults} className="space-y-4 max-w-xl">
        <div>
          <label htmlFor="uneb-index-input" className="block text-xs font-bold text-[#0B1A30] uppercase mb-1">
            Enter Candidate Index Number
          </label>
          <div className="flex gap-2">
            <input
              id="uneb-index-input"
              type="text"
              required
              placeholder="e.g. U0001/001"
              value={indexNumberInput}
              onChange={(e) => setIndexNumberInput(e.target.value)}
              className="flex-1 px-3 py-2 border border-slate-300 rounded font-mono text-sm text-slate-900 uppercase focus:outline-none focus:border-[#0B1A30]"
            />
            <button
              type="submit"
              disabled={isSearching}
              className="px-5 py-2 bg-[#0B1A30] text-white font-bold text-xs rounded hover:bg-slate-800 transition-colors flex items-center gap-1.5 disabled:opacity-50"
            >
              {isSearching ? <RefreshCw className="w-3.5 h-3.5 animate-spin" /> : <Search className="w-3.5 h-3.5" />}
              <span>Check Results</span>
            </button>
          </div>
        </div>
      </form>

      {/* Searching Data Delay Indicator */}
      {isSearching && (
        <div className="mt-6 p-4 bg-slate-50 border border-slate-200 rounded-xl flex items-center gap-3 text-xs font-semibold text-slate-700 animate-pulse">
          <RefreshCw className="w-4 h-4 text-amber-600 animate-spin shrink-0" />
          <span>Fetching candidate data from UNEB records server...</span>
        </div>
      )}

      {/* Error Message */}
      {hasSearched && !isSearching && errorMessage && (
        <div className="mt-6 p-3 bg-red-50 border border-red-300 text-red-800 rounded text-xs font-semibold flex items-center gap-2">
          <AlertCircle className="w-4 h-4 text-red-600 shrink-0" />
          <span>{errorMessage}</span>
        </div>
      )}

      {/* Plain Text Results Table */}
      {!isSearching && queriedResult && (
        <div className="mt-8 border border-slate-300 rounded p-6 space-y-4">
          <div className="flex justify-between items-start border-b border-slate-300 pb-3">
            <div>
              <h3 className="text-lg font-bold text-[#0B1A30]">Nexus Academy - Candidate Result Slip</h3>
              <p className="text-xs text-slate-600">Official Candidate Score Breakdown</p>
            </div>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 text-xs">
            {getCandidateMeta(queriedResult).map((meta, idx) => (
              <div key={idx}>
                <span className="text-slate-500 block uppercase font-bold text-[10px]">{meta.label}</span>
                <strong className="text-[#0B1A30] text-sm">{meta.value}</strong>
              </div>
            ))}
          </div>

          {/* Clean Plain Text Subject Table */}
          <div className="pt-2">
            <h4 className="text-xs font-bold text-[#0B1A30] uppercase mb-2">Subject Scores Table</h4>
            <table className="w-full text-left text-xs border border-slate-300">
              <thead className="bg-slate-100 text-slate-800 font-bold border-b border-slate-300">
                <tr>
                  <th className="p-2 border-r border-slate-300 font-bold">Subject</th>
                  <th className="p-2 font-bold">Score</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-300">
                {getCandidateSubjects(queriedResult).map((subj, idx) => (
                  <tr key={idx} className="hover:bg-slate-50">
                    <td className="p-2 border-r border-slate-300 font-semibold text-slate-800">{subj.subject}</td>
                    <td className="p-2 font-mono font-bold text-[#0B1A30]">{subj.score}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}
    </div>
  );
};
