# safetydeck PRD

## Summary

Safetydeck is a local-first CLI/library that converts a human-authored security profile and checklist template into a Markdown action plan/progress tracker.

## Problem

Solo builders and small teams often know they should improve MFA, backups, recovery, and incident prep, but security guidance is scattered, too broad, or tied to vendor scanners. They need a small deterministic planning tool that turns context into an actionable review list without asking for account access.

## Goals

- Generate useful Markdown plans from local files.
- Keep profiles/templates simple enough to hand edit.
- Prioritize items by risk, effort, profile stage, and matching tags.
- Make safety boundaries explicit in generated output.
- Provide fixture-backed tests and a real CLI smoke path.

## Non-goals

- No default account scanning or SaaS integrations.
- No telemetry, credential handling, or secret storage.
- No claims of compliance certification.
- No copied implementation or checklist text from inspiration projects.

## Personas

- Solo founder: wants the 10 things that reduce takeover and data-loss risk quickly.
- Team security champion: wants a shareable Markdown tracker for lightweight reviews.
- Agent/developer workflow user: wants deterministic fixtures and local output for automation.

## MVP Requirements

1. Parse a JSON profile with stage, assets, tools, concerns, completed items, and accepted risks.
2. Parse a JSON checklist template with risk, effort, tags, stage filters, and evidence prompts.
3. Generate a prioritized plan from local inputs.
4. Render Markdown with checkboxes and safety notes.
5. Expose CLI commands for generate, inspect, and init.
6. Include examples, tests, smoke checks, and validation script.

## Success Metrics

- A new user can generate a plan from fixtures in under one minute.
- `npm test`, `npm run check`, `npm run build`, `npm run smoke`, and `bash scripts/validate.sh` pass locally.
- Generated plans never imply live verification.

## Open Questions

- Whether to add YAML support after the JSON MVP.
- Whether templates should become a separately versioned community package.
- How to model recurring review cadence without becoming project management software.
