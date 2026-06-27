import { Mail } from "lucide-react";
import { FaGithub, FaLinkedin } from "react-icons/fa";
import Link from "next/link";
import { Button } from "@/components/ui/button";

export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-card border-t border-border py-6 mt-10">
      <div className="container mx-auto px-4">
        <div className="flex flex-col md:flex-row justify-between items-center gap-4">
          <div className="text-center md:text-left">
            <Link href="/" className="text-xl font-display font-bold text-gradient">
              Muhammad Ali Nawaz
            </Link>
            <p className="text-muted-foreground text-sm mt-1.5 max-w-xs md:max-w-md">
              MERN Stack Developer · Next.js Developer
            </p>
          </div>

          <div className="flex flex-col items-center md:items-end gap-2">
            <div className="flex gap-1">
              <Button asChild variant="ghost" size="icon" className="h-8 w-8 !rounded-full hover:!rounded-full">
                <a href="https://github.com/CodeByMan" target="_blank" rel="noopener noreferrer" aria-label="GitHub">
                  <FaGithub className="h-4 w-4" />
                </a>
              </Button>
              <Button asChild variant="ghost" size="icon" className="h-8 w-8 !rounded-full hover:!rounded-full">
                <a href="https://www.linkedin.com/in/muhammad-ali-nawaz-362627338/" target="_blank" rel="noopener noreferrer" aria-label="LinkedIn">
                  <FaLinkedin className="h-4 w-4" />
                </a>
              </Button>
              <Button asChild variant="ghost" size="icon" className="h-8 w-8 !rounded-full hover:!rounded-full">
                <a href="mailto:muhammadalinawaz.dev@gmail.com" aria-label="Email">
                  <Mail className="h-4 w-4" />
                </a>
              </Button>
            </div>
            <p className="text-xs text-muted-foreground text-center md:text-left">
              © {currentYear} Muhammad Ali Nawaz. All rights reserved.
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
}
