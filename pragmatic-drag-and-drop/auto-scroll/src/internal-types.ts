import type {
  AllDragTypes,
  CleanupFn,
  Input,
} from '@atlaskit/pragmatic-drag-and-drop/types';

// export type AllowAxis = 'vertical-only' | 'horizontal-only' | 'both';
export type GetFeedbackArgs<DragType extends AllDragTypes> = {
  /**
   * The users _current_ input
   */
  input: Input;
  /**
   * The data associated with the entity being dragged
   */
  source: DragType['payload'];
  /**
   * The drop targets currently being dragged over
   */
  // TODO: ??
  // location: ElementEventBasePayload['location']
  /**
   * The element trying to be scrolled
   */
  element: Element;
};

export type NestedPartial<T> = {
  [TKey in keyof T]?: T[TKey] extends Record<string, unknown>
    ? NestedPartial<T[TKey]>
    : T[TKey];
};

export type Spacing = {
  top: number;
  right: number;
  bottom: number;
  left: number;
};

export type Edge = keyof Spacing;

export type EngagementHistoryEntry = {
  timeOfEngagementStart: number;
};

type BaseConfig = {
  startHitboxAtPercentageRemainingOfElement: Spacing;
  maxScrollAtPercentageRemainingOfHitbox: Spacing;
  // speed: SpeedConfiguration;
  // allowedAxis: AllowAxis;
  // Using seconds so we get the same speed regardless of frame rate
  // maxPixelScrollPerSecond: Spacing;
  // getSpeed: ({ timePassedMs }: { timePassedMs: number }) => number;
};

export type ScrollContainerConfig = BaseConfig;

export type Behavior = {
  onFrame: (args: {
    element: Element;
    input: Input;
    timeSinceLastFrame: number;
  }) => void;
  cleanup: CleanupFn;
};

export type ScrollContainerArgs<DragType extends AllDragTypes> = {
  element: Element;
  canScroll?: (args: GetFeedbackArgs<DragType>) => boolean;
  behavior?: Behavior[];
  // Per item configuration currently disabled for initial testing
  // getConfiguration?: (
  //   args: GetFeedbackArgs<DragType>,
  // ) => NestedPartial<ScrollContainerConfig>;
};

export type WindowArgs<DragType extends AllDragTypes> = {
  canScroll?: (args: GetFeedbackArgs<DragType>) => boolean;
  // Per item configuration currently disabled for initial testing
  // getConfiguration?: (
  //   args: GetFeedbackArgs<DragType>,
  // ) => NestedPartial<WindowConfig>;
};

export type Side = 'start' | 'end';
export type Axis = 'vertical' | 'horizontal';