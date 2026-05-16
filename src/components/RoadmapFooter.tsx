"use client";

import React, { useRef, useState, useEffect } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";
import { useLanguage } from "./LanguageProvider";
import { Server, Rocket, ArrowUpRight, Mail } from "lucide-react";

gsap.registerPlugin(ScrollTrigger);

const REPLY_HANDLE = ['alex', 'makertoo.com'].join('@');

export default function RoadmapFooter() {
  const { t } = useLanguage();
  const fRef = useRef<HTMLDivElement>(null);
  const [ctaRevealed, setCtaRevealed] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => {
      const btn = document.querySelector('.mobile-cta') as HTMLElement;
      if (btn) {
        gsap.to(btn, { scale: 1.04, duration: 0.3, yoyo: true, repeat: 3, ease: "power1.inOut" });
      }
    }, 3000);
    return () => clearTimeout(timer);
  }, []);

  useGSAP(() => {
    gsap.fromTo(".roadmap-heading",
      { y: 40, opacity: 0 },
      { y: 0, opacity: 1, duration: 1, ease: "expo.out", scrollTrigger: { trigger: fRef.current, start: "top 80%" } }
    );

    const steps = gsap.utils.toArray('.roadmap-step');
    gsap.fromTo(steps,
      { y: 40, opacity: 0, x: -20 },
      { y: 0, opacity: 1, x: 0, duration: 0.8, stagger: 0.12, ease: "power3.out", scrollTrigger: { trigger: ".roadmap-steps", start: "top 80%" } }
    );

    gsap.fromTo(".roadmap-connector",
      { scaleY: 0 },
      { scaleY: 1, duration: 1.5, ease: "power2.inOut", scrollTrigger: { trigger: ".roadmap-steps", start: "top 80%" } }
    );

    gsap.fromTo(".magnetic-btn",
      { scale: 0.85, opacity: 0 },
      { scale: 1, opacity: 1, duration: 1.4, ease: "elastic.out(1, 0.5)", scrollTrigger: { trigger: ".magnetic-btn", start: "top 92%" } }
    );
  }, { scope: fRef });

  const subject = encodeURIComponent("Da — pustimo sajt online");
  const bodyParam = encodeURIComponent("Sergio, ");
  const mailtoHref = `mailto:${REPLY_HANDLE}?subject=${subject}&body=${bodyParam}`;

  const handleMobileCta = () => {
    if (ctaRevealed) {
      window.location.href = mailtoHref;
    } else {
      setCtaRevealed(true);
    }
  };

  return (
    <footer ref={fRef} className="relative w-full pt-24 md:pt-32 pb-0 bg-obsidian text-offwhite z-20 overflow-hidden">

      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[80dvw] h-[30dvw] bg-oranje opacity-[0.03] rounded-full blur-[150px] pointer-events-none" />

      <div className="container mx-auto px-6 max-w-5xl relative">

        <div className="relative rounded-[2rem] md:rounded-[3rem] bg-charcoal/20 border border-white/5 backdrop-blur-xl overflow-hidden">
          <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-oranje to-transparent" />
          <div className="absolute inset-0 bg-gradient-to-b from-oranje/[0.02] to-transparent pointer-events-none" />

          <div className="relative pt-14 md:pt-20 pb-16 md:pb-24 px-5 md:px-16 flex flex-col items-center">

            <div className="roadmap-heading text-center mb-10 md:mb-16">
              <div className="inline-flex items-center gap-2 bg-oranje/10 border border-oranje/20 rounded-full px-4 py-2 mb-6 md:mb-8">
                <Rocket size={14} className="text-oranje" />
                <span className="font-mono text-xs uppercase tracking-[0.2em] text-oranje">Sledeći korak</span>
              </div>
              <h2 className="text-3xl md:text-6xl font-sans font-extrabold text-white tracking-tight">
                <span className="font-drama italic text-oranje">Jedan</span> praktičan korak.
              </h2>
            </div>

            <div className="roadmap-steps relative flex flex-col gap-0 max-w-2xl w-full mx-auto mb-10 md:mb-16">
              <div className="roadmap-connector absolute left-6 top-6 bottom-6 w-[2px] bg-gradient-to-b from-oranje via-amber to-oranje/30 origin-top z-0" />

              {[1, 2, 3, 4, 5].map((num) => {
                const text = t.roadmap[`step${num}` as keyof typeof t.roadmap];
                const colonIdx = text.indexOf(':');
                const title = colonIdx > -1 ? text.slice(0, colonIdx) : text;
                const body = colonIdx > -1 ? text.slice(colonIdx + 1).trim() : '';
                return (
                  <div key={num} className="roadmap-step relative flex items-start gap-4 md:gap-6 group py-3 md:py-5">
                    <div className="relative z-10 w-10 h-10 md:w-12 md:h-12 shrink-0 rounded-full bg-obsidian border-2 border-oranje/40 flex items-center justify-center font-mono text-oranje text-base md:text-lg group-hover:bg-oranje group-hover:text-obsidian group-hover:border-oranje group-hover:shadow-[0_0_25px_rgba(255,106,0,0.4)] transition-all duration-400">
                      {num}
                    </div>
                    <div className="pt-1.5 md:pt-2 pb-2 md:pb-3">
                      <h3 className="font-sans font-bold text-base md:text-xl text-white mb-1 group-hover:text-oranje transition-colors duration-300">{title}</h3>
                      {body && <p className="font-sans text-white/55 leading-relaxed text-xs md:text-base">{body}</p>}
                    </div>
                  </div>
                );
              })}
            </div>

            {/* Hostinger affiliate placeholder */}
            <div className="w-full max-w-2xl mx-auto mb-10 md:mb-16 border-2 border-dashed border-oranje/40 rounded-[1.5rem] p-6 md:p-8 text-center">
              <Server size={24} className="text-oranje mx-auto mb-3 opacity-60" />
              <p className="font-mono text-sm text-oranje/70 uppercase tracking-widest mb-1">__HOSTINGER_AFFILIATE_LINK__</p>
              <p className="font-sans text-white/40 text-xs md:text-sm">
                {/* Alex zameni ovaj blok pre slanja Sergiju — Hostinger affiliate link sa popustom */}
                Hostinger affiliate link sa popustom · zameni pre slanja
              </p>
            </div>

            {/* DESKTOP CTA */}
            <div className="hidden md:block w-full max-w-md mx-auto text-center">
              <a
                href={mailtoHref}
                className="magnetic-btn group relative flex items-center justify-center overflow-hidden rounded-[3rem] bg-oranje h-20 font-sans font-bold text-2xl text-obsidian transition-all duration-500 ease-[cubic-bezier(0.25,1,0.5,1)] hover:-translate-y-2 hover:scale-[1.03] shadow-[0_10px_50px_rgba(255,106,0,0.3)] hover:shadow-[0_20px_60px_rgba(255,106,0,0.5)] w-full"
              >
                <span className="absolute z-20 flex items-center gap-3 transition-all duration-500 ease-[cubic-bezier(0.25,1,0.5,1)] group-hover:-translate-y-14 group-hover:opacity-0">
                  {t.roadmap.cta}
                  <ArrowUpRight size={22} />
                </span>
                <span className="absolute z-20 translate-y-14 opacity-0 transition-all duration-500 ease-[cubic-bezier(0.25,1,0.5,1)] group-hover:translate-y-0 group-hover:opacity-100 group-hover:text-oranje font-menu tracking-tight flex items-center gap-3 text-xl">
                  <Mail size={24} />
                  {REPLY_HANDLE}
                </span>
                <div className="absolute inset-0 z-10 h-full w-full bg-obsidian translate-y-full transition-transform duration-500 ease-[cubic-bezier(0.25,1,0.5,1)] group-hover:translate-y-0 border-2 border-oranje rounded-[3rem]"></div>
              </a>
            </div>

            {/* MOBILE CTA */}
            <div className="md:hidden w-full max-w-sm mx-auto text-center">
              <button
                onClick={handleMobileCta}
                className={`mobile-cta magnetic-btn relative flex items-center justify-center overflow-hidden rounded-[2rem] h-16 font-sans font-bold text-obsidian transition-all duration-500 ease-[cubic-bezier(0.25,1,0.5,1)] active:scale-95 w-full ${
                  ctaRevealed ? 'bg-obsidian border-2 border-oranje shadow-[0_0_40px_rgba(255,106,0,0.4)]' : 'bg-oranje shadow-[0_10px_40px_rgba(255,106,0,0.3)]'
                }`}
              >
                <span className={`absolute z-20 flex items-center gap-2 text-base transition-all duration-500 ${ctaRevealed ? '-translate-y-12 opacity-0' : 'translate-y-0 opacity-100'}`}>
                  {t.roadmap.cta}
                  <ArrowUpRight size={18} />
                </span>
                <span className={`absolute z-20 flex flex-col items-center gap-1 transition-all duration-500 ${ctaRevealed ? 'translate-y-0 opacity-100' : 'translate-y-12 opacity-0'}`}>
                  <span className="flex items-center gap-2 text-oranje font-menu text-base">
                    <Mail size={18} className="animate-pulse" />
                    {REPLY_HANDLE}
                  </span>
                  <span className="text-oranje/60 font-sans text-xs">Tap again to send →</span>
                </span>
              </button>
            </div>

            <div className="mt-5 md:mt-8 font-mono text-[10px] md:text-sm uppercase tracking-widest text-white/25 flex items-center justify-center gap-2">
              <span className="w-2 h-2 rounded-full bg-oranje inline-block shadow-[0_0_10px_rgba(255,106,0,1)] animate-pulse"></span>
              Radionica u pogonu · Ølstykke, Danska
            </div>

          </div>
        </div>

        {/* Footer Bar */}
        <div className="py-6 md:py-10 flex flex-col md:flex-row items-center justify-between px-4 gap-3">
          <div className="font-menu font-bold text-lg md:text-xl tracking-tight text-white/40">
            <span className="text-oranje/60">●</span> Sergios Skadecenter
          </div>
          <div className="text-xs md:text-sm font-sans tracking-wide text-white/25">
            © {new Date().getFullYear()} Sergios Skadecenter ApS · Tillid · Kvalitet · Premium
          </div>
        </div>

      </div>
    </footer>
  );
}
