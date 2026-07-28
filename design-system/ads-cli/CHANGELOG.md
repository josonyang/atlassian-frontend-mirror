# @atlaskit/ads-cli

## 0.4.2

### Patch Changes

- [`3f494bce2de11`](https://bitbucket.org/atlassian/atlassian-frontend-monorepo/commits/3f494bce2de11) -
  Fix the Atlas CLI release pipeline to publish ADS plugin artifacts to the ADS Statlas namespace
  with installable object paths.

## 0.4.1

### Patch Changes

- [`5faf9a7e8dabc`](https://bitbucket.org/atlassian/atlassian-frontend-monorepo/commits/5faf9a7e8dabc) -
  Skip fetching remote release history when the initial Statlas release explicitly uses the
  checked-in seed manifest.

## 0.4.0

### Minor Changes

- [`ccba0c0605171`](https://bitbucket.org/atlassian/atlassian-frontend-monorepo/commits/ccba0c0605171) -
  Add an Atlas CLI distribution (internal to Atlassian) with bundle-safe ADS MCP loading and Statlas
  release packaging.

  After the plugin is published, internal staff can run the ADS CLI with `atlas ads` instead of
  `npx @atlaskit/ads-cli`. For example:

  ```sh
  atlas ads search avatar
  ```

## 0.3.0

### Minor Changes

- [`d678f1fec09ca`](https://bitbucket.org/atlassian/atlassian-frontend-monorepo/commits/d678f1fec09ca) -
  Include concise, query-labelled foundations docs in unified search results, with leading-text
  previews, docs filtering, and detail commands. For example:

  ```sh
  npx @atlaskit/ads-cli search contrast --type docs
  ```

## 0.2.0

### Minor Changes

- [`f37252516ee5d`](https://bitbucket.org/atlassian/atlassian-frontend-monorepo/commits/f37252516ee5d) -
  Add a `manifest` command for discovering ADS CLI commands in human-readable or JSON format.

## 0.1.0

### Minor Changes

- [`a5eabf99c6345`](https://bitbucket.org/atlassian/atlassian-frontend-monorepo/commits/a5eabf99c6345) -
  Add `@atlaskit/ads-cli`: an npx-runnable CLI to query ADS structured content as a thin, zero-drift
  layer over the `@atlaskit/ads-mcp` tools. Commands:
  - `search <query...>` — unified search across components, tokens, and icons at once (grouped by
    kind); narrow with `--type`.
  - `component <name>` / `token <name>` / `icon <name>` — the detail view for a single item; pass
    `--all` to list every entry of that kind (the icon view includes a copy-paste import).
  - `lint-rules [term...]` — ADS ESLint rules; a fuzzy term that matches several rules shows a "did
    you mean?" list (like the item commands), while a unique/exact match prints the rule's docs
    (`--limit` caps the list).
  - `docs <topic...>` — ADS reference docs: `docs <term>` (foundations), `docs a11y [topic]`
    (accessibility), and `docs migration <id>` (migration guides).

  Default output is a compact, human-readable view; `--json` emits a stable envelope with documented
  exit codes (0 ok, 1 runtime, 2 usage, 3 not-found).

  Usage:

  ```sh
  # Unified search across components, tokens, and icons
  npx @atlaskit/ads-cli search button

  # Detail for a single component (machine-readable envelope)
  npx @atlaskit/ads-cli component Button --json

  # Read a foundations doc
  npx @atlaskit/ads-cli docs spacing
  ```
