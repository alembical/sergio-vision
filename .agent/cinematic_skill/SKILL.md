---
name: Cinematic Cafe Frontend Builder
description: A specialized skill containing the design system, architectural patterns, and exact workflow for creating high-fidelity, bilingual, GSAP-powered React frontends for premium cafes.
---

# Cinematic Cafe Builder Skill

This skill defines the technical stack, aesthetic guidelines, and specific implementation patterns used to build "1:1 Pixel Perfect" cinematic web experiences in this codebase.

## Technical Stack
- **Framework**: React 19 + Vite (JavaScript)
- **Styling**: Tailwind CSS v3 (running via `postcss` and `autoprefixer`)
- **Animation**: GSAP 3 (Core + ScrollTrigger plugin). All animations MUST happen inside `useLayoutEffect` / `useEffect` using `gsap.context()` for proper cleanup.
- **Icons**: `lucide-react`
- **Internationalization (i18n)**: Hand-rolled JSON dictionaries (`src/locales/en.json`, `src/locales/da.json`) tracking state at the App root and passed down via props (e.g., `t.nav.home`).

## Core Principles & Way of Working

1. **Bilingual First Directive**: 
   - Never hardcode display text into JSX components.
   - Always update `en.json` and `da.json` simultaneously and symmetrically.
   - Ensure translation tone is inclusive and inviting (e.g., avoiding restrictive terms like "Vegan only" in favor of "Plant-based & comforting").

2. **Cinematic Animation**:
   - Every scroll must be intentional and weighted. Use `power3.out` for entrances and `power2.inOut` for morphing.
   - Links and interactive elements must have a subtle `hover:-translate-y-1` lift with a smooth transition.
   - Global modals (like Menu Overlays) must blur the background (`backdrop-blur-xl`), lock body scrolling with `overflow-hidden`, and smoothly scale elements into view.

3. **Aesthetic System**:
   - **Soft Geometry**: Uniform rounded corners everywhere applied as `rounded-[2rem]` to `rounded-[3rem]`. Never use sharp corners.
   - **Photographic Framing**: Use absolute positioning with `object-cover` and bottom-up inset gradients (`bg-gradient-to-t`) to ensure typography legibility over complex photos.
   - **PDF Rendering**: Implement PDF viewers using responsive `iframe` combined with specific `aspect-ratio` containers (e.g., `aspect-[1.414/0.78]`) and oversized heights to mathematically crop out unseemly blank margins dynamically without losing quality.

4. **Component Architecture**:
   - **Floating Navbar**: Fixed, horizontally centered `top-6 left-1/2 -translate-x-1/2` pill-shape containing the `EN / DA` bilingual toggle and main navigation.
   - **Hero Section**: `100dvh` height, featuring tracking-tight bold sans headings (`font-heading`) mixed with massive italic serif focal points (`font-drama`).
   - **Interactive Carousels**: Avoid standard passive, sliding carousels. Use arrays of objects with GSAP-like absolute positioning, z-index stacking, and scale transitions that animate sequentially on user click/interaction to create a "3D card stack" feel.

## Routine Workflow Execution

When asked to "Add a new feature" or "Update content" in this repository, follow these exact steps:
1. Gather necessary UI assets (images, PDFs) and physically copy them into `app/public/`.
2. Identify required new text strings and edit both `en.json` and `da.json` first.
3. Build or modify the React component in `App.jsx` (or a dedicated component file), ensuring it receives and maps the `t` object for text rendering.
4. Wire up all GSAP animations or CSS transitions to ensure the interactive element feels heavy and cinematic.
5. Re-check visual symmetry on text wrapping, aspect ratios on images, and ensure the language toggle updates the new UI correctly natively.
