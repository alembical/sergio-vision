"use client";

import React, { useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { ScrollToPlugin } from "gsap/ScrollToPlugin";
import { useGSAP } from "@gsap/react";
import { useLanguage } from "./LanguageProvider";
import { ChevronDown } from "lucide-react";

gsap.registerPlugin(ScrollTrigger, ScrollToPlugin);

export default function Cover() {
  const { t } = useLanguage();
  const ref = useRef<HTMLElement>(null);

  const smoothScroll = (targetId: string) => {
    const el = document.getElementById(targetId);
    if (!el) return;
    const y = el.getBoundingClientRect().top + window.scrollY - 80;
    gsap.to(window, { scrollTo: { y, autoKill: false }, duration: 1.4, ease: "power3.inOut" });
  };

  useGSAP(() => {
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reduce) return;

    const tl = gsap.timeline({ defaults: { ease: "power3.out" } });
    tl.fromTo(".cover-kicker", { y: -10, opacity: 0 }, { y: 0, opacity: 1, duration: 0.6 });
    tl.fromTo(".cover-headline", { y: 40, opacity: 0, clipPath: "inset(0 0 100% 0)" }, { y: 0, opacity: 1, clipPath: "inset(0 0 0% 0)", duration: 1.1 }, "-=0.2");
    tl.fromTo(".cover-rule", { scaleX: 0 }, { scaleX: 1, duration: 1, transformOrigin: "left center" }, "-=0.4");
    tl.fromTo(".cover-subhead", { y: 24, opacity: 0 }, { y: 0, opacity: 1, duration: 0.8 }, "-=0.6");
    tl.fromTo(".cover-attribution", { opacity: 0 }, { opacity: 1, duration: 0.6 }, "-=0.2");
    tl.fromTo(".cover-scroll-hint", { opacity: 0, y: -8 }, { opacity: 1, y: 0, duration: 0.5 }, "-=0.1");

    gsap.to(".cover-scroll-hint", { y: 8, duration: 1.2, repeat: -1, yoyo: true, ease: "power1.inOut" });

    gsap.to(".cover-bg-image", {
      y: 80, ease: "none",
      scrollTrigger: { trigger: ref.current, start: "top top", end: "bottom top", scrub: 1 }
    });
  }, { scope: ref });

  return (
    <section
      ref={ref}
      className="relative w-full min-h-[90dvh] flex items-center overflow-hidden bg-obsidian"
    >
      <picture className="absolute inset-0 w-full h-[115%] pointer-events-none">
        <source
          type="image/avif"
          srcSet="/images/custom-kawasaki-480w.avif 480w, /images/custom-kawasaki-1280w.avif 1280w, /images/custom-kawasaki-1920w.avif 1920w"
          sizes="100vw"
        />
        <source
          type="image/webp"
          srcSet="/images/custom-kawasaki-480w.webp 480w, /images/custom-kawasaki-1280w.webp 1280w, /images/custom-kawasaki-1920w.webp 1920w"
          sizes="100vw"
        />
        <img
          src="/images/custom-kawasaki-1280w.webp"
          alt=""
          className="cover-bg-image w-full h-full object-cover opacity-70"
          style={{ filter: "blur(3px)" }}
        />
      </picture>
      <div className="absolute inset-0 bg-gradient-to-b from-obsidian/70 via-obsidian/50 to-obsidian pointer-events-none" />
      <div className="absolute inset-0 bg-gradient-to-r from-obsidian/70 via-obsidian/30 to-obsidian/55 pointer-events-none" />
      <div className="absolute top-[20%] right-[8%] w-[35dvw] h-[35dvw] bg-oranje opacity-[0.06] rounded-full blur-[180px] pointer-events-none" />

      <div className="container mx-auto px-6 max-w-6xl z-10 relative pt-32 pb-20">
        <div className="cover-kicker font-mono text-[11px] uppercase tracking-[0.24em] text-oranje mb-8">
          {t.cover.kicker}
        </div>

        <h1 className="cover-headline font-drama font-semibold text-white leading-[0.96] tracking-tight" style={{ fontSize: "clamp(48px, 9vw, 120px)" }}>
          {t.cover.headline}
        </h1>

        <div className="cover-rule w-24 h-px bg-oranje mt-10 mb-10" />

        <p className="cover-subhead font-drama italic text-white/85 max-w-3xl leading-[1.25]" style={{ fontSize: "clamp(22px, 3.2vw, 40px)" }}>
          {t.cover.subhead}
        </p>

        <div className="cover-attribution font-mono text-[11px] uppercase tracking-[0.22em] text-offwhite/50 mt-16">
          {t.cover.attribution}
        </div>
      </div>

      <button
        onClick={() => smoothScroll("sajt")}
        aria-label="Scroll"
        className="cover-scroll-hint absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-1 z-20 cursor-pointer group"
      >
        <span className="font-mono text-[10px] uppercase tracking-[0.25em] text-offwhite/40 group-hover:text-oranje transition-colors">Scroll</span>
        <ChevronDown size={16} className="text-oranje/60 group-hover:text-oranje transition-colors" />
      </button>
    </section>
  );
}
