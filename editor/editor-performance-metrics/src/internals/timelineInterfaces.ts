import type {
	HoldIdleEventSources,
	TimelineEvent,
	TimelineEventNames,
	TimelineEventsGrouped,
	EventsGroupedSerialized,
} from './timelineTypes';

export type OnIdleBufferFlushCallback = (props: {
	idleAt: DOMHighResTimeStamp;
	timelineBuffer: Readonly<Timeline>;
}) => void;
export type UnHoldFunction = () => void;
export type TimelineIdleUnsubcribe = () => void;

/**
 * Cleanable
 *
 * The Cleanable interface defines a method for cleaning up resources or resetting state
 * within the implementing class. This is particularly useful for managing memory and
 * performance in systems that accumulate data over time.
 *
 * Key Method:
 * - `attemptCleanup()`: This method is used to reset the timeline
 *   when certain conditions are met, such as exceeding an event threshold.
 */
export interface Cleanable {
	attemptCleanup: (source: 'interval-check' | 'manual') => void;
}

/**
 * TimelineSerializable
 *
 * The TimelineSerializable interface provides a method for converting the timeline's
 * internal state into a JSON format. This is useful for data persistence, debugging,
 * or transmitting timeline data.
 *
 * Key Method:
 * - `serialise()`: Serializes the timeline events into an array of tuples, each containing
 *   an event type and an array of events of that type.
 */
export interface TimelineSerializable {
	// eslint-disable-next-line @typescript-eslint/method-signature-style -- ignored via go/ees013 (to be fixed)
	serialise(): EventsGroupedSerialized;
}

/**
 * Timeline
 *
 * The Timeline interface defines the basic structure for accessing a collection
 * of timeline events. It allows retrieval of all events or events filtered by their type.
 *
 * Key Methods:
 * - `getEvents()`: Returns a sorted array of all timeline events.
 * - `getEventsPerType(type)`: Retrieves events of a specific type, allowing for type-safe access to events.
 */
export interface Timeline {
	// eslint-disable-next-line @typescript-eslint/method-signature-style -- ignored via go/ees013 (to be fixed)
	getEvents(): ReadonlyArray<TimelineEvent>;
	// eslint-disable-next-line @typescript-eslint/method-signature-style -- ignored via go/ees013 (to be fixed)
	getEventsPerType<T extends TimelineEventNames>(type: T): TimelineEventsGrouped[T];
}

/**
 * TimelineClock
 *
 * The TimelineClock interface extends the Timeline interface, providing methods for
 * marking new events, managing idle-period callbacks, and handling the subscription lifecycle.
 * It includes functionality for both immediate and next-idle event handling, as well as
 * cleanup operations for subscriber management.
 *
 * Key Methods:
 * - `markEvent(event)`: Adds a new event to the timeline and manages the idle detection logic.
 *
 * Subscription Methods:
 * - `onIdleBufferFlush(cb)`: Registers a callback to be triggered when the idle buffer is flushed.
 *   Returns a function to unsubscribe the callback.
 *
 * - `onNextIdle(cb)`: Registers a callback to be triggered when the next idle event happens.
 *   The callback will be called only once. Returns a function to unsubscribe the callback.
 *
 * Lifecycle Methods:
 * - `onceAllSubscribersCleaned(cb)`: Registers a callback to be called once when all subscribers
 *   to onIdleBufferFlush and onNextIdle have been unsubscribed. This is useful for performing
 *   cleanup operations when the timeline is no longer being actively monitored.
 *
 * - `cleanupSubscribers()`: Forcefully removes all subscribers and triggers any pending idle buffer
 *   flushes. This method will:
 *   1. Flush the current idle buffer, ensuring all pending callbacks are executed
 *   2. Clear all registered onIdleBufferFlush callbacks
 *   3. Clear all registered onNextIdle callbacks
 *   4. Trigger the onceAllSubscribersCleaned callback if registered
 *
 * @example
 * ```typescript
 * // Regular subscription pattern
 * const unsubscribe = timeline.onIdleBufferFlush(({ idleAt, timelineBuffer }) => {
 *   console.log('Buffer flushed at:', idleAt);
 * });
 *
 * // Cleanup when done
 * unsubscribe();
 *
 * // Force cleanup of all subscribers
 * timeline.cleanupSubscribers();
 * ```
 */
export interface TimelineClock extends Timeline {
	// eslint-disable-next-line @typescript-eslint/method-signature-style -- ignored via go/ees013 (to be fixed)
	markEvent(event: TimelineEvent): void;
	// eslint-disable-next-line @typescript-eslint/method-signature-style -- ignored via go/ees013 (to be fixed)
	onIdleBufferFlush(cb: OnIdleBufferFlushCallback): TimelineIdleUnsubcribe;
	// eslint-disable-next-line @typescript-eslint/method-signature-style -- ignored via go/ees013 (to be fixed)
	onNextIdle(cb: OnIdleBufferFlushCallback): TimelineIdleUnsubcribe;
	// eslint-disable-next-line @typescript-eslint/method-signature-style -- ignored via go/ees013 (to be fixed)
	onceAllSubscribersCleaned(cb: () => void): void;
	cleanupSubscribers: () => void;
}

/**
 * TimelineHoldable
 *
 * The TimelineHoldable interface defines a method for managing "hold" operations
 * in the timeline. This is useful for temporarily pausing or delaying idle detection
 * during certain operations, such as asynchronous tasks or long-running processes.
 *
 * Key Method:
 * - `hold(props)`: Initiates a hold operation, preventing idle detection until released.
 *
 * @param {Object} props - The properties for the hold operation.
 * @param {HoldIdleEventSources} props.source - The source of the hold operation (e.g., 'setTimeout', 'Promise', 'fetch').
 *
 * @returns {UnHoldFunction} A function that, when called, releases the hold and allows idle detection to resume.
 *
 * Usage Example:
 * ```typescript
 * const timeline: TimelineHoldable = // ... initialize timeline
 * const unhold = timeline.hold({ source: 'fetch' });
 *
 * // ... perform some asynchronous operation
 *
 * unhold(); // Release the hold when the operation is complete
 * ```
 */
export interface TimelineHoldable {
	hold: (props: { source: HoldIdleEventSources }) => UnHoldFunction;
}
