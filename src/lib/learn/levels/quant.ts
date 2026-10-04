import type { Lesson } from "../types";

/* Course — The Quant Engine.
   Follows what InvestSense's Quant Engine actually does: deterministic
   features computed from price history, the standard indicators, a regime
   label and EWMA volatility, an ensemble 7-day forecast with a 95% band, and
   walk-forward validation against a random-walk baseline. The price series
   below are invented, like every other figure in the course. */

export const QUANT_LESSONS: Lesson[] = [
  {
    slug: "quant-price-history-as-data",
    levelId: 8,
    order: 1,
    title: "Price history as data",
    goal: "Explain what the Quant Engine reads, why it works in returns, and what a 'feature' is.",
    minutes: 7,
    difficulty: "intro",
    steps: [
      {
        heading: "The engine only sees prices",
        body: [
          "The Quant Engine works from one input: a stock's price history. It does not read annual reports, news or anyone's opinion, and no AI is involved in it at all.",
          "That narrow diet is a strength and a limit. Everything it reports can be checked against the same history — but nothing it reports knows about a results announcement next week.",
        ],
      },
      {
        heading: "Returns, not prices",
        body: [
          "A ₹10 rise means very different things for a ₹105 share and a ₹720 share. So the engine's first step is to turn prices into returns: the percentage change from one close to the next.",
          "Daily return = (today's close − yesterday's close) ÷ yesterday's close. Returns put every stock on the same scale, which is what lets one set of calculations run across the whole market.",
        ],
        example: {
          company: "lumen",
          title: "Four closes of Lumen Labs, turned into returns",
          rows: [
            { label: "Day 1 → Day 2", value: "₹700 → ₹714 = +2.0%" },
            { label: "Day 2 → Day 3", value: "₹714 → ₹707 = −1.0%" },
            { label: "Day 3 → Day 4", value: "₹707 → ₹721 = +2.0%" },
            { label: "For scale", value: "₹10 on Kirana Kart (₹105) = 9.5%" },
          ],
          note: "The same ₹10 is a 1.4% move for Lumen Labs and a 9.5% move for Kirana Kart. Only returns make the two comparable.",
        },
        checkpoint: {
          id: "l8-1-c1",
          question: "Why does the Quant Engine convert prices into returns before doing anything else?",
          options: [
            "Returns are easier for a computer to store",
            "Returns put stocks of any price level on one scale",
            "Prices are not published for most stocks",
            "Returns remove the effect of bad news",
          ],
          answer: 1,
          explain:
            "A rupee move only means something relative to the price it started from. Returns express every move as a percentage, so a ₹105 share and a ₹720 share can be analysed the same way.",
        },
      },
      {
        heading: "Features: questions asked of the history",
        body: [
          "A feature is a single number computed from the price history. How much did the price rise over 20 days? How widely did daily returns swing? How far is today's price from its 50-day average? How many of the last ten days closed up?",
          "InvestSense computes roughly 120 of these. Each one describes the past. None of them, on its own, is a prediction — they are the raw material the forecasting models are built from.",
        ],
        checkpoint: {
          id: "l8-1-c2",
          question: "Which of these is a 'feature' in the Quant Engine's sense?",
          options: [
            "An analyst's opinion of the company's management",
            "The average daily return over the last 20 days",
            "A news headline about the company's results",
            "The company's plan to open new factories",
          ],
          answer: 1,
          explain:
            "A feature is a number calculated from the price history. Opinions, headlines and plans are not in the engine's input at all.",
        },
      },
      {
        heading: "Deterministic means checkable",
        body: [
          "Run the same calculation on the same history and you get the same number, every time. If two people disagree about a stock's 14-day RSI, one of them has made an arithmetic mistake — it is not a matter of interpretation.",
          "That is different from being right about the future. A deterministic number is a faithful description of what already happened. Whether the past says anything useful about the next week is a separate question, and the rest of this course is about how to answer it honestly.",
        ],
      },
    ],
    recap: [
      "The Quant Engine reads price history only — no news, no accounts, no AI.",
      "It works in returns so stocks at any price can be compared.",
      "A feature is one number describing the past; InvestSense computes about 120.",
      "Deterministic means reproducible, not prophetic.",
    ],
    finalQuiz: {
      id: "l8-1-final",
      question: "Kirana Kart and Lumen Labs each rise by ₹10 on the same day. Which statement is right?",
      options: [
        "Both moved by the same amount in percentage terms",
        "As a return, Kirana's move was far larger",
        "Lumen's move was larger, as its price is higher",
        "The engine would treat both moves as identical",
      ],
      answer: 1,
      explain:
        "₹10 is 9.5% of Kirana Kart's ₹105 but only about 1.4% of Lumen Labs' ₹720. Measured as returns, Kirana moved almost seven times as much.",
    },
  },

  {
    slug: "quant-moving-averages-macd",
    levelId: 8,
    order: 2,
    title: "Trend: moving averages and MACD",
    goal: "Calculate a moving average, explain the lag trade-off, and read a MACD value.",
    minutes: 8,
    difficulty: "core",
    steps: [
      {
        heading: "A moving average smooths the noise",
        body: [
          "A simple moving average (SMA) is the average of the last N closing prices. Tomorrow the oldest close drops out and the newest comes in, so the average moves along with the price.",
          "Daily prices jump around. The average irons out those jumps so the underlying direction is easier to see.",
        ],
        example: {
          company: "coral",
          title: "A 5-day SMA for Coral & Co",
          rows: [
            { label: "Last five closes", value: "₹236, ₹238, ₹240, ₹242, ₹244" },
            { label: "Sum", value: "₹1,200" },
            { label: "5-day SMA", value: "₹1,200 ÷ 5 = ₹240" },
            { label: "Latest close", value: "₹244 — above its average" },
          ],
          note: "A close above its own average simply says recent prices are higher than slightly older ones. It describes the last five days; it does not promise a sixth.",
        },
      },
      {
        heading: "Simple versus exponential",
        body: [
          "An exponential moving average (EMA) gives more weight to recent closes. Each day: EMA = today's price × k + yesterday's EMA × (1 − k), where k = 2 ÷ (N + 1). For a 10-day EMA, k is about 0.18.",
          "That makes an EMA react faster than an SMA of the same length — and also makes it easier to fool with one unusual day. Every average faces this trade-off: longer windows are smoother but turn later.",
        ],
        checkpoint: {
          id: "l8-2-c1",
          question: "Why does a 200-day average turn later than a 20-day average?",
          options: [
            "It is calculated less often than a short average",
            "Each new price is a smaller share of a longer average",
            "Long averages ignore the most recent prices",
            "It only uses prices from the previous year",
          ],
          answer: 1,
          explain:
            "One new close is 1/20th of a 20-day average but only 1/200th of a 200-day one. It takes many more new prices to move the longer average.",
        },
      },
      {
        heading: "Crossovers, and what they do not mean",
        body: [
          "When a short average crosses above a long one, recent prices have risen above older prices. Charting tools give these events names, but the names add nothing to that description.",
          "In a market drifting sideways, averages cross back and forth again and again. Each crossing looks like a signal at the time and turns out to be noise — this is called a whipsaw.",
        ],
      },
      {
        heading: "MACD: two averages compared",
        body: [
          "MACD is the 12-day EMA minus the 26-day EMA. Positive means the short-term trend sits above the longer one; negative means below.",
          "Two more pieces sit on top: the signal line (a 9-day EMA of MACD itself) and the histogram (MACD minus the signal line). A growing histogram means the gap between the two trends is widening.",
          "MACD is in rupees, not percent, so a MACD of +3 on a ₹130 share and +3 on a ₹720 share are not the same size of move.",
        ],
        example: {
          company: "ironvale",
          title: "Reading MACD for Ironvale Works",
          rows: [
            { label: "12-day EMA", value: "₹132" },
            { label: "26-day EMA", value: "₹129" },
            { label: "MACD", value: "₹132 − ₹129 = +₹3" },
            { label: "Signal line", value: "+₹2, so the histogram is +₹1" },
          ],
          note: "The short-term trend is above the longer one, and the gap is growing. That is a description of the last few weeks, not a forecast of the next.",
        },
        checkpoint: {
          id: "l8-2-c2",
          question: "A stock's 12-day EMA is ₹250 and its 26-day EMA is ₹254. What is its MACD?",
          options: ["Minus ₹4", "Plus ₹4", "₹252", "₹504"],
          answer: 0,
          explain: "MACD is the short EMA minus the long EMA: 250 − 254 = −₹4. The short-term trend is below the longer one.",
        },
      },
    ],
    recap: [
      "An SMA averages the last N closes; an EMA leans on the recent ones.",
      "Longer averages are smoother and slower — that trade-off never goes away.",
      "Crossovers describe what happened; in sideways markets they whipsaw.",
      "MACD = 12-day EMA − 26-day EMA, measured in rupees.",
    ],
    finalQuiz: {
      id: "l8-2-final",
      question:
        "A stock moved sideways for three months and its 10-day and 30-day averages crossed six times. What is the best reading?",
      options: [
        "A strong trend is building in one direction",
        "The crossings are mostly noise in a range",
        "Six separate buy signals have been confirmed",
        "The averages must have been calculated wrongly",
      ],
      answer: 1,
      explain:
        "Repeated crossings in a flat market are the whipsaw pattern. They reflect small swings around a level, not a trend.",
    },
  },

  {
    slug: "quant-rsi-bollinger-levels",
    levelId: 8,
    order: 3,
    title: "Momentum and range: RSI, Bollinger Bands, support and resistance",
    goal: "Calculate an RSI, read Bollinger Bands, and treat support and resistance as zones from the past.",
    minutes: 9,
    difficulty: "core",
    steps: [
      {
        heading: "RSI: are recent gains outweighing losses?",
        body: [
          "The Relative Strength Index compares the average gain on up days with the average loss on down days, usually over 14 days. RS = average gain ÷ average loss, and RSI = 100 − 100 ÷ (1 + RS). The result always sits between 0 and 100.",
          "Readings above 70 are conventionally labelled 'overbought' and below 30 'oversold'. Those labels describe the recent pace of moves. They say nothing reliable about what comes next — in a strong trend, RSI can stay above 70 for weeks.",
        ],
        example: {
          company: "lumen",
          title: "RSI for Lumen Labs",
          rows: [
            { label: "Average gain, up days", value: "₹6" },
            { label: "Average loss, down days", value: "₹2" },
            { label: "RS", value: "6 ÷ 2 = 3" },
            { label: "RSI", value: "100 − 100 ÷ 4 = 75" },
          ],
          note: "Gains have been three times the size of losses, so RSI is high. That is a fact about the last 14 days, not a verdict on the price.",
        },
        checkpoint: {
          id: "l8-3-c1",
          question: "If the average gain equals the average loss, what is the RSI?",
          options: ["50", "100", "0", "70"],
          answer: 0,
          explain: "RS = 1, so RSI = 100 − 100 ÷ 2 = 50 — exactly balanced between buying and selling pressure.",
        },
      },
      {
        heading: "Bollinger Bands: a volatility envelope",
        body: [
          "The middle band is the 20-day SMA. The upper and lower bands sit two standard deviations of the last 20 closes above and below it.",
          "When prices swing more, the bands widen; when the market is calm, they narrow. A price at the upper band is unusually high compared with its recent range — which is not the same as being due to fall.",
        ],
        example: {
          company: "ironvale",
          title: "Bands for Ironvale Works",
          rows: [
            { label: "20-day SMA", value: "₹130" },
            { label: "Standard deviation", value: "₹3" },
            { label: "Upper band", value: "₹130 + 2 × ₹3 = ₹136" },
            { label: "Lower band", value: "₹130 − 2 × ₹3 = ₹124" },
          ],
          note: "If the standard deviation doubled to ₹6, the bands would stretch to ₹118–₹142. The width is the volatility, drawn on the chart.",
        },
        checkpoint: {
          id: "l8-3-c2",
          question: "What does it mean when Bollinger Bands narrow sharply?",
          options: [
            "The price is certain to break upwards soon",
            "Recent prices have been swinging less",
            "The 20-day average has stopped updating",
            "Trading in the stock has been suspended",
          ],
          answer: 1,
          explain:
            "Band width is two standard deviations either side, so narrow bands mean small recent swings. They say nothing about which direction the next big move will take.",
        },
      },
      {
        heading: "Support and resistance are zones, not lines",
        body: [
          "Support is a price area where falls have stopped before; resistance is an area where rises have stalled. They are drawn from history, which is why the Quant Engine can compute them.",
          "Treat them as zones a few rupees wide, because prices rarely turn at exactly the same figure twice. When price breaks decisively through a level, old resistance often gets relabelled as support. These are summaries of where the price turned before — they do not bind the future.",
        ],
      },
    ],
    recap: [
      "RSI = 100 − 100 ÷ (1 + average gain ÷ average loss), always 0 to 100.",
      "'Overbought' and 'oversold' describe pace, not what happens next.",
      "Bollinger Bands are the 20-day average ± two standard deviations.",
      "Support and resistance are zones taken from the past.",
    ],
    finalQuiz: {
      id: "l8-3-final",
      question:
        "A stock's RSI has been above 70 for four weeks while the price keeps rising. What does this most likely show?",
      options: [
        "A fall is now overdue and about to begin",
        "Gains have outpaced losses for a long time",
        "The indicator has malfunctioned for this stock",
        "The stock is now officially overvalued",
      ],
      answer: 1,
      explain:
        "RSI measures the balance of recent gains and losses. Staying high in a rising market is exactly what it should do in a strong trend.",
    },
  },

  {
    slug: "quant-regimes-volatility",
    levelId: 8,
    order: 4,
    title: "Regimes and EWMA volatility",
    goal: "Read the engine's regime label correctly and calculate an EWMA volatility update.",
    minutes: 8,
    difficulty: "applied",
    steps: [
      {
        heading: "Markets change character",
        body: [
          "The Quant Engine classifies a stock's current regime as one of three: trending-bull (rising steadily), trending-bear (falling steadily) or mean-reverting (moving back and forth around a level).",
          "The label matters because indicators behave differently in each. In a range, a high RSI often fades back. In a trend it can stay high for weeks, and moving-average crossovers that work in a trend whipsaw in a range.",
        ],
      },
      {
        heading: "A regime label describes the recent past",
        body: [
          "The label comes from recent behaviour. It can change without warning, and the switch is only visible after it has happened.",
          "So read it as context for the other numbers on the page — 'this is the kind of market these indicators were measured in' — rather than as a forecast that the trend will continue.",
        ],
        checkpoint: {
          id: "l8-4-c1",
          question: "The engine labels a stock 'trending-bull'. What does that tell you?",
          options: [
            "The price will keep rising for the next month",
            "Recent prices have mostly risen steadily",
            "Professional investors are buying the stock",
            "The company's profits are growing fast",
          ],
          answer: 1,
          explain:
            "The regime is classified from the price history, so it describes the recent past. It is not a forecast and knows nothing about profits or who is buying.",
        },
      },
      {
        heading: "Volatility as a number",
        body: [
          "Volatility is the standard deviation of daily returns — roughly, the size of a typical day's move. A daily volatility of 1.5% means most days move by less than about 1.5% either way.",
          "To compare it with yearly figures, multiply by the square root of the number of trading days, about 252: 1.5% × 15.9 ≈ 24% a year.",
        ],
      },
      {
        heading: "EWMA: recent days count more",
        body: [
          "An ordinary standard deviation weights a day from three months ago the same as yesterday. EWMA volatility (exponentially weighted moving average) lets recent days count more, so it reacts quickly when markets get rough.",
          "Each day: new variance = λ × yesterday's variance + (1 − λ) × yesterday's squared return. A common choice is λ = 0.94. Variance is volatility squared, so you square going in and take the square root coming out.",
        ],
        example: {
          company: "meridian",
          title: "One EWMA update for Meridian Bank",
          rows: [
            { label: "Yesterday's volatility", value: "1.5% → variance 2.25" },
            { label: "Yesterday's return", value: "3% → squared 9" },
            { label: "New variance", value: "0.94 × 2.25 + 0.06 × 9 = 2.655" },
            { label: "New volatility", value: "√2.655 ≈ 1.63%" },
          ],
          note: "One 3% day lifted the estimate from 1.5% to about 1.63% straight away. A run of calm days would let it decay back down.",
        },
        checkpoint: {
          id: "l8-4-c2",
          question: "What happens to EWMA volatility after one very large daily move?",
          options: [
            "Nothing until the move shows up in a monthly average",
            "It rises at once, then fades over calm days",
            "It falls, because large moves tend to reverse",
            "It is reset to zero and recalculated from scratch",
          ],
          answer: 1,
          explain:
            "The large squared return enters today's estimate immediately. Each calm day after that multiplies the old variance by λ, so the effect decays gradually.",
        },
      },
    ],
    recap: [
      "Three regimes: trending-bull, trending-bear and mean-reverting.",
      "Indicators mean different things in different regimes.",
      "Regime labels describe the past and can flip without warning.",
      "EWMA: variance = λ × old variance + (1 − λ) × return², with λ often 0.94.",
    ],
    finalQuiz: {
      id: "l8-4-final",
      question:
        "Why might an RSI of 75 mean something different in a trending-bull regime than in a mean-reverting one?",
      options: [
        "RSI is calculated differently in each regime",
        "In trends, high readings can persist for weeks",
        "Regimes only affect the forecast, not indicators",
        "A reading of 75 is always a signal to sell",
      ],
      answer: 1,
      explain:
        "The formula is the same everywhere. What changes is the behaviour behind it: ranges tend to pull high readings back, while trends can sustain them.",
    },
  },

  {
    slug: "quant-forecast-band",
    levelId: 8,
    order: 5,
    title: "Reading a forecast and its confidence band",
    goal: "Read an ensemble forecast by its band rather than its central line, and explain what '95%' means.",
    minutes: 8,
    difficulty: "applied",
    steps: [
      {
        heading: "Several simple models, combined",
        body: [
          "The Quant Engine's forecast is an ensemble: several models, each making its own 7-day projection, combined into one. One type of model captures trend and seasonality; another, autoregression, uses recent returns to estimate the next ones; there are others.",
          "Combining them is diversification applied to models. Each fails in different conditions, so the blend is usually steadier than any one of them. Each model's weight depends on how well it tested — the next lesson covers how that test works.",
        ],
      },
      {
        heading: "The central path is the least important line",
        body: [
          "The forecast shows a central path — the average expectation — and a 95% confidence band around it. Over a week, the expected move is usually small compared with the uncertainty around it.",
          "So read the band first. It tells you how far the price could reasonably travel in seven days, which is a far more useful fact than the central line.",
        ],
        example: {
          company: "kirana",
          title: "A 7-day forecast for Kirana Kart",
          rows: [
            { label: "Price today", value: "₹105" },
            { label: "Central path, day 7", value: "₹107 (+1.9%)" },
            { label: "95% band, day 7", value: "₹97 to ₹117" },
            { label: "Band half-width", value: "±₹10 — five times the expected ₹2 move" },
          ],
          note: "The expected change is ₹2; the plausible range is twenty rupees wide. Anyone quoting only the ₹107 has thrown away most of the information.",
        },
        checkpoint: {
          id: "l8-5-c1",
          question: "What is the most honest one-line summary of the Kirana Kart forecast?",
          options: [
            "The price will reach ₹107 within a week",
            "A small expected rise, swamped by uncertainty",
            "The forecast is useless because the band is wide",
            "The price cannot fall below ₹97 this week",
          ],
          answer: 1,
          explain:
            "The central path rises ₹2 but the band spans ₹20. A wide band is the model being honest about uncertainty, not a sign that it failed.",
        },
      },
      {
        heading: "What '95%' actually means",
        body: [
          "If the model's assumptions hold, about 19 out of every 20 outcomes should land inside the band. So one in twenty lands outside even when the model is working perfectly.",
          "Real markets produce big surprises more often than a bell curve suggests, so in practice outside-the-band weeks happen somewhat more often than one in twenty.",
          "Bands widen the further out you look, roughly with the square root of time: the band for day 4 is about twice as wide as the band for day 1, because √4 = 2.",
        ],
        checkpoint: {
          id: "l8-5-c2",
          question:
            "A day-1 band is ±₹2. If uncertainty grows with the square root of time, roughly how wide is the day-9 band?",
          options: ["±₹6", "±₹18", "±₹2", "±₹4.50"],
          answer: 0,
          explain: "√9 = 3, so the band is about three times as wide: ±₹2 × 3 = ±₹6.",
        },
      },
      {
        heading: "Using a forecast without fooling yourself",
        body: [
          "Use the band to set expectations about how much a price can move in a week, and to check whether a move you are worried about is ordinary or genuinely unusual.",
          "Do not treat the central path as a target. The model knows nothing about results days, news or anything outside the price history it was given.",
        ],
      },
    ],
    recap: [
      "The forecast is an ensemble; models earn weight by testing well.",
      "Read the 95% band first — the central path is the smallest part of the story.",
      "95% means about 1 in 20 outcomes lands outside, even for a good model.",
      "Bands widen roughly with the square root of time.",
    ],
    finalQuiz: {
      id: "l8-5-final",
      question:
        "A 7-day forecast shows a central path of +1% and a 95% band from −8% to +10%. Which reading is most accurate?",
      options: [
        "The stock is going to rise by about 1% this week",
        "The model has failed and its output should be ignored",
        "A small expected rise, with outcomes ranging widely",
        "There is a 95% chance the price ends the week higher",
      ],
      answer: 2,
      explain:
        "The expected move is +1%, but anything from −8% to +10% is plausible. The band, not the central line, is the main message.",
    },
  },

  {
    slug: "quant-testing-forecasts",
    levelId: 8,
    order: 6,
    title: "Testing a model honestly",
    goal: "Explain walk-forward validation, calculate RMSE and MAPE, and judge directional accuracy realistically.",
    minutes: 9,
    difficulty: "applied",
    steps: [
      {
        heading: "The bar to beat: a random walk",
        body: [
          "The simplest possible forecast says tomorrow's best guess is today's price. This is the random-walk baseline. It sounds naive, but for daily share prices it is famously hard to beat, because prices already reflect what is publicly known.",
          "InvestSense scores every model in its ensemble against this baseline. A model only earns weight by beating it — a model that cannot do better than 'no change' adds nothing.",
        ],
      },
      {
        heading: "Walk-forward: no peeking",
        body: [
          "Walk-forward validation fits a model on data up to day 100, forecasts day 101, and records the error. Then it adds day 101, refits, forecasts day 102, and so on. Every forecast uses only information that existed at the time.",
          "The alternative — fitting on the whole history and then 'testing' on part of it — leaks the future into the past. This is called look-ahead bias, and it makes a model look far better than it will ever be in real use.",
        ],
        checkpoint: {
          id: "l8-6-c1",
          question: "Which test contains look-ahead bias?",
          options: [
            "Fitting on years one to four, testing on year five",
            "Fitting on all five years, then testing on year three",
            "Refitting each day and forecasting only the next day",
            "Comparing errors against a random-walk forecast",
          ],
          answer: 1,
          explain:
            "If year three was part of the fitting data, the model has already seen the answers it is being tested on. The test measures memory, not forecasting.",
        },
      },
      {
        heading: "Measuring error: RMSE and MAPE",
        body: [
          "RMSE (root mean squared error) squares each error, averages them and takes the square root. Squaring makes big misses count for more than small ones. MAPE (mean absolute percentage error) averages the errors as percentages of the actual price. For both, lower is better.",
        ],
        example: {
          company: "ironvale",
          title: "Three walk-forward forecasts for Ironvale Works",
          rows: [
            { label: "Errors", value: "+₹2 on ₹130, −₹4 on ₹125, +₹4 on ₹135" },
            { label: "RMSE", value: "√((4 + 16 + 16) ÷ 3) = √12 ≈ ₹3.46" },
            { label: "Plain average miss", value: "(2 + 4 + 4) ÷ 3 ≈ ₹3.33" },
            { label: "MAPE", value: "(1.5% + 3.2% + 3.0%) ÷ 3 ≈ 2.6%" },
          ],
          note: "RMSE comes out above the plain average miss because the two ₹4 errors are weighted more heavily once squared.",
        },
        checkpoint: {
          id: "l8-6-c2",
          question: "Why is RMSE larger than the plain average miss in the Ironvale example?",
          options: [
            "RMSE also includes the random-walk baseline",
            "Squaring gives the large misses more weight",
            "RMSE is measured in percent, not rupees",
            "The plain average leaves out one forecast",
          ],
          answer: 1,
          explain:
            "Squaring turns errors of 2, 4 and 4 into 4, 16 and 16, so the larger misses dominate before the square root brings the units back to rupees.",
        },
      },
      {
        heading: "Directional accuracy: why 53% can be honest",
        body: [
          "Directional accuracy is how often a forecast got the sign of the move right. A coin flip scores 50%. For daily share prices, a model a few points above 50% is a normal, honest result — InvestSense says so on its own diagnostics.",
          "Claims of 80% or 90% directional accuracy on daily prices should make you suspicious. The usual explanations are look-ahead bias or overfitting: a model tuned so closely to past noise that it describes history perfectly and the future no better than chance.",
        ],
      },
    ],
    recap: [
      "The random walk — 'tomorrow equals today' — is the baseline to beat.",
      "Walk-forward testing only ever uses data available at the time.",
      "RMSE punishes big misses; MAPE expresses errors in percent.",
      "On daily prices, directional accuracy a little above 50% is realistic.",
    ],
    finalQuiz: {
      id: "l8-6-final",
      question:
        "A model scores 58% directional accuracy when fitted and tested on the same data, but 50% in walk-forward testing. What is the likeliest explanation?",
      options: [
        "Walk-forward tests are simply less accurate",
        "It fitted past noise that did not repeat",
        "58% is the real figure; 50% was bad luck",
        "The random-walk baseline was set up wrongly",
      ],
      answer: 1,
      explain:
        "Scoring well on data the model was fitted to, and at chance on unseen data, is the signature of overfitting. The walk-forward number is the honest one.",
    },
  },
];
