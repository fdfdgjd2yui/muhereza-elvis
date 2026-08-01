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
      // Simulated realistic network delay when querying UNEB server
      await new Promise((resolve) => setTimeout(resolve, 1100));

      // 1. Check in local admin array first (primary source of truth for active students)
      const matchedLocal = allResults.find(
        (s) => s.indexNumber.trim().toUpperCase() === cleanIndex ||
               s.indexNumber.replace(/[\s/]/g, '').toUpperCase() === normalizedIndex
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

  return (
    <div id="uneb-results" className="bg-white text-slate-900 py-12 px-4 sm:px-6 max-w-4xl mx-auto">
      <div className="border-b border-slate-300 pb-4 mb-6">
        <h2 className="text-2xl font-bold text-[#0B1A30]">Public UNEB Student Results Portal</h2>
        <p className="text-xs text-slate-600 mt-1">
          Direct verification of official candidate examination result slips.
        </p>
      </div>

      {/* Input Box & Button */}
      <form onSubmit={handleCheckResults} className="space-y-4 max-w-xl">
        <div>
          <label htmlFor="uneb-index-input" className="block text-xs font-bold text-[#0B1A30] uppercase mb-1">
            Enter UNEB Index Number
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

        {/* Quick Sample Links */}
        <div className="flex items-center gap-2 text-xs text-slate-500">
          <span>Sample numbers:</span>
          {['U0001/001', 'U0001/002', 'U0001/003', 'U0001/010'].map((sample) => (
            <button
              key={sample}
              type="button"
              onClick={() => {
                setIndexNumberInput(sample);
                setErrorMessage(null);
              }}
              className="font-mono underline text-[#0B1A30] hover:text-blue-700"
            >
              {sample}
            </button>
          ))}
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
              <h3 className="text-lg font-bold text-[#0B1A30]">Nexus Academy - UNEB Result Slip</h3>
              <p className="text-xs text-slate-600">Official Candidate Score Breakdown</p>
            </div>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 text-xs">
            <div>
              <span className="text-slate-500 block uppercase font-bold text-[10px]">Student Name</span>
              <strong className="text-[#0B1A30] text-sm">{queriedResult.studentName}</strong>
            </div>
            <div>
              <span className="text-slate-500 block uppercase font-bold text-[10px]">Index Number</span>
              <strong className="text-blue-900 font-mono text-sm">{queriedResult.indexNumber}</strong>
            </div>
            <div>
              <span className="text-slate-500 block uppercase font-bold text-[10px]">Aggregates / Points</span>
              <strong className="text-[#0B1A30] text-sm">{queriedResult.aggregatesOrPoints}</strong>
            </div>
            <div>
              <span className="text-slate-500 block uppercase font-bold text-[10px]">Division / Class</span>
              <strong className="text-[#0B1A30] text-sm">{queriedResult.divisionOrClass}</strong>
            </div>
          </div>

          {/* Clean Plain Text Subject Table */}
          <div className="pt-2">
            <h4 className="text-xs font-bold text-[#0B1A30] uppercase mb-2">Subject Grades Table</h4>
            <table className="w-full text-left text-xs border border-slate-300">
              <thead className="bg-slate-100 text-slate-800 font-bold border-b border-slate-300">
                <tr>
                  <th className="p-2 border-r border-slate-300">Code</th>
                  <th className="p-2 border-r border-slate-300">Subject Name</th>
                  <th className="p-2 border-r border-slate-300 text-center">Grade</th>
                  <th className="p-2">Score Remark</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-300">
                {queriedResult.subjects.map((subj, idx) => (
                  <tr key={idx} className="hover:bg-slate-50">
                    <td className="p-2 border-r border-slate-300 font-mono font-bold">{subj.code}</td>
                    <td className="p-2 border-r border-slate-300 font-semibold text-slate-800">{subj.name}</td>
                    <td className="p-2 border-r border-slate-300 text-center font-bold font-mono text-blue-900">{subj.grade}</td>
                    <td className="p-2 text-slate-700">{subj.scoreName}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {queriedResult.headteacherRemark && (
            <p className="text-xs text-slate-600 italic border-t border-slate-200 pt-3">
              Remarks: "{queriedResult.headteacherRemark}"
            </p>
          )}
        </div>
      )}
    </div>
  );
};
