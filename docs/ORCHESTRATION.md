# safetydeck orchestration

Safetydeck is designed for safe local orchestration by humans, agents, and CI.

## Default workflow

1. Edit a profile in `examples/profiles` or a private local directory.
2. Choose a template in `examples/templates`.
3. Run `safetydeck generate`.
4. Review the Markdown manually.
5. Update `completed` or `acceptedRisk` in the profile.
6. Regenerate when context changes.

## Agent rules

- Read only the profile/template paths provided by the user.
- Do not search home directories for secrets or accounts.
- Do not call network APIs as part of generation.
- Do not mark items complete unless the user provides evidence.
- Prefer writing output to an explicit path.

## CI rules

The local validation gate is:

```sh
npm run check
npm test
npm run build
npm run smoke
bash scripts/validate.sh
```

## Release rules

- Publish only from `main` after CI passes.
- Keep templates attributed and original.
- Treat vulnerability reports via `SECURITY.md`.
