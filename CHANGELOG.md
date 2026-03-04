# Changelog

All notable changes to this project will be documented in this file.

The format is based on **[Keep a Changelog](https://keepachangelog.com/en/1.1.0/)**, and this project adheres to **[Semantic Versioning](https://semver.org/spec/v2.0.0.html)**.

---

## [Unreleased]

- **Added**
  - (placeholder)

- **Changed**
  - (placeholder)

- **Fixed**
  - (placeholder)

- **Security**
  - (placeholder)

## [1.0.11] - 2026-03-01

- **Added**
  - (placeholder)

- **Changed**
  - (placeholder)

- **Fixed**
  - (placeholder)

- **Security**
  - (placeholder)

## [1.0.9] - 2026-03-01

- **Added**
  - (placeholder)

- **Changed**
  - (placeholder)

- **Fixed**
  - Enforced CommonJS runtime compatibility for dual-build output by generating and validating `dist-cjs/package.json` (`type: commonjs`) during build and package verification.
  - (placeholder)

- **Security**
  - (placeholder)

## [1.0.8] - 2026-02-28

- **Added**
  - Added hook and cache unit tests for `useQuery`, `useMutation`, `useQueryClient`, and `globalCache`.
  - Added ESLint flat configuration (`eslint.config.js`) for ESLint v10 compatibility.

- **Changed**
  - Tightened CI to run lint, typecheck, runtime dependency audit, build, and coverage checks on push/PR.
  - Updated Vitest configuration to `jsdom`, disabled `passWithNoTests`, and added coverage thresholds.
  - Added explicit `typecheck` script and `license` metadata in `package.json`.

- **Fixed**
  - Restored working lint execution for modern ESLint versions.
  - Removed false-positive coverage pass condition by requiring real test files.

- **Security**
  - Enforced runtime dependency audit in package CI using `npm audit --omit=dev --audit-level=high`.

## [1.0.7] - 2026-02-28

- **Added**
  - (placeholder)

- **Changed**
  - (placeholder)

- **Fixed**
  - (placeholder)

- **Security**
  - (placeholder)

## [1.0.6] - 2026-02-22

- **Added**
  - (placeholder)

- **Changed**
  - (placeholder)

- **Fixed**
  - (placeholder)

- **Security**
  - (placeholder)

## [1.0.5] - 2026-02-22

- **Added**
  - (placeholder)

- **Changed**
  - (placeholder)

- **Fixed**
  - (placeholder)

- **Security**
  - (placeholder)

## [1.0.4] - 2026-02-22

- **Added**
  - (placeholder)

- **Changed**
  - (placeholder)

- **Fixed**
  - (placeholder)

- **Security**
  - (placeholder)

## [1.0.3] - 2026-02-12

- **Added**
  - Standalone public package scaffold at repository root with independent CI/CD, ADRs, and legal governance assets.

- **Changed**
  - Add dual ESM + CJS build outputs with `exports` entries and CJS artifacts in `dist-cjs/`.

- **Fixed**
  - Removed monorepo-relative TypeScript configuration coupling for standalone builds.

- **Security**
  - Added baseline public package governance and CLA documentation.

---

## Release process (maintainers)

1. Update `CHANGELOG.md` under **Unreleased** with user-visible changes.
2. Bump version in `package.json` following SemVer (major/minor/patch).
3. Move entries from **Unreleased** to a new version section with the current date.
4. Tag the release in Git (`vX.Y.Z`) and push tags.
5. Publish to npm (via CI/CD or `npm publish`).

> Tip: Use Conventional Commits in PR titles/bodies to make changelog updates easier.

---

[Unreleased]: https://github.com/Plasius-LTD/react-query/compare/v1.0.11...HEAD

## [1.0.0] - 2026-02-11

- **Added**
  - Initial release.

- **Changed**
  - (placeholder)

- **Fixed**
  - (placeholder)

- **Security**
  - (placeholder)
[1.0.3]: https://github.com/Plasius-LTD/react-query/releases/tag/v1.0.3
[1.0.4]: https://github.com/Plasius-LTD/react-query/releases/tag/v1.0.4
[1.0.5]: https://github.com/Plasius-LTD/react-query/releases/tag/v1.0.5
[1.0.6]: https://github.com/Plasius-LTD/react-query/releases/tag/v1.0.6
[1.0.7]: https://github.com/Plasius-LTD/react-query/releases/tag/v1.0.7
[1.0.8]: https://github.com/Plasius-LTD/react-query/releases/tag/v1.0.8
[1.0.9]: https://github.com/Plasius-LTD/react-query/releases/tag/v1.0.9
[1.0.11]: https://github.com/Plasius-LTD/react-query/releases/tag/v1.0.11
