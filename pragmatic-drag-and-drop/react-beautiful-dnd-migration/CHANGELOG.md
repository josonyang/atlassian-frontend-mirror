# @atlaskit/pragmatic-drag-and-drop-react-beautiful-dnd-migration

## 0.17.0

### Minor Changes

- [`006a7d12e9a`](https://bitbucket.org/atlassian/atlassian-frontend/commits/006a7d12e9a) - Internal folder name refactor

### Patch Changes

- Updated dependencies

## 0.16.0

### Minor Changes

- [`d25fd8a9056`](https://bitbucket.org/atlassian/atlassian-frontend/commits/d25fd8a9056) - React updates are now batched for React 16. Other optimizations have also been made to reduce the number of re-renders that occur.

## 0.15.0

### Minor Changes

- [`d71c9cef468`](https://bitbucket.org/atlassian/atlassian-frontend/commits/d71c9cef468) - [ux] The cross axis offset of keyboard drag previews is now a fixed value, instead of being percentage-based.

## 0.14.1

### Patch Changes

- Updated dependencies

## 0.14.0

### Minor Changes

- [`f32aef7bfed`](https://bitbucket.org/atlassian/atlassian-frontend/commits/f32aef7bfed) - [ux] Adds a grab cursor when hovering over draggable elements. Also adds other styles provided by the `react-beautiful-dnd` style marshal.

## 0.13.0

### Minor Changes

- [`5e58af07ce8`](https://bitbucket.org/atlassian/atlassian-frontend/commits/5e58af07ce8) - [ux] Entering a droppable from the start will now target the first index instead of the last.

## 0.12.0

### Minor Changes

- [`9909027b163`](https://bitbucket.org/atlassian/atlassian-frontend/commits/9909027b163) - It is now possible to unmount a `<Draggable/>` in a virtual list at any time during a drag operation, including while it is still visible.

## 0.11.0

### Minor Changes

- [`07779f6c5f7`](https://bitbucket.org/atlassian/atlassian-frontend/commits/07779f6c5f7) - Pointer drags are now blocked by interactive elements. This can be overriden using the `disableInteractiveElementBlocking` prop. This behavior is consistent with `react-beautiful-dnd`.

## 0.10.0

### Minor Changes

- [`245cc4ba6c3`](https://bitbucket.org/atlassian/atlassian-frontend/commits/245cc4ba6c3) - [ux] Drags will no longer start while holding down a modifier key.
  This change was done in order to match react-beautiful-dnd behaviour.

## 0.9.1

### Patch Changes

- [`61cb5313358`](https://bitbucket.org/atlassian/atlassian-frontend/commits/61cb5313358) - Removing unused dependencies and dev dependencies

## 0.9.0

### Minor Changes

- [`541c0511010`](https://bitbucket.org/atlassian/atlassian-frontend/commits/541c0511010) - [ux] Dragging elements are now slightly transparent, to allow better visibility of drop indicators. This also better aligns with native browser drag previews.

## 0.8.0

### Minor Changes

- [`1af8b676f81`](https://bitbucket.org/atlassian/atlassian-frontend/commits/1af8b676f81) - When starting a keyboard drag, key bindings are now added synchronously. Previously, they were added in a `requestAnimationFrame()` callback.

## 0.7.0

### Minor Changes

- [`a12da51e227`](https://bitbucket.org/atlassian/atlassian-frontend/commits/a12da51e227) - Makes `react-dom` a peer dependency instead of a direct dependency.

## 0.6.0

### Minor Changes

- [`b560a09202a`](https://bitbucket.org/atlassian/atlassian-frontend/commits/b560a09202a) - Fixes a memoization issue, significantly improving rerender performance.

## 0.5.0

### Minor Changes

- [`69c2501037c`](https://bitbucket.org/atlassian/atlassian-frontend/commits/69c2501037c) - Fixes a bug that caused parent scroll containers to jump to the top when returning to the source location during a keyboard drag.

### Patch Changes

- [`9d00501a414`](https://bitbucket.org/atlassian/atlassian-frontend/commits/9d00501a414) - Ensure legacy types are published for TS 4.5-4.8

## 0.4.2

### Patch Changes

- [`41fae2c6f68`](https://bitbucket.org/atlassian/atlassian-frontend/commits/41fae2c6f68) - Upgrade Typescript from `4.5.5` to `4.9.5`

## 0.4.1

### Patch Changes

- [`be8246510ed`](https://bitbucket.org/atlassian/atlassian-frontend/commits/be8246510ed) - Ensures that keyboard drag event bindings are properly cleaned up when a drag is cancelled because of an unhandled error on the window.

## 0.4.0

### Minor Changes

- [`9fd8556db17`](https://bitbucket.org/atlassian/atlassian-frontend/commits/9fd8556db17) - Internal folder name structure change

### Patch Changes

- Updated dependencies

## 0.3.0

### Minor Changes

- [`34ed7b2ec63`](https://bitbucket.org/atlassian/atlassian-frontend/commits/34ed7b2ec63) - We have changed the name of our drag and drop packages to align on the single name of "Pragmatic drag and drop"

  ```diff
  - @atlaskit/drag-and-drop
  + @atlaskit/pragmatic-drag-and-drop

  - @atlaskit/drag-and-drop-autoscroll
  + @atlaskit/pragmatic-drag-and-drop-autoscroll

  - @atlaskit/drag-and-drop-hitbox
  + @atlaskit/pragmatic-drag-and-drop-hitbox

  - @atlaskit/drag-and-drop-indicator
  + @atlaskit/pragmatic-drag-and-drop-react-indicator
  # Note: `react` was added to this package name as our indicator package is designed for usage with `react`.

  - @atlaskit/drag-and-drop-live-region
  + @atlaskit/pragmatic-drag-and-drop-live-region

  - @atlaskit/drag-and-drop-react-beautiful-dnd-migration
  + @atlaskit/pragmatic-drag-and-drop-react-beautiful-dnd-migration

  - @atlaskit/drag-and-drop-docs
  + @atlaskit/pragmatic-drag-and-drop-docs
  ```

  The new `@atlaskit/pragmatic-drag-and-drop*` packages will start their initial versions from where the ``@atlaskit/drag-and-drop*` packages left off. Doing this will make it easier to look back on changelogs and see how the packages have progressed.

### Patch Changes

- Updated dependencies

## 0.2.1

### Patch Changes

- [`16a901a9476`](https://bitbucket.org/atlassian/atlassian-frontend/commits/16a901a9476) - - Fixes a bug that could lead to invalid syntax when inserting comments before
  a `JSXExpressionContainer` node. Comments will now be wrapped in a new
  `JSXExpressionContainer` node.
  - Adds a file filter to the codemod transformers, so that only files which import
    either `react-beautiful-dnd` or `react-beautiful-dnd-next` will be processed.

## 0.2.0

### Minor Changes

- [`56507598609`](https://bitbucket.org/atlassian/atlassian-frontend/commits/56507598609) - Skip minor dependency bump

### Patch Changes

- Updated dependencies

## 0.1.0

### Minor Changes

- [`6be2b5508a9`](https://bitbucket.org/atlassian/atlassian-frontend/commits/6be2b5508a9) - Initial release