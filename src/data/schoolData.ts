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
    subtitle: 'Quality Education for Future Innovators and Visionaries',
    badge: 'Top Ranked International Academy'
  },
  {
    id: '2',
    image: '',
    title: 'STEM & AI Innovation Hub',
    subtitle: 'Robotics, Science Labs and Digital Literacy',
    badge: 'Advanced STEM Facilities'
  },
  {
    id: '3',
    image: '',
    title: 'Character & Athletics',
    subtitle: 'Sports Arenas, Performing Arts and Leadership Pathways',
    badge: 'National Championship Standards'
  },
  {
    id: '4',
    image: '',
    title: 'Academic Pathways',
    subtitle: 'Direct Progression to Top Universities Worldwide',
    badge: 'High UNEB & Cambridge Pass Rates'
  }
];

export const TRUSTED_METRICS: Metric[] = [
  {
    id: '1',
    value: '17+',
    label: 'Years of Excellence',
    description: 'Pioneering holistic elite education since 2009',
    iconName: 'Award'
  },
  {
    id: '2',
    value: '90%',
    label: 'Passing Excellence',
    description: 'Consistently high distinction pass rates in UNEB & Cambridge sittings',
    iconName: 'GraduationCap'
  },
  {
    id: '4',
    value: '45+',
    label: 'Master Educators',
    description: 'PhD & Masters qualified faculty with international experience',
    iconName: 'UserCheck'
  }
];

export const WHY_NEXUS_FEATURES = [
  {
    id: '1',
    title: 'Future Ready Learning',
    description: 'AI-assisted personalized learning tracks designed to adapt to each scholar’s unique cognitive pace and potential.',
    icon: 'Sparkles'
  },
  {
    id: '2',
    title: 'Modern Classrooms',
    description: 'Acoustically tuned, ergonomic smart spaces with interactive multi-touch visual boards and ambient glass design.',
    icon: 'Monitor'
  },
  {
    id: '3',
    title: 'STEM Laboratories',
    description: 'Cutting-edge physics, chemistry, robotics, and biotech research labs outfitted with industrial-grade equipment.',
    icon: 'FlaskConical'
  },
  {
    id: '4',
    title: 'Digital Library',
    description: 'Over 150,000 digital titles, JSTOR academic research databases, and quiet glass pods for deep focus studying.',
    icon: 'BookOpen'
  },
  {
    id: '5',
    title: 'Sports Excellence',
    description: 'FIFA-standard turf pitch, heated 50m swimming pool, multi-purpose indoor sports complex, and professional coaching.',
    icon: 'Trophy'
  },
  {
    id: '6',
    title: 'Character Development',
    description: 'Mentorship circles, community service initiatives, debate societies, and global youth diplomacy forums.',
    icon: 'HeartHandshake'
  }
];

export const PROGRAMS: Program[] = [
  {
    id: 'o-level',
    title: 'O Level Program',
    code: 'UCE Syllabus & IGCSE',
    tagline: 'Foundational Mastery & Critical Inquiry (Senior 1 - Senior 4)',
    description: 'A rich four-year curriculum designed to foster deep analytical thinking, scientific inquiry, mathematical rigor, and linguistic fluency.',
    duration: '4 Years (S1 - S4)',
    icon: 'BookMarked',
    highlights: [
      'Comprehensive Core Sciences & Humanities',
      'Integrated Coding & Computational Logic',
      'Individual Academic Mentorship & Advisory',
      'UNEB UCE & Cambridge Examination Prep'
    ],
    subjects: ['Mathematics', 'Physics', 'Chemistry', 'Biology', 'English Language', 'ICT & Computer Studies', 'Geography', 'History', 'Entrepreneurship', 'Fine Art']
  },
  {
    id: 'a-level',
    title: 'A Level Program',
    code: 'UACE Syllabus & International A-Levels',
    tagline: 'Specialized Advanced Rigor (Senior 5 - Senior 6)',
    description: 'Rigorous two-year pre-university specialization preparing scholars for high-tier medical, engineering, law, technology, and business faculties worldwide.',
    duration: '2 Years (S5 - S6)',
    icon: 'GraduationCap',
    highlights: [
      'PCM, BCM, HEG, MEG, PEM & Arts Combinations',
      'Pre-University Research Thesis Project',
      'SAT, IELTS & Ivy League Admissions Support',
      '100% University Placement Record'
    ],
    subjects: ['Physics (P)', 'Chemistry (C)', 'Mathematics (M)', 'Biology (B)', 'Economics (E)', 'Geography (G)', 'Literature in English (L)', 'Sub-Math & General Paper']
  }
];

