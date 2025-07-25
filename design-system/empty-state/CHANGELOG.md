# @atlaskit/empty-state

## 10.1.1

### Patch Changes

- Updated dependencies

## 10.1.0

### Minor Changes

- [#173373](https://bitbucket.org/atlassian/atlassian-frontend-monorepo/pull-requests/173373)
  [`8061d8294d7ad`](https://bitbucket.org/atlassian/atlassian-frontend-monorepo/commits/8061d8294d7ad) -
  Added option to set headingSize prop on the header in the EmptyState component. Options are medium
  (default) and xsmall, intended for smaller spaces such as popups.

## 10.0.2

### Patch Changes

- Updated dependencies

## 10.0.1

### Patch Changes

- [#155802](https://bitbucket.org/atlassian/atlassian-frontend-monorepo/pull-requests/155802)
  [`08019848e3eab`](https://bitbucket.org/atlassian/atlassian-frontend-monorepo/commits/08019848e3eab) -
  Refreshed "issue" terminology.
- Updated dependencies

## 10.0.0

### Major Changes

- [#148636](https://bitbucket.org/atlassian/atlassian-frontend-monorepo/pull-requests/148636)
  [`47f6324868677`](https://bitbucket.org/atlassian/atlassian-frontend-monorepo/commits/47f6324868677) -
  Removed deprecated `size` prop. Use the `width` prop instead. Removed exported `Sizes` type.

## 9.0.5

### Patch Changes

- Updated dependencies

## 9.0.4

### Patch Changes

- [#134760](https://bitbucket.org/atlassian/atlassian-frontend-monorepo/pull-requests/134760)
  [`1621a41fa7055`](https://bitbucket.org/atlassian/atlassian-frontend-monorepo/commits/1621a41fa7055) -
  Do not render button group when there is only one action

## 9.0.3

### Patch Changes

- Updated dependencies

## 9.0.2

### Patch Changes

- [#129972](https://bitbucket.org/atlassian/atlassian-frontend-monorepo/pull-requests/129972)
  [`b2d69a39e6687`](https://bitbucket.org/atlassian/atlassian-frontend-monorepo/commits/b2d69a39e6687) -
  Update `@compiled/react` dependency for improved type checking support.
- Updated dependencies

## 9.0.1

### Patch Changes

- Updated dependencies

## 9.0.0

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

## 8.3.0

### Minor Changes

- [#116138](https://stash.atlassian.com/projects/CONFCLOUD/repos/confluence-frontend/pull-requests/116138)
  [`b50c5d5d65ae2`](https://stash.atlassian.com/projects/CONFCLOUD/repos/confluence-frontend/commits/b50c5d5d65ae2) -
  Bump to the latest version of @compiled/react

### Patch Changes

- Updated dependencies

## 8.2.2

### Patch Changes

- Updated dependencies

## 8.2.1

### Patch Changes

- Updated dependencies

## 8.2.0

### Minor Changes

- [#109060](https://stash.atlassian.com/projects/CONFCLOUD/repos/confluence-frontend/pull-requests/109060)
  [`4660ec858a305`](https://stash.atlassian.com/projects/CONFCLOUD/repos/confluence-frontend/commits/4660ec858a305) -
  Update `React` from v16 to v18

### Patch Changes

- Updated dependencies

## 8.1.4

### Patch Changes

- Updated dependencies

## 8.1.3

### Patch Changes

- [#107076](https://stash.atlassian.com/projects/CONFCLOUD/repos/confluence-frontend/pull-requests/107076)
  [`555ac7178db33`](https://stash.atlassian.com/projects/CONFCLOUD/repos/confluence-frontend/commits/555ac7178db33) -
  Update dependencies and remove unused internal files.

## 8.1.2

### Patch Changes

- [#103999](https://stash.atlassian.com/projects/CONFCLOUD/repos/confluence-frontend/pull-requests/103999)
  [`9f62ecec4d422`](https://stash.atlassian.com/projects/CONFCLOUD/repos/confluence-frontend/commits/9f62ecec4d422) -
  Update dependencies.

## 8.1.1

### Patch Changes

- Updated dependencies

## 8.1.0

### Minor Changes

- [#181325](https://stash.atlassian.com/projects/CONFCLOUD/repos/confluence-frontend/pull-requests/181325)
  [`c9ff1f8d5e9ca`](https://stash.atlassian.com/projects/CONFCLOUD/repos/confluence-frontend/commits/c9ff1f8d5e9ca) -
  Migrated from primitives components to primitives/compiled components

## 8.0.1

### Patch Changes

- Updated dependencies

## 8.0.0

### Major Changes

- [#162676](https://stash.atlassian.com/projects/CONFCLOUD/repos/confluence-frontend/pull-requests/162676)
  [`6dd54dec02a69`](https://stash.atlassian.com/projects/CONFCLOUD/repos/confluence-frontend/commits/6dd54dec02a69) -
  Migrated from `@emotion/react` to `@compiled/react` in order to improve performance, align with
  the rest of the Atlaskit techstack, and support React 18 Streaming SSR.

  Please note, in order to use this version of `@atlaskit/empty-state`, you will need to ensure that
  your bundler is configured to handle `.css` imports correctly. Most bundlers come with built-in
  support for `.css` imports, so you may not need to do anything. If you are using a different
  bundler, please refer to the documentation for that bundler to understand how to handle `.css`
  imports.

  For more information on the migration, please refer to
  [RFC-73 Migrating our components to Compiled CSS-in-JS](https://community.developer.atlassian.com/t/rfc-73-migrating-our-components-to-compiled-css-in-js/85953).

## 7.12.3

### Patch Changes

- [#165531](https://stash.atlassian.com/projects/CONFCLOUD/repos/confluence-frontend/pull-requests/165531)
  [`57f451bda8919`](https://stash.atlassian.com/projects/CONFCLOUD/repos/confluence-frontend/commits/57f451bda8919) -
  Adds side-effect config to support Compiled css extraction in third-party apps

## 7.12.2

### Patch Changes

- Updated dependencies

## 7.12.1

### Patch Changes

- Updated dependencies

## 7.12.0

### Minor Changes

- [#154929](https://stash.atlassian.com/projects/CONFCLOUD/repos/confluence-frontend/pull-requests/154929)
  [`745cc262139e7`](https://stash.atlassian.com/projects/CONFCLOUD/repos/confluence-frontend/commits/745cc262139e7) -
  [ux] Removed feature flag `platform.design-system-team.empty-state-typography-updates_gndrj`
  resultingin fully tokenised typography styles.

## 7.11.6

### Patch Changes

- Updated dependencies

## 7.11.5

### Patch Changes

- [#152429](https://stash.atlassian.com/projects/CONFCLOUD/repos/confluence-frontend/pull-requests/152429)
  [`5d414827c3394`](https://stash.atlassian.com/projects/CONFCLOUD/repos/confluence-frontend/commits/5d414827c3394) -
  Removes usages of deprecated CustomThemeButton in favor of the new Button

## 7.11.4

### Patch Changes

- Updated dependencies

## 7.11.3

### Patch Changes

- [#135500](https://stash.atlassian.com/projects/CONFCLOUD/repos/confluence-frontend/pull-requests/135500)
  [`1d43605b39f55`](https://stash.atlassian.com/projects/CONFCLOUD/repos/confluence-frontend/commits/1d43605b39f55) -
  We are testing a visual change behind a feature flag inceasing specificity of description
  typography styles. If this change is successful it will be available in a later release.

## 7.11.2

### Patch Changes

- Updated dependencies

## 7.11.1

### Patch Changes

- Updated dependencies

## 7.11.0

### Minor Changes

- [#127511](https://stash.atlassian.com/projects/CONFCLOUD/repos/confluence-frontend/pull-requests/127511)
  [`db30e29344013`](https://stash.atlassian.com/projects/CONFCLOUD/repos/confluence-frontend/commits/db30e29344013) -
  Widening range of `react` and `react-dom` peer dependencies from `^16.8.0 || ^17.0.0 || ~18.2.0`
  to the wider range of ``^16.8.0 || ^17.0.0 || ^18.0.0` (where applicable).

  This change has been done to enable usage of `react@18.3` as well as to have a consistent peer
  dependency range for `react` and `react-dom` for `/platform` packages.

### Patch Changes

- Updated dependencies

## 7.10.1

### Patch Changes

- Updated dependencies

## 7.10.0

### Minor Changes

- [#126756](https://stash.atlassian.com/projects/CONFCLOUD/repos/confluence-frontend/pull-requests/126756)
  [`1bb99c2a69e9c`](https://stash.atlassian.com/projects/CONFCLOUD/repos/confluence-frontend/commits/1bb99c2a69e9c) -
  We are testing a visual change behind a feature flag. The letter spacing of empty state title
  changes. If this change is successful it will be available in a later release.

## 7.9.2

### Patch Changes

- Updated dependencies

## 7.9.1

### Patch Changes

- Updated dependencies

## 7.9.0

### Minor Changes

- [#111878](https://stash.atlassian.com/projects/CONFCLOUD/repos/confluence-frontend/pull-requests/111878)
  [`223959ef57c80`](https://stash.atlassian.com/projects/CONFCLOUD/repos/confluence-frontend/commits/223959ef57c80) -
  Explicitly set jsxRuntime to classic via pragma comments in order to avoid issues where jsxRuntime
  is implicitly set to automatic.

### Patch Changes

- Updated dependencies

## 7.8.0

### Minor Changes

- [#91189](https://stash.atlassian.com/projects/CONFCLOUD/repos/confluence-frontend/pull-requests/91189)
  [`cd9ca014951a`](https://stash.atlassian.com/projects/CONFCLOUD/repos/confluence-frontend/commits/cd9ca014951a) -
  Add support for React 18 in non-strict mode.

## 7.7.2

### Patch Changes

- [#83116](https://stash.atlassian.com/projects/CONFCLOUD/repos/confluence-frontend/pull-requests/83116)
  [`8d4e99057fe0`](https://stash.atlassian.com/projects/CONFCLOUD/repos/confluence-frontend/commits/8d4e99057fe0) -
  Upgrade Typescript from `4.9.5` to `5.4.2`

## 7.7.1

### Patch Changes

- [#72130](https://stash.atlassian.com/projects/CONFCLOUD/repos/confluence-frontend/pull-requests/72130)
  [`b037e5451037`](https://stash.atlassian.com/projects/CONFCLOUD/repos/confluence-frontend/commits/b037e5451037) -
  Update new button text color fallback for default theme (non-token) to match that of old button
  current text color
- Updated dependencies

## 7.7.0

### Minor Changes

- [#70568](https://stash.atlassian.com/projects/CONFCLOUD/repos/confluence-frontend/pull-requests/70568)
  [`f1279b936714`](https://stash.atlassian.com/projects/CONFCLOUD/repos/confluence-frontend/commits/f1279b936714) -
  [ux] Button group inside empty-state now have default label and possibility to accept a dynamic
  one.

## 7.6.5

### Patch Changes

- Updated dependencies

## 7.6.4

### Patch Changes

- Updated dependencies

## 7.6.3

### Patch Changes

- [#38731](https://bitbucket.org/atlassian/atlassian-frontend/pull-requests/38731)
  [`9af31f3c1ae`](https://bitbucket.org/atlassian/atlassian-frontend/commits/9af31f3c1ae) - Delete
  version.json

## 7.6.2

### Patch Changes

- [#38361](https://bitbucket.org/atlassian/atlassian-frontend/pull-requests/38361)
  [`4f17f1d839e`](https://bitbucket.org/atlassian/atlassian-frontend/commits/4f17f1d839e) - Added
  this package into push model consumption

## 7.6.1

### Patch Changes

- [#36754](https://bitbucket.org/atlassian/atlassian-frontend/pull-requests/36754)
  [`4ae083a7e66`](https://bitbucket.org/atlassian/atlassian-frontend/commits/4ae083a7e66) - Use
  `@af/accessibility-testing` for default jest-axe config and jest-axe import in accessibility
  testing.

## 7.6.0

### Minor Changes

- [#35091](https://bitbucket.org/atlassian/atlassian-frontend/pull-requests/35091)
  [`56d11ec914b`](https://bitbucket.org/atlassian/atlassian-frontend/commits/56d11ec914b) - Add a
  new prop `headingLevel` to set the heading level in the header element.

## 7.5.2

### Patch Changes

- [#33793](https://bitbucket.org/atlassian/atlassian-frontend/pull-requests/33793)
  [`9d00501a414`](https://bitbucket.org/atlassian/atlassian-frontend/commits/9d00501a414) - Ensure
  legacy types are published for TS 4.5-4.8

## 7.5.1

### Patch Changes

- [#33649](https://bitbucket.org/atlassian/atlassian-frontend/pull-requests/33649)
  [`41fae2c6f68`](https://bitbucket.org/atlassian/atlassian-frontend/commits/41fae2c6f68) - Upgrade
  Typescript from `4.5.5` to `4.9.5`

## 7.5.0

### Minor Changes

- [#33258](https://bitbucket.org/atlassian/atlassian-frontend/pull-requests/33258)
  [`56507598609`](https://bitbucket.org/atlassian/atlassian-frontend/commits/56507598609) - Skip
  minor dependency bump

### Patch Changes

- Updated dependencies

## 7.4.11

### Patch Changes

- [#31206](https://bitbucket.org/atlassian/atlassian-frontend/pull-requests/31206)
  [`261420360ec`](https://bitbucket.org/atlassian/atlassian-frontend/commits/261420360ec) - Upgrades
  component types to support React 18.
- Updated dependencies

## 7.4.10

### Patch Changes

- [#31338](https://bitbucket.org/atlassian/atlassian-frontend/pull-requests/31338)
  [`74c1b81a476`](https://bitbucket.org/atlassian/atlassian-frontend/commits/74c1b81a476) - Replaces
  use of `gridSize` with space tokens. There is no expected visual change.

## 7.4.9

### Patch Changes

- [#31237](https://bitbucket.org/atlassian/atlassian-frontend/pull-requests/31237)
  [`24f81932945`](https://bitbucket.org/atlassian/atlassian-frontend/commits/24f81932945) - Migrates
  unit tests from enzyme to RTL. Adds testId to Spinner component.

## 7.4.8

### Patch Changes

- Updated dependencies

## 7.4.7

### Patch Changes

- [#29390](https://bitbucket.org/atlassian/atlassian-frontend/pull-requests/29390)
  [`18aeca8c199`](https://bitbucket.org/atlassian/atlassian-frontend/commits/18aeca8c199) - Internal
  change to update token references. There is no expected behaviour or visual change.

## 7.4.6

### Patch Changes

- Updated dependencies

## 7.4.5

### Patch Changes

- Updated dependencies

## 7.4.4

### Patch Changes

- Updated dependencies

## 7.4.3

### Patch Changes

- [#26488](https://bitbucket.org/atlassian/atlassian-frontend/pull-requests/26488)
  [`bc989043572`](https://bitbucket.org/atlassian/atlassian-frontend/commits/bc989043572) - Internal
  changes to apply spacing tokens. This should be a no-op change.

## 7.4.2

### Patch Changes

- [#26408](https://bitbucket.org/atlassian/atlassian-frontend/pull-requests/26408)
  [`9de88fa1e1e`](https://bitbucket.org/atlassian/atlassian-frontend/commits/9de88fa1e1e) - Internal
  changes to include spacing tokens in component implementations.

## 7.4.1

### Patch Changes

- [#24874](https://bitbucket.org/atlassian/atlassian-frontend/pull-requests/24874)
  [`8cc2f888c83`](https://bitbucket.org/atlassian/atlassian-frontend/commits/8cc2f888c83) - Upgrade
  Typescript from `4.3.5` to `4.5.5`

## 7.4.0

### Minor Changes

- [#24004](https://bitbucket.org/atlassian/atlassian-frontend/pull-requests/24004)
  [`645ec6a64a8`](https://bitbucket.org/atlassian/atlassian-frontend/commits/645ec6a64a8) - Updates
  `@emotion/core` to `@emotion/react`; v10 to v11. There is no expected behavior change.

### Patch Changes

- Updated dependencies

## 7.3.12

### Patch Changes

- [#24492](https://bitbucket.org/atlassian/atlassian-frontend/pull-requests/24492)
  [`8d4228767b0`](https://bitbucket.org/atlassian/atlassian-frontend/commits/8d4228767b0) - Upgrade
  Typescript from `4.2.4` to `4.3.5`.

## 7.3.11

### Patch Changes

- Updated dependencies

## 7.3.10

### Patch Changes

- [#20650](https://bitbucket.org/atlassian/atlassian-frontend/pull-requests/20650)
  [`cb2392f6d33`](https://bitbucket.org/atlassian/atlassian-frontend/commits/cb2392f6d33) - Upgrade
  to TypeScript 4.2.4
- Updated dependencies

## 7.3.9

### Patch Changes

- Updated dependencies

## 7.3.8

### Patch Changes

- Updated dependencies

## 7.3.7

### Patch Changes

- Updated dependencies

## 7.3.6

### Patch Changes

- [#16752](https://bitbucket.org/atlassian/atlassian-frontend/pull-requests/16752)
  [`58884c2f6c1`](https://bitbucket.org/atlassian/atlassian-frontend/commits/58884c2f6c1) - Internal
  code change turning on a new linting rule.

## 7.3.5

### Patch Changes

- [`19d72473dfb`](https://bitbucket.org/atlassian/atlassian-frontend/commits/19d72473dfb) - Updates
  usage of deprecated token names so they're aligned with the latest naming conventions. No UI or
  visual changes
- Updated dependencies

## 7.3.4

### Patch Changes

- Updated dependencies

## 7.3.3

### Patch Changes

- [#15998](https://bitbucket.org/atlassian/atlassian-frontend/pull-requests/15998)
  [`f460cc7c411`](https://bitbucket.org/atlassian/atlassian-frontend/commits/f460cc7c411) - Builds
  for this package now pass through a tokens babel plugin, removing runtime invocations of the
  tokens() function and improving bundle size.
- Updated dependencies

## 7.3.2

### Patch Changes

- [#16188](https://bitbucket.org/atlassian/atlassian-frontend/pull-requests/16188)
  [`0397fedf294`](https://bitbucket.org/atlassian/atlassian-frontend/commits/0397fedf294) - Added
  documentation homepage URL to package.json

## 7.3.1

### Patch Changes

- Updated dependencies

## 7.3.0

### Minor Changes

- [#14319](https://bitbucket.org/atlassian/atlassian-frontend/pull-requests/14319)
  [`b5c96b26bf3`](https://bitbucket.org/atlassian/atlassian-frontend/commits/b5c96b26bf3) -
  Instrumented empty-state with the new theming package, `@atlaskit/tokens`.

  New tokens will be visible only in applications configured to use the new Tokens API (currently in
  alpha). These changes are intended to be interoperable with the legacy theme implementation.
  Legacy dark mode users should expect no visual or breaking changes.

### Patch Changes

- Updated dependencies

## 7.2.1

### Patch Changes

- [#14184](https://bitbucket.org/atlassian/atlassian-frontend/pull-requests/14184)
  [`7465c0f0e1d`](https://bitbucket.org/atlassian/atlassian-frontend/commits/7465c0f0e1d) - Fix to
  account for the size/width fallback behaviour. Previously if a user provided a value for the the
  `width` property it would always be ignored, this is no longer the case.

## 7.2.0

### Minor Changes

- [#13864](https://bitbucket.org/atlassian/atlassian-frontend/pull-requests/13864)
  [`20ea31c9fdf`](https://bitbucket.org/atlassian/atlassian-frontend/commits/20ea31c9fdf) -
  **Deprecation Warning** The `size` prop and `Sizes` type have been flagged as deprecated. Both are
  better described as a width and so internally have been renamed. The `size` prop will continue to
  work in the shortrun before it's formally removed in the component's next major release.

  Housekeeping:

  - Component now uses the new entrypoint format.
  - Prop descriptions have been updated to better describe component behaviors.
  - Small bug fix related to additional props being spread in to some of the component's internals.

### Patch Changes

- Updated dependencies

## 7.1.8

### Patch Changes

- [#13302](https://bitbucket.org/atlassian/atlassian-frontend/pull-requests/13302)
  [`331c29990c9`](https://bitbucket.org/atlassian/atlassian-frontend/commits/331c29990c9) - Removes
  `styled-components` as a peer dependency in favour of a direct dependency on `emotion`.
- Updated dependencies

## 7.1.7

### Patch Changes

- Updated dependencies

## 7.1.6

### Patch Changes

- [#12880](https://bitbucket.org/atlassian/atlassian-frontend/pull-requests/12880)
  [`378d1cef00f`](https://bitbucket.org/atlassian/atlassian-frontend/commits/378d1cef00f) - Bump
  `@atlaskit/theme` to version `^11.3.0`.

## 7.1.5

### Patch Changes

- [#5857](https://bitbucket.org/atlassian/atlassian-frontend/pull-requests/5857)
  [`d3265f19be`](https://bitbucket.org/atlassian/atlassian-frontend/commits/d3265f19be) - Transpile
  packages using babel rather than tsc

## 7.1.4

### Patch Changes

- [#5497](https://bitbucket.org/atlassian/atlassian-frontend/pull-requests/5497)
  [`5f58283e1f`](https://bitbucket.org/atlassian/atlassian-frontend/commits/5f58283e1f) - Export
  types using Typescript's new "export type" syntax to satisfy Typescript's --isolatedModules
  compiler option. This requires version 3.8 of Typescript, read more about how we handle Typescript
  versions here: https://atlaskit.atlassian.com/get-started Also add `typescript` to
  `devDependencies` to denote version that the package was built with.

## 7.1.3

### Patch Changes

- Updated dependencies

## 7.1.2

### Patch Changes

- Updated dependencies

## 7.1.1

### Patch Changes

- [#3885](https://bitbucket.org/atlassian/atlassian-frontend/pull-requests/3885)
  [`6c525a8229`](https://bitbucket.org/atlassian/atlassian-frontend/commits/6c525a8229) - Upgraded
  to TypeScript 3.9.6 and tslib to 2.0.0

  Since tslib is a dependency for all our packages we recommend that products also follow this tslib
  upgrade to prevent duplicates of tslib being bundled.

## 7.1.0

### Minor Changes

- [#3428](https://bitbucket.org/atlassian/atlassian-frontend/pull-requests/3428)
  [`22aa614abb`](https://bitbucket.org/atlassian/atlassian-frontend/commits/22aa614abb) - Introduce
  optional renderImage prop which will be displayed if no imageUrl is provided

### Patch Changes

- [`3414523d6f`](https://bitbucket.org/atlassian/atlassian-frontend/commits/3414523d6f) - Rearange
  buttons order to align with design guidelines
- [`db053b24d8`](https://bitbucket.org/atlassian/atlassian-frontend/commits/db053b24d8) - Update all
  the theme imports to be tree-shakable

## 7.0.0

### Major Changes

- [#3335](https://bitbucket.org/atlassian/atlassian-frontend/pull-requests/3335)
  [`87f4720f27`](https://bitbucket.org/atlassian/atlassian-frontend/commits/87f4720f27) - Officially
  dropping IE11 support, from this version onwards there are no warranties of the package working in
  IE11. For more information see:
  https://community.developer.atlassian.com/t/atlaskit-to-drop-support-for-internet-explorer-11-from-1st-july-2020/39534

### Patch Changes

- Updated dependencies

## 6.0.12

### Patch Changes

- Updated dependencies

## 6.0.11

### Patch Changes

- [#2866](https://bitbucket.org/atlassian/atlassian-frontend/pull-requests/2866)
  [`54a9514fcf`](https://bitbucket.org/atlassian/atlassian-frontend/commits/54a9514fcf) - Build and
  supporting files will no longer be published to npm

## 6.0.10

### Patch Changes

- Updated dependencies

## 6.0.9

### Patch Changes

- [patch][f4374a322a](https://bitbucket.org/atlassian/atlassian-frontend/commits/f4374a322a):

  Change imports to comply with Atlassian conventions- Updated dependencies
  [6b8e60827e](https://bitbucket.org/atlassian/atlassian-frontend/commits/6b8e60827e):

- Updated dependencies
  [57c0487a02](https://bitbucket.org/atlassian/atlassian-frontend/commits/57c0487a02):
  - @atlaskit/button@13.3.11

## 6.0.8

### Patch Changes

- [patch][c5182f1c53](https://bitbucket.org/atlassian/atlassian-frontend/commits/c5182f1c53):

  Widens the accepted Types for description to include any react node- Updated dependencies
  [dae900bf82](https://bitbucket.org/atlassian/atlassian-frontend/commits/dae900bf82):

- Updated dependencies
  [8c9e4f1ec6](https://bitbucket.org/atlassian/atlassian-frontend/commits/8c9e4f1ec6):
  - @atlaskit/build-utils@2.6.4
  - @atlaskit/docs@8.5.0

## 6.0.7

### Patch Changes

- [patch][6548261c9a](https://bitbucket.org/atlassian/atlassian-frontend/commits/6548261c9a):

  Remove namespace imports from React, ReactDom, and PropTypes- Updated dependencies
  [6548261c9a](https://bitbucket.org/atlassian/atlassian-frontend/commits/6548261c9a):

  - @atlaskit/docs@8.3.2
  - @atlaskit/visual-regression@0.1.9
  - @atlaskit/button@13.3.7
  - @atlaskit/spinner@12.1.4
  - @atlaskit/theme@9.5.1

## 6.0.6

### Patch Changes

- [patch][6c9c2d5487](https://bitbucket.org/atlassian/atlaskit-mk-2/commits/6c9c2d5487):

  Fixes empty state image not having appropriate accessibility attributes.- Updated dependencies
  [3c0f6feee5](https://bitbucket.org/atlassian/atlaskit-mk-2/commits/3c0f6feee5):

- Updated dependencies
  [f9c291923c](https://bitbucket.org/atlassian/atlaskit-mk-2/commits/f9c291923c):
  - @atlaskit/theme@9.3.0

## 6.0.5

### Patch Changes

- [patch][35d2229b2a](https://bitbucket.org/atlassian/atlaskit-mk-2/commits/35d2229b2a):

  Adding missing license to packages and update to Copyright 2019 Atlassian Pty Ltd.

## 6.0.4

### Patch Changes

- [patch][097b696613](https://bitbucket.org/atlassian/atlaskit-mk-2/commits/097b696613):

  Components now depend on TS 3.6 internally, in order to fix an issue with TS resolving
  non-relative imports as relative imports

## 6.0.3

### Patch Changes

- [patch][ecca4d1dbb](https://bitbucket.org/atlassian/atlaskit-mk-2/commits/ecca4d1dbb):

  Upgraded Typescript to 3.3.x

## 6.0.2

### Patch Changes

- [patch][708028db86](https://bitbucket.org/atlassian/atlaskit-mk-2/commits/708028db86):

  Change all the imports to theme in Core to use multi entry points

## 6.0.1

### Patch Changes

- [patch][de35ce8c67](https://bitbucket.org/atlassian/atlaskit-mk-2/commits/de35ce8c67):

  Updates component maintainers

## 6.0.0

### Major Changes

- [major][433311c16a](https://bitbucket.org/atlassian/atlaskit-mk-2/commits/433311c16a):

  @atlaskit/empty-state has been converted to Typescript. Typescript consumers will now get static
  type safety. Flow types are no longer provided. No API or behavioural changes.

## 5.0.3

### Patch Changes

- [patch][4615439434](https://bitbucket.org/atlassian/atlaskit-mk-2/commits/4615439434):

  index.ts will now be ignored when publishing to npm

## 5.0.2

- [patch][b0ef06c685](https://bitbucket.org/atlassian/atlaskit-mk-2/commits/b0ef06c685):

  - This is just a safety release in case anything strange happened in in the previous one. See Pull
    Request #5942 for details

## 5.0.1

- Updated dependencies
  [215688984e](https://bitbucket.org/atlassian/atlaskit-mk-2/commits/215688984e):
  - @atlaskit/button@13.0.4
  - @atlaskit/spinner@12.0.0

## 5.0.0

- [major][7c17b35107](https://bitbucket.org/atlassian/atlaskit-mk-2/commits/7c17b35107):

  - Updates react and react-dom peer dependencies to react@^16.8.0 and react-dom@^16.8.0. To use
    this package, please ensure you use at least this version of react and react-dom.

## 4.0.4

- Updated dependencies
  [9c0b4744be](https://bitbucket.org/atlassian/atlaskit-mk-2/commits/9c0b4744be):
  - @atlaskit/docs@7.0.3
  - @atlaskit/button@12.0.3
  - @atlaskit/spinner@10.0.7
  - @atlaskit/theme@8.1.7

## 4.0.3

- Updated dependencies
  [1e826b2966](https://bitbucket.org/atlassian/atlaskit-mk-2/commits/1e826b2966):
  - @atlaskit/docs@7.0.2
  - @atlaskit/spinner@10.0.5
  - @atlaskit/theme@8.1.6
  - @atlaskit/button@12.0.0

## 4.0.2

- [patch][98e11001ff](https://bitbucket.org/atlassian/atlaskit-mk-2/commits/98e11001ff):

  - Removes duplicate babel-runtime dependency

## 4.0.1

- Updated dependencies
  [9d5cc39394](https://bitbucket.org/atlassian/atlaskit-mk-2/commits/9d5cc39394):
  - @atlaskit/docs@7.0.1
  - @atlaskit/spinner@10.0.1
  - @atlaskit/theme@8.0.1
  - @atlaskit/button@11.0.0

## 4.0.0

- [major][76299208e6](https://bitbucket.org/atlassian/atlaskit-mk-2/commits/76299208e6):

  - Drop ES5 from all the flow modules

  ### Dropping CJS support in all @atlaskit packages

  As a breaking change, all @atlaskit packages will be dropping cjs distributions and will only
  distribute esm. This means all distributed code will be transpiled, but will still contain
  `import` and `export` declarations.

  The major reason for doing this is to allow us to support multiple entry points in packages, e.g:

  ```js
  import colors from `@atlaskit/theme/colors`;
  ```

  Previously this was sort of possible for consumers by doing something like:

  ```js
  import colors from `@atlaskit/theme/dist/esm/colors`;
  ```

  This has a couple of issues. 1, it treats the file system as API making internal refactors harder,
  we have to worry about how consumers might be using things that aren't _actually_ supposed to be
  used. 2. We are unable to do this _internally_ in @atlaskit packages. This leads to lots of
  packages bundling all of theme, just to use a single color, especially in situations where tree
  shaking fails.

  To support being able to use multiple entrypoints internally, we unfortunately cannot have
  multiple distributions as they would need to have very different imports from of their own
  internal dependencies.

  ES Modules are widely supported by all modern bundlers and can be worked around in node
  environments.

  We may choose to revisit this solution in the future if we find any unintended condequences, but
  we see this as a pretty sane path forward which should lead to some major bundle size decreases,
  saner API's and simpler package architecture.

  Please reach out to #fabric-build (if in Atlassian) or create an issue in
  [Design System Support](https://ecosystem.atlassian.net/secure/CreateIssue.jspa?pid=24670) (for
  external) if you have any questions or queries about this.

## 3.1.4

- Updated dependencies [58b84fa](https://bitbucket.org/atlassian/atlaskit-mk-2/commits/58b84fa):
  - @atlaskit/button@10.1.1
  - @atlaskit/spinner@9.0.13
  - @atlaskit/theme@7.0.1
  - @atlaskit/docs@6.0.0

## 3.1.3

- Updated dependencies [d13242d](https://bitbucket.org/atlassian/atlaskit-mk-2/commits/d13242d):
  - @atlaskit/docs@5.2.3
  - @atlaskit/button@10.0.4
  - @atlaskit/spinner@9.0.12
  - @atlaskit/theme@7.0.0

## 3.1.2

- Updated dependencies [6998f11](https://bitbucket.org/atlassian/atlaskit-mk-2/commits/6998f11):
  - @atlaskit/docs@5.2.1
  - @atlaskit/spinner@9.0.11
  - @atlaskit/theme@6.2.1
  - @atlaskit/button@10.0.0

## 3.1.1

- [patch] Adds missing implicit @babel/runtime dependency
  [b71751b](https://bitbucket.org/atlassian/atlaskit-mk-2/commits/b71751b)

## 3.1.0

- [minor] Adds new imageWidth and imageHeight props, useful for fixing the image dimensions while
  it's loading so the page doesn't bounce around. Changes the root element to use max-width instead
  of width so it shrinks down in smaller containers.
  [3209be4](https://bitbucket.org/atlassian/atlaskit-mk-2/commits/3209be4)

## 3.0.9

- [patch] Pulling the shared styles from @atlaskit/theme and removed dependency on
  util-shraed-styles [7d51a09](https://bitbucket.org/atlassian/atlaskit-mk-2/commits/7d51a09)

## 3.0.8

- [patch] Moved the atlaskit button, spinner, theme and util-shared-styles to dependencies from peer
  dependdency [a2d1132](https://bitbucket.org/atlassian/atlaskit-mk-2/commits/a2d1132)

## 3.0.7

- [patch] Adds sideEffects: false to allow proper tree shaking
  [b5d6d04](https://bitbucket.org/atlassian/atlaskit-mk-2/commits/b5d6d04)

## 3.0.5

- [patch] Updated dependencies
  [df22ad8](https://bitbucket.org/atlassian/atlaskit-mk-2/commits/df22ad8)
  - @atlaskit/theme@6.0.0
  - @atlaskit/spinner@9.0.6
  - @atlaskit/button@9.0.6
  - @atlaskit/docs@5.0.6

## 3.0.4

- [patch] update the dependency of react-dom to 16.4.2 due to vulnerability in previous versions
  read https://reactjs.org/blog/2018/08/01/react-v-16-4-2.html for details
  [a4bd557](https://bitbucket.org/atlassian/atlaskit-mk-2/commits/a4bd557)
- [none] Updated dependencies
  [a4bd557](https://bitbucket.org/atlassian/atlaskit-mk-2/commits/a4bd557)
  - @atlaskit/button@9.0.5
  - @atlaskit/theme@5.1.3
  - @atlaskit/spinner@9.0.5

## 3.0.3

- [patch] Updated dependencies
  [acd86a1](https://bitbucket.org/atlassian/atlaskit-mk-2/commits/acd86a1)
  - @atlaskit/button@9.0.4
  - @atlaskit/theme@5.1.2
  - @atlaskit/spinner@9.0.4
  - @atlaskit/docs@5.0.2

## 3.0.2

- [patch] Add a SSR test for every package, add react-dom and build-utils in devDependencies
  [7e331b5](https://bitbucket.org/atlassian/atlaskit-mk-2/commits/7e331b5)
- [none] Updated dependencies
  [7e331b5](https://bitbucket.org/atlassian/atlaskit-mk-2/commits/7e331b5)
  - @atlaskit/button@9.0.3
  - @atlaskit/theme@5.1.1
  - @atlaskit/spinner@9.0.3

## 3.0.1

- [patch] Move analytics tests and replace elements to core
  [49d4ab4](https://bitbucket.org/atlassian/atlaskit-mk-2/commits/49d4ab4)
- [none] Updated dependencies
  [49d4ab4](https://bitbucket.org/atlassian/atlaskit-mk-2/commits/49d4ab4)
  - @atlaskit/button@9.0.2
  - @atlaskit/spinner@9.0.2
  - @atlaskit/docs@5.0.1

## 3.0.0

- [major] Updates to React ^16.4.0
  [7edb866](https://bitbucket.org/atlassian/atlaskit-mk-2/commits/7edb866)
- [major] Updated dependencies
  [563a7eb](https://bitbucket.org/atlassian/atlaskit-mk-2/commits/563a7eb)
  - @atlaskit/button@9.0.0
  - @atlaskit/theme@5.0.0
  - @atlaskit/spinner@9.0.0
  - @atlaskit/docs@5.0.0
- [major] Updated dependencies
  [7edb866](https://bitbucket.org/atlassian/atlaskit-mk-2/commits/7edb866)
  - @atlaskit/button@9.0.0
  - @atlaskit/theme@5.0.0
  - @atlaskit/spinner@9.0.0
  - @atlaskit/docs@5.0.0

## 2.1.3

- [patch] Updated dependencies
  [cdba8b3](https://bitbucket.org/atlassian/atlaskit-mk-2/commits/cdba8b3)
  - @atlaskit/spinner@8.0.0
  - @atlaskit/button@8.2.3

## 2.1.2

- [patch] Clean Changelogs - remove duplicates and empty entries
  [e7756cd](https://bitbucket.org/atlassian/atlaskit-mk-2/commits/e7756cd)
- [none] Updated dependencies
  [e7756cd](https://bitbucket.org/atlassian/atlaskit-mk-2/commits/e7756cd)
  - @atlaskit/button@8.1.2
  - @atlaskit/theme@4.0.4
  - @atlaskit/spinner@7.0.2

## 2.1.1

- [patch] Update changelogs to remove duplicate
  [cc58e17](https://bitbucket.org/atlassian/atlaskit-mk-2/commits/cc58e17)
- [none] Updated dependencies
  [cc58e17](https://bitbucket.org/atlassian/atlaskit-mk-2/commits/cc58e17)
  - @atlaskit/theme@4.0.3
  - @atlaskit/spinner@7.0.1
  - @atlaskit/button@8.1.1
  - @atlaskit/docs@4.1.1

## 2.1.0

- [patch] Updated dependencies
  [9d20f54](https://bitbucket.org/atlassian/atlaskit-mk-2/commits/9d20f54)
  - @atlaskit/spinner@7.0.0
  - @atlaskit/docs@4.1.0
  - @atlaskit/theme@4.0.2
  - @atlaskit/button@8.1.0

## 2.0.1

- [patch] Update readme's [223cd67](https://bitbucket.org/atlassian/atlaskit-mk-2/commits/223cd67)
- [patch] Updated dependencies
  [223cd67](https://bitbucket.org/atlassian/atlaskit-mk-2/commits/223cd67)
  - @atlaskit/button@8.0.1
  - @atlaskit/theme@4.0.1
  - @atlaskit/spinner@6.0.1
  - @atlaskit/docs@4.0.1

## 2.0.0

- [major] makes styled-components a peer dependency and upgrades version range from 1.4.6 - 3 to
  ^3.2.6 [1e80619](https://bitbucket.org/atlassian/atlaskit-mk-2/commits/1e80619)
- [patch] Updated dependencies
  [1e80619](https://bitbucket.org/atlassian/atlaskit-mk-2/commits/1e80619)
  - @atlaskit/button@8.0.0
  - @atlaskit/theme@4.0.0
  - @atlaskit/spinner@6.0.0
  - @atlaskit/docs@4.0.0

## 1.1.2

- [patch] Updated dependencies
  [d662caa](https://bitbucket.org/atlassian/atlaskit-mk-2/commits/d662caa)
  - @atlaskit/button@7.2.5
  - @atlaskit/theme@3.2.2
  - @atlaskit/spinner@5.0.2
  - @atlaskit/docs@3.0.4

## 1.1.0

- [patch] Remove null as we allowed void values
  [7ab743b](https://bitbucket.org/atlassian/atlaskit-mk-2/commits/7ab743b)
- [patch] Update empty state and button to have consistent types
  [f0da143](https://bitbucket.org/atlassian/atlaskit-mk-2/commits/f0da143)
- [minor] Update Empty state to use ButtonGroup from @atlaskit/button
  [e4a8dcf](https://bitbucket.org/atlassian/atlaskit-mk-2/commits/e4a8dcf)

## 1.0.0

- [major] Bump to React 16.3.
  [4251858](https://bitbucket.org/atlassian/atlaskit-mk-2/commits/4251858)

## 0.3.0

- [minor] Update styled-components dependency to support versions 1.4.6 - 3
  [ceccf30](https://bitbucket.org/atlassian/atlaskit-mk-2/commits/ceccf30)

## 0.2.2

- [patch] updated the repository url to https://bitbucket.org/atlassian/atlaskit-mk-2
  [1e57e5a](https://bitbucket.org/atlassian/atlaskit-mk-2/commits/1e57e5a)

## 0.2.1

- [patch] Packages Flow types for elements components
  [3111e74](https://bitbucket.org/atlassian/atlaskit-mk-2/commits/3111e74)

## 0.2.0

- [minor] Add React 16 support.
  [12ea6e4](https://bitbucket.org/atlassian/atlaskit-mk-2/commits/12ea6e4)

## 0.1.3

- [patch] Color of the description changed to N800
  [ebf65be](https://bitbucket.org/atlassian/atlaskit-mk-2/commits/ebf65be)

## 0.1.0

- [patch] Updates dependency on docs/ to ^1.0.1
  [36c7ef8](https://bitbucket.org/atlassian/atlaskit-mk-2/commits/36c7ef8)
- [minor] Initial release [afbb1e5](https://bitbucket.org/atlassian/atlaskit-mk-2/commits/afbb1e5)
