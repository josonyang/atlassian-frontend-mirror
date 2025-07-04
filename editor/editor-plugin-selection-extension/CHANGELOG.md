# @atlaskit/editor-plugin-selection-extension

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
