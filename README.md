# Creative UI

**A framework-agnostic art-direction layer for AI coding agents.**

Creative UI exists because generated frontends are getting technically competent while converging on the same visual defaults: centered heroes, three cards, purple gradients, rounded rectangles, glass, bento grids and a suspicious amount of `max-w-7xl mx-auto`.

The project separates **design intent** from implementation. Users define a Design DNA, novelty budget and visual lineage. Agents consume those constraints before touching frontend code.

> Status: experimental v0.1. Target projects do **not** need React, TSX, Tailwind or any specific framework.

## Implemented

- framework-agnostic Design DNA schema
- novelty budgets by visual dimension
- composition grammars instead of page templates
- Visual Lineage Engine with 100+ human art/design references
- channel-specific borrowing: composition, geometry, type, color, texture, motion, imagery, interaction and symbolism
- recommendation + counterbalance engine
- terminal Design Director built with Ink
- local browser Studio editing the same `.creative-ui` state
- static anti-slop analysis and prioritized `unslop` plans
- Playwright responsive screenshot + DOM-metric capture
- agent adapters for `AGENTS.md`, `CLAUDE.md` and Cursor rules
- agent-facing Creative UI skill

## Packages

- `@creative-ui/core` — schema, DNA, brief generation, critique and anti-slop heuristics
- `@creative-ui/lineage` — catalog, search, recommendation and synthesis
- `@creative-ui/cli` — terminal UI and commands
- `@creative-ui/studio` — local browser UI
- `@creative-ui/inspector` — Playwright screenshots and DOM metrics
- `@creative-ui/adapters` — agent instruction integrations
- `skill/` — reusable agent-facing methodology

## Start

```bash
pnpm install
pnpm build
pnpm creative-ui init
```

The Design Director writes `.creative-ui/design-dna.json` and generated `.creative-ui/DESIGN.md`.

## Commands

```bash
pnpm creative-ui init
pnpm creative-ui inspect
pnpm creative-ui studio
pnpm creative-ui lineage list --query "Brazil print"
pnpm creative-ui lineage recommend
pnpm creative-ui lineage add constructivism --weight 0.4 --borrow composition,geometry,typography
pnpm creative-ui lineage synthesize
pnpm creative-ui critique .
pnpm creative-ui unslop .
pnpm creative-ui capture http://localhost:3000
pnpm creative-ui install-rules
```

For browser capture, install Chromium once:

```bash
pnpm exec playwright install chromium
```

## Visual lineage, not themes

A reference is a **principle library**, not a CSS preset. Selecting Constructivism should not automatically make a page red. Selecting Art Nouveau should not spray floral ornaments around the viewport.

```json
{
  "referenceId": "ukiyo-e",
  "weight": 0.35,
  "borrow": ["composition", "imagery"]
}
```

A project can use Swiss Style for typographic hierarchy, Ukiyo-e for crop/depth, Brutalism for spatial mass and scientific engraving for annotations without turning any of them into costume.

## Novelty budget

Creative UI distributes experimentation rather than maximizing it everywhere. High layout novelty plus low navigation novelty can mean: **go wild with composition; leave the navigation understandable.**

## Anti-slop

`creative-ui critique` statically inspects HTML, CSS, JS/TS, JSX/TSX, Vue, Svelte and Astro. `creative-ui unslop` writes `.creative-ui/UNSLOP.md`. `capture` creates responsive screenshots and DOM metrics for human or multimodal-agent review.

Static heuristics cannot tell whether a design is actually good. They exist to catch repeated defaults, not to replace art direction.

## Philosophy

Creativity should be intentional, not random. Accessibility, responsiveness and usability are not enemies of experimentation. The system should know **where it is allowed to be strange** and where convention is useful.

> **What visual decision here could not have come from a generic template?**

If there is no strong answer, another pass is needed.

## License

MIT
