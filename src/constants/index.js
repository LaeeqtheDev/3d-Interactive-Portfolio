/* ------------------------------------------------------------------ */
/*  PROFILE                                                            */
/* ------------------------------------------------------------------ */

export const profile = {
  name: "Syed Laeeq Ahmed",
  role: "Full-Stack Engineer",
  location: "Lahore, Pakistan",
  availability: "Open to full-time roles: remote (contract or EOR) or relocation",
  email: "laeeqthedev@gmail.com",
  phone: "+92 332 4265921",
  resume: "/Syed-Laeeq-Ahmed-CV.pdf",
  github: "https://github.com/LaeeqtheDev",
  linkedin: "https://www.linkedin.com/in/syed-laeeq-ahmed/",
  upwork: "https://www.upwork.com/freelancers/~0121dd549b3f2830da",
  yearsExperience: "5+",
};

/* ------------------------------------------------------------------ */
/*  SKILLS - every item on the CV, plus a few it has no room for       */
/* ------------------------------------------------------------------ */

export const skillGroups = [
  {
    label: "Languages",
    items: ["TypeScript", "JavaScript (ES6+)", "Python", "HTML5", "CSS3", "C++"],
  },
  {
    label: "Frontend",
    items: [
      "React.js",
      "Next.js (App Router)",
      "React Native (Expo)",
      "Redux",
      "Zustand",
      "Tailwind CSS",
      "shadcn/ui",
      "Framer Motion",
      "Web Accessibility",
    ],
  },
  {
    label: "Backend",
    items: [
      "Node.js",
      "Express.js",
      "REST APIs",
      "GraphQL",
      "Django REST Framework",
      "Microservices",
      "WebRTC",
      "Server-Side Caching",
    ],
  },
  {
    label: "Databases & Cloud",
    items: [
      "PostgreSQL",
      "MongoDB",
      "Supabase",
      "Convex",
      "Firebase",
      "AWS (EC2, S3, CloudFront, RDS)",
      "Oracle Cloud",
      "Vercel",
    ],
  },
  {
    label: "Auth & Security",
    items: [
      "JWT",
      "OAuth",
      "WebAuthn / Passkeys",
      "Clerk",
      "RBAC",
      "Multi-Tenant Architecture",
      "Data Isolation",
    ],
  },
  {
    label: "AI & Integrations",
    items: [
      "OpenAI API",
      "Google Gemini",
      "Groq",
      "Vapi AI",
      "Google Speech API",
      "Stripe",
      "Sanity CMS",
      "Google Maps API",
    ],
  },
  {
    label: "Testing & DevOps",
    items: [
      "Jest",
      "Playwright",
      "Git",
      "GitHub Actions",
      "CI/CD",
      "Docker",
      "Agile / Scrum",
      "System Design",
      "Code Review",
    ],
  },
];

/* ------------------------------------------------------------------ */
/*  EXPERIENCE - mirrors the CV line for line, newest first            */
/* ------------------------------------------------------------------ */

export const experiences = [
  {
    title: "Founder & Lead Engineer",
    company: "North Foundry",
    location: "Remote",
    date: "Jul 2026 - Present",
    current: true,
    points: [
      "Delivered web and SaaS projects for 12+ clients, leading architecture, data modeling and code review across a distributed team.",
      "Shipped the PeakHawks marketing platform on Next.js 15, Sanity CMS and GoHighLevel with case-study and blog systems, a booking flow and rate-limited API routes, so the client team publishes without touching code. Other clients include ZC Pizzeria.",
      "Deploy client applications on AWS and Vercel with GitHub Actions CI/CD; build AI chat and intake assistants with CRM integrations.",
    ],
  },
  {
    title: "Full-Stack Engineer (Contract)",
    company: "WebflowX",
    location: "Remote",
    date: "Oct 2025 - Jun 2026",
    points: [
      "Built the multi-tenant SaaS from an existing design on Next.js, TypeScript and Convex, owning the data model, auth and deployment.",
      "Implemented real-time team chat and video calling with Convex live queries and WebRTC.",
      "Integrated OpenAI, Gemini and Google Speech APIs to generate AI meeting summaries as validated structured JSON.",
      "Designed organization-level RBAC, multi-tenant data isolation and plan-based usage limits across four subscription tiers.",
      "Product onboarded 100+ teams, replacing separate chat, task and meeting tools with one workspace.",
    ],
  },
  {
    title: "Full-Stack Engineer",
    company: "Nexora Systems",
    location: "Remote (Greater London, UK)",
    date: "Jul 2024 - Oct 2025",
    points: [
      "Shortened CI build times by re-architecting Next.js and Node.js build pipelines and parallelizing test stages in GitHub Actions.",
      "Reduced API latency by replacing over-fetching REST endpoints with GraphQL and a server-side caching layer.",
      "Created a shared shadcn/ui and Tailwind CSS component library adopted across 8+ platform modules.",
      "Established Playwright and Jest end-to-end test coverage on critical user flows, reducing post-release defects.",
    ],
  },
  {
    title: "Full-Stack Engineer",
    company: "InvoiceStock",
    location: "Remote (Wolverhampton, UK)",
    date: "Jul 2022 - Jun 2024",
    points: [
      "Migrated the frontend to Next.js, TypeScript and Zustand, cutting bundle size 28% and removing a class of state-sync bugs.",
      "Architected multi-tenant data isolation and RBAC serving 50+ SMB customers.",
      "Delivered invoicing workflows with barcode scanning, PDF generation and email automation, cutting manual processing about 40%.",
    ],
  },
  {
    title: "Frontend Developer",
    company: "Routelane",
    location: "Remote (Missouri, USA)",
    date: "Mar 2021 - Jun 2022",
    points: [
      "Built real-time driver and load tracking with Firebase and the Google Maps API, giving dispatchers live operational visibility.",
      "Developed mobile-first, responsive React and Redux dashboards for dispatcher and driver workflows against REST APIs.",
    ],
  },
  {
    title: "Freelance Web Developer",
    company: "Upwork",
    location: "Remote",
    date: "Jun 2019 - Feb 2021",
    points: [
      "Delivered 15+ websites and web apps for startups and SMBs, including frontend work for the PenTutor tutoring platform.",
    ],
  },
];

