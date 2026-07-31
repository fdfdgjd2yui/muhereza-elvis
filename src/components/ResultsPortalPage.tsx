import React, { useState } from 'react';
import { INITIAL_STUDENT_RESULTS } from '../data/schoolData';
import { StudentResult } from '../types';
import { getStudentFromFirestore, searchStudentInGoogleSheet } from '../lib/firebase';
import { 
  Search, 
  Printer, 
  ShieldCheck, 
  Database, 
  AlertCircle,
  FileCheck,
  CheckCircle2,
  Lock,
  Sparkles,
  RefreshCw,
  FileSpreadsheet,
  ChevronRight
} from 'lucide-react';

interface ResultsPortalPageProps {
  studentResults?: StudentResult[];
  onOpenAdminModal?: () => void;
}

export const ResultsPortalPage: React.FC<ResultsPortalPageProps> = ({
  studentResults: externalResults,
  onOpenAdminModal
}) => {
  const [indexNumberInput, setIndexNumberInput] = useState('');
  const [sheetUrl, setSheetUrl] = useState(
    'https://docs.google.com/spreadsheets/d/e/2PACX-1vQ_EXAMPLE_NEXUS_SHEET/pub?output=csv'
  );
  const [showSheetUrlConfig, setShowSheetUrlConfig] = useState(false);
  const [isSearching, setIsSearching] = useState(false);
  const [queriedResult, setQueriedResult] = useState<StudentResult | null>(null);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [hasSearched, setHasSearched] = useState(false);

  // Default active list in memory for immediate lookup fallback
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
      // 1. Instant lookup in directory dataset (local memory & newly added/synced records)
      const matchedLocal = allResults.find(
        (s) => s.indexNumber.trim().toUpperCase() === cleanIndex ||
               s.indexNumber.replace(/[\s/]/g, '').toUpperCase() === normalizedIndex
      );

      if (matchedLocal) {
        setQueriedResult(matchedLocal);
        return;
      }

      // 2. Query Firestore document database
      const firestoreResult = await getStudentFromFirestore(cleanIndex);
      if (firestoreResult) {
        setQueriedResult(firestoreResult);
        return;
      }

      // 3. Fallback check on public Google Sheet CSV endpoint if configured
      const sheetResult = await searchStudentInGoogleSheet(cleanIndex, sheetUrl);
      if (sheetResult) {
        setQueriedResult(sheetResult);
        return;
      }

      // 4. If not found in any source, set clean error message
      setErrorMessage('Index number not found.');
    } catch {
      setErrorMessage('Index number not found.');
    } finally {
      setIsSearching(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#07111F] text-white pt-28 pb-24 relative overflow-hidden">
      
      {/* Background glow orbs */}
      <div className="absolute top-20 left-1/4 w-[35rem] h-[20rem] bg-sky-500/10 blur-[160px] pointer-events-none" />
      <div className="absolute bottom-20 right-1/4 w-[35rem] h-[20rem] bg-blue-600/10 blur-[160px] pointer-events-none" />

      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 space-y-8">
        
        {/* Portal Header */}
        <div className="text-center max-w-2xl mx-auto space-y-3">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full glass-card border border-sky-400/30 text-sky-300 text-xs font-bold uppercase tracking-widest">
            <ShieldCheck className="w-4 h-4 text-sky-400" />
            Nexus Academy Results Portal
          </div>
          <h1 className="text-3xl sm:text-5xl font-extrabold text-white heading-font">
            Check UNEB <span className="blue-gradient-text">Exam Results</span>
          </h1>
          <p className="text-gray-300 text-sm sm:text-base">
            Enter your candidate UNEB Index Number below to retrieve your verified report card.
          </p>
        </div>

        {/* Live Google Sheets CSV Source Bar */}
        <div className="glass-card rounded-2xl p-4 border border-sky-400/20 bg-gradient-to-r from-[#10253C]/80 via-[#07111F]/90 to-[#10253C]/80 shadow-xl flex flex-col gap-3">
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3">
            <div className="flex items-center gap-3">
              <div className="p-2.5 rounded-xl bg-sky-500/15 border border-sky-400/30">
                <FileSpreadsheet className="w-5 h-5 text-sky-400" />
              </div>
              <div>
                <div className="flex items-center gap-2">
                  <span className="text-xs font-bold text-white">Direct Google Sheets CSV Data Source</span>
                  <span className="text-[10px] bg-emerald-500/20 text-emerald-300 border border-emerald-500/40 px-2 py-0.5 rounded-full font-bold uppercase tracking-wider">
                    LIVE CSV FETCH
                  </span>
                </div>
                <p className="text-[11px] text-gray-400">
                  Parses live CSV string directly in the browser. Matches headers for index number / student ID.
                </p>
              </div>
            </div>

            <div className="flex items-center gap-2 shrink-0">
              <button
                onClick={() => setShowSheetUrlConfig(!showSheetUrlConfig)}
                className="text-[11px] px-3 py-1.5 rounded-xl bg-white/5 hover:bg-white/10 border border-white/10 text-sky-300 font-semibold transition-colors flex items-center gap-1"
              >
                <span>{showSheetUrlConfig ? 'Hide Sheet URL' : 'Configure Sheet URL'}</span>
                <ChevronRight className={`w-3.5 h-3.5 transition-transform ${showSheetUrlConfig ? 'rotate-90' : ''}`} />
              </button>

              {onOpenAdminModal && (
                <button
                  onClick={onOpenAdminModal}
                  className="flex items-center gap-2 px-3.5 py-1.5 rounded-xl bg-sky-500/15 hover:bg-sky-500/25 border border-sky-400/30 text-sky-300 text-xs font-bold transition-all"
                >
                  <Lock className="w-3.5 h-3.5" />
                  <span>Admin Tools</span>
                </button>
              )}
            </div>
          </div>

          {showSheetUrlConfig && (
            <div className="pt-2 border-t border-white/10 space-y-1.5 animate-in fade-in">
              <label className="block text-[10px] font-bold text-sky-300 uppercase tracking-wider">
                Public Google Sheets Published CSV Export URL
              </label>
              <input
                type="text"
                value={sheetUrl}
                onChange={(e) => setSheetUrl(e.target.value)}
                placeholder="https://docs.google.com/spreadsheets/d/e/.../pub?output=csv"
                className="w-full px-3.5 py-2 rounded-xl glass-input text-xs font-mono border-white/10 focus:border-sky-400"
              />
              <p className="text-[10px] text-gray-400 italic">
                Publish your sheet via File &gt; Share &gt; Publish to Web &gt; Select CSV format.
              </p>
            </div>
          )}
        </div>

        {/* Prominent Search Card */}
        <div className="glass-card rounded-3xl p-6 sm:p-8 border border-white/15 shadow-2xl bg-gradient-to-b from-[#10253C]/60 to-[#07111F]">
          <form onSubmit={handleCheckResults} className="space-y-4">
            <label className="block text-xs font-bold uppercase tracking-wider text-sky-300">
              UNEB Candidate Index Number
            </label>
            
            <div className="flex flex-col sm:flex-row gap-3">
              <div className="relative flex-1">
                <Search className="w-5 h-5 absolute left-4 top-1/2 -translate-y-1/2 text-sky-400" />
                <input
                  type="text"
                  required
                  placeholder="e.g., U2767/001 or U0001/001"
                  value={indexNumberInput}
                  onChange={(e) => setIndexNumberInput(e.target.value)}
                  className="w-full pl-12 pr-4 py-3.5 rounded-2xl glass-input text-sm font-mono tracking-wider font-bold text-white border-white/20 focus:border-sky-400 uppercase"
                />
              </div>

              <button
                type="submit"
                disabled={isSearching}
                className="px-8 py-3.5 rounded-2xl bg-gradient-to-r from-sky-400 via-blue-500 to-sky-600 text-slate-950 font-extrabold text-sm shadow-xl hover:shadow-sky-500/30 hover:scale-[1.02] active:scale-[0.98] disabled:opacity-50 transition-all flex items-center justify-center gap-2 min-h-[44px]"
              >
                {isSearching ? (
                  <>
                    <RefreshCw className="w-4 h-4 animate-spin" />
                    <span>Querying Firestore...</span>
                  </>
                ) : (
                  <>
                    <FileCheck className="w-4 h-4" />
                    <span>Check Results</span>
                  </>
                )}
              </button>
            </div>

            {/* Hint & Sample Indexes for Testing */}
            <div className="flex flex-wrap items-center gap-2 pt-1 text-[11px] text-gray-400">
              <span className="font-semibold text-gray-300">Sample Candidate Index Numbers:</span>
              {['U0001/001', 'U0001/002', 'U0001/003', 'U0001/010'].map((sample) => (
                <button
                  key={sample}
                  type="button"
                  onClick={() => {
                    setIndexNumberInput(sample);
                    setErrorMessage(null);
                  }}
                  className="px-2 py-0.5 rounded bg-white/5 border border-white/10 hover:border-sky-400/40 text-sky-300 font-mono transition-colors"
                >
                  {sample}
                </button>
              ))}
            </div>
          </form>

          {/* Friendly Error Message if Document Not Found */}
          {hasSearched && errorMessage && (
            <div className="mt-6 p-4 rounded-2xl bg-rose-500/15 border border-rose-500/30 text-rose-200 flex items-center gap-3 animate-in fade-in">
              <AlertCircle className="w-5 h-5 text-rose-400 shrink-0" />
              <div>
                <strong className="block text-xs font-bold text-rose-300">Lookup Notice</strong>
                <p className="text-xs">{errorMessage}</p>
              </div>
            </div>
          )}
        </div>

        {/* Report Card Style Results Display Table */}
        {queriedResult && (
          <div id="result-slip-container" className="glass-card rounded-3xl p-6 sm:p-8 border border-sky-400/30 shadow-2xl relative overflow-hidden bg-gradient-to-br from-[#07111F] via-[#10253C] to-[#07111F] animate-in fade-in slide-in-from-bottom-4 duration-300">
            
            {/* Report Header */}
            <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between border-b border-white/15 pb-6 gap-4">
              <div>
                <div className="flex items-center gap-2">
                  <span className="luxury-font text-2xl font-black text-white">NEXUS ACADEMY</span>
                  <span className="text-[10px] bg-sky-500/20 text-sky-300 px-2.5 py-0.5 rounded-full font-bold border border-sky-400/40">
                    OFFICIAL REPORT CARD
                  </span>
                </div>
                <p className="text-xs text-gray-300 mt-1 font-medium">Verified Examination Result Statement</p>
              </div>

              <button
                onClick={() => window.print()}
                className="flex items-center gap-1.5 px-4 py-2.5 rounded-xl bg-white/10 hover:bg-white/20 text-xs font-bold text-white transition-colors border border-white/10 hover:border-sky-400/30"
              >
                <Printer className="w-4 h-4 text-sky-400" />
                <span>Print Result Slip</span>
              </button>
            </div>

            {/* Candidate Metadata Grid */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 py-6 border-b border-white/15 text-xs">
              <div className="p-3 rounded-xl bg-white/5 border border-white/10">
                <span className="text-gray-400 block text-[10px] uppercase font-bold">Student Name</span>
                <strong className="text-white text-sm block mt-0.5">{queriedResult.studentName}</strong>
              </div>
              <div className="p-3 rounded-xl bg-white/5 border border-white/10">
                <span className="text-gray-400 block text-[10px] uppercase font-bold">Index Number</span>
                <strong className="text-sky-300 text-sm block font-mono mt-0.5">{queriedResult.indexNumber}</strong>
              </div>
              <div className="p-3 rounded-xl bg-white/5 border border-white/10">
                <span className="text-gray-400 block text-[10px] uppercase font-bold">Level & Year</span>
                <strong className="text-white text-sm block mt-0.5">{queriedResult.level} ({queriedResult.examYear})</strong>
              </div>
              <div className="p-3 rounded-xl bg-white/5 border border-white/10">
                <span className="text-gray-400 block text-[10px] uppercase font-bold">Division / Rank</span>
                <strong className="text-emerald-400 text-sm block mt-0.5">{queriedResult.divisionOrClass}</strong>
              </div>
            </div>

            {/* Subject Breakdown Table */}
            <div className="py-6 space-y-3">
              <div className="flex items-center justify-between">
                <h4 className="text-xs font-extrabold uppercase tracking-widest text-sky-300">
                  Subject Performance Breakdown
                </h4>
                <span className="text-gray-400 text-[10px] font-mono">Verified Grades</span>
              </div>

              <div className="overflow-x-auto rounded-2xl border border-white/10">
                <table className="w-full text-left text-xs">
                  <thead>
                    <tr className="bg-white/5 border-b border-white/10 text-sky-200 text-[10px] uppercase tracking-wider">
                      <th className="py-3 px-4">Subject Code</th>
                      <th className="py-3 px-4">Subject Title</th>
                      <th className="py-3 px-4 text-center">Grade Score</th>
                      <th className="py-3 px-4 text-right">Performance Remark</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-white/10 text-gray-200">
                    {queriedResult.subjects.map((subj, i) => (
                      <tr key={i} className="hover:bg-white/5 transition-colors">
                        <td className="py-3.5 px-4 font-mono text-sky-300 font-bold">{subj.code}</td>
                        <td className="py-3.5 px-4 font-bold text-white">{subj.name}</td>
                        <td className="py-3.5 px-4 text-center">
                          <span className="px-3 py-1 rounded-lg bg-sky-500/20 border border-sky-400/40 text-sky-300 font-black font-mono text-sm">
                            {subj.grade}
                          </span>
                        </td>
                        <td className="py-3.5 px-4 text-right font-semibold text-emerald-300">{subj.scoreName}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>

            {/* Total Aggregates & Remarks Footer */}
            <div className="p-4 rounded-2xl bg-white/5 border border-white/10 flex flex-col sm:flex-row items-center justify-between gap-3 text-xs">
              <div>
                <span className="text-gray-400 block text-[10px] uppercase font-bold">Total Score Aggregates / Points</span>
                <strong className="text-lg font-black text-sky-300">{queriedResult.aggregatesOrPoints}</strong>
              </div>

              <div className="text-right sm:text-right text-gray-300 italic">
                "{queriedResult.headteacherRemark}"
              </div>
            </div>

          </div>
        )}

      </div>
    </div>
  );
};
