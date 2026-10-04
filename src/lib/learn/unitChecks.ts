import type { Checkpoint } from "./types";

/* The second question of each unit check.

   Two rules govern every option set here, both enforced by
   tools/check-questions.mjs:

   1. The correct answer is NOT the longest option. An earlier version of this
      file had the answer as the longest line in all 27 questions, which meant
      the whole course could be passed by picking the wordiest choice without
      reading a word. Options now sit in a similar length band, and the answer
      is often the shortest.

   2. Distractors are real misconceptions, not filler. Each wrong option is
      something a half-attentive reader would actually believe — a rule
      misapplied, a ratio read backwards, an effect mistaken for its cause.
      That is what makes a question tricky, rather than merely long.

   Difficulty rises with the level: Levels 1-2 have one defensible answer,
   Levels 3-4 usually need a calculation, and Levels 5-7 ask which of several
   true-sounding statements actually answers the question asked. */

export const SECOND_QUESTIONS: Record<string, Checkpoint> = {
  /* ---------------- Level 1 ---------------- */
  "what-a-share-is": {
    id: "l1-1-q2",
    question:
      "A company earns ₹200 cr and owes ₹40 cr of interest. Owners are unhappy with their share. Which statement is impossible?",
    options: [
      "Interest was paid before owners saw anything",
      "Owners received under ₹160 cr once tax was paid",
      "Lenders took a cut because profits disappointed",
      "Owners still hold a vote on certain decisions",
    ],
    answer: 2,
    explain:
      "Lenders hold a fixed claim ranking ahead of owners. Weak profit shrinks what owners get; it does not reduce what lenders are contractually owed.",
  },
  "why-companies-sell-shares": {
    id: "l1-2-q2",
    question:
      "A company doubles its share count and spends the cash on a factory that adds no profit. What happened to existing owners?",
    options: [
      "Nothing — the company owns more than before",
      "They gained, since the business is now larger",
      "Their claim on an unchanged profit halved",
      "They were issued extra shares to compensate",
    ],
    answer: 2,
    explain:
      "Dilution only pays off if the money raised earns more than it cost. Twice the shares against flat profit halves each owner's claim.",
  },
  "how-a-market-sets-a-price": {
    id: "l1-3-q2",
    question:
      "A company beats profit expectations by a wide margin and the price barely moves. The likeliest reason is that investors:",
    options: [
      "have not finished reading the announcement",
      "think the surprise came from something one-off",
      "always ignore good news about company profits",
      "were prevented from trading during the day",
    ],
    answer: 1,
    explain:
      "Prices reflect expected future earnings. A one-off gain beats this year's forecast while changing nothing about the years being priced.",
  },
  "risk-return-tradeoff": {
    id: "l1-4-q2",
    question:
      "An investment alternates +40% and −30% year after year. A friend says the average is +5%, so ₹100 must grow. What is wrong?",
    options: [
      "The arithmetic average has been calculated wrongly",
      "Averages cannot be taken over so few years",
      "Gains and losses compound, so ₹100 shrinks",
      "The returns quoted must have been mislabelled",
    ],
    answer: 2,
    explain:
      "₹100 up 40% is ₹140; down 30% is ₹98. Each pair loses 2% despite a positive simple average — volatility drags compounded outcomes below it.",
  },
  "diversification-plain-terms": {
    id: "l1-5-q2",
    question:
      "In a severe market-wide fall, a diversified portfolio drops almost as far as a concentrated one. Did diversification fail?",
    options: [
      "Yes — it is supposed to prevent all losses",
      "No — market-wide risk was never its job",
      "Yes, unless the portfolio held fifty names",
      "No, because diversified portfolios never fall",
    ],
    answer: 1,
    explain:
      "Spreading removes risk unique to each company. A market-wide fall moves nearly everything together, and no number of extra holdings escapes it.",
  },

  /* ---------------- Level 2 ---------------- */
  "revenue-is-not-profit": {
    id: "l2-1-q2",
    question:
      "Two retailers both report ₹4,000 cr of revenue; one earns ₹40 cr and the other ₹400 cr. What should you check first?",
    options: [
      "Whether they are the same kind of business",
      "Which of the two runs the larger store estate",
      "Which one currently has the higher share price",
      "Which of the two companies was founded earlier",
    ],
    answer: 0,
    explain:
      "A tenfold margin gap usually means different business models — a low-margin grocer against a high-margin specialist. Compare like with like before judging management.",
  },
  "reading-an-income-statement": {
    id: "l2-2-q2",
    question:
      "Revenue rose 10% and gross profit rose 10%, but operating profit fell 15%. Where is the problem?",
    options: [
      "In the direct cost of making the product",
      "In overheads, growing faster than sales",
      "In the interest charged on borrowings",
      "In the rate of tax that the company paid",
    ],
    answer: 1,
    explain:
      "Gross profit keeping pace means product economics are intact. The leak sits between gross and operating profit, which is where overheads live.",
  },
  "what-the-balance-sheet-shows": {
    id: "l2-3-q2",
    question:
      "Company A owes ₹500 cr within eleven months and holds ₹80 cr cash. Company B owes ₹2,000 cr over twelve years and holds ₹300 cr. Who is in more trouble?",
    options: [
      "B, because the total owed is four times larger",
      "A, since a big bill lands before the cash does",
      "Neither — both sit comfortably within limits",
      "B, because its debt per rupee of cash is higher",
    ],
    answer: 1,
    explain:
      "Timing decides survival. Companies fail when a payment falls due before the money arrives, however modest the total looks.",
  },
  "cash-flow-versus-profit": {
    id: "l2-4-q2",
    question:
      "Profit has grown for four years while operating cash flow stayed flat. Which explanation is LEAST worrying?",
    options: [
      "Customers take longer to pay with each passing year",
      "Sales are booked that may never be collected",
      "Stock was built ahead of a planned opening",
      "Reported profit leans more and more on estimates",
    ],
    answer: 2,
    explain:
      "A deliberate, funded, temporary stock build has a purpose and an end date. The other three describe profit drifting away from collectable cash.",
  },

  /* ---------------- Level 3 ---------------- */
  "earnings-per-share": {
    id: "l3-1-q2",
    question:
      "A company earning ₹480 cr on 60 cr shares buys back 10 cr shares, and profit then falls to ₹450 cr. What happened to EPS?",
    options: ["Fell to ₹7.50", "Rose to ₹9.00", "Held at ₹8.00", "Rose to ₹8.50"],
    answer: 1,
    explain:
      "Before: 480 ÷ 60 = ₹8.00. After: 450 ÷ 50 = ₹9.00. EPS rose 12.5% while profit actually fell — which is why the share count must be checked.",
  },
  "price-to-earnings": {
    id: "l3-2-q2",
    question:
      "Two companies both trade on a P/E of 30. One grows earnings 25% a year, the other 4%. What follows?",
    options: [
      "They are equally valued, so equally attractive",
      "The slower grower is priced more demandingly",
      "The faster grower must be the overpriced one",
      "P/E cannot be compared between two companies",
    ],
    answer: 1,
    explain:
      "The same multiple buys very different growth. Thirty times earnings for 4% growth needs that growth to persist far longer to justify the price.",
  },
  "return-on-equity": {
    id: "l3-3-q2",
    question:
      "ROE climbed from 15% to 25% over three years while net profit did not move. What fits those facts?",
    options: [
      "The company got much better at serving customers",
      "Equity shrank, through buybacks or added debt",
      "Revenue grew strongly across the three years",
      "The share price rose over the same period",
    ],
    answer: 1,
    explain:
      "With profit fixed, ROE can only rise if equity falls. That is a balance-sheet change, not an improvement in the operating business.",
  },
  "debt-to-equity": {
    id: "l3-4-q2",
    question:
      "A regulated utility runs debt-to-equity of 1.8; a fashion retailer runs 0.9. Which is likelier to be over-borrowed?",
    options: [
      "The utility, since its ratio is twice as high",
      "The retailer — unpredictable sales, fixed bills",
      "Neither, as both sit inside normal ranges",
      "The utility, since utilities should hold none",
    ],
    answer: 1,
    explain:
      "Safe leverage depends on how stable the cash flow servicing it is. Regulated income supports far more debt than seasonal, taste-driven sales.",
  },
  "margins-where-profit-comes-from": {
    id: "l3-5-q2",
    question:
      "A company has held a 30% gross margin for six years while rivals sit near 18%. What is best supported?",
    options: [
      "Its accounts are probably being misstated",
      "Something stops rivals from copying it",
      "It overcharges and will lose its customers",
      "It must be skimping on product quality",
    ],
    answer: 1,
    explain:
      "Excess margin attracts competition. A gap that survives six years is evidence of a barrier rivals have not been able to cross.",
  },
  "putting-ratios-together": {
    id: "l3-6-q2",
    question:
      "Revenue −6%, EPS +14%, ROE +5 points, debt-to-equity 0.4 → 1.3, free cash flow −22%. What is the honest reading?",
    options: [
      "A strong year: earnings and returns both improved",
      "Borrowing flatters per-share figures as sales shrink",
      "The figures contradict each other and must be wrong",
      "Only the EPS growth matters to a shareholder here",
    ],
    answer: 1,
    explain:
      "Every improved figure has a financial cause and every operating figure worsened. Together they describe leverage disguising decline.",
  },

  /* ---------------- Level 4 ---------------- */
  "comparing-two-companies": {
    id: "l4-1-q2",
    question:
      "You rank a software firm against a grocer on net margin, ROE and cash conversion. Software wins all three. What did you measure?",
    options: [
      "That the software firm is the better managed one",
      "Mostly the gap between two business models",
      "That the grocer is a company best avoided",
      "That software shares will outperform from here",
    ],
    answer: 1,
    explain:
      "All three metrics structurally favour asset-light subscription businesses. The comparison graded the industry, not the companies in it.",
  },
  "evidence-checklist": {
    id: "l4-2-q2",
    question:
      "Your checklist reads: 'Management seems capable and the industry looks promising.' What is wrong with that entry?",
    options: [
      "It is far too short to be of any real use",
      "Neither claim is sourced or checkable",
      "Management quality is irrelevant to investing",
      "Industry conditions cannot be assessed at all",
    ],
    answer: 1,
    explain:
      "The checklist exists to separate verified fact from assumption. An unsourced impression written into the evidence column defeats the exercise.",
  },
  "writing-your-investment-case": {
    id: "l4-3-q2",
    question:
      "Two years on, a holding is up 30% but margins fell below the level you named as your reversal condition. What does a disciplined review say?",
    options: [
      "The gain shows the original case was right",
      "The case failed on its own stated terms",
      "The reversal condition should be revised upward",
      "Nothing needs saying while you are in profit",
    ],
    answer: 1,
    explain:
      "The case was falsified on the condition you set. A profit arriving for unforeseen reasons is luck, and calling it vindication teaches you to ignore your own rules.",
  },

  /* ---------------- Level 5 ---------------- */
  "position-sizing": {
    id: "l5-1-q2",
    question:
      "You hold twelve positions. The largest three are 22%, 19% and 17% — and all three sit in one sector. Which is most accurate?",
    options: [
      "The portfolio is diversified: it holds twelve names",
      "Most of the outcome rides on a single industry",
      "It is fine while no single position passes 25%",
      "The other nine positions provide enough cover",
    ],
    answer: 1,
    explain:
      "Neither the count nor a per-position cap captures the real exposure. Concentration is the joint effect of size and shared dependency.",
  },
  "spreading-risk-across-sectors": {
    id: "l5-2-q2",
    question: "Which portfolio is least diversified, despite how it looks?",
    options: [
      "Four names: a bank, a software firm, a grocer, a miner",
      "Fifteen names, all selling discretionary goods",
      "Six companies spread across five different sectors",
      "Eight firms with different customers and cost bases",
    ],
    answer: 1,
    explain:
      "Fifteen names sharing one dependency behave as a single bet. Fewer, genuinely different businesses spread risk far more effectively.",
  },
  "rebalancing-without-overtrading": {
    id: "l5-3-q2",
    question:
      "An investor rebalances monthly, paying costs each time, arguing it keeps risk tightly controlled. The strongest objection is:",
    options: [
      "Rebalancing does not control risk in any way",
      "The gain over an annual rule is small; costs are not",
      "Monthly rebalancing is not actually permitted",
      "Risk is not something worth controlling at all",
    ],
    answer: 1,
    explain:
      "The benefit curve flattens quickly while costs accumulate steadily. Frequent rebalancing spends real money for a marginal reduction in drift.",
  },

  /* ---------------- Level 6 ---------------- */
  "what-a-drawdown-feels-like": {
    id: "l6-1-q2",
    question:
      "Portfolio A falls 40% then gains 40%. Portfolio B falls 15% then gains 15%. Where do they end up?",
    options: [
      "Both are exactly back where they started",
      "A is down about 16%, B down about 2%",
      "A is ahead, since its swings were larger",
      "Both finish ahead, as gains followed losses",
    ],
    answer: 1,
    explain:
      "₹100 → ₹60 → ₹84 is −16%. ₹100 → ₹85 → ₹97.75 is −2.25%. Equal percentage moves never return you to the start, and the gap widens with depth.",
  },
  "reacting-to-a-surprise": {
    id: "l6-2-q2",
    question:
      "Which announcement should most change a long-term valuation, even if the price barely reacts on the day?",
    options: [
      "A one-off settlement costing a year of profit",
      "A quarterly result missing forecasts by 3%",
      "A shift making the main product unnecessary",
      "A temporary shutdown that insurance covers",
    ],
    answer: 2,
    explain:
      "The others affect one or two periods. Only obsolescence reduces the cash the business can generate indefinitely, which is what long-term value rests on.",
  },
  "volatility-versus-permanent-loss": {
    id: "l6-3-q2",
    question: "Which of these is a permanent loss rather than volatility?",
    options: [
      "A holding down 35% that performs as expected",
      "A firm whose earning power will not return",
      "A portfolio down 20% in a broad decline",
      "A holding that has been sideways for two years",
    ],
    answer: 1,
    explain:
      "Only destroyed earning power is permanent. The others describe price movement, which reverses if the underlying businesses keep performing.",
  },

  /* ---------------- Level 7 ---------------- */
  "defending-a-decision": {
    id: "l7-1-q2",
    question: "What best shows that you genuinely understand a position you hold?",
    options: [
      "You can list many reasons the company will succeed",
      "You can state the case against it fairly",
      "You have held the position for several years",
      "Investors you respect hold the same position",
    ],
    answer: 1,
    explain:
      "Collecting supporting reasons mostly measures effort spent confirming yourself. Representing the opposing case fairly requires actually engaging with it.",
  },
  "reviewing-your-mistakes": {
    id: "l7-2-q2",
    question:
      "Across twenty reviewed decisions: 12 good outcomes, 8 poor — and in six of the eight, the loss came from a risk you wrote down and accepted. What does that show?",
    options: [
      "The research process is failing and needs replacing",
      "The analysis worked; sizing is the open question",
      "Writing risks down is not worth continuing with",
      "Eight losses out of twenty is simply unacceptable",
    ],
    answer: 1,
    explain:
      "Losses from risks you named in advance are evidence the analysis worked. What is improvable is position sizing and whether the return justified those risks.",
  },
  "improving-your-process": {
    id: "l7-3-q2",
    question:
      "After a poor year an investor changes six rules at once, and the next year is better. What can they conclude?",
    options: [
      "That all six of the changes were improvements",
      "Little — six changes, one noisy year, no signal",
      "That the process has now reached its optimum",
      "That every one of the previous rules was wrong",
    ],
    answer: 1,
    explain:
      "One year is a small sample and six simultaneous changes are confounded. Changing one thing at a time is what makes any effect readable.",
  },

  /* ---------------- Course: The Quant Engine ---------------- */
  "quant-price-history-as-data": {
    id: "l8-1-q2",
    question:
      "Two people run the same indicator on the same price history and get different values. What does that tell you?",
    options: [
      "Indicators are a matter of opinion and judgement",
      "One used different inputs or made an error",
      "The market moved between the two calculations",
      "One of them must have used AI to compute it",
    ],
    answer: 1,
    explain:
      "The engine's calculations are deterministic: the same history always gives the same number. A difference means different inputs or a mistake.",
  },
  "quant-moving-averages-macd": {
    id: "l8-2-q2",
    question:
      "Five closes: ₹100, ₹104, ₹96, ₹110, ₹90. The 5-day SMA is ₹100 — the same as for five flat closes of ₹100. What does the average hide?",
    options: [
      "What the average price over the days was",
      "How far prices swung around it",
      "How many days went into the calculation",
      "Which stock the prices belong to",
    ],
    answer: 1,
    explain:
      "An average says where prices centred, not how much they moved. A ₹20 swing and a flat line can share the same SMA — which is why volatility is measured separately.",
  },
  "quant-rsi-bollinger-levels": {
    id: "l8-3-q2",
    question:
      "Over 14 days the average gain on up days is ₹4 and the average loss on down days is ₹1. What is the RSI?",
    options: ["75", "80", "20", "400"],
    answer: 1,
    explain: "RS = 4 ÷ 1 = 4, so RSI = 100 − 100 ÷ (1 + 4) = 100 − 20 = 80.",
  },
  "quant-regimes-volatility": {
    id: "l8-4-q2",
    question:
      "Yesterday's volatility was 2% and yesterday's return was 0%. With λ = 0.94, roughly what is today's EWMA volatility?",
    options: ["About 1.88%", "About 1.94%", "Exactly 2%", "About 2.12%"],
    answer: 1,
    explain:
      "Work in variance: 2% squared is 4, and 0.94 × 4 + 0.06 × 0 = 3.76. The square root is about 1.94%. Multiplying the volatility itself by 0.94 (giving 1.88%) skips the squaring.",
  },
  "quant-forecast-band": {
    id: "l8-5-q2",
    question:
      "Over 100 weeks, a model's 95% band missed the actual price 14 times. What does that suggest?",
    options: [
      "About right — some misses are expected",
      "The band was too narrow and understated risk",
      "The model is too cautious and should narrow",
      "Fourteen misses prove forecasts are useless",
    ],
    answer: 1,
    explain:
      "A 95% band should miss about 5 times in 100. Fourteen misses means outcomes strayed outside far more often than claimed — the band understated the uncertainty.",
  },
  "quant-testing-forecasts": {
    id: "l8-6-q2",
    question:
      "Model A has an RMSE of ₹4.0 and 52% directional accuracy. The random walk's RMSE is ₹3.8. Under the rule in this lesson, should A get weight in the ensemble?",
    options: [
      "Yes — 52% is better than a coin flip",
      "No — it does not beat the random walk",
      "Yes — every extra model adds diversity",
      "Only if its MAPE comes in under 5%",
    ],
    answer: 1,
    explain:
      "A model earns weight only by beating the baseline. Larger errors than 'tomorrow equals today' mean it adds nothing, whatever its directional score.",
  },

  /* ---------------- Course: Deep Research ---------------- */
  "research-numbers-first": {
    id: "l9-1-q2",
    question:
      "A report's numbers are all traced. Which sentence in it needs your own judgement most?",
    options: [
      "Net margin was 5% last year",
      "Debt-to-equity stands at 1.4",
      "Margins will likely recover soon",
      "Revenue was ₹6,500 cr last year",
    ],
    answer: 2,
    explain:
      "The other three are figures the pipeline traced. A claim about where margins are heading is interpretation, and nothing traced it.",
  },
  "research-specialist-analysts": {
    id: "l9-2-q2",
    question:
      "Lumen Labs trades at ₹720 with EPS of ₹18. A valuation analyst flags its P/E. What is it, and what does it alone tell you?",
    options: [
      "40 — the market expects strong growth",
      "40 — it is overpriced and so will fall",
      "18 — earnings are low for a software firm",
      "4 — the price is low relative to profit",
    ],
    answer: 0,
    explain:
      "₹720 ÷ ₹18 = 40. Level 3 showed that a high P/E states the market's growth expectations — it is not, by itself, a verdict that the price will fall.",
  },
  "research-bull-bear-debate": {
    id: "l9-3-q2",
    question: "Which bear argument about Ironvale Works carries the most weight, given its figures?",
    options: [
      "Its share price is lower than Lumen Labs'",
      "It sells heavy equipment, which is unfashionable",
      "Thin margins plus heavy debt leave little room",
      "It has more shares than most of its peers do",
    ],
    answer: 2,
    explain:
      "A 5% margin with debt-to-equity of 1.4 is a real fragility. Share price level, share count and fashion say nothing about the business.",
  },
  "research-moderator": {
    id: "l9-4-q2",
    question: "Which part of a moderator summary is most useful for writing your own reversal conditions?",
    options: [
      "The overall lean it states at the top",
      "Points it marks as unresolved, and why",
      "The number of arguments each side made",
      "How confident the bull analyst sounded",
    ],
    answer: 1,
    explain:
      "Unresolved points are exactly the uncertainties that could prove a view wrong — the raw material for 'I would reconsider if…'.",
  },
  "research-checking-the-report": {
    id: "l9-5-q2",
    question:
      "Coral & Co has ₹288 cr of profit and ₹250 cr of free cash flow. A report says 'profits are fully backed by cash'. How should you mark it?",
    options: [
      "Accurate — cash covers all of the profit",
      "Overstated — about 87% is backed by cash",
      "Understated — cash is higher than profit",
      "Irrelevant — cash flow does not matter",
    ],
    answer: 1,
    explain: "₹250 ÷ ₹288 ≈ 87%. Most of the profit is backed by cash, but not all of it.",
  },

  /* ---------------- Course: Ask AI & Compare ---------------- */
  "ai-grounded-assistant": {
    id: "l10-1-q2",
    question: "In an AI answer about a stock, which of these should make you most suspicious?",
    options: [
      "A note that a figure could not be retrieved",
      "A precise number with no source you can find",
      "A refusal to say whether you should buy",
      "A note that a company is outside coverage",
    ],
    answer: 1,
    explain:
      "The other three are a grounded assistant behaving correctly. A precise figure you cannot trace is exactly what grounding exists to prevent.",
  },
  "ai-asking-good-questions": {
    id: "l10-2-q2",
    question: "Which question best tests whether your own view could be wrong?",
    options: [
      "Why is this company a strong investment?",
      "What evidence would contradict my view?",
      "Which analysts agree with what I think?",
      "How much has the price risen this year?",
    ],
    answer: 1,
    explain:
      "Only this one asks for disconfirming evidence. The others invite reasons to keep believing what you already believe.",
  },
  "ai-reading-a-verdict": {
    id: "l10-3-q2",
    question:
      "Stock A has a beta of 1.5. The market falls 4% in a day. Based on beta alone, roughly what move would you expect from A?",
    options: ["A fall of about 6%", "A fall of about 4%", "A fall of about 2.7%", "A rise of about 6%"],
    answer: 0,
    explain: "Beta 1.5 means it has tended to move 1.5 times the market: 1.5 × −4% = −6%.",
  },
};
