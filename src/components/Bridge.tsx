"use client";

import React, { useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";
import { useLanguage } from "./LanguageProvider";

gsap.registerPlugin(ScrollTrigger);

export default function Bridge() {
  const { t } = useLanguage();
  const ref = useRef<HTMLElement>(null);

  useGSAP(() => {
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reduce) return;

    gsap.fromTo(".bridge-kicker",
      { y: 20, opacity: 0 },
      {
        y: 0, opacity: 1, duration: 0.8, ease: "power3.out",
        scrollTrigger: { trigger: ref.current, start: "top 70%" }
      }
    );
    gsap.fromTo(".bridge-line",
      { y: 30, opacity: 0 },
      {
        y: 0, opacity: 1, duration: 1.1, ease: "power3.out", delay: 0.15,
        scrollTrigger: { trigger: ref.current, start: "top 70%" }
      }
    );
    gsap.fromTo(".bridge-rule",
      { scaleX: 0 },
      {
        scaleX: 1, duration: 1, transformOrigin: "center center", ease: "power2.out", delay: 0.3,
        scrollTrigger: { trigger: ref.current, start: "top 70%" }
      }
    );
  }, { scope: ref });

  return (
    <section
      ref={ref}
      className="relative w-full min-h-[55vh] flex items-center justify-center bg-obsidian z-10 overflow-hidden"
    >
      <div className="absolute inset-0 bg-gradient-to-b from-obsidian via-charcoal/20 to-obsidian pointer-events-none" />
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[40dvw] h-[40dvw] bg-oranje opacity-[0.04] rounded-full blur-[180px] pointer-events-none" />

      <div className="container mx-auto px-6 max-w-4xl text-center relative z-10 py-24">
        <div className="bridge-kicker font-mono text-[11px] uppercase tracking-[0.24em] text-oranje mb-8">
          {t.bridge.kicker}
        </div>

        <p
          className="bridge-line font-drama italic text-white/95 leading-[1.2] tracking-tight"
          style={{ fontSize: "clamp(28px, 4.5vw, 56px)" }}
        >
          {t.bridge.line}
        </p>

        <div className="bridge-rule mt-12 mx-auto w-24 h-px bg-oranje" />
      </div>
    </section>
  );
}
