import type { SubjectId } from "./i18n/dictionary";

interface LessonEntry {
  number: number;
  title: { fil: string; en: string };
}

interface SubjectLessons {
  quarter: { fil: string; en: string };
  lessons: LessonEntry[];
  defaultIndex: number;
  defaultProgress: { done: number; total: number };
}

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
    quarter: { fil: "Ikatlong Markahan · MATATAG", en: "3rd Quarter · MATATAG" },
    lessons: [
      { number: 3, title: { fil: "Mga Numero", en: "Numbers" } },
      { number: 4, title: { fil: "Pagpaparami", en: "Multiplication" } },
      { number: 5, title: { fil: "Fractions", en: "Fractions" } },
      { number: 6, title: { fil: "Decimals", en: "Decimals" } },
      { number: 7, title: { fil: "Pagsukat", en: "Measurement" } },
    ],
    defaultIndex: 2,
    defaultProgress: { done: 4, total: 5 },
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
