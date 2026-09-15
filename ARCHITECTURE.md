# Creative UI Architecture

## Constraints

1. **Target-framework independence.** No target project should require React, TSX, Tailwind or a JavaScript framework merely to use Creative UI.
2. **One state model.** TUI, Studio, agent skill and future plugins all read `.creative-ui/design-dna.json`.
3. **Named references are data, not components.** Lineage references provide principles and translation channels; they never ship ready-made themes.
4. **Adapters stay at the edge.** Agent-specific rules and future framework AST fixes cannot leak into the core schema.
5. **Critique before mutation.** `unslop` produces interventions first; framework-aware rewriting belongs behind explicit adapters.

## Dependency direction

`core` is dependency-free from other Creative UI packages. `lineage` depends on core. Studio depends on core + lineage. CLI orchestrates core, lineage, Studio, inspector and adapters. Inspector/adapters remain edge packages.

## `.creative-ui` contract

`design-dna.json` is the machine-readable source of truth. `DESIGN.md` is generated and disposable. Critique artifacts may include `UNSLOP.md` and `captures/` screenshots plus `inspection.json`.

## Future extension points

- framework AST adapters for safe `unslop --fix`
- MCP/server integration
- shareable Design DNA profiles
- richer reference packs maintained by domain experts
- screenshot multimodal critique providers
- learned reference recommendation with deterministic local fallback
