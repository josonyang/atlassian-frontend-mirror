# @atlaskit/code

## 17.2.2

### Patch Changes

- [#181696](https://bitbucket.org/atlassian/atlassian-frontend-monorepo/pull-requests/181696)
  [`eded1f9313bbe`](https://bitbucket.org/atlassian/atlassian-frontend-monorepo/commits/eded1f9313bbe) -
  Updated prismjs dependency to resolve security vulnerability: 1.30.0

## 17.2.1

### Patch Changes

- Updated dependencies

## 17.2.0

### Minor Changes

- [#153642](https://bitbucket.org/atlassian/atlassian-frontend-monorepo/pull-requests/153642)
  [`dca85557e83b9`](https://bitbucket.org/atlassian/atlassian-frontend-monorepo/commits/dca85557e83b9) -
  Adds a label prop for when code block is scrollable. Fixes the code block scrollablity bug.

## 17.1.2

### Patch Changes

- [#152825](https://bitbucket.org/atlassian/atlassian-frontend-monorepo/pull-requests/152825)
  [`5e38d365c6154`](https://bitbucket.org/atlassian/atlassian-frontend-monorepo/commits/5e38d365c6154) -
  Reverts addition of tab index to code block

## 17.1.1

### Patch Changes

- [#152049](https://bitbucket.org/atlassian/atlassian-frontend-monorepo/pull-requests/152049)
  [`a2bdf059329e8`](https://bitbucket.org/atlassian/atlassian-frontend-monorepo/commits/a2bdf059329e8) -
  Add support for Gherkin language to code

## 17.1.0

### Minor Changes

- [#146790](https://bitbucket.org/atlassian/atlassian-frontend-monorepo/pull-requests/146790)
  [`14ab02f5ac440`](https://bitbucket.org/atlassian/atlassian-frontend-monorepo/commits/14ab02f5ac440) -
  Removing deprecated `getCodeStyles` function export

### Patch Changes

- Updated dependencies

## 17.0.0

### Major Changes

- [#125263](https://bitbucket.org/atlassian/atlassian-frontend-monorepo/pull-requests/125263)
  [`1437a53a170e0`](https://bitbucket.org/atlassian/atlassian-frontend-monorepo/commits/1437a53a170e0) -
  Migrated from `@emotion/react` to `@compiled/react` in order to improve performance, align with
  the rest of the Atlaskit techstack, and support React 18 Streaming SSR.

  Deprecating the `getCodeStyles` function export from the @atlaskit/code package as it is no longer
  used.

  Please note, in order to use this version of `@atlaskit/code`, you will need to ensure that your
  bundler is configured to handle `.css` imports correctly. Most bundlers come with built-in support
  for `.css` imports, so you may not need to do anything. If you are using a different bundler,
  please refer to the documentation for that bundler to understand how to handle `.css` imports.

  For more information on the migration, please refer to
  [RFC-73 Migrating our components to Compiled CSS-in-JS](https://community.developer.atlassian.com/t/rfc-73-migrating-our-components-to-compiled-css-in-js/85953).

### Patch Changes

- Updated dependencies

## 16.3.0

### Minor Changes

- [#135906](https://bitbucket.org/atlassian/atlassian-frontend-monorepo/pull-requests/135906)
  [`bf6acb8983b3c`](https://bitbucket.org/atlassian/atlassian-frontend-monorepo/commits/bf6acb8983b3c) -
  CodeBlock now supports syntax highlighting for the Handlebars templating language.

## 16.2.0

### Minor Changes

- [#135035](https://bitbucket.org/atlassian/atlassian-frontend-monorepo/pull-requests/135035)
  [`0d6128bb1e136`](https://bitbucket.org/atlassian/atlassian-frontend-monorepo/commits/0d6128bb1e136) -
  CodeBlock now correctly applies syntax highlighting for the ABAP language. This change is no
  longer behind a feature flag.

## 16.1.0

### Minor Changes

- [#130207](https://bitbucket.org/atlassian/atlassian-frontend-monorepo/pull-requests/130207)
  [`555f7dfaf77f8`](https://bitbucket.org/atlassian/atlassian-frontend-monorepo/commits/555f7dfaf77f8) -
  CodeBlock now correctly applies syntax highlighting for the ABAP language. This change is behind
  the feature flag `platform_dst_code_abap_syntax`.

## 16.0.3

### Patch Changes

- [#129972](https://bitbucket.org/atlassian/atlassian-frontend-monorepo/pull-requests/129972)
  [`b2d69a39e6687`](https://bitbucket.org/atlassian/atlassian-frontend-monorepo/commits/b2d69a39e6687) -
  Update `@compiled/react` dependency for improved type checking support.
- Updated dependencies

## 16.0.2

### Patch Changes

- Updated dependencies

## 16.0.1

### Patch Changes

- Updated dependencies

## 16.0.0

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

## 15.8.0

### Minor Changes

- [#116138](https://stash.atlassian.com/projects/CONFCLOUD/repos/confluence-frontend/pull-requests/116138)
  [`b50c5d5d65ae2`](https://stash.atlassian.com/projects/CONFCLOUD/repos/confluence-frontend/commits/b50c5d5d65ae2) -
  Bump to the latest version of @compiled/react

### Patch Changes

- Updated dependencies

## 15.7.3

### Patch Changes

- Updated dependencies

## 15.7.2

### Patch Changes

- [#114336](https://stash.atlassian.com/projects/CONFCLOUD/repos/confluence-frontend/pull-requests/114336)
  [`f09cd799e466a`](https://stash.atlassian.com/projects/CONFCLOUD/repos/confluence-frontend/commits/f09cd799e466a) -
  Update dependencies and remove old codemods.

## 15.7.1

### Patch Changes

- Updated dependencies

## 15.7.0

### Minor Changes

- [#109060](https://stash.atlassian.com/projects/CONFCLOUD/repos/confluence-frontend/pull-requests/109060)
  [`4660ec858a305`](https://stash.atlassian.com/projects/CONFCLOUD/repos/confluence-frontend/commits/4660ec858a305) -
  Update `React` from v16 to v18

### Patch Changes

- Updated dependencies

## 15.6.10

### Patch Changes

- [#105601](https://stash.atlassian.com/projects/CONFCLOUD/repos/confluence-frontend/pull-requests/105601)
  [`948a599bf836d`](https://stash.atlassian.com/projects/CONFCLOUD/repos/confluence-frontend/commits/948a599bf836d) -
  Update dependencies and remove unused internal exports.
- Updated dependencies

## 15.6.9

### Patch Changes

- Updated dependencies

## 15.6.8

### Patch Changes

- [#178053](https://stash.atlassian.com/projects/CONFCLOUD/repos/confluence-frontend/pull-requests/178053)
  [`cb318c8c28c26`](https://stash.atlassian.com/projects/CONFCLOUD/repos/confluence-frontend/commits/cb318c8c28c26) -
  Internal changes to typography.

## 15.6.7

### Patch Changes

- Updated dependencies

## 15.6.6

### Patch Changes

- [#166026](https://stash.atlassian.com/projects/CONFCLOUD/repos/confluence-frontend/pull-requests/166026)
  [`962b5e77810fb`](https://stash.atlassian.com/projects/CONFCLOUD/repos/confluence-frontend/commits/962b5e77810fb) -
  Adds side-effect config to support Compiled css extraction in third-party apps

## 15.6.5

### Patch Changes

- Updated dependencies

## 15.6.4

### Patch Changes

- [#153064](https://stash.atlassian.com/projects/CONFCLOUD/repos/confluence-frontend/pull-requests/153064)
  [`fba89f308ab2b`](https://stash.atlassian.com/projects/CONFCLOUD/repos/confluence-frontend/commits/fba89f308ab2b) -
  [ux] Removed feature flag resulting typography style changes but no visual changes.

## 15.6.3

### Patch Changes

- [#152305](https://stash.atlassian.com/projects/CONFCLOUD/repos/confluence-frontend/pull-requests/152305)
  [`0f13c972be628`](https://stash.atlassian.com/projects/CONFCLOUD/repos/confluence-frontend/commits/0f13c972be628) -
  [ux] Fix background color override using CSS variable for inlinde code behind a feature flag. If
  successful, these changes will be made available in a later release.

## 15.6.2

### Patch Changes

- [#146968](https://stash.atlassian.com/projects/CONFCLOUD/repos/confluence-frontend/pull-requests/146968)
  [`55f40e0488d9e`](https://stash.atlassian.com/projects/CONFCLOUD/repos/confluence-frontend/commits/55f40e0488d9e) -
  [ux] Use typography tokens where possible for code block component behind a feature flag. If
  successful, these changes will be made available in a later release.

## 15.6.1

### Patch Changes

- Updated dependencies

## 15.6.0

### Minor Changes

- [#133573](https://stash.atlassian.com/projects/CONFCLOUD/repos/confluence-frontend/pull-requests/133573)
  [`9e6563c10af4c`](https://stash.atlassian.com/projects/CONFCLOUD/repos/confluence-frontend/commits/9e6563c10af4c) -
  Updating font styles for code component inline with the new typography system behind a feature
  flag. If successful, these changes will be made available in a later release.

## 15.5.1

### Patch Changes

- Updated dependencies

## 15.5.0

### Minor Changes

- [#127511](https://stash.atlassian.com/projects/CONFCLOUD/repos/confluence-frontend/pull-requests/127511)
  [`db30e29344013`](https://stash.atlassian.com/projects/CONFCLOUD/repos/confluence-frontend/commits/db30e29344013) -
  Widening range of `react` and `react-dom` peer dependencies from `^16.8.0 || ^17.0.0 || ~18.2.0`
  to the wider range of ``^16.8.0 || ^17.0.0 || ^18.0.0` (where applicable).

  This change has been done to enable usage of `react@18.3` as well as to have a consistent peer
  dependency range for `react` and `react-dom` for `/platform` packages.

### Patch Changes

- Updated dependencies

## 15.4.2

### Patch Changes

- [#120049](https://stash.atlassian.com/projects/CONFCLOUD/repos/confluence-frontend/pull-requests/120049)
  [`77504ff274f72`](https://stash.atlassian.com/projects/CONFCLOUD/repos/confluence-frontend/commits/77504ff274f72) -
  DSP-19576: Assign names to anonymous default exports

## 15.4.1

### Patch Changes

- [#118430](https://stash.atlassian.com/projects/CONFCLOUD/repos/confluence-frontend/pull-requests/118430)
  [`d5fe97a9a6bc1`](https://stash.atlassian.com/projects/CONFCLOUD/repos/confluence-frontend/commits/d5fe97a9a6bc1) -
  Remove remnants of `extract-react-types`.

## 15.4.0

### Minor Changes

- [#116950](https://stash.atlassian.com/projects/CONFCLOUD/repos/confluence-frontend/pull-requests/116950)
  [`c3908db22d486`](https://stash.atlassian.com/projects/CONFCLOUD/repos/confluence-frontend/commits/c3908db22d486) -
  CodeBlock supports a new `firstLineNumber` prop, which allows the starting line number to be set
  (defaulting to 1).

## 15.3.1

### Patch Changes

- [#116025](https://stash.atlassian.com/projects/CONFCLOUD/repos/confluence-frontend/pull-requests/116025)
  [`cd506a937e44f`](https://stash.atlassian.com/projects/CONFCLOUD/repos/confluence-frontend/commits/cd506a937e44f) -
  Internal change to how typography is applied. There should be no visual change.

## 15.3.0

### Minor Changes

- [#111878](https://stash.atlassian.com/projects/CONFCLOUD/repos/confluence-frontend/pull-requests/111878)
  [`223959ef57c80`](https://stash.atlassian.com/projects/CONFCLOUD/repos/confluence-frontend/commits/223959ef57c80) -
  Explicitly set jsxRuntime to classic via pragma comments in order to avoid issues where jsxRuntime
  is implicitly set to automatic.

## 15.2.1

### Patch Changes

- [#109278](https://stash.atlassian.com/projects/CONFCLOUD/repos/confluence-frontend/pull-requests/109278)
  [`61432c68027c1`](https://stash.atlassian.com/projects/CONFCLOUD/repos/confluence-frontend/commits/61432c68027c1) -
  [ux] CodeBlock now renders tab size as 4 characters wide.

## 15.2.0

### Minor Changes

- [#98206](https://stash.atlassian.com/projects/CONFCLOUD/repos/confluence-frontend/pull-requests/98206)
  [`71a555d49484`](https://stash.atlassian.com/projects/CONFCLOUD/repos/confluence-frontend/commits/71a555d49484) -
  Add support for React 18 in non-strict mode.

### Patch Changes

- Updated dependencies

## 15.1.2

### Patch Changes

- [#83188](https://stash.atlassian.com/projects/CONFCLOUD/repos/confluence-frontend/pull-requests/83188)
  [`cd5d06cd3329`](https://stash.atlassian.com/projects/CONFCLOUD/repos/confluence-frontend/commits/cd5d06cd3329) -
  Minor adjustments to improve compatibility with React 18

## 15.1.1

### Patch Changes

- [#83116](https://stash.atlassian.com/projects/CONFCLOUD/repos/confluence-frontend/pull-requests/83116)
  [`8d4e99057fe0`](https://stash.atlassian.com/projects/CONFCLOUD/repos/confluence-frontend/commits/8d4e99057fe0) -
  Upgrade Typescript from `4.9.5` to `5.4.2`

## 15.1.0

### Minor Changes

- [#42903](https://bitbucket.org/atlassian/atlassian-frontend/pull-requests/42903)
  [`96e3a0ee5b7`](https://bitbucket.org/atlassian/atlassian-frontend/commits/96e3a0ee5b7) - [ux] Add
  support for Dockerfile, HCL, NGINX and Protobuf languages

## 15.0.0

### Major Changes

- [#41498](https://bitbucket.org/atlassian/atlassian-frontend/pull-requests/41498)
  [`73adf14896c`](https://bitbucket.org/atlassian/atlassian-frontend/commits/73adf14896c) - Remove
  usage of legacy theming from the Code component and refactor where necessary to accomodate the
  updated API.

## 14.6.9

### Patch Changes

- Updated dependencies

## 14.6.8

### Patch Changes

- [#40914](https://bitbucket.org/atlassian/atlassian-frontend/pull-requests/40914)
  [`ffa68309c76`](https://bitbucket.org/atlassian/atlassian-frontend/commits/ffa68309c76) - update
  children variable to have type definition

## 14.6.7

### Patch Changes

- [#38162](https://bitbucket.org/atlassian/atlassian-frontend/pull-requests/38162)
  [`fd6bb9c9184`](https://bitbucket.org/atlassian/atlassian-frontend/commits/fd6bb9c9184) - Delete
  version.json
- Updated dependencies

## 14.6.6

### Patch Changes

- [#36754](https://bitbucket.org/atlassian/atlassian-frontend/pull-requests/36754)
  [`4ae083a7e66`](https://bitbucket.org/atlassian/atlassian-frontend/commits/4ae083a7e66) - Use
  `@af/accessibility-testing` for default jest-axe config and jest-axe import in accessibility
  testing.

## 14.6.5

### Patch Changes

- [#34360](https://bitbucket.org/atlassian/atlassian-frontend/pull-requests/34360)
  [`59b808d6a46`](https://bitbucket.org/atlassian/atlassian-frontend/commits/59b808d6a46) - [ux]
  Improves the accessibility of the bidirectional character warnings.

## 14.6.4

### Patch Changes

- [#33652](https://bitbucket.org/atlassian/atlassian-frontend/pull-requests/33652)
  [`e7ea6832ad2`](https://bitbucket.org/atlassian/atlassian-frontend/commits/e7ea6832ad2) - Bans the
  use of React.FC/React.FunctionComponent type in ADS components as part of the React 18 migration
  work. The change is internal only and should not introduce any changes for the component
  consumers.

## 14.6.3

### Patch Changes

- [#34051](https://bitbucket.org/atlassian/atlassian-frontend/pull-requests/34051)
  [`49b08bfdf5f`](https://bitbucket.org/atlassian/atlassian-frontend/commits/49b08bfdf5f) - Migrated
  use of `gridSize` to space tokens where possible. There is no expected visual or behaviour change.

## 14.6.2

### Patch Changes

- [#33793](https://bitbucket.org/atlassian/atlassian-frontend/pull-requests/33793)
  [`9d00501a414`](https://bitbucket.org/atlassian/atlassian-frontend/commits/9d00501a414) - Ensure
  legacy types are published for TS 4.5-4.8

## 14.6.1

### Patch Changes

- [#33649](https://bitbucket.org/atlassian/atlassian-frontend/pull-requests/33649)
  [`41fae2c6f68`](https://bitbucket.org/atlassian/atlassian-frontend/commits/41fae2c6f68) - Upgrade
  Typescript from `4.5.5` to `4.9.5`

## 14.6.0

### Minor Changes

- [#33258](https://bitbucket.org/atlassian/atlassian-frontend/pull-requests/33258)
  [`56507598609`](https://bitbucket.org/atlassian/atlassian-frontend/commits/56507598609) - Skip
  minor dependency bump

### Patch Changes

- Updated dependencies

## 14.5.4

### Patch Changes

- [#32424](https://bitbucket.org/atlassian/atlassian-frontend/pull-requests/32424)
  [`2e01c9c74b5`](https://bitbucket.org/atlassian/atlassian-frontend/commits/2e01c9c74b5) - DUMMY
  remove before merging to master; dupe adf-schema via adf-utils

## 14.5.3

### Patch Changes

- [#31638](https://bitbucket.org/atlassian/atlassian-frontend/pull-requests/31638)
  [`74750bef5c4`](https://bitbucket.org/atlassian/atlassian-frontend/commits/74750bef5c4) - Fixes
  some bugs with the long line wrapping and syntax-highlighting changes that were released in
  v14.5.0.

## 14.5.2

### Patch Changes

- [#31378](https://bitbucket.org/atlassian/atlassian-frontend/pull-requests/31378)
  [`3ca97be0c06`](https://bitbucket.org/atlassian/atlassian-frontend/commits/3ca97be0c06) - Internal
  change only. Replace usages of Inline/Stack with stable version from `@atlaskit/primitives`.

## 14.5.1

### Patch Changes

- [#31206](https://bitbucket.org/atlassian/atlassian-frontend/pull-requests/31206)
  [`261420360ec`](https://bitbucket.org/atlassian/atlassian-frontend/commits/261420360ec) - Upgrades
  component types to support React 18.
- Updated dependencies

## 14.5.0

### Minor Changes

- [#30248](https://bitbucket.org/atlassian/atlassian-frontend/pull-requests/30248)
  [`f5ca132a05e`](https://bitbucket.org/atlassian/atlassian-frontend/commits/f5ca132a05e) - [ux]
  CodeBlock has had some significant under-the-hood changes in this version. While technically it is
  a minor update as all API changes are additive and backwards-compatible, this is a heads up that
  there are some small visual changes that may require visual regression snapshots to be updated.

  - Adds a new `shouldWrapLongLines` prop that allows you to wrap long lines of code over multiple
    lines, instead of always forcing the container to scroll horizontally.

  - Fixes a frustrating bug where copying code from `CodeBlock` would also copy line numbers — this
    no longer occurs!

  - Replaces the dependency of `react-syntax-highlighter` with our own implementation that is more
    maintainable and performant. This also lead to a bump in an underlying dependency `prismjs`
    which added new syntax highlighting features for some languages. This may cause some blocks of
    code to look slightly different, potentially impacting VR tests — some changes are expected!
    Reach out to #help-design-system if you have any questions.

  - Improves the presentation and security of `CodeBlock`'s with bidirectional characters to present
    the source code exactly how it was written. The bidirectional characters themselves are still
    highlighted in the same way as before with a warning and a tooltip. This may also impact VR
    tests, but is expected.

### Patch Changes

- Updated dependencies

## 14.4.8

### Patch Changes

- Updated dependencies

## 14.4.7

### Patch Changes

- [#29390](https://bitbucket.org/atlassian/atlassian-frontend/pull-requests/29390)
  [`18aeca8c199`](https://bitbucket.org/atlassian/atlassian-frontend/commits/18aeca8c199) - Internal
  change to update token references. There is no expected behaviour or visual change.

## 14.4.6

### Patch Changes

- [#28064](https://bitbucket.org/atlassian/atlassian-frontend/pull-requests/28064)
  [`b0f6dd0bc35`](https://bitbucket.org/atlassian/atlassian-frontend/commits/b0f6dd0bc35) - Updated
  to use typography tokens. There is no expected behaviour or visual change.

## 14.4.5

### Patch Changes

- Updated dependencies

## 14.4.4

### Patch Changes

- Updated dependencies

## 14.4.3

### Patch Changes

- [#26712](https://bitbucket.org/atlassian/atlassian-frontend/pull-requests/26712)
  [`f1765efdca6`](https://bitbucket.org/atlassian/atlassian-frontend/commits/f1765efdca6) - [ux] Fix
  bug that caused misalignment of Code Block content which contain a mixture of spaces and tabs

## 14.4.2

### Patch Changes

- Updated dependencies

## 14.4.1

### Patch Changes

- [#26488](https://bitbucket.org/atlassian/atlassian-frontend/pull-requests/26488)
  [`bc989043572`](https://bitbucket.org/atlassian/atlassian-frontend/commits/bc989043572) - Internal
  changes to apply spacing tokens. This should be a no-op change.

## 14.4.0

### Minor Changes

- [#24710](https://bitbucket.org/atlassian/atlassian-frontend/pull-requests/24710)
  [`d6bf753bb43`](https://bitbucket.org/atlassian/atlassian-frontend/commits/d6bf753bb43) - Updates
  `@emotion/core` to `@emotion/react`; v10 to v11. There is no expected behavior change.

### Patch Changes

- Updated dependencies

## 14.3.10

### Patch Changes

- [#24874](https://bitbucket.org/atlassian/atlassian-frontend/pull-requests/24874)
  [`8cc2f888c83`](https://bitbucket.org/atlassian/atlassian-frontend/commits/8cc2f888c83) - Upgrade
  Typescript from `4.3.5` to `4.5.5`

## 14.3.9

### Patch Changes

- [#24492](https://bitbucket.org/atlassian/atlassian-frontend/pull-requests/24492)
  [`8d4228767b0`](https://bitbucket.org/atlassian/atlassian-frontend/commits/8d4228767b0) - Upgrade
  Typescript from `4.2.4` to `4.3.5`.

## 14.3.8

### Patch Changes

- [#23381](https://bitbucket.org/atlassian/atlassian-frontend/pull-requests/23381)
  [`8202e37941b`](https://bitbucket.org/atlassian/atlassian-frontend/commits/8202e37941b) - Internal
  code change turning on new linting rules.

## 14.3.7

### Patch Changes

- Updated dependencies

## 14.3.6

### Patch Changes

- [#20650](https://bitbucket.org/atlassian/atlassian-frontend/pull-requests/20650)
  [`cb2392f6d33`](https://bitbucket.org/atlassian/atlassian-frontend/commits/cb2392f6d33) - Upgrade
  to TypeScript 4.2.4

## 14.3.5

### Patch Changes

- [#20033](https://bitbucket.org/atlassian/atlassian-frontend/pull-requests/20033)
  [`46824ff1acd`](https://bitbucket.org/atlassian/atlassian-frontend/commits/46824ff1acd) - [ux]
  `<CodeBlock />`s with no content no longer vertically collapse, and maintain their intended
  minimum height
- Updated dependencies

## 14.3.4

### Patch Changes

- Updated dependencies

## 14.3.3

### Patch Changes

- [#19019](https://bitbucket.org/atlassian/atlassian-frontend/pull-requests/19019)
  [`a1a89347baa`](https://bitbucket.org/atlassian/atlassian-frontend/commits/a1a89347baa) - [ux]
  Instrumented `@atlaskit/code` with the new theming package, `@atlaskit/tokens`.

  New tokens will be visible only in applications configured to use the new Tokens API (currently in
  alpha). These changes are intended to be interoperable with the legacy theme implementation.
  Legacy dark mode users should expect no visual or breaking changes.

- Updated dependencies

## 14.3.2

### Patch Changes

- [#18356](https://bitbucket.org/atlassian/atlassian-frontend/pull-requests/18356)
  [`b5226ba2c15`](https://bitbucket.org/atlassian/atlassian-frontend/commits/b5226ba2c15) - Replace
  `bolt` with `yarn` for rendered example changeset commands

## 14.3.1

### Patch Changes

- [#16531](https://bitbucket.org/atlassian/atlassian-frontend/pull-requests/16531)
  [`7a34eeea327`](https://bitbucket.org/atlassian/atlassian-frontend/commits/7a34eeea327) - Bump
  prismjs due to vulnerability

## 14.3.0

### Minor Changes

- [#16168](https://bitbucket.org/atlassian/atlassian-frontend/pull-requests/16168)
  [`db3477abb18`](https://bitbucket.org/atlassian/atlassian-frontend/commits/db3477abb18) - [ux]
  ED-13938 disabled code-bidi warning tooltip for mobile, reworked TextWrapper to fix bidi
  mitigation, and fixed issue where bidi warnings were not presented when renderer used with an
  annotation provider with draftMode set to true

## 14.2.0

### Minor Changes

- [#16006](https://bitbucket.org/atlassian/atlassian-frontend/pull-requests/16006)
  [`c80c71b537d`](https://bitbucket.org/atlassian/atlassian-frontend/commits/c80c71b537d) - [ux]
  ED-13860 add bidi warning decorations to code components

## 14.1.5

### Patch Changes

- [#15694](https://bitbucket.org/atlassian/atlassian-frontend/pull-requests/15694)
  [`b85e7ce12cd`](https://bitbucket.org/atlassian/atlassian-frontend/commits/b85e7ce12cd) - Internal
  upgrade of memoize-one to 6.0.0

## 14.1.4

### Patch Changes

- Updated dependencies

## 14.1.3

### Patch Changes

- [#12880](https://bitbucket.org/atlassian/atlassian-frontend/pull-requests/12880)
  [`378d1cef00f`](https://bitbucket.org/atlassian/atlassian-frontend/commits/378d1cef00f) - Bump
  `@atlaskit/theme` to version `^11.3.0`.

## 14.1.2

### Patch Changes

- [#12810](https://bitbucket.org/atlassian/atlassian-frontend/pull-requests/12810)
  [`d827fec15b2`](https://bitbucket.org/atlassian/atlassian-frontend/commits/d827fec15b2) - Fixes a
  regression in ^14.0.0 that meant the function `getCodeStyles` didn't work correctly with
  interpolations using the `styled-components` theming.

## 14.1.1

### Patch Changes

- [#12168](https://bitbucket.org/atlassian/atlassian-frontend/pull-requests/12168)
  [`cd488f9d370`](https://bitbucket.org/atlassian/atlassian-frontend/commits/cd488f9d370) - Bumps
  prismjs to address a security vulnerability in the underlying lib.

## 14.1.0

### Minor Changes

- [#11113](https://bitbucket.org/atlassian/atlassian-frontend/pull-requests/11113)
  [`aef12f51c46`](https://bitbucket.org/atlassian/atlassian-frontend/commits/aef12f51c46) - Add an
  entry point for constants to expose SUPPORTED_LANGUAGES and export the type of
  SUPPORTED_LANGUAGES. Splunk SPl has also been added as a supported language.

## 14.0.1

### Patch Changes

- [#10569](https://bitbucket.org/atlassian/atlassian-frontend/pull-requests/10569)
  [`596f1eb2fca`](https://bitbucket.org/atlassian/atlassian-frontend/commits/596f1eb2fca) - [ux]
  Line height property remvoved from inline code. This was a bug as the line height was being under
  calculated relative to the code's font size. It now inherits correctly.
- Updated dependencies

## 14.0.0

### Major Changes

- [#10230](https://bitbucket.org/atlassian/atlassian-frontend/pull-requests/10230)
  [`e8f66c36dd7`](https://bitbucket.org/atlassian/atlassian-frontend/commits/e8f66c36dd7) -
  **BREAKING CHANGES**

  This version includes several breaking changes to improve performance of the `@atlaskit/code`
  package.

  `<Code />` no longer supports syntax highlighting, greatly simplifying the component.
  Additionally, the `text` prop has been removed in favour of using `children` directly. This allows
  users to provide complex nodes (not just plain text) to Code.

  ```jsx
  // previous
  <Code text="const x = 10;" language="js" />
  // now with language no longer supported
  <Code>const x = 10;</Code>
  ```

  Component theming is no longer supported in `<Code />` or `<CodeBlock />`; this change does not
  effect global theming. As an escape hatch, two CSS variables are exposed:

  - `--ds--code--line-number-bg-color`: which controls the background color of the line numbers if
    set
  - `--ds--code--bg-color`: which controls the background color of the block body if set

  Components can now be imported individually using individual entrypoints. Using these entrypoints
  will reduce the overall bundle size of this package if you do not need both components.

  ```js
  import { Code } from '@atlaskit/code';
  // --> to
  import Code from '@atlaskit/code/inline';

  import { CodeBlock } from '@atlaskit/code';
  // --> to
  import CodeBlock from '@atlaskit/code/block';

  // note this will still work
  import { Code, CodeBlock } from '@atlaskit/code';
  ```

  Finally, `CodeBlock` has had type improvements, and internal optimisations to facilitate faster
  rendering and updates.

- [`7e091c1d415`](https://bitbucket.org/atlassian/atlassian-frontend/commits/7e091c1d415) - BREAKING
  CHANGE:

  The `codeStyle` prop has now been removed on the `Code` component.

  For reference, previously this type of usage would effect the styling of any numbers in the code
  text.

  ```js
  <Code codeStyle={{ number: 'red' }} text={someCode} />
  ```

  Due to internal changes the above usage is no longer possible.

  This release also includes internal changes to the syntax highlighting element to use class names
  instead of inline styles for syntax highlighting. This results in a substantial performance gain.

### Minor Changes

- [`07e012bfc5b`](https://bitbucket.org/atlassian/atlassian-frontend/commits/07e012bfc5b) - Updates
  to internal package structure, exposing additional entrypoints. Types also tightened for language
  support to better match underlying component.

### Patch Changes

- [`b46ca884bc8`](https://bitbucket.org/atlassian/atlassian-frontend/commits/b46ca884bc8) - Add a
  codemod to remove usages of the `language` prop and convert the `text` prop to be a child.
- Updated dependencies

## 13.2.3

### Patch Changes

- [#9756](https://bitbucket.org/atlassian/atlassian-frontend/pull-requests/9756)
  [`900819ca759`](https://bitbucket.org/atlassian/atlassian-frontend/commits/900819ca759) - Update
  to VR test suite, to make diffs easier to reason about.
- Updated dependencies

## 13.2.2

### Patch Changes

- [#9510](https://bitbucket.org/atlassian/atlassian-frontend/pull-requests/9510)
  [`c9da1eecd2a`](https://bitbucket.org/atlassian/atlassian-frontend/commits/c9da1eecd2a) - Internal
  changes moving class components to functional components, added updated types for
  react-syntax-highlighter

## 13.2.1

### Patch Changes

- [#8057](https://bitbucket.org/atlassian/atlassian-frontend/pull-requests/8057)
  [`413cc46d307`](https://bitbucket.org/atlassian/atlassian-frontend/commits/413cc46d307) - [ux]
  Added colors for missing syntax keywords

## 13.2.0

### Minor Changes

- [#7762](https://bitbucket.org/atlassian/atlassian-frontend/pull-requests/7762)
  [`3c7be954dbd`](https://bitbucket.org/atlassian/atlassian-frontend/commits/3c7be954dbd) - [ux]
  Line highlighting now meets WCAG 2.1 guidelines. Colors that were failing contrast have been
  updated and there is now a new visual cue consisting of a left border to the highlighted lines.
- [`23ef692842a`](https://bitbucket.org/atlassian/atlassian-frontend/commits/23ef692842a) - [ux]
  `Code` and `CodeBlock` now use react-syntax-highlighter@^15 to highlight code. As part of this
  change the fontSize for the line numbers and the code body have been normalised. This will be a
  breaking visual change for all consumers. No action is required other than a callout that this
  will affect any existing visual regression tests.

  Users can now use the `themeOverride` prop to customise the application of the default theme. This
  is an escape hatch which will likley be removed in a future major version.

  This change also includes:

  - A bugfix for lineHeight that meant linenumbers and code body were not vertically aligned
    correctly.
  - A bugfix for the SSR'd components not rendering consistently before hydration
  - Improved semantic lines, which can now be properly consumed by screen readers.
  - The `Code` and `CodeBlock` now expose additional options in their `theme` prop. These are
    `codeFontSize` and `codeLineHeight` which allow customisation of the component's rendered font
    size.

- [`7c2f2056ef7`](https://bitbucket.org/atlassian/atlassian-frontend/commits/7c2f2056ef7) - [ux]
  Added code syntax highlighting for the following languages: AppleScript, Clojure, Delphi, Diff,
  FoxPro, Object Pascal, QML, Standard ML, Visual Basic, JSX and TSX

### Patch Changes

- [`72d19d3f308`](https://bitbucket.org/atlassian/atlassian-frontend/commits/72d19d3f308) - Internal
  changes relating to types, and tests. Includes a small bugfix to the way Code component had styles
  applied and adds testId as a prop to both Code and CodeBlock.
- [`84c4d95e2e0`](https://bitbucket.org/atlassian/atlassian-frontend/commits/84c4d95e2e0) - [ux]
  Line numbers now have correct spacing in Firefox and Safari.
- [`a4bcf21a972`](https://bitbucket.org/atlassian/atlassian-frontend/commits/a4bcf21a972) - [ux]
  Syntax highlighting now uses accessibile colors that meet WCAG 2.0 Level AA guidelines for color
  contrast
- [`b5873e7bf01`](https://bitbucket.org/atlassian/atlassian-frontend/commits/b5873e7bf01) - [ux]
  Fixed highlighted line left border alignment.

## 13.1.1

### Patch Changes

- [#5857](https://bitbucket.org/atlassian/atlassian-frontend/pull-requests/5857)
  [`d3265f19be`](https://bitbucket.org/atlassian/atlassian-frontend/commits/d3265f19be) - Transpile
  packages using babel rather than tsc

## 13.1.0

### Minor Changes

- [#5516](https://bitbucket.org/atlassian/atlassian-frontend/pull-requests/5516)
  [`17162a77f2`](https://bitbucket.org/atlassian/atlassian-frontend/commits/17162a77f2) - types of
  Supported Languages for @atlaskit/code is maintained by the package itself. Useful for when one
  references Supported Languages, wanting to know what types of languages are supported by
  @atlaskit/code.

## 13.0.3

### Patch Changes

- [#5497](https://bitbucket.org/atlassian/atlassian-frontend/pull-requests/5497)
  [`5f58283e1f`](https://bitbucket.org/atlassian/atlassian-frontend/commits/5f58283e1f) - Export
  types using Typescript's new "export type" syntax to satisfy Typescript's --isolatedModules
  compiler option. This requires version 3.8 of Typescript, read more about how we handle Typescript
  versions here: https://atlaskit.atlassian.com/get-started Also add `typescript` to
  `devDependencies` to denote version that the package was built with.

## 13.0.2

### Patch Changes

- Updated dependencies

## 13.0.1

### Patch Changes

- [#4346](https://bitbucket.org/atlassian/atlassian-frontend/pull-requests/4346)
  [`ade5203287`](https://bitbucket.org/atlassian/atlassian-frontend/commits/ade5203287) - Fix
  codemod utilities being exposed through the codemod cli

## 13.0.0

### Major Changes

- [#4424](https://bitbucket.org/atlassian/atlassian-frontend/pull-requests/4424)
  [`37f8133702`](https://bitbucket.org/atlassian/atlassian-frontend/commits/37f8133702) - - Rename
  `AkCode` and `AkCodeBlock` exports to `Code` and `CodeBlock` respectively.
  - Remove unnecessary props (`lineNumberContainerStyle`, `showLineNumbers` and `highlight`) from
    `Code`.
  - Add codemods for above changes. Codemods can be found inside [codemods](./codemods) directory.
    Please use [@atlaskit/codemod-cli](https://www.npmjs.com/package/@atlaskit/codemod-cli) for
    running the codemods according to version of your package. Check its documentation
    [here](https://www.npmjs.com/package/@atlaskit/codemod-cli).
  - Split exported `Theme` type into `CodeTheme` and `CodeBlockTheme`.
  - Remove `lineNumberColor` and `lineNumberBgColor` type from `CodeTheme`. They are available only
    in `CodeBlockTheme` now.

### Patch Changes

- [`336f870e37`](https://bitbucket.org/atlassian/atlassian-frontend/commits/336f870e37) - fix
  exception errors of syntax highlighter for several languages

## 12.0.3

### Patch Changes

- [#3885](https://bitbucket.org/atlassian/atlassian-frontend/pull-requests/3885)
  [`6c525a8229`](https://bitbucket.org/atlassian/atlassian-frontend/commits/6c525a8229) - Upgraded
  to TypeScript 3.9.6 and tslib to 2.0.0

  Since tslib is a dependency for all our packages we recommend that products also follow this tslib
  upgrade to prevent duplicates of tslib being bundled.

## 12.0.2

### Patch Changes

- [#3293](https://bitbucket.org/atlassian/atlassian-frontend/pull-requests/3293)
  [`954cc87b62`](https://bitbucket.org/atlassian/atlassian-frontend/commits/954cc87b62) - The readme
  and package information has been updated to point to the new design system website.

## 12.0.1

### Patch Changes

- [#3428](https://bitbucket.org/atlassian/atlassian-frontend/pull-requests/3428)
  [`db053b24d8`](https://bitbucket.org/atlassian/atlassian-frontend/commits/db053b24d8) - Update all
  the theme imports to be tree-shakable

## 12.0.0

### Major Changes

- [#3335](https://bitbucket.org/atlassian/atlassian-frontend/pull-requests/3335)
  [`87f4720f27`](https://bitbucket.org/atlassian/atlassian-frontend/commits/87f4720f27) - Officially
  dropping IE11 support, from this version onwards there are no warranties of the package working in
  IE11. For more information see:
  https://community.developer.atlassian.com/t/atlaskit-to-drop-support-for-internet-explorer-11-from-1st-july-2020/39534

### Patch Changes

- Updated dependencies

## 11.1.6

### Patch Changes

- [#2866](https://bitbucket.org/atlassian/atlassian-frontend/pull-requests/2866)
  [`54a9514fcf`](https://bitbucket.org/atlassian/atlassian-frontend/commits/54a9514fcf) - Build and
  supporting files will no longer be published to npm

## 11.1.5

### Patch Changes

- [patch][f7f2068a76](https://bitbucket.org/atlassian/atlassian-frontend/commits/f7f2068a76):

  Change imports to comply with Atlassian conventions

## 11.1.4

### Patch Changes

- [patch][5f5b93071f](https://bitbucket.org/atlassian/atlassian-frontend/commits/5f5b93071f):

  Code highlighting now works as expected when highlighting single to double digit lines.- Updated
  dependencies [dae900bf82](https://bitbucket.org/atlassian/atlassian-frontend/commits/dae900bf82):

- Updated dependencies
  [8c9e4f1ec6](https://bitbucket.org/atlassian/atlassian-frontend/commits/8c9e4f1ec6):
  - @atlaskit/build-utils@2.6.4
  - @atlaskit/docs@8.5.0

## 11.1.3

### Patch Changes

- [patch][6548261c9a](https://bitbucket.org/atlassian/atlassian-frontend/commits/6548261c9a):

  Remove namespace imports from React, ReactDom, and PropTypes- Updated dependencies
  [6548261c9a](https://bitbucket.org/atlassian/atlassian-frontend/commits/6548261c9a):

  - @atlaskit/docs@8.3.2
  - @atlaskit/visual-regression@0.1.9
  - @atlaskit/theme@9.5.1

## 11.1.2

### Patch Changes

- [patch][b52f2be5d9](https://bitbucket.org/atlassian/atlassian-frontend/commits/b52f2be5d9):

  ThemedCode and ThemeCodeBlock props are now correctly typed- Updated dependencies
  [d2b8166208](https://bitbucket.org/atlassian/atlassian-frontend/commits/d2b8166208):

  - @atlaskit/docs@8.3.0

## 11.1.1

### Patch Changes

- [patch][4a223473c5](https://bitbucket.org/atlassian/atlassian-frontend/commits/4a223473c5):

  Removes babel/runtime from dependencies. Users should see a smaller bundlesize as a result-
  Updated dependencies
  [82747f2922](https://bitbucket.org/atlassian/atlassian-frontend/commits/82747f2922):

  - @atlaskit/theme@9.5.0

## 11.1.0

### Minor Changes

- [minor][9648afc5be](https://bitbucket.org/atlassian/atlaskit-mk-2/commits/9648afc5be):

  Adds `highlight` prop to `AkCodeBlock`, `Example`, and the `code` template literal. Use this to
  emphasize which lines of code you would like people to look at!

  The `highlight` prop can be used as follows:

  - To highlight one line: `highlight="3"`
  - To highlight sequential lines: `highlight="1-5"`
  - To highlight sequential and multiple single lines: `highlight="1-5,7,10,15-20"`

  **`AkCodeBlock` component**

  Use the `highlight` prop.

  ```js
  import { AkCodeBlock } from '@atlaskit/code';

  <AkCodeBlock
  	highlight="1-2"
  	text={`
  <div>
    hello there
    <span>buds</span>
  </div>
    `}
  />;
  ```

  **`Example` component**

  Use the `highlight` prop.

  ```js
  import { Example } from '@atlaskit/docs';

  <Example
  	packageName="@atlaskit/code"
  	Component={require('../examples/00-inline-code-basic').default}
  	title="Basic"
  	highlight="19,24,30,36"
  	source={require('!!raw-loader!../examples/00-inline-code-basic')}
  />;
  ```

  **`code` template literal**

  Add `highlight=` to the top of your code snippet. It takes the same values as the `highlight`
  prop.

  ```js
  import { code } from '@atlaskit/docs';

  code`highlight=5-7
    import React from 'react';
  
    () => (
      <div>
        hello there
        <span>buds</span>
      </div>
  )`;
  ```

## 11.0.14

### Patch Changes

- [patch][35d2229b2a](https://bitbucket.org/atlassian/atlaskit-mk-2/commits/35d2229b2a):

  Adding missing license to packages and update to Copyright 2019 Atlassian Pty Ltd.

## 11.0.13

### Patch Changes

- [patch][a2d0043716](https://bitbucket.org/atlassian/atlaskit-mk-2/commits/a2d0043716):

  Updated version of analytics-next to fix potential incompatibilities with TS 3.6

## 11.0.12

### Patch Changes

- [patch][65ada7f318](https://bitbucket.org/atlassian/atlaskit-mk-2/commits/65ada7f318):

  **FABDODGEM-12 Editor Cashmere Release**

  - [Internal post](http://go.atlassian.com/cashmere-release)

  **Affected editor components:**

  tables, media, mobile, text color, emoji, copy/paste, analytics

  **Performance**

  - Async import for code blocks and task items on renderer
    - https://product-fabric.atlassian.net/browse/ED-7155

  **Table**

  - Add support to sort tables that contains smart links
    - https://product-fabric.atlassian.net/browse/ED-7449
  - Scale table when changing to full width mode
    - https://product-fabric.atlassian.net/browse/ED-7724

  **Text color**

  - Update text color toolbar with right color when text is inside a list, panel, etc.
    - https://product-fabric.atlassian.net/browse/FM-1752

**Mobile** - Implement undo/redo interface on Hybrid Editor -
https://product-fabric.atlassian.net/browse/FM-2393

**Copy and Paste**

    - Support copy & paste when missing context-id attr
      - https://product-fabric.atlassian.net/browse/MS-2344
    - Right click + copy image fails the second time that is pasted
      - https://product-fabric.atlassian.net/browse/MS-2324
    - Copying a never touched image for the first time from editor fails to paste
      - https://product-fabric.atlassian.net/browse/MS-2338
    - Implement analytics when a file is copied
      - https://product-fabric.atlassian.net/browse/MS-2036

**Media**

- Add analytics events and error reporting [NEW BIG FEATURE]
  - https://product-fabric.atlassian.net/browse/MS-2275
  - https://product-fabric.atlassian.net/browse/MS-2329
  - https://product-fabric.atlassian.net/browse/MS-2330
  - https://product-fabric.atlassian.net/browse/MS-2331
  - https://product-fabric.atlassian.net/browse/MS-2332
  - https://product-fabric.atlassian.net/browse/MS-2390
- Fixed issue where we can’t insert same file from MediaPicker twice
  - https://product-fabric.atlassian.net/browse/MS-2080
- Disable upload of external files to media
  - https://product-fabric.atlassian.net/browse/MS-2372

**Notable Bug Fixes**

    - Implement consistent behaviour for rule and mediaSingle on insertion
      - Feature Flag:
        - allowNewInsertionBehaviour - [default: true]
      - https://product-fabric.atlassian.net/browse/ED-7503
    - Fixed bug where we were showing table controls on mobile.
      - https://product-fabric.atlassian.net/browse/ED-7690
    - Fixed bug where editor crashes after unmounting react component.
      - https://product-fabric.atlassian.net/browse/ED-7318
    - Fixed bug where custom emojis are not been showed on the editor
      - https://product-fabric.atlassian.net/browse/ED-7726

- [patch][1715ad2bd5](https://bitbucket.org/atlassian/atlaskit-mk-2/commits/1715ad2bd5):

  ED-7731: add support for GraphQL syntax highlighting

## 11.0.11

### Patch Changes

- [patch][097b696613](https://bitbucket.org/atlassian/atlaskit-mk-2/commits/097b696613):

  Components now depend on TS 3.6 internally, in order to fix an issue with TS resolving
  non-relative imports as relative imports

## 11.0.10

### Patch Changes

- [patch][ecca4d1dbb](https://bitbucket.org/atlassian/atlaskit-mk-2/commits/ecca4d1dbb):

  Upgraded Typescript to 3.3.x

## 11.0.9

### Patch Changes

- [patch][708028db86](https://bitbucket.org/atlassian/atlaskit-mk-2/commits/708028db86):

  Change all the imports to theme in Core to use multi entry points

## 11.0.8

### Patch Changes

- [patch][abee1a5f4f](https://bitbucket.org/atlassian/atlaskit-mk-2/commits/abee1a5f4f):

  Bumping internal dependency (memoize-one) to latest version (5.1.0). memoize-one@5.1.0 has full
  typescript support so it is recommended that typescript consumers use it also.

## 11.0.7

### Patch Changes

- [patch][de35ce8c67](https://bitbucket.org/atlassian/atlaskit-mk-2/commits/de35ce8c67):

  Updates component maintainers

## 11.0.6

### Patch Changes

- [patch][bbff8a7d87](https://bitbucket.org/atlassian/atlaskit-mk-2/commits/bbff8a7d87):

  Fixes bug, missing version.json file

## 11.0.5

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

## 11.0.4

### Patch Changes

- [patch][29a1f158c1](https://bitbucket.org/atlassian/atlaskit-mk-2/commits/29a1f158c1):

  Use default react import in typescript files.

## 11.0.3

### Patch Changes

- [patch][4615439434](https://bitbucket.org/atlassian/atlaskit-mk-2/commits/4615439434):

  index.ts will now be ignored when publishing to npm

## 11.0.2

### Patch Changes

- [patch][93bcf314c6](https://bitbucket.org/atlassian/atlaskit-mk-2/commits/93bcf314c6):

  Added missing tslib dep

## 11.0.1

- [patch][b0ef06c685](https://bitbucket.org/atlassian/atlaskit-mk-2/commits/b0ef06c685):

  - This is just a safety release in case anything strange happened in in the previous one. See Pull
    Request #5942 for details

## 11.0.0

- [major][97bfe81ec8](https://bitbucket.org/atlassian/atlaskit-mk-2/commits/97bfe81ec8):

  - @atlaskit/code has been converted to Typescript. Typescript consumers will now get static type
    safety. Flow types are no longer provided. No API or behavioural changes.

## 10.0.0

- [major][7c17b35107](https://bitbucket.org/atlassian/atlaskit-mk-2/commits/7c17b35107):

  - Updates react and react-dom peer dependencies to react@^16.8.0 and react-dom@^16.8.0. To use
    this package, please ensure you use at least this version of react and react-dom.

## 9.0.1

- Updated dependencies
  [9c0b4744be](https://bitbucket.org/atlassian/atlaskit-mk-2/commits/9c0b4744be):
  - @atlaskit/docs@7.0.3
  - @atlaskit/theme@8.1.7

## 9.0.0

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

## 8.2.3

- [patch][d49e9bbb13](https://bitbucket.org/atlassian/atlaskit-mk-2/commits/d49e9bbb13):

  - Expose the props on website

## 8.2.2

- Updated dependencies [58b84fa](https://bitbucket.org/atlassian/atlaskit-mk-2/commits/58b84fa):
  - @atlaskit/theme@7.0.1
  - @atlaskit/docs@6.0.0

## 8.2.1

- Updated dependencies [d13242d](https://bitbucket.org/atlassian/atlaskit-mk-2/commits/d13242d):
  - @atlaskit/docs@5.2.3
  - @atlaskit/theme@7.0.0

## 8.2.0

- [minor][10fe416](https://bitbucket.org/atlassian/atlaskit-mk-2/commits/10fe416):

  - Props Language should be required and surfacing more props for code

## 8.1.1

- [patch][84e8015](https://bitbucket.org/atlassian/atlaskit-mk-2/commits/84e8015):

  - Bump react-syntax-highlighter to 10.0.1

## 8.1.0

- [minor][26027dd](https://bitbucket.org/atlassian/atlaskit-mk-2/commits/26027dd):

  - Upgrade react syntax highlighter to version that ships its own async loaded languages and
    supports SSR

## 8.0.12

- [patch] Inline code should wrap
  [f1d9a54](https://bitbucket.org/atlassian/atlaskit-mk-2/commits/f1d9a54)

## 8.0.11

- [patch] Fix webpack 3 support for page & code
  [03af95e](https://bitbucket.org/atlassian/atlaskit-mk-2/commits/03af95e)

## 8.0.10

- [patch] Update babel config to transpile out dynamic imports for commonjs
  [2dae295](https://bitbucket.org/atlassian/atlaskit-mk-2/commits/2dae295)

## 8.0.9

- [patch] Adds missing implicit @babel/runtime dependency
  [b71751b](https://bitbucket.org/atlassian/atlaskit-mk-2/commits/b71751b)

## 8.0.8

- [patch] Add some padding to the code without line numbers
  [67cd63d](https://bitbucket.org/atlassian/atlaskit-mk-2/commits/67cd63d)

## 8.0.7

- [patch] Added yaml to supported languages for code and added styling for the key token.
  [95f9236](https://bitbucket.org/atlassian/atlaskit-mk-2/commits/95f9236)

## 8.0.6

- [patch] Async load highlighter languages
  [9102fa2](https://bitbucket.org/atlassian/atlaskit-mk-2/commits/9102fa2)

## 8.0.5

- [patch] Upgrade react-syntax-highlighter again and use async loaded prism
  [260d66a](https://bitbucket.org/atlassian/atlaskit-mk-2/commits/260d66a)

## 8.0.4

- [patch] Upgraded react-syntax-highlighter to 8.0.2
  [7cc7000](https://bitbucket.org/atlassian/atlaskit-mk-2/commits/7cc7000)

## 8.0.3

- [patch] Adds sideEffects: false to allow proper tree shaking
  [b5d6d04](https://bitbucket.org/atlassian/atlaskit-mk-2/commits/b5d6d04)

## 8.0.1

- [patch] Updated dependencies
  [df22ad8](https://bitbucket.org/atlassian/atlaskit-mk-2/commits/df22ad8)
  - @atlaskit/theme@6.0.0
  - @atlaskit/docs@5.0.6

## 8.0.0

- [major] ED-4989: replace hjs with prism
  [f9c0cdb](https://bitbucket.org/atlassian/atlaskit-mk-2/commits/f9c0cdb)
- [none] Updated dependencies
  [f9c0cdb](https://bitbucket.org/atlassian/atlaskit-mk-2/commits/f9c0cdb)
  - @atlaskit/docs@5.0.5

## 7.0.3

- [patch] update the dependency of react-dom to 16.4.2 due to vulnerability in previous versions
  read https://reactjs.org/blog/2018/08/01/react-v-16-4-2.html for details
  [a4bd557](https://bitbucket.org/atlassian/atlaskit-mk-2/commits/a4bd557)
- [none] Updated dependencies
  [a4bd557](https://bitbucket.org/atlassian/atlaskit-mk-2/commits/a4bd557)
  - @atlaskit/theme@5.1.3

## 7.0.2

- [patch] Updated dependencies
  [acd86a1](https://bitbucket.org/atlassian/atlaskit-mk-2/commits/acd86a1)
  - @atlaskit/theme@5.1.2
  - @atlaskit/docs@5.0.2

## 7.0.1

- [patch] Add a SSR test for every package, add react-dom and build-utils in devDependencies
  [7e331b5](https://bitbucket.org/atlassian/atlaskit-mk-2/commits/7e331b5)
- [none] Updated dependencies
  [7e331b5](https://bitbucket.org/atlassian/atlaskit-mk-2/commits/7e331b5)
  - @atlaskit/theme@5.1.1

## 7.0.0

- [major] Updates to React ^16.4.0
  [7edb866](https://bitbucket.org/atlassian/atlaskit-mk-2/commits/7edb866)
- [major] Updated dependencies
  [563a7eb](https://bitbucket.org/atlassian/atlaskit-mk-2/commits/563a7eb)
  - @atlaskit/theme@5.0.0
  - @atlaskit/docs@5.0.0
- [major] Updated dependencies
  [7edb866](https://bitbucket.org/atlassian/atlaskit-mk-2/commits/7edb866)
  - @atlaskit/theme@5.0.0
  - @atlaskit/docs@5.0.0

## 6.0.1

- [patch] Add default theme prop to prevent Code throwing errors when no theme provider is given
  [07334bc](https://bitbucket.org/atlassian/atlaskit-mk-2/commits/07334bc)
- [none] Updated dependencies
  [07334bc](https://bitbucket.org/atlassian/atlaskit-mk-2/commits/07334bc)

## 6.0.0

- [major] Significantly reduce the bundle-size of @atlaskit/code by only supporting a subset of
  languages. Also introduces support for theming the content via @atlaskit/theme. AK-4536
  [eee2d45](https://bitbucket.org/atlassian/atlaskit-mk-2/commits/eee2d45)
- [none] Updated dependencies
  [eee2d45](https://bitbucket.org/atlassian/atlaskit-mk-2/commits/eee2d45)
  - @atlaskit/docs@4.2.1

## 5.0.4

- [patch] Clean Changelogs - remove duplicates and empty entries
  [e7756cd](https://bitbucket.org/atlassian/atlaskit-mk-2/commits/e7756cd)
- [none] Updated dependencies
  [e7756cd](https://bitbucket.org/atlassian/atlaskit-mk-2/commits/e7756cd)
  - @atlaskit/theme@4.0.4

## 5.0.3

- [patch] Update changelogs to remove duplicate
  [cc58e17](https://bitbucket.org/atlassian/atlaskit-mk-2/commits/cc58e17)
- [none] Updated dependencies
  [cc58e17](https://bitbucket.org/atlassian/atlaskit-mk-2/commits/cc58e17)
  - @atlaskit/theme@4.0.3
  - @atlaskit/docs@4.1.1

## 5.0.2

- [none] Updated dependencies
  [9d20f54](https://bitbucket.org/atlassian/atlaskit-mk-2/commits/9d20f54)
  - @atlaskit/docs@4.1.0
  - @atlaskit/theme@4.0.2

## 5.0.1

- [patch] Update readme's [223cd67](https://bitbucket.org/atlassian/atlaskit-mk-2/commits/223cd67)
- [patch] Updated dependencies
  [223cd67](https://bitbucket.org/atlassian/atlaskit-mk-2/commits/223cd67)
  - @atlaskit/theme@4.0.1
  - @atlaskit/docs@4.0.1

## 5.0.0

- [major] makes styled-components a peer dependency and upgrades version range from 1.4.6 - 3 to
  ^3.2.6 [1e80619](https://bitbucket.org/atlassian/atlaskit-mk-2/commits/1e80619)
- [patch] Updated dependencies
  [1e80619](https://bitbucket.org/atlassian/atlaskit-mk-2/commits/1e80619)
  - @atlaskit/theme@4.0.0
  - @atlaskit/docs@4.0.0

## 4.0.4

- [patch] Updated dependencies
  [d662caa](https://bitbucket.org/atlassian/atlaskit-mk-2/commits/d662caa)
  - @atlaskit/theme@3.2.2
  - @atlaskit/docs@3.0.4

## 4.0.3

- [patch] Align font sizes for inline code, mentions and dates
  [d2ef1af](https://bitbucket.org/atlassian/atlaskit-mk-2/commits/d2ef1af)
- [none] Updated dependencies
  [d2ef1af](https://bitbucket.org/atlassian/atlaskit-mk-2/commits/d2ef1af)

## 4.0.1

- [patch] Get rid of outdent dependency
  [6a2c1d9](https://bitbucket.org/atlassian/atlaskit-mk-2/commits/6a2c1d9)

## 4.0.0

- [major] Bump to React 16.3.
  [4251858](https://bitbucket.org/atlassian/atlaskit-mk-2/commits/4251858)

## 3.1.2

- [patch] Plain text should not be rendered as markdown
  [fe307dc](https://bitbucket.org/atlassian/atlaskit-mk-2/commits/fe307dc)

## 3.1.1

- [patch] Re-releasing due to potentially broken babel release
  [9ed0bba](https://bitbucket.org/atlassian/atlaskit-mk-2/commits/9ed0bba)

## 3.1.0

- [minor] Update styled-components dependency to support versions 1.4.6 - 3
  [ceccf30](https://bitbucket.org/atlassian/atlaskit-mk-2/commits/ceccf30)

## 3.0.6

- [patch] updated the repository url to https://bitbucket.org/atlassian/atlaskit-mk-2
  [1e57e5a](https://bitbucket.org/atlassian/atlaskit-mk-2/commits/1e57e5a)

## 3.0.5

- [patch] Packages Flow types for elements components
  [3111e74](https://bitbucket.org/atlassian/atlaskit-mk-2/commits/3111e74)

## 3.0.4

- [patch] Minor manual bump for packages desync'd from npm
  [e988c58](https://bitbucket.org/atlassian/atlaskit-mk-2/commits/e988c58)

## 3.0.3

- Manual bump to resolve desync with npm package version.

## 3.0.2

- [patch] Enabling syntax highlighter language auto-detect
  [4831bd2](https://bitbucket.org/atlassian/atlaskit-mk-2/commits/4831bd2)

## 3.0.1

- [patch] Resolved low hanging flow errors in field-base field-text comment icon item and website,
  \$ [007de27](https://bitbucket.org/atlassian/atlaskit-mk-2/commits/007de27)

## 3.0.0

- [major] Moved to elements repo converted to flow typing, stripped out typescript types
  [235e392](https://bitbucket.org/atlassian/atlaskit-mk-2/commits/235e392)

## 2.2.1

- [patch] Remove styled-components as a peerDependency from @atlaskit/code.
  [047032b](https://bitbucket.org/atlassian/atlaskit-mk-2/commits/047032b)

## 2.2.0

- [minor] Add React 16 support.
  [12ea6e4](https://bitbucket.org/atlassian/atlaskit-mk-2/commits/12ea6e4)
