export const profile = {
  name: "Muhammad Ali Nawaz",
  brand: "M.A.N",
  title: "MERN Stack Developer | Next.js Developer",
  shortRole: "MERN Stack Developer | Next.js Developer",

  location: "Karachi, Pakistan",

  currentStatus:
    "Ali is currently open to internships, junior roles, freelance projects, and project-based opportunities in MERN Stack, Next.js, and MEAN Stack development. His broader experience also includes AI integrations, third-party APIs, automation, and cloud data engineering.",

  workPreference:
    "Open to remote, hybrid, onsite, full-time, internship, freelance, and project-based opportunities involving MERN Stack, Next.js, and MEAN Stack development, along with cloud, data engineering, automation, and AI integration work.",

  availability:
    "Available for internships, junior developer roles, freelance projects, and collaboration involving MERN Stack, Next.js, MEAN Stack, backend APIs, real-time applications, AI integrations, and cloud-supported solutions.",

  summary:
    "Muhammad Ali Nawaz is a MERN Stack and Next.js Developer with practical experience building responsive full-stack applications, RESTful APIs, authentication, real-time features, and database-driven systems. His web development skill set also includes MEAN Stack development with Angular, Node.js, Express.js, and MongoDB, alongside AI integrations, third-party APIs, automation, and cloud data engineering.",
};

export const contact = {
  email: "muhammadalinawaz.dev@gmail.com",
  mobile: "+92 303 203 1199",
  whatsapp: "+92 303 203 1199",
  linkedin: "https://www.linkedin.com/in/muhammad-ali-nawaz-362627338/",
  github: "https://github.com/CodeByMan",
  message:
    "I'm available for full-time roles and freelance projects involving MERN Stack, Next.js, MEAN Stack, APIs, real-time features, AI integrations, automation, and cloud-supported solutions. Whether it's building new features, improving existing systems, or solving technical problems, I'm ready to contribute.",
};

export const education = [
  {
    institute: "Aptech Computer Education, Karachi",
    degree: "Advanced Diploma in Software Engineering",
    duration: "July 2023 - July 2026",
    result: "Grade A",
    description:
      "Comprehensive software engineering diploma focusing on full-stack development, programming fundamentals, databases, and real-world project development using modern technologies.",
    logo: "/aptech.jpg",
  },
  {
    institute: "SMIT-Saylani Mass IT Training",
    degree: "Cloud Data Engineering",
    duration: "August 2025 - May 2026",
    result: "Passed",
    description:
      "Hands-on cloud data engineering training covering ETL pipelines, Python, SQL, AWS services, data processing, workflow automation, CI/CD, and real-world cloud-based projects.",
    logo: "/saylani.png",
  },
  {
    institute: "Virtual University of Pakistan",
    degree: "BS Computer Science (BSCS)",
    duration: "April 2024 - April 2028 Expected",
    result: "In Progress",
    description:
      "Bachelor's degree in Computer Science covering core concepts of programming, algorithms, software engineering, and computer systems with ongoing academic progress.",
    logo: "/virtual.png",
  },
] as const;

export const certifications = [
  {
    title: "Frontend Development",
    institute: "Consulnet Corporation",
    duration: "Feb 2022 - Aug 2022",
    skills: ["HTML5", "CSS3", "Javascript ES6+", "jQuery"],
    logo: "/consulnet.jpg",
  },
  {
    title: "Advanced SEO",
    institute: "Consulnet Corporation",
    duration: "May 2025 - Sep 2025",
    skills: [
      "On-page SEO",
      "Off-page SEO",
      "Technical SEO",
      "Content Writing",
      "Google Analytics",
      "Backlinks",
    ],
    logo: "/consulnet.jpg",
  },
] as const;

