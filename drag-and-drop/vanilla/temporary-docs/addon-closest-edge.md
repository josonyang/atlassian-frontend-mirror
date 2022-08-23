# Addon: Closest Edge

The closest edge addon is used to know what the closest edge is when dragging over a `dropTarget`. Knowing the closest edge is useful for reordering operations. This addon leverages the fact that `getData()` is repeatedly called throughout a drag and drop operation.

`attachClosestEdge()` adds a unique `Symbol` to your _dropTargets_ `data` object which allows for type safe lookups with `extractClosestEdge()`

```ts
type Edge = 'top' | 'right' | 'bottom' | 'left';
```

```ts
import { attachClosestEdge, extractClosestEdge, Edge } from '...';

dropTargetForElements({
  element: myElement,
  getData: ({ input, element }) => {
    // your base data you want to attach to the drop target
    const data = {
      itemId: 'A',
    };
    // this will 'attach' the closest edge to your `data` object
    return attachClosestEdge(data, {
      input,
      element,
      // you can specify what edges you want to allow the user to be closest to
      allowedEdges: ['top', 'bottom'],
    });
  },
  onDrop: args => {
    const closestEdge: Edge | null = extractClosestEdge(args.self.data);
  },
});
```