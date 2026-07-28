export type Locale = "fil" | "en";

export type ReasonKey = "bagyo" | "baha" | "init" | "iba";
export type SubjectId =
  | "filipino"
  | "math"
  | "science"
  | "ap"
  | "english"
  | "mapeh";

export const ALL_SUBJECTS: SubjectId[] = [
  "filipino",
  "math",
  "science",
  "ap",
  "english",
  "mapeh",
];

export interface Dictionary {
  brand: string;
  synced: string;
  settingsLabel: string;
  backLabel: string;
  todayHeading: string;
  dayProgress: (day: number) => string;
  autoTrackNote: string;
  lessonWord: string;
  ofWord: string;
  unitDaysSuffix: string;
  subjects: Record<SubjectId, { name: string; description: string }>;
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
  helpTitle: string;
  currentPositionLabel: string;
  savePositionButton: string;
  positionConfirmNote: string;
  positionSavedNote: string;
  principalSubtitle: string;
  divisionSubtitle: string;
  justResumedNote: string;
  catchupPage: {
    daysLostLabel: (days: number) => string;
    targetLabel: (date: string) => string;
    scheduleSectionLabel: string;
    statusAdjusted: string;
    statusNormal: string;
    fillerLessonTitle: string;
  };
  settingsPage: {
    title: string;
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
  onboarding: {
    stepGrade: string;
    stepSubjects: string;
    stepLessons: string;
    stepOf: (current: number, total: number) => string;
    gradeHeading: string;
    gradeSubheading: string;
    gradeOptions: string[];
    subjectsHeading: string;
    subjectsSubheading: string;
    lessonsHeading: string;
    lessonsSubheading: string;
    continueButton: string;
    backButton: string;
    finishButton: string;
    selectAtLeastOne: string;
    currentLessonPrompt: string;
  };
}

export const dictionaries: Record<Locale, Dictionary> = {
  fil: {
    brand: "Tudlo",
    synced: "Naka-sync",
    settingsLabel: "Mga setting",
    backLabel: "Bumalik",
    todayHeading: "Martes, 14 Enero",
    dayProgress: (day) => `Araw ${day} / 200`,
    autoTrackNote:
      "Awtomatikong sinusubaybayan. Walang kailangang i-tap sa normal na araw.",
    lessonWord: "Aralin",
    ofWord: "sa",
    unitDaysSuffix: "araw ng yunit",
    subjects: {
      filipino: { name: "Filipino", description: "Wika at Panitikan" },
      math: { name: "Math", description: "Matematika" },
      science: { name: "Science", description: "Agham" },
      ap: { name: "Araling Panlipunan", description: "AP" },
      english: { name: "English", description: "Language Arts" },
      mapeh: { name: "MAPEH", description: "Music, Arts, PE, Health" },
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
    helpTitle: "Tulong",
    currentPositionLabel: "Kasalukuyang posisyon",
    savePositionButton: "I-save ang bagong posisyon",
    positionConfirmNote:
      "Kakailanganin ng kumpirmasyon bago i-save — para hindi masira ang tala sa aksidenteng tap.",
    positionSavedNote: "Na-save ang bagong posisyon ✓",
    principalSubtitle: "Bacacay Central ES — Punong-guro",
    divisionSubtitle: "Division Monitoring — Region V (Bicol)",
    justResumedNote:
      "Bumalik na sa normal — mama-mark muli kung may bagong suspensyon.",
    catchupPage: {
      daysLostLabel: (days) => `${days} araw na nawala dahil sa disruption`,
      targetLabel: (date) => `Bagong target na petsa ng pagtapos: ${date}`,
      scheduleSectionLabel: "Pagbabago sa iskedyul",
      statusAdjusted: "Naka-adjust",
      statusNormal: "Normal",
      fillerLessonTitle: "Karagdagang pagsasanay",
    },
    settingsPage: {
      title: "Mga Settings",
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
    onboarding: {
      stepGrade: "Antas",
      stepSubjects: "Mga Subject",
      stepLessons: "Posisyon",
      stepOf: (current, total) => `Hakbang ${current} sa ${total}`,
      gradeHeading: "Anong antas ang iyong ituturo?",
      gradeSubheading: "Pipiliin mo rin ito sa settings kung magbabago.",
      gradeOptions: [
        "Grade 1",
        "Grade 2",
        "Grade 3",
        "Grade 4",
        "Grade 5",
        "Grade 6",
      ],
      subjectsHeading: "Anong mga subject ang iyong tinuturuan?",
      subjectsSubheading: "Pumili ng isa o marami.",
      lessonsHeading: "Saan ka natigil sa bawat subject?",
      lessonsSubheading:
        "I-tap ang aralin kung saan ka natigil bago ang bakasyon o disruption.",
      continueButton: "Magpatuloy",
      backButton: "Bumalik",
      finishButton: "Magsimula na",
      selectAtLeastOne: "Pumili ng kahit isang subject.",
      currentLessonPrompt: "Kasalukuyang aralin",
    },
  },
  en: {
    brand: "Tudlo",
    synced: "Synced",
    settingsLabel: "Settings",
    backLabel: "Back",
    todayHeading: "Tuesday, January 14",
    dayProgress: (day) => `Day ${day} / 200`,
    autoTrackNote: "Automatically tracked. Nothing to tap on a normal day.",
    lessonWord: "Lesson",
    ofWord: "of",
    unitDaysSuffix: "days into the unit",
    subjects: {
      filipino: { name: "Filipino", description: "Language & Literature" },
      math: { name: "Math", description: "Mathematics" },
      science: { name: "Science", description: "Science" },
      ap: { name: "Social Studies", description: "Araling Panlipunan" },
      english: { name: "English", description: "Language Arts" },
      mapeh: { name: "MAPEH", description: "Music, Arts, PE, Health" },
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
    helpTitle: "Help",
    currentPositionLabel: "Current position",
    savePositionButton: "Save new position",
    positionConfirmNote:
      "Confirmation is required before saving — so an accidental tap can't overwrite the record.",
    positionSavedNote: "New position saved ✓",
    principalSubtitle: "Bacacay Central ES — Principal",
    divisionSubtitle: "Division Monitoring — Region V (Bicol)",
    justResumedNote:
      "Back to normal — this will be markable again if a new suspension comes up.",
    catchupPage: {
      daysLostLabel: (days) => `${days} days lost to the disruption`,
      targetLabel: (date) => `New target completion date: ${date}`,
      scheduleSectionLabel: "Schedule changes",
      statusAdjusted: "Adjusted",
      statusNormal: "Normal",
      fillerLessonTitle: "Additional practice",
    },
    settingsPage: {
      title: "Settings",
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
    onboarding: {
      stepGrade: "Grade",
      stepSubjects: "Subjects",
      stepLessons: "Position",
      stepOf: (current, total) => `Step ${current} of ${total}`,
      gradeHeading: "What grade level do you teach?",
      gradeSubheading: "You can change this later in settings.",
      gradeOptions: [
        "Grade 1",
        "Grade 2",
        "Grade 3",
        "Grade 4",
        "Grade 5",
        "Grade 6",
      ],
      subjectsHeading: "Which subjects do you teach?",
      subjectsSubheading: "Select one or more.",
      lessonsHeading: "Where did you leave off?",
      lessonsSubheading:
        "Tap the lesson you were on before the break or disruption.",
      continueButton: "Continue",
      backButton: "Back",
      finishButton: "Get Started",
      selectAtLeastOne: "Please select at least one subject.",
      currentLessonPrompt: "Current lesson",
    },
  },
};