export const experience = [
  {
    company: "Trust Nexus",
    role: "Next.js Developer Intern",
    duration: "01 August 2025 - 31 Oct 2025",
    type: "Hybrid (Remote + Onsite)",
    description:
    "Contributed to frontend development of an HRMS (Human Resource Management System) using Next.js. Worked in agile environment with team collaboration and sprint-based development cycles.",
    highlights: [
      "Built HRMS frontend using Next.js",
      "Collaborated in agile & scrum workflows",
      "Team-based feature development",
      "UI implementation and component structuring",
      "Hybrid work environment experience",
    ],
    logo: "/nexus.jpg",
  },
  {
    company: "SMIT - Saylani Mass IT Training",
    role: "Cloud Data Engineering Trainee",
    duration: "Aug 2025 - May 2026",
    type: "Onsite",
    description:
      "Built Project-Based advanced data engineering pipelines and real-world cloud-based systems. Gained hands-on experience in ETL pipelines, data scraping, transformation, cleaning, visualization, and API integration in production-like environments.",
    highlights: [
      "Built 20+ real-world data engineering projects",
      "Developed ETL & CI/CD pipelines",
      "Worked with AWS (S3, EC2, Glue, SNS, SQS)",
      "Used Kafka, Snowflake, Apache Airflow for data workflows",
      "Data scraping, cleaning, transformation & visualization",
      "API integrations (Weather, Spotify, etc.)",
      "Python (Pandas, NumPy), SQL Server, Linux, Ubuntu",
      "Tools: Tableau, Matplotlib, BeautifulSoup, Selenium, Redis, n8n",
    ],
    logo: "/saylani.png",
  },
] as const;

export const projects = [
  {
    title: "AWS Event-Driven Data Pipeline",
    categories: ["data"],
    description:
      "Built a serverless ETL pipeline with S3, SNS, SQS, Lambda, and Python to process upload events, transform files, route jobs securely, and store cleaned output in target S3 buckets.",
    tech: ["AWS", "S3", "SNS", "SQS", "Lambda", "Python"],
    image: "/Gallery/event-driven.png",
    repoUrl: "https://github.com/CodeByMan/Event-Driven-Data-Pipeline",
  },
  {
    title: "DataFlow Insights",
    categories: ["data"],
    description:
      "Built a cloud BI analytics pipeline using Python/Pandas, S3, Glue, Athena, and QuickSight to process Superstore data, create snapshots, catalog tables, and query business insights.",
    tech: ["Python", "Pandas", "AWS S3", "AWS Glue", "Athena", "QuickSight"],
    image: "/Gallery/data-insight.png",
    repoUrl: "https://github.com/CodeByMan/Data-Flow-Insights",
  },
  {
    title: "LuxuryStay - HMS",
    categories: ["mern"],
    description:
      "Built a MERN hotel platform with JWT auth, role dashboards, rooms, reservations, billing, housekeeping, maintenance, guest services, PDF invoices, image uploads, and responsive UI.",
    tech: ["React", "Tailwind CSS", "Node.js", "Express", "MongoDB", "JWT"],
    image: "/Gallery/luxurystay.png",
    repoUrl: "https://github.com/CodeByMan/LuxuryStay-HMS",
  },
  {
    title: "ThunderChat - App",
    categories: ["mern", "nextjs"],
    description:
      "Built a MERN + Next.js real-time chat system with JWT auth, Socket.io messaging, direct chats, group channels, profile setup, file sharing, Zustand state, and a responsive dark UI.",
    tech: ["Next.js", "Node.js", "Express", "MongoDB", "Socket.io", "JWT"],
    image: "/Gallery/thunderclient.png",
    repoUrl: "https://github.com/CodeByMan/Thunder-Chat",
  },
  {
    title: "PetBuddy - Pet Care Center",
    categories: ["mern"],
    description:
      "Built a MERN pet care and clinic platform with JWT auth, role dashboards, pet profiles, appointments, treatments, adoption, shop/cart, ImageKit uploads, PDFs, email and AI chat UI.",
    tech: ["React", "Bootstrap", "Node.js", "Express", "MongoDB", "JWT"],
    image: "/Gallery/petbuddy.png",
    repoUrl: "https://github.com/CodeByMan/PetBuddy-Clinic",
  },
    {
    title: "BeFit - Fitness Tracker",
    categories: ["mern"],
    description:
      "Built a MERN fitness and nutrition tracker with JWT auth, dashboards, workout logs, food logs, goal tracking, health calculators, calorie checks, Groq tips, APIs, plus admin tools.",
    tech: ["React", "Node.js", "Express", "MongoDB", "JWT", "Groq AI"],
    image: "/Gallery/befit.png",
    repoUrl: "https://github.com/CodeByMan/BeFit-AI",
  },
  {
    title: "MehfoozRaah-AI",
    categories: ["mern"],
    description:
      "Developed a MERN + Flask AI safety platform with JWT auth, route planning, risk maps, incident reports, forums, heatmaps, live navigation, media uploads, and admin analytics tools.",
    tech: ["React", "Node.js", "MongoDB", "Flask", "Python", "Leaflet"],
    image: "/Gallery/mehfoozraah.png",
    repoUrl: "https://github.com/CodeByMan/MehfoozRaah-AI",
  },
  {
    title: "CricketWear - Ecommerce",
    categories: ["mern"],
    description:
      "Built a MERN e-commerce cricket store with JWT auth, Stripe checkout, cart, orders, reviews, admin dashboard, product CRUD, user management, Cloudinary uploads, and responsive UIs.",
    tech: ["React", "Node.js", "Express", "MongoDB", "Stripe", "JWT"],
    image: "/Gallery/cricketwear.png",
    repoUrl: "https://github.com/CodeByMan/Cricket-Wear",
  },
  {
    title: "HR Management System",
    categories: ["nextjs"],
    description:
      "Built a Next.js HRMS with Better Auth, PostgreSQL, Drizzle ORM, role-based dashboards, employee records, leave requests, approvals, balances, policies, and a responsive Aurora UI.",
    tech: ["Next.js", "React", "TypeScript", "PostgreSQL", "Drizzle", "Better Auth"],
    image: "/Gallery/hrms.png",
    repoUrl: "https://github.com/CodeByMan/HRM-System",
  },
  {
    title: "Tic-Tac-Toe",
    categories: ["nextjs"],
    description:
      "Built a modern neon Tic-Tac-Toe game with Next.js, React, TypeScript, Tailwind CSS, AI mode, two-player mode, difficulty levels, best-of-3 flow, animations, and responsive fast UI.",
    tech: ["Next.js", "React", "TypeScript", "Tailwind CSS"],
    image: "/Gallery/tictac.png",
    repoUrl: "https://github.com/CodeByMan/TicTacToe",
  },
] as const;

