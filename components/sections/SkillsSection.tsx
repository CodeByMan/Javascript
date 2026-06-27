import type { ReactNode } from "react";
import SectionHeading from "@/components/SectionHeading";
import { skillCategories as categories, sliderSkills } from "@/data/portfolio";

import {
  FaHtml5,
  FaCss3Alt,
  FaJs,
  FaBootstrap,
  FaReact,
  FaAngular,
  FaNodeJs,
  FaGitAlt,
  FaGithub,
  FaFigma,
  FaDocker,
  FaAws,
  FaCloudUploadAlt,
  FaServer,
  FaBell,
  FaExchangeAlt,
  FaDatabase,
  FaSearch,
  FaBolt,
  FaCodeBranch,
  FaTasks,
  FaProjectDiagram,
  FaFileWord,
  FaFileExcel,
  FaFilePowerpoint,
} from "react-icons/fa";

import {
  SiJquery,
  SiTailwindcss,
  SiNextdotjs,
  SiExpress,
  SiMongodb,
  SiFirebase,
  SiPostgresql,
  SiApachekafka,
  SiApacheairflow,
  SiFastapi,
  SiTypescript,
  SiVercel,
  SiCanva,
  SiXampp,
  SiMui,
  SiGooglesearchconsole,
  SiGrammarly,
  SiGithubactions,
  SiJira,
  SiPython,
  SiMysql,
  SiPostman,
  SiGraphql,
  SiOpenai,
  SiJson,
  SiXml,
  SiStripe,
  SiRedux,
  SiVite,
  SiNestjs,
} from "react-icons/si";

import { VscVscode } from "react-icons/vsc";
import { MdOutlineExtension } from "react-icons/md";

// ======================================================
// SKILLS DATA
// ======================================================

type SkillData = {
  icon: ReactNode;
  color: string;
};

const fallbackSkillData: SkillData = {
  icon: <MdOutlineExtension />,
  color: "#64748B",
};

