import type { SubjectId } from "./i18n/dictionary";

interface LessonEntry {
  number: number;
  title: { fil: string; en: string };
  /** Per-competency quarter label. Only populated for subjects seeded from a real
   * curriculum guide (e.g. math); subjects still on placeholder data fall back to
   * the subject-level `quarter` field below. */
  quarter?: { fil: string; en: string };
  /** Longer "what this topic is about" text, shown in an expandable detail panel.
   * Grounded in the CG's official Content Standard for the group of competencies
   * this lesson belongs to (not invented pedagogical copy). */
  detail?: { fil: string; en: string };
}

interface SubjectLessons {
  quarter: { fil: string; en: string };
  lessons: LessonEntry[];
  defaultIndex: number;
  defaultProgress: { done: number; total: number };
}

// Grade 1 Mathematics, seeded from DepEd's official MATATAG Mathematics
// Curriculum Guide (Grades 1-10, August 2023). Each entry is one Learning
// Competency, numbered 1-47 continuously across the school year (the CG
// itself numbers competencies 1-N within each quarter, restarting every
// quarter — this file flattens that into one running sequence so progress
// tracking has a single denominator).
//
// The CG defines no official competency code and no per-competency day
// estimate, so `number` here is an internally assigned sequence index, not
// a DepEd code. English titles are the competency text as printed in the
// CG; Filipino titles are this project's own translation, not an official
// DepEd Filipino text.
const GRADE1_MATH_QUARTER = {
  q1: { fil: "Unang Markahan · MATATAG", en: "1st Quarter · MATATAG" },
  q2: { fil: "Ikalawang Markahan · MATATAG", en: "2nd Quarter · MATATAG" },
  q3: { fil: "Ikatlong Markahan · MATATAG", en: "3rd Quarter · MATATAG" },
  q4: { fil: "Ikaapat na Markahan · MATATAG", en: "4th Quarter · MATATAG" },
};

// One entry per official Content Standard group in the CG. Competencies that
// share a content standard (e.g. Q1's 10 Number & Algebra competencies all
// fall under "whole numbers to 100 / ordinals to 10th / addition to 20")
// share the same detail text here.
const GRADE1_MATH_DETAIL = {
  q1MG: {
    fil: "Pamantayan sa Nilalaman (Measurement and Geometry): mga simpleng 2-dimensional na hugis at ang kanilang mga katangian. Saklaw nito ang pagkilala, paghahambing, at pagbuo/paghihiwalay ng tatsulok, parisukat, at parihaba.",
    en: "Content Standard (Measurement and Geometry): simple 2-dimensional shapes and their features. Covers identifying, comparing, and composing/decomposing triangles, squares, and rectangles.",
  },
  q1NA: {
    fil: "Pamantayan sa Nilalaman (Number and Algebra): mga buong numero hanggang 100, panunuran hanggang 10th, at pagdaragdag na ang kabuuan ay hanggang 20.",
    en: "Content Standard (Number and Algebra): whole numbers up to 100, ordinal numbers up to 10th, and addition of numbers with sums up to 20.",
  },
  q2MG: {
    fil: "Pamantayan sa Nilalaman (Measurement and Geometry): pagsukat ng haba at layo gamit ang di-pamantayang sukatan (hal. dangkal, clip), bago ipakilala ang mga pamantayang yunit sa mas mataas na baitang.",
    en: "Content Standard (Measurement and Geometry): measurement of length and distance using non-standard units, ahead of standard units introduced in later grades.",
  },
  q2NA: {
    fil: "Pamantayan sa Nilalaman (Number and Algebra): place value sa anumang 2-digit na numero, at pagdaragdag ng mga numero na ang kabuuan ay hanggang 100.",
    en: "Content Standard (Number and Algebra): place value in any 2-digit number, and addition of numbers with sums up to 100.",
  },
  q3DP: {
    fil: "Pamantayan sa Nilalaman (Data and Probability): pictograph na walang scale para sa representasyon ng datos — pangangalap, pagpapakita, at pagbibigay-kahulugan ng simpleng datos.",
    en: "Content Standard (Data and Probability): a pictograph without a scale for the representation of data — collecting, presenting, and interpreting simple data.",
  },
  q3NA: {
    fil: "Pamantayan sa Nilalaman (Number and Algebra): pagbabawas ng mga numero na parehong wala pang 100, at paulit-ulit na padron.",
    en: "Content Standard (Number and Algebra): subtraction of numbers where both numbers are less than 100, and repeating patterns.",
  },
  q4NA: {
    fil: "Pamantayan sa Nilalaman (Number and Algebra): mga fraction na ½ at ¼; ang mga denominasyon at halaga ng barya at papel na pera hanggang ₱100; at pagdaragdag/pagbabawas ng pera hanggang ₱100.",
    en: "Content Standard (Number and Algebra): fractions ½ and ¼; the denominations and values of Philippine coins and bills up to ₱100; and addition/subtraction of money where amounts are up to ₱100.",
  },
  q4MG: {
    fil: "Pamantayan sa Nilalaman (Measurement and Geometry): paggalaw ng bagay sa kalahati o kaparaang pag-ikot (clockwise/counter-clockwise); at oras na sinusukat sa oras, kalahating-oras, kapat na oras, araw, linggo, buwan, at taon.",
    en: "Content Standard (Measurement and Geometry): movement of objects in a half turn or quarter turn (clockwise/counter-clockwise); and time measured in hours, half-hours, quarter hours, days, weeks, months, and years.",
  },
} as const;

