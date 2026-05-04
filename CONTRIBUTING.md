# Contributing

Thanks for helping make security planning less painful and less creepy.

## Local setup

```sh
npm install
npm test
```

## Development loop

- Keep changes small and reviewable.
- Add or update fixtures for behavior changes.
- Run `npm run check`, `npm test`, and `npm run smoke` before opening a PR.
- Run `bash scripts/validate.sh` before asking for release review.

## Template contributions

Templates must be original writing. It is fine to learn from public guidance, but do not copy checklist text from other projects or vendors. Include references when they help users understand why an item matters.

## Safety expectations

- Do not add telemetry.
- Do not read credentials.
- Do not make network calls from generation paths.
- Make external integrations explicit opt-in and easy to audit.

## Commit style

Use short conventional-ish messages such as `feat: add profile parser` or `docs: explain safety boundary`.
