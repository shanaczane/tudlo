import type { SubjectId } from "./i18n/dictionary";

const STORAGE_KEY = "tudlo-progress-log";
const listeners = new Set<() => void>();

export interface ProgressLogEntry {
  subjectId: SubjectId;
  status: "completed" | "partially" | "not_reached";
  timestamp: string;
  note?: string;
}

function notify() {
  listeners.forEach((listener) => listener());
}

export function subscribeProgressLog(listener: () => void) {
  listeners.add(listener);
  return () => listeners.delete(listener);
}

export function getProgressLogSnapshot(): string {
  if (typeof window === "undefined") return "[]";
  return window.localStorage.getItem(STORAGE_KEY) ?? "[]";
}

export function getServerProgressLogSnapshot(): string {
  return "[]";
}

export function parseProgressLog(raw: string): ProgressLogEntry[] {
  try {
    return JSON.parse(raw) as ProgressLogEntry[];
  } catch {
    return [];
  }
}

export function addProgressLogEntry(entry: ProgressLogEntry) {
  const parsed = parseProgressLog(getProgressLogSnapshot());
  parsed.push(entry);
  window.localStorage.setItem(STORAGE_KEY, JSON.stringify(parsed));
  notify();
}
