/* Per-file report of which questions have the correct answer as the longest
   option. Used while rewriting the bank; the pass/fail gate lives in
   check-questions.mjs. */

import { readFileSync } from "node:fs";

const file = process.argv[2];
const src = readFileSync(file, "utf8");

const re =
  /id:\s*"([^"]+)",\s*(?:level:\s*\d+,\s*)?question:\s*\n?\s*"((?:[^"\\]|\\.)*)",\s*options:\s*\[([\s\S]*?)\],\s*answer:\s*(\d+)/g;

let m;
let total = 0;
let biased = 0;
while ((m = re.exec(src))) {
  const options = [...m[3].matchAll(/"((?:[^"\\]|\\.)*)"/g)].map((o) => o[1]);
  const answer = Number(m[4]);
  const lengths = options.map((o) => o.length);
  const max = Math.max(...lengths);
  total++;
  if (lengths[answer] === max) {
    biased++;
    console.log(
      `${m[1].padEnd(16)} answer ${String(lengths[answer]).padStart(3)}  others ${lengths
        .filter((_, i) => i !== answer)
        .join(", ")}`
    );
  }
}
console.log(`\n${file}: ${biased} of ${total} have the longest option as the answer`);
