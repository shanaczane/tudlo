import type { ReactNode } from "react";
import type { SubjectId } from "./i18n/dictionary";

export const SUBJECT_ICON_PATHS: Record<SubjectId, ReactNode> = {
  filipino: <path d="M4 5.5A2.5 2.5 0 0 1 6.5 3H20v16H6.5A2.5 2.5 0 0 0 4 21.5z" />,
  math: (
    <>
      <path d="M4 19V5" />
      <path d="M8 15h8" />
      <path d="M12 11v8" />
      <path d="M8 7h8" />
    </>
  ),
  science: (
    <>
      <circle cx="12" cy="12" r="3" />
      <path d="M12 3v2M12 19v2M3 12h2M19 12h2M6 6l1.5 1.5M16.5 16.5 18 18M18 6l-1.5 1.5M7.5 16.5 6 18" />
    </>
  ),
  ap: (
    <>
      <circle cx="12" cy="12" r="9" />
      <path d="M3 12h18" />
      <path d="M12 3a15 15 0 0 1 0 18a15 15 0 0 1 0-18z" />
    </>
  ),
  english: (
    <>
      <path d="M4 7h16" />
      <path d="M4 12h10" />
      <path d="M4 17h14" />
    </>
  ),
  mapeh: (
    <>
      <path d="M9 18V5l12-2v13" />
      <circle cx="6" cy="18" r="3" />
      <circle cx="18" cy="16" r="3" />
    </>
  ),
};

export function SubjectIcon({
  id,
  size = 20,
  color = "currentColor",
}: {
  id: SubjectId;
  size?: number;
  color?: string;
}) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      stroke={color}
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      {SUBJECT_ICON_PATHS[id]}
    </svg>
  );
}
