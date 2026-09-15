# Creative UI Agent Skill

## Purpose

Use this skill when designing or implementing a frontend whose visual identity matters. The goal is not merely to make the interface polished; it is to create a coherent art direction while preserving usability, accessibility, responsiveness, and performance.

## Required inputs

Before implementation, look for these project files:

- `.creative-ui/design-dna.json`
- `.creative-ui/DESIGN.md`

If both exist, treat them as design constraints. `design-dna.json` is the machine-readable source of truth; `DESIGN.md` is the human/agent-readable interpretation.

## Workflow

1. Read the project brief and existing product constraints.
2. Read Creative UI design DNA.
3. State the visual concept in one sentence internally before implementation.
4. Establish composition, hierarchy, rhythm, and typography before micro-styling.
5. Implement the page without defaulting to a generic landing-page archetype.
6. Preserve conventional interaction patterns when their novelty budget is low.
7. Inspect the result at mobile, tablet, desktop, and wide-desktop widths.
8. Critique originality, consistency, hierarchy, legibility, responsiveness, and accessibility.
9. Refine obvious template-like patterns before declaring the work complete.

## Non-negotiable design rules

- Do not confuse creativity with random decoration.
- Do not make every visual dimension unconventional at once.
- Do not use cards as the universal content primitive.
- Do not choose gradients, glass, glow, blur, rounded corners, or bento grids merely because they look modern.
- Repetition must create rhythm, comparison, or system coherence.
- Typography is part of composition, not just a font choice.
- Empty space and density are intentional variables.
- Responsive layouts may recompose; they do not need to be scaled-down desktop screenshots.
- At least one major compositional decision should visibly express the project's design DNA.
- Accessibility and clear interaction affordances are constraints, not enemies of experimentation.

## Novelty budget

Read the novelty budget as permission, not obligation. A high score means exploration is welcome in that dimension. A low score means preserve familiar conventions.

Example: high layout novelty + low navigation novelty means the page structure may be unexpected while menus, links, focus states, and navigation behavior should remain immediately understandable.

## Composition over templates

Treat composition names as grammars rather than templates. They describe relationships between visual masses, hierarchy, alignment, overlap, pacing, and negative space. Never reproduce the same exact arrangement merely because two projects share a composition label.

## Anti-slop review

Before completion, explicitly check for:

- centered hero + subtitle + CTA + mockup as an unquestioned default;
- identical three-card or six-card feature grids;
- decorative purple/blue gradients;
- every content block inside a rounded rectangle;
- repetitive vertical section rhythm;
- gratuitous glassmorphism;
- excessive pill-shaped controls;
- generic icon + title + paragraph repetition;
- visual effects with no relationship to the concept;
- a page that could swap its logo and copy with another startup without changing the composition.

If several appear, revise the composition rather than merely changing colors.

## Completion question

Before finishing, ask:

**What visual decision on this page could not have come from a generic template?**

If there is no strong answer, the design needs another pass.
