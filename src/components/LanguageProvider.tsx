"use client";

import React, { createContext, useContext, useState, useEffect } from "react";
import sr from "@/locales/sr.json";
import da from "@/locales/da.json";

type Locale = "sr" | "da";
type Dictionary = typeof sr;

interface LanguageContextType {
  locale: Locale;
  setLocale: (locale: Locale) => void;
  t: Dictionary;
}

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

export function LanguageProvider({ children }: { children: React.ReactNode }) {
  const [locale, setLocale] = useState<Locale>("sr");

  useEffect(() => {
    const saved = localStorage.getItem("sergio-vision-locale") as Locale;
    if (saved === "sr" || saved === "da") {
      setLocale(saved);
      document.documentElement.lang = saved;
    }
  }, []);

  const handleSetLocale = (newLocale: Locale) => {
    setLocale(newLocale);
    localStorage.setItem("sergio-vision-locale", newLocale);
    document.documentElement.lang = newLocale;
  };

  const t = locale === "sr" ? sr : (da as unknown as Dictionary);

  return (
    <LanguageContext.Provider value={{ locale, setLocale: handleSetLocale, t }}>
      {children}
    </LanguageContext.Provider>
  );
}

export function useLanguage() {
  const context = useContext(LanguageContext);
  if (!context) {
    throw new Error("useLanguage must be used within a LanguageProvider");
  }
  return context;
}
