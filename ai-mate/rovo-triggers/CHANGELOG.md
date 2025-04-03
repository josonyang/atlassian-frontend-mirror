# @atlaskit/rovo-triggers

## 2.10.0

### Minor Changes

- [#136531](https://bitbucket.org/atlassian/atlassian-frontend-monorepo/pull-requests/136531)
  [`bf09e88468d38`](https://bitbucket.org/atlassian/atlassian-frontend-monorepo/commits/bf09e88468d38) -
  Allow New Chat Payload to support ADF prompts.

## 2.9.0

### Minor Changes

- [#133407](https://bitbucket.org/atlassian/atlassian-frontend-monorepo/pull-requests/133407)
  [`9e51ca53f3752`](https://bitbucket.org/atlassian/atlassian-frontend-monorepo/commits/9e51ca53f3752) -
  Add JiraIssueWorkBreakdownAction type and support JiraIssueWorkBreakdownUIAction

## 2.8.0

### Minor Changes

- [#132823](https://bitbucket.org/atlassian/atlassian-frontend-monorepo/pull-requests/132823)
  [`baec8548ddfdd`](https://bitbucket.org/atlassian/atlassian-frontend-monorepo/commits/baec8548ddfdd) -
  Add support for status and rule presentation components in workflow builder rovo agent

## 2.7.1

### Patch Changes

- [#131989](https://bitbucket.org/atlassian/atlassian-frontend-monorepo/pull-requests/131989)
  [`3c353c272040f`](https://bitbucket.org/atlassian/atlassian-frontend-monorepo/commits/3c353c272040f) -
  Update types for Workflow builder Rovo agent, update agent icon, and add presentational card for
  transition actions

## 2.7.0

### Minor Changes

- [#131838](https://bitbucket.org/atlassian/atlassian-frontend-monorepo/pull-requests/131838)
  [`afdb0a7ae2e5b`](https://bitbucket.org/atlassian/atlassian-frontend-monorepo/commits/afdb0a7ae2e5b) -
  updated types for rovo workflow wizard agent

## 2.6.0

### Minor Changes

- [#131371](https://bitbucket.org/atlassian/atlassian-frontend-monorepo/pull-requests/131371)
  [`bcdda396edf72`](https://bitbucket.org/atlassian/atlassian-frontend-monorepo/commits/bcdda396edf72) -
  Support mimeType as optional prop in ChatNewPayload type

## 2.5.0

### Minor Changes

- [#130965](https://bitbucket.org/atlassian/atlassian-frontend-monorepo/pull-requests/130965)
  [`224b0a23d3ee0`](https://bitbucket.org/atlassian/atlassian-frontend-monorepo/commits/224b0a23d3ee0) -
  EDF-2621 Added open-browse-agent-sidebar payload type to open rovo chat with browse agent tab
  active.

## 2.4.0

### Minor Changes

- [#127018](https://bitbucket.org/atlassian/atlassian-frontend-monorepo/pull-requests/127018)
  [`a6014f18c038f`](https://bitbucket.org/atlassian/atlassian-frontend-monorepo/commits/a6014f18c038f) -
  Adding types for rovo trigger to invoke workflow editor actions via pub sub

## 2.3.0

### Minor Changes

- [#125175](https://bitbucket.org/atlassian/atlassian-frontend-monorepo/pull-requests/125175)
  [`0befa7f34e357`](https://bitbucket.org/atlassian/atlassian-frontend-monorepo/commits/0befa7f34e357) -
  Add `placeholderType` to `insert-prompt` pubsub event

## 2.2.0

### Minor Changes

- [#122105](https://bitbucket.org/atlassian/atlassian-frontend-monorepo/pull-requests/122105)
  [`73e1118517615`](https://bitbucket.org/atlassian/atlassian-frontend-monorepo/commits/73e1118517615) - -
  Support new pubsub event to send a placeholder prompt
  - Remove `rovo_conversation_starters_use_placeholder` FG

## 2.1.0

### Minor Changes

- [#119332](https://bitbucket.org/atlassian/atlassian-frontend-monorepo/pull-requests/119332)
  [`b1b3d91f244e2`](https://bitbucket.org/atlassian/atlassian-frontend-monorepo/commits/b1b3d91f244e2) -
  Migrate package to compiled

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

## 1.6.0

### Minor Changes

- [#115442](https://stash.atlassian.com/projects/CONFCLOUD/repos/confluence-frontend/pull-requests/115442)
  [`99a5dbb7e64f3`](https://stash.atlassian.com/projects/CONFCLOUD/repos/confluence-frontend/commits/99a5dbb7e64f3) -
  Add 3p action auth handling

## 1.5.0

### Minor Changes

- [#109060](https://stash.atlassian.com/projects/CONFCLOUD/repos/confluence-frontend/pull-requests/109060)
  [`4660ec858a305`](https://stash.atlassian.com/projects/CONFCLOUD/repos/confluence-frontend/commits/4660ec858a305) -
  Update `React` from v16 to v18

## 1.4.1

### Patch Changes

- [#170106](https://stash.atlassian.com/projects/CONFCLOUD/repos/confluence-frontend/pull-requests/170106)
  [`a77f143e57528`](https://stash.atlassian.com/projects/CONFCLOUD/repos/confluence-frontend/commits/a77f143e57528) -
  Fixed invalid styles that were not rendering.

## 1.4.0

### Minor Changes

- [#165779](https://stash.atlassian.com/projects/CONFCLOUD/repos/confluence-frontend/pull-requests/165779)
  [`e93c2da005e72`](https://stash.atlassian.com/projects/CONFCLOUD/repos/confluence-frontend/commits/e93c2da005e72) -
  Fix the change introduced in conversation-assistant 2.47.0, some chat-new event are overridden by
  agent-changed event

## 1.3.0

### Minor Changes

- [#162886](https://stash.atlassian.com/projects/CONFCLOUD/repos/confluence-frontend/pull-requests/162886)
  [`59490f4204eea`](https://stash.atlassian.com/projects/CONFCLOUD/repos/confluence-frontend/commits/59490f4204eea) -
  [https://product-fabric.atlassian.net/browse/EDF-1889](EDF-1889) - add subscription to rovo agent
  changes into the Editor AI plugin

## 1.2.0

### Minor Changes

- [#162034](https://stash.atlassian.com/projects/CONFCLOUD/repos/confluence-frontend/pull-requests/162034)
  [`b9b034c26952f`](https://stash.atlassian.com/projects/CONFCLOUD/repos/confluence-frontend/commits/b9b034c26952f) -
  Support publishing pubsub event through postMessage, and with acknowledgment receipt if the
  postMessage event is published. Will be used for smart-card agent embed inside iframe, as
  communication between iframe and the parent window.

## 1.1.0

### Minor Changes

- [#155717](https://stash.atlassian.com/projects/CONFCLOUD/repos/confluence-frontend/pull-requests/155717)
  [`8bb782c91fb02`](https://stash.atlassian.com/projects/CONFCLOUD/repos/confluence-frontend/commits/8bb782c91fb02) -
  Upgrade to react 18

## 1.0.0

### Major Changes

- [#153462](https://stash.atlassian.com/projects/CONFCLOUD/repos/confluence-frontend/pull-requests/153462)
  [`6c079f0811ae0`](https://stash.atlassian.com/projects/CONFCLOUD/repos/confluence-frontend/commits/6c079f0811ae0) -
  Initialize rovo-triggers
