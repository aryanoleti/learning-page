import type { Lesson } from "../types";

/* Course — Ask AI & Compare.
   How InvestSense's assistant grounds its numbers in fetched data, how to
   ask it useful questions, and how to read a Compare verdict. */

export const AI_TOOLS_LESSONS: Lesson[] = [
  {
    slug: "ai-grounded-assistant",
    levelId: 10,
    order: 1,
    title: "How a grounded AI assistant works",
    goal: "Explain how Ask AI keeps its numbers honest, and recognise the limits it is built to keep.",
    minutes: 5,
    difficulty: "intro",
    steps: [
      {
        heading: "Tools first, then text",
        body: [
          "Before answering, InvestSense's Ask AI fetches what it needs with tools — the price, the RSI, the volatility, whatever the question requires.",
          "Every number in the answer is checked against what a tool actually fetched. If a figure cannot be traced, the answer is rejected and regenerated. If nothing can be retrieved at all, it says so instead of guessing.",
        ],
      },
      {
        heading: "Know its boundaries",
        body: [
          "It covers NSE-listed shares and ETFs only. Ask about a company listed only in the US and it tells you that is outside what it tracks, rather than answering as if it had Indian data.",
          "It will not tell you to buy or sell. That is a deliberate design choice, not a limitation to work around.",
        ],
        checkpoint: {
          id: "l10-1-c1",
          question: "You ask about a company listed only in the US. What should a grounded assistant do?",
          options: [
            "Estimate figures from similar Indian companies",
            "Say the company is outside the data it covers",
            "Answer from what it remembers about the company",
            "Convert the US price into rupees and continue",
          ],
          answer: 1,
          explain:
            "A grounded assistant only states what its tools can fetch. Outside its coverage, the honest answer is to say so.",
        },
      },
      {
        heading: "What grounding does not fix",
        body: [
          "Verified numbers do not make the framing complete, and the question you ask shapes the answer you get. The next lesson is about asking well.",
        ],
      },
    ],
    recap: [
      "Ask AI fetches data with tools before it writes.",
      "Untraceable numbers are rejected, not shown.",
      "It covers NSE shares and ETFs, and never says buy or sell.",
      "Grounded numbers still need a well-framed question.",
    ],
    finalQuiz: {
      id: "l10-1-final",
      question: "The assistant replies: 'I could not retrieve data for that.' How should you read this?",
      options: [
        "It is broken and the fault should be reported",
        "It declined to guess when it had no data",
        "The company you asked about does not exist",
        "The data was deliberately withheld from you",
      ],
      answer: 1,
      explain: "Saying it found nothing, rather than inventing figures, is the assistant working as designed.",
    },
  },

  {
    slug: "ai-asking-good-questions",
    levelId: 10,
    order: 2,
    title: "Asking questions that get useful answers",
    goal: "Rewrite vague or unanswerable questions into specific, two-sided ones.",
    minutes: 6,
    difficulty: "core",
    steps: [
      {
        heading: "Vague in, vague out",
        body: [
          "'Is Kirana Kart good?' has no answer — good at what, over what period, compared with what? A useful question names the metric, the period and the comparison.",
        ],
        example: {
          company: "kirana",
          title: "One question, improved three ways",
          rows: [
            { label: "Vague", value: "Is Kirana Kart good?" },
            { label: "Specific", value: "How has its net margin changed over three years?" },
            { label: "Comparative", value: "How does a 4% margin compare with other retailers?" },
            { label: "Two-sided", value: "What is the strongest case against it?" },
          ],
          note: "Each rewrite gives the assistant something it can fetch and check, and gives you something you can verify.",
        },
        checkpoint: {
          id: "l10-2-c1",
          question: "Which question is most likely to produce a useful answer?",
          options: [
            "Is Coral & Co a good company to own?",
            "How has Coral & Co's net margin moved in three years?",
            "What do people think about Coral & Co lately?",
            "Is Coral & Co going to do well this year?",
          ],
          answer: 1,
          explain: "It names a metric and a period, so the answer can be fetched, checked and compared.",
        },
      },
      {
        heading: "Ask for both sides, and ask to be taught",
        body: [
          "Ask for the strongest case against, and for what would have to happen for a view to be wrong — the same discipline as your written case in Level 4.",
          "Ask it to show a calculation step by step: 'show how the P/E of 25 is worked out'. Then check the arithmetic yourself with what you learned in Level 3.",
        ],
      },
      {
        heading: "Questions it should not answer",
        body: [
          "'Should I buy?' and 'What will the price be next week?' have no reliable answer, and the assistant is built not to pretend otherwise.",
          "Rephrase them into questions it can answer: 'What are the main risks and strengths?' and 'What range does the forecast band show for the next week?'",
        ],
      },
    ],
    recap: [
      "Name the metric, the period and the comparison.",
      "Ask for the case against and what would prove you wrong.",
      "Ask for calculations, then check them yourself.",
      "Turn 'should I buy?' into 'what are the risks and strengths?'",
    ],
    finalQuiz: {
      id: "l10-2-final",
      question: "Which rewrite turns 'Should I buy Coral & Co?' into a question the assistant can usefully answer?",
      options: [
        "Should I definitely buy Coral & Co today?",
        "Will Coral & Co's price rise next week?",
        "What are Coral & Co's main risks and strengths?",
        "Is Coral & Co the very best stock to own now?",
      ],
      answer: 2,
      explain:
        "Risks and strengths can be fetched and checked. The other three still ask for a prediction or a personal recommendation.",
    },
  },

  {
    slug: "ai-reading-a-verdict",
    levelId: 10,
    order: 3,
    title: "Reading a Compare verdict",
    goal: "Read Compare's side-by-side figures and its AI verdict, including beta and the confidence score.",
    minutes: 7,
    difficulty: "applied",
    steps: [
      {
        heading: "What Compare shows",
        body: [
          "Compare puts two stocks side by side: P/E, EPS, dividend yield, beta, market cap and 52-week range, with live prices for both.",
          "Beta measures how much a stock has tended to move with the market. A beta of 1.2 means it has typically moved about 1.2% for each 1% market move; 0.6 means about 0.6%. It describes past co-movement, not total risk.",
        ],
        example: {
          company: "coral",
          title: "Coral & Co against Kirana Kart",
          rows: [
            { label: "EPS", value: "Coral ₹9.60 / Kirana ₹4.20" },
            { label: "P/E", value: "Coral 25 / Kirana 25" },
            { label: "Market cap", value: "Coral ₹7,200 cr / Kirana ₹4,200 cr" },
          ],
          note: "Coral's EPS is more than double Kirana's, yet both trade at 25 times earnings. EPS depends on how many shares each has, so it cannot be compared across companies on its own — P/E can.",
        },
        checkpoint: {
          id: "l10-3-c1",
          question: "Coral's EPS is ₹9.60 and Kirana's is ₹4.20. What does that tell you on its own?",
          options: [
            "Coral is more than twice as profitable",
            "Little — EPS depends on each share count",
            "Coral's shares are better value to buy",
            "Kirana's shares are priced too cheaply",
          ],
          answer: 1,
          explain:
            "EPS is profit divided by share count, and the two have different share counts. Comparing P/E or margins is fairer.",
        },
      },
      {
        heading: "The verdict: a lean, reasons and risks",
        body: [
          "Ask for a verdict and the AI weighs the figures on the page, then states a lean with a confidence score, reasons for each side, and risks to watch.",
          "It is grounded in the numbers you can see, but it knows nothing about your portfolio or your tolerance for risk. A lean between two stocks is relative: it says which looks stronger of the pair, not that either is worth owning.",
        ],
      },
      {
        heading: "Reading a confidence score",
        body: [
          "Confidence is best read as a frequency. If a system is well calibrated, a 65% lean should turn out wrong about 35 times in every 100 such calls. A 65% lean that turns out wrong is not a malfunction.",
          "A low score when two stocks are close is honest, not weak.",
        ],
      },
      {
        heading: "Check the question was fair",
        body: [
          "Level 4 showed that choosing the metric can decide the winner. A verdict leaning on P/E and dividend yield tends to favour mature companies over fast-growing ones. Ask what is not on the page before you lean on the result.",
        ],
      },
    ],
    recap: [
      "Compare shows P/E, EPS, dividend yield, beta, market cap and 52-week range.",
      "Beta is past co-movement with the market, not total risk.",
      "A verdict is a relative lean with a confidence score, not advice.",
      "A 65% lean should be wrong about a third of the time.",
    ],
    finalQuiz: {
      id: "l10-3-final",
      question: "Compare leans towards Coral & Co over Kirana Kart with 60% confidence. What does that tell you?",
      options: [
        "Coral is a good stock to buy right now",
        "Of the two, Coral looks somewhat stronger",
        "Coral will outperform Kirana by 60%",
        "Kirana is a weak company to stay away from",
      ],
      answer: 1,
      explain:
        "The verdict is relative and uncertain. It does not say either stock is worth owning, and 60% is far from certain.",
    },
  },
];