export const TEACHERS: Teacher[] = [
  {
    id: '1',
    name: 'Dr. Sarah Nabwire',
    role: 'Head of Sciences & STEM Director',
    subject: 'Advanced Physics & Applied Mechanics',
    qualification: 'Ph.D. Applied Physics (Imperial College London), M.Sc (Makerere)',
    experience: '16 Years Teaching Experience',
    image: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?q=80&w=800&auto=format&fit=crop',
    bio: 'Pioneer in physics pedagogy who has guided over 300 students to straight A distinctions in UACE and International A-Levels.'
  },
  {
    id: '2',
    name: 'Prof. David Okello',
    role: 'Dean of Academics & Mathematics Lead',
    subject: 'Pure & Applied Mathematics',
    qualification: 'M.Sc. Pure Mathematics (Cambridge University), B.Ed First Class',
    experience: '18 Years Teaching Experience',
    image: 'https://images.unsplash.com/photo-1560250097-0b93528c311a?q=80&w=800&auto=format&fit=crop',
    bio: 'Renowned mathematics author whose analytical problem-solving methodologies make complex calculus engaging and intuitive.'
  },
  {
    id: '3',
    name: 'Ms. Grace Akello',
    role: 'Head of ICT & Computer Science',
    subject: 'Software Engineering & AI',
    qualification: 'M.Sc Computer Science (MIT), B.Sc Software Engineering',
    experience: '12 Years Tech Industry & Academia',
    image: 'https://images.unsplash.com/photo-1580894732413-a923649646b9?q=80&w=800&auto=format&fit=crop',
    bio: 'Former Google Silicon Valley engineer spearheading Nexus Academy’s AI Literacy initiative and global hackathon team.'
  },
  {
    id: '4',
    name: 'Mr. Emmanuel Kato',
    role: 'Head of Humanities & Literature',
    subject: 'World Literature & General Paper',
    qualification: 'M.A. Comparative Literature (Oxford University)',
    experience: '14 Years Teaching Experience',
    image: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?q=80&w=800&auto=format&fit=crop',
    bio: 'Award-winning orator and literary critic dedicated to cultivating articulate, confident debaters and expressive writers.'
  }
];

export const GALLERY_ITEMS: GalleryItem[] = [];

export const TESTIMONIALS: Testimonial[] = [
  {
    id: '1',
    name: 'Dr. Arthur Mukasa',
    role: 'Parent of Alumni',
    avatar: '',
    comment: 'Nexus Academy helped my daughter build confidence and strong academic skills. The guidance provided was clear and supportive.',
    rating: 5,
    year: 'Class of 2024'
  },
  {
    id: '2',
    name: 'Patricia Namubiru',
    role: 'Head Girl & Top UCE Graduate',
    avatar: '',
    comment: 'The dedicated teachers and modern study spaces gave me every tool to achieve strong results. Nexus is a great environment.',
    rating: 5,
    year: 'Senior 4 Graduate'
  },
  {
    id: '3',
    name: 'Eng. Timothy Tumusiime',
    role: 'Alumni',
    avatar: '',
    comment: 'The computer studies and science activities at Nexus gave me a solid background for my engineering degree.',
    rating: 5,
    year: 'Class of 2020'
  }
];

export const ADMISSION_STEPS: AdmissionStep[] = [
  {
    stepNumber: 1,
    title: 'Online Application',
    description: 'Complete the online application form with previous academic records.',
    detail: 'Simple and fast. Upload PLE, UCE, or equivalent report cards.',
    icon: 'FileEdit'
  },
  {
    stepNumber: 2,
    title: 'Assessment & Interview',
    description: 'Attend an interactive assessment and student interview.',
    detail: 'Helps us understand student learning strengths and interests.',
    icon: 'UserCheck'
  },
  {
    stepNumber: 3,
    title: 'Official Acceptance',
    description: 'Receive your formal admission letter and welcome packet.',
    detail: 'Includes fee structure, boarding details, and uniform information.',
    icon: 'MailCheck'
  },
  {
    stepNumber: 4,
    title: 'Begin Learning',
    description: 'Join the school community and start your academic journey.',
    detail: 'Includes orientation week and student guidance.',
    icon: 'Rocket'
  }
];

export const UPCOMING_EVENTS: EventItem[] = [];

