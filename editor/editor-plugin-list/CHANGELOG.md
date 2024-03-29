# @atlaskit/editor-plugin-list

## 1.3.6

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

## 1.3.5

### Patch Changes

- [#43417](https://bitbucket.org/atlassian/atlassian-frontend/pull-requests/43417) [`3f3c17f0273`](https://bitbucket.org/atlassian/atlassian-frontend/commits/3f3c17f0273) - ED-20971 Upgrade adf-schema package to ^34.0.0

## 1.3.4

### Patch Changes

- [#43379](https://bitbucket.org/atlassian/atlassian-frontend/pull-requests/43379) [`482c025520d`](https://bitbucket.org/atlassian/atlassian-frontend/commits/482c025520d) - ED-20763 Upgrade ADF schema version to 33.2.3 for MBE nodes.
- Updated dependencies

## 1.3.3

### Patch Changes

- Updated dependencies

## 1.3.2

### Patch Changes

- [#39749](https://bitbucket.org/atlassian/atlassian-frontend/pull-requests/39749) [`e6b69f455c3`](https://bitbucket.org/atlassian/atlassian-frontend/commits/e6b69f455c3) - Connect yarn changeset to packages, upgrade adf-schema

## 1.3.1

### Patch Changes

- Updated dependencies

## 1.3.0

### Minor Changes

- [#40238](https://bitbucket.org/atlassian/atlassian-frontend/pull-requests/40238) [`39ff0b0788c`](https://bitbucket.org/atlassian/atlassian-frontend/commits/39ff0b0788c) - [ux] [ED-19466] Solve bug where toggling off a bullet list when the list item contained text and a wrap (left or right) media node left the media node behind in the list and then joining the paragraph back to the list caused a position error.

  Also export toggleList function so it can be used in external tests.

## 1.2.4

### Patch Changes

- [#39984](https://bitbucket.org/atlassian/atlassian-frontend/pull-requests/39984) [`37c62369dae`](https://bitbucket.org/atlassian/atlassian-frontend/commits/37c62369dae) - NO-ISSUE Import doc builder types from editor-common

## 1.2.3

### Patch Changes

- Updated dependencies

## 1.2.2

### Patch Changes

- [#39481](https://bitbucket.org/atlassian/atlassian-frontend/pull-requests/39481) [`aeb5c9a01e8`](https://bitbucket.org/atlassian/atlassian-frontend/commits/aeb5c9a01e8) - Delete adf-schema from AFE and rely on npm package for adf-schema
- [`4b4dcfe0bba`](https://bitbucket.org/atlassian/atlassian-frontend/commits/4b4dcfe0bba) - Delete adf-schema, use published version

## 1.2.1

### Patch Changes

- [#39304](https://bitbucket.org/atlassian/atlassian-frontend/pull-requests/39304) [`6acf9830b36`](https://bitbucket.org/atlassian/atlassian-frontend/commits/6acf9830b36) - Update feature flags plugin
  (@atlaskit/editor-plugin-feature-flags) to use a named export
  rather than default export to match other plugins.

  ```ts
  // Before
  import featureFlagsPlugin from '@atlaskit/editor-plugin-feature-flags';

  // After
  import { featureFlagsPlugin } from '@atlaskit/editor-plugin-feature-flags';
  ```

- Updated dependencies

## 1.2.0

### Minor Changes

- [#39325](https://bitbucket.org/atlassian/atlassian-frontend/pull-requests/39325) [`ad3c5c21079`](https://bitbucket.org/atlassian/atlassian-frontend/commits/ad3c5c21079) - Updating all plugins with minor version to correct issue with semver.

### Patch Changes

- Updated dependencies

## 1.1.3

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

## 1.1.2

### Patch Changes

- [#39133](https://bitbucket.org/atlassian/atlassian-frontend/pull-requests/39133) [`67971a65d80`](https://bitbucket.org/atlassian/atlassian-frontend/commits/67971a65d80) - use fixed version for adf-schema

## 1.1.1

### Patch Changes

- [#39177](https://bitbucket.org/atlassian/atlassian-frontend/pull-requests/39177) [`24e27147cbd`](https://bitbucket.org/atlassian/atlassian-frontend/commits/24e27147cbd) - Added atlaskit docs to all existing plugins.

## 1.1.0

### Minor Changes

- [#39023](https://bitbucket.org/atlassian/atlassian-frontend/pull-requests/39023) [`4795a87a349`](https://bitbucket.org/atlassian/atlassian-frontend/commits/4795a87a349) - Migrating some actions of `editor-plugin-list` to commands. Adding sharedState for `editor-plugin-text-formatting`.

## 1.0.0

### Major Changes

- [#38881](https://bitbucket.org/atlassian/atlassian-frontend/pull-requests/38881) [`8e9c21af71d`](https://bitbucket.org/atlassian/atlassian-frontend/commits/8e9c21af71d) - Extracting list plugin code from editor-core to @atlaskit/editor-plugin-list.

### Patch Changes

- Updated dependencies

## 0.2.0

### Minor Changes

- [#38491](https://bitbucket.org/atlassian/atlassian-frontend/pull-requests/38491) [`5d6ec9ac49c`](https://bitbucket.org/atlassian/atlassian-frontend/commits/5d6ec9ac49c) - ED-19330 - decouple list plugin from editor-core
