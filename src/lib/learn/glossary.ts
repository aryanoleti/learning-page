import type { GlossaryTerm } from "./types";

/* Reference area. Definitions are written to be understandable on their own,
   without needing the lesson first — and every term links back to where the
   course teaches it properly. */

export const GLOSSARY: GlossaryTerm[] = [
  {
    term: "P/E ratio",
    short: "What you pay for ₹1 of a company's annual earnings.",
    long:
      "Share price divided by earnings per share. A P/E of 20 means you are paying ₹20 for each ₹1 the company currently earns per share each year. A high P/E is not a verdict that something is expensive — it is a statement that the market expects earnings to grow. A low one often means the market expects them to fall.",
    formula: "P/E = share price ÷ earnings per share",
    example: "Ironvale Works: ₹130 ÷ ₹6.50 = 20",
    seeAlso: ["price-to-earnings", "earnings-per-share"],
  },
  {
    term: "EPS",
    short: "A company's profit divided by the number of shares.",
    long:
      "Earnings per share converts total profit into a per-share figure, which is the only form that can be compared against a share price. It can rise for two very different reasons: the company earned more, or the share count fell through a buyback. Always check which.",
    formula: "EPS = net profit ÷ shares outstanding",
    example: "Lumen Labs: ₹360 cr ÷ 20 cr shares = ₹18.00",
    seeAlso: ["earnings-per-share"],
  },
  {
    term: "ROE",
    short: "Profit generated per rupee of owners' money.",
    long:
      "Return on equity measures how efficiently a business turns shareholder capital into profit. Sustained high ROE suggests a real advantage, because a company earning 25% on equity can fund its own growth. Read it alongside debt: borrowing shrinks equity and lifts ROE without the business improving at all.",
    formula: "ROE = net profit ÷ shareholders' equity",
    example: "Coral & Co: ₹288 cr ÷ ₹1,100 cr = 26%",
    seeAlso: ["return-on-equity", "debt-to-equity"],
  },
  {
    term: "Debt-to-equity",
    short: "How much a company borrowed against what owners put in.",
    long:
      "Compares money that must be repaid with money that never has to be. Around 0.5 is conservative; above 2.0 deserves close attention. What matters more than the ratio is whether earnings comfortably cover the interest, and how stable those earnings are.",
    formula: "D/E = total debt ÷ shareholders' equity",
    example: "Ironvale Works: ₹2,800 cr ÷ ₹2,000 cr = 1.4",
    seeAlso: ["debt-to-equity"],
  },
  {
    term: "Free cash flow",
    short: "Cash left after running the business and maintaining it.",
    long:
      "Operating cash flow minus the spending on equipment and facilities needed to keep going. It is what is genuinely available to repay debt, pay dividends or reinvest. Because it deals in money that actually moved, it is much harder to flatter than reported profit.",
    formula: "FCF = operating cash flow − capital expenditure",
    example: "Lumen Labs generates ₹390 cr against ₹360 cr of profit — full conversion",
    seeAlso: ["cash-flow-versus-profit"],
  },
  {
    term: "Diversification",
    short: "Spreading money so no single failure can ruin you.",
    long:
      "Holding investments that fail for different reasons. It cannot protect you from a market-wide fall, but it turns a company-specific disaster from a portfolio-ending event into a bad week. What matters is that holdings respond differently to the same shock, not simply that there are many of them.",
    example: "A 50% collapse in one of twenty holdings costs the portfolio 2.5%",
    seeAlso: ["diversification-plain-terms", "spreading-risk-across-sectors"],
  },
  {
    term: "Volatility",
    short: "How much a price moves around, in both directions.",
    long:
      "A measure of movement, not of danger. Volatility is only a problem if it causes you to sell at the bottom, or if you need the money at a moment when the price is low. A holding that falls 30% and recovers has cost a patient owner nothing but discomfort.",
    example: "Two investments can share an average return while one swings far more wildly",
    seeAlso: ["volatility-versus-permanent-loss", "risk-return-tradeoff"],
  },
  {
    term: "Drawdown",
    short: "The fall from a peak to the lowest point after it.",
    long:
      "Measured as a percentage from the highest value reached. Recovery is not symmetric: a 50% drawdown requires a 100% gain to get back to where it started. This asymmetry is why limiting severe falls matters more than capturing every rise.",
    formula: "Drawdown = (trough − peak) ÷ peak",
    example: "₹100 falling to ₹50 is a 50% drawdown and needs a doubling to recover",
    seeAlso: ["what-a-drawdown-feels-like"],
  },
  {
    term: "Moving average",
    short: "The average of the last N closing prices, updated daily.",
    long:
      "Smooths out daily jumps so the direction of the price is easier to see. A simple moving average weights every day equally; an exponential one leans on recent days and reacts faster. Longer windows are smoother but turn later.",
    formula: "SMA = sum of last N closes ÷ N",
    example: "Coral & Co closes ₹236–₹244 over five days: 5-day SMA = ₹240",
    seeAlso: ["quant-moving-averages-macd"],
  },
  {
    term: "RSI",
    short: "A 0–100 gauge of recent gains against recent losses.",
    long:
      "The Relative Strength Index compares the average gain on up days with the average loss on down days, usually over 14 days. Above 70 is called overbought and below 30 oversold, but those labels describe pace, not what happens next.",
    formula: "RSI = 100 − 100 ÷ (1 + average gain ÷ average loss)",
    example: "Average gain ₹6, average loss ₹2: RS = 3, RSI = 75",
    seeAlso: ["quant-rsi-bollinger-levels"],
  },
  {
    term: "Confidence band",
    short: "The range a forecast expects the price to stay within.",
    long:
      "A 95% band means that, if the model's assumptions hold, about 19 in 20 outcomes should fall inside it. It widens the further ahead you look. The band usually carries more information than the central forecast line.",
    example: "Kirana Kart: central path ₹107, 95% band ₹97 to ₹117",
    seeAlso: ["quant-forecast-band"],
  },
  {
    term: "Walk-forward validation",
    short: "Testing a forecast only on data it has not yet seen.",
    long:
      "Fit on data up to one day, forecast the next, record the error, then step forward and repeat. Every forecast uses only what was known at the time, which avoids look-ahead bias. Models are compared against a random-walk baseline that assumes tomorrow equals today.",
    seeAlso: ["quant-testing-forecasts"],
  },
  {
    term: "EWMA volatility",
    short: "A volatility estimate that weights recent days more.",
    long:
      "Each day the variance estimate is updated from yesterday's estimate and yesterday's squared return, so a large move raises it at once and calm days let it decay. A common weighting is λ = 0.94.",
    formula: "variance = λ × previous variance + (1 − λ) × return²",
    example: "Meridian Bank: 1.5% volatility and a 3% day give about 1.63%",
    seeAlso: ["quant-regimes-volatility"],
  },
  {
    term: "Beta",
    short: "How much a stock has tended to move with the market.",
    long:
      "A beta of 1.2 means the stock has typically moved about 1.2% for each 1% move in the market. It describes past co-movement, not total risk: a stock can have low beta and still be very volatile for its own reasons.",
    example: "Beta 1.5 and a 4% market fall: about −6%",
    seeAlso: ["ai-reading-a-verdict"],
  },
  {
    term: "Bull and bear case",
    short: "The strongest argument for a stock, and the strongest against.",
    long:
      "Writing both forces the inconvenient evidence into the open. When both sides interpret the same figure differently, that figure is usually the real question to research.",
    seeAlso: ["research-bull-bear-debate", "defending-a-decision"],
  },
];