export const NEWS_ARTICLES: NewsItem[] = [];

export const FAQS: FaqItem[] = [
  {
    id: '1',
    question: 'What curriculums are offered at Nexus Academy?',
    answer: 'Nexus Academy offers dual pathways: the national UNEB Curriculum (UCE & UACE) and International Cambridge Curriculum (IGCSE & A-Levels), enhanced with our proprietary Future-Ready STEM & AI leadership modules.',
    category: 'Academics'
  },
  {
    id: '2',
    question: 'How do I access and verify student UNEB / Mock exam results?',
    answer: 'You can use our integrated online UNEB & Exam Results Portal directly on this website! Simply navigate to "Results Portal" from the top drop-down menu, enter the candidate’s Index Number or Name, and view or print verified transcripts synced in real-time.',
    category: 'Results & Examinations'
  },
  {
    id: '3',
    question: 'Can examination results be synced live from Google Forms or Google Sheets?',
    answer: 'Yes! Our school administration portal features an instant Google Sheets / CSV sync bridge. Subject heads can update marks in a Google Sheet, and results reflect live in the student search portal within seconds.',
    category: 'Results & Examinations'
  },
  {
    id: '4',
    question: 'What are the boarding facilities and security measures like?',
    answer: 'Our residential dormitories feature climate-controlled glass lounges, single/twin en-suite rooms, 24/7 biometric access, professional house parents, on-site medical staff, and organic chef-curated nutrition.',
    category: 'Boarding & Life'
  },
  {
    id: '5',
    question: 'Are scholarships or financial aid available?',
    answer: 'Yes. We offer Merit-Based Excellence Scholarships for top PLE / UCE achievers (up to 100% tuition coverage) as well as STEM & Sports Talent Bursaries.',
    category: 'Admissions & Fees'
  }
];

