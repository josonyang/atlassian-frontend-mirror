# @atlaskit/eslint-plugin-ui-styling-standard

## 1.4.2

### Patch Changes

- [#120084](https://bitbucket.org/atlassian/atlassian-frontend-monorepo/pull-requests/120084)
  [`ee978d7b2ba83`](https://bitbucket.org/atlassian/atlassian-frontend-monorepo/commits/ee978d7b2ba83) -
  Support BinaryExpression and ConditionalExpression logic when inspecting if an Identifier is
  static.

## 1.4.1

### Patch Changes

- Updated dependencies

## 1.4.0

### Minor Changes

- [#115551](https://stash.atlassian.com/projects/CONFCLOUD/repos/confluence-frontend/pull-requests/115551)
  [`b773fe465608e`](https://stash.atlassian.com/projects/CONFCLOUD/repos/confluence-frontend/commits/b773fe465608e) -
  Allows `@atlaskit/ui-styling-standard/no-classname-prop` to work with bounded pass-through, eg.
  `className={props.xcss}`

## 1.3.0

### Minor Changes

- [#113173](https://stash.atlassian.com/projects/CONFCLOUD/repos/confluence-frontend/pull-requests/113173)
  [`46aad36c62f2f`](https://stash.atlassian.com/projects/CONFCLOUD/repos/confluence-frontend/commits/46aad36c62f2f) -
  Cuts a new changeset to land ESLint v9 changes to NPM fully (shipped internally Feb 5th:
  https://bitbucket.org/atlassian/atlassian-frontend-monorepo/pull-requests/109855)

### Patch Changes

- Updated dependencies

## 1.2.0

### Minor Changes

- [#112918](https://stash.atlassian.com/projects/CONFCLOUD/repos/confluence-frontend/pull-requests/112918)
  [`fdd4f60b25c59`](https://stash.atlassian.com/projects/CONFCLOUD/repos/confluence-frontend/commits/fdd4f60b25c59) -
  Update rules to be compatible with ESLint v9, while maintaining compatibility with v8 via the
  `@atlaskit/eslint-utils` package.

### Patch Changes

- Updated dependencies

## 1.1.1

### Patch Changes

- Updated dependencies

## 1.1.0

### Minor Changes

- [#178147](https://stash.atlassian.com/projects/CONFCLOUD/repos/confluence-frontend/pull-requests/178147)
  [`06f80813d818b`](https://stash.atlassian.com/projects/CONFCLOUD/repos/confluence-frontend/commits/06f80813d818b) -
  Handle the false-positive of enforce-style-prop when assigned via `style={style}` passing around
  full objects, rather than simply inline `style={{ … }}` objects.

## 1.0.4

### Patch Changes

- [#171997](https://stash.atlassian.com/projects/CONFCLOUD/repos/confluence-frontend/pull-requests/171997)
  [`a433756c2ec76`](https://stash.atlassian.com/projects/CONFCLOUD/repos/confluence-frontend/commits/a433756c2ec76) -
  Remove dependency not longer needed

## 1.0.3

### Patch Changes

- [#171994](https://stash.atlassian.com/projects/CONFCLOUD/repos/confluence-frontend/pull-requests/171994)
  [`be58e4bb2e387`](https://stash.atlassian.com/projects/CONFCLOUD/repos/confluence-frontend/commits/be58e4bb2e387) -
  Migrating usages of UNSAFE types and entrypoints that have been renamed in `@atlaskit/icon` and
  `@atlaskit/icon-lab`.

## 1.0.2

### Patch Changes

- Updated dependencies

## 1.0.1

### Patch Changes

- [#165531](https://stash.atlassian.com/projects/CONFCLOUD/repos/confluence-frontend/pull-requests/165531)
  [`57f451bda8919`](https://stash.atlassian.com/projects/CONFCLOUD/repos/confluence-frontend/commits/57f451bda8919) -
  Adds side-effect config to support Compiled css extraction in third-party apps

## 1.0.0

### Major Changes

- [#162439](https://stash.atlassian.com/projects/CONFCLOUD/repos/confluence-frontend/pull-requests/162439)
  [`d4e7809eb2373`](https://stash.atlassian.com/projects/CONFCLOUD/repos/confluence-frontend/commits/d4e7809eb2373) -
  Remove Compiled rules from plugin, please use @compiled/eslint-plugin directly

### Patch Changes

- [#157624](https://stash.atlassian.com/projects/CONFCLOUD/repos/confluence-frontend/pull-requests/157624)
  [`1734bd61b5d9e`](https://stash.atlassian.com/projects/CONFCLOUD/repos/confluence-frontend/commits/1734bd61b5d9e) -
  Fix enforce-style-prop from erroring on type assertion, eg. '{…} as React.CSSProperties' which is
  a common pattern

## 0.21.0

### Minor Changes

- [#157735](https://stash.atlassian.com/projects/CONFCLOUD/repos/confluence-frontend/pull-requests/157735)
  [`0138fda541246`](https://stash.atlassian.com/projects/CONFCLOUD/repos/confluence-frontend/commits/0138fda541246) -
  Adding flat config presets to @atlaskit/eslint-plugin-ui-styling-standard

## 0.20.1

### Patch Changes

- [#154199](https://stash.atlassian.com/projects/CONFCLOUD/repos/confluence-frontend/pull-requests/154199)
  [`d13bf04a19535`](https://stash.atlassian.com/projects/CONFCLOUD/repos/confluence-frontend/commits/d13bf04a19535) -
  Bump @compiled/\* and enable sorting of styles (where applicable)

## 0.20.0

### Minor Changes

- [#154669](https://stash.atlassian.com/projects/CONFCLOUD/repos/confluence-frontend/pull-requests/154669)
  [`20db78434becd`](https://stash.atlassian.com/projects/CONFCLOUD/repos/confluence-frontend/commits/20db78434becd) -
  Bump to the latest version of @compiled/\*
- [#154669](https://stash.atlassian.com/projects/CONFCLOUD/repos/confluence-frontend/pull-requests/154669)
  [`20db78434becd`](https://stash.atlassian.com/projects/CONFCLOUD/repos/confluence-frontend/commits/20db78434becd) -
  Add and configure `@compiled/jsx-pragma` in the recommended preset for a better experience with
  `@atlaskit/css` and the JSX pragma.

## 0.19.1

### Patch Changes

- [#152862](https://stash.atlassian.com/projects/CONFCLOUD/repos/confluence-frontend/pull-requests/152862)
  [`8febdd40a9680`](https://stash.atlassian.com/projects/CONFCLOUD/repos/confluence-frontend/commits/8febdd40a9680) -
  Added &::-webkit-details-marker CSS psuedo into the allowed set of psuedos in
  @atlaskit/ui-styling-standard/no-unsafe-selectors rule

## 0.19.0

### Minor Changes

- [#128926](https://stash.atlassian.com/projects/CONFCLOUD/repos/confluence-frontend/pull-requests/128926)
  [`5df26d24db3c7`](https://stash.atlassian.com/projects/CONFCLOUD/repos/confluence-frontend/commits/5df26d24db3c7) -
  Remove configuration for '@atlaskit/design-system/no-exported-css' and
  '@atlaskit/design-system/no-exported-keyframes' as we expect
  '@atlaskit/ui-styling-standard/no-exported-styles' to cover these cases now.

## 0.18.4

### Patch Changes

- [#122050](https://stash.atlassian.com/projects/CONFCLOUD/repos/confluence-frontend/pull-requests/122050)
  [`db22dc84c34c3`](https://stash.atlassian.com/projects/CONFCLOUD/repos/confluence-frontend/commits/db22dc84c34c3) -
  Moves away from the use of ts-node to esbuild-register for local consumption

## 0.18.3

### Patch Changes

- [#116800](https://stash.atlassian.com/projects/CONFCLOUD/repos/confluence-frontend/pull-requests/116800)
  [`4a3de9921ec28`](https://stash.atlassian.com/projects/CONFCLOUD/repos/confluence-frontend/commits/4a3de9921ec28) -
  Updated documentation.

## 0.18.2

### Patch Changes

- [#120040](https://stash.atlassian.com/projects/CONFCLOUD/repos/confluence-frontend/pull-requests/120040)
  [`5d9c0285bcb91`](https://stash.atlassian.com/projects/CONFCLOUD/repos/confluence-frontend/commits/5d9c0285bcb91) -
  The `no-imported-style-values` rule will now allow using `cx()` inside the `xcss` prop.

## 0.18.1

### Patch Changes

- [#117847](https://stash.atlassian.com/projects/CONFCLOUD/repos/confluence-frontend/pull-requests/117847)
  [`5795b7b47ceac`](https://stash.atlassian.com/projects/CONFCLOUD/repos/confluence-frontend/commits/5795b7b47ceac) -
  Removes redundant files from NPM deployment

## 0.18.0

### Minor Changes

- [#117005](https://stash.atlassian.com/projects/CONFCLOUD/repos/confluence-frontend/pull-requests/117005)
  [`af9ff1e4ec472`](https://stash.atlassian.com/projects/CONFCLOUD/repos/confluence-frontend/commits/af9ff1e4ec472) -
  The recommended config now has `consistent-css-prop-usage` linting enabled for the `xcss` prop.

## 0.17.0

### Minor Changes

- [#110617](https://stash.atlassian.com/projects/CONFCLOUD/repos/confluence-frontend/pull-requests/110617)
  [`6c94f6748cd97`](https://stash.atlassian.com/projects/CONFCLOUD/repos/confluence-frontend/commits/6c94f6748cd97) -
  turning warn to error for ui styling standard rules

## 0.16.6

### Patch Changes

- [#112386](https://stash.atlassian.com/projects/CONFCLOUD/repos/confluence-frontend/pull-requests/112386)
  [`762c18186f898`](https://stash.atlassian.com/projects/CONFCLOUD/repos/confluence-frontend/commits/762c18186f898) -
  Internal refactoring to use `context.getSourceCode()` instead of `context.sourceCode` to better
  support older versions of eslint.

## 0.16.5

### Patch Changes

- [#111807](https://stash.atlassian.com/projects/CONFCLOUD/repos/confluence-frontend/pull-requests/111807)
  [`a0bd2ff79dc32`](https://stash.atlassian.com/projects/CONFCLOUD/repos/confluence-frontend/commits/a0bd2ff79dc32) -
  Fixes `no-imported-style-values` to allow imported identifiers when used in the LHS of conditional
  expressions in the `css` prop. This enables dynamic application of styles using feature flags.

## 0.16.4

### Patch Changes

- [#111304](https://stash.atlassian.com/projects/CONFCLOUD/repos/confluence-frontend/pull-requests/111304)
  [`df63ad1ddca6a`](https://stash.atlassian.com/projects/CONFCLOUD/repos/confluence-frontend/commits/df63ad1ddca6a) -
  Updated rule docs for better clarity and consistency

## 0.16.3

### Patch Changes

- [#110284](https://stash.atlassian.com/projects/CONFCLOUD/repos/confluence-frontend/pull-requests/110284)
  [`34021a2db424f`](https://stash.atlassian.com/projects/CONFCLOUD/repos/confluence-frontend/commits/34021a2db424f) -
  Internal refactoring to improve backwards compatibility with ESLint versions lower than 8

## 0.16.2

### Patch Changes

- [#109764](https://stash.atlassian.com/projects/CONFCLOUD/repos/confluence-frontend/pull-requests/109764)
  [`5ceaeae2bef25`](https://stash.atlassian.com/projects/CONFCLOUD/repos/confluence-frontend/commits/5ceaeae2bef25) -
  Fixes `no-imported-style-values` to ignore imported values that exist in the type level

## 0.16.1

### Patch Changes

- [#110975](https://stash.atlassian.com/projects/CONFCLOUD/repos/confluence-frontend/pull-requests/110975)
  [`47a912f14bb6f`](https://stash.atlassian.com/projects/CONFCLOUD/repos/confluence-frontend/commits/47a912f14bb6f) -
  Fixed a bug in `walkStyleProperties` that could result in `styled(BaseComponent)({})` styles to
  not be linted.

## 0.16.0

### Minor Changes

- [#109850](https://stash.atlassian.com/projects/CONFCLOUD/repos/confluence-frontend/pull-requests/109850)
  [`9a18d4ad09473`](https://stash.atlassian.com/projects/CONFCLOUD/repos/confluence-frontend/commits/9a18d4ad09473) -
  Added migration guide to styling standard documentation.

## 0.15.2

### Patch Changes

- [#105238](https://stash.atlassian.com/projects/CONFCLOUD/repos/confluence-frontend/pull-requests/105238)
  [`8840e6d3180d`](https://stash.atlassian.com/projects/CONFCLOUD/repos/confluence-frontend/commits/8840e6d3180d) -
  Fixes `no-nested-selectors` to handle additional APIs (such as `cssMap` and `keyframes`) as well
  as catch more cases of nested selectors.

## 0.15.1

### Patch Changes

- [#105631](https://stash.atlassian.com/projects/CONFCLOUD/repos/confluence-frontend/pull-requests/105631)
  [`68f222356b10`](https://stash.atlassian.com/projects/CONFCLOUD/repos/confluence-frontend/commits/68f222356b10) -
  Fixes `no-unsafe-selector` to ignore `xcss` when checking for ambiguous pseudo-selectors. This is
  because `xcss` does not support a leading `&` for properties.

## 0.15.0

### Minor Changes

- [#100969](https://stash.atlassian.com/projects/CONFCLOUD/repos/confluence-frontend/pull-requests/100969)
  [`0bdf8e822b2f`](https://stash.atlassian.com/projects/CONFCLOUD/repos/confluence-frontend/commits/0bdf8e822b2f) -
  Added `no-unsafe-selectors` rule to enable static analysis and prevent regressions when migrating
  between styling APIs.

### Patch Changes

- Updated dependencies

## 0.14.2

### Patch Changes

- [#101063](https://stash.atlassian.com/projects/CONFCLOUD/repos/confluence-frontend/pull-requests/101063)
  [`d135d014f1ae`](https://stash.atlassian.com/projects/CONFCLOUD/repos/confluence-frontend/commits/d135d014f1ae) -
  The `atlaskit-theme` rule no longer reports on the `fontFallback` import from
  `@atlaskit/theme/typography`

## 0.14.1

### Patch Changes

- [#99639](https://stash.atlassian.com/projects/CONFCLOUD/repos/confluence-frontend/pull-requests/99639)
  [`e9887b5c7698`](https://stash.atlassian.com/projects/CONFCLOUD/repos/confluence-frontend/commits/e9887b5c7698) -
  Internal refactoring of `no-important-styles` rule
- Updated dependencies

## 0.14.0

### Minor Changes

- [#99733](https://stash.atlassian.com/projects/CONFCLOUD/repos/confluence-frontend/pull-requests/99733)
  [`7051e483ab6d`](https://stash.atlassian.com/projects/CONFCLOUD/repos/confluence-frontend/commits/7051e483ab6d) -
  Added no-styled eslint rule to prevent usage of styled imports

## 0.13.0

### Minor Changes

- [#99544](https://stash.atlassian.com/projects/CONFCLOUD/repos/confluence-frontend/pull-requests/99544)
  [`391edf6de450`](https://stash.atlassian.com/projects/CONFCLOUD/repos/confluence-frontend/commits/391edf6de450) -
  Added `no-global-styles` rule which prevents:

  - The `Global` API from `@emotion`
  - The `createGlobalStyle` and `injectGlobal` APIs from `styled-components`
  - `<style>` elements in JSX
  - CSS imports (including SASS and LESS)

## 0.12.0

### Minor Changes

- [#96162](https://stash.atlassian.com/projects/CONFCLOUD/repos/confluence-frontend/pull-requests/96162)
  [`d68864c620d0`](https://stash.atlassian.com/projects/CONFCLOUD/repos/confluence-frontend/commits/d68864c620d0) -
  Add `use-compiled` rule to enforce usage of `@compiled/react` instead of other CSS-in-JS libraries

## 0.11.6

### Patch Changes

- [#97707](https://stash.atlassian.com/projects/CONFCLOUD/repos/confluence-frontend/pull-requests/97707)
  [`764c0805b3c1`](https://stash.atlassian.com/projects/CONFCLOUD/repos/confluence-frontend/commits/764c0805b3c1) -
  Moved compiled/atlaskit-theme eslint rule to UI styling standard

## 0.11.5

### Patch Changes

- [#96532](https://stash.atlassian.com/projects/CONFCLOUD/repos/confluence-frontend/pull-requests/96532)
  [`d54c7df2e836`](https://stash.atlassian.com/projects/CONFCLOUD/repos/confluence-frontend/commits/d54c7df2e836) -
  Editing enforce-style-prop rule to use eslint utils functions

## 0.11.4

### Patch Changes

- [#93427](https://stash.atlassian.com/projects/CONFCLOUD/repos/confluence-frontend/pull-requests/93427)
  [`d6d428f334b0`](https://stash.atlassian.com/projects/CONFCLOUD/repos/confluence-frontend/commits/d6d428f334b0) -
  The `no-important-styles` rule now checks template literal values in style objects

## 0.11.3

### Patch Changes

- [#95279](https://stash.atlassian.com/projects/CONFCLOUD/repos/confluence-frontend/pull-requests/95279)
  [`813a0e8d6227`](https://stash.atlassian.com/projects/CONFCLOUD/repos/confluence-frontend/commits/813a0e8d6227) -
  Deprecating @repo/internal/compiled/selectors ESlint rule

## 0.11.2

### Patch Changes

- [#94765](https://stash.atlassian.com/projects/CONFCLOUD/repos/confluence-frontend/pull-requests/94765)
  [`8e5a3bddb686`](https://stash.atlassian.com/projects/CONFCLOUD/repos/confluence-frontend/commits/8e5a3bddb686) -
  Adding no imported style values ESlint rule

## 0.11.1

### Patch Changes

- [#92963](https://stash.atlassian.com/projects/CONFCLOUD/repos/confluence-frontend/pull-requests/92963)
  [`1bb8557fb0b6`](https://stash.atlassian.com/projects/CONFCLOUD/repos/confluence-frontend/commits/1bb8557fb0b6) -
  Added no-exported-styles eslint rule to disallow exports of css, cssMap, keyframes, styled and
  xcss styling

## 0.11.0

### Minor Changes

- [#87213](https://stash.atlassian.com/projects/CONFCLOUD/repos/confluence-frontend/pull-requests/87213)
  [`fbfa5a58cf39`](https://stash.atlassian.com/projects/CONFCLOUD/repos/confluence-frontend/commits/fbfa5a58cf39) -
  Adds `no-unsafe-values` rule, which forbids most dynamic styling in
  `css`/`styled`/`keyframes`/`cssMap`/`xcss` function calls. This includes object spreading,
  function calls, and so on.

### Patch Changes

- Updated dependencies

## 0.10.0

### Minor Changes

- [#91611](https://stash.atlassian.com/projects/CONFCLOUD/repos/confluence-frontend/pull-requests/91611)
  [`943056d22c36`](https://stash.atlassian.com/projects/CONFCLOUD/repos/confluence-frontend/commits/943056d22c36) -
  Add `no-dynamic-styles` rule which blocks function expressions as values in style declarations.

## 0.9.1

### Patch Changes

- [#90977](https://stash.atlassian.com/projects/CONFCLOUD/repos/confluence-frontend/pull-requests/90977)
  [`becda03f375e`](https://stash.atlassian.com/projects/CONFCLOUD/repos/confluence-frontend/commits/becda03f375e) -
  Create eslint rule to enforce style prop usage by disallowing passing static css values

## 0.9.0

### Minor Changes

- [#91840](https://stash.atlassian.com/projects/CONFCLOUD/repos/confluence-frontend/pull-requests/91840)
  [`997a3d2d0ca0`](https://stash.atlassian.com/projects/CONFCLOUD/repos/confluence-frontend/commits/997a3d2d0ca0) -
  Add `no-array-arguments` rule which prevents passing array arguments to style declaration
  functions.

### Patch Changes

- Updated dependencies

## 0.8.4

### Patch Changes

- [#89936](https://stash.atlassian.com/projects/CONFCLOUD/repos/confluence-frontend/pull-requests/89936)
  [`eb8f66c5d0f3`](https://stash.atlassian.com/projects/CONFCLOUD/repos/confluence-frontend/commits/eb8f66c5d0f3) -
  Add @atlaskit/eslint-plugin-ui-styling-standard to the internal Atlassian push model.

## 0.8.3

### Patch Changes

- [#87496](https://stash.atlassian.com/projects/CONFCLOUD/repos/confluence-frontend/pull-requests/87496)
  [`d5b439e94043`](https://stash.atlassian.com/projects/CONFCLOUD/repos/confluence-frontend/commits/d5b439e94043) -
  Improve coverage of `convert-props-syntax` rule. Previously cases such as `css()` and
  `styled(BaseComponent)()` were not covered by the rule.

## 0.8.2

### Patch Changes

- [#88753](https://stash.atlassian.com/projects/CONFCLOUD/repos/confluence-frontend/pull-requests/88753)
  [`df5cbd4957ea`](https://stash.atlassian.com/projects/CONFCLOUD/repos/confluence-frontend/commits/df5cbd4957ea) -
  Fixed no nested selectors rule to skip @ queries, cssMap and keyFrames calls

## 0.8.1

### Patch Changes

- [#88029](https://stash.atlassian.com/projects/CONFCLOUD/repos/confluence-frontend/pull-requests/88029)
  [`01d74d2899d5`](https://stash.atlassian.com/projects/CONFCLOUD/repos/confluence-frontend/commits/01d74d2899d5) -
  Disabled ESlint rule convert-props-syntax on .attrs() calls
- [#87476](https://stash.atlassian.com/projects/CONFCLOUD/repos/confluence-frontend/pull-requests/87476)
  [`af296d200ad2`](https://stash.atlassian.com/projects/CONFCLOUD/repos/confluence-frontend/commits/af296d200ad2) -
  Internal refactoring to use `getCreateLintRule` from `@atlaskit/eslint-utils`
- Updated dependencies

## 0.8.0

### Minor Changes

- [#87972](https://stash.atlassian.com/projects/CONFCLOUD/repos/confluence-frontend/pull-requests/87972)
  [`1f420b2c4a9f`](https://stash.atlassian.com/projects/CONFCLOUD/repos/confluence-frontend/commits/1f420b2c4a9f) -
  The `@atlaskit/design-system/no-styled-tagged-template-expression` rule will now lint against
  `styled-components` by default in the preset configurations.

### Patch Changes

- [#86779](https://stash.atlassian.com/projects/CONFCLOUD/repos/confluence-frontend/pull-requests/86779)
  [`4b4bbf195e39`](https://stash.atlassian.com/projects/CONFCLOUD/repos/confluence-frontend/commits/4b4bbf195e39) -
  Created no nested selectors eslint rule to prevent setting styles for child elements

## 0.7.2

### Patch Changes

- [#86638](https://stash.atlassian.com/projects/CONFCLOUD/repos/confluence-frontend/pull-requests/86638)
  [`f003f07e88e1`](https://stash.atlassian.com/projects/CONFCLOUD/repos/confluence-frontend/commits/f003f07e88e1) -
  Internal refactoring to use a shared `@atlaskit/eslint-utils` package
- Updated dependencies

## 0.7.1

### Patch Changes

- [#84413](https://stash.atlassian.com/projects/CONFCLOUD/repos/confluence-frontend/pull-requests/84413)
  [`2860b53c90d9`](https://stash.atlassian.com/projects/CONFCLOUD/repos/confluence-frontend/commits/2860b53c90d9) -
  Added eslint rule to block @container queries in css styling

## 0.7.0

### Minor Changes

- [#83454](https://stash.atlassian.com/projects/CONFCLOUD/repos/confluence-frontend/pull-requests/83454)
  [`be8b7ad6ff8e`](https://stash.atlassian.com/projects/CONFCLOUD/repos/confluence-frontend/commits/be8b7ad6ff8e) -
  Remove name autofixer from `consistent-css-prop-usage`. Variables for css / xcss / cssMap
  functions will no longer be required to end with "Styles".

  [BREAKING] Some rule options have been changed:

  - `fixNamesOnly` and `autoFixNames` have been removed, as there is no longer an autofixer that
    enforces variable names.
    - If you use `fixNamesOnly: true`, we recommend switching to using `autoFix: false`.
    - Users of the `autoFixNames` option should remove this from their configuration.
  - `autoFix` option has been added. This controls whether the remaining autofixers should run or
    not (e.g. hoisting `css` function calls, wrapping objects in `css` function calls), and is
    `true` by default.

## 0.6.3

### Patch Changes

- [#83463](https://stash.atlassian.com/projects/CONFCLOUD/repos/confluence-frontend/pull-requests/83463)
  [`fee29cf1335a`](https://stash.atlassian.com/projects/CONFCLOUD/repos/confluence-frontend/commits/fee29cf1335a) -
  Extend convert-props-syntax to Emotion as well as it has a type issue.

## 0.6.2

### Patch Changes

- [#83116](https://stash.atlassian.com/projects/CONFCLOUD/repos/confluence-frontend/pull-requests/83116)
  [`8d4e99057fe0`](https://stash.atlassian.com/projects/CONFCLOUD/repos/confluence-frontend/commits/8d4e99057fe0) -
  Upgrade Typescript from `4.9.5` to `5.4.2`

## 0.6.1

### Patch Changes

- [#80129](https://stash.atlassian.com/projects/CONFCLOUD/repos/confluence-frontend/pull-requests/80129)
  [`dc0ce9161fc1`](https://stash.atlassian.com/projects/CONFCLOUD/repos/confluence-frontend/commits/dc0ce9161fc1) -
  Add `convert-prop-syntax` to convert invalid `styled-components` props syntax to valid
  `styled-components` props syntax.
- [#79686](https://stash.atlassian.com/projects/CONFCLOUD/repos/confluence-frontend/pull-requests/79686)
  [`7dc7cf06a8b9`](https://stash.atlassian.com/projects/CONFCLOUD/repos/confluence-frontend/commits/7dc7cf06a8b9) -
  Bump @compiled/react to v0.17.0

## 0.6.0

### Minor Changes

- [#81459](https://stash.atlassian.com/projects/CONFCLOUD/repos/confluence-frontend/pull-requests/81459)
  [`08abd3b15614`](https://stash.atlassian.com/projects/CONFCLOUD/repos/confluence-frontend/commits/08abd3b15614) -
  Adds `no-classname-prop` rule which prevents the use of `className` in JSX.

## 0.5.2

### Patch Changes

- [#81702](https://stash.atlassian.com/projects/CONFCLOUD/repos/confluence-frontend/pull-requests/81702)
  [`04e7850f449c`](https://stash.atlassian.com/projects/CONFCLOUD/repos/confluence-frontend/commits/04e7850f449c) -
  Adding a missing LICENSE for this package, updating from "UNLICENSED" to make it clear this is
  available for use.

## 0.5.1

### Patch Changes

- [#81166](https://stash.atlassian.com/projects/CONFCLOUD/repos/confluence-frontend/pull-requests/81166)
  [`a249a1bd29a6`](https://stash.atlassian.com/projects/CONFCLOUD/repos/confluence-frontend/commits/a249a1bd29a6) -
  Upgrade ESLint to version 8

## 0.5.0

### Minor Changes

- [#80523](https://stash.atlassian.com/projects/CONFCLOUD/repos/confluence-frontend/pull-requests/80523)
  [`1fbc903e5b7b`](https://stash.atlassian.com/projects/CONFCLOUD/repos/confluence-frontend/commits/1fbc903e5b7b) -
  Adds `no-important-styles` rule which prevents the use of `!important` flags in style
  declarations.

## 0.4.1

### Patch Changes

- [#76885](https://stash.atlassian.com/projects/CONFCLOUD/repos/confluence-frontend/pull-requests/76885)
  [`06030bc18dd4`](https://stash.atlassian.com/projects/CONFCLOUD/repos/confluence-frontend/commits/06030bc18dd4) -
  Disable `styled-components` handling for `no-styled-tagged-template-expression` rule, due to edge
  case where props are converted to output that fails typechecking.

## 0.4.0

### Minor Changes

- [#75600](https://stash.atlassian.com/projects/CONFCLOUD/repos/confluence-frontend/pull-requests/75600)
  [`8875d9de2e5d`](https://stash.atlassian.com/projects/CONFCLOUD/repos/confluence-frontend/commits/8875d9de2e5d) -
  Migrates the ESLint rule from `@atlaskit/design-system/local-cx-xcss` to
  `@atlaskit/ui-styling-standard/local-cx-xcss` and overhauls the codegen to enable better
  documentation and rule distribution.

## 0.3.0

### Minor Changes

- [#74981](https://stash.atlassian.com/projects/CONFCLOUD/repos/confluence-frontend/pull-requests/74981)
  [`842300de03a1`](https://stash.atlassian.com/projects/CONFCLOUD/repos/confluence-frontend/commits/842300de03a1) -
  Add the following rules:

  - `consistent-css-prop-usage`: Ensures consistency with `css` and `xcss` prop usages
  - `no-empty-styled-expression`: Forbids any styled expression to be used when passing empty
    arguments to styled.div() (or other JSX elements).
  - `no-exported-css`: Forbid exporting `css` function calls.
  - `no-exported-keyframes`: Forbid exporting `keyframes` function calls.
  - `no-invalid-css-map`: Checks the validity of a CSS map created through cssMap.

- [#72983](https://stash.atlassian.com/projects/CONFCLOUD/repos/confluence-frontend/pull-requests/72983)
  [`878065bfc4c0`](https://stash.atlassian.com/projects/CONFCLOUD/repos/confluence-frontend/commits/878065bfc4c0) -
  Adds the following rules to the recommended preset:

  - `@atlaskit/design-system/no-css-tagged-template-expression`
  - `@atlaskit/design-system/no-keyframes-tagged-template-expression`
  - `@atlaskit/design-system/no-styled-tagged-template-expression`

### Patch Changes

- [#75152](https://stash.atlassian.com/projects/CONFCLOUD/repos/confluence-frontend/pull-requests/75152)
  [`c16a175d372b`](https://stash.atlassian.com/projects/CONFCLOUD/repos/confluence-frontend/commits/c16a175d372b) -
  Change 'error' to 'warn' to unbreak AFM platform

## 0.2.1

### Patch Changes

- [#71319](https://stash.atlassian.com/projects/CONFCLOUD/repos/confluence-frontend/pull-requests/71319)
  [`d716e2b5e102`](https://stash.atlassian.com/projects/CONFCLOUD/repos/confluence-frontend/commits/d716e2b5e102) -
  Ensures all dependencies are properly defined

## 0.2.0

### Minor Changes

- [#69723](https://stash.atlassian.com/projects/CONFCLOUD/repos/confluence-frontend/pull-requests/69723)
  [`06cd0f04fefb`](https://stash.atlassian.com/projects/CONFCLOUD/repos/confluence-frontend/commits/06cd0f04fefb) -
  Adds the following rules to the recommended config:

  - `local-cx-xcss` - Ensures the `cx()` function is only used within the `xcss` prop
  - `no-supress-xcss` - Disallows supressing type violations when using the `xcss` prop
  - `no-js-xcss` - Disallows using `xcss` prop inside JavaScript files

## 0.1.0

### Minor Changes

- [#63960](https://stash.atlassian.com/projects/CONFCLOUD/repos/confluence-frontend/pull-requests/63960)
  [`8e3774cada83`](https://stash.atlassian.com/projects/CONFCLOUD/repos/confluence-frontend/commits/8e3774cada83) -
  Created the design system styling standard package
