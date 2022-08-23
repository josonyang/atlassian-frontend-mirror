# Events

`@atlaskit/drag-and-drop` events allow you to respond to a drag and drop operation. Events will be fired on pieces (eg `draggable` and `dropTargets`) if they are relevant to the event. If you want to listen for _all_ events of a particular entity type (eg files), you can use a [monitor]('./monitors.md).

## Available events

- `onGenerateDragPreview` - Drag is about to start. Make changes you want to see in the drag preview
- `onDragStart` - Something has started dragging. You can make visual changes and they _will not_ be captured in the drag preview.
- `onDrag` - (_throttled_) - High fidelity updates with latest user input. Useful for drawing
- `onDropTargetChange` - Drop target hierarchy has changed in some way
- `onDrop` - Drag operation completed

## Derived events on `dropTargets`

- `onDragEnter` (derived from `onDropTargetChange`)
- `onDragLeave` (derived from `onDropTargetChange`)

> Derived events are not their own events in the system; rather they are convenance events derived from other events

## Event ordering

All events flow through the system in the same way:

1. drag source (eg `draggable`) if relevant
2. drop targets - inner most upwards (bubble ordering) `grandChild -> child -> parent`
3. monitors (in the order that they were bound)

## Shared event payload

All events are provided the following base data. Particular event types add additional data. Additionally, event listeners pieces of the system (eg `dropTargetForFiles({ onDragStart })`) can be given additional localized data for convenance

```ts
import {
  Input,
  DragLocation,
  DragLocationHistory,
} from '@atlaskit/drag-and-drop/types';
```

```ts
export type Input = {
  // user input
  altKey: boolean;
  button: number;
  buttons: number;
  ctrlKey: boolean;
  metaKey: boolean;
  shiftKey: boolean;

  // coordinates
  clientX: number;
  clientY: number;
  pageX: number;
  pageY: number;
};

export type DragLocation = {
  input: Input;
  dropTargets: DropTargetRecord[];
};

export type DragLocationHistory = {
  initial: DragLocation;
  current: DragLocation;
  previous: Pick<DragLocation, 'dropTargets'>;
};

// Each drag type (eg files) has their own base payload type
// This allows different types of drags to have different source data
type BaseEventPayload = {
  location: DragLocationHistory;
  // source is different for different drag types
  source: {
    element: Element;
    dragHandle: Element | null;
    data: Record<string, unknown>;
  };
};
```

## Convenience data for `dropTarget`s (of all types)

All `dropTargets` add a `self` property (type: `DropTargetRecord`) that contain a convenience object with information about the drop target that the event is firing on. You could easily grab all this information from the outer scope (or from `location.current.dropTargets`), but having it available inline is convenient.

```ts
type DropTargetRecord = {
  element: Element;
  // data provided using .getData()
  data: Record<string | symbol, unknown>;
  // dropEffect provided by using `.getDropEffect
  dropEffect: DataTransfer['dropEffect'] | null;
};
```

```ts
dropTargetForFiles({
  element: myElement,
  getData: () => ({ name: 'Alex' }),
  getDropEffect: () => 'move',
  onDragStart: ({ self }) => {
    console.log(self.element); // myElement
    console.log(self.data); // {name: 'Alex'}
    console.log(self.dropEffect); // 'move'
  },
});
```

## External drag sources

Sometimes a user is dragging something that started outside the current browser window, for example a local file.

When a user first drags an external entity into the webpage, `@atlaskit/drag-and-drop` considers this the _start_ of the drag operation. The drag operation will _finish_ if the user drags the external entity out of the browser.

By following this model, all entity types follow the same event lifecycle.

## event: `onGenerateDragPreview`

You can make changes to the DOM that you want to be reflected in your _drag preview_

Additional data

```ts
BaseEventPayload & {
  // Allows people to use the native set drag image function if they want
  // https://developer.mozilla.org/en-US/docs/Web/API/DataTransfer/setDragImage
  // Although, we recommend using alternative techniques (see element source docs)
  nativeSetDragImage: DataTransfer['setDragImage'] | null;
  };
