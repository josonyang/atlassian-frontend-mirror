# @atlaskit/analytics-namespaced-context

## 7.0.1

### Patch Changes

- [#174338](https://bitbucket.org/atlassian/atlassian-frontend-monorepo/pull-requests/174338)
  [`8e0f35b2c60f3`](https://bitbucket.org/atlassian/atlassian-frontend-monorepo/commits/8e0f35b2c60f3) -
  Add omni channel analytics listner and namespaced context

## 7.0.0

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

## 6.14.0

### Minor Changes

- [#113352](https://stash.atlassian.com/projects/CONFCLOUD/repos/confluence-frontend/pull-requests/113352)
  [`f54cef561a5a2`](https://stash.atlassian.com/projects/CONFCLOUD/repos/confluence-frontend/commits/f54cef561a5a2) -
  Add edition awareness analytics listener support

## 6.13.0

### Minor Changes

- [#109060](https://stash.atlassian.com/projects/CONFCLOUD/repos/confluence-frontend/pull-requests/109060)
  [`4660ec858a305`](https://stash.atlassian.com/projects/CONFCLOUD/repos/confluence-frontend/commits/4660ec858a305) -
  Update `React` from v16 to v18

### Patch Changes

- Updated dependencies

## 6.12.1

### Patch Changes

- [#141583](https://stash.atlassian.com/projects/CONFCLOUD/repos/confluence-frontend/pull-requests/141583)
  [`2573c7152094d`](https://stash.atlassian.com/projects/CONFCLOUD/repos/confluence-frontend/commits/2573c7152094d) -
  Package.json dependecies update

## 6.12.0

### Minor Changes

- [#136348](https://stash.atlassian.com/projects/CONFCLOUD/repos/confluence-frontend/pull-requests/136348)
  [`fb4fb56f1da7c`](https://stash.atlassian.com/projects/CONFCLOUD/repos/confluence-frontend/commits/fb4fb56f1da7c) -
  Add new entry-point for FabricEditorAnalyticsContext.

## 6.11.0

### Minor Changes

- [#127511](https://stash.atlassian.com/projects/CONFCLOUD/repos/confluence-frontend/pull-requests/127511)
  [`db30e29344013`](https://stash.atlassian.com/projects/CONFCLOUD/repos/confluence-frontend/commits/db30e29344013) -
  Widening range of `react` and `react-dom` peer dependencies from `^16.8.0 || ^17.0.0 || ~18.2.0`
  to the wider range of ``^16.8.0 || ^17.0.0 || ^18.0.0` (where applicable).

  This change has been done to enable usage of `react@18.3` as well as to have a consistent peer
  dependency range for `react` and `react-dom` for `/platform` packages.

### Patch Changes

- Updated dependencies

## 6.10.2

### Patch Changes

- Updated dependencies

## 6.10.1

### Patch Changes

- [#121046](https://stash.atlassian.com/projects/CONFCLOUD/repos/confluence-frontend/pull-requests/121046)
  [`06f31de41af3a`](https://stash.atlassian.com/projects/CONFCLOUD/repos/confluence-frontend/commits/06f31de41af3a) -
  Upgrading react version to 18

## 6.10.0

### Minor Changes

- [#110672](https://stash.atlassian.com/projects/CONFCLOUD/repos/confluence-frontend/pull-requests/110672)
  [`0bfa2aa17a833`](https://stash.atlassian.com/projects/CONFCLOUD/repos/confluence-frontend/commits/0bfa2aa17a833) -
  Add AVP analytics listener and namespaced context

## 6.9.2

### Patch Changes

- [#83116](https://stash.atlassian.com/projects/CONFCLOUD/repos/confluence-frontend/pull-requests/83116)
  [`8d4e99057fe0`](https://stash.atlassian.com/projects/CONFCLOUD/repos/confluence-frontend/commits/8d4e99057fe0) -
  Upgrade Typescript from `4.9.5` to `5.4.2`

## 6.9.1

### Patch Changes

- [#80085](https://stash.atlassian.com/projects/CONFCLOUD/repos/confluence-frontend/pull-requests/80085)
  [`7febfed958dd`](https://stash.atlassian.com/projects/CONFCLOUD/repos/confluence-frontend/commits/7febfed958dd) -
  Update usage of `React.FC` to explicity include `children`

## 6.9.0

### Minor Changes

- [#66015](https://stash.atlassian.com/projects/CONFCLOUD/repos/confluence-frontend/pull-requests/66015)
  [`fc1f1eafbc0d`](https://stash.atlassian.com/projects/CONFCLOUD/repos/confluence-frontend/commits/fc1f1eafbc0d) -
  Add AI Mate analytics listener and namespaced context

## 6.8.0

### Minor Changes

- [#65162](https://stash.atlassian.com/projects/CONFCLOUD/repos/confluence-frontend/pull-requests/65162)
  [`8374b2b32c18`](https://stash.atlassian.com/projects/CONFCLOUD/repos/confluence-frontend/commits/8374b2b32c18) -
  Add PostOffice analytics listener and namespaced context

## 6.7.4

### Patch Changes

- [#41325](https://bitbucket.org/atlassian/atlassian-frontend/pull-requests/41325)
  [`5ecc6e21ca8`](https://bitbucket.org/atlassian/atlassian-frontend/commits/5ecc6e21ca8) - Enrol
  @atlaskit/analytics-namespaced-context to push model in JFE.

## 6.7.3

### Patch Changes

- [#38162](https://bitbucket.org/atlassian/atlassian-frontend/pull-requests/38162)
  [`fd6bb9c9184`](https://bitbucket.org/atlassian/atlassian-frontend/commits/fd6bb9c9184) - Delete
  version.json

## 6.7.2

### Patch Changes

- [#33793](https://bitbucket.org/atlassian/atlassian-frontend/pull-requests/33793)
  [`9d00501a414`](https://bitbucket.org/atlassian/atlassian-frontend/commits/9d00501a414) - Ensure
  legacy types are published for TS 4.5-4.8

## 6.7.1

### Patch Changes

- [#33649](https://bitbucket.org/atlassian/atlassian-frontend/pull-requests/33649)
  [`41fae2c6f68`](https://bitbucket.org/atlassian/atlassian-frontend/commits/41fae2c6f68) - Upgrade
  Typescript from `4.5.5` to `4.9.5`

## 6.7.0

### Minor Changes

- [#33258](https://bitbucket.org/atlassian/atlassian-frontend/pull-requests/33258)
  [`56507598609`](https://bitbucket.org/atlassian/atlassian-frontend/commits/56507598609) - Skip
  minor dependency bump

### Patch Changes

- Updated dependencies

## 6.6.1

### Patch Changes

- Updated dependencies

## 6.6.0

### Minor Changes

- [#28780](https://bitbucket.org/atlassian/atlassian-frontend/pull-requests/28780)
  [`f07e3c52271`](https://bitbucket.org/atlassian/atlassian-frontend/commits/f07e3c52271) - Added
  linkingPlatform namespaced context

## 6.5.2

### Patch Changes

- [#24874](https://bitbucket.org/atlassian/atlassian-frontend/pull-requests/24874)
  [`8cc2f888c83`](https://bitbucket.org/atlassian/atlassian-frontend/commits/8cc2f888c83) - Upgrade
  Typescript from `4.3.5` to `4.5.5`

## 6.5.1

### Patch Changes

- [#24492](https://bitbucket.org/atlassian/atlassian-frontend/pull-requests/24492)
  [`8d4228767b0`](https://bitbucket.org/atlassian/atlassian-frontend/commits/8d4228767b0) - Upgrade
  Typescript from `4.2.4` to `4.3.5`.

## 6.5.0

### Minor Changes

- [#22842](https://bitbucket.org/atlassian/atlassian-frontend/pull-requests/22842)
  [`b6c9baebdf9`](https://bitbucket.org/atlassian/atlassian-frontend/commits/b6c9baebdf9) - Add
  Atlas analytics listener

## 6.4.1

### Patch Changes

- [#20650](https://bitbucket.org/atlassian/atlassian-frontend/pull-requests/20650)
  [`cb2392f6d33`](https://bitbucket.org/atlassian/atlassian-frontend/commits/cb2392f6d33) - Upgrade
  to TypeScript 4.2.4

## 6.4.0

### Minor Changes

- [#18423](https://bitbucket.org/atlassian/atlassian-frontend/pull-requests/18423)
  [`a21e53776ff`](https://bitbucket.org/atlassian/atlassian-frontend/commits/a21e53776ff) - Added a
  recentWork channel

## 6.3.0

### Minor Changes

- [#12837](https://bitbucket.org/atlassian/atlassian-frontend/pull-requests/12837)
  [`450a8582760`](https://bitbucket.org/atlassian/atlassian-frontend/commits/450a8582760) - Added
  editor re-render analytics event.

## 6.2.0

### Minor Changes

- [#10569](https://bitbucket.org/atlassian/atlassian-frontend/pull-requests/10569)
  [`4c05694bca8`](https://bitbucket.org/atlassian/atlassian-frontend/commits/4c05694bca8) - Changed
  componentName to renderer in AnalyticsContext.

## 6.1.0

### Minor Changes

- [#9555](https://bitbucket.org/atlassian/atlassian-frontend/pull-requests/9555)
  [`1ecfe397c00`](https://bitbucket.org/atlassian/atlassian-frontend/commits/1ecfe397c00) - Added a
  notification channel

## 6.0.0

### Major Changes

- [#8644](https://bitbucket.org/atlassian/atlassian-frontend/pull-requests/8644)
  [`4f1d3a6b22a`](https://bitbucket.org/atlassian/atlassian-frontend/commits/4f1d3a6b22a) -
  Refactored Media Analytics Namespaced Context (now delivered by our HOC in media-common)

## 5.1.4

### Patch Changes

- [#5857](https://bitbucket.org/atlassian/atlassian-frontend/pull-requests/5857)
  [`d3265f19be`](https://bitbucket.org/atlassian/atlassian-frontend/commits/d3265f19be) - Transpile
  packages using babel rather than tsc

## 5.1.3

### Patch Changes

- [#5497](https://bitbucket.org/atlassian/atlassian-frontend/pull-requests/5497)
  [`5f58283e1f`](https://bitbucket.org/atlassian/atlassian-frontend/commits/5f58283e1f) - Export
  types using Typescript's new "export type" syntax to satisfy Typescript's --isolatedModules
  compiler option. This requires version 3.8 of Typescript, read more about how we handle Typescript
  versions here: https://atlaskit.atlassian.com/get-started Also add `typescript` to
  `devDependencies` to denote version that the package was built with.

## 5.1.2

### Patch Changes

- Updated dependencies

## 5.1.1

### Patch Changes

- [#3885](https://bitbucket.org/atlassian/atlassian-frontend/pull-requests/3885)
  [`6c525a8229`](https://bitbucket.org/atlassian/atlassian-frontend/commits/6c525a8229) - Upgraded
  to TypeScript 3.9.6 and tslib to 2.0.0

  Since tslib is a dependency for all our packages we recommend that products also follow this tslib
  upgrade to prevent duplicates of tslib being bundled.

## 5.1.0

### Minor Changes

- [#3823](https://bitbucket.org/atlassian/atlassian-frontend/pull-requests/3823)
  [`6faafb144c`](https://bitbucket.org/atlassian/atlassian-frontend/commits/6faafb144c) - Introduce
  MediaFeatureFlags. Refactor components to use.

### Patch Changes

- Updated dependencies

## 5.0.1

### Patch Changes

- [#3428](https://bitbucket.org/atlassian/atlassian-frontend/pull-requests/3428)
  [`89df1041d5`](https://bitbucket.org/atlassian/atlassian-frontend/commits/89df1041d5) - Attach
  Media Card Feature Flags to Analytics Events

## 5.0.0

### Major Changes

- [#3335](https://bitbucket.org/atlassian/atlassian-frontend/pull-requests/3335)
  [`87f4720f27`](https://bitbucket.org/atlassian/atlassian-frontend/commits/87f4720f27) - Officially
  dropping IE11 support, from this version onwards there are no warranties of the package working in
  IE11. For more information see:
  https://community.developer.atlassian.com/t/atlaskit-to-drop-support-for-internet-explorer-11-from-1st-july-2020/39534

### Patch Changes

- Updated dependencies

## 4.3.0

### Minor Changes

- [#2831](https://bitbucket.org/atlassian/atlassian-frontend/pull-requests/2831)
  [`f895125071`](https://bitbucket.org/atlassian/atlassian-frontend/commits/f895125071) - Add new
  analytics channel "peopleTeams"

## 4.2.0

### Minor Changes

- [minor][69b678b38c](https://bitbucket.org/atlassian/atlassian-frontend/commits/69b678b38c):

  Refactor media analytics listener to properly include context data. Add and use new media
  namespace analytics context in MediaCard

### Patch Changes

- Updated dependencies
  [168b5f90e5](https://bitbucket.org/atlassian/atlassian-frontend/commits/168b5f90e5):
- Updated dependencies
  [11ff95c0f0](https://bitbucket.org/atlassian/atlassian-frontend/commits/11ff95c0f0):
- Updated dependencies
  [ae426d5e97](https://bitbucket.org/atlassian/atlassian-frontend/commits/ae426d5e97):
- Updated dependencies
  [109004a98e](https://bitbucket.org/atlassian/atlassian-frontend/commits/109004a98e):
- Updated dependencies
  [69b678b38c](https://bitbucket.org/atlassian/atlassian-frontend/commits/69b678b38c):
  - @atlaskit/docs@8.5.1
  - @atlaskit/analytics-listeners@6.3.0
  - @atlaskit/analytics-next@6.3.6

## 4.1.11

### Patch Changes

- [patch][6548261c9a](https://bitbucket.org/atlassian/atlassian-frontend/commits/6548261c9a):

  Remove namespace imports from React, ReactDom, and PropTypes- Updated dependencies
  [6548261c9a](https://bitbucket.org/atlassian/atlassian-frontend/commits/6548261c9a):

  - @atlaskit/docs@8.3.2
  - @atlaskit/analytics-next@6.3.5
  - @atlaskit/analytics-listeners@6.2.3

## 4.1.10

### Patch Changes

- [patch][ae4f336a3a](https://bitbucket.org/atlassian/atlaskit-mk-2/commits/ae4f336a3a):

**FABDODGEM-13 Editor Damask Release** - [Internal post](http://go.atlassian.com/damask-release)

**BREAKING CHANGES**

- **Media:** Removed deprecated "context" property from media components in favor of
  "mediaClientConfig". This affects all public media UI components.
  - https://product-fabric.atlassian.net/browse/MS-2038
- **Tasks & Decisions:** Removed containerAri for task-decisions components.
  - https://product-fabric.atlassian.net/browse/ED-7631
- **Renderer:** Adapts to task-decision changes.
- **Editor Mobile Bridge:** Adapts to task-decision changes.
- **Util Data Test:** Adapts to task-decision changes.

---

**Affected Editor Components:**

tables, media, mobile, emoji, tasks & decisions, analytics

**Editor**

- Support nested actions in stage-0 schema; Change DOM representation of actions
  - https://product-fabric.atlassian.net/browse/ED-7674
- Updated i18n translations
  - https://product-fabric.atlassian.net/browse/ED-7750
- Improved analytics & crash reporting (via a new error boundary)
  - https://product-fabric.atlassian.net/browse/ED-7766
  - https://product-fabric.atlassian.net/browse/ED-7806
- Improvements to heading anchor links.
  - https://product-fabric.atlassian.net/browse/ED-7849
  - https://product-fabric.atlassian.net/browse/ED-7860
- Copy/Paste improvements
  - https://product-fabric.atlassian.net/browse/ED-7840
  - https://product-fabric.atlassian.net/browse/ED-7849
- Fixes for the selection state of Smart links.
  - https://product-fabric.atlassian.net/browse/ED-7602?src=confmacro
- Improvements for table resizing & column creation.
  - https://product-fabric.atlassian.net/browse/ED-7698
  - https://product-fabric.atlassian.net/browse/ED-7319
  - https://product-fabric.atlassian.net/browse/ED-7799

**Mobile**

- GASv3 Analytics Events are now relayed from the web to the native context, ready for dispatching.
  - https://product-fabric.atlassian.net/browse/FM-2502
- Hybrid Renderer Recycler view now handles invalid ADF nodes gracefully.
  - https://product-fabric.atlassian.net/browse/FM-2370

**Media**

- Improved analytics
  - https://product-fabric.atlassian.net/browse/MS-2036
  - https://product-fabric.atlassian.net/browse/MS-2145
  - https://product-fabric.atlassian.net/browse/MS-2416
  - https://product-fabric.atlassian.net/browse/MS-2487
- Added shouldOpenMediaViewer property to renderer
  - https://product-fabric.atlassian.net/browse/MS-2393
- Implemented analytics for file copy
  - https://product-fabric.atlassian.net/browse/MS-2036
- New `media-viewed` event dispatched when media is interacted with via the media card or viewer.
  - https://product-fabric.atlassian.net/browse/MS-2284
- Support for `alt` text attribute on media image elements.
  - https://product-fabric.atlassian.net/browse/ED-7776

**i18n-tools**

Bumped dependencies.

## 4.1.9

### Patch Changes

- [patch][35d2229b2a](https://bitbucket.org/atlassian/atlaskit-mk-2/commits/35d2229b2a):

  Adding missing license to packages and update to Copyright 2019 Atlassian Pty Ltd.

## 4.1.8

### Patch Changes

- [patch][a2d0043716](https://bitbucket.org/atlassian/atlaskit-mk-2/commits/a2d0043716):

  Updated version of analytics-next to fix potential incompatibilities with TS 3.6

## 4.1.7

### Patch Changes

- [patch][097b696613](https://bitbucket.org/atlassian/atlaskit-mk-2/commits/097b696613):

  Components now depend on TS 3.6 internally, in order to fix an issue with TS resolving
  non-relative imports as relative imports

## 4.1.6

### Patch Changes

- [patch][ecca4d1dbb](https://bitbucket.org/atlassian/atlaskit-mk-2/commits/ecca4d1dbb):

  Upgraded Typescript to 3.3.x

## 4.1.5

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

## 4.1.4

### Patch Changes

- [patch][9f8ab1084b](https://bitbucket.org/atlassian/atlaskit-mk-2/commits/9f8ab1084b):

  Consume analytics-next ts type definitions as an ambient declaration.

## 4.1.3

### Patch Changes

- [patch][bbff8a7d87](https://bitbucket.org/atlassian/atlaskit-mk-2/commits/bbff8a7d87):

  Fixes bug, missing version.json file

## 4.1.2

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

## 4.1.1

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

## 4.1.0

- [minor][f53003a5ed](https://bitbucket.org/atlassian/atlaskit-mk-2/commits/f53003a5ed):

  - ED-6741 Add 'appearance' to all editor analytics events

## 4.0.0

- [major][7c17b35107](https://bitbucket.org/atlassian/atlaskit-mk-2/commits/7c17b35107):

  - Updates react and react-dom peer dependencies to react@^16.8.0 and react-dom@^16.8.0. To use
    this package, please ensure you use at least this version of react and react-dom.

## 3.0.3

- [patch][0a4ccaafae](https://bitbucket.org/atlassian/atlaskit-mk-2/commits/0a4ccaafae):

  - Bump tslib

## 3.0.2

- [patch][3f28e6443c](https://bitbucket.org/atlassian/atlaskit-mk-2/commits/3f28e6443c):

  - @atlaskit/analytics-next-types is deprecated. Now you can use types for @atlaskit/analytics-next
    supplied from itself.

## 3.0.1

- [patch][1bcaa1b991](https://bitbucket.org/atlassian/atlaskit-mk-2/commits/1bcaa1b991):

  - Add npmignore for index.ts to prevent some jest tests from resolving that instead of index.js

## 3.0.0

- [major][9d5cc39394](https://bitbucket.org/atlassian/atlaskit-mk-2/commits/9d5cc39394):

  - Dropped ES5 distributables from the typescript packages

## 2.2.1

- Updated dependencies
  [76299208e6](https://bitbucket.org/atlassian/atlaskit-mk-2/commits/76299208e6):
  - @atlaskit/analytics-listeners@4.2.1
  - @atlaskit/docs@7.0.0
  - @atlaskit/analytics-next@4.0.0

## 2.2.0

- [minor][8c65a38bfc](https://bitbucket.org/atlassian/atlaskit-mk-2/commits/8c65a38bfc):

  - enable noImplicitAny for elements analytics packages. Fix related issues.

## 2.1.5

- Updated dependencies [58b84fa](https://bitbucket.org/atlassian/atlaskit-mk-2/commits/58b84fa):
  - @atlaskit/analytics-next@3.1.2
  - @atlaskit/analytics-listeners@4.1.4
  - @atlaskit/docs@6.0.0

## 2.1.4

- [patch] Analytics event's 'source' field from GasPayload type is now optional. In most cases, the
  'source' field is expected to be set by the integrator through AnalyticsContext. Thus it's
  recommended that components do not set it to avoid overriding the one provided by the integrating
  product. Analytics listeners are handling the case where the 'source' field couldn't be found by
  setting the default value "unknown" before sending the event through the client.
  [1c0ea95](https://bitbucket.org/atlassian/atlaskit-mk-2/commits/1c0ea95)

## 2.1.3

- [patch] fixed imports, docs and made GasPayload package attributes optional
  [6be5eed](https://bitbucket.org/atlassian/atlaskit-mk-2/commits/6be5eed)
- [patch] use createAndFire function from analytics-next
  [095f356](https://bitbucket.org/atlassian/atlaskit-mk-2/commits/095f356)
- [patch] Fixed TS errors and code improvements
  [b290312](https://bitbucket.org/atlassian/atlaskit-mk-2/commits/b290312)
- [patch] enable analytics-next TDs on analytics-listeners and analytics-namespaced-context
  [e65f377](https://bitbucket.org/atlassian/atlaskit-mk-2/commits/e65f377)

## 2.1.2

- [patch] Updated dependencies
  [90ba6bd](https://bitbucket.org/atlassian/atlaskit-mk-2/commits/90ba6bd)
  - @atlaskit/analytics-listeners@4.0.0

## 2.1.1

- [patch] Updated dependencies
  [dfa100e](https://bitbucket.org/atlassian/atlaskit-mk-2/commits/dfa100e)
  - @atlaskit/analytics-listeners@3.3.1

## 2.1.0

- [minor] Add NavigationContext component that provides context to events fired on the navigation
  channel [89225ce](https://bitbucket.org/atlassian/atlaskit-mk-2/commits/89225ce)
- [patch] Updated dependencies
  [808b55b](https://bitbucket.org/atlassian/atlaskit-mk-2/commits/808b55b)
  - @atlaskit/analytics-listeners@3.2.0
- [none] Updated dependencies
  [89225ce](https://bitbucket.org/atlassian/atlaskit-mk-2/commits/89225ce)
  - @atlaskit/analytics-listeners@3.2.0

## 2.0.3

- [patch] Fix es5 exports of some of the newer modules
  [3f0cd7d](https://bitbucket.org/atlassian/atlaskit-mk-2/commits/3f0cd7d)
- [none] Updated dependencies
  [3f0cd7d](https://bitbucket.org/atlassian/atlaskit-mk-2/commits/3f0cd7d)
  - @atlaskit/analytics-gas-types@3.1.3

## 2.0.2

- [patch] Updated dependencies
  [acd86a1](https://bitbucket.org/atlassian/atlaskit-mk-2/commits/acd86a1)
  - @atlaskit/button@9.0.4
  - @atlaskit/analytics-next@3.0.3
  - @atlaskit/docs@5.0.2
  - @atlaskit/analytics-gas-types@3.1.2

## 2.0.1

- [patch] fixes problem with modules not being exported
  [80e90ed](https://bitbucket.org/atlassian/atlaskit-mk-2/commits/80e90ed)

## 2.0.0

- [major] Updates to React ^16.4.0
  [7edb866](https://bitbucket.org/atlassian/atlaskit-mk-2/commits/7edb866)
- [major] Updated dependencies
  [563a7eb](https://bitbucket.org/atlassian/atlaskit-mk-2/commits/563a7eb)
  - @atlaskit/analytics-next@3.0.0
  - @atlaskit/button@9.0.0
  - @atlaskit/docs@5.0.0
  - @atlaskit/analytics-gas-types@3.0.0
- [major] Updated dependencies
  [7edb866](https://bitbucket.org/atlassian/atlaskit-mk-2/commits/7edb866)
  - @atlaskit/analytics-next@3.0.0
  - @atlaskit/button@9.0.0
  - @atlaskit/docs@5.0.0
  - @atlaskit/analytics-gas-types@3.0.0

## 1.0.3

- [patch] Move the tests under src and club the tests under unit, integration and visual regression
  [f1a9069](https://bitbucket.org/atlassian/atlaskit-mk-2/commits/f1a9069)
- [none] Updated dependencies
  [f1a9069](https://bitbucket.org/atlassian/atlaskit-mk-2/commits/f1a9069)
  - @atlaskit/analytics-gas-types@2.1.4

## 1.0.2

- [patch] Add missing dependencies to packages to get the website to build
  [9c32280](https://bitbucket.org/atlassian/atlaskit-mk-2/commits/9c32280)

* [none] Updated dependencies
  [99446e3](https://bitbucket.org/atlassian/atlaskit-mk-2/commits/99446e3)
  - @atlaskit/docs@4.2.2
* [none] Updated dependencies
  [9bac948](https://bitbucket.org/atlassian/atlaskit-mk-2/commits/9bac948)
  - @atlaskit/docs@4.2.2

## 1.0.1

- [patch] wrapper for analytics-next AnalyticsContext to add a namespace
  [91e5997](https://bitbucket.org/atlassian/atlaskit-mk-2/commits/91e5997)