const skillDataMap: Record<string, SkillData> = {
  // FRONTEND
  HTML5: { icon: <FaHtml5 />, color: "#E34F26" },
  CSS3: { icon: <FaCss3Alt />, color: "#1572B6" },
  JavaScript: { icon: <FaJs />, color: "#F7DF1E" },
  TypeScript: { icon: <SiTypescript />, color: "#3178C6" },
  jQuery: { icon: <SiJquery />, color: "#0769AD" },
  Bootstrap: { icon: <FaBootstrap />, color: "#7952B3" },
  "Tailwind CSS": { icon: <SiTailwindcss />, color: "#06B6D4" },
  "Material UI": { icon: <SiMui />, color: "#007FFF" },
  React: { icon: <FaReact />, color: "#61DAFB" },
  "Next.js": { icon: <SiNextdotjs />, color: "#111111" },
  "Next JS": { icon: <SiNextdotjs />, color: "#111111" },
  Angular: { icon: <FaAngular />, color: "#DD0031" },
  Redux: { icon: <SiRedux />, color: "#764ABC" },
  Vite: { icon: <SiVite />, color: "#646CFF" },

  // BACKEND
  Node: { icon: <FaNodeJs />, color: "#339933" },
  "Node.js": { icon: <FaNodeJs />, color: "#339933" },
  Express: { icon: <SiExpress />, color: "#111111" },
  "Express.js": { icon: <SiExpress />, color: "#111111" },
  NestJS: { icon: <SiNestjs />, color: "#E0234E" },
  "Nest.js": { icon: <SiNestjs />, color: "#E0234E" },
  FastAPI: { icon: <SiFastapi />, color: "#009688" },
  Python: { icon: <SiPython />, color: "#3776AB" },
  "RESTful API": { icon: <FaExchangeAlt />, color: "#2563EB" },
  GraphAPI: { icon: <SiGraphql />, color: "#E10098" },
  GraphQL: { icon: <SiGraphql />, color: "#E10098" },
  Stripe: { icon: <SiStripe />, color: "#635BFF" },
  "AI Integration": { icon: <SiOpenai />, color: "#10A37F" },
  "AI Integrations": { icon: <SiOpenai />, color: "#10A37F" },
  "MERN + AI": { icon: <SiOpenai />, color: "#10A37F" },
  "MEAN + AI": { icon: <SiOpenai />, color: "#10A37F" },
  "Next.js + AI": { icon: <SiOpenai />, color: "#10A37F" },
  "Third-party API": { icon: <FaExchangeAlt />, color: "#2563EB" },
  "Third-party API Integration": { icon: <FaExchangeAlt />, color: "#2563EB" },
  "Third-party APIs": { icon: <FaExchangeAlt />, color: "#2563EB" },

  // DATABASES
  MongoDB: { icon: <SiMongodb />, color: "#47A248" },
  "MongoDB Atlas": { icon: <SiMongodb />, color: "#47A248" },
  Mongoose: { icon: <FaDatabase />, color: "#880000" },
  "SQL Server": { icon: <FaDatabase />, color: "#CC2927" },
  MySQL: { icon: <SiMysql />, color: "#4479A1" },
  PostgreSQL: { icon: <SiPostgresql />, color: "#336791" },
  Firebase: { icon: <SiFirebase />, color: "#FFCA28" },
  "Firebase Database": { icon: <SiFirebase />, color: "#FFCA28" },

  // CLOUD, DATA ENGINEERING & DEVOPS
  AWS: { icon: <FaAws />, color: "#FF9900" },
  "AWS S3": { icon: <FaCloudUploadAlt />, color: "#569A31" },
  "AWS EC2": { icon: <FaServer />, color: "#FF9900" },
  "AWS SNS": { icon: <FaBell />, color: "#DD344C" },
  "AWS SQS": { icon: <FaExchangeAlt />, color: "#FF4F8B" },
  "AWS Glue": { icon: <FaProjectDiagram />, color: "#2563EB" },
  Athena: { icon: <FaSearch />, color: "#CA8A04" },
  Lambda: { icon: <FaBolt />, color: "#FF9900" },
  "AWS Lambda": { icon: <FaBolt />, color: "#FF9900" },
  "AWS Console": { icon: <FaAws />, color: "#FF9900" },
  Linux: { icon: <FaServer />, color: "#FCC624" },
  Ubuntu: { icon: <FaServer />, color: "#E95420" },
  Kafka: { icon: <SiApachekafka />, color: "#111111" },
  "Apache Airflow": { icon: <SiApacheairflow />, color: "#017CEE" },
  Docker: { icon: <FaDocker />, color: "#2496ED" },
  "CI/CD Pipeline": { icon: <SiGithubactions />, color: "#2088FF" },
  "CI/CD Pipelines": { icon: <SiGithubactions />, color: "#2088FF" },
  Vercel: { icon: <SiVercel />, color: "#111111" },

  // TOOLS
  Git: { icon: <FaGitAlt />, color: "#F05032" },
  GitHub: { icon: <FaGithub />, color: "#111111" },
  "VS Code": { icon: <VscVscode />, color: "#007ACC" },
  Figma: { icon: <FaFigma />, color: "#F24E1E" },
  Canva: { icon: <SiCanva />, color: "#00C4CC" },
  Jira: { icon: <SiJira />, color: "#0052CC" },
  XAMPP: { icon: <SiXampp />, color: "#FB7A24" },
  Postman: { icon: <SiPostman />, color: "#FF6C37" },
  "Thunder Client": { icon: <FaBolt />, color: "#6D5DF2" },
  SEO: { icon: <SiGooglesearchconsole />, color: "#22C55E" },
  "On-page SEO": { icon: <SiGooglesearchconsole />, color: "#22C55E" },
  "Off-page SEO": { icon: <SiGooglesearchconsole />, color: "#16A34A" },
  "Technical SEO": { icon: <SiGooglesearchconsole />, color: "#15803D" },
  Grammarly: { icon: <SiGrammarly />, color: "#15C39A" },
  "Agile Methodologies": { icon: <FaTasks />, color: "#8B5CF6" },
  "Ms Word": { icon: <FaFileWord />, color: "#2B579A" },
  "MS Word": { icon: <FaFileWord />, color: "#2B579A" },
  "Ms Excel": { icon: <FaFileExcel />, color: "#217346" },
  "MS Excel": { icon: <FaFileExcel />, color: "#217346" },
  "Ms Powerpoint": { icon: <FaFilePowerpoint />, color: "#D24726" },
  "MS PowerPoint": { icon: <FaFilePowerpoint />, color: "#D24726" },
  "MS Powerpoint": { icon: <FaFilePowerpoint />, color: "#D24726" },
  JSON: { icon: <SiJson />, color: "#111111" },
  XML: { icon: <SiXml />, color: "#E37933" },
  "Data Engineering": { icon: <FaDatabase />, color: "#2563EB" },
  "Data Analysis": { icon: <FaDatabase />, color: "#2563EB" },
  "Data Visualization": { icon: <FaProjectDiagram />, color: "#0EA5E9" },
  "Web Scraping": { icon: <FaSearch />, color: "#8B5CF6" },
  Visualization: { icon: <FaProjectDiagram />, color: "#0EA5E9" },
  "Cloud Deployment": { icon: <FaCloudUploadAlt />, color: "#0EA5E9" },
  "Backend APIs": { icon: <FaExchangeAlt />, color: "#2563EB" },
  "System Design": { icon: <FaProjectDiagram />, color: "#8B5CF6" },
  "Version Control": { icon: <FaCodeBranch />, color: "#F05032" },
};

