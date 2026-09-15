import type { DesignDNA } from "./schema.js";

const pct = (value: number) => `${Math.round(value * 100)}%`;

function lineageSection(dna: DesignDNA): string {
  if (!dna.visualLineage.length) {
    return "- No named references selected. Build from the DNA itself rather than inventing a default trend.";
  }

  return dna.visualLineage
    .map((item) => `- ${item.referenceId} — ${pct(item.weight)} influence; borrow: ${item.borrow.join(", ")}${item.notes ? `; note: ${item.notes}` : ""}`)
    .join("\n");
}

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
Creativity is intentionally distributed. A high value is permission to experiment, not an instruction to make the dimension weird.

- Overall: ${pct(dna.novelty.overall)}
- Layout: ${pct(dna.novelty.layout)}
- Typography: ${pct(dna.novelty.typography)}
- Motion: ${pct(dna.novelty.motion)}
- Color: ${pct(dna.novelty.color)}
- Navigation: ${pct(dna.novelty.navigation)}
- Interaction: ${pct(dna.novelty.interaction)}
- Imagery: ${pct(dna.novelty.imagery)}
- Texture: ${pct(dna.novelty.texture)}

## Visual lineage
Use historical and visual references as principle libraries, never as costumes. Extract the requested channels and translate them into interface behavior.
${lineageSection(dna)}

## Vibe vocabulary
${dna.vibes.map((item) => `- ${item}`).join("\n") || "- none supplied"}

## Explicitly avoid
${dna.avoid.map((item) => `- ${item}`).join("\n")}

## Guardrails
- Accessibility: ${dna.constraints.accessibility ? "required" : "project-defined"}
- Responsive behavior: ${dna.constraints.responsive ? "required" : "project-defined"}
- Performance posture: ${dna.constraints.performance}
- Conventional navigation affordances: ${dna.constraints.preserveConventionalNavigation ? "preserve unless explicitly justified" : "project-defined"}

## Implementation rules
1. Do not begin from a generic landing-page skeleton and merely restyle it.
2. Establish hierarchy, composition, rhythm, and typography before micro-styling.
3. At least one major section must deliberately break the default component grid when layout novelty permits it.
4. Preserve familiar interaction patterns where navigation novelty is low.
5. Repetition must create rhythm, comparison, or system coherence; it must not be accidental component reuse.
6. Decorative effects need a compositional, semantic, or material reason to exist.
7. Named art references are not presets. Borrow principles, not recognizable surface clichés.
8. Responsive layouts may recompose instead of shrinking the desktop arrangement.
9. Before considering the work complete, ask: **what visual decision here could not have come from a generic template?**
`;
}
