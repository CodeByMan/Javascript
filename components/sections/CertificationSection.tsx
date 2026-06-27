import Image from "next/image";
import { CalendarDays } from "lucide-react";
import SectionHeading from "@/components/SectionHeading";
import { certifications } from "@/data/portfolio";

export default function CertificationSection() {
  return (
    <section
      id="certification"
      className="w-full bg-transparent py-16 scroll-mt-20 dark:bg-background-dark"
    >
      <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
        <SectionHeading
          label="Certifications"
          title="Professional Certifications"
          subtitle="A collection of certifications and professional training across multiple technical and non-technical domains, reflecting continuous learning and practical skill development."
          alignment="center"
        />

        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {certifications.map((cert) => (
            <article
              key={`${cert.title}-${cert.institute}`}
              className="relative overflow-hidden rounded-2xl border border-border/50 bg-card/70 p-6 shadow-md shadow-primary/10 backdrop-blur-md transition-all duration-500 hover:-translate-y-1 hover:shadow-lg hover:shadow-primary/20"
            >
              <div className="absolute left-0 top-0 h-[2px] w-full bg-gradient-to-r from-primary via-[#e75e50] to-transparent opacity-80" />

              <div className="relative z-10 flex flex-col gap-4">
                <div className="flex items-start gap-4">
                  <div className="relative h-18 w-18 shrink-0 overflow-hidden rounded-xl border border-border shadow-sm sm:h-20 sm:w-20">
                    <Image
                      src={cert.logo}
                      alt={`${cert.title} certification logo`}
                      fill
                      sizes="80px"
                      className="object-cover"
                    />
                  </div>

                  <div className="flex-1">
                    <h3 className="text-lg font-semibold leading-snug text-foreground sm:text-xl">
                      {cert.title}
                    </h3>

                    <span className="mt-1 inline-block rounded-full bg-primary/10 px-2 py-1 text-xs text-primary">
                      {cert.institute}
                    </span>

                    <div className="mt-2 flex items-center gap-1 text-xs text-muted-foreground">
                      <CalendarDays size={14} />
                      {cert.duration}
                    </div>
                  </div>
                </div>

                <div className="flex flex-wrap gap-2 pt-2">
                  {cert.skills.map((skill) => (
                    <span
                      key={skill}
                      className="rounded-full border border-primary/20 bg-primary/10 px-2.5 py-1 text-[11px] text-primary transition hover:bg-primary/15"
                    >
                      {skill}
                    </span>
                  ))}
                </div>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
