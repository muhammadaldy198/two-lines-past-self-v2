// Two Lines to Your Past Self — rebuild v2.
// Lane: exam (thin lane — 8 titles in 2,741), POSITIVE consequence, behaviour
// change in line 2. One moment only: 9:47 a.m., Room 9, 12 June, question 14.
// Line 1 warns about that one decision; line 2 traces what changed because
// of it — the circled B won the scholarship, and the letter still hangs on
// the fridge, consulted before every big decision since. No family tragedy,
// no hospital, no voicemail, no 2 a.m. text, no deploy, no backup, no train.
// The object that endures (the letter) + the habit that endures (trusting
// the first instinct) carry K3; the voice is to one specific person (you).
//
//   Don't change your answer to question 14 at 9:47 a.m. in Room 9 on 12 June.
//   That circled B won you the scholarship, and the letter is still taped to
//   the fridge where you look at it before every big decision.
//
// Gate: /output/entry.txt UTF-8, 1-280 characters. Brief: exactly 2 lines,
// each exactly one sentence. Count code points (not UTF-16 units) so the
// check matches the gate. Sentence counting ignores the periods inside
// "a.m." / "p.m." abbreviations.
import { chmodSync, mkdirSync, writeFileSync } from "node:fs";

const ENTRY =
  "Don't change your answer to question 14 at 9:47 a.m. in Room 9 on 12 June.\n" +
  "That circled B won you the scholarship, and the letter is still taped to the fridge where you look at it before every big decision.";

const chars = [...ENTRY];
if (chars.length < 1 || chars.length > 280) {
  throw new Error(`entry must be 1 to 280 characters, got ${chars.length}`);
}
const forbidden = (c: string) => {
  const cp = c.codePointAt(0) ?? 0;
  return (
    (cp < 0x20 && c !== "\n") ||
    cp === 0x7f ||
    [0xa0, 0x200b, 0x200c, 0x200d, 0x200e, 0x200f, 0x2028, 0x2029, 0xfeff].includes(cp)
  );
};
if (chars.some(forbidden)) {
  throw new Error("entry contains a forbidden character");
}
if (ENTRY.trim() !== ENTRY) {
  throw new Error("entry must not start or end with whitespace");
}
const lines = ENTRY.split("\n");
if (lines.length !== 2) {
  throw new Error(`entry must be exactly 2 lines, got ${lines.length}`);
}
for (const [i, line] of lines.entries()) {
  const deabbr = line.replace(/\b[ap]\.m\./gi, "AM");
  const terminals = deabbr.match(/[.!?]/g) ?? [];
  if (terminals.length !== 1 || !/[.!?]$/.test(deabbr)) {
    throw new Error(`line ${i + 1} must be exactly one sentence`);
  }
  if (line.trim() !== line) {
    throw new Error(`line ${i + 1} must not start or end with whitespace`);
  }
}

mkdirSync("/output", { recursive: true });
writeFileSync("/output/entry.txt", ENTRY, "utf8");
chmodSync("/output/entry.txt", 0o644);
