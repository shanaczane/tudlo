import type { SubjectId } from "./i18n/dictionary";

const STORAGE_KEY = "tudlo-positions";
const listeners = new Set<() => void>();

function notify() {
  listeners.forEach((listener) => listener());
}

export function subscribePositions(listener: () => void) {
  listeners.add(listener);
  return () => listeners.delete(listener);
}

export function getPositionsSnapshot(): string {
  if (typeof window === "undefined") return "{}";
  return window.localStorage.getItem(STORAGE_KEY) ?? "{}";
}

export function getServerPositionsSnapshot(): string {
  return "{}";
}

function parsePositions(raw: string): Partial<Record<SubjectId, number>> {
  try {
    return JSON.parse(raw) as Partial<Record<SubjectId, number>>;
  } catch {
    return {};
  }
}

export function getPositionIndex(
  subjectId: SubjectId,
  raw: string,
  fallback: number,
): number {
  const parsed = parsePositions(raw);
  return parsed[subjectId] ?? fallback;
}

export function savePositionIndex(subjectId: SubjectId, index: number) {
  const parsed = parsePositions(getPositionsSnapshot());
  parsed[subjectId] = index;
  window.localStorage.setItem(STORAGE_KEY, JSON.stringify(parsed));
  notify();
}
