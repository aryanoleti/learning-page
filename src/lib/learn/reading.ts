import type { Lesson, Step } from "./types";

/* Reading estimates.

   These are computed from the actual prose rather than typed in by hand, so
   they cannot drift when a lesson is edited — which is exactly what happened
   to the hand-written `minutes` field on every lesson.

   200 words per minute is the usual figure for careful reading of unfamiliar
   material (casual reading is faster, but nobody skims a definition of ROE
   and retains it). Worked examples are counted at half weight: they are short
   but need looking at, and a table of five figures is not five words of
   effort. Checkpoints add a flat 20 seconds each for reading and choosing. */

const WORDS_PER_MINUTE = 200;
const SECONDS_PER_CHECKPOINT = 20;

function countWords(text: string): number {
  return text.trim().split(/\s+/).filter(Boolean).length;
}

export function stepSeconds(step: Step): number {
  let words = countWords(step.heading);
  step.body.forEach((p) => (words += countWords(p)));

  if (step.example) {
    let exampleWords = countWords(step.example.title) + countWords(step.example.note);
    step.example.rows?.forEach((r) => {
      exampleWords += countWords(r.label) + countWords(r.value);
    });
    // figures take longer per word than prose, so they are not discounted as
    // heavily as the raw count would suggest
    words += exampleWords * 1.5;
  }

  let seconds = (words / WORDS_PER_MINUTE) * 60;
  if (step.checkpoint) seconds += SECONDS_PER_CHECKPOINT;
  return Math.round(seconds);
}

export function lessonSeconds(lesson: Lesson): number {
  const steps = lesson.steps.reduce((sum, s) => sum + stepSeconds(s), 0);
  const recap = (lesson.recap.reduce((n, r) => n + countWords(r), 0) / WORDS_PER_MINUTE) * 60;
  const goal = (countWords(lesson.goal) / WORDS_PER_MINUTE) * 60;
  return Math.round(steps + recap + goal);
}

/** "40 sec", "2 min", "1 hr 12 min" — short enough for a label. */
export function formatDuration(seconds: number): string {
  if (seconds < 60) return `${Math.max(10, Math.round(seconds / 10) * 10)} sec`;
  const minutes = Math.round(seconds / 60);
  if (minutes < 60) return `${minutes} min`;
  const hours = Math.floor(minutes / 60);
  const rest = minutes % 60;
  return rest === 0 ? `${hours} hr` : `${hours} hr ${rest} min`;
}

export function lessonReadingTime(lesson: Lesson): string {
  return formatDuration(lessonSeconds(lesson));
}

export function stepReadingTime(step: Step): string {
  return formatDuration(stepSeconds(step));
}

export function totalReadingTime(lessons: Lesson[]): string {
  return formatDuration(lessons.reduce((sum, l) => sum + lessonSeconds(l), 0));
}

export function levelReadingTime(lessons: Lesson[]): string {
  return totalReadingTime(lessons);
}
