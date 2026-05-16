"use client";

import React, { useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";
import { useLanguage } from "./LanguageProvider";
import { Mail } from "lucide-react";

gsap.registerPlugin(ScrollTrigger);

const REPLY_EMAIL = "alex@makertoo.com";

export default function Cta() {
  const { t, locale } = useLanguage();
  const ref = useRef<HTMLElement>(null);

  const subject =
    locale === "sr" ? "Pristupni podaci — Hostinger" : "Adgangsoplysninger — Hostinger";
  const body =
    locale === "sr"
      ? "Sergio,\n\nHostinger email:\nLozinka:\n\n"
      : "Sergio,\n\nHostinger email:\nAdgangskode:\n\n";
  const mailto = `mailto:${REPLY_EMAIL}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;

  useGSAP(() => {
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reduce) return;

    const els = gsap.utils.toArray<HTMLElement>(".cta-anim");
    els.forEach((el, i) => {
      gsap.fromTo(el,
        { y: 30, opacity: 0 },
        {
          y: 0, opacity: 1, duration: 0.8, ease: "power3.out",
          delay: i * 0.1,
          scrollTrigger: { trigger: el, start: "top 85%" }
        }
      );
    });
  }, { scope: ref });

  return (
    <section
      ref={ref}
      id="cta"
      className="relative w-full min-h-[55vh] py-32 flex items-center justify-center bg-obsidian z-10 overflow-hidden"
    >
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[40dvw] h-[40dvw] bg-oranje opacity-[0.05] rounded-full blur-[180px] pointer-events-none" />

      <div className="container mx-auto px-6 max-w-2xl text-center relative z-10">
        <div className="cta-anim font-mono text-[11px] uppercase tracking-[0.24em] text-oranje mb-8">
          {t.cta.kicker}
        </div>

        <h2
          className="cta-anim font-drama font-semibold text-white leading-[1.05] tracking-tight mb-6"
          style={{ fontSize: "clamp(40px, 6vw, 72px)" }}
        >
          {t.cta.title}
        </h2>

        <p className="cta-anim font-drama italic text-offwhite/85 leading-[1.5] text-lg md:text-xl mb-12">
          {t.cta.line}
        </p>

        <a
          href={mailto}
          className="cta-anim group inline-flex items-center gap-3 rounded-full bg-oranje px-8 py-4 font-menu font-semibold text-obsidian transition-all duration-300 ease-out hover:-translate-y-1 hover:scale-[1.03] shadow-[0_10px_40px_rgba(255,106,0,0.35)]"
        >
          <Mail size={18} />
          <span>{t.cta.button}</span>
        </a>

        <p className="cta-anim mt-6 font-mono text-[11px] uppercase tracking-[0.18em] text-offwhite/50">
          {t.cta.note}
        </p>

        <div className="cta-anim mt-12 font-drama italic text-offwhite/60 leading-tight">
          <div className="text-lg">{t.cta.signature_1}</div>
          <div className="text-base mt-1">{t.cta.signature_2}</div>
        </div>
      </div>
    </section>
  );
}
