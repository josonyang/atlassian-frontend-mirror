# File adapter

The file adapter enables drag and drop operations of external files into a web page.

Pieces:

- `dropTargetForFiles`: marking an element as a valid drop target for files
- `monitorForElements`: listen for `@atlaskit/drag-and-drop` file drag operation events anywhere

## `dropTargetForFiles`

`dropTargetForFiles` will make an `element` into a [drop target](./drop-target.md) for files

The default `dropEffect` for file drop targets is `"copy"`. This is because when you move files into a browser it can make a _copy_ of the files. You can override this default with `getDropEffect()`.

## `monitorForElements`

A [monitor](./monitor.md) for listening to events for file operations

## Files are an external drag source

Files are an [external drag source](./events.md). When a user drags an external file into a window, `@atlaskit/drag-and-drop` considers that the _start_ of a drag. When a user continues to drag that file out of a window, that is considered the end of a drag.

When a drag starts (`onDragStart()`) you can create drop targets or highlight existing drop targets to make it obvious where the user can drop files.

## Events

The file adapter removes particular events from the [standard event flow]('./events.md).

- `onGenerateDragPreview` is removed from file drop targets and monitors. For file operations it is completely up to the browser to generate the drag preview
- `onDragStart` is removed from file drop targets as an external file can _never_ start from inside an internal element.

If your drop target element needs to know when a drag is starting (ie a user is dragging a file into the browser), then you can use a monitor

```ts
dropTargetForFiles({
  element: el,
  onDragEnter: () => console.log('user is now over this drop target'),
  onDragLeave: () => console.log('user is no longer over this drop target'),
  onDrop: () =>
    console.log('user dropped on this drop target (or a child drop target)'),
});
monitorForFiles({
  onDragStart: () => console.log('file is entering the window'),
  onDrop: () => console.log('drag is finished'),
});
```

## Source data

Each file adapter event is given at least the following data:

```ts
type FileEventBasePayload = {
  location: DragLocationHistory;
  source: {
    items: DataTransferItemList | null;
  };
};
```

You can get this type from the file adapter:

```ts
import type { FileEventBasePayload } from '@atlaskit/drag-and-drop/adapter/file';
```

You can get payload types for all file events using the following types as well:

```ts
import type {
  // the payload for each file event
  FileEventPayloadMap,

  // the payload for each file event, including drop target `self` and derived events
  FileDropTargetEventPayloadMap,
} from '@atlaskit/drag-and-drop/adapter/file';

type OnDragStart = FileEventPayloadMap['onDragStart'];
```

`items` is a [`DataTransferItemList`](https://developer.mozilla.org/en-US/docs/Web/API/DataTransferItemList), which is how the browser exposes information about files that are being dragged.

`items` is only _potentially_ available during the `onDrop` event (_potentially_ because technically the browser can return `null` if it wants to). In all other events (eg `onDragStart`) `items` will be explicitly set to `null`. This is done intentionally because accessing `items` at any other point won't work in browsers, even if it looks like it might.

- [Test case](https://codesandbox.io/s/file-drag-and-drop-strn21?file=/src/index.ts)
- [Explanation](https://twitter.com/alexandereardon/status/1554254988003512320)

For convenance, before `items` is provided to you, all non-file entities are stripped out.

## Blocking unhandled drags

The default behaviour when dropping a file into a browser window is for that file to be opened in a new tab. Often, if you have drop targets for files on your page, you want file drops outside of those drop targets to be ignored, and not to open a new tab. You an use the optional `blockUnhandledDrags` addon to help with that.

You can use `blockUnhandledDrags` inside a monitor

```ts
import { monitorForFiles } from '@atlaskit/drag-and-drop/adapter/file';
import {
  blockUnhandledDrags,
  restoreStandardBehaviour,
} from '@atlaskit/drag-and-drop/util/block-unhandled-drags';
import { combine } from '@atlaskit/drag-and-drop/util/combine';

monitorForFiles({
  // when any drag starts for files block unhandled drags
  onDragStart: () => {
    blockUnhandledDrags();
  },
  // when the drop finishes, restore default behaviour
  // it is important that you restore standard behaviour
  // or it will mess up future drag operations
  onDrop: () => {
    restoreStandardBehaviour();
  },
});
```

## One `dropTargetForFiles` required

Before you start receiving events for files, you need to have at least one `dropTargetForFiles` activated. We use that as the signal to add the native event listeners we need to handle file events. When the last `dropTargetForFiles` is removed, then we will remove the native event listeners. If the last `dropTargetForFiles` is removed during an active drag (and no more `dropTargetForFiles` are registered), then the native event listeners will be removed after the drag is completed. This means you will always get all the file adapter events (`onDrag`, `onDrop` etc) for a drag, regardless of whether the only drop target is removed.

If you are looking to only create a file drop target after the drag has started, you will need to make one (perhaps hidden) file drop target to start listening for events.

Using this approach allows event listeners to be explicitly bound and removed