import type { DesignAxes, DesignDNA, LineageChannel, VisualLineageSelection } from "@creative-ui/core";

export type ReferenceCategory =
  | "art-movement"
  | "regional-tradition"
  | "graphic-design"
  | "architecture"
  | "craft-technique"
  | "print-technique"
  | "interface-era"
  | "scientific-visualization";

export type ReferenceProfileId =
  | "geometric-discipline"
  | "ornamental-organic"
  | "expressive-raw"
  | "editorial-system"
  | "spatial-monumental"
  | "material-craft"
  | "image-narrative"
  | "digital-retro"
  | "symbolic-sacred"
  | "kinetic-optical"
  | "color-emotive"
  | "conceptual-reductive";

export type VisualReference = {
  id: string;
  name: string;
  category: ReferenceCategory;
  profile: ReferenceProfileId;
  period?: string;
  regions?: string[];
  tags: string[];
  principles: string[];
  designTranslation: Partial<Record<LineageChannel, string[]>>;
  primaryChannels: LineageChannel[];
  avoidLiteralization: string[];
  affinity: Partial<DesignAxes>;
};

export type LineageRecommendation = {
  reference: VisualReference;
  score: number;
  role: "match" | "counterbalance";
  reasons: string[];
};

export type LineageSynthesis = {
  references: Array<{ reference: VisualReference; selection: VisualLineageSelection }>;
  channelPrinciples: Partial<Record<LineageChannel, string[]>>;
  tensions: string[];
  warnings: string[];
};

export type RecommendationOptions = {
  limit?: number;
  includeCounterbalances?: number;
};

export type DNAInput = Pick<DesignDNA, "axes" | "vibes" | "visualLineage">;
