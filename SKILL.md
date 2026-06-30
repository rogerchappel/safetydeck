---
name: safetydeck
description: Generate local-first security checklist action plans from reviewed JSON profiles.
version: 0.1.0
targets: [codex, claude, openclaw, agents]
tags: [security, checklist, planning, local-first]
---

# safetydeck

Use this skill when an agent needs to turn a local security profile and checklist template into a reviewable Markdown action plan.

## Inputs

- A local JSON profile describing stage, assets, tools, concerns, completed items, and accepted risks.
- A local JSON checklist template with item ids, actions, risk levels, effort levels, tags, and optional stage filters.
- An output path when a Markdown plan should be written.

Do not include secrets, tokens, backup codes, private keys, customer records, or live credentials in profile or template files.

## Tools

- `safetydeck inspect --profile <profile.json> --template <template.json>` previews plan counts and top items.
- `safetydeck generate --profile <profile.json> --template <template.json> --output <plan.md>` writes a Markdown tracker.
- `safetydeck init --output <dir>` creates starter local profile and template files.

## Side Effects

`inspect` is read-only. `generate` writes only the requested Markdown output. `init` writes starter files under the requested directory. Safetydeck does not scan live accounts, call external services, collect credentials, mutate security settings, publish reports, or verify account state.

## Approval Boundaries

Ask for explicit approval before sharing generated plans outside the local workspace, converting accepted-risk items into permanent policy, or adding any future live-account scanner. Treat the generated plan as a prompt for human review, not as proof that settings are secure.

## Examples

```sh
safetydeck inspect --profile examples/profiles/team-app.json --template examples/templates/startup-baseline.json
safetydeck generate --profile examples/profiles/solo-founder.json --template examples/templates/startup-baseline.json --output tmp/security-plan.md
```

## Validation

Run the local release checks before recommending the skill:

```sh
npm run check
npm test
npm run smoke
npm run package:smoke
```
