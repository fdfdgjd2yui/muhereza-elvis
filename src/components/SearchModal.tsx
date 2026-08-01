import React, { useState } from 'react';
import { 
  Search, 
  X, 
  ArrowRight, 
  BookOpen, 
  Users, 
  Calendar, 
  FileCheck, 
  GraduationCap, 
  Sparkles, 
  Award, 
  PhoneCall, 
  Lock,
  Compass,
  ShieldCheck,
  HelpCircle,
  Newspaper
} from 'lucide-react';
import { PROGRAMS, TEACHERS, UPCOMING_EVENTS, NEWS_ARTICLES } from '../data/schoolData';

interface SearchModalProps {
  isOpen: boolean;
  onClose: () => void;
  onNavigateToSection: (id: string) => void;
  onOpenResultsPage: () => void;
}

interface SectionSearchItem {
  id: string;
  title: string;
  subtitle: string;
  category: string;
  keywords: string[];
  icon: React.ElementType;
  action: 'section' | 'results';
}

const PUBLIC_WEBSITE_SECTIONS: SectionSearchItem[] = [
  {
    id: 'why-nexus',
    title: 'About Us & Vision',
    subtitle: 'Learn about Nexus Academy vision, STEM focus, & mission',
    category: 'About Us',
    keywords: ['about', 'about us', 'vision', 'mission', 'why nexus', 'choose', 'values', 'history', 'overview'],
    icon: Sparkles,
    action: 'section'
  },
  {
    id: 'programs',
    title: 'Academic Programs (O & A Level)',
    subtitle: 'Explore UCE & UACE subject combinations and curriculum',
    category: 'Academics',
    keywords: ['academics', 'programs', 'courses', 'uce', 'uace', 'o level', 'a level', 'curriculum', 'subjects', 'senior 4', 'senior 6'],
    icon: BookOpen,
    action: 'section'
  },
  {
    id: 'academic-excellence',
    title: 'Academic Excellence Roadmap',
    subtitle: 'National distinction pathways and UNEB preparation',
    category: 'Academics',
    keywords: ['excellence', 'roadmap', 'uneb pathway', 'performance', 'distinctions', 'grades'],
    icon: GraduationCap,
    action: 'section'
  },
  {
    id: 'teachers',
    title: 'Faculty & Educator Directory',
    subtitle: 'Meet our master teaching staff and department heads',
    category: 'About Us',
    keywords: ['teachers', 'faculty', 'educators', 'staff', 'mentors', 'instructors', 'tutors'],
    icon: Users,
    action: 'section'
  },
  {
    id: 'student-life',
    title: 'Student Life & Campus Gallery',
    subtitle: 'Sports, robotics labs, arts, music, and co-curricular clubs',
    category: 'Gallery',
    keywords: ['gallery', 'student life', 'campus life', 'sports', 'robotics', 'arts', 'clubs', 'photos', 'facilities', 'life'],
    icon: Compass,
    action: 'section'
  },
  {
    id: 'admissions-process',
    title: 'Admissions & Entry Process',
    subtitle: 'Step-by-step application guide, requirements, & enrollment',
    category: 'Admissions',
    keywords: ['admission', 'admissions', 'apply', 'entry', 'enrolment', 'application', 'join', 'register', 'requirements'],
    icon: Award,
    action: 'section'
  },
  {
    id: 'events',
    title: 'Upcoming Campus Events & Expos',
    subtitle: 'Science expos, open days, parents galas, and sports expos',
    category: 'Events',
    keywords: ['events', 'calendar', 'expo', 'open day', 'gala', 'exhibition', 'schedule', 'upcoming'],
    icon: Calendar,
    action: 'section'
  },
  {
    id: 'news',
    title: 'News & Achievements',
    subtitle: 'Latest campus news, academic accolades, & official press',
    category: 'News',
    keywords: ['news', 'announcements', 'updates', 'press', 'achievements', 'blog', 'articles'],
    icon: Newspaper,
    action: 'section'
  },
  {
    id: 'faq',
    title: 'Frequently Asked Questions (FAQ)',
    subtitle: 'School fees structure, boarding rules, and scholarships',
    category: 'Admissions',
    keywords: ['faq', 'questions', 'fees', 'boarding', 'scholarships', 'tuition', 'help', 'answers'],
    icon: HelpCircle,
    action: 'section'
  },
  {
    id: 'contact',
    title: 'Contact Us & Campus Location Map',
    subtitle: 'Campus location, directions, phone numbers, and email forms',
    category: 'Contact Us',
    keywords: ['contact', 'contact us', 'location', 'map', 'directions', 'phone', 'email', 'address', 'inquiry', 'reach us'],
    icon: PhoneCall,
    action: 'section'
  },
  {
    id: 'results',
    title: 'UNEB Examination Results Portal Page',
    subtitle: 'Dedicated portal for official UCE/UACE grade lookup',
    category: 'Portal',
    keywords: ['results', 'portal', 'uneb results', 'grades', 'exam results', 'results portal', 'check results', 'report card'],
    icon: FileCheck,
    action: 'results'
  }
];

