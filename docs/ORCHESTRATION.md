# Orchestration

Owner: one isolated OpenClaw sub-agent for the 2026-05-05 twice-daily OSS factory run.

## Waves

1. Scaffold baseline and verify generated package.
2. Implement local-first MVP from docs/PRD.md.
3. Add fixture-backed tests and CLI smokes.
4. Improve README, examples, safety, contributing, metadata, GitHub description/topics.
5. Commit atomically, publish public GitHub repo, protect main best-effort.

## Boundaries

- This agent owns only `safetydeck`.
- No secrets, no telemetry, no hidden network calls.
- Mutating commands must be explicit and documented.
