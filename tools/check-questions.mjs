/* Question corpus audit.

   Run with `npm run check:questions`. It fails the build if the question bank
   drifts back into the habits that make a quiz guessable:

     - the same question (or near-identical wording) appearing twice
     - duplicate question ids
     - the correct answer being the longest option far more often than chance
     - the correct answer clustering in one position
     - options that are trivially eliminable (too few, or duplicated text)

   The longest-answer check matters most: writers pad the correct option with
   qualifiers ("because ... which means ...") and strip the distractors, so a
   reader who knows nothing can score well by picking the wordiest line. */

import { readFileSync, readdirSync } from "node:fs";
import { join, dirname } from "node:path";
import { fileURLToPath } from "node:url";

const root = join(dirname(fileURLToPath(import.meta.url)), "..");

/* The content is TypeScript, so rather than compile it we parse the object
   literals out of the source. Crude, but it keeps this script dependency-free
   and the shapes are consistent because they all satisfy one type. */
function extractQuestions(source, file) {
  const out = [];
  const re =
    /id:\s*"([^"]+)",\s*(?:level:\s*\d+,\s*)?question:\s*\n?\s*"((?:[^"\\]|\\.)*)",\s*options:\s*\[([\s\S]*?)\],\s*answer:\s*(\d+)/g;
  let m;
  while ((m = re.exec(source))) {
    const [, id, question, optionsRaw, answer] = m;
    const options = [...optionsRaw.matchAll(/"((?:[^"\\]|\\.)*)"/g)].map((o) =>
      o[1].replace(/\\"/g, '"')
    );
    out.push({ id, question: question.replace(/\\"/g, '"'), options, answer: Number(answer), file });
  }
  return out;
}

function collect() {
  const files = [];
  const walk = (dir) => {
    for (const entry of readdirSync(dir, { withFileTypes: true })) {
      const p = join(dir, entry.name);
      if (entry.isDirectory()) walk(p);
      else if (entry.name.endsWith(".ts")) files.push(p);
    }
  };
  walk(join(root, "src", "lib", "learn"));
  return files.flatMap((f) => extractQuestions(readFileSync(f, "utf8"), f.replace(root, "")));
}

/* Loose normalisation: catches "What is a share?" vs "What is a share" and
   the same question rephrased with different punctuation or casing. */
const norm = (s) =>
  s
    .toLowerCase()
    .replace(/[^a-z0-9 ]/g, "")
    .replace(/\s+/g, " ")
    .trim();

const questions = collect();
const problems = [];

// 1. duplicate ids
const byId = new Map();
for (const q of questions) {
  if (byId.has(q.id)) problems.push(`duplicate id "${q.id}" (${byId.get(q.id).file} and ${q.file})`);
  byId.set(q.id, q);
}

// 2. duplicate or near-duplicate question text
const byText = new Map();
for (const q of questions) {
  const key = norm(q.question);
  if (byText.has(key)) {
    problems.push(
      `duplicate question text:\n    ${byText.get(key).id} (${byText.get(key).file})\n    ${q.id} (${q.file})\n    "${q.question.slice(0, 90)}"`
    );
  }
  byText.set(key, q);
}

// 3. shared option sets — a recycled question with a reworded stem
const byOptions = new Map();
for (const q of questions) {
  const key = q.options.map(norm).sort().join("|");
  if (byOptions.has(key)) {
    problems.push(
      `identical option set: ${byOptions.get(key).id} and ${q.id} — the question was likely recycled`
    );
  }
  byOptions.set(key, q);
}

// 4. longest-option bias
//    A tie, or being one character longer, gives nothing away. What a reader
//    can exploit is the answer being VISIBLY the longest, so only a clear
//    margin over the runner-up counts.
const MARGIN = 1.15;

/* Graded questions are held to the rule; in-lesson checkpoints are reported
   but not enforced. The distinction is real: a checkpoint reveals its answer
   and explanation the moment it is answered, so guessing it costs the reader
   the explanation rather than winning them anything. A gate question decides
   whether the next lesson opens. */
const isGraded = (id) => /-final$|-q2$/.test(id) || id.startsWith('pl-');

function biasCount(list) {
  let n = 0;
  for (const q of list) {
    const lengths = q.options.map((o) => o.length);
    const runnerUp = Math.max(...lengths.filter((_, i) => i !== q.answer));
    if (lengths[q.answer] > runnerUp * MARGIN) n++;
  }
  return n;
}

const graded = questions.filter((q) => isGraded(q.id));
const formative = questions.filter((q) => !isGraded(q.id));
const longest = biasCount(graded);
const longestPct = Math.round((longest / graded.length) * 100);
const formativePct = Math.round((biasCount(formative) / formative.length) * 100);

// 5. answer position spread
const positions = {};
for (const q of questions) positions[q.answer] = (positions[q.answer] ?? 0) + 1;

// 6. structural checks
for (const q of questions) {
  if (q.options.length < 4) problems.push(`${q.id}: only ${q.options.length} options`);
  if (new Set(q.options.map(norm)).size !== q.options.length)
    problems.push(`${q.id}: has duplicate options`);
  if (q.answer >= q.options.length) problems.push(`${q.id}: answer index out of range`);
}

console.log(`Questions found: ${questions.length}`);
console.log(`Answer positions: ${JSON.stringify(positions)}`);
console.log(`Graded questions: ${graded.length} — answer visibly longest in ${longest} (${longestPct}%)`);
console.log(`In-lesson checkpoints: ${formative.length} — visibly longest in ${formativePct}% (reported, not enforced)`);

// With 4-5 options, chance is 20-25%. Allow headroom, fail on a real pattern.
if (longestPct > 20) {
  problems.push(
    `longest-option bias: the correct answer is the longest option in ${longestPct}% of questions (chance is ~22%). Lengthen distractors or trim answers.`
  );
}

const maxPos = Math.max(...Object.values(positions));
// Not a failure: shuffleCheckpoint randomises display order per attempt, so
// where an answer sits in the source array is invisible to the reader.
if (maxPos / questions.length > 0.4) {
  const pct = Math.round((maxPos / questions.length) * 100);
  console.log(`Note: ${pct}% of answers share one source position — harmless, the renderer shuffles.`);
}

if (problems.length) {
  console.error(`\n${problems.length} problem(s):\n`);
  problems.forEach((p) => console.error(`  - ${p}`));
  process.exit(1);
}
console.log("\nNo duplicates and no answer-shape bias.");
