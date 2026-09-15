import type { DesignDNA } from "./schema.js";

const pct = (value: number) => `${Math.round(value * 100)}%`;

export function generateDesignBrief(dna: DesignDNA): string {
  return `# Creative UI — Agent Design Brief

## Concept
${dna.concept}

## Composition
Use **${dna.composition}** as the primary compositional grammar. Treat it as a constraint system, not as a template.

## Design DNA
- Density: ${pct(dna.axes.density)}
- Experimentation: ${pct(dna.axes.experimentation)}
- Rawness: ${pct(dna.axes.rawness)}
- Layering: ${pct(dna.axes.layering)}
- Asymmetry: ${pct(dna.axes.asymmetry)}
- Motion: ${pct(dna.axes.kinetic)}
- Physicality: ${pct(dna.axes.physicality)}
- Typographic expression: ${pct(dna.axes.typographicExpression)}
- Contrast: ${pct(dna.axes.contrast)}
- Texture: ${pct(dna.axes.texture)}

## Novelty budget
Creativity is intentionally distributed. Do not make every dimension unconventional at once.

- Overall: ${pct(dna.novelty.overall)}
- Layout: ${pct(dna.novelty.layout)}
- Typography: ${pct(dna.novelty.typography)}
- Motion: ${pct(dna.novelty.motion)}
- Color: ${pct(dna.novelty.color)}
- Navigation: ${pct(dna.novelty.navigation)}
- Interaction: ${pct(dna.novelty.interaction)}

## Vibe vocabulary
${dna.vibes.map((item) => `- ${item}`).join("\n") || "- none supplied"}

## Explicitly avoid
${dna.avoid.map((item) => `- ${item}`).join("\n")}

## Guardrails
- Accessibility: ${dna.constraints.accessibility ? "required" : "project-defined"}
- Responsive behavior: ${dna.constraints.responsive ? "required" : "project-defined"}
- Performance posture: ${dna.constraints.performance}

## Implementation rules
1. Do not begin from a generic landing-page skeleton and merely restyle it.
2. Establish hierarchy, composition, rhythm, and visual tension before polishing components.
3. At least one major section must deliberately break the default component grid.
4. Preserve familiar interaction patterns where the navigation novelty budget is low.
5. Repetition must create rhythm; it must not be the accidental result of reusing one card component everywhere.
6. Decorative effects need a compositional or semantic reason to exist.
7. Before considering the work complete, ask: **what visual decision here could not have come from a generic template?**
`;
}
