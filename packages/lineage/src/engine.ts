import type { DesignAxes, LineageChannel, VisualLineageSelection } from "@creative-ui/core";
import { visualReferenceById, visualReferenceCatalog } from "./catalog.js";
import type { DNAInput, LineageRecommendation, LineageSynthesis, RecommendationOptions, VisualReference } from "./types.js";

type AxisKey = "density" | "experimentation" | "rawness" | "layering" | "asymmetry" | "kinetic" | "physicality" | "typographicExpression" | "contrast" | "texture";

const axisKeys: AxisKey[] = [
  "density",
  "experimentation",
  "rawness",
  "layering",
  "asymmetry",
  "kinetic",
  "physicality",
  "typographicExpression",
  "contrast",
  "texture",
];

function similarity(axes: DesignAxes, reference: VisualReference): number {
  const entries = axisKeys
    .filter((key) => reference.affinity[key] !== undefined)
    .map((key) => 1 - Math.abs(axes[key] - (reference.affinity[key] ?? axes[key])));

  if (!entries.length) return 0.5;
  return entries.reduce((sum, value) => sum + value, 0) / entries.length;
}

function vibeBoost(vibes: string[], reference: VisualReference): number {
  if (!vibes.length) return 0;
  const text = [reference.name, reference.id, ...reference.tags, ...reference.principles].join(" ").toLowerCase();
  const matches = vibes.filter((vibe) => text.includes(vibe.toLowerCase())).length;
  return Math.min(0.15, matches * 0.05);
}

function reasonsFor(dna: DNAInput, reference: VisualReference, role: "match" | "counterbalance"): string[] {
  const reasons: string[] = [];
  const affinities = Object.entries(reference.affinity) as Array<[AxisKey, number]>;
  const strongest = affinities
    .sort((a, b) => Math.abs(b[1] - 0.5) - Math.abs(a[1] - 0.5))
    .slice(0, 2)
    .map(([key]) => key);

  if (role === "match") reasons.push(`matches the project's ${strongest.join(" + ")} tendencies`);
  else reasons.push(`creates useful tension against the project's ${strongest.join(" + ")} tendencies`);
  reasons.push(`strongest translation channels: ${reference.primaryChannels.slice(0, 3).join(", ")}`);
  return reasons;
}

export function recommendVisualReferences(dna: DNAInput, options: RecommendationOptions = {}): LineageRecommendation[] {
  const limit = options.limit ?? 8;
  const counterbalanceCount = options.includeCounterbalances ?? 2;
  const selected = new Set(dna.visualLineage.map((item) => item.referenceId));

  const ranked = visualReferenceCatalog
    .filter((reference) => !selected.has(reference.id))
    .map((reference) => ({ reference, similarity: Math.min(1, similarity(dna.axes, reference) + vibeBoost(dna.vibes, reference)) }))
    .sort((a, b) => b.similarity - a.similarity);

  const matches = ranked.slice(0, Math.max(0, limit - counterbalanceCount)).map(({ reference, similarity: score }) => ({
    reference,
    score,
    role: "match" as const,
    reasons: reasonsFor(dna, reference, "match"),
  }));

  const counterbalances = ranked
    .filter((item) => item.similarity >= 0.42 && item.similarity <= 0.7)
    .sort((a, b) => Math.abs(a.similarity - 0.56) - Math.abs(b.similarity - 0.56))
    .slice(0, counterbalanceCount)
    .map(({ reference, similarity: score }) => ({
      reference,
      score,
      role: "counterbalance" as const,
      reasons: reasonsFor(dna, reference, "counterbalance"),
    }));

  return [...matches, ...counterbalances];
}

function pushUnique(target: string[], values: string[], max = 12) {
  for (const value of values) {
    if (!target.includes(value) && target.length < max) target.push(value);
  }
}

export function synthesizeVisualLineage(selections: VisualLineageSelection[]): LineageSynthesis {
  const resolved = selections
    .map((selection) => ({ selection, reference: visualReferenceById.get(selection.referenceId) }))
    .filter((item): item is { selection: VisualLineageSelection; reference: VisualReference } => Boolean(item.reference))
    .sort((a, b) => b.selection.weight - a.selection.weight);

  const channelPrinciples: Partial<Record<LineageChannel, string[]>> = {};
  const warnings: string[] = [];

  for (const { selection, reference } of resolved) {
    for (const channel of selection.borrow) {
      const target = channelPrinciples[channel] ?? [];
      const translated = reference.designTranslation[channel] ?? reference.principles;
      pushUnique(target, translated, 10);
      channelPrinciples[channel] = target;
    }

    if (selection.borrow.includes("symbolism")) {
      pushUnique(warnings, reference.avoidLiteralization, 10);
    }
  }

  const tensions: string[] = [];
  const profiles = new Set(resolved.map((item) => item.reference.profile));
  if (profiles.has("expressive-raw") && profiles.has("editorial-system")) tensions.push("Use editorial discipline to contain raw expressive interventions.");
  if (profiles.has("ornamental-organic") && profiles.has("geometric-discipline")) tensions.push("Let geometric structure carry the system while organic detail interrupts selected edges or focal zones.");
  if (profiles.has("digital-retro") && profiles.has("material-craft")) tensions.push("Contrast explicit computational behavior with tactile surface cues; avoid making either layer purely decorative.");
  if (profiles.has("kinetic-optical") && profiles.has("conceptual-reductive")) tensions.push("Concentrate optical motion in one controlled field and keep surrounding interface behavior calm.");
  if (!tensions.length && resolved.length > 1) tensions.push("Assign each reference a distinct channel so the blend does not collapse into an average aesthetic.");

  return { references: resolved, channelPrinciples, tensions, warnings };
}
