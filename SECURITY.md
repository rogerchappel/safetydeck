# Security Policy

Safetydeck is a planning tool, not a scanner. Its safest behavior is deliberate: local files in, Markdown out.

## Supported versions

The current `main` branch and latest published package, once published, receive security fixes.

## Reporting a vulnerability

Please open a private GitHub security advisory or contact the maintainer through the repository owner profile. Include:

- affected version or commit
- reproduction steps
- impact
- whether any secret or private data was exposed

## Sensitive data

Do not include secrets, tokens, backup codes, private keys, customer data, or full account inventories in issues, PRs, profiles, or generated plans.

## Security boundaries

A vulnerability includes behavior that:

- reads files outside explicit user-provided paths unexpectedly
- sends profile/template/generated content over the network without explicit opt-in
- encourages storing secrets in generated Markdown
- marks controls as verified when only local planning happened

Out-of-date checklist advice is important, but usually handled as a normal issue unless it creates immediate user harm.
