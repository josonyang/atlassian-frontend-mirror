# @atlaskit/editor-plugin-hyperlink

## 0.6.2

### Patch Changes

- [#42839](https://bitbucket.org/atlassian/atlassian-frontend/pull-requests/42839) [`7324375d4fa`](https://bitbucket.org/atlassian/atlassian-frontend/commits/7324375d4fa) - [ux] Cleansup feature flag `prevent-popup-overflow` so that it is permanently enabled when `lp-link-picker` flag is enabled, improving the positioning of the link picker.

## 0.6.1

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

## 0.6.0

### Minor Changes

- [#43139](https://bitbucket.org/atlassian/atlassian-frontend/pull-requests/43139) [`633ac70ce16`](https://bitbucket.org/atlassian/atlassian-frontend/commits/633ac70ce16) - Removed floatingToolbarLinkSettingsButton feature flag

## 0.5.9

### Patch Changes

- [#43417](https://bitbucket.org/atlassian/atlassian-frontend/pull-requests/43417) [`3f3c17f0273`](https://bitbucket.org/atlassian/atlassian-frontend/commits/3f3c17f0273) - ED-20971 Upgrade adf-schema package to ^34.0.0

## 0.5.8

### Patch Changes

- Updated dependencies

## 0.5.7

### Patch Changes

- [#43379](https://bitbucket.org/atlassian/atlassian-frontend/pull-requests/43379) [`482c025520d`](https://bitbucket.org/atlassian/atlassian-frontend/commits/482c025520d) - ED-20763 Upgrade ADF schema version to 33.2.3 for MBE nodes.
- Updated dependencies

## 0.5.6

### Patch Changes

- [#42848](https://bitbucket.org/atlassian/atlassian-frontend/pull-requests/42848) [`f2f8428f703`](https://bitbucket.org/atlassian/atlassian-frontend/commits/f2f8428f703) - Abandons feature flag lp-link-picker-focus-trap as it was not successfully rolled out. Will re-introduce as platform feature flag as/when necessary.

## 0.5.5

### Patch Changes

- [#42680](https://bitbucket.org/atlassian/atlassian-frontend/pull-requests/42680) [`1174ff1745b`](https://bitbucket.org/atlassian/atlassian-frontend/commits/1174ff1745b) - Cleans up ff platform.linking-platform.editor.fix-link-insert-analytics. No expected functional changes.

## 0.5.4

### Patch Changes

- Updated dependencies

## 0.5.3

### Patch Changes

- [#39749](https://bitbucket.org/atlassian/atlassian-frontend/pull-requests/39749) [`e6b69f455c3`](https://bitbucket.org/atlassian/atlassian-frontend/commits/e6b69f455c3) - Connect yarn changeset to packages, upgrade adf-schema

## 0.5.2

### Patch Changes

- Updated dependencies

## 0.5.1

### Patch Changes

- [#40199](https://bitbucket.org/atlassian/atlassian-frontend/pull-requests/40199) [`553b34b5fd4`](https://bitbucket.org/atlassian/atlassian-frontend/commits/553b34b5fd4) - Small analytics bug fixes relating to auto-linking on enter, legacy link picker, and unresolvable links.

## 0.5.0

### Minor Changes

- [#40089](https://bitbucket.org/atlassian/atlassian-frontend/pull-requests/40089) [`9a62c110c14`](https://bitbucket.org/atlassian/atlassian-frontend/commits/9a62c110c14) - [ux] ECA11Y-65: Removed aria-pressed from the Hyperlink floating controls toolbar buttons

## 0.4.3

### Patch Changes

- Updated dependencies

## 0.4.2

### Patch Changes

- [#39481](https://bitbucket.org/atlassian/atlassian-frontend/pull-requests/39481) [`aeb5c9a01e8`](https://bitbucket.org/atlassian/atlassian-frontend/commits/aeb5c9a01e8) - Delete adf-schema from AFE and rely on npm package for adf-schema
- [`4b4dcfe0bba`](https://bitbucket.org/atlassian/atlassian-frontend/commits/4b4dcfe0bba) - Delete adf-schema, use published version

## 0.4.1

### Patch Changes

- Updated dependencies

## 0.4.0

### Minor Changes

- [#39325](https://bitbucket.org/atlassian/atlassian-frontend/pull-requests/39325) [`ad3c5c21079`](https://bitbucket.org/atlassian/atlassian-frontend/commits/ad3c5c21079) - Updating all plugins with minor version to correct issue with semver.

### Patch Changes

- Updated dependencies

## 0.3.5

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

## 0.3.4

### Patch Changes

- [#39177](https://bitbucket.org/atlassian/atlassian-frontend/pull-requests/39177) [`24e27147cbd`](https://bitbucket.org/atlassian/atlassian-frontend/commits/24e27147cbd) - Added atlaskit docs to all existing plugins.

## 0.3.3

### Patch Changes

- [#38976](https://bitbucket.org/atlassian/atlassian-frontend/pull-requests/38976) [`33cb07de05f`](https://bitbucket.org/atlassian/atlassian-frontend/commits/33cb07de05f) - change adf-schema to fixed versioning

## 0.3.2

### Patch Changes

- [#38495](https://bitbucket.org/atlassian/atlassian-frontend/pull-requests/38495) [`24fc3925d73`](https://bitbucket.org/atlassian/atlassian-frontend/commits/24fc3925d73) - Add a new hook called `usePreset` accesed via `@atlaskit/editor-core/use-preset`. This hook can be used to safely access state and commands from outside the editor using `EditorContext`.
- Updated dependencies

## 0.3.1

### Patch Changes

- Updated dependencies

## 0.3.0

### Minor Changes

- [#38001](https://bitbucket.org/atlassian/atlassian-frontend/pull-requests/38001) [`a675f834911`](https://bitbucket.org/atlassian/atlassian-frontend/commits/a675f834911) - Introduce `commands` optional parameter to `NextEditorPlugin`. It can be used similarly to `actions` in `NextEditorPlugin` but `commands` must adhere to the type of `PluginCommand`:

  ```ts
  type PluginCommand = ({ tr }: { tr: Transaction }) => Transaction | null;
  ```

  `PluginCommand`s are specifically used for code that is executed to modify a Transaction. They should be used in preference to the existing prosemirror `Command` type.

### Patch Changes

- Updated dependencies

## 0.2.4

### Patch Changes

- Updated dependencies

## 0.2.3

### Patch Changes

- Updated dependencies

## 0.2.2

### Patch Changes

- [#37650](https://bitbucket.org/atlassian/atlassian-frontend/pull-requests/37650) [`d8c1bcdc71a`](https://bitbucket.org/atlassian/atlassian-frontend/commits/d8c1bcdc71a) - ED-19217 decoupled lists related util functions from editor-core
- Updated dependencies

## 0.2.1

### Patch Changes

- [#37785](https://bitbucket.org/atlassian/atlassian-frontend/pull-requests/37785) [`4e6f1bf8511`](https://bitbucket.org/atlassian/atlassian-frontend/commits/4e6f1bf8511) - [ED-19233] Import prosemirror libraries from internal facade package

## 0.2.0

### Minor Changes

- [#37010](https://bitbucket.org/atlassian/atlassian-frontend/pull-requests/37010) [`8e084d87da5`](https://bitbucket.org/atlassian/atlassian-frontend/commits/8e084d87da5) - Remove deprecated hyperlink commands and plugin key including:

  - isTextAtPos
  - isLinkAtPos
  - insertLink
  - insertLinkWithAnalyticsMobileNative
  - insertLinkWithAnalytics
  - updateLink
  - hyperlinkStateKey

  If you require `isTextAtPos` or `isLinkAtPos` these can be accessed via `editor-common`:

  ```ts
  import { isTextAtPos, isLinkAtPos } from '@atlaskit/editor-common/link`;
  ```

  If you require `insertLink`, `updateLink`, or `hyperlinkStateKey` you can access these via the new composable editor using a custom plugin. Here is an example:

  ```ts
  import { Editor } from '@atlaskit/editor-core/composable-editor';
  import { EditorProps } from '@atlaskit/editor-core';
  import { useUniversalPreset } from '@atlaskit/editor-core/preset-universal';
  import type { NextEditorPlugin } from '@atlaskit/editor-common/types';
  import type { hyperlinkPlugin } from '@atlaskit/editor-plugin-hyperlink';

  const customPlugin: NextEditorPlugin<'custom', {
      dependencies: [typeof hyperlinkPlugin]
  }> = (_, api) => {
      // Can access insertLink and updateLink here
      api?.dependencies.hyperlink.actions.insertLink( ... )
      api?.dependencies.hyperlink.actions.updateLink( ... )


      // Rather than using the `hyperlinkStateKey` you can access via `sharedState`
      api?.dependencies.hyperlink.sharedState.onChange(({ nextSharedState }) => {
          // subscribe to changes
      })
      // OR for current value
      api?.dependencies.hyperlink.sharedState.currentState()

      return {
          name: 'custom'
      }
  }

  // This function is the equivalent of `Editor` from `editor-core`
  function EditorWrapped(props: EditorProps) {
      const preset = useUniversalPreset(props).add(customPlugin)
      return <Editor preset={preset} ... />
  }
  ```

  Note: By default `insertLink` via this interface is `insertLinkWithAnalytics`, however if you want to disable analytics disable them via the `EditorProps` and if you want to run `insertLinkWithAnalyticsMobileNative` pass `cardsAvailable` parameter as `false` (default).
