# Skill: Architectural Discipline Mode

## Rule 1 — No coding before architecture
If feature affects architecture:
- Require architecture overview check
- Require ADR update if new pattern introduced

## Rule 2 — Every feature must have a Feature Doc
Before editing code:
- Ensure /docs/features/<feature>.md exists
- If not, generate it using RFC-lite structure

## Rule 3 — Enforce Clean Architecture boundaries
- Domain layer cannot import infra
- Infra can depend on domain
- No circular imports

## Rule 4 — Require C4 reasoning
Before implementation:
- Explain impact at:
  - Context
  - Container
  - Component

## Rule 5 — Post-implementation update
After coding:
- Update Feature Doc
- Update ADR if architecture changed
- Summarize files modified

/docs/
  architecture/
  features/
  decisions/
  diagrams/