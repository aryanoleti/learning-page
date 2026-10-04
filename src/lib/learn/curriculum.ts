import type { Checkpoint, FeatureHook, Level, Lesson } from "./types";
import { appUrl } from "./links";
import { SECOND_QUESTIONS } from "./unitChecks";
import { LEVEL_1_LESSONS } from "./levels/level1";
import { LEVEL_2_LESSONS } from "./levels/level2";
import { LEVEL_3_LESSONS } from "./levels/level3";
import { LEVEL_4_LESSONS } from "./levels/level4";
import { LEVEL_5_LESSONS } from "./levels/level5";
import { LEVEL_6_LESSONS } from "./levels/level6";
import { LEVEL_7_LESSONS } from "./levels/level7";
import { QUANT_LESSONS } from "./levels/quant";
import { RESEARCH_LESSONS } from "./levels/research";
import { AI_TOOLS_LESSONS } from "./levels/aiTools";

/* The curriculum map. Adding a lesson means editing one level file and
   nothing else — counts, progress and routing all derive from here. */

export const LEVELS: Level[] = [
  {
    id: 1,
    title: "Financial Foundations",
    theme: "Shares, markets, risk and diversification",
    blurb:
      "Start from zero. What you own when you own a share, how a price gets set, and why spreading money reduces risk.",
    lessons: LEVEL_1_LESSONS,
  },
  {
    id: 2,
    title: "Understanding Companies",
    theme: "Revenue, profit, debt and cash flow",
    blurb:
      "Follow money through a business — from what customers pay to what actually reaches the owners.",
    lessons: LEVEL_2_LESSONS,
  },
  {
    id: 3,
    title: "Reading the Numbers",
    theme: "EPS, P/E, ROE, debt-to-equity and margins",
    blurb:
      "The core ratios, each derived by hand so you can check the arithmetic rather than trust a formula.",
    lessons: LEVEL_3_LESSONS,
  },
  {
    id: 4,
    title: "Analyzing Companies",
    theme: "Fair comparison and evidence-based decisions",
    blurb:
      "Put two businesses side by side without rigging the question, and write a case you can be graded on.",
    lessons: LEVEL_4_LESSONS,
  },
  {
    id: 5,
    title: "Build Your Portfolio",
    theme: "Allocation, sizing and rebalancing",
    blurb:
      "Decide how much to put where, using virtual money, so that being wrong stays survivable.",
    lessons: LEVEL_5_LESSONS,
  },
  {
    id: 6,
    title: "Survive the Market",
    theme: "Drawdowns, surprises and staying rational",
    blurb:
      "Rehearse the hard moments — falls, shocks and bad news — before you meet them for real.",
    lessons: LEVEL_6_LESSONS,
  },
  {
    id: 7,
    title: "Think Like an Investor",
    theme: "Defending, reviewing and improving decisions",
    blurb:
      "Turn everything above into a repeatable process that gets better each time you use it.",
    lessons: LEVEL_7_LESSONS,
  },
];

/* Courses on InvestSense's research tools. Each is a short path of its own:
   it opens from its first lesson, so a reader who only wants to understand
   the Quant Engine does not have to finish all seven levels first. */
export const TOOL_COURSES: Level[] = [
  {
    id: 8,
    track: "tool",
    title: "The Quant Engine",
    theme: "Indicators, forecasts and how they are tested",
    blurb:
      "What the Quant Engine computes from price history, how to read its forecast band, and why a model has to beat a random walk before it counts.",
    lessons: QUANT_LESSONS,
    appPath: "/quant/",
    recommendedAfter: [1, 6],
    notebookId: "quant",
  },
  {
    id: 9,
    track: "tool",
    title: "Deep Research",
    theme: "AI analysts, the bull/bear debate and checking the work",
    blurb:
      "How a multi-agent research report is put together — numbers first, then specialist analysts, a debate and a moderator — and how to check one yourself.",
    lessons: RESEARCH_LESSONS,
    appPath: "/research/",
    recommendedAfter: [3, 4],
    notebookId: "research",
  },
  {
    id: 10,
    track: "tool",
    title: "Ask AI & Compare",
    theme: "Asking good questions and reading an AI verdict",
    blurb:
      "How the assistant keeps its numbers honest, how to ask questions that get useful answers, and how to read a Compare verdict and its confidence score.",
    lessons: AI_TOOLS_LESSONS,
    appPath: "/ask-ai/",
    recommendedAfter: [4],
    notebookId: "ai",
  },
];

/** The seven core levels in reading order — the main path. */
export const CORE_LESSONS: Lesson[] = LEVELS.flatMap((l) => l.lessons);

/** Every lesson on the site, core path first, then the tool courses. */
export const ALL_LESSONS: Lesson[] = [
  ...CORE_LESSONS,
  ...TOOL_COURSES.flatMap((c) => c.lessons),
];

export const TOTAL_LESSONS = ALL_LESSONS.length;

export const TOTAL_MINUTES = ALL_LESSONS.reduce((sum, l) => sum + l.minutes, 0);

/** Every checkpoint and final quiz across the course. */
export const TOTAL_QUESTIONS = ALL_LESSONS.reduce(
  (sum, l) => sum + l.steps.filter((s) => s.checkpoint).length + 1,
  0
);

const BY_SLUG = new Map(ALL_LESSONS.map((l) => [l.slug, l]));

export function getLesson(slug: string): Lesson | undefined {
  return BY_SLUG.get(slug);
}

