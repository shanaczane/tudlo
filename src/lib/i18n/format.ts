import type { Locale } from "./dictionary";

const FIL_MONTHS = [
  "Enero", "Pebrero", "Marso", "Abril", "Mayo", "Hunyo",
  "Hulyo", "Agosto", "Setyembre", "Oktubre", "Nobyembre", "Disyembre",
];

const EN_MONTHS = [
  "January", "February", "March", "April", "May", "June",
  "July", "August", "September", "October", "November", "December",
];

export function formatDate(date: Date, locale: Locale): string {
  const day = date.getDate();
  const year = date.getFullYear();
  if (locale === "fil") {
    return `${day} ${FIL_MONTHS[date.getMonth()]} ${year}`;
  }
  return `${EN_MONTHS[date.getMonth()]} ${day}, ${year}`;
}
