"use client";

import React, { useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";
import { useLanguage } from "./LanguageProvider";
import { Activity, BarChart2, Crosshair, Users } from "lucide-react";

gsap.registerPlugin(ScrollTrigger);

export default function AwareSystem() {
  const { t } = useLanguage();
  const awareRef = useRef<HTMLDivElement>(null);
  
  useGSAP(() => {
    const cards = gsap.utils.toArray('.glass-card');
    
    gsap.fromTo(cards,
      { opacity: 0, scale: 0.9, y: 30 },
      {
        opacity: 1,
        scale: 1,
        y: 0,
        stagger: 0.15,
        duration: 0.8,
        ease: "back.out(1.2)",
        scrollTrigger: {
          trigger: awareRef.current,
          start: "top 70%",
        }
      }
    );
  }, { scope: awareRef });

  return (
    <section ref={awareRef} className="relative w-full py-32 bg-obsidian text-offwhite overflow-hidden">
      {/* Abstract Grid Background */}
      <div className="absolute inset-0 z-0 opacity-10" style={{ backgroundImage: 'linear-gradient(rgba(255, 106, 0, 0.2) 1px, transparent 1px), linear-gradient(90deg, rgba(255, 106, 0, 0.2) 1px, transparent 1px)', backgroundSize: '40px 40px' }} />
      
      {/* Light Flares */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[80dvw] h-[80dvw] md:w-[40dvw] md:h-[40dvw] bg-oranje opacity-10 rounded-full blur-[150px] pointer-events-none" />

      <div className="container mx-auto px-6 max-w-7xl relative z-10">
        <div className="text-center mb-20">
          <span className="inline-flex items-center justify-center gap-2 text-oranje font-mono tracking-widest uppercase text-sm mb-4 bg-oranje/10 px-4 py-2 rounded-full border border-oranje/20">
            <span className="w-2 h-2 rounded-full bg-oranje animate-pulse"></span>
            {t.aware.title}
          </span>
          <h2 className="text-4xl md:text-6xl font-sans font-bold text-white mb-6">
            {t.aware.headline}
          </h2>
          <p className="text-xl text-offwhite/70 max-w-3xl mx-auto font-sans leading-relaxed">
            {t.aware.body1}
          </p>
        </div>

        {/* Dashboard Glass UI */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
          
          <div className="glass-card bg-charcoal/40 border border-white/10 backdrop-blur-xl p-8 rounded-[2rem] shadow-[0_8px_32px_0_rgba(0,0,0,0.37)] hover:border-oranje/40 transition-colors">
            <div className="flex justify-between items-start mb-12">
              <div className="p-3 bg-amber/20 rounded-xl text-amber">
                <BarChart2 size={24} />
              </div>
              <span className="flex items-center gap-2 text-xs font-mono text-oranje/80">
                <span className="w-1.5 h-1.5 rounded-full bg-oranje animate-ping"></span> Live
              </span>
            </div>
            <div className="font-mono text-4xl text-white mb-2">Live</div>
            <div className="text-sm text-offwhite/60 font-sans">Status svakog auta</div>
          </div>

          <div className="glass-card bg-charcoal/40 border border-white/10 backdrop-blur-xl p-8 rounded-[2rem] shadow-[0_8px_32px_0_rgba(0,0,0,0.37)] hover:border-oranje/40 transition-colors">
            <div className="flex justify-between items-start mb-12">
              <div className="p-3 bg-oranje/20 rounded-xl text-oranje">
                <Users size={24} />
              </div>
            </div>
            <div className="font-mono text-4xl text-white mb-2">10</div>
            <div className="text-sm text-offwhite/60 font-sans">Zaposlenih na jednoj tabli</div>
          </div>

          <div className="glass-card bg-charcoal/40 border border-white/10 backdrop-blur-xl p-8 rounded-[2rem] shadow-[0_8px_32px_0_rgba(0,0,0,0.37)] hover:border-oranje/40 transition-colors">
            <div className="flex justify-between items-start mb-12">
              <div className="p-3 bg-amber/20 rounded-xl text-amber">
                <Activity size={24} />
              </div>
            </div>
            <div className="font-mono text-4xl text-white mb-2">5+</div>
            <div className="text-sm text-offwhite/60 font-sans">Dileri i osiguravači</div>
          </div>

          <div className="glass-card bg-charcoal/40 border border-white/10 backdrop-blur-xl p-8 rounded-[2rem] shadow-[0_8px_32px_0_rgba(0,0,0,0.37)] hover:border-oranje/40 transition-colors">
            <div className="flex justify-between items-start mb-12">
              <div className="p-3 bg-oranje/20 rounded-xl text-oranje">
                <Crosshair size={24} />
              </div>
            </div>
            <div className="font-mono text-4xl text-white mb-2">Jedno</div>
            <div className="text-sm text-offwhite/60 font-sans">Mesto za sve</div>
          </div>

        </div>

        <div className="glass-card bg-charcoal/40 border border-white/10 backdrop-blur-xl p-8 md:p-12 rounded-[2rem] lg:rounded-[3rem] shadow-[0_8px_32px_0_rgba(0,0,0,0.37)] relative overflow-hidden">
          <div className="absolute right-0 top-0 w-1/3 h-full bg-gradient-to-l from-oranje/10 to-transparent pointer-events-none" />
          <div className="font-mono text-sm text-amber mb-4 uppercase tracking-widest block">{t.aware.body2}</div>
          <p className="font-sans text-xl md:text-2xl text-white leading-relaxed max-w-4xl relative z-10">
            {t.aware.result}
          </p>
        </div>

      </div>
    </section>
  );
}
