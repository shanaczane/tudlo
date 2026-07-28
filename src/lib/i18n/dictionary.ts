export type Locale = "fil" | "en";

export type ReasonKey = "bagyo" | "baha" | "init" | "iba";
export type SubjectId = "filipino" | "math" | "science" | "ap";

export interface Dictionary {
  brand: string;
  synced: string;
  settingsLabel: string;
  todayHeading: string;
  dayProgress: (day: number) => string;
  autoTrackNote: string;
  lessonWord: string;
  ofWord: string;
  unitDaysSuffix: string;
  subjects: Record<SubjectId, { name: string; lessonTitle: string }>;
  markSuspension: string;
  reasonLabel: string;
  dateLabel: string;
  reasons: Record<ReasonKey, string>;
  confirmSuspend: string;
  cancel: string;
  suspendedBannerPrefix: string;
  suspendedBannerFrom: string;
  preservedNote: string;
  pausedBadge: string;
  resumeButton: string;
  resumeToast: string;
  catchUpLink: string;
  catchUpToast: string;
  settingsPage: {
    title: string;
    backLabel: string;
    gradeSubjectsLabel: string;
    languageLabel: string;
    helpLabel: string;
    syncSectionLabel: string;
    lastSyncLabel: string;
    lastSyncedAt: string;
    pendingChangesNote: string;
    syncNowButton: string;
    logoutButton: string;
  };
}

export const dictionaries: Record<Locale, Dictionary> = {
  fil: {
    brand: "Tudlo",
    synced: "Naka-sync",
    settingsLabel: "Mga setting",
    todayHeading: "Martes, 14 Enero",
    dayProgress: (day) => `Araw ${day} / 200`,
    autoTrackNote:
      "Awtomatikong sinusubaybayan. Walang kailangang i-tap sa normal na araw.",
    lessonWord: "Aralin",
    ofWord: "sa",
    unitDaysSuffix: "araw ng yunit",
    subjects: {
      filipino: { name: "Filipino", lessonTitle: "Mga Pang-uri" },
      math: { name: "Math", lessonTitle: "Fractions" },
      science: { name: "Science", lessonTitle: "Mga Hayop sa Tubig" },
      ap: { name: "Araling Panlipunan", lessonTitle: "Aming Lalawigan" },
    },
    markSuspension: "I-mark ang Class Suspension",
    reasonLabel: "Dahilan",
    dateLabel: "Petsa",
    reasons: {
      bagyo: "Bagyo",
      baha: "Baha",
      init: "Init/Heat index",
      iba: "Iba pa",
    },
    confirmSuspend: "Kumpirmahin ang suspensyon",
    cancel: "Kanselahin",
    suspendedBannerPrefix: "Suspendido —",
    suspendedBannerFrom: "mula",
    preservedNote: "Naka-preserba ang posisyon ng bawat subject",
    pausedBadge: "Naka-pause",
    resumeButton: "Nag-resume na ang klase",
    resumeToast:
      "Nag-resume na ang klase. Available na ang catch-up plan sa bawat subject.",
    catchUpLink: "Tingnan ang catch-up plan",
    catchUpToast: "Demo: catch-up plan coming soon",
    settingsPage: {
      title: "Mga Settings",
      backLabel: "Bumalik",
      gradeSubjectsLabel: "Antas at mga subject",
      languageLabel: "Wika",
      helpLabel: "Tulong at FAQ",
      syncSectionLabel: "Sync at data",
      lastSyncLabel: "Huling sync:",
      lastSyncedAt: "22 Enero, 7:41 AM",
      pendingChangesNote:
        "3 pagbabago ang nasa telepono pa lang. Awtomatikong ipapadala kapag may signal.",
      syncNowButton: "I-sync ngayon",
      logoutButton: "Mag-log out",
    },
  },
  en: {
    brand: "Tudlo",
    synced: "Synced",
    settingsLabel: "Settings",
    todayHeading: "Tuesday, January 14",
    dayProgress: (day) => `Day ${day} / 200`,
    autoTrackNote: "Automatically tracked. Nothing to tap on a normal day.",
    lessonWord: "Lesson",
    ofWord: "of",
    unitDaysSuffix: "days into the unit",
    subjects: {
      filipino: { name: "Filipino", lessonTitle: "Adjectives" },
      math: { name: "Math", lessonTitle: "Fractions" },
      science: { name: "Science", lessonTitle: "Aquatic Animals" },
      ap: { name: "Social Studies", lessonTitle: "Our Province" },
    },
    markSuspension: "Mark Class Suspension",
    reasonLabel: "Reason",
    dateLabel: "Date",
    reasons: {
      bagyo: "Typhoon",
      baha: "Flood",
      init: "Heat index",
      iba: "Other",
    },
    confirmSuspend: "Confirm suspension",
    cancel: "Cancel",
    suspendedBannerPrefix: "Suspended —",
    suspendedBannerFrom: "since",
    preservedNote: "Each subject's position is preserved",
    pausedBadge: "Paused",
    resumeButton: "Class has resumed",
    resumeToast:
      "Class has resumed. Catch-up plans are now available for each subject.",
    catchUpLink: "View catch-up plan",
    catchUpToast: "Demo: catch-up plan coming soon",
    settingsPage: {
      title: "Settings",
      backLabel: "Back",
      gradeSubjectsLabel: "Grade & subjects",
      languageLabel: "Language",
      helpLabel: "Help & FAQ",
      syncSectionLabel: "Sync & data",
      lastSyncLabel: "Last synced:",
      lastSyncedAt: "January 22, 7:41 AM",
      pendingChangesNote:
        "3 changes are still only on your phone. They'll send automatically once you're back online.",
      syncNowButton: "Sync now",
      logoutButton: "Log out",
    },
  },
};
