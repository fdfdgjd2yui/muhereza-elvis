import React, { useState } from 'react';
import { INITIAL_STUDENT_RESULTS } from '../data/schoolData';
import { StudentResult } from '../types';
import { getStudentFromFirestore, getStudentIndexNumber, getAllStudentsFromFirestore } from '../lib/firebase';
import { Search, AlertCircle, RefreshCw, BarChart2, ChevronLeft, ChevronRight, X } from 'lucide-react';

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

  // Performance Board / Leaderboard states
  const [showLeaderboard, setShowLeaderboard] = useState(false);
  const [isLoadingLeaderboard, setIsLoadingLeaderboard] = useState(false);
  const [leaderboardData, setLeaderboardData] = useState<StudentResult[]>([]);
  const [leaderboardSearch, setLeaderboardSearch] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const pageSize = 10;

  const allResults = externalResults || INITIAL_STUDENT_RESULTS;

  const handleToggleLeaderboard = async () => {
    if (showLeaderboard) {
      setShowLeaderboard(false);
      return;
    }

    setShowLeaderboard(true);
    setIsLoadingLeaderboard(true);
    try {
      const records = await getAllStudentsFromFirestore();
      if (records && records.length > 0) {
        setLeaderboardData(records);
      } else {
        setLeaderboardData(allResults);
      }
    } catch {
      setLeaderboardData(allResults);
    } finally {
      setIsLoadingLeaderboard(false);
    }
  };

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
      await new Promise((resolve) => setTimeout(resolve, 600));

      // 1. Check in local admin array first
      const matchedLocal = allResults.find((s: any) => {
        const sIdx = getStudentIndexNumber(s);
        const sNorm = sIdx.replace(/[\s/]/g, '');
        return sIdx === cleanIndex || sNorm === normalizedIndex;
      });

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

  const getDynamicKeys = (result: any) => {
    if (!result) return [];
    const EXCLUDED = new Set([
      'updatedAt', 'createdAt', 'level', 'examYear', 'combinationOrStream',
      'headteacherRemark', 'aggregates', 'division', 'aggregatesOrPoints',
      'divisionOrClass', 'verifiedStatus'
    ]);
    return Object.keys(result).filter(k => {
      const lk = k.toLowerCase().trim();
      return (
        !EXCLUDED.has(k) &&
        lk !== 'level' &&
        lk !== 'exam year' && lk !== 'examyear' &&
        lk !== 'combination or stream' && lk !== 'combinationorstream' &&
        lk !== 'headteacher remark' && lk !== 'headteacherremark' &&
        lk !== 'verified status' && lk !== 'verifiedstatus' &&
        lk !== 'aggregates' &&
        lk !== 'aggregates or points' && lk !== 'aggregatesorpoints' &&
        lk !== 'division' &&
        lk !== 'division or class' && lk !== 'divisionorclass'
      );
    });
  };

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

  // Filter leaderboard data by candidate name or index number
  const filteredLeaderboard = leaderboardData.filter(s => {
    if (!leaderboardSearch.trim()) return true;
    const q = leaderboardSearch.toLowerCase().trim();
    return Object.values(s).some(val => {
      if (val === null || val === undefined) return false;
      return String(val).toLowerCase().includes(q);
    });
  });

  const totalPages = Math.ceil(filteredLeaderboard.length / pageSize) || 1;
  const paginatedLeaderboard = filteredLeaderboard.slice(
    (currentPage - 1) * pageSize,
    currentPage * pageSize
  );

  const leaderboardHeaders = leaderboardData.length > 0 ? getDynamicKeys(leaderboardData[0]) : [];

  return (
    <div id="uneb-results" className="bg-white text-slate-900 py-6 px-4 sm:px-6 max-w-5xl mx-auto space-y-8">
      <div className="border-b border-slate-300 pb-4">
        <h2 className="text-2xl font-bold text-[#0B1A30]">Official UNEB Results Verification</h2>
        <p className="text-xs text-slate-600 mt-1">
          Direct lookup and verification of candidate examination score sheets.
        </p>
      </div>

      {/* Input Box & Action Buttons */}
      <div className="space-y-4 max-w-xl">
        <form onSubmit={handleCheckResults} className="space-y-4">
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
                className="px-5 py-2 bg-[#0B1A30] text-white font-bold text-xs rounded hover:bg-slate-800 transition-colors flex items-center gap-1.5 disabled:opacity-50 shadow-sm"
              >
                {isSearching ? <RefreshCw className="w-3.5 h-3.5 animate-spin" /> : <Search className="w-3.5 h-3.5" />}
                <span>Check Results</span>
              </button>
            </div>
          </div>
        </form>

        {/* Prominent Public Leaderboard Toggle Button */}
        <div className="pt-2">
          <button
            type="button"
            onClick={handleToggleLeaderboard}
            className="w-full sm:w-auto px-5 py-2.5 rounded-xl bg-amber-500 hover:bg-amber-600 text-slate-950 font-black text-xs uppercase tracking-wider transition-all shadow-md flex items-center justify-center gap-2 border border-amber-400"
          >
            <BarChart2 className="w-4 h-4 text-slate-950" />
            <span>📊 View Full Candidate Performance Board</span>
          </button>
        </div>
      </div>

      {/* Searching Data Delay Indicator */}
      {isSearching && (
        <div className="p-4 bg-slate-50 border border-slate-200 rounded-xl flex items-center gap-3 text-xs font-semibold text-slate-700 animate-pulse">
          <RefreshCw className="w-4 h-4 text-amber-600 animate-spin shrink-0" />
          <span>Fetching candidate data from UNEB records server...</span>
        </div>
      )}

      {/* Error Message */}
      {hasSearched && !isSearching && errorMessage && (
        <div className="p-3 bg-red-50 border border-red-300 text-red-800 rounded text-xs font-semibold flex items-center gap-2">
          <AlertCircle className="w-4 h-4 text-red-600 shrink-0" />
          <span>{errorMessage}</span>
        </div>
      )}

      {/* Dynamic Results Table for Individual Search */}
      {!isSearching && queriedResult && (
        <div className="border border-slate-300 rounded overflow-hidden shadow-sm">
          <div className="bg-[#0B1A30] p-4 text-white">
            <h3 className="text-base font-bold">Nexus Academy - Candidate Examination Slip</h3>
            <p className="text-xs text-slate-300">Official Candidate Score Breakdown</p>
          </div>

          <div className="overflow-x-auto p-4 bg-white">
            {getDynamicKeys(queriedResult).length === 0 ? (
              <p className="text-xs text-slate-500 italic">No score columns available.</p>
            ) : (
              <table className="w-full text-left text-xs border border-slate-200">
                <thead className="bg-slate-100 text-slate-800 font-bold border-b border-slate-200">
                  <tr>
                    {getDynamicKeys(queriedResult).map((colKey) => (
                      <th key={colKey} className="p-3 border-r border-slate-200 font-bold uppercase whitespace-nowrap">
                        {formatHeaderTitle(colKey)}
                      </th>
                    ))}
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-200">
                  <tr className="hover:bg-slate-50">
                    {getDynamicKeys(queriedResult).map((colKey) => {
                      const cellVal = queriedResult[colKey];
                      const displayVal = cellVal !== undefined && cellVal !== null && cellVal !== '' ? String(cellVal) : '-';
                      const lk = colKey.toLowerCase();
                      const isAnchor = lk.includes('index') || lk.includes('id') || lk.includes('number');
                      return (
                        <td
                          key={colKey}
                          className={`p-3 border-r border-slate-200 whitespace-nowrap ${
                            isAnchor
                              ? 'font-mono font-bold text-[#0B1A30]'
                              : 'font-semibold text-slate-800'
                          }`}
                        >
                          {displayVal}
                        </td>
                      );
                    })}
                  </tr>
                </tbody>
              </table>
            )}
          </div>
        </div>
      )}

      {/* PUBLIC CANDIDATE PERFORMANCE BOARD (LEADERBOARD) */}
      {showLeaderboard && (
        <div className="border border-amber-300 rounded-2xl bg-slate-50 p-6 space-y-4 shadow-lg animate-in fade-in duration-200">
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 border-b border-slate-200 pb-4">
            <div>
              <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-amber-100 text-amber-900 text-[11px] font-extrabold uppercase tracking-wider mb-1">
                <BarChart2 className="w-3.5 h-3.5 text-amber-600" />
                Public Examination Leaderboard
              </div>
              <h3 className="text-lg font-black text-[#0B1A30]">Full Candidate Performance Board</h3>
              <p className="text-xs text-slate-600">Showing all registered student records from the academic dataset.</p>
            </div>
            
            <button
              onClick={() => setShowLeaderboard(false)}
              className="p-1.5 rounded-lg bg-slate-200 hover:bg-slate-300 text-slate-700 transition-colors"
              title="Close Leaderboard"
            >
              <X className="w-4 h-4" />
            </button>
          </div>

          {/* Search bar above table */}
          <div className="relative max-w-md">
            <Search className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              placeholder="Search by student name or index number..."
              value={leaderboardSearch}
              onChange={(e) => {
                setLeaderboardSearch(e.target.value);
                setCurrentPage(1);
              }}
              className="w-full pl-9 pr-4 py-2 rounded-xl border border-slate-300 text-xs font-medium text-slate-800 focus:outline-none focus:border-[#0B1A30] bg-white shadow-sm"
            />
          </div>

          {/* Table Container */}
          {isLoadingLeaderboard ? (
            <div className="p-8 text-center bg-white border border-slate-200 rounded-xl space-y-2 animate-pulse">
              <RefreshCw className="w-6 h-6 text-amber-600 animate-spin mx-auto" />
              <p className="text-xs font-bold text-slate-700">Loading full candidate performance records...</p>
            </div>
          ) : leaderboardData.length === 0 ? (
            <div className="p-8 text-center bg-white border border-slate-200 rounded-xl text-xs text-slate-500">
              No candidate records found in database.
            </div>
          ) : (
            <div className="space-y-4">
              <div className="overflow-x-auto border border-slate-200 rounded-xl bg-white shadow-sm max-h-96">
                <table className="w-full text-left text-xs">
                  <thead className="bg-[#0B1A30] text-white font-bold sticky top-0 z-10">
                    <tr>
                      <th className="p-3 border-r border-slate-800 font-bold uppercase whitespace-nowrap">#</th>
                      {leaderboardHeaders.map((colKey) => (
                        <th key={colKey} className="p-3 border-r border-slate-800 font-bold uppercase whitespace-nowrap">
                          {formatHeaderTitle(colKey)}
                        </th>
                      ))}
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-200">
                    {paginatedLeaderboard.length === 0 ? (
                      <tr>
                        <td colSpan={leaderboardHeaders.length + 1} className="p-6 text-center text-slate-500 italic">
                          No matching candidates found for "{leaderboardSearch}".
                        </td>
                      </tr>
                    ) : (
                      paginatedLeaderboard.map((row, rIdx) => {
                        const globalIndex = (currentPage - 1) * pageSize + rIdx + 1;
                        return (
                          <tr key={rIdx} className="hover:bg-amber-50/40 transition-colors">
                            <td className="p-3 font-mono text-slate-400 font-bold border-r border-slate-100">{globalIndex}</td>
                            {leaderboardHeaders.map((colKey) => {
                              const cellVal = row[colKey];
                              const displayVal = cellVal !== undefined && cellVal !== null && cellVal !== '' ? String(cellVal) : '-';
                              const lk = colKey.toLowerCase();
                              const isAnchor = lk.includes('index') || lk.includes('id') || lk.includes('number');
                              return (
                                <td
                                  key={colKey}
                                  className={`p-3 border-r border-slate-100 whitespace-nowrap ${
                                    isAnchor
                                      ? 'font-mono font-bold text-[#0B1A30]'
                                      : 'font-semibold text-slate-800'
                                  }`}
                                >
                                  {displayVal}
                                </td>
                              );
                            })}
                          </tr>
                        );
                      })
                    )}
                  </tbody>
                </table>
              </div>

              {/* Pagination Controls */}
              <div className="flex flex-col sm:flex-row items-center justify-between gap-3 text-xs text-slate-600 bg-white p-3 border border-slate-200 rounded-xl">
                <div>
                  Showing <strong>{filteredLeaderboard.length === 0 ? 0 : (currentPage - 1) * pageSize + 1}</strong> to{' '}
                  <strong>{Math.min(currentPage * pageSize, filteredLeaderboard.length)}</strong> of <strong>{filteredLeaderboard.length}</strong> candidates
                </div>

                <div className="flex items-center gap-2">
                  <button
                    onClick={() => setCurrentPage(p => Math.max(1, p - 1))}
                    disabled={currentPage === 1}
                    className="p-1.5 rounded-lg border border-slate-300 hover:bg-slate-100 disabled:opacity-40 transition-colors flex items-center gap-1 font-semibold"
                  >
                    <ChevronLeft className="w-4 h-4" /> Previous
                  </button>
                  <span className="font-bold text-[#0B1A30] px-2">
                    Page {currentPage} of {totalPages}
                  </span>
                  <button
                    onClick={() => setCurrentPage(p => Math.min(totalPages, p + 1))}
                    disabled={currentPage >= totalPages}
                    className="p-1.5 rounded-lg border border-slate-300 hover:bg-slate-100 disabled:opacity-40 transition-colors flex items-center gap-1 font-semibold"
                  >
                    Next <ChevronRight className="w-4 h-4" />
                  </button>
                </div>
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  );
};

