import React, { useState, useMemo } from 'react';
import { INITIAL_STUDENT_RESULTS } from '../data/schoolData';
import { StudentResult } from '../types';
import { getStudentFromFirestore, getStudentIndexNumber } from '../lib/firebase';
import { Search, AlertCircle, RefreshCw, Award, BookOpen, GraduationCap, Shield, Printer, CheckCircle2, FileText } from 'lucide-react';

interface ResultsPortalPageProps {
  studentResults?: StudentResult[];
  onOpenAdminModal?: () => void;
}

export type ExamCategory = 'all' | 'uneb' | 'mock';
export type AcademicLevel = 'all' | 'o-level' | 'a-level';

export const ResultsPortalPage: React.FC<ResultsPortalPageProps> = ({
  studentResults: externalResults
}) => {
  const [activeCategory, setActiveCategory] = useState<ExamCategory>('uneb');
  const [activeLevel, setActiveLevel] = useState<AcademicLevel>('all');
  const [indexNumberInput, setIndexNumberInput] = useState('');
  const [isSearching, setIsSearching] = useState(false);
  const [queriedResult, setQueriedResult] = useState<StudentResult | null>(null);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [hasSearched, setHasSearched] = useState(false);

  const allResults = externalResults && externalResults.length > 0 ? externalResults : INITIAL_STUDENT_RESULTS;

  // Detect Level from result object
  const detectLevel = (student: StudentResult): 'O-Level' | 'A-Level' => {
    if (!student) return 'O-Level';
    const lvl = (student.level || student.Level || '').toLowerCase();
    if (lvl.includes('a-level') || lvl.includes('uace') || lvl.includes('advanced')) return 'A-Level';
    if (lvl.includes('o-level') || lvl.includes('uce') || lvl.includes('ordinary')) return 'O-Level';
    
    // Check keys or combination
    const sKeys = Object.keys(student).map(k => k.toLowerCase());
    if (sKeys.includes('combination') || sKeys.includes('total points') || sKeys.includes('totalpoints') || sKeys.includes('sub ict') || sKeys.includes('general paper')) {
      return 'A-Level';
    }
    const idx = getStudentIndexNumber(student).toUpperCase();
    if (idx.includes('/5') || idx.includes('UACE')) return 'A-Level';
    return 'O-Level';
  };

  // Detect Exam Type (UNEB vs Mock) from result object
  const detectExamType = (student: StudentResult): 'UNEB' | 'Mock' => {
    if (!student) return 'UNEB';
    const type = (student['exam type'] || student.examType || student.type || '').toLowerCase();
    if (type.includes('mock')) return 'Mock';
    const idx = getStudentIndexNumber(student).toUpperCase();
    if (idx.includes('MOCK')) return 'Mock';
    return 'UNEB';
  };

  // Sample quick test candidate IDs based on currently active tabs
  const sampleIndices = useMemo(() => {
    const samples = [
      { id: 'U0001/001', label: 'U0001/001 (O-Level UNEB)', cat: 'uneb', lvl: 'o-level' },
      { id: 'U0001/501', label: 'U0001/501 (A-Level UNEB)', cat: 'uneb', lvl: 'a-level' },
      { id: 'MOCK/UCE/001', label: 'MOCK/UCE/001 (O-Level Mock)', cat: 'mock', lvl: 'o-level' },
      { id: 'MOCK/UACE/501', label: 'MOCK/UACE/501 (A-Level Mock)', cat: 'mock', lvl: 'a-level' }
    ];

    if (activeCategory === 'uneb') {
      if (activeLevel === 'o-level') return samples.filter(s => s.cat === 'uneb' && s.lvl === 'o-level');
      if (activeLevel === 'a-level') return samples.filter(s => s.cat === 'uneb' && s.lvl === 'a-level');
      return samples.filter(s => s.cat === 'uneb');
    }

    if (activeCategory === 'mock') {
      if (activeLevel === 'o-level') return samples.filter(s => s.cat === 'mock' && s.lvl === 'o-level');
      if (activeLevel === 'a-level') return samples.filter(s => s.cat === 'mock' && s.lvl === 'a-level');
      return samples.filter(s => s.cat === 'mock');
    }

    return samples;
  }, [activeCategory, activeLevel]);

  const handleCheckResults = async (e?: React.FormEvent, customIndex?: string) => {
    if (e) e.preventDefault();
    const searchTarget = (customIndex !== undefined ? customIndex : indexNumberInput).trim().toUpperCase();
    const normalizedIndex = searchTarget.replace(/[\s/]/g, '');

    if (!searchTarget) {
      setErrorMessage('Please enter a candidate index number (e.g. U0001/001 or U0001/501).');
      setQueriedResult(null);
      setHasSearched(true);
      return;
    }

    setIsSearching(true);
    setErrorMessage(null);
    setQueriedResult(null);
    setHasSearched(true);

    try {
      await new Promise((resolve) => setTimeout(resolve, 400));

      // 1. Check in local allResults first
      const matchedLocal = allResults.find((s: any) => {
        const sIdx = getStudentIndexNumber(s);
        const sNorm = sIdx.replace(/[\s/]/g, '');
        return sIdx === searchTarget || sNorm === normalizedIndex;
      });

      if (matchedLocal) {
        setQueriedResult(matchedLocal);
        return;
      }

      // 2. Fallback check in Cloud Firestore
      const firestoreResult = await getStudentFromFirestore(searchTarget);
      if (firestoreResult) {
        setQueriedResult(firestoreResult);
        return;
      }

      // 3. Not found
      setErrorMessage(`No examination record found matching index "${searchTarget}". Please verify the index number.`);
    } catch {
      setErrorMessage(`Error querying index "${searchTarget}". Please try again.`);
    } finally {
      setIsSearching(false);
    }
  };

  const handleQuickLookup = (idx: string) => {
    setIndexNumberInput(idx);
    handleCheckResults(undefined, idx);
  };

  // Helper to extract non-metadata subject columns from student object
  const getSubjectEntries = (result: StudentResult) => {
    if (!result) return [];
    const EXCLUDED = new Set([
      'index number', 'indexnumber', 'index_number', 'index', 'id',
      'name', 'fullname', 'student_name', 'candidate_name',
      'gender', 'sex', 'age',
      'level', 'examtype', 'exam type', 'year', 'exam year',
      'stream', 'combination',
      'aggregates', 'division', 'total points', 'totalpoints', 'grade class', 'gradeclass',
      'updatedat', 'createdat', 'verifiedstatus'
    ]);

    return Object.entries(result).filter(([k]) => {
      const lk = k.toLowerCase().replace(/[\s_-]/g, '');
      return !EXCLUDED.has(lk);
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

  const printResultSlip = () => {
    window.print();
  };

  const candidateLevel = queriedResult ? detectLevel(queriedResult) : null;
  const candidateExamType = queriedResult ? detectExamType(queriedResult) : null;
  const candidateIndex = queriedResult ? getStudentIndexNumber(queriedResult) : '';
  const candidateName = queriedResult ? (queriedResult.name || queriedResult.Name || 'Candidate') : '';
  const candidateYear = queriedResult ? (queriedResult.year || queriedResult.Year || '2025/2026') : '2025/2026';
  const candidateCombination = queriedResult ? (queriedResult.combination || queriedResult.stream || queriedResult.Combination || queriedResult.Stream || '') : '';
  const candidateScoreSummary = queriedResult ? (
    queriedResult['total points'] || queriedResult['totalpoints'] ||
    queriedResult.aggregates || queriedResult.Aggregates ||
    queriedResult.division || queriedResult.Division ||
    queriedResult['grade class'] || queriedResult['gradeclass'] || ''
  ) : '';

  return (
    <div id="results-portal" className="bg-slate-50 min-h-screen py-10 px-4 sm:px-6 lg:px-8 text-slate-900">
      <div className="max-w-4xl mx-auto space-y-8">
        
        {/* Main Portal Header */}
        <div className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-200 shadow-sm text-center space-y-3">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-sky-100 border border-sky-300 text-sky-900 text-xs font-bold uppercase tracking-widest">
            <GraduationCap className="w-4 h-4 text-sky-700" />
            Nexus Academy Academic Examination Center
          </div>

          <h2 className="text-2xl sm:text-4xl font-extrabold text-[#0B1A30] heading-font">
            Candidate Examination Results Portal
          </h2>

          <p className="text-sm sm:text-base text-slate-600 max-w-2xl mx-auto">
            Search, verify, and print official candidate score sheets for National UNEB examinations and internal Joint Mock examinations.
          </p>

          {/* Top Level Category Selector (UNEB vs Mocks) */}
          <div className="pt-4 flex flex-wrap items-center justify-center gap-3">
            <button
              type="button"
              onClick={() => {
                setActiveCategory('uneb');
                setQueriedResult(null);
                setErrorMessage(null);
              }}
              className={`px-5 py-2.5 rounded-2xl text-xs font-bold transition-all flex items-center gap-2 border ${
                activeCategory === 'uneb'
                  ? 'bg-[#0B1A30] text-white border-[#0B1A30] shadow-md'
                  : 'bg-white text-slate-700 border-slate-200 hover:bg-slate-100'
              }`}
            >
              <Award className="w-4 h-4 text-amber-400" />
              <span>UNEB National Final Examinations</span>
            </button>

            <button
              type="button"
              onClick={() => {
                setActiveCategory('mock');
                setQueriedResult(null);
                setErrorMessage(null);
              }}
              className={`px-5 py-2.5 rounded-2xl text-xs font-bold transition-all flex items-center gap-2 border ${
                activeCategory === 'mock'
                  ? 'bg-[#0B1A30] text-white border-[#0B1A30] shadow-md'
                  : 'bg-white text-slate-700 border-slate-200 hover:bg-slate-100'
              }`}
            >
              <FileText className="w-4 h-4 text-sky-400" />
              <span>Joint Mock Examinations</span>
            </button>
          </div>

          {/* Academic Level Selector (O-Level UCE vs A-Level UACE) */}
          <div className="pt-2 flex items-center justify-center gap-2">
            <span className="text-xs font-semibold text-slate-500 mr-1">Level:</span>
            <button
              type="button"
              onClick={() => setActiveLevel('all')}
              className={`px-3 py-1 rounded-xl text-xs font-bold transition-all border ${
                activeLevel === 'all'
                  ? 'bg-sky-700 text-white border-sky-700'
                  : 'bg-white text-slate-600 border-slate-200 hover:bg-slate-50'
              }`}
            >
              All Levels
            </button>
            <button
              type="button"
              onClick={() => setActiveLevel('o-level')}
              className={`px-3 py-1 rounded-xl text-xs font-bold transition-all border ${
                activeLevel === 'o-level'
                  ? 'bg-sky-700 text-white border-sky-700'
                  : 'bg-white text-slate-600 border-slate-200 hover:bg-slate-50'
              }`}
            >
              O-Level (UCE)
            </button>
            <button
              type="button"
              onClick={() => setActiveLevel('a-level')}
              className={`px-3 py-1 rounded-xl text-xs font-bold transition-all border ${
                activeLevel === 'a-level'
                  ? 'bg-sky-700 text-white border-sky-700'
                  : 'bg-white text-slate-600 border-slate-200 hover:bg-slate-50'
              }`}
            >
              A-Level (UACE)
            </button>
          </div>
        </div>

        {/* Search Box Card */}
        <div className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-200 shadow-sm space-y-4">
          <div className="flex items-center justify-between border-b border-slate-100 pb-3">
            <div className="flex items-center gap-2">
              <Shield className="w-5 h-5 text-sky-700" />
              <h3 className="text-base font-bold text-[#0B1A30]">
                {activeCategory === 'uneb' ? 'UNEB Candidate Verification' : 'Joint Mock Examination Verification'}
              </h3>
            </div>
            <span className="text-[11px] font-bold uppercase tracking-wider text-slate-500 bg-slate-100 px-2.5 py-1 rounded-full">
              {activeLevel === 'all' ? 'All Academic Levels' : activeLevel === 'o-level' ? 'O-Level (UCE)' : 'A-Level (UACE)'}
            </span>
          </div>

          <form onSubmit={(e) => handleCheckResults(e)} className="space-y-4">
            <div>
              <label htmlFor="candidate-index-input" className="block text-xs font-bold text-[#0B1A30] uppercase mb-1.5">
                Candidate Index Number
              </label>
              <div className="flex flex-col sm:flex-row gap-2">
                <div className="relative flex-1">
                  <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
                  <input
                    id="candidate-index-input"
                    type="text"
                    required
                    placeholder={
                      activeCategory === 'mock'
                        ? (activeLevel === 'a-level' ? 'e.g. MOCK/UACE/501' : 'e.g. MOCK/UCE/001')
                        : (activeLevel === 'a-level' ? 'e.g. U0001/501' : 'e.g. U0001/001')
                    }
                    value={indexNumberInput}
                    onChange={(e) => setIndexNumberInput(e.target.value)}
                    className="w-full pl-10 pr-4 py-3 border border-slate-300 rounded-2xl font-mono text-sm text-slate-900 uppercase focus:outline-none focus:border-[#0B1A30] shadow-sm"
                  />
                </div>

                <button
                  type="submit"
                  disabled={isSearching}
                  className="px-6 py-3 bg-[#0B1A30] text-white font-bold text-xs rounded-2xl hover:bg-slate-800 transition-all flex items-center justify-center gap-2 disabled:opacity-50 shadow-md active:scale-95"
                >
                  {isSearching ? <RefreshCw className="w-4 h-4 animate-spin" /> : <Search className="w-4 h-4" />}
                  <span>Verify Score Sheet</span>
                </button>
              </div>
            </div>
          </form>

          {/* Quick Click Sample Index Helpers */}
          {sampleIndices.length > 0 && (
            <div className="pt-2 border-t border-slate-100 flex flex-wrap items-center gap-2">
              <span className="text-[11px] font-semibold text-slate-400">Quick Test Candidates:</span>
              {sampleIndices.map((sample) => (
                <button
                  key={sample.id}
                  type="button"
                  onClick={() => handleQuickLookup(sample.id)}
                  className="px-2.5 py-1 rounded-xl bg-slate-100 hover:bg-sky-50 text-slate-700 hover:text-sky-800 text-[11px] font-mono font-bold border border-slate-200 transition-colors"
                >
                  {sample.label}
                </button>
              ))}
            </div>
          )}

          {/* Searching Loader Indicator */}
          {isSearching && (
            <div className="p-4 bg-sky-50 border border-sky-200 rounded-2xl flex items-center gap-3 text-xs font-semibold text-sky-900 animate-pulse">
              <RefreshCw className="w-4 h-4 text-sky-700 animate-spin shrink-0" />
              <span>Verifying examination score records with Nexus database...</span>
            </div>
          )}

          {/* Error Banner */}
          {hasSearched && !isSearching && errorMessage && (
            <div className="p-4 bg-red-50 border border-red-300 text-red-800 rounded-2xl text-xs font-semibold flex items-center gap-2.5">
              <AlertCircle className="w-4 h-4 text-red-600 shrink-0" />
              <span>{errorMessage}</span>
            </div>
          )}
        </div>

        {/* CANDIDATE RESULT SLIP DISPLAY */}
        {!isSearching && queriedResult && (
          <div className="bg-white rounded-3xl border-2 border-slate-300 shadow-xl overflow-hidden animate-in fade-in duration-200">
            
            {/* Header Banner */}
            <div className="bg-[#0B1A30] p-6 text-white flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
              <div>
                <div className="flex items-center gap-2 mb-1">
                  <span className="px-3 py-1 rounded-full bg-amber-400 text-slate-950 text-[10px] font-black uppercase tracking-wider">
                    {candidateExamType === 'Mock' ? 'Nexus Joint Mock Examination' : 'Official UNEB Examination'}
                  </span>
                  <span className="px-3 py-1 rounded-full bg-sky-500/30 border border-sky-400/40 text-sky-200 text-[10px] font-bold uppercase">
                    {candidateLevel}
                  </span>
                </div>
                <h3 className="text-xl font-bold text-white heading-font">
                  Nexus Academy — Candidate Result Slip
                </h3>
                <p className="text-xs text-slate-300">
                  Examination Academic Session: {candidateYear}
                </p>
              </div>

              <button
                type="button"
                onClick={printResultSlip}
                className="px-4 py-2 rounded-xl bg-white/10 hover:bg-white/20 border border-white/20 text-white text-xs font-bold transition-all flex items-center gap-2 shadow-sm"
              >
                <Printer className="w-4 h-4" />
                <span>Print Result Slip</span>
              </button>
            </div>

            {/* Candidate Metadata Summary */}
            <div className="p-6 bg-slate-50/70 border-b border-slate-200 grid grid-cols-2 sm:grid-cols-4 gap-4 text-xs">
              <div>
                <span className="text-slate-400 block text-[10px] uppercase font-bold">Candidate Name</span>
                <span className="font-bold text-[#0B1A30] text-sm uppercase">{candidateName}</span>
              </div>

              <div>
                <span className="text-slate-400 block text-[10px] uppercase font-bold">Index Number</span>
                <span className="font-mono font-bold text-sky-800 text-sm uppercase">{candidateIndex}</span>
              </div>

              <div>
                <span className="text-slate-400 block text-[10px] uppercase font-bold">Academic Level</span>
                <span className="font-bold text-slate-800">{candidateLevel === 'A-Level' ? 'A-Level (UACE)' : 'O-Level (UCE)'}</span>
                {candidateCombination && (
                  <span className="text-[10px] text-slate-500 block font-mono">{candidateCombination}</span>
                )}
              </div>

              <div>
                <span className="text-slate-400 block text-[10px] uppercase font-bold">Summary Standing</span>
                <span className="font-extrabold text-emerald-700 text-sm">{candidateScoreSummary || 'Division 1'}</span>
              </div>
            </div>

            {/* Subject Score Breakdown */}
            <div className="p-6 space-y-4">
              <div className="flex items-center justify-between">
                <h4 className="text-xs font-bold text-[#0B1A30] uppercase tracking-wider">
                  Subject Performance Breakdown
                </h4>
                <span className="text-[11px] text-slate-500 font-medium">
                  {getSubjectEntries(queriedResult).length} Examination Subjects Recorded
                </span>
              </div>

              <div className="overflow-x-auto border border-slate-200 rounded-2xl">
                <table className="w-full text-left text-xs">
                  <thead className="bg-slate-100 text-slate-800 font-bold border-b border-slate-200">
                    <tr>
                      <th className="p-3 border-r border-slate-200">#</th>
                      <th className="p-3 border-r border-slate-200">Subject Name</th>
                      <th className="p-3 border-r border-slate-200">Grade / Score</th>
                      <th className="p-3">Performance Remark</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-200">
                    {getSubjectEntries(queriedResult).map(([subjectKey, scoreVal], idx) => {
                      const displayScore = scoreVal !== undefined && scoreVal !== null && scoreVal !== '' ? String(scoreVal) : '-';
                      const strLower = displayScore.toLowerCase();
                      const isDistinction = strLower.includes('d1') || strLower.includes('a ') || strLower.includes('6 pts') || strLower.includes('9');
                      return (
                        <tr key={subjectKey} className="hover:bg-slate-50 transition-colors">
                          <td className="p-3 font-mono text-slate-400 font-bold border-r border-slate-200">{idx + 1}</td>
                          <td className="p-3 font-bold text-[#0B1A30] border-r border-slate-200">
                            {formatHeaderTitle(subjectKey)}
                          </td>
                          <td className="p-3 font-mono font-extrabold text-sky-900 border-r border-slate-200">
                            <span className={`px-2.5 py-1 rounded-lg ${isDistinction ? 'bg-emerald-50 text-emerald-800 border border-emerald-200' : 'bg-slate-100 text-slate-800'}`}>
                              {displayScore}
                            </span>
                          </td>
                          <td className="p-3 text-slate-600 font-medium">
                            {isDistinction ? (
                              <span className="inline-flex items-center gap-1 text-emerald-700 font-bold">
                                <CheckCircle2 className="w-3.5 h-3.5" /> Distinction Standard
                              </span>
                            ) : (
                              'Satisfactory Pass'
                            )}
                          </td>
                        </tr>
                      );
                    })}
                  </tbody>
                </table>
              </div>

              {/* Official Footer Notes */}
              <div className="pt-4 border-t border-slate-200 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 text-slate-500 text-[11px]">
                <div className="space-y-0.5">
                  <p className="font-semibold text-slate-700">Official Nexus Academy Academic Verification Desk</p>
                  <p>Results certified by the Office of the Academic Registrar & Examination Committee.</p>
                </div>
                <div className="p-2.5 rounded-xl bg-slate-100 border border-slate-200 text-right">
                  <span className="font-mono font-bold text-slate-800 block text-xs">OFFICIAL VERIFIED COPY</span>
                  <span className="text-[10px] text-slate-500">Nexus Academy Uganda</span>
                </div>
              </div>

            </div>

          </div>
        )}

        {/* Educational Program & Grading Overview Guide */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 pt-4">
          
          {/* O-Level (UCE) Overview Card */}
          <div className="bg-white rounded-3xl p-6 border border-slate-200 shadow-sm space-y-3">
            <div className="flex items-center gap-2">
              <div className="p-2 rounded-xl bg-amber-50 text-amber-800 border border-amber-200">
                <BookOpen className="w-5 h-5" />
              </div>
              <div>
                <h4 className="text-base font-bold text-[#0B1A30]">O-Level (UCE) System</h4>
                <p className="text-[11px] text-slate-500">Senior 1 to Senior 4 (UNEB & Mocks)</p>
              </div>
            </div>
            <p className="text-xs text-slate-600 leading-relaxed">
              Assesses 8 to 10 core subject disciplines using the national aggregate grading scale from Distinction 1 (D1) to Fail 9 (F9), qualifying candidates for Division 1 distinctions and direct entry into Senior 5 A-Level combinations.
            </p>
          </div>

          {/* A-Level (UACE) Overview Card */}
          <div className="bg-white rounded-3xl p-6 border border-slate-200 shadow-sm space-y-3">
            <div className="flex items-center gap-2">
              <div className="p-2 rounded-xl bg-sky-50 text-sky-800 border border-sky-200">
                <GraduationCap className="w-5 h-5" />
              </div>
              <div>
                <h4 className="text-base font-bold text-[#0B1A30]">A-Level (UACE) System</h4>
                <p className="text-[11px] text-slate-500">Senior 5 to Senior 6 (Pre-University Specialization)</p>
              </div>
            </div>
            <p className="text-xs text-slate-600 leading-relaxed">
              Assesses 3 principal subject disciplines (e.g. PCM, BCM, HEG) alongside subsidiary Mathematics/ICT and General Paper, scored on the national 20-Point scale for direct university admissions and government merit scholarships.
            </p>
          </div>

        </div>

      </div>
    </div>
  );
};
