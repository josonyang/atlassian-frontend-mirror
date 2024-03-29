# @atlaskit/collab-provider

## 9.17.0

### Minor Changes

- [#43813](https://bitbucket.org/atlassian/atlassian-frontend/pull-requests/43813) [`417f8592c91`](https://bitbucket.org/atlassian/atlassian-frontend/commits/417f8592c91) - block view only steps and metadata traffic

## 9.16.1

### Patch Changes

- [#43417](https://bitbucket.org/atlassian/atlassian-frontend/pull-requests/43417) [`3f3c17f0273`](https://bitbucket.org/atlassian/atlassian-frontend/commits/3f3c17f0273) - ED-20971 Upgrade adf-schema package to ^34.0.0

## 9.16.0

### Minor Changes

- [#43426](https://bitbucket.org/atlassian/atlassian-frontend/pull-requests/43426) [`850d2e49924`](https://bitbucket.org/atlassian/atlassian-frontend/commits/850d2e49924) - Add feature flag for send steps queue

## 9.15.5

### Patch Changes

- [#43379](https://bitbucket.org/atlassian/atlassian-frontend/pull-requests/43379) [`482c025520d`](https://bitbucket.org/atlassian/atlassian-frontend/commits/482c025520d) - ED-20763 Upgrade ADF schema version to 33.2.3 for MBE nodes.
- Updated dependencies

## 9.15.4

### Patch Changes

- [#42471](https://bitbucket.org/atlassian/atlassian-frontend/pull-requests/42471) [`f850ec1b5a6`](https://bitbucket.org/atlassian/atlassian-frontend/commits/f850ec1b5a6) - improve error logging for collab provider

## 9.15.3

### Patch Changes

- [#41977](https://bitbucket.org/atlassian/atlassian-frontend/pull-requests/41977) [`5b2f6d283ef`](https://bitbucket.org/atlassian/atlassian-frontend/commits/5b2f6d283ef) - clean up catchup retry feature flag

## 9.15.2

### Patch Changes

- [#40950](https://bitbucket.org/atlassian/atlassian-frontend/pull-requests/40950) [`6fa1988ec35`](https://bitbucket.org/atlassian/atlassian-frontend/commits/6fa1988ec35) - clean up FF for enabling fallback to reconcile

## 9.15.1

### Patch Changes

- [#40940](https://bitbucket.org/atlassian/atlassian-frontend/pull-requests/40940) [`7a58a018436`](https://bitbucket.org/atlassian/atlassian-frontend/commits/7a58a018436) - add error logs for when editor state is undefined

## 9.15.0

### Minor Changes

- [#41131](https://bitbucket.org/atlassian/atlassian-frontend/pull-requests/41131) [`6d09bbf0bc7`](https://bitbucket.org/atlassian/atlassian-frontend/commits/6d09bbf0bc7) - only sending analytics event with unconfirmed step count on first connection when buffering is enabled

## 9.14.0

### Minor Changes

- [#41007](https://bitbucket.org/atlassian/atlassian-frontend/pull-requests/41007) [`7f1c8bda21e`](https://bitbucket.org/atlassian/atlassian-frontend/commits/7f1c8bda21e) - adding logging for presence of unconfirmed steps in collab-provider

## 9.13.0

### Minor Changes

- [#40878](https://bitbucket.org/atlassian/atlassian-frontend/pull-requests/40878) [`7009422b0ad`](https://bitbucket.org/atlassian/atlassian-frontend/commits/7009422b0ad) - remove provider initialization check for buffering

## 9.12.5

### Patch Changes

- [#39749](https://bitbucket.org/atlassian/atlassian-frontend/pull-requests/39749) [`e6b69f455c3`](https://bitbucket.org/atlassian/atlassian-frontend/commits/e6b69f455c3) - Connect yarn changeset to packages, upgrade adf-schema

## 9.12.4

### Patch Changes

- Updated dependencies

## 9.12.3

### Patch Changes

- Updated dependencies

## 9.12.2

### Patch Changes

- [#39481](https://bitbucket.org/atlassian/atlassian-frontend/pull-requests/39481) [`aeb5c9a01e8`](https://bitbucket.org/atlassian/atlassian-frontend/commits/aeb5c9a01e8) - Delete adf-schema from AFE and rely on npm package for adf-schema
- [`4b4dcfe0bba`](https://bitbucket.org/atlassian/atlassian-frontend/commits/4b4dcfe0bba) - Delete adf-schema, use published version

## 9.12.1

### Patch Changes

- [#39189](https://bitbucket.org/atlassian/atlassian-frontend/pull-requests/39189) [`41f00a65fed`](https://bitbucket.org/atlassian/atlassian-frontend/commits/41f00a65fed) - Add ClientId for CatchUp

## 9.12.0

### Minor Changes

- [#39302](https://bitbucket.org/atlassian/atlassian-frontend/pull-requests/39302) [`d1cee97f581`](https://bitbucket.org/atlassian/atlassian-frontend/commits/d1cee97f581) - removing stateless provider setup

## 9.11.1

### Patch Changes

- [#38976](https://bitbucket.org/atlassian/atlassian-frontend/pull-requests/38976) [`33cb07de05f`](https://bitbucket.org/atlassian/atlassian-frontend/commits/33cb07de05f) - change adf-schema to fixed versioning

## 9.11.0

### Minor Changes

- [#38553](https://bitbucket.org/atlassian/atlassian-frontend/pull-requests/38553) [`c50ae0964ce`](https://bitbucket.org/atlassian/atlassian-frontend/commits/c50ae0964ce) - seperate catching error handling

## 9.10.1

### Patch Changes

- [#38613](https://bitbucket.org/atlassian/atlassian-frontend/pull-requests/38613) [`469b5c12303`](https://bitbucket.org/atlassian/atlassian-frontend/commits/469b5c12303) - NO-ISSUE Move CollabEventLocalStepData to editor-common

## 9.10.0

### Minor Changes

- [#38589](https://bitbucket.org/atlassian/atlassian-frontend/pull-requests/38589) [`592dcbd5756`](https://bitbucket.org/atlassian/atlassian-frontend/commits/592dcbd5756) - Adding analytics events for early provider initialization and buffering

## 9.9.1

### Patch Changes

- Updated dependencies

## 9.9.0

### Minor Changes

- [#37838](https://bitbucket.org/atlassian/atlassian-frontend/pull-requests/37838) [`4c6ebd50aeb`](https://bitbucket.org/atlassian/atlassian-frontend/commits/4c6ebd50aeb) - call reconcile when commitUnconfirmedSteps fails (mitigation for 'can't sync up' errors)

## 9.8.0

### Minor Changes

- [#37113](https://bitbucket.org/atlassian/atlassian-frontend/pull-requests/37113) [`aceff84b101`](https://bitbucket.org/atlassian/atlassian-frontend/commits/aceff84b101) - initializing provider on setup if buffering is enabled

## 9.7.4

### Patch Changes

- [#37785](https://bitbucket.org/atlassian/atlassian-frontend/pull-requests/37785) [`4e6f1bf8511`](https://bitbucket.org/atlassian/atlassian-frontend/commits/4e6f1bf8511) - [ED-19233] Import prosemirror libraries from internal facade package

## 9.7.3

### Patch Changes

- [#36673](https://bitbucket.org/atlassian/atlassian-frontend/pull-requests/36673) [`04fa8eb5246`](https://bitbucket.org/atlassian/atlassian-frontend/commits/04fa8eb5246) - Added rate limiting options to collab provider

## 9.7.2

### Patch Changes

- [#36435](https://bitbucket.org/atlassian/atlassian-frontend/pull-requests/36435) [`f9735e0690e`](https://bitbucket.org/atlassian/atlassian-frontend/commits/f9735e0690e) - Using socket.onAnyOutgoing to measure and send message metrics

## 9.7.1

### Patch Changes

- [#36848](https://bitbucket.org/atlassian/atlassian-frontend/pull-requests/36848) [`14224c3f8a4`](https://bitbucket.org/atlassian/atlassian-frontend/commits/14224c3f8a4) - [ED-18162] Move the collab provider types to the editor common package to avoid circular dependencies

## 9.7.0

### Minor Changes

- [#36385](https://bitbucket.org/atlassian/atlassian-frontend/pull-requests/36385) [`3265cccb965`](https://bitbucket.org/atlassian/atlassian-frontend/commits/3265cccb965) - resolving editor state before updating document/metadata during early provider initialization

## 9.6.4

### Patch Changes

- [#34163](https://bitbucket.org/atlassian/atlassian-frontend/pull-requests/34163) [`b7cd15f159b`](https://bitbucket.org/atlassian/atlassian-frontend/commits/b7cd15f159b) - ESS-3572 Fix getFinalAcknowledgedState and getCurrentState error handlers not catching errors. Add logs to track the title metadata property

## 9.6.3

### Patch Changes

- [#36775](https://bitbucket.org/atlassian/atlassian-frontend/pull-requests/36775) [`857daf603b0`](https://bitbucket.org/atlassian/atlassian-frontend/commits/857daf603b0) - ESS-3718: change CollabEventPresenceData joined type to ProviderParticipant

## 9.6.2

### Patch Changes

- [#36604](https://bitbucket.org/atlassian/atlassian-frontend/pull-requests/36604) [`2e7c3cad470`](https://bitbucket.org/atlassian/atlassian-frontend/commits/2e7c3cad470) - Reduce stepsAdded analytics events by only sampling 10%

## 9.6.1

### Patch Changes

- [#36612](https://bitbucket.org/atlassian/atlassian-frontend/pull-requests/36612) [`979e3ad2b67`](https://bitbucket.org/atlassian/atlassian-frontend/commits/979e3ad2b67) - NO-ISSUE: add data portal links and fix a broken analytics error event

## 9.6.0

### Minor Changes

- [#36615](https://bitbucket.org/atlassian/atlassian-frontend/pull-requests/36615) [`7ef82ea1810`](https://bitbucket.org/atlassian/atlassian-frontend/commits/7ef82ea1810) - ESS-3718: export ProviderParticipant for JWM

## 9.5.2

### Patch Changes

- [#36241](https://bitbucket.org/atlassian/atlassian-frontend/pull-requests/36241) [`5f5ba16de66`](https://bitbucket.org/atlassian/atlassian-frontend/commits/5f5ba16de66) - [ED-13910] Fix prosemirror types

## 9.5.1

### Patch Changes

- [#36271](https://bitbucket.org/atlassian/atlassian-frontend/pull-requests/36271) [`74e05b3d5d3`](https://bitbucket.org/atlassian/atlassian-frontend/commits/74e05b3d5d3) - bump socket.io-client version number

## 9.5.0

### Minor Changes

- [#35954](https://bitbucket.org/atlassian/atlassian-frontend/pull-requests/35954) [`27f5fbdbb04`](https://bitbucket.org/atlassian/atlassian-frontend/commits/27f5fbdbb04) - ESS-3718: add email as a field in ProviderParticipant to support JWM presence/multiplayer bugfix

## 9.4.0

### Minor Changes

- [#36041](https://bitbucket.org/atlassian/atlassian-frontend/pull-requests/36041) [`606d4ad65fc`](https://bitbucket.org/atlassian/atlassian-frontend/commits/606d4ad65fc) - ESS-3682 Add detection that it the editor failed to update, emit analytics as well added an option to
  enable emitting fatal errors.

### Patch Changes

- [#36047](https://bitbucket.org/atlassian/atlassian-frontend/pull-requests/36047) [`5eb1273509c`](https://bitbucket.org/atlassian/atlassian-frontend/commits/5eb1273509c) - ESS-3728: Fix initialized always set to false when reconnecting.

## 9.3.1

### Patch Changes

- [#35233](https://bitbucket.org/atlassian/atlassian-frontend/pull-requests/35233) [`a9350cf3831`](https://bitbucket.org/atlassian/atlassian-frontend/commits/a9350cf3831) - Check existence of window and document variable for confluence SSR to work

## 9.3.0

### Minor Changes

- [#35659](https://bitbucket.org/atlassian/atlassian-frontend/pull-requests/35659) [`ece61235edc`](https://bitbucket.org/atlassian/atlassian-frontend/commits/ece61235edc) - ESS-3713: add getParticipants function to the collab provider

## 9.2.2

### Patch Changes

- [#34954](https://bitbucket.org/atlassian/atlassian-frontend/pull-requests/34954) [`11ac0368176`](https://bitbucket.org/atlassian/atlassian-frontend/commits/11ac0368176) - Dummy changeset to trigger release

## 9.2.1

### Patch Changes

- [#34993](https://bitbucket.org/atlassian/atlassian-frontend/pull-requests/34993) [`65fafdf95fe`](https://bitbucket.org/atlassian/atlassian-frontend/commits/65fafdf95fe) - ESS-3666: add additional analytics events for when the cant sync up with collab service error occurs for better troubleshooting

## 9.2.0

### Minor Changes

- [#34952](https://bitbucket.org/atlassian/atlassian-frontend/pull-requests/34952) [`ef726a72028`](https://bitbucket.org/atlassian/atlassian-frontend/commits/ef726a72028) - adding provider catchup when initial draft timestamp exceeds stale timeout

## 9.1.0

### Minor Changes

- [#34887](https://bitbucket.org/atlassian/atlassian-frontend/pull-requests/34887) [`2c0c19cc14b`](https://bitbucket.org/atlassian/atlassian-frontend/commits/2c0c19cc14b) - ESS-3609: add step commit status events for confl save indicator feature
- [`470c3a7e8c6`](https://bitbucket.org/atlassian/atlassian-frontend/commits/470c3a7e8c6) - ESS-3644: allow max steps retry param to be passed thru collab provider to allow getFinalAcknowledgeState to catch up sooner on publish

## 9.0.1

### Patch Changes

- [#34644](https://bitbucket.org/atlassian/atlassian-frontend/pull-requests/34644) [`6fe0ddc993e`](https://bitbucket.org/atlassian/atlassian-frontend/commits/6fe0ddc993e) - ESS-3624 bug fix for missing avatar in editing sessions
- [`579326b4915`](https://bitbucket.org/atlassian/atlassian-frontend/commits/579326b4915) - ESS-2763 update get final editor state

## 9.0.0

### Major Changes

- [#34192](https://bitbucket.org/atlassian/atlassian-frontend/pull-requests/34192) [`b7086232a7c`](https://bitbucket.org/atlassian/atlassian-frontend/commits/b7086232a7c) - ESS-3135: move collab provider types into @atlaskit/collab-provider

## 8.9.1

### Patch Changes

- [#33793](https://bitbucket.org/atlassian/atlassian-frontend/pull-requests/33793) [`9d00501a414`](https://bitbucket.org/atlassian/atlassian-frontend/commits/9d00501a414) - Ensure legacy types are published for TS 4.5-4.8

## 8.9.0

### Minor Changes

- [#33771](https://bitbucket.org/atlassian/atlassian-frontend/pull-requests/33771) [`220cf63d92b`](https://bitbucket.org/atlassian/atlassian-frontend/commits/220cf63d92b) - ESS-3525 change catchup failed to recoverable true
- [`a6bdc7cbd60`](https://bitbucket.org/atlassian/atlassian-frontend/commits/a6bdc7cbd60) - adding functionality for early collab provider setup with initial draft

### Patch Changes

- [`a41f38996bd`](https://bitbucket.org/atlassian/atlassian-frontend/commits/a41f38996bd) - Add namespace service, refactor presence into participants service. No external API changes.
- [`5e005df7946`](https://bitbucket.org/atlassian/atlassian-frontend/commits/5e005df7946) - Refactor presence, no API changes
- [`02c8dd052d5`](https://bitbucket.org/atlassian/atlassian-frontend/commits/02c8dd052d5) - ESS-3553 Fix tokens not being unset when permissionTokenRefresh returns null. Fix error handler not emitting errors
- [`a142ba1aa28`](https://bitbucket.org/atlassian/atlassian-frontend/commits/a142ba1aa28) - [ED17172] Bump prosemirror-model to 1.16.0 and prosemirror-view to 1.23.7 and removed work-arounds for fixed issues
- Updated dependencies

## 8.8.2

### Patch Changes

- [#33649](https://bitbucket.org/atlassian/atlassian-frontend/pull-requests/33649) [`41fae2c6f68`](https://bitbucket.org/atlassian/atlassian-frontend/commits/41fae2c6f68) - Upgrade Typescript from `4.5.5` to `4.9.5`

## 8.8.1

### Patch Changes

- [#32951](https://bitbucket.org/atlassian/atlassian-frontend/pull-requests/32951) [`c0f3b955ee6`](https://bitbucket.org/atlassian/atlassian-frontend/commits/c0f3b955ee6) - remove the deprecated analytics field 'ttlEnabled'

## 8.8.0

### Minor Changes

- [#33258](https://bitbucket.org/atlassian/atlassian-frontend/pull-requests/33258) [`56507598609`](https://bitbucket.org/atlassian/atlassian-frontend/commits/56507598609) - Skip minor dependency bump

### Patch Changes

- Updated dependencies

## 8.7.0

### Minor Changes

- [#33004](https://bitbucket.org/atlassian/atlassian-frontend/pull-requests/33004) [`054186aa44f`](https://bitbucket.org/atlassian/atlassian-frontend/commits/054186aa44f) - Remove email from CollabParticipant type and rely more on ProviderParticipant type.
- [`849e1a3b3e1`](https://bitbucket.org/atlassian/atlassian-frontend/commits/849e1a3b3e1) - ESS-3486 Add getmetadata as an exposed method.

### Patch Changes

- [`b69b9375eec`](https://bitbucket.org/atlassian/atlassian-frontend/commits/b69b9375eec) - match version of @atlaskit/ufo to others places/packages so we only have one version
- [`0ffb55018c9`](https://bitbucket.org/atlassian/atlassian-frontend/commits/0ffb55018c9) - Revert "[ED-17172] Bumped prosemirror-view from 1.23.2 to 1.23.7 and removed work-around for fixed issues"
- [`196773a471b`](https://bitbucket.org/atlassian/atlassian-frontend/commits/196773a471b) - Add new type that reflects default broadcast payloads, telepoint events are now being passed the needed timestamp
- [`66b94ce320c`](https://bitbucket.org/atlassian/atlassian-frontend/commits/66b94ce320c) - Throw new error if cookies not enabled
- [`60725af0609`](https://bitbucket.org/atlassian/atlassian-frontend/commits/60725af0609) - Remove the auto exported modules and use explicit exports
- Updated dependencies

## 8.6.0

### Minor Changes

- [#32424](https://bitbucket.org/atlassian/atlassian-frontend/pull-requests/32424) [`1547aa8e377`](https://bitbucket.org/atlassian/atlassian-frontend/commits/1547aa8e377) - skipping document update with initial draft on reconnection
- [`76eded42866`](https://bitbucket.org/atlassian/atlassian-frontend/commits/76eded42866) - [ESS-3441] Added Confluence integration tests for collab provider, don't emit empty participants left events
- [`33cab158f01`](https://bitbucket.org/atlassian/atlassian-frontend/commits/33cab158f01) - ESS-3478 Fix public interface `getUnconfirmedSteps` from being removed
- [`02520373358`](https://bitbucket.org/atlassian/atlassian-frontend/commits/02520373358) - passing initial draft to NCS collab provider and adding flag to bypass BE draft fetch.
- [`56779259eab`](https://bitbucket.org/atlassian/atlassian-frontend/commits/56779259eab) - ESS-2900: add confluence integration tests + add error handling to provider init
- [`f9257ff1a63`](https://bitbucket.org/atlassian/atlassian-frontend/commits/f9257ff1a63) - NO-ISSUE Changed the type export to a normal export for PROVIDER_ERROR_CODE

### Patch Changes

- [`2e01c9c74b5`](https://bitbucket.org/atlassian/atlassian-frontend/commits/2e01c9c74b5) - DUMMY remove before merging to master; dupe adf-schema via adf-utils
- [`945162380e3`](https://bitbucket.org/atlassian/atlassian-frontend/commits/945162380e3) - Functional changes to document service.
- [`937ff19a47d`](https://bitbucket.org/atlassian/atlassian-frontend/commits/937ff19a47d) - ESS-3240: moved throttledCommitStep function from index to commit-step file in collab-provider & add unit tests for commitStep
- [`0693d8fcab1`](https://bitbucket.org/atlassian/atlassian-frontend/commits/0693d8fcab1) - ESS-3446: clear all continuous timers when the provider disconnects or is destroyed
- Updated dependencies

## 8.5.0

### Minor Changes

- [#31891](https://bitbucket.org/atlassian/atlassian-frontend/pull-requests/31891) [`2192c9417d7`](https://bitbucket.org/atlassian/atlassian-frontend/commits/2192c9417d7) - [ESS-3335] Review Collab Provider API error handling & types
- [`c75fcb75c4e`](https://bitbucket.org/atlassian/atlassian-frontend/commits/c75fcb75c4e) - ESS-3241 Added unit tests for document restore.  
  ESS-3238 Internal refactor of collab provider, split document code from provider to document service.
  Remove unused userId field from CollabInitPayload, it is never sent as part of the CollabInitPayload.
- [`27b106a736b`](https://bitbucket.org/atlassian/atlassian-frontend/commits/27b106a736b) - ESS-3274 Refactor participant logic our of Provider class
- [`bdd8d88cad0`](https://bitbucket.org/atlassian/atlassian-frontend/commits/bdd8d88cad0) - [ESS-3332] Improved error mapping
- [`1d52016f25d`](https://bitbucket.org/atlassian/atlassian-frontend/commits/1d52016f25d) - Refactor collab-provider to accept a getAnalyticsClient Promise. And resolve when sending event.
  Ticket: https://product-fabric.atlassian.net/browse/CCP-2863
- [`dfd96d6b48a`](https://bitbucket.org/atlassian/atlassian-frontend/commits/dfd96d6b48a) - [ESS-3333] Update to the structure of errors emitted on the collab provider

  Upgrade instructions:

  - Change the type of the errors emitted on the provider from `CollabEventError` to `ProviderError`
  - Remove the reliance on the `status` field of the emitted errors, switch to using either the error code (exported as enum `PROVIDER_ERROR_CODE`) or the error flag `recoverable` indicating whether the provider can recover from the emitted error or not

  The mapping from the old status codes to the error codes is:

  - Status 403: PROVIDER_ERROR_CODE.NO_PERMISSION_ERROR, PROVIDER_ERROR_CODE.INVALID_USER_TOKEN
  - Status 404: PROVIDER_ERROR_CODE.DOCUMENT_NOT_FOUND
  - Status 423: PROVIDER_ERROR_CODE.LOCKED
  - Status 500: PROVIDER_ERROR_CODE.FAIL_TO_SAVE, PROVIDER_ERROR_CODE.DOCUMENT_RESTORE_ERROR, PROVIDER_ERROR_CODE.INTERNAL_SERVICE_ERROR

- [`078a6d029f0`](https://bitbucket.org/atlassian/atlassian-frontend/commits/078a6d029f0) - ESS-3333 temporarily re-add error status to fix product fabric from breaking changes

### Patch Changes

- [`8217befcee0`](https://bitbucket.org/atlassian/atlassian-frontend/commits/8217befcee0) - logs the ignoring of steps for data versions older than current version in DocumentService.onStepsAdded()
- [`66f07c721c4`](https://bitbucket.org/atlassian/atlassian-frontend/commits/66f07c721c4) - Add JSDoc to provider errors that are emitted to editor
- Updated dependencies

## 8.4.0

### Minor Changes

- [#31299](https://bitbucket.org/atlassian/atlassian-frontend/pull-requests/31299) [`eae755e434a`](https://bitbucket.org/atlassian/atlassian-frontend/commits/eae755e434a) - [ESS-3269] Don't return an empty document if something goes wrong when returning the final acknowledge state from the collab provider
- [`ca548613b49`](https://bitbucket.org/atlassian/atlassian-frontend/commits/ca548613b49) - ESS-3218 Add new configuration option throwOnNotConnected, which will throw not connected errors when attempting to save data whilst client is offline.
- [`329d3bb4e05`](https://bitbucket.org/atlassian/atlassian-frontend/commits/329d3bb4e05) - ESS-2962: added canCache flag in Config for Collab-provider. Channel now stores token locally if canCache flag is passed. Uses local token for reconnections if connection is lost for errors other that 401 and 403.
- [`1b9c38c7f48`](https://bitbucket.org/atlassian/atlassian-frontend/commits/1b9c38c7f48) - [ESS-3269] Added error handling and metrics for retrieving the current state

### Patch Changes

- [`2a076027203`](https://bitbucket.org/atlassian/atlassian-frontend/commits/2a076027203) - NO-ISSUE fix the permission error on permissionTokenRefresh
- [`bde10feab09`](https://bitbucket.org/atlassian/atlassian-frontend/commits/bde10feab09) - Avoid using callbacks when initialising socket connection
- [`f9a6a671d14`](https://bitbucket.org/atlassian/atlassian-frontend/commits/f9a6a671d14) - add comment to indicate that disconnect handler will be called when Firefox reload
- Updated dependencies

## 8.3.0

### Minor Changes

- [#30248](https://bitbucket.org/atlassian/atlassian-frontend/pull-requests/30248) [`1d36e909618`](https://bitbucket.org/atlassian/atlassian-frontend/commits/1d36e909618) - Log error on document restore
- [`0529b1b833c`](https://bitbucket.org/atlassian/atlassian-frontend/commits/0529b1b833c) - Trigger catch up call on process steps failing
- [`4f005660ce2`](https://bitbucket.org/atlassian/atlassian-frontend/commits/4f005660ce2) - Log step commit errors to analytics
- [`6034004a812`](https://bitbucket.org/atlassian/atlassian-frontend/commits/6034004a812) - Log errors on reconnection failure
- [`a261b2a9e6a`](https://bitbucket.org/atlassian/atlassian-frontend/commits/a261b2a9e6a) - [ESS-3183] Catch any errors in Presence functionality so an uncaught error there doesn't impact regular operation of the collab provider
- [`7f35ae7d99c`](https://bitbucket.org/atlassian/atlassian-frontend/commits/7f35ae7d99c) - [ESS-2815] Added network status to analytics events
- [`80feb6de229`](https://bitbucket.org/atlassian/atlassian-frontend/commits/80feb6de229) - [ESS-2815] Emit an error to consumers if the reconnections fails 8 times due to the network issues
- [`611d9c643c6`](https://bitbucket.org/atlassian/atlassian-frontend/commits/611d9c643c6) - [ESS-3183] Retry syncing unconfirmed steps

### Patch Changes

- [`fccc5952d49`](https://bitbucket.org/atlassian/atlassian-frontend/commits/fccc5952d49) - Revert emitting errors to Confluence by default
- [`0d25bcca6bb`](https://bitbucket.org/atlassian/atlassian-frontend/commits/0d25bcca6bb) - Added more comprehensive error handling for performance/analytics/ufo events in collab provider
- [`e97495c5748`](https://bitbucket.org/atlassian/atlassian-frontend/commits/e97495c5748) - Extract emitTelepointer logic from Provider
- [`260d1355cc6`](https://bitbucket.org/atlassian/atlassian-frontend/commits/260d1355cc6) - Reconnect collab provider immediately when browser emits online event.
- [`5725fb45955`](https://bitbucket.org/atlassian/atlassian-frontend/commits/5725fb45955) - Introduce a file for UFO.

  Introduce a file for commit step logic, which was already separate from the provider class

- [`2b648e4db70`](https://bitbucket.org/atlassian/atlassian-frontend/commits/2b648e4db70) - NO-ISSUE Remove the analytics fall-back after validating acks work as expected
- [`35c5e7dd9d5`](https://bitbucket.org/atlassian/atlassian-frontend/commits/35c5e7dd9d5) - NO-ISSUE deduplicate the analytics types dependency (again)
- [`1c255047a29`](https://bitbucket.org/atlassian/atlassian-frontend/commits/1c255047a29) - improve catchup error handling
- [`c9ad25cf224`](https://bitbucket.org/atlassian/atlassian-frontend/commits/c9ad25cf224) - [ESS-3183] Create abstraction around sending analytics events for errors or action events
- [`607a34f4426`](https://bitbucket.org/atlassian/atlassian-frontend/commits/607a34f4426) - Pass through the analytics web client in places it was missing
- [`efb112b06ab`](https://bitbucket.org/atlassian/atlassian-frontend/commits/efb112b06ab) - Move disonnected reason mapper
- [`9e6ceda8977`](https://bitbucket.org/atlassian/atlassian-frontend/commits/9e6ceda8977) - Provide the reason for a page reset
- [`6956eedc944`](https://bitbucket.org/atlassian/atlassian-frontend/commits/6956eedc944) - Tighten type definitions on analytics events
- Updated dependencies

## 8.2.0

### Minor Changes

- [#29470](https://bitbucket.org/atlassian/atlassian-frontend/pull-requests/29470) [`945413f0b29`](https://bitbucket.org/atlassian/atlassian-frontend/commits/945413f0b29) - trigger page recovery when catchup returns 404
- [`06119d7fed4`](https://bitbucket.org/atlassian/atlassian-frontend/commits/06119d7fed4) - handle catchup after page recovery
- [`a66427c3fe5`](https://bitbucket.org/atlassian/atlassian-frontend/commits/a66427c3fe5) - Add analytics logging to error handling
- [`56a21fe7209`](https://bitbucket.org/atlassian/atlassian-frontend/commits/56a21fe7209) - Improve error handling logic
- [`77aee68579e`](https://bitbucket.org/atlassian/atlassian-frontend/commits/77aee68579e) - adding a connecting event to be emitted when collab-provider is first initialized

### Patch Changes

- [`625f3c20f8c`](https://bitbucket.org/atlassian/atlassian-frontend/commits/625f3c20f8c) - Handle init errors
- Updated dependencies

## 8.1.0

### Minor Changes

- [#28932](https://bitbucket.org/atlassian/atlassian-frontend/pull-requests/28932) [`59e998e408f`](https://bitbucket.org/atlassian/atlassian-frontend/commits/59e998e408f) - [ESS-2914] Switch to the forked prosemirror-collab library (based on version 1.3.0) to filter out analytics steps
- [`ec0ebbf16bc`](https://bitbucket.org/atlassian/atlassian-frontend/commits/ec0ebbf16bc) - Adding Feature Flag to Collab Provider

### Patch Changes

- [`6eb720b7d3b`](https://bitbucket.org/atlassian/atlassian-frontend/commits/6eb720b7d3b) - A page recovery attribute and ttl attribute to metrics to monitor ttl effect on tti
- Updated dependencies

## 8.0.1

### Patch Changes

- [#28374](https://bitbucket.org/atlassian/atlassian-frontend/pull-requests/28374) [`7ba48e47e3b`](https://bitbucket.org/atlassian/atlassian-frontend/commits/7ba48e47e3b) - NO-ISSUE Re-removed some unused prod dependencies that were accidentally merged back in
- Updated dependencies

## 8.0.0

### Major Changes

- [#28090](https://bitbucket.org/atlassian/atlassian-frontend/pull-requests/28090) [`618b64f0d8c`](https://bitbucket.org/atlassian/atlassian-frontend/commits/618b64f0d8c) - Introduce ufo and measure document init latency with histogram

### Minor Changes

- [`83060253868`](https://bitbucket.org/atlassian/atlassian-frontend/commits/83060253868) - [ESS-2752] Introduced the capability to distinguish step commit failures due to errors and step rejections in collab provider analytics
- [`cc8b81f8fd8`](https://bitbucket.org/atlassian/atlassian-frontend/commits/cc8b81f8fd8) - Use socket.io acknowledgements to improve add-step performance tracking
- [`50d8749c3fa`](https://bitbucket.org/atlassian/atlassian-frontend/commits/50d8749c3fa) - Track telepointer latency

### Patch Changes

- [`0a482422f75`](https://bitbucket.org/atlassian/atlassian-frontend/commits/0a482422f75) - Update add-steps analytic
- [`9f1f34a71ea`](https://bitbucket.org/atlassian/atlassian-frontend/commits/9f1f34a71ea) - [ESS-3020] Turned all type dependencies in dev dependencies
- [`de027d19a65`](https://bitbucket.org/atlassian/atlassian-frontend/commits/de027d19a65) - Handle null for permission token refresh callback response
- [`62332c99254`](https://bitbucket.org/atlassian/atlassian-frontend/commits/62332c99254) - ESS-2964 - add numSteps and stepType to ADD-STEPS analytic events
- Updated dependencies

## 7.7.0

### Minor Changes

- [#26712](https://bitbucket.org/atlassian/atlassian-frontend/pull-requests/26712) [`fa0da169cce`](https://bitbucket.org/atlassian/atlassian-frontend/commits/fa0da169cce) - Introducing namespace status update: lock & unlock events
- [`eaada7441d0`](https://bitbucket.org/atlassian/atlassian-frontend/commits/eaada7441d0) - ESS-2853 Add metrics for page recovery events
- [`6319cd08784`](https://bitbucket.org/atlassian/atlassian-frontend/commits/6319cd08784) - add page restoration event handler

### Patch Changes

- Updated dependencies

## 7.6.3

### Patch Changes

- [#25860](https://bitbucket.org/atlassian/atlassian-frontend/pull-requests/25860) [`1a64a3e3e53`](https://bitbucket.org/atlassian/atlassian-frontend/commits/1a64a3e3e53) - ESS-2591 Reduce initial re-connection delay and increase randomization factor for socket io connections.
- [`ee8ac15d730`](https://bitbucket.org/atlassian/atlassian-frontend/commits/ee8ac15d730) - ESS-1363 add packageVersion to analytic events
- [`29292da81d7`](https://bitbucket.org/atlassian/atlassian-frontend/commits/29292da81d7) - Increased the limits for the collab sync on returning the document to the consumer
- [`e06f8ba062f`](https://bitbucket.org/atlassian/atlassian-frontend/commits/e06f8ba062f) - Disable collab provider transport closing on the beforeunload event.
- Updated dependencies

## 7.6.2

### Patch Changes

- Updated dependencies

## 7.6.1

### Patch Changes

- [#24874](https://bitbucket.org/atlassian/atlassian-frontend/pull-requests/24874) [`8cc2f888c83`](https://bitbucket.org/atlassian/atlassian-frontend/commits/8cc2f888c83) - Upgrade Typescript from `4.3.5` to `4.5.5`
- Updated dependencies

## 7.6.0

### Minor Changes

- [#24004](https://bitbucket.org/atlassian/atlassian-frontend/pull-requests/24004) [`5bd58e91664`](https://bitbucket.org/atlassian/atlassian-frontend/commits/5bd58e91664) - [ESS-2513] Add tracking for number of participants in analytics

### Patch Changes

- Updated dependencies

## 7.5.1

### Patch Changes

- [#24492](https://bitbucket.org/atlassian/atlassian-frontend/pull-requests/24492) [`8d4228767b0`](https://bitbucket.org/atlassian/atlassian-frontend/commits/8d4228767b0) - Upgrade Typescript from `4.2.4` to `4.3.5`.
- Updated dependencies

## 7.5.0

### Minor Changes

- [#23381](https://bitbucket.org/atlassian/atlassian-frontend/pull-requests/23381) [`1c555e79e56`](https://bitbucket.org/atlassian/atlassian-frontend/commits/1c555e79e56) - Added the capability to pass product information (product & sub-product) to the collab service
- [`247420a48f7`](https://bitbucket.org/atlassian/atlassian-frontend/commits/247420a48f7) - [ESS-1050] Return ADF document from getFinalAcknowledgedState
- [`17f1b0b87cc`](https://bitbucket.org/atlassian/atlassian-frontend/commits/17f1b0b87cc) - ESS-1019 changes the reconnectionDelayMax to 128s to reduce the reconnection storm.

### Patch Changes

- [`bf848f39cb1`](https://bitbucket.org/atlassian/atlassian-frontend/commits/bf848f39cb1) - ESS-2419 Emit the reason of permission errors to the consumers of collab-provider
- [`680dc155ebc`](https://bitbucket.org/atlassian/atlassian-frontend/commits/680dc155ebc) - Raise errors in the collab provider when the server fails loading initilisation data
- Updated dependencies

## 7.4.4

### Patch Changes

- Updated dependencies

## 7.4.3

### Patch Changes

- [#22029](https://bitbucket.org/atlassian/atlassian-frontend/pull-requests/22029) [`ec2f2d0b804`](https://bitbucket.org/atlassian/atlassian-frontend/commits/ec2f2d0b804) - ED-14734: Add analytics to track time to connect to collab service, as well as tracking document initial load time.

## 7.4.2

### Patch Changes

- Updated dependencies

## 7.4.1

### Patch Changes

- Updated dependencies

## 7.4.0

### Minor Changes

- [#20721](https://bitbucket.org/atlassian/atlassian-frontend/pull-requests/20721) [`de9e3c28026`](https://bitbucket.org/atlassian/atlassian-frontend/commits/de9e3c28026) - [ED-14689] Refactor getFinalAcknowledgedState to only wait for the unconfirmed steps at the time of calling it to be confirmed. It will no longer wait for there to be no unconfirmed steps at all.

### Patch Changes

- Updated dependencies

## 7.3.1

### Patch Changes

- [#20650](https://bitbucket.org/atlassian/atlassian-frontend/pull-requests/20650) [`cb2392f6d33`](https://bitbucket.org/atlassian/atlassian-frontend/commits/cb2392f6d33) - Upgrade to TypeScript 4.2.4
- Updated dependencies

## 7.3.0

### Minor Changes

- [#20033](https://bitbucket.org/atlassian/atlassian-frontend/pull-requests/20033) [`617085788ed`](https://bitbucket.org/atlassian/atlassian-frontend/commits/617085788ed) - Allow collab provider to opt-in for 404 responses from NCS backend

## 7.2.0

### Minor Changes

- [#20556](https://bitbucket.org/atlassian/atlassian-frontend/pull-requests/20556) [`502a39af839`](https://bitbucket.org/atlassian/atlassian-frontend/commits/502a39af839) - Allow collab provider to opt-in for 404 responses from NCS backend

## 7.1.8

### Patch Changes

- Updated dependencies

## 7.1.7

### Patch Changes

- Updated dependencies

## 7.1.6

### Patch Changes

- [#18663](https://bitbucket.org/atlassian/atlassian-frontend/pull-requests/18663) [`5d5d6468ba9`](https://bitbucket.org/atlassian/atlassian-frontend/commits/5d5d6468ba9) - Remove url-parse from collab-provider

  Url-parse can be replaced with the built-in URL constructor

## 7.1.5

### Patch Changes

- [#16752](https://bitbucket.org/atlassian/atlassian-frontend/pull-requests/16752) [`f82fb6c48f7`](https://bitbucket.org/atlassian/atlassian-frontend/commits/f82fb6c48f7) - [ED-13911] Fix cycle dependencies
- [`97412280671`](https://bitbucket.org/atlassian/atlassian-frontend/commits/97412280671) - [ED-13939] Add analytics event to track "can't syncup with collab service" error
- [`88ada10af2c`](https://bitbucket.org/atlassian/atlassian-frontend/commits/88ada10af2c) - [ED-14097] Moved getFinalAcknowledgedState control to editor and made the API public
- [#18526](https://bitbucket.org/atlassian/atlassian-frontend/pull-requests/18526) [`85648c038a4`](https://bitbucket.org/atlassian/atlassian-frontend/commits/85648c038a4) - ED-13939 Rename newCollabSyncUpError analytics event to newCollabSyncUpErrorNoSteps
- [`e292f108d4b`](https://bitbucket.org/atlassian/atlassian-frontend/commits/e292f108d4b) - Ensure metadata is persisted when it is updated by another participant during an editing session
- Updated dependencies

## 7.1.4

### Patch Changes

- [`19d72473dfb`](https://bitbucket.org/atlassian/atlassian-frontend/commits/19d72473dfb) - ED-13912 refactor editor collab-provider and make sure that initializeChannel is only called once
- Updated dependencies

## 7.1.3

### Patch Changes

- [#17475](https://bitbucket.org/atlassian/atlassian-frontend/pull-requests/17475) [`c55c736ecea`](https://bitbucket.org/atlassian/atlassian-frontend/commits/c55c736ecea) - Patch VULN AFP-3486 AFP-3487 AFP-3488 AFP-3489

## 7.1.2

### Patch Changes

- Updated dependencies

## 7.1.1

### Patch Changes

- [#15998](https://bitbucket.org/atlassian/atlassian-frontend/pull-requests/15998) [`c6feed82071`](https://bitbucket.org/atlassian/atlassian-frontend/commits/c6feed82071) - ED-11632: Bump prosemirror packages;

  - prosmirror-commands 1.1.4 -> 1.1.11,
  - prosemirror-model 1.11.0 -> 1.14.3,
  - prosemirror-state 1.3.3 -> 1.3.4,
  - prosemirror-transform 1.2.8 -> 1.3.2,
  - prosemirror-view 1.15.4 + 1.18.8 -> 1.20.2.

- [`b670f0469c4`](https://bitbucket.org/atlassian/atlassian-frontend/commits/b670f0469c4) - COLLAB-990: fixing duplciated avatar
- Updated dependencies

## 7.1.0

### Minor Changes

- [#14319](https://bitbucket.org/atlassian/atlassian-frontend/pull-requests/14319) [`cf853e39278`](https://bitbucket.org/atlassian/atlassian-frontend/commits/cf853e39278) - COLLAB-411-change-to-metadata: 'setTitle' and 'setEditorWidth' are deprecated, going to be removed in the next release, use 'setMetadata' instead.
- [`10d7bc384aa`](https://bitbucket.org/atlassian/atlassian-frontend/commits/10d7bc384aa) - COLLAB-933: add disconnected event

### Patch Changes

- Updated dependencies

## 7.0.1

### Patch Changes

- [#13864](https://bitbucket.org/atlassian/atlassian-frontend/pull-requests/13864) [`2f5b81920af`](https://bitbucket.org/atlassian/atlassian-frontend/commits/2f5b81920af) - Refactor the provider class in collab provider
- [`0ec1c930f96`](https://bitbucket.org/atlassian/atlassian-frontend/commits/0ec1c930f96) - NONE: tuning catchup trigger
- Updated dependencies

## 7.0.0

### Major Changes

- [#13302](https://bitbucket.org/atlassian/atlassian-frontend/pull-requests/13302) [`6090cc1cf57`](https://bitbucket.org/atlassian/atlassian-frontend/commits/6090cc1cf57) - COLLAB-820: use `permissionTokenRefresh` for custom JWT token

### Patch Changes

- [`66404f5a168`](https://bitbucket.org/atlassian/atlassian-frontend/commits/66404f5a168) - NONE: only proactively catchup after offline enough
- Updated dependencies

## 6.5.0

### Minor Changes

- [#12837](https://bitbucket.org/atlassian/atlassian-frontend/pull-requests/12837) [`91a481d1b7d`](https://bitbucket.org/atlassian/atlassian-frontend/commits/91a481d1b7d) - Add analytics for catchup

### Patch Changes

- [`ae79161f6dc`](https://bitbucket.org/atlassian/atlassian-frontend/commits/ae79161f6dc) - COLLAB-808: fix error handle
- [`bea14ccfb27`](https://bitbucket.org/atlassian/atlassian-frontend/commits/bea14ccfb27) - NONE: fix throttledCommit and error counter
- Updated dependencies

## 6.4.2

### Patch Changes

- [#12328](https://bitbucket.org/atlassian/atlassian-frontend/pull-requests/12328) [`ae910a43cf9`](https://bitbucket.org/atlassian/atlassian-frontend/commits/ae910a43cf9) - COLLAB-537: fix reconnect fail to trigger
- Updated dependencies

## 6.4.1

### Patch Changes

- [#11649](https://bitbucket.org/atlassian/atlassian-frontend/pull-requests/11649) [`a87567a24b3`](https://bitbucket.org/atlassian/atlassian-frontend/commits/a87567a24b3) - fix catchup
- Updated dependencies

## 6.4.0

### Minor Changes

- [#10867](https://bitbucket.org/atlassian/atlassian-frontend/pull-requests/10867) [`8efef26a27e`](https://bitbucket.org/atlassian/atlassian-frontend/commits/8efef26a27e) - [COLLAB-683] Removed debounce and throttle from Collab Provider due to sync delay on Confluence

## 6.3.1

### Patch Changes

- Updated dependencies

## 6.3.0

### Minor Changes

- [#10230](https://bitbucket.org/atlassian/atlassian-frontend/pull-requests/10230) [`8734a8b70a8`](https://bitbucket.org/atlassian/atlassian-frontend/commits/8734a8b70a8) - allow consumers to circumvent hard editor coupling

### Patch Changes

- Updated dependencies

## 6.2.0

### Minor Changes

- [#9510](https://bitbucket.org/atlassian/atlassian-frontend/pull-requests/9510) [`e6cc5277203`](https://bitbucket.org/atlassian/atlassian-frontend/commits/e6cc5277203) - COLLAB-388: emit 404 error event when document not found in Collab Service

### Patch Changes

- [`a2d14a3865e`](https://bitbucket.org/atlassian/atlassian-frontend/commits/a2d14a3865e) - VULN-304542: bump socket.io client to V4, it's major but no breaking change.
- [`6f0c71a2a95`](https://bitbucket.org/atlassian/atlassian-frontend/commits/6f0c71a2a95) - put collab-provider logger under flag, set `window.COLLAB_PROVIDER_LOGGER` to true to see the logs.
- Updated dependencies

## 6.1.0

### Minor Changes

- [#9083](https://bitbucket.org/atlassian/atlassian-frontend/pull-requests/9083) [`15d11ecc623`](https://bitbucket.org/atlassian/atlassian-frontend/commits/15d11ecc623) - COLLAB-482: change no permission error code to 403

## 6.0.0

### Major Changes

- [#8644](https://bitbucket.org/atlassian/atlassian-frontend/pull-requests/8644) [`b010a665e13`](https://bitbucket.org/atlassian/atlassian-frontend/commits/b010a665e13) - Bump socket IO to version 3 for collab provider

### Minor Changes

- [`29746d1123e`](https://bitbucket.org/atlassian/atlassian-frontend/commits/29746d1123e) - Emit errors to consumers

### Patch Changes

- [`b74caaa43e9`](https://bitbucket.org/atlassian/atlassian-frontend/commits/b74caaa43e9) - add reserveCursor option to init event
- [`c54aacca521`](https://bitbucket.org/atlassian/atlassian-frontend/commits/c54aacca521) - getFinalAcknowledgedState ensure unconfirmed steps confirmed
- [`cff5c406985`](https://bitbucket.org/atlassian/atlassian-frontend/commits/cff5c406985) - Fix issue with socket io client v3 not attaching cookies into request
- [`226fce80d0d`](https://bitbucket.org/atlassian/atlassian-frontend/commits/226fce80d0d) - Fix: potential race condition for catchup
- [`09040efc1a4`](https://bitbucket.org/atlassian/atlassian-frontend/commits/09040efc1a4) - pauseQueue should always reset
- Updated dependencies

## 5.2.0

### Minor Changes

- [#7425](https://bitbucket.org/atlassian/atlassian-frontend/pull-requests/7425) [`360a14b1d2`](https://bitbucket.org/atlassian/atlassian-frontend/commits/360a14b1d2) - fix issue with empty string for title and editor width
- [`2ef9970ee2`](https://bitbucket.org/atlassian/atlassian-frontend/commits/2ef9970ee2) - add analytics for collab provider
- [`1c0473e050`](https://bitbucket.org/atlassian/atlassian-frontend/commits/1c0473e050) - Collab provider to support custom share token for embedded confluence page

## 5.1.0

### Minor Changes

- [#7170](https://bitbucket.org/atlassian/atlassian-frontend/pull-requests/7170) [`3f6006306a`](https://bitbucket.org/atlassian/atlassian-frontend/commits/3f6006306a) - add stepVersion into getFinalAcknowledgedState

### Patch Changes

- Updated dependencies

## 5.0.1

### Patch Changes

- [#6930](https://bitbucket.org/atlassian/atlassian-frontend/pull-requests/6930) [`f9cd884b7e`](https://bitbucket.org/atlassian/atlassian-frontend/commits/f9cd884b7e) - Fix issue with emitting noisy empty presence events.
- Updated dependencies

## 5.0.0

### Major Changes

- [#6571](https://bitbucket.org/atlassian/atlassian-frontend/pull-requests/6571) [`da77198e43`](https://bitbucket.org/atlassian/atlassian-frontend/commits/da77198e43) - Rename title:changed to metadata:changed in collab provider, editor common and mobile bridge

### Patch Changes

- Updated dependencies

## 4.1.1

### Patch Changes

- [#5857](https://bitbucket.org/atlassian/atlassian-frontend/pull-requests/5857) [`d3265f19be`](https://bitbucket.org/atlassian/atlassian-frontend/commits/d3265f19be) - Transpile packages using babel rather than tsc

## 4.1.0

### Minor Changes

- [#6228](https://bitbucket.org/atlassian/atlassian-frontend/pull-requests/6228) [`c3ce422cd4`](https://bitbucket.org/atlassian/atlassian-frontend/commits/c3ce422cd4) - COLLAB-11-trigger-catchup-5s
- [`474b09e4c0`](https://bitbucket.org/atlassian/atlassian-frontend/commits/474b09e4c0) - COLLAB-11 steps rejected error handler

### Patch Changes

- Updated dependencies

## 4.0.0

### Major Changes

- [#5860](https://bitbucket.org/atlassian/atlassian-frontend/pull-requests/5860) [`e3b2251f29`](https://bitbucket.org/atlassian/atlassian-frontend/commits/e3b2251f29) - Breaking change for collab provider as userId has been removed from constructor. Mobile bridge and editor demo app require an upgrade too

### Patch Changes

- [`19a4732268`](https://bitbucket.org/atlassian/atlassian-frontend/commits/19a4732268) - use reconnect to trigger catchup
- [`703752d487`](https://bitbucket.org/atlassian/atlassian-frontend/commits/703752d487) - ED-10647 Remove caret from prosemirror-model, prosemirror-keymap, prosemirror-state, prosemirror-transform to lock them down to an explicit version
- Updated dependencies

## 3.3.2

### Patch Changes

- [#5725](https://bitbucket.org/atlassian/atlassian-frontend/pull-requests/5725) [`ac54a7870c`](https://bitbucket.org/atlassian/atlassian-frontend/commits/ac54a7870c) - Remove extraneous dependencies rule suppression

## 3.3.1

### Patch Changes

- [#5497](https://bitbucket.org/atlassian/atlassian-frontend/pull-requests/5497) [`5f58283e1f`](https://bitbucket.org/atlassian/atlassian-frontend/commits/5f58283e1f) - Export types using Typescript's new "export type" syntax to satisfy Typescript's --isolatedModules compiler option.
  This requires version 3.8 of Typescript, read more about how we handle Typescript versions here: https://atlaskit.atlassian.com/get-started
  Also add `typescript` to `devDependencies` to denote version that the package was built with.

## 3.3.0

### Minor Changes

- [#4749](https://bitbucket.org/atlassian/atlassian-frontend/pull-requests/4749) [`9a39500244`](https://bitbucket.org/atlassian/atlassian-frontend/commits/9a39500244) - Bump ProseMirror packages

  Read more: https://product-fabric.atlassian.net/wiki/spaces/E/pages/1671956531/2020-08

- [`4ea3c66256`](https://bitbucket.org/atlassian/atlassian-frontend/commits/4ea3c66256) - optimize-title-sync

### Patch Changes

- [`3e9f1f6b57`](https://bitbucket.org/atlassian/atlassian-frontend/commits/3e9f1f6b57) - CS-3100: Fix for fast keystrokes issue on collab-provider
- Updated dependencies

## 3.2.3

### Patch Changes

- Updated dependencies

## 3.2.2

### Patch Changes

- [#3885](https://bitbucket.org/atlassian/atlassian-frontend/pull-requests/3885) [`6c525a8229`](https://bitbucket.org/atlassian/atlassian-frontend/commits/6c525a8229) - Upgraded to TypeScript 3.9.6 and tslib to 2.0.0

  Since tslib is a dependency for all our packages we recommend that products also follow this tslib upgrade
  to prevent duplicates of tslib being bundled.

## 3.2.1

### Patch Changes

- [#4393](https://bitbucket.org/atlassian/atlassian-frontend/pull-requests/4393) [`76165ad82f`](https://bitbucket.org/atlassian/atlassian-frontend/commits/76165ad82f) - Bump required because of conflicts on wadmal release

## 3.2.0

### Minor Changes

- [#3823](https://bitbucket.org/atlassian/atlassian-frontend/pull-requests/3823) [`4809ed1b20`](https://bitbucket.org/atlassian/atlassian-frontend/commits/4809ed1b20) - fix many infinite heartbeats

### Patch Changes

- [`6262f382de`](https://bitbucket.org/atlassian/atlassian-frontend/commits/6262f382de) - Use the 'lodash' package instead of single-function 'lodash.\*' packages
- Updated dependencies

## 3.1.0

### Minor Changes

- [#3428](https://bitbucket.org/atlassian/atlassian-frontend/pull-requests/3428) [`90a0d166b3`](https://bitbucket.org/atlassian/atlassian-frontend/commits/90a0d166b3) - fix: pass the correct path to resolve the conflict with http
- [`372494e25b`](https://bitbucket.org/atlassian/atlassian-frontend/commits/372494e25b) - add path to collab provider

### Patch Changes

- Updated dependencies

## 3.0.0

### Major Changes

- [#3335](https://bitbucket.org/atlassian/atlassian-frontend/pull-requests/3335) [`87f4720f27`](https://bitbucket.org/atlassian/atlassian-frontend/commits/87f4720f27) - Officially dropping IE11 support, from this version onwards there are no warranties of the package working in IE11.
  For more information see: https://community.developer.atlassian.com/t/atlaskit-to-drop-support-for-internet-explorer-11-from-1st-july-2020/39534

### Patch Changes

- Updated dependencies

## 2.0.0

### Major Changes

- [#2763](https://bitbucket.org/atlassian/atlassian-frontend/pull-requests/2763) [`3eb98cd820`](https://bitbucket.org/atlassian/atlassian-frontend/commits/3eb98cd820) - ED-9367 Add required config argument to `createSocket`

### Minor Changes

- [`f90d5a351e`](https://bitbucket.org/atlassian/atlassian-frontend/commits/f90d5a351e) - ED-9367 Create entry point with a collab provider factory pre-configured with SocketIO
- [`f80f07b072`](https://bitbucket.org/atlassian/atlassian-frontend/commits/f80f07b072) - ED-9451 Support lifecycle emitter on configuration
- [`8814c0a119`](https://bitbucket.org/atlassian/atlassian-frontend/commits/8814c0a119) - ED-9451 Support for custom storage interface

### Patch Changes

- Updated dependencies

## 1.0.2

### Patch Changes

- [#2443](https://bitbucket.org/atlassian/atlassian-frontend/pull-requests/2443) [`473504379b`](https://bitbucket.org/atlassian/atlassian-frontend/commits/473504379b) - ED-9367 Use collab entry point on editor-common
- [`0d43df75cb`](https://bitbucket.org/atlassian/atlassian-frontend/commits/0d43df75cb) - Add unit tests for channel.ts
- Updated dependencies

## 1.0.1

### Patch Changes

- [#1868](https://bitbucket.org/atlassian/atlassian-frontend/pull-requests/1868) [`56a7357c81`](https://bitbucket.org/atlassian/atlassian-frontend/commits/56a7357c81) - ED-9197: upgrade prosemirror-transform to prevent cut and paste type errors

  It's important to make sure that there isn't any `prosemirror-transform` packages with version less than 1.2.5 in `yarn.lock`.- Updated dependencies

## 1.0.0

### Major Changes

- [major][c0b8c92b2e](https://bitbucket.org/atlassian/atlassian-frontend/commits/c0b8c92b2e):

  catchup if behind the server

### Patch Changes

- Updated dependencies [c74cc954d8](https://bitbucket.org/atlassian/atlassian-frontend/commits/c74cc954d8):
- Updated dependencies [b4326a7eba](https://bitbucket.org/atlassian/atlassian-frontend/commits/b4326a7eba):
- Updated dependencies [e4076915c8](https://bitbucket.org/atlassian/atlassian-frontend/commits/e4076915c8):
- Updated dependencies [05539b052e](https://bitbucket.org/atlassian/atlassian-frontend/commits/05539b052e):
- Updated dependencies [205b05851a](https://bitbucket.org/atlassian/atlassian-frontend/commits/205b05851a):
- Updated dependencies [0b22d3b9ea](https://bitbucket.org/atlassian/atlassian-frontend/commits/0b22d3b9ea):
- Updated dependencies [b4ef7fe214](https://bitbucket.org/atlassian/atlassian-frontend/commits/b4ef7fe214):
- Updated dependencies [67bc25bc3f](https://bitbucket.org/atlassian/atlassian-frontend/commits/67bc25bc3f):
- Updated dependencies [6eb8c0799f](https://bitbucket.org/atlassian/atlassian-frontend/commits/6eb8c0799f):
  - @atlaskit/editor-common@45.0.0

## 0.1.1

### Patch Changes

- [patch][cf86087ae2](https://bitbucket.org/atlassian/atlassian-frontend/commits/cf86087ae2):

  ED-8751 Remove 'export \*' from collab-provider- [patch][4955ff3d36](https://bitbucket.org/atlassian/atlassian-frontend/commits/4955ff3d36):

  Minor package.json config compliance updates- Updated dependencies [bc29fbc030](https://bitbucket.org/atlassian/atlassian-frontend/commits/bc29fbc030):

- Updated dependencies [7d80e44c09](https://bitbucket.org/atlassian/atlassian-frontend/commits/7d80e44c09):
- Updated dependencies [d63888b5e5](https://bitbucket.org/atlassian/atlassian-frontend/commits/d63888b5e5):
- Updated dependencies [0a0a54cb47](https://bitbucket.org/atlassian/atlassian-frontend/commits/0a0a54cb47):
- Updated dependencies [fad8a16962](https://bitbucket.org/atlassian/atlassian-frontend/commits/fad8a16962):
- Updated dependencies [cc54ca2490](https://bitbucket.org/atlassian/atlassian-frontend/commits/cc54ca2490):
  - @atlaskit/editor-common@44.1.0

## 0.1.0

### Minor Changes

- [minor][bc380c30ce](https://bitbucket.org/atlassian/atlassian-frontend/commits/bc380c30ce):

  New collab provider

### Patch Changes

- Updated dependencies [bc380c30ce](https://bitbucket.org/atlassian/atlassian-frontend/commits/bc380c30ce):
- Updated dependencies [5bb23adac3](https://bitbucket.org/atlassian/atlassian-frontend/commits/5bb23adac3):
- Updated dependencies [025842de1a](https://bitbucket.org/atlassian/atlassian-frontend/commits/025842de1a):
- Updated dependencies [395739b5ef](https://bitbucket.org/atlassian/atlassian-frontend/commits/395739b5ef):
  - @atlaskit/editor-common@44.0.2
