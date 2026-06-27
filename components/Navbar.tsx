"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import { Download, Menu, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { ThemeToggle } from "@/components/ThemeToggle";
import { cn } from "@/lib/utils";

const navLinks = [
  { name: "Home", to: "home" },
  { name: "Skills", to: "skills" },
  { name: "Experience", to: "experience" },
  { name: "Projects", to: "projects" },
  { name: "Education", to: "education" },
  { name: "Certification", to: "certification" },
  { name: "Contact", to: "contact" },
];

const RESUME_URL =
  "/Resume_MERN_Stack Developer_NextJS_Muhammad_Ali_Nawaz_2026.pdf";

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [activeSection, setActiveSection] = useState("home");

  const headerRef = useRef<HTMLElement>(null);
  const menuButtonRef = useRef<HTMLButtonElement>(null);
  const firstMobileLinkRef = useRef<HTMLAnchorElement>(null);

  const closeMenu = () => setIsOpen(false);

  // Keep the translucent header state in sync without running layout work on
  // every scroll event.
  useEffect(() => {
    let animationFrameId: number | null = null;

    const updateScrolledState = () => {
      setScrolled(window.scrollY > 20);
      animationFrameId = null;
    };

    const handleScroll = () => {
      if (animationFrameId !== null) return;

      animationFrameId = window.requestAnimationFrame(updateScrolledState);
    };

    updateScrolledState();
    window.addEventListener("scroll", handleScroll, { passive: true });

    return () => {
      window.removeEventListener("scroll", handleScroll);

      if (animationFrameId !== null) {
        window.cancelAnimationFrame(animationFrameId);
      }
    };
  }, []);

  // Observe sections instead of recalculating every section's position during
  // every scroll event.
  useEffect(() => {
    const sections = navLinks
      .map((link) => document.getElementById(link.to))
      .filter((section): section is HTMLElement => section !== null);

    if (sections.length === 0) return;

    const observer = new IntersectionObserver(
      (entries) => {
        const mostVisibleSection = entries
          .filter((entry) => entry.isIntersecting)
          .sort((a, b) => b.intersectionRatio - a.intersectionRatio)[0];

        if (mostVisibleSection?.target.id) {
          setActiveSection(mostVisibleSection.target.id);
        }
      },
      {
        rootMargin: "-20% 0px -60% 0px",
        threshold: [0, 0.1, 0.25, 0.5, 0.75],
      }
    );

    sections.forEach((section) => observer.observe(section));

    return () => observer.disconnect();
  }, []);

  // Focus the first mobile link when the menu opens. Escape closes the menu
  // and returns focus to the trigger. Clicking outside closes it as well.
  useEffect(() => {
    if (!isOpen) return;

    const focusFrameId = window.requestAnimationFrame(() => {
      firstMobileLinkRef.current?.focus();
    });

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key !== "Escape") return;

      setIsOpen(false);
      menuButtonRef.current?.focus();
    };

    const handlePointerDown = (event: PointerEvent) => {
      const target = event.target;

      if (
        target instanceof Node &&
        headerRef.current &&
        !headerRef.current.contains(target)
      ) {
        setIsOpen(false);
      }
    };

    document.addEventListener("keydown", handleKeyDown);
    document.addEventListener("pointerdown", handlePointerDown);

    return () => {
      window.cancelAnimationFrame(focusFrameId);
      document.removeEventListener("keydown", handleKeyDown);
      document.removeEventListener("pointerdown", handlePointerDown);
    };
  }, [isOpen]);

  // Ensure the mobile menu cannot remain open after crossing into the desktop
  // layout.
  useEffect(() => {
    const desktopMediaQuery = window.matchMedia("(min-width: 1024px)");

    const handleDesktopChange = (event: MediaQueryListEvent) => {
      if (event.matches) setIsOpen(false);
    };

    desktopMediaQuery.addEventListener("change", handleDesktopChange);

    return () => {
      desktopMediaQuery.removeEventListener("change", handleDesktopChange);
    };
  }, []);

  const handleScrollTo = (id: string) => {
    closeMenu();

    const element = document.getElementById(id);
    if (!element) return;

    const prefersReducedMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    ).matches;

    element.scrollIntoView({
      behavior: prefersReducedMotion ? "auto" : "smooth",
      block: "start",
    });
  };

  return (
    <header
      ref={headerRef}
      className={cn(
        "fixed top-0 left-0 right-0 z-50 py-3 transition-all duration-300",
        scrolled
          ? "bg-background/60 backdrop-blur-xl shadow-md border-b border-border/30"
          : "bg-background/40 backdrop-blur-lg"
      )}
    >
      {/* NAVBAR WRAPPER */}
      <div className="w-full px-4 lg:px-6">
        <div className="flex items-center">
          {/* LEFT: LOGO */}
          <div className="flex flex-1 justify-start">
            <Link
              href="/#home"
              aria-label="Go to the home section"
              className="text-xl font-display font-bold text-gradient"
            >
              M.A.N
            </Link>
          </div>

          {/* CENTER: NAV LINKS */}
          <nav
            aria-label="Primary navigation"
            className="hidden flex-1 justify-center gap-1 lg:flex"
          >
            {navLinks.map((link) => {
              const isActive = activeSection === link.to;

              return (
                <a
                  key={link.to}
                  href={`#${link.to}`}
                  aria-current={isActive ? "page" : undefined}
                  onClick={(event) => {
                    event.preventDefault();
                    handleScrollTo(link.to);
                  }}
                  className={cn(
                    "relative select-none rounded-md px-3 py-2 text-sm font-medium transition-colors duration-200",
                    isActive
                      ? "text-primary"
                      : "text-muted-foreground hover:text-foreground"
                  )}
                >
                  {link.name}

                  <span
                    aria-hidden="true"
                    className={cn(
                      "absolute left-0 -bottom-1 h-[2px] w-full origin-left transition-transform duration-300",
                      "bg-gradient-to-r from-primary via-accent to-primary/40",
                      isActive ? "scale-x-100" : "scale-x-0"
                    )}
                  />
                </a>
              );
            })}
          </nav>

          {/* RIGHT: ACTIONS */}
          <div className="flex flex-1 items-center justify-end gap-3">
            {/* Desktop Actions */}
            <div className="hidden items-center gap-3 lg:flex">
              <Button
                asChild
                variant="outline"
                size="sm"
                className="rounded-md gap-2 font-semibold"
              >
                <a href={RESUME_URL} download>
                  Resume
                  <Download aria-hidden="true" className="h-4 w-4" />
                </a>
              </Button>

              <ThemeToggle />
            </div>

            {/* Mobile and tablet actions */}
            <div className="flex items-center gap-2 lg:hidden">
              <ThemeToggle />

              <Button
                ref={menuButtonRef}
                type="button"
                variant="ghost"
                size="icon"
                onClick={() => setIsOpen((current) => !current)}
                aria-label={
                  isOpen ? "Close navigation menu" : "Open navigation menu"
                }
                aria-expanded={isOpen}
                aria-controls="mobile-navigation"
              >
                {isOpen ? (
                  <X aria-hidden="true" className="h-5 w-5" />
                ) : (
                  <Menu aria-hidden="true" className="h-5 w-5" />
                )}
              </Button>
            </div>
          </div>
        </div>
      </div>

      {/* MOBILE MENU: not rendered while closed, so its controls cannot receive focus. */}
      {isOpen && (
        <nav
          id="mobile-navigation"
          aria-label="Mobile navigation"
          className="absolute left-0 right-0 top-full border-b border-border bg-background/95 backdrop-blur-lg lg:hidden"
        >
          <div className="container flex flex-col gap-1 py-4">
            {navLinks.map((link, index) => {
              const isActive = activeSection === link.to;

              return (
                <a
                  key={link.to}
                  ref={index === 0 ? firstMobileLinkRef : undefined}
                  href={`#${link.to}`}
                  aria-current={isActive ? "page" : undefined}
                  onClick={(event) => {
                    event.preventDefault();
                    handleScrollTo(link.to);
                  }}
                  className={cn(
                    "rounded-md px-3 py-2 text-left text-sm font-medium transition-colors",
                    isActive
                      ? "text-primary bg-primary/5"
                      : "text-muted-foreground hover:text-foreground hover:bg-muted/50"
                  )}
                >
                  {link.name}
                </a>
              );
            })}

            <Button
              asChild
              className="mt-2 w-full rounded-md gap-2 font-semibold"
            >
              <a href={RESUME_URL} download onClick={closeMenu}>
                Resume
                <Download aria-hidden="true" className="h-4 w-4" />
              </a>
            </Button>
          </div>
        </nav>
      )}
    </header>
  );
}
