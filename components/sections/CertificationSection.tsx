"use client";

import { useState } from "react";
import Image from "next/image";
import { CalendarDays, ChevronDown, ChevronUp } from "lucide-react";
import SectionHeading from "@/components/SectionHeading";
import { certifications } from "@/data/portfolio";

const INITIAL_CERTIFICATE_COUNT = 3;

export default function CertificationSection() {
  const [showAll, setShowAll] = useState(false);

  const hasMoreCertifications =
    certifications.length > INITIAL_CERTIFICATE_COUNT;

  const visibleCertifications = showAll
    ? certifications
    : certifications.slice(0, INITIAL_CERTIFICATE_COUNT);

  return (
    <section
      id="certification"
      className="w-full scroll-mt-20 bg-transparent py-14 sm:py-16 dark:bg-background-dark"
    >
      <div className="mx-auto w-full max-w-6xl px-4 sm:px-6 lg:px-8">
        <SectionHeading
          label="Certifications"
          title="Professional Certifications"
          subtitle="A collection of certifications and professional training across multiple technical and non-technical domains, reflecting continuous learning and practical skill development."
          alignment="center"
        />

        <div className="grid grid-cols-1 items-stretch gap-6 sm:grid-cols-2 sm:gap-7 lg:grid-cols-3 lg:gap-8">
          {visibleCertifications.map((cert, index) => (
            <article
              key={`${cert.title}-${cert.institute}`}
              className="
                animate-fadeUp
                group
                relative
                flex
                min-w-0
                flex-col
                overflow-hidden
                rounded-2xl
                border border-border/50
                bg-card/70
                shadow-md shadow-primary/10
                backdrop-blur-md
                transition-all duration-500
                hover:-translate-y-1
                hover:border-primary/30
                hover:shadow-lg
                hover:shadow-primary/20
              "
              style={{ animationDelay: `${index * 0.05}s` }}
            >
              <div className="absolute left-0 top-0 z-20 h-[2px] w-full bg-gradient-to-r from-primary via-[#e75e50] to-transparent opacity-80" />

              {/* CERTIFICATE IMAGE */}
              <div className="relative aspect-[4/3] w-full overflow-hidden border-b border-border/50 bg-white p-3 sm:p-4 dark:bg-white/95">
                <Image
                  src={cert.logo}
                  alt={`${cert.title} certificate`}
                  fill
                  sizes="(max-width: 639px) calc(100vw - 32px), (max-width: 1023px) calc(50vw - 36px), 352px"
                  className="object-contain p-3 transition-transform duration-500 group-hover:scale-[1.02] sm:p-4"
                />
              </div>

              {/* CERTIFICATE DETAILS */}
              <div className="flex flex-1 flex-col p-4 sm:p-5">
                <div className="min-w-0">
                  <h3 className="break-words text-base font-semibold leading-snug text-foreground sm:text-lg">
                    {cert.title}
                  </h3>

                  <span className="mt-2 inline-flex max-w-full rounded-full bg-primary/10 px-2.5 py-1 text-xs font-medium text-primary">
                    <span className="truncate">{cert.institute}</span>
                  </span>

                  <div className="mt-3 flex items-center gap-1.5 text-xs text-muted-foreground">
                    <CalendarDays
                      size={14}
                      className="shrink-0"
                      aria-hidden="true"
                    />
                    <span className="break-words">{cert.duration}</span>
                  </div>
                </div>

                {cert.skills.length > 0 && (
                  <div className="mt-4 flex flex-wrap gap-2 border-t border-border/40 pt-4">
                    {cert.skills.map((skill) => (
                      <span
                        key={skill}
                        className="max-w-full break-words rounded-full border border-primary/20 bg-primary/10 px-2.5 py-1 text-[11px] leading-tight text-primary transition-colors hover:bg-primary/15"
                      >
                        {skill}
                      </span>
                    ))}
                  </div>
                )}
              </div>
            </article>
          ))}
        </div>

        {hasMoreCertifications && (
          <div className="mt-8 flex w-full justify-center sm:mt-10">
            <button
              type="button"
              onClick={() => setShowAll((current) => !current)}
              aria-expanded={showAll}
              aria-controls="certification"
              className="
                inline-flex
                min-h-11
                w-full
                items-center
                justify-center
                gap-2
                rounded-xl
                border border-primary/30
                bg-primary/10
                px-5 py-2.5
                text-sm
                font-semibold
                text-primary
                transition-all duration-300
                hover:-translate-y-0.5
                hover:border-primary/50
                hover:bg-primary/15
                hover:shadow-md
                focus-visible:outline-none
                focus-visible:ring-2
                focus-visible:ring-primary/50
                focus-visible:ring-offset-2
                focus-visible:ring-offset-background
                sm:w-auto
                sm:min-w-[220px]
              "
            >
              {showAll ? (
                <>
                  Show fewer certifications
                  <ChevronUp size={17} aria-hidden="true" />
                </>
              ) : (
                <>
                  See more certifications
                  <ChevronDown size={17} aria-hidden="true" />
                </>
              )}
            </button>
          </div>
        )}
      </div>
    </section>
  );
}
