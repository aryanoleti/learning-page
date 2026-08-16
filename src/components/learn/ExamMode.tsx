"use client";

import Link from "next/link";
import { useEffect, useMemo, useRef, useState } from "react";
import type { Lesson } from "@/lib/learn/types";
import { unitCheck, lessonNeighbours, lessonQuestionIds } from "@/lib/learn/curriculum";
import { shuffleCheckpoint } from "@/lib/learn/shuffle";
import { useProgress } from "@/lib/learn/progress";
import { ROUTES } from "@/lib/learn/links";

/* The unit check, on its own full-screen page.

   It is opened in a separate tab from the lesson. That is deliberate: the
   answers are all derivable from the material, so going back to look
   something up mid-exam is a different act from knowing it — and it costs a
   try. Leaving this tab while questions are unsubmitted is recorded as a
   walk-away, counted alongside submissions in `triesUsed`.

   The rule is stated plainly before the questions appear. It is a cost, not
   a trap. */
export function ExamMode({ lesson }: { lesson: Lesson }) {
  const { progress, hydrated, recordGateAttempt, recordWalkAway, restartLesson } = useProgress();
  const questions = useMemo(() => unitCheck(lesson), [lesson]);
  const { next } = useMemo(() => lessonNeighbours(lesson.slug), [lesson.slug]);

  const [started, setStarted] = useState(false);
  const [picks, setPicks] = useState<Record<string, number>>({});
  const [lastResult, setLastResult] = useState<null | "pass" | "fail">(null);
  const settled = useRef(false); // stop counting once the exam is over

  const gate = progress.gates[lesson.slug] ?? {
    attempts: 0,
    passed: false,
    walkAways: 0,
    triesUsed: 0,
  };
  const exhausted = gate.attempts >= 2 && !gate.passed;
  const locked = gate.passed || exhausted;

  const shuffled = useMemo(
    () => questions.map((q) => shuffleCheckpoint(q, gate.attempts)),
    [questions, gate.attempts]
  );
  const allAnswered = shuffled.every((q) => picks[q.id] !== undefined);

  /* Walk-away detection. Only armed once the questions are on screen and only
     while the exam is still live, so reading the instructions or looking at a
     finished result costs nothing. */
  useEffect(() => {
    if (!started || locked) return;
    const onHidden = () => {
      if (document.hidden && !settled.current) recordWalkAway(lesson.slug);
    };
    document.addEventListener("visibilitychange", onHidden);
    return () => document.removeEventListener("visibilitychange", onHidden);
  }, [started, locked, lesson.slug, recordWalkAway]);

  const submit = () => {
    if (!allAnswered || locked) return;
    const correct = shuffled.every((q) => picks[q.id] === q.answer);
    settled.current = true;
    setLastResult(correct ? "pass" : "fail");
    setPicks({});
    recordGateAttempt(lesson.slug, correct);
    // re-arm for a second attempt unless that was the last one
    if (!correct && gate.attempts + 1 < 2) settled.current = false;
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  if (!hydrated) {
    return <div className="grid min-h-dvh place-items-center text-sm text-(--color-fg-muted)">Loading…</div>;
  }

  /* ---------- passed ---------- */
  if (gate.passed) {
    return (
      <Shell title="Unit check passed">
        <p className="rounded-lg border border-(--color-up) bg-(--color-up-soft) p-4 text-sm text-(--color-fg)">
          You passed this unit check{lastResult === "pass" ? " just now" : ""}. The next lesson is
          unlocked.
        </p>
        <Tries gate={gate} />
        <div className="mt-6 flex flex-wrap gap-3">
          {next && (
            <Link
              href={ROUTES.lesson(next.slug)}
              className="rounded-lg bg-(--color-brand-500) px-5 py-2.5 text-sm font-semibold text-white hover:bg-(--color-brand-600)"
            >
              Next lesson →
            </Link>
          )}
          <Link
            href={ROUTES.home}
            className="rounded-lg border border-(--color-border) px-5 py-2.5 text-sm font-medium text-(--color-fg) hover:bg-(--color-surface-2)"
          >
            Back to the course
          </Link>
        </div>
      </Shell>
    );
  }

  /* ---------- both attempts used ---------- */
  if (exhausted) {
    return (
      <Shell title="Both attempts used">
        <p className="rounded-lg border border-(--color-down) bg-(--color-down-soft) p-4 text-sm text-(--color-fg)">
          The answers are below. Read them, then restart the lesson — you get two fresh attempts.
        </p>
        <Tries gate={gate} />
        <div className="mt-6 space-y-5">
          {questions.map((q, i) => (
            <div key={q.id} className="rounded-lg border border-(--color-border) p-4">
              <p className="text-sm font-medium text-(--color-fg)">
                {i + 1}. {q.question}
              </p>
              <p className="mt-2 text-sm font-semibold text-(--color-up)">{q.options[q.answer]}</p>
              <p className="mt-1.5 text-sm leading-relaxed text-(--color-fg-muted)">{q.explain}</p>
            </div>
          ))}
        </div>
        <button
          type="button"
          onClick={() => {
            restartLesson(lesson.slug, lessonQuestionIds(lesson));
            window.location.href = ROUTES.lesson(lesson.slug);
          }}
          className="mt-6 rounded-lg bg-(--color-brand-500) px-5 py-2.5 text-sm font-semibold text-white hover:bg-(--color-brand-600)"
        >
          Restart the lesson
        </button>
      </Shell>
    );
  }

  /* ---------- the rules, before anything is shown ---------- */
  if (!started) {
    return (
      <Shell title={`Unit check — ${lesson.title}`}>
        <div className="rounded-xl border border-(--color-border) bg-(--color-surface-2) p-5">
          <p className="text-sm font-semibold text-(--color-fg)">Before you begin</p>
          <ul className="mt-3 space-y-2.5 text-sm leading-relaxed text-(--color-fg-muted)">
            <li>
              <span className="font-medium text-(--color-fg)">Two questions.</span> Both must be
              right. You have two attempts.
            </li>
            <li>
              <span className="font-medium text-(--color-fg)">
                Leaving this tab costs a try.
              </span>{" "}
              Everything you need is in the lesson you just read. Switching away to look something
              up is recorded, and counts the same as a submitted attempt.
            </li>
            <li>
              <span className="font-medium text-(--color-fg)">No answers until the end.</span> If
              you get it wrong, you are told only that — which question failed is not revealed
              until both attempts are gone.
            </li>
          </ul>
          <Tries gate={gate} />
        </div>
        <div className="mt-6 flex flex-wrap gap-3">
          <button
            type="button"
            onClick={() => setStarted(true)}
            className="rounded-lg bg-(--color-brand-500) px-5 py-2.5 text-sm font-semibold text-white hover:bg-(--color-brand-600)"
          >
            Start attempt {gate.attempts + 1} of 2
          </button>
          <Link
            href={ROUTES.lesson(lesson.slug)}
            className="rounded-lg border border-(--color-border) px-5 py-2.5 text-sm font-medium text-(--color-fg-muted) hover:bg-(--color-surface-2)"
          >
            Re-read the lesson first
          </Link>
        </div>
      </Shell>
    );
  }

  /* ---------- live exam ---------- */
  return (
    <Shell title={`Unit check — ${lesson.title}`}>
      {lastResult === "fail" && (
        <p
          role="status"
          className="mb-6 rounded-lg border border-(--color-warn) bg-(--color-surface-2) p-4 text-sm text-(--color-fg)"
        >
          <span className="font-semibold">Not quite — one attempt left.</span> Which answer was
          wrong is not shown. The questions have been reordered.
        </p>
      )}

      <p className="mb-5 text-xs font-medium uppercase tracking-wide text-(--color-fg-muted)">
        Attempt {gate.attempts + 1} of 2 · leaving this tab costs a try
      </p>

      <div className="space-y-8">
        {shuffled.map((q, qi) => (
          <fieldset key={q.id}>
            <legend className="text-base font-semibold text-(--color-fg)">
              {qi + 1}. {q.question}
            </legend>
            <div className="mt-3 grid gap-2">
              {q.options.map((option, oi) => {
                const chosen = picks[q.id] === oi;
                return (
                  <label
                    key={option}
                    className={`flex cursor-pointer items-start gap-3 rounded-lg border px-4 py-3 text-sm transition-colors ${
                      chosen
                        ? "border-(--color-brand-400) bg-(--color-brand-50) dark:bg-(--color-surface-2)"
                        : "border-(--color-border) hover:border-(--color-brand-300)"
                    }`}
                  >
                    <input
                      type="radio"
                      name={q.id}
                      checked={chosen}
                      onChange={() => setPicks((p) => ({ ...p, [q.id]: oi }))}
                      className="mt-0.5 h-4 w-4 shrink-0 accent-(--color-brand-500)"
                    />
                    <span className="text-(--color-fg)">{option}</span>
                  </label>
                );
              })}
            </div>
          </fieldset>
        ))}
      </div>

      <button
        type="button"
        onClick={submit}
        disabled={!allAnswered}
        className="mt-8 rounded-lg bg-(--color-brand-500) px-6 py-3 text-sm font-semibold text-white hover:bg-(--color-brand-600) disabled:cursor-not-allowed disabled:opacity-45"
      >
        {allAnswered ? "Submit both answers" : "Answer both questions"}
      </button>
    </Shell>
  );
}

function Tries({ gate }: { gate: { attempts: number; walkAways: number; triesUsed: number } }) {
  if (gate.triesUsed === 0) return null;
  return (
    <p className="mt-4 text-xs text-(--color-fg-muted)">
      Tries used so far: <span className="tabular-nums">{gate.triesUsed}</span>
      {gate.walkAways > 0 && (
        <>
          {" "}
          ({gate.walkAways} from leaving the tab, {gate.attempts} submitted)
        </>
      )}
    </p>
  );
}

/* Full-screen shell: no course chrome, nothing to click away to by accident. */
function Shell({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <main className="min-h-dvh bg-(--color-bg)">
      <div className="mx-auto w-full max-w-2xl px-5 py-10 sm:py-16">
        <p className="text-[11px] font-semibold uppercase tracking-[0.2em] text-(--color-brand-500)">
          StockSense Learn
        </p>
        <h1 className="mt-3 text-2xl font-semibold tracking-tight text-(--color-fg) sm:text-3xl">
          {title}
        </h1>
        <div className="mt-8">{children}</div>
      </div>
    </main>
  );
}
