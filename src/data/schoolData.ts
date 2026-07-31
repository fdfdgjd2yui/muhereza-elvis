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
    image: 'https://images.unsplash.com/photo-1523050854058-8df90110c9f1?q=80&w=1920&auto=format&fit=crop',
    title: "Building Tomorrow's Leaders",
    subtitle: 'Ultra-Premium Education for Future Innovators & Visionaries',
    badge: '★ #1 International Academy Ranking'
  },
  {
    id: '2',
    image: 'https://images.unsplash.com/photo-1509062522246-3755977927d7?q=80&w=1920&auto=format&fit=crop',
    title: 'STEM & AI Innovation Hub',
    subtitle: 'Robotics, Digital Science Labs & Next-Gen Digital Literacy',
    badge: '🚀 Advanced STEM Facilities'
  },
  {
    id: '3',
    image: 'https://images.unsplash.com/photo-1541829070764-84a7d30dd3f3?q=80&w=1920&auto=format&fit=crop',
    title: 'Holistic Character & Athletics',
    subtitle: 'Olympic-Standard Sports Arenas, Performing Arts & Leadership Pathways',
    badge: '🏆 45+ National Championships'
  },
  {
    id: '4',
    image: 'https://images.unsplash.com/photo-1562774053-701939374585?q=80&w=1920&auto=format&fit=crop',
    title: 'Global Academic Pathways',
    subtitle: 'Direct Progression to Top Ivy League & International Universities',
    badge: '🌍 90% UNEB & Cambridge Passing Excellence'
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

export const GALLERY_ITEMS: GalleryItem[] = [
  {
    id: '1',
    title: 'State-of-the-Art Robotics & AI Lab',
    category: 'stem',
    image: 'https://images.unsplash.com/photo-1581092335397-9583fe92d232?q=80&w=1200&auto=format&fit=crop',
    description: 'Students testing autonomous robotics prototypes in our multi-million dollar STEM workshop.'
  },
  {
    id: '2',
    title: 'Olympic-Sized Aquatic Complex',
    category: 'sports',
    image: 'https://images.unsplash.com/photo-1530549387789-4c1017266635?q=80&w=1200&auto=format&fit=crop',
    description: 'Heated 10-lane competition pool hosting regional inter-school swimming galas.'
  },
  {
    id: '3',
    title: 'Grand Symphony & Drama Auditorium',
    category: 'arts',
    image: 'https://images.unsplash.com/photo-1469488865564-c2de10f69f96?q=80&w=1200&auto=format&fit=crop',
    description: 'Acoustically isolated 800-seat theater for musical galas, orchestral recitals, and theatrical plays.'
  },
  {
    id: '4',
    title: 'Global Youth Diplomacy Assembly',
    category: 'leadership',
    image: 'https://images.unsplash.com/photo-1529156069898-49953e39b3ac?q=80&w=1200&auto=format&fit=crop',
    description: 'Student parliament and Model United Nations delegation preparing for international debates.'
  },
  {
    id: '5',
    title: 'Futuristic Eco-Friendly Campus Grounds',
    category: 'campus',
    image: 'https://images.unsplash.com/photo-1562774053-701939374585?q=80&w=1200&auto=format&fit=crop',
    description: 'Lush green courtyards, solar energy canopies, and serene outdoor study amphitheatres.'
  },
  {
    id: '6',
    title: 'Advanced Biotechnology & Chemistry Lab',
    category: 'stem',
    image: 'https://images.unsplash.com/photo-1532094349884-543bc11b234d?q=80&w=1200&auto=format&fit=crop',
    description: 'High-precision micro-pipettes, spectrometers, and safety clean rooms.'
  }
];

export const TESTIMONIALS: Testimonial[] = [
  {
    id: '1',
    name: 'Dr. Arthur Mukasa',
    role: 'Parent of Alumni (Harvard Class of 2028)',
    avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?q=80&w=200&auto=format&fit=crop',
    comment: 'Nexus Academy transformed my daughter from a timid student into an exceptionally articulate, confident young scientist. The UNEB results were stellar, and the Ivy League guidance was world-class!',
    rating: 5,
    year: 'Class of 2024'
  },
  {
    id: '2',
    name: 'Patricia Namubiru',
    role: 'Head Girl & UCE National Rank #1',
    avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?q=80&w=200&auto=format&fit=crop',
    comment: 'The glass laboratories, 24/7 digital library access, and passionate teachers provided me with every tool to achieve 8 aggregates in UCE. Nexus is truly a second home.',
    rating: 5,
    year: 'Senior 4 Graduate'
  },
  {
    id: '3',
    name: 'Eng. Timothy Tumusiime',
    role: 'Alumni & Software Founder in London',
    avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?q=80&w=200&auto=format&fit=crop',
    comment: 'The coding bootcamps and robotics clubs at Nexus gave me an undeniable edge when I started my engineering degree. The discipline and moral foundation stayed with me.',
    rating: 5,
    year: 'Class of 2020'
  }
];

export const ADMISSION_STEPS: AdmissionStep[] = [
  {
    stepNumber: 1,
    title: 'Online Application',
    description: 'Complete our sleek digital application form with previous academic transcripts.',
    detail: 'Takes less than 10 minutes. Upload PLE, UCE, or equivalent international records.',
    icon: 'FileEdit'
  },
  {
    stepNumber: 2,
    title: 'Aptitude & Interview',
    description: 'Attend a friendly interactive assessment session and scholar interview.',
    detail: 'Evaluates critical thinking, creative problem-solving, and personal aspirations.',
    icon: 'UserCheck'
  },
  {
    stepNumber: 3,
    title: 'Official Acceptance',
    description: 'Receive your formal admission offer and welcome scholar package.',
    detail: 'Includes full fee structure breakdown, boarding guidelines, and uniform sizing.',
    icon: 'MailCheck'
  },
  {
    stepNumber: 4,
    title: 'Begin Learning',
    description: 'Step into a world of endless possibilities and transformative education.',
    detail: 'Orientation week, buddy assignment, and personalized academic roadmap setup.',
    icon: 'Rocket'
  }
];

export const UPCOMING_EVENTS: EventItem[] = [
  {
    id: '1',
    title: 'Annual Innovation & STEM Expo 2026',
    date: 'August 18, 2026',
    time: '09:00 AM - 04:00 PM',
    location: 'Nexus Grand Auditorium & STEM Atrium',
    category: 'Academic & Tech',
    image: 'https://images.unsplash.com/photo-1511578314322-379afb476865?q=80&w=800&auto=format&fit=crop',
    description: 'Exhibition of over 80 student robotics projects, AI applications, renewable energy solutions, and biotech inventions.'
  },
  {
    id: '2',
    title: 'Inter-House Sports & Aquatics Gala',
    date: 'September 05, 2026',
    time: '08:30 AM - 05:00 PM',
    location: 'Nexus Olympic Turf & Aquatic Arena',
    category: 'Athletics',
    image: 'https://images.unsplash.com/photo-1461896836934-ffe607ba8211?q=80&w=800&auto=format&fit=crop',
    description: 'Thrilling track & field events, relays, swimming heats, and martial arts demonstrations.'
  },
  {
    id: '3',
    title: 'Parent & Scholar Career Pathways Summit',
    date: 'September 22, 2026',
    time: '02:00 PM - 06:00 PM',
    location: 'Innovation Hub & Glass Conference Suite',
    category: 'Admissions & Careers',
    image: 'https://images.unsplash.com/photo-1524178232363-1fb2b075b655?q=80&w=800&auto=format&fit=crop',
    description: 'Interactive session with university admissions directors from Harvard, Oxford, Cambridge, and Makerere University.'
  }
];

export const NEWS_ARTICLES: NewsItem[] = [
  {
    id: '1',
    title: 'Nexus Academy Scholars Sweep Top Distinction Awards in UCE & UACE',
    date: 'July 20, 2026',
    author: 'Communications Office',
    category: 'Academic Excellence',
    image: 'https://images.unsplash.com/photo-1523240795612-9a054b0db644?q=80&w=800&auto=format&fit=crop',
    summary: 'Nexus scholars scored 100% Grade 1 pass rates with 92% securing straight distinctions in Physics, Math, and Chemistry.',
    content: 'The official national examination results released by UNEB confirmed Nexus Academy as a top-performing institution in the nation. Over 120 candidates achieved 8-aggregate totals in UCE, while our A-Level science combination candidates secured 20-point maximum scores across PCM and BCM.'
  },
  {
    id: '2',
    title: 'Unveiling the Advanced Robotics & Artificial Intelligence Wing',
    date: 'June 14, 2026',
    author: 'STEM Faculty Board',
    category: 'Campus Facilities',
    image: 'https://images.unsplash.com/photo-1485827404703-89b55fcc595e?q=80&w=800&auto=format&fit=crop',
    summary: 'A state-of-the-art $2.5M facility housing 3D printers, humanoid robotics rigs, and high-performance GPU clusters for machine learning.',
    content: 'In line with our commitment to preparing future-ready leaders, Nexus Academy officially commissioned its new Robotics & AI Wing. The facility provides high school scholars with hands-on exposure to neural network design, embedded microcontrollers, and CAD engineering.'
  },
  {
    id: '3',
    title: 'Nexus Debate Team Victorious at African Youth Diplomacy Championship',
    date: 'May 28, 2026',
    author: 'Student Leadership Forum',
    category: 'Co-Curricular',
    image: 'https://images.unsplash.com/photo-1475721027785-f74eccf877e2?q=80&w=800&auto=format&fit=crop',
    summary: 'Our senior debaters secured 1st place in Nairobi, debating climate policy, global economic trade, and AI ethics.',
    content: 'Competing against 48 premier academies across East and Southern Africa, the Nexus debate team demonstrated exceptional research depth, logical poise, and persuasive oratory.'
  }
];

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
    divisionOrClass: 'Division 1 (Super Distinction)',
    headteacherRemark: 'Outstanding candidate. Awarded National Academic Excellence Gold Medal.',
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
    divisionOrClass: 'Division 1 (Super Distinction)',
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
