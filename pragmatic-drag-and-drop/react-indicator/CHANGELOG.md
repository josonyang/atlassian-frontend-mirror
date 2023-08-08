# @atlaskit/pragmatic-drag-and-drop-react-indicator

## 0.16.0

### Minor Changes

- [`3ccb90e7480`](https://bitbucket.org/atlassian/atlassian-frontend/commits/3ccb90e7480) - Changed folder structure of package. There should be no visible changes.

## 0.15.0

### Minor Changes

- [`975218de587`](https://bitbucket.org/atlassian/atlassian-frontend/commits/975218de587) - Adds a terminal to the `DropIndicator` in the `/box` entrypoint. We now recommend most consumers use lines with terminals.

  A new entrypoint `/box-without-terminal` has been added, which contains the old appearance.

## 0.14.4

### Patch Changes

- Updated dependencies

## 0.14.3

### Patch Changes

- [`61cb5313358`](https://bitbucket.org/atlassian/atlassian-frontend/commits/61cb5313358) - Removing unused dependencies and dev dependencies

## 0.14.2

### Patch Changes

- [`9d00501a414`](https://bitbucket.org/atlassian/atlassian-frontend/commits/9d00501a414) - Ensure legacy types are published for TS 4.5-4.8

## 0.14.1

### Patch Changes

- [`41fae2c6f68`](https://bitbucket.org/atlassian/atlassian-frontend/commits/41fae2c6f68) - Upgrade Typescript from `4.5.5` to `4.9.5`

## 0.14.0

### Minor Changes

- [`9fd8556db17`](https://bitbucket.org/atlassian/atlassian-frontend/commits/9fd8556db17) - Internal folder name structure change

### Patch Changes

- Updated dependencies

## 0.13.0

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

## 0.12.0

### Minor Changes

- [`56507598609`](https://bitbucket.org/atlassian/atlassian-frontend/commits/56507598609) - Skip minor dependency bump

### Patch Changes

- Updated dependencies

## 0.11.1

### Patch Changes

- [`2e01c9c74b5`](https://bitbucket.org/atlassian/atlassian-frontend/commits/2e01c9c74b5) - DUMMY remove before merging to master; dupe adf-schema via adf-utils

## 0.11.0

### Minor Changes

- [`e2a4f1aeab0`](https://bitbucket.org/atlassian/atlassian-frontend/commits/e2a4f1aeab0) - Changing experimental tree item border radius (`2px`) to match border radius of Confluence tree items (`3px`)

## 0.10.6

### Patch Changes

- Updated dependencies

## 0.10.5

### Patch Changes

- Updated dependencies

## 0.10.4

### Patch Changes

- Updated dependencies

## 0.10.3

### Patch Changes

- Updated dependencies

## 0.10.2

### Patch Changes

- Updated dependencies

## 0.10.1

### Patch Changes

- Updated dependencies

## 0.10.0

### Minor Changes

- [`90901f5bbe0`](https://bitbucket.org/atlassian/atlassian-frontend/commits/90901f5bbe0) - Replace default entry point of `undefined` with `{}`.

  > **NOTE:** Importing from the default entry point isn't supported.
  > _Please use individual entry points in order to always obtain minimum kbs._

### Patch Changes

- Updated dependencies

## 0.9.1

### Patch Changes

- Updated dependencies

## 0.9.0

### Minor Changes

- [`fe6772a3719`](https://bitbucket.org/atlassian/atlassian-frontend/commits/fe6772a3719) - Dramatic update to **experimental** tree-item outputs. These outputs should only be used right now by Confluence Page Tree. Changes are being communicated face to face with Confluence team members

### Patch Changes

- Updated dependencies

## 0.8.2

### Patch Changes

- Updated dependencies

## 0.8.1

### Patch Changes

- Updated dependencies

## 0.8.0

### Minor Changes

- [`2112070b91a`](https://bitbucket.org/atlassian/atlassian-frontend/commits/2112070b91a) - We have changed the API for our _experimental_ tree drop indicator. Consumers should not be using the _experimental_ tree drop indicator in production before speaking with the Design System team.

  This change makes the tree item drop indicator API and usage consistent with our stable box drop indicator

  ```diff
  + // The import path to the tree item drop indicator has changed
  - import { DropIndicator } from '@atlaskit/drag-and-drop-indicator/tree';
  + import { DropIndicator } from '@atlaskit/drag-and-drop-indicator/tree-item';

  - // Render prop API with className as public API
  - <DropIndicator edge={edge}>({className}) => <div className={className} />
  + // Conditional rendering of an element
  + <div style={{position: 'relative'}}>{edge ? <DropIndicator edge={edge} /></div>}
  ```

  The `hasTerminal` prop has also been removed from the tree drop indicator as for trees the current design is that all lines have a terminal on them.

## 0.7.4

### Patch Changes

- Updated dependencies

## 0.7.3

### Patch Changes

- [`6455cf006b3`](https://bitbucket.org/atlassian/atlassian-frontend/commits/6455cf006b3) - Builds for this package now pass through a tokens babel plugin, removing runtime invocations of the tokens() function and improving performance.

## 0.7.2

### Patch Changes

- Updated dependencies

## 0.7.1

### Patch Changes

- Updated dependencies

## 0.7.0

### Minor Changes

- [`ace261c5753`](https://bitbucket.org/atlassian/atlassian-frontend/commits/ace261c5753) - For the experimental tree drop indicator, we have changed the `gap` and `inset` from `number` to `string` to align with our `Box` line indicator.

  Note: consumers should not be using the _experimental_ tree drop indicator in production. We are exposing this work in progress component for internal experimentation purposes.

## 0.6.2

### Patch Changes

- Updated dependencies

## 0.6.1

### Patch Changes

- Updated dependencies

## 0.6.0

### Minor Changes

- [`9066b866ed1`](https://bitbucket.org/atlassian/atlassian-frontend/commits/9066b866ed1) - The `edge` prop on the box drop indicator `@atlaskit/drag-and-drop-indicator/box` was _previously_ **optional** and is _now_ **required**.

  For the fastest possible applications, it is important that `<DropIndicator>` is only doing work when it needs to. Making `edge` **required** forces consumers to only render the `<DropIndicator>` when it is actually doing something. We are using the type system to ensure the fastest possible usage

  ```diff
  - <DropIndicator edge={closestEdge} />
  + { closestEdge && <DropIndicator edge={closestEdge} /> }
  ```

## 0.5.2

### Patch Changes

- Updated dependencies

## 0.5.1

### Patch Changes

- [`8cc2f888c83`](https://bitbucket.org/atlassian/atlassian-frontend/commits/8cc2f888c83) - Upgrade Typescript from `4.3.5` to `4.5.5`

## 0.5.0

### Minor Changes

- [`5b37b07dc94`](https://bitbucket.org/atlassian/atlassian-frontend/commits/5b37b07dc94) - Moving from `@emotion/core@10` to `@emotion/react@11` to line up `@emotion` usage with the rest of the Design System

## 0.4.2

### Patch Changes

- Updated dependencies

## 0.4.1

### Patch Changes

- Updated dependencies

## 0.4.0

### Minor Changes

- [`01232de241c`](https://bitbucket.org/atlassian/atlassian-frontend/commits/01232de241c) - The `gap` prop now takes a CSS string instead of a number.

## 0.3.0

### Minor Changes

- [`17950433a70`](https://bitbucket.org/atlassian/atlassian-frontend/commits/17950433a70) - Touching package to release re-release previous version. The previous (now deprecated) version did not have it's entry points built correctly

### Patch Changes

- Updated dependencies

## 0.2.2

### Patch Changes

- Updated dependencies

## 0.2.1

### Patch Changes

- Updated dependencies

## 0.2.0

### Minor Changes

- [`e26c936c610`](https://bitbucket.org/atlassian/atlassian-frontend/commits/e26c936c610) - We have improved our naming consistency across our drag and drop packages.

  - The exports from `@atlaskit/drag-and-drop-indicator` have now been shifted over to `@atlaskit/drag-and-drop-indicator/box`. `@atlaskit/drag-and-drop-indicator` will no longer be useable from the root entry point

  ```diff
  - import { DropIndicator } from '@atlaskit/drag-and-drop-indicator';
  + import { DropIndicator } from '@atlaskit/drag-and-drop-indicator/box';
  ```

### Patch Changes

- Updated dependencies

## 0.1.0

### Minor Changes

- [`73427c38077`](https://bitbucket.org/atlassian/atlassian-frontend/commits/73427c38077) - Initial release of `@atlaskit/drag-and-drop` packages 🎉

### Patch Changes

- Updated dependencies

## 0.0.1

### Patch Changes

- [`8d4228767b0`](https://bitbucket.org/atlassian/atlassian-frontend/commits/8d4228767b0) - Upgrade Typescript from `4.2.4` to `4.3.5`.
- Updated dependencies