---
name: Organic Accordion Gallery (Cinematic Expanding Cards)
description: A 1:1 Pixel Perfect cinematic expanding card accordion for displaying galleries or carousels. Fluidly transitions between horizontal hover expansion on desktop and vertical click expansion on mobile.
---

# Organic Accordion Gallery

This skill provides the architectural pattern for building a highly modern, interactive expanding card gallery (accordion). It rejects standard sliding carousels in favor of an immersive, full-bleed visual experience using Flexbox and CSS transitions.

## The "Antigravity" Effect
- **Fluid Layout**: Uses `flex-1` for inactive states and `flex-[4]` or `flex-[6]` for the active (expanded) state to create a smooth, organic layout shift.
- **Cinematic Transitions**: Powered by a custom cubic bezier curve (`ease-[cubic-bezier(0.25,1,0.5,1)]`) with a `700ms` duration for a heavy, deliberate, premium feel.
- **Responsive Geometry**:
  - **Desktop (`md:flex-row`)**: Stacks side-by-side horizontally. Expands smoothly upon mouse hover (`onMouseEnter`).
  - **Mobile (`flex-col`)**: Stacks vertically. Expands upon touch/click (`onClick`), making the images tall and maintaining high-quality aspect ratios instead of squashing them.
- **Text Legibility**: Integrates a dynamic dark gradient overlay that fades in dynamically based on the active state.

## Implementation Pattern (React + Tailwind CSS)

Use the following reference implementation when asked to recreate this effect within a React application. Ensure the `lucide-react` library is available for icons (or replace `ArrowRight`).

```jsx
import React, { useState } from 'react';
import { ArrowRight } from 'lucide-react';

export const OrganicAccordionGallery = ({ items }) => {
  const [activeIndex, setActiveIndex] = useState(0);

  // items array format: { id, title, img: "url/to/image.jpg" }

  return (
    <div className="flex flex-col md:flex-row w-full h-full min-h-[400px] md:min-h-[500px] gap-2 md:gap-4 overflow-hidden rounded-[2rem] md:rounded-[3rem] shadow-xl">
      {items.map((item, idx) => {
        const isActive = activeIndex === idx;
        
        return (
          <div 
            key={item.id}
            onClick={() => setActiveIndex(idx)}
            onMouseEnter={() => window.innerWidth >= 768 && setActiveIndex(idx)}
            className={`group relative transition-all duration-700 ease-[cubic-bezier(0.25,1,0.5,1)] rounded-[1.5rem] md:rounded-[3rem] overflow-hidden cursor-pointer flex flex-col justify-end ${
              isActive ? 'flex-[6] md:flex-[4]' : 'flex-1'
            }`}
          >
            {/* Background Image with Scale Animation */}
            <img 
              src={item.img} 
              alt={item.title} 
              className={`absolute inset-0 w-full h-full object-cover transition-transform duration-1000 ${
                isActive ? 'scale-105' : 'scale-100 opacity-80 group-hover:opacity-100'
              }`} 
            />
            
            {/* Gradient Overlay for Text Legibility */}
            <div className={`absolute inset-0 bg-gradient-to-t from-black/90 via-black/40 to-transparent transition-opacity duration-700 ${
              isActive ? 'opacity-80' : 'opacity-30 group-hover:opacity-60'
            }`} />
            
            {/* Expanded Content (Title & Arrow) */}
            <div className={`relative z-10 w-full p-4 md:p-8 flex justify-between items-end transition-all duration-700 ${
              isActive ? 'opacity-100 translate-y-0 delay-100' : 'opacity-0 translate-y-4 absolute bottom-0 pointer-events-none'
            }`}>
               <h3 className="font-sans font-bold text-xl md:text-3xl text-white leading-tight drop-shadow-md pb-1 md:pb-2">
                 {item.title}
               </h3>
               {/* Arrow Button - Hidden on mobile, visible on desktop when active */}
               <div className="hidden md:flex w-10 h-10 rounded-full bg-white text-black items-center justify-center shrink-0 shadow-lg transform hover:scale-110 transition-transform mb-2">
                 <ArrowRight size={20} />
               </div>
            </div>
            
            {/* Collapsed State Visual Indicator (Desktop: Hover to scale dot) */}
            <div className={`absolute inset-0 z-10 hidden md:flex items-end justify-center pb-8 transition-opacity duration-500 ${
              isActive ? 'opacity-0 pointer-events-none' : 'opacity-100'
            }`}>
               <div className="w-1.5 h-1.5 rounded-full bg-white/80 mb-2 group-hover:scale-150 transition-transform" />
            </div>
            
            {/* Collapsed State Visual Indicator (Mobile) */}
            <div className={`absolute inset-0 z-10 flex md:hidden items-center justify-center transition-opacity duration-500 ${
              isActive ? 'opacity-0 pointer-events-none' : 'opacity-100'
            }`}>
               <div className="w-1.5 h-1.5 rounded-full bg-white/80" />
            </div>
          </div>
        )
      })}
    </div>
  );
};
```

## Setup Requirements

1. **Height Configuration**: The wrapper holding this component MUST have a defined height (e.g., `h-[24rem]` on mobile and `md:h-[32rem]` on desktop) or use `min-h` utilities, as Flexbox uses proportional sizing to fill the container space.
2. **Global Styles Constraint**: The animations rely purely on standard Tailwind classes. No custom CSS file tweaks are necessary beyond ensuring Tailwind is installed.
3. **Icons**: Uses `lucide-react` for the `<ArrowRight />` icon. Replace or remove if using a different icon set.
