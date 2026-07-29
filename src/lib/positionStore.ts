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

function parsePositions(raw: string): Record<string, number> {
  try {
    return JSON.parse(raw) as Record<string, number>;
  } catch {
    return {};
  }
}

/**
 * `id` is a tracker id (grade+section+subject), not a bare subject id —
 * every Grade+Section+Subject combination tracks its own position.
 */
export function getPositionIndex(id: string, raw: string, fallback: number): number {
  const parsed = parsePositions(raw);
  return parsed[id] ?? fallback;
}

export function savePositionIndex(id: string, index: number) {
  const parsed = parsePositions(getPositionsSnapshot());
  parsed[id] = index;
  window.localStorage.setItem(STORAGE_KEY, JSON.stringify(parsed));
  notify();
}
