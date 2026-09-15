# Creative UI

A design-direction layer for AI coding agents that helps them build frontends with stronger art direction, controlled experimentation, and fewer generic AI patterns.

> Status: early MVP.

Creative UI separates **design intent** from implementation. A user defines a visual DNA through a terminal UI, and agents consume the resulting `.creative-ui/` artifacts before writing frontend code.

## Core ideas

- Design DNA instead of vague prompts
- Novelty budgets by dimension
- Composition grammars instead of page templates
- Explicit anti-slop heuristics
- Agent-readable design briefs
- TUI-first direction, visual Studio later

## Planned workflow

```text
brief -> design direction -> design DNA -> agent brief -> implementation -> screenshot critique -> refinement
```

## Packages

- `@creative-ui/core` — schemas, defaults, design brief generation, heuristics
- `@creative-ui/cli` — interactive terminal UI and project commands
- `skill/` — agent-facing creative frontend skill

## MVP commands

```bash
pnpm install
pnpm build
pnpm creative-ui init
pnpm creative-ui inspect
```

The initial MVP writes:

```text
.creative-ui/
├── design-dna.json
└── DESIGN.md
```

## Philosophy

Creativity should be intentional, not random. The system can push composition, typography, motion, texture, or interaction while preserving usability and accessibility. It should also actively detect generic generated-UI tropes such as repetitive cards, unnecessary gradients, uniform section rhythm, and excessive rounded containers.

## Roadmap

1. Design DNA schema + interactive TUI
2. Agent skill + generated design brief
3. `critique` and `unslop` heuristics
4. Playwright screenshot analysis pipeline
5. Web Studio for visual direction
6. Agent adapters / MCP integration

## License

MIT
