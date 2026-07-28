import type { Locale } from "./dictionary";

const STORAGE_KEY = "tudlo-locale";
const listeners = new Set<() => void>();

function isValidLocale(value: string | null): value is Locale {
  return value === "fil" || value === "en";
}

export function getLocaleSnapshot(): Locale {
  if (typeof window === "undefined") return "fil";
  const stored = window.localStorage.getItem(STORAGE_KEY);
  return isValidLocale(stored) ? stored : "fil";
}

export function getServerLocaleSnapshot(): Locale {
  return "fil";
}

export function setStoredLocale(locale: Locale) {
  window.localStorage.setItem(STORAGE_KEY, locale);
  listeners.forEach((listener) => listener());
}

export function subscribeLocale(listener: () => void) {
  listeners.add(listener);
  window.addEventListener("storage", listener);
  return () => {
    listeners.delete(listener);
    window.removeEventListener("storage", listener);
  };
}