const GRADE1_MATH_LESSONS: LessonEntry[] = [
  // Quarter 1 — Measurement & Geometry (2D shapes), Number & Algebra (counting, ordinals, addition to 20)
  { number: 1, quarter: GRADE1_MATH_QUARTER.q1, detail: GRADE1_MATH_DETAIL.q1MG, title: { fil: "Tukuyin ang mga simpleng hugis (tatsulok, parihaba, parisukat)", en: "Identify simple 2D shapes (triangle, rectangle, square)" } },
  { number: 2, quarter: GRADE1_MATH_QUARTER.q1, detail: GRADE1_MATH_DETAIL.q1MG, title: { fil: "Ihambing ang mga hugis ayon sa gilid at sulok", en: "Compare shapes by sides and corners" } },
  { number: 3, quarter: GRADE1_MATH_QUARTER.q1, detail: GRADE1_MATH_DETAIL.q1MG, title: { fil: "Bumuo at maghiwa-hiwalay ng tatsulok, parisukat, at parihaba", en: "Compose and decompose triangles, squares, rectangles" } },
  { number: 4, quarter: GRADE1_MATH_QUARTER.q1, detail: GRADE1_MATH_DETAIL.q1NA, title: { fil: "Magbilang hanggang 100", en: "Count up to 100" } },
  { number: 5, quarter: GRADE1_MATH_QUARTER.q1, detail: GRADE1_MATH_DETAIL.q1NA, title: { fil: "Bumasa at sumulat ng mga numero hanggang 100", en: "Read and write numerals up to 100" } },
  { number: 6, quarter: GRADE1_MATH_QUARTER.q1, detail: GRADE1_MATH_DETAIL.q1NA, title: { fil: "Katawanin ang mga numero hanggang 100 gamit ang mga modelo", en: "Represent numbers up to 100 using models" } },
  { number: 7, quarter: GRADE1_MATH_QUARTER.q1, detail: GRADE1_MATH_DETAIL.q1NA, title: { fil: "Ihambing ang dalawang numero hanggang 20", en: "Compare two numbers up to 20" } },
  { number: 8, quarter: GRADE1_MATH_QUARTER.q1, detail: GRADE1_MATH_DETAIL.q1NA, title: { fil: "Ayusin ang mga numero hanggang 20", en: "Order numbers up to 20" } },
  { number: 9, quarter: GRADE1_MATH_QUARTER.q1, detail: GRADE1_MATH_DETAIL.q1NA, title: { fil: "Gamitin ang panunuran (1st hanggang 10th)", en: "Use ordinal numbers (1st–10th)" } },
  { number: 10, quarter: GRADE1_MATH_QUARTER.q1, detail: GRADE1_MATH_DETAIL.q1NA, title: { fil: "Bumuo at maghiwalay ng mga numero hanggang 10", en: "Compose and decompose numbers up to 10" } },
  { number: 11, quarter: GRADE1_MATH_QUARTER.q1, detail: GRADE1_MATH_DETAIL.q1NA, title: { fil: "Ilarawan ang pagdaragdag na ang kabuuan ay hanggang 20", en: "Illustrate addition with sums up to 20" } },
  { number: 12, quarter: GRADE1_MATH_QUARTER.q1, detail: GRADE1_MATH_DETAIL.q1NA, title: { fil: "Ilapat ang mga katangian ng pagdaragdag", en: "Apply properties of addition" } },
  { number: 13, quarter: GRADE1_MATH_QUARTER.q1, detail: GRADE1_MATH_DETAIL.q1NA, title: { fil: "Lutasin ang mga suliranin sa pagdaragdag hanggang 20", en: "Solve addition problems up to 20" } },
  // Quarter 2 — Measurement (non-standard length), Number & Algebra (place value, addition to 100)
  { number: 14, quarter: GRADE1_MATH_QUARTER.q2, detail: GRADE1_MATH_DETAIL.q2MG, title: { fil: "Sukatin ang haba gamit ang di-pamantayang sukatan", en: "Measure length using non-standard units" } },
  { number: 15, quarter: GRADE1_MATH_QUARTER.q2, detail: GRADE1_MATH_DETAIL.q2MG, title: { fil: "Ihambing ang haba gamit ang di-pamantayang sukatan", en: "Compare lengths using non-standard units" } },
  { number: 16, quarter: GRADE1_MATH_QUARTER.q2, detail: GRADE1_MATH_DETAIL.q2MG, title: { fil: "Lutasin ang mga suliranin tungkol sa haba at layo", en: "Solve problems involving length and distance" } },
  { number: 17, quarter: GRADE1_MATH_QUARTER.q2, detail: GRADE1_MATH_DETAIL.q2NA, title: { fil: "Ayusin ang mga numero hanggang 100", en: "Order numbers up to 100" } },
  { number: 18, quarter: GRADE1_MATH_QUARTER.q2, detail: GRADE1_MATH_DETAIL.q2NA, title: { fil: "Magbilang ng pa-2, pa-5, at pa-10", en: "Count by 2s, 5s, and 10s" } },
  { number: 19, quarter: GRADE1_MATH_QUARTER.q2, detail: GRADE1_MATH_DETAIL.q2NA, title: { fil: "Tukuyin ang place value sa 2-digit na numero", en: "Determine place value in 2-digit numbers" } },
  { number: 20, quarter: GRADE1_MATH_QUARTER.q2, detail: GRADE1_MATH_DETAIL.q2NA, title: { fil: "Hatiin ang 2-digit na numero sa sampuan at isahan", en: "Decompose 2-digit numbers into tens and ones" } },
  { number: 21, quarter: GRADE1_MATH_QUARTER.q2, detail: GRADE1_MATH_DETAIL.q2NA, title: { fil: "Magdagdag gamit ang expanded form", en: "Add numbers using expanded form" } },
  { number: 22, quarter: GRADE1_MATH_QUARTER.q2, detail: GRADE1_MATH_DETAIL.q2NA, title: { fil: "Magdagdag ng mga numero hanggang 100 nang walang regrouping", en: "Add numbers up to 100 without regrouping" } },
  { number: 23, quarter: GRADE1_MATH_QUARTER.q2, detail: GRADE1_MATH_DETAIL.q2NA, title: { fil: "Lutasin ang mga suliranin sa pagdaragdag hanggang 100", en: "Solve addition problems up to 100" } },
  // Quarter 3 — Data & Probability (pictographs), Number & Algebra (subtraction, patterns)
  { number: 24, quarter: GRADE1_MATH_QUARTER.q3, detail: GRADE1_MATH_DETAIL.q3DP, title: { fil: "Mangalap ng datos sa pamamagitan ng simpleng panayam", en: "Collect data through a simple interview" } },
  { number: 25, quarter: GRADE1_MATH_QUARTER.q3, detail: GRADE1_MATH_DETAIL.q3DP, title: { fil: "Ipakita ang datos sa pictograph", en: "Present data in a pictograph" } },
  { number: 26, quarter: GRADE1_MATH_QUARTER.q3, detail: GRADE1_MATH_DETAIL.q3DP, title: { fil: "Bigyang-kahulugan ang pictograph", en: "Interpret a pictograph" } },
  { number: 27, quarter: GRADE1_MATH_QUARTER.q3, detail: GRADE1_MATH_DETAIL.q3DP, title: { fil: "Ayusin ang datos ng pictograph sa isang talahanayan", en: "Organize pictograph data into a table" } },
  { number: 28, quarter: GRADE1_MATH_QUARTER.q3, detail: GRADE1_MATH_DETAIL.q3NA, title: { fil: "Ilarawan ang pagbabawas hanggang 20", en: "Illustrate subtraction up to 20" } },
  { number: 29, quarter: GRADE1_MATH_QUARTER.q3, detail: GRADE1_MATH_DETAIL.q3NA, title: { fil: "Hanapin ang nawawalang numero sa pangungusap na pamilang", en: "Find the missing number in number sentences" } },
  { number: 30, quarter: GRADE1_MATH_QUARTER.q3, detail: GRADE1_MATH_DETAIL.q3NA, title: { fil: "Sumulat ng katumbas na expression sa pagdaragdag/pagbabawas", en: "Write equivalent addition/subtraction expressions" } },
  { number: 31, quarter: GRADE1_MATH_QUARTER.q3, detail: GRADE1_MATH_DETAIL.q3NA, title: { fil: "Lutasin ang mga suliranin sa pagbabawas na wala pang 20", en: "Solve subtraction problems under 20" } },
  { number: 32, quarter: GRADE1_MATH_QUARTER.q3, detail: GRADE1_MATH_DETAIL.q3NA, title: { fil: "Magbawas ng mga numerong wala pang 100 nang walang regrouping", en: "Subtract numbers under 100 without regrouping" } },
  { number: 33, quarter: GRADE1_MATH_QUARTER.q3, detail: GRADE1_MATH_DETAIL.q3NA, title: { fil: "Magbawas gamit ang sampuan at isahan", en: "Subtract using tens and ones (expanded form)" } },
  { number: 34, quarter: GRADE1_MATH_QUARTER.q3, detail: GRADE1_MATH_DETAIL.q3NA, title: { fil: "Hanapin ang susunod na termino sa paulit-ulit na padron", en: "Find the next term in a repeating pattern" } },
  { number: 35, quarter: GRADE1_MATH_QUARTER.q3, detail: GRADE1_MATH_DETAIL.q3NA, title: { fil: "Lumikha ng paulit-ulit na padron", en: "Create repeating patterns" } },
  // Quarter 4 — Number & Algebra (fractions, money), Measurement & Geometry (turns, time)
  { number: 36, quarter: GRADE1_MATH_QUARTER.q4, detail: GRADE1_MATH_DETAIL.q4NA, title: { fil: "Ilarawan ang ½ at ¼ bilang bahagi ng kabuuan", en: "Illustrate ½ and ¼ as parts of a whole" } },
  { number: 37, quarter: GRADE1_MATH_QUARTER.q4, detail: GRADE1_MATH_DETAIL.q4NA, title: { fil: "Ihambing ang ½ at ¼ gamit ang modelo", en: "Compare ½ and ¼ using models" } },
  { number: 38, quarter: GRADE1_MATH_QUARTER.q4, detail: GRADE1_MATH_DETAIL.q4NA, title: { fil: "Magbilang ng kalahati at kapat", en: "Count halves and quarters" } },
  { number: 39, quarter: GRADE1_MATH_QUARTER.q4, detail: GRADE1_MATH_DETAIL.q4NA, title: { fil: "Kilalanin ang barya at papel na pera hanggang ₱100", en: "Recognize PHP coins and bills up to ₱100" } },
  { number: 40, quarter: GRADE1_MATH_QUARTER.q4, detail: GRADE1_MATH_DETAIL.q4NA, title: { fil: "Tukuyin ang halaga ng barya at papel na pera", en: "Determine the value of bills and coins" } },
  { number: 41, quarter: GRADE1_MATH_QUARTER.q4, detail: GRADE1_MATH_DETAIL.q4NA, title: { fil: "Ihambing ang mga denominasyon ng barya at papel na pera", en: "Compare denominations of coins and bills" } },
  { number: 42, quarter: GRADE1_MATH_QUARTER.q4, detail: GRADE1_MATH_DETAIL.q4NA, title: { fil: "Lutasin ang mga suliranin sa pera hanggang ₱100", en: "Solve money problems up to ₱100" } },
  { number: 43, quarter: GRADE1_MATH_QUARTER.q4, detail: GRADE1_MATH_DETAIL.q4MG, title: { fil: "Tukuyin ang posisyon pagkatapos ng kalahati o kaparaang ikot", en: "Identify position after a half or quarter turn" } },
  { number: 44, quarter: GRADE1_MATH_QUARTER.q4, detail: GRADE1_MATH_DETAIL.q4MG, title: { fil: "Basahin at isulat ang oras (buo, kalahati, kapat)", en: "Tell time by the hour, half hour, and quarter hour" } },
  { number: 45, quarter: GRADE1_MATH_QUARTER.q4, detail: GRADE1_MATH_DETAIL.q4MG, title: { fil: "Ibigay ang mga araw ng linggo at buwan ng taon nang tama ang pagkakasunod", en: "Name the days of the week and months in order" } },
  { number: 46, quarter: GRADE1_MATH_QUARTER.q4, detail: GRADE1_MATH_DETAIL.q4MG, title: { fil: "Tukuyin ang araw at buwan gamit ang kalendaryo", en: "Determine the day and month using a calendar" } },
  { number: 47, quarter: GRADE1_MATH_QUARTER.q4, detail: GRADE1_MATH_DETAIL.q4MG, title: { fil: "Lutasin ang mga suliranin tungkol sa oras", en: "Solve problems involving time" } },
];

