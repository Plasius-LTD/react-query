# @plasius/react-query

[![npm version](https://img.shields.io/npm/v/@plasius/react-query.svg)](https://www.npmjs.com/package/@plasius/react-query)
[![Build Status](https://img.shields.io/github/actions/workflow/status/Plasius-LTD/react-query/ci.yml?branch=main&label=build&style=flat)](https://github.com/Plasius-LTD/react-query/actions/workflows/ci.yml)
[![coverage](https://img.shields.io/codecov/c/github/Plasius-LTD/react-query)](https://codecov.io/gh/Plasius-LTD/react-query)
[![License](https://img.shields.io/github/license/Plasius-LTD/react-query)](./LICENSE)
[![Code of Conduct](https://img.shields.io/badge/code%20of%20conduct-yes-blue.svg)](./CODE_OF_CONDUCT.md)
[![Security Policy](https://img.shields.io/badge/security%20policy-yes-orange.svg)](./SECURITY.md)
[![Changelog](https://img.shields.io/badge/changelog-md-blue.svg)](./CHANGELOG.md)

Public package for lightweight query, mutation, and cache hooks used in Plasius React applications.


## Install

```bash
npm install @plasius/react-query
```

## Module formats

This package publishes dual ESM and CJS artifacts.
When CJS output is emitted under `dist-cjs/*.js` with `type: module`, `dist-cjs/package.json` is generated with `{ "type": "commonjs" }` to ensure Node `require(...)` compatibility.


## Usage

```ts
import { useQuery, useMutation, useQueryClient } from "@plasius/react-query";
```

## Development

```bash
npm ci
npm run lint
npm run typecheck
npm run build
npm test
```

## Quality Gates

- CI enforces `lint`, `typecheck`, runtime dependency audit (`npm audit --omit=dev --audit-level=high`), tests, and coverage gate (line coverage >= 80%).
- Local coverage checks run via `npm run test:coverage`.

## Governance

- Security policy: [SECURITY.md](./SECURITY.md)
- Code of conduct: [CODE_OF_CONDUCT.md](./CODE_OF_CONDUCT.md)
- ADRs: [docs/adrs](./docs/adrs)
- Legal docs: [legal](./legal)

## License

MIT

<!-- BEGIN PLASIUS RELEASE INTEGRITY -->
## Release integrity

CI keeps the administrative contributor registry outside Git and npm package
artifacts using exact, case-normalised path checks. CI runs only on trusted
repository pushes, using `Public CI - Quarantined` and explicit
`[self-hosted, Linux, X64]` labels, bounded jobs, non-persistent checkout
credentials and disabled package-manager cache finalization. PR/manual triggers
and fork PR code are denied. Pre-merge CI requires a reviewed branch protected
against updates (including administrators) and fork synchronization before its
exact workflow ref is temporarily admitted. Remove admission before unlocking,
changing or deleting the branch; preserve unrelated runner access. See
[ADR 0005](docs/adrs/adr-0005-trusted-self-hosted-ci.md) for operator steps.
Publication uses the GitHub-hosted `production` job with Node 24 and a pinned
npm 11.6.2 client. It is token-free and proceeds only while the prepared SHA
is the exact `main` head after successful push-triggered CI. Do not dispatch CD
until the npm trusted-publisher binding is verified. The inherited stored flag
`platform.public-artifact-integrity.enabled` controls restoration, never mandatory
integrity checks. Disabled, missing or unavailable state retains containment;
enabled state allows only verified clean releases. No capability is needed.
Rollback disables the affected workflow/channel and retains a known clean
package pointer; it never restores private records or token-based publication.
<!-- END PLASIUS RELEASE INTEGRITY -->
