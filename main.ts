// Two Lines to Your Past Self — rebuild #2 (Kirana, fresh session)
// Pick: a wrong exam answer you almost rub out. Leave it, and the "mistake"
// sends you to night class, where you meet her — and now your daughter does
// her homework at the kitchen table. Positive consequence, exam lane (thin),
// one moment only: question 7, exam hall, 9:40, 12 June 1998. Line 2 traces
// the chain across two generations instead of restating the warning.
// No hospital, no voicemail, no 2 a.m. text, no deploy, no backup, no train.
// The twist sharpens the moment: the wrong answer was the right one.
import { writeFileSync, chmodSync, mkdirSync } from "node:fs";
import { join } from "node:path";

const ENTRY =
  "Don't rub out the wrong answer to question 7 in the exam hall at 9:40 on 12 June 1998.\n" +
  "That mistake put you in the night class where you met her, and your daughter does her homework at the kitchen table now.";

const chars = [...ENTRY];
if (chars.length < 1 || chars.length > 280) {
  throw new Error(`entry must be 1 to 280 characters, got ${chars.length}`);
}
const lines = ENTRY.split("\n");
if (lines.length !== 2) {
  throw new Error(`entry must be exactly 2 lines, got ${lines.length}`);
}
for (const [i, line] of lines.entries()) {
  const terminals = line.match(/[.!?]/g) ?? [];
  if (terminals.length !== 1 || !/[.!?]$/.test(line)) {
    throw new Error(`line ${i + 1} must be exactly one sentence`);
  }
}

const outDir = process.env.MAKEFUN_OUTPUT_DIR || process.cwd();
mkdirSync(outDir, { recursive: true });
const target = join(outDir, "entry.txt");
writeFileSync(target, ENTRY, "utf8");
chmodSync(target, 0o644);
console.log(`wrote ${target} (${chars.length} chars)`);