export const SUBJECT_LESSONS: Record<SubjectId, SubjectLessons> = {
  filipino: {
    quarter: { fil: "Ikatlong Markahan · MATATAG", en: "3rd Quarter · MATATAG" },
    lessons: [
      { number: 6, title: { fil: "Mga Pangngalan", en: "Nouns" } },
      { number: 7, title: { fil: "Mga Panghalip", en: "Pronouns" } },
      { number: 8, title: { fil: "Mga Pang-uri", en: "Adjectives" } },
      { number: 9, title: { fil: "Mga Pang-abay", en: "Adverbs" } },
      { number: 10, title: { fil: "Pagsasanay sa Pagsulat", en: "Writing Practice" } },
    ],
    defaultIndex: 2,
    defaultProgress: { done: 3, total: 5 },
  },
  math: {
    quarter: GRADE1_MATH_QUARTER.q1,
    lessons: GRADE1_MATH_LESSONS,
    // Demo starting position: mid-Quarter 3 (competency 6 of 12 in Q3),
    // matching the "already partway through 3rd quarter" narrative used by
    // the other placeholder subjects above.
    defaultIndex: 28,
    defaultProgress: { done: 29, total: 47 },
  },
  science: {
    quarter: { fil: "Ikatlong Markahan · MATATAG", en: "3rd Quarter · MATATAG" },
    lessons: [
      { number: 2, title: { fil: "Mga Halaman", en: "Plants" } },
      { number: 3, title: { fil: "Ekosistema", en: "Ecosystems" } },
      { number: 4, title: { fil: "Mga Hayop sa Tubig", en: "Aquatic Animals" } },
      { number: 5, title: { fil: "Mga Hayop sa Lupa", en: "Land Animals" } },
      { number: 6, title: { fil: "Water Cycle", en: "Water Cycle" } },
    ],
    defaultIndex: 2,
    defaultProgress: { done: 1, total: 4 },
  },
  ap: {
    quarter: { fil: "Ikatlong Markahan · MATATAG", en: "3rd Quarter · MATATAG" },
    lessons: [
      { number: 5, title: { fil: "Ating Bansa", en: "Our Country" } },
      { number: 6, title: { fil: "Mapa ng Pilipinas", en: "Map of the Philippines" } },
      { number: 7, title: { fil: "Aming Lalawigan", en: "Our Province" } },
      { number: 8, title: { fil: "Pamahalaang Lokal", en: "Local Government" } },
      { number: 9, title: { fil: "Kultura ng Rehiyon", en: "Regional Culture" } },
    ],
    defaultIndex: 2,
    defaultProgress: { done: 0, total: 0 },
  },
  english: {
    quarter: { fil: "Ikatlong Markahan · MATATAG", en: "3rd Quarter · MATATAG" },
    lessons: [
      { number: 4, title: { fil: "Pagbabasa ng Teksto", en: "Reading Comprehension" } },
      { number: 5, title: { fil: "Mga Salitang Katumbas", en: "Synonyms & Antonyms" } },
      { number: 6, title: { fil: "Mga Uri ng Pangungusap", en: "Types of Sentences" } },
      { number: 7, title: { fil: "Pagsulat ng Talata", en: "Paragraph Writing" } },
      { number: 8, title: { fil: "Pag-unawa sa Kuwento", en: "Story Understanding" } },
    ],
    defaultIndex: 2,
    defaultProgress: { done: 2, total: 5 },
  },
  mapeh: {
    quarter: { fil: "Ikatlong Markahan · MATATAG", en: "3rd Quarter · MATATAG" },
    lessons: [
      { number: 3, title: { fil: "Ritmo at Melodiya", en: "Rhythm & Melody" } },
      { number: 4, title: { fil: "Mga Kulay at Hugis", en: "Colors & Shapes" } },
      { number: 5, title: { fil: "Mga Galaw ng Katawan", en: "Body Movement" } },
      { number: 6, title: { fil: "Kalinisan at Kalusugan", en: "Cleanliness & Health" } },
      { number: 7, title: { fil: "Kooperatibong Laro", en: "Cooperative Games" } },
    ],
    defaultIndex: 2,
    defaultProgress: { done: 1, total: 5 },
  },
};
