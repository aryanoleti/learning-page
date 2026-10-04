import type { Lesson } from "../types";

/* Course — Deep Research.
   InvestSense's multi-agent research pipeline: deterministic numbers first,
   then specialist AI analysts, an adversarial bull/bear debate and a
   moderator, with every stated number traced back to the calculations. */

export const RESEARCH_LESSONS: Lesson[] = [
  {
    slug: "research-numbers-first",
    levelId: 9,
    order: 1,
    title: "Numbers first, words second",
    goal: "Explain why the research pipeline computes before it writes, and what number-tracing does and does not guarantee.",
    minutes: 6,
    difficulty: "intro",
    steps: [
      {
        heading: "Why the order matters",
        body: [
          "Language models write fluent, confident text — and can produce a confident, wrong number. This is often called hallucination.",
          "So InvestSense builds a research report in a fixed order. Deterministic code computes the figures first; the AI stages only explain, argue about and summarise those figures afterwards.",
        ],
      },
      {
        heading: "What tracing guarantees",
        body: [
          "Every number an AI stage states is checked against InvestSense's own calculations. That guarantees the figure came from the data.",
          "It does not guarantee the reasoning built around the figure, the emphasis, or what was left out. The prose is still AI-written and can be incomplete or poorly framed.",
        ],
        example: {
          company: "ironvale",
          title: "One sentence, two kinds of claim",
          rows: [
            { label: "The sentence", value: "'Debt-to-equity of 1.4 is comfortable for the sector'" },
            { label: "Traced figure", value: "1.4 = ₹2,800 cr ÷ ₹2,000 cr ✔" },
            { label: "Judgement", value: "'comfortable' — not a number, not checked" },
          ],
          note: "The 1.4 is verified. Whether 1.4 is comfortable is an opinion you are free to disagree with.",
        },
        checkpoint: {
          id: "l9-1-c1",
          question:
            "In 'Debt-to-equity of 1.4 is comfortable for the sector', which part is checked against calculations?",
          options: [
            "The whole sentence, including the judgement",
            "Only the figure of 1.4",
            "Only the word 'comfortable'",
            "None of it, since an AI wrote it",
          ],
          answer: 1,
          explain:
            "Tracing applies to numbers. The figure is verified; the description of it as comfortable is interpretation.",
        },
      },
      {
        heading: "Fluent is not the same as right",
        body: [
          "A well-written paragraph feels more trustworthy than a clumsy one. That feeling is a bias, not evidence.",
          "Read AI research the way you would read a well-informed colleague's argument: weigh each claim on its support, and ignore the confidence of the tone.",
        ],
      },
    ],
    recap: [
      "The pipeline computes first and writes second.",
      "Traced numbers are verified; the reasoning around them is not.",
      "Separate figures from judgements in every sentence.",
      "Fluency is a style, not a source.",
    ],
    finalQuiz: {
      id: "l9-1-final",
      question: "Every number in a research report traces back to real calculations. What can still be wrong?",
      options: [
        "Nothing — traced numbers make the report correct",
        "Only the dates on which the data was collected",
        "The interpretation, the emphasis and the omissions",
        "The arithmetic behind each of the traced figures",
      ],
      answer: 2,
      explain:
        "Tracing verifies the figures. What the report makes of them — and what it chose not to mention — is still AI-written judgement.",
    },
  },

  {
    slug: "research-specialist-analysts",
    levelId: 9,
    order: 2,
    title: "Specialist analysts",
    goal: "Read each AI analyst's summary for what evidence it used and what it could not see.",
    minutes: 6,
    difficulty: "core",
    steps: [
      {
        heading: "Splitting the job",
        body: [
          "A human research desk splits the work between specialists. Deep Research does the same with AI analysts: each is given one slice of the evidence — for example the valuation figures, the price behaviour from the Quant Engine, or the risk numbers — and reports on that slice alone.",
        ],
      },
      {
        heading: "Why specialists help",
        body: [
          "A narrow brief keeps each conclusion tied to its own evidence, so you can see which part of the evidence drives which view.",
          "When two analysts disagree, that disagreement is information, not a malfunction.",
        ],
        example: {
          company: "lumen",
          title: "Two analysts, one company",
          rows: [
            { label: "Valuation analyst", value: "P/E = ₹720 ÷ ₹18 = 40 — high expectations priced in" },
            { label: "Price analyst", value: "Steady uptrend over three months" },
          ],
          note: "Both are true at once. The business is popular and the price assumes a lot of future growth — exactly the tension worth thinking about.",
        },
        checkpoint: {
          id: "l9-2-c1",
          question:
            "The valuation analyst is cautious and the price analyst is positive on the same company. What does that most likely mean?",
          options: [
            "One of the two analysts has made an error",
            "Each is reporting a different part of the evidence",
            "The company should be avoided until they agree",
            "The positive analyst should always be trusted",
          ],
          answer: 1,
          explain:
            "Each analyst sees a different slice. A strong price trend and a demanding valuation can both be true, and the disagreement shows you where the real question is.",
        },
      },
      {
        heading: "What each specialist cannot see",
        body: [
          "A narrow brief also means blind spots. A price analyst knows nothing about debt; a valuation analyst knows nothing about last month's momentum; none of them knows anything about you.",
          "Read each summary with three questions: what evidence did it use, over what period, and what was outside its brief?",
        ],
      },
    ],
    recap: [
      "Each AI analyst reports on one slice of the evidence.",
      "Specialisation shows which evidence drives which view.",
      "Disagreement between analysts is information.",
      "Every brief has blind spots — ask what each one could not see.",
    ],
    finalQuiz: {
      id: "l9-2-final",
      question: "Why is it useful that each AI analyst works from only one slice of the evidence?",
      options: [
        "It guarantees that the analysts will agree",
        "You can see which evidence drives each view",
        "It means no single analyst can be wrong",
        "It removes any need to read the debate",
      ],
      answer: 1,
      explain:
        "Tying each conclusion to a defined slice of evidence makes the report traceable. It does not make the analysts agree or infallible.",
    },
  },

  {
    slug: "research-bull-bear-debate",
    levelId: 9,
    order: 3,
    title: "The bull and bear debate",
    goal: "Read an adversarial debate by its strongest points, and find the question it leaves for you.",
    minutes: 7,
    difficulty: "core",
    steps: [
      {
        heading: "Built-in disagreement",
        body: [
          "In the debate, one AI argues the case for a stock (the bull) and another argues the case against (the bear), each responding to the other.",
          "The point is to fight one-sidedness. Asked to 'tell me about this company', a single voice tends to drift into one story. Forcing both cases into the open surfaces the inconvenient evidence — the same discipline Level 7 asks of you.",
        ],
      },
      {
        heading: "Read for the strongest point on each side",
        body: [
          "Do not count arguments. Find the single strongest point each side made, and the number it rests on.",
        ],
        example: {
          company: "ironvale",
          title: "A debate on Ironvale Works",
          rows: [
            { label: "Bull", value: "₹6,500 cr of revenue, the largest of the five; P/E of 20" },
            { label: "Bear", value: "5% net margin and debt-to-equity of 1.4" },
            { label: "Strongest bear point", value: "Thin margin plus heavy debt: a small cost rise hits profit hard" },
          ],
          note: "The bull's points are true but mostly about size. The bear's point is about fragility, and it rests on two verified figures.",
        },
        checkpoint: {
          id: "l9-3-c1",
          question: "The bull makes six points and the bear makes two. What should you conclude?",
          options: [
            "The bull has won, since it made more points",
            "Nothing yet — weigh the strongest point on each side",
            "The bear's case is too thin to take seriously",
            "The debate is broken and should be ignored",
          ],
          answer: 1,
          explain:
            "The number of arguments says nothing about their weight. One well-supported risk can outweigh several minor positives.",
        },
      },
      {
        heading: "Where both sides cite the same number",
        body: [
          "Sometimes bull and bear read the same figure differently. The bull calls Ironvale's P/E of 20 reasonable; the bear calls it too high for a 5% margin business.",
          "That shared figure is the crux. It is where the disagreement actually lives, and where your own research is best spent.",
        ],
      },
      {
        heading: "A debate does not decide",
        body: [
          "The more persuasive side is not necessarily the right one. A debate maps the disagreement; it does not settle it, and the decision remains yours.",
        ],
      },
    ],
    recap: [
      "The bull argues for, the bear against, each answering the other.",
      "Weigh the strongest point on each side, not the count.",
      "A figure both sides argue over is the crux worth researching.",
      "Persuasive is not the same as correct.",
    ],
    finalQuiz: {
      id: "l9-3-final",
      question: "Bull and bear both cite the same P/E but draw opposite conclusions. What does that tell you?",
      options: [
        "One of them must have calculated it wrongly",
        "That P/E reading is the crux worth researching",
        "P/E is not relevant for this particular company",
        "The bull is right, because a P/E is a plain fact",
      ],
      answer: 1,
      explain:
        "The figure is verified, so neither side miscalculated. They disagree about what it means — which is precisely the question to research.",
    },
  },

  {
    slug: "research-moderator",
    levelId: 9,
    order: 4,
    title: "The moderator's summary",
    goal: "Read a moderator's lean as a summary of arguments, and use its unresolved points as your own checks.",
    minutes: 6,
    difficulty: "core",
    steps: [
      {
        heading: "What the moderator does",
        body: [
          "The moderator reads the analysts and the debate, weighs the arguments, and summarises where they agree, where they still disagree, and which way the balance leans.",
        ],
      },
      {
        heading: "A lean is not a recommendation",
        body: [
          "InvestSense is not a SEBI-registered adviser, and the moderator's lean is not advice. It summarises the balance of the arguments it was given.",
          "It does not know your goals, your time horizon, what you already own, or what you can afford to lose. Two people can read the same summary and both decide correctly — in opposite directions.",
        ],
        checkpoint: {
          id: "l9-4-c1",
          question: "What does a moderator's positive lean actually summarise?",
          options: [
            "A guarantee that the price will rise",
            "The balance of the arguments it was given",
            "A personal recommendation to buy",
            "The view of most market professionals",
          ],
          answer: 1,
          explain:
            "The moderator weighs the analysts and the debate. It knows nothing about your situation, so its lean cannot be a recommendation for you.",
        },
      },
      {
        heading: "Read the unresolved part first",
        body: [
          "The most useful section is the one listing what the moderator could not settle, and what would change its conclusion.",
          "Turn those into your own reversal conditions — the 'what would change my mind' list from Level 4. For Ironvale Works that might be: 'reconsider if net margin falls below 4% or debt-to-equity rises above 1.6'.",
        ],
      },
    ],
    recap: [
      "The moderator weighs the debate and states a lean.",
      "A lean summarises arguments; it is not a recommendation.",
      "Unresolved points are the most useful part of the summary.",
      "Turn them into your own reversal conditions.",
    ],
    finalQuiz: {
      id: "l9-4-final",
      question:
        "Two readers get the same moderator summary with a positive lean. One buys and one does not. Who acted wrongly?",
      options: [
        "The one who ignored the moderator's lean",
        "The one who bought without a second report",
        "Possibly neither — their situations differ",
        "Both, as a lean should never be acted upon",
      ],
      answer: 2,
      explain:
        "The summary is the same, but goals, horizons and existing holdings are not. Different decisions from the same evidence can both be sound.",
    },
  },

  {
    slug: "research-checking-the-report",
    levelId: 9,
    order: 5,
    title: "Checking a research report yourself",
    goal: "Run a four-step check on an AI research report and carry what survives into your own process.",
    minutes: 7,
    difficulty: "applied",
    steps: [
      {
        heading: "A four-step check",
        body: [
          "Trace: for every figure that matters to the conclusion, find it yourself on the stock page or in the Quant Engine.",
          "Separate: mark each sentence as fact or interpretation. Gaps: list what the report did not cover. Transfer: copy what holds up into your own evidence checklist from Level 4.",
        ],
      },
      {
        heading: "The check, worked through",
        body: [
          "Here is the check applied to a short report on Coral & Co.",
        ],
        example: {
          company: "coral",
          title: "Auditing a report on Coral & Co",
          rows: [
            { label: "'Net margin is 12%'", value: "Fact — ₹288 cr ÷ ₹2,400 cr = 12% ✔" },
            { label: "'Debt is low'", value: "Interpretation, backed by D/E of 0.27 ✔" },
            { label: "'Brand loyalty will protect margins'", value: "Interpretation — not checkable from the figures" },
            { label: "Not mentioned", value: "Cash flow — a gap to check yourself" },
          ],
          note: "Two lines hold up, one is opinion, and one important area is missing. That is a normal result, and it tells you exactly where to look next.",
        },
        checkpoint: {
          id: "l9-5-c1",
          question: "Which line in the Coral & Co report is interpretation rather than fact?",
          options: [
            "Net margin is 12%",
            "Revenue is ₹2,400 cr",
            "Brand loyalty will protect margins",
            "Debt-to-equity is 0.27",
          ],
          answer: 2,
          explain:
            "The other three can be computed from the figures. A claim about what brand loyalty will do in future cannot.",
        },
      },
      {
        heading: "What no report can know",
        body: [
          "No report knows your horizon, your other holdings, your tax position or when you will need the money. None knows what next quarter's results will say.",
          "So a research report goes into your process as one input — alongside your checklist, your written case from Level 4 and your scheduled reviews from Level 7. It is never the process itself.",
        ],
      },
    ],
    recap: [
      "Trace, separate, find the gaps, transfer.",
      "Facts can be computed; interpretations can only be weighed.",
      "Missing topics are as important as wrong ones.",
      "A report is one input to your process, not a replacement for it.",
    ],
    finalQuiz: {
      id: "l9-5-final",
      question: "A report's figures all check out, but it never mentions cash flow. What is the right next step?",
      options: [
        "Accept it — the figures it gives are verified",
        "Check cash flow yourself before relying on it",
        "Discard the whole report, as it is incomplete",
        "Ask the AI to rewrite it more positively",
      ],
      answer: 1,
      explain:
        "Verified figures do not make a report complete. Fill the gap yourself; the rest of the report can still be useful.",
    },
  },
];
