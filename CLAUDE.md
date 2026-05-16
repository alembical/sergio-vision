# Sergio Vision — Project Guide

## What This Is

A private presentation site for **Sergio Djurdjevic**, owner of **Sergios Skadecenter ApS**, Ølstykke, Denmark. Alex sends Sergio a single URL. Sergio scrolls a narrative pitch, sees a vision of what his business site can grow into, and replies by email when ready.

**Built by:** Alex @ MakerToo  
**Languages:** Serbian Latin (default) / Danish toggle  
**Brand DNA:** Tillid · Kvalitet · Premium

## Structure

```
src/
├── app/
│   ├── page.tsx          # 7 sections in order
│   ├── layout.tsx        # Root layout, fonts, metadata
│   └── globals.css       # Design tokens, Tailwind theme
├── components/
│   ├── FloatingNav.tsx   # Navbar + SR/DA toggle + Sergio logo
│   ├── Hero.tsx          # Hero + floating data cards
│   ├── Philosophy.tsx    # Two pillars (Tillid + Kvalitet)
│   ├── PhaseOne.tsx      # 3 core capabilities (timeline)
│   ├── OmniChannel.tsx   # 4 modules accordion
│   ├── AwareSystem.tsx   # "Tvoj radni sto" command center
│   ├── FranchiseGrid.tsx # Gørløse Autoimport dealer partners
│   ├── RoadmapFooter.tsx # 5-step launch roadmap + CTA
│   └── LanguageProvider.tsx
└── locales/
    ├── sr.json           # Serbian Latin (primary)
    └── da.json           # Danish
```

## Before sending to Sergio

Replace `__HOSTINGER_AFFILIATE_LINK__` in `RoadmapFooter.tsx` with the actual Hostinger affiliate URL.

## Karpathy Principles

Surgical changes only. No new features without explicit ask.
