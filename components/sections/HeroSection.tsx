import Image from "next/image";
import { ArrowRight, Mail } from "lucide-react";
import { FaGithub, FaLinkedin } from "react-icons/fa";
import { Button } from "@/components/ui/button";
import TypingRoles from "@/components/TypingRoles";
import OpenToWorkBadge from "@/components/OpenToWorkBadge";
import { contact } from "@/data/portfolio";

export default function HeroSection() {
  return (
    <section
      id="home"
      className="container relative mx-auto flex min-h-screen items-center overflow-visible px-4 sm:px-6"
    >
      <div className="grid w-full grid-cols-1 items-center gap-12 lg:grid-cols-12 lg:gap-16">
        <div className="space-y-6 lg:col-span-7">
          <div className="mt-20 flex items-center gap-4 animate-fade-in sm:mt-0">
            <a
              href={contact.github}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2 text-muted-foreground transition-colors duration-200 hover:text-foreground"
              aria-label="Open GitHub profile"
            >
              <FaGithub className="h-5 w-5" />
              <span className="text-sm font-medium">GitHub</span>
            </a>
            <span className="text-border" aria-hidden="true">|</span>
            <a
              href={contact.linkedin}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2 text-muted-foreground transition-colors duration-200 hover:text-foreground"
              aria-label="Open LinkedIn profile"
            >
              <FaLinkedin className="h-5 w-5" />
              <span className="text-sm font-medium">LinkedIn</span>
            </a>
          </div>

          <div className="space-y-6">
            <OpenToWorkBadge />

            <h1
              className="font-display text-5xl font-black leading-[1.05] tracking-tight animate-fade-in sm:text-6xl md:text-6xl"
              style={{ animationDelay: "0.1s" }}
            >
              <span className="text-gradient">Muhammad Ali Nawaz</span>
            </h1>
            <p
              className="text-xl font-semibold tracking-wide text-foreground/80 animate-fade-in sm:text-2xl"
              style={{ animationDelay: "0.2s" }}
            >
              I&apos;m a <TypingRoles />
            </p>
          </div>

          <p
            className="max-w-xl border-l-2 border-primary/40 pl-4 text-lg leading-relaxed text-muted-foreground animate-fade-in"
            style={{ animationDelay: "0.3s" }}
          >
            I build MERN and Next.js applications that integrate secure APIs, real-time functionality, AI-powered features, and cloud data workflows to deliver scalable, and engaging user experiences.
          </p>

          <div
            className="flex flex-wrap gap-3 animate-slide-in"
            style={{ animationDelay: "0.4s" }}
          >
            <Button asChild size="lg" className="gap-2 rounded-md font-semibold">
              <a href="#projects">
                View Projects <ArrowRight className="h-4 w-4" />
              </a>
            </Button>
            {/* <Button
              asChild
              variant="ghost"
              size="lg"
              className="gap-2 rounded-md font-semibold"
            >
              <a
                href="/Resume_MERN_Stack Developer_NextJS_Muhammad_Ali_Nawaz_2026.pdf"
                download
              >
                <Download className="h-4 w-4" /> Download CV
              </a>
            </Button> */}
            <Button
              asChild
              variant="outline"
              size="lg"
              className="gap-2 rounded-md font-semibold"
            >
              <a href={`mailto:${contact.email}`}>
                <Mail className="h-4 w-4" /> Contact Me
              </a>
            </Button>
          </div>

          <div
            className="grid grid-cols-2 gap-4 border-t border-border/40 pt-4 animate-fade-in sm:grid-cols-4"
            style={{ animationDelay: "0.55s" }}
          >
            {[
              ["Frontend", "React · Next.js · Angular"],
              ["Backend", "Node.js · Express · NestJS"],
              ["Database", "MongoDB · PostgreSQL"],
              ["Cloud / AI", "AWS · Docker · AI APIs"],
            ].map(([label, value]) => (
              <div key={label} className="text-center">
                <div className="font-bold text-primary">{label}</div>
                <div className="text-xs text-muted-foreground">{value}</div>
              </div>
            ))}
          </div>
        </div>

        <div className="mt-8 flex justify-center lg:col-span-5 lg:mt-0 lg:justify-end">
          <div className="relative max-h-full max-w-full">
            <div className="absolute -inset-4 rounded-3xl bg-gradient-to-tr from-primary/20 to-accent/20 opacity-60 blur-2xl animate-pulse-slow md:-inset-6" />
            <div className="absolute -inset-[2px] z-0 rounded-3xl bg-gradient-to-br from-primary/50 via-transparent to-accent/50 md:-inset-[3px]" />

            <Image
              src="/muhammad-ali-nawaz.png"
              alt="Muhammad Ali Nawaz, MERN Stack and Next.js Developer"
              width={320}
              height={320}
              priority
              className="relative z-10 h-64 w-64 max-h-full max-w-full rounded-3xl object-cover object-center shadow-2xl sm:h-64 sm:w-64 md:h-80 md:w-80"
            />

            <div className="absolute -bottom-3 -right-3 z-0 h-16 w-16 rounded-2xl bg-primary/10 md:-bottom-4 md:-right-4 md:h-24 md:w-24" />
            <div className="absolute -left-3 -top-3 z-0 h-12 w-12 rounded-xl bg-accent/10 md:-left-4 md:-top-4 md:h-16 md:w-16" />
          </div>
        </div>
      </div>
    </section>
  );
}
