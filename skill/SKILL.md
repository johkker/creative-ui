# Creative UI Agent Skill

## Purpose

Use this skill when designing or implementing a frontend whose visual identity matters. The objective is coherent art direction with usability, accessibility, responsiveness and performance — not generic polish.

## Required project context

Before frontend implementation, look for `.creative-ui/design-dna.json`, `.creative-ui/DESIGN.md` and `.creative-ui/UNSLOP.md` when present. `design-dna.json` is the source of truth.

## Workflow

1. Read product/content requirements before visual references.
2. Read Design DNA and novelty budget.
3. Read selected visual-lineage references and requested channels.
4. State the visual concept in one sentence internally before implementation.
5. Establish composition, hierarchy, rhythm and typography before micro-styling.
6. Implement within the project's existing framework. Never add React/Tailwind/etc. merely because Creative UI itself uses TypeScript.
7. Preserve familiar interactions where navigation novelty is low.
8. Inspect mobile, tablet, desktop and wide layouts; recomposition is preferable to blind scaling.
9. Run/consider anti-slop and visual critique.
10. Refine structural defaults before completion.

## Visual lineage

Named art/design references are principle libraries, not themes. Borrow only selected channels: composition, geometry, typography, color, texture, motion, imagery, interaction or symbolism.

Never translate `Art Nouveau` into "flowers + beige", `Constructivism` into "red + diagonal", `Bauhaus` into "primary-color circles", or `Brutalism` into "gray concrete" by reflex.

For living, sacred, Indigenous or culturally specific traditions, prefer structural principles and contextual understanding. Do not lift sacred symbols or identity-bearing motifs merely as decoration. See `references/visual-lineage.md`.

## Novelty budget

A high score is permission to explore; a low score protects convention. High layout novelty + low navigation novelty means composition may surprise while wayfinding remains obvious.

## Non-negotiable rules

- Do not confuse creativity with random decoration.
- Do not use cards as the universal content primitive.
- Do not choose gradients, glass, glow, blur, huge rounded corners or bento grids merely because they signal modern UI.
- Repetition must create rhythm, comparison or system coherence.
- Typography is composition, not merely font selection.
- Density and empty space are deliberate variables.
- Responsive interfaces may recompose substantially.
- Accessibility and discoverability remain constraints even in experimental work.
- At least one major decision should visibly express the project's specific Design DNA.

## Completion question

**What visual decision on this page could not have come from a generic template?** If there is no strong answer, another pass is required.
