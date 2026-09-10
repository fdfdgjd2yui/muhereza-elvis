export interface Metric {
  id: string;
  value: string;
  label: string;
  description: string;
  iconName: string;
}

export interface Program {
  id: string;
  title: string;
  code: string;
  tagline: string;
  description: string;
  duration: string;
  icon: string;
  highlights: string[];
  subjects: string[];
}

export interface Teacher {
  id: string;
  name: string;
  role: string;
  subject: string;
  qualification: string;
  experience: string;
  image: string;
  bio: string;
}

export interface FacilityImage {
  id: string;
  url: string;
  caption?: string;
  isMain?: boolean;
}

export interface FacilityItem {
  id: string;
  title: string;
  category?: string;
  subtitle?: string;
  images: FacilityImage[];
}

export interface GalleryItem {
  id: string;
  title: string;
  category: 'stem' | 'sports' | 'arts' | 'leadership' | 'campus';
  image: string;
  description: string;
}

export interface Testimonial {
  id: string;
  name: string;
  role: string;
  avatar: string;
  comment: string;
  rating: number;
  year: string;
}

export interface AdmissionStep {
  stepNumber: number;
  title: string;
  description: string;
  detail: string;
  icon: string;
}

export interface EventItem {
  id: string;
  title: string;
  date: string;
  time: string;
  location: string;
  category: string;
  image: string;
  description: string;
}

export interface NewsItem {
  id: string;
  title: string;
  description: string;
  date?: string;
  author?: string;
  category?: string;
  image?: string;
  summary?: string;
  content?: string;
}

export interface FaqItem {
  id: string;
  question: string;
  answer: string;
  category: string;
}

export interface SubjectResult {
  code: string;
  name: string;
  score?: number;
  grade: string;
  remark?: string;
  scoreName?: string;
}

export type StudentResult = Record<string, any>;

export interface GoogleSheetsConfig {
  sheetUrl: string;
  lastSynced: string;
  totalRecordsSynced: number;
  status: 'connected' | 'idle' | 'syncing' | 'error';
}
