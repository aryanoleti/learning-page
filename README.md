# StockSense Learn

A free, standalone course that teaches a beginner how to read a company —
seven levels, 27 short lessons, no account required.

Live: https://aryanoleti.github.io/learning-page/

## What it covers

| Level | Theme | Lessons |
| --- | --- | --- |
| 1 | Financial Foundations | 5 |
| 2 | Understanding Companies | 4 |
| 3 | Reading the Numbers | 6 |
| 4 | Analyzing Companies | 3 |
| 5 | Build Your Portfolio | 3 |
| 6 | Survive the Market | 3 |
| 7 | Think Like an Investor | 3 |

Roughly 189 minutes of reading and 92 questions.

## How it works

- **Placement quiz** (`/placement`) suggests where to start. It never blocks —
  every screen offers a way past it.
- **Lessons** are short steps with a quick check after each key idea.
- **Unit checks** gate progress: two questions, answered together, two
  attempts. A failed first attempt says only that it was wrong — revealing
  which answer failed would let the retry be passed by elimination. After the
  second failure the answers appear and the lesson restarts.
- Options are **shuffled per attempt**, so order is stable while reading but
  different on the retry.
- Lessons unlock **in order**; going back is always allowed.
- Progress lives in **browser localStorage only**. Nothing is uploaded and no
  sign-in exists.

## Content

Every company, figure and scenario is **invented for teaching**. Nothing here
describes a real business, and none of it is investment advice.

The curriculum is data, not markup — add or edit lessons in
`src/lib/learn/levels/`, and the counts, routing and progress tracking follow
automatically.

## Structure

```
src/lib/learn/       curriculum, companies, glossary, progress, placement
src/components/learn/ reader, home, unit check, HUD pieces
src/app/             / (home), /placement, /glossary, /lesson/[slug]
```

## Local development

```bash
npm install
npm run dev
```

## Deployment note

`next.config.ts` sets `trailingSlash: true`, and the deploy workflow must not
pass `static_site_generator: next` to `actions/configure-pages` — that option
rewrites the config, drops the trailing slash, and makes every route except
`/` return 404.
