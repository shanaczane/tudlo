import type { SubjectId } from "./i18n/dictionary";

const STORAGE_KEY = "tudlo-profile";
const listeners = new Set<() => void>();

function notify() {
  listeners.forEach((l) => l());
}

export interface TeacherProfile {
  name: string;
  schoolCode: string;
  grade: number; // 1–6
  subjects: SubjectId[];
}

// ── Subscription (useSyncExternalStore-compatible) ─────────────────────────

export function subscribeProfile(listener: () => void) {
  listeners.add(listener);
  return () => listeners.delete(listener);
}

// ── Snapshots ──────────────────────────────────────────────────────────────

export function getProfileSnapshot(): string {
  if (typeof window === "undefined") return "null";
  return window.localStorage.getItem(STORAGE_KEY) ?? "null";
}

export function getServerProfileSnapshot(): string {
  return "null";
}

// ── Helpers ────────────────────────────────────────────────────────────────

function parseProfile(raw: string): TeacherProfile | null {
  try {
    const parsed = JSON.parse(raw);
    if (parsed && typeof parsed === "object" && "grade" in parsed) {
      return parsed as TeacherProfile;
    }
    return null;
  } catch {
    return null;
  }
}

export function getProfile(): TeacherProfile | null {
  return parseProfile(getProfileSnapshot());
}

export function hasProfile(): boolean {
  const p = getProfile();
  // A profile is "complete" when grade + at least one subject is set
  return p !== null && p.grade > 0 && p.subjects.length > 0;
}

export function saveProfile(profile: Partial<TeacherProfile>) {
  const existing = getProfile() ?? {};
  const merged = { ...existing, ...profile } as TeacherProfile;
  window.localStorage.setItem(STORAGE_KEY, JSON.stringify(merged));
  notify();
}

export function clearProfile() {
  window.localStorage.removeItem(STORAGE_KEY);
  notify();
}
