# safetydeck

Safetydeck turns small local JSON profiles and checklist templates into practical Markdown security action plans. It is intentionally boring in the best way: no account scanning, no hidden network calls, no telemetry, no credential collection — just deterministic planning files you can review, edit, and commit.

It is for solo builders and small teams who want a crisp security baseline without pretending a checklist is an auditor.

## Quick start

```sh
npm install
npm run build
node dist/cli.js generate \
  --profile examples/profiles/solo-founder.json \
  --template examples/templates/startup-baseline.json \
  --output tmp/solo-founder-plan.md
```

Inspect only the summary:

```sh
node dist/cli.js inspect --profile examples/profiles/team-app.json --template examples/templates/startup-baseline.json
```

Create starter local files:

```sh
node dist/cli.js init --output tmp/my-safetydeck
```

## Why I like this shape

Security checklists can get weirdly performative. Safetydeck aims for the useful middle: enough structure to prompt action, enough humility to admit a Markdown file cannot prove your accounts are safe.

## What it generates

Safetydeck outputs a Markdown tracker with:

- a plain-language safety boundary
- profile context and assets
- progress counts
- prioritized checklist items
- checkbox statuses for todo, done, and accepted risk
- evidence prompts that avoid storing secrets

## Safety notes

- Do not put secrets, tokens, backup codes, customer data, or private keys in profiles/templates.
- Safetydeck does not verify live settings. It helps humans plan reviews.
- External scanning is out of scope for the MVP and should be explicit opt-in if ever added.
- Generated Markdown is safe to store locally, but review before sharing publicly.

## Inspiration and attribution

This project was inspired by the practical value of public security checklist projects, including Vincent Koc's `security-checklist` repository: <https://github.com/vincentkoc/security-checklist>. Safetydeck is a fresh local-first implementation and does not copy that project's code or content.

## Development

```sh
npm test
npm run check
npm run build
npm run smoke
bash scripts/validate.sh
```

## CLI

```txt
safetydeck generate --profile <profile.json> --template <template.json> [--output plan.md]
safetydeck inspect --profile <profile.json> --template <template.json>
safetydeck init --output <directory>
```

## Library

```ts
import { generateMarkdownPlan } from 'safetydeck';

const { plan, markdown } = await generateMarkdownPlan({
  profilePath: 'examples/profiles/solo-founder.json',
  templatePath: 'examples/templates/startup-baseline.json'
});
```

## Contributing and security

See [CONTRIBUTING.md](CONTRIBUTING.md) and [SECURITY.md](SECURITY.md).

## License

MIT
