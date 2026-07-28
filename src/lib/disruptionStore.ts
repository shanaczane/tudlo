import type { ReasonKey } from "./i18n/dictionary";

const STORAGE_KEY = "tudlo-last-disruption";
const listeners = new Set<() => void>();

export interface LastDisruption {
  reasonKey: ReasonKey;
  customReason?: string;
  startDate: string;
  endDate: string;
  daysLost: number;
}

function notify() {
  listeners.forEach((listener) => listener());
}

export function subscribeLastDisruption(listener: () => void) {
  listeners.add(listener);
  return () => listeners.delete(listener);
}

export function getLastDisruptionSnapshot(): string | null {
  if (typeof window === "undefined") return null;
  return window.localStorage.getItem(STORAGE_KEY);
}

export function getServerLastDisruptionSnapshot(): string | null {
  return null;
}

export function parseLastDisruption(raw: string | null): LastDisruption | null {
  if (!raw) return null;
  try {
    return JSON.parse(raw) as LastDisruption;
  } catch {
    return null;
  }
}

export function saveLastDisruption(disruption: LastDisruption) {
  window.localStorage.setItem(STORAGE_KEY, JSON.stringify(disruption));
  notify();
}
