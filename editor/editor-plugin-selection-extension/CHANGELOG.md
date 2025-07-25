# @atlaskit/editor-plugin-selection-extension

## 3.3.0

### Minor Changes

- [#191056](https://bitbucket.org/atlassian/atlassian-frontend-monorepo/pull-requests/191056)
  [`ecf381c9ee85c`](https://bitbucket.org/atlassian/atlassian-frontend-monorepo/commits/ecf381c9ee85c) -
  Update isDisabled prop as boolean type in dynamic configuration

### Patch Changes

- Updated dependencies

## 3.2.1

### Patch Changes

- [#189233](https://bitbucket.org/atlassian/atlassian-frontend-monorepo/pull-requests/189233)
  [`0fe3ab9a767d5`](https://bitbucket.org/atlassian/atlassian-frontend-monorepo/commits/0fe3ab9a767d5) -
  FG cleanup for platform_editor_fix_get_selection_state_mismatch
- Updated dependencies

## 3.2.0

### Minor Changes

- [#189314](https://bitbucket.org/atlassian/atlassian-frontend-monorepo/pull-requests/189314)
  [`22c6251496010`](https://bitbucket.org/atlassian/atlassian-frontend-monorepo/commits/22c6251496010) -
  Exported missing types that were already being inferred from existing exports

### Patch Changes

- Updated dependencies

## 3.1.1

### Patch Changes

- [#183521](https://bitbucket.org/atlassian/atlassian-frontend-monorepo/pull-requests/183521)
  [`86379b9b3d99e`](https://bitbucket.org/atlassian/atlassian-frontend-monorepo/commits/86379b9b3d99e) -
  Insert links to page bottom as fallback when changes detect
- [#183158](https://bitbucket.org/atlassian/atlassian-frontend-monorepo/pull-requests/183158)
  [`d6096ec5c8ad9`](https://bitbucket.org/atlassian/atlassian-frontend-monorepo/commits/d6096ec5c8ad9) -
  Migrate to useSharedPluginStateWithSelector
- Updated dependencies

## 3.1.0

### Minor Changes

- [#181784](https://bitbucket.org/atlassian/atlassian-frontend-monorepo/pull-requests/181784)
  [`e3cd18b4fc263`](https://bitbucket.org/atlassian/atlassian-frontend-monorepo/commits/e3cd18b4fc263) -
  Create a new action insertSmartLinks to allow inserting multiple smart links in page

## 3.0.1

### Patch Changes

- Updated dependencies

## 3.0.0

### Major Changes

- [#181024](https://bitbucket.org/atlassian/atlassian-frontend-monorepo/pull-requests/181024)
  [`8e80c487ca307`](https://bitbucket.org/atlassian/atlassian-frontend-monorepo/commits/8e80c487ca307) - ##
  Make `@atlaskit/editor-common` a peer dependency

  **WHAT:** `@atlaskit/editor-common` has been moved from `dependencies` to `peerDependencies` in
  all editor plugin packages.

  **WHY:** This change ensures that only a single version of `@atlaskit/editor-common` is used in
  consuming applications, preventing issues caused by multiple versions of singleton libraries (such
  as context mismatches or duplicated state). This is especially important for packages that rely on
  shared context or singletons.

  **HOW TO ADJUST:**

  - Consumers must now explicitly install `@atlaskit/editor-common` in their own project if they use
    any of these editor plugins.
  - Ensure the version you install matches the version required by the plugins.
  - You can use the
    [`check-peer-dependencies`](https://www.npmjs.com/package/check-peer-dependencies) package to
    verify that all required peer dependencies are installed and compatible.
  - Example install command:
    ```
    npm install @atlaskit/editor-common
    ```
    or
    ```
    yarn add @atlaskit/editor-common
    ```

  **Note:** This is a breaking change. If `@atlaskit/editor-common` is not installed at the
  application level, you may see errors or unexpected behavior.

### Patch Changes

- Updated dependencies

## 2.4.7

### Patch Changes

- [#177823](https://bitbucket.org/atlassian/atlassian-frontend-monorepo/pull-requests/177823)
  [`8bd9bca774e4f`](https://bitbucket.org/atlassian/atlassian-frontend-monorepo/commits/8bd9bca774e4f) -
  Extend selection extension API to support dynamic loading of extension configuration
- Updated dependencies

## 2.4.6

### Patch Changes

- [#175281](https://bitbucket.org/atlassian/atlassian-frontend-monorepo/pull-requests/175281)
  [`f720d2c80d128`](https://bitbucket.org/atlassian/atlassian-frontend-monorepo/commits/f720d2c80d128) -
  [ux] Fix inconsistent references in getSelection to state that could cause unhandled exceptions

## 2.4.5

### Patch Changes

- Updated dependencies

## 2.4.4

### Patch Changes

- Updated dependencies

## 2.4.3

### Patch Changes

- Updated dependencies

## 2.4.2

### Patch Changes

- Updated dependencies

## 2.4.1

### Patch Changes

- Updated dependencies

## 2.4.0

### Minor Changes

- [#167053](https://bitbucket.org/atlassian/atlassian-frontend-monorepo/pull-requests/167053)
  [`cd3a7e2240e06`](https://bitbucket.org/atlassian/atlassian-frontend-monorepo/commits/cd3a7e2240e06) -
  Clean up platform_editor_extension_toolbar_use_view_state

### Patch Changes

- Updated dependencies

## 2.3.1

### Patch Changes

- Updated dependencies

## 2.3.0

### Minor Changes

- [#150885](https://bitbucket.org/atlassian/atlassian-frontend-monorepo/pull-requests/150885)
  [`59498013981c5`](https://bitbucket.org/atlassian/atlassian-frontend-monorepo/commits/59498013981c5) -
  Used plugin selector conditionally behind feature flag

### Patch Changes

- Updated dependencies

## 2.2.7

### Patch Changes

- Updated dependencies

## 2.2.6

### Patch Changes

- [#157241](https://bitbucket.org/atlassian/atlassian-frontend-monorepo/pull-requests/157241)
  [`bc8b7d4982174`](https://bitbucket.org/atlassian/atlassian-frontend-monorepo/commits/bc8b7d4982174) -
  When fetching position ensure the matching editor view is used with editor state to avoid position
  mismatches

## 2.2.5

### Patch Changes

- Updated dependencies

## 2.2.4

### Patch Changes

- Updated dependencies

## 2.2.3

### Patch Changes

- Updated dependencies

## 2.2.2

### Patch Changes

- [#147994](https://bitbucket.org/atlassian/atlassian-frontend-monorepo/pull-requests/147994)
  [`59aa4e2352739`](https://bitbucket.org/atlassian/atlassian-frontend-monorepo/commits/59aa4e2352739) -
  [ux] Hide overflow menu when extension config is empty array
- Updated dependencies

## 2.2.1

### Patch Changes

- [#143337](https://bitbucket.org/atlassian/atlassian-frontend-monorepo/pull-requests/143337)
  [`761dd685f2d72`](https://bitbucket.org/atlassian/atlassian-frontend-monorepo/commits/761dd685f2d72) -
  Export SelectionExtension type
- Updated dependencies

## 2.2.0

### Minor Changes

- [#139139](https://bitbucket.org/atlassian/atlassian-frontend-monorepo/pull-requests/139139)
  [`7f6b665d778dd`](https://bitbucket.org/atlassian/atlassian-frontend-monorepo/commits/7f6b665d778dd) -
  [https://product-fabric.atlassian.net/browse/ED-27499](ED-27499) - the new
  `@atlassian/confluence-presets` package with Confluence `full-page` preset is created

### Patch Changes

- Updated dependencies

## 2.1.8

### Patch Changes

- Updated dependencies

## 2.1.7

### Patch Changes

- [#135586](https://bitbucket.org/atlassian/atlassian-frontend-monorepo/pull-requests/135586)
  [`3aeba66081612`](https://bitbucket.org/atlassian/atlassian-frontend-monorepo/commits/3aeba66081612) -
  ED-26593 Add missing i18n for editor control
- Updated dependencies

## 2.1.6

### Patch Changes

- Updated dependencies

## 2.1.5

### Patch Changes

- Updated dependencies

## 2.1.4

### Patch Changes

- Updated dependencies

## 2.1.3

### Patch Changes

- Updated dependencies

## 2.1.2

### Patch Changes

- [#120385](https://bitbucket.org/atlassian/atlassian-frontend-monorepo/pull-requests/120385)
  [`0974c164df21e`](https://bitbucket.org/atlassian/atlassian-frontend-monorepo/commits/0974c164df21e) -
  [ux] ED-26440 minor cosmetic updates to selection extension plugin
- Updated dependencies

## 2.1.1

### Patch Changes

- [#119729](https://bitbucket.org/atlassian/atlassian-frontend-monorepo/pull-requests/119729)
  [`beae885f06562`](https://bitbucket.org/atlassian/atlassian-frontend-monorepo/commits/beae885f06562) -
  ED-26710 add analytics events to selection extension plugin

## 2.1.0

### Minor Changes

- [#115116](https://bitbucket.org/atlassian/atlassian-frontend-monorepo/pull-requests/115116)
  [`344eb36211daa`](https://bitbucket.org/atlassian/atlassian-frontend-monorepo/commits/344eb36211daa) -
  [ux] ED-26394 support component rendering in editor selection plugin

### Patch Changes

- Updated dependencies

## 2.0.0

### Major Changes

- [#117363](https://stash.atlassian.com/projects/CONFCLOUD/repos/confluence-frontend/pull-requests/117363)
  [`10a0f7f6c2027`](https://stash.atlassian.com/projects/CONFCLOUD/repos/confluence-frontend/commits/10a0f7f6c2027) -
  This package's `peerDependencies` have been adjusted for `react` and/or `react-dom` to reflect the
  status of only supporting React 18 going forward. No explicit breaking change to React support has
  been made in this release, but this is to signify going forward, breaking changes for React 16 or
  React 17 may come via non-major semver releases.

  Please refer this community post for more details:
  https://community.developer.atlassian.com/t/rfc-78-dropping-support-for-react-16-and-rendering-in-a-react-18-concurrent-root-in-jira-and-confluence/87026

### Patch Changes

- Updated dependencies

## 1.1.0

### Minor Changes

- [#105322](https://stash.atlassian.com/projects/CONFCLOUD/repos/confluence-frontend/pull-requests/105322)
  [`8876083532adc`](https://stash.atlassian.com/projects/CONFCLOUD/repos/confluence-frontend/commits/8876083532adc) -
  Bumped editor-prosemirror version to 7.0.0

### Patch Changes

- Updated dependencies
