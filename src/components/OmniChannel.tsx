"use client";

import React, { useState } from "react";
import { ArrowRight, Mail, Briefcase, Search, MessageSquare } from "lucide-react";
import { useLanguage } from "./LanguageProvider";

export default function OmniChannel() {
  const { t } = useLanguage();
  const [activeIndex, setActiveIndex] = useState(0);

  const items = [
    {
      id: "ch1",
      title: t.phase2.ch1_title,
      body: t.phase2.ch1_body,
      icon: <Mail size={36} />,
      img: "https://images.unsplash.com/photo-1550751827-4bd374c3f58b?auto=format&fit=crop&q=80&w=2670",
    },
    {
      id: "ch2",
      title: t.phase2.ch2_title,
      body: t.phase2.ch2_body,
      icon: <Briefcase size={36} />,
      img: "https://images.unsplash.com/photo-1563986768494-4dee2763ff3f?auto=format&fit=crop&q=80&w=2670",
    },
    {
      id: "ch3",
      title: t.phase2.ch3_title,
      body: t.phase2.ch3_body,
      icon: <Search size={36} />,
      img: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&q=80&w=2670",
    },
    {
      id: "ch4",
      title: t.phase2.ch4_title,
      body: t.phase2.ch4_body,
      icon: <MessageSquare size={36} />,
      img: "https://images.unsplash.com/photo-1451187580459-43490279c0fa?auto=format&fit=crop&q=80&w=2672",
    }
  ];

  return (
    <section className="relative w-full py-24 bg-charcoal">
      <div className="container mx-auto px-6 max-w-7xl">
        <div className="text-center mb-16">
          <span className="text-oranje font-mono tracking-widest uppercase text-sm mb-2 block">{t.phase2.title}</span>
          <h2 className="text-3xl md:text-5xl font-sans font-bold text-white">{t.phase2.headline}</h2>
        </div>

        {/* DESKTOP: Horizontal Accordion */}
        <div className="hidden md:flex flex-row w-full h-[700px] gap-4 overflow-hidden rounded-[3rem] shadow-2xl">
          {items.map((item, idx) => {
            const isActive = activeIndex === idx;
            return (
              <div 
                key={item.id}
                onClick={() => setActiveIndex(idx)}
                onMouseEnter={() => setActiveIndex(idx)}
                className={`group relative transition-all duration-700 ease-[cubic-bezier(0.25,1,0.5,1)] rounded-[3rem] overflow-hidden cursor-pointer flex flex-col justify-end ${
                  isActive ? 'flex-[4]' : 'flex-1'
                }`}
              >
                <img src={item.img} alt={item.title} className={`absolute inset-0 w-full h-full object-cover transition-transform duration-1000 ${isActive ? 'scale-105 opacity-90' : 'scale-100 opacity-55 group-hover:opacity-75'}`} />
                <div className="absolute inset-0 bg-obsidian/20" />
                <div className={`absolute inset-0 bg-gradient-to-t from-black/85 via-black/35 to-transparent transition-opacity duration-700 pointer-events-none ${isActive ? 'opacity-80' : 'opacity-25 group-hover:opacity-45'}`} />
                <div className={`relative z-10 w-full p-10 flex flex-col justify-end transition-all duration-700 ${isActive ? 'opacity-100 translate-y-0 delay-100' : 'opacity-0 translate-y-8 absolute bottom-0 pointer-events-none'}`}>
                  <div className="mb-6 text-oranje">{item.icon}</div>
                  <h3 className="font-sans font-bold text-3xl md:text-4xl text-white leading-tight drop-shadow-lg pb-3">{item.title}</h3>
                  <p className="font-sans text-white/80 text-lg md:text-xl max-w-xl leading-relaxed">{item.body}</p>
                  <div className="absolute top-10 right-10 flex w-12 h-12 rounded-full bg-oranje text-obsidian items-center justify-center shrink-0 shadow-[0_0_20px_rgba(255,106,0,0.3)] transform hover:scale-110 transition-transform">
                    <ArrowRight size={24} />
                  </div>
                </div>
                <div className={`absolute inset-0 z-10 flex flex-col items-center justify-end pb-12 transition-opacity duration-500 ${isActive ? 'opacity-0 pointer-events-none' : 'opacity-100'}`}>
                  <div className="text-white/50 group-hover:text-oranje transition-colors mb-4">{item.icon}</div>
                  <div className="w-1.5 h-1.5 rounded-full bg-white/60 group-hover:bg-oranje group-hover:scale-150 transition-all" />
                </div>
              </div>
            );
          })}
        </div>

        {/* MOBILE: Vertical Accordion — same organic expand feel, text always visible */}
        <div className="flex md:hidden flex-col w-full gap-3 overflow-hidden rounded-[2rem] shadow-2xl">
          {items.map((item, idx) => {
            const isActive = activeIndex === idx;
            return (
              <div 
                key={item.id}
                onClick={() => setActiveIndex(idx)}
                className={`group relative transition-all duration-700 ease-[cubic-bezier(0.25,1,0.5,1)] rounded-[1.5rem] overflow-hidden cursor-pointer flex flex-col justify-end ${
                  isActive ? 'flex-[6]' : 'flex-1'
                }`}
                style={{ minHeight: isActive ? '280px' : '90px' }}
              >
                {/* Background */}
                <img src={item.img} alt={item.title} className={`absolute inset-0 w-full h-full object-cover transition-all duration-700 ${isActive ? 'scale-105 opacity-75' : 'scale-100 opacity-45'}`} />
                <div className={`absolute inset-0 bg-gradient-to-t from-obsidian via-obsidian/55 to-obsidian/25 transition-opacity duration-500`} />
                
                {/* Content — always visible title, body appears when active */}
                <div className="relative z-10 w-full p-5 flex flex-col justify-end h-full">
                  <div className={`flex items-center gap-3 mb-2 text-oranje transition-all duration-500 ${isActive ? 'scale-100' : 'scale-90'}`}>
                    {React.cloneElement(item.icon, { size: isActive ? 28 : 22 })}
                    <h3 className={`font-sans font-bold text-white leading-tight transition-all duration-500 ${isActive ? 'text-xl' : 'text-base'}`}>
                      {item.title}
                    </h3>
                    {!isActive && <ArrowRight size={16} className="text-oranje/60 ml-auto" />}
                  </div>
                  <div className={`overflow-hidden transition-all duration-700 ease-[cubic-bezier(0.25,1,0.5,1)] ${isActive ? 'max-h-[200px] opacity-100 mt-2' : 'max-h-0 opacity-0'}`}>
                    <p className="font-sans text-white/70 text-sm leading-relaxed">{item.body}</p>
                  </div>
                </div>
              </div>
            );
          })}
        </div>

      </div>
    </section>
  );
}
