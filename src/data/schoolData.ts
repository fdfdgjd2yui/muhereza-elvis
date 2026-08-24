import {
  Metric,
  Program,
  Teacher,
  GalleryItem,
  Testimonial,
  AdmissionStep,
  EventItem,
  NewsItem,
  FaqItem,
  StudentResult,
  GoogleSheetsConfig
} from '../types';

export const HERO_SLIDES = [
  {
    id: '1',
    image: '',
    title: "Building Tomorrow's Leaders",
    subtitle: 'Quality Education for Future Innovators and Leaders in Uganda',
    badge: 'Top Ranked Secondary Academy'
  },
  {
    id: '2',
    image: '',
    title: 'Science & ICT Innovation',
    subtitle: 'Equipped Science Labs, Computer Room and Digital Skills',
    badge: 'Modern Science & Tech Facilities'
  },
  {
    id: '3',
    image: '',
    title: 'Character, Sports & Culture',
    subtitle: 'Football, Netball, Music Dance Drama and Leadership Pathways',
    badge: 'National Inter-School Championship Standards'
  },
  {
    id: '4',
    image: '',
    title: 'Academic Pathways',
    subtitle: 'Direct Progression to Makerere, MUST, Kyambogo & Universities Worldwide',
    badge: 'High UNEB Division 1 Pass Rates'
  }
];

export const TRUSTED_METRICS: Metric[] = [
  {
    id: '1',
    value: '17+',
    label: 'Years of Excellence',
    description: 'Pioneering holistic secondary education since 2009',
    iconName: 'Award'
  },
  {
    id: '2',
    value: '94%',
    label: 'Division 1 Pass Rate',
    description: 'Consistently high distinction pass rates in UNEB UCE & UACE sittings',
    iconName: 'GraduationCap'
  },
  {
    id: '4',
    value: '45+',
    label: 'Qualified Educators',
    description: 'Seasoned graduate teachers & UNEB examiners with proven track records',
    iconName: 'UserCheck'
  }
];

export const WHY_NEXUS_FEATURES = [
  {
    id: '1',
    title: 'Academic Rigor & UNEB Prep',
    description: 'Structured continuous assessment, Saturday revision clinics, and comprehensive past paper coaching for UCE and UACE success.',
    icon: 'Award'
  },
  {
    id: '2',
    title: 'Spacious Classrooms',
    description: 'Well-ventilated, well-lit learning spaces equipped with digital projectors, comfortable desks, and interactive whiteboards.',
    icon: 'Monitor'
  },
  {
    id: '3',
    title: 'Science Laboratories',
    description: 'Fully equipped Physics, Chemistry, and Biology laboratories for hands-on UNEB practical examinations and scientific experiments.',
    icon: 'FlaskConical'
  },
  {
    id: '4',
    title: 'Well-Stocked Library & ICT Lab',
    description: 'Extensive physical text books, UNEB past papers collection, and a high-speed computer lab for student research.',
    icon: 'BookOpen'
  },
  {
    id: '5',
    title: 'Sports & Co-Curriculars',
    description: 'Standard grass sports pitch, basketball & netball courts, volleyball, and active Music, Dance & Drama (MDD) clubs.',
    icon: 'Trophy'
  },
  {
    id: '6',
    title: 'Holistic Boarding & Leadership',
    description: 'Clean dormitories, 24/7 security & house wardens, nutritious balanced meals, Scripture Union, and Student Council leadership.',
    icon: 'HeartHandshake'
  }
];

