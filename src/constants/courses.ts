type CourseCategory =
  | "Software Development"
  | "Digital Marketing"
  | "Data and Analytics"
  | "Software Testing"
  | "Communication Skills"
  | "Office Productivity";

export type Course = {
  id: string;
  category: CourseCategory;
  title: string;
  description: string;
  image: string;
  duration?: string;
  badge?: string;
  salaryReference?: { role: string; slug: string };
  field: string;
  skills: string[];
  topics: string[];
};

export const COURSES: Course[] = [
  {
    id: "full-stack-development",
    category: "Software Development",
    title: "Full Stack Development",
    description: "Build web applications from front end to back end using HTML, CSS, JavaScript, PHP, MySQL and React.",
    image: "/difference/industry-training.jpg",
    badge: "Most Popular",
    salaryReference: { role: "Full Stack Developer", slug: "full-stack-developer" },
    field: "full stack web development",
    skills: ["HTML", "CSS", "JavaScript", "PHP", "MySQL", "React"],
    topics: ["Web page structure and styling", "JavaScript and React fundamentals", "Server-side development with PHP", "Working with MySQL databases"],
  },
  {
    id: "digital-marketing",
    category: "Digital Marketing",
    title: "Digital Marketing",
    description: "Learn to reach audiences and measure campaign performance with SEO, Google Ads, social media and analytics.",
    image: "/difference/career-guidance.jpg",
    badge: "Trending",
    salaryReference: { role: "Digital Marketer", slug: "digital-marketer" },
    field: "digital marketing",
    skills: ["SEO", "Google Ads", "Social media", "Analytics"],
    topics: ["Search engine optimisation", "Paid search with Google Ads", "Social media campaign planning", "Measuring marketing performance"],
  },
  {
    id: "data-analytics",
    category: "Data and Analytics",
    title: "Data Analytics",
    description: "Use Excel, Python, SQL and Power BI to interpret data and present business insights.",
    image: "/difference/project-exposure.jpg",
    salaryReference: { role: "Junior Data Analyst", slug: "junior-data-analyst" },
    field: "data analytics",
    skills: ["Excel", "Python", "SQL", "Power BI"],
    topics: ["Spreadsheet analysis with Excel", "Analysing data in Python", "Querying databases with SQL", "Visualising findings in Power BI"],
  },
  {
    id: "software-testing",
    category: "Software Testing",
    title: "Software Testing",
    description: "Learn how development teams check software quality through manual testing, basic automation and defect tracking.",
    image: "/difference/project-exposure.jpg",
    salaryReference: { role: "Software Test Engineer", slug: "software-test-engineer" },
    field: "software quality assurance",
    skills: ["Manual testing", "Test automation", "Bug tracking", "Quality assurance"],
    topics: ["Manual testing fundamentals", "Introductory test automation", "Identifying and tracking defects", "Quality assurance in software development"],
  },
  {
    id: "communicative-english",
    category: "Communication Skills",
    title: "Communicative English",
    description: "Develop confidence in spoken English for job interviews, professional conversations and day-to-day work.",
    image: "/difference/one-on-one-counselling.jpg",
    field: "spoken and workplace English",
    skills: ["Spoken English", "Workplace communication", "Interview skills"],
    topics: ["Speaking practice", "Professional conversations", "Interview preparation", "English for workplace situations"],
  },
  {
    id: "computer-basics-office-tools",
    category: "Office Productivity",
    title: "Computer Basics & Office Tools",
    description: "Develop everyday computer skills for the workplace, with an introduction to Microsoft Office and Tally.",
    image: "/ecosystem/skill-campus.jpg",
    salaryReference: { role: "Office Assistant", slug: "office-assistant" },
    field: "computer fundamentals and office productivity",
    skills: ["Computer fundamentals", "Microsoft Office", "Tally"],
    topics: ["Everyday computer operations", "Working with documents and spreadsheets", "Preparing presentations", "Getting started with Tally"],
  },
];
