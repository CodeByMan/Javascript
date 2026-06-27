"use client";

import { useEffect, useState } from "react";

const roles = ["MERN Stack Developer", "Next.js Developer", "MEAN Stack Developer", "React.js Developer", "Node.js Developer", "Nest.js Developer"];

export default function TypingRoles() {
  const [text, setText] = useState("");
  const [index, setIndex] = useState(0);
  const [isDeleting, setIsDeleting] = useState(false);

  useEffect(() => {
    const current = roles[index];
    const typingSpeed = isDeleting ? 40 : 70;

    const timeout = window.setTimeout(() => {
      if (!isDeleting) {
        const nextText = current.substring(0, text.length + 1);
        setText(nextText);

        if (nextText === current) {
          window.setTimeout(() => setIsDeleting(true), 1200);
        }
      } else {
        const nextText = current.substring(0, Math.max(0, text.length - 1));
        setText(nextText);

        if (nextText === "") {
          setIsDeleting(false);
          setIndex((previous) => (previous + 1) % roles.length);
        }
      }
    }, typingSpeed);

    return () => window.clearTimeout(timeout);
  }, [text, isDeleting, index]);

  return (
    <span aria-live="polite" aria-atomic="true">
      {text}
      <span className="cursor-blink ml-1" aria-hidden="true">
        |
      </span>
    </span>
  );
}
