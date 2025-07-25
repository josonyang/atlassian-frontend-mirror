# @atlaskit/collab-provider

## 11.0.5

### Patch Changes

- [#189298](https://bitbucket.org/atlassian/atlassian-frontend-monorepo/pull-requests/189298)
  [`3a30a4daecf45`](https://bitbucket.org/atlassian/atlassian-frontend-monorepo/commits/3a30a4daecf45) -
  always lock steps before setting readyToCommit:true
- Updated dependencies

## 11.0.4

### Patch Changes

- [#187144](https://bitbucket.org/atlassian/atlassian-frontend-monorepo/pull-requests/187144)
  [`a16147d8fbdfe`](https://bitbucket.org/atlassian/atlassian-frontend-monorepo/commits/a16147d8fbdfe) -
  Bump @atlaskit/adf-schema to v49.0.5
- Updated dependencies

## 11.0.3

### Patch Changes

- Updated dependencies

## 11.0.2

### Patch Changes

- [#184889](https://bitbucket.org/atlassian/atlassian-frontend-monorepo/pull-requests/184889)
  [`88f8c910a5608`](https://bitbucket.org/atlassian/atlassian-frontend-monorepo/commits/88f8c910a5608) -
  revert publish check for step merging changes
- Updated dependencies

## 11.0.1

### Patch Changes

- Updated dependencies

## 11.0.0

### Major Changes

- [#181024](https://bitbucket.org/atlassian/atlassian-frontend-monorepo/pull-requests/181024)
  [`8e80c487ca307`](https://bitbucket.org/atlassian/atlassian-frontend-monorepo/commits/8e80c487ca307) - ##
  Make `@atlaskit/editor-common` a peer dependency

  **WHAT:** `@atlaskit/editor-common` has been moved from `dependencies` to `peerDependencies` in
  all editor plugin packages.

  **WHY:** This change ensures that only a single version of `@atlaskit/editor-common` is used in
  consuming applications, preventing issues caused by multiple versions of singleton libraries (such
  as context mismatches or duplicated state). This is especially important for packages that rely on
  shared context or singletons.

  **HOW TO ADJUST:**

  - Consumers must now explicitly install `@atlaskit/editor-common` in their own project if they use
    any of these editor plugins.
  - Ensure the version you install matches the version required by the plugins.
  - You can use the
    [`check-peer-dependencies`](https://www.npmjs.com/package/check-peer-dependencies) package to
    verify that all required peer dependencies are installed and compatible.
  - Example install command:
    ```
    npm install @atlaskit/editor-common
    ```
    or
    ```
    yarn add @atlaskit/editor-common
    ```

  **Note:** This is a breaking change. If `@atlaskit/editor-common` is not installed at the
  application level, you may see errors or unexpected behavior.

### Patch Changes

- Updated dependencies

## 10.22.1

### Patch Changes

- [#181007](https://bitbucket.org/atlassian/atlassian-frontend-monorepo/pull-requests/181007)
  [`ec028c3374de5`](https://bitbucket.org/atlassian/atlassian-frontend-monorepo/commits/ec028c3374de5) -
  refactor to lock steps earlier in send flow

## 10.22.0

### Minor Changes

- [#179240](https://bitbucket.org/atlassian/atlassian-frontend-monorepo/pull-requests/179240)
  [`cf397492aea34`](https://bitbucket.org/atlassian/atlassian-frontend-monorepo/commits/cf397492aea34) -
  Revert 179240 - to support for custom authentication headers

### Patch Changes

- Updated dependencies

## 10.21.1

### Patch Changes

- [#179865](https://bitbucket.org/atlassian/atlassian-frontend-monorepo/pull-requests/179865)
  [`33dc1bfc85993`](https://bitbucket.org/atlassian/atlassian-frontend-monorepo/commits/33dc1bfc85993) -
  ED-28407 Offline Editing: Add logic that will mark offline steps as regular steps after 6s of
  being online. Added as a fallback incase there's issue with the offline storage plugin and it's
  unable to handle the steps.

## 10.21.0

### Minor Changes

- [#179240](https://bitbucket.org/atlassian/atlassian-frontend-monorepo/pull-requests/179240)
  [`a5d25b58c755a`](https://bitbucket.org/atlassian/atlassian-frontend-monorepo/commits/a5d25b58c755a) -
  Support for custom authentication headers

## 10.20.5

### Patch Changes

- Updated dependencies

## 10.20.4

### Patch Changes

- Updated dependencies

## 10.20.3

### Patch Changes

- [#173357](https://bitbucket.org/atlassian/atlassian-frontend-monorepo/pull-requests/173357)
  [`f17a667b25b42`](https://bitbucket.org/atlassian/atlassian-frontend-monorepo/commits/f17a667b25b42) -
  enable merging of prosemirror steps for single player sessions
- Updated dependencies

## 10.20.2

### Patch Changes

- Updated dependencies

## 10.20.1

### Patch Changes

- Updated dependencies

## 10.20.0

### Minor Changes

- [#169286](https://bitbucket.org/atlassian/atlassian-frontend-monorepo/pull-requests/169286)
  [`81e49898e84c9`](https://bitbucket.org/atlassian/atlassian-frontend-monorepo/commits/81e49898e84c9) -
  Enforce the WebSocekt only for Presence

### Patch Changes

- Updated dependencies

## 10.19.2

### Patch Changes

- [#168445](https://bitbucket.org/atlassian/atlassian-frontend-monorepo/pull-requests/168445)
  [`e794b0e5cc34e`](https://bitbucket.org/atlassian/atlassian-frontend-monorepo/commits/e794b0e5cc34e) -
  Add polling fallback log

## 10.19.1

### Patch Changes

- Updated dependencies

## 10.19.0

### Minor Changes

- [#165804](https://bitbucket.org/atlassian/atlassian-frontend-monorepo/pull-requests/165804)
  [`0480ffe1dfd8e`](https://bitbucket.org/atlassian/atlassian-frontend-monorepo/commits/0480ffe1dfd8e) -
  Use WebSocket first, polling later strategy, eliminate the need of the cloudId check

## 10.18.0

### Minor Changes

- [#165030](https://bitbucket.org/atlassian/atlassian-frontend-monorepo/pull-requests/165030)
  [`ee08b24ec9d2a`](https://bitbucket.org/atlassian/atlassian-frontend-monorepo/commits/ee08b24ec9d2a) -
  Enable the polling fallback only for selected tenants

### Patch Changes

- Updated dependencies

## 10.17.1

### Patch Changes

- [#162445](https://bitbucket.org/atlassian/atlassian-frontend-monorepo/pull-requests/162445)
  [`92f2644f74083`](https://bitbucket.org/atlassian/atlassian-frontend-monorepo/commits/92f2644f74083) -
  ED-27831: Throw collab sync error in console
- Updated dependencies

## 10.17.0

### Minor Changes

- [#153673](https://bitbucket.org/atlassian/atlassian-frontend-monorepo/pull-requests/153673)
  [`32e178390aff5`](https://bitbucket.org/atlassian/atlassian-frontend-monorepo/commits/32e178390aff5) -
  Update to onRestore to use generatedSteps from fetchReconcile: allows the client to recover by
  applying just the necessary changes rather than replacing the entire document state, which is more
  efficient and should preserve more of the user's local context.

## 10.16.3

### Patch Changes

- Updated dependencies

## 10.16.2

### Patch Changes

- Updated dependencies

## 10.16.1

### Patch Changes

- Updated dependencies

## 10.16.0

### Minor Changes

- [#158254](https://bitbucket.org/atlassian/atlassian-frontend-monorepo/pull-requests/158254)
  [`9ce9448c0e11a`](https://bitbucket.org/atlassian/atlassian-frontend-monorepo/commits/9ce9448c0e11a) -
  Add auto-close for Presence connections when window is in background

### Patch Changes

- Updated dependencies

## 10.15.0

### Minor Changes

- [#157909](https://bitbucket.org/atlassian/atlassian-frontend-monorepo/pull-requests/157909)
  [`384136c930190`](https://bitbucket.org/atlassian/atlassian-frontend-monorepo/commits/384136c930190) -
  Add support for initializing collab-provider with presenceActivity

## 10.14.4

### Patch Changes

- [#144227](https://bitbucket.org/atlassian/atlassian-frontend-monorepo/pull-requests/144227)
  [`6da190d8e3a24`](https://bitbucket.org/atlassian/atlassian-frontend-monorepo/commits/6da190d8e3a24) -
  Add ability to rebase drag and drop content
- [#155123](https://bitbucket.org/atlassian/atlassian-frontend-monorepo/pull-requests/155123)
  [`51d32b995a851`](https://bitbucket.org/atlassian/atlassian-frontend-monorepo/commits/51d32b995a851) -
  ED-27636 Offline Editing: Add catchup reason and other metadata to catchup failure error log in
  collab provider.
- Updated dependencies

## 10.14.3

### Patch Changes

- Updated dependencies

## 10.14.2

### Patch Changes

- Updated dependencies

## 10.14.1

### Patch Changes

- [#140813](https://bitbucket.org/atlassian/atlassian-frontend-monorepo/pull-requests/140813)
  [`c4756a5c1a4ae`](https://bitbucket.org/atlassian/atlassian-frontend-monorepo/commits/c4756a5c1a4ae) -
  Migrating offline editing feature gates to a new experiment "platform_editor_offline_editing_web"
- Updated dependencies

## 10.14.0

### Minor Changes

- [#137682](https://bitbucket.org/atlassian/atlassian-frontend-monorepo/pull-requests/137682)
  [`80820b783abde`](https://bitbucket.org/atlassian/atlassian-frontend-monorepo/commits/80820b783abde) -
  clean up tagUnconfirmedStepsAfterRecovery FG

## 10.13.0

### Minor Changes

- [#138056](https://bitbucket.org/atlassian/atlassian-frontend-monorepo/pull-requests/138056)
  [`924f5d2700991`](https://bitbucket.org/atlassian/atlassian-frontend-monorepo/commits/924f5d2700991) -
  add getDocumentAri(): expose provider's documentAri via getter function

## 10.12.1

### Patch Changes

- Updated dependencies

## 10.12.0

### Minor Changes

- [#136400](https://bitbucket.org/atlassian/atlassian-frontend-monorepo/pull-requests/136400)
  [`33cb0f625cf8c`](https://bitbucket.org/atlassian/atlassian-frontend-monorepo/commits/33cb0f625cf8c) -
  clean up logObfuscatedSteps feature flag

## 10.11.1

### Patch Changes

- [#135065](https://bitbucket.org/atlassian/atlassian-frontend-monorepo/pull-requests/135065)
  [`26470c154bcf0`](https://bitbucket.org/atlassian/atlassian-frontend-monorepo/commits/26470c154bcf0) -
  Update step validation feature gate key
- Updated dependencies

## 10.11.0

### Minor Changes

- [#130166](https://bitbucket.org/atlassian/atlassian-frontend-monorepo/pull-requests/130166)
  [`1d522a3c3f04a`](https://bitbucket.org/atlassian/atlassian-frontend-monorepo/commits/1d522a3c3f04a) -
  handle corrupt step validation errors and tag first steps from client

### Patch Changes

- Updated dependencies

## 10.10.2

### Patch Changes

- Updated dependencies

## 10.10.1

### Patch Changes

- Updated dependencies

## 10.10.0

### Minor Changes

- [#128275](https://bitbucket.org/atlassian/atlassian-frontend-monorepo/pull-requests/128275)
  [`a97b0e9ee8269`](https://bitbucket.org/atlassian/atlassian-frontend-monorepo/commits/a97b0e9ee8269) -
  PCS-384453: addresses a bug where steps being sent while buffering/not yet connected will cause
  the steps commit queue to be in a 5s timeout. this causes issues when a publish or other step
  commits occur once the connection establishes (affects slow connections and pages that initialise
  connection slowly)

### Patch Changes

- Updated dependencies

## 10.9.4

### Patch Changes

- [#124114](https://bitbucket.org/atlassian/atlassian-frontend-monorepo/pull-requests/124114)
  [`a0b9383dc1bf3`](https://bitbucket.org/atlassian/atlassian-frontend-monorepo/commits/a0b9383dc1bf3) -
  CEPS-362: add reason to getResolvedEditorState call chain, to allow collab provider/NCS to
  differentiate between draft sync and publish use cases
- Updated dependencies

## 10.9.3

### Patch Changes

- [#122605](https://bitbucket.org/atlassian/atlassian-frontend-monorepo/pull-requests/122605)
  [`1bf1493f744ce`](https://bitbucket.org/atlassian/atlassian-frontend-monorepo/commits/1bf1493f744ce) -
  [ux] Add conflict metadata on reconnection
- Updated dependencies

## 10.9.2

### Patch Changes

- Updated dependencies

## 10.9.1

### Patch Changes

- Updated dependencies

## 10.9.0

### Minor Changes

- [#120472](https://bitbucket.org/atlassian/atlassian-frontend-monorepo/pull-requests/120472)
  [`73c800ab5f2fc`](https://bitbucket.org/atlassian/atlassian-frontend-monorepo/commits/73c800ab5f2fc) -
  ED-26766 update adf-schema from 47.2.1 to 47.6.0 and adf-schema-json from 1.27.0 to 1.31.0

### Patch Changes

- Updated dependencies

## 10.8.1

### Patch Changes

- [#120905](https://bitbucket.org/atlassian/atlassian-frontend-monorepo/pull-requests/120905)
  [`4194ea903d7d6`](https://bitbucket.org/atlassian/atlassian-frontend-monorepo/commits/4194ea903d7d6) -
  Refactor step merging while offline.

## 10.8.0

### Minor Changes

- [#117768](https://bitbucket.org/atlassian/atlassian-frontend-monorepo/pull-requests/117768)
  [`d55a8d95dd68a`](https://bitbucket.org/atlassian/atlassian-frontend-monorepo/commits/d55a8d95dd68a) -
  Add support for presenceActivity changes within collab provider. Remove unused code from original
  presence experiment.

### Patch Changes

- Updated dependencies

## 10.7.3

### Patch Changes

- [#117438](https://bitbucket.org/atlassian/atlassian-frontend-monorepo/pull-requests/117438)
  [`0de6100bab361`](https://bitbucket.org/atlassian/atlassian-frontend-monorepo/commits/0de6100bab361) -
  CEPS-219: The collab provider waits for an ACK from NCS before committing the enxt batch of steps,
  but there is a timeout of 5s in case this ACK is lost. Since we are now intentionally increasing
  this ack for single player sessions, this causes unwanted behvaiour if the ack is 5s or more, as
  the provider will re-send even though an ack is in flight. We increase the window to 20s so that
  we have a bigger window of ack delay values we can experiment with.

## 10.7.2

### Patch Changes

- Updated dependencies

## 10.7.1

### Patch Changes

- [#116044](https://stash.atlassian.com/projects/CONFCLOUD/repos/confluence-frontend/pull-requests/116044)
  [`927dd6876fbca`](https://stash.atlassian.com/projects/CONFCLOUD/repos/confluence-frontend/commits/927dd6876fbca) -
  Fix obfuscated doc logging for onRestore

## 10.7.0

### Minor Changes

- [#115482](https://stash.atlassian.com/projects/CONFCLOUD/repos/confluence-frontend/pull-requests/115482)
  [`5c3199f49f3c7`](https://stash.atlassian.com/projects/CONFCLOUD/repos/confluence-frontend/commits/5c3199f49f3c7) -
  Added analytics tracking for rebased steps

### Patch Changes

- [#115191](https://stash.atlassian.com/projects/CONFCLOUD/repos/confluence-frontend/pull-requests/115191)
  [`83e0a3ca379fa`](https://stash.atlassian.com/projects/CONFCLOUD/repos/confluence-frontend/commits/83e0a3ca379fa) -
  CEPS-362: pass a forcePublish flag to NCS backend when committing steps via publish - this is so
  that we can remoev ackDelays for publish
- Updated dependencies

## 10.6.2

### Patch Changes

- Updated dependencies

## 10.6.1

### Patch Changes

- [#112186](https://stash.atlassian.com/projects/CONFCLOUD/repos/confluence-frontend/pull-requests/112186)
  [`9462d8ca2405a`](https://stash.atlassian.com/projects/CONFCLOUD/repos/confluence-frontend/commits/9462d8ca2405a) -
  Bump adf-schema to 47.2.1

## 10.6.0

### Minor Changes

- [#105322](https://stash.atlassian.com/projects/CONFCLOUD/repos/confluence-frontend/pull-requests/105322)
  [`8876083532adc`](https://stash.atlassian.com/projects/CONFCLOUD/repos/confluence-frontend/commits/8876083532adc) -
  Bumped editor-prosemirror version to 7.0.0

### Patch Changes

- Updated dependencies

## 10.5.2

### Patch Changes

- [#109636](https://stash.atlassian.com/projects/CONFCLOUD/repos/confluence-frontend/pull-requests/109636)
  [`2eadf04054ac2`](https://stash.atlassian.com/projects/CONFCLOUD/repos/confluence-frontend/commits/2eadf04054ac2) -
  [ux] Introduces way to retrieve the document from offline if there is a possible conflict event on
  reconnection.
- Updated dependencies

## 10.5.1

### Patch Changes

- Updated dependencies

## 10.5.0

### Minor Changes

- [#107250](https://stash.atlassian.com/projects/CONFCLOUD/repos/confluence-frontend/pull-requests/107250)
  [`9a71e848fdc06`](https://stash.atlassian.com/projects/CONFCLOUD/repos/confluence-frontend/commits/9a71e848fdc06) -
  Send collabMode flag to NCS via step commits

### Patch Changes

- Updated dependencies

## 10.4.1

### Patch Changes

- [#104569](https://stash.atlassian.com/projects/CONFCLOUD/repos/confluence-frontend/pull-requests/104569)
  [`b79a89c03faf9`](https://stash.atlassian.com/projects/CONFCLOUD/repos/confluence-frontend/commits/b79a89c03faf9) -
  log obfuscated steps for transactions in view only

## 10.4.0

### Minor Changes

- [#102499](https://stash.atlassian.com/projects/CONFCLOUD/repos/confluence-frontend/pull-requests/102499)
  [`c1bfe8b68a35e`](https://stash.atlassian.com/projects/CONFCLOUD/repos/confluence-frontend/commits/c1bfe8b68a35e) -
  log obfuscated steps in collab provider when catchup out of sync

### Patch Changes

- Updated dependencies

## 10.3.4

### Patch Changes

- Updated dependencies

## 10.3.3

### Patch Changes

- [#99251](https://stash.atlassian.com/projects/CONFCLOUD/repos/confluence-frontend/pull-requests/99251)
  [`df1d982fa96ba`](https://stash.atlassian.com/projects/CONFCLOUD/repos/confluence-frontend/commits/df1d982fa96ba) -
  Add additional metadata for reconnection analytics to include step length.
- Updated dependencies

## 10.3.2

### Patch Changes

- Updated dependencies

## 10.3.1

### Patch Changes

- Updated dependencies

## 10.3.0

### Minor Changes

- [#180231](https://stash.atlassian.com/projects/CONFCLOUD/repos/confluence-frontend/pull-requests/180231)
  [`4dbcc3d03b632`](https://stash.atlassian.com/projects/CONFCLOUD/repos/confluence-frontend/commits/4dbcc3d03b632) -
  [https://product-fabric.atlassian.net/browse/EDF-1844](EDF-1844) - cleanup
  platform_editor_ai_facepile Statsig experiment

## 10.2.2

### Patch Changes

- [#177897](https://stash.atlassian.com/projects/CONFCLOUD/repos/confluence-frontend/pull-requests/177897)
  [`f2e0ea2ac3c20`](https://stash.atlassian.com/projects/CONFCLOUD/repos/confluence-frontend/commits/f2e0ea2ac3c20) -
  FF restore_localstep_fallback_reconcile to handle offline user onRestoredocument with
  applyLocalSteps and fallback using fetchReoncile
- Updated dependencies

## 10.2.1

### Patch Changes

- Updated dependencies

## 10.2.0

### Minor Changes

- [#169676](https://stash.atlassian.com/projects/CONFCLOUD/repos/confluence-frontend/pull-requests/169676)
  [`141d88bf511d4`](https://stash.atlassian.com/projects/CONFCLOUD/repos/confluence-frontend/commits/141d88bf511d4) -
  [ux] EDF-2302 Facepile bug fixes - rehydration, avatar update + analytics

## 10.1.3

### Patch Changes

- [#165765](https://stash.atlassian.com/projects/CONFCLOUD/repos/confluence-frontend/pull-requests/165765)
  [`3f441f30e6507`](https://stash.atlassian.com/projects/CONFCLOUD/repos/confluence-frontend/commits/3f441f30e6507) -
  Bump adf-schema to 46.0.0
- Updated dependencies

## 10.1.2

### Patch Changes

- [#168141](https://stash.atlassian.com/projects/CONFCLOUD/repos/confluence-frontend/pull-requests/168141)
  [`7f239fc40666c`](https://stash.atlassian.com/projects/CONFCLOUD/repos/confluence-frontend/commits/7f239fc40666c) -
  CP getIsNamespaceLocked API

## 10.1.1

### Patch Changes

- [#168466](https://stash.atlassian.com/projects/CONFCLOUD/repos/confluence-frontend/pull-requests/168466)
  [`c99d4b41e3ddd`](https://stash.atlassian.com/projects/CONFCLOUD/repos/confluence-frontend/commits/c99d4b41e3ddd) -
  ED-25632 Allow node nesting transform errors to be logged in Editor collab-provider

## 10.1.0

### Minor Changes

- [#167312](https://stash.atlassian.com/projects/CONFCLOUD/repos/confluence-frontend/pull-requests/167312)
  [`4fe6eb3b36fc3`](https://stash.atlassian.com/projects/CONFCLOUD/repos/confluence-frontend/commits/4fe6eb3b36fc3) -
  Add support for optional properties, presenceId and presenceActivity, within collab-provider

### Patch Changes

- Updated dependencies

## 10.0.0

### Major Changes

- [#165049](https://stash.atlassian.com/projects/CONFCLOUD/repos/confluence-frontend/pull-requests/165049)
  [`febce5463e07f`](https://stash.atlassian.com/projects/CONFCLOUD/repos/confluence-frontend/commits/febce5463e07f) -
  Enable no-re-export rule for a subset of editor packages

  ### Major

  #### @atlaskit/collab-provider

  @atlaskit/collab-provider doesn't export following types anymore:

  ```
  CollabParticipant,
  CollabEventInitData,
  CollabEventRemoteData,
  CollabEventConnectionData,
  CollabEventConnectingData,
  CollabEventPresenceData,
  ResolvedEditorState,
  CollabConnectedPayload,
  CollabConnectingPayload,
  CollabDisconnectedPayload,
  CollabInitPayload,
  CollabDataPayload,
  CollabTelepointerPayload,
  CollabPresencePayload,
  CollabMetadataPayload,
  CollabLocalStepsPayload,
  CollabCommitStatusEventPayload,
  CollabPermissionEventPayload,
  UserPermitType,
  CollabEvents,
  Metadata,
  StepJson,
  CollabEventTelepointerData,
  CollabSendableSelection,
  CollabEditProvider,
  NewCollabSyncUpErrorAttributes,
  SyncUpErrorFunction,
  CollabEventLocalStepData,
  ```

  Import them from `@atlaskit/editor-common/collab`.

  #### @atlaskit/editor-common

  `@atlaskit/editor-common/provider-factory` doesn't export following types anymore:

  ```
  CardAdf,
  DatasourceAdf,
  ```

  Import them from `@atlaskit/smart-card`.

### Patch Changes

- [#166394](https://stash.atlassian.com/projects/CONFCLOUD/repos/confluence-frontend/pull-requests/166394)
  [`ec83c51a9acba`](https://stash.atlassian.com/projects/CONFCLOUD/repos/confluence-frontend/commits/ec83c51a9acba) -
  Add analytics on reconnection events
- Updated dependencies

## 9.46.0

### Minor Changes

- [#163507](https://stash.atlassian.com/projects/CONFCLOUD/repos/confluence-frontend/pull-requests/163507)
  [`2fe2661c3c1e0`](https://stash.atlassian.com/projects/CONFCLOUD/repos/confluence-frontend/commits/2fe2661c3c1e0) -
  EDF-1842 Push agent information to collab session

### Patch Changes

- Updated dependencies

## 9.45.0

### Minor Changes

- [#163776](https://stash.atlassian.com/projects/CONFCLOUD/repos/confluence-frontend/pull-requests/163776)
  [`45d76610f271d`](https://stash.atlassian.com/projects/CONFCLOUD/repos/confluence-frontend/commits/45d76610f271d) -
  Add support for optional property, isGuest, on CollabProvider

### Patch Changes

- Updated dependencies

## 9.44.1

### Patch Changes

- [#159176](https://stash.atlassian.com/projects/CONFCLOUD/repos/confluence-frontend/pull-requests/159176)
  [`8f1d77592a9dc`](https://stash.atlassian.com/projects/CONFCLOUD/repos/confluence-frontend/commits/8f1d77592a9dc) -
  Bump adf-schema to 44.2.0

## 9.44.0

### Minor Changes

- [#158040](https://stash.atlassian.com/projects/CONFCLOUD/repos/confluence-frontend/pull-requests/158040)
  [`3dbb9d2f67580`](https://stash.atlassian.com/projects/CONFCLOUD/repos/confluence-frontend/commits/3dbb9d2f67580) -
  log when error processing steps from different clientId, same userId

## 9.43.3

### Patch Changes

- [#154186](https://stash.atlassian.com/projects/CONFCLOUD/repos/confluence-frontend/pull-requests/154186)
  [`5c316170d29dd`](https://stash.atlassian.com/projects/CONFCLOUD/repos/confluence-frontend/commits/5c316170d29dd) -
  Bump @atlaskit/adf-schema to 42.3.1
- Updated dependencies

## 9.43.2

### Patch Changes

- [#153986](https://stash.atlassian.com/projects/CONFCLOUD/repos/confluence-frontend/pull-requests/153986)
  [`ce61c835c3b6a`](https://stash.atlassian.com/projects/CONFCLOUD/repos/confluence-frontend/commits/ce61c835c3b6a) -
  allow editorApi to be used to update state in collab plugin

## 9.43.1

### Patch Changes

- [#152510](https://stash.atlassian.com/projects/CONFCLOUD/repos/confluence-frontend/pull-requests/152510)
  [`dcf9edde7ac7b`](https://stash.atlassian.com/projects/CONFCLOUD/repos/confluence-frontend/commits/dcf9edde7ac7b) -
  bump adf-schema to 42.0.1
- Updated dependencies

## 9.43.0

### Minor Changes

- [#151190](https://stash.atlassian.com/projects/CONFCLOUD/repos/confluence-frontend/pull-requests/151190)
  [`a3723b1cdede2`](https://stash.atlassian.com/projects/CONFCLOUD/repos/confluence-frontend/commits/a3723b1cdede2) -
  [ux] [ED-25037] this change bumps @atlaskit/adf-schema from 40.9.0 to 40.9.4 which makes the
  blockquote selectable, adds missing marks to the PM node spec and fixes a bug that converted
  pasted external images to media groups.

### Patch Changes

- Updated dependencies

## 9.42.5

### Patch Changes

- [#149960](https://stash.atlassian.com/projects/CONFCLOUD/repos/confluence-frontend/pull-requests/149960)
  [`46d3d1b5db7c6`](https://stash.atlassian.com/projects/CONFCLOUD/repos/confluence-frontend/commits/46d3d1b5db7c6) -
  Provide more details for collab provider readme

## 9.42.4

### Patch Changes

- [#147741](https://stash.atlassian.com/projects/CONFCLOUD/repos/confluence-frontend/pull-requests/147741)
  [`29cf124342cb8`](https://stash.atlassian.com/projects/CONFCLOUD/repos/confluence-frontend/commits/29cf124342cb8) -
  Rename the provider initial presence feature func be more general

## 9.42.3

### Patch Changes

- Updated dependencies

## 9.42.2

### Patch Changes

- [#147660](https://stash.atlassian.com/projects/CONFCLOUD/repos/confluence-frontend/pull-requests/147660)
  [`9b66ba02b702e`](https://stash.atlassian.com/projects/CONFCLOUD/repos/confluence-frontend/commits/9b66ba02b702e) -
  Add README.md to guide integrating with collab-provider

## 9.42.1

### Patch Changes

- Updated dependencies

## 9.42.0

### Minor Changes

- [`5fa9ea9b315ed`](https://stash.atlassian.com/projects/CONFCLOUD/repos/confluence-frontend/commits/5fa9ea9b315ed) -
  add triggeredByCatchup attribute to restore analytics events

### Patch Changes

- [#145458](https://stash.atlassian.com/projects/CONFCLOUD/repos/confluence-frontend/pull-requests/145458)
  [`8110e24294e2b`](https://stash.atlassian.com/projects/CONFCLOUD/repos/confluence-frontend/commits/8110e24294e2b) -
  Deep cleanup of enablecatchupv2 FF
- Updated dependencies

## 9.41.1

### Patch Changes

- [#144942](https://stash.atlassian.com/projects/CONFCLOUD/repos/confluence-frontend/pull-requests/144942)
  [`9f19a184c951d`](https://stash.atlassian.com/projects/CONFCLOUD/repos/confluence-frontend/commits/9f19a184c951d) -
  Removing stale code for catchup v1

## 9.41.0

### Minor Changes

- [#144504](https://stash.atlassian.com/projects/CONFCLOUD/repos/confluence-frontend/pull-requests/144504)
  [`b193c17f3732d`](https://stash.atlassian.com/projects/CONFCLOUD/repos/confluence-frontend/commits/b193c17f3732d) -
  Expose method to get ProseMirror version to collab provider

## 9.40.6

### Patch Changes

- Updated dependencies

## 9.40.5

### Patch Changes

- [#143146](https://stash.atlassian.com/projects/CONFCLOUD/repos/confluence-frontend/pull-requests/143146)
  [`5df86b2c5407e`](https://stash.atlassian.com/projects/CONFCLOUD/repos/confluence-frontend/commits/5df86b2c5407e) -
  Retire getVersion using getCollabState from prosemirror-collab, and adding error events on
  checking undefined collab state in all collab-provider usages
- Updated dependencies

## 9.40.4

### Patch Changes

- Updated dependencies

## 9.40.3

### Patch Changes

- [#136861](https://stash.atlassian.com/projects/CONFCLOUD/repos/confluence-frontend/pull-requests/136861)
  [`d640bacacaa13`](https://stash.atlassian.com/projects/CONFCLOUD/repos/confluence-frontend/commits/d640bacacaa13) -
  bumped react-magnetic-di to 3.1.4

## 9.40.2

### Patch Changes

- [#139334](https://stash.atlassian.com/projects/CONFCLOUD/repos/confluence-frontend/pull-requests/139334)
  [`30793649657c0`](https://stash.atlassian.com/projects/CONFCLOUD/repos/confluence-frontend/commits/30793649657c0) -
  [HOT-111629] We had an incident where the last character disappears when hitting the enter key on
  windows OS for Korean characters. Bumping to prosemirror-view@1.34.2 for the fix.

## 9.40.1

### Patch Changes

- Updated dependencies

## 9.40.0

### Minor Changes

- [#137821](https://stash.atlassian.com/projects/CONFCLOUD/repos/confluence-frontend/pull-requests/137821)
  [`2df9b55e7e2c8`](https://stash.atlassian.com/projects/CONFCLOUD/repos/confluence-frontend/commits/2df9b55e7e2c8) -
  use applyLocalSteps for targeted onRestore, add clientId to logs

### Patch Changes

- Updated dependencies

## 9.39.0

### Minor Changes

- [#138046](https://stash.atlassian.com/projects/CONFCLOUD/repos/confluence-frontend/pull-requests/138046)
  [`0291f7bee806e`](https://stash.atlassian.com/projects/CONFCLOUD/repos/confluence-frontend/commits/0291f7bee806e) -
  HOT-111468: specifically for experiment teammate presence - add a new method
  `setupPresenceOnly_do_not_use`, and opt out the document service and api by implementing the
  `NullDocumentService` and `NullApi` objects when passed in by calling the new setup method, make
  sure to pass in `clientId`

## 9.38.1

### Patch Changes

- [#136958](https://stash.atlassian.com/projects/CONFCLOUD/repos/confluence-frontend/pull-requests/136958)
  [`e1fd99410b2a7`](https://stash.atlassian.com/projects/CONFCLOUD/repos/confluence-frontend/commits/e1fd99410b2a7) -
  Adding reasons for BE catchup calls
- Updated dependencies

## 9.38.0

### Minor Changes

- [#137505](https://stash.atlassian.com/projects/CONFCLOUD/repos/confluence-frontend/pull-requests/137505)
  [`ed3b11d42c169`](https://stash.atlassian.com/projects/CONFCLOUD/repos/confluence-frontend/commits/ed3b11d42c169) -
  add ability to target a clientId for restore

### Patch Changes

- Updated dependencies

## 9.37.7

### Patch Changes

- [#137379](https://stash.atlassian.com/projects/CONFCLOUD/repos/confluence-frontend/pull-requests/137379)
  [`b635019594ddd`](https://stash.atlassian.com/projects/CONFCLOUD/repos/confluence-frontend/commits/b635019594ddd) -
  Adding new subProduct tag in collab provider analytics event
- Updated dependencies

## 9.37.6

### Patch Changes

- [#137366](https://stash.atlassian.com/projects/CONFCLOUD/repos/confluence-frontend/pull-requests/137366)
  [`44c333f52bfa6`](https://stash.atlassian.com/projects/CONFCLOUD/repos/confluence-frontend/commits/44c333f52bfa6) -
  Avoid left undefined clientId in collab-provider

## 9.37.5

### Patch Changes

- [#136085](https://stash.atlassian.com/projects/CONFCLOUD/repos/confluence-frontend/pull-requests/136085)
  [`88f45948976f6`](https://stash.atlassian.com/projects/CONFCLOUD/repos/confluence-frontend/commits/88f45948976f6) -
  Bump version of socket.io-client used to patch vulnerability in ws library

## 9.37.4

### Patch Changes

- [#134213](https://stash.atlassian.com/projects/CONFCLOUD/repos/confluence-frontend/pull-requests/134213)
  [`93bd7032842ec`](https://stash.atlassian.com/projects/CONFCLOUD/repos/confluence-frontend/commits/93bd7032842ec) -
  [ux] [ED-24636] Bump ADF Schema package

## 9.37.3

### Patch Changes

- Updated dependencies

## 9.37.2

### Patch Changes

- [#129573](https://stash.atlassian.com/projects/CONFCLOUD/repos/confluence-frontend/pull-requests/129573)
  [`9e66ad571558c`](https://stash.atlassian.com/projects/CONFCLOUD/repos/confluence-frontend/commits/9e66ad571558c) -
  To heavily sample the collab-provider.telepointer performance portal SLO

## 9.37.1

### Patch Changes

- Updated dependencies

## 9.37.0

### Minor Changes

- [#128347](https://stash.atlassian.com/projects/CONFCLOUD/repos/confluence-frontend/pull-requests/128347)
  [`e33566cebd5d1`](https://stash.atlassian.com/projects/CONFCLOUD/repos/confluence-frontend/commits/e33566cebd5d1) -
  [ED-24175] bump @atlaskit/adf-schema to 40.8.1 and @atlassian/adf-schema-json to 1.22.0 to
  promotecodeblocks & media in quotes, and nested expands in expands to full schema, and allow
  quotes in panels and decisions in lists in stage0 schema, and a validator spec change

### Patch Changes

- Updated dependencies

## 9.36.1

### Patch Changes

- Updated dependencies

## 9.36.0

### Minor Changes

- [#124209](https://stash.atlassian.com/projects/CONFCLOUD/repos/confluence-frontend/pull-requests/124209)
  [`8aa1792f12ed3`](https://stash.atlassian.com/projects/CONFCLOUD/repos/confluence-frontend/commits/8aa1792f12ed3) -
  bump @atlaskit/editor-prosemirror to 5.0.0, bump @atlaskit/adf-schema to 40.1.0

### Patch Changes

- Updated dependencies

## 9.35.0

### Minor Changes

- [#122895](https://stash.atlassian.com/projects/CONFCLOUD/repos/confluence-frontend/pull-requests/122895)
  [`49b8c7658f3b5`](https://stash.atlassian.com/projects/CONFCLOUD/repos/confluence-frontend/commits/49b8c7658f3b5) -
  [ED-24173] bump @atlaskit/adf-schema to 40.3.0 and @atlassian/adf-schema-json to 1.18.0

### Patch Changes

- Updated dependencies

## 9.34.0

### Minor Changes

- [#122648](https://stash.atlassian.com/projects/CONFCLOUD/repos/confluence-frontend/pull-requests/122648)
  [`f2ccf293106d2`](https://stash.atlassian.com/projects/CONFCLOUD/repos/confluence-frontend/commits/f2ccf293106d2) -
  add getSessionId(): expose provider's sessionId through getter, fix onParticipantActivityAck

## 9.33.2

### Patch Changes

- Updated dependencies

## 9.33.1

### Patch Changes

- Updated dependencies

## 9.33.0

### Minor Changes

- [#119314](https://stash.atlassian.com/projects/CONFCLOUD/repos/confluence-frontend/pull-requests/119314)
  [`e7b05702b37eb`](https://stash.atlassian.com/projects/CONFCLOUD/repos/confluence-frontend/commits/e7b05702b37eb) -
  Include session id in the activity join/ack data

### Patch Changes

- Updated dependencies

## 9.32.3

### Patch Changes

- Updated dependencies

## 9.32.2

### Patch Changes

- [#114548](https://stash.atlassian.com/projects/CONFCLOUD/repos/confluence-frontend/pull-requests/114548)
  [`8b2d47bffb50e`](https://stash.atlassian.com/projects/CONFCLOUD/repos/confluence-frontend/commits/8b2d47bffb50e) -
  bump adf-schema version
- Updated dependencies

## 9.32.1

### Patch Changes

- Updated dependencies

## 9.32.0

### Minor Changes

- [#115247](https://stash.atlassian.com/projects/CONFCLOUD/repos/confluence-frontend/pull-requests/115247)
  [`251d23ff9e6c8`](https://stash.atlassian.com/projects/CONFCLOUD/repos/confluence-frontend/commits/251d23ff9e6c8) -
  upgrade adf-schema version to 38.0.0

### Patch Changes

- Updated dependencies

## 9.31.0

### Minor Changes

- [#114811](https://stash.atlassian.com/projects/CONFCLOUD/repos/confluence-frontend/pull-requests/114811)
  [`ad0d2f10ef71b`](https://stash.atlassian.com/projects/CONFCLOUD/repos/confluence-frontend/commits/ad0d2f10ef71b) -
  CONFONBO-3268: Changes for the experiment Teammate Presence: expose 2 new collab events to add
  statuses (viewing/editing) to Confluence

### Patch Changes

- Updated dependencies

## 9.30.1

### Patch Changes

- Updated dependencies

## 9.30.0

### Minor Changes

- [#114156](https://stash.atlassian.com/projects/CONFCLOUD/repos/confluence-frontend/pull-requests/114156)
  [`bc6a63af2d1d0`](https://stash.atlassian.com/projects/CONFCLOUD/repos/confluence-frontend/commits/bc6a63af2d1d0) -
  Bump adf-schema to 37.0.0 and adf-schema-json to 1.16.0

### Patch Changes

- Updated dependencies

## 9.29.3

### Patch Changes

- Updated dependencies

## 9.29.2

### Patch Changes

- [#102478](https://stash.atlassian.com/projects/CONFCLOUD/repos/confluence-frontend/pull-requests/102478)
  [`3378951608b0`](https://stash.atlassian.com/projects/CONFCLOUD/repos/confluence-frontend/commits/3378951608b0) -
  [ED-23332] Update adf-schema package to 36.10.1
- Updated dependencies

## 9.29.1

### Patch Changes

- [#101524](https://stash.atlassian.com/projects/CONFCLOUD/repos/confluence-frontend/pull-requests/101524)
  [`4821570088e6`](https://stash.atlassian.com/projects/CONFCLOUD/repos/confluence-frontend/commits/4821570088e6) -
  ED-23362 Bump ADF schema to version 36.8.1 and add support for adf validation and transformation

## 9.29.0

### Minor Changes

- [#99579](https://stash.atlassian.com/projects/CONFCLOUD/repos/confluence-frontend/pull-requests/99579)
  [`f222af5687e9`](https://stash.atlassian.com/projects/CONFCLOUD/repos/confluence-frontend/commits/f222af5687e9) -
  Bump adf-schema to 36.3.0 and adf-schema-json to 1.14.0

### Patch Changes

- [#100426](https://stash.atlassian.com/projects/CONFCLOUD/repos/confluence-frontend/pull-requests/100426)
  [`85703bb445ca`](https://stash.atlassian.com/projects/CONFCLOUD/repos/confluence-frontend/commits/85703bb445ca) -
  clean up feature flag connect-websocket-first (abandoned)
- Updated dependencies

## 9.28.6

### Patch Changes

- Updated dependencies

## 9.28.5

### Patch Changes

- [#97599](https://stash.atlassian.com/projects/CONFCLOUD/repos/confluence-frontend/pull-requests/97599)
  [`32c3130b08fe`](https://stash.atlassian.com/projects/CONFCLOUD/repos/confluence-frontend/commits/32c3130b08fe) -
  [ED-22282] Bump adf-schema to 36.1.0

## 9.28.4

### Patch Changes

- [#97698](https://stash.atlassian.com/projects/CONFCLOUD/repos/confluence-frontend/pull-requests/97698)
  [`1c7b378c0d3b`](https://stash.atlassian.com/projects/CONFCLOUD/repos/confluence-frontend/commits/1c7b378c0d3b) -
  [HOT-108999] We had an incident where the cursor jumps back a character in table headers for any
  language triggering composition on an empty line.This was fixed in a patch bump of
  prosemirror-view. https://github.com/ProseMirror/prosemirror-view/compare/1.33.4...1.33.5

## 9.28.3

### Patch Changes

- Updated dependencies

## 9.28.2

### Patch Changes

- [#96237](https://stash.atlassian.com/projects/CONFCLOUD/repos/confluence-frontend/pull-requests/96237)
  [`0401e7b5a88e`](https://stash.atlassian.com/projects/CONFCLOUD/repos/confluence-frontend/commits/0401e7b5a88e) -
  [ED-23102] Bump ADF schema to version 35.12.2

## 9.28.1

### Patch Changes

- [#94901](https://stash.atlassian.com/projects/CONFCLOUD/repos/confluence-frontend/pull-requests/94901)
  [`da964fcdc828`](https://stash.atlassian.com/projects/CONFCLOUD/repos/confluence-frontend/commits/da964fcdc828) -
  [ED-23097] Bump ADF schema to version 35.12.1

## 9.28.0

### Minor Changes

- [#93363](https://stash.atlassian.com/projects/CONFCLOUD/repos/confluence-frontend/pull-requests/93363)
  [`34e245273af4`](https://stash.atlassian.com/projects/CONFCLOUD/repos/confluence-frontend/commits/34e245273af4) -
  uplift update document slo measurement

## 9.27.1

### Patch Changes

- [#93689](https://stash.atlassian.com/projects/CONFCLOUD/repos/confluence-frontend/pull-requests/93689)
  [`5ba5d2b4a9ac`](https://stash.atlassian.com/projects/CONFCLOUD/repos/confluence-frontend/commits/5ba5d2b4a9ac) -
  Updating adf-schema version to 35.10.0

## 9.27.0

### Minor Changes

- [#91934](https://stash.atlassian.com/projects/CONFCLOUD/repos/confluence-frontend/pull-requests/91934)
  [`b76a78c6a199`](https://stash.atlassian.com/projects/CONFCLOUD/repos/confluence-frontend/commits/b76a78c6a199) -
  bumped editor-prosemirror version to 4.0.0

### Patch Changes

- Updated dependencies

## 9.26.7

### Patch Changes

- [#92426](https://stash.atlassian.com/projects/CONFCLOUD/repos/confluence-frontend/pull-requests/92426)
  [`32c76c7c225c`](https://stash.atlassian.com/projects/CONFCLOUD/repos/confluence-frontend/commits/32c76c7c225c) -
  Bump adf-schema to 35.9.2 to support table alignment options

## 9.26.6

### Patch Changes

- [#92490](https://stash.atlassian.com/projects/CONFCLOUD/repos/confluence-frontend/pull-requests/92490)
  [`97780ddb724d`](https://stash.atlassian.com/projects/CONFCLOUD/repos/confluence-frontend/commits/97780ddb724d) -
  refactor channel to reduce code duplication

## 9.26.5

### Patch Changes

- [#91579](https://stash.atlassian.com/projects/CONFCLOUD/repos/confluence-frontend/pull-requests/91579)
  [`99a74057c77a`](https://stash.atlassian.com/projects/CONFCLOUD/repos/confluence-frontend/commits/99a74057c77a) -
  Handle undefined steps in catchup v2
- Updated dependencies

## 9.26.4

### Patch Changes

- [#92046](https://stash.atlassian.com/projects/CONFCLOUD/repos/confluence-frontend/pull-requests/92046)
  [`d0b94531c129`](https://stash.atlassian.com/projects/CONFCLOUD/repos/confluence-frontend/commits/d0b94531c129) -
  adding stack trace on analytics error logs

## 9.26.3

### Patch Changes

- [#91887](https://stash.atlassian.com/projects/CONFCLOUD/repos/confluence-frontend/pull-requests/91887)
  [`232026623493`](https://stash.atlassian.com/projects/CONFCLOUD/repos/confluence-frontend/commits/232026623493) -
  Add out of sync detection and correction for catchup

## 9.26.2

### Patch Changes

- [#90942](https://stash.atlassian.com/projects/CONFCLOUD/repos/confluence-frontend/pull-requests/90942)
  [`30e989b2e4bb`](https://stash.atlassian.com/projects/CONFCLOUD/repos/confluence-frontend/commits/30e989b2e4bb) -
  catchupV2 is a noop when document is locked

## 9.26.1

### Patch Changes

- [#91106](https://stash.atlassian.com/projects/CONFCLOUD/repos/confluence-frontend/pull-requests/91106)
  [`b6ffa30186b9`](https://stash.atlassian.com/projects/CONFCLOUD/repos/confluence-frontend/commits/b6ffa30186b9) -
  Bump ADF-schema package to version 35.0.0
- Updated dependencies

## 9.26.0

### Minor Changes

- [#89336](https://stash.atlassian.com/projects/CONFCLOUD/repos/confluence-frontend/pull-requests/89336)
  [`430f6dfcbd65`](https://stash.atlassian.com/projects/CONFCLOUD/repos/confluence-frontend/commits/430f6dfcbd65) -
  ESS-4579: add reason to cr fallback

### Patch Changes

- [#89223](https://stash.atlassian.com/projects/CONFCLOUD/repos/confluence-frontend/pull-requests/89223)
  [`0daf47d3f6d6`](https://stash.atlassian.com/projects/CONFCLOUD/repos/confluence-frontend/commits/0daf47d3f6d6) -
  Remove catchupv2 FE FF

## 9.25.15

### Patch Changes

- [#86724](https://stash.atlassian.com/projects/CONFCLOUD/repos/confluence-frontend/pull-requests/86724)
  [`718a9aa2424d`](https://stash.atlassian.com/projects/CONFCLOUD/repos/confluence-frontend/commits/718a9aa2424d) -
  [ED-22607] Remove references to maxFrames for multi bodied extensions and bump adf-schema from
  35.7.0 to 35.8.0

## 9.25.14

### Patch Changes

- [#85088](https://stash.atlassian.com/projects/CONFCLOUD/repos/confluence-frontend/pull-requests/85088)
  [`231ec4a0412c`](https://stash.atlassian.com/projects/CONFCLOUD/repos/confluence-frontend/commits/231ec4a0412c) -
  Remove the bambooagent added FF reference of enable-map-selection-backward

## 9.25.13

### Patch Changes

- [#81777](https://stash.atlassian.com/projects/CONFCLOUD/repos/confluence-frontend/pull-requests/81777)
  [`c6d7a5378751`](https://stash.atlassian.com/projects/CONFCLOUD/repos/confluence-frontend/commits/c6d7a5378751) -
  Bump adf-schema to 35.7.0

## 9.25.12

### Patch Changes

- [#83116](https://stash.atlassian.com/projects/CONFCLOUD/repos/confluence-frontend/pull-requests/83116)
  [`8d4e99057fe0`](https://stash.atlassian.com/projects/CONFCLOUD/repos/confluence-frontend/commits/8d4e99057fe0) -
  Upgrade Typescript from `4.9.5` to `5.4.2`

## 9.25.11

### Patch Changes

- [#80629](https://stash.atlassian.com/projects/CONFCLOUD/repos/confluence-frontend/pull-requests/80629)
  [`7cc52a784224`](https://stash.atlassian.com/projects/CONFCLOUD/repos/confluence-frontend/commits/7cc52a784224) -
  [ESS-4515] Collab provider: Do not use polling by default, only as safe-fail if WebSocket doesn't
  work

## 9.25.10

### Patch Changes

- [#80679](https://stash.atlassian.com/projects/CONFCLOUD/repos/confluence-frontend/pull-requests/80679)
  [`104eb9443b7e`](https://stash.atlassian.com/projects/CONFCLOUD/repos/confluence-frontend/commits/104eb9443b7e) -
  ED-22553 Updating adf-schema version to 35.6.0

## 9.25.9

### Patch Changes

- [#80925](https://stash.atlassian.com/projects/CONFCLOUD/repos/confluence-frontend/pull-requests/80925)
  [`40840421554a`](https://stash.atlassian.com/projects/CONFCLOUD/repos/confluence-frontend/commits/40840421554a) -
  Refactor the way we mock FF values
- Updated dependencies

## 9.25.8

### Patch Changes

- [#80582](https://stash.atlassian.com/projects/CONFCLOUD/repos/confluence-frontend/pull-requests/80582)
  [`69142cccb20b`](https://stash.atlassian.com/projects/CONFCLOUD/repos/confluence-frontend/commits/69142cccb20b) -
  Add test cases for catchupv2

## 9.25.7

### Patch Changes

- [#79803](https://stash.atlassian.com/projects/CONFCLOUD/repos/confluence-frontend/pull-requests/79803)
  [`05d755419b9f`](https://stash.atlassian.com/projects/CONFCLOUD/repos/confluence-frontend/commits/05d755419b9f) -
  NONE: remove isWebsocketFirst FF logic

## 9.25.6

### Patch Changes

- [#79382](https://stash.atlassian.com/projects/CONFCLOUD/repos/confluence-frontend/pull-requests/79382)
  [`e6312788d14d`](https://stash.atlassian.com/projects/CONFCLOUD/repos/confluence-frontend/commits/e6312788d14d) -
  Add CatchupV2 in collab-provider

## 9.25.5

### Patch Changes

- [#79657](https://stash.atlassian.com/projects/CONFCLOUD/repos/confluence-frontend/pull-requests/79657)
  [`c6d2ac213900`](https://stash.atlassian.com/projects/CONFCLOUD/repos/confluence-frontend/commits/c6d2ac213900) -
  Add usereconcile to reinit errors

## 9.25.4

### Patch Changes

- [#78812](https://stash.atlassian.com/projects/CONFCLOUD/repos/confluence-frontend/pull-requests/78812)
  [`fb7d12d1461c`](https://stash.atlassian.com/projects/CONFCLOUD/repos/confluence-frontend/commits/fb7d12d1461c) -
  ESS-4503: cleanup sendStepsQueue event action
- Updated dependencies

## 9.25.3

### Patch Changes

- [#78224](https://stash.atlassian.com/projects/CONFCLOUD/repos/confluence-frontend/pull-requests/78224)
  [`6b4c9dd4ad34`](https://stash.atlassian.com/projects/CONFCLOUD/repos/confluence-frontend/commits/6b4c9dd4ad34) -
  ED-22219: adf-schema updated to 35.5.2
- Updated dependencies

## 9.25.2

### Patch Changes

- [#77613](https://stash.atlassian.com/projects/CONFCLOUD/repos/confluence-frontend/pull-requests/77613)
  [`ef8c5965e5a9`](https://stash.atlassian.com/projects/CONFCLOUD/repos/confluence-frontend/commits/ef8c5965e5a9) -
  Add log for reconcile on recovery
- [#78402](https://stash.atlassian.com/projects/CONFCLOUD/repos/confluence-frontend/pull-requests/78402)
  [`f55cf26552c0`](https://stash.atlassian.com/projects/CONFCLOUD/repos/confluence-frontend/commits/f55cf26552c0) -
  Remove old caching FF

## 9.25.1

### Patch Changes

- [#77972](https://stash.atlassian.com/projects/CONFCLOUD/repos/confluence-frontend/pull-requests/77972)
  [`2d7c29863c8a`](https://stash.atlassian.com/projects/CONFCLOUD/repos/confluence-frontend/commits/2d7c29863c8a) -
  Add FE FF catchupv2 for futher usages

## 9.25.0

### Minor Changes

- [#75042](https://stash.atlassian.com/projects/CONFCLOUD/repos/confluence-frontend/pull-requests/75042)
  [`ce823f018248`](https://stash.atlassian.com/projects/CONFCLOUD/repos/confluence-frontend/commits/ce823f018248) -
  [ux] ED-21987 Diverge expands in live pages so that they are not multiplayer, and are closed by
  default.

### Patch Changes

- Updated dependencies

## 9.24.1

### Patch Changes

- [#74416](https://stash.atlassian.com/projects/CONFCLOUD/repos/confluence-frontend/pull-requests/74416)
  [`444dfaa08f4a`](https://stash.atlassian.com/projects/CONFCLOUD/repos/confluence-frontend/commits/444dfaa08f4a) -
  ESS-4450: Trial websocket first then polling in Collab Provider

## 9.24.0

### Minor Changes

- [#73554](https://stash.atlassian.com/projects/CONFCLOUD/repos/confluence-frontend/pull-requests/73554)
  [`c03a65a711ea`](https://stash.atlassian.com/projects/CONFCLOUD/repos/confluence-frontend/commits/c03a65a711ea) -
  Emit permission event on collab provider when permissions are set/changed

### Patch Changes

- Updated dependencies

## 9.23.1

### Patch Changes

- [#73588](https://stash.atlassian.com/projects/CONFCLOUD/repos/confluence-frontend/pull-requests/73588)
  [`d06aa1426a45`](https://stash.atlassian.com/projects/CONFCLOUD/repos/confluence-frontend/commits/d06aa1426a45) -
  Thess packages has been added to the Jira push model.

## 9.23.0

### Minor Changes

- [#73460](https://stash.atlassian.com/projects/CONFCLOUD/repos/confluence-frontend/pull-requests/73460)
  [`5bd301383865`](https://stash.atlassian.com/projects/CONFCLOUD/repos/confluence-frontend/commits/5bd301383865) -
  Add support for PermitOnlyPermissions to determine the user type in PresencePayload

### Patch Changes

- Updated dependencies

## 9.22.9

### Patch Changes

- Updated dependencies

## 9.22.8

### Patch Changes

- [#71421](https://stash.atlassian.com/projects/CONFCLOUD/repos/confluence-frontend/pull-requests/71421)
  [`27695a18c13c`](https://stash.atlassian.com/projects/CONFCLOUD/repos/confluence-frontend/commits/27695a18c13c) -
  Update the recovery process to use reconcile instead of applying local steps
- Updated dependencies

## 9.22.7

### Patch Changes

- [#71133](https://stash.atlassian.com/projects/CONFCLOUD/repos/confluence-frontend/pull-requests/71133)
  [`22d7f6ed1f02`](https://stash.atlassian.com/projects/CONFCLOUD/repos/confluence-frontend/commits/22d7f6ed1f02) -
  revert prosemirror-collab unfork

## 9.22.6

### Patch Changes

- [#68572](https://stash.atlassian.com/projects/CONFCLOUD/repos/confluence-frontend/pull-requests/68572)
  [`15d407fe5143`](https://stash.atlassian.com/projects/CONFCLOUD/repos/confluence-frontend/commits/15d407fe5143) -
  Upgrading @atlaskit/editor-prosemirror dependency

## 9.22.5

### Patch Changes

- [#70399](https://stash.atlassian.com/projects/CONFCLOUD/repos/confluence-frontend/pull-requests/70399)
  [`01a501a213a4`](https://stash.atlassian.com/projects/CONFCLOUD/repos/confluence-frontend/commits/01a501a213a4) -
  ESS-4082: cleanup sendStepsQueue FF

## 9.22.4

### Patch Changes

- [#70152](https://stash.atlassian.com/projects/CONFCLOUD/repos/confluence-frontend/pull-requests/70152)
  [`53ed3673df28`](https://stash.atlassian.com/projects/CONFCLOUD/repos/confluence-frontend/commits/53ed3673df28) -
  Updating adf-schema version to 35.5.1

## 9.22.3

### Patch Changes

- [#69702](https://stash.atlassian.com/projects/CONFCLOUD/repos/confluence-frontend/pull-requests/69702)
  [`044e7e14a253`](https://stash.atlassian.com/projects/CONFCLOUD/repos/confluence-frontend/commits/044e7e14a253) -
  Include status in 423 document locked error object emitted to Confluence

## 9.22.2

### Patch Changes

- [#69192](https://stash.atlassian.com/projects/CONFCLOUD/repos/confluence-frontend/pull-requests/69192)
  [`343f11caf70c`](https://stash.atlassian.com/projects/CONFCLOUD/repos/confluence-frontend/commits/343f11caf70c) -
  ESS-4173: add tests for commitStepQueue
- [#69931](https://stash.atlassian.com/projects/CONFCLOUD/repos/confluence-frontend/pull-requests/69931)
  [`cfc9225ee4f1`](https://stash.atlassian.com/projects/CONFCLOUD/repos/confluence-frontend/commits/cfc9225ee4f1) -
  Revert change to skip catchup for jcollab

## 9.22.1

### Patch Changes

- Updated dependencies

## 9.22.0

### Minor Changes

- [#67221](https://stash.atlassian.com/projects/CONFCLOUD/repos/confluence-frontend/pull-requests/67221)
  [`913c874e0566`](https://stash.atlassian.com/projects/CONFCLOUD/repos/confluence-frontend/commits/913c874e0566) -
  exclude presence (jcollab) from calling catchup on reconnect

## 9.21.3

### Patch Changes

- [#66028](https://stash.atlassian.com/projects/CONFCLOUD/repos/confluence-frontend/pull-requests/66028)
  [`184aba7e4984`](https://stash.atlassian.com/projects/CONFCLOUD/repos/confluence-frontend/commits/184aba7e4984) -
  fix the auth payload when no permission token

## 9.21.2

### Patch Changes

- [#65800](https://stash.atlassian.com/projects/CONFCLOUD/repos/confluence-frontend/pull-requests/65800)
  [`7fe1789ade99`](https://stash.atlassian.com/projects/CONFCLOUD/repos/confluence-frontend/commits/7fe1789ade99) -
  Add UGC free logs for error messages
- Updated dependencies

## 9.21.1

### Patch Changes

- [#65031](https://stash.atlassian.com/projects/CONFCLOUD/repos/confluence-frontend/pull-requests/65031)
  [`a00094111b5a`](https://stash.atlassian.com/projects/CONFCLOUD/repos/confluence-frontend/commits/a00094111b5a) -
  ED-21609 Update adf-schema to 35.3.0
- Updated dependencies

## 9.21.0

### Minor Changes

- [#63832](https://stash.atlassian.com/projects/CONFCLOUD/repos/confluence-frontend/pull-requests/63832)
  [`9fa0bec86202`](https://stash.atlassian.com/projects/CONFCLOUD/repos/confluence-frontend/commits/9fa0bec86202) -
  Expose Comment API through collab provider

### Patch Changes

- Updated dependencies

## 9.20.7

### Patch Changes

- [#63759](https://stash.atlassian.com/projects/CONFCLOUD/repos/confluence-frontend/pull-requests/63759)
  [`ebfe2794e306`](https://stash.atlassian.com/projects/CONFCLOUD/repos/confluence-frontend/commits/ebfe2794e306) -
  Add error for view only steps

## 9.20.6

### Patch Changes

- [#62968](https://stash.atlassian.com/projects/CONFCLOUD/repos/confluence-frontend/pull-requests/62968)
  [`53208d15e680`](https://stash.atlassian.com/projects/CONFCLOUD/repos/confluence-frontend/commits/53208d15e680) -
  NO-ISSUE Unforked the ProseMirror collab library

## 9.20.5

### Patch Changes

- [#62165](https://stash.atlassian.com/projects/CONFCLOUD/repos/confluence-frontend/pull-requests/62165)
  [`b44ac0968d79`](https://stash.atlassian.com/projects/CONFCLOUD/repos/confluence-frontend/commits/b44ac0968d79) -
  [ED-21562] Bump @atlaskit/adf-schema to 35.2.0 for border mark update

## 9.20.4

### Patch Changes

- [#60808](https://stash.atlassian.com/projects/CONFCLOUD/repos/confluence-frontend/pull-requests/60808)
  [`f509a21be124`](https://stash.atlassian.com/projects/CONFCLOUD/repos/confluence-frontend/commits/f509a21be124) -
  ED-21506: @atlaskit/adf-schema upgraded to 35.1.1 to support renderer for MBE

## 9.20.3

### Patch Changes

- [#60651](https://stash.atlassian.com/projects/CONFCLOUD/repos/confluence-frontend/pull-requests/60651)
  [`20f3c9bb7b87`](https://stash.atlassian.com/projects/CONFCLOUD/repos/confluence-frontend/commits/20f3c9bb7b87) -
  ESS-4207: cleanup unused FF

## 9.20.2

### Patch Changes

- [#59996](https://stash.atlassian.com/projects/CONFCLOUD/repos/confluence-frontend/pull-requests/59996)
  [`54a1d6088412`](https://stash.atlassian.com/projects/CONFCLOUD/repos/confluence-frontend/commits/54a1d6088412) -
  Correct toString function

## 9.20.1

### Patch Changes

- [#58246](https://stash.atlassian.com/projects/CONFCLOUD/repos/confluence-frontend/pull-requests/58246)
  [`a381b2599716`](https://stash.atlassian.com/projects/CONFCLOUD/repos/confluence-frontend/commits/a381b2599716) -
  ED-21371 Update adf-schema to 35.1.0

## 9.20.0

### Minor Changes

- [#60038](https://stash.atlassian.com/projects/CONFCLOUD/repos/confluence-frontend/pull-requests/60038)
  [`b1b34b86ab59`](https://stash.atlassian.com/projects/CONFCLOUD/repos/confluence-frontend/commits/b1b34b86ab59) -
  verify clientIds from serverStepMaps to avoid content duplication

## 9.19.0

### Minor Changes

- [#58777](https://stash.atlassian.com/projects/CONFCLOUD/repos/confluence-frontend/pull-requests/58777)
  [`f28d4e12e540`](https://stash.atlassian.com/projects/CONFCLOUD/repos/confluence-frontend/commits/f28d4e12e540) -
  Added PROSEMIRROR_SCHEMA_VALIDATION_ERROR from NCS

## 9.18.4

### Patch Changes

- [#58848](https://stash.atlassian.com/projects/CONFCLOUD/repos/confluence-frontend/pull-requests/58848)
  [`ec070585b78d`](https://stash.atlassian.com/projects/CONFCLOUD/repos/confluence-frontend/commits/ec070585b78d) -
  fix the FF keys

## 9.18.3

### Patch Changes

- [#59147](https://stash.atlassian.com/projects/CONFCLOUD/repos/confluence-frontend/pull-requests/59147)
  [`f12e489f23b0`](https://stash.atlassian.com/projects/CONFCLOUD/repos/confluence-frontend/commits/f12e489f23b0) -
  Re-build and deploy packages to NPM to resolve React/Compiled not found error (HOT-106483).

## 9.18.2

### Patch Changes

- [#58763](https://stash.atlassian.com/projects/CONFCLOUD/repos/confluence-frontend/pull-requests/58763)
  [`0fdbd64522bf`](https://stash.atlassian.com/projects/CONFCLOUD/repos/confluence-frontend/commits/0fdbd64522bf) -
  update ADF schema

## 9.18.1

### Patch Changes

- [#58105](https://stash.atlassian.com/projects/CONFCLOUD/repos/confluence-frontend/pull-requests/58105)
  [`515950be7f0b`](https://stash.atlassian.com/projects/CONFCLOUD/repos/confluence-frontend/commits/515950be7f0b) -
  Split errors into multiple files

## 9.18.0

### Minor Changes

- [#57982](https://stash.atlassian.com/projects/CONFCLOUD/repos/confluence-frontend/pull-requests/57982)
  [`858a68983294`](https://stash.atlassian.com/projects/CONFCLOUD/repos/confluence-frontend/commits/858a68983294) -
  removing catchup logic for stale draft

## 9.17.5

### Patch Changes

- [#57454](https://stash.atlassian.com/projects/CONFCLOUD/repos/confluence-frontend/pull-requests/57454)
  [`3f18e6719122`](https://stash.atlassian.com/projects/CONFCLOUD/repos/confluence-frontend/commits/3f18e6719122) -
  Add provider error code logging

## 9.17.4

### Patch Changes

- [#57317](https://stash.atlassian.com/projects/CONFCLOUD/repos/confluence-frontend/pull-requests/57317)
  [`d989b4568594`](https://stash.atlassian.com/projects/CONFCLOUD/repos/confluence-frontend/commits/d989b4568594) -
  ESS-4149: Add send steps queue under FF
- Updated dependencies

## 9.17.3

### Patch Changes

- [#56940](https://bitbucket.org/atlassian/atlassian-frontend/pull-requests/56940)
  [`e862ee8c3290`](https://bitbucket.org/atlassian/atlassian-frontend/commits/e862ee8c3290) - Add
  success analytics for updating document
- [#57024](https://bitbucket.org/atlassian/atlassian-frontend/pull-requests/57024)
  [`4807b15145e2`](https://bitbucket.org/atlassian/atlassian-frontend/commits/4807b15145e2) - Update
  commented link for update document action

## 9.17.2

### Patch Changes

- [#56790](https://bitbucket.org/atlassian/atlassian-frontend/pull-requests/56790)
  [`ff577a7969d4`](https://bitbucket.org/atlassian/atlassian-frontend/commits/ff577a7969d4) -
  ED-21266: Updated @atlaskit/adf-schema to 34.0.1

## 9.17.1

### Patch Changes

- [#56635](https://bitbucket.org/atlassian/atlassian-frontend/pull-requests/56635)
  [`92410fab43c6`](https://bitbucket.org/atlassian/atlassian-frontend/commits/92410fab43c6) - Update
  comment linking to data portal

## 9.17.0

### Minor Changes

- [#43813](https://bitbucket.org/atlassian/atlassian-frontend/pull-requests/43813)
  [`417f8592c91`](https://bitbucket.org/atlassian/atlassian-frontend/commits/417f8592c91) - block
  view only steps and metadata traffic

## 9.16.1

### Patch Changes

- [#43417](https://bitbucket.org/atlassian/atlassian-frontend/pull-requests/43417)
  [`3f3c17f0273`](https://bitbucket.org/atlassian/atlassian-frontend/commits/3f3c17f0273) - ED-20971
  Upgrade adf-schema package to ^34.0.0

## 9.16.0

### Minor Changes

- [#43426](https://bitbucket.org/atlassian/atlassian-frontend/pull-requests/43426)
  [`850d2e49924`](https://bitbucket.org/atlassian/atlassian-frontend/commits/850d2e49924) - Add
  feature flag for send steps queue

## 9.15.5

### Patch Changes

- [#43379](https://bitbucket.org/atlassian/atlassian-frontend/pull-requests/43379)
  [`482c025520d`](https://bitbucket.org/atlassian/atlassian-frontend/commits/482c025520d) - ED-20763
  Upgrade ADF schema version to 33.2.3 for MBE nodes.
- Updated dependencies

## 9.15.4

### Patch Changes

- [#42471](https://bitbucket.org/atlassian/atlassian-frontend/pull-requests/42471)
  [`f850ec1b5a6`](https://bitbucket.org/atlassian/atlassian-frontend/commits/f850ec1b5a6) - improve
  error logging for collab provider

## 9.15.3

### Patch Changes

- [#41977](https://bitbucket.org/atlassian/atlassian-frontend/pull-requests/41977)
  [`5b2f6d283ef`](https://bitbucket.org/atlassian/atlassian-frontend/commits/5b2f6d283ef) - clean up
  catchup retry feature flag

## 9.15.2

### Patch Changes

- [#40950](https://bitbucket.org/atlassian/atlassian-frontend/pull-requests/40950)
  [`6fa1988ec35`](https://bitbucket.org/atlassian/atlassian-frontend/commits/6fa1988ec35) - clean up
  FF for enabling fallback to reconcile

## 9.15.1

### Patch Changes

- [#40940](https://bitbucket.org/atlassian/atlassian-frontend/pull-requests/40940)
  [`7a58a018436`](https://bitbucket.org/atlassian/atlassian-frontend/commits/7a58a018436) - add
  error logs for when editor state is undefined

## 9.15.0

### Minor Changes

- [#41131](https://bitbucket.org/atlassian/atlassian-frontend/pull-requests/41131)
  [`6d09bbf0bc7`](https://bitbucket.org/atlassian/atlassian-frontend/commits/6d09bbf0bc7) - only
  sending analytics event with unconfirmed step count on first connection when buffering is enabled

## 9.14.0

### Minor Changes

- [#41007](https://bitbucket.org/atlassian/atlassian-frontend/pull-requests/41007)
  [`7f1c8bda21e`](https://bitbucket.org/atlassian/atlassian-frontend/commits/7f1c8bda21e) - adding
  logging for presence of unconfirmed steps in collab-provider

## 9.13.0

### Minor Changes

- [#40878](https://bitbucket.org/atlassian/atlassian-frontend/pull-requests/40878)
  [`7009422b0ad`](https://bitbucket.org/atlassian/atlassian-frontend/commits/7009422b0ad) - remove
  provider initialization check for buffering

## 9.12.5

### Patch Changes

- [#39749](https://bitbucket.org/atlassian/atlassian-frontend/pull-requests/39749)
  [`e6b69f455c3`](https://bitbucket.org/atlassian/atlassian-frontend/commits/e6b69f455c3) - Connect
  yarn changeset to packages, upgrade adf-schema

## 9.12.4

### Patch Changes

- Updated dependencies

## 9.12.3

### Patch Changes

- Updated dependencies

## 9.12.2

### Patch Changes

- [#39481](https://bitbucket.org/atlassian/atlassian-frontend/pull-requests/39481)
  [`aeb5c9a01e8`](https://bitbucket.org/atlassian/atlassian-frontend/commits/aeb5c9a01e8) - Delete
  adf-schema from AFE and rely on npm package for adf-schema
- [`4b4dcfe0bba`](https://bitbucket.org/atlassian/atlassian-frontend/commits/4b4dcfe0bba) - Delete
  adf-schema, use published version

## 9.12.1

### Patch Changes

- [#39189](https://bitbucket.org/atlassian/atlassian-frontend/pull-requests/39189)
  [`41f00a65fed`](https://bitbucket.org/atlassian/atlassian-frontend/commits/41f00a65fed) - Add
  ClientId for CatchUp

## 9.12.0

### Minor Changes

- [#39302](https://bitbucket.org/atlassian/atlassian-frontend/pull-requests/39302)
  [`d1cee97f581`](https://bitbucket.org/atlassian/atlassian-frontend/commits/d1cee97f581) - removing
  stateless provider setup

## 9.11.1

### Patch Changes

- [#38976](https://bitbucket.org/atlassian/atlassian-frontend/pull-requests/38976)
  [`33cb07de05f`](https://bitbucket.org/atlassian/atlassian-frontend/commits/33cb07de05f) - change
  adf-schema to fixed versioning

## 9.11.0

### Minor Changes

- [#38553](https://bitbucket.org/atlassian/atlassian-frontend/pull-requests/38553)
  [`c50ae0964ce`](https://bitbucket.org/atlassian/atlassian-frontend/commits/c50ae0964ce) - seperate
  catching error handling

## 9.10.1

### Patch Changes

- [#38613](https://bitbucket.org/atlassian/atlassian-frontend/pull-requests/38613)
  [`469b5c12303`](https://bitbucket.org/atlassian/atlassian-frontend/commits/469b5c12303) - NO-ISSUE
  Move CollabEventLocalStepData to editor-common

## 9.10.0

### Minor Changes

- [#38589](https://bitbucket.org/atlassian/atlassian-frontend/pull-requests/38589)
  [`592dcbd5756`](https://bitbucket.org/atlassian/atlassian-frontend/commits/592dcbd5756) - Adding
  analytics events for early provider initialization and buffering

## 9.9.1

### Patch Changes

- Updated dependencies

## 9.9.0

### Minor Changes

- [#37838](https://bitbucket.org/atlassian/atlassian-frontend/pull-requests/37838)
  [`4c6ebd50aeb`](https://bitbucket.org/atlassian/atlassian-frontend/commits/4c6ebd50aeb) - call
  reconcile when commitUnconfirmedSteps fails (mitigation for 'can't sync up' errors)

## 9.8.0

### Minor Changes

- [#37113](https://bitbucket.org/atlassian/atlassian-frontend/pull-requests/37113)
  [`aceff84b101`](https://bitbucket.org/atlassian/atlassian-frontend/commits/aceff84b101) -
  initializing provider on setup if buffering is enabled

## 9.7.4

### Patch Changes

- [#37785](https://bitbucket.org/atlassian/atlassian-frontend/pull-requests/37785)
  [`4e6f1bf8511`](https://bitbucket.org/atlassian/atlassian-frontend/commits/4e6f1bf8511) -
  [ED-19233] Import prosemirror libraries from internal facade package

## 9.7.3

### Patch Changes

- [#36673](https://bitbucket.org/atlassian/atlassian-frontend/pull-requests/36673)
  [`04fa8eb5246`](https://bitbucket.org/atlassian/atlassian-frontend/commits/04fa8eb5246) - Added
  rate limiting options to collab provider

## 9.7.2

### Patch Changes

- [#36435](https://bitbucket.org/atlassian/atlassian-frontend/pull-requests/36435)
  [`f9735e0690e`](https://bitbucket.org/atlassian/atlassian-frontend/commits/f9735e0690e) - Using
  socket.onAnyOutgoing to measure and send message metrics

## 9.7.1

### Patch Changes

- [#36848](https://bitbucket.org/atlassian/atlassian-frontend/pull-requests/36848)
  [`14224c3f8a4`](https://bitbucket.org/atlassian/atlassian-frontend/commits/14224c3f8a4) -
  [ED-18162] Move the collab provider types to the editor common package to avoid circular
  dependencies

## 9.7.0

### Minor Changes

- [#36385](https://bitbucket.org/atlassian/atlassian-frontend/pull-requests/36385)
  [`3265cccb965`](https://bitbucket.org/atlassian/atlassian-frontend/commits/3265cccb965) -
  resolving editor state before updating document/metadata during early provider initialization

## 9.6.4

### Patch Changes

- [#34163](https://bitbucket.org/atlassian/atlassian-frontend/pull-requests/34163)
  [`b7cd15f159b`](https://bitbucket.org/atlassian/atlassian-frontend/commits/b7cd15f159b) - ESS-3572
  Fix getFinalAcknowledgedState and getCurrentState error handlers not catching errors. Add logs to
  track the title metadata property

## 9.6.3

### Patch Changes

- [#36775](https://bitbucket.org/atlassian/atlassian-frontend/pull-requests/36775)
  [`857daf603b0`](https://bitbucket.org/atlassian/atlassian-frontend/commits/857daf603b0) -
  ESS-3718: change CollabEventPresenceData joined type to ProviderParticipant

## 9.6.2

### Patch Changes

- [#36604](https://bitbucket.org/atlassian/atlassian-frontend/pull-requests/36604)
  [`2e7c3cad470`](https://bitbucket.org/atlassian/atlassian-frontend/commits/2e7c3cad470) - Reduce
  stepsAdded analytics events by only sampling 10%

## 9.6.1

### Patch Changes

- [#36612](https://bitbucket.org/atlassian/atlassian-frontend/pull-requests/36612)
  [`979e3ad2b67`](https://bitbucket.org/atlassian/atlassian-frontend/commits/979e3ad2b67) -
  NO-ISSUE: add data portal links and fix a broken analytics error event

## 9.6.0

### Minor Changes

- [#36615](https://bitbucket.org/atlassian/atlassian-frontend/pull-requests/36615)
  [`7ef82ea1810`](https://bitbucket.org/atlassian/atlassian-frontend/commits/7ef82ea1810) -
  ESS-3718: export ProviderParticipant for JWM

## 9.5.2

### Patch Changes

- [#36241](https://bitbucket.org/atlassian/atlassian-frontend/pull-requests/36241)
  [`5f5ba16de66`](https://bitbucket.org/atlassian/atlassian-frontend/commits/5f5ba16de66) -
  [ED-13910] Fix prosemirror types

## 9.5.1

### Patch Changes

- [#36271](https://bitbucket.org/atlassian/atlassian-frontend/pull-requests/36271)
  [`74e05b3d5d3`](https://bitbucket.org/atlassian/atlassian-frontend/commits/74e05b3d5d3) - bump
  socket.io-client version number

## 9.5.0

### Minor Changes

- [#35954](https://bitbucket.org/atlassian/atlassian-frontend/pull-requests/35954)
  [`27f5fbdbb04`](https://bitbucket.org/atlassian/atlassian-frontend/commits/27f5fbdbb04) -
  ESS-3718: add email as a field in ProviderParticipant to support JWM presence/multiplayer bugfix

## 9.4.0

### Minor Changes

- [#36041](https://bitbucket.org/atlassian/atlassian-frontend/pull-requests/36041)
  [`606d4ad65fc`](https://bitbucket.org/atlassian/atlassian-frontend/commits/606d4ad65fc) - ESS-3682
  Add detection that it the editor failed to update, emit analytics as well added an option to
  enable emitting fatal errors.

### Patch Changes

- [#36047](https://bitbucket.org/atlassian/atlassian-frontend/pull-requests/36047)
  [`5eb1273509c`](https://bitbucket.org/atlassian/atlassian-frontend/commits/5eb1273509c) -
  ESS-3728: Fix initialized always set to false when reconnecting.

## 9.3.1

### Patch Changes

- [#35233](https://bitbucket.org/atlassian/atlassian-frontend/pull-requests/35233)
  [`a9350cf3831`](https://bitbucket.org/atlassian/atlassian-frontend/commits/a9350cf3831) - Check
  existence of window and document variable for confluence SSR to work

## 9.3.0

### Minor Changes

- [#35659](https://bitbucket.org/atlassian/atlassian-frontend/pull-requests/35659)
  [`ece61235edc`](https://bitbucket.org/atlassian/atlassian-frontend/commits/ece61235edc) -
  ESS-3713: add getParticipants function to the collab provider

## 9.2.2

### Patch Changes

- [#34954](https://bitbucket.org/atlassian/atlassian-frontend/pull-requests/34954)
  [`11ac0368176`](https://bitbucket.org/atlassian/atlassian-frontend/commits/11ac0368176) - Dummy
  changeset to trigger release

## 9.2.1

### Patch Changes

- [#34993](https://bitbucket.org/atlassian/atlassian-frontend/pull-requests/34993)
  [`65fafdf95fe`](https://bitbucket.org/atlassian/atlassian-frontend/commits/65fafdf95fe) -
  ESS-3666: add additional analytics events for when the cant sync up with collab service error
  occurs for better troubleshooting

## 9.2.0

### Minor Changes

- [#34952](https://bitbucket.org/atlassian/atlassian-frontend/pull-requests/34952)
  [`ef726a72028`](https://bitbucket.org/atlassian/atlassian-frontend/commits/ef726a72028) - adding
  provider catchup when initial draft timestamp exceeds stale timeout

## 9.1.0

### Minor Changes

- [#34887](https://bitbucket.org/atlassian/atlassian-frontend/pull-requests/34887)
  [`2c0c19cc14b`](https://bitbucket.org/atlassian/atlassian-frontend/commits/2c0c19cc14b) -
  ESS-3609: add step commit status events for confl save indicator feature
- [`470c3a7e8c6`](https://bitbucket.org/atlassian/atlassian-frontend/commits/470c3a7e8c6) -
  ESS-3644: allow max steps retry param to be passed thru collab provider to allow
  getFinalAcknowledgeState to catch up sooner on publish

## 9.0.1

### Patch Changes

- [#34644](https://bitbucket.org/atlassian/atlassian-frontend/pull-requests/34644)
  [`6fe0ddc993e`](https://bitbucket.org/atlassian/atlassian-frontend/commits/6fe0ddc993e) - ESS-3624
  bug fix for missing avatar in editing sessions
- [`579326b4915`](https://bitbucket.org/atlassian/atlassian-frontend/commits/579326b4915) - ESS-2763
  update get final editor state

## 9.0.0

### Major Changes

- [#34192](https://bitbucket.org/atlassian/atlassian-frontend/pull-requests/34192)
  [`b7086232a7c`](https://bitbucket.org/atlassian/atlassian-frontend/commits/b7086232a7c) -
  ESS-3135: move collab provider types into @atlaskit/collab-provider

## 8.9.1

### Patch Changes

- [#33793](https://bitbucket.org/atlassian/atlassian-frontend/pull-requests/33793)
  [`9d00501a414`](https://bitbucket.org/atlassian/atlassian-frontend/commits/9d00501a414) - Ensure
  legacy types are published for TS 4.5-4.8

## 8.9.0

### Minor Changes

- [#33771](https://bitbucket.org/atlassian/atlassian-frontend/pull-requests/33771)
  [`220cf63d92b`](https://bitbucket.org/atlassian/atlassian-frontend/commits/220cf63d92b) - ESS-3525
  change catchup failed to recoverable true
- [`a6bdc7cbd60`](https://bitbucket.org/atlassian/atlassian-frontend/commits/a6bdc7cbd60) - adding
  functionality for early collab provider setup with initial draft

### Patch Changes

- [`a41f38996bd`](https://bitbucket.org/atlassian/atlassian-frontend/commits/a41f38996bd) - Add
  namespace service, refactor presence into participants service. No external API changes.
- [`5e005df7946`](https://bitbucket.org/atlassian/atlassian-frontend/commits/5e005df7946) - Refactor
  presence, no API changes
- [`02c8dd052d5`](https://bitbucket.org/atlassian/atlassian-frontend/commits/02c8dd052d5) - ESS-3553
  Fix tokens not being unset when permissionTokenRefresh returns null. Fix error handler not
  emitting errors
- [`a142ba1aa28`](https://bitbucket.org/atlassian/atlassian-frontend/commits/a142ba1aa28) -
  [ED17172] Bump prosemirror-model to 1.16.0 and prosemirror-view to 1.23.7 and removed work-arounds
  for fixed issues
- Updated dependencies

## 8.8.2

### Patch Changes

- [#33649](https://bitbucket.org/atlassian/atlassian-frontend/pull-requests/33649)
  [`41fae2c6f68`](https://bitbucket.org/atlassian/atlassian-frontend/commits/41fae2c6f68) - Upgrade
  Typescript from `4.5.5` to `4.9.5`

## 8.8.1

### Patch Changes

- [#32951](https://bitbucket.org/atlassian/atlassian-frontend/pull-requests/32951)
  [`c0f3b955ee6`](https://bitbucket.org/atlassian/atlassian-frontend/commits/c0f3b955ee6) - remove
  the deprecated analytics field 'ttlEnabled'

## 8.8.0

### Minor Changes

- [#33258](https://bitbucket.org/atlassian/atlassian-frontend/pull-requests/33258)
  [`56507598609`](https://bitbucket.org/atlassian/atlassian-frontend/commits/56507598609) - Skip
  minor dependency bump

### Patch Changes

- Updated dependencies

## 8.7.0

### Minor Changes

- [#33004](https://bitbucket.org/atlassian/atlassian-frontend/pull-requests/33004)
  [`054186aa44f`](https://bitbucket.org/atlassian/atlassian-frontend/commits/054186aa44f) - Remove
  email from CollabParticipant type and rely more on ProviderParticipant type.
- [`849e1a3b3e1`](https://bitbucket.org/atlassian/atlassian-frontend/commits/849e1a3b3e1) - ESS-3486
  Add getmetadata as an exposed method.

### Patch Changes

- [`b69b9375eec`](https://bitbucket.org/atlassian/atlassian-frontend/commits/b69b9375eec) - match
  version of @atlaskit/ufo to others places/packages so we only have one version
- [`0ffb55018c9`](https://bitbucket.org/atlassian/atlassian-frontend/commits/0ffb55018c9) - Revert
  "[ED-17172] Bumped prosemirror-view from 1.23.2 to 1.23.7 and removed work-around for fixed
  issues"
- [`196773a471b`](https://bitbucket.org/atlassian/atlassian-frontend/commits/196773a471b) - Add new
  type that reflects default broadcast payloads, telepoint events are now being passed the needed
  timestamp
- [`66b94ce320c`](https://bitbucket.org/atlassian/atlassian-frontend/commits/66b94ce320c) - Throw
  new error if cookies not enabled
- [`60725af0609`](https://bitbucket.org/atlassian/atlassian-frontend/commits/60725af0609) - Remove
  the auto exported modules and use explicit exports
- Updated dependencies

## 8.6.0

### Minor Changes

- [#32424](https://bitbucket.org/atlassian/atlassian-frontend/pull-requests/32424)
  [`1547aa8e377`](https://bitbucket.org/atlassian/atlassian-frontend/commits/1547aa8e377) - skipping
  document update with initial draft on reconnection
- [`76eded42866`](https://bitbucket.org/atlassian/atlassian-frontend/commits/76eded42866) -
  [ESS-3441] Added Confluence integration tests for collab provider, don't emit empty participants
  left events
- [`33cab158f01`](https://bitbucket.org/atlassian/atlassian-frontend/commits/33cab158f01) - ESS-3478
  Fix public interface `getUnconfirmedSteps` from being removed
- [`02520373358`](https://bitbucket.org/atlassian/atlassian-frontend/commits/02520373358) - passing
  initial draft to NCS collab provider and adding flag to bypass BE draft fetch.
- [`56779259eab`](https://bitbucket.org/atlassian/atlassian-frontend/commits/56779259eab) -
  ESS-2900: add confluence integration tests + add error handling to provider init
- [`f9257ff1a63`](https://bitbucket.org/atlassian/atlassian-frontend/commits/f9257ff1a63) - NO-ISSUE
  Changed the type export to a normal export for PROVIDER_ERROR_CODE

### Patch Changes

- [`2e01c9c74b5`](https://bitbucket.org/atlassian/atlassian-frontend/commits/2e01c9c74b5) - DUMMY
  remove before merging to master; dupe adf-schema via adf-utils
- [`945162380e3`](https://bitbucket.org/atlassian/atlassian-frontend/commits/945162380e3) -
  Functional changes to document service.
- [`937ff19a47d`](https://bitbucket.org/atlassian/atlassian-frontend/commits/937ff19a47d) -
  ESS-3240: moved throttledCommitStep function from index to commit-step file in collab-provider &
  add unit tests for commitStep
- [`0693d8fcab1`](https://bitbucket.org/atlassian/atlassian-frontend/commits/0693d8fcab1) -
  ESS-3446: clear all continuous timers when the provider disconnects or is destroyed
- Updated dependencies

## 8.5.0

### Minor Changes

- [#31891](https://bitbucket.org/atlassian/atlassian-frontend/pull-requests/31891)
  [`2192c9417d7`](https://bitbucket.org/atlassian/atlassian-frontend/commits/2192c9417d7) -
  [ESS-3335] Review Collab Provider API error handling & types
- [`c75fcb75c4e`](https://bitbucket.org/atlassian/atlassian-frontend/commits/c75fcb75c4e) - ESS-3241
  Added unit tests for document restore.  
  ESS-3238 Internal refactor of collab provider, split document code from provider to document
  service. Remove unused userId field from CollabInitPayload, it is never sent as part of the
  CollabInitPayload.
- [`27b106a736b`](https://bitbucket.org/atlassian/atlassian-frontend/commits/27b106a736b) - ESS-3274
  Refactor participant logic our of Provider class
- [`bdd8d88cad0`](https://bitbucket.org/atlassian/atlassian-frontend/commits/bdd8d88cad0) -
  [ESS-3332] Improved error mapping
- [`1d52016f25d`](https://bitbucket.org/atlassian/atlassian-frontend/commits/1d52016f25d) - Refactor
  collab-provider to accept a getAnalyticsClient Promise. And resolve when sending event. Ticket:
  https://product-fabric.atlassian.net/browse/CCP-2863
- [`dfd96d6b48a`](https://bitbucket.org/atlassian/atlassian-frontend/commits/dfd96d6b48a) -
  [ESS-3333] Update to the structure of errors emitted on the collab provider

  Upgrade instructions:

  - Change the type of the errors emitted on the provider from `CollabEventError` to `ProviderError`
  - Remove the reliance on the `status` field of the emitted errors, switch to using either the
    error code (exported as enum `PROVIDER_ERROR_CODE`) or the error flag `recoverable` indicating
    whether the provider can recover from the emitted error or not

  The mapping from the old status codes to the error codes is:

  - Status 403: PROVIDER_ERROR_CODE.NO_PERMISSION_ERROR, PROVIDER_ERROR_CODE.INVALID_USER_TOKEN
  - Status 404: PROVIDER_ERROR_CODE.DOCUMENT_NOT_FOUND
  - Status 423: PROVIDER_ERROR_CODE.LOCKED
  - Status 500: PROVIDER_ERROR_CODE.FAIL_TO_SAVE, PROVIDER_ERROR_CODE.DOCUMENT_RESTORE_ERROR,
    PROVIDER_ERROR_CODE.INTERNAL_SERVICE_ERROR

- [`078a6d029f0`](https://bitbucket.org/atlassian/atlassian-frontend/commits/078a6d029f0) - ESS-3333
  temporarily re-add error status to fix product fabric from breaking changes

### Patch Changes

- [`8217befcee0`](https://bitbucket.org/atlassian/atlassian-frontend/commits/8217befcee0) - logs the
  ignoring of steps for data versions older than current version in DocumentService.onStepsAdded()
- [`66f07c721c4`](https://bitbucket.org/atlassian/atlassian-frontend/commits/66f07c721c4) - Add
  JSDoc to provider errors that are emitted to editor
- Updated dependencies

## 8.4.0

### Minor Changes

- [#31299](https://bitbucket.org/atlassian/atlassian-frontend/pull-requests/31299)
  [`eae755e434a`](https://bitbucket.org/atlassian/atlassian-frontend/commits/eae755e434a) -
  [ESS-3269] Don't return an empty document if something goes wrong when returning the final
  acknowledge state from the collab provider
- [`ca548613b49`](https://bitbucket.org/atlassian/atlassian-frontend/commits/ca548613b49) - ESS-3218
  Add new configuration option throwOnNotConnected, which will throw not connected errors when
  attempting to save data whilst client is offline.
- [`329d3bb4e05`](https://bitbucket.org/atlassian/atlassian-frontend/commits/329d3bb4e05) -
  ESS-2962: added canCache flag in Config for Collab-provider. Channel now stores token locally if
  canCache flag is passed. Uses local token for reconnections if connection is lost for errors other
  that 401 and 403.
- [`1b9c38c7f48`](https://bitbucket.org/atlassian/atlassian-frontend/commits/1b9c38c7f48) -
  [ESS-3269] Added error handling and metrics for retrieving the current state

### Patch Changes

- [`2a076027203`](https://bitbucket.org/atlassian/atlassian-frontend/commits/2a076027203) - NO-ISSUE
  fix the permission error on permissionTokenRefresh
- [`bde10feab09`](https://bitbucket.org/atlassian/atlassian-frontend/commits/bde10feab09) - Avoid
  using callbacks when initialising socket connection
- [`f9a6a671d14`](https://bitbucket.org/atlassian/atlassian-frontend/commits/f9a6a671d14) - add
  comment to indicate that disconnect handler will be called when Firefox reload
- Updated dependencies

## 8.3.0

### Minor Changes

- [#30248](https://bitbucket.org/atlassian/atlassian-frontend/pull-requests/30248)
  [`1d36e909618`](https://bitbucket.org/atlassian/atlassian-frontend/commits/1d36e909618) - Log
  error on document restore
- [`0529b1b833c`](https://bitbucket.org/atlassian/atlassian-frontend/commits/0529b1b833c) - Trigger
  catch up call on process steps failing
- [`4f005660ce2`](https://bitbucket.org/atlassian/atlassian-frontend/commits/4f005660ce2) - Log step
  commit errors to analytics
- [`6034004a812`](https://bitbucket.org/atlassian/atlassian-frontend/commits/6034004a812) - Log
  errors on reconnection failure
- [`a261b2a9e6a`](https://bitbucket.org/atlassian/atlassian-frontend/commits/a261b2a9e6a) -
  [ESS-3183] Catch any errors in Presence functionality so an uncaught error there doesn't impact
  regular operation of the collab provider
- [`7f35ae7d99c`](https://bitbucket.org/atlassian/atlassian-frontend/commits/7f35ae7d99c) -
  [ESS-2815] Added network status to analytics events
- [`80feb6de229`](https://bitbucket.org/atlassian/atlassian-frontend/commits/80feb6de229) -
  [ESS-2815] Emit an error to consumers if the reconnections fails 8 times due to the network issues
- [`611d9c643c6`](https://bitbucket.org/atlassian/atlassian-frontend/commits/611d9c643c6) -
  [ESS-3183] Retry syncing unconfirmed steps

### Patch Changes

- [`fccc5952d49`](https://bitbucket.org/atlassian/atlassian-frontend/commits/fccc5952d49) - Revert
  emitting errors to Confluence by default
- [`0d25bcca6bb`](https://bitbucket.org/atlassian/atlassian-frontend/commits/0d25bcca6bb) - Added
  more comprehensive error handling for performance/analytics/ufo events in collab provider
- [`e97495c5748`](https://bitbucket.org/atlassian/atlassian-frontend/commits/e97495c5748) - Extract
  emitTelepointer logic from Provider
- [`260d1355cc6`](https://bitbucket.org/atlassian/atlassian-frontend/commits/260d1355cc6) -
  Reconnect collab provider immediately when browser emits online event.
- [`5725fb45955`](https://bitbucket.org/atlassian/atlassian-frontend/commits/5725fb45955) -
  Introduce a file for UFO.

  Introduce a file for commit step logic, which was already separate from the provider class

- [`2b648e4db70`](https://bitbucket.org/atlassian/atlassian-frontend/commits/2b648e4db70) - NO-ISSUE
  Remove the analytics fall-back after validating acks work as expected
- [`35c5e7dd9d5`](https://bitbucket.org/atlassian/atlassian-frontend/commits/35c5e7dd9d5) - NO-ISSUE
  deduplicate the analytics types dependency (again)
- [`1c255047a29`](https://bitbucket.org/atlassian/atlassian-frontend/commits/1c255047a29) - improve
  catchup error handling
- [`c9ad25cf224`](https://bitbucket.org/atlassian/atlassian-frontend/commits/c9ad25cf224) -
  [ESS-3183] Create abstraction around sending analytics events for errors or action events
- [`607a34f4426`](https://bitbucket.org/atlassian/atlassian-frontend/commits/607a34f4426) - Pass
  through the analytics web client in places it was missing
- [`efb112b06ab`](https://bitbucket.org/atlassian/atlassian-frontend/commits/efb112b06ab) - Move
  disonnected reason mapper
- [`9e6ceda8977`](https://bitbucket.org/atlassian/atlassian-frontend/commits/9e6ceda8977) - Provide
  the reason for a page reset
- [`6956eedc944`](https://bitbucket.org/atlassian/atlassian-frontend/commits/6956eedc944) - Tighten
  type definitions on analytics events
- Updated dependencies

## 8.2.0

### Minor Changes

- [#29470](https://bitbucket.org/atlassian/atlassian-frontend/pull-requests/29470)
  [`945413f0b29`](https://bitbucket.org/atlassian/atlassian-frontend/commits/945413f0b29) - trigger
  page recovery when catchup returns 404
- [`06119d7fed4`](https://bitbucket.org/atlassian/atlassian-frontend/commits/06119d7fed4) - handle
  catchup after page recovery
- [`a66427c3fe5`](https://bitbucket.org/atlassian/atlassian-frontend/commits/a66427c3fe5) - Add
  analytics logging to error handling
- [`56a21fe7209`](https://bitbucket.org/atlassian/atlassian-frontend/commits/56a21fe7209) - Improve
  error handling logic
- [`77aee68579e`](https://bitbucket.org/atlassian/atlassian-frontend/commits/77aee68579e) - adding a
  connecting event to be emitted when collab-provider is first initialized

### Patch Changes

- [`625f3c20f8c`](https://bitbucket.org/atlassian/atlassian-frontend/commits/625f3c20f8c) - Handle
  init errors
- Updated dependencies

## 8.1.0

### Minor Changes

- [#28932](https://bitbucket.org/atlassian/atlassian-frontend/pull-requests/28932)
  [`59e998e408f`](https://bitbucket.org/atlassian/atlassian-frontend/commits/59e998e408f) -
  [ESS-2914] Switch to the forked prosemirror-collab library (based on version 1.3.0) to filter out
  analytics steps
- [`ec0ebbf16bc`](https://bitbucket.org/atlassian/atlassian-frontend/commits/ec0ebbf16bc) - Adding
  Feature Flag to Collab Provider

### Patch Changes

- [`6eb720b7d3b`](https://bitbucket.org/atlassian/atlassian-frontend/commits/6eb720b7d3b) - A page
  recovery attribute and ttl attribute to metrics to monitor ttl effect on tti
- Updated dependencies

## 8.0.1

### Patch Changes

- [#28374](https://bitbucket.org/atlassian/atlassian-frontend/pull-requests/28374)
  [`7ba48e47e3b`](https://bitbucket.org/atlassian/atlassian-frontend/commits/7ba48e47e3b) - NO-ISSUE
  Re-removed some unused prod dependencies that were accidentally merged back in
- Updated dependencies

## 8.0.0

### Major Changes

- [#28090](https://bitbucket.org/atlassian/atlassian-frontend/pull-requests/28090)
  [`618b64f0d8c`](https://bitbucket.org/atlassian/atlassian-frontend/commits/618b64f0d8c) -
  Introduce ufo and measure document init latency with histogram

### Minor Changes

- [`83060253868`](https://bitbucket.org/atlassian/atlassian-frontend/commits/83060253868) -
  [ESS-2752] Introduced the capability to distinguish step commit failures due to errors and step
  rejections in collab provider analytics
- [`cc8b81f8fd8`](https://bitbucket.org/atlassian/atlassian-frontend/commits/cc8b81f8fd8) - Use
  socket.io acknowledgements to improve add-step performance tracking
- [`50d8749c3fa`](https://bitbucket.org/atlassian/atlassian-frontend/commits/50d8749c3fa) - Track
  telepointer latency

### Patch Changes

- [`0a482422f75`](https://bitbucket.org/atlassian/atlassian-frontend/commits/0a482422f75) - Update
  add-steps analytic
- [`9f1f34a71ea`](https://bitbucket.org/atlassian/atlassian-frontend/commits/9f1f34a71ea) -
  [ESS-3020] Turned all type dependencies in dev dependencies
- [`de027d19a65`](https://bitbucket.org/atlassian/atlassian-frontend/commits/de027d19a65) - Handle
  null for permission token refresh callback response
- [`62332c99254`](https://bitbucket.org/atlassian/atlassian-frontend/commits/62332c99254) -
  ESS-2964 - add numSteps and stepType to ADD-STEPS analytic events
- Updated dependencies

## 7.7.0

### Minor Changes

- [#26712](https://bitbucket.org/atlassian/atlassian-frontend/pull-requests/26712)
  [`fa0da169cce`](https://bitbucket.org/atlassian/atlassian-frontend/commits/fa0da169cce) -
  Introducing namespace status update: lock & unlock events
- [`eaada7441d0`](https://bitbucket.org/atlassian/atlassian-frontend/commits/eaada7441d0) - ESS-2853
  Add metrics for page recovery events
- [`6319cd08784`](https://bitbucket.org/atlassian/atlassian-frontend/commits/6319cd08784) - add page
  restoration event handler

### Patch Changes

- Updated dependencies

## 7.6.3

### Patch Changes

- [#25860](https://bitbucket.org/atlassian/atlassian-frontend/pull-requests/25860)
  [`1a64a3e3e53`](https://bitbucket.org/atlassian/atlassian-frontend/commits/1a64a3e3e53) - ESS-2591
  Reduce initial re-connection delay and increase randomization factor for socket io connections.
- [`ee8ac15d730`](https://bitbucket.org/atlassian/atlassian-frontend/commits/ee8ac15d730) - ESS-1363
  add packageVersion to analytic events
- [`29292da81d7`](https://bitbucket.org/atlassian/atlassian-frontend/commits/29292da81d7) -
  Increased the limits for the collab sync on returning the document to the consumer
- [`e06f8ba062f`](https://bitbucket.org/atlassian/atlassian-frontend/commits/e06f8ba062f) - Disable
  collab provider transport closing on the beforeunload event.
- Updated dependencies

## 7.6.2

### Patch Changes

- Updated dependencies

## 7.6.1

### Patch Changes

- [#24874](https://bitbucket.org/atlassian/atlassian-frontend/pull-requests/24874)
  [`8cc2f888c83`](https://bitbucket.org/atlassian/atlassian-frontend/commits/8cc2f888c83) - Upgrade
  Typescript from `4.3.5` to `4.5.5`
- Updated dependencies

## 7.6.0

### Minor Changes

- [#24004](https://bitbucket.org/atlassian/atlassian-frontend/pull-requests/24004)
  [`5bd58e91664`](https://bitbucket.org/atlassian/atlassian-frontend/commits/5bd58e91664) -
  [ESS-2513] Add tracking for number of participants in analytics

### Patch Changes

- Updated dependencies

## 7.5.1

### Patch Changes

- [#24492](https://bitbucket.org/atlassian/atlassian-frontend/pull-requests/24492)
  [`8d4228767b0`](https://bitbucket.org/atlassian/atlassian-frontend/commits/8d4228767b0) - Upgrade
  Typescript from `4.2.4` to `4.3.5`.
- Updated dependencies

## 7.5.0

### Minor Changes

- [#23381](https://bitbucket.org/atlassian/atlassian-frontend/pull-requests/23381)
  [`1c555e79e56`](https://bitbucket.org/atlassian/atlassian-frontend/commits/1c555e79e56) - Added
  the capability to pass product information (product & sub-product) to the collab service
- [`247420a48f7`](https://bitbucket.org/atlassian/atlassian-frontend/commits/247420a48f7) -
  [ESS-1050] Return ADF document from getFinalAcknowledgedState
- [`17f1b0b87cc`](https://bitbucket.org/atlassian/atlassian-frontend/commits/17f1b0b87cc) - ESS-1019
  changes the reconnectionDelayMax to 128s to reduce the reconnection storm.

### Patch Changes

- [`bf848f39cb1`](https://bitbucket.org/atlassian/atlassian-frontend/commits/bf848f39cb1) - ESS-2419
  Emit the reason of permission errors to the consumers of collab-provider
- [`680dc155ebc`](https://bitbucket.org/atlassian/atlassian-frontend/commits/680dc155ebc) - Raise
  errors in the collab provider when the server fails loading initilisation data
- Updated dependencies

## 7.4.4

### Patch Changes

- Updated dependencies

## 7.4.3

### Patch Changes

- [#22029](https://bitbucket.org/atlassian/atlassian-frontend/pull-requests/22029)
  [`ec2f2d0b804`](https://bitbucket.org/atlassian/atlassian-frontend/commits/ec2f2d0b804) -
  ED-14734: Add analytics to track time to connect to collab service, as well as tracking document
  initial load time.

## 7.4.2

### Patch Changes

- Updated dependencies

## 7.4.1

### Patch Changes

- Updated dependencies

## 7.4.0

### Minor Changes

- [#20721](https://bitbucket.org/atlassian/atlassian-frontend/pull-requests/20721)
  [`de9e3c28026`](https://bitbucket.org/atlassian/atlassian-frontend/commits/de9e3c28026) -
  [ED-14689] Refactor getFinalAcknowledgedState to only wait for the unconfirmed steps at the time
  of calling it to be confirmed. It will no longer wait for there to be no unconfirmed steps at all.

### Patch Changes

- Updated dependencies

## 7.3.1

### Patch Changes

- [#20650](https://bitbucket.org/atlassian/atlassian-frontend/pull-requests/20650)
  [`cb2392f6d33`](https://bitbucket.org/atlassian/atlassian-frontend/commits/cb2392f6d33) - Upgrade
  to TypeScript 4.2.4
- Updated dependencies

## 7.3.0

### Minor Changes

- [#20033](https://bitbucket.org/atlassian/atlassian-frontend/pull-requests/20033)
  [`617085788ed`](https://bitbucket.org/atlassian/atlassian-frontend/commits/617085788ed) - Allow
  collab provider to opt-in for 404 responses from NCS backend

## 7.2.0

### Minor Changes

- [#20556](https://bitbucket.org/atlassian/atlassian-frontend/pull-requests/20556)
  [`502a39af839`](https://bitbucket.org/atlassian/atlassian-frontend/commits/502a39af839) - Allow
  collab provider to opt-in for 404 responses from NCS backend

## 7.1.8

### Patch Changes

- Updated dependencies

## 7.1.7

### Patch Changes

- Updated dependencies

## 7.1.6

### Patch Changes

- [#18663](https://bitbucket.org/atlassian/atlassian-frontend/pull-requests/18663)
  [`5d5d6468ba9`](https://bitbucket.org/atlassian/atlassian-frontend/commits/5d5d6468ba9) - Remove
  url-parse from collab-provider

  Url-parse can be replaced with the built-in URL constructor

## 7.1.5

### Patch Changes

- [#16752](https://bitbucket.org/atlassian/atlassian-frontend/pull-requests/16752)
  [`f82fb6c48f7`](https://bitbucket.org/atlassian/atlassian-frontend/commits/f82fb6c48f7) -
  [ED-13911] Fix cycle dependencies
- [`97412280671`](https://bitbucket.org/atlassian/atlassian-frontend/commits/97412280671) -
  [ED-13939] Add analytics event to track "can't syncup with collab service" error
- [`88ada10af2c`](https://bitbucket.org/atlassian/atlassian-frontend/commits/88ada10af2c) -
  [ED-14097] Moved getFinalAcknowledgedState control to editor and made the API public
- [#18526](https://bitbucket.org/atlassian/atlassian-frontend/pull-requests/18526)
  [`85648c038a4`](https://bitbucket.org/atlassian/atlassian-frontend/commits/85648c038a4) - ED-13939
  Rename newCollabSyncUpError analytics event to newCollabSyncUpErrorNoSteps
- [`e292f108d4b`](https://bitbucket.org/atlassian/atlassian-frontend/commits/e292f108d4b) - Ensure
  metadata is persisted when it is updated by another participant during an editing session
- Updated dependencies

## 7.1.4

### Patch Changes

- [`19d72473dfb`](https://bitbucket.org/atlassian/atlassian-frontend/commits/19d72473dfb) - ED-13912
  refactor editor collab-provider and make sure that initializeChannel is only called once
- Updated dependencies

## 7.1.3

### Patch Changes

- [#17475](https://bitbucket.org/atlassian/atlassian-frontend/pull-requests/17475)
  [`c55c736ecea`](https://bitbucket.org/atlassian/atlassian-frontend/commits/c55c736ecea) - Patch
  VULN AFP-3486 AFP-3487 AFP-3488 AFP-3489

## 7.1.2

### Patch Changes

- Updated dependencies

## 7.1.1

### Patch Changes

- [#15998](https://bitbucket.org/atlassian/atlassian-frontend/pull-requests/15998)
  [`c6feed82071`](https://bitbucket.org/atlassian/atlassian-frontend/commits/c6feed82071) -
  ED-11632: Bump prosemirror packages;

  - prosmirror-commands 1.1.4 -> 1.1.11,
  - prosemirror-model 1.11.0 -> 1.14.3,
  - prosemirror-state 1.3.3 -> 1.3.4,
  - prosemirror-transform 1.2.8 -> 1.3.2,
  - prosemirror-view 1.15.4 + 1.18.8 -> 1.20.2.

- [`b670f0469c4`](https://bitbucket.org/atlassian/atlassian-frontend/commits/b670f0469c4) -
  COLLAB-990: fixing duplciated avatar
- Updated dependencies

## 7.1.0

### Minor Changes

- [#14319](https://bitbucket.org/atlassian/atlassian-frontend/pull-requests/14319)
  [`cf853e39278`](https://bitbucket.org/atlassian/atlassian-frontend/commits/cf853e39278) -
  COLLAB-411-change-to-metadata: 'setTitle' and 'setEditorWidth' are deprecated, going to be removed
  in the next release, use 'setMetadata' instead.
- [`10d7bc384aa`](https://bitbucket.org/atlassian/atlassian-frontend/commits/10d7bc384aa) -
  COLLAB-933: add disconnected event

### Patch Changes

- Updated dependencies

## 7.0.1

### Patch Changes

- [#13864](https://bitbucket.org/atlassian/atlassian-frontend/pull-requests/13864)
  [`2f5b81920af`](https://bitbucket.org/atlassian/atlassian-frontend/commits/2f5b81920af) - Refactor
  the provider class in collab provider
- [`0ec1c930f96`](https://bitbucket.org/atlassian/atlassian-frontend/commits/0ec1c930f96) - NONE:
  tuning catchup trigger
- Updated dependencies

## 7.0.0

### Major Changes

- [#13302](https://bitbucket.org/atlassian/atlassian-frontend/pull-requests/13302)
  [`6090cc1cf57`](https://bitbucket.org/atlassian/atlassian-frontend/commits/6090cc1cf57) -
  COLLAB-820: use `permissionTokenRefresh` for custom JWT token

### Patch Changes

- [`66404f5a168`](https://bitbucket.org/atlassian/atlassian-frontend/commits/66404f5a168) - NONE:
  only proactively catchup after offline enough
- Updated dependencies

## 6.5.0

### Minor Changes

- [#12837](https://bitbucket.org/atlassian/atlassian-frontend/pull-requests/12837)
  [`91a481d1b7d`](https://bitbucket.org/atlassian/atlassian-frontend/commits/91a481d1b7d) - Add
  analytics for catchup

### Patch Changes

- [`ae79161f6dc`](https://bitbucket.org/atlassian/atlassian-frontend/commits/ae79161f6dc) -
  COLLAB-808: fix error handle
- [`bea14ccfb27`](https://bitbucket.org/atlassian/atlassian-frontend/commits/bea14ccfb27) - NONE:
  fix throttledCommit and error counter
- Updated dependencies

## 6.4.2

### Patch Changes

- [#12328](https://bitbucket.org/atlassian/atlassian-frontend/pull-requests/12328)
  [`ae910a43cf9`](https://bitbucket.org/atlassian/atlassian-frontend/commits/ae910a43cf9) -
  COLLAB-537: fix reconnect fail to trigger
- Updated dependencies

## 6.4.1

### Patch Changes

- [#11649](https://bitbucket.org/atlassian/atlassian-frontend/pull-requests/11649)
  [`a87567a24b3`](https://bitbucket.org/atlassian/atlassian-frontend/commits/a87567a24b3) - fix
  catchup
- Updated dependencies

## 6.4.0

### Minor Changes

- [#10867](https://bitbucket.org/atlassian/atlassian-frontend/pull-requests/10867)
  [`8efef26a27e`](https://bitbucket.org/atlassian/atlassian-frontend/commits/8efef26a27e) -
  [COLLAB-683] Removed debounce and throttle from Collab Provider due to sync delay on Confluence

## 6.3.1

### Patch Changes

- Updated dependencies

## 6.3.0

### Minor Changes

- [#10230](https://bitbucket.org/atlassian/atlassian-frontend/pull-requests/10230)
  [`8734a8b70a8`](https://bitbucket.org/atlassian/atlassian-frontend/commits/8734a8b70a8) - allow
  consumers to circumvent hard editor coupling

### Patch Changes

- Updated dependencies

## 6.2.0

### Minor Changes

- [#9510](https://bitbucket.org/atlassian/atlassian-frontend/pull-requests/9510)
  [`e6cc5277203`](https://bitbucket.org/atlassian/atlassian-frontend/commits/e6cc5277203) -
  COLLAB-388: emit 404 error event when document not found in Collab Service

### Patch Changes

- [`a2d14a3865e`](https://bitbucket.org/atlassian/atlassian-frontend/commits/a2d14a3865e) -
  VULN-304542: bump socket.io client to V4, it's major but no breaking change.
- [`6f0c71a2a95`](https://bitbucket.org/atlassian/atlassian-frontend/commits/6f0c71a2a95) - put
  collab-provider logger under flag, set `window.COLLAB_PROVIDER_LOGGER` to true to see the logs.
- Updated dependencies

## 6.1.0

### Minor Changes

- [#9083](https://bitbucket.org/atlassian/atlassian-frontend/pull-requests/9083)
  [`15d11ecc623`](https://bitbucket.org/atlassian/atlassian-frontend/commits/15d11ecc623) -
  COLLAB-482: change no permission error code to 403

## 6.0.0

### Major Changes

- [#8644](https://bitbucket.org/atlassian/atlassian-frontend/pull-requests/8644)
  [`b010a665e13`](https://bitbucket.org/atlassian/atlassian-frontend/commits/b010a665e13) - Bump
  socket IO to version 3 for collab provider

### Minor Changes

- [`29746d1123e`](https://bitbucket.org/atlassian/atlassian-frontend/commits/29746d1123e) - Emit
  errors to consumers

### Patch Changes

- [`b74caaa43e9`](https://bitbucket.org/atlassian/atlassian-frontend/commits/b74caaa43e9) - add
  reserveCursor option to init event
- [`c54aacca521`](https://bitbucket.org/atlassian/atlassian-frontend/commits/c54aacca521) -
  getFinalAcknowledgedState ensure unconfirmed steps confirmed
- [`cff5c406985`](https://bitbucket.org/atlassian/atlassian-frontend/commits/cff5c406985) - Fix
  issue with socket io client v3 not attaching cookies into request
- [`226fce80d0d`](https://bitbucket.org/atlassian/atlassian-frontend/commits/226fce80d0d) - Fix:
  potential race condition for catchup
- [`09040efc1a4`](https://bitbucket.org/atlassian/atlassian-frontend/commits/09040efc1a4) -
  pauseQueue should always reset
- Updated dependencies

## 5.2.0

### Minor Changes

- [#7425](https://bitbucket.org/atlassian/atlassian-frontend/pull-requests/7425)
  [`360a14b1d2`](https://bitbucket.org/atlassian/atlassian-frontend/commits/360a14b1d2) - fix issue
  with empty string for title and editor width
- [`2ef9970ee2`](https://bitbucket.org/atlassian/atlassian-frontend/commits/2ef9970ee2) - add
  analytics for collab provider
- [`1c0473e050`](https://bitbucket.org/atlassian/atlassian-frontend/commits/1c0473e050) - Collab
  provider to support custom share token for embedded confluence page

## 5.1.0

### Minor Changes

- [#7170](https://bitbucket.org/atlassian/atlassian-frontend/pull-requests/7170)
  [`3f6006306a`](https://bitbucket.org/atlassian/atlassian-frontend/commits/3f6006306a) - add
  stepVersion into getFinalAcknowledgedState

### Patch Changes

- Updated dependencies

## 5.0.1

### Patch Changes

- [#6930](https://bitbucket.org/atlassian/atlassian-frontend/pull-requests/6930)
  [`f9cd884b7e`](https://bitbucket.org/atlassian/atlassian-frontend/commits/f9cd884b7e) - Fix issue
  with emitting noisy empty presence events.
- Updated dependencies

## 5.0.0

### Major Changes

- [#6571](https://bitbucket.org/atlassian/atlassian-frontend/pull-requests/6571)
  [`da77198e43`](https://bitbucket.org/atlassian/atlassian-frontend/commits/da77198e43) - Rename
  title:changed to metadata:changed in collab provider, editor common and mobile bridge

### Patch Changes

- Updated dependencies

## 4.1.1

### Patch Changes

- [#5857](https://bitbucket.org/atlassian/atlassian-frontend/pull-requests/5857)
  [`d3265f19be`](https://bitbucket.org/atlassian/atlassian-frontend/commits/d3265f19be) - Transpile
  packages using babel rather than tsc

## 4.1.0

### Minor Changes

- [#6228](https://bitbucket.org/atlassian/atlassian-frontend/pull-requests/6228)
  [`c3ce422cd4`](https://bitbucket.org/atlassian/atlassian-frontend/commits/c3ce422cd4) -
  COLLAB-11-trigger-catchup-5s
- [`474b09e4c0`](https://bitbucket.org/atlassian/atlassian-frontend/commits/474b09e4c0) - COLLAB-11
  steps rejected error handler

### Patch Changes

- Updated dependencies

## 4.0.0

### Major Changes

- [#5860](https://bitbucket.org/atlassian/atlassian-frontend/pull-requests/5860)
  [`e3b2251f29`](https://bitbucket.org/atlassian/atlassian-frontend/commits/e3b2251f29) - Breaking
  change for collab provider as userId has been removed from constructor. Mobile bridge and editor
  demo app require an upgrade too

### Patch Changes

- [`19a4732268`](https://bitbucket.org/atlassian/atlassian-frontend/commits/19a4732268) - use
  reconnect to trigger catchup
- [`703752d487`](https://bitbucket.org/atlassian/atlassian-frontend/commits/703752d487) - ED-10647
  Remove caret from prosemirror-model, prosemirror-keymap, prosemirror-state, prosemirror-transform
  to lock them down to an explicit version
- Updated dependencies

## 3.3.2

### Patch Changes

- [#5725](https://bitbucket.org/atlassian/atlassian-frontend/pull-requests/5725)
  [`ac54a7870c`](https://bitbucket.org/atlassian/atlassian-frontend/commits/ac54a7870c) - Remove
  extraneous dependencies rule suppression

## 3.3.1

### Patch Changes

- [#5497](https://bitbucket.org/atlassian/atlassian-frontend/pull-requests/5497)
  [`5f58283e1f`](https://bitbucket.org/atlassian/atlassian-frontend/commits/5f58283e1f) - Export
  types using Typescript's new "export type" syntax to satisfy Typescript's --isolatedModules
  compiler option. This requires version 3.8 of Typescript, read more about how we handle Typescript
  versions here: https://atlaskit.atlassian.com/get-started Also add `typescript` to
  `devDependencies` to denote version that the package was built with.

## 3.3.0

### Minor Changes

- [#4749](https://bitbucket.org/atlassian/atlassian-frontend/pull-requests/4749)
  [`9a39500244`](https://bitbucket.org/atlassian/atlassian-frontend/commits/9a39500244) - Bump
  ProseMirror packages

  Read more: https://product-fabric.atlassian.net/wiki/spaces/E/pages/1671956531/2020-08

- [`4ea3c66256`](https://bitbucket.org/atlassian/atlassian-frontend/commits/4ea3c66256) -
  optimize-title-sync

### Patch Changes

- [`3e9f1f6b57`](https://bitbucket.org/atlassian/atlassian-frontend/commits/3e9f1f6b57) - CS-3100:
  Fix for fast keystrokes issue on collab-provider
- Updated dependencies

## 3.2.3

### Patch Changes

- Updated dependencies

## 3.2.2

### Patch Changes

- [#3885](https://bitbucket.org/atlassian/atlassian-frontend/pull-requests/3885)
  [`6c525a8229`](https://bitbucket.org/atlassian/atlassian-frontend/commits/6c525a8229) - Upgraded
  to TypeScript 3.9.6 and tslib to 2.0.0

  Since tslib is a dependency for all our packages we recommend that products also follow this tslib
  upgrade to prevent duplicates of tslib being bundled.

## 3.2.1

### Patch Changes

- [#4393](https://bitbucket.org/atlassian/atlassian-frontend/pull-requests/4393)
  [`76165ad82f`](https://bitbucket.org/atlassian/atlassian-frontend/commits/76165ad82f) - Bump
  required because of conflicts on wadmal release

## 3.2.0

### Minor Changes

- [#3823](https://bitbucket.org/atlassian/atlassian-frontend/pull-requests/3823)
  [`4809ed1b20`](https://bitbucket.org/atlassian/atlassian-frontend/commits/4809ed1b20) - fix many
  infinite heartbeats

### Patch Changes

- [`6262f382de`](https://bitbucket.org/atlassian/atlassian-frontend/commits/6262f382de) - Use the
  'lodash' package instead of single-function 'lodash.\*' packages
- Updated dependencies

## 3.1.0

### Minor Changes

- [#3428](https://bitbucket.org/atlassian/atlassian-frontend/pull-requests/3428)
  [`90a0d166b3`](https://bitbucket.org/atlassian/atlassian-frontend/commits/90a0d166b3) - fix: pass
  the correct path to resolve the conflict with http
- [`372494e25b`](https://bitbucket.org/atlassian/atlassian-frontend/commits/372494e25b) - add path
  to collab provider

### Patch Changes

- Updated dependencies

## 3.0.0

### Major Changes

- [#3335](https://bitbucket.org/atlassian/atlassian-frontend/pull-requests/3335)
  [`87f4720f27`](https://bitbucket.org/atlassian/atlassian-frontend/commits/87f4720f27) - Officially
  dropping IE11 support, from this version onwards there are no warranties of the package working in
  IE11. For more information see:
  https://community.developer.atlassian.com/t/atlaskit-to-drop-support-for-internet-explorer-11-from-1st-july-2020/39534

### Patch Changes

- Updated dependencies

## 2.0.0

### Major Changes

- [#2763](https://bitbucket.org/atlassian/atlassian-frontend/pull-requests/2763)
  [`3eb98cd820`](https://bitbucket.org/atlassian/atlassian-frontend/commits/3eb98cd820) - ED-9367
  Add required config argument to `createSocket`

### Minor Changes

- [`f90d5a351e`](https://bitbucket.org/atlassian/atlassian-frontend/commits/f90d5a351e) - ED-9367
  Create entry point with a collab provider factory pre-configured with SocketIO
- [`f80f07b072`](https://bitbucket.org/atlassian/atlassian-frontend/commits/f80f07b072) - ED-9451
  Support lifecycle emitter on configuration
- [`8814c0a119`](https://bitbucket.org/atlassian/atlassian-frontend/commits/8814c0a119) - ED-9451
  Support for custom storage interface

### Patch Changes

- Updated dependencies

## 1.0.2

### Patch Changes

- [#2443](https://bitbucket.org/atlassian/atlassian-frontend/pull-requests/2443)
  [`473504379b`](https://bitbucket.org/atlassian/atlassian-frontend/commits/473504379b) - ED-9367
  Use collab entry point on editor-common
- [`0d43df75cb`](https://bitbucket.org/atlassian/atlassian-frontend/commits/0d43df75cb) - Add unit
  tests for channel.ts
- Updated dependencies

## 1.0.1

### Patch Changes

- [#1868](https://bitbucket.org/atlassian/atlassian-frontend/pull-requests/1868)
  [`56a7357c81`](https://bitbucket.org/atlassian/atlassian-frontend/commits/56a7357c81) - ED-9197:
  upgrade prosemirror-transform to prevent cut and paste type errors

  It's important to make sure that there isn't any `prosemirror-transform` packages with version
  less than 1.2.5 in `yarn.lock`.- Updated dependencies

## 1.0.0

### Major Changes

- [major][c0b8c92b2e](https://bitbucket.org/atlassian/atlassian-frontend/commits/c0b8c92b2e):

  catchup if behind the server

### Patch Changes

- Updated dependencies
  [c74cc954d8](https://bitbucket.org/atlassian/atlassian-frontend/commits/c74cc954d8):
- Updated dependencies
  [b4326a7eba](https://bitbucket.org/atlassian/atlassian-frontend/commits/b4326a7eba):
- Updated dependencies
  [e4076915c8](https://bitbucket.org/atlassian/atlassian-frontend/commits/e4076915c8):
- Updated dependencies
  [05539b052e](https://bitbucket.org/atlassian/atlassian-frontend/commits/05539b052e):
- Updated dependencies
  [205b05851a](https://bitbucket.org/atlassian/atlassian-frontend/commits/205b05851a):
- Updated dependencies
  [0b22d3b9ea](https://bitbucket.org/atlassian/atlassian-frontend/commits/0b22d3b9ea):
- Updated dependencies
  [b4ef7fe214](https://bitbucket.org/atlassian/atlassian-frontend/commits/b4ef7fe214):
- Updated dependencies
  [67bc25bc3f](https://bitbucket.org/atlassian/atlassian-frontend/commits/67bc25bc3f):
- Updated dependencies
  [6eb8c0799f](https://bitbucket.org/atlassian/atlassian-frontend/commits/6eb8c0799f):
  - @atlaskit/editor-common@45.0.0

## 0.1.1

### Patch Changes

- [patch][cf86087ae2](https://bitbucket.org/atlassian/atlassian-frontend/commits/cf86087ae2):

  ED-8751 Remove 'export \*' from collab-provider-
  [patch][4955ff3d36](https://bitbucket.org/atlassian/atlassian-frontend/commits/4955ff3d36):

  Minor package.json config compliance updates- Updated dependencies
  [bc29fbc030](https://bitbucket.org/atlassian/atlassian-frontend/commits/bc29fbc030):

- Updated dependencies
  [7d80e44c09](https://bitbucket.org/atlassian/atlassian-frontend/commits/7d80e44c09):
- Updated dependencies
  [d63888b5e5](https://bitbucket.org/atlassian/atlassian-frontend/commits/d63888b5e5):
- Updated dependencies
  [0a0a54cb47](https://bitbucket.org/atlassian/atlassian-frontend/commits/0a0a54cb47):
- Updated dependencies
  [fad8a16962](https://bitbucket.org/atlassian/atlassian-frontend/commits/fad8a16962):
- Updated dependencies
  [cc54ca2490](https://bitbucket.org/atlassian/atlassian-frontend/commits/cc54ca2490):
  - @atlaskit/editor-common@44.1.0

## 0.1.0

### Minor Changes

- [minor][bc380c30ce](https://bitbucket.org/atlassian/atlassian-frontend/commits/bc380c30ce):

  New collab provider

### Patch Changes

- Updated dependencies
  [bc380c30ce](https://bitbucket.org/atlassian/atlassian-frontend/commits/bc380c30ce):
- Updated dependencies
  [5bb23adac3](https://bitbucket.org/atlassian/atlassian-frontend/commits/5bb23adac3):
- Updated dependencies
  [025842de1a](https://bitbucket.org/atlassian/atlassian-frontend/commits/025842de1a):
- Updated dependencies
  [395739b5ef](https://bitbucket.org/atlassian/atlassian-frontend/commits/395739b5ef):
  - @atlaskit/editor-common@44.0.2
