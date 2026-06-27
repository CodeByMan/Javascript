// Central SEO configuration for Muhammad Ali Nawaz's portfolio.

function normalizeSiteUrl(value?: string) {
  if (!value) return null;

  const url = /^https?:\/\//i.test(value) ? value : `https://${value}`;
  return url.replace(/\/+$/, "");
}

const resolvedSiteUrl =
  normalizeSiteUrl(process.env.NEXT_PUBLIC_SITE_URL) ??
  normalizeSiteUrl(process.env.VERCEL_PROJECT_PRODUCTION_URL) ??
  normalizeSiteUrl(process.env.VERCEL_URL) ??
  "http://localhost:3000";

export const siteConfig = {
  name: "Muhammad Ali Nawaz",
  shortName: "M.A.N",
  title: "Muhammad Ali Nawaz | MERN Stack & Next.js Developer",
  description:
    "Portfolio of Muhammad Ali Nawaz, a MERN Stack and Next.js Developer building responsive full-stack applications, RESTful APIs, authentication, real-time features, AI integrations, and third-party API workflows. Additional experience includes Angular/MEAN development and cloud data engineering with AWS, Docker, CI/CD, and Redis.",
  url: resolvedSiteUrl,
  email: "muhammadalinawaz.dev@gmail.com",
  github: "https://github.com/CodeByMan",
  linkedin: "https://www.linkedin.com/in/muhammad-ali-nawaz-362627338/",
  location: "Karachi, Pakistan",
  profileImage: "/muhammad-ali-nawaz.png",
  keywords: [
    "Muhammad Ali Nawaz",
    "MERN Stack Developer",
    "Next.js Developer",
    "Full Stack JavaScript Developer",
    "Junior MERN Stack Developer",
    "Junior Next.js Developer",
    "MERN Stack Developer Internship",
    "Next.js Developer Internship",
    "React Developer",
    "Node.js Developer",
    "Express.js Developer",
    "MongoDB Developer",
    "TypeScript Developer",
    "RESTful API Developer",
    "Third Party API Integration",
    "AI Integration Developer",
    "Real Time Web Applications",
    "Socket.io Developer",
    "PostgreSQL Developer",
    "Angular and MEAN Stack Experience",
    "Cloud Data Engineering",
    "AWS Developer",
    "Docker CI/CD Redis",
    "Full Stack Developer Karachi",
    "MERN Developer Pakistan",
    "Next.js Developer Pakistan",
  ],
} as const;

export function getSiteUrl() {
  return siteConfig.url;
}

export function getAbsoluteUrl(path = "/") {
  const siteUrl = getSiteUrl();
  return path.startsWith("/") ? `${siteUrl}${path}` : `${siteUrl}/${path}`;
}

export function personJsonLd() {
  return {
    "@context": "https://schema.org",
    "@type": "Person",
    name: siteConfig.name,
    alternateName: siteConfig.shortName,
    url: siteConfig.url,
    email: `mailto:${siteConfig.email}`,
    image: getAbsoluteUrl(siteConfig.profileImage),
    jobTitle: "MERN Stack and Next.js Developer",
    address: {
      "@type": "PostalAddress",
      addressLocality: "Karachi",
      addressCountry: "PK",
    },
    sameAs: [siteConfig.github, siteConfig.linkedin],
    knowsAbout: [
      "MERN Stack Development",
      "Next.js Development",
      "React",
      "TypeScript",
      "Node.js",
      "Express.js",
      "MongoDB",
      "PostgreSQL",
      "RESTful APIs",
      "Authentication and Role-Based Access Control",
      "Socket.io",
      "Third-party API Integration",
      "AI API Integration",
      "Angular and MEAN Stack Development",
      "Cloud Data Engineering",
      "AWS",
      "Docker",
      "CI/CD Pipelines",
      "Redis",
    ],
  };
}

export function websiteJsonLd() {
  return {
    "@context": "https://schema.org",
    "@type": "WebSite",
    name: siteConfig.title,
    url: siteConfig.url,
    description: siteConfig.description,
    inLanguage: "en",
    publisher: {
      "@type": "Person",
      name: siteConfig.name,
      url: siteConfig.url,
    },
  };
}
