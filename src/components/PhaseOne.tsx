"use client";

import React, { useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";
import { useLanguage } from "./LanguageProvider";
import { Globe, LayoutDashboard, RefreshCw } from "lucide-react";

gsap.registerPlugin(ScrollTrigger);

export default function PhaseOne() {
  const { t } = useLanguage();
  const timelineRef = useRef<HTMLDivElement>(null);
  
  useGSAP(() => {
    // Draw the vertical line down as we scroll
    gsap.fromTo(".timeline-line", 
      { height: "0%" },
      {
        height: "100%",
        ease: "none",
        scrollTrigger: {
          trigger: timelineRef.current,
          start: "top center",
          end: "bottom center",
          scrub: 1
        }
      }
    );

    // Fade in each node and scale the icon when reached
    const nodes = gsap.utils.toArray('.timeline-node');
    nodes.forEach((node: any) => {
      gsap.fromTo(node,
        { opacity: 0, x: -50 },
        {
          opacity: 1,
          x: 0,
          duration: 0.8,
          ease: "power2.out",
          scrollTrigger: {
            trigger: node,
            start: "top 75%"
          }
        }
      );
      
      const icon = node.querySelector('.icon-circle');
      gsap.fromTo(icon,
        { scale: 0, backgroundColor: "#1f2833" },
        {
          scale: 1,
          backgroundColor: "#FF6A00",
          duration: 0.6,
          ease: "back.out(1.7)",
          scrollTrigger: {
            trigger: node,
            start: "top 75%",
          }
        }
      );
    });
  }, { scope: timelineRef });

  return (
    <section className="relative w-full py-32 bg-obsidian z-10">
      <div className="container mx-auto px-6 max-w-4xl">
        <div className="text-center mb-24">
          <span className="text-oranje font-mono tracking-widest uppercase text-sm mb-2 block">{t.phase1.title}</span>
          <h2 className="text-4xl md:text-5xl font-sans font-bold text-offwhite">{t.phase1.headline}</h2>
        </div>

        <div ref={timelineRef} className="relative pl-8 md:pl-0">
          
          {/* Vertical Track Line */}
          <div className="absolute left-8 md:left-1/2 top-0 w-1 h-full bg-charcoal -translate-x-1/2 rounded-full overflow-hidden">
             <div className="timeline-line w-full bg-gradient-to-b from-oranje to-amber h-0" />
          </div>

          <div className="flex flex-col gap-20">
            {/* Step 1 */}
            <div className="timeline-node relative flex flex-col md:flex-row items-center justify-between w-full group">
              <div className="md:w-5/12 hidden md:block" />
              <div className="icon-circle absolute left-0 md:left-1/2 w-12 h-12 rounded-full border-4 border-obsidian -translate-x-[20px] md:-translate-x-1/2 flex items-center justify-center z-10 shadow-[0_0_20px_rgba(255,106,0,0.4)]">
                <Globe size={20} className="text-obsidian" />
              </div>
              <div className="md:w-5/12 pl-12 md:pl-0 w-full">
                <div className="bg-charcoal/40 p-8 rounded-[2rem] border border-white/5 backdrop-blur-sm transition-transform duration-300 hover:-translate-y-2 hover:border-oranje/30">
                  <h3 className="text-2xl font-sans font-bold text-white mb-3">{t.phase1.point1_title}</h3>
                  <p className="font-sans text-white/70 leading-relaxed">{t.phase1.point1_body}</p>
                </div>
              </div>
            </div>

            {/* Step 2 */}
            <div className="timeline-node relative flex flex-col md:flex-row-reverse items-center justify-between w-full group">
              <div className="md:w-5/12 hidden md:block" />
              <div className="icon-circle absolute left-0 md:left-1/2 w-12 h-12 rounded-full border-4 border-obsidian -translate-x-[20px] md:-translate-x-1/2 flex items-center justify-center z-10 shadow-[0_0_20px_rgba(255,106,0,0.4)]">
                <LayoutDashboard size={20} className="text-obsidian" />
              </div>
              <div className="md:w-5/12 pl-12 md:pl-0 w-full md:text-right text-left">
                <div className="bg-charcoal/40 p-8 rounded-[2rem] border border-white/5 backdrop-blur-sm transition-transform duration-300 hover:-translate-y-2 hover:border-oranje/30">
                  <h3 className="text-2xl font-sans font-bold text-white mb-3">{t.phase1.point2_title}</h3>
                  <p className="font-sans text-white/70 leading-relaxed">{t.phase1.point2_body}</p>
                </div>
              </div>
            </div>

            {/* Step 3 */}
            <div className="timeline-node relative flex flex-col md:flex-row items-center justify-between w-full group">
              <div className="md:w-5/12 hidden md:block" />
              <div className="icon-circle absolute left-0 md:left-1/2 w-12 h-12 rounded-full border-4 border-obsidian -translate-x-[20px] md:-translate-x-1/2 flex items-center justify-center z-10 shadow-[0_0_20px_rgba(255,106,0,0.4)]">
                <RefreshCw size={20} className="text-obsidian" />
              </div>
              <div className="md:w-5/12 pl-12 md:pl-0 w-full">
                <div className="bg-charcoal/40 p-8 rounded-[2rem] border border-white/5 backdrop-blur-sm transition-transform duration-300 hover:-translate-y-2 hover:border-oranje/30">
                  <h3 className="text-2xl font-sans font-bold text-white mb-3">{t.phase1.point3_title}</h3>
                  <p className="font-sans text-white/70 leading-relaxed">{t.phase1.point3_body}</p>
                </div>
              </div>
            </div>

          </div>
        </div>
      </div>
    </section>
  );
}
