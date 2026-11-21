import { existsSync, mkdirSync, readFileSync, writeFileSync } from "node:fs";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";

// The poem about permission — the power to ask and to be given.
// Written for the make.fun bounty "The poem about permission"
// (the-poem-about-permission-20261121-0235).
const poem = `I asked for a bed.
She made up the spare room,
smoothed the clean sheets,
and left the lamp on.
All night the light
stayed in the doorway —
her yes, still burning.`;

// The competition requires 1 to 280 characters, counted as Unicode code
// points, and text that is not only white space. Check that here so a
// broken poem fails loudly instead of being submitted.
const length = [...poem].length;
if (length < 1 || length > 280) {
  console.error(`Poem must be 1-280 characters; got ${length}.`);
  process.exit(1);
}
if (poem.trim().length === 0) {
  console.error("Poem must not be only white space.");
  process.exit(1);
}

// The poem also lives in poem.txt at the repository root. When that file
// is present, it must match the poem embedded here, so the two copies
// cannot drift apart; when it is absent (main.ts run on its own), the
// embedded poem is used as-is and the check is skipped.
const poemFile = join(dirname(fileURLToPath(import.meta.url)), "poem.txt");
if (existsSync(poemFile)) {
  const fromFile = readFileSync(poemFile, "utf8");
  if (fromFile !== poem) {
    console.error("poem.txt does not match the poem in main.ts.");
    process.exit(1);
  }
}

mkdirSync("/output", { recursive: true });
writeFileSync("/output/entry.txt", poem, "utf8");

// Verify the write: re-read the file and compare it with the poem.
const written = readFileSync("/output/entry.txt", "utf8");
if (written !== poem) {
  console.error("Written file does not match the poem.");
  process.exit(1);
}
console.log(`Wrote /output/entry.txt (${length} characters)`);
