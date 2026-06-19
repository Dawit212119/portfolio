import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

async function main() {
  // Clear existing data
  await prisma.skill.deleteMany();
  await prisma.project.deleteMany();
  await prisma.experience.deleteMany();
  await prisma.profile.deleteMany();

  // Profile
  await prisma.profile.create({
    data: {
      name: "Dawit Workye",
      title: "Full-Stack Engineer | Next.js, PostgreSQL, Redis",
      bio: "Full-stack engineer focused on backend systems, APIs, and scalable web platforms using Node.js, FastAPI, Next.js, and PostgreSQL. Experience building multi-tenant systems, real-time services, caching layers, and offline-first applications. Strong focus on backend architecture, performance, and production reliability.",
      email: "dawitworkye794@gmail.com",
      phone: "+251920245372",
      location: "Addis Ababa, Ethiopia",
      github: "Dawit212119",
      linkedin: "",
      website: "https://dawit1.vercel.app",
    },
  });

  // Skills
  const skills = [
    { name: "React.js", category: "Frontend", order: 0 },
    { name: "Next.js", category: "Frontend", order: 1 },
    { name: "Redux Toolkit", category: "Frontend", order: 2 },
    { name: "Tailwind CSS", category: "Frontend", order: 3 },
    { name: "Shadcn/ui", category: "Frontend", order: 4 },
    { name: "Flutter", category: "Frontend", order: 5 },
    { name: "Node.js", category: "Backend", order: 6 },
    { name: "Express.js", category: "Backend", order: 7 },
    { name: "FastAPI", category: "Backend", order: 8 },
    { name: "Gin", category: "Backend", order: 9 },
    { name: "JavaScript", category: "Languages", order: 10 },
    { name: "TypeScript", category: "Languages", order: 11 },
    { name: "Python", category: "Languages", order: 12 },
    { name: "Java", category: "Languages", order: 13 },
    { name: "Go", category: "Languages", order: 14 },
    { name: "PostgreSQL", category: "Database", order: 15 },
    { name: "MongoDB", category: "Database", order: 16 },
    { name: "Redis", category: "Database", order: 17 },
    { name: "Prisma ORM", category: "Database", order: 18 },
    { name: "BullMQ", category: "Tools & Libraries", order: 19 },
    { name: "Jest", category: "Tools & Libraries", order: 20 },
    { name: "Docker", category: "Tools & Libraries", order: 21 },
    { name: "NGINX", category: "Tools & Libraries", order: 22 },
    { name: "Skaffold", category: "Tools & Libraries", order: 23 },
    { name: "Git & GitHub", category: "DevOps", order: 24 },
    { name: "Vercel", category: "DevOps", order: 25 },
    { name: "CI/CD", category: "DevOps", order: 26 },
    { name: "AWS Lambda", category: "DevOps", order: 27 },
    { name: "Microservices", category: "Architecture", order: 28 },
    { name: "REST APIs", category: "Architecture", order: 29 },
    { name: "GraphQL", category: "Architecture", order: 30 },
    { name: "Event-Driven Systems", category: "Architecture", order: 31 },
  ];

  for (const skill of skills) {
    await prisma.skill.create({ data: skill });
  }

  // Experience
  const experiences = [
    {
      company: "Healsend",
      role: "Full Stack Developer",
      startDate: "03/2026",
      endDate: null,
      current: true,
      location: "Addis Ababa",
      bullets: [
        "Built scalable web applications using React.js and Next.js with a focus on performance and maintainability",
        "Developed RESTful APIs using Node.js and Express, integrating with frontend applications",
        "Implemented authentication systems and state management using Redux and Context API",
        "Designed responsive UIs using Tailwind CSS and modern frontend practices",
        "Optimized Next.js applications using SSR and SSG for improved SEO and performance",
        "Worked on full-stack projects from database design (PostgreSQL/Prisma) to deployment",
      ],
      order: 0,
    },
    {
      company: "Eaglepoint",
      role: "AI Training Engineer",
      startDate: "02/2026",
      endDate: null,
      current: true,
      location: "Addis Ababa",
      description:
        "Developed and executed end-to-end AI training pipelines to generate high-quality, production-ready code repositories. Built and validated full-stack applications from 0 to 1 using advanced prompt engineering and LLMs.",
      bullets: [
        "Leveraged GPT, Gemini, and Claude to build and validate full-stack applications",
        "Enforced quality standards including containerization (Docker), automated testing, and architectural auditing",
        "Ensured 100% of deliverables met stringent criteria for functionality, security, and maintainability",
      ],
      order: 1,
    },
    {
      company: "Wetruck.ai",
      role: "Backend Developer",
      startDate: "11/2025",
      endDate: "05/2026",
      current: false,
      location: "Addis Ababa, Ethiopia",
      bullets: [
        "Built multi-tenant logistics backend using FastAPI and PostgreSQL with RBAC and isolated data models",
        "Integrated GPS tracking APIs for real-time fleet monitoring",
        "Reduced external API calls by ~80% using 5-second caching layer for high-frequency tracking",
        "Implemented AWS Lambda scheduled jobs for background fleet processing and reporting",
        "Improved system performance under high concurrent tracking requests by optimizing database queries",
      ],
      order: 2,
    },
    {
      company: "Kuriftu AI",
      role: "Full-Stack Developer",
      startDate: "02/2026",
      endDate: "04/2026",
      current: false,
      location: "Addis Ababa",
      bullets: [
        "Built a full-stack resort management system using Next.js (React 19, TypeScript) and Node.js (Express, Prisma)",
        "Developed voice-based concierge system using LiveKit for real-time audio interactions",
        "Implemented reservation system with availability tracking and pricing logic",
        "Built service management dashboard for housekeeping, dining, and guest requests",
        "Designed multi-property architecture supporting multiple resort locations",
      ],
      order: 3,
    },
    {
      company: "FutureX",
      role: "Full-Stack Developer",
      startDate: "10/2025",
      endDate: "02/2026",
      current: false,
      location: "Addis Ababa",
      bullets: [
        "Built e-learning platform supporting 100,000+ users with offline-first architecture",
        "Implemented video streaming with offline downloads and playback resume tracking",
        "Developed exam system with timed tests, auto-grading, and offline result sync",
        "Designed background sync system with conflict resolution for offline/online consistency",
      ],
      order: 4,
    },
    {
      company: "The Desruptor Den",
      role: "Frontend Developer",
      startDate: "09/2025",
      endDate: "10/2025",
      current: false,
      bullets: [
        "Built SSR/SSG pages using Next.js for performance and SEO optimization",
        "Developed reusable UI components using Tailwind CSS",
        "Implemented code splitting and lazy loading to reduce bundle size",
      ],
      order: 5,
    },
    {
      company: "Zemenay Tech",
      role: "Full Stack Developer & Mentor",
      startDate: "01/2025",
      endDate: "05/2025",
      current: false,
      location: "Addis Ababa, Ethiopia",
      bullets: [
        "Built e-commerce platform using Next.js, Prisma, and MongoDB",
        "Integrated Telebirr payment system with transaction verification flow",
        "Improved API performance by ~30% through database and query optimization",
        "Implemented RBAC and input validation for secure operations",
      ],
      order: 6,
    },
    {
      company: "Habeshacode Software Company",
      role: "Backend Engineer",
      startDate: "01/2025",
      endDate: "12/2025",
      current: false,
      location: "Addis Ababa, Ethiopia",
      bullets: [
        "Built and maintained REST APIs for production applications with structured routing and validation",
        "Designed and optimized database schemas to improve query efficiency",
        "Developed and deployed company website with responsive frontend integration",
      ],
      order: 7,
    },
  ];

  for (const exp of experiences) {
    await prisma.experience.create({ data: exp });
  }

  // Projects
  const projects = [
    {
      title: "Wetruck.ai — Enterprise Logistics Platform",
      description:
        "Multi-tenant logistics backend with real-time GPS fleet tracking, RBAC, and high-frequency caching. Reduced external API calls by ~80% and optimized for high concurrent requests.",
      techStack: ["FastAPI", "PostgreSQL", "Redis", "AWS Lambda"],
      liveUrl: "https://play.google.com/store/apps/details?id=com.wetruck.transporter",
      githubUrl: null,
      featured: true,
      order: 0,
    },
    {
      title: "Kuriftu AI — Resort Management Platform",
      description:
        "Voice-first resort management system with real-time audio concierge via LiveKit, reservation system, and multi-property dashboard for housekeeping, dining, and guest services.",
      techStack: ["Next.js", "TypeScript", "Express", "Prisma", "LiveKit"],
      liveUrl: null,
      githubUrl: "https://github.com/Dawit212119/kuriftu-ai",
      featured: true,
      order: 1,
    },
    {
      title: "FutureX — E-Learning Platform",
      description:
        "Multi-platform e-learning system supporting 100,000+ users with offline-first architecture, video streaming with offline downloads, and exam system with auto-grading.",
      techStack: ["Next.js", "Node.js", "PostgreSQL", "Redis"],
      liveUrl: null,
      githubUrl: null,
      featured: true,
      order: 2,
    },
    {
      title: "LLM Agent Chat System",
      description:
        "Full-stack LLM chat system with real-time token-by-token streaming, LangChain tool-calling for structured API execution, and output validation to reduce hallucinated outputs.",
      techStack: ["React", "FastAPI", "LangChain", "Docker"],
      liveUrl: null,
      githubUrl: null,
      featured: true,
      order: 3,
    },
    {
      title: "PrismaMonorepoPlugin",
      description:
        "Open-source Prisma monorepo plugin for schema synchronization across services. Automates Prisma client generation in multi-package systems.",
      techStack: ["TypeScript", "Prisma", "Next.js", "Express"],
      liveUrl: null,
      githubUrl: "https://github.com/Dawit212119/PrismaMonorepoPlugin",
      featured: false,
      order: 4,
    },
    {
      title: "E-commerce Platform — Zemenay Tech",
      description:
        "Full-stack e-commerce platform with Telebirr payment integration, authentication, product/cart/order APIs, and RBAC.",
      techStack: ["Next.js", "Prisma", "MongoDB", "Telebirr"],
      liveUrl: null,
      githubUrl: "https://github.com/Dawit212119/ECO",
      featured: false,
      order: 5,
    },
    {
      title: "Document Management System",
      description:
        "Document storage with version control, rollback support, indexed search (40% faster queries), and QR-based access control.",
      techStack: ["Next.js", "Express", "Prisma", "PostgreSQL"],
      liveUrl: null,
      githubUrl: "https://github.com/Dawit212119/DMS",
      featured: false,
      order: 6,
    },
    {
      title: "Scholarship Platform",
      description:
        "Admin dashboard for scholarship applications with workflow automation, secure file uploads, and notification system.",
      techStack: ["Next.js", "Node.js", "PostgreSQL"],
      liveUrl: null,
      githubUrl: null,
      featured: false,
      order: 7,
    },
  ];

  for (const project of projects) {
    await prisma.project.create({ data: project });
  }

  console.log("Seed completed successfully!");
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
