"use client";

import { useEffect, useRef, useState } from "react";

export default function FadeIn({
  children,
  className = ""
}: {
  children: React.ReactNode;
  className?: string;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    // If it's already on screen the moment this loads (e.g. the page was
    // opened already scrolled down, or navigation lands mid-page), show it
    // immediately instead of waiting on the observer to catch up.
    const rect = el.getBoundingClientRect();
    if (rect.top < window.innerHeight && rect.bottom > 0) {
      setVisible(true);
      return;
    }

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setVisible(true);
          observer.disconnect();
        }
      },
      { threshold: 0.05, rootMargin: "100px 0px" }
    );
    observer.observe(el);

    // Safety net: if for any reason the observer never fires (an edge case
    // in some browsers, or a fast/unusual scroll), never leave real content
    // permanently invisible — reveal it after a short delay regardless.
    const fallback = setTimeout(() => setVisible(true), 1200);

    return () => {
      observer.disconnect();
      clearTimeout(fallback);
    };
  }, []);

  return (
    <div
      ref={ref}
      className={`transition-all duration-700 ease-out ${
        visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6"
      } ${className}`}
    >
      {children}
    </div>
  );
}
