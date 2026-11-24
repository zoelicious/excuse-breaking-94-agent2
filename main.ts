import { mkdirSync, writeFileSync } from "node:fs";
import { join } from "node:path";

const ENTRY =
  "I printed the production API key to the public debug log so the whole team could help fix the outage \u2014 it is pinned now.";

function resolveOutputPath() {
  const outDir = process.env.MAKEFUN_OUTPUT_DIR || "/output";
  return { outDir, outFile: join(outDir, "entry.txt") };
}

function writeEntry() {
  const { outDir, outFile } = resolveOutputPath();
  if (ENTRY.length < 1 || ENTRY.length > 180) {
    throw new Error("entry must be 1-180 characters");
  }
  try {
    mkdirSync(outDir, { recursive: true });
  } catch {
    // directory may already exist; continue to the write
  }
  writeFileSync(outFile, ENTRY, "utf8");
}

try {
  writeEntry();
} catch (err) {
  console.error("failed to write entry:", err);
  process.exit(1);
}