export function getLevel(id: number): Level | undefined {
  return LEVELS.find((l) => l.id === id) ?? TOOL_COURSES.find((l) => l.id === id);
}

export function isToolCourse(level: Level | undefined): boolean {
  return level?.track === "tool";
}

/* The path a lesson belongs to: the core levels for Levels 1-7, otherwise
   the one tool course it sits in. Order, unlocking and next/previous links
   all run within this path. */
function pathFor(slug: string): Lesson[] {
  const lesson = BY_SLUG.get(slug);
  const course = lesson ? TOOL_COURSES.find((c) => c.id === lesson.levelId) : undefined;
  return course ? course.lessons : CORE_LESSONS;
}

/** Position within the lesson's own path, used for next/previous links. */
export function lessonNeighbours(slug: string): {
  previous: Lesson | null;
  next: Lesson | null;
  position: number;
  total: number;
} {
  const path = pathFor(slug);
  const i = path.findIndex((l) => l.slug === slug);
  if (i === -1) return { previous: null, next: null, position: 0, total: path.length };
  return {
    previous: i > 0 ? path[i - 1] : null,
    next: i < path.length - 1 ? path[i + 1] : null,
    position: i + 1,
    total: path.length,
  };
}

/** Questions inside one lesson: one per checkpoint, plus the final quiz. */
export function lessonQuestionIds(lesson: Lesson): string[] {
  return [
    ...lesson.steps.filter((s) => s.checkpoint).map((s) => s.checkpoint!.id),
    lesson.finalQuiz.id,
  ];
}

/* Where the course will plug into the rest of the product. Rendered now,
   wired later — `ready` gates the link so nothing points at a dead end. */
export const FEATURE_HOOKS: FeatureHook[] = [
  {
    id: "analysis",
    label: "Stock pages",
    description: "Read Level 3 figures — P/E, EPS, market cap — on live NSE company pages.",
    href: appUrl("/stocks/"),
    ready: true,
  },
  {
    id: "quant",
    label: "Quant Engine",
    description: "Indicators, a 7-day forecast and its confidence band. Taught in The Quant Engine course.",
    href: appUrl("/quant/"),
    ready: true,
  },
  {
    id: "research",
    label: "Deep Research",
    description: "Specialist AI analysts and a bull/bear debate. Taught in the Deep Research course.",
    href: appUrl("/research/"),
    ready: true,
  },
  {
    id: "simulator",
    label: "Portfolio",
    description: "Practise Level 5 allocation and track what you hold.",
    href: appUrl("/portfolio/"),
    ready: true,
  },
  {
    id: "dashboard",
    label: "Market dashboard",
    description: "Watch the market you have been reading about.",
    href: appUrl("/dashboard/"),
    ready: true,
  },
  {
    id: "profile",
    label: "Investor profile",
    description: "A record of your process, rules and reviews. Coming later.",
    href: "#",
    ready: false,
  },
];

/* ------------------------------------------------------------------ */
/* Unit checks: the two-question gate at the end of every lesson.
   Question 1 restates the lesson's main idea; question 2 comes from
   unitChecks.ts and is deliberately harder, scaling with the level. */

export function unitCheck(lesson: Lesson): Checkpoint[] {
  const second = SECOND_QUESTIONS[lesson.slug];
  return second ? [lesson.finalQuiz, second] : [lesson.finalQuiz];
}

/** Lessons unlock in order within their path: a lesson opens once the one
    before it is passed, and the first lesson of every path is always open. */
export function isLessonUnlocked(slug: string, passed: string[]): boolean {
  const path = pathFor(slug);
  const i = path.findIndex((l) => l.slug === slug);
  if (i <= 0) return true;
  return passed.includes(path[i - 1].slug);
}

/** The furthest core lesson the reader is allowed to open. */
export function furthestUnlocked(passed: string[]): Lesson {
  for (const lesson of CORE_LESSONS) {
    if (!passed.includes(lesson.slug)) return lesson;
  }
  return CORE_LESSONS[CORE_LESSONS.length - 1];
}

/* Which level a given app feature requires. Gating is by level, not by
   individual lesson, so a reader unlocks a tool by finishing the block of
   teaching that explains how to read it. */
export const FEATURE_REQUIREMENTS: Record<string, { level: number; label: string; why: string }> = {
  quant: {
    level: 8,
    label: "Quant Engine",
    why: "The engine reports indicators, a regime label, EWMA volatility and a forecast with a confidence band. The Quant Engine course explains each one and how the forecasts are tested.",
  },
  research: {
    level: 9,
    label: "Deep Research",
    why: "Deep Research combines specialist AI analysts, a bull/bear debate and a moderator. The Deep Research course explains how to read and check the report.",
  },
  compare: {
    level: 4,
    label: "Compare desk",
    why: "Comparing two companies fairly is exactly what Level 4 covers — including how the choice of metric can decide the winner in advance.",
  },
  portfolio: {
    level: 5,
    label: "Portfolio desk",
    why: "Level 5 covers position sizing, spreading risk and rebalancing, which is what the simulator asks you to do.",
  },
};

/** True when every lesson in the required level has been passed. */
export function featureUnlocked(feature: string, passed: string[]): boolean {
  const req = FEATURE_REQUIREMENTS[feature];
  if (!req) return true;
  const level = getLevel(req.level);
  if (!level) return true;
  return level.lessons.every((l) => passed.includes(l.slug));
}
