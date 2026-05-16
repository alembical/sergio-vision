"use client";

import React, { useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { ScrollToPlugin } from "gsap/ScrollToPlugin";
import { useGSAP } from "@gsap/react";
import { useLanguage } from "./LanguageProvider";
import { ChevronDown } from "lucide-react";

gsap.registerPlugin(ScrollTrigger, ScrollToPlugin);

export default function Hero() {
  const { t } = useLanguage();
  const heroRef = useRef<HTMLElement>(null);
  
  const smoothScroll = (targetId: string) => {
    const el = document.getElementById(targetId);
    if (!el) return;
    const y = el.getBoundingClientRect().top + window.scrollY - 80;
    gsap.to(window, { scrollTo: { y, autoKill: false }, duration: 1.4, ease: "power3.inOut" });
  };

  useGSAP(() => {
    const tl = gsap.timeline({ defaults: { ease: "power3.out" } });
    
    tl.fromTo(".hero-badge", { y: -20, opacity: 0 }, { y: 0, opacity: 1, duration: 0.6 });
    tl.fromTo(".hero-headline", { y: 60, opacity: 0, clipPath: "inset(0 0 100% 0)" }, { y: 0, opacity: 1, clipPath: "inset(0 0 0% 0)", duration: 1.2, stagger: 0.15 }, "-=0.2");
    tl.fromTo(".hero-desc", { y: 30, opacity: 0 }, { y: 0, opacity: 1, duration: 0.8 }, "-=0.4");
    tl.fromTo(".hero-cta", { y: 30, opacity: 0, scale: 0.9 }, { y: 0, opacity: 1, scale: 1, duration: 0.8, ease: "back.out(1.7)" }, "-=0.3");
    tl.fromTo(".hero-scroll-hint", { opacity: 0, y: -10 }, { opacity: 1, y: 0, duration: 0.6 }, "-=0.2");
    
    // Floating cards entrance — works on all screen sizes
    tl.fromTo(".hero-float", { scale: 0.8, opacity: 0, y: 40 }, { scale: 1, opacity: 1, y: 0, duration: 1.2, stagger: 0.25, ease: "expo.out" }, "-=1");

    gsap.to(".hero-float-1", { y: -18, duration: 3.5, repeat: -1, yoyo: true, ease: "sine.inOut" });
    gsap.to(".hero-float-2", { y: 14, duration: 4.5, repeat: -1, yoyo: true, ease: "sine.inOut", delay: 0.8 });
    gsap.to(".hero-float-3", { x: 8, y: -12, duration: 4, repeat: -1, yoyo: true, ease: "sine.inOut", delay: 1.5 });
    
    gsap.to(".hero-bg-image", {
      y: 100, ease: "none",
      scrollTrigger: { trigger: heroRef.current, start: "top top", end: "bottom top", scrub: 1 }
    });

    gsap.to(".hero-scroll-hint", { y: 8, duration: 1.2, repeat: -1, yoyo: true, ease: "power1.inOut" });

  }, { scope: heroRef });

  return (
    <section 
      ref={heroRef} 
      className="relative w-full h-[100dvh] flex items-center overflow-hidden bg-obsidian"
    >
      <img
        src="/images/hero-fallback.jpg"
        alt=""
        className="hero-bg-image absolute inset-0 w-full h-[120%] object-cover opacity-55 pointer-events-none scale-110"
      />
      
      <div className="absolute inset-0 bg-gradient-to-r from-obsidian/95 via-obsidian/70 to-obsidian/30 pointer-events-none" />
      <div className="absolute inset-0 bg-gradient-to-t from-obsidian/90 via-transparent to-obsidian/40 pointer-events-none" />
      
      <div className="absolute top-[10%] right-[10%] w-[45dvw] h-[45dvw] bg-oranje opacity-[0.08] rounded-full blur-[180px] pointer-events-none" />
      <div className="absolute bottom-[5%] left-[5%] w-[30dvw] h-[30dvw] bg-amber opacity-[0.06] rounded-full blur-[140px] pointer-events-none" />

      <div className="container mx-auto px-6 max-w-7xl h-full flex flex-col lg:flex-row items-center justify-between gap-4 lg:gap-8 z-10 relative pt-24 pb-16 lg:pb-12">
        
        {/* Left Content */}
        <div className="flex-1 flex flex-col justify-center items-start">
          <div className="hero-badge inline-flex items-center gap-2 bg-oranje/10 border border-oranje/20 rounded-full px-4 py-2 mb-4 lg:mb-8">
            <span className="w-2 h-2 rounded-full bg-oranje animate-pulse shadow-[0_0_8px_rgba(255,106,0,0.8)]"></span>
            <span className="font-mono text-xs uppercase tracking-[0.2em] text-oranje">{t.hero.badge}</span>
          </div>

          <h1 className="mb-3 lg:mb-6">
            <span className="hero-headline block font-sans font-extrabold text-3xl sm:text-4xl md:text-6xl xl:text-8xl leading-[1.05] tracking-tight text-white mb-1 md:mb-3">
              {t.hero.headline}
            </span>
            <span className="hero-headline block font-drama italic text-2xl sm:text-3xl md:text-5xl xl:text-7xl leading-[1.1] text-oranje">
              {t.hero.subheadline}
            </span>
          </h1>
          
          <div className="hero-desc w-12 md:w-20 h-1 bg-gradient-to-r from-oranje to-amber rounded-full mb-4 lg:mb-8" />
          
          <p className="hero-desc text-sm md:text-xl font-sans text-offwhite/75 max-w-lg mb-6 lg:mb-12 leading-relaxed font-light">
            {t.hero.promise}
          </p>

          <button 
            onClick={() => smoothScroll('philosophy')}
            className="hero-cta group relative overflow-hidden rounded-[2rem] bg-oranje px-6 md:px-10 py-3 md:py-5 font-sans font-bold text-sm md:text-lg text-obsidian transition-all duration-400 ease-[cubic-bezier(0.25,0.46,0.45,0.94)] hover:-translate-y-2 hover:scale-[1.05] shadow-[0_10px_40px_rgba(255,106,0,0.4)]"
          >
            <span className="relative z-10 transition-colors duration-300 group-hover:text-oranje flex items-center gap-2 md:gap-3">
              {t.hero.cta}
              <ChevronDown size={18} className="group-hover:translate-y-0.5 transition-transform" />
            </span>
            <div className="absolute inset-0 z-0 h-full w-full bg-obsidian translate-y-full transition-transform duration-400 group-hover:translate-y-0 border-2 border-oranje rounded-[2rem]"></div>
          </button>
        </div>

        {/* Right — Floating Data Visualization (ALL screens, scaled on mobile) */}
        <div className="flex-shrink-0 w-full lg:flex-1 h-[180px] sm:h-[220px] lg:h-full lg:max-h-[75vh] flex items-center justify-center relative">
          
          {/* Primary Card — Glowing Core */}
          <div className="hero-float hero-float-1 absolute z-20 
            w-36 h-44 sm:w-44 sm:h-52 lg:w-72 lg:h-80 
            bg-charcoal/30 border border-oranje/15 backdrop-blur-2xl 
            rounded-[1.5rem] lg:rounded-[2.5rem] 
            shadow-[0_15px_40px_rgba(0,0,0,0.7)] lg:shadow-[0_25px_60px_rgba(0,0,0,0.7)] 
            flex flex-col items-center justify-center
            -translate-x-4 lg:translate-x-0"
          >
            <div className="w-12 h-12 sm:w-16 sm:h-16 lg:w-24 lg:h-24 rounded-full border-2 border-oranje/30 flex items-center justify-center relative">
              <div className="w-7 h-7 sm:w-9 sm:h-9 lg:w-14 lg:h-14 bg-gradient-to-br from-oranje via-amber to-oranje rounded-full shadow-[0_0_30px_rgba(255,106,0,0.6)] lg:shadow-[0_0_40px_rgba(255,106,0,0.6)]"></div>
              <div className="absolute inset-[-4px] rounded-full border border-dashed border-oranje/20 animate-[spin_8s_linear_infinite]"></div>
              <div className="hidden sm:block absolute inset-[-12px] rounded-full border border-oranje/10 animate-[spin_12s_linear_infinite_reverse]"></div>
            </div>
            <div className="mt-3 lg:mt-8 font-mono text-[10px] sm:text-xs lg:text-sm tracking-[0.1em] lg:tracking-[0.15em] uppercase text-oranje/80">Sistem aktivan</div>
            <div className="mt-1 lg:mt-2 flex items-center gap-1 lg:gap-2">
              <div className="w-1 h-1 lg:w-1.5 lg:h-1.5 rounded-full bg-green-400 animate-pulse"></div>
              <span className="font-mono text-[9px] lg:text-xs text-green-400/80">10 ljudi povezano</span>
            </div>
          </div>

          {/* Secondary Card — Progress Metric */}
          <div className="hero-float hero-float-2 absolute z-30 
            w-32 h-28 sm:w-40 sm:h-36 lg:w-52 lg:h-44 
            bg-obsidian/60 border border-white/8 backdrop-blur-3xl 
            rounded-[1rem] lg:rounded-[2rem] 
            shadow-[0_10px_30px_rgba(0,0,0,0.9)] lg:shadow-[0_15px_40px_rgba(0,0,0,0.9)] 
            flex flex-col justify-end p-3 sm:p-4 lg:p-6 
            translate-x-16 sm:translate-x-24 lg:translate-x-40 
            -translate-y-12 sm:-translate-y-20 lg:-translate-y-32"
          >
            <div className="font-mono text-[9px] sm:text-[10px] lg:text-xs text-white/40 uppercase tracking-wider mb-1 lg:mb-3">Status poslova</div>
            <div className="w-full h-1.5 lg:h-2 bg-charcoal rounded-full overflow-hidden mb-1.5 lg:mb-3">
              <div className="w-[85%] h-full bg-gradient-to-r from-oranje to-amber rounded-full shadow-[0_0_8px_rgba(255,106,0,0.5)]"></div>
            </div>
            <div className="flex justify-between items-end">
              <div className="font-sans font-extrabold text-lg sm:text-2xl lg:text-3xl text-white">85%</div>
              <div className="font-mono text-[9px] lg:text-xs text-oranje">+12.4%</div>
            </div>
          </div>

          {/* Tertiary Element — Status Pill */}
          <div className="hero-float hero-float-3 absolute z-10 
            w-44 h-10 sm:w-52 sm:h-12 lg:w-64 lg:h-16 
            bg-white/[0.04] border border-white/8 backdrop-blur-md 
            rounded-full 
            shadow-[0_6px_20px_rgba(0,0,0,0.5)] lg:shadow-[0_10px_30px_rgba(0,0,0,0.5)] 
            flex items-center gap-2 lg:gap-4 px-3 lg:px-5 
            -translate-y-28 sm:-translate-y-40 lg:-translate-y-56 
            -translate-x-2 lg:-translate-x-4"
          >
            <div className="w-6 h-6 sm:w-8 sm:h-8 lg:w-10 lg:h-10 rounded-full bg-oranje/15 border border-oranje/30 flex items-center justify-center relative shrink-0">
              <span className="w-1.5 h-1.5 lg:w-2.5 lg:h-2.5 rounded-full bg-oranje animate-ping absolute"></span>
              <span className="w-1.5 h-1.5 lg:w-2.5 lg:h-2.5 rounded-full bg-oranje relative z-10"></span>
            </div>
            <div className="min-w-0">
              <div className="font-sans font-semibold text-[10px] sm:text-xs lg:text-sm text-white/90 truncate">Tabla u realnom vremenu</div>
              <div className="font-mono text-[8px] lg:text-xs text-oranje/80">Glasurit · Tryg · MitID</div>
            </div>
          </div>
        </div>
      </div>

      {/* Scroll Hint */}
      <div className="hero-scroll-hint absolute bottom-4 lg:bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-1 z-20">
        <span className="font-mono text-[10px] lg:text-xs uppercase tracking-[0.25em] text-offwhite/30">Scroll</span>
        <ChevronDown size={16} className="text-oranje/60" />
      </div>
    </section>
  );
}
