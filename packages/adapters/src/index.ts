import { mkdir, readFile, writeFile } from "node:fs/promises";
import { dirname, join } from "node:path";

export type AgentTarget = "codex" | "claude" | "cursor";

const managedBlock = `<!-- creative-ui:start -->
## Creative UI

This project uses Creative UI for art direction. Before changing frontend presentation:

1. Read \`.creative-ui/design-dna.json\` as the machine-readable source of truth.
2. Read \`.creative-ui/DESIGN.md\` for the interpreted design brief.
3. Use selected visual-lineage references as principle libraries, not literal themes.
4. Respect novelty budgets: unusual layout does not imply unusual navigation.
5. Run \`creative-ui critique\` before considering major frontend work complete.
6. If the result looks template-like, run \`creative-ui unslop\` and address structural findings rather than merely changing colors.

Creative UI is framework-agnostic. Do not introduce React, Tailwind, or another frontend dependency solely because Creative UI is present.
<!-- creative-ui:end -->`;

async function mergeManagedBlock(path: string) {
  let existing = "";
  try { existing = await readFile(path, "utf8"); } catch { /* create it */ }
  const pattern = /<!-- creative-ui:start -->[\s\S]*?<!-- creative-ui:end -->/m;
  const content = pattern.test(existing) ? existing.replace(pattern, managedBlock) : `${existing.trim()}${existing.trim() ? "\n\n" : ""}${managedBlock}\n`;
  await mkdir(dirname(path), { recursive: true });
  await writeFile(path, content);
}

export async function installAgentRules(cwd: string, rawTargets: string[]): Promise<string[]> {
  const targets = rawTargets.filter((target): target is AgentTarget => ["codex", "claude", "cursor"].includes(target));
  const paths: Record<AgentTarget, string> = { codex: join(cwd, "AGENTS.md"), claude: join(cwd, "CLAUDE.md"), cursor: join(cwd, ".cursor", "rules", "creative-ui.mdc") };
  const written: string[] = [];
  for (const target of targets) {
    const path = paths[target];
    if (target === "cursor") { const cursorBlock = `---\ndescription: Creative UI art-direction constraints\nalwaysApply: true\n---\n\n${managedBlock}\n`; await mkdir(dirname(path), { recursive: true }); await writeFile(path, cursorBlock); }
    else await mergeManagedBlock(path);
    written.push(path);
  }
  return written;
}
