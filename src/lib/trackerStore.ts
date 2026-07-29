import type { SubjectId } from "./i18n/dictionary";

const STORAGE_KEY = "tudlo-trackers";
const listeners = new Set<() => void>();

export interface Tracker {
  id: string;
  grade: number;
  section: string;
  subjectId: SubjectId;
}

function notify() {
  listeners.forEach((listener) => listener());
}

export function subscribeTrackers(listener: () => void) {
  listeners.add(listener);
  return () => listeners.delete(listener);
}

export function getTrackersSnapshot(): string {
  if (typeof window === "undefined") return "[]";
  return window.localStorage.getItem(STORAGE_KEY) ?? "[]";
}

export function getServerTrackersSnapshot(): string {
  return "[]";
}

function parseTrackers(raw: string): Tracker[] {
  try {
    const parsed = JSON.parse(raw);
    return Array.isArray(parsed) ? (parsed as Tracker[]) : [];
  } catch {
    return [];
  }
}

export function getTrackersFromRaw(raw: string): Tracker[] {
  return parseTrackers(raw);
}

export function getTrackers(): Tracker[] {
  return parseTrackers(getTrackersSnapshot());
}

export function makeTrackerId(
  grade: number,
  section: string,
  subjectId: SubjectId,
): string {
  return `g${grade}-${section.trim().toLowerCase()}-${subjectId}`;
}

export function trackerExists(
  grade: number,
  section: string,
  subjectId: SubjectId,
): boolean {
  const id = makeTrackerId(grade, section, subjectId);
  return getTrackers().some((tracker) => tracker.id === id);
}

export function addTracker(
  grade: number,
  section: string,
  subjectId: SubjectId,
): Tracker {
  const id = makeTrackerId(grade, section, subjectId);
  const trackers = getTrackers();
  const existing = trackers.find((tracker) => tracker.id === id);
  if (existing) return existing;

  const tracker: Tracker = { id, grade, section, subjectId };
  trackers.push(tracker);
  window.localStorage.setItem(STORAGE_KEY, JSON.stringify(trackers));
  notify();
  return tracker;
}

export function getTracker(id: string): Tracker | null {
  return getTrackers().find((tracker) => tracker.id === id) ?? null;
}
