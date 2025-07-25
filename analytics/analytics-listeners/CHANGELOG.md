# @atlaskit/analytics-listeners

## 9.0.2

### Patch Changes

- [#174338](https://bitbucket.org/atlassian/atlassian-frontend-monorepo/pull-requests/174338)
  [`8e0f35b2c60f3`](https://bitbucket.org/atlassian/atlassian-frontend-monorepo/commits/8e0f35b2c60f3) -
  Add omni channel analytics listner and namespaced context
- Updated dependencies

## 9.0.1

### Patch Changes

- [#144757](https://bitbucket.org/atlassian/atlassian-frontend-monorepo/pull-requests/144757)
  [`a2a3467950054`](https://bitbucket.org/atlassian/atlassian-frontend-monorepo/commits/a2a3467950054) -
  Add Track Event to process-event for 'navigation' channel

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

## 8.15.0

### Minor Changes

- [#113352](https://stash.atlassian.com/projects/CONFCLOUD/repos/confluence-frontend/pull-requests/113352)
  [`f54cef561a5a2`](https://stash.atlassian.com/projects/CONFCLOUD/repos/confluence-frontend/commits/f54cef561a5a2) -
  Add edition awareness analytics listener support

### Patch Changes

- Updated dependencies

## 8.14.0

### Minor Changes

- [#109060](https://stash.atlassian.com/projects/CONFCLOUD/repos/confluence-frontend/pull-requests/109060)
  [`4660ec858a305`](https://stash.atlassian.com/projects/CONFCLOUD/repos/confluence-frontend/commits/4660ec858a305) -
  Update `React` from v16 to v18

### Patch Changes

- Updated dependencies

## 8.13.1

### Patch Changes

- [#182077](https://stash.atlassian.com/projects/CONFCLOUD/repos/confluence-frontend/pull-requests/182077)
  [`efe589f6d9ed0`](https://stash.atlassian.com/projects/CONFCLOUD/repos/confluence-frontend/commits/efe589f6d9ed0) -
  (internal) Minor code changes; updated tests to be compatible with SWC transpilation

## 8.13.0

### Minor Changes

- [#167243](https://stash.atlassian.com/projects/CONFCLOUD/repos/confluence-frontend/pull-requests/167243)
  [`e96979b15083b`](https://stash.atlassian.com/projects/CONFCLOUD/repos/confluence-frontend/commits/e96979b15083b) -
  Add non privacy safe attributes to the media analytics listenr, so they get passed along if they
  were included.

## 8.12.0

### Minor Changes

- [#168042](https://stash.atlassian.com/projects/CONFCLOUD/repos/confluence-frontend/pull-requests/168042)
  [`8664a030292cc`](https://stash.atlassian.com/projects/CONFCLOUD/repos/confluence-frontend/commits/8664a030292cc) -
  Adding analytics context to attributes for AVP listener

## 8.11.1

### Patch Changes

- [#141583](https://stash.atlassian.com/projects/CONFCLOUD/repos/confluence-frontend/pull-requests/141583)
  [`2573c7152094d`](https://stash.atlassian.com/projects/CONFCLOUD/repos/confluence-frontend/commits/2573c7152094d) -
  Package.json dependecies update

## 8.11.0

### Minor Changes

- [#127511](https://stash.atlassian.com/projects/CONFCLOUD/repos/confluence-frontend/pull-requests/127511)
  [`db30e29344013`](https://stash.atlassian.com/projects/CONFCLOUD/repos/confluence-frontend/commits/db30e29344013) -
  Widening range of `react` and `react-dom` peer dependencies from `^16.8.0 || ^17.0.0 || ~18.2.0`
  to the wider range of ``^16.8.0 || ^17.0.0 || ^18.0.0` (where applicable).

  This change has been done to enable usage of `react@18.3` as well as to have a consistent peer
  dependency range for `react` and `react-dom` for `/platform` packages.

### Patch Changes

- Updated dependencies

## 8.10.2

### Patch Changes

- Updated dependencies

## 8.10.1

### Patch Changes

- [#121046](https://stash.atlassian.com/projects/CONFCLOUD/repos/confluence-frontend/pull-requests/121046)
  [`06f31de41af3a`](https://stash.atlassian.com/projects/CONFCLOUD/repos/confluence-frontend/commits/06f31de41af3a) -
  Upgrading react version to 18

## 8.10.0

### Minor Changes

- [#110672](https://stash.atlassian.com/projects/CONFCLOUD/repos/confluence-frontend/pull-requests/110672)
  [`0bfa2aa17a833`](https://stash.atlassian.com/projects/CONFCLOUD/repos/confluence-frontend/commits/0bfa2aa17a833) -
  Add AVP analytics listener and namespaced context

### Patch Changes

- Updated dependencies

## 8.9.2

### Patch Changes

- [#83116](https://stash.atlassian.com/projects/CONFCLOUD/repos/confluence-frontend/pull-requests/83116)
  [`8d4e99057fe0`](https://stash.atlassian.com/projects/CONFCLOUD/repos/confluence-frontend/commits/8d4e99057fe0) -
  Upgrade Typescript from `4.9.5` to `5.4.2`

## 8.9.1

### Patch Changes

- [#67410](https://stash.atlassian.com/projects/CONFCLOUD/repos/confluence-frontend/pull-requests/67410)
  [`155e3b00ce67`](https://stash.atlassian.com/projects/CONFCLOUD/repos/confluence-frontend/commits/155e3b00ce67) -
  Migrate @atlaskit/analytics-listeners to use declarative entry points

## 8.9.0

### Minor Changes

- [#66015](https://stash.atlassian.com/projects/CONFCLOUD/repos/confluence-frontend/pull-requests/66015)
  [`fc1f1eafbc0d`](https://stash.atlassian.com/projects/CONFCLOUD/repos/confluence-frontend/commits/fc1f1eafbc0d) -
  Add AI Mate analytics listener and namespaced context

### Patch Changes

- Updated dependencies

## 8.8.0

### Minor Changes

- [#65162](https://stash.atlassian.com/projects/CONFCLOUD/repos/confluence-frontend/pull-requests/65162)
  [`8374b2b32c18`](https://stash.atlassian.com/projects/CONFCLOUD/repos/confluence-frontend/commits/8374b2b32c18) -
  Add PostOffice analytics listener and namespaced context

### Patch Changes

- Updated dependencies

## 8.7.5

### Patch Changes

- [#39338](https://bitbucket.org/atlassian/atlassian-frontend/pull-requests/39338)
  [`b954b88b600`](https://bitbucket.org/atlassian/atlassian-frontend/commits/b954b88b600) - Enrol
  packages to push model

## 8.7.4

### Patch Changes

- [#38162](https://bitbucket.org/atlassian/atlassian-frontend/pull-requests/38162)
  [`fd6bb9c9184`](https://bitbucket.org/atlassian/atlassian-frontend/commits/fd6bb9c9184) - Delete
  version.json

## 8.7.3

### Patch Changes

- [#37925](https://bitbucket.org/atlassian/atlassian-frontend/pull-requests/37925)
  [`f01deb5e6ab`](https://bitbucket.org/atlassian/atlassian-frontend/commits/f01deb5e6ab) - Use
  injected env vars instead of version.json

## 8.7.2

### Patch Changes

- [#33793](https://bitbucket.org/atlassian/atlassian-frontend/pull-requests/33793)
  [`9d00501a414`](https://bitbucket.org/atlassian/atlassian-frontend/commits/9d00501a414) - Ensure
  legacy types are published for TS 4.5-4.8

## 8.7.1

### Patch Changes

- [#33649](https://bitbucket.org/atlassian/atlassian-frontend/pull-requests/33649)
  [`41fae2c6f68`](https://bitbucket.org/atlassian/atlassian-frontend/commits/41fae2c6f68) - Upgrade
  Typescript from `4.5.5` to `4.9.5`

## 8.7.0

### Minor Changes

- [#33258](https://bitbucket.org/atlassian/atlassian-frontend/pull-requests/33258)
  [`56507598609`](https://bitbucket.org/atlassian/atlassian-frontend/commits/56507598609) - Skip
  minor dependency bump

### Patch Changes

- Updated dependencies

## 8.6.1

### Patch Changes

- [#32117](https://bitbucket.org/atlassian/atlassian-frontend/pull-requests/32117)
  [`0593ff2722e`](https://bitbucket.org/atlassian/atlassian-frontend/commits/0593ff2722e) - CUI-26:
  inherit attributes from contexts in crossFlow channel

## 8.6.0

### Minor Changes

- [#32042](https://bitbucket.org/atlassian/atlassian-frontend/pull-requests/32042)
  [`adde244c8b4`](https://bitbucket.org/atlassian/atlassian-frontend/commits/adde244c8b4) - CUI-24:
  set namespaces based on the context for crossFlow channel

## 8.5.1

### Patch Changes

- Updated dependencies

## 8.5.0

### Minor Changes

- [#28452](https://bitbucket.org/atlassian/atlassian-frontend/pull-requests/28452)
  [`e8ee5a82bf4`](https://bitbucket.org/atlassian/atlassian-frontend/commits/e8ee5a82bf4) - First
  draft of discovery-analytics, type definitions and APIs, and implement fire viewed and clicked
  events. Add new listener for crossFlow.

## 8.4.0

### Minor Changes

- [#28780](https://bitbucket.org/atlassian/atlassian-frontend/pull-requests/28780)
  [`5968718f21e`](https://bitbucket.org/atlassian/atlassian-frontend/commits/5968718f21e) - Added
  linkingPlatform listener

### Patch Changes

- Updated dependencies

## 8.3.2

### Patch Changes

- [#24874](https://bitbucket.org/atlassian/atlassian-frontend/pull-requests/24874)
  [`8cc2f888c83`](https://bitbucket.org/atlassian/atlassian-frontend/commits/8cc2f888c83) - Upgrade
  Typescript from `4.3.5` to `4.5.5`

## 8.3.1

### Patch Changes

- [#24492](https://bitbucket.org/atlassian/atlassian-frontend/pull-requests/24492)
  [`8d4228767b0`](https://bitbucket.org/atlassian/atlassian-frontend/commits/8d4228767b0) - Upgrade
  Typescript from `4.2.4` to `4.3.5`.

## 8.3.0

### Minor Changes

- [#22842](https://bitbucket.org/atlassian/atlassian-frontend/pull-requests/22842)
  [`b6c9baebdf9`](https://bitbucket.org/atlassian/atlassian-frontend/commits/b6c9baebdf9) - Add
  Atlas analytics listener

### Patch Changes

- Updated dependencies

## 8.2.1

### Patch Changes

- [#20650](https://bitbucket.org/atlassian/atlassian-frontend/pull-requests/20650)
  [`cb2392f6d33`](https://bitbucket.org/atlassian/atlassian-frontend/commits/cb2392f6d33) - Upgrade
  to TypeScript 4.2.4

## 8.2.0

### Minor Changes

- [#18423](https://bitbucket.org/atlassian/atlassian-frontend/pull-requests/18423)
  [`a21e53776ff`](https://bitbucket.org/atlassian/atlassian-frontend/commits/a21e53776ff) - Added a
  recentWork channel

### Patch Changes

- Updated dependencies

## 8.1.3

### Patch Changes

- [#17475](https://bitbucket.org/atlassian/atlassian-frontend/pull-requests/17475)
  [`c55c736ecea`](https://bitbucket.org/atlassian/atlassian-frontend/commits/c55c736ecea) - Patch
  VULN AFP-3486 AFP-3487 AFP-3488 AFP-3489

## 8.1.2

### Patch Changes

- [#10230](https://bitbucket.org/atlassian/atlassian-frontend/pull-requests/10230)
  [`db441ee18c3`](https://bitbucket.org/atlassian/atlassian-frontend/commits/db441ee18c3) - Handle
  localStorage and sessionStorage safely

## 8.1.1

### Patch Changes

- [#9796](https://bitbucket.org/atlassian/atlassian-frontend/pull-requests/9796)
  [`5942bf3060c`](https://bitbucket.org/atlassian/atlassian-frontend/commits/5942bf3060c) - Pass
  containerId through in atlaskit listener

## 8.1.0

### Minor Changes

- [#9555](https://bitbucket.org/atlassian/atlassian-frontend/pull-requests/9555)
  [`1ecfe397c00`](https://bitbucket.org/atlassian/atlassian-frontend/commits/1ecfe397c00) - Added a
  notification channel

### Patch Changes

- Updated dependencies

## 8.0.0

### Major Changes

- [#8644](https://bitbucket.org/atlassian/atlassian-frontend/pull-requests/8644)
  [`d59eaef1c0d`](https://bitbucket.org/atlassian/atlassian-frontend/commits/d59eaef1c0d) - Changes
  in MediaAnalyticsListener's processEvent(): not using namespace context anymore, AnalyticsContext
  will be solely used for retrieving packageName&version and computing packageHierarchy

### Patch Changes

- [`4f1d3a6b22a`](https://bitbucket.org/atlassian/atlassian-frontend/commits/4f1d3a6b22a) -
  Refactored Media Analytics Namespaced Context (now delivered by our HOC in media-common)
- Updated dependencies

## 7.0.6

### Patch Changes

- [#5857](https://bitbucket.org/atlassian/atlassian-frontend/pull-requests/5857)
  [`d3265f19be`](https://bitbucket.org/atlassian/atlassian-frontend/commits/d3265f19be) - Transpile
  packages using babel rather than tsc

## 7.0.5

### Patch Changes

- [#5497](https://bitbucket.org/atlassian/atlassian-frontend/pull-requests/5497)
  [`5f58283e1f`](https://bitbucket.org/atlassian/atlassian-frontend/commits/5f58283e1f) - Export
  types using Typescript's new "export type" syntax to satisfy Typescript's --isolatedModules
  compiler option. This requires version 3.8 of Typescript, read more about how we handle Typescript
  versions here: https://atlaskit.atlassian.com/get-started Also add `typescript` to
  `devDependencies` to denote version that the package was built with.

## 7.0.4

### Patch Changes

- Updated dependencies

## 7.0.3

### Patch Changes

- [#3885](https://bitbucket.org/atlassian/atlassian-frontend/pull-requests/3885)
  [`6c525a8229`](https://bitbucket.org/atlassian/atlassian-frontend/commits/6c525a8229) - Upgraded
  to TypeScript 3.9.6 and tslib to 2.0.0

  Since tslib is a dependency for all our packages we recommend that products also follow this tslib
  upgrade to prevent duplicates of tslib being bundled.

## 7.0.2

### Patch Changes

- [#3823](https://bitbucket.org/atlassian/atlassian-frontend/pull-requests/3823)
  [`bb931c93a4`](https://bitbucket.org/atlassian/atlassian-frontend/commits/bb931c93a4) - Make it
  possible to override package version and name with the analytic payload
- Updated dependencies

## 7.0.1

### Patch Changes

- [#3226](https://bitbucket.org/atlassian/atlassian-frontend/pull-requests/3226)
  [`0c532edf6e`](https://bitbucket.org/atlassian/atlassian-frontend/commits/0c532edf6e) - Use the
  'lodash' package instead of single-function 'lodash.\*' packages

## 7.0.0

### Major Changes

- [#3335](https://bitbucket.org/atlassian/atlassian-frontend/pull-requests/3335)
  [`87f4720f27`](https://bitbucket.org/atlassian/atlassian-frontend/commits/87f4720f27) - Officially
  dropping IE11 support, from this version onwards there are no warranties of the package working in
  IE11. For more information see:
  https://community.developer.atlassian.com/t/atlaskit-to-drop-support-for-internet-explorer-11-from-1st-july-2020/39534

### Patch Changes

- Updated dependencies

## 6.4.1

### Patch Changes

- [#3426](https://bitbucket.org/atlassian/atlassian-frontend/pull-requests/3426)
  [`3f39ac93a6`](https://bitbucket.org/atlassian/atlassian-frontend/commits/3f39ac93a6) - Allow
  track events on peopleTeams analytics channel

## 6.4.0

### Minor Changes

- [#2831](https://bitbucket.org/atlassian/atlassian-frontend/pull-requests/2831)
  [`f895125071`](https://bitbucket.org/atlassian/atlassian-frontend/commits/f895125071) - Add new
  analytics channel "peopleTeams"

### Patch Changes

- Updated dependencies

## 6.3.0

### Minor Changes

- [minor][11ff95c0f0](https://bitbucket.org/atlassian/atlassian-frontend/commits/11ff95c0f0):

  Using media api region in analytics events-
  [minor][69b678b38c](https://bitbucket.org/atlassian/atlassian-frontend/commits/69b678b38c):

  Refactor media analytics listener to properly include context data. Add and use new media
  namespace analytics context in MediaCard

### Patch Changes

- [patch][ae426d5e97](https://bitbucket.org/atlassian/atlassian-frontend/commits/ae426d5e97):

  Update FabricEditorListener to leverage new `editor` analytics tag, as it's now treated as a
  platform team. Adds support for passing through multiple tags. Sends both `editor` and the legacy
  `fabricEditor` tags.- Updated dependencies
  [168b5f90e5](https://bitbucket.org/atlassian/atlassian-frontend/commits/168b5f90e5):

- Updated dependencies
  [109004a98e](https://bitbucket.org/atlassian/atlassian-frontend/commits/109004a98e):
- Updated dependencies
  [69b678b38c](https://bitbucket.org/atlassian/atlassian-frontend/commits/69b678b38c):
  - @atlaskit/docs@8.5.1
  - @atlaskit/analytics-next@6.3.6
  - @atlaskit/button@13.3.10
  - @atlaskit/analytics-namespaced-context@4.2.0

## 6.2.4

### Patch Changes

- [patch][c1992227dc](https://bitbucket.org/atlassian/atlassian-frontend/commits/c1992227dc):

  Bump to lodash.merge to 4.6.2

## 6.2.3

### Patch Changes

- [patch][6548261c9a](https://bitbucket.org/atlassian/atlassian-frontend/commits/6548261c9a):

  Remove namespace imports from React, ReactDom, and PropTypes- Updated dependencies
  [6548261c9a](https://bitbucket.org/atlassian/atlassian-frontend/commits/6548261c9a):

  - @atlaskit/docs@8.3.2
  - @atlaskit/analytics-next@6.3.5
  - @atlaskit/button@13.3.7
  - @atlaskit/analytics-gas-types@4.0.13
  - @atlaskit/analytics-namespaced-context@4.1.11

## 6.2.2

### Patch Changes

- [patch][35d2229b2a](https://bitbucket.org/atlassian/atlaskit-mk-2/commits/35d2229b2a):

  Adding missing license to packages and update to Copyright 2019 Atlassian Pty Ltd.

## 6.2.1

### Patch Changes

- [patch][a2d0043716](https://bitbucket.org/atlassian/atlaskit-mk-2/commits/a2d0043716):

  Updated version of analytics-next to fix potential incompatibilities with TS 3.6

## 6.2.0

### Minor Changes

- [minor][af72468517](https://bitbucket.org/atlassian/atlaskit-mk-2/commits/af72468517):

  Media card now emit analytics events which payload and context stuctures reflect GASv3 payload
  specification. Media Analytics Listener merges Payload and Context data before sending it to the
  backend. The merge is based on attributes.packageName equality Media Analytics Listener adds
  packageHierarchy attribute to merged payload, the same way Atlaskit Listener does.

## 6.1.7

### Patch Changes

- [patch][097b696613](https://bitbucket.org/atlassian/atlaskit-mk-2/commits/097b696613):

  Components now depend on TS 3.6 internally, in order to fix an issue with TS resolving
  non-relative imports as relative imports

## 6.1.6

### Patch Changes

- [patch][ecca4d1dbb](https://bitbucket.org/atlassian/atlaskit-mk-2/commits/ecca4d1dbb):

  Upgraded Typescript to 3.3.x

## 6.1.5

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

## 6.1.4

### Patch Changes

- [patch][9f8ab1084b](https://bitbucket.org/atlassian/atlaskit-mk-2/commits/9f8ab1084b):

  Consume analytics-next ts type definitions as an ambient declaration.

## 6.1.3

### Patch Changes

- [patch][bbff8a7d87](https://bitbucket.org/atlassian/atlaskit-mk-2/commits/bbff8a7d87):

  Fixes bug, missing version.json file

## 6.1.2

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

## 6.1.1

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

## 6.1.0

- [minor][f53003a5ed](https://bitbucket.org/atlassian/atlaskit-mk-2/commits/f53003a5ed):

  - ED-6741 Add 'appearance' to all editor analytics events

## 6.0.0

- [major][7c17b35107](https://bitbucket.org/atlassian/atlaskit-mk-2/commits/7c17b35107):

  - Updates react and react-dom peer dependencies to react@^16.8.0 and react-dom@^16.8.0. To use
    this package, please ensure you use at least this version of react and react-dom.

## 5.0.5

- [patch][0a4ccaafae](https://bitbucket.org/atlassian/atlaskit-mk-2/commits/0a4ccaafae):

  - Bump tslib

## 5.0.4

- [patch][3f28e6443c](https://bitbucket.org/atlassian/atlaskit-mk-2/commits/3f28e6443c):

  - @atlaskit/analytics-next-types is deprecated. Now you can use types for @atlaskit/analytics-next
    supplied from itself.

## 5.0.3

- Updated dependencies
  [1e826b2966](https://bitbucket.org/atlassian/atlaskit-mk-2/commits/1e826b2966):
  - @atlaskit/docs@7.0.2
  - @atlaskit/analytics-next@4.0.3
  - @atlaskit/button@12.0.0

## 5.0.2

- [patch][d13fad66df](https://bitbucket.org/atlassian/atlaskit-mk-2/commits/d13fad66df):

  - Enable esModuleInterop for typescript, this allows correct use of default exports

## 5.0.1

- [patch][1bcaa1b991](https://bitbucket.org/atlassian/atlaskit-mk-2/commits/1bcaa1b991):

  - Add npmignore for index.ts to prevent some jest tests from resolving that instead of index.js

## 5.0.0

- [major][9d5cc39394](https://bitbucket.org/atlassian/atlaskit-mk-2/commits/9d5cc39394):

  - Dropped ES5 distributables from the typescript packages

## 4.2.1

- Updated dependencies
  [76299208e6](https://bitbucket.org/atlassian/atlaskit-mk-2/commits/76299208e6):
  - @atlaskit/button@10.1.3
  - @atlaskit/analytics-gas-types@3.2.5
  - @atlaskit/analytics-namespaced-context@2.2.1
  - @atlaskit/docs@7.0.0
  - @atlaskit/analytics-next@4.0.0

## 4.2.0

- [minor][8c65a38bfc](https://bitbucket.org/atlassian/atlaskit-mk-2/commits/8c65a38bfc):

  - enable noImplicitAny for elements analytics packages. Fix related issues.

## 4.1.5

- [patch][a3b8046](https://bitbucket.org/atlassian/atlaskit-mk-2/commits/a3b8046):

  - Add more specific types to analytics-listener webclient type

## 4.1.4

- Updated dependencies [58b84fa](https://bitbucket.org/atlassian/atlaskit-mk-2/commits/58b84fa):
  - @atlaskit/analytics-next@3.1.2
  - @atlaskit/button@10.1.1
  - @atlaskit/analytics-gas-types@3.2.3
  - @atlaskit/analytics-namespaced-context@2.1.5
  - @atlaskit/docs@6.0.0

## 4.1.3

- [patch][dff4f0e](https://bitbucket.org/atlassian/atlaskit-mk-2/commits/dff4f0e):

  - AnalyticsListeners should accept any promise-like client

## 4.1.2

- [patch][e981882](https://bitbucket.org/atlassian/atlaskit-mk-2/commits/e981882):

  - Add media tag to analytics tags sent by media listener

## 4.1.1

- Updated dependencies [6998f11](https://bitbucket.org/atlassian/atlaskit-mk-2/commits/6998f11):
  - @atlaskit/docs@5.2.1
  - @atlaskit/analytics-next@3.1.1
  - @atlaskit/button@10.0.0
  - @atlaskit/analytics-next-types@3.1.2

## 4.1.0

- [minor][dd0a73c](https://bitbucket.org/atlassian/atlaskit-mk-2/commits/dd0a73c):

  - Allow consumers to pass promise of analytics web client as well as the client itself

## 4.0.7

- [patch][1d30f7e](https://bitbucket.org/atlassian/atlaskit-mk-2/commits/1d30f7e):

  - Make analytics-web-client non-mandatory

## 4.0.6

- [patch][c525423](https://bitbucket.org/atlassian/atlaskit-mk-2/commits/c525423" d):

  - Remove unnecessary sufix in import

## 4.0.5

- [patch] Analytics event's 'source' field from GasPayload type is now optional. In most cases, the
  'source' field is expected to be set by the integrator through AnalyticsContext. Thus it's
  recommended that components do not set it to avoid overriding the one provided by the integrating
  product. Analytics listeners are handling the case where the 'source' field couldn't be found by
  setting the default value "unknown" before sending the event through the client.
  [1c0ea95](https://bitbucket.org/atlassian/atlaskit-mk-2/commits/1c0ea95)

## 4.0.4

- [patch] FS-3057 pick fields from context
  [187d175](https://bitbucket.org/atlassian/atlaskit-mk-2/commits/187d175)

## 4.0.3

- [patch] Introduce media analytics listener
  [e7d7ab1](https://bitbucket.org/atlassian/atlaskit-mk-2/commits/e7d7ab1)

## 4.0.2

- [patch] Update TS to 3.0 [f68d367](https://bitbucket.org/atlassian/atlaskit-mk-2/commits/f68d367)

## 4.0.1

- [patch] fixed imports, docs and made GasPayload package attributes optional
  [6be5eed](https://bitbucket.org/atlassian/atlaskit-mk-2/commits/6be5eed)
- [patch] use createAndFire function from analytics-next
  [095f356](https://bitbucket.org/atlassian/atlaskit-mk-2/commits/095f356)
- [patch] Fixed TS errors and code improvements
  [b290312](https://bitbucket.org/atlassian/atlaskit-mk-2/commits/b290312)
- [patch] enable analytics-next TDs on analytics-listeners and analytics-namespaced-context
  [e65f377](https://bitbucket.org/atlassian/atlaskit-mk-2/commits/e65f377)

## 4.0.0

- [patch] fixed async tests and removed redundant componenthelpers
  [3599b88](https://bitbucket.org/atlassian/atlaskit-mk-2/commits/3599b88)
- [patch] Fixed async test expectations
  [b8c167d](https://bitbucket.org/atlassian/atlaskit-mk-2/commits/b8c167d)
- [major] removed promise from FabricAnalyticsListener.client property
  [90ba6bd](https://bitbucket.org/atlassian/atlaskit-mk-2/commits/90ba6bd)

## 3.4.1

- [patch] Fix elements listener listening on wrong channel
  [2b817e1](https://bitbucket.org/atlassian/atlaskit-mk-2/commits/2b817e1)

## 3.4.0

- [minor] Support the screen event type for navigation events
  [20b8844](https://bitbucket.org/atlassian/atlaskit-mk-2/commits/20b8844)

- [none] Updated dependencies
  [20b8844](https://bitbucket.org/atlassian/atlaskit-mk-2/commits/20b8844)
- [patch] Updated dependencies
  [85ddb9e](https://bitbucket.org/atlassian/atlaskit-mk-2/commits/85ddb9e)
  - @atlaskit/analytics-gas-types@3.2.0

## 3.3.1

- [patch] Add next gen analytics to conversation component
  [dfa100e](https://bitbucket.org/atlassian/atlaskit-mk-2/commits/dfa100e)
- [patch] Updated dependencies
  [dfa100e](https://bitbucket.org/atlassian/atlaskit-mk-2/commits/dfa100e)
  - @atlaskit/analytics-namespaced-context@2.1.1

## 3.3.0

- [minor] Update navigation listener to process operational events
  [2d53fc1](https://bitbucket.org/atlassian/atlaskit-mk-2/commits/2d53fc1)
- [none] Updated dependencies
  [2d53fc1](https://bitbucket.org/atlassian/atlaskit-mk-2/commits/2d53fc1)

## 3.2.0

- [minor] Update navigation listener to process NavigationAnalyticsContext
  [808b55b](https://bitbucket.org/atlassian/atlaskit-mk-2/commits/808b55b)

- [none] Updated dependencies
  [808b55b](https://bitbucket.org/atlassian/atlaskit-mk-2/commits/808b55b)
  - @atlaskit/analytics-namespaced-context@2.1.0
- [patch] Updated dependencies
  [89225ce](https://bitbucket.org/atlassian/atlaskit-mk-2/commits/89225ce)
  - @atlaskit/analytics-namespaced-context@2.1.0

## 3.1.1

- [patch] Fix es5 exports of some of the newer modules
  [3f0cd7d](https://bitbucket.org/atlassian/atlaskit-mk-2/commits/3f0cd7d)
- [none] Updated dependencies
  [3f0cd7d](https://bitbucket.org/atlassian/atlaskit-mk-2/commits/3f0cd7d)
  - @atlaskit/analytics-namespaced-context@2.0.3
  - @atlaskit/analytics-gas-types@3.1.3

## 3.1.0

- [minor] Add navigation listener that listens to events fired from within the new
  @atlaskit/navigation-next and @atlaskit/global-navigation packages.
  [fb67997](https://bitbucket.org/atlassian/atlaskit-mk-2/commits/fb67997)
- [minor] Add excludedChannels prop to exclude listeners on certain channels from being rendered.
  This is primarily intended to prevent the events fired on the atlaskit channel from being captured
  so that duplicate events are not sent for atlaskit/core components.
  [d43b8a2](https://bitbucket.org/atlassian/atlaskit-mk-2/commits/d43b8a2)

## 3.0.3

- [patch] Updated dependencies
  [acd86a1](https://bitbucket.org/atlassian/atlaskit-mk-2/commits/acd86a1)
  - @atlaskit/button@9.0.4
  - @atlaskit/analytics-namespaced-context@2.0.2
  - @atlaskit/analytics-next@3.0.3
  - @atlaskit/docs@5.0.2
  - @atlaskit/analytics-gas-types@3.1.2

## 3.0.2

- [patch] Updated dependencies
  [80e90ed](https://bitbucket.org/atlassian/atlaskit-mk-2/commits/80e90ed)
  - @atlaskit/analytics-namespaced-context@2.0.1

## 3.0.1

- [patch] fixes problem caused by source not always being set
  [00b1a71](https://bitbucket.org/atlassian/atlaskit-mk-2/commits/00b1a71)

## 3.0.0

- [major] Updates to React ^16.4.0
  [7edb866](https://bitbucket.org/atlassian/atlaskit-mk-2/commits/7edb866)
- [major] Updated dependencies
  [563a7eb](https://bitbucket.org/atlassian/atlaskit-mk-2/commits/563a7eb)
  - @atlaskit/analytics-next@3.0.0
  - @atlaskit/analytics-namespaced-context@2.0.0
  - @atlaskit/button@9.0.0
  - @atlaskit/docs@5.0.0
  - @atlaskit/analytics-gas-types@3.0.0
- [major] Updated dependencies
  [7edb866](https://bitbucket.org/atlassian/atlaskit-mk-2/commits/7edb866)
  - @atlaskit/analytics-namespaced-context@2.0.0
  - @atlaskit/analytics-next@3.0.0
  - @atlaskit/button@9.0.0
  - @atlaskit/docs@5.0.0
  - @atlaskit/analytics-gas-types@3.0.0

## 2.1.3

- [patch] Move the tests under src and club the tests under unit, integration and visual regression
  [f1a9069](https://bitbucket.org/atlassian/atlaskit-mk-2/commits/f1a9069)
- [none] Updated dependencies
  [f1a9069](https://bitbucket.org/atlassian/atlaskit-mk-2/commits/f1a9069)
  - @atlaskit/analytics-namespaced-context@1.0.3
  - @atlaskit/analytics-gas-types@2.1.4

## 2.1.2

- [patch] Add missing dependencies to packages to get the website to build
  [99446e3](https://bitbucket.org/atlassian/atlaskit-mk-2/commits/99446e3)

- [none] Updated dependencies
  [9c32280](https://bitbucket.org/atlassian/atlaskit-mk-2/commits/9c32280)
  - @atlaskit/analytics-namespaced-context@1.0.2
- [none] Updated dependencies
  [99446e3](https://bitbucket.org/atlassian/atlaskit-mk-2/commits/99446e3)
  - @atlaskit/docs@4.2.2
  - @atlaskit/analytics-namespaced-context@1.0.2
- [none] Updated dependencies
  [9bac948](https://bitbucket.org/atlassian/atlaskit-mk-2/commits/9bac948)
  - @atlaskit/analytics-namespaced-context@1.0.2
  - @atlaskit/docs@4.2.2

## 2.1.1

- [patch] removes requirement of children to be a single React node
  [53cba6b](https://bitbucket.org/atlassian/atlaskit-mk-2/commits/53cba6b)
- [none] Updated dependencies
  [53cba6b](https://bitbucket.org/atlassian/atlaskit-mk-2/commits/53cba6b)
  - @atlaskit/analytics-next@2.1.9

## 2.1.0

- [patch] merge analytics-next context into GAS payload attributes in FabricElementsListener
  [5d25e8b](https://bitbucket.org/atlassian/atlaskit-mk-2/commits/5d25e8b)
- [minor] moved Atlaskit tests from src to **tests**
  [1f78c33](https://bitbucket.org/atlassian/atlaskit-mk-2/commits/1f78c33)

## 2.0.2

- [patch] Clean Changelogs - remove duplicates and empty entries
  [e7756cd](https://bitbucket.org/atlassian/atlaskit-mk-2/commits/e7756cd)
- [none] Updated dependencies
  [e7756cd](https://bitbucket.org/atlassian/atlaskit-mk-2/commits/e7756cd)

## 2.0.1

- [none] Updated dependencies
  [9d20f54](https://bitbucket.org/atlassian/atlaskit-mk-2/commits/9d20f54)
  - @atlaskit/docs@4.1.0
  - @atlaskit/analytics-gas-types@2.1.2
  - @atlaskit/analytics-next@2.1.7

## 2.0.0

- [major] client parameter changed to a Promise in the listeners given Confluence gets the
  AnalyticsWebClient instance asynchronously
  [628e427](https://bitbucket.org/atlassian/atlaskit-mk-2/commits/628e427)

## 1.2.0

- [patch] Throw error on component construction when client prop is missing rather than silently
  failing until an event is fired
  [4bbce97](https://bitbucket.org/atlassian/atlaskit-mk-2/commits/4bbce97)
- [minor] Add some debug/error logging to listener which can be enabled via the logLevel prop
  [191a1ff](https://bitbucket.org/atlassian/atlaskit-mk-2/commits/191a1ff)

## 1.1.1

- [patch] Updated dependencies
  [1e80619](https://bitbucket.org/atlassian/atlaskit-mk-2/commits/1e80619)
  - @atlaskit/analytics-next@2.1.4
  - @atlaskit/docs@4.0.0
  - @atlaskit/analytics-gas-types@2.1.1

## 1.1.0

- [minor] Add listener for events fired by core atlaskit components
  [bcc7d8f](https://bitbucket.org/atlassian/atlaskit-mk-2/commits/bcc7d8f)
- [patch] Updated dependencies
  [9be1db0](https://bitbucket.org/atlassian/atlaskit-mk-2/commits/9be1db0)
  - @atlaskit/analytics-gas-types@2.1.0

## 1.0.2

- [patch] Moved event tag to FabricElementsListener
  [639ae5e](https://bitbucket.org/atlassian/atlaskit-mk-2/commits/639ae5e)

## 1.0.1

- [patch] code improvements [44e55aa](https://bitbucket.org/atlassian/atlaskit-mk-2/commits/44e55aa)
- [patch] added analytics-listeners package
  [8e71e9a](https://bitbucket.org/atlassian/atlaskit-mk-2/commits/8e71e9a)