export const SearchModal: React.FC<SearchModalProps> = ({
  isOpen,
  onClose,
  onNavigateToSection,
  onOpenResultsPage
}) => {
  const [query, setQuery] = useState('');

  if (!isOpen) return null;

  const cleanQuery = query.trim().toLowerCase();

  // Search section matches
  const matchedSections = PUBLIC_WEBSITE_SECTIONS.filter((sec) => {
    if (!cleanQuery) return true;
    const inTitle = sec.title.toLowerCase().includes(cleanQuery);
    const inSubtitle = sec.subtitle.toLowerCase().includes(cleanQuery);
    const inCategory = sec.category.toLowerCase().includes(cleanQuery);
    const inKeywords = sec.keywords.some(
      (k) => k.includes(cleanQuery) || cleanQuery.includes(k)
    );
    return inTitle || inSubtitle || inCategory || inKeywords;
  });

  // Search public curriculum / teachers / events matches
  const matchedPrograms = cleanQuery
    ? PROGRAMS.filter(
        (p) =>
          p.title.toLowerCase().includes(cleanQuery) ||
          p.code.toLowerCase().includes(cleanQuery)
      )
    : [];

  const matchedTeachers = cleanQuery
    ? TEACHERS.filter(
        (t) =>
          t.name.toLowerCase().includes(cleanQuery) ||
          t.subject.toLowerCase().includes(cleanQuery)
      )
    : [];

  const matchedEvents = cleanQuery
    ? UPCOMING_EVENTS.filter((e) =>
        e.title.toLowerCase().includes(cleanQuery)
      )
    : [];

  const handleSelectSection = (item: SectionSearchItem) => {
    onClose();
    if (item.action === 'results') {
      onOpenResultsPage();
    } else {
      onNavigateToSection(item.id);
    }
  };

  const handleFormSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!cleanQuery) return;

    // Pick top matching section or fallback
    if (matchedSections.length > 0) {
      handleSelectSection(matchedSections[0]);
    } else if (matchedPrograms.length > 0) {
      onClose();
      onNavigateToSection('programs');
    } else if (matchedTeachers.length > 0) {
      onClose();
      onNavigateToSection('teachers');
    } else if (matchedEvents.length > 0) {
      onClose();
      onNavigateToSection('events');
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-start justify-center pt-16 p-4 bg-slate-900/40 backdrop-blur-sm animate-in fade-in duration-200">
      <div className="bg-white w-full max-w-2xl rounded-3xl p-6 border border-slate-200 shadow-2xl relative text-slate-900">
        
        {/* Search Header Form */}
        <form onSubmit={handleFormSubmit} className="flex items-center gap-3 border-b border-slate-200 pb-4">
          <Search className="w-5 h-5 text-sky-600" />
          <input
            type="text"
            autoFocus
            placeholder="Search website: 'About', 'Admissions', 'Gallery', 'Events', 'Contact Us'..."
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            className="w-full bg-transparent text-slate-900 text-sm focus:outline-none placeholder-slate-400"
          />
          {query && (
            <button
              type="button"
              onClick={() => setQuery('')}
              className="text-xs text-slate-400 hover:text-slate-600 px-2 py-1"
            >
              Clear
            </button>
          )}
          <button
            type="button"
            onClick={onClose}
            className="p-2 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-700 transition-colors"
          >
            <X className="w-4 h-4" />
          </button>
        </form>

        {/* Quick Suggestion Chips when query is short */}
        {!cleanQuery && (
          <div className="mt-4 pb-2">
            <p className="text-[10px] font-bold text-slate-400 uppercase tracking-wider mb-2">
              Popular Website Sections
            </p>
            <div className="flex flex-wrap gap-1.5">
              {[
                { label: 'About Us', id: 'why-nexus' },
                { label: 'Admissions', id: 'admissions-process' },
                { label: 'Campus Gallery', id: 'student-life' },
                { label: 'Upcoming Events', id: 'events' },
                { label: 'Contact Us', id: 'contact' },
                { label: 'Academic Programs', id: 'programs' },
                { label: 'Results Portal', id: 'results', isResults: true }
              ].map((chip) => (
                <button
                  key={chip.id}
                  type="button"
                  onClick={() => {
                    onClose();
                    if (chip.isResults) {
                      onOpenResultsPage();
                    } else {
                      onNavigateToSection(chip.id);
                    }
                  }}
                  className="px-3 py-1.5 rounded-xl bg-slate-100 hover:bg-sky-100 border border-slate-200 hover:border-sky-300 text-xs text-slate-700 font-medium transition-all"
                >
                  {chip.label} →
                </button>
              ))}
            </div>
          </div>
        )}

        {/* Search Results Display */}
        <div className="mt-4 space-y-4 max-h-96 overflow-y-auto pr-1 text-xs">
          {/* Main Website Sections */}
          {matchedSections.length > 0 && (
            <div className="space-y-1.5">
              <p className="text-[10px] font-bold text-sky-800 uppercase tracking-wider">
                Public Website Pages & Sections
              </p>
              {matchedSections.map((sec) => {
                const Icon = sec.icon;
                return (
                  <button
                    key={sec.id}
                    type="button"
                    onClick={() => handleSelectSection(sec)}
                    className="w-full flex items-center justify-between p-3 rounded-2xl hover:bg-slate-50 border border-slate-100 hover:border-slate-200 transition-all text-left group"
                  >
                    <div className="flex items-center gap-3">
                      <div className="p-2 rounded-xl bg-sky-50 border border-sky-200 text-sky-700 group-hover:scale-105 transition-transform">
                        <Icon className="w-4 h-4" />
                      </div>
                      <div>
                        <div className="font-bold text-[#0B1A30] text-sm group-hover:text-sky-800 transition-colors flex items-center gap-2">
                          {sec.title}
                          <span className="text-[10px] px-2 py-0.5 rounded bg-slate-100 text-slate-600 font-mono">
                            {sec.category}
                          </span>
                        </div>
                        <div className="text-xs text-slate-500 line-clamp-1">{sec.subtitle}</div>
                      </div>
                    </div>
                    <ArrowRight className="w-4 h-4 text-slate-400 group-hover:text-sky-700 group-hover:translate-x-1 transition-all shrink-0" />
                  </button>
                );
              })}
            </div>
          )}

          {/* Academic Courses */}
          {matchedPrograms.length > 0 && (
            <div className="space-y-1 mt-3">
              <p className="text-[10px] font-bold text-blue-700 uppercase tracking-wider">
                Matching Academic Subjects
              </p>
              {matchedPrograms.map((p) => (
                <button
                  key={p.id}
                  type="button"
                  onClick={() => {
                    onClose();
                    onNavigateToSection('programs');
                  }}
                  className="w-full flex items-center justify-between p-2.5 rounded-xl hover:bg-slate-50 text-left text-slate-800 border border-slate-100"
                >
                  <span className="font-medium text-xs">{p.title} ({p.code})</span>
                  <span className="text-xs text-sky-700 font-semibold">View Programs Section →</span>
                </button>
              ))}
            </div>
          )}

          {/* Faculty Educators */}
          {matchedTeachers.length > 0 && (
            <div className="space-y-1 mt-3">
              <p className="text-[10px] font-bold text-emerald-700 uppercase tracking-wider">
                Matching Teachers & Mentors
              </p>
              {matchedTeachers.map((t) => (
                <button
                  key={t.id}
                  type="button"
                  onClick={() => {
                    onClose();
                    onNavigateToSection('teachers');
                  }}
                  className="w-full flex items-center justify-between p-2.5 rounded-xl hover:bg-slate-50 text-left text-slate-800 border border-slate-100"
                >
                  <span className="font-medium text-xs">{t.name} - {t.subject}</span>
                  <span className="text-xs text-emerald-700 font-semibold">View Faculty Section →</span>
                </button>
              ))}
            </div>
          )}

          {/* Events */}
          {matchedEvents.length > 0 && (
            <div className="space-y-1 mt-3">
              <p className="text-[10px] font-bold text-cyan-700 uppercase tracking-wider">
                Matching Campus Events
              </p>
              {matchedEvents.map((e) => (
                <button
                  key={e.id}
                  type="button"
                  onClick={() => {
                    onClose();
                    onNavigateToSection('events');
                  }}
                  className="w-full flex items-center justify-between p-2.5 rounded-xl hover:bg-slate-50 text-left text-slate-800 border border-slate-100"
                >
                  <span className="font-medium text-xs">{e.title}</span>
                  <span className="text-xs text-cyan-700 font-semibold">View Events Section →</span>
                </button>
              ))}
            </div>
          )}

          {cleanQuery && matchedSections.length === 0 && matchedPrograms.length === 0 && matchedTeachers.length === 0 && (
            <div className="p-6 text-center text-xs text-slate-500 bg-slate-50 rounded-2xl border border-slate-200">
              No public website section matched "{query}". Try searching for 'About', 'Admissions', 'Gallery', 'Events', 'Contact Us', or 'Academics'.
            </div>
          )}
        </div>

        {/* Security Privacy Footer Note */}
        <div className="mt-4 pt-3 border-t border-slate-200 flex items-center gap-2.5 text-[11px] text-slate-600 bg-sky-50 p-3 rounded-2xl border border-sky-200">
          <ShieldCheck className="w-4 h-4 text-sky-700 shrink-0" />
          <div>
            <span className="font-bold text-sky-900">Student Privacy Notice: </span>
            For security, individual examination results can only be queried on the dedicated{' '}
            <button
              type="button"
              onClick={() => {
                onClose();
                onOpenResultsPage();
              }}
              className="text-sky-800 underline font-bold hover:text-sky-950"
            >
              Results Portal
            </button>{' '}
            using a candidate's secret Index Number.
          </div>
        </div>

      </div>
    </div>
  );
};

