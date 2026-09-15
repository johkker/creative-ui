# Creative UI

**A framework-agnostic art-direction layer for AI coding agents.**

Creative UI exists because generated frontends are getting technically competent while converging on the same visual defaults: centered heroes, three cards, purple gradients, rounded rectangles, glass, bento grids and a suspicious amount of `max-w-7xl mx-auto`.

The project separates **design intent** from implementation. Users define a Design DNA, novelty budget and visual lineage. Agents consume those constraints before touching frontend code.

> Status: experimental v0.1. Target projects do **not** need React, TSX, Tailwind or any specific framework.

## Quick start

Run it directly in any frontend project:

```bash
npx creative-ui-agent init
```

or with pnpm:

```bash
pnpm dlx creative-ui-agent init
```

This writes:

```text
.creative-ui/
├── design-dna.json
└── DESIGN.md
```

Then generate agent rules:

```bash
npx creative-ui-agent install-rules
```

If you prefer a global command:

```bash
npm install -g creative-ui-agent
creative-ui init
```

## Typical workflow

```bash
# 1. Define the visual DNA
npx creative-ui-agent init

# 2. Open the browser-based art-direction studio
npx creative-ui-agent studio

# 3. Explore human visual-language references
npx creative-ui-agent lineage recommend
npx creative-ui-agent lineage list --query "Brazil print"
npx creative-ui-agent lineage add constructivism --weight 0.4 --borrow composition,geometry,typography
npx creative-ui-agent lineage synthesize

# 4. Install rules for coding agents
npx creative-ui-agent install-rules

# 5. Review an existing frontend
npx creative-ui-agent critique .
npx creative-ui-agent unslop .

# 6. Capture responsive screenshots + DOM metrics
npx creative-ui-agent capture http://localhost:3000
```

The `capture` command uses Playwright. Install Chromium once if needed:

```bash
npx playwright install chromium
```

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

## Packages inside the monorepo

The npm distribution is intentionally a **single package** (`creative-ui-agent`) for easy use. Internally the repository remains modular:

- `@creative-ui/core` — schema, DNA, brief generation, critique and anti-slop heuristics
- `@creative-ui/lineage` — catalog, search, recommendation and synthesis
- `@creative-ui/cli` — terminal UI and commands
- `@creative-ui/studio` — local browser UI
- `@creative-ui/inspector` — Playwright screenshots and DOM metrics
- `@creative-ui/adapters` — agent instruction integrations
- `skill/` — reusable agent-facing methodology

The internal workspace packages are bundled into the public CLI and are not required in target projects.

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

## Local development

```bash
git clone https://github.com/johkker/creative-ui.git
cd creative-ui
pnpm install
pnpm verify
pnpm creative-ui init
```

## Philosophy

Creativity should be intentional, not random. Accessibility, responsiveness and usability are not enemies of experimentation. The system should know **where it is allowed to be strange** and where convention is useful.

> **What visual decision here could not have come from a generic template?**

If there is no strong answer, another pass is needed.

## License

MIT