```

Flow

- `onGenerateDragPreview` fires on the drag source (eg a `draggable`)
- `onGenerateDragPreview` on the any parent drop targets of the drag sources in bubble order (innermost outwards)
- `onGenerateDragPreview` on _monitors_

## event: `onDragStart`

A drag operation has started. You can make changes to the DOM and those changes won't be reflected in your _drag preview_

Flow

- `onDragStart` fires on the drag source (eg a `draggable`)
- `onDragStart` on the any parent drop targets of the drag sources in bubble order (innermost outwards)
- `onDragStart` on _monitors_

## event: `onDrag`

A throttled update of where the the user is currently dragging. Useful if you want to create a high fidelity experience such as drawing. `@atlaskit/drag-and-drop` throttles native `drag` events using `requestAnimationFrame` so `onDrag` events will fire ~60 times a second

Flow

- `onDrag` fires on the drag source (eg a `draggable`)
- `onDrag` on the _current_ parent drop targets of the drag sources in bubble order (innermost outwards). The _current_ drop targets are the drop targets that the user is currently dragging over. If you want to listen for _all_ `onDrag` events from the _initial_ drop targets, you can use a _monitor_.
- `onDrag` on _monitors_

## event: `onDropTargetChange`

The `onDropTargetChange` event fires when the `dropTarget` hierarchy changes during a drag.

In a single native drag event:

- drop targets can be exited
- drop targets can be entered into
- the hierarchy of drop targets can change (such as by dynamically adding a new parent `dropTarget` during a drag - although you are unlikely to run into this one!)

Flow (high level)

- `onDropTargetChange` fires on the drag source (eg a `draggable`)
- `onDropTargetChange` fires on all _previous_ drop targets in bubble order (inside out)
- `onDropTargetChange` fires on any **new** _current_ drop targets in bubble order

> Scenario: [B, A] -> [C, A]

- `onDropTargetChange` fires on `draggable`
- `onDropTargetChange` fires on `dropTarget(B)`
- `onDropTargetChange` fires on `dropTarget(A)`
- _now going to fire on newly added drop targets in bubble order_
- `onDropTargetChange` fires on `dropTarget(C)`

> Scenario: [B, A] -> [D, C]

- `onDropTargetChange` fires on `draggable`
- `onDropTargetChange` fires on `dropTarget(B)`
- `onDropTargetChange` fires on `dropTarget(A)`
- _now going to fire on newly added drop targets in bubble order_
- `onDropTargetChange` fires on `dropTarget(D)`
- `onDropTargetChange` fires on `dropTarget(C)`
- `onDropTargetChange` fires on all monitors

### Derived events: `onDragEnter` and `onDragLeave`

`onDropTargetChange` allows you to know a lot of different information about drop target hierarchy changes. However, it is an extremely common use case for a `dropTarget` to know when it starts being dragged over, and when it is no longer being dragged over. To support this common use case, the `onDragEnter` and `onDragLeave` callbacks are executed on a `dropTarget` as required when the `dropTarget` receives a `onDropTargetChange` event. `onDragEnter` and `onDragLeave` are not _strictly_ their own events, but travel along side the bubbling of `onDropTargetChange`.

> Scenario: [B, A] -> [C, A]

- `onDropTargetChange` fires on `draggable`
- `onDropTargetChange` fires on `dropTarget(B)`
  - `onDragLeave` fires on `dropTarget(B)` → _derived event_
- `onDropTargetChange` fires on `dropTarget(A)`
- `onDropTargetChange` fires on `dropTarget(C)`
  - `onDragEnter` fires on `dropTarget(C)` → _derived event_
- `onDropTargetChange` fires on all monitors

> Scenario: [B, A] -> [D, C]

- `onDropTargetChange` fires on `draggable`
- `onDropTargetChange` fires on `dropTarget(B)`
  - `onDragLeave` fires on `dropTarget(B)` → _derived event_
- `onDropTargetChange` fires on `dropTarget(A)`
  - `onDragLeave` fires on `dropTarget(A)` → _derived event_
- _now going to fire on newly added drop targets in bubble order_
- `onDropTargetChange` fires on `dropTarget(D)`
  - `onDragEnter` fires on `dropTarget(D)` → _derived event_
- `onDropTargetChange` fires on `dropTarget(C)`
  - `onDragEnter` fires on `dropTarget(C)` → _derived event_
- `onDropTargetChange` fires on monitors

## event: `onDrop`

The `onDrop` event occurs when a user has finished a drag and drop operation. The `onDrop` event will fire when the drag operation finishes, regardless of how the drag operation finished (eg due to an explicit drop, the drag being canceled, recovering from an error and so on). On the web platform we cannot distinguish between dropping on no drop targets and an explicit cancel, so we do not publish any information about _how_ the drag ended, only that it ended. The `location.current` property will accurately contain the final drop targets.

Flow

- `onDrop` fires on the drag source (eg a `draggable`)
- `onDrop` fires on all `dropTarget`s currently being dragged over (all those in `location.current.dropTargets`) in bubble event ordering (inner most `dropTarget` upwards)
- `onDrop` fires on _monitors_

## Cancelling

If a user is currently over drop target(s) when a drag is cancelled, then the exiting current drop targets(s) are cleared with an `onDropTargetChange` event. This matches how cancelling works with the native drag and drop API.

Flow

- User drags over two drop targets: `[B, A]` (bubble ordered)
- User cancels drag
- Phase 1: `onDropTargetChange`
  - `onDropTargetChange` fires on the source (eg a `draggable`)
  - `onDropTargetChange` fires on `B`
    - `onDragLeave` fires on `B` (derived event)
  - `onDropTargetChange` fires on `A`
    - `onDragLeave` fires on `A` (derived event)
  - `onDropTargetChange` fires on _monitors_
- Phase 2: `onDrop`
  - `onDrop` fires on the source (eg a `draggable`)
  - `onDrop` fires on _monitors_
  - _note: `onDrop` does not fire on `B` or `A` as they are no longer being dragged over_