export const PROGRAMS: Program[] = [
  {
    id: 'o-level',
    title: 'O Level Program (UCE)',
    code: 'Uganda Certificate of Education (UNEB)',
    tagline: 'Foundational Academic Rigor & Character Formation (Senior 1 - Senior 4)',
    description: 'A comprehensive four-year curriculum based on the Revised Lower Secondary Curriculum by NCDC, fostering scientific inquiry, mathematical problem solving, ICT competence, and practical skills.',
    duration: '4 Years (S1 - S4)',
    icon: 'BookMarked',
    highlights: [
      'Comprehensive Core Sciences & Humanities',
      'Hands-on Science Practical Experiments in Labs',
      'ICT Computer Literacy & Projects',
      'UNEB UCE Examination Preparation & Revision Clinics'
    ],
    subjects: ['Mathematics', 'Physics', 'Chemistry', 'Biology', 'English Language', 'ICT & Computer Studies', 'Geography', 'History', 'Entrepreneurship', 'Kiswahili', 'Fine Art']
  },
  {
    id: 'a-level',
    title: 'A Level Program (UACE)',
    code: 'Uganda Advanced Certificate of Education (UNEB)',
    tagline: 'Specialized Pre-University Academic Excellence (Senior 5 - Senior 6)',
    description: 'Rigorous two-year specialization preparing scholars for top university degree programs in Medicine, Engineering, Law, Computing, Education, and Commerce.',
    duration: '2 Years (S5 - S6)',
    icon: 'GraduationCap',
    highlights: [
      'PCM, BCM, PEM, HEG, MEG, LEG & Arts Combinations',
      'Dedicated Science Practical Laboratories & Field Work',
      'Career Guidance & University Application Support (PUJO)',
      'High Government Sponsorship University Pass Rates'
    ],
    subjects: ['Physics (P)', 'Chemistry (C)', 'Mathematics (M)', 'Biology (B)', 'Economics (E)', 'Geography (G)', 'History (H)', 'Literature in English (L)', 'Sub-Math & General Paper']
  }
];

export const TEACHERS: Teacher[] = [
  {
    id: '1',
    name: 'Dr. Sarah Nabwire',
    role: 'Head of Science Department',
    subject: 'Advanced Physics & Applied Mathematics',
    qualification: 'M.Sc Physics (Makerere University), B.Sc Ed (Kyambogo)',
    experience: '16 Years Teaching Experience & UNEB Senior Examiner',
    image: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?q=80&w=800&auto=format&fit=crop',
    bio: 'Experienced physics educator who has guided hundreds of candidates to distinction Division 1 scores in UCE and UACE national examinations.'
  },
  {
    id: '2',
    name: 'Mr. David Okello',
    role: 'Dean of Academics & Mathematics Lead',
    subject: 'Pure & Applied Mathematics / Sub-Math',
    qualification: 'M.Ed Curriculum Studies (Makerere University), B.Sc Education',
    experience: '18 Years Teaching & Academic Management',
    image: 'https://images.unsplash.com/photo-1560250097-0b93528c311a?q=80&w=800&auto=format&fit=crop',
    bio: 'Renowned mathematics teacher whose analytical problem-solving methods make calculus and trigonometry accessible and enjoyable.'
  },
  {
    id: '3',
    name: 'Ms. Grace Akello',
    role: 'Head of ICT & Computer Studies',
    subject: 'Computer Studies & Subsidiary ICT',
    qualification: 'B.Sc Computer Science & Information Technology (Kyambogo)',
    experience: '10 Years ICT Education Lead',
    image: 'https://images.unsplash.com/photo-1580894732413-a923649646b9?q=80&w=800&auto=format&fit=crop',
    bio: 'Spearheading digital literacy, computer practical skills, and software skills for O-Level and A-Level students.'
  },
  {
    id: '4',
    name: 'Mr. Emmanuel Kato',
    role: 'Head of Humanities & Literature',
    subject: 'Literature in English & General Paper',
    qualification: 'M.A. Literature (Makerere University), B.A. Education',
    experience: '14 Years Teaching & Debate Patron',
    image: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?q=80&w=800&auto=format&fit=crop',
    bio: 'Seasoned debater and literary patron dedicated to developing articulate speakers, essay writers, and confident student leaders.'
  }
];

export const GALLERY_ITEMS: GalleryItem[] = [];

