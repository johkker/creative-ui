import { z } from "zod";

export const unitInterval = z.number().min(0).max(1);

export const compositionSchema = z.enum([
  "editorial-split",
  "asymmetric-anchor",
  "dense-grid",
  "freeform-collage",
  "vertical-narrative",
  "diagonal-flow",
  "layered-canvas",
  "modular-poster",
  "scroll-choreography",
  "brutalist-index",
  "specimen-sheet",
  "magazine-spread",
]);

export const designAxesSchema = z.object({
  density: unitInterval,
  experimentation: unitInterval,
  rawness: unitInterval,
  layering: unitInterval,
  asymmetry: unitInterval,
  kinetic: unitInterval,
  physicality: unitInterval,
  typographicExpression: unitInterval,
  contrast: unitInterval,
  texture: unitInterval,
});

export const noveltyBudgetSchema = z.object({
  overall: unitInterval,
  layout: unitInterval,
  typography: unitInterval,
  motion: unitInterval,
  color: unitInterval,
  navigation: unitInterval,
  interaction: unitInterval,
  imagery: unitInterval.default(0.65),
  texture: unitInterval.default(0.55),
});

export const lineageChannelSchema = z.enum([
  "composition",
  "geometry",
  "typography",
  "color",
  "texture",
  "motion",
  "imagery",
  "interaction",
  "symbolism",
]);

export const visualLineageSelectionSchema = z.object({
  referenceId: z.string().min(1),
  weight: unitInterval,
  borrow: z.array(lineageChannelSchema).min(1),
  notes: z.string().optional(),
});

export const designDNASchema = z.object({
  version: z.literal(1),
  concept: z.string().min(1),
  composition: compositionSchema,
  axes: designAxesSchema,
  novelty: noveltyBudgetSchema,
  vibes: z.array(z.string()).default([]),
  visualLineage: z.array(visualLineageSelectionSchema).default([]),
  avoid: z.array(z.string()).default([]),
  constraints: z.object({
    accessibility: z.boolean().default(true),
    responsive: z.boolean().default(true),
    performance: z.enum(["strict", "balanced", "expressive"]).default("balanced"),
    preserveConventionalNavigation: z.boolean().default(true),
  }),
});

export type Composition = z.infer<typeof compositionSchema>;
export type DesignAxes = z.infer<typeof designAxesSchema>;
export type NoveltyBudget = z.infer<typeof noveltyBudgetSchema>;
export type LineageChannel = z.infer<typeof lineageChannelSchema>;
export type VisualLineageSelection = z.infer<typeof visualLineageSelectionSchema>;
export type DesignDNA = z.infer<typeof designDNASchema>;