export const education = [
  {
    school: "The University of Lahore",
    qualification: "BSc Computer Science",
    date: "Oct 2022 - Jun 2026",
  },
];

export const certifications = [
  { name: "Google: AI Fundamentals, AI for App Building", date: "2026" },
  { name: "HackerRank: JavaScript Specialist, Problem Solving (Intermediate)", date: "2023" },
  { name: "LinkedIn Learning: React Software Architecture", date: "2022" },
];

/* ------------------------------------------------------------------ */
/*  PROJECTS                                                           */
/*                                                                     */
/*  `live` and `repo` are optional. A card renders only the buttons    */
/*  it has real URLs for, so nothing ever links to a dead page.        */
/*  `liveLabel` overrides the "Open live" button text.                 */
/* ------------------------------------------------------------------ */

export const projects = [
  /* ---------------- Featured projects (the two on the CV) ---------------- */
  {
    name: "Sentinel",
    tagline: "Biometric parking access control",
    category: "Featured projects",
    year: "2026",
    description:
      "License-plate OCR opens a parking session, and drivers authorize their exit with device-bound WebAuthn passkeys, so fingerprint and face checks stay on the phone. Sessions are a state machine with duplicate-entry rejection, capacity enforcement and an audit log of every gate action and admin override. Django API on Oracle Cloud, Next.js on Vercel. A demo login is shown on the sign-in page.",
    stack: ["Django REST Framework", "Next.js", "TypeScript", "WebAuthn", "Tesseract OCR"],
    live: "https://sentinel-biometric-parking-system.vercel.app",
    repo: "https://github.com/LaeeqtheDev/Sentinel-Biometric-Parking-System",
    featured: true,
  },
  {
    name: "StillWater",
    tagline: "Android mental-health companion",
    category: "Featured projects",
    year: "2026",
    description:
      "Mood tracking, journaling, guided breathing, a biometric app lock and an AI companion that references the user's own entries. Safety is enforced server-side in layers: all inference routes through the Express backend, risk is classified before generation, crisis escalation takes the conversation away from the model, and every route is rate limited.",
    stack: ["React Native", "Expo", "Node.js", "Express.js", "Firebase", "Groq"],
    live: "https://github.com/LaeeqtheDev/StillWater-Mental-Health-Fitness-App/releases",
    liveLabel: "Android release",
    repo: "https://github.com/LaeeqtheDev/StillWater-Mental-Health-Fitness-App",
    featured: true,
  },

  /* ---------------- Employer & client work ---------------- */
  {
    name: "WebflowX",
    tagline: "Team workspace SaaS",
    category: "Employer & client work",
    year: "2026",
    description:
      "Chat, tasks, documents, meetings and AI summaries in one multi-tenant workspace. Built from an existing design on Convex live queries and WebRTC, with organization-level RBAC, data isolation and plan-based usage limits. OpenAI, Gemini and Google Speech generate the meeting summaries. Contract role; the product is now part of North Foundry.",
    stack: ["Next.js", "TypeScript", "Convex", "WebRTC", "OpenAI"],
    live: "https://webflow-x.vercel.app",
    repo: "https://github.com/northfoundrystudio/WebflowX",
    featured: true,
  },
  {
    name: "InvoiceStock",
    tagline: "Invoicing and inventory SaaS",
    category: "Employer & client work",
    year: "2024",
    description:
      "Invoicing and inventory platform for small businesses with barcode scanning, PDF generation, email automation and role-based dashboards. Multi-tenant data isolation and RBAC serving 50+ SMB customers.",
    stack: ["Next.js", "TypeScript", "Zustand", "RBAC"],
    live: "https://invoicestock-fin-bice.vercel.app",
    repo: "https://github.com/northfoundrystudio/invoicestock",
    featured: true,
  },
  {
    name: "PeakHawks",
    tagline: "Marketing platform for an Amazon growth agency",
    category: "Employer & client work",
    year: "2026",
    description:
      "Case-study and blog systems, a booking flow and rate-limited API routes on Next.js 15, Sanity CMS and GoHighLevel, so the client team publishes without touching code. Delivered through North Foundry.",
    stack: ["Next.js", "Sanity CMS", "GoHighLevel", "GSAP"],
    live: "https://growth.peakhawks.com",
    repo: null,
    repoNote: "Private",
  },
  {
    name: "North Foundry",
    tagline: "Studio site",
    category: "Employer & client work",
    year: "2026",
    description:
      "Marketing site for the studio: work, capabilities, a doctors vertical and a journal. Built for fast first paint and clean case-study storytelling.",
    stack: ["Next.js", "TypeScript", "Tailwind CSS"],
    live: "https://northfoundry.co",
    repo: null,
    repoNote: "Private",
  },
  {
    name: "Locopro",
    tagline: "Real estate listing platform",
    category: "Employer & client work",
    year: "2025",
    description:
      "Property listings with filters, user authentication, an admin management panel and an AI chatbot assistant. Firebase-backed and built to scale.",
    stack: ["Next.js", "Firebase", "Clerk", "shadcn/ui"],
    live: "https://locopro-client.vercel.app",
    repo: "https://github.com/northfoundrystudio/locopro-client",
  },
  {
    name: "Healthcare",
    tagline: "Medical appointment platform",
    category: "Employer & client work",
    year: "2025",
    description:
      "Appointment scheduling and patient record management with admin dashboards, SMS notifications and schema-validated forms.",
    stack: ["Next.js", "TypeScript", "Zod", "shadcn/ui"],
    live: null,
    repo: "https://github.com/northfoundrystudio/healthcare",
  },
  {
    name: "Routelane",
    tagline: "Logistics dispatch platform",
    category: "Employer & client work",
    year: "2022",
    description:
      "Real-time driver and load tracking for dispatchers, built with Firebase and the Google Maps API, plus mobile-first React and Redux dashboards for dispatcher and driver workflows.",
    stack: ["React", "Redux", "Firebase", "Google Maps API"],
    live: "https://routelanellc.vercel.app",
    repo: null,
    repoNote: "Private",
  },

  /* ---------------- Products & experiments ---------------- */
  {
    name: "OS North Foundry",
    tagline: "Internal studio operating system",
    category: "Products & experiments",
    year: "2026",
    description:
      "The internal platform North Foundry runs on: client pipeline, delivery tracking and automation workflows in one place. Private codebase, live in daily use.",
    stack: ["Next.js", "TypeScript", "Automation"],
    live: "https://os.northfoundry.co",
    repo: null,
    repoNote: "Private",
  },
  {
    name: "Converso",
    tagline: "AI voice tutoring platform",
    category: "Products & experiments",
    year: "2025",
    description:
      "Students configure a voice tutor and learn by talking to it. Saved, searchable sessions, Clerk identity enforced through Supabase Row Level Security, Zod-validated model output, plan-gated limits and Sentry monitoring.",
    stack: ["Next.js", "Supabase", "Clerk", "Vapi AI", "Stripe"],
    live: "https://converso-ai-saas-liart.vercel.app",
    repo: "https://github.com/LaeeqtheDev/Converso",
  },
  {
    name: "Axen",
    tagline: "GSAP scroll storytelling",
    category: "Products & experiments",
    year: "2025",
    description:
      "Scroll-driven 3D storytelling with layered depth effects and continuous motion transitions. An exercise in making narrative pacing hold at 60fps.",
    stack: ["Next.js", "GSAP", "Three.js"],
    live: "https://axen-gsap.vercel.app",
    repo: "https://github.com/northfoundrystudio/Axen-Gsap",
  },
  {
    name: "This portfolio",
    tagline: "Interactive WebGL island",
    category: "Products & experiments",
    year: "2025",
    description:
      "A drag-to-rotate 3D island built with React Three Fiber. Models are Draco-compressed and routes are code-split so the scene loads fast on a mid-range phone.",
    stack: ["React", "Three.js", "R3F", "Vite"],
    live: "https://laeeqthedevportfolio.vercel.app",
    repo: "https://github.com/LaeeqtheDev/3d-Interactive-Portfolio",
  },
];

export const projectCategories = [
  "Featured projects",
  "Employer & client work",
  "Products & experiments",
];

/* ------------------------------------------------------------------ */
/*  LINKS                                                              */
/* ------------------------------------------------------------------ */

export const quickLinks = [
  { label: "GitHub", href: "https://github.com/LaeeqtheDev" },
  { label: "North Foundry org", href: "https://github.com/northfoundrystudio" },
  { label: "LinkedIn", href: "https://www.linkedin.com/in/syed-laeeq-ahmed/" },
  { label: "Upwork", href: "https://www.upwork.com/freelancers/~0121dd549b3f2830da" },
  { label: "All socials", href: "https://linktr.ee/syedlaeeqahmed" },
  { label: "North Foundry", href: "https://northfoundry.co" },
];
