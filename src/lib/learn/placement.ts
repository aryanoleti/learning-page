import type { Checkpoint, PlacementResult } from "./types";
import { LEVELS } from "./curriculum";

/* The placement quiz.

   Every question here is written for this quiz alone — none is reused from a
   lesson, because a reader who has already done a lesson would be graded on
   recall rather than on what they knew coming in.

   Option lengths are balanced deliberately: the correct answer is never the
   longest, and in several it is the shortest. Distractors are real
   misconceptions, so a wrong answer says something about where to start.

   The result unlocks everything below the recommended starting point, so a
   reader told to begin at Level 3 is not made to click through Levels 1 and 2
   to reach it. */

export const PLACEMENT_QUESTIONS: (Checkpoint & { level: number })[] = [
  {
    id: "pl-a1",
    level: 1,
    question:
      "A company you own shares in has a very good year. Which of these is guaranteed to increase?",
    options: [
      "The dividend that gets paid out to you",
      "The share price on the exchange",
      "Profit attributable to your shares",
      "The number of shares you hold",
    ],
    answer: 2,
    explain:
      "Profit attributable to owners rises with profit by definition. Dividends are a board decision, the price depends on expectations, and your share count does not change on its own.",
  },
  {
    id: "pl-a2",
    level: 1,
    question: "Two people trade a share at ₹400. What must be true about them?",
    options: [
      "They disagree about what it is worth",
      "They both believe it is worth exactly ₹400",
      "The buyer is working with better information",
      "The seller has an urgent need for cash",
    ],
    answer: 0,
    explain:
      "One is willing to hold at that price and one is willing to let it go, so they reached opposite conclusions. Every trade is a disagreement that cleared.",
  },
  {
    id: "pl-a3",
    level: 2,
    question:
      "A shop buys an item for ₹80 and sells it for ₹100, then pays ₹15 of wages and rent on that sale. What is its gross profit?",
    options: ["₹5", "₹20", "₹85", "₹100"],
    answer: 1,
    explain:
      "Gross profit is revenue minus the direct cost of goods: 100 − 80 = ₹20. The ₹15 of overheads comes off further down, at the operating line.",
  },
  {
    id: "pl-a4",
    level: 2,
    question:
      "A company sold ₹500 cr of goods this year but collected only ₹380 cr in cash. Where does the other ₹120 cr sit?",
    options: [
      "In profit, but not yet in cash",
      "It was never genuinely earned at all",
      "It will appear in next year's revenue",
      "It shows up only in the equity line",
    ],
    answer: 0,
    explain:
      "The sale is recorded when it is made, so it is already in profit. The money is owed by customers and sits in receivables until it arrives.",
  },
  {
    id: "pl-a5",
    level: 3,
    question:
      "A company earns ₹4 per share and trades at ₹100. Profit doubles and the price does not move. What happens to the P/E?",
    options: [
      "It halves to 12.5",
      "It doubles to 50",
      "It stays exactly where it was",
      "It falls slightly, to about 20",
    ],
    answer: 0,
    explain: "It began at 100 ÷ 4 = 25. Earnings of ₹8 with an unchanged price give 100 ÷ 8 = 12.5.",
  },
  {
    id: "pl-a6",
    level: 3,
    question: "Which pair would most worry you about a company reporting record profits?",
    options: [
      "Strong margins alongside very little debt",
      "Revenue climbing and costs climbing too",
      "Cash flow falling, receivables rising",
      "A high multiple together with fast growth",
    ],
    answer: 2,
    explain:
      "Cash going down while unpaid customer invoices go up means the record profit has not been collected — and may never be.",
  },
  {
    id: "pl-a7",
    level: 5,
    question:
      "You hold ten positions of equal size. One doubles, the rest are flat. Roughly what share of the portfolio is it now?",
    options: ["About 18%", "About 10%", "About 20%", "About 50%"],
    answer: 0,
    explain:
      "Nine parts stay at 1 and one becomes 2, so it is 2 of 11 — about 18%. Winners concentrate a portfolio without a single trade being made.",
  },
  {
    id: "pl-a8",
    level: 6,
    question:
      "Your portfolio falls 30% in a month. Which single fact would most change what you should do?",
    options: [
      "Other investors are selling heavily too",
      "It is the largest fall you have ever seen",
      "The businesses still earn what you expected",
      "The fall happened faster than you expected",
    ],
    answer: 2,
    explain:
      "Only the businesses' earning power tells you whether anything actually changed. Speed, size and what the crowd is doing describe the price, not the companies.",
  },
];

/* Grading.

   `startLevel` is where to begin. `unlocked` is every lesson below it, so the
   course opens at the right place instead of making the reader click through
   material the quiz says they already know. */
export function gradePlacement(picked: Record<string, number>): PlacementResult {
  const wrongLevels = new Set<number>();
  let score = 0;

  PLACEMENT_QUESTIONS.forEach((q) => {
    if (picked[q.id] === q.answer) score += 1;
    else wrongLevels.add(q.level);
  });

  const total = PLACEMENT_QUESTIONS.length;
  const ratio = score / total;

  let startLevel: number;
  let verdict: PlacementResult["verdict"];

  if (ratio < 0.5) {
    verdict = "start";
    startLevel = 1;
  } else if (ratio < 0.875) {
    verdict = "skim";
    // begin at the earliest level they actually got wrong
    startLevel = wrongLevels.size > 0 ? Math.min(...wrongLevels) : 4;
  } else {
    verdict = "skip";
    // the foundations would be revision; judgement and process are not testable here
    startLevel = 4;
  }

  const recommended = LEVELS.filter((l) => l.id >= startLevel).map((l) => l.id);

  // everything before the starting level is granted so it is not in the way
  const unlocked = LEVELS.filter((l) => l.id < startLevel).flatMap((l) =>
    l.lessons.map((lesson) => lesson.slug)
  );

  return { score, total, recommended, unlocked, startLevel, verdict, takenAt: Date.now() };
}

export const VERDICT_COPY: Record<
  PlacementResult["verdict"],
  { headline: string; detail: string }
> = {
  start: {
    headline: "Start from the beginning",
    detail:
      "Several of the fundamentals did not land yet, which is completely normal if you are new to this. Level 1 assumes nothing at all, and each level builds directly on the one before it.",
  },
  skim: {
    headline: "Start partway in",
    detail:
      "You already have some of this. Everything before your starting level has been unlocked, so you can dip back into it whenever you want — the quiz just suggests you do not need to.",
  },
  skip: {
    headline: "You can skip the foundations",
    detail:
      "You answered nearly everything correctly, so the earlier levels would mostly be revision and have been unlocked for reference. What is left is comparison, composure and process, which a short quiz cannot really test.",
  },
};
