# Packages

This page contains all the available packages and entry points for `@atlaskit/drag-and-drop` related packages.

> At this stage we are using [entry points](https://nodejs.org/api/packages.html#package-entry-points) rather than exporting everything from the root of the package to ensure that _everybody_ gets the best possible bundle size without needing to rely on [tree shaking](https://developer.mozilla.org/en-US/docs/Glossary/Tree_shaking).

## `@atlaskit/drag-and-drop`

Contains the essential pieces of the system, and is not tied to any JavaScript framework

- `@atlaskit/drag-and-drop/adapter/element`: The [element adapter]('./element-adapter.md) used to power drag operations of elements
- `@atlaskit/drag-and-drop/adapter/file`: The [file adapter]('./file-adapter.md) used to power drag operations of external files
- `@atlaskit/drag-and-drop/types`: All of the base TypeScript types of `@atlaskit/drag-and-drop`
- `@atlaskit/drag-and-drop/addon/cancel-unhandled`: An _addon_ that absorbs unhandled drags (useful when disabling the native drag preview and for file drag operations)
- `@atlaskit/drag-and-drop/util/combine`: A function that will _combine_ multiple functions into a single function (useful when working with `React.useEffect`)
- `@atlaskit/drag-and-drop/util/once`: A function that will only allow the provided function to be called once. This is useful if your drop target `getData()` is expensive to calculate
- `@atlaskit/drag-and-drop/util/reorder`: A function to make common array reordering operations easier. This is useful when you want to reorder items in a list.
- `@atlaskit/drag-and-drop/util/disable-native-drag-preview`: A function to disable native drag previews
- `@atlaskit/drag-and-drop/util/scroll-just-enough-into-view`: A function that can bring an element just enough into view. Useful to avoid having drag previews cut off by scroll containers (see [element adapter]('./element-adapter) for more information)

## `@atlaskit/drag-and-drop-hitbox`

Add _additional_ hitbox (impact) information to a _drop target_ when it is being dragged over

- `@atlaskit/drag-and-drop-hitbox/addon/closest-edge`: an _addon_ which attaches information about what edge (top, right, bottom, left) the users pointer is closest to
- `@atlaskit/drag-and-drop-hitbox/util/reorder-with-edge`: a utility that assists with reordering arrays, taking into account edge information. It is similar to `@atlaskit/drag-and-drop/util/reorder`, but takes into account edges
- `@atlaskit/drag-and-drop-hitbox/types`: All base types from this package

## `@atlaskit/drag-and-drop-indicator`

A `react` addon to assist with drawing drop indicators (eg lines). This package uses `@emotion/react` for styling.

ℹ️ You do not need to use this addon for drawing drop indicators! You can use whatever rendering and styling approach you like. This addon just makes drawing lines with `react` + `@emotion/react` easy.

- `@atlaskit/drag-and-drop-indicator/box`: used for drawing drop indicators relative to box structures (lists, grids and so on)
- `@atlaskit/drag-and-drop-indicator/tree-item`: (soon) used for drawing drop indicators in tree structures

## `@atlaskit/drag-and-drop-autoscroll`

Out of the box, `@atlaskit/drag-and-drop` leverages the browsers built in auto scrolling for drag and drop operations. `@atlaskit/drag-and-drop-autoscroll` is an optional _addon_ that provides a more natural feeling auto scrolling experience.

This auto scroller has been ported from [`react-beautiful-dnd`](https://github.com/atlassian/react-beautiful-dnd).

## `@atlaskit/drag-and-drop-live-region`

A package that contains a singleton live region which is useful for announcing messages to screen readers. This package is an important part of our [accessibility story]('./TODO')