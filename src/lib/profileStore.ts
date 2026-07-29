const STORAGE_KEY = "tudlo-profile";
const listeners = new Set<() => void>();

function notify() {
  listeners.forEach((l) => l());
}

export interface Assignment {
  grade: number; // 7–10 (Junior High, MATATAG rollout)
  sections: string[]; // e.g. ["A", "B"]
}

export interface TeacherProfile {
  name: string;
  schoolCode: string;
  assignments: Assignment[];
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
    if (parsed && typeof parsed === "object" && "assignments" in parsed) {
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

/** Total number of grade+section assignments the teacher has configured. */
export function totalSections(profile: TeacherProfile | null): number {
  if (!profile) return 0;
  return profile.assignments.reduce((sum, a) => sum + a.sections.length, 0);
}

export function hasProfile(): boolean {
  const p = getProfile();
  // A profile is "complete" once at least one grade has at least one section.
  return p !== null && totalSections(p) > 0;
}

export function saveProfile(profile: Partial<TeacherProfile>) {
  const existing = getProfile() ?? { name: "", schoolCode: "", assignments: [] };
  const merged = { ...existing, ...profile } as TeacherProfile;
  window.localStorage.setItem(STORAGE_KEY, JSON.stringify(merged));
  notify();
}

export function clearProfile() {
  window.localStorage.removeItem(STORAGE_KEY);
  notify();
}
