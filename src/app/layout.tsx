import type { Metadata } from "next";
import { Outfit, Playfair_Display, JetBrains_Mono, Space_Grotesk } from "next/font/google";
import "./globals.css";
import { LanguageProvider } from "@/components/LanguageProvider";

const outfit = Outfit({
  variable: "--font-outfit",
  subsets: ["latin"],
});

const playfair = Playfair_Display({
  variable: "--font-playfair",
  subsets: ["latin"],
  style: ["normal", "italic"],
});

const jetbrains = JetBrains_Mono({
  variable: "--font-jetbrains",
  subsets: ["latin"],
});

const space = Space_Grotesk({
  variable: "--font-space",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Sergios Skadecenter — Tillid · Kvalitet · Premium",
  description: "Sajt i vizija za Sergios Skadecenter ApS, Ølstykke. Glasurit premium boja, skadereparation, DTC trkački auti. Hjemmeside og vision for Sergios Skadecenter ApS, Ølstykke.",
  openGraph: {
    title: "Sergios Skadecenter — Tillid · Kvalitet · Premium",
    description: "Sajt i vizija za Sergios Skadecenter ApS, Ølstykke. Glasurit premium boja, skadereparation, DTC trkački auti.",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="sr"
      className={`${outfit.variable} ${playfair.variable} ${jetbrains.variable} ${space.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col bg-obsidian text-offwhite overflow-x-hidden font-sans">
        <svg
          className="pointer-events-none fixed inset-0 z-50 h-full w-full opacity-[0.05]"
          xmlns="http://www.w3.org/2000/svg"
        >
          <filter id="noiseFilter">
            <feTurbulence
              type="fractalNoise"
              baseFrequency="0.65"
              numOctaves="3"
              stitchTiles="stitch"
            />
          </filter>
          <rect width="100%" height="100%" filter="url(#noiseFilter)" />
        </svg>

        <LanguageProvider>
          {children}
        </LanguageProvider>
      </body>
    </html>
  );
}
