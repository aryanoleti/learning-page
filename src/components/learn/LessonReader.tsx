"use client";

import Link from "next/link";
import { useEffect, useMemo } from "react";
import type { Lesson } from "@/lib/learn/types";
import {
  getLevel,
  isLessonUnlocked,
  lessonNeighbours,
  lessonQuestionIds,
  unitCheck,
} from "@/lib/learn/curriculum";
import { useProgress } from "@/lib/learn/progress";
import { ROUTES } from "@/lib/learn/links";
import { lessonReadingTime, stepReadingTime } from "@/lib/learn/reading";
import { CheckpointBlock } from "./CheckpointBlock";
import { LearnTopBar } from "./LearnTopBar";
import { Breadcrumb, DifficultyTag, ExampleCard, ProgressBar } from "./LearnPieces";

/* The lesson reader. Content is a sequence of small steps; the lesson ends
   with a two-question gate that must be passed before the next lesson opens.
   There is no "mark as complete" — the only way forward is through. */
export function LessonReader({ lesson }: { lesson: Lesson }) {
  const { progress, hydrated, recordAnswer, openLesson, restartLesson, recordWalkAway } =
    useProgress();
  const level = getLevel(lesson.levelId);
  const { previous, next, position } = useMemo(() => lessonNeighbours(lesson.slug), [lesson.slug]);
  const questions = useMemo(() => unitCheck(lesson), [lesson]);
  const inlineIds = useMemo(
    () => lesson.steps.filter((s) => s.checkpoint).map((s) => s.checkpoint!.id),
    [lesson]
  );

  useEffect(() => {
    openLesson(lesson.slug);
  }, [lesson.slug, openLesson]);

  /* Arriving here with an exam still marked in progress means the reader left
     the unit check to come back and read. That costs one try. */
  useEffect(() => {
    if (progress.activeExam === lesson.slug) recordWalkAway(lesson.slug);
  }, [progress.activeExam, lesson.slug, recordWalkAway]);

  const gate = progress.gates[lesson.slug] ?? { attempts: 0, passed: false, walkAways: 0, triesUsed: 0 };
  const unlocked = !hydrated || isLessonUnlocked(lesson.slug, progress.completed);
  const nextUnlocked = gate.passed;
  const answeredInline = inlineIds.filter((id) => progress.answers[id]).length;

  /* A locked lesson still renders its shell so the URL is never a dead end,
     but the content is withheld until the previous lesson is passed. */
  if (hydrated && !unlocked) {
    return (
      <>
        <LearnTopBar />
        <div className="mx-auto w-full max-w-3xl px-4 pb-24 pt-8 sm:px-6 sm:pt-12">
          <Breadcrumb items={[{ label: "Learn", href: "/learn" }, { label: "Locked" }]} />
          <div className="mt-8 rounded-2xl border border-(--color-border) bg-(--color-surface) p-6 text-center">
            <h1 className="text-xl font-semibold text-(--color-fg)">This lesson is locked</h1>
            <p className="mx-auto mt-2 max-w-md text-sm leading-relaxed text-(--color-fg-muted)">
              Lessons open in order. Finish{" "}
              <span className="font-medium text-(--color-fg)">{previous?.title}</span> — including
              its unit check — and this one unlocks.
            </p>
            {previous && (
              <Link
                href={ROUTES.lesson(previous.slug)}
                className="mt-5 inline-block rounded-lg bg-(--color-brand-500) px-4 py-2 text-sm font-semibold text-white hover:bg-(--color-brand-600)"
              >
                Go to {previous.title}
              </Link>
            )}
          </div>
        </div>
      </>
    );
  }

  return (
    <>
      <LearnTopBar />
      <article className="mx-auto w-full max-w-3xl px-4 pb-24 pt-8 sm:px-6 sm:pt-12">
        <Breadcrumb
          items={[
            { label: "Learn", href: "/learn" },
            { label: `Level ${lesson.levelId} — ${level?.title ?? ""}`, href: "/learn" },
            { label: lesson.title },
          ]}
        />

        <header className="mt-5">
          <div className="flex flex-wrap items-center gap-x-3 gap-y-1 text-xs text-(--color-fg-muted)">
            <span>Lesson {position} of 27</span>
            <span aria-hidden="true">·</span>
            <span>{lessonReadingTime(lesson)} read</span>
            <span aria-hidden="true">·</span>
            <DifficultyTag difficulty={lesson.difficulty} />
          </div>
          <h1 className="mt-3 text-3xl font-semibold tracking-tight text-(--color-fg) sm:text-4xl">
            {lesson.title}
          </h1>
          <p className="mt-3 text-base leading-relaxed text-(--color-fg-muted)">{lesson.goal}</p>
        </header>

        <div className="sticky top-0 z-10 -mx-4 mt-6 bg-(--color-bg)/90 px-4 py-3 backdrop-blur sm:-mx-6 sm:px-6">
          <div className="flex items-center gap-3">
            <ProgressBar
              percent={
                hydrated && inlineIds.length > 0
                  ? Math.round((answeredInline / inlineIds.length) * 100)
                  : 0
              }
              label="Checkpoints answered while reading"
            />
            <span className="shrink-0 text-xs tabular-nums text-(--color-fg-muted)">
              {hydrated ? `${answeredInline}/${inlineIds.length}` : `0/${inlineIds.length}`}
            </span>
          </div>
        </div>

        <div className="mt-6">
          {lesson.steps.map((step, i) => (
            <section key={step.heading} className="mb-10">
              <h2 className="flex items-baseline gap-3 text-xl font-semibold text-(--color-fg)">
                <span
                  aria-hidden="true"
                  className="text-sm font-semibold tabular-nums text-(--color-fg-muted)"
                >
                  {String(i + 1).padStart(2, "0")}
                </span>
                {step.heading}
                <span className="ml-auto shrink-0 text-xs font-normal text-(--color-fg-muted)">
                  {stepReadingTime(step)}
                </span>
              </h2>
              <div className="mt-3 space-y-4">
                {step.body.map((para) => (
                  <p
                    key={para.slice(0, 30)}
                    className="text-[15px] leading-[1.75] text-(--color-fg-muted)"
                  >
                    {para}
                  </p>
                ))}
              </div>
              {step.example && <ExampleCard example={step.example} />}
              {step.checkpoint && (
                <CheckpointBlock
                  checkpoint={step.checkpoint}
                  saved={progress.answers[step.checkpoint.id]}
                  onAnswer={(picked, correct) =>
                    recordAnswer(step.checkpoint!.id, picked, correct)
                  }
                  label="Quick check while you read"
                />
              )}
            </section>
          ))}
        </div>

        <section className="rounded-2xl border border-(--color-border) bg-(--color-surface-2) p-5 sm:p-6">
          <h2 className="text-base font-semibold text-(--color-fg)">Recap</h2>
          <ul className="mt-3 space-y-2">
            {lesson.recap.map((point) => (
              <li
                key={point.slice(0, 24)}
                className="flex gap-3 text-sm leading-relaxed text-(--color-fg-muted)"
              >
                <span
                  aria-hidden="true"
                  className="mt-2 h-1 w-1 shrink-0 rounded-full bg-(--color-brand-400)"
                />
                {point}
              </li>
            ))}
          </ul>
        </section>

        {/* The unit check lives on its own page in this site. Navigating back
            here to re-read once it has started costs a try — which is why it
            is not embedded in the lesson it is testing. */}
        <section className="mt-10 rounded-2xl border-2 border-(--color-border-strong) bg-(--color-surface) p-5 sm:p-6">
          <div className="flex flex-wrap items-center justify-between gap-3">
            <div>
              <h2 className="text-lg font-semibold text-(--color-fg)">Unit check</h2>
              <p className="mt-1 max-w-md text-sm leading-relaxed text-(--color-fg-muted)">
                Two questions, both from what you just read. Once it starts, coming
                back here to look something up counts as a try.
              </p>
            </div>
            <span className="rounded-full border border-(--color-border) px-3 py-1 text-xs font-medium tabular-nums text-(--color-fg-muted)">
              {gate.passed ? "Passed" : `Attempt ${Math.min(gate.attempts + 1, 2)} of 2`}
            </span>
          </div>
          {gate.triesUsed > 0 && !gate.passed && (
            <p className="mt-3 text-xs text-(--color-fg-muted)">
              Tries used: <span className="tabular-nums">{gate.triesUsed}</span>
              {gate.walkAways > 0 && ` (${gate.walkAways} from leaving the exam tab)`}
            </p>
          )}
          <Link
            href={ROUTES.exam(lesson.slug)}
            className="mt-5 inline-block rounded-lg bg-(--color-brand-500) px-5 py-2.5 text-sm font-semibold text-white hover:bg-(--color-brand-600)"
          >
            {gate.passed ? "Review the unit check" : "Open the unit check →"}
          </Link>
        </section>

        {/* Back is always available; forward only after the gate is passed. */}
        <nav aria-label="Lesson navigation" className="mt-8 grid gap-3 sm:grid-cols-2">
          {previous ? (
            <Link
              href={ROUTES.lesson(previous.slug)}
              className="rounded-xl border border-(--color-border) p-4 transition-colors hover:border-(--color-brand-300)"
            >
              <span className="text-xs text-(--color-fg-muted)">← Previous lesson</span>
              <span className="mt-1 block text-sm font-medium text-(--color-fg)">
                {previous.title}
              </span>
            </Link>
          ) : (
            <span />
          )}

          {next ? (
            nextUnlocked ? (
              <Link
                href={ROUTES.lesson(next.slug)}
                className="rounded-xl border border-(--color-brand-300) bg-(--color-brand-50) p-4 text-right transition-colors hover:border-(--color-brand-400) dark:bg-(--color-surface-2)"
              >
                <span className="text-xs text-(--color-brand-600)">Next lesson →</span>
                <span className="mt-1 block text-sm font-medium text-(--color-fg)">
                  {next.title}
                </span>
              </Link>
            ) : (
              <div
                aria-disabled="true"
                className="rounded-xl border border-dashed border-(--color-border) p-4 text-right opacity-70"
              >
                <span className="text-xs text-(--color-fg-muted)">Next lesson locked</span>
                <span className="mt-1 block text-sm font-medium text-(--color-fg-muted)">
                  Pass the unit check to continue
                </span>
              </div>
            )
          ) : (
            <Link
              href={ROUTES.home}
              className="rounded-xl border border-(--color-border) p-4 text-right transition-colors hover:border-(--color-brand-300)"
            >
              <span className="text-xs text-(--color-fg-muted)">End of the course</span>
              <span className="mt-1 block text-sm font-medium text-(--color-fg)">
                Back to the course
              </span>
            </Link>
          )}
        </nav>

        <p className="mt-10 text-xs leading-relaxed text-(--color-fg-muted)">
          Educational content only — not investment advice. Every company, figure and scenario in
          this course is invented for teaching.
        </p>
      </article>
    </>
  );
}
