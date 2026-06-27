import Image from "next/image";
import { CalendarDays, GraduationCap } from "lucide-react";
import SectionHeading from "@/components/SectionHeading";
import { education } from "@/data/portfolio";

export default function EducationSection() {
  return (
    <section
      id="education"
      className="w-full bg-transparent py-16 scroll-mt-20 dark:bg-background-dark"
    >
      <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
        <SectionHeading
          label="Education"
          title="Academic Background"
          subtitle="My academic foundation in software engineering, MERN and Next.js development, databases, cloud data engineering, and modern software practices."
          alignment="center"
        />

        <div className="space-y-6">
          {education.map((item) => (
            <article
              key={item.institute}
              className="relative overflow-hidden rounded-2xl border border-border/50 bg-card/70 p-6 shadow-md shadow-primary/20 backdrop-blur-md transition-all duration-500 hover:shadow-lg hover:shadow-primary/10 sm:p-10"
            >
              <div className="absolute left-0 top-0 h-[2px] w-full bg-gradient-to-r from-primary via-[#e75e50] to-transparent opacity-80" />

              <div className="relative z-10 flex flex-col gap-6 md:flex-row">
                <div className="relative flex h-16 w-16 shrink-0 items-center justify-center overflow-hidden rounded-xl border border-border bg-card md:h-20 md:w-20">
                  <Image
                    src={item.logo}
                    alt={`${item.institute} logo`}
                    fill
                    sizes="80px"
                    className="object-contain p-2 bg-white"
                  />
                </div>

                <div className="flex-1">
                  <h3 className="text-lg font-semibold leading-snug text-foreground md:text-xl">
                    {item.institute}
                  </h3>

                  <p className="mt-1 text-sm font-medium text-primary md:text-base">
                    {item.degree}
                  </p>

                  <div className="mt-3 flex flex-wrap gap-2">
                    <div className="flex items-center gap-1 rounded-full bg-primary/10 px-3 py-1 text-xs text-primary md:text-sm">
                      <CalendarDays size={14} />
                      {item.duration}
                    </div>

                    <div className="flex items-center gap-1 rounded-full border border-[#f97869]/30 bg-[#f97869]/10 px-3 py-1 text-xs text-[#f97869] md:text-sm">
                      <GraduationCap size={14} />
                      {item.result}
                    </div>
                  </div>

                  <p className="mt-4 text-sm leading-relaxed text-muted-foreground md:text-[15px]">
                    {item.description}
                  </p>
                </div>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