// ======================================================
// SKILL ITEM
// ======================================================

function SkillItem({ skill }: { skill: string }) {
  const data = skillDataMap[skill] ?? fallbackSkillData;

  return (
    <div
      className="
        flex flex-col items-center justify-center
        rounded-2xl
        border border-border/60
        bg-background/70
        px-3 py-4
        text-center
        transition-all duration-300
        hover:-translate-y-1
        hover:border-primary/30
        hover:shadow-lg
        backdrop-blur-sm
      "
    >
      <div
        className="
          mb-3
          flex h-12 w-12
          items-center justify-center
          rounded-xl
          bg-white dark:bg-black
          shadow-sm
          text-[22px]
        "
        style={{ color: data.color }}
      >
        {data.icon}
      </div>

      <span
        className="
          text-[12px] sm:text-[13px]
          font-semibold
          leading-tight
          text-foreground
        "
      >
        {skill}
      </span>
    </div>
  );
}

// ======================================================
// CARD
// ======================================================

function SkillCard({
  card,
  index,
}: {
  card: (typeof categories)[number];
  index: number;
}) {
  return (
    <div
      className="animate-fadeUp 
        relative
        overflow-hidden
        rounded-3xl
        border border-border/60
        bg-card/80
        p-4 sm:p-5 lg:p-6
        shadow-sm
        backdrop-blur
        transition-all duration-300
        hover:shadow-xl
      "
      style={{ animationDelay: `${index * 0.05}s` }}
    >
      {/* TOP ACCENT BAR */}
      <div className="absolute top-0 left-0 w-full h-[2px] bg-gradient-to-r from-primary via-[#e75e50] to-transparent opacity-70" />

      {/* HEADER */}
      <div className="mb-4 flex items-start justify-between gap-2">
        <div>
          <span className="text-[11px] font-bold tracking-[0.25em] text-primary">
            {card.number}
          </span>

          <h3 className="mt-2 text-[18px] sm:text-[20px] font-bold text-foreground">
            {card.title}
          </h3>
        </div>

        <div
          className="
            rounded-xl
            border border-border/50
            bg-card/80
            px-4 py-3
            text-[12px]
            shadow-sm
            backdrop-blur
            transition-all duration-300
            hover:shadow-md
          "
        >
          {card.skills.length} skills
        </div>
      </div>

      {/* SKILLS GRID */}
      <div
        className="
          grid
          grid-cols-2
          sm:grid-cols-3
          lg:grid-cols-4
          gap-3
        "
      >
        {card.skills.map((skill) => (
          <SkillItem key={skill} skill={skill} />
        ))}
      </div>
    </div>
  );
}

// ======================================================
// SLIDER
// ======================================================

function BottomSlider() {
  return (
    <div className="mt-10 overflow-hidden rounded-[22px] border border-border bg-gradient-to-r from-primary/10 via-card to-primary/10 py-5">
      <div className="skills-marquee flex w-max items-center gap-10">
        {[...sliderSkills, ...sliderSkills].map((skill, i) => {
          const data = skillDataMap[skill] ?? fallbackSkillData;

          return (
            <div key={`${skill}-${i}`} className="flex items-center gap-2 whitespace-nowrap">
              <span className="text-[22px]" style={{ color: data.color }}>
                {data.icon}
              </span>

              <span className="text-[14px] font-semibold text-foreground">
                {skill}
              </span>
            </div>
          );
        })}
      </div>
    </div>
  );
}

// ======================================================
// MAIN SECTION
// ======================================================

export default function SkillsSection() {
  return (
    <section
      id="skills"
      className="
        relative overflow-hidden
        bg-transparent
        py-14 lg:py-16
      "
    >
      <div
        className="
          relative z-10
          mx-auto
          max-w-6xl
          px-4 sm:px-6 lg:px-8
        "
      >
        {/* HEADING */}
        <SectionHeading
          label="Skills"
          title="Technical Skills"
          subtitle="Technologies I use primarily for MERN Stack and Next.js applications, with supporting Angular/MEAN, cloud data engineering, AI integration, and DevOps skills."
          alignment="center"
        />

        {/* CARDS */}
        <div
          className="
            grid
            grid-cols-1
            md:grid-cols-2
            gap-4 sm:gap-5 lg:gap-6
          "
        >
          {categories.map((card, index) => (
            <SkillCard key={card.title} card={card} index={index} />
          ))}
        </div>

        {/* BOTTOM SLIDER */}
        <BottomSlider />
      </div>
    </section>
  );
}
