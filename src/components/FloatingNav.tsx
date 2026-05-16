"use client";

import React, { useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { ScrollToPlugin } from "gsap/ScrollToPlugin";
import { useGSAP } from "@gsap/react";
import { useLanguage } from "./LanguageProvider";

gsap.registerPlugin(ScrollTrigger, ScrollToPlugin);

export default function FloatingNav() {
  const { t, locale, setLocale } = useLanguage();
  const navRef = useRef<HTMLElement>(null);

  useGSAP(() => {
    ScrollTrigger.create({
      start: "top -50px",
      onUpdate: (self) => {
        if (self.direction === 1) {
          gsap.to(navRef.current, {
            backgroundColor: "rgba(11, 12, 16, 0.85)",
            backdropFilter: "blur(20px)",
            border: "1px solid rgba(255, 255, 255, 0.08)",
            padding: "0.75rem 1.5rem",
            duration: 0.4,
            ease: "power2.out"
          });
        } else if (self.progress === 0) {
          gsap.to(navRef.current, {
            backgroundColor: "transparent",
            backdropFilter: "blur(0px)",
            border: "1px solid transparent",
            padding: "1rem 1.5rem",
            duration: 0.4,
            ease: "power2.out"
          });
        }
      }
    });
  }, { scope: navRef });

  const smoothScroll = (targetId: string) => {
    const el = document.getElementById(targetId);
    if (!el) return;
    const y = el.getBoundingClientRect().top + window.scrollY - 80;
    gsap.to(window, { scrollTo: { y, autoKill: false }, duration: 1.4, ease: "power3.inOut" });
  };

  const scrollToTop = () => {
    gsap.to(window, { scrollTo: { y: 0, autoKill: false }, duration: 1.2, ease: "power3.inOut" });
  };

  return (
    <header className="fixed top-6 left-1/2 -translate-x-1/2 z-50 w-full max-w-5xl px-4 pointer-events-none">
      <nav
        ref={navRef}
        className="mx-auto rounded-[3rem] flex items-center justify-between pointer-events-auto transition-all bg-transparent border border-transparent p-[1rem_1.5rem]"
      >
        <button onClick={scrollToTop} className="flex items-center gap-2 cursor-pointer transition-opacity duration-300 hover:opacity-80">
          <img
            src="/images/sergio-logo.svg"
            alt="Sergios Skadecenter"
            className="h-8 md:h-10 w-auto"
            style={{ filter: "brightness(0) invert(1)" }}
          />
        </button>

        <div className="flex items-center gap-6">
          <div className="flex bg-charcoal/50 rounded-full p-1 border border-white/5">
            <button
              onClick={() => setLocale("sr")}
              className={`px-3 py-1 text-sm font-menu font-medium rounded-full transition-all duration-300 ${locale === "sr" ? "bg-oranje text-obsidian shadow-sm" : "text-offwhite hover:text-white"}`}
            >
              SR
            </button>
            <button
              onClick={() => setLocale("da")}
              className={`px-3 py-1 text-sm font-menu font-medium rounded-full transition-all duration-300 ${locale === "da" ? "bg-oranje text-obsidian shadow-sm" : "text-offwhite hover:text-white"}`}
            >
              DA
            </button>
          </div>

          <button
            onClick={() => smoothScroll('sajt')}
            className="hidden sm:block group relative overflow-hidden rounded-full bg-offwhite px-6 py-2 font-menu font-semibold text-obsidian transition-transform duration-300 ease-[cubic-bezier(0.25,0.46,0.45,0.94)] hover:-translate-y-px hover:scale-[1.03]"
          >
            <span className="relative z-10 group-hover:text-oranje transition-colors">{t.nav.explore}</span>
            <div className="absolute inset-0 z-0 h-full w-full bg-charcoal translate-y-full transition-transform duration-300 group-hover:translate-y-0"></div>
          </button>
        </div>
      </nav>
    </header>
  );
}
