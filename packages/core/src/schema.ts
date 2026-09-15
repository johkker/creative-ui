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
});

export const designDNASchema = z.object({
  version: z.literal(1),
  concept: z.string().min(1),
  composition: compositionSchema,
  axes: designAxesSchema,
  novelty: noveltyBudgetSchema,
  vibes: z.array(z.string()).default([]),
  avoid: z.array(z.string()).default([]),
  constraints: z.object({
    accessibility: z.boolean().default(true),
    responsive: z.boolean().default(true),
    performance: z.enum(["strict", "balanced", "expressive"]).default("balanced"),
  }),
});

export type Composition = z.infer<typeof compositionSchema>;
export type DesignAxes = z.infer<typeof designAxesSchema>;
export type NoveltyBudget = z.infer<typeof noveltyBudgetSchema>;
export type DesignDNA = z.infer<typeof designDNASchema>;
