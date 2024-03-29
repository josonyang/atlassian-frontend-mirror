# @atlaskit/pragmatic-drag-and-drop-auto-scroll

## 0.7.0

### Minor Changes

- [#42774](https://bitbucket.org/atlassian/atlassian-frontend/pull-requests/42774) [`66d9475437e`](https://bitbucket.org/atlassian/atlassian-frontend/commits/66d9475437e) - Internal refactoring to improve clarity and safety

## 0.6.0

### Minor Changes

- [#42668](https://bitbucket.org/atlassian/atlassian-frontend/pull-requests/42668) [`0a4e3f44ba3`](https://bitbucket.org/atlassian/atlassian-frontend/commits/0a4e3f44ba3) - We have landed a few fixes for "overflow scrolling"

  - Fix: Time dampening could be incorrectly reset when transitioning from "over element" auto scrolling to "overflow" auto scrolling for certain element configurations.
  - Fix: Parent "overflow scrolling" registrations could prevent overflow scrolling on children elements, if the parent was registered first.
  - Fix: "overflow scrolling" `canScroll() => false` would incorrectly opt out of "overflow scrolling" for younger registrations.

## 0.5.0

### Minor Changes

- [#39935](https://bitbucket.org/atlassian/atlassian-frontend/pull-requests/39935) [`20a91012629`](https://bitbucket.org/atlassian/atlassian-frontend/commits/20a91012629) - First public release of this package. Please refer to documentation for usage and API information.

### Patch Changes

- Updated dependencies

## 0.4.0

### Minor Changes

- [#39303](https://bitbucket.org/atlassian/atlassian-frontend/pull-requests/39303) [`a6d9f3bb566`](https://bitbucket.org/atlassian/atlassian-frontend/commits/a6d9f3bb566) - Adding optional overflow scrolling API. API information shared directly with Trello

## 0.3.2

### Patch Changes

- Updated dependencies

## 0.3.1

### Patch Changes

- Updated dependencies

## 0.3.0

### Minor Changes

- [#38658](https://bitbucket.org/atlassian/atlassian-frontend/pull-requests/38658) [`7803a90e9c6`](https://bitbucket.org/atlassian/atlassian-frontend/commits/7803a90e9c6) - This change makes it so that distance dampening is based on the size of the hitbox and not the container. Now that we clamp the size of the hitbox, our distance dampening needs to be based on the size of the hitbox, and not the container.

## 0.2.0

### Minor Changes

- [#38630](https://bitbucket.org/atlassian/atlassian-frontend/pull-requests/38630) [`5c643ce004d`](https://bitbucket.org/atlassian/atlassian-frontend/commits/5c643ce004d) - Limiting the max size of auto scrolling hitboxes. This prevents large elements having giant auto scroll hitboxes

## 0.1.0

### Minor Changes

- [#38525](https://bitbucket.org/atlassian/atlassian-frontend/pull-requests/38525) [`693af8c5775`](https://bitbucket.org/atlassian/atlassian-frontend/commits/693af8c5775) - Early release of our new optional drag and drop package for Pragmatic drag and drop. Package release is only for early integration with Trello.

### Patch Changes

- Updated dependencies
