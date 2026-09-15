import type { DesignDNA } from "./schema.js";
import type { SlopReport } from "./slop.js";

export type CritiqueDimension = "originality" | "hierarchy" | "consistency" | "legibility" | "responsiveness" | "accessibility";

export type CritiqueReport = {
  scores: Record<CritiqueDimension, number | null>;
  slop: SlopReport;
  prompts: string[];
};

export function buildCritiqueReport(dna: DesignDNA, slop: SlopReport): CritiqueReport {
  const originality = Math.max(0, Math.min(100, Math.round(100 - slop.score * 0.8 + dna.axes.experimentation * 15)));

  return {
    scores: {
      originality,
      hierarchy: null,
      consistency: null,
      legibility: null,
      responsiveness: null,
      accessibility: null,
    },
    slop,
    prompts: [
      "Can a viewer identify the primary, secondary and tertiary hierarchy in under five seconds?",
      "Does the composition express the selected Design DNA without relying on decorative effects?",
      "Is there at least one project-specific visual decision that would not survive a logo swap?",
      "Do mobile breakpoints recompose the design rather than merely compress it?",
      "Are unusual interactions discoverable, keyboard reachable and reversible?",
      "Do the selected visual-lineage references appear as translated principles rather than costume-like imitation?",
    ],
  };
}
