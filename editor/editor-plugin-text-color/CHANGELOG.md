# @atlaskit/editor-plugin-text-color

## 2.3.0

### Minor Changes

- [#142357](https://bitbucket.org/atlassian/atlassian-frontend-monorepo/pull-requests/142357)
  [`fccbc24b53f87`](https://bitbucket.org/atlassian/atlassian-frontend-monorepo/commits/fccbc24b53f87) -
  [https://product-fabric.atlassian.net/browse/ED-27522](ED-27522) - adopt the `fullPagePreset`
  function from @atlassian/confluence-presets package for creating an editor preset for Confluence

## 2.2.0

### Minor Changes

- [#139139](https://bitbucket.org/atlassian/atlassian-frontend-monorepo/pull-requests/139139)
  [`7f6b665d778dd`](https://bitbucket.org/atlassian/atlassian-frontend-monorepo/commits/7f6b665d778dd) -
  [https://product-fabric.atlassian.net/browse/ED-27499](ED-27499) - the new
  `@atlassian/confluence-presets` package with Confluence `full-page` preset is created

### Patch Changes

- Updated dependencies

## 2.1.9

### Patch Changes

- [#139173](https://bitbucket.org/atlassian/atlassian-frontend-monorepo/pull-requests/139173)
  [`fafd1374cc3a4`](https://bitbucket.org/atlassian/atlassian-frontend-monorepo/commits/fafd1374cc3a4) -
  [ED-27448] Remove experiment tracking for allowMoreTextColors experiment
- Updated dependencies

## 2.1.8

### Patch Changes

- Updated dependencies

## 2.1.7

### Patch Changes

- Updated dependencies

## 2.1.6

### Patch Changes

- Updated dependencies

## 2.1.5

### Patch Changes

- [#126126](https://bitbucket.org/atlassian/atlassian-frontend-monorepo/pull-requests/126126)
  [`468f52001a847`](https://bitbucket.org/atlassian/atlassian-frontend-monorepo/commits/468f52001a847) -
  Tidy up contextual formatting toolbar experiment and switch to `platform_editor_controls` flag
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

- [#120472](https://bitbucket.org/atlassian/atlassian-frontend-monorepo/pull-requests/120472)
  [`73c800ab5f2fc`](https://bitbucket.org/atlassian/atlassian-frontend-monorepo/commits/73c800ab5f2fc) -
  ED-26766 update adf-schema from 47.2.1 to 47.6.0 and adf-schema-json from 1.27.0 to 1.31.0

### Patch Changes

- Updated dependencies

## 2.0.2

### Patch Changes

- [#120931](https://bitbucket.org/atlassian/atlassian-frontend-monorepo/pull-requests/120931)
  [`624b97c021fea`](https://bitbucket.org/atlassian/atlassian-frontend-monorepo/commits/624b97c021fea) -
  [ux] ED-26676 revert to existing primary toolbar components

## 2.0.1

### Patch Changes

- [#120533](https://bitbucket.org/atlassian/atlassian-frontend-monorepo/pull-requests/120533)
  [`f1bec731e278f`](https://bitbucket.org/atlassian/atlassian-frontend-monorepo/commits/f1bec731e278f) -
  Adds a `sideEffects` field to ensure this package does not have Compiled styles tree-shaken in the
  future to avoid an accidental regression.

  This is related to
  https://community.developer.atlassian.com/t/rfc-73-migrating-our-components-to-compiled-css-in-js/85953

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

## 1.20.0

### Minor Changes

- [#116949](https://stash.atlassian.com/projects/CONFCLOUD/repos/confluence-frontend/pull-requests/116949)
  [`9154f7b89e3d2`](https://stash.atlassian.com/projects/CONFCLOUD/repos/confluence-frontend/commits/9154f7b89e3d2) -
  [ux] ED-26674 Hiding contextual toolbar menu items when the menu is docked to top

### Patch Changes

- Updated dependencies

## 1.19.0

### Minor Changes

- [#116013](https://stash.atlassian.com/projects/CONFCLOUD/repos/confluence-frontend/pull-requests/116013)
  [`18e022766bfd3`](https://stash.atlassian.com/projects/CONFCLOUD/repos/confluence-frontend/commits/18e022766bfd3) -
  [ux] ED-26464 Hiding primary toolbar and docking contextual toolbar items to top

### Patch Changes

- Updated dependencies

## 1.18.2

### Patch Changes

- Updated dependencies

## 1.18.1

### Patch Changes

- [#112186](https://stash.atlassian.com/projects/CONFCLOUD/repos/confluence-frontend/pull-requests/112186)
  [`9462d8ca2405a`](https://stash.atlassian.com/projects/CONFCLOUD/repos/confluence-frontend/commits/9462d8ca2405a) -
  Bump adf-schema to 47.2.1

## 1.18.0

### Minor Changes

- [#105322](https://stash.atlassian.com/projects/CONFCLOUD/repos/confluence-frontend/pull-requests/105322)
  [`8876083532adc`](https://stash.atlassian.com/projects/CONFCLOUD/repos/confluence-frontend/commits/8876083532adc) -
  Bumped editor-prosemirror version to 7.0.0

### Patch Changes

- Updated dependencies

## 1.17.2

### Patch Changes

- Updated dependencies

## 1.17.1

### Patch Changes

- Updated dependencies

## 1.17.0

### Minor Changes

- [#109060](https://stash.atlassian.com/projects/CONFCLOUD/repos/confluence-frontend/pull-requests/109060)
  [`4660ec858a305`](https://stash.atlassian.com/projects/CONFCLOUD/repos/confluence-frontend/commits/4660ec858a305) -
  Update `React` from v16 to v18

### Patch Changes

- Updated dependencies

## 1.16.10

### Patch Changes

- [#107473](https://stash.atlassian.com/projects/CONFCLOUD/repos/confluence-frontend/pull-requests/107473)
  [`962b3297548df`](https://stash.atlassian.com/projects/CONFCLOUD/repos/confluence-frontend/commits/962b3297548df) -
  [ux] Implement variation 2 for editor contextual toolbar formatting experiment

## 1.16.9

### Patch Changes

- [#105009](https://stash.atlassian.com/projects/CONFCLOUD/repos/confluence-frontend/pull-requests/105009)
  [`a4039ebf7ed11`](https://stash.atlassian.com/projects/CONFCLOUD/repos/confluence-frontend/commits/a4039ebf7ed11) -
  [ux] Implement variant 2 cohorts experience for platform_editor_contextual_formatting_toolbar_v2
  experiment
- Updated dependencies

## 1.16.8

### Patch Changes

- Updated dependencies

## 1.16.7

### Patch Changes

- [#100162](https://stash.atlassian.com/projects/CONFCLOUD/repos/confluence-frontend/pull-requests/100162)
  [`e80e57fc37719`](https://stash.atlassian.com/projects/CONFCLOUD/repos/confluence-frontend/commits/e80e57fc37719) -
  [ux] ED-26089: Add 4px gap to main nav bar items

## 1.16.6

### Patch Changes

- Updated dependencies

## 1.16.5

### Patch Changes

- Updated dependencies

## 1.16.4

### Patch Changes

- [#171551](https://stash.atlassian.com/projects/CONFCLOUD/repos/confluence-frontend/pull-requests/171551)
  [`702c918817e78`](https://stash.atlassian.com/projects/CONFCLOUD/repos/confluence-frontend/commits/702c918817e78) -
  ED-25817: refactors plugins to meet folder standards

## 1.16.3

### Patch Changes

- [#172933](https://stash.atlassian.com/projects/CONFCLOUD/repos/confluence-frontend/pull-requests/172933)
  [`8323af2381d00`](https://stash.atlassian.com/projects/CONFCLOUD/repos/confluence-frontend/commits/8323af2381d00) -
  [ux] Arranges items in the Selection toolbar under the Contextual toolbar experiment flag
- Updated dependencies

## 1.16.2

### Patch Changes

- Updated dependencies

## 1.16.1

### Patch Changes

- Updated dependencies

## 1.16.0

### Minor Changes

- [#167675](https://stash.atlassian.com/projects/CONFCLOUD/repos/confluence-frontend/pull-requests/167675)
  [`9c0185ccd82d3`](https://stash.atlassian.com/projects/CONFCLOUD/repos/confluence-frontend/commits/9c0185ccd82d3) -
  [ux] Adds inputMethod as an optional argument in changeColor plugin action and enables text
  coloroption in the Selection toolbar.

### Patch Changes

- Updated dependencies

## 1.15.8

### Patch Changes

- [#165765](https://stash.atlassian.com/projects/CONFCLOUD/repos/confluence-frontend/pull-requests/165765)
  [`3f441f30e6507`](https://stash.atlassian.com/projects/CONFCLOUD/repos/confluence-frontend/commits/3f441f30e6507) -
  Bump adf-schema to 46.0.0
- Updated dependencies

## 1.15.7

### Patch Changes

- Updated dependencies

## 1.15.6

### Patch Changes

- [#159176](https://stash.atlassian.com/projects/CONFCLOUD/repos/confluence-frontend/pull-requests/159176)
  [`8f1d77592a9dc`](https://stash.atlassian.com/projects/CONFCLOUD/repos/confluence-frontend/commits/8f1d77592a9dc) -
  Bump adf-schema to 44.2.0

## 1.15.5

### Patch Changes

- Updated dependencies

## 1.15.4

### Patch Changes

- [#155735](https://stash.atlassian.com/projects/CONFCLOUD/repos/confluence-frontend/pull-requests/155735)
  [`1beeeda29023a`](https://stash.atlassian.com/projects/CONFCLOUD/repos/confluence-frontend/commits/1beeeda29023a) -
  Upgrades editor packages to react 18
- Updated dependencies

## 1.15.3

### Patch Changes

- [#154186](https://stash.atlassian.com/projects/CONFCLOUD/repos/confluence-frontend/pull-requests/154186)
  [`5c316170d29dd`](https://stash.atlassian.com/projects/CONFCLOUD/repos/confluence-frontend/commits/5c316170d29dd) -
  Bump @atlaskit/adf-schema to 42.3.1
- Updated dependencies

## 1.15.2

### Patch Changes

- Updated dependencies

## 1.15.1

### Patch Changes

- [#152510](https://stash.atlassian.com/projects/CONFCLOUD/repos/confluence-frontend/pull-requests/152510)
  [`dcf9edde7ac7b`](https://stash.atlassian.com/projects/CONFCLOUD/repos/confluence-frontend/commits/dcf9edde7ac7b) -
  bump adf-schema to 42.0.1
- Updated dependencies

## 1.15.0

### Minor Changes

- [#151190](https://stash.atlassian.com/projects/CONFCLOUD/repos/confluence-frontend/pull-requests/151190)
  [`a3723b1cdede2`](https://stash.atlassian.com/projects/CONFCLOUD/repos/confluence-frontend/commits/a3723b1cdede2) -
  [ux] [ED-25037] this change bumps @atlaskit/adf-schema from 40.9.0 to 40.9.4 which makes the
  blockquote selectable, adds missing marks to the PM node spec and fixes a bug that converted
  pasted external images to media groups.

### Patch Changes

- Updated dependencies

## 1.14.11

### Patch Changes

- Updated dependencies

## 1.14.10

### Patch Changes

- [#147531](https://stash.atlassian.com/projects/CONFCLOUD/repos/confluence-frontend/pull-requests/147531)
  [`8ae1e110621b7`](https://stash.atlassian.com/projects/CONFCLOUD/repos/confluence-frontend/commits/8ae1e110621b7) -
  Internal changes to feature flag used to toggle new icons

## 1.14.9

### Patch Changes

- Updated dependencies

## 1.14.8

### Patch Changes

- Updated dependencies

## 1.14.7

### Patch Changes

- Updated dependencies

## 1.14.6

### Patch Changes

- Updated dependencies

## 1.14.5

### Patch Changes

- Updated dependencies

## 1.14.4

### Patch Changes

- [#139334](https://stash.atlassian.com/projects/CONFCLOUD/repos/confluence-frontend/pull-requests/139334)
  [`30793649657c0`](https://stash.atlassian.com/projects/CONFCLOUD/repos/confluence-frontend/commits/30793649657c0) -
  [HOT-111629] We had an incident where the last character disappears when hitting the enter key on
  windows OS for Korean characters. Bumping to prosemirror-view@1.34.2 for the fix.

## 1.14.3

### Patch Changes

- Updated dependencies

## 1.14.2

### Patch Changes

- [#136367](https://stash.atlassian.com/projects/CONFCLOUD/repos/confluence-frontend/pull-requests/136367)
  [`4d9450a7e1283`](https://stash.atlassian.com/projects/CONFCLOUD/repos/confluence-frontend/commits/4d9450a7e1283) -
  [ux] Update new icons (text color, highlight, text style) with design change
- Updated dependencies

## 1.14.1

### Patch Changes

- [#134213](https://stash.atlassian.com/projects/CONFCLOUD/repos/confluence-frontend/pull-requests/134213)
  [`93bd7032842ec`](https://stash.atlassian.com/projects/CONFCLOUD/repos/confluence-frontend/commits/93bd7032842ec) -
  [ux] [ED-24636] Bump ADF Schema package

## 1.14.0

### Minor Changes

- [#133191](https://stash.atlassian.com/projects/CONFCLOUD/repos/confluence-frontend/pull-requests/133191)
  [`78a1927084934`](https://stash.atlassian.com/projects/CONFCLOUD/repos/confluence-frontend/commits/78a1927084934) -
  [ux] Remove icon migration feature gate and migrate new icons on primary toolbar

### Patch Changes

- Updated dependencies

## 1.13.1

### Patch Changes

- Updated dependencies

## 1.13.0

### Minor Changes

- [#130825](https://stash.atlassian.com/projects/CONFCLOUD/repos/confluence-frontend/pull-requests/130825)
  [`d8a00de5637ff`](https://stash.atlassian.com/projects/CONFCLOUD/repos/confluence-frontend/commits/d8a00de5637ff) -
  ENGHEALTH-9890: Bumps React peer dependency for Lego editor plugins

## 1.12.1

### Patch Changes

- Updated dependencies

## 1.12.0

### Minor Changes

- [#128347](https://stash.atlassian.com/projects/CONFCLOUD/repos/confluence-frontend/pull-requests/128347)
  [`e33566cebd5d1`](https://stash.atlassian.com/projects/CONFCLOUD/repos/confluence-frontend/commits/e33566cebd5d1) -
  [ED-24175] bump @atlaskit/adf-schema to 40.8.1 and @atlassian/adf-schema-json to 1.22.0 to
  promotecodeblocks & media in quotes, and nested expands in expands to full schema, and allow
  quotes in panels and decisions in lists in stage0 schema, and a validator spec change

### Patch Changes

- Updated dependencies

## 1.11.0

### Minor Changes

- [#126478](https://stash.atlassian.com/projects/CONFCLOUD/repos/confluence-frontend/pull-requests/126478)
  [`ca1665ebbfe4d`](https://stash.atlassian.com/projects/CONFCLOUD/repos/confluence-frontend/commits/ca1665ebbfe4d) -
  [ED-23435] Store primary toolbar component registry in a plugin variable instead of in plugin
  state to avoid having to add effects to all plugins and enable SSR for the toolbar. [Breaking
  change] Converted registerComponent from the primary toolbar plugin into an action.

### Patch Changes

- Updated dependencies

## 1.10.2

### Patch Changes

- [#125353](https://stash.atlassian.com/projects/CONFCLOUD/repos/confluence-frontend/pull-requests/125353)
  [`77847728bf617`](https://stash.atlassian.com/projects/CONFCLOUD/repos/confluence-frontend/commits/77847728bf617) -
  Migrate icons in Editor primary toolbar
- Updated dependencies

## 1.10.1

### Patch Changes

- Updated dependencies

## 1.10.0

### Minor Changes

- [#124209](https://stash.atlassian.com/projects/CONFCLOUD/repos/confluence-frontend/pull-requests/124209)
  [`8aa1792f12ed3`](https://stash.atlassian.com/projects/CONFCLOUD/repos/confluence-frontend/commits/8aa1792f12ed3) -
  bump @atlaskit/editor-prosemirror to 5.0.0, bump @atlaskit/adf-schema to 40.1.0

### Patch Changes

- [#123786](https://stash.atlassian.com/projects/CONFCLOUD/repos/confluence-frontend/pull-requests/123786)
  [`3ff9313b19349`](https://stash.atlassian.com/projects/CONFCLOUD/repos/confluence-frontend/commits/3ff9313b19349) -
  [ux] [ED-23356] Use removeMark in editor-plugin-text-color removeColor logic
- Updated dependencies

## 1.9.0

### Minor Changes

- [#122895](https://stash.atlassian.com/projects/CONFCLOUD/repos/confluence-frontend/pull-requests/122895)
  [`49b8c7658f3b5`](https://stash.atlassian.com/projects/CONFCLOUD/repos/confluence-frontend/commits/49b8c7658f3b5) -
  [ED-24173] bump @atlaskit/adf-schema to 40.3.0 and @atlassian/adf-schema-json to 1.18.0

### Patch Changes

- Updated dependencies

## 1.8.6

### Patch Changes

- Updated dependencies

## 1.8.5

### Patch Changes

- Updated dependencies

## 1.8.4

### Patch Changes

- [#116760](https://stash.atlassian.com/projects/CONFCLOUD/repos/confluence-frontend/pull-requests/116760)
  [`2e309117f02c6`](https://stash.atlassian.com/projects/CONFCLOUD/repos/confluence-frontend/commits/2e309117f02c6) -
  [ED-23062] Clean up feature flag for highlight palette dark mode improvements
- Updated dependencies

## 1.8.3

### Patch Changes

- Updated dependencies

## 1.8.2

### Patch Changes

- [#114548](https://stash.atlassian.com/projects/CONFCLOUD/repos/confluence-frontend/pull-requests/114548)
  [`8b2d47bffb50e`](https://stash.atlassian.com/projects/CONFCLOUD/repos/confluence-frontend/commits/8b2d47bffb50e) -
  bump adf-schema version
- Updated dependencies

## 1.8.1

### Patch Changes

- Updated dependencies

## 1.8.0

### Minor Changes

- [#115247](https://stash.atlassian.com/projects/CONFCLOUD/repos/confluence-frontend/pull-requests/115247)
  [`251d23ff9e6c8`](https://stash.atlassian.com/projects/CONFCLOUD/repos/confluence-frontend/commits/251d23ff9e6c8) -
  upgrade adf-schema version to 38.0.0

### Patch Changes

- Updated dependencies

## 1.7.1

### Patch Changes

- Updated dependencies

## 1.7.0

### Minor Changes

- [#114156](https://stash.atlassian.com/projects/CONFCLOUD/repos/confluence-frontend/pull-requests/114156)
  [`bc6a63af2d1d0`](https://stash.atlassian.com/projects/CONFCLOUD/repos/confluence-frontend/commits/bc6a63af2d1d0) -
  Bump adf-schema to 37.0.0 and adf-schema-json to 1.16.0

### Patch Changes

- Updated dependencies

## 1.6.0

### Minor Changes

- [#110884](https://stash.atlassian.com/projects/CONFCLOUD/repos/confluence-frontend/pull-requests/110884)
  [`674f78166705c`](https://stash.atlassian.com/projects/CONFCLOUD/repos/confluence-frontend/commits/674f78166705c) -
  [ux] [ED-23516] Change border color for highlight and text-color palettes to use tokens.
  Changedefault palette color when undefined

### Patch Changes

- Updated dependencies

## 1.5.0

### Minor Changes

- [#108745](https://stash.atlassian.com/projects/CONFCLOUD/repos/confluence-frontend/pull-requests/108745)
  [`ef4a6d8a3ef73`](https://stash.atlassian.com/projects/CONFCLOUD/repos/confluence-frontend/commits/ef4a6d8a3ef73) -
  [ux] [ED-23513] Allow text color mark to replace backgroundColor

## 1.4.1

### Patch Changes

- Updated dependencies

## 1.4.0

### Minor Changes

- [#101406](https://stash.atlassian.com/projects/CONFCLOUD/repos/confluence-frontend/pull-requests/101406)
  [`6daffd65aec4`](https://stash.atlassian.com/projects/CONFCLOUD/repos/confluence-frontend/commits/6daffd65aec4) -
  [ED-23298] Extract primary toolbar components to editor plugin to allow for custom ordering

### Patch Changes

- [#102478](https://stash.atlassian.com/projects/CONFCLOUD/repos/confluence-frontend/pull-requests/102478)
  [`3378951608b0`](https://stash.atlassian.com/projects/CONFCLOUD/repos/confluence-frontend/commits/3378951608b0) -
  [ED-23332] Update adf-schema package to 36.10.1
- Updated dependencies

## 1.3.3

### Patch Changes

- [#101513](https://stash.atlassian.com/projects/CONFCLOUD/repos/confluence-frontend/pull-requests/101513)
  [`98b5dfc33bed`](https://stash.atlassian.com/projects/CONFCLOUD/repos/confluence-frontend/commits/98b5dfc33bed) -
  [ux] [ED-23156] The highlight primary toolbar button is disabled when trying to apply it on nodes
  that don't enable the mark and when in a gap cursor. The text color primary toolbar button is
  disabled when selecting text with a highlight.

## 1.3.2

### Patch Changes

- [#101524](https://stash.atlassian.com/projects/CONFCLOUD/repos/confluence-frontend/pull-requests/101524)
  [`4821570088e6`](https://stash.atlassian.com/projects/CONFCLOUD/repos/confluence-frontend/commits/4821570088e6) -
  ED-23362 Bump ADF schema to version 36.8.1 and add support for adf validation and transformation

## 1.3.1

### Patch Changes

- [#100495](https://stash.atlassian.com/projects/CONFCLOUD/repos/confluence-frontend/pull-requests/100495)
  [`dbb78a011fac`](https://stash.atlassian.com/projects/CONFCLOUD/repos/confluence-frontend/commits/dbb78a011fac) -
  [ux] [ED-23150] Added `changeColor` command for editor-plugin-highlight, including new
  `removeMark` command for editor-common. Fixed bug with editor-plugin-text-color which prevented
  color from being removed when user selects all.
- Updated dependencies

## 1.3.0

### Minor Changes

- [#99579](https://stash.atlassian.com/projects/CONFCLOUD/repos/confluence-frontend/pull-requests/99579)
  [`f222af5687e9`](https://stash.atlassian.com/projects/CONFCLOUD/repos/confluence-frontend/commits/f222af5687e9) -
  Bump adf-schema to 36.3.0 and adf-schema-json to 1.14.0

### Patch Changes

- Updated dependencies

## 1.2.2

### Patch Changes

- Updated dependencies

## 1.2.1

### Patch Changes

- [#99242](https://stash.atlassian.com/projects/CONFCLOUD/repos/confluence-frontend/pull-requests/99242)
  [`854acdf04f29`](https://stash.atlassian.com/projects/CONFCLOUD/repos/confluence-frontend/commits/854acdf04f29) -
  Adjust tooltip text for editor toolbar buttons
- Updated dependencies

## 1.2.0

### Minor Changes

- [#98130](https://stash.atlassian.com/projects/CONFCLOUD/repos/confluence-frontend/pull-requests/98130)
  [`6a3c0d9d6382`](https://stash.atlassian.com/projects/CONFCLOUD/repos/confluence-frontend/commits/6a3c0d9d6382) -
  [ED-23154] Add highlight option to main toolbar in editor

### Patch Changes

- Updated dependencies

## 1.1.8

### Patch Changes

- [#97599](https://stash.atlassian.com/projects/CONFCLOUD/repos/confluence-frontend/pull-requests/97599)
  [`32c3130b08fe`](https://stash.atlassian.com/projects/CONFCLOUD/repos/confluence-frontend/commits/32c3130b08fe) -
  [ED-22282] Bump adf-schema to 36.1.0

## 1.1.7

### Patch Changes

- [#97698](https://stash.atlassian.com/projects/CONFCLOUD/repos/confluence-frontend/pull-requests/97698)
  [`1c7b378c0d3b`](https://stash.atlassian.com/projects/CONFCLOUD/repos/confluence-frontend/commits/1c7b378c0d3b) -
  [HOT-108999] We had an incident where the cursor jumps back a character in table headers for any
  language triggering composition on an empty line.This was fixed in a patch bump of
  prosemirror-view. https://github.com/ProseMirror/prosemirror-view/compare/1.33.4...1.33.5

## 1.1.6

### Patch Changes

- [#93784](https://stash.atlassian.com/projects/CONFCLOUD/repos/confluence-frontend/pull-requests/93784)
  [`de2e52677025`](https://stash.atlassian.com/projects/CONFCLOUD/repos/confluence-frontend/commits/de2e52677025) -
  ECA11Y-217 Improve editor toolbar screen reader text for text styles and color
- Updated dependencies

## 1.1.5

### Patch Changes

- Updated dependencies

## 1.1.4

### Patch Changes

- [#96237](https://stash.atlassian.com/projects/CONFCLOUD/repos/confluence-frontend/pull-requests/96237)
  [`0401e7b5a88e`](https://stash.atlassian.com/projects/CONFCLOUD/repos/confluence-frontend/commits/0401e7b5a88e) -
  [ED-23102] Bump ADF schema to version 35.12.2
- [#96613](https://stash.atlassian.com/projects/CONFCLOUD/repos/confluence-frontend/pull-requests/96613)
  [`398961a2b0a1`](https://stash.atlassian.com/projects/CONFCLOUD/repos/confluence-frontend/commits/398961a2b0a1) -
  [ux] [ED-23133] Moved stepped rainbow text colour icon styles to editor-common and refactored to
  be reusable

## 1.1.3

### Patch Changes

- Updated dependencies

## 1.1.2

### Patch Changes

- [#94901](https://stash.atlassian.com/projects/CONFCLOUD/repos/confluence-frontend/pull-requests/94901)
  [`da964fcdc828`](https://stash.atlassian.com/projects/CONFCLOUD/repos/confluence-frontend/commits/da964fcdc828) -
  [ED-23097] Bump ADF schema to version 35.12.1

## 1.1.1

### Patch Changes

- [#93689](https://stash.atlassian.com/projects/CONFCLOUD/repos/confluence-frontend/pull-requests/93689)
  [`5ba5d2b4a9ac`](https://stash.atlassian.com/projects/CONFCLOUD/repos/confluence-frontend/commits/5ba5d2b4a9ac) -
  Updating adf-schema version to 35.10.0

## 1.1.0

### Minor Changes

- [#91934](https://stash.atlassian.com/projects/CONFCLOUD/repos/confluence-frontend/pull-requests/91934)
  [`b76a78c6a199`](https://stash.atlassian.com/projects/CONFCLOUD/repos/confluence-frontend/commits/b76a78c6a199) -
  bumped editor-prosemirror version to 4.0.0

### Patch Changes

- Updated dependencies

## 1.0.8

### Patch Changes

- [#92426](https://stash.atlassian.com/projects/CONFCLOUD/repos/confluence-frontend/pull-requests/92426)
  [`32c76c7c225c`](https://stash.atlassian.com/projects/CONFCLOUD/repos/confluence-frontend/commits/32c76c7c225c) -
  Bump adf-schema to 35.9.2 to support table alignment options

## 1.0.7

### Patch Changes

- [#91106](https://stash.atlassian.com/projects/CONFCLOUD/repos/confluence-frontend/pull-requests/91106)
  [`b6ffa30186b9`](https://stash.atlassian.com/projects/CONFCLOUD/repos/confluence-frontend/commits/b6ffa30186b9) -
  Bump ADF-schema package to version 35.0.0
- Updated dependencies

## 1.0.6

### Patch Changes

- [#86724](https://stash.atlassian.com/projects/CONFCLOUD/repos/confluence-frontend/pull-requests/86724)
  [`718a9aa2424d`](https://stash.atlassian.com/projects/CONFCLOUD/repos/confluence-frontend/commits/718a9aa2424d) -
  [ED-22607] Remove references to maxFrames for multi bodied extensions and bump adf-schema from
  35.7.0 to 35.8.0

## 1.0.5

### Patch Changes

- [#81777](https://stash.atlassian.com/projects/CONFCLOUD/repos/confluence-frontend/pull-requests/81777)
  [`c6d7a5378751`](https://stash.atlassian.com/projects/CONFCLOUD/repos/confluence-frontend/commits/c6d7a5378751) -
  Bump adf-schema to 35.7.0

## 1.0.4

### Patch Changes

- [#83116](https://stash.atlassian.com/projects/CONFCLOUD/repos/confluence-frontend/pull-requests/83116)
  [`8d4e99057fe0`](https://stash.atlassian.com/projects/CONFCLOUD/repos/confluence-frontend/commits/8d4e99057fe0) -
  Upgrade Typescript from `4.9.5` to `5.4.2`
- Updated dependencies

## 1.0.3

### Patch Changes

- [#80679](https://stash.atlassian.com/projects/CONFCLOUD/repos/confluence-frontend/pull-requests/80679)
  [`104eb9443b7e`](https://stash.atlassian.com/projects/CONFCLOUD/repos/confluence-frontend/commits/104eb9443b7e) -
  ED-22553 Updating adf-schema version to 35.6.0

## 1.0.2

### Patch Changes

- [#78224](https://stash.atlassian.com/projects/CONFCLOUD/repos/confluence-frontend/pull-requests/78224)
  [`6b4c9dd4ad34`](https://stash.atlassian.com/projects/CONFCLOUD/repos/confluence-frontend/commits/6b4c9dd4ad34) -
  ED-22219: adf-schema updated to 35.5.2
- Updated dependencies

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

## 0.2.3

### Patch Changes

- [#68572](https://stash.atlassian.com/projects/CONFCLOUD/repos/confluence-frontend/pull-requests/68572)
  [`15d407fe5143`](https://stash.atlassian.com/projects/CONFCLOUD/repos/confluence-frontend/commits/15d407fe5143) -
  Upgrading @atlaskit/editor-prosemirror dependency

## 0.2.2

### Patch Changes

- [#71136](https://stash.atlassian.com/projects/CONFCLOUD/repos/confluence-frontend/pull-requests/71136)
  [`c803fea1e6a4`](https://stash.atlassian.com/projects/CONFCLOUD/repos/confluence-frontend/commits/c803fea1e6a4) -
  Move all plugin translations to editor-common
- Updated dependencies

## 0.2.1

### Patch Changes

- [#70152](https://stash.atlassian.com/projects/CONFCLOUD/repos/confluence-frontend/pull-requests/70152)
  [`53ed3673df28`](https://stash.atlassian.com/projects/CONFCLOUD/repos/confluence-frontend/commits/53ed3673df28) -
  Updating adf-schema version to 35.5.1

## 0.2.0

### Minor Changes

- [#68790](https://stash.atlassian.com/projects/CONFCLOUD/repos/confluence-frontend/pull-requests/68790)
  [`c6d8affc52d1`](https://stash.atlassian.com/projects/CONFCLOUD/repos/confluence-frontend/commits/c6d8affc52d1) -
  Support maybeAdd plugins in usePreset. Add typing support for universal preset.

  Now when using the editor API with the universal preset

### Patch Changes

- Updated dependencies

## 0.1.17

### Patch Changes

- Updated dependencies

## 0.1.16

### Patch Changes

- [#67557](https://stash.atlassian.com/projects/CONFCLOUD/repos/confluence-frontend/pull-requests/67557)
  [`124d0c6d5286`](https://stash.atlassian.com/projects/CONFCLOUD/repos/confluence-frontend/commits/124d0c6d5286) -
  Migrating block-type, text-color, and text-formatting to use useSharedPluginState rather than
  WithPluginState. Removing unused option on default preset. Adding formattingIsPresent prop to
  TextFormattingState.
- Updated dependencies

## 0.1.15

### Patch Changes

- [#65802](https://stash.atlassian.com/projects/CONFCLOUD/repos/confluence-frontend/pull-requests/65802)
  [`438ead060875`](https://stash.atlassian.com/projects/CONFCLOUD/repos/confluence-frontend/commits/438ead060875) -
  Ensure all editor plugins are marked as singletons

## 0.1.14

### Patch Changes

- [#65031](https://stash.atlassian.com/projects/CONFCLOUD/repos/confluence-frontend/pull-requests/65031)
  [`a00094111b5a`](https://stash.atlassian.com/projects/CONFCLOUD/repos/confluence-frontend/commits/a00094111b5a) -
  ED-21609 Update adf-schema to 35.3.0
- Updated dependencies

## 0.1.13

### Patch Changes

- [#62165](https://stash.atlassian.com/projects/CONFCLOUD/repos/confluence-frontend/pull-requests/62165)
  [`b44ac0968d79`](https://stash.atlassian.com/projects/CONFCLOUD/repos/confluence-frontend/commits/b44ac0968d79) -
  [ED-21562] Bump @atlaskit/adf-schema to 35.2.0 for border mark update

## 0.1.12

### Patch Changes

- [#62088](https://stash.atlassian.com/projects/CONFCLOUD/repos/confluence-frontend/pull-requests/62088)
  [`cbb82175953e`](https://stash.atlassian.com/projects/CONFCLOUD/repos/confluence-frontend/commits/cbb82175953e) -
  [ux] Fixes the text color popup not disappearing when clicking on the toolbar icon.

## 0.1.11

### Patch Changes

- [#60808](https://stash.atlassian.com/projects/CONFCLOUD/repos/confluence-frontend/pull-requests/60808)
  [`f509a21be124`](https://stash.atlassian.com/projects/CONFCLOUD/repos/confluence-frontend/commits/f509a21be124) -
  ED-21506: @atlaskit/adf-schema upgraded to 35.1.1 to support renderer for MBE

## 0.1.10

### Patch Changes

- [#58246](https://stash.atlassian.com/projects/CONFCLOUD/repos/confluence-frontend/pull-requests/58246)
  [`a381b2599716`](https://stash.atlassian.com/projects/CONFCLOUD/repos/confluence-frontend/commits/a381b2599716) -
  ED-21371 Update adf-schema to 35.1.0

## 0.1.9

### Patch Changes

- Updated dependencies

## 0.1.8

### Patch Changes

- [#59147](https://stash.atlassian.com/projects/CONFCLOUD/repos/confluence-frontend/pull-requests/59147)
  [`f12e489f23b0`](https://stash.atlassian.com/projects/CONFCLOUD/repos/confluence-frontend/commits/f12e489f23b0) -
  Re-build and deploy packages to NPM to resolve React/Compiled not found error (HOT-106483).

## 0.1.7

### Patch Changes

- [#58763](https://stash.atlassian.com/projects/CONFCLOUD/repos/confluence-frontend/pull-requests/58763)
  [`0fdbd64522bf`](https://stash.atlassian.com/projects/CONFCLOUD/repos/confluence-frontend/commits/0fdbd64522bf) -
  update ADF schema

## 0.1.6

### Patch Changes

- [#56790](https://bitbucket.org/atlassian/atlassian-frontend/pull-requests/56790)
  [`ff577a7969d4`](https://bitbucket.org/atlassian/atlassian-frontend/commits/ff577a7969d4) -
  ED-21266: Updated @atlaskit/adf-schema to 34.0.1

## 0.1.5

### Patch Changes

- [#43417](https://bitbucket.org/atlassian/atlassian-frontend/pull-requests/43417)
  [`3f3c17f0273`](https://bitbucket.org/atlassian/atlassian-frontend/commits/3f3c17f0273) - ED-20971
  Upgrade adf-schema package to ^34.0.0

## 0.1.4

### Patch Changes

- Updated dependencies

## 0.1.3

### Patch Changes

- [#43379](https://bitbucket.org/atlassian/atlassian-frontend/pull-requests/43379)
  [`482c025520d`](https://bitbucket.org/atlassian/atlassian-frontend/commits/482c025520d) - ED-20763
  Upgrade ADF schema version to 33.2.3 for MBE nodes.
- Updated dependencies

## 0.1.2

### Patch Changes

- Updated dependencies

## 0.1.1

### Patch Changes

- Updated dependencies
