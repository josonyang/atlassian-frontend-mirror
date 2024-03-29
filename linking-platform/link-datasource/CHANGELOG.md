# @atlaskit/link-datasource

## 1.19.4

### Patch Changes

- [#43869](https://bitbucket.org/atlassian/atlassian-frontend/pull-requests/43869) [`a46528b1133`](https://bitbucket.org/atlassian/atlassian-frontend/commits/a46528b1133) - Update jql searched and insert click analytics events with isQueryComplex attribute.

## 1.19.3

### Patch Changes

- [#43787](https://bitbucket.org/atlassian/atlassian-frontend/pull-requests/43787) [`a9738b4c894`](https://bitbucket.org/atlassian/atlassian-frontend/commits/a9738b4c894) - Logic to parse text value from JQL and pre-populate input box in basic mode.
- Updated dependencies

## 1.19.2

### Patch Changes

- [#43713](https://bitbucket.org/atlassian/atlassian-frontend/pull-requests/43713) [`2fa24eb9ab7`](https://bitbucket.org/atlassian/atlassian-frontend/commits/2fa24eb9ab7) - Update JQL generation logic to create query to search for all issues when only filter values are present.
- Updated dependencies

## 1.19.1

### Patch Changes

- [#43693](https://bitbucket.org/atlassian/atlassian-frontend/pull-requests/43693) [`01533fad7e6`](https://bitbucket.org/atlassian/atlassian-frontend/commits/01533fad7e6) - Add basic filter selection count to insert event.

## 1.19.0

### Minor Changes

- [#43353](https://bitbucket.org/atlassian/atlassian-frontend/pull-requests/43353) [`6f08647add6`](https://bitbucket.org/atlassian/atlassian-frontend/commits/6f08647add6) - [ux] Adds new UI in modal for case where user has no Jira instances connected to their account.

### Patch Changes

- [#43536](https://bitbucket.org/atlassian/atlassian-frontend/pull-requests/43536) [`a55b74ae54e`](https://bitbucket.org/atlassian/atlassian-frontend/commits/a55b74ae54e) - Basic filter selection state has been moved to the jira-search-container component. Basic filter select labels will now be hydrated on the initial opening of the modal, and on any following searches where the JQL is deemed to not be complex.
- Updated dependencies

## 1.18.1

### Patch Changes

- [#43497](https://bitbucket.org/atlassian/atlassian-frontend/pull-requests/43497) [`049969f8eb1`](https://bitbucket.org/atlassian/atlassian-frontend/commits/049969f8eb1) - Added error logging to the datasource try catches.
- Updated dependencies

## 1.18.0

### Minor Changes

- [#43374](https://bitbucket.org/atlassian/atlassian-frontend/pull-requests/43374) [`0d93cf12d25`](https://bitbucket.org/atlassian/atlassian-frontend/commits/0d93cf12d25) - Selecting and unselecting filters causes search to occur and datasource table to refresh

### Patch Changes

- [#43417](https://bitbucket.org/atlassian/atlassian-frontend/pull-requests/43417) [`3f3c17f0273`](https://bitbucket.org/atlassian/atlassian-frontend/commits/3f3c17f0273) - ED-20971 Upgrade adf-schema package to ^34.0.0

## 1.17.13

### Patch Changes

- [#43512](https://bitbucket.org/atlassian/atlassian-frontend/pull-requests/43512) [`b84de957bd4`](https://bitbucket.org/atlassian/atlassian-frontend/commits/b84de957bd4) - Add analytics event when basic filter dropdown show more button is clicked.

## 1.17.12

### Patch Changes

- [#43542](https://bitbucket.org/atlassian/atlassian-frontend/pull-requests/43542) [`35f5f821eb7`](https://bitbucket.org/atlassian/atlassian-frontend/commits/35f5f821eb7) - [ux] Updated Access Required message from 'site' to 'content' when a url is not provided

## 1.17.11

### Patch Changes

- [#43451](https://bitbucket.org/atlassian/atlassian-frontend/pull-requests/43451) [`50a08b74209`](https://bitbucket.org/atlassian/atlassian-frontend/commits/50a08b74209) - Add loading state for the basic filter trigger button
- Updated dependencies

## 1.17.10

### Patch Changes

- Updated dependencies

## 1.17.9

### Patch Changes

- [#43398](https://bitbucket.org/atlassian/atlassian-frontend/pull-requests/43398) [`a7af91aa3fb`](https://bitbucket.org/atlassian/atlassian-frontend/commits/a7af91aa3fb) - Add analytics event when basic filter dropdown menu is closed.

## 1.17.8

### Patch Changes

- [#43419](https://bitbucket.org/atlassian/atlassian-frontend/pull-requests/43419) [`27726a80705`](https://bitbucket.org/atlassian/atlassian-frontend/commits/27726a80705) - [ux] Updated borders and added grid lines in datasource tables.

## 1.17.7

### Patch Changes

- [#43413](https://bitbucket.org/atlassian/atlassian-frontend/pull-requests/43413) [`73c1cebfd62`](https://bitbucket.org/atlassian/atlassian-frontend/commits/73c1cebfd62) - Move all logic to onOpen when opening the filter dropdown.
- Updated dependencies

## 1.17.6

### Patch Changes

- [#43358](https://bitbucket.org/atlassian/atlassian-frontend/pull-requests/43358) [`d275736284c`](https://bitbucket.org/atlassian/atlassian-frontend/commits/d275736284c) - Add analytics event when basic filter dropdown menu is opened.
- [#43379](https://bitbucket.org/atlassian/atlassian-frontend/pull-requests/43379) [`482c025520d`](https://bitbucket.org/atlassian/atlassian-frontend/commits/482c025520d) - ED-20763 Upgrade ADF schema version to 33.2.3 for MBE nodes.

## 1.17.5

### Patch Changes

- [#43340](https://bitbucket.org/atlassian/atlassian-frontend/pull-requests/43340) [`bb87fcf2e29`](https://bitbucket.org/atlassian/atlassian-frontend/commits/bb87fcf2e29) - Introduce new hook `useHydrateJqlQuery` that returns the JQL hydration state for each basic filter
- Updated dependencies

## 1.17.4

### Patch Changes

- [#43259](https://bitbucket.org/atlassian/atlassian-frontend/pull-requests/43259) [`daddf8f775a`](https://bitbucket.org/atlassian/atlassian-frontend/commits/daddf8f775a) - Fixed scroll issue on selection and updated search input to have a max-width.

## 1.17.3

### Patch Changes

- [#43122](https://bitbucket.org/atlassian/atlassian-frontend/pull-requests/43122) [`5690dd4a0d3`](https://bitbucket.org/atlassian/atlassian-frontend/commits/5690dd4a0d3) - When no onColumnResize is defined OR when columnCustomSizes in readonly more use max-width instead of width

## 1.17.2

### Patch Changes

- [#43143](https://bitbucket.org/atlassian/atlassian-frontend/pull-requests/43143) [`de7541cc6ab`](https://bitbucket.org/atlassian/atlassian-frontend/commits/de7541cc6ab) - Reset filter selection when site selection changes and fixes a bug when selecting filter values.

## 1.17.1

### Patch Changes

- [#43132](https://bitbucket.org/atlassian/atlassian-frontend/pull-requests/43132) [`3e2792d125e`](https://bitbucket.org/atlassian/atlassian-frontend/commits/3e2792d125e) - added operational events for Assets Config Modal
- Updated dependencies

## 1.17.0

### Minor Changes

- [#43023](https://bitbucket.org/atlassian/atlassian-frontend/pull-requests/43023) [`312be02e858`](https://bitbucket.org/atlassian/atlassian-frontend/commits/312be02e858) - [ux] Basic filter dropdown button label now includes first selected item's name. If multiple items are selected then a badge now indicates the remaining number of items. Selected options are also reordered to the top of the select list.

### Patch Changes

- [#42504](https://bitbucket.org/atlassian/atlassian-frontend/pull-requests/42504) [`8ee7afb2d85`](https://bitbucket.org/atlassian/atlassian-frontend/commits/8ee7afb2d85) - Added DatasourceDataSchema model.
  Used fields in the request for applying schema.
- Updated dependencies

## 1.16.5

### Patch Changes

- [#43103](https://bitbucket.org/atlassian/atlassian-frontend/pull-requests/43103) [`effb3f0234c`](https://bitbucket.org/atlassian/atlassian-frontend/commits/effb3f0234c) - Add ui analytics event when error UI is displayed for basic filter search.

## 1.16.4

### Patch Changes

- [#43137](https://bitbucket.org/atlassian/atlassian-frontend/pull-requests/43137) [`4d201f9fe57`](https://bitbucket.org/atlassian/atlassian-frontend/commits/4d201f9fe57) - [ux] Updates spacing to ensure it is consistent between search input and mode switcher on toggle between JQL and Basic and when Basic Filters feature flag is on.

## 1.16.3

### Patch Changes

- [#43029](https://bitbucket.org/atlassian/atlassian-frontend/pull-requests/43029) [`e8fc17ac873`](https://bitbucket.org/atlassian/atlassian-frontend/commits/e8fc17ac873) - Add ui analytics event when empty results UI is displayed for basic filter search.
- Updated dependencies

## 1.16.2

### Patch Changes

- [#43034](https://bitbucket.org/atlassian/atlassian-frontend/pull-requests/43034) [`b191795744a`](https://bitbucket.org/atlassian/atlassian-frontend/commits/b191795744a) - [ux] Decreases spacing between search input and basic filters.

## 1.16.1

### Patch Changes

- [#42398](https://bitbucket.org/atlassian/atlassian-frontend/pull-requests/42398) [`55d91a074ea`](https://bitbucket.org/atlassian/atlassian-frontend/commits/55d91a074ea) - Update mocking for Assets Datasource Requests

## 1.16.0

### Minor Changes

- [#42962](https://bitbucket.org/atlassian/atlassian-frontend/pull-requests/42962) [`00b9a417c51`](https://bitbucket.org/atlassian/atlassian-frontend/commits/00b9a417c51) - Adds show more button to UI and functionality to fetch more data for datasource basic filters

## 1.15.4

### Patch Changes

- [#42840](https://bitbucket.org/atlassian/atlassian-frontend/pull-requests/42840) [`0358055bfaa`](https://bitbucket.org/atlassian/atlassian-frontend/commits/0358055bfaa) - [ux] Permission error states are now shown in the Assets Config Modal.

## 1.15.3

### Patch Changes

- [#42661](https://bitbucket.org/atlassian/atlassian-frontend/pull-requests/42661) [`c6abc68904d`](https://bitbucket.org/atlassian/atlassian-frontend/commits/c6abc68904d) - [ux] Fix date showing incorrectly and also update test data to check for the format it was failing for

## 1.15.2

### Patch Changes

- [#42738](https://bitbucket.org/atlassian/atlassian-frontend/pull-requests/42738) [`95e6223ddb8`](https://bitbucket.org/atlassian/atlassian-frontend/commits/95e6223ddb8) - Add macro inserted analytics event for jlol smart link insertions

## 1.15.1

### Patch Changes

- [#42936](https://bitbucket.org/atlassian/atlassian-frontend/pull-requests/42936) [`8aab8999a3d`](https://bitbucket.org/atlassian/atlassian-frontend/commits/8aab8999a3d) - Update error UI text.

## 1.15.0

### Minor Changes

- [#42867](https://bitbucket.org/atlassian/atlassian-frontend/pull-requests/42867) [`39f66ca6aec`](https://bitbucket.org/atlassian/atlassian-frontend/commits/39f66ca6aec) - Add error state UI to basic filter dropdown.

## 1.14.1

### Patch Changes

- [#42835](https://bitbucket.org/atlassian/atlassian-frontend/pull-requests/42835) [`685b3b60d34`](https://bitbucket.org/atlassian/atlassian-frontend/commits/685b3b60d34) - Add empty state UI for basic filter dropdown.

## 1.14.0

### Minor Changes

- [#42756](https://bitbucket.org/atlassian/atlassian-frontend/pull-requests/42756) [`89ed621ec92`](https://bitbucket.org/atlassian/atlassian-frontend/commits/89ed621ec92) - Add loading message UI for basic filter dropdown

### Patch Changes

- Updated dependencies

## 1.13.2

### Patch Changes

- [#42785](https://bitbucket.org/atlassian/atlassian-frontend/pull-requests/42785) [`63e0adac24f`](https://bitbucket.org/atlassian/atlassian-frontend/commits/63e0adac24f) - Fix AGG base URL

## 1.13.1

### Patch Changes

- [#42684](https://bitbucket.org/atlassian/atlassian-frontend/pull-requests/42684) [`3752d98e7fd`](https://bitbucket.org/atlassian/atlassian-frontend/commits/3752d98e7fd) - Add search functionality to basic filter dropdowns.

## 1.13.0

### Minor Changes

- [#42523](https://bitbucket.org/atlassian/atlassian-frontend/pull-requests/42523) [`8cf0628d658`](https://bitbucket.org/atlassian/atlassian-frontend/commits/8cf0628d658) - Add logic to disable switching to Basic mode when the query is complex

## 1.12.4

### Patch Changes

- [#42612](https://bitbucket.org/atlassian/atlassian-frontend/pull-requests/42612) [`eb39b74b03b`](https://bitbucket.org/atlassian/atlassian-frontend/commits/eb39b74b03b) - Adds hook to get field values from graphQL for basic filters.
- [#42598](https://bitbucket.org/atlassian/atlassian-frontend/pull-requests/42598) [`6105d017042`](https://bitbucket.org/atlassian/atlassian-frontend/commits/6105d017042) - [ux] Updated styles of the table header.

## 1.12.3

### Patch Changes

- [#42706](https://bitbucket.org/atlassian/atlassian-frontend/pull-requests/42706) [`c3c9a5ec9c9`](https://bitbucket.org/atlassian/atlassian-frontend/commits/c3c9a5ec9c9) - Fix a problem where when column dragging start on top of a label - it drags whole table

## 1.12.2

### Patch Changes

- [#42675](https://bitbucket.org/atlassian/atlassian-frontend/pull-requests/42675) [`bce00b9b36f`](https://bitbucket.org/atlassian/atlassian-frontend/commits/bce00b9b36f) - [ux] Updated Assets Config Modal to also show unauthorized state
  Updated useDatasourceTableState to return unauthorized state on 401 & 403 responses
- Updated dependencies

## 1.12.1

### Patch Changes

- Updated dependencies

## 1.12.0

### Minor Changes

- [#38725](https://bitbucket.org/atlassian/atlassian-frontend/pull-requests/38725) [`da6ee1eea9c`](https://bitbucket.org/atlassian/atlassian-frontend/commits/da6ee1eea9c) - [ux] `JiraIssuesConfigModal` now has new optional prop `columnCustomSizes` which is an object with keys representing column key and value being a width of that column.
  `DatasourceTableView` now has two new props: `columnCustomSizes` with same type and `onColumnResize` callback of shape `(key: string, width: number) => void;` that will be called
  every time customer resizing a column.

### Patch Changes

- [#42539](https://bitbucket.org/atlassian/atlassian-frontend/pull-requests/42539) [`581b3f7a822`](https://bitbucket.org/atlassian/atlassian-frontend/commits/581b3f7a822) - [ux] Assets Config Modal now allows users to search again when datasource is 'rejected'
- [#42383](https://bitbucket.org/atlassian/atlassian-frontend/pull-requests/42383) [`624c5e73c9d`](https://bitbucket.org/atlassian/atlassian-frontend/commits/624c5e73c9d) - Add transformers for mapping the AGG response for field values and hydrated JQL values to arrays of SelectOption for use within basic filters. Add new types defining each potential lozenge appearance and their mappings to status category colors.
- Updated dependencies

## 1.11.1

### Patch Changes

- [#42377](https://bitbucket.org/atlassian/atlassian-frontend/pull-requests/42377) [`c1c8a308bd5`](https://bitbucket.org/atlassian/atlassian-frontend/commits/c1c8a308bd5) - Add support for basic filter in JQL generation

## 1.11.0

### Minor Changes

- [#42245](https://bitbucket.org/atlassian/atlassian-frontend/pull-requests/42245) [`7b328d1b1b2`](https://bitbucket.org/atlassian/atlassian-frontend/commits/7b328d1b1b2) - Added Datasource Analytics and UFO metrics to Assets Config Modal.
  Added additional analyticsEvent param to onInsert of AssetsConfigModal.

## 1.10.3

### Patch Changes

- [#42390](https://bitbucket.org/atlassian/atlassian-frontend/pull-requests/42390) [`d1aa333bfce`](https://bitbucket.org/atlassian/atlassian-frontend/commits/d1aa333bfce) - [ux] Enabled count view smart link preview in jira config modal to open in new tab on click

## 1.10.2

### Patch Changes

- Updated dependencies

## 1.10.1

### Patch Changes

- [#42063](https://bitbucket.org/atlassian/atlassian-frontend/pull-requests/42063) [`74fd796c7c7`](https://bitbucket.org/atlassian/atlassian-frontend/commits/74fd796c7c7) - Internationalisation for Assets LOL

## 1.10.0

### Minor Changes

- [#41851](https://bitbucket.org/atlassian/atlassian-frontend/pull-requests/41851) [`3db4d0fcf3e`](https://bitbucket.org/atlassian/atlassian-frontend/commits/3db4d0fcf3e) - Add Basic filter component to jira issue modal.

## 1.9.1

### Patch Changes

- [#41877](https://bitbucket.org/atlassian/atlassian-frontend/pull-requests/41877) [`dabace22e02`](https://bitbucket.org/atlassian/atlassian-frontend/commits/dabace22e02) - [ux] Add validation error message when validating AQL string

## 1.9.0

### Minor Changes

- [#41407](https://bitbucket.org/atlassian/atlassian-frontend/pull-requests/41407) [`2e336273b6e`](https://bitbucket.org/atlassian/atlassian-frontend/commits/2e336273b6e) - [ux] Added an optional url prop for JiraConfigModal

## 1.8.0

### Minor Changes

- [#41368](https://bitbucket.org/atlassian/atlassian-frontend/pull-requests/41368) [`1daa2514bcc`](https://bitbucket.org/atlassian/atlassian-frontend/commits/1daa2514bcc) - [ux] Updates empty state and loading row skeletons to prevent visual jumps once data loads.

## 1.7.6

### Patch Changes

- [#41377](https://bitbucket.org/atlassian/atlassian-frontend/pull-requests/41377) [`6191c789222`](https://bitbucket.org/atlassian/atlassian-frontend/commits/6191c789222) - Fix bug where on next page load sorts the column in alphabetical order.

## 1.7.5

### Patch Changes

- [#40232](https://bitbucket.org/atlassian/atlassian-frontend/pull-requests/40232) [`b8c29cec088`](https://bitbucket.org/atlassian/atlassian-frontend/commits/b8c29cec088) - [ux] Make JQL mode to be selected by default

## 1.7.4

### Patch Changes

- [#41481](https://bitbucket.org/atlassian/atlassian-frontend/pull-requests/41481) [`5b8e224d195`](https://bitbucket.org/atlassian/atlassian-frontend/commits/5b8e224d195) - [ux] Adds tooltip to column picker
- Updated dependencies

## 1.7.3

### Patch Changes

- [#41405](https://bitbucket.org/atlassian/atlassian-frontend/pull-requests/41405) [`6619f042a24`](https://bitbucket.org/atlassian/atlassian-frontend/commits/6619f042a24) - [ux] Fix issue where any inline/block/embeds don't open up datasource modal with proper info
- Updated dependencies

## 1.7.2

### Patch Changes

- Updated dependencies

## 1.7.1

### Patch Changes

- [#40897](https://bitbucket.org/atlassian/atlassian-frontend/pull-requests/40897) [`04a55cb2bec`](https://bitbucket.org/atlassian/atlassian-frontend/commits/04a55cb2bec) - Preventing refetch if newly selected columns already have data

## 1.7.0

### Minor Changes

- [#40745](https://bitbucket.org/atlassian/atlassian-frontend/pull-requests/40745) [`f1fb082c389`](https://bitbucket.org/atlassian/atlassian-frontend/commits/f1fb082c389) - DatasourceRenderFailedAnalyticsWrapper is now being exported as lazy loaded component

## 1.6.3

### Patch Changes

- [#41133](https://bitbucket.org/atlassian/atlassian-frontend/pull-requests/41133) [`598eb394b7e`](https://bitbucket.org/atlassian/atlassian-frontend/commits/598eb394b7e) - [ux] fix the order of columns is incorrect in column picker problem
  [ux] Do not reorder columns when the column picker is open

## 1.6.2

### Patch Changes

- [#40759](https://bitbucket.org/atlassian/atlassian-frontend/pull-requests/40759) [`2e42297cee1`](https://bitbucket.org/atlassian/atlassian-frontend/commits/2e42297cee1) - Reset default visible column keys when `shouldResetColumns` is `true`

## 1.6.1

### Patch Changes

- [#40923](https://bitbucket.org/atlassian/atlassian-frontend/pull-requests/40923) [`1eaceeae0b0`](https://bitbucket.org/atlassian/atlassian-frontend/commits/1eaceeae0b0) - Use jql-ast to build jql

## 1.6.0

### Minor Changes

- [#40917](https://bitbucket.org/atlassian/atlassian-frontend/pull-requests/40917) [`dc555a1aceb`](https://bitbucket.org/atlassian/atlassian-frontend/commits/dc555a1aceb) - [ux] Persisted column picker during loading states

## 1.5.3

### Patch Changes

- [#40935](https://bitbucket.org/atlassian/atlassian-frontend/pull-requests/40935) [`05b395f72c6`](https://bitbucket.org/atlassian/atlassian-frontend/commits/05b395f72c6) - Minor styling update for header padding and table border-radius

## 1.5.2

### Patch Changes

- [#40773](https://bitbucket.org/atlassian/atlassian-frontend/pull-requests/40773) [`25db8b103c7`](https://bitbucket.org/atlassian/atlassian-frontend/commits/25db8b103c7) - [ux] Adding alphabetical sorting to site selector

## 1.5.1

### Patch Changes

- Updated dependencies

## 1.5.0

### Minor Changes

- [#40840](https://bitbucket.org/atlassian/atlassian-frontend/pull-requests/40840) [`66c9f6469c5`](https://bitbucket.org/atlassian/atlassian-frontend/commits/66c9f6469c5) - [ux] Wrap link values in smart link hover card component

## 1.4.5

### Patch Changes

- [#40880](https://bitbucket.org/atlassian/atlassian-frontend/pull-requests/40880) [`89dd0f4ea1a`](https://bitbucket.org/atlassian/atlassian-frontend/commits/89dd0f4ea1a) - Added boilterplate for basic filters

## 1.4.4

### Patch Changes

- [#39749](https://bitbucket.org/atlassian/atlassian-frontend/pull-requests/39749) [`e6b69f455c3`](https://bitbucket.org/atlassian/atlassian-frontend/commits/e6b69f455c3) - Connect yarn changeset to packages, upgrade adf-schema

## 1.4.3

### Patch Changes

- [#40786](https://bitbucket.org/atlassian/atlassian-frontend/pull-requests/40786) [`e9557ab2ce4`](https://bitbucket.org/atlassian/atlassian-frontend/commits/e9557ab2ce4) - Adding an empty basic filter container under platform.linking-platform.datasource.show-jlol-basic-filters feature flag

## 1.4.2

### Patch Changes

- [#40743](https://bitbucket.org/atlassian/atlassian-frontend/pull-requests/40743) [`a0c3be1b27f`](https://bitbucket.org/atlassian/atlassian-frontend/commits/a0c3be1b27f) - [ux] Enabled datasource insert from jira config modal with no issues result

## 1.4.1

### Patch Changes

- [#40399](https://bitbucket.org/atlassian/atlassian-frontend/pull-requests/40399) [`c8a7c9e33a8`](https://bitbucket.org/atlassian/atlassian-frontend/commits/c8a7c9e33a8) - [ux] Fixed columns not updating on reinsertion with new columns

## 1.4.0

### Minor Changes

- [#40478](https://bitbucket.org/atlassian/atlassian-frontend/pull-requests/40478) [`b2a9540c8d8`](https://bitbucket.org/atlassian/atlassian-frontend/commits/b2a9540c8d8) - Export a new DatasourceRenderFailedAnalyticsWrapper - a component that can be consumed to emit 'ui.datasource.renderFailed' events when an inserted datasource fails to render

## 1.3.1

### Patch Changes

- [#40491](https://bitbucket.org/atlassian/atlassian-frontend/pull-requests/40491) [`1fedffbd64b`](https://bitbucket.org/atlassian/atlassian-frontend/commits/1fedffbd64b) - Update json-ld-types dependencies to be compatible with version

## 1.3.0

### Minor Changes

- [#40408](https://bitbucket.org/atlassian/atlassian-frontend/pull-requests/40408) [`e4721cc5a3f`](https://bitbucket.org/atlassian/atlassian-frontend/commits/e4721cc5a3f) - Make issue count clickable

## 1.2.6

### Patch Changes

- [#40284](https://bitbucket.org/atlassian/atlassian-frontend/pull-requests/40284) [`1017511dadf`](https://bitbucket.org/atlassian/atlassian-frontend/commits/1017511dadf) - [ux] Prevent search with invalid input

## 1.2.5

### Patch Changes

- [#40458](https://bitbucket.org/atlassian/atlassian-frontend/pull-requests/40458) [`eadf1b04163`](https://bitbucket.org/atlassian/atlassian-frontend/commits/eadf1b04163) - [ux] Fixed copy on modal

## 1.2.4

### Patch Changes

- [#40235](https://bitbucket.org/atlassian/atlassian-frontend/pull-requests/40235) [`172f52c6df8`](https://bitbucket.org/atlassian/atlassian-frontend/commits/172f52c6df8) - Add UFO metrics to measure column picker performance

## 1.2.3

### Patch Changes

- [#40219](https://bitbucket.org/atlassian/atlassian-frontend/pull-requests/40219) [`de4dddb97d4`](https://bitbucket.org/atlassian/atlassian-frontend/commits/de4dddb97d4) - Added 'ui.datasource.renderSuccess' event with display = 'table'

## 1.2.2

### Patch Changes

- [#40107](https://bitbucket.org/atlassian/atlassian-frontend/pull-requests/40107) [`ce3de76af77`](https://bitbucket.org/atlassian/atlassian-frontend/commits/ce3de76af77) - Added ui.table.viewed event
- Updated dependencies

## 1.2.1

### Patch Changes

- [#39912](https://bitbucket.org/atlassian/atlassian-frontend/pull-requests/39912) [`103618b094f`](https://bitbucket.org/atlassian/atlassian-frontend/commits/103618b094f) - Add UFO metrics to measure datasource rendering performance.
- Updated dependencies

## 1.2.0

### Minor Changes

- [#40187](https://bitbucket.org/atlassian/atlassian-frontend/pull-requests/40187) [`bab3ac9e64e`](https://bitbucket.org/atlassian/atlassian-frontend/commits/bab3ac9e64e) - Passing analytic events with attributes from link-datasource modal to editor.

## 1.1.7

### Patch Changes

- [#40127](https://bitbucket.org/atlassian/atlassian-frontend/pull-requests/40127) [`2cd7af71b63`](https://bitbucket.org/atlassian/atlassian-frontend/commits/2cd7af71b63) - Bump json-ld-types 3.8.0 -> 3.9.1

## 1.1.6

### Patch Changes

- [#39265](https://bitbucket.org/atlassian/atlassian-frontend/pull-requests/39265) [`8b8a309cb62`](https://bitbucket.org/atlassian/atlassian-frontend/commits/8b8a309cb62) - Making use of exported default page size from link-client-extensions
- Updated dependencies

## 1.1.5

### Patch Changes

- [#40063](https://bitbucket.org/atlassian/atlassian-frontend/pull-requests/40063) [`cd31900dba6`](https://bitbucket.org/atlassian/atlassian-frontend/commits/cd31900dba6) - [ux] Renaming 'issues' to 'items' to be more generic

## 1.1.4

### Patch Changes

- [#39504](https://bitbucket.org/atlassian/atlassian-frontend/pull-requests/39504) [`067fe62a1dc`](https://bitbucket.org/atlassian/atlassian-frontend/commits/067fe62a1dc) - [ux] Updated logic for site selector to default to current site

## 1.1.3

### Patch Changes

- [#39923](https://bitbucket.org/atlassian/atlassian-frontend/pull-requests/39923) [`96c9b7127b1`](https://bitbucket.org/atlassian/atlassian-frontend/commits/96c9b7127b1) - Do not load more then 200 fields in dropdown, instead show message explaining limitation and how to move forward

## 1.1.2

### Patch Changes

- [#39525](https://bitbucket.org/atlassian/atlassian-frontend/pull-requests/39525) [`2378739fad6`](https://bitbucket.org/atlassian/atlassian-frontend/commits/2378739fad6) - Added link-datasource link viewed ui analytics events

## 1.1.1

### Patch Changes

- Updated dependencies

## 1.1.0

### Minor Changes

- [#39926](https://bitbucket.org/atlassian/atlassian-frontend/pull-requests/39926) [`3f30d999d86`](https://bitbucket.org/atlassian/atlassian-frontend/commits/3f30d999d86) - Updating VR tests and helpers that use external resources to local ones for Gemini migration

## 1.0.21

### Patch Changes

- [#39787](https://bitbucket.org/atlassian/atlassian-frontend/pull-requests/39787) [`6900f89eb0e`](https://bitbucket.org/atlassian/atlassian-frontend/commits/6900f89eb0e) - Internal changes to use space tokens. There is no expected visual or behaviour change.
- Updated dependencies

## 1.0.20

### Patch Changes

- [#39481](https://bitbucket.org/atlassian/atlassian-frontend/pull-requests/39481) [`aeb5c9a01e8`](https://bitbucket.org/atlassian/atlassian-frontend/commits/aeb5c9a01e8) - Delete adf-schema from AFE and rely on npm package for adf-schema
- [`4b4dcfe0bba`](https://bitbucket.org/atlassian/atlassian-frontend/commits/4b4dcfe0bba) - Delete adf-schema, use published version

## 1.0.19

### Patch Changes

- [#39879](https://bitbucket.org/atlassian/atlassian-frontend/pull-requests/39879) [`dffd59c5534`](https://bitbucket.org/atlassian/atlassian-frontend/commits/dffd59c5534) - [ux] The initial Jira datasource modal now renders a search icon with a helpful prompt

## 1.0.18

### Patch Changes

- [#39682](https://bitbucket.org/atlassian/atlassian-frontend/pull-requests/39682) [`e682c758801`](https://bitbucket.org/atlassian/atlassian-frontend/commits/e682c758801) - Added button clicked (cancel) and button clicked (insert) UI events

## 1.0.17

### Patch Changes

- [#39460](https://bitbucket.org/atlassian/atlassian-frontend/pull-requests/39460) [`882e4e88358`](https://bitbucket.org/atlassian/atlassian-frontend/commits/882e4e88358) - Add playwright tests and add test ids to find elements
- Updated dependencies

## 1.0.16

### Patch Changes

- [#39465](https://bitbucket.org/atlassian/atlassian-frontend/pull-requests/39465) [`7b3f96b38f9`](https://bitbucket.org/atlassian/atlassian-frontend/commits/7b3f96b38f9) - Added nextItem loaded analytics event
- [#39397](https://bitbucket.org/atlassian/atlassian-frontend/pull-requests/39397) [`ecf7019c632`](https://bitbucket.org/atlassian/atlassian-frontend/commits/ecf7019c632) - Added analytics mapper to populate searchMethod analytic attribute, but it is not exposed to consumers yet.

## 1.0.15

### Patch Changes

- [#39409](https://bitbucket.org/atlassian/atlassian-frontend/pull-requests/39409) [`50617191678`](https://bitbucket.org/atlassian/atlassian-frontend/commits/50617191678) - Added button clicked (sync) event into datasources

## 1.0.14

### Patch Changes

- [#39387](https://bitbucket.org/atlassian/atlassian-frontend/pull-requests/39387) [`d2172ba6e25`](https://bitbucket.org/atlassian/atlassian-frontend/commits/d2172ba6e25) - Updated analytics spec with ui events for datasources

## 1.0.13

### Patch Changes

- [#39314](https://bitbucket.org/atlassian/atlassian-frontend/pull-requests/39314) [`46b2cb60ad0`](https://bitbucket.org/atlassian/atlassian-frontend/commits/46b2cb60ad0) - Delete editor prosemirror from AFE Repo
- Updated dependencies

## 1.0.12

### Patch Changes

- [#39245](https://bitbucket.org/atlassian/atlassian-frontend/pull-requests/39245) [`1c2a3601900`](https://bitbucket.org/atlassian/atlassian-frontend/commits/1c2a3601900) - Add analytics context to AssetsConfigModal
- Updated dependencies

## 1.0.11

### Patch Changes

- Updated dependencies

## 1.0.10

### Patch Changes

- [#38878](https://bitbucket.org/atlassian/atlassian-frontend/pull-requests/38878) [`4994b59823e`](https://bitbucket.org/atlassian/atlassian-frontend/commits/4994b59823e) - [ux] Fix assets modal columns to reset when changing schema

## 1.0.9

### Patch Changes

- [#39137](https://bitbucket.org/atlassian/atlassian-frontend/pull-requests/39137) [`ee9ef928b39`](https://bitbucket.org/atlassian/atlassian-frontend/commits/ee9ef928b39) - [ux] Link render types will now render on a new line

## 1.0.8

### Patch Changes

- [#39134](https://bitbucket.org/atlassian/atlassian-frontend/pull-requests/39134) [`f3420d5b890`](https://bitbucket.org/atlassian/atlassian-frontend/commits/f3420d5b890) - fix flaky VR tests for assets modal

## 1.0.7

### Patch Changes

- Updated dependencies

## 1.0.6

### Patch Changes

- [#38951](https://bitbucket.org/atlassian/atlassian-frontend/pull-requests/38951) [`b1c75396ac8`](https://bitbucket.org/atlassian/atlassian-frontend/commits/b1c75396ac8) - [ux] Cursor will not appear as grab when read only

## 1.0.5

### Patch Changes

- [#38976](https://bitbucket.org/atlassian/atlassian-frontend/pull-requests/38976) [`33cb07de05f`](https://bitbucket.org/atlassian/atlassian-frontend/commits/33cb07de05f) - change adf-schema to fixed versioning

## 1.0.4

### Patch Changes

- [#38967](https://bitbucket.org/atlassian/atlassian-frontend/pull-requests/38967) [`ea1fef58561`](https://bitbucket.org/atlassian/atlassian-frontend/commits/ea1fef58561) - [ux] Fixes to column styling and other minor formatting issues

## 1.0.3

### Patch Changes

- [#38844](https://bitbucket.org/atlassian/atlassian-frontend/pull-requests/38844) [`513a4e98543`](https://bitbucket.org/atlassian/atlassian-frontend/commits/513a4e98543) - [ux] links will now fallback to rendering as an anchor if smart-card fails to resolve

## 1.0.2

### Patch Changes

- [#38659](https://bitbucket.org/atlassian/atlassian-frontend/pull-requests/38659) [`bfa189b840a`](https://bitbucket.org/atlassian/atlassian-frontend/commits/bfa189b840a) - [ux] String render types will now render each string on a new line

## 1.0.1

### Patch Changes

- [#38912](https://bitbucket.org/atlassian/atlassian-frontend/pull-requests/38912) [`801e874de87`](https://bitbucket.org/atlassian/atlassian-frontend/commits/801e874de87) - Migrate `jql-editor-common` and `jql-editor-autocomplete-rest` packages to the `@atlaskit` namespace. Any consumers should update their imports to `@atlaskit/jql-editor-common` and `@atlaskit/jql-editor-autocomplete-rest`.
- Updated dependencies

## 1.0.0

### Major Changes

- [#38899](https://bitbucket.org/atlassian/atlassian-frontend/pull-requests/38899) [`c8ad3f81d9c`](https://bitbucket.org/atlassian/atlassian-frontend/commits/c8ad3f81d9c) - Releasing first major version. Nothing has changes since last version.

## 0.34.8

### Patch Changes

- [#38722](https://bitbucket.org/atlassian/atlassian-frontend/pull-requests/38722) [`3f3b63589a1`](https://bitbucket.org/atlassian/atlassian-frontend/commits/3f3b63589a1) - Fix issue where icon sizing is inconsitent. Also added some icons that are larger and were causing problems in prod to the mock data so we can have some examples on hand.

## 0.34.7

### Patch Changes

- [#38162](https://bitbucket.org/atlassian/atlassian-frontend/pull-requests/38162) [`fd6bb9c9184`](https://bitbucket.org/atlassian/atlassian-frontend/commits/fd6bb9c9184) - Delete version.json
- Updated dependencies

## 0.34.6

### Patch Changes

- [#38795](https://bitbucket.org/atlassian/atlassian-frontend/pull-requests/38795) [`d018119646e`](https://bitbucket.org/atlassian/atlassian-frontend/commits/d018119646e) - [ux] Added classname to datasource table for disabling of comments in confluence

## 0.34.5

### Patch Changes

- Updated dependencies

## 0.34.4

### Patch Changes

- [#38587](https://bitbucket.org/atlassian/atlassian-frontend/pull-requests/38587) [`0fb7c3220b9`](https://bitbucket.org/atlassian/atlassian-frontend/commits/0fb7c3220b9) - Fix issue where link doesn't open in new tab

## 0.34.3

### Patch Changes

- [#38650](https://bitbucket.org/atlassian/atlassian-frontend/pull-requests/38650) [`f93b91224c7`](https://bitbucket.org/atlassian/atlassian-frontend/commits/f93b91224c7) - [ux] Refocused column search after initial load

## 0.34.2

### Patch Changes

- [#38213](https://bitbucket.org/atlassian/atlassian-frontend/pull-requests/38213) [`4929f0c37cc`](https://bitbucket.org/atlassian/atlassian-frontend/commits/4929f0c37cc) - [ux] Update empty state in assets modal with link
- Updated dependencies

## 0.34.1

### Patch Changes

- [#38584](https://bitbucket.org/atlassian/atlassian-frontend/pull-requests/38584) [`0260eb48f1a`](https://bitbucket.org/atlassian/atlassian-frontend/commits/0260eb48f1a) - [ux] Skip column schema apply if no results on initial query

## 0.34.0

### Minor Changes

- [#37784](https://bitbucket.org/atlassian/atlassian-frontend/pull-requests/37784) [`02ac9829cf8`](https://bitbucket.org/atlassian/atlassian-frontend/commits/02ac9829cf8) - [ux] Added support for richtext.

## 0.33.12

### Patch Changes

- [#38557](https://bitbucket.org/atlassian/atlassian-frontend/pull-requests/38557) [`0aadfa0dc26`](https://bitbucket.org/atlassian/atlassian-frontend/commits/0aadfa0dc26) - Fix double loading inside table view

## 0.33.11

### Patch Changes

- [#38437](https://bitbucket.org/atlassian/atlassian-frontend/pull-requests/38437) [`d6c7bae4615`](https://bitbucket.org/atlassian/atlassian-frontend/commits/d6c7bae4615) - [ux] Insert button correctly displays without plural for single object

## 0.33.10

### Patch Changes

- Updated dependencies

## 0.33.9

### Patch Changes

- [#38546](https://bitbucket.org/atlassian/atlassian-frontend/pull-requests/38546) [`bb7599728b7`](https://bitbucket.org/atlassian/atlassian-frontend/commits/bb7599728b7) - [ux] Disable assets modal search button while AQL is invalid

## 0.33.8

### Patch Changes

- Updated dependencies

## 0.33.7

### Patch Changes

- [#37925](https://bitbucket.org/atlassian/atlassian-frontend/pull-requests/37925) [`f01deb5e6ab`](https://bitbucket.org/atlassian/atlassian-frontend/commits/f01deb5e6ab) - Use injected env vars instead of version.json

## 0.33.6

### Patch Changes

- Updated dependencies

## 0.33.5

### Patch Changes

- [#38306](https://bitbucket.org/atlassian/atlassian-frontend/pull-requests/38306) [`c3646d11ef0`](https://bitbucket.org/atlassian/atlassian-frontend/commits/c3646d11ef0) - [ux] Updates width of datasource modals

## 0.33.4

### Patch Changes

- [#38189](https://bitbucket.org/atlassian/atlassian-frontend/pull-requests/38189) [`8e94b911608`](https://bitbucket.org/atlassian/atlassian-frontend/commits/8e94b911608) - Use caching mechanism of `useDatasourceClientExtension` hook. Force actual request in cases like search button or refresh button
- Updated dependencies

## 0.33.3

### Patch Changes

- [#38120](https://bitbucket.org/atlassian/atlassian-frontend/pull-requests/38120) [`60170e1d0cd`](https://bitbucket.org/atlassian/atlassian-frontend/commits/60170e1d0cd) - Fixes to table view header: Remove drag handles, add tooltip, fix padding in editor context

## 0.33.2

### Patch Changes

- [#38052](https://bitbucket.org/atlassian/atlassian-frontend/pull-requests/38052) [`7e77ad40512`](https://bitbucket.org/atlassian/atlassian-frontend/commits/7e77ad40512) - [ux] Add question mark to search field with link to aql docs

## 0.33.1

### Patch Changes

- [#38060](https://bitbucket.org/atlassian/atlassian-frontend/pull-requests/38060) [`3c77a5b1377`](https://bitbucket.org/atlassian/atlassian-frontend/commits/3c77a5b1377) - Change behaviour of Assets Config Modal schema select to fetch on mount

## 0.33.0

### Minor Changes

- [#38019](https://bitbucket.org/atlassian/atlassian-frontend/pull-requests/38019) [`6ee82691c4e`](https://bitbucket.org/atlassian/atlassian-frontend/commits/6ee82691c4e) - [ux] Changed shimmer on empty state view to only occur when loading data initially

## 0.32.0

### Minor Changes

- [#37584](https://bitbucket.org/atlassian/atlassian-frontend/pull-requests/37584) [`bfe11404834`](https://bitbucket.org/atlassian/atlassian-frontend/commits/bfe11404834) - Adds Analytics support for datasource.

## 0.31.3

### Patch Changes

- [#37505](https://bitbucket.org/atlassian/atlassian-frontend/pull-requests/37505) [`02d1ab1d57d`](https://bitbucket.org/atlassian/atlassian-frontend/commits/02d1ab1d57d) - Improve DnD Experience in Datasource Table view

## 0.31.2

### Patch Changes

- [#37880](https://bitbucket.org/atlassian/atlassian-frontend/pull-requests/37880) [`ab5b543f761`](https://bitbucket.org/atlassian/atlassian-frontend/commits/ab5b543f761) - Assets List of Links send actual workspaceId to fetch data on insert

## 0.31.1

### Patch Changes

- [#37835](https://bitbucket.org/atlassian/atlassian-frontend/pull-requests/37835) [`ac9d6f74970`](https://bitbucket.org/atlassian/atlassian-frontend/commits/ac9d6f74970) - List of Links Assets Modal uses workspaceId instead of cloudId

## 0.31.0

### Minor Changes

- [#37245](https://bitbucket.org/atlassian/atlassian-frontend/pull-requests/37245) [`220d407e10c`](https://bitbucket.org/atlassian/atlassian-frontend/commits/220d407e10c) - [ux] Update empty state skeleton UI and add empty state to datasourceTableView

### Patch Changes

- Updated dependencies

## 0.30.3

### Patch Changes

- [#37788](https://bitbucket.org/atlassian/atlassian-frontend/pull-requests/37788) [`d046b840b27`](https://bitbucket.org/atlassian/atlassian-frontend/commits/d046b840b27) - fix typo in initialStateViewMessages.learnMoreLink

## 0.30.2

### Patch Changes

- [#37720](https://bitbucket.org/atlassian/atlassian-frontend/pull-requests/37720) [`e74ae7f06d4`](https://bitbucket.org/atlassian/atlassian-frontend/commits/e74ae7f06d4) - Update dependency json-ld-types@3.8.0

## 0.30.1

### Patch Changes

- Updated dependencies

## 0.30.0

### Minor Changes

- [#37546](https://bitbucket.org/atlassian/atlassian-frontend/pull-requests/37546) [`d8d641d500b`](https://bitbucket.org/atlassian/atlassian-frontend/commits/d8d641d500b) - [ux] Add issueLikeDataTableView in assets modal

## 0.29.5

### Patch Changes

- [#37409](https://bitbucket.org/atlassian/atlassian-frontend/pull-requests/37409) [`2cb283138ce`](https://bitbucket.org/atlassian/atlassian-frontend/commits/2cb283138ce) - Added Search Functionality to Assets Config Modal and added endpoints for Assets fetch mocks
- Updated dependencies

## 0.29.4

### Patch Changes

- [#37357](https://bitbucket.org/atlassian/atlassian-frontend/pull-requests/37357) [`21822300038`](https://bitbucket.org/atlassian/atlassian-frontend/commits/21822300038) - Export AssetsConfigModal component from this package

## 0.29.3

### Patch Changes

- [#37394](https://bitbucket.org/atlassian/atlassian-frontend/pull-requests/37394) [`3fb6a7558db`](https://bitbucket.org/atlassian/atlassian-frontend/commits/3fb6a7558db) - Updating internal dependency
- Updated dependencies

## 0.29.2

### Patch Changes

- [#37280](https://bitbucket.org/atlassian/atlassian-frontend/pull-requests/37280) [`2a91b8a2cb3`](https://bitbucket.org/atlassian/atlassian-frontend/commits/2a91b8a2cb3) - Update imports from `@atlaskit/pragmatic-drag-and-drop-react-indicator` to use the new `/box-without-terminal` entrypoint. There should be no other changes, the entrypoint has been renamed.
- Updated dependencies

## 0.29.1

### Patch Changes

- [#37163](https://bitbucket.org/atlassian/atlassian-frontend/pull-requests/37163) [`f10d32545d2`](https://bitbucket.org/atlassian/atlassian-frontend/commits/f10d32545d2) - Fix bug where clicking anything in column picker inside Datasource table triggers editor focus toggling

## 0.29.0

### Minor Changes

- [#37034](https://bitbucket.org/atlassian/atlassian-frontend/pull-requests/37034) [`dd0db85e7b7`](https://bitbucket.org/atlassian/atlassian-frontend/commits/dd0db85e7b7) - [ux] Added onInsertPressed method to insert ADF into doc and updated helper test mocks

## 0.28.5

### Patch Changes

- Updated dependencies

## 0.28.4

### Patch Changes

- [#36806](https://bitbucket.org/atlassian/atlassian-frontend/pull-requests/36806) [`ab94c1bd7c5`](https://bitbucket.org/atlassian/atlassian-frontend/commits/ab94c1bd7c5) - [ux] Sticky column picker

## 0.28.3

### Patch Changes

- [#36788](https://bitbucket.org/atlassian/atlassian-frontend/pull-requests/36788) [`af0b27d2dcf`](https://bitbucket.org/atlassian/atlassian-frontend/commits/af0b27d2dcf) - Upgrade JQL editor dependencies.

## 0.28.2

### Patch Changes

- Updated dependencies

## 0.28.1

### Patch Changes

- [#36746](https://bitbucket.org/atlassian/atlassian-frontend/pull-requests/36746) [`d311f1a30e1`](https://bitbucket.org/atlassian/atlassian-frontend/commits/d311f1a30e1) - Fix issue where table doesn't update after edit in the modal

## 0.28.0

### Minor Changes

- [#36302](https://bitbucket.org/atlassian/atlassian-frontend/pull-requests/36302) [`1c595c5a9d1`](https://bitbucket.org/atlassian/atlassian-frontend/commits/1c595c5a9d1) - Added assets modal to link-datasource, which includes the following API additions:

  - datasource ID for assets: `ASSETS_LIST_OF_LINKS_DATASOURCE_ID`
  - new component: `JSMAssetsConfigModal`
  - addition of 2 new types: `AssetsDatasourceAdf` and `AssetsDatasourceParameters`

### Patch Changes

- Updated dependencies

## 0.27.4

### Patch Changes

- [#36420](https://bitbucket.org/atlassian/atlassian-frontend/pull-requests/36420) [`45562e99798`](https://bitbucket.org/atlassian/atlassian-frontend/commits/45562e99798) - Added cmdbService, useAssetsClient hook and useValidateAqlText hook

## 0.27.3

### Patch Changes

- Updated dependencies

## 0.27.2

### Patch Changes

- Updated dependencies

## 0.27.1

### Patch Changes

- Updated dependencies

## 0.27.0

### Minor Changes

- [#35297](https://bitbucket.org/atlassian/atlassian-frontend/pull-requests/35297) [`ba155a0034c`](https://bitbucket.org/atlassian/atlassian-frontend/commits/ba155a0034c) - [ux] Add restricted access view to modal and table

### Patch Changes

- Updated dependencies

## 0.26.0

### Minor Changes

- [#35499](https://bitbucket.org/atlassian/atlassian-frontend/pull-requests/35499) [`a1b70608039`](https://bitbucket.org/atlassian/atlassian-frontend/commits/a1b70608039) - [ux] Adds editor toolbar to link datasource component

### Patch Changes

- Updated dependencies

## 0.25.2

### Patch Changes

- Updated dependencies

## 0.25.1

### Patch Changes

- [#36062](https://bitbucket.org/atlassian/atlassian-frontend/pull-requests/36062) [`64bdd3a389b`](https://bitbucket.org/atlassian/atlassian-frontend/commits/64bdd3a389b) - Style changes and translation updates. Also remove IntlProvider from prode code.

## 0.25.0

### Minor Changes

- [#35861](https://bitbucket.org/atlassian/atlassian-frontend/pull-requests/35861) [`f427908df3d`](https://bitbucket.org/atlassian/atlassian-frontend/commits/f427908df3d) - change the datasource response type to include the meta data section and the data response will wrap in the data section

### Patch Changes

- Updated dependencies

## 0.24.4

### Patch Changes

- [#34936](https://bitbucket.org/atlassian/atlassian-frontend/pull-requests/34936) [`b75c571b91b`](https://bitbucket.org/atlassian/atlassian-frontend/commits/b75c571b91b) - Fix up problem where we don't set react's "key" for list of content we show in each cell (like tags)
- Updated dependencies

## 0.24.3

### Patch Changes

- Updated dependencies

## 0.24.2

### Patch Changes

- Updated dependencies

## 0.24.1

### Patch Changes

- [#35582](https://bitbucket.org/atlassian/atlassian-frontend/pull-requests/35582) [`2d2b6b23bec`](https://bitbucket.org/atlassian/atlassian-frontend/commits/2d2b6b23bec) - Updated dependencies

## 0.24.0

### Minor Changes

- [#35418](https://bitbucket.org/atlassian/atlassian-frontend/pull-requests/35418) [`108aa0ad121`](https://bitbucket.org/atlassian/atlassian-frontend/commits/108aa0ad121) - [ux] Fix some table bugs such as inconsistency between issue count for modal/table and fix case where user can deselect all fields in the column picker

## 0.23.0

### Minor Changes

- [#35235](https://bitbucket.org/atlassian/atlassian-frontend/pull-requests/35235) [`62465d6399f`](https://bitbucket.org/atlassian/atlassian-frontend/commits/62465d6399f) - [ux] Adding loading spinner to search button and fixed initial search loading state in table

## 0.22.0

### Minor Changes

- [#34796](https://bitbucket.org/atlassian/atlassian-frontend/pull-requests/34796) [`d0680816ada`](https://bitbucket.org/atlassian/atlassian-frontend/commits/d0680816ada) - [ux] Added empty and error states to jira modal and datasourceTable

## 0.21.2

### Patch Changes

- [#34363](https://bitbucket.org/atlassian/atlassian-frontend/pull-requests/34363) [`105f0c7291b`](https://bitbucket.org/atlassian/atlassian-frontend/commits/105f0c7291b) - [ux] Various bug fixes to jira issue modal
- Updated dependencies

## 0.21.1

### Patch Changes

- Updated dependencies

## 0.21.0

### Minor Changes

- [#34180](https://bitbucket.org/atlassian/atlassian-frontend/pull-requests/34180) [`0b68480a270`](https://bitbucket.org/atlassian/atlassian-frontend/commits/0b68480a270) - Update logic to call `/details` only when full schema is required and added field list, includeSchema flag to `/data` call

### Patch Changes

- Updated dependencies

## 0.20.0

### Minor Changes

- [#34725](https://bitbucket.org/atlassian/atlassian-frontend/pull-requests/34725) [`0407e628d5b`](https://bitbucket.org/atlassian/atlassian-frontend/commits/0407e628d5b) - [ux] Fix some table bugs

## 0.19.1

### Patch Changes

- [#34731](https://bitbucket.org/atlassian/atlassian-frontend/pull-requests/34731) [`f5d34a140ad`](https://bitbucket.org/atlassian/atlassian-frontend/commits/f5d34a140ad) - Move both exported components to be behind lazy loading

## 0.19.0

### Minor Changes

- [#34691](https://bitbucket.org/atlassian/atlassian-frontend/pull-requests/34691) [`5ffc8529049`](https://bitbucket.org/atlassian/atlassian-frontend/commits/5ffc8529049) - - Export `DatasourceAdf`, `DatasourceAdfView`, `DatasourceAdfTableView`
  - Modify DatasourceAdf table view type

### Patch Changes

- Updated dependencies

## 0.18.1

### Patch Changes

- [#34443](https://bitbucket.org/atlassian/atlassian-frontend/pull-requests/34443) [`61cb5313358`](https://bitbucket.org/atlassian/atlassian-frontend/commits/61cb5313358) - Removing unused dependencies and dev dependencies

## 0.18.0

### Minor Changes

- [#34652](https://bitbucket.org/atlassian/atlassian-frontend/pull-requests/34652) [`8ddcd8088a9`](https://bitbucket.org/atlassian/atlassian-frontend/commits/8ddcd8088a9) - - Removing `onUpdateParameters` and `onVisibleColumnKeysChange` props from JiraIssuesConfigModal
  - make datasourceAdf type option of onInsert callback more jira concrete (JiraIssuesDatasourceAdf)
  - Export `JiraIssuesDatasourceAdf` type

## 0.17.6

### Patch Changes

- Updated dependencies

## 0.17.5

### Patch Changes

- [#34431](https://bitbucket.org/atlassian/atlassian-frontend/pull-requests/34431) [`d417c0728a8`](https://bitbucket.org/atlassian/atlassian-frontend/commits/d417c0728a8) - Added logic to show selected options at the top of the column picker

## 0.17.4

### Patch Changes

- Updated dependencies

## 0.17.3

### Patch Changes

- Updated dependencies

## 0.17.2

### Patch Changes

- [#34119](https://bitbucket.org/atlassian/atlassian-frontend/pull-requests/34119) [`b23bb695309`](https://bitbucket.org/atlassian/atlassian-frontend/commits/b23bb695309) - Remove hard-coded column from modal

## 0.17.1

### Patch Changes

- [#34035](https://bitbucket.org/atlassian/atlassian-frontend/pull-requests/34035) [`4c56014f328`](https://bitbucket.org/atlassian/atlassian-frontend/commits/4c56014f328) - Updated components to use the new `DatasourceDataResponseItem` format
- Updated dependencies

## 0.17.0

### Minor Changes

- [#34060](https://bitbucket.org/atlassian/atlassian-frontend/pull-requests/34060) [`85866be02b9`](https://bitbucket.org/atlassian/atlassian-frontend/commits/85866be02b9) - Add new exported member `JIRA_LIST_OF_LINKS_DATASOURCE_ID`; Also fix bug where next cursor is not reset when new search query starts and fix up format of the body that we send to /details endpoint

## 0.16.1

### Patch Changes

- [#33917](https://bitbucket.org/atlassian/atlassian-frontend/pull-requests/33917) [`d9be88498a8`](https://bitbucket.org/atlassian/atlassian-frontend/commits/d9be88498a8) - Updated components to use the new `DatasourceType` value format
- Updated dependencies

## 0.16.0

### Minor Changes

- [#33988](https://bitbucket.org/atlassian/atlassian-frontend/pull-requests/33988) [`a68bac355b0`](https://bitbucket.org/atlassian/atlassian-frontend/commits/a68bac355b0) - Renaming `JiraIssuesTableView` into `DatasourceTableView` and changing its `parameters` property to be an `object`

## 0.15.1

### Patch Changes

- [#33841](https://bitbucket.org/atlassian/atlassian-frontend/pull-requests/33841) [`3d4e152483b`](https://bitbucket.org/atlassian/atlassian-frontend/commits/3d4e152483b) - Move all the mocking outside into link-test-helpers and use it.

## 0.15.0

### Minor Changes

- [#33767](https://bitbucket.org/atlassian/atlassian-frontend/pull-requests/33767) [`9b52f1c40fa`](https://bitbucket.org/atlassian/atlassian-frontend/commits/9b52f1c40fa) - Added a default column width to specific fields and types

## 0.14.4

### Patch Changes

- [#33794](https://bitbucket.org/atlassian/atlassian-frontend/pull-requests/33794) [`e63f4d2d305`](https://bitbucket.org/atlassian/atlassian-frontend/commits/e63f4d2d305) - Changed the package scope to public @atlaskit and made `onVisibleColumnKeysChange` optional to allow read only tables.

## 0.14.3

### Patch Changes

- [#33793](https://bitbucket.org/atlassian/atlassian-frontend/pull-requests/33793) [`9d00501a414`](https://bitbucket.org/atlassian/atlassian-frontend/commits/9d00501a414) - Ensure legacy types are published for TS 4.5-4.8
- Updated dependencies

## 0.14.2

### Patch Changes

- [#33649](https://bitbucket.org/atlassian/atlassian-frontend/pull-requests/33649) [`41fae2c6f68`](https://bitbucket.org/atlassian/atlassian-frontend/commits/41fae2c6f68) - Upgrade Typescript from `4.5.5` to `4.9.5`
- Updated dependencies

## 0.14.1

### Patch Changes

- [#33377](https://bitbucket.org/atlassian/atlassian-frontend/pull-requests/33377) [`07020547a93`](https://bitbucket.org/atlassian/atlassian-frontend/commits/07020547a93) - Safe direct migraiton to design token API. This change is not visible for those who aren't using design tokens
- Updated dependencies

## 0.14.0

### Minor Changes

- [#33245](https://bitbucket.org/atlassian/atlassian-frontend/pull-requests/33245) [`5968b8a8210`](https://bitbucket.org/atlassian/atlassian-frontend/commits/5968b8a8210) - [ux] added view mode toggle to config modal

## 0.13.3

### Patch Changes

- Updated dependencies

## 0.13.2

### Patch Changes

- [#33177](https://bitbucket.org/atlassian/atlassian-frontend/pull-requests/33177) [`1540a29f7f4`](https://bitbucket.org/atlassian/atlassian-frontend/commits/1540a29f7f4) - [ux] change logic in footer to show total issues fetched and not current number of issues in table
- Updated dependencies

## 0.13.1

### Patch Changes

- [#33262](https://bitbucket.org/atlassian/atlassian-frontend/pull-requests/33262) [`aa7eb05066d`](https://bitbucket.org/atlassian/atlassian-frontend/commits/aa7eb05066d) - Internal dependency of `@atlaskit/drag-and-drop*` has been renamed to `@atlaskit/pragmatic-drag-and-drop*`
- Updated dependencies

## 0.13.0

### Minor Changes

- [#33015](https://bitbucket.org/atlassian/atlassian-frontend/pull-requests/33015) [`cd179e6f433`](https://bitbucket.org/atlassian/atlassian-frontend/commits/cd179e6f433) - Added logic to render as `SmartCard` when result has only one row

## 0.12.0

### Minor Changes

- [#33258](https://bitbucket.org/atlassian/atlassian-frontend/pull-requests/33258) [`56507598609`](https://bitbucket.org/atlassian/atlassian-frontend/commits/56507598609) - Skip minor dependency bump

### Patch Changes

- Updated dependencies

## 0.11.0

### Minor Changes

- [#32939](https://bitbucket.org/atlassian/atlassian-frontend/pull-requests/32939) [`ab383434b1c`](https://bitbucket.org/atlassian/atlassian-frontend/commits/ab383434b1c) - Ability to generate Datasource ADF on insertion

### Patch Changes

- Updated dependencies

## 0.10.1

### Patch Changes

- Updated dependencies

## 0.10.0

### Minor Changes

- [#32949](https://bitbucket.org/atlassian/atlassian-frontend/pull-requests/32949) [`1a044d5345a`](https://bitbucket.org/atlassian/atlassian-frontend/commits/1a044d5345a) - [ux] Adds issue count and refresh button component

## 0.9.1

### Patch Changes

- [#33057](https://bitbucket.org/atlassian/atlassian-frontend/pull-requests/33057) [`a003bc719cb`](https://bitbucket.org/atlassian/atlassian-frontend/commits/a003bc719cb) - Refactoring mode-switcher

## 0.9.0

### Minor Changes

- [#32751](https://bitbucket.org/atlassian/atlassian-frontend/pull-requests/32751) [`5abf8a31abb`](https://bitbucket.org/atlassian/atlassian-frontend/commits/5abf8a31abb) - Refactor IssueLikeTable. Move it's state outside into hook useDatasourceTableState

### Patch Changes

- Updated dependencies

## 0.8.0

### Minor Changes

- [#32774](https://bitbucket.org/atlassian/atlassian-frontend/pull-requests/32774) [`afd7233d088`](https://bitbucket.org/atlassian/atlassian-frontend/commits/afd7233d088) - [ux] added basic search and search mode toggle

## 0.7.1

### Patch Changes

- [#32541](https://bitbucket.org/atlassian/atlassian-frontend/pull-requests/32541) [`0624df1ffe1`](https://bitbucket.org/atlassian/atlassian-frontend/commits/0624df1ffe1) - Bump json-ld-types dependency
- Updated dependencies

## 0.7.0

### Minor Changes

- [#32502](https://bitbucket.org/atlassian/atlassian-frontend/pull-requests/32502) [`428c7270422`](https://bitbucket.org/atlassian/atlassian-frontend/commits/428c7270422) - Updated `Date` render type to `DateTime` render type to support date, time and datetime

### Patch Changes

- Updated dependencies

## 0.6.0

### Minor Changes

- [#32189](https://bitbucket.org/atlassian/atlassian-frontend/pull-requests/32189) [`127d16e0933`](https://bitbucket.org/atlassian/atlassian-frontend/commits/127d16e0933) - Add generic render type components for each data source types

### Patch Changes

- Updated dependencies

## 0.5.0

### Minor Changes

- [#32357](https://bitbucket.org/atlassian/atlassian-frontend/pull-requests/32357) [`52a64257016`](https://bitbucket.org/atlassian/atlassian-frontend/commits/52a64257016) - [ux] added jql editor input to config modal

## 0.4.3

### Patch Changes

- [#32424](https://bitbucket.org/atlassian/atlassian-frontend/pull-requests/32424) [`2e01c9c74b5`](https://bitbucket.org/atlassian/atlassian-frontend/commits/2e01c9c74b5) - DUMMY remove before merging to master; dupe adf-schema via adf-utils

## 0.4.2

### Patch Changes

- Updated dependencies

## 0.4.1

### Patch Changes

- Updated dependencies

## 0.4.0

### Minor Changes

- [#31938](https://bitbucket.org/atlassian/atlassian-frontend/pull-requests/31938) [`9a83e52fd54`](https://bitbucket.org/atlassian/atlassian-frontend/commits/9a83e52fd54) - added jira site selector to list of links config modal

## 0.3.4

### Patch Changes

- [#31457](https://bitbucket.org/atlassian/atlassian-frontend/pull-requests/31457) [`a66fd9d6f9d`](https://bitbucket.org/atlassian/atlassian-frontend/commits/a66fd9d6f9d) - Introduce column picker into issue like table component

## 0.3.3

### Patch Changes

- Updated dependencies

## 0.3.2

### Patch Changes

- Updated dependencies

## 0.3.1

### Patch Changes

- Updated dependencies

## 0.3.0

### Minor Changes

- [#31717](https://bitbucket.org/atlassian/atlassian-frontend/pull-requests/31717) [`c6017ad803e`](https://bitbucket.org/atlassian/atlassian-frontend/commits/c6017ad803e) - [ux] add empty table state for datasources

### Patch Changes

- Updated dependencies

## 0.2.3

### Patch Changes

- Updated dependencies

## 0.2.2

### Patch Changes

- Updated dependencies

## 0.2.1

### Patch Changes

- [#31383](https://bitbucket.org/atlassian/atlassian-frontend/pull-requests/31383) [`e066b00c060`](https://bitbucket.org/atlassian/atlassian-frontend/commits/e066b00c060) - Add ability to drag and drop columns to reorder them to `IssueLikeDataTableView`

## 0.2.0

### Minor Changes

- [#30419](https://bitbucket.org/atlassian/atlassian-frontend/pull-requests/30419) [`82ce247716c`](https://bitbucket.org/atlassian/atlassian-frontend/commits/82ce247716c) - Adds a new link datasource component `JiraIssuesTableView` (still under development) is added

### Patch Changes

- Updated dependencies