export const TESTIMONIALS: Testimonial[] = [
  {
    id: '1',
    name: 'Dr. Arthur Mukasa',
    role: 'Parent of Alumni',
    avatar: '',
    comment: 'Nexus Academy provided disciplined study habits and excellent academic mentoring for my daughter. She qualified for Medicine at Makerere University on government sponsorship.',
    rating: 5,
    year: 'Class of 2024'
  },
  {
    id: '2',
    name: 'Patricia Namubiru',
    role: 'Head Girl & Top UCE Graduate',
    avatar: '',
    comment: 'The dedicated teachers, well-equipped science laboratories, and supportive boarding life gave me every tool to achieve 8 aggregates in UCE.',
    rating: 5,
    year: 'Senior 4 Graduate'
  },
  {
    id: '3',
    name: 'Eng. Timothy Tumusiime',
    role: 'Alumni',
    avatar: '',
    comment: 'The ICT and science training at Nexus gave me a firm foundation for my Civil Engineering degree.',
    rating: 5,
    year: 'Class of 2020'
  }
];

export const ADMISSION_STEPS: AdmissionStep[] = [
  {
    stepNumber: 1,
    title: 'Application Submission',
    description: 'Fill the online application form with candidate details and academic records.',
    detail: 'Simple and fast. Attach PLE Result Slip for S1 or UCE Result Slip for S5 entry.',
    icon: 'FileEdit'
  },
  {
    stepNumber: 2,
    title: 'Interview & Guidance',
    description: 'Candidate interview and subject combination advisory session.',
    detail: 'Helps select the best combination aligned with the student’s career aspirations.',
    icon: 'UserCheck'
  },
  {
    stepNumber: 3,
    title: 'Admission Letter',
    description: 'Receive your official admission letter and requirements package.',
    detail: 'Includes fee structure, boarding requirements list, uniform guidelines, and bank accounts.',
    icon: 'MailCheck'
  },
  {
    stepNumber: 4,
    title: 'Reporting & Orientation',
    description: 'Report to school for term commencement and orientation.',
    detail: 'Dormitory allocation, textbook issuance, and welcoming student orientation week.',
    icon: 'Rocket'
  }
];

export const UPCOMING_EVENTS: EventItem[] = [
  {
    id: 'evt_1',
    title: 'Annual Inter-School Science & Innovation Fair',
    date: 'August 15, 2026',
    time: '09:00 AM - 04:00 PM',
    location: 'Nexus Main Assembly Hall & Science Block',
    category: 'Academics',
    description: 'Students present practical chemistry experiments, physics models, and ICT software solutions. Parents and guest schools are welcome.',
    image: ''
  },
  {
    id: 'evt_2',
    title: 'Senior 4 & Senior 6 UNEB Mocks Briefing',
    date: 'September 2, 2026',
    time: '10:00 AM',
    location: 'Assembly Hall',
    category: 'Examinations',
    description: 'Official candidate orientation and briefing for upcoming National UNEB Joint Mock Examinations.',
    image: ''
  },
  {
    id: 'evt_3',
    title: 'Inter-House Sports & MDD Gala',
    date: 'September 20, 2026',
    time: '08:00 AM - 05:00 PM',
    location: 'Nexus Sports Grounds',
    category: 'Sports',
    description: 'Athletics, football finals, netball matches, and Music, Dance & Drama performances across school houses.',
    image: ''
  }
];

export const INITIAL_GALLERY_ITEMS: GalleryItem[] = [];

export const NEWS_ARTICLES: NewsItem[] = [];

