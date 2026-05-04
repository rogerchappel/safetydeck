# safetydeck task plan

## Done in MVP

- [x] Rename package metadata to `safetydeck`.
- [x] Add strict TypeScript build.
- [x] Define profile, template, plan, and checklist types.
- [x] Add local JSON profile parsing.
- [x] Add local JSON template parsing.
- [x] Prioritize plan items by risk, effort, and profile tags.
- [x] Render Markdown action plans.
- [x] Add `generate`, `inspect`, and `init` CLI commands.
- [x] Add solo-founder and team fixtures.
- [x] Add local-first README, security, and contribution guidance.
- [x] Add unit tests and CLI smoke coverage.

## Near next

- [ ] Add optional YAML input support.
- [ ] Add a template lint command with clearer diagnostics.
- [ ] Add recurring review dates to generated Markdown.
- [ ] Add more templates for home lab, open-source maintainer, and agency teams.
- [ ] Publish package after repository settings are protected.

## Guardrails

- [ ] Any integration that reads external accounts must be explicit opt-in.
- [ ] Generated output must continue to say it is not live verification.
- [ ] Tests should cover privacy and no-network assumptions as features, not footnotes.
