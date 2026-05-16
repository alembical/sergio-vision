"use client";

import React, { useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";
import { useLanguage } from "./LanguageProvider";
import { Copy, Boxes, ArrowDown } from "lucide-react";

gsap.registerPlugin(ScrollTrigger);

export default function FranchiseGrid() {
  const { t } = useLanguage();
  const gridRef = useRef<HTMLDivElement>(null);
  
  useGSAP(() => {
    gsap.fromTo(".franchise-heading",
      { y: 40, opacity: 0 },
      { y: 0, opacity: 1, duration: 1, ease: "expo.out", scrollTrigger: { trigger: gridRef.current, start: "top 80%" } }
    );

    gsap.fromTo(".franchise-hub",
      { y: 50, opacity: 0, scale: 0.9 },
      { y: 0, opacity: 1, scale: 1, duration: 1, ease: "back.out(1.5)", scrollTrigger: { trigger: ".franchise-hub", start: "top 85%" } }
    );

    gsap.fromTo(".franchise-arrow",
      { scaleY: 0, opacity: 0 },
      { scaleY: 1, opacity: 1, duration: 0.8, ease: "power2.out", scrollTrigger: { trigger: ".franchise-arrow", start: "top 85%" } }
    );

    const cards = gsap.utils.toArray('.franchise-client');
    gsap.fromTo(cards,
      { y: 40, opacity: 0, scale: 0.95 },
      { y: 0, opacity: 1, scale: 1, stagger: 0.15, duration: 0.8, ease: "back.out(1.5)", scrollTrigger: { trigger: ".franchise-clients", start: "top 85%" } }
    );

    gsap.fromTo(".franchise-outcome",
      { y: 30, opacity: 0 },
      { y: 0, opacity: 1, duration: 0.8, ease: "power3.out", scrollTrigger: { trigger: ".franchise-outcome", start: "top 90%" } }
    );
  }, { scope: gridRef });

  return (
    <section className="relative w-full py-24 md:py-32 bg-obsidian z-10">
      <div ref={gridRef} className="container mx-auto px-6 max-w-5xl">
        
        <div className="franchise-heading text-center mb-16 md:mb-24 max-w-3xl mx-auto">
          <span className="text-amber font-mono tracking-widest uppercase text-sm mb-4 block">{t.phase3.title}</span>
          <h2 className="text-3xl md:text-5xl font-sans font-bold text-white mb-6 leading-tight">
            {t.phase3.headline}
          </h2>
          <p className="font-sans text-lg text-offwhite/80 leading-relaxed">
            {t.phase3.body}
          </p>
        </div>

        {/* Hub Card */}
        <div className="franchise-hub relative z-20 flex flex-col items-center bg-charcoal/50 p-8 md:p-10 rounded-[2rem] md:rounded-[3rem] border border-oranje/25 shadow-[0_0_50px_rgba(255,106,0,0.12)] backdrop-blur-xl group mx-auto max-w-sm md:max-w-none">
          <div className="absolute inset-0 bg-gradient-to-br from-oranje/5 to-transparent rounded-[2rem] md:rounded-[3rem] pointer-events-none" />
          <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-oranje to-transparent rounded-t-[2rem]" />
          <Boxes size={40} className="text-oranje mb-4 group-hover:scale-110 transition-transform duration-500" />
          <h3 className="text-xl md:text-2xl font-sans font-bold text-white mb-2">Sergios Skadecenter</h3>
          <p className="font-sans text-white/50 text-center text-sm md:text-base max-w-xs">Svalehøjvej 5, port 11 · 3650 Ølstykke</p>
        </div>

        {/* Connecting Arrow */}
        <div className="franchise-arrow flex flex-col items-center my-6 md:my-8 origin-top">
          <div className="w-[2px] h-10 md:h-14 bg-gradient-to-b from-oranje to-oranje/30"></div>
          <ArrowDown size={18} className="text-oranje -mt-1" />
        </div>

        {/* Dealer partner cards */}
        <div className="franchise-clients grid grid-cols-3 gap-3 md:gap-8 mb-12 md:mb-16">
          <div className="franchise-client bg-charcoal/40 p-4 md:p-8 rounded-[1.5rem] md:rounded-[2rem] border border-white/5 backdrop-blur-md text-center shadow-2xl transition-all duration-300 hover:border-oranje/30">
            <div className="w-10 h-10 md:w-12 md:h-12 rounded-full flex items-center justify-center mx-auto mb-3 md:mb-6 border bg-charcoal border-white/10 text-oranje">
              <Copy size={16} className="md:hidden" />
              <Copy size={20} className="hidden md:block" />
            </div>
            <h4 className="font-mono text-sm md:text-lg text-white mb-2">Gørløse Autoimport</h4>
            <p className="font-sans text-white/50 text-xs md:text-sm leading-relaxed hidden sm:block">Slangerup · 8km nord</p>
          </div>
          <div className="franchise-client bg-charcoal/40 p-4 md:p-8 rounded-[1.5rem] md:rounded-[2rem] border border-amber/25 md:-translate-y-4 shadow-[0_0_20px_rgba(255,158,0,0.1)] backdrop-blur-md text-center shadow-2xl transition-all duration-300 hover:border-oranje/30">
            <div className="w-10 h-10 md:w-12 md:h-12 rounded-full flex items-center justify-center mx-auto mb-3 md:mb-6 border bg-charcoal border-amber/20 text-amber">
              <Copy size={16} className="md:hidden" />
              <Copy size={20} className="hidden md:block" />
            </div>
            <h4 className="font-mono text-sm md:text-lg text-white mb-2">Flemming Henriksen</h4>
            <p className="font-sans text-white/50 text-xs md:text-sm leading-relaxed hidden sm:block">Mercedes-Benz partner</p>
          </div>
          <div className="franchise-client bg-charcoal/40 p-4 md:p-8 rounded-[1.5rem] md:rounded-[2rem] border border-white/5 backdrop-blur-md text-center shadow-2xl transition-all duration-300 hover:border-oranje/30">
            <div className="w-10 h-10 md:w-12 md:h-12 rounded-full flex items-center justify-center mx-auto mb-3 md:mb-6 border bg-charcoal border-white/10 text-oranje">
              <Copy size={16} className="md:hidden" />
              <Copy size={20} className="hidden md:block" />
            </div>
            <h4 className="font-mono text-sm md:text-lg text-white mb-2">Tryg · Alka · TJM</h4>
            <p className="font-sans text-white/50 text-xs md:text-sm leading-relaxed hidden sm:block">Osiguranje · redovni volumen</p>
          </div>
        </div>

        {/* Outcome */}
        <div className="franchise-outcome text-center max-w-2xl mx-auto bg-oranje/5 border border-oranje/15 p-6 md:p-8 rounded-[2rem]">
          <h3 className="text-xl md:text-2xl font-sans font-bold text-oranje mb-3">Ishod</h3>
          <p className="font-sans text-base md:text-lg text-offwhite/90 leading-relaxed font-light">{t.phase3.outcome}</p>
        </div>

      </div>
    </section>
  );
}
