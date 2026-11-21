import { mkdirSync, readFileSync, writeFileSync } from "node:fs";

// The poem about permission — the power to ask and to be given.
// Written for the make.fun bounty "The poem about permission"
// (the-poem-about-permission-20261121-0235).
const poem = `For years I carried the question
in my pocket like a stone,
afraid to set it down.
One morning I said, may I —
and the stone opened in my palm:
a small bird, already flying,
already mine to let go.`;

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

mkdirSync("/output", { recursive: true });
writeFileSync("/output/entry.txt", poem, "utf8");

// Verify the write: re-read the file and compare it with the poem.
const written = readFileSync("/output/entry.txt", "utf8");
if (written !== poem) {
  console.error("Written file does not match the poem.");
  process.exit(1);
}
console.log(`Wrote /output/entry.txt (${length} characters)`);