export const skillCategories = [
  {
    number: "01",
    title: "Frontend & Frameworks",
    skills: [
      "HTML5",
      "CSS3",
      "JavaScript",
      "TypeScript",
      "React",
      "Next.js",
      "Angular",
      "Tailwind CSS",
      "Material UI",
      "Bootstrap",
    ],
  },
  {
    number: "02",
    title: "Backend & API Development",
    skills: [
      "Node.js",
      "Express.js",
      "NestJS",
      "RESTful API",
      "Postman",
      "Thunder Client",
      "GraphQL",
      "Stripe",
      "Third-party API",
      "AI Integration",
      "FastAPI",
    ],
  },
  {
    number: "03",
    title: "Databases",
    skills: [
      "MongoDB",
      "SQL Server",
      "PostgreSQL",
      "Firebase",
    ],
  },
  {
    number: "04",
    title: "Data, Cloud & DevOps",
    skills: [
      "AWS",
      "AWS S3",
      "AWS EC2",
      "AWS Lambda",
      "AWS Glue",
      "Athena",
      "Ubuntu",
      "CI/CD Pipelines",
      "Docker",
      "Apache Airflow",
      "Kafka",
    ],
  },
] as const;

export const sliderSkills = [
  "Git",
  "GitHub",
  "VS Code",
  "JSON",
  "XML",
  "On-page SEO",
  "Off-page SEO",
  "Technical SEO",
  "Figma",
  "Canva",
  "Grammarly",
  "Agile Methodologies",
  "Jira",
  "XAMPP",
  "Ms Word",
  "Ms Excel",
  "Ms Powerpoint",
  "Vercel",
] as const;
