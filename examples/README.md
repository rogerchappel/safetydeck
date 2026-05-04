# Examples

- `profiles/solo-founder.json` shows a one-person software business.
- `profiles/team-app.json` shows a small team with some accepted risk.
- `templates/startup-baseline.json` is the MVP checklist template.

Generate a plan:

```sh
node ../dist/cli.js generate --profile profiles/solo-founder.json --template templates/startup-baseline.json --output output/solo-founder-plan.md
```