export const FAQS: FaqItem[] = [
  {
    id: '1',
    question: 'What curriculum does Nexus Academy follow?',
    answer: 'Nexus Academy strictly follows the National UNEB Curriculum for both Lower Secondary (UCE - Senior 1 to Senior 4) and Upper Secondary (UACE - Senior 5 to Senior 6), enhanced with practical computer literacy and life skills.',
    category: 'Academics'
  },
  {
    id: '2',
    question: 'How do I access and verify student UNEB / Mock exam results?',
    answer: 'You can use our integrated online UNEB & Exam Results Portal directly on this website! Simply click "Check UNEB Results", enter the candidate’s Index Number (e.g., U0001/001), and view verified result slips.',
    category: 'Results & Examinations'
  },
  {
    id: '3',
    question: 'Can examination results be synced live from Google Forms or Google Sheets?',
    answer: 'Yes! Our school administration dashboard features a Google Sheets / CSV sync bridge. Subject teachers and DOS can update marks in a spreadsheet, reflecting instantly on the portal.',
    category: 'Results & Examinations'
  },
  {
    id: '4',
    question: 'What are the boarding facilities and welfare like?',
    answer: 'Our boarding facilities offer clean spacious dormitories, 24/7 security with perimeter fencing, matrons and patrons, standby power generator, clean water supply, on-site sickbay with a resident nurse, and balanced nutritious meals (posho, beans, matooke, rice, and fresh vegetables).',
    category: 'Boarding & Life'
  },
  {
    id: '5',
    question: 'Are scholarships or bursaries available?',
    answer: 'Yes. We offer Academic Merit Scholarships for top PLE achievers entering S1 (4 to 6 aggregates) and top UCE achievers entering S5, as well as talent bursaries in sports and MDD.',
    category: 'Admissions & Fees'
  }
];

