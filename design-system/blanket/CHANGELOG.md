# @atlaskit/blanket

## 15.0.8

### Patch Changes

- Updated dependencies

## 15.0.7

### Patch Changes

- Updated dependencies

## 15.0.6

### Patch Changes

- Updated dependencies

## 15.0.5

### Patch Changes

- Updated dependencies

## 15.0.4

### Patch Changes

- Updated dependencies

## 15.0.3

### Patch Changes

- [#127093](https://bitbucket.org/atlassian/atlassian-frontend-monorepo/pull-requests/127093)
  [`1378ea7a99ce1`](https://bitbucket.org/atlassian/atlassian-frontend-monorepo/commits/1378ea7a99ce1) -
  Upgrades `jscodeshift` to handle generics properly.
- Updated dependencies

## 15.0.2

### Patch Changes

- [#129972](https://bitbucket.org/atlassian/atlassian-frontend-monorepo/pull-requests/129972)
  [`b2d69a39e6687`](https://bitbucket.org/atlassian/atlassian-frontend-monorepo/commits/b2d69a39e6687) -
  Update `@compiled/react` dependency for improved type checking support.
- Updated dependencies

## 15.0.1

### Patch Changes

- Updated dependencies

## 15.0.0

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

## 14.2.0

### Minor Changes

- [#116138](https://stash.atlassian.com/projects/CONFCLOUD/repos/confluence-frontend/pull-requests/116138)
  [`b50c5d5d65ae2`](https://stash.atlassian.com/projects/CONFCLOUD/repos/confluence-frontend/commits/b50c5d5d65ae2) -
  Bump to the latest version of @compiled/react

### Patch Changes

- Updated dependencies

## 14.1.3

### Patch Changes

- Updated dependencies

## 14.1.2

### Patch Changes

- [#113039](https://stash.atlassian.com/projects/CONFCLOUD/repos/confluence-frontend/pull-requests/113039)
  [`dc89be79601e2`](https://stash.atlassian.com/projects/CONFCLOUD/repos/confluence-frontend/commits/dc89be79601e2) -
  Remove old codemods.

## 14.1.1

### Patch Changes

- Updated dependencies

## 14.1.0

### Minor Changes

- [#109060](https://stash.atlassian.com/projects/CONFCLOUD/repos/confluence-frontend/pull-requests/109060)
  [`4660ec858a305`](https://stash.atlassian.com/projects/CONFCLOUD/repos/confluence-frontend/commits/4660ec858a305) -
  Update `React` from v16 to v18

### Patch Changes

- Updated dependencies

## 14.0.3

### Patch Changes

- [#105141](https://stash.atlassian.com/projects/CONFCLOUD/repos/confluence-frontend/pull-requests/105141)
  [`8adc915d624f9`](https://stash.atlassian.com/projects/CONFCLOUD/repos/confluence-frontend/commits/8adc915d624f9) -
  Update dev dependencies.

## 14.0.2

### Patch Changes

- [#103999](https://stash.atlassian.com/projects/CONFCLOUD/repos/confluence-frontend/pull-requests/103999)
  [`9f62ecec4d422`](https://stash.atlassian.com/projects/CONFCLOUD/repos/confluence-frontend/commits/9f62ecec4d422) -
  Update dependencies.

## 14.0.1

### Patch Changes

- Updated dependencies

## 14.0.0

### Major Changes

- [#176786](https://stash.atlassian.com/projects/CONFCLOUD/repos/confluence-frontend/pull-requests/176786)
  [`30a4108a8fe56`](https://stash.atlassian.com/projects/CONFCLOUD/repos/confluence-frontend/commits/30a4108a8fe56) -
  Migrated from `@emotion/react` to `@compiled/react` in order to improve performance, align with
  the rest of the Atlaskit techstack, and support React 18 Streaming SSR. Please note, in order to
  use this version of `@atlaskit/blanket`, you will need to ensure that your bundler is configured
  to handle `.css` imports correctly.

  Most bundlers come with built-in support for `.css` imports, so you may not need to do anything.
  If you are using a different bundler, please refer to the documentation for that bundler to
  understand how to handle `.css` imports. For more information on the migration, please refer to
  [RFC-73 Migrating our components to Compiled CSS-in-JS](https://community.developer.atlassian.com/t/rfc-73-migrating-our-components-to-compiled-css-in-js/85953).

## 13.3.5

### Patch Changes

- [#165531](https://stash.atlassian.com/projects/CONFCLOUD/repos/confluence-frontend/pull-requests/165531)
  [`57f451bda8919`](https://stash.atlassian.com/projects/CONFCLOUD/repos/confluence-frontend/commits/57f451bda8919) -
  Adds side-effect config to support Compiled css extraction in third-party apps

## 13.3.4

### Patch Changes

- Updated dependencies

## 13.3.3

### Patch Changes

- Updated dependencies

## 13.3.2

### Patch Changes

- Updated dependencies

## 13.3.1

### Patch Changes

- Updated dependencies

## 13.3.0

### Minor Changes

- [#127511](https://stash.atlassian.com/projects/CONFCLOUD/repos/confluence-frontend/pull-requests/127511)
  [`db30e29344013`](https://stash.atlassian.com/projects/CONFCLOUD/repos/confluence-frontend/commits/db30e29344013) -
  Widening range of `react` and `react-dom` peer dependencies from `^16.8.0 || ^17.0.0 || ~18.2.0`
  to the wider range of ``^16.8.0 || ^17.0.0 || ^18.0.0` (where applicable).

  This change has been done to enable usage of `react@18.3` as well as to have a consistent peer
  dependency range for `react` and `react-dom` for `/platform` packages.

### Patch Changes

- Updated dependencies

## 13.2.1

### Patch Changes

- Updated dependencies

## 13.2.0

### Minor Changes

- [#111696](https://stash.atlassian.com/projects/CONFCLOUD/repos/confluence-frontend/pull-requests/111696)
  [`20c2d58f6f8a9`](https://stash.atlassian.com/projects/CONFCLOUD/repos/confluence-frontend/commits/20c2d58f6f8a9) -
  Explicitly set jsxRuntime to classic via pragma comments in order to avoid issues where jsxRuntime
  is implicitly set to automatic.

## 13.1.0

### Minor Changes

- [#90157](https://stash.atlassian.com/projects/CONFCLOUD/repos/confluence-frontend/pull-requests/90157)
  [`bb32e67d8926`](https://stash.atlassian.com/projects/CONFCLOUD/repos/confluence-frontend/commits/bb32e67d8926) -
  Add support for React 18 in non-strict mode.

## 13.0.1

### Patch Changes

- [#83116](https://stash.atlassian.com/projects/CONFCLOUD/repos/confluence-frontend/pull-requests/83116)
  [`8d4e99057fe0`](https://stash.atlassian.com/projects/CONFCLOUD/repos/confluence-frontend/commits/8d4e99057fe0) -
  Upgrade Typescript from `4.9.5` to `5.4.2`

## 13.0.0

### Major Changes

- [#41760](https://bitbucket.org/atlassian/atlassian-frontend/pull-requests/41760)
  [`909e4a30fe7`](https://bitbucket.org/atlassian/atlassian-frontend/commits/909e4a30fe7) - Removed
  all remaining legacy theming logic from the Blanket, Breadcrumbs and Checkbox components.

## 12.4.5

### Patch Changes

- [#40123](https://bitbucket.org/atlassian/atlassian-frontend/pull-requests/40123)
  [`b289e593932`](https://bitbucket.org/atlassian/atlassian-frontend/commits/b289e593932) - Internal
  change to apply logical properties instead of physical properties for spacing, border, and
  position.

## 12.4.4

### Patch Changes

- [#36754](https://bitbucket.org/atlassian/atlassian-frontend/pull-requests/36754)
  [`4ae083a7e66`](https://bitbucket.org/atlassian/atlassian-frontend/commits/4ae083a7e66) - Use
  `@af/accessibility-testing` for default jest-axe config and jest-axe import in accessibility
  testing.

## 12.4.3

### Patch Changes

- [#34124](https://bitbucket.org/atlassian/atlassian-frontend/pull-requests/34124)
  [`77766ad157d`](https://bitbucket.org/atlassian/atlassian-frontend/commits/77766ad157d) - Enrol
  packages to push-model consumption in Jira.

## 12.4.2

### Patch Changes

- [#33793](https://bitbucket.org/atlassian/atlassian-frontend/pull-requests/33793)
  [`9d00501a414`](https://bitbucket.org/atlassian/atlassian-frontend/commits/9d00501a414) - Ensure
  legacy types are published for TS 4.5-4.8

## 12.4.1

### Patch Changes

- [#33649](https://bitbucket.org/atlassian/atlassian-frontend/pull-requests/33649)
  [`41fae2c6f68`](https://bitbucket.org/atlassian/atlassian-frontend/commits/41fae2c6f68) - Upgrade
  Typescript from `4.5.5` to `4.9.5`

## 12.4.0

### Minor Changes

- [#33258](https://bitbucket.org/atlassian/atlassian-frontend/pull-requests/33258)
  [`56507598609`](https://bitbucket.org/atlassian/atlassian-frontend/commits/56507598609) - Skip
  minor dependency bump

### Patch Changes

- Updated dependencies

## 12.3.8

### Patch Changes

- [#32211](https://bitbucket.org/atlassian/atlassian-frontend/pull-requests/32211)
  [`4ba10567310`](https://bitbucket.org/atlassian/atlassian-frontend/commits/4ba10567310) - Internal
  changes.

## 12.3.7

### Patch Changes

- Updated dependencies

## 12.3.6

### Patch Changes

- [#29669](https://bitbucket.org/atlassian/atlassian-frontend/pull-requests/29669)
  [`a7e8a6c3ace`](https://bitbucket.org/atlassian/atlassian-frontend/commits/a7e8a6c3ace) - Prevent
  onBlanketClick function firing on Blanket when mousedown event begins on Blanket children

## 12.3.5

### Patch Changes

- Updated dependencies

## 12.3.4

### Patch Changes

- Updated dependencies

## 12.3.3

### Patch Changes

- Updated dependencies

## 12.3.2

### Patch Changes

- Updated dependencies

## 12.3.1

### Patch Changes

- [#26488](https://bitbucket.org/atlassian/atlassian-frontend/pull-requests/26488)
  [`bc989043572`](https://bitbucket.org/atlassian/atlassian-frontend/commits/bc989043572) - Internal
  changes to apply spacing tokens. This should be a no-op change.

## 12.3.0

### Minor Changes

- [#24710](https://bitbucket.org/atlassian/atlassian-frontend/pull-requests/24710)
  [`f2fe91811eb`](https://bitbucket.org/atlassian/atlassian-frontend/commits/f2fe91811eb) - Updates
  `@emotion/core` to `@emotion/react`; v10 to v11. There is no expected behaviour change.

## 12.2.16

### Patch Changes

- [#24874](https://bitbucket.org/atlassian/atlassian-frontend/pull-requests/24874)
  [`8cc2f888c83`](https://bitbucket.org/atlassian/atlassian-frontend/commits/8cc2f888c83) - Upgrade
  Typescript from `4.3.5` to `4.5.5`

## 12.2.15

### Patch Changes

- [#24492](https://bitbucket.org/atlassian/atlassian-frontend/pull-requests/24492)
  [`8d4228767b0`](https://bitbucket.org/atlassian/atlassian-frontend/commits/8d4228767b0) - Upgrade
  Typescript from `4.2.4` to `4.3.5`.

## 12.2.14

### Patch Changes

- Updated dependencies

## 12.2.13

### Patch Changes

- Updated dependencies

## 12.2.12

### Patch Changes

- [#20650](https://bitbucket.org/atlassian/atlassian-frontend/pull-requests/20650)
  [`cb2392f6d33`](https://bitbucket.org/atlassian/atlassian-frontend/commits/cb2392f6d33) - Upgrade
  to TypeScript 4.2.4

## 12.2.11

### Patch Changes

- Updated dependencies

## 12.2.10

### Patch Changes

- [#19618](https://bitbucket.org/atlassian/atlassian-frontend/pull-requests/19618)
  [`dcd92130cc4`](https://bitbucket.org/atlassian/atlassian-frontend/commits/dcd92130cc4) - Migrate
  deleted background accent tokens to replacements
- Updated dependencies

## 12.2.9

### Patch Changes

- [#19696](https://bitbucket.org/atlassian/atlassian-frontend/pull-requests/19696)
  [`a0b4a3db79c`](https://bitbucket.org/atlassian/atlassian-frontend/commits/a0b4a3db79c) - Change
  internal type syntax to work with extract-react-types

## 12.2.8

### Patch Changes

- Updated dependencies

## 12.2.7

### Patch Changes

- [#16752](https://bitbucket.org/atlassian/atlassian-frontend/pull-requests/16752)
  [`19d72473dfb`](https://bitbucket.org/atlassian/atlassian-frontend/commits/19d72473dfb) - Updates
  usage of deprecated token names so they're aligned with the latest naming conventions. No UI or
  visual changes
- Updated dependencies

## 12.2.6

### Patch Changes

- Updated dependencies

## 12.2.5

### Patch Changes

- [#15998](https://bitbucket.org/atlassian/atlassian-frontend/pull-requests/15998)
  [`f460cc7c411`](https://bitbucket.org/atlassian/atlassian-frontend/commits/f460cc7c411) - Builds
  for this package now pass through a tokens babel plugin, removing runtime invocations of the
  tokens() function and improving bundle size.
- Updated dependencies

## 12.2.4

### Patch Changes

- Updated dependencies

## 12.2.3

### Patch Changes

- [#15632](https://bitbucket.org/atlassian/atlassian-frontend/pull-requests/15632)
  [`34282240102`](https://bitbucket.org/atlassian/atlassian-frontend/commits/34282240102) - Adds
  explicit type to button usages components.

## 12.2.2

### Patch Changes

- Updated dependencies

## 12.2.1

### Patch Changes

- Updated dependencies

## 12.2.0

### Minor Changes

- [#13302](https://bitbucket.org/atlassian/atlassian-frontend/pull-requests/13302)
  [`9f7f8e0b581`](https://bitbucket.org/atlassian/atlassian-frontend/commits/9f7f8e0b581) - [ux]
  Blanket now uses a transparent background color when un-tinted instead of using opacity.

### Patch Changes

- [`2d7cc544696`](https://bitbucket.org/atlassian/atlassian-frontend/commits/2d7cc544696) - Updates
  token usage to match the latest token set
- Updated dependencies

## 12.1.1

### Patch Changes

- Updated dependencies

## 12.1.0

### Minor Changes

- [#12837](https://bitbucket.org/atlassian/atlassian-frontend/pull-requests/12837)
  [`6071d362abb`](https://bitbucket.org/atlassian/atlassian-frontend/commits/6071d362abb) - [ux]
  Colors now sourced from tokens.

### Patch Changes

- [`8279380176b`](https://bitbucket.org/atlassian/atlassian-frontend/commits/8279380176b) - Internal
  code changes.
- Updated dependencies

## 12.0.1

### Patch Changes

- [#12880](https://bitbucket.org/atlassian/atlassian-frontend/pull-requests/12880)
  [`378d1cef00f`](https://bitbucket.org/atlassian/atlassian-frontend/commits/378d1cef00f) - Bump
  `@atlaskit/theme` to version `^11.3.0`.

## 12.0.0

### Major Changes

- [#12328](https://bitbucket.org/atlassian/atlassian-frontend/pull-requests/12328)
  [`f166f5398b2`](https://bitbucket.org/atlassian/atlassian-frontend/commits/f166f5398b2) - In this
  version we made **Blanket** faster and lighter

  - General performance improvements

  - **BREAKING** **Blanket** now accepts a `children` prop whose value is of type `ReactElement`.

  - **BREAKING** `canClickThrough` prop is now renamed to `shouldAllowClickThrough`.

  **Running the codemod cli**

  To run the codemod: **You first need to have the latest version installed**

  ```bash
  yarn upgrade @atlaskit/blanket@^12.0.0
  ```

  Once upgraded, use `@atlaskit/codemod-cli`:

  ```bash
  npx @atlaskit/codemod-cli --parser babel --extensions ts,tsx,js [relativePath]
  ```

  The CLI will show a list of components and versions so select `@atlaskit/blanket@^12.0.0` and you
  will automatically be upgraded.

  What will be changed:

  - It will rename the `canClickThrough` prop to `shouldAllowClickThrough`.

  Run `npx @atlaskit/codemod-cli -h` for more details on usage.

  For Atlassians, refer to the
  [documentation](https://hello.atlassian.net/wiki/spaces/AF/pages/2627171992/Codemods) for more
  details on the codemod CLI.

### Patch Changes

- [`9c98e8227f6`](https://bitbucket.org/atlassian/atlassian-frontend/commits/9c98e8227f6) - Internal
  refactor for style declarations.
- Updated dependencies

## 11.4.1

### Patch Changes

- [#12670](https://bitbucket.org/atlassian/atlassian-frontend/pull-requests/12670)
  [`dd89416d229`](https://bitbucket.org/atlassian/atlassian-frontend/commits/dd89416d229) - Updated
  dependency of `@atlaskit/theme` to 11.2.0

## 11.4.0

### Minor Changes

- [#11649](https://bitbucket.org/atlassian/atlassian-frontend/pull-requests/11649)
  [`96fda7877a1`](https://bitbucket.org/atlassian/atlassian-frontend/commits/96fda7877a1) - We
  converted blanket from class to functional component and replaced styled components with emotion

## 11.3.1

### Patch Changes

- [#12167](https://bitbucket.org/atlassian/atlassian-frontend/pull-requests/12167)
  [`d6f7ff383cf`](https://bitbucket.org/atlassian/atlassian-frontend/commits/d6f7ff383cf) - Updates
  to development dependency `storybook-addon-performance`

## 11.3.0

### Minor Changes

- [#12170](https://bitbucket.org/atlassian/atlassian-frontend/pull-requests/12170)
  [`f6b951a51f2`](https://bitbucket.org/atlassian/atlassian-frontend/commits/f6b951a51f2) - Removes
  usage of styled-components in favour of standardising on emotion

## 11.2.1

### Patch Changes

- [#11113](https://bitbucket.org/atlassian/atlassian-frontend/pull-requests/11113)
  [`e08a57e5055`](https://bitbucket.org/atlassian/atlassian-frontend/commits/e08a57e5055) - Added
  the `design-system` tech stacks to the `package.json`

## 11.2.0

### Minor Changes

- [#9756](https://bitbucket.org/atlassian/atlassian-frontend/pull-requests/9756)
  [`990aefd838b`](https://bitbucket.org/atlassian/atlassian-frontend/commits/990aefd838b) - Blanket
  now accepts testId prop to be used for automated testing purposes.

### Patch Changes

- Updated dependencies

## 11.1.1

### Patch Changes

- [#8644](https://bitbucket.org/atlassian/atlassian-frontend/pull-requests/8644)
  [`79c23df6340`](https://bitbucket.org/atlassian/atlassian-frontend/commits/79c23df6340) - Use
  injected package name and version for analytics instead of version.json.

## 11.1.0

### Minor Changes

- [#7170](https://bitbucket.org/atlassian/atlassian-frontend/pull-requests/7170)
  [`4f9e6e2db5`](https://bitbucket.org/atlassian/atlassian-frontend/commits/4f9e6e2db5) - These
  packages now have defined entry points -- this means that you cannot access internal files in the
  packages that are not meant to be public. Sub-components in these packages have been explicitly
  defined, aiding tree-shaking and reducing bundle size.

## 11.0.4

### Patch Changes

- [#5857](https://bitbucket.org/atlassian/atlassian-frontend/pull-requests/5857)
  [`d3265f19be`](https://bitbucket.org/atlassian/atlassian-frontend/commits/d3265f19be) - Transpile
  packages using babel rather than tsc

## 11.0.3

### Patch Changes

- [#5497](https://bitbucket.org/atlassian/atlassian-frontend/pull-requests/5497)
  [`5f58283e1f`](https://bitbucket.org/atlassian/atlassian-frontend/commits/5f58283e1f) - Export
  types using Typescript's new "export type" syntax to satisfy Typescript's --isolatedModules
  compiler option. This requires version 3.8 of Typescript, read more about how we handle Typescript
  versions here: https://atlaskit.atlassian.com/get-started Also add `typescript` to
  `devDependencies` to denote version that the package was built with.

## 11.0.2

### Patch Changes

- Updated dependencies

## 11.0.1

### Patch Changes

- [#3885](https://bitbucket.org/atlassian/atlassian-frontend/pull-requests/3885)
  [`6c525a8229`](https://bitbucket.org/atlassian/atlassian-frontend/commits/6c525a8229) - Upgraded
  to TypeScript 3.9.6 and tslib to 2.0.0

  Since tslib is a dependency for all our packages we recommend that products also follow this tslib
  upgrade to prevent duplicates of tslib being bundled.

## 11.0.0

### Major Changes

- [#3335](https://bitbucket.org/atlassian/atlassian-frontend/pull-requests/3335)
  [`87f4720f27`](https://bitbucket.org/atlassian/atlassian-frontend/commits/87f4720f27) - Officially
  dropping IE11 support, from this version onwards there are no warranties of the package working in
  IE11. For more information see:
  https://community.developer.atlassian.com/t/atlaskit-to-drop-support-for-internet-explorer-11-from-1st-july-2020/39534

### Patch Changes

- Updated dependencies

## 10.0.19

### Patch Changes

- [#2866](https://bitbucket.org/atlassian/atlassian-frontend/pull-requests/2866)
  [`54a9514fcf`](https://bitbucket.org/atlassian/atlassian-frontend/commits/54a9514fcf) - Build and
  supporting files will no longer be published to npm

## 10.0.18

### Patch Changes

- [patch][6d744d3ff1](https://bitbucket.org/atlassian/atlassian-frontend/commits/6d744d3ff1):

  Change imports to comply with Atlassian conventions- Updated dependencies
  [6b8e60827e](https://bitbucket.org/atlassian/atlassian-frontend/commits/6b8e60827e):

- Updated dependencies
  [57c0487a02](https://bitbucket.org/atlassian/atlassian-frontend/commits/57c0487a02):
  - @atlaskit/button@13.3.11

## 10.0.17

### Patch Changes

- [patch][6548261c9a](https://bitbucket.org/atlassian/atlassian-frontend/commits/6548261c9a):

  Remove namespace imports from React, ReactDom, and PropTypes- Updated dependencies
  [6548261c9a](https://bitbucket.org/atlassian/atlassian-frontend/commits/6548261c9a):

  - @atlaskit/docs@8.3.2
  - @atlaskit/analytics-next@6.3.5
  - @atlaskit/button@13.3.7
  - @atlaskit/theme@9.5.1

## 10.0.16

### Patch Changes

- [patch][4a223473c5](https://bitbucket.org/atlassian/atlassian-frontend/commits/4a223473c5):

  Removes babel/runtime from dependencies. Users should see a smaller bundlesize as a result-
  Updated dependencies
  [82747f2922](https://bitbucket.org/atlassian/atlassian-frontend/commits/82747f2922):

- Updated dependencies
  [4a223473c5](https://bitbucket.org/atlassian/atlassian-frontend/commits/4a223473c5):
  - @atlaskit/theme@9.5.0
  - @atlaskit/button@13.3.5

## 10.0.15

### Patch Changes

- [patch][d222c2b987](https://bitbucket.org/atlassian/atlaskit-mk-2/commits/d222c2b987):

  Theme has been converted to Typescript. Typescript consumers will now get static type safety. Flow
  types are no longer provided.

  ### Breaking

  ** getTokens props changes ** When defining the value function passed into a ThemeProvider, the
  getTokens parameter cannot be called without props; if no props are provided an empty object `{}`
  must be passed in:

  ```javascript
  <CustomTheme.Provider
    value={t => ({ ...t(), backgroundColor: '#333'})}
  >
  ```

  becomes:

  ```javascript
  <CustomTheme.Provider
    value={t => ({ ...t({}), backgroundColor: '#333'})}
  >
  ```

  ** Color palette changes ** Color palettes have been moved into their own file. Users will need to
  update imports from this:

  ```javascript
  import { colors } from '@atlaskit/theme';

  colors.colorPalette('8');
  ```

  to this:

  ```javascript
  import { colorPalette } from '@atlaskit/theme';

  colorPalette.colorPalette('8');
  ```

  or for multi entry-point users:

  ```javascript
  import * as colors from '@atlaskit/theme/colors';

  colors.colorPalette('8');
  ```

  to this:

  ```javascript
  import * as colorPalettes from '@atlaskit/theme/color-palette';

  colorPalettes.colorPalette('8');
  ```

## 10.0.14

### Patch Changes

- [patch][35d2229b2a](https://bitbucket.org/atlassian/atlaskit-mk-2/commits/35d2229b2a):

  Adding missing license to packages and update to Copyright 2019 Atlassian Pty Ltd.

## 10.0.13

### Patch Changes

- [patch][a2d0043716](https://bitbucket.org/atlassian/atlaskit-mk-2/commits/a2d0043716):

  Updated version of analytics-next to fix potential incompatibilities with TS 3.6

## 10.0.12

### Patch Changes

- [patch][097b696613](https://bitbucket.org/atlassian/atlaskit-mk-2/commits/097b696613):

  Components now depend on TS 3.6 internally, in order to fix an issue with TS resolving
  non-relative imports as relative imports

## 10.0.11

### Patch Changes

- [patch][ecca4d1dbb](https://bitbucket.org/atlassian/atlaskit-mk-2/commits/ecca4d1dbb):

  Upgraded Typescript to 3.3.x

## 10.0.10

### Patch Changes

- [patch][708028db86](https://bitbucket.org/atlassian/atlaskit-mk-2/commits/708028db86):

  Change all the imports to theme in Core to use multi entry points

## 10.0.9

### Patch Changes

- [patch][de35ce8c67](https://bitbucket.org/atlassian/atlaskit-mk-2/commits/de35ce8c67):

  Updates component maintainers

## 10.0.8

### Patch Changes

- [patch][926b43142b](https://bitbucket.org/atlassian/atlaskit-mk-2/commits/926b43142b):

  Analytics-next has been converted to Typescript. Typescript consumers will now get static type
  safety. Flow types are no longer provided. No behavioural changes.

  **Breaking changes**

  - `withAnalyticsForSumTypeProps` alias has been removed, please use `withAnalyticsEvents`
  - `AnalyticsContextWrappedComp` alias has been removed, please use `withAnalyticsContext`

  **Breaking changes to TypeScript annotations**

  - `withAnalyticsEvents` now infers proptypes automatically, consumers no longer need to provide
    props as a generic type.
  - `withAnalyticsContext` now infers proptypes automatically, consumers no longer need to provide
    props as a generic type.
  - Type `WithAnalyticsEventProps` has been renamed to `WithAnalyticsEventsProps` to match source
    code
  - Type `CreateUIAnalyticsEventSignature` has been renamed to `CreateUIAnalyticsEvent` to match
    source code
  - Type `UIAnalyticsEventHandlerSignature` has been renamed to `UIAnalyticsEventHandler` to match
    source code
  - Type `AnalyticsEventsPayload` has been renamed to `AnalyticsEventPayload`
  - Type `ObjectType` has been removed, please use `Record<string, any>` or `[key: string]: any`
  - Type `UIAnalyticsEventInterface` has been removed, please use `UIAnalyticsEvent`
  - Type `AnalyticsEventInterface` has been removed, please use `AnalyticsEvent`
  - Type `CreateAndFireEventFunction` removed and should now be inferred by TypeScript
  - Type `AnalyticsEventUpdater` removed and should now be inferred by TypeScript

## 10.0.7

### Patch Changes

- [patch][9f8ab1084b](https://bitbucket.org/atlassian/atlaskit-mk-2/commits/9f8ab1084b):

  Consume analytics-next ts type definitions as an ambient declaration.

## 10.0.6

### Patch Changes

- [patch][bbff8a7d87](https://bitbucket.org/atlassian/atlaskit-mk-2/commits/bbff8a7d87):

  Fixes bug, missing version.json file

## 10.0.5

### Patch Changes

- [patch][18dfac7332](https://bitbucket.org/atlassian/atlaskit-mk-2/commits/18dfac7332):

  In this PR, we are:

  - Re-introducing dist build folders
  - Adding back cjs
  - Replacing es5 by cjs and es2015 by esm
  - Creating folders at the root for entry-points
  - Removing the generation of the entry-points at the root Please see this
    [ticket](https://product-fabric.atlassian.net/browse/BUILDTOOLS-118) or this
    [page](https://hello.atlassian.net/wiki/spaces/FED/pages/452325500/Finishing+Atlaskit+multiple+entry+points)
    for further details

## 10.0.4

### Patch Changes

- [patch][d0db01b410](https://bitbucket.org/atlassian/atlaskit-mk-2/commits/d0db01b410):

  TypeScript users of withAnalyticsEvents and withAnalyticsContext are now required to provide props
  as a generic type. This is so that TypeScript can correctly calculate the props and defaultProps
  of the returned component.

  Before:

  ```typescript
  withAnalyticsEvents()(Button) as ComponentClass<Props>;
  ```

  After:

  ```typescript
  withAnalyticsEvents<Props>()(Button);
  ```

## 10.0.3

### Patch Changes

- [patch][29a1f158c1](https://bitbucket.org/atlassian/atlaskit-mk-2/commits/29a1f158c1):

  Use default react import in typescript files.

## 10.0.2

### Patch Changes

- [patch][93bcf314c6](https://bitbucket.org/atlassian/atlaskit-mk-2/commits/93bcf314c6):

  Added missing tslib dep

## 10.0.1

- [patch][27cf35ca9d](https://bitbucket.org/atlassian/atlaskit-mk-2/commits/27cf35ca9d):

  - Updated event type for `onBlanketClicked` prop

## 10.0.0

- [major][7c17b35107](https://bitbucket.org/atlassian/atlaskit-mk-2/commits/7c17b35107):

  - Updates react and react-dom peer dependencies to react@^16.8.0 and react-dom@^16.8.0. To use
    this package, please ensure you use at least this version of react and react-dom.

## 9.0.0

- [major][38dab947e6](https://bitbucket.org/atlassian/atlaskit-mk-2/commits/38dab947e6):

  - Updated Blanket to TypeScript. Flow types are no longer exported.

## 8.0.3

- Updated dependencies
  [9c0b4744be](https://bitbucket.org/atlassian/atlaskit-mk-2/commits/9c0b4744be):
  - @atlaskit/docs@7.0.3
  - @atlaskit/button@12.0.3
  - @atlaskit/theme@8.1.7

## 8.0.2

- Updated dependencies
  [1e826b2966](https://bitbucket.org/atlassian/atlaskit-mk-2/commits/1e826b2966):
  - @atlaskit/docs@7.0.2
  - @atlaskit/analytics-next@4.0.3
  - @atlaskit/theme@8.1.6
  - @atlaskit/button@12.0.0

## 8.0.1

- Updated dependencies
  [9d5cc39394](https://bitbucket.org/atlassian/atlaskit-mk-2/commits/9d5cc39394):
  - @atlaskit/docs@7.0.1
  - @atlaskit/analytics-next@4.0.1
  - @atlaskit/theme@8.0.1
  - @atlaskit/button@11.0.0

## 8.0.0

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

## 7.0.12

- Updated dependencies [58b84fa](https://bitbucket.org/atlassian/atlaskit-mk-2/commits/58b84fa):
  - @atlaskit/analytics-next@3.1.2
  - @atlaskit/button@10.1.1
  - @atlaskit/theme@7.0.1
  - @atlaskit/docs@6.0.0

## 7.0.11

- Updated dependencies [d13242d](https://bitbucket.org/atlassian/atlaskit-mk-2/commits/d13242d):
  - @atlaskit/docs@5.2.3
  - @atlaskit/button@10.0.4
  - @atlaskit/theme@7.0.0

## 7.0.10

- Updated dependencies [6998f11](https://bitbucket.org/atlassian/atlaskit-mk-2/commits/6998f11):
  - @atlaskit/docs@5.2.1
  - @atlaskit/analytics-next@3.1.1
  - @atlaskit/theme@6.2.1
  - @atlaskit/button@10.0.0

## 7.0.9

- [patch][a637f5e](https://bitbucket.org/atlassian/atlaskit-mk-2/commits/a637f5e):

  - Refine and fix some flow type errors found by fixing @atlaskit/analytics-next HOCs to allow flow
    to type check properly

## 7.0.8

- [patch] Adds missing implicit @babel/runtime dependency
  [b71751b](https://bitbucket.org/atlassian/atlaskit-mk-2/commits/b71751b)

## 7.0.7

- [patch] Adds sideEffects: false to allow proper tree shaking
  [b5d6d04](https://bitbucket.org/atlassian/atlaskit-mk-2/commits/b5d6d04)

## 7.0.5

- [patch] Updated dependencies
  [df22ad8](https://bitbucket.org/atlassian/atlaskit-mk-2/commits/df22ad8)
  - @atlaskit/theme@6.0.0
  - @atlaskit/button@9.0.6
  - @atlaskit/docs@5.0.6

## 7.0.4

- [patch] update the dependency of react-dom to 16.4.2 due to vulnerability in previous versions
  read https://reactjs.org/blog/2018/08/01/react-v-16-4-2.html for details
  [a4bd557](https://bitbucket.org/atlassian/atlaskit-mk-2/commits/a4bd557)
- [none] Updated dependencies
  [a4bd557](https://bitbucket.org/atlassian/atlaskit-mk-2/commits/a4bd557)
  - @atlaskit/analytics-next@3.0.4
  - @atlaskit/button@9.0.5
  - @atlaskit/theme@5.1.3

## 7.0.3

- [patch] Updated dependencies
  [acd86a1](https://bitbucket.org/atlassian/atlaskit-mk-2/commits/acd86a1)
  - @atlaskit/button@9.0.4
  - @atlaskit/theme@5.1.2
  - @atlaskit/analytics-next@3.0.3
  - @atlaskit/docs@5.0.2

## 7.0.2

- [patch] Add a SSR test for every package, add react-dom and build-utils in devDependencies
  [7e331b5](https://bitbucket.org/atlassian/atlaskit-mk-2/commits/7e331b5)
- [none] Updated dependencies
  [7e331b5](https://bitbucket.org/atlassian/atlaskit-mk-2/commits/7e331b5)
  - @atlaskit/analytics-next@3.0.2
  - @atlaskit/button@9.0.3
  - @atlaskit/theme@5.1.1

## 7.0.1

- [patch] Move analytics tests and replace elements to core
  [49d4ab4](https://bitbucket.org/atlassian/atlaskit-mk-2/commits/49d4ab4)
- [none] Updated dependencies
  [49d4ab4](https://bitbucket.org/atlassian/atlaskit-mk-2/commits/49d4ab4)
  - @atlaskit/analytics-next@3.0.1
  - @atlaskit/button@9.0.2
  - @atlaskit/docs@5.0.1

## 7.0.0

- [major] Provides analytics for common component interations. See the
  [Instrumented Components](https://atlaskit.atlassian.com/packages/core/analytics-next) section for
  more details. If you are using enzyme for testing you will have to use
  [our forked version of the library](https://atlaskit.atlassian.com/docs/guides/testing#we-use-a-forked-version-of-enzyme).
  [563a7eb](https://bitbucket.org/atlassian/atlaskit-mk-2/commits/563a7eb)
- [major] Updates to React ^16.4.0
  [7edb866](https://bitbucket.org/atlassian/atlaskit-mk-2/commits/7edb866)
- [major] Updated dependencies
  [563a7eb](https://bitbucket.org/atlassian/atlaskit-mk-2/commits/563a7eb)
  - @atlaskit/analytics-next@3.0.0
  - @atlaskit/button@9.0.0
  - @atlaskit/theme@5.0.0
  - @atlaskit/docs@5.0.0
- [major] Updated dependencies
  [7edb866](https://bitbucket.org/atlassian/atlaskit-mk-2/commits/7edb866)
  - @atlaskit/analytics-next@3.0.0
  - @atlaskit/button@9.0.0
  - @atlaskit/theme@5.0.0
  - @atlaskit/docs@5.0.0

## 6.0.3

- [patch] Update changelogs to remove duplicate
  [cc58e17](https://bitbucket.org/atlassian/atlaskit-mk-2/commits/cc58e17)
- [none] Updated dependencies
  [cc58e17](https://bitbucket.org/atlassian/atlaskit-mk-2/commits/cc58e17)
  - @atlaskit/theme@4.0.3
  - @atlaskit/button@8.1.1
  - @atlaskit/docs@4.1.1

## 6.0.2

- [none] Updated dependencies
  [9d20f54](https://bitbucket.org/atlassian/atlaskit-mk-2/commits/9d20f54)
  - @atlaskit/docs@4.1.0
  - @atlaskit/theme@4.0.2
  - @atlaskit/button@8.1.0

## 6.0.1

- [patch] Update readme's [223cd67](https://bitbucket.org/atlassian/atlaskit-mk-2/commits/223cd67)
- [patch] Updated dependencies
  [223cd67](https://bitbucket.org/atlassian/atlaskit-mk-2/commits/223cd67)
  - @atlaskit/button@8.0.1
  - @atlaskit/theme@4.0.1
  - @atlaskit/docs@4.0.1

## 6.0.0

- [major] makes styled-components a peer dependency and upgrades version range from 1.4.6 - 3 to
  ^3.2.6 [1e80619](https://bitbucket.org/atlassian/atlaskit-mk-2/commits/1e80619)
- [patch] Updated dependencies
  [1e80619](https://bitbucket.org/atlassian/atlaskit-mk-2/commits/1e80619)
  - @atlaskit/button@8.0.0
  - @atlaskit/theme@4.0.0
  - @atlaskit/docs@4.0.0

## 5.0.2

- [patch] Updated dependencies
  [d662caa](https://bitbucket.org/atlassian/atlaskit-mk-2/commits/d662caa)
  - @atlaskit/button@7.2.5
  - @atlaskit/theme@3.2.2
  - @atlaskit/docs@3.0.4

## 5.0.0

- [major] Bump to React 16.3.
  [4251858](https://bitbucket.org/atlassian/atlaskit-mk-2/commits/4251858)

## 4.1.1

- [patch] Re-releasing due to potentially broken babel release
  [9ed0bba](https://bitbucket.org/atlassian/atlaskit-mk-2/commits/9ed0bba)

## 4.1.0

- [minor] Update styled-components dependency to support versions 1.4.6 - 3
  [ceccf30](https://bitbucket.org/atlassian/atlaskit-mk-2/commits/ceccf30)

## 4.0.9

- [patch] updated the repository url to https://bitbucket.org/atlassian/atlaskit-mk-2
  [1e57e5a](https://bitbucket.org/atlassian/atlaskit-mk-2/commits/1e57e5a)

## 4.0.8

- [patch] Packages Flow types for elements components
  [3111e74](https://bitbucket.org/atlassian/atlaskit-mk-2/commits/3111e74)

## 4.0.7

- [patch] Minor documentation fixes
  [f0e96bd](https://bitbucket.org/atlassian/atlaskit-mk-2/commits/f0e96bd)

## 4.0.6

- [patch] Migrate Navigation from Ak repo to ak mk 2 repo, Fixed flow typing inconsistencies in ak
  mk 2 [bdeef5b](https://bitbucket.org/atlassian/atlaskit-mk-2/commits/bdeef5b)

## 4.0.5

- [patch] Resolved low hanging flow errors in field-base field-text comment icon item and website,
  \$ [007de27](https://bitbucket.org/atlassian/atlaskit-mk-2/commits/007de27)

## 4.0.4

- [patch] Migration of Blanket to mk2 repo
  [1c55d97](https://bitbucket.org/atlassian/atlaskit-mk-2/commits/1c55d97)

## 4.0.3 (2017-12-21)

- bug fix; Minor change to storybook to test new s3 bucket
  ([97cbb7d](https://bitbucket.org/atlassian/atlaskit/commits/97cbb7d))

## 4.0.2 (2017-11-27)

- bug fix; bump theme dependency to 2.2.0 (issues closed: nav-27)
  ([2b71345](https://bitbucket.org/atlassian/atlaskit/commits/2b71345))

## 4.0.1 (2017-11-15)

- bug fix; bumping internal dependencies to latest major versions
  ([288935a](https://bitbucket.org/atlassian/atlaskit/commits/288935a))

## 4.0.0 (2017-11-14)

- bug fix; implemented code review comments: using theme package to get layer value and removed
  ([b1a84f5](https://bitbucket.org/atlassian/atlaskit/commits/b1a84f5))
- breaking; added z-index to blanket
  ([4665973](https://bitbucket.org/atlassian/atlaskit/commits/4665973))
- breaking; aK-3851-fix added z-index to blanket, reverts b344810 (issues closed: ak-3851)
  ([4665973](https://bitbucket.org/atlassian/atlaskit/commits/4665973))

## 3.0.3 (2017-10-26)

- bug fix; fix to rebuild stories
  ([793b2a7](https://bitbucket.org/atlassian/atlaskit/commits/793b2a7))

## 3.0.2 (2017-10-22)

- bug fix; update dependencies for react-16
  ([077d1ad](https://bitbucket.org/atlassian/atlaskit/commits/077d1ad))

## 3.0.1 (2017-10-13)

- bug fix; fix Blanket stories ([b9ac4ab](https://bitbucket.org/atlassian/atlaskit/commits/b9ac4ab))
- bug fix; other fix for other issue
  ([014f79c](https://bitbucket.org/atlassian/atlaskit/commits/014f79c))
- bug fix; fix render issue for Blanket storybook
  ([b277ff3](https://bitbucket.org/atlassian/atlaskit/commits/b277ff3))

## 3.0.0 (2017-08-31)

- breaking; removed z-index ([b344810](https://bitbucket.org/atlassian/atlaskit/commits/b344810))
- breaking; removed z-index for integration with @atlaskit/layer-manager
  ([b344810](https://bitbucket.org/atlassian/atlaskit/commits/b344810))
- feature; update to use @atlaskit/theme - now supports dark mode
  ([422c74e](https://bitbucket.org/atlassian/atlaskit/commits/422c74e))

## 2.4.3 (2017-08-09)

- bug fix; bump util-shared-styles dependency to latest to reduce app bundle sizes (issues closed:
  ak-3252) ([dbc406c](https://bitbucket.org/atlassian/atlaskit/commits/dbc406c))

## 2.4.2 (2017-07-27)

- fix; rename jsnext:main to jsnext:experimental:main temporarily
  ([c7508e0](https://bitbucket.org/atlassian/atlaskit/commits/c7508e0))

## 2.4.1 (2017-07-25)

- fix; use class transform in loose mode in babel to improve load performance in apps
  ([fde719a](https://bitbucket.org/atlassian/atlaskit/commits/fde719a))

## 2.1.0 (2017-07-17)

- fix; rerelease, failed prepublish scripts
  ([5fd82f8](https://bitbucket.org/atlassian/atlaskit/commits/5fd82f8))

## 2.1.0 (2017-07-17)

- feature; added ES module builds to dist and add jsnext:main to most ADG packages
  ([ea76507](https://bitbucket.org/atlassian/atlaskit/commits/ea76507))

## 2.0.5 (2017-07-13)

- fix; testing releasing more than 5 packages at a time
  ([e69b832](https://bitbucket.org/atlassian/atlaskit/commits/e69b832))
- fix; add prop-types as a dependency to avoid React 15.x warnings
  ([92598eb](https://bitbucket.org/atlassian/atlaskit/commits/92598eb))

## 2.0.4 (2017-04-27)

- fix; update legal copy to be more clear. Not all modules include ADG license.
  ([f3a945e](https://bitbucket.org/atlassian/atlaskit/commits/f3a945e))

## 2.0.3 (2017-04-26)

- fix; update legal copy and fix broken links for component README on npm. New contribution and
  ([0b3e454](https://bitbucket.org/atlassian/atlaskit/commits/0b3e454))

## 2.0.2 (2017-03-29)

- fix; repush stories for broken releases
  ([cde4000](https://bitbucket.org/atlassian/atlaskit/commits/cde4000))

## 2.0.1 (2017-03-28)

- fix; update blanket with new structure, use new readme story component
  ([2ecfd11](https://bitbucket.org/atlassian/atlaskit/commits/2ecfd11))

## 2.0.0 (2017-03-27)

- refactor the blanket component to use styled-components
  ([62dc8f2](https://bitbucket.org/atlassian/atlaskit/commits/62dc8f2))
- breaking; removed dependency "classnames", added peerDependency "styled-components"

## 1.2.4 (2017-03-23)

- fix; Empty commit to release the component
  ([49c08ee](https://bitbucket.org/atlassian/atlaskit/commits/49c08ee))

## 1.2.2 (2017-03-21)

- fix; maintainers for all the packages were added
  ([261d00a](https://bitbucket.org/atlassian/atlaskit/commits/261d00a))

## 1.2.0 (2017-02-27)

- feature; added `canClickThroughBlanket` prop to Blanket to make it possible to animate
  ([cacb5cb](https://bitbucket.org/atlassian/atlaskit/commits/cacb5cb))

## 1.1.0 (2017-02-22)

- feature; add canClickThrough to blanket
  ([c2e31aa](https://bitbucket.org/atlassian/atlaskit/commits/c2e31aa))

## 1.0.2 (2017-02-10)

- fix; Dummy commit to release components to registry
  ([5bac43b](https://bitbucket.org/atlassian/atlaskit/commits/5bac43b))

## 1.0.1 (2017-02-06)

- fix; bumps deps to use scoped packages
  ([9384221](https://bitbucket.org/atlassian/atlaskit/commits/9384221))
