"use client";

import React, { useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";
import { useLanguage } from "./LanguageProvider";
import { ArrowUpRight } from "lucide-react";

gsap.registerPlugin(ScrollTrigger);

const SITE_URL = "https://sergios-mockup.makertoo.win";

export default function SajtJeTu() {
  const { t } = useLanguage();
  const ref = useRef<HTMLElement>(null);

  useGSAP(() => {
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reduce) return;

    const els = gsap.utils.toArray<HTMLElement>(".sajt-anim");
    els.forEach((el, i) => {
      gsap.fromTo(el,
        { y: 40, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 0.9,
          ease: "power3.out",
          delay: i * 0.08,
          scrollTrigger: { trigger: el, start: "top 85%" }
        }
      );
    });

    gsap.fromTo(".sajt-rule",
      { scaleX: 0 },
      {
        scaleX: 1,
        duration: 1,
        transformOrigin: "left center",
        ease: "power2.out",
        scrollTrigger: { trigger: ".sajt-rule", start: "top 85%" }
      }
    );

    gsap.fromTo(".sajt-frame",
      { y: 60, opacity: 0 },
      {
        y: 0,
        opacity: 1,
        duration: 1.1,
        ease: "power3.out",
        scrollTrigger: { trigger: ".sajt-frame", start: "top 80%" }
      }
    );
  }, { scope: ref });

  return (
    <section
      ref={ref}
      id="sajt"
      className="relative w-full py-32 md:py-40 bg-obsidian z-10"
    >
      <div className="container mx-auto px-6 max-w-6xl">
        <div className="sajt-anim font-mono text-[11px] uppercase tracking-[0.24em] text-oranje mb-6">
          {t.sajt.kicker}
        </div>

        <h2
          className="sajt-anim font-drama font-semibold text-white leading-[1.05] tracking-tight mb-8"
          style={{ fontSize: "clamp(36px, 5.5vw, 64px)" }}
        >
          {t.sajt.title}
        </h2>

        <div className="sajt-rule w-24 h-px bg-oranje mb-10" />

        <p className="sajt-anim font-drama italic text-offwhite/80 max-w-2xl leading-[1.5] text-lg md:text-xl mb-5">
          {t.sajt.body}
        </p>
        <p className="sajt-anim font-drama italic text-oranje/85 max-w-2xl leading-[1.5] text-base md:text-lg mb-16">
          {t.sajt.body_alive}
        </p>

        {/* Desktop frame with live iframe (desktop+) */}
        <div className="sajt-frame hidden md:block relative mx-auto max-w-5xl">
          <div className="rounded-[1.5rem] border border-white/8 bg-charcoal/40 backdrop-blur-sm overflow-hidden shadow-[0_30px_80px_rgba(0,0,0,0.6)]">
            {/* Browser chrome bar */}
            <div className="flex items-center gap-2 px-4 py-3 border-b border-white/5 bg-obsidian/60">
              <div className="flex gap-1.5">
                <span className="w-2.5 h-2.5 rounded-full bg-white/15" />
                <span className="w-2.5 h-2.5 rounded-full bg-white/15" />
                <span className="w-2.5 h-2.5 rounded-full bg-white/15" />
              </div>
              <div className="flex-1 mx-4 px-3 py-1 rounded-md bg-charcoal/60 font-mono text-[11px] text-offwhite/50 truncate">
                sergioskadecenter.dk
              </div>
            </div>
            <div className="relative w-full" style={{ aspectRatio: "16 / 10" }}>
              <iframe
                src={SITE_URL}
                title="Sergios Skadecenter"
                loading="lazy"
                sandbox="allow-same-origin allow-scripts"
                className="absolute inset-0 w-full h-full border-0 bg-obsidian"
              />
            </div>
          </div>
        </div>

        {/* Mobile fallback — link card */}
        <div className="sajt-frame md:hidden">
          <a
            href={SITE_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="block rounded-[1.25rem] border border-white/10 bg-charcoal/40 backdrop-blur-sm p-6 transition-colors hover:border-oranje/40"
          >
            <div className="flex items-center justify-between mb-3">
              <div className="font-mono text-[11px] text-offwhite/50 truncate">sergioskadecenter.dk</div>
              <ArrowUpRight size={18} className="text-oranje shrink-0" />
            </div>
            <div className="font-drama italic text-white text-lg leading-snug">
              {t.sajt.open_cta}
            </div>
          </a>
        </div>

        <div className="sajt-anim mt-10 flex">
          <a
            href={SITE_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="hidden md:inline-flex items-center gap-2 rounded-full border border-oranje/30 px-6 py-3 font-menu text-sm tracking-wide text-oranje transition-all duration-300 hover:bg-oranje hover:text-obsidian hover:-translate-y-0.5"
          >
            <span>{t.sajt.open_cta}</span>
            <ArrowUpRight size={16} />
          </a>
        </div>
      </div>
    </section>
  );
}
