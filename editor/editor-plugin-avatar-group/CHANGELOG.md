# @atlaskit/editor-plugin-avatar-group

## 3.1.1

### Patch Changes

- [#145269](https://bitbucket.org/atlassian/atlassian-frontend-monorepo/pull-requests/145269)
  [`737139c963111`](https://bitbucket.org/atlassian/atlassian-frontend-monorepo/commits/737139c963111) -
  [ux] Introduces an early-return guard inside `Avatars` that exits when `participants` is
  null/undefined. Behind fg platform_editor_avatars_sort_error_fix. Prevents the runtime crash
  `cannot read properties of undefined (reading sort)` observed while presence data is still
  loading. For HOT-116939.
- Updated dependencies

## 3.1.0

### Minor Changes

- [#139139](https://bitbucket.org/atlassian/atlassian-frontend-monorepo/pull-requests/139139)
  [`7f6b665d778dd`](https://bitbucket.org/atlassian/atlassian-frontend-monorepo/commits/7f6b665d778dd) -
  [https://product-fabric.atlassian.net/browse/ED-27499](ED-27499) - the new
  `@atlassian/confluence-presets` package with Confluence `full-page` preset is created

### Patch Changes

- Updated dependencies

## 3.0.5

### Patch Changes

- Updated dependencies

## 3.0.4

### Patch Changes

- Updated dependencies

## 3.0.3

### Patch Changes

- Updated dependencies

## 3.0.2

### Patch Changes

- Updated dependencies

## 3.0.1

### Patch Changes

- Updated dependencies

## 3.0.0

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

## 2.2.1

### Patch Changes

- Updated dependencies

## 2.2.0

### Minor Changes

- [#105322](https://stash.atlassian.com/projects/CONFCLOUD/repos/confluence-frontend/pull-requests/105322)
  [`8876083532adc`](https://stash.atlassian.com/projects/CONFCLOUD/repos/confluence-frontend/commits/8876083532adc) -
  Bumped editor-prosemirror version to 7.0.0

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

- Updated dependencies

## 2.1.1

### Patch Changes

- Updated dependencies

## 2.1.0

### Minor Changes

- [#98820](https://stash.atlassian.com/projects/CONFCLOUD/repos/confluence-frontend/pull-requests/98820)
  [`9f7dc3ba5d256`](https://stash.atlassian.com/projects/CONFCLOUD/repos/confluence-frontend/commits/9f7dc3ba5d256) -
  [ux] Update the potential list of colors for avatar badges and telepointers within the editor.
  Also add support for using presenceId over sessionId, when presenceId exists, in order to make the
  avatar badge and telepointer color selection.

### Patch Changes

- Updated dependencies

## 2.0.19

### Patch Changes

- Updated dependencies

## 2.0.18

### Patch Changes

- Updated dependencies

## 2.0.17

### Patch Changes

- [#172929](https://stash.atlassian.com/projects/CONFCLOUD/repos/confluence-frontend/pull-requests/172929)
  [`ee80242ee0a31`](https://stash.atlassian.com/projects/CONFCLOUD/repos/confluence-frontend/commits/ee80242ee0a31) -
  Remediate re-exports
- Updated dependencies

## 2.0.16

### Patch Changes

- Updated dependencies

## 2.0.15

### Patch Changes

- Updated dependencies

## 2.0.14

### Patch Changes

- [#167498](https://stash.atlassian.com/projects/CONFCLOUD/repos/confluence-frontend/pull-requests/167498)
  [`e275b9ee8b698`](https://stash.atlassian.com/projects/CONFCLOUD/repos/confluence-frontend/commits/e275b9ee8b698) -
  ED-25805: refactors plugins to meet folder standards
- Updated dependencies

## 2.0.13

### Patch Changes

- Updated dependencies

## 2.0.12

### Patch Changes

- Updated dependencies

## 2.0.11

### Patch Changes

- Updated dependencies

## 2.0.10

### Patch Changes

- Updated dependencies

## 2.0.9

### Patch Changes

- Updated dependencies

## 2.0.8

### Patch Changes

- Updated dependencies

## 2.0.7

### Patch Changes

- Updated dependencies

## 2.0.6

### Patch Changes

- Updated dependencies

## 2.0.5

### Patch Changes

- Updated dependencies

## 2.0.4

### Patch Changes

- Updated dependencies

## 2.0.3

### Patch Changes

- [#139334](https://stash.atlassian.com/projects/CONFCLOUD/repos/confluence-frontend/pull-requests/139334)
  [`30793649657c0`](https://stash.atlassian.com/projects/CONFCLOUD/repos/confluence-frontend/commits/30793649657c0) -
  [HOT-111629] We had an incident where the last character disappears when hitting the enter key on
  windows OS for Korean characters. Bumping to prosemirror-view@1.34.2 for the fix.

## 2.0.2

### Patch Changes

- Updated dependencies

## 2.0.1

### Patch Changes

- [#138118](https://stash.atlassian.com/projects/CONFCLOUD/repos/confluence-frontend/pull-requests/138118)
  [`5e4d9eb1aefe4`](https://stash.atlassian.com/projects/CONFCLOUD/repos/confluence-frontend/commits/5e4d9eb1aefe4) -
  NOISSUE: Upgrades editor React peer dependencies to v18
- Updated dependencies

## 2.0.0

### Major Changes

- [#134135](https://stash.atlassian.com/projects/CONFCLOUD/repos/confluence-frontend/pull-requests/134135)
  [`aff992988cf17`](https://stash.atlassian.com/projects/CONFCLOUD/repos/confluence-frontend/commits/aff992988cf17) -
  Refactor avatar plugin to use editorAPI instead of editorView

## 1.5.3

### Patch Changes

- Updated dependencies

## 1.5.2

### Patch Changes

- Updated dependencies

## 1.5.1

### Patch Changes

- [#125928](https://stash.atlassian.com/projects/CONFCLOUD/repos/confluence-frontend/pull-requests/125928)
  [`bac56c4b39309`](https://stash.atlassian.com/projects/CONFCLOUD/repos/confluence-frontend/commits/bac56c4b39309) -
  [ED-23425] Avatar group toolbar button should be conditional on the config value showAvatarGroup
- Updated dependencies

## 1.5.0

### Minor Changes

- [#126478](https://stash.atlassian.com/projects/CONFCLOUD/repos/confluence-frontend/pull-requests/126478)
  [`ca1665ebbfe4d`](https://stash.atlassian.com/projects/CONFCLOUD/repos/confluence-frontend/commits/ca1665ebbfe4d) -
  [ED-23435] Store primary toolbar component registry in a plugin variable instead of in plugin
  state to avoid having to add effects to all plugins and enable SSR for the toolbar. [Breaking
  change] Converted registerComponent from the primary toolbar plugin into an action.

### Patch Changes

- Updated dependencies

## 1.4.1

### Patch Changes

- Updated dependencies

## 1.4.0

### Minor Changes

- [#124209](https://stash.atlassian.com/projects/CONFCLOUD/repos/confluence-frontend/pull-requests/124209)
  [`8aa1792f12ed3`](https://stash.atlassian.com/projects/CONFCLOUD/repos/confluence-frontend/commits/8aa1792f12ed3) -
  bump @atlaskit/editor-prosemirror to 5.0.0, bump @atlaskit/adf-schema to 40.1.0

### Patch Changes

- Updated dependencies

## 1.3.1

### Patch Changes

- Updated dependencies

## 1.3.0

### Minor Changes

- [#120426](https://stash.atlassian.com/projects/CONFCLOUD/repos/confluence-frontend/pull-requests/120426)
  [`1cb3869ab1a96`](https://stash.atlassian.com/projects/CONFCLOUD/repos/confluence-frontend/commits/1cb3869ab1a96) -
  [ED-23436] Use editor primary toolbar plugin to structure the primary toolbar

### Patch Changes

- Updated dependencies

## 1.2.8

### Patch Changes

- Updated dependencies

## 1.2.7

### Patch Changes

- Updated dependencies

## 1.2.6

### Patch Changes

- Updated dependencies

## 1.2.5

### Patch Changes

- Updated dependencies

## 1.2.4

### Patch Changes

- Updated dependencies

## 1.2.3

### Patch Changes

- Updated dependencies

## 1.2.2

### Patch Changes

- [#97698](https://stash.atlassian.com/projects/CONFCLOUD/repos/confluence-frontend/pull-requests/97698)
  [`1c7b378c0d3b`](https://stash.atlassian.com/projects/CONFCLOUD/repos/confluence-frontend/commits/1c7b378c0d3b) -
  [HOT-108999] We had an incident where the cursor jumps back a character in table headers for any
  language triggering composition on an empty line.This was fixed in a patch bump of
  prosemirror-view. https://github.com/ProseMirror/prosemirror-view/compare/1.33.4...1.33.5

## 1.2.1

### Patch Changes

- Updated dependencies

## 1.2.0

### Minor Changes

- [#86433](https://stash.atlassian.com/projects/CONFCLOUD/repos/confluence-frontend/pull-requests/86433)
  [`88ca3b199a49`](https://stash.atlassian.com/projects/CONFCLOUD/repos/confluence-frontend/commits/88ca3b199a49) -
  [ux] EDF-412 Collaborators avatars and telepointer colors are tokenised.

### Patch Changes

- Updated dependencies

## 1.1.0

### Minor Changes

- [#91934](https://stash.atlassian.com/projects/CONFCLOUD/repos/confluence-frontend/pull-requests/91934)
  [`b76a78c6a199`](https://stash.atlassian.com/projects/CONFCLOUD/repos/confluence-frontend/commits/b76a78c6a199) -
  bumped editor-prosemirror version to 4.0.0

### Patch Changes

- Updated dependencies

## 1.0.6

### Patch Changes

- [#83116](https://stash.atlassian.com/projects/CONFCLOUD/repos/confluence-frontend/pull-requests/83116)
  [`8d4e99057fe0`](https://stash.atlassian.com/projects/CONFCLOUD/repos/confluence-frontend/commits/8d4e99057fe0) -
  Upgrade Typescript from `4.9.5` to `5.4.2`

## 1.0.5

### Patch Changes

- [#80883](https://stash.atlassian.com/projects/CONFCLOUD/repos/confluence-frontend/pull-requests/80883)
  [`5ecfa883d4ba`](https://stash.atlassian.com/projects/CONFCLOUD/repos/confluence-frontend/commits/5ecfa883d4ba) -
  React 18 types for alignment, annotation, avatar-group and blocktype plugins.

## 1.0.4

### Patch Changes

- [#80085](https://stash.atlassian.com/projects/CONFCLOUD/repos/confluence-frontend/pull-requests/80085)
  [`7febfed958dd`](https://stash.atlassian.com/projects/CONFCLOUD/repos/confluence-frontend/commits/7febfed958dd) -
  Update usage of `React.FC` to explicity include `children`

## 1.0.3

### Patch Changes

- [#75947](https://stash.atlassian.com/projects/CONFCLOUD/repos/confluence-frontend/pull-requests/75947)
  [`43549c3789b1`](https://stash.atlassian.com/projects/CONFCLOUD/repos/confluence-frontend/commits/43549c3789b1) -
  Migrate @atlaskit/editor-core to use declarative entry points

## 1.0.2

### Patch Changes

- [#77259](https://stash.atlassian.com/projects/CONFCLOUD/repos/confluence-frontend/pull-requests/77259)
  [`9086164a5b62`](https://stash.atlassian.com/projects/CONFCLOUD/repos/confluence-frontend/commits/9086164a5b62) -
  Use spacing tokens instead of hardcoded values

## 1.0.1

### Patch Changes

- Updated dependencies

## 1.0.0

### Major Changes

- [#72386](https://stash.atlassian.com/projects/CONFCLOUD/repos/confluence-frontend/pull-requests/72386)
  [`0c52b0be40c1`](https://stash.atlassian.com/projects/CONFCLOUD/repos/confluence-frontend/commits/0c52b0be40c1) -
  This changeset exists to bump all editor plugins that currently don't have a major version. This
  is to address an issue with Jira plugin consumption.

### Patch Changes

- Updated dependencies

## 0.1.4

### Patch Changes

- [#68572](https://stash.atlassian.com/projects/CONFCLOUD/repos/confluence-frontend/pull-requests/68572)
  [`15d407fe5143`](https://stash.atlassian.com/projects/CONFCLOUD/repos/confluence-frontend/commits/15d407fe5143) -
  Upgrading @atlaskit/editor-prosemirror dependency

## 0.1.3

### Patch Changes

- [#71136](https://stash.atlassian.com/projects/CONFCLOUD/repos/confluence-frontend/pull-requests/71136)
  [`c803fea1e6a4`](https://stash.atlassian.com/projects/CONFCLOUD/repos/confluence-frontend/commits/c803fea1e6a4) -
  Move all plugin translations to editor-common
- Updated dependencies

## 0.1.2

### Patch Changes

- [#70084](https://stash.atlassian.com/projects/CONFCLOUD/repos/confluence-frontend/pull-requests/70084)
  [`4d651eb93ab5`](https://stash.atlassian.com/projects/CONFCLOUD/repos/confluence-frontend/commits/4d651eb93ab5) -
  Add editor-plugin-annotation pr and create shared utils for it in editor-test-helpers
- Updated dependencies

## 0.1.1

### Patch Changes

- Updated dependencies
