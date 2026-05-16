"use client";

import React, { useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";
import { useLanguage } from "./LanguageProvider";
import { ArrowUpRight } from "lucide-react";

gsap.registerPlugin(ScrollTrigger);

const HOSTINGER_URL =
  "https://www.hostinger.com/cart?product=vps%3Avps_kvm_8&period=12&referral_type=cart_link&REFERRALCODE=1ALEXALEXOS91&referral_id=019e3102-6939-7076-b935-27c0b4f2180b";

export default function SledeciKorak() {
  const { t } = useLanguage();
  const ref = useRef<HTMLElement>(null);

  useGSAP(() => {
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reduce) return;

    const els = gsap.utils.toArray<HTMLElement>(".korak-anim");
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

    gsap.fromTo(".korak-rule",
      { scaleX: 0 },
      {
        scaleX: 1, duration: 1, transformOrigin: "left center", ease: "power2.out",
        scrollTrigger: { trigger: ".korak-rule", start: "top 85%" }
      }
    );
  }, { scope: ref });

  return (
    <section
      ref={ref}
      id="korak"
      className="relative w-full py-32 md:py-40 bg-obsidian z-10"
    >
      <div className="container mx-auto px-6 max-w-2xl">
        <div className="korak-anim font-mono text-[11px] uppercase tracking-[0.24em] text-oranje mb-6">
          {t.korak.kicker}
        </div>

        <h2
          className="korak-anim font-drama font-semibold text-white leading-[1.05] tracking-tight mb-8"
          style={{ fontSize: "clamp(36px, 5vw, 56px)" }}
        >
          {t.korak.title}
        </h2>

        <div className="korak-rule w-24 h-px bg-oranje mb-10" />

        <p className="korak-anim font-drama italic text-offwhite/85 leading-[1.6] text-lg md:text-xl mb-12">
          {t.korak.body}
        </p>

        <div className="korak-anim flex flex-col items-start gap-4 mb-14">
          <a
            href={HOSTINGER_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="group inline-flex items-center gap-3 rounded-full bg-oranje px-7 py-4 font-menu font-semibold text-obsidian transition-all duration-300 ease-out hover:-translate-y-1 hover:scale-[1.02] shadow-[0_10px_40px_rgba(255,106,0,0.3)]"
          >
            <span>{t.korak.button_label}</span>
            <ArrowUpRight size={18} className="transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
          </a>
          <p className="font-mono text-[11px] uppercase tracking-[0.18em] text-offwhite/50">
            {t.korak.button_note}
          </p>
        </div>

        <div className="korak-anim border-t border-white/8 pt-10">
          <div className="font-mono text-[10px] uppercase tracking-[0.22em] text-oranje/80 mb-6">
            {t.korak.notes_title}
          </div>
          <ol className="flex flex-col gap-5">
            {t.korak.notes.map((note, i) => (
              <li key={i} className="flex gap-4">
                <span className="shrink-0 font-mono text-[12px] text-oranje/70 tracking-wider pt-1 w-6">
                  0{i + 1}
                </span>
                <span className="font-drama italic text-offwhite/80 text-[15px] md:text-base leading-[1.6]">
                  {note}
                </span>
              </li>
            ))}
          </ol>
        </div>
      </div>
    </section>
  );
}
