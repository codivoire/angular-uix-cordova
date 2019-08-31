import { AbstractControl } from "@angular/forms";

export function isValidDate(dateString: string): boolean {
  // First check for the pattern
  const REGEX_DATE = /^\d{4}\-\d{1,2}\-\d{1,2}$/;

  if (!REGEX_DATE.test(dateString)) {
    return false;
  }

  // Parse the date parts to integers
  const parts = dateString.split("-");
  const day = parseInt(parts[2], 10);
  const month = parseInt(parts[1], 10);
  const year = parseInt(parts[0], 10);

  // Check the ranges of month and year
  if (year < 1000 || year > 3000 || month === 0 || month > 12) {
    return false;
  }

  const monthLength = [31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31];

  // Adjust for leap years
  if (year % 400 === 0 || (year % 100 !== 0 && year % 4 === 0)) {
    monthLength[1] = 29;
  }

  // Check the range of the day
  return day > 0 && day <= monthLength[month - 1];
}

export function composeBirthdate(g: AbstractControl): string {
  let d = g.get("day").value;
  let m = g.get("month").value;
  const y = g.get("year").value;

  d = d <= 9 ? "0" + d : d;
  m = m <= 9 ? "0" + m : m;

  const birthdate = y + "-" + m + "-" + d;

  return birthdate;
}

export function inArray(needle, array: any[]) {
  return array.includes(needle);
}

export function formatTime(time: string) {
  const chrono = time.split(":");
  return Number(chrono[0]) * 60 + Number(chrono[1]);
}

export function toDateJs(date: string) {
  return new Date(Date.parse(date));
}

export function timeToString(s: number): string {
  const h = Math.floor(s / 3600);
  const m = Math.floor(s / 60);
  s -= h * 3600;
  s -= m * 60;

  return (m < 10 ? "0" + m : m) + ":" + (s < 10 ? "0" + s : s);
}

export function timeToNumber(time: string) {
  const chrono = time.split(":");
  return Number(chrono[0]) * 60 + Number(chrono[1]);
}

export function truncateText(str: string, length: number) {
  const dots = str.length > length ? "..." : "";
  return str.substring(0, length) + dots;
}

export function fixDate(date: string): string {
  return date.replace(/-/g, "/");
}

export function capitalize(text: string) {
  return text.charAt(0).toUpperCase() + text.slice(1);
}

export function findWord(word: string, str: string) {
  return str.split(" ").some(w => {
    return w === word;
  });
}
