"use client";

import React, { useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";
import { useLanguage } from "./LanguageProvider";

gsap.registerPlugin(ScrollTrigger);

export default function Moduli() {
  const { t } = useLanguage();
  const ref = useRef<HTMLElement>(null);

  const cards = [
    { n: "01", title: t.moduli.card1_title, body: t.moduli.card1_body },
    { n: "02", title: t.moduli.card2_title, body: t.moduli.card2_body },
    { n: "03", title: t.moduli.card3_title, body: t.moduli.card3_body },
    { n: "04", title: t.moduli.card4_title, body: t.moduli.card4_body },
    { n: "05", title: t.moduli.card5_title, body: t.moduli.card5_body },
    { n: "06", title: t.moduli.card6_title, body: t.moduli.card6_body },
  ];

  const handleMouseMove = (e: React.MouseEvent<HTMLElement>) => {
    const target = e.currentTarget;
    const rect = target.getBoundingClientRect();
    target.style.setProperty("--mx", `${e.clientX - rect.left}px`);
    target.style.setProperty("--my", `${e.clientY - rect.top}px`);
  };

  useGSAP(() => {
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reduce) return;

    gsap.fromTo(".moduli-head > *",
      { y: 30, opacity: 0 },
      {
        y: 0, opacity: 1, duration: 0.8, ease: "power3.out", stagger: 0.1,
        scrollTrigger: { trigger: ".moduli-head", start: "top 80%" }
      }
    );

    gsap.fromTo(".moduli-rule",
      { scaleX: 0 },
      {
        scaleX: 1, duration: 1, transformOrigin: "left center", ease: "power2.out",
        scrollTrigger: { trigger: ".moduli-rule", start: "top 85%" }
      }
    );

    const cards = gsap.utils.toArray<HTMLElement>(".moduli-card");
    cards.forEach((card, i) => {
      gsap.fromTo(card,
        { y: 40, opacity: 0 },
        {
          y: 0, opacity: 1, duration: 0.8, ease: "power3.out",
          delay: (i % 3) * 0.12,
          scrollTrigger: { trigger: card, start: "top 88%" }
        }
      );
    });
  }, { scope: ref });

  return (
    <section
      ref={ref}
      id="moduli"
      className="relative w-full py-32 md:py-40 bg-obsidian z-10"
    >
      <div className="container mx-auto px-6 max-w-6xl">
        <div className="moduli-head mb-16">
          <div className="font-mono text-[11px] uppercase tracking-[0.24em] text-oranje mb-6">
            {t.moduli.kicker}
          </div>
          <h2
            className="font-drama font-semibold text-white leading-[1.05] tracking-tight mb-8"
            style={{ fontSize: "clamp(36px, 5.5vw, 64px)" }}
          >
            {t.moduli.title}
          </h2>
          <div className="moduli-rule w-24 h-px bg-oranje mb-8" />
          <p className="font-drama italic text-offwhite/80 max-w-2xl leading-[1.5] text-lg md:text-xl">
            {t.moduli.intro}
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {cards.map((card) => (
            <article
              key={card.n}
              onMouseMove={handleMouseMove}
              className="moduli-card group relative overflow-hidden rounded-[1.25rem] border border-white/8 bg-charcoal/40 backdrop-blur-sm p-7 transition-all duration-300 hover:-translate-y-1 hover:border-oranje/40"
            >
              <div
                aria-hidden
                className="pointer-events-none absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                style={{
                  background:
                    "radial-gradient(380px circle at var(--mx, 50%) var(--my, 50%), rgba(255,106,0,0.18), transparent 55%)",
                }}
              />
              <div className="relative">
                <div className="w-9 h-9 rounded-full border border-oranje/30 bg-oranje/5 flex items-center justify-center mb-5 transition-all duration-300 group-hover:border-oranje group-hover:bg-oranje/15">
                  <span className="font-mono text-[12px] text-oranje tracking-wider">{card.n}</span>
                </div>
                <h3 className="font-drama font-semibold text-white text-xl md:text-[22px] leading-snug mb-3">
                  {card.title}
                </h3>
                <p className="font-drama italic text-offwhite/75 text-[15px] leading-[1.6]">
                  {card.body}
                </p>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
