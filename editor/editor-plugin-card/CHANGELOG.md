# @atlaskit/editor-plugin-card

## 0.14.2

### Patch Changes

- [#42839](https://bitbucket.org/atlassian/atlassian-frontend/pull-requests/42839) [`7324375d4fa`](https://bitbucket.org/atlassian/atlassian-frontend/commits/7324375d4fa) - [ux] Cleansup feature flag `prevent-popup-overflow` so that it is permanently enabled when `lp-link-picker` flag is enabled, improving the positioning of the link picker.

## 0.14.1

### Patch Changes

- [#43646](https://bitbucket.org/atlassian/atlassian-frontend/pull-requests/43646) [`d43f8e9402f`](https://bitbucket.org/atlassian/atlassian-frontend/commits/d43f8e9402f) - Make feature flags plugin optional in all plugins including:

  - analytics
  - base
  - card
  - code-block
  - expand
  - extension
  - floating-toolbar
  - hyperlink
  - insert-block
  - layout
  - layout
  - list
  - media
  - paste
  - rule
  - table
  - tasks-and-decisions

  We already treat it as optional in the plugins, so this is just ensuring that the plugin is not mandatory to be added to the preset.

- Updated dependencies

## 0.14.0

### Minor Changes

- [#43139](https://bitbucket.org/atlassian/atlassian-frontend/pull-requests/43139) [`633ac70ce16`](https://bitbucket.org/atlassian/atlassian-frontend/commits/633ac70ce16) - Removed floatingToolbarLinkSettingsButton feature flag

### Patch Changes

- Updated dependencies

## 0.13.6

### Patch Changes

- [#43035](https://bitbucket.org/atlassian/atlassian-frontend/pull-requests/43035) [`705854f13b3`](https://bitbucket.org/atlassian/atlassian-frontend/commits/705854f13b3) - [ux] Show inline card overlay on selected (behind feature flag)
- [#43417](https://bitbucket.org/atlassian/atlassian-frontend/pull-requests/43417) [`3f3c17f0273`](https://bitbucket.org/atlassian/atlassian-frontend/commits/3f3c17f0273) - ED-20971 Upgrade adf-schema package to ^34.0.0
- [#43496](https://bitbucket.org/atlassian/atlassian-frontend/pull-requests/43496) [`290e75ca7f2`](https://bitbucket.org/atlassian/atlassian-frontend/commits/290e75ca7f2) - Fixes uncaught error when using arrow keys to move selection into inline card.
- Updated dependencies

## 0.13.5

### Patch Changes

- Updated dependencies

## 0.13.4

### Patch Changes

- [#43379](https://bitbucket.org/atlassian/atlassian-frontend/pull-requests/43379) [`482c025520d`](https://bitbucket.org/atlassian/atlassian-frontend/commits/482c025520d) - ED-20763 Upgrade ADF schema version to 33.2.3 for MBE nodes.
- [#43352](https://bitbucket.org/atlassian/atlassian-frontend/pull-requests/43352) [`087515ab3ea`](https://bitbucket.org/atlassian/atlassian-frontend/commits/087515ab3ea) - [ux] Added on selection behaviour for inline link
- Updated dependencies

## 0.13.3

### Patch Changes

- [#43175](https://bitbucket.org/atlassian/atlassian-frontend/pull-requests/43175) [`a72cac2bc28`](https://bitbucket.org/atlassian/atlassian-frontend/commits/a72cac2bc28) - [ux] Added a check for showLinkOverlay for hover/unhover scenarios

## 0.13.2

### Patch Changes

- [#42933](https://bitbucket.org/atlassian/atlassian-frontend/pull-requests/42933) [`6a7848b6400`](https://bitbucket.org/atlassian/atlassian-frontend/commits/6a7848b6400) - Cleansup feature flag. Floating toolbar now always fires a viewed event when activated for links when the card plugin is enabled.
- Updated dependencies

## 0.13.1

### Patch Changes

- [#43078](https://bitbucket.org/atlassian/atlassian-frontend/pull-requests/43078) [`088d6edebd4`](https://bitbucket.org/atlassian/atlassian-frontend/commits/088d6edebd4) - [ux] Passing the value of showUpgradeDiscoverability prop to toolbar component

## 0.13.0

### Minor Changes

- [#42692](https://bitbucket.org/atlassian/atlassian-frontend/pull-requests/42692) [`755bedc2db1`](https://bitbucket.org/atlassian/atlassian-frontend/commits/755bedc2db1) - [ux] Added functionality for Inline Card pulse that should surface only on the first inserted link of the day.

### Patch Changes

- Updated dependencies

## 0.12.2

### Patch Changes

- [#43004](https://bitbucket.org/atlassian/atlassian-frontend/pull-requests/43004) [`534feb3059b`](https://bitbucket.org/atlassian/atlassian-frontend/commits/534feb3059b) - [ux] Update text for /assets slash command to add "(Beta)" suffix, and change Assets slash command icon slightly

## 0.12.1

### Patch Changes

- [#42995](https://bitbucket.org/atlassian/atlassian-frontend/pull-requests/42995) [`a527682dee6`](https://bitbucket.org/atlassian/atlassian-frontend/commits/a527682dee6) - add in missing dependencies for imported types

## 0.12.0

### Minor Changes

- [#42821](https://bitbucket.org/atlassian/atlassian-frontend/pull-requests/42821) [`9ae7cc56578`](https://bitbucket.org/atlassian/atlassian-frontend/commits/9ae7cc56578) - [ux] Adds datasource edit button to blue links that can resolve into datasources

## 0.11.1

### Patch Changes

- [#42248](https://bitbucket.org/atlassian/atlassian-frontend/pull-requests/42248) [`c3ce5d9263f`](https://bitbucket.org/atlassian/atlassian-frontend/commits/c3ce5d9263f) - Add inline card overlay component
- [#42848](https://bitbucket.org/atlassian/atlassian-frontend/pull-requests/42848) [`f2f8428f703`](https://bitbucket.org/atlassian/atlassian-frontend/commits/f2f8428f703) - Abandons feature flag lp-link-picker-focus-trap as it was not successfully rolled out. Will re-introduce as platform feature flag as/when necessary.
- Updated dependencies

## 0.11.0

### Minor Changes

- [#42755](https://bitbucket.org/atlassian/atlassian-frontend/pull-requests/42755) [`97f9fcba5a5`](https://bitbucket.org/atlassian/atlassian-frontend/commits/97f9fcba5a5) - [ux] Add a discovery pulse to smart link view switcher under certain conditions and behind a feature flag

### Patch Changes

- Updated dependencies

## 0.10.10

### Patch Changes

- [#42151](https://bitbucket.org/atlassian/atlassian-frontend/pull-requests/42151) [`192b62f6d36`](https://bitbucket.org/atlassian/atlassian-frontend/commits/192b62f6d36) - Cleans up editor feature flag 'lp-analytics-events-next'. Card plugin will now always dispatch link tracking events.

## 0.10.9

### Patch Changes

- [#42607](https://bitbucket.org/atlassian/atlassian-frontend/pull-requests/42607) [`87e6390f290`](https://bitbucket.org/atlassian/atlassian-frontend/commits/87e6390f290) - [ux] Added a DiscoveryPulse component that can be used for feature discovery based on local storage keys
- Updated dependencies

## 0.10.8

### Patch Changes

- [#42586](https://bitbucket.org/atlassian/atlassian-frontend/pull-requests/42586) [`ed2a549e705`](https://bitbucket.org/atlassian/atlassian-frontend/commits/ed2a549e705) - ED-20177 Use updated transaction when closing modal

## 0.10.7

### Patch Changes

- [#38725](https://bitbucket.org/atlassian/atlassian-frontend/pull-requests/38725) [`0f145c04dbf`](https://bitbucket.org/atlassian/atlassian-frontend/commits/0f145c04dbf) - [ux] Datasource columns now can be resizied
- [#38725](https://bitbucket.org/atlassian/atlassian-frontend/pull-requests/38725) [`0f145c04dbf`](https://bitbucket.org/atlassian/atlassian-frontend/commits/0f145c04dbf) - [ux] Datasource columns now can be resizied
- Updated dependencies

## 0.10.6

### Patch Changes

- [#42350](https://bitbucket.org/atlassian/atlassian-frontend/pull-requests/42350) [`5c905e458da`](https://bitbucket.org/atlassian/atlassian-frontend/commits/5c905e458da) - [ux] Fixed an issue where a blinking cursor would appear before a selected datasource node.

## 0.10.5

### Patch Changes

- [#42367](https://bitbucket.org/atlassian/atlassian-frontend/pull-requests/42367) [`4f70009532a`](https://bitbucket.org/atlassian/atlassian-frontend/commits/4f70009532a) - [ux] Refactored the inline card to be a functional component behind a FF

## 0.10.4

### Patch Changes

- Updated dependencies

## 0.10.3

### Patch Changes

- [#41985](https://bitbucket.org/atlassian/atlassian-frontend/pull-requests/41985) [`75de7b64b6d`](https://bitbucket.org/atlassian/atlassian-frontend/commits/75de7b64b6d) - DatasourceEvents getDisplayedColumnCount now returns null instead of 0 if no properties exist
- Updated dependencies

## 0.10.2

### Patch Changes

- Updated dependencies

## 0.10.1

### Patch Changes

- [#41921](https://bitbucket.org/atlassian/atlassian-frontend/pull-requests/41921) [`12d685a4b30`](https://bitbucket.org/atlassian/atlassian-frontend/commits/12d685a4b30) - Removed chromeCursorHandlerFixedVersion feature flag

## 0.10.0

### Minor Changes

- [#41407](https://bitbucket.org/atlassian/atlassian-frontend/pull-requests/41407) [`10708446bd2`](https://bitbucket.org/atlassian/atlassian-frontend/commits/10708446bd2) - [ux] Added support for passing of new optional url prop to JiraConfigModal

### Patch Changes

- Updated dependencies

## 0.9.2

### Patch Changes

- [#41405](https://bitbucket.org/atlassian/atlassian-frontend/pull-requests/41405) [`6619f042a24`](https://bitbucket.org/atlassian/atlassian-frontend/commits/6619f042a24) - [ux] Fix issue where any inline/block/embeds don't open up datasource modal with proper info

## 0.9.1

### Patch Changes

- [#40745](https://bitbucket.org/atlassian/atlassian-frontend/pull-requests/40745) [`bba067a4049`](https://bitbucket.org/atlassian/atlassian-frontend/commits/bba067a4049) - Datasource modal dialog now wrapped with datasource render failed analytics component
- Updated dependencies

## 0.9.0

### Minor Changes

- [#40876](https://bitbucket.org/atlassian/atlassian-frontend/pull-requests/40876) [`c43a6a9cbd2`](https://bitbucket.org/atlassian/atlassian-frontend/commits/c43a6a9cbd2) - [ux] Adds copy button to datasource toolbar

## 0.8.7

### Patch Changes

- [#39749](https://bitbucket.org/atlassian/atlassian-frontend/pull-requests/39749) [`e6b69f455c3`](https://bitbucket.org/atlassian/atlassian-frontend/commits/e6b69f455c3) - Connect yarn changeset to packages, upgrade adf-schema
- Updated dependencies

## 0.8.6

### Patch Changes

- Updated dependencies

## 0.8.5

### Patch Changes

- [#40786](https://bitbucket.org/atlassian/atlassian-frontend/pull-requests/40786) [`898ac16a850`](https://bitbucket.org/atlassian/atlassian-frontend/commits/898ac16a850) - Add platform.linking-platform.datasource.show-jlol-basic-filters feature flag reference for usage in editor examples

## 0.8.4

### Patch Changes

- Updated dependencies

## 0.8.3

### Patch Changes

- Updated dependencies

## 0.8.2

### Patch Changes

- [#40614](https://bitbucket.org/atlassian/atlassian-frontend/pull-requests/40614) [`4e7058a65f4`](https://bitbucket.org/atlassian/atlassian-frontend/commits/4e7058a65f4) - Add eslint rule to ban React.FC and React.FunctionalComponent in editor. In most packages this is still a warning.
- [#40478](https://bitbucket.org/atlassian/atlassian-frontend/pull-requests/40478) [`08c899663fa`](https://bitbucket.org/atlassian/atlassian-frontend/commits/08c899663fa) - Add datasource failed analytic events to datasourceErrorBoundary
- Updated dependencies

## 0.8.1

### Patch Changes

- [#40539](https://bitbucket.org/atlassian/atlassian-frontend/pull-requests/40539) [`ae7c1132c88`](https://bitbucket.org/atlassian/atlassian-frontend/commits/ae7c1132c88) - Added analytics fix for undo/redo scenarious of link upgrade to a datasource
- [#40199](https://bitbucket.org/atlassian/atlassian-frontend/pull-requests/40199) [`553b34b5fd4`](https://bitbucket.org/atlassian/atlassian-frontend/commits/553b34b5fd4) - Small analytics bug fixes relating to auto-linking on enter, legacy link picker, and unresolvable links.

## 0.8.0

### Minor Changes

- [#40408](https://bitbucket.org/atlassian/atlassian-frontend/pull-requests/40408) [`e4721cc5a3f`](https://bitbucket.org/atlassian/atlassian-frontend/commits/e4721cc5a3f) - Make issue count clickable

### Patch Changes

- Updated dependencies

## 0.7.3

### Patch Changes

- Updated dependencies

## 0.7.2

### Patch Changes

- Updated dependencies

## 0.7.1

### Patch Changes

- [#40187](https://bitbucket.org/atlassian/atlassian-frontend/pull-requests/40187) [`bab3ac9e64e`](https://bitbucket.org/atlassian/atlassian-frontend/commits/bab3ac9e64e) - Passing analytic events with attributes from link-datasource modal to editor.
- Updated dependencies

## 0.7.0

### Minor Changes

- [#39171](https://bitbucket.org/atlassian/atlassian-frontend/pull-requests/39171) [`50b3bf73ed3`](https://bitbucket.org/atlassian/atlassian-frontend/commits/50b3bf73ed3) - [ux] Add edit datasource button to toolbar for cards which can resolve into datasources

### Patch Changes

- Updated dependencies

## 0.6.0

### Minor Changes

- [#39265](https://bitbucket.org/atlassian/atlassian-frontend/pull-requests/39265) [`8b8a309cb62`](https://bitbucket.org/atlassian/atlassian-frontend/commits/8b8a309cb62) - Added datasource analytic CRUD events

### Patch Changes

- Updated dependencies

## 0.5.11

### Patch Changes

- [#39984](https://bitbucket.org/atlassian/atlassian-frontend/pull-requests/39984) [`37c62369dae`](https://bitbucket.org/atlassian/atlassian-frontend/commits/37c62369dae) - NO-ISSUE Import doc builder types from editor-common

## 0.5.10

### Patch Changes

- Updated dependencies

## 0.5.9

### Patch Changes

- [#39481](https://bitbucket.org/atlassian/atlassian-frontend/pull-requests/39481) [`aeb5c9a01e8`](https://bitbucket.org/atlassian/atlassian-frontend/commits/aeb5c9a01e8) - Delete adf-schema from AFE and rely on npm package for adf-schema
- [`4b4dcfe0bba`](https://bitbucket.org/atlassian/atlassian-frontend/commits/4b4dcfe0bba) - Delete adf-schema, use published version

## 0.5.8

### Patch Changes

- [#39781](https://bitbucket.org/atlassian/atlassian-frontend/pull-requests/39781) [`94ae084e345`](https://bitbucket.org/atlassian/atlassian-frontend/commits/94ae084e345) - Add `EditorAnalyticsContext` for editor datasource component

## 0.5.7

### Patch Changes

- [#39797](https://bitbucket.org/atlassian/atlassian-frontend/pull-requests/39797) [`43bb8818f18`](https://bitbucket.org/atlassian/atlassian-frontend/commits/43bb8818f18) - Pasting a datasource now only requires a single undo to revert
- Updated dependencies

## 0.5.6

### Patch Changes

- [#39614](https://bitbucket.org/atlassian/atlassian-frontend/pull-requests/39614) [`d5c28c4c0df`](https://bitbucket.org/atlassian/atlassian-frontend/commits/d5c28c4c0df) - Updated jira issues quick insert menu description.
- Updated dependencies

## 0.5.5

### Patch Changes

- [#39647](https://bitbucket.org/atlassian/atlassian-frontend/pull-requests/39647) [`7ff427bb457`](https://bitbucket.org/atlassian/atlassian-frontend/commits/7ff427bb457) - Add datasources to macro menu categories

## 0.5.4

### Patch Changes

- [#39612](https://bitbucket.org/atlassian/atlassian-frontend/pull-requests/39612) [`dfb663969a0`](https://bitbucket.org/atlassian/atlassian-frontend/commits/dfb663969a0) - ED-19820: Fix for table scroll when insert media node when extended-resize-experience is off

## 0.5.3

### Patch Changes

- [#39460](https://bitbucket.org/atlassian/atlassian-frontend/pull-requests/39460) [`882e4e88358`](https://bitbucket.org/atlassian/atlassian-frontend/commits/882e4e88358) - Add playwright tests and add test ids to find elements

## 0.5.2

### Patch Changes

- [#39327](https://bitbucket.org/atlassian/atlassian-frontend/pull-requests/39327) [`386b8378aeb`](https://bitbucket.org/atlassian/atlassian-frontend/commits/386b8378aeb) - Datasource ADF no longer included when feature flag call from canRenderDatasource returns false

## 0.5.1

### Patch Changes

- Updated dependencies

## 0.5.0

### Minor Changes

- [#39325](https://bitbucket.org/atlassian/atlassian-frontend/pull-requests/39325) [`ad3c5c21079`](https://bitbucket.org/atlassian/atlassian-frontend/commits/ad3c5c21079) - Updating all plugins with minor version to correct issue with semver.

### Patch Changes

- Updated dependencies

## 0.4.9

### Patch Changes

- [#39010](https://bitbucket.org/atlassian/atlassian-frontend/pull-requests/39010) [`8467bdcdf4f`](https://bitbucket.org/atlassian/atlassian-frontend/commits/8467bdcdf4f) - Removing `dependencies` prop from PluginInjectionAPI and changing
  signature of `NextEditorPlugin`.

  Previously a `NextEditorPlugin` would be consumed as so:

  ```ts
  const plugin: NextEditorPlugin< ... > = (config, api) => {
    // Can use api like so:
    api.dependencies.core.actions.execute( ... )
    return { ... }
  }
  ```

  Now these have become named parameters like so and the `pluginInjectionAPI` is used
  without the `dependencies` prop:

  ```ts
  const plugin: NextEditorPlugin< ... > = ({ config, api }) => {
    // Can use api like so:
    api.core.actions.execute( ... )
    return { ... }
  }
  ```

- Updated dependencies

## 0.4.8

### Patch Changes

- [#39177](https://bitbucket.org/atlassian/atlassian-frontend/pull-requests/39177) [`24e27147cbd`](https://bitbucket.org/atlassian/atlassian-frontend/commits/24e27147cbd) - Added atlaskit docs to all existing plugins.

## 0.4.7

### Patch Changes

- [#39036](https://bitbucket.org/atlassian/atlassian-frontend/pull-requests/39036) [`9c86163d326`](https://bitbucket.org/atlassian/atlassian-frontend/commits/9c86163d326) - [ux] Adds ability to edit Assets datasource modal from inserted table

## 0.4.6

### Patch Changes

- [#38976](https://bitbucket.org/atlassian/atlassian-frontend/pull-requests/38976) [`33cb07de05f`](https://bitbucket.org/atlassian/atlassian-frontend/commits/33cb07de05f) - change adf-schema to fixed versioning

## 0.4.5

### Patch Changes

- Updated dependencies

## 0.4.4

### Patch Changes

- Updated dependencies

## 0.4.3

### Patch Changes

- [#37887](https://bitbucket.org/atlassian/atlassian-frontend/pull-requests/37887) [`bdb69158e0a`](https://bitbucket.org/atlassian/atlassian-frontend/commits/bdb69158e0a) - [ED-13910] Bump ProseMirror libraries to match prosemirror-view@1.31.6 dependencies
- Updated dependencies

## 0.4.2

### Patch Changes

- Updated dependencies

## 0.4.1

### Patch Changes

- Updated dependencies

## 0.4.0

### Minor Changes

- [#37644](https://bitbucket.org/atlassian/atlassian-frontend/pull-requests/37644) [`b9a083dc04d`](https://bitbucket.org/atlassian/atlassian-frontend/commits/b9a083dc04d) - [ux] Adds error boundaries specific to datasource in editor and renderer. Fallback to unsupported block if no url or inline if url

## 0.3.9

### Patch Changes

- Updated dependencies

## 0.3.8

### Patch Changes

- Updated dependencies

## 0.3.7

### Patch Changes

- [#37702](https://bitbucket.org/atlassian/atlassian-frontend/pull-requests/37702) [`31405891e32`](https://bitbucket.org/atlassian/atlassian-frontend/commits/31405891e32) - Extract editor disabled plugin as separate package.
- Updated dependencies

## 0.3.6

### Patch Changes

- [#37984](https://bitbucket.org/atlassian/atlassian-frontend/pull-requests/37984) [`fd24b65bb62`](https://bitbucket.org/atlassian/atlassian-frontend/commits/fd24b65bb62) - Fix table width bug when layout is undefined for datasource.

## 0.3.5

### Patch Changes

- [#37027](https://bitbucket.org/atlassian/atlassian-frontend/pull-requests/37027) [`f9cdc991f20`](https://bitbucket.org/atlassian/atlassian-frontend/commits/f9cdc991f20) - Updates analytics to better support datasources
- Updated dependencies

## 0.3.4

### Patch Changes

- Updated dependencies

## 0.3.3

### Patch Changes

- [#37505](https://bitbucket.org/atlassian/atlassian-frontend/pull-requests/37505) [`02d1ab1d57d`](https://bitbucket.org/atlassian/atlassian-frontend/commits/02d1ab1d57d) - Improve DnD Experience in Datasource Table view

## 0.3.2

### Patch Changes

- Updated dependencies

## 0.3.1

### Patch Changes

- [#37785](https://bitbucket.org/atlassian/atlassian-frontend/pull-requests/37785) [`4e6f1bf8511`](https://bitbucket.org/atlassian/atlassian-frontend/commits/4e6f1bf8511) - [ED-19233] Import prosemirror libraries from internal facade package

## 0.3.0

### Minor Changes

- [#36823](https://bitbucket.org/atlassian/atlassian-frontend/pull-requests/36823) [`632edbf1930`](https://bitbucket.org/atlassian/atlassian-frontend/commits/632edbf1930) - Updates card plugin floating toolbar to fire an analytic event when viewed.

## 0.2.5

### Patch Changes

- Updated dependencies

## 0.2.4

### Patch Changes

- [#37357](https://bitbucket.org/atlassian/atlassian-frontend/pull-requests/37357) [`6255c2ad1c9`](https://bitbucket.org/atlassian/atlassian-frontend/commits/6255c2ad1c9) - [ux] Adds ability to open Assets datasource dialog using the slash command in the editor, behind a feature flag

## 0.2.3

### Patch Changes

- [#36875](https://bitbucket.org/atlassian/atlassian-frontend/pull-requests/36875) [`e86c43db633`](https://bitbucket.org/atlassian/atlassian-frontend/commits/e86c43db633) - Updates card plugin to skip finding changed links for analytics for transactions with TableSortStep

## 0.2.2

### Patch Changes

- [#37340](https://bitbucket.org/atlassian/atlassian-frontend/pull-requests/37340) [`b9355830504`](https://bitbucket.org/atlassian/atlassian-frontend/commits/b9355830504) - Opt out of peer dependency enforcement

## 0.2.1

### Patch Changes

- Updated dependencies

## 0.2.0

### Minor Changes

- [#36750](https://bitbucket.org/atlassian/atlassian-frontend/pull-requests/36750) [`6bacee18c2d`](https://bitbucket.org/atlassian/atlassian-frontend/commits/6bacee18c2d) - [ux] Add new allowDatasource prop for enabling datasource in editor and add inlineCard fallback render for blockCard with datasource

### Patch Changes

- Updated dependencies

## 0.1.2

### Patch Changes

- [#36757](https://bitbucket.org/atlassian/atlassian-frontend/pull-requests/36757) [`3fb20c4aeba`](https://bitbucket.org/atlassian/atlassian-frontend/commits/3fb20c4aeba) - Add postinstall check to enforce internal peer dependencies

## 0.1.1

### Patch Changes

- Updated dependencies