// Sample examination results database separated into O-Level and A-Level for UNEB and Mock exams
export const INITIAL_STUDENT_RESULTS: any[] = [
  // --- UNEB O-LEVEL (UCE) RESULTS ---
  {
    "index number": "U0001/001",
    "name": "KATO MARK JOEL",
    "level": "O-Level",
    "exam type": "UNEB",
    "year": "2025",
    "gender": "M",
    "age": "16",
    "math": "D1 (84)",
    "english": "D2 (72)",
    "physics": "D1 (82)",
    "chemistry": "D2 (74)",
    "biology": "D2 (70)",
    "history": "D1 (88)",
    "geography": "D1 (80)",
    "ict": "D1 (92)",
    "agric": "D2 (76)",
    "aggregates": "11 Aggregates",
    "division": "Division 1"
  },
  {
    "index number": "U0001/002",
    "name": "NAMUBIRU PATRICIA FLAVIA",
    "level": "O-Level",
    "exam type": "UNEB",
    "year": "2025",
    "gender": "F",
    "age": "17",
    "math": "D1 (92)",
    "english": "D1 (88)",
    "physics": "D1 (90)",
    "chemistry": "D1 (86)",
    "biology": "D1 (89)",
    "history": "D1 (94)",
    "geography": "D1 (88)",
    "ict": "D1 (96)",
    "art": "D1 (90)",
    "aggregates": "8 Aggregates",
    "division": "Division 1 (Distinction)"
  },
  {
    "index number": "U0001/003",
    "name": "MUKASA ARTHUR TIMOTHY",
    "level": "O-Level",
    "exam type": "UNEB",
    "year": "2025",
    "gender": "M",
    "age": "18",
    "math": "D1 (90)",
    "english": "D2 (75)",
    "physics": "D1 (88)",
    "chemistry": "D2 (78)",
    "biology": "D2 (72)",
    "history": "D1 (86)",
    "geography": "D2 (79)",
    "ict": "D1 (92)",
    "economics": "D1 (88)",
    "aggregates": "12 Aggregates",
    "division": "Division 1"
  },

  // --- UNEB A-LEVEL (UACE) RESULTS ---
  {
    "index number": "U0001/501",
    "name": "SSEKANDI JORAM",
    "level": "A-Level",
    "exam type": "UNEB",
    "year": "2025",
    "gender": "M",
    "combination": "PCM/ICT",
    "physics": "A (6 Pts)",
    "chemistry": "A (6 Pts)",
    "math": "A (6 Pts)",
    "sub ict": "1 (1 Pt)",
    "general paper": "1 (1 Pt)",
    "total points": "20 Points",
    "grade class": "Class 1 (Distinction)"
  },
  {
    "index number": "U0001/502",
    "name": "AKELLO SHARON GRACE",
    "level": "A-Level",
    "exam type": "UNEB",
    "year": "2025",
    "gender": "F",
    "combination": "BCM/ICT",
    "biology": "A (6 Pts)",
    "chemistry": "B (5 Pts)",
    "math": "A (6 Pts)",
    "sub ict": "1 (1 Pt)",
    "general paper": "1 (1 Pt)",
    "total points": "19 Points",
    "grade class": "Class 1 (Distinction)"
  },
  {
    "index number": "U0001/503",
    "name": "OKUMU BRIAN",
    "level": "A-Level",
    "exam type": "UNEB",
    "year": "2025",
    "gender": "M",
    "combination": "HEG/Sub-Math",
    "history": "A (6 Pts)",
    "economics": "A (6 Pts)",
    "geography": "B (5 Pts)",
    "sub math": "1 (1 Pt)",
    "general paper": "1 (1 Pt)",
    "total points": "19 Points",
    "grade class": "Class 1 (Distinction)"
  },

  // --- MOCKS O-LEVEL (UCE) RESULTS ---
  {
    "index number": "MOCK/UCE/001",
    "name": "ASIIMWE RONALD",
    "level": "O-Level",
    "exam type": "Mock",
    "year": "2026",
    "gender": "M",
    "age": "16",
    "math": "82 (D1)",
    "english": "78 (D2)",
    "physics": "85 (D1)",
    "chemistry": "80 (D1)",
    "biology": "75 (D2)",
    "history": "84 (D1)",
    "geography": "88 (D1)",
    "ict": "92 (D1)",
    "aggregates": "10 Aggregates",
    "division": "Division 1"
  },
  {
    "index number": "MOCK/UCE/002",
    "name": "NALWEYISO GLORIA",
    "level": "O-Level",
    "exam type": "Mock",
    "year": "2026",
    "gender": "F",
    "age": "17",
    "math": "88 (D1)",
    "english": "84 (D1)",
    "physics": "82 (D1)",
    "chemistry": "86 (D1)",
    "biology": "88 (D1)",
    "history": "85 (D1)",
    "geography": "90 (D1)",
    "ict": "94 (D1)",
    "aggregates": "9 Aggregates",
    "division": "Division 1 (Super)"
  },

  // --- MOCKS A-LEVEL (UACE) RESULTS ---
  {
    "index number": "MOCK/UACE/501",
    "name": "TUMWESIGYE IVAN",
    "level": "A-Level",
    "exam type": "Mock",
    "year": "2026",
    "gender": "M",
    "combination": "PCM/ICT",
    "physics": "84 (A - 6 Pts)",
    "chemistry": "78 (B - 5 Pts)",
    "math": "90 (A - 6 Pts)",
    "sub ict": "88 (1 Pt)",
    "general paper": "80 (1 Pt)",
    "total points": "19 Points",
    "grade class": "Class 1 (Distinction)"
  },
  {
    "index number": "MOCK/UACE/502",
    "name": "KABASINGUZI JOY",
    "level": "A-Level",
    "exam type": "Mock",
    "year": "2026",
    "gender": "F",
    "combination": "BCM/Sub-Math",
    "biology": "85 (A - 6 Pts)",
    "chemistry": "82 (A - 6 Pts)",
    "math": "76 (B - 5 Pts)",
    "sub math": "82 (1 Pt)",
    "general paper": "85 (1 Pt)",
    "total points": "19 Points",
    "grade class": "Class 1 (Distinction)"
  }
];

export const DEFAULT_SHEETS_CONFIG: GoogleSheetsConfig = {
  sheetUrl: 'https://docs.google.com/spreadsheets/d/1BxiMVs0XRA5nFMdKvBdBZjgmUUqptlbs74OgvE2upms/edit#gid=0',
  lastSynced: '2026-07-29 10:30 AM',
  totalRecordsSynced: 128,
  status: 'connected'
};
