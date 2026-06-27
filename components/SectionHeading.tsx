import { cn } from "@/lib/utils";

interface HeadingProps {
  label?: string;        // Small uppercase label (e.g., "Skills")
  title: string;         // Main title (e.g., "Technical Skills")
  subtitle?: string;     // Optional description
  alignment?: "left" | "center" | "right";
  className?: string;
}

export default function SectionHeading({
  label,
  title,
  subtitle,
  alignment = "center",
  className,
}: HeadingProps) {
  return (
    <div
      className={cn(
        "mx-auto mb-14 max-w-3xl",
        {
          "text-left": alignment === "left",
          "text-center": alignment === "center",
          "text-right": alignment === "right",
        },
        className
      )}
    >
      {/* Small Uppercase Label */}
      {label && (
        <span
          className="
            text-[12px]
            font-bold
            uppercase
            tracking-[0.35em]
            text-primary
            dark:text-primary/80
          "
        >
          {label}
        </span>
      )}

      {/* Main Title */}
      <h2
        className="
          mt-3
          text-4xl
          font-extrabold
          text-foreground
          dark:text-foreground/90
          md:text-5xl
        "
      >
        {title}
      </h2>

      {/* Optional Subtitle */}
      {subtitle && (
        <p
          className="
            mt-4
            text-[15px]
            leading-7
            text-muted-foreground
            dark:text-muted-foreground/80
          "
        >
          {subtitle}
        </p>
      )}
    </div>
  );
}