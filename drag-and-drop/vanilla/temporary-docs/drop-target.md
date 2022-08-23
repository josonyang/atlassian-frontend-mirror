# Drop Targets

A `dropTarget` is an `Element` on a page that can be dropped onto by a user. Drop targets are scoped to a particular entity type. For example, `dropTargetForElements` is a drop target for elements, and `dropTargetForFiles` is a drop target for files.

Rules:

- A single `element` can be used as a drop target for multiple entity types
- A single `element` cannot be used to create multiple drop targets for the same entity type (you will get a warning in your `console` if you make a mistake)
- Drop targets can be nested
- During a drag operation:
  - You can add new `dropTargets`s
  - You can remove `dropTargets`s
  - You can _remount_ a `dropTargets` (see [What is remounting]('./what-is-remounting.md'))
  - You can change the dimensions of any `dropTarget`

## Basic usage

```ts
const cleanup = dropTargetForFiles({
  element: myElement,
});
```

## Drop target arguments

High level:

- `element` - the `Element` the drop target will be attached to
- `getData()` - data to associate with the drop target
- `canDrop()` - whether the drop target can be dropped on
- `getDropEffect()` - control the cursor when over a drop target
- `getIsSticky()` - whether the drop target will hold onto selection after no longer being dragged over

For events (eg `onDragStart`) see [our events guide]('./events.md');

- `onGenerateDragPreview`
- `onDragStart`
- `onDrag`
- `onDropTargetChange`
- `onDrop`

Required:

- `element`: `Element` you want to attach the drop target to

Optional:

- `getData?: (args: GetFeedbackArgs) => Record<string, unknown>`: a function that returns data you want to attach to the drop target. `getData()` is called _repeatedly_ while the user is dragging over the drop target in order to power addons. If your `getData()` function is expensive, consider using [`once`]('./util.md') `getData()` is called with `GetFeedbackArgs` (see below) which contains limited information about the current drag operation. Try to make your `getData()` function _pure_ (same input results in the same output)

```ts
const cleanup = dropTargetForFiles({
  element: myElement,
  getData: () => ({ id: 'Alex' }),
});
```

- `canDrop?: (args: GetFeedbackArgs) => boolean` is used to conditionally block dropping. When looking for valid drop targets, `@atlaskit/drag-and-drop` starts at the deepest part of the DOM tree the user is currently over and searches upwards for valid targets. If a drop target blocks dragging (`canDrop()` returns `false`), then that drop target is ignored and the search upwards continues. `canDrop()` is called _repeatedly_ while a drop target is being dragged over to allow you to dynamically change your mind as to whether a drop target can be dropped on. `canDrop()` being called _repeatedly_ allows you to change your mind about whether a drop target can be dropped on _after_ it has been entered into. This could be helpful in a situation where you are waiting on some permission information from a backend service.

```ts
// I can never be dropped on!
dropTargetForFiles({
  element: myElement,
  canDrop: () => false,
});

// only allow 'cards' to be dropped on this drop target
dropTargetForElements({
  element: myOtherElement,
  canDrop: ({ source }: GetFeedbackArgs) => {
    return source.data.type === 'card';
  },
});
```

```ts
type GetFeedbackArgs = {
  input: Input;
  source: SourcePayload; // this payload type will be different for different adapters
  element: Element;
};
```

- `getDropEffect?: (args: GetFeedbackArgs) => DataTransfer['dropEffect']`. The `dropEffect` property will control the visual feedback (cursor) when dragging over it. As with `getData()`, `getDropEffect()` is repeatedly called throughout a drag operation. The default `dropEffect` will change depending on the adapter. `getDropEffect()` is called _repeatedly_ while a drop target is being dragged over to allow you change your mind about which drop effect should be applied.

```ts
dropTargetForLinks({
  getDropEffect: () => 'link',
});
```

When working with _nested `dropTargets`_, the inner most drop targets `dropEffect` is the one that will be applied; even if inner most drop target is using the default value (`"move"`)

- `getIsSticky?: (args: GetFeedbackArgs) => boolean`: Drop targets are generally calculated based on where the user's pointer is currently located. In some scenarios you might want to _hold on_ to a previous drop target (make it _sticky_), even when the drop target is no longer being directly dragged over. This is useful if you want to maintain a selection while you are in _gaps_ between drop targets. This function is called `repeatedly` while a drop target is being dragged over

```ts
dropTargetForElements({
  element: myElement,
  getIsSticky: () => true,
});

dropTargetForElements({
  element: myElement,
  getIsSticky: ({ source }: GetFeedbackArgs): boolean => {
    // only be sticky when dragging something with 'author = Alex'
    return source.data.author === 'Alex';
  },
});
```

### Stickiness algorithm

If there are less drop targets then there was in the last collection, check to see if any of the previous _drop targets_ should be maintained.

A previous _drop target_ will be maintained when:

1. The drop target `getIsSticky()` returns `true` AND
2. The parent of a _drop target_ is unchanged

> TODO: format + explain

- Scenario: `[A(sticky)]` → `[]` = `[A]`
- Scenario: `[B(sticky), A(sticky)]` → `[]` = `[B, A]`
- Scenario: `[C, B(sticky), A(sticky)]` → `[]` = `[B, A]`
- Scenario: `[A(sticky)]` → `[B]` = `[B]`
- Scenario: `[B(sticky), A]` → `[A]` = `[B, A]`
- Scenario: `[B, A(sticky)]` → `[A]` = `[A]`
- Scenario: `[B(sticky), A]` → `[X]` = `[X]`
- Scenario: `[B(sticky), A]` → `[]` = `[]`

Stickiness is lost when the user drags out of the `window`

### Nested drop targets

When calculating what `dropTarget`s are currently being dragged over, we look from the deepest possible `dropTarget` upwards (bubble ordering). Will will search up to the document root to find any available drop targets. If a `dropTarget` specifies that it cannot be dropped on, then it will be ignored and the search will continue upwards

> Scenario: [] -> [B, A(blocked)]
> Result: [] -> [B]

Flow:

- `B` visited and allows dropping. Drop targets: `[] -> [B]`
- `A` visited and does not allow dropping

> Scenario: [] -> [C, B(blocked), A]
> Result: [] -> [C, A]

- Going from no drop targets `[]` to three drop targets: `[C, B, A]` (bubble ordered).
- `C` and `A` allow dropping, but `B` has blocked dropping

Flow:

- `C` visited and allows dropping. Drop targets: `[] -> [C]`
- `B` visited and does not allow dropping
- `A` visited and allows dropping. Drop targets `[C] -> [C, A]`