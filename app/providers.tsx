"use client";

import type { ReactNode } from "react";
import { useEffect, useState } from "react";
import Preloader from "@/components/Preloader";

export default function Providers({ children }: { children: ReactNode }) {
  const [isDocumentLoading, setIsDocumentLoading] = useState(true);

  useEffect(() => {
    const finishLoading = () => {
      setIsDocumentLoading(false);
    };

    if (document.readyState === "complete") {
      finishLoading();
      return;
    }

    window.addEventListener("load", finishLoading, { once: true });

    return () => {
      window.removeEventListener("load", finishLoading);
    };
  }, []);

  return (
    <>
      {children}
      {isDocumentLoading && <Preloader />}
    </>
  );
}
