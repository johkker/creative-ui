# Publishing Creative UI

The public npm package is **`creative-ui-agent`**. The installed binary is **`creative-ui`** (with `creative-ui-agent` as an alias).

## First publication

The first npm publication needs to establish ownership of the package name. From a trusted local machine:

```bash
npm login
pnpm install
pnpm verify
npm publish --access public
```

If npm requires an OTP, complete the normal 2FA challenge.

After the first version exists on npm, configure **Trusted Publishing** for future releases:

- npm package: `creative-ui-agent`
- provider: GitHub Actions
- GitHub owner: `johkker`
- repository: `creative-ui`
- workflow filename: `publish.yml`
- allow direct `npm publish`

The workflow uses GitHub OIDC (`id-token: write`) so future releases do not need a long-lived npm publishing token.

## Future releases

1. Bump `version` in the root `package.json` and the CLI version displayed in `packages/cli/src/index.tsx`.
2. Merge the release change to `main`.
3. Create/publish a GitHub Release.
4. `.github/workflows/publish.yml` verifies and publishes the package to npm.

You can also run the workflow manually from GitHub Actions.

## Emergency token fallback

The publish workflow also accepts `NODE_AUTH_TOKEN` through an optional `NPM_TOKEN` repository secret. This is intended only as a bootstrap/fallback path. Trusted Publishing is preferred because it uses short-lived OIDC credentials instead of a reusable write token.

## Package validation

Before every publish:

```bash
pnpm verify
```

This runs package builds, TypeScript checks, the public CLI bundle build, and `npm pack --dry-run` so accidental workspace dependencies or missing files are caught before publication.
