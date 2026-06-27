"use client";

import { useMemo, useState } from "react";
import Image from "next/image";
import { FaGithub } from "react-icons/fa";
import SectionHeading from "@/components/SectionHeading";
import { projects } from "@/data/portfolio";

const filters = [
  { id: "mern", label: "MERN" },
  { id: "nextjs", label: "Next.js" },
  { id: "data", label: "Data" },
] as const;

type FilterId = (typeof filters)[number]["id"];
type Project = (typeof projects)[number];

function ProjectCard({ project }: { project: Project }) {
  const repoUrl = String(project.repoUrl ?? "");
  const hasRepo = repoUrl.length > 0 && repoUrl !== "#";

  return (
    <article className="group relative overflow-hidden rounded-2xl border border-border/50 bg-card/70 shadow-md shadow-primary/10 backdrop-blur-md transition-all duration-300 hover:-translate-y-1 hover:shadow-lg hover:shadow-primary/20">
      <div className="relative aspect-[16/9] w-full overflow-hidden">
        <Image
          src={project.image}
          alt={`${project.title} project screenshot by Muhammad Ali Nawaz`}
          fill
          sizes="(max-width: 768px) 100vw, 50vw"
          className="object-contain transition-transform duration-500 group-hover:scale-105"
        />
      </div>

      <div className="flex flex-col justify-between p-5">
        <h3 className="text-center text-lg font-bold text-foreground">
          {project.title}
        </h3>

        <p className="mt-2 text-center text-sm text-muted-foreground">
          {project.description}
        </p>

        <div className="mt-4 flex flex-wrap justify-center gap-2">
          {project.tech.map((tech) => (
            <span
              key={tech}
              className="rounded-full bg-primary/10 px-2.5 py-1 text-xs text-primary"
            >
              {tech}
            </span>
          ))}
        </div>

        <div className="mt-5 flex gap-3">
          <a
            href={hasRepo ? project.repoUrl : "https://github.com/CodeByMan"}
            target="_blank"
            rel="noopener noreferrer"
            className="flex flex-1 items-center justify-center gap-2 rounded-lg border border-border py-2.5 text-sm font-medium text-foreground transition hover:bg-primary/10"
            aria-label={
              hasRepo
                ? `Open ${project.title} GitHub repository`
                : "Open Muhammad Ali Nawaz GitHub profile"
            }
          >
            <FaGithub />
            {hasRepo ? "GitHub" : "GitHub Profile"}
          </a>
        </div>
      </div>

      <div className="absolute bottom-0 left-0 h-[6px] w-full bg-blue-500/20 opacity-60 blur-xl" />
    </article>
  );
}

export default function ProjectsSection() {
  const [activeFilter, setActiveFilter] = useState<FilterId>("mern");

  const filteredProjects = useMemo(
    () =>
      projects.filter((project) =>
        (project.categories as readonly string[]).includes(activeFilter)
      ),
    [activeFilter]
  );

  return (
    <section id="projects" className="scroll-mt-20 px-6 py-24 md:px-12 lg:px-20">
      <SectionHeading
        label="Projects"
        title="My Work Portfolio"
        subtitle="Explore my MERN, Next.js, and cloud data engineering projects by category. The work includes full-stack systems, APIs, authentication, real-time features, AI integrations, and third-party services."
        alignment="center"
      />

      <div
        className="mx-auto flex max-w-3xl flex-wrap justify-center gap-2"
        role="toolbar"
        aria-label="Filter projects by technology"
      >
        {filters.map((filter) => {
          const isActive = activeFilter === filter.id;

          return (
            <button
              key={filter.id}
              type="button"
              onClick={() => setActiveFilter(filter.id)}
              aria-pressed={isActive}
              className={`rounded-full border px-4 py-2 text-sm font-semibold transition-all duration-200 ${
                isActive
                  ? "border-primary bg-primary text-primary-foreground shadow-md shadow-primary/20"
                  : "border-border bg-card/70 text-muted-foreground hover:border-primary/40 hover:text-foreground"
              }`}
            >
              {filter.label}
            </button>
          );
        })}
      </div>

      <p className="sr-only" aria-live="polite">
        Showing {filteredProjects.length} {activeFilter} projects.
      </p>

      <div className="mx-auto mt-10 max-w-5xl">
        <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
          {filteredProjects.map((project) => (
            <ProjectCard key={project.title} project={project} />
          ))}
        </div>
      </div>

      <div className="mt-16 flex justify-center">
        <a
          href="https://github.com/CodeByMan"
          target="_blank"
          rel="noopener noreferrer"
          className="group relative inline-flex items-center gap-2 overflow-hidden rounded-full px-6 py-3 text-sm font-semibold text-primary transition-all duration-300 hover:text-primary md:text-base"
        >
          <svg
            className="pointer-events-none absolute inset-0 h-full w-full"
            viewBox="0 0 260 52"
            preserveAspectRatio="none"
            aria-hidden="true"
          >
            <rect
              x="2"
              y="2"
              width="256"
              height="48"
              rx="24"
              ry="24"
              className="github-border-base"
            />
            <rect
              x="2"
              y="2"
              width="256"
              height="48"
              rx="24"
              ry="24"
              className="github-border-snake"
            />
          </svg>
          <span className="relative z-10">View all projects on GitHub</span>
          <span className="relative z-10 inline-flex transition-transform duration-300 group-hover:translate-x-2">
            →
          </span>
        </a>
      </div>
    </section>
  );
}
