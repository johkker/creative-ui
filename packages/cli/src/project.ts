import { mkdir, readFile, readdir, stat, writeFile } from "node:fs/promises";
import { extname, join, relative } from "node:path";
import {
  analyzeSourceForSlop,
  buildCritiqueReport,
  designDNASchema,
  generateDesignBrief,
  generateUnslopPlan,
  type DesignDNA,
} from "@creative-ui/core";

const sourceExtensions = new Set([".html", ".css", ".scss", ".sass", ".less", ".js", ".mjs", ".cjs", ".jsx", ".ts", ".tsx", ".vue", ".svelte", ".astro"]);
const ignoredDirectories = new Set(["node_modules", ".git", "dist", "build", ".next", ".nuxt", ".svelte-kit", "coverage", ".creative-ui"]);

export async function loadDNA(cwd = process.cwd()): Promise<DesignDNA> {
  const path = join(cwd, ".creative-ui", "design-dna.json");
  const raw = await readFile(path, "utf8");
  return designDNASchema.parse(JSON.parse(raw));
}

export async function saveDNA(dna: DesignDNA, cwd = process.cwd()) {
  const dir = join(cwd, ".creative-ui");
  await mkdir(dir, { recursive: true });
  await Promise.all([
    writeFile(join(dir, "design-dna.json"), `${JSON.stringify(dna, null, 2)}\n`),
    writeFile(join(dir, "DESIGN.md"), generateDesignBrief(dna)),
  ]);
}

async function walk(root: string, current: string, files: string[], maxFiles: number) {
  if (files.length >= maxFiles) return;
  for (const entry of await readdir(current)) {
    if (files.length >= maxFiles) break;
    const full = join(current, entry);
    const info = await stat(full);
    if (info.isDirectory()) {
      if (!ignoredDirectories.has(entry)) await walk(root, full, files, maxFiles);
      continue;
    }
    if (sourceExtensions.has(extname(entry).toLowerCase()) && info.size <= 1_500_000) files.push(full);
  }
}

export async function collectProjectSource(target = process.cwd(), maxFiles = 500): Promise<{ source: string; files: string[] }> {
  const info = await stat(target);
  const files: string[] = [];
  const root = info.isDirectory() ? target : process.cwd();

  if (info.isDirectory()) await walk(root, target, files, maxFiles);
  else files.push(target);

  const chunks: string[] = [];
  for (const file of files) {
    try {
      const raw = await readFile(file, "utf8");
      chunks.push(`\n/* creative-ui:file ${relative(root, file)} */\n${raw}`);
    } catch {
      // Best-effort critique: ignore unreadable source files.
    }
  }

  return { source: chunks.join("\n"), files };
}

export async function critiqueProject(target = process.cwd()) {
  const dna = await loadDNA(process.cwd());
  const { source, files } = await collectProjectSource(target);
  const slop = analyzeSourceForSlop(source);
  return { files, report: buildCritiqueReport(dna, slop) };
}

export async function writeUnslopPlan(target = process.cwd()) {
  const { source, files } = await collectProjectSource(target);
  const report = analyzeSourceForSlop(source);
  const dir = join(process.cwd(), ".creative-ui");
  await mkdir(dir, { recursive: true });
  const output = join(dir, "UNSLOP.md");
  await writeFile(output, `${generateUnslopPlan(report)}\n\nAnalyzed ${files.length} source files.\n`);
  return { output, report, files };
}
