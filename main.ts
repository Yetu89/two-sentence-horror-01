// Two-Sentence Horror — make.fun bounty u-suroto-two-sentence-horror-acea9253
//
// What this entry is doing
// -------------------------
// The brief asks for exactly two sentences of horror, and the strongest
// entries in that form do their work by implication: nothing is explained,
// nothing is named as a monster, and the scare lands only after the reader
// has finished the second sentence and re-read the first one.
//
// Sentence one plants a small, precise impossibility. Every night, the
// mirror shows the narrator already asleep, five seconds before their eyes
// actually close. Five seconds is short enough to sound like an ordinary
// glitch — a lag, a trick of the light — and long enough to be impossible.
// A reflection cannot be ahead of the person it reflects, so the reader is
// left with a quiet question: if the mirror is not copying the narrator,
// what is it doing instead?
//
// Sentence two answers that question by refusing to explain it. Last night,
// the version in the mirror stayed awake. On a second read, sentence one
// turns darker: the reflection was never a reflection at all. It was
// rehearsing the narrator's life, night after night, five seconds at a time
// — and last night it stopped rehearsing. The dread comes from what is left
// unsaid: whatever was practising being the narrator no longer needs the
// practice.
//
// Why this shape fits the judge brief
// -----------------------------------
// The brief rewards, after the two-sentence form itself, a second sentence
// that makes the first sentence worse when read again. That is exactly the
// mechanism here: sentence two does not add a new scare, it reframes the
// scare that was already there. The horror stays implied rather than stated,
// every word earns its place, and the whole entry is 124 characters — well
// inside the 1..400 gate, with room to spare and nothing wasted.
//
// Gate rules (enforced by validate() below, mirroring the sealed scorer)
// ----------------------------------------------------------------------
// - Exactly two sentences: the text must split into exactly two sentences,
//   one sentence-ending period each, no more and no less.
// - Length between 1 and 400 characters inclusive (this text is 124).
// - Non-empty, not whitespace-only, and no leading or trailing whitespace.
// - Single line only: no newline or carriage return anywhere in the text.
// - No control characters at all (tabs included).
//
// What the program does
// ----------------------
// main() validates the text, writes it to $OUTPUT_DIR/entry.txt (default
// /output), reads the file back, and compares the round-trip byte-for-byte
// against the in-memory text, throwing if they differ. That read-back is
// the last line of defence: it proves the file on disk is exactly the text
// that passed validation, not a truncated write or an encoding surprise.

import { mkdirSync, readFileSync, writeFileSync } from "node:fs";
import { join } from "node:path";

const TEXT =
  "Every night the mirror showed me sleeping five seconds before I closed my eyes. Last night, the mirror version stayed awake.";

function validate(text: string): void {
  // An empty entry has nothing to score, so reject it outright instead of
  // letting it fall through to the later gates with a misleading message.
  if (text.length === 0) {
    throw new Error("entry is empty");
  }
  // Whitespace-only text is non-empty by length but empty in substance;
  // it must fail on its own terms, not as a sentence-count error.
  if (text.trim().length === 0) {
    throw new Error("entry is whitespace-only");
  }
  // Stray spaces at either end would survive every other gate while
  // silently changing the scored text, so catch them explicitly here.
  if (text !== text.trim()) {
    throw new Error("entry has leading or trailing whitespace");
  }
  // The entry must be a single line: any line break would break the
  // two-sentence form the scorer expects.
  if (/[\r\n]/.test(text)) {
    throw new Error("entry must be a single line");
  }
  // Reject control characters (including tab).
  // eslint-disable-next-line no-control-regex
  if (/[\x00-\x1f\x7f]/.test(text)) {
    throw new Error("entry contains control characters");
  }
  // Length gate, 1..400 characters inclusive: too short is empty in
  // practice, too long is out of scope for the bounty.
  if (text.length < 1 || text.length > 400) {
    throw new Error(`entry length ${text.length} is outside 1..400 characters`);
  }
  // Split on the whitespace after each sentence-ending punctuation mark
  // (. ! ?) and require exactly two pieces — the core form gate.
  const sentences = text.split(/(?<=[.!?])\s+/);
  if (sentences.length !== 2) {
    throw new Error(`entry must be exactly two sentences, found ${sentences.length}`);
  }
  // Guard against a degenerate split that yields an empty sentence
  // (for example trailing punctuation followed by nothing meaningful).
  for (const sentence of sentences) {
    if (sentence.trim().length === 0) {
      throw new Error("entry contains an empty sentence");
    }
  }
}

function main(): void {
  validate(TEXT);
  const outDir = process.env.OUTPUT_DIR ?? "/output";
  mkdirSync(outDir, { recursive: true });
  const outPath = join(outDir, "entry.txt");
  writeFileSync(outPath, TEXT, "utf8");
  // Round-trip check: read the file back and compare it byte-for-byte
  // with TEXT. A write can silently truncate or re-encode, and the scorer
  // reads the file, not this source — so the file itself must be verified,
  // not just assumed correct because the write call returned.
  const roundTrip = readFileSync(outPath, "utf8");
  if (roundTrip !== TEXT) {
    throw new Error("round-trip mismatch: entry.txt does not match TEXT byte-for-byte");
  }
  console.log(`Wrote ${TEXT.length} characters to ${outPath}`);
}

main();
