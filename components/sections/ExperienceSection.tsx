import Image from "next/image";
import { Briefcase, CalendarDays } from "lucide-react";
import SectionHeading from "@/components/SectionHeading";
import { experience } from "@/data/portfolio";

export default function ExperienceSection() {
  return (
    <section
      id="experience"
      className="w-full bg-transparent py-16 scroll-mt-20 dark:bg-background-dark"
    >
      <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
        <SectionHeading
          label="Experience"
          title="Professional Experience"
          subtitle="Hands-on experience in Next.js development and supporting cloud data engineering work across frontend, backend, API, and data workflows."
          alignment="center"
        />

        <div className="relative mt-14">
          <div className="absolute left-4 top-0 h-full w-[2px] bg-border/40 md:left-1/2 md:-translate-x-1/2" />

          <div className="space-y-12">
            {experience.map((exp, index) => (
              <div
                key={`${exp.company}-${exp.role}`}
                className={`relative flex flex-col items-start gap-6 md:flex-row ${
                  index % 2 === 0 ? "md:flex-row" : "md:flex-row-reverse"
                }`}
              >
                <div className="absolute left-4 top-6 md:left-1/2 md:-translate-x-1/2">
                  <div className="h-4 w-4 rounded-full border-2 border-background bg-primary shadow-lg shadow-primary/40" />
                </div>

                <article className="relative ml-12 rounded-2xl border border-border/50 bg-card/70 p-6 shadow-md shadow-primary/10 backdrop-blur-md transition-all duration-500 hover:shadow-lg hover:shadow-primary/20 md:ml-0 md:w-[48%] sm:p-8">
                  <div className="absolute left-0 top-0 h-[2px] w-full bg-gradient-to-r from-primary via-[#e75e50] to-transparent opacity-80" />

                  <div className="mb-4 flex items-center gap-4">
                    <div className="relative h-14 w-14 shrink-0 overflow-hidden rounded-xl border border-border bg-white p-1.5">
                      <Image
                        src={exp.logo}
                        alt={`${exp.company} logo`}
                        fill
                        sizes="56px"
                        className="object-contain"
                      />
                    </div>

                    <div>
                      <h3 className="text-lg font-semibold text-foreground">
                        {exp.company}
                      </h3>
                      <p className="text-sm font-medium text-primary">
                        {exp.role}
                      </p>
                    </div>
                  </div>

                  <div className="mb-4 flex flex-wrap gap-2">
                    <span className="flex items-center gap-1 rounded-full bg-primary/10 px-3 py-1 text-xs text-primary">
                      <CalendarDays size={12} />
                      {exp.duration}
                    </span>

                    <span className="flex items-center gap-1 rounded-full bg-[#f97869]/10 px-3 py-1 text-xs text-[#f97869]">
                      <Briefcase size={12} />
                      {exp.type}
                    </span>
                  </div>

                  <p className="text-sm leading-relaxed text-muted-foreground">
                    {exp.description}
                  </p>

                  <ul className="mt-4 space-y-2 text-sm text-muted-foreground">
                    {exp.highlights.slice(0, 6).map((item) => (
                      <li key={item} className="flex gap-2">
                        <span className="text-primary">•</span>
                        {item}
                      </li>
                    ))}
                  </ul>
                </article>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
