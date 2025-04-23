# @atlaskit/editor-performance-metrics

## 2.1.1

### Patch Changes

- [#144646](https://bitbucket.org/atlassian/atlassian-frontend-monorepo/pull-requests/144646)
  [`3781b3e732eff`](https://bitbucket.org/atlassian/atlassian-frontend-monorepo/commits/3781b3e732eff) -
  Used and check for window instead of self

## 2.1.0

### Minor Changes

- [#137929](https://bitbucket.org/atlassian/atlassian-frontend-monorepo/pull-requests/137929)
  [`fafc821856dba`](https://bitbucket.org/atlassian/atlassian-frontend-monorepo/commits/fafc821856dba) -
  Introduced INP metrics collector behind feature flag

## 2.0.4

### Patch Changes

- [#128240](https://bitbucket.org/atlassian/atlassian-frontend-monorepo/pull-requests/128240)
  [`2c9d2a6acbdd5`](https://bitbucket.org/atlassian/atlassian-frontend-monorepo/commits/2c9d2a6acbdd5) -
  This updates ensure we are stoping the observers once the user makes the first interaction

## 2.0.3

### Patch Changes

- [#126154](https://bitbucket.org/atlassian/atlassian-frontend-monorepo/pull-requests/126154)
  [`471921e76c42e`](https://bitbucket.org/atlassian/atlassian-frontend-monorepo/commits/471921e76c42e) -
  Adds safe checks to avoid issues on SSR env related to PerformanceObserver

## 2.0.2

### Patch Changes

- [#118627](https://bitbucket.org/atlassian/atlassian-frontend-monorepo/pull-requests/118627)
  [`964bf43e21dc5`](https://bitbucket.org/atlassian/atlassian-frontend-monorepo/commits/964bf43e21dc5) - ###
  Patch Changes

  #### Race Condition

  This update fix a race condition between `Timeline.attemptFlushIdleBuffer` and
  `Timeline.callOnNextIdleCallbacks`,

  - The `attemptFlushIdleBuffer` was cleaning the idle buffer before the `callOnNextIdleCallbacks`
    call the listerners.

  #### Buffer size

  This update increase the default buffer size from `1000` to `3000`.

  #### Performance Observers

  This update improves when the performance observer should starts the observation

## 2.0.1

### Patch Changes

- [#118205](https://stash.atlassian.com/projects/CONFCLOUD/repos/confluence-frontend/pull-requests/118205)
  [`8a4aaaa9b7d26`](https://stash.atlassian.com/projects/CONFCLOUD/repos/confluence-frontend/commits/8a4aaaa9b7d26) - ###
  Patch Changes

  This update fix a race condition caused by wrongly scope binding.

  - The idle callbacks will be called with a shallow copy of timelineBuffer from the lexical scope
  - The handleIdle is manually bindided with the Timeline class instance to avoid race-condition
    issues

## 2.0.0

### Major Changes

- [#117363](https://stash.atlassian.com/projects/CONFCLOUD/repos/confluence-frontend/pull-requests/117363)
  [`10a0f7f6c2027`](https://stash.atlassian.com/projects/CONFCLOUD/repos/confluence-frontend/commits/10a0f7f6c2027) -
  This package's `peerDependencies` have been adjusted for `react` and/or `react-dom` to reflect the
  status of only supporting React 18 going forward. No explicit breaking change to React support has
  been made in this release, but this is to signify going forward, breaking changes for React 16 or
  React 17 may come via non-major semver releases.

  Please refer this community post for more details:
  https://community.developer.atlassian.com/t/rfc-78-dropping-support-for-react-16-and-rendering-in-a-react-18-concurrent-root-in-jira-and-confluence/87026

## 1.5.1

### Patch Changes

- [#116860](https://stash.atlassian.com/projects/CONFCLOUD/repos/confluence-frontend/pull-requests/116860)
  [`fe10f83753ea7`](https://stash.atlassian.com/projects/CONFCLOUD/repos/confluence-frontend/commits/fe10f83753ea7) - ###
  Patch Changes

  Ticket: AFO-3446

  This update enhances error handling in the wrapping functions for global timers and fetch
  operations, ensuring that resources are properly released even when exceptions occur.

  ## Error Handling Improvements

  1. **Wrapper Functions for Web APIs**

     - Enhanced `wrapperFetch`:

       - Now ensures that `unhold` is called even if an exception is thrown within the fetch
         operation.
       - Introduced try-catch-finally blocks to manage error handling and ensure consistent resource
         cleanup.

     - Improved `wrapperTimers`:
       - Ensures `unhold` is called if an exception occurs within the `setTimeout` callback.
       - Utilizes try-finally blocks to guarantee unhold operations.

  ## Testing Enhancements

  - Added new test cases to verify the behavior when exceptions are thrown within wrapped functions:
    - Ensures `unhold` is called when an exception occurs in a `setTimeout` callback.
    - Confirms `unhold` is invoked when an exception is thrown inside the fetch implementation.

  ## Important Notes

  - These changes maintain backward compatibility with existing implementations.
  - The core functionalities of the wrapper functions remain unchanged, with improvements focused on
    error handling.
  - Enhanced error handling should lead to more reliable resource management in asynchronous
    operations.

## 1.5.0

### Minor Changes

- [#116155](https://stash.atlassian.com/projects/CONFCLOUD/repos/confluence-frontend/pull-requests/116155)
  [`27cf8da4bec02`](https://stash.atlassian.com/projects/CONFCLOUD/repos/confluence-frontend/commits/27cf8da4bec02) -
  Ticket: ED-26671

  ### Minor Changes

  This update introduces improved lifecycle management for the Timeline and
  EditorPerformanceObserver, providing better control over observer states and cleanup operations.

  ## Timeline Lifecycle Management

  1. New `cleanupSubscribers` method in TimelineClock:

     - Forcefully removes all subscribers
     - Flushes any pending idle buffer
     - Triggers the onceAllSubscribersCleaned callback
     - Ensures proper cleanup of all timeline resources

  2. Enhanced EditorPerformanceObserver lifecycle:
     - Added state management through `isStarted` flag
     - Improved start/stop functionality to prevent duplicate operations
     - Comprehensive cleanup on stop, including:
       - Disconnecting all observers
       - Cleaning up wrappers
       - Cleaning up timeline subscribers

  ## React Integration Improvements

  The PerformanceMetrics component now properly manages the EditorPerformanceObserver lifecycle:

  - Automatically starts the observer when the component mounts
  - Properly stops the observer when the component unmounts
  - Handles SSR scenarios gracefully

  ## Documentation Updates

  - Added comprehensive examples for lifecycle management

  ## Testing

  Added new test suites:

  - Timeline cleanupSubscribers functionality
  - EditorPerformanceObserver start/stop operations
  - PerformanceMetrics component lifecycle management

  ## Important Notes

  - These changes maintain backward compatibility with existing implementations
  - The core timeline functionality remains unchanged
  - Improved resource management should lead to better memory usage in long-running applications

## 1.4.0

### Minor Changes

- [#113957](https://stash.atlassian.com/projects/CONFCLOUD/repos/confluence-frontend/pull-requests/113957)
  [`9bf5ff8b2ae82`](https://stash.atlassian.com/projects/CONFCLOUD/repos/confluence-frontend/commits/9bf5ff8b2ae82) - ##
  Minor Changes

  This update adds the onTTAI callback functionality to the PerformanceMetrics component, which
  allows tracking of the Time To App Idle (TTAI) event. The onTTAI callback is triggered when the
  first idle time is detected after the component is mounted, providing a DOMHighResTimeStamp
  indicating when the browser is truly idle.

      New Callback: onTTAI
          Type: (result: { idleAt: DOMHighResTimeStamp }) => void
          Description: This callback is called once when the component detects its first idle state after mounting, supplying the timestamp of this idle state.

      Enhancements:
          Updated the PerformanceMetricsProps to include the new onTTAI callback.
          Modified the PerformanceMetrics component to check for server-side rendering (SSR) and handle observers accordingly.
          Incorporated useTTAI hook to manage the subscription to the idle event.

  These enhancements provide additional metrics for analyzing editor performance, specifically
  focusing on idle state detection, which can be critical for improving user experience and resource
  management in applications.

  ## Patch Changes

  ### Race conditions

  This updates fixes a race condition between `setTimeout` and `clearTimeout` that would call end up
  calling the same `unhold` function twice.

  ### Nested timers

  This updates fixes a problem where the `onIdle` callback was never been called due to infinite
  nested timers been used by third-party.

## 1.3.2

### Patch Changes

- [#109782](https://stash.atlassian.com/projects/CONFCLOUD/repos/confluence-frontend/pull-requests/109782)
  [`9129332a66d2b`](https://stash.atlassian.com/projects/CONFCLOUD/repos/confluence-frontend/commits/9129332a66d2b) -
  [ED-26431] Fix rounding error when calculating the TTVC targets

## 1.3.1

### Patch Changes

- [#109717](https://stash.atlassian.com/projects/CONFCLOUD/repos/confluence-frontend/pull-requests/109717)
  [`3f2415568258b`](https://stash.atlassian.com/projects/CONFCLOUD/repos/confluence-frontend/commits/3f2415568258b) -
  [ED-26435] Add option to override the timeout allowed to be tracked on EditorPerformanceObserver

## 1.3.0

### Minor Changes

- [#109060](https://stash.atlassian.com/projects/CONFCLOUD/repos/confluence-frontend/pull-requests/109060)
  [`4660ec858a305`](https://stash.atlassian.com/projects/CONFCLOUD/repos/confluence-frontend/commits/4660ec858a305) -
  Update `React` from v16 to v18

## 1.2.0

### Minor Changes

- [#107955](https://stash.atlassian.com/projects/CONFCLOUD/repos/confluence-frontend/pull-requests/107955)
  [`02bde230bde80`](https://stash.atlassian.com/projects/CONFCLOUD/repos/confluence-frontend/commits/02bde230bde80) -
  [AFO-3352] Multiple improvements to detect TTAI on Editor

  ## Timeline Hold Mechanism

  We've introduced a new hold mechanism to the Timeline system, allowing for better tracking and
  management of asynchronous operations:

  1. `TimelineHoldable` interface:

     - Defines a `hold` method to initiate a hold operation.
     - Returns an `UnHoldFunction` to release the hold when the operation is complete.

  2. New event types:
     - `HoldIdleStartEvent`: Marks the start of a hold operation.
     - `HoldIdleEndEvent`: Marks the end of a hold operation.
     - `HoldIdleTimeoutEvent`: Indicates when a hold operation has exceeded the maximum duration.

  These new features provide more precise control over idle time detection during asynchronous
  operations.

  ## Wrapper Functions for Web APIs

  1. `wrapperFetch`:

     - Integrates fetch calls with the Timeline system.
     - Automatically applies hold and unhold operations for each fetch call.

  2. `wrapperTimers`:
     - Integrates setTimeout and clearTimeout with the Timeline system.
     - Applies hold operations for timeouts between 0 and 2000ms.

  These wrappers enable seamless integration of common web APIs with the Timeline system.

  # Improvements

  ## Timeline Controller Enhancements

  1. Hold Management:

     - Implemented `checkHoldTimeout` to manage hold timeouts.
     - Modified `scheduleNextIdle` to respect active holds.

  2. Configuration:

     - Added `maxHoldDuration` to `TimelineOptions` to configure the maximum duration for holds.

  3. Subscription Management:
     - Implemented `onceAllSubscribersCleaned` method to allow cleanup operations when all
       subscribers are unsubscribed.

  ## Code Organization

  1. Split Timeline-related code into separate files:

     - `timelineTypes.ts`: Contains type definitions for Timeline events and options.
     - `timelineInterfaces.ts`: Defines interfaces for Timeline functionality.

  2. Improved modularity and maintainability of the codebase.

  ## EditorPerformanceObserver Updates

  - Modified to use both `TimelineClock` and `TimelineHoldable` interfaces.
  - Implemented wrapper application and cleanup logic.

  # Documentation Updates

  - Added comprehensive JSDoc for new interfaces and methods.
  - Updated existing documentation to reflect new functionality.

  # Testing

  - Added new test files: `wrapperFetch.test.ts` and `wrapperTimers.test.ts`.
  - Enhanced existing tests in `timeline.test.ts` to cover new functionality.
  - Added `editorPerformanceObserver.test.ts` to test wrapper application and cleanup.

  # Important Notes

  - These enhancements maintain backward compatibility with existing implementations.
  - The core timeline functionality remains unchanged; only new features have been added.
  - Wrapper functions are applied only when needed and cleaned up when no longer in use.

## 1.1.0

### Minor Changes

- [#102282](https://stash.atlassian.com/projects/CONFCLOUD/repos/confluence-frontend/pull-requests/102282)
  [`5e1d47c2c7c16`](https://stash.atlassian.com/projects/CONFCLOUD/repos/confluence-frontend/commits/5e1d47c2c7c16) - #
  New Features

  ## Enhanced Mouse Event Categories

  We've introduced two new categories for `onUserLatency` to provide more granular insights into
  mouse interactions:

  1. `mouse-movement`:

     - mouseenter
     - mouseleave
     - mousemove
     - mouseover
     - mouseout

  2. `mouse-action`:
     - click
     - dblclick
     - mousedown
     - mouseup
     - contextmenu

  These new categories offer more detailed control and analysis of different types of mouse events.

  # Improvements

  ## Timeline idle time

  The timeline is considered idle when no new events are added for a specific period. Previously,
  this duration was set to `60ms`. However, after some real-world tests, we found that increasing
  this duration to `200ms` provides a more stable TTAI result.

  This adjustment aims to enhance the accuracy and reliability of performance measurements by
  reducing premature idle detections, thus providing a more realistic assessment of user-perceived
  performance.

  ## React API Enhancements

  1. [ED-26251] Optimized Time to Actively Interactive (TTAI) for Time to Visually Complete (TTVC)

     - The `onTTVC` callback is now triggered immediately after the first idle slot, without waiting
       for a buffer threshold.
     - This change improves the accuracy and responsiveness of TTVC measurements.

  2. React API Refactoring
     - Improved code style and readability for easier maintenance and understanding.

  ## Performance Optimizations

  1. Task Splitting for Data Processing
     - Implemented chunk-based processing in `createHeatmapFromEvents` to prevent long-running
       blocking tasks.
     - This enhancement ensures better responsiveness, especially on slower devices.

  ## Documentation Updates

  - New comprehensive documentation for the React API is now available at
    `https://atlaskit.atlassian.com/packages/editor/editor-performance-metrics`.
  - The documentation provides detailed information on using and implementing performance metrics in
    React applications.

  # Important Notes

  - The core metric calculation methods remain unchanged; only the timing of calculations has been
    optimized.
  - Existing implementations should continue to function without requiring modifications.
  - These enhancements maintain the library's commitment to low-priority processing on the client
    side, adhering to performance best practices.

## 1.0.0

### Major Changes

- [#174435](https://stash.atlassian.com/projects/CONFCLOUD/repos/confluence-frontend/pull-requests/174435)
  [`fec297262a299`](https://stash.atlassian.com/projects/CONFCLOUD/repos/confluence-frontend/commits/fec297262a299) -
  [NO ISSUE] Initial code for Editor Performance Metrics
