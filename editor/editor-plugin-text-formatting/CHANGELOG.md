# @atlaskit/editor-plugin-text-formatting

## 2.2.0

### Minor Changes

- [#139139](https://bitbucket.org/atlassian/atlassian-frontend-monorepo/pull-requests/139139)
  [`7f6b665d778dd`](https://bitbucket.org/atlassian/atlassian-frontend-monorepo/commits/7f6b665d778dd) -
  [https://product-fabric.atlassian.net/browse/ED-27499](ED-27499) - the new
  `@atlassian/confluence-presets` package with Confluence `full-page` preset is created

### Patch Changes

- Updated dependencies

## 2.1.10

### Patch Changes

- [#139159](https://bitbucket.org/atlassian/atlassian-frontend-monorepo/pull-requests/139159)
  [`d839f4396d5c1`](https://bitbucket.org/atlassian/atlassian-frontend-monorepo/commits/d839f4396d5c1) -
  [ux] Update text formatting dropdown menu icon on primary toolbar
- Updated dependencies

## 2.1.9

### Patch Changes

- Updated dependencies

## 2.1.8

### Patch Changes

- [#134202](https://bitbucket.org/atlassian/atlassian-frontend-monorepo/pull-requests/134202)
  [`1c44e9c82bcce`](https://bitbucket.org/atlassian/atlassian-frontend-monorepo/commits/1c44e9c82bcce) -
  [ux] ED-27384 fix comments toolbar responsiveness

## 2.1.7

### Patch Changes

- Updated dependencies

## 2.1.6

### Patch Changes

- [#127441](https://bitbucket.org/atlassian/atlassian-frontend-monorepo/pull-requests/127441)
  [`f2f4b5971e0b2`](https://bitbucket.org/atlassian/atlassian-frontend-monorepo/commits/f2f4b5971e0b2) -
  [ux] Updates Text Formatting toolbar separators, active option style and removes range selection
  when the toolbar is docked to top.
- Updated dependencies

## 2.1.5

### Patch Changes

- Updated dependencies

## 2.1.4

### Patch Changes

- [#126339](https://bitbucket.org/atlassian/atlassian-frontend-monorepo/pull-requests/126339)
  [`d41ba7595dcd2`](https://bitbucket.org/atlassian/atlassian-frontend-monorepo/commits/d41ba7595dcd2) -
  [ux] Updates the look of Text Formatting Contextual toolbar dropdowns.

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

## 1.16.12

### Patch Changes

- [#107473](https://stash.atlassian.com/projects/CONFCLOUD/repos/confluence-frontend/pull-requests/107473)
  [`962b3297548df`](https://stash.atlassian.com/projects/CONFCLOUD/repos/confluence-frontend/commits/962b3297548df) -
  [ux] Implement variation 2 for editor contextual toolbar formatting experiment

## 1.16.11

### Patch Changes

- [#105009](https://stash.atlassian.com/projects/CONFCLOUD/repos/confluence-frontend/pull-requests/105009)
  [`a4039ebf7ed11`](https://stash.atlassian.com/projects/CONFCLOUD/repos/confluence-frontend/commits/a4039ebf7ed11) -
  [ux] Implement variant 2 cohorts experience for platform_editor_contextual_formatting_toolbar_v2
  experiment
- Updated dependencies

## 1.16.10

### Patch Changes

- [#97984](https://stash.atlassian.com/projects/CONFCLOUD/repos/confluence-frontend/pull-requests/97984)
  [`8ffeab9aaf1ab`](https://stash.atlassian.com/projects/CONFCLOUD/repos/confluence-frontend/commits/8ffeab9aaf1ab) -
  [ux] [ED-23573] Added new actions (resolveMarks and registerMarks) to basePlugin. Callbacks added
  to mentions, card, emoji and base plugins to handle conversion to inline code. Deprecated code
  removed from editor-common.
- Updated dependencies

## 1.16.9

### Patch Changes

- [#100162](https://stash.atlassian.com/projects/CONFCLOUD/repos/confluence-frontend/pull-requests/100162)
  [`e80e57fc37719`](https://stash.atlassian.com/projects/CONFCLOUD/repos/confluence-frontend/commits/e80e57fc37719) -
  [ux] ED-26089: Add 4px gap to main nav bar items

## 1.16.8

### Patch Changes

- [#99274](https://stash.atlassian.com/projects/CONFCLOUD/repos/confluence-frontend/pull-requests/99274)
  [`b4dd134e0caaa`](https://stash.atlassian.com/projects/CONFCLOUD/repos/confluence-frontend/commits/b4dd134e0caaa) -
  ED-25961 Add analytics for clear formatting and adding blockquote from text styles menu

## 1.16.7

### Patch Changes

- [#99080](https://stash.atlassian.com/projects/CONFCLOUD/repos/confluence-frontend/pull-requests/99080)
  [`8b2f0af25c400`](https://stash.atlassian.com/projects/CONFCLOUD/repos/confluence-frontend/commits/8b2f0af25c400) -
  [ux] ED-26062: Removed icon blue borders when selected

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

- [#170931](https://stash.atlassian.com/projects/CONFCLOUD/repos/confluence-frontend/pull-requests/170931)
  [`5a4a927fac223`](https://stash.atlassian.com/projects/CONFCLOUD/repos/confluence-frontend/commits/5a4a927fac223) -
  [ux] Adds text formatting option to the Selection toolbar.

## 1.15.7

### Patch Changes

- [#165765](https://stash.atlassian.com/projects/CONFCLOUD/repos/confluence-frontend/pull-requests/165765)
  [`3f441f30e6507`](https://stash.atlassian.com/projects/CONFCLOUD/repos/confluence-frontend/commits/3f441f30e6507) -
  Bump adf-schema to 46.0.0
- Updated dependencies

## 1.15.6

### Patch Changes

- Updated dependencies

## 1.15.5

### Patch Changes

- [#161245](https://stash.atlassian.com/projects/CONFCLOUD/repos/confluence-frontend/pull-requests/161245)
  [`a4f0ead84f4b7`](https://stash.atlassian.com/projects/CONFCLOUD/repos/confluence-frontend/commits/a4f0ead84f4b7) -
  increase spacing on more formattin toolbar button

## 1.15.4

### Patch Changes

- [#159176](https://stash.atlassian.com/projects/CONFCLOUD/repos/confluence-frontend/pull-requests/159176)
  [`8f1d77592a9dc`](https://stash.atlassian.com/projects/CONFCLOUD/repos/confluence-frontend/commits/8f1d77592a9dc) -
  Bump adf-schema to 44.2.0

## 1.15.3

### Patch Changes

- [#154186](https://stash.atlassian.com/projects/CONFCLOUD/repos/confluence-frontend/pull-requests/154186)
  [`5c316170d29dd`](https://stash.atlassian.com/projects/CONFCLOUD/repos/confluence-frontend/commits/5c316170d29dd) -
  Bump @atlaskit/adf-schema to 42.3.1
- Updated dependencies

## 1.15.2

### Patch Changes

- [#153539](https://stash.atlassian.com/projects/CONFCLOUD/repos/confluence-frontend/pull-requests/153539)
  [`451e5c3fb608e`](https://stash.atlassian.com/projects/CONFCLOUD/repos/confluence-frontend/commits/451e5c3fb608e) -
  [ux] Fix text formatting more button on primary toolbar in small screen when
  `platform-visual-refresh-icons` is on

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

- Updated dependencies

## 1.14.9

### Patch Changes

- [#146455](https://stash.atlassian.com/projects/CONFCLOUD/repos/confluence-frontend/pull-requests/146455)
  [`b692485729f1c`](https://stash.atlassian.com/projects/CONFCLOUD/repos/confluence-frontend/commits/b692485729f1c) -
  improve comment editor toolbar responsiveness
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

- [#139334](https://stash.atlassian.com/projects/CONFCLOUD/repos/confluence-frontend/pull-requests/139334)
  [`30793649657c0`](https://stash.atlassian.com/projects/CONFCLOUD/repos/confluence-frontend/commits/30793649657c0) -
  [HOT-111629] We had an incident where the last character disappears when hitting the enter key on
  windows OS for Korean characters. Bumping to prosemirror-view@1.34.2 for the fix.

## 1.14.4

### Patch Changes

- Updated dependencies

## 1.14.3

### Patch Changes

- [#138118](https://stash.atlassian.com/projects/CONFCLOUD/repos/confluence-frontend/pull-requests/138118)
  [`5e4d9eb1aefe4`](https://stash.atlassian.com/projects/CONFCLOUD/repos/confluence-frontend/commits/5e4d9eb1aefe4) -
  NOISSUE: Upgrades editor React peer dependencies to v18
- Updated dependencies

## 1.14.2

### Patch Changes

- [#135500](https://stash.atlassian.com/projects/CONFCLOUD/repos/confluence-frontend/pull-requests/135500)
  [`d97d77c47b7cb`](https://stash.atlassian.com/projects/CONFCLOUD/repos/confluence-frontend/commits/d97d77c47b7cb) -
  [ux] Migrate new ADS icons on Editor primary toolbar

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

## 1.13.2

### Patch Changes

- Updated dependencies

## 1.13.1

### Patch Changes

- [#129365](https://stash.atlassian.com/projects/CONFCLOUD/repos/confluence-frontend/pull-requests/129365)
  [`ccb6fdd9283db`](https://stash.atlassian.com/projects/CONFCLOUD/repos/confluence-frontend/commits/ccb6fdd9283db) -
  remove editor simplify inline cards ff
- Updated dependencies

## 1.13.0

### Minor Changes

- [#128347](https://stash.atlassian.com/projects/CONFCLOUD/repos/confluence-frontend/pull-requests/128347)
  [`e33566cebd5d1`](https://stash.atlassian.com/projects/CONFCLOUD/repos/confluence-frontend/commits/e33566cebd5d1) -
  [ED-24175] bump @atlaskit/adf-schema to 40.8.1 and @atlassian/adf-schema-json to 1.22.0 to
  promotecodeblocks & media in quotes, and nested expands in expands to full schema, and allow
  quotes in panels and decisions in lists in stage0 schema, and a validator spec change

### Patch Changes

- Updated dependencies

## 1.12.0

### Minor Changes

- [#126478](https://stash.atlassian.com/projects/CONFCLOUD/repos/confluence-frontend/pull-requests/126478)
  [`ca1665ebbfe4d`](https://stash.atlassian.com/projects/CONFCLOUD/repos/confluence-frontend/commits/ca1665ebbfe4d) -
  [ED-23435] Store primary toolbar component registry in a plugin variable instead of in plugin
  state to avoid having to add effects to all plugins and enable SSR for the toolbar. [Breaking
  change] Converted registerComponent from the primary toolbar plugin into an action.

### Patch Changes

- Updated dependencies

## 1.11.2

### Patch Changes

- [#125353](https://stash.atlassian.com/projects/CONFCLOUD/repos/confluence-frontend/pull-requests/125353)
  [`77847728bf617`](https://stash.atlassian.com/projects/CONFCLOUD/repos/confluence-frontend/commits/77847728bf617) -
  Migrate icons in Editor primary toolbar
- Updated dependencies

## 1.11.1

### Patch Changes

- Updated dependencies

## 1.11.0

### Minor Changes

- [#124209](https://stash.atlassian.com/projects/CONFCLOUD/repos/confluence-frontend/pull-requests/124209)
  [`8aa1792f12ed3`](https://stash.atlassian.com/projects/CONFCLOUD/repos/confluence-frontend/commits/8aa1792f12ed3) -
  bump @atlaskit/editor-prosemirror to 5.0.0, bump @atlaskit/adf-schema to 40.1.0

### Patch Changes

- Updated dependencies

## 1.10.0

### Minor Changes

- [#122895](https://stash.atlassian.com/projects/CONFCLOUD/repos/confluence-frontend/pull-requests/122895)
  [`49b8c7658f3b5`](https://stash.atlassian.com/projects/CONFCLOUD/repos/confluence-frontend/commits/49b8c7658f3b5) -
  [ED-24173] bump @atlaskit/adf-schema to 40.3.0 and @atlassian/adf-schema-json to 1.18.0

### Patch Changes

- Updated dependencies

## 1.9.5

### Patch Changes

- Updated dependencies

## 1.9.4

### Patch Changes

- Updated dependencies

## 1.9.3

### Patch Changes

- Updated dependencies

## 1.9.2

### Patch Changes

- [#114548](https://stash.atlassian.com/projects/CONFCLOUD/repos/confluence-frontend/pull-requests/114548)
  [`8b2d47bffb50e`](https://stash.atlassian.com/projects/CONFCLOUD/repos/confluence-frontend/commits/8b2d47bffb50e) -
  bump adf-schema version
- Updated dependencies

## 1.9.1

### Patch Changes

- Updated dependencies

## 1.9.0

### Minor Changes

- [#115247](https://stash.atlassian.com/projects/CONFCLOUD/repos/confluence-frontend/pull-requests/115247)
  [`251d23ff9e6c8`](https://stash.atlassian.com/projects/CONFCLOUD/repos/confluence-frontend/commits/251d23ff9e6c8) -
  upgrade adf-schema version to 38.0.0

### Patch Changes

- Updated dependencies

## 1.8.1

### Patch Changes

- Updated dependencies

## 1.8.0

### Minor Changes

- [#114156](https://stash.atlassian.com/projects/CONFCLOUD/repos/confluence-frontend/pull-requests/114156)
  [`bc6a63af2d1d0`](https://stash.atlassian.com/projects/CONFCLOUD/repos/confluence-frontend/commits/bc6a63af2d1d0) -
  Bump adf-schema to 37.0.0 and adf-schema-json to 1.16.0

### Patch Changes

- Updated dependencies

## 1.7.2

### Patch Changes

- Updated dependencies

## 1.7.1

### Patch Changes

- [#105074](https://stash.atlassian.com/projects/CONFCLOUD/repos/confluence-frontend/pull-requests/105074)
  [`546eb6455635`](https://stash.atlassian.com/projects/CONFCLOUD/repos/confluence-frontend/commits/546eb6455635) -
  [ux] ED-23044 - The inlineCards with URL should be simplified to url when them are wrapped to
  inline codemark

## 1.7.0

### Minor Changes

- [#101406](https://stash.atlassian.com/projects/CONFCLOUD/repos/confluence-frontend/pull-requests/101406)
  [`6daffd65aec4`](https://stash.atlassian.com/projects/CONFCLOUD/repos/confluence-frontend/commits/6daffd65aec4) -
  [ED-23298] Extract primary toolbar components to editor plugin to allow for custom ordering

### Patch Changes

- [#102478](https://stash.atlassian.com/projects/CONFCLOUD/repos/confluence-frontend/pull-requests/102478)
  [`3378951608b0`](https://stash.atlassian.com/projects/CONFCLOUD/repos/confluence-frontend/commits/3378951608b0) -
  [ED-23332] Update adf-schema package to 36.10.1
- Updated dependencies

## 1.6.1

### Patch Changes

- [#101524](https://stash.atlassian.com/projects/CONFCLOUD/repos/confluence-frontend/pull-requests/101524)
  [`4821570088e6`](https://stash.atlassian.com/projects/CONFCLOUD/repos/confluence-frontend/commits/4821570088e6) -
  ED-23362 Bump ADF schema to version 36.8.1 and add support for adf validation and transformation

## 1.6.0

### Minor Changes

- [#100553](https://stash.atlassian.com/projects/CONFCLOUD/repos/confluence-frontend/pull-requests/100553)
  [`e0c2a4b9c8ae`](https://stash.atlassian.com/projects/CONFCLOUD/repos/confluence-frontend/commits/e0c2a4b9c8ae) -
  [ED-23157] Clear background color (= highlights) when clearing the formatting on a selection

### Patch Changes

- Updated dependencies

## 1.5.0

### Minor Changes

- [#99579](https://stash.atlassian.com/projects/CONFCLOUD/repos/confluence-frontend/pull-requests/99579)
  [`f222af5687e9`](https://stash.atlassian.com/projects/CONFCLOUD/repos/confluence-frontend/commits/f222af5687e9) -
  Bump adf-schema to 36.3.0 and adf-schema-json to 1.14.0

### Patch Changes

- Updated dependencies

## 1.4.7

### Patch Changes

- Updated dependencies

## 1.4.6

### Patch Changes

- [#97599](https://stash.atlassian.com/projects/CONFCLOUD/repos/confluence-frontend/pull-requests/97599)
  [`32c3130b08fe`](https://stash.atlassian.com/projects/CONFCLOUD/repos/confluence-frontend/commits/32c3130b08fe) -
  [ED-22282] Bump adf-schema to 36.1.0

## 1.4.5

### Patch Changes

- [#97698](https://stash.atlassian.com/projects/CONFCLOUD/repos/confluence-frontend/pull-requests/97698)
  [`1c7b378c0d3b`](https://stash.atlassian.com/projects/CONFCLOUD/repos/confluence-frontend/commits/1c7b378c0d3b) -
  [HOT-108999] We had an incident where the cursor jumps back a character in table headers for any
  language triggering composition on an empty line.This was fixed in a patch bump of
  prosemirror-view. https://github.com/ProseMirror/prosemirror-view/compare/1.33.4...1.33.5

## 1.4.4

### Patch Changes

- Updated dependencies

## 1.4.3

### Patch Changes

- [#96237](https://stash.atlassian.com/projects/CONFCLOUD/repos/confluence-frontend/pull-requests/96237)
  [`0401e7b5a88e`](https://stash.atlassian.com/projects/CONFCLOUD/repos/confluence-frontend/commits/0401e7b5a88e) -
  [ED-23102] Bump ADF schema to version 35.12.2

## 1.4.2

### Patch Changes

- [#94901](https://stash.atlassian.com/projects/CONFCLOUD/repos/confluence-frontend/pull-requests/94901)
  [`da964fcdc828`](https://stash.atlassian.com/projects/CONFCLOUD/repos/confluence-frontend/commits/da964fcdc828) -
  [ED-23097] Bump ADF schema to version 35.12.1

## 1.4.1

### Patch Changes

- [#93689](https://stash.atlassian.com/projects/CONFCLOUD/repos/confluence-frontend/pull-requests/93689)
  [`5ba5d2b4a9ac`](https://stash.atlassian.com/projects/CONFCLOUD/repos/confluence-frontend/commits/5ba5d2b4a9ac) -
  Updating adf-schema version to 35.10.0

## 1.4.0

### Minor Changes

- [#91934](https://stash.atlassian.com/projects/CONFCLOUD/repos/confluence-frontend/pull-requests/91934)
  [`b76a78c6a199`](https://stash.atlassian.com/projects/CONFCLOUD/repos/confluence-frontend/commits/b76a78c6a199) -
  bumped editor-prosemirror version to 4.0.0

### Patch Changes

- Updated dependencies

## 1.3.5

### Patch Changes

- [#92426](https://stash.atlassian.com/projects/CONFCLOUD/repos/confluence-frontend/pull-requests/92426)
  [`32c76c7c225c`](https://stash.atlassian.com/projects/CONFCLOUD/repos/confluence-frontend/commits/32c76c7c225c) -
  Bump adf-schema to 35.9.2 to support table alignment options

## 1.3.4

### Patch Changes

- [#91106](https://stash.atlassian.com/projects/CONFCLOUD/repos/confluence-frontend/pull-requests/91106)
  [`b6ffa30186b9`](https://stash.atlassian.com/projects/CONFCLOUD/repos/confluence-frontend/commits/b6ffa30186b9) -
  Bump ADF-schema package to version 35.0.0
- Updated dependencies

## 1.3.3

### Patch Changes

- [#86724](https://stash.atlassian.com/projects/CONFCLOUD/repos/confluence-frontend/pull-requests/86724)
  [`718a9aa2424d`](https://stash.atlassian.com/projects/CONFCLOUD/repos/confluence-frontend/commits/718a9aa2424d) -
  [ED-22607] Remove references to maxFrames for multi bodied extensions and bump adf-schema from
  35.7.0 to 35.8.0

## 1.3.2

### Patch Changes

- [#81777](https://stash.atlassian.com/projects/CONFCLOUD/repos/confluence-frontend/pull-requests/81777)
  [`c6d7a5378751`](https://stash.atlassian.com/projects/CONFCLOUD/repos/confluence-frontend/commits/c6d7a5378751) -
  Bump adf-schema to 35.7.0

## 1.3.1

### Patch Changes

- [#83116](https://stash.atlassian.com/projects/CONFCLOUD/repos/confluence-frontend/pull-requests/83116)
  [`8d4e99057fe0`](https://stash.atlassian.com/projects/CONFCLOUD/repos/confluence-frontend/commits/8d4e99057fe0) -
  Upgrade Typescript from `4.9.5` to `5.4.2`

## 1.3.0

### Minor Changes

- [#82499](https://stash.atlassian.com/projects/CONFCLOUD/repos/confluence-frontend/pull-requests/82499)
  [`cbd66fd38b62`](https://stash.atlassian.com/projects/CONFCLOUD/repos/confluence-frontend/commits/cbd66fd38b62) -
  Add option to disable strikethrough on text-formatting via disableStrikethrough.

### Patch Changes

- Updated dependencies

## 1.2.4

### Patch Changes

- [#78492](https://stash.atlassian.com/projects/CONFCLOUD/repos/confluence-frontend/pull-requests/78492)
  [`3b0b93acfd19`](https://stash.atlassian.com/projects/CONFCLOUD/repos/confluence-frontend/commits/3b0b93acfd19) -
  [ux] [CAMPTASKS-123] faulty formatting state for inline nodes

## 1.2.3

### Patch Changes

- [#80679](https://stash.atlassian.com/projects/CONFCLOUD/repos/confluence-frontend/pull-requests/80679)
  [`104eb9443b7e`](https://stash.atlassian.com/projects/CONFCLOUD/repos/confluence-frontend/commits/104eb9443b7e) -
  ED-22553 Updating adf-schema version to 35.6.0

## 1.2.2

### Patch Changes

- [#78224](https://stash.atlassian.com/projects/CONFCLOUD/repos/confluence-frontend/pull-requests/78224)
  [`6b4c9dd4ad34`](https://stash.atlassian.com/projects/CONFCLOUD/repos/confluence-frontend/commits/6b4c9dd4ad34) -
  ED-22219: adf-schema updated to 35.5.2
- Updated dependencies

## 1.2.1

### Patch Changes

- [#75482](https://stash.atlassian.com/projects/CONFCLOUD/repos/confluence-frontend/pull-requests/75482)
  [`18b5a6fb910a`](https://stash.atlassian.com/projects/CONFCLOUD/repos/confluence-frontend/commits/18b5a6fb910a) - #
  MAJOR CHANGE to `@atlaskit/prosemirror-input-rules` package.

  ## WHY?

  Removing editor-common dependencies from prosemirror-input-rules package.

  This makes it easier for editor updates because it simplifies our dependency graph.

  ## WHAT and HOW?

  These are no longer available via `@atlaskit/prosemirror-input-rules` but are available from
  `@atlaskit/editor-common/types`:

  - InputRuleWrapper
  - InputRuleHandler
  - OnHandlerApply
  - createRule

  These have changed from a `SafePlugin` to a `SafePluginSpec`. In order to update your code you
  need to instantiate a `SafePlugin` (ie. `new SafePlugin(createPlugin( ... ))`).

  `SafePlugin` exists in `@atlaskit/editor-common/safe-plugin`.

  - createPlugin
  - createInputRulePlugin

- Updated dependencies

## 1.2.0

### Minor Changes

- [#75020](https://stash.atlassian.com/projects/CONFCLOUD/repos/confluence-frontend/pull-requests/75020)
  [`56d9ebc6e467`](https://stash.atlassian.com/projects/CONFCLOUD/repos/confluence-frontend/commits/56d9ebc6e467) -
  [ux] ECA11Y-206: Separators fix

## 1.1.0

### Minor Changes

- [#73123](https://stash.atlassian.com/projects/CONFCLOUD/repos/confluence-frontend/pull-requests/73123)
  [`9fd7b5a5e323`](https://stash.atlassian.com/projects/CONFCLOUD/repos/confluence-frontend/commits/9fd7b5a5e323) -
  ECA11Y-206: added role group and aria labels

### Patch Changes

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

## 0.4.26

### Patch Changes

- [#68572](https://stash.atlassian.com/projects/CONFCLOUD/repos/confluence-frontend/pull-requests/68572)
  [`15d407fe5143`](https://stash.atlassian.com/projects/CONFCLOUD/repos/confluence-frontend/commits/15d407fe5143) -
  Upgrading @atlaskit/editor-prosemirror dependency

## 0.4.25

### Patch Changes

- [#70152](https://stash.atlassian.com/projects/CONFCLOUD/repos/confluence-frontend/pull-requests/70152)
  [`53ed3673df28`](https://stash.atlassian.com/projects/CONFCLOUD/repos/confluence-frontend/commits/53ed3673df28) -
  Updating adf-schema version to 35.5.1

## 0.4.24

### Patch Changes

- Updated dependencies

## 0.4.23

### Patch Changes

- [#67557](https://stash.atlassian.com/projects/CONFCLOUD/repos/confluence-frontend/pull-requests/67557)
  [`124d0c6d5286`](https://stash.atlassian.com/projects/CONFCLOUD/repos/confluence-frontend/commits/124d0c6d5286) -
  Migrating block-type, text-color, and text-formatting to use useSharedPluginState rather than
  WithPluginState. Removing unused option on default preset. Adding formattingIsPresent prop to
  TextFormattingState.
- Updated dependencies

## 0.4.22

### Patch Changes

- [#65031](https://stash.atlassian.com/projects/CONFCLOUD/repos/confluence-frontend/pull-requests/65031)
  [`a00094111b5a`](https://stash.atlassian.com/projects/CONFCLOUD/repos/confluence-frontend/commits/a00094111b5a) -
  ED-21609 Update adf-schema to 35.3.0
- Updated dependencies

## 0.4.21

### Patch Changes

- [#62165](https://stash.atlassian.com/projects/CONFCLOUD/repos/confluence-frontend/pull-requests/62165)
  [`b44ac0968d79`](https://stash.atlassian.com/projects/CONFCLOUD/repos/confluence-frontend/commits/b44ac0968d79) -
  [ED-21562] Bump @atlaskit/adf-schema to 35.2.0 for border mark update

## 0.4.20

### Patch Changes

- [#60808](https://stash.atlassian.com/projects/CONFCLOUD/repos/confluence-frontend/pull-requests/60808)
  [`f509a21be124`](https://stash.atlassian.com/projects/CONFCLOUD/repos/confluence-frontend/commits/f509a21be124) -
  ED-21506: @atlaskit/adf-schema upgraded to 35.1.1 to support renderer for MBE

## 0.4.19

### Patch Changes

- [#58246](https://stash.atlassian.com/projects/CONFCLOUD/repos/confluence-frontend/pull-requests/58246)
  [`a381b2599716`](https://stash.atlassian.com/projects/CONFCLOUD/repos/confluence-frontend/commits/a381b2599716) -
  ED-21371 Update adf-schema to 35.1.0

## 0.4.18

### Patch Changes

- Updated dependencies

## 0.4.17

### Patch Changes

- [#59147](https://stash.atlassian.com/projects/CONFCLOUD/repos/confluence-frontend/pull-requests/59147)
  [`f12e489f23b0`](https://stash.atlassian.com/projects/CONFCLOUD/repos/confluence-frontend/commits/f12e489f23b0) -
  Re-build and deploy packages to NPM to resolve React/Compiled not found error (HOT-106483).

## 0.4.16

### Patch Changes

- [#58763](https://stash.atlassian.com/projects/CONFCLOUD/repos/confluence-frontend/pull-requests/58763)
  [`0fdbd64522bf`](https://stash.atlassian.com/projects/CONFCLOUD/repos/confluence-frontend/commits/0fdbd64522bf) -
  update ADF schema

## 0.4.15

### Patch Changes

- [#56790](https://bitbucket.org/atlassian/atlassian-frontend/pull-requests/56790)
  [`ff577a7969d4`](https://bitbucket.org/atlassian/atlassian-frontend/commits/ff577a7969d4) -
  ED-21266: Updated @atlaskit/adf-schema to 34.0.1

## 0.4.14

### Patch Changes

- [#43417](https://bitbucket.org/atlassian/atlassian-frontend/pull-requests/43417)
  [`3f3c17f0273`](https://bitbucket.org/atlassian/atlassian-frontend/commits/3f3c17f0273) - ED-20971
  Upgrade adf-schema package to ^34.0.0

## 0.4.13

### Patch Changes

- Updated dependencies

## 0.4.12

### Patch Changes

- [#43379](https://bitbucket.org/atlassian/atlassian-frontend/pull-requests/43379)
  [`482c025520d`](https://bitbucket.org/atlassian/atlassian-frontend/commits/482c025520d) - ED-20763
  Upgrade ADF schema version to 33.2.3 for MBE nodes.
- Updated dependencies

## 0.4.11

### Patch Changes

- [#42770](https://bitbucket.org/atlassian/atlassian-frontend/pull-requests/42770)
  [`c7a6a824958`](https://bitbucket.org/atlassian/atlassian-frontend/commits/c7a6a824958) - Extract
  code-block plugin from editor-core as `@atlaskit/editor-plugin-code-block`.

## 0.4.10

### Patch Changes

- [#42570](https://bitbucket.org/atlassian/atlassian-frontend/pull-requests/42570)
  [`d7ff4d590d7`](https://bitbucket.org/atlassian/atlassian-frontend/commits/d7ff4d590d7) -
  ED-20023: Adding check for undefined item in dropdown menu

## 0.4.9

### Patch Changes

- Updated dependencies

## 0.4.8

### Patch Changes

- [#41634](https://bitbucket.org/atlassian/atlassian-frontend/pull-requests/41634)
  [`e7cd20932b9`](https://bitbucket.org/atlassian/atlassian-frontend/commits/e7cd20932b9) - on
  windows, toggles mark when the capslock is on

## 0.4.7

### Patch Changes

- [#39749](https://bitbucket.org/atlassian/atlassian-frontend/pull-requests/39749)
  [`e6b69f455c3`](https://bitbucket.org/atlassian/atlassian-frontend/commits/e6b69f455c3) - Connect
  yarn changeset to packages, upgrade adf-schema

## 0.4.6

### Patch Changes

- Updated dependencies

## 0.4.5

### Patch Changes

- [#39984](https://bitbucket.org/atlassian/atlassian-frontend/pull-requests/39984)
  [`37c62369dae`](https://bitbucket.org/atlassian/atlassian-frontend/commits/37c62369dae) - NO-ISSUE
  Import doc builder types from editor-common

## 0.4.4

### Patch Changes

- Updated dependencies

## 0.4.3

### Patch Changes

- [#39481](https://bitbucket.org/atlassian/atlassian-frontend/pull-requests/39481)
  [`aeb5c9a01e8`](https://bitbucket.org/atlassian/atlassian-frontend/commits/aeb5c9a01e8) - Delete
  adf-schema from AFE and rely on npm package for adf-schema
- [`4b4dcfe0bba`](https://bitbucket.org/atlassian/atlassian-frontend/commits/4b4dcfe0bba) - Delete
  adf-schema, use published version

## 0.4.2

### Patch Changes

- [#39628](https://bitbucket.org/atlassian/atlassian-frontend/pull-requests/39628)
  [`1b66c23221e`](https://bitbucket.org/atlassian/atlassian-frontend/commits/1b66c23221e) - Fix
  missing analytics parameter in media plugin.

## 0.4.1

### Patch Changes

- [#39304](https://bitbucket.org/atlassian/atlassian-frontend/pull-requests/39304)
  [`6acf9830b36`](https://bitbucket.org/atlassian/atlassian-frontend/commits/6acf9830b36) - Update
  feature flags plugin (@atlaskit/editor-plugin-feature-flags) to use a named export rather than
  default export to match other plugins.

  ```ts
  // Before
  import featureFlagsPlugin from '@atlaskit/editor-plugin-feature-flags';

  // After
  import { featureFlagsPlugin } from '@atlaskit/editor-plugin-feature-flags';
  ```

## 0.4.0

### Minor Changes

- [#39325](https://bitbucket.org/atlassian/atlassian-frontend/pull-requests/39325)
  [`ad3c5c21079`](https://bitbucket.org/atlassian/atlassian-frontend/commits/ad3c5c21079) - Updating
  all plugins with minor version to correct issue with semver.

### Patch Changes

- Updated dependencies

## 0.3.2

### Patch Changes

- [#39010](https://bitbucket.org/atlassian/atlassian-frontend/pull-requests/39010)
  [`8467bdcdf4f`](https://bitbucket.org/atlassian/atlassian-frontend/commits/8467bdcdf4f) - Removing
  `dependencies` prop from PluginInjectionAPI and changing signature of `NextEditorPlugin`.

  Previously a `NextEditorPlugin` would be consumed as so:

  ```ts
  const plugin: NextEditorPlugin< ... > = (config, api) => {
    // Can use api like so:
    api.dependencies.core.actions.execute( ... )
    return { ... }
  }
  ```

  Now these have become named parameters like so and the `pluginInjectionAPI` is used without the
  `dependencies` prop:

  ```ts
  const plugin: NextEditorPlugin< ... > = ({ config, api }) => {
    // Can use api like so:
    api.core.actions.execute( ... )
    return { ... }
  }
  ```

- Updated dependencies

## 0.3.1

### Patch Changes

- [#39177](https://bitbucket.org/atlassian/atlassian-frontend/pull-requests/39177)
  [`24e27147cbd`](https://bitbucket.org/atlassian/atlassian-frontend/commits/24e27147cbd) - Added
  atlaskit docs to all existing plugins.

## 0.3.0

### Minor Changes

- [#39023](https://bitbucket.org/atlassian/atlassian-frontend/pull-requests/39023)
  [`4795a87a349`](https://bitbucket.org/atlassian/atlassian-frontend/commits/4795a87a349) -
  Migrating some actions of `editor-plugin-list` to commands. Adding sharedState for
  `editor-plugin-text-formatting`.

## 0.2.5

### Patch Changes

- [#38976](https://bitbucket.org/atlassian/atlassian-frontend/pull-requests/38976)
  [`33cb07de05f`](https://bitbucket.org/atlassian/atlassian-frontend/commits/33cb07de05f) - change
  adf-schema to fixed versioning

## 0.2.4

### Patch Changes

- [#38808](https://bitbucket.org/atlassian/atlassian-frontend/pull-requests/38808)
  [`967f4819f58`](https://bitbucket.org/atlassian/atlassian-frontend/commits/967f4819f58) -
  Introduce core plugin that is always injected into the pluginInjectionApi. This has a new action
  `execute` that replaces the existing `executeCommand` that was called from the
  `pluginInjectionApi`.
- Updated dependencies

## 0.2.3

### Patch Changes

- [#38577](https://bitbucket.org/atlassian/atlassian-frontend/pull-requests/38577)
  [`f12aff135b6`](https://bitbucket.org/atlassian/atlassian-frontend/commits/f12aff135b6) - Extract
  Composition Plugin

## 0.2.2

### Patch Changes

- [#38495](https://bitbucket.org/atlassian/atlassian-frontend/pull-requests/38495)
  [`24fc3925d73`](https://bitbucket.org/atlassian/atlassian-frontend/commits/24fc3925d73) - Add a
  new hook called `usePreset` accesed via `@atlaskit/editor-core/use-preset`. This hook can be used
  to safely access state and commands from outside the editor using `EditorContext`.
- Updated dependencies

## 0.2.1

### Patch Changes

- [#38679](https://bitbucket.org/atlassian/atlassian-frontend/pull-requests/38679)
  [`5365e42ef97`](https://bitbucket.org/atlassian/atlassian-frontend/commits/5365e42ef97) - cleaned
  up more of the \* as keymaps imports to enable better tree-shaking

## 0.2.0

### Minor Changes

- [#38497](https://bitbucket.org/atlassian/atlassian-frontend/pull-requests/38497)
  [`43c51e0a282`](https://bitbucket.org/atlassian/atlassian-frontend/commits/43c51e0a282) -
  [ED-19431] Migrate all text-formatting plugin actions over to plugin commands

### Patch Changes

- Updated dependencies

## 0.1.1

### Patch Changes

- [#38544](https://bitbucket.org/atlassian/atlassian-frontend/pull-requests/38544)
  [`f3728ec49ab`](https://bitbucket.org/atlassian/atlassian-frontend/commits/f3728ec49ab) - NO-ISSUE
  Switched analytics plugin to prod dependency to avoid type issues in CI