// Sample UNEB & National Examination Results database
export const INITIAL_STUDENT_RESULTS: StudentResult[] = [
  {
    indexNumber: 'U0001/001',
    studentName: 'KATO MARK JOEL',
    level: 'UCE',
    examYear: 2025,
    gender: 'M',
    combinationOrStream: 'Senior 4 Science Stream A',
    aggregatesOrPoints: '8 Aggregates (Distinction 1 in 8 Subjects)',
    divisionOrClass: 'Division 1 (Distinction Rank)',
    headteacherRemark: 'Outstanding candidate performance recorded.',
    verifiedStatus: true,
    subjects: [
      { code: '535', name: 'PHYSICS', grade: 'D1', scoreName: 'Distinction 1' },
      { code: '545', name: 'CHEMISTRY', grade: 'D1', scoreName: 'Distinction 1' },
      { code: '553', name: 'BIOLOGY', grade: 'D1', scoreName: 'Distinction 1' },
      { code: '456', name: 'MATHEMATICS', grade: 'D1', scoreName: 'Distinction 1' },
      { code: '112', name: 'ENGLISH LANGUAGE', grade: 'D1', scoreName: 'Distinction 1' },
      { code: '273', name: 'GEOGRAPHY', grade: 'D1', scoreName: 'Distinction 1' },
      { code: '241', name: 'HISTORY', grade: 'D1', scoreName: 'Distinction 1' },
      { code: '840', name: 'ICT & COMPUTER STUDIES', grade: 'D1', scoreName: 'Distinction 1' }
    ]
  },
  {
    indexNumber: 'U0001/002',
    studentName: 'NAMUBIRU PATRICIA FLAVIA',
    level: 'UCE',
    examYear: 2025,
    gender: 'F',
    combinationOrStream: 'Senior 4 Science Stream B',
    aggregatesOrPoints: '8 Aggregates (8 Distinctions)',
    divisionOrClass: 'Division 1 (Distinction Rank)',
    headteacherRemark: 'Exemplary performance across all sciences and humanistic subjects.',
    verifiedStatus: true,
    subjects: [
      { code: '535', name: 'PHYSICS', grade: 'D1', scoreName: 'Distinction 1' },
      { code: '545', name: 'CHEMISTRY', grade: 'D1', scoreName: 'Distinction 1' },
      { code: '553', name: 'BIOLOGY', grade: 'D1', scoreName: 'Distinction 1' },
      { code: '456', name: 'MATHEMATICS', grade: 'D1', scoreName: 'Distinction 1' },
      { code: '112', name: 'ENGLISH LANGUAGE', grade: 'D1', scoreName: 'Distinction 1' },
      { code: '840', name: 'ICT & COMPUTER STUDIES', grade: 'D1', scoreName: 'Distinction 1' },
      { code: '273', name: 'GEOGRAPHY', grade: 'D1', scoreName: 'Distinction 1' },
      { code: '610', name: 'FINE ART', grade: 'D1', scoreName: 'Distinction 1' }
    ]
  },
  {
    indexNumber: 'U0001/501',
    studentName: 'MUKASA ARTHUR TIMOTHY',
    level: 'UACE',
    examYear: 2025,
    gender: 'M',
    combinationOrStream: 'PCM / Sub-Math (Physics, Chemistry, Mathematics)',
    aggregatesOrPoints: '20 Points (A, A, A, 1, 1)',
    divisionOrClass: 'Principal Pass Division (Maximum Score)',
    headteacherRemark: 'Admitted to MIT & Harvard Engineering Faculty.',
    verifiedStatus: true,
    subjects: [
      { code: 'P510', name: 'PHYSICS', grade: 'A', scoreName: 'Principal A (6 Points)' },
      { code: 'P525', name: 'CHEMISTRY', grade: 'A', scoreName: 'Principal A (6 Points)' },
      { code: 'P425', name: 'PURE MATHEMATICS', grade: 'A', scoreName: 'Principal A (6 Points)' },
      { code: 'S101', name: 'GENERAL PAPER', grade: 'D1', scoreName: 'Distinction 1 (1 Point)' },
      { code: 'S475', name: 'SUB-MATHEMATICS', grade: 'D1', scoreName: 'Distinction 1 (1 Point)' }
    ]
  },
  {
    indexNumber: 'U0001/502',
    studentName: 'AKELLO CLAIRE GLORIA',
    level: 'UACE',
    examYear: 2025,
    gender: 'F',
    combinationOrStream: 'BCM / Sub-Math (Biology, Chemistry, Mathematics)',
    aggregatesOrPoints: '19 Points (A, A, B, 1, 1)',
    divisionOrClass: 'Principal Pass Division',
    headteacherRemark: 'Top candidates for Medicine & Surgery Faculty placement.',
    verifiedStatus: true,
    subjects: [
      { code: 'P530', name: 'BIOLOGY', grade: 'A', scoreName: 'Principal A (6 Points)' },
      { code: 'P525', name: 'CHEMISTRY', grade: 'A', scoreName: 'Principal A (6 Points)' },
      { code: 'P425', name: 'PURE MATHEMATICS', grade: 'B', scoreName: 'Principal B (5 Points)' },
      { code: 'S101', name: 'GENERAL PAPER', grade: 'D1', scoreName: 'Distinction 1 (1 Point)' },
      { code: 'S475', name: 'SUB-MATHEMATICS', grade: 'D1', scoreName: 'Distinction 1 (1 Point)' }
    ]
  },
  {
    indexNumber: 'U0001/015',
    studentName: 'SSENYONJO DANIEL',
    level: 'UCE',
    examYear: 2026,
    gender: 'M',
    combinationOrStream: 'Senior 4 Science Stream A',
    aggregatesOrPoints: '10 Aggregates',
    divisionOrClass: 'Division 1 (Distinction Rank)',
    headteacherRemark: 'Strong performance across all national science papers.',
    verifiedStatus: true,
    subjects: [
      { code: '535', name: 'PHYSICS', grade: 'D1', scoreName: 'Distinction 1' },
      { code: '545', name: 'CHEMISTRY', grade: 'D2', scoreName: 'Distinction 2' },
      { code: '553', name: 'BIOLOGY', grade: 'D1', scoreName: 'Distinction 1' },
      { code: '456', name: 'MATHEMATICS', grade: 'D1', scoreName: 'Distinction 1' },
      { code: '112', name: 'ENGLISH LANGUAGE', grade: 'D2', scoreName: 'Distinction 2' },
      { code: '840', name: 'ICT & COMPUTER STUDIES', grade: 'D1', scoreName: 'Distinction 1' }
    ]
  }
];

export const DEFAULT_SHEETS_CONFIG: GoogleSheetsConfig = {
  sheetUrl: 'https://docs.google.com/spreadsheets/d/1BxiMVs0XRA5nFMdKvBdBZjgmUUqptlbs74OgvE2upms/edit#gid=0',
  lastSynced: '2026-07-29 10:30 AM',
  totalRecordsSynced: 128,
  status: 'connected'
};
