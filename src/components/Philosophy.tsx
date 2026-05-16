"use client";

import React, { useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";
import { useLanguage } from "./LanguageProvider";
import { Handshake, Lock, Shield, Zap } from "lucide-react";

gsap.registerPlugin(ScrollTrigger);

export default function Philosophy() {
  const { t } = useLanguage();
  const containerRef = useRef<HTMLDivElement>(null);
  
  useGSAP(() => {
    // Dramatic heading entrance
    gsap.fromTo(".phil-heading", 
      { y: 60, opacity: 0 },
      {
        y: 0, opacity: 1, duration: 1.2, ease: "expo.out",
        scrollTrigger: { trigger: containerRef.current, start: "top 80%" }
      }
    );

    gsap.fromTo(".phil-accent-line",
      { scaleX: 0 },
      {
        scaleX: 1, duration: 1, ease: "power3.out",
        scrollTrigger: { trigger: containerRef.current, start: "top 75%" }
      }
    );

    // Staggered card entrances from both sides
    gsap.fromTo(".phil-card-left",
      { x: -80, opacity: 0, scale: 0.95 },
      {
        x: 0, opacity: 1, scale: 1, duration: 1, ease: "expo.out",
        scrollTrigger: { trigger: ".phil-card-left", start: "top 85%" }
      }
    );
    gsap.fromTo(".phil-card-right",
      { x: 80, opacity: 0, scale: 0.95 },
      {
        x: 0, opacity: 1, scale: 1, duration: 1, ease: "expo.out",
        scrollTrigger: { trigger: ".phil-card-right", start: "top 85%" }
      }
    );

    // Mini stat cards pop in
    const stats = gsap.utils.toArray('.phil-stat');
    gsap.fromTo(stats,
      { y: 30, opacity: 0, scale: 0.9 },
      {
        y: 0, opacity: 1, scale: 1, stagger: 0.1, duration: 0.7, ease: "back.out(1.5)",
        scrollTrigger: { trigger: ".phil-stats-row", start: "top 85%" }
      }
    );

  }, { scope: containerRef });

  return (
    <section 
      id="philosophy"
      ref={containerRef} 
      className="relative w-full py-32 bg-obsidian text-offwhite overflow-hidden"
    >
      {/* Subtle oranje glow behind section */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[70dvw] h-[50dvw] bg-oranje opacity-[0.04] rounded-full blur-[200px] pointer-events-none" />
      
      {/* Abstract geometric decoration */}
      <div className="absolute top-20 right-10 w-64 h-64 border border-white/[0.03] rounded-full pointer-events-none" />
      <div className="absolute bottom-20 left-10 w-48 h-48 border border-oranje/[0.05] rounded-full pointer-events-none" />

      <div className="container mx-auto px-6 max-w-7xl relative z-10">
        
        {/* Section Header — Centered, Premium */}
        <div className="text-center mb-20">
          <div className="phil-heading inline-flex items-center gap-2 bg-oranje/10 border border-oranje/20 rounded-full px-4 py-2 mb-8">
            <Shield size={14} className="text-oranje" />
            <span className="font-mono text-xs uppercase tracking-[0.2em] text-oranje">Tillid · Kvalitet · Premium</span>
          </div>
          <h2 className="phil-heading text-4xl md:text-6xl lg:text-7xl font-sans font-extrabold leading-tight mb-4">
            Dva stuba.<br/>
            <span className="font-drama italic text-oranje">Jedan brend.</span>
          </h2>
          <div className="phil-accent-line mx-auto w-32 h-1.5 bg-gradient-to-r from-oranje to-amber rounded-full mt-6 origin-left" />
        </div>

        {/* Two Cards Side by Side */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-16">
          
          {/* Transparency Card */}
          <div className="phil-card-left relative bg-charcoal/40 p-10 lg:p-12 rounded-[2.5rem] border border-white/5 backdrop-blur-md shadow-[0_30px_80px_rgba(0,0,0,0.5)] overflow-hidden group hover:border-oranje/20 transition-all duration-500">
            {/* Accent stripe */}
            <div className="absolute top-0 left-0 w-full h-1.5 bg-gradient-to-r from-oranje via-amber to-transparent" />
            {/* Background glow on hover */}
            <div className="absolute inset-0 bg-gradient-to-br from-oranje/[0.03] to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none" />
            
            <div className="relative z-10">
              <div className="w-16 h-16 rounded-[1.2rem] bg-oranje/10 border border-oranje/20 flex items-center justify-center mb-8">
                <Handshake size={32} className="text-oranje" />
              </div>
              <h3 className="text-2xl md:text-3xl font-sans font-bold text-white mb-5 leading-snug">
                {t.philosophy.shared_effort_title}
              </h3>
              <p className="font-sans text-white/65 text-lg leading-relaxed">
                {t.philosophy.shared_effort_body}
              </p>
            </div>
          </div>

          {/* Security Card */}
          <div className="phil-card-right relative bg-charcoal/40 p-10 lg:p-12 rounded-[2.5rem] border border-white/5 backdrop-blur-md shadow-[0_30px_80px_rgba(0,0,0,0.5)] overflow-hidden group hover:border-amber/20 transition-all duration-500">
            {/* Accent stripe */}
            <div className="absolute top-0 left-0 w-full h-1.5 bg-gradient-to-r from-amber via-oranje to-transparent" />
            {/* Background glow on hover */}
            <div className="absolute inset-0 bg-gradient-to-br from-amber/[0.03] to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none" />
            
            <div className="relative z-10">
              <div className="w-16 h-16 rounded-[1.2rem] bg-amber/10 border border-amber/20 flex items-center justify-center mb-8">
                <Lock size={32} className="text-amber" />
              </div>
              <h3 className="text-2xl md:text-3xl font-sans font-bold text-white mb-5 leading-snug">
                {t.philosophy.secure_yours_title}
              </h3>
              <p className="font-sans text-white/65 text-lg leading-relaxed">
                {t.philosophy.secure_yours_body}
              </p>
            </div>
          </div>
        </div>

        {/* Trust Indicators / Mini Stats Row */}
        <div className="phil-stats-row grid grid-cols-2 md:grid-cols-4 gap-4">
          <div className="phil-stat text-center bg-white/[0.03] border border-white/5 rounded-[1.5rem] p-6 hover:border-oranje/20 transition-colors duration-300">
            <Zap size={20} className="text-oranje mx-auto mb-3" />
            <div className="font-mono text-2xl font-bold text-white mb-1">3 god.</div>
            <div className="font-sans text-xs text-offwhite/50 uppercase tracking-wider">Garancija</div>
          </div>
          <div className="phil-stat text-center bg-white/[0.03] border border-white/5 rounded-[1.5rem] p-6 hover:border-oranje/20 transition-colors duration-300">
            <Shield size={20} className="text-amber mx-auto mb-3" />
            <div className="font-mono text-2xl font-bold text-white mb-1">5</div>
            <div className="font-sans text-xs text-offwhite/50 uppercase tracking-wider">Osiguravača</div>
          </div>
          <div className="phil-stat text-center bg-white/[0.03] border border-white/5 rounded-[1.5rem] p-6 hover:border-oranje/20 transition-colors duration-300">
            <Lock size={20} className="text-oranje mx-auto mb-3" />
            <div className="font-mono text-2xl font-bold text-white mb-1">2009</div>
            <div className="font-sans text-xs text-offwhite/50 uppercase tracking-wider">Osnovan</div>
          </div>
          <div className="phil-stat text-center bg-white/[0.03] border border-white/5 rounded-[1.5rem] p-6 hover:border-oranje/20 transition-colors duration-300">
            <Handshake size={20} className="text-amber mx-auto mb-3" />
            <div className="font-mono text-2xl font-bold text-white mb-1">10</div>
            <div className="font-sans text-xs text-offwhite/50 uppercase tracking-wider">Zaposlenih</div>
          </div>
        </div>

      </div>
    </section>
  );
}
