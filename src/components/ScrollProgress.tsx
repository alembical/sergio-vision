"use client";

import React, { useEffect, useRef, useState } from "react";

const SECTIONS = [
  { id: "sajt", n: "01" },
  { id: "moduli", n: "03" },
  { id: "korak", n: "04" },
  { id: "cta", n: "05" },
];

export default function ScrollProgress() {
  const [progress, setProgress] = useState(0);
  const [activeIdx, setActiveIdx] = useState(0);
  const rafRef = useRef<number | null>(null);

  useEffect(() => {
    const update = () => {
      const h = document.documentElement;
      const max = h.scrollHeight - h.clientHeight;
      const p = max > 0 ? Math.min(1, Math.max(0, h.scrollTop / max)) : 0;
      setProgress(p);

      let current = 0;
      SECTIONS.forEach((s, i) => {
        const el = document.getElementById(s.id);
        if (!el) return;
        const rect = el.getBoundingClientRect();
        if (rect.top <= window.innerHeight * 0.4) current = i;
      });
      setActiveIdx(current);
      rafRef.current = null;
    };

    const handler = () => {
      if (rafRef.current != null) return;
      rafRef.current = requestAnimationFrame(update);
    };

    window.addEventListener("scroll", handler, { passive: true });
    update();
    return () => {
      window.removeEventListener("scroll", handler);
      if (rafRef.current != null) cancelAnimationFrame(rafRef.current);
    };
  }, []);

  return (
    <>
      {/* Top hairline progress bar */}
      <div className="fixed top-0 left-0 right-0 z-[60] h-px bg-white/5 pointer-events-none">
        <div
          className="h-full bg-gradient-to-r from-oranje to-amber origin-left transition-transform duration-150 ease-out"
          style={{ transform: `scaleX(${progress})` }}
        />
      </div>

      {/* Side section index — hidden on mobile, subtle on desktop */}
      <div className="hidden lg:flex fixed right-6 top-1/2 -translate-y-1/2 z-40 flex-col gap-3 pointer-events-none">
        {SECTIONS.map((s, i) => (
          <a
            key={s.id}
            href={`#${s.id}`}
            className="pointer-events-auto group flex items-center gap-3 justify-end"
            aria-label={`Skoči na sekciju ${s.n}`}
          >
            <span
              className={`font-mono text-[10px] tracking-[0.2em] uppercase transition-all duration-300 ${
                i === activeIdx ? "text-oranje opacity-100" : "text-offwhite/30 opacity-0 group-hover:opacity-100"
              }`}
            >
              {s.n}
            </span>
            <span
              className={`block h-px transition-all duration-300 ${
                i === activeIdx ? "w-8 bg-oranje" : "w-4 bg-offwhite/25 group-hover:bg-oranje/70"
              }`}
            />
          </a>
        ))}
      </div>
    </>
  );
}
