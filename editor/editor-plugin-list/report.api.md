<!-- API Report Version: 2.3 -->

## API Report File for "@atlaskit/editor-plugin-list"

> Do not edit this file. This report is auto-generated using [API Extractor](https://api-extractor.com/).
> [Learn more about API reports](https://hello.atlassian.net/wiki/spaces/UR/pages/1825484529/Package+API+Reports)

### Table of contents

- [Main Entry Types](#main-entry-types)
- [Peer Dependencies](#peer-dependencies)

### Main Entry Types

<!--SECTION START: Main Entry Types-->

```ts
import type { AnalyticsPlugin } from '@atlaskit/editor-plugin-analytics';
import type { DecorationSet } from '@atlaskit/editor-prosemirror/view';
import type { EditorCommand } from '@atlaskit/editor-common/types';
import type { FeatureFlags } from '@atlaskit/editor-common/types';
import type { FeatureFlagsPlugin } from '@atlaskit/editor-plugin-feature-flags';
import type { INPUT_METHOD } from '@atlaskit/editor-common/analytics';
import type { NextEditorPlugin } from '@atlaskit/editor-common/types';
import type { OptionalPlugin } from '@atlaskit/editor-common/types';
import type { ResolvedPos } from '@atlaskit/editor-prosemirror/model';
import type { Transaction } from '@atlaskit/editor-prosemirror/state';

// @public (undocumented)
export type FindRootParentListNode = ($pos: ResolvedPos) => ResolvedPos | null;

// @public (undocumented)
type IndentList = (inputMethod: InputMethod) => EditorCommand;

// @public (undocumented)
export type InputMethod = INPUT_METHOD.KEYBOARD | INPUT_METHOD.TOOLBAR;

// @public (undocumented)
type IsInsideListItem = (tr: Transaction) => boolean;

// @public (undocumented)
export type ListPlugin = NextEditorPlugin<
  'list',
  {
    pluginConfiguration: ListPluginOptions | undefined;
    dependencies: [FeatureFlagsPlugin, OptionalPlugin<AnalyticsPlugin>];
    actions: {
      isInsideListItem: IsInsideListItem;
      findRootParentListNode: FindRootParentListNode;
    };
    commands: {
      indentList: IndentList;
      outdentList: OutdentList;
      toggleOrderedList: ToggleOrderedList;
      toggleBulletList: ToggleBulletList;
    };
    sharedState: ListState | undefined;
  }
>;

// @public
export const listPlugin: ListPlugin;

// @public (undocumented)
export type ListPluginOptions = Pick<FeatureFlags, 'restartNumberedLists'>;

// @public (undocumented)
export interface ListState {
  // (undocumented)
  bulletListActive: boolean;
  // (undocumented)
  bulletListDisabled: boolean;
  // (undocumented)
  decorationSet: DecorationSet;
  // (undocumented)
  orderedListActive: boolean;
  // (undocumented)
  orderedListDisabled: boolean;
}

// @public (undocumented)
type OutdentList = (inputMethod: InputMethod) => EditorCommand;

// @public (undocumented)
type ToggleBulletList = (inputMethod: InputMethod) => EditorCommand;

// @public (undocumented)
type ToggleOrderedList = (inputMethod: InputMethod) => EditorCommand;

// (No @packageDocumentation comment for this package)
```

<!--SECTION END: Main Entry Types-->

### Peer Dependencies

<!--SECTION START: Peer Dependencies-->

```json
{
  "react": "^16.8.0",
  "react-intl-next": "npm:react-intl@^5.18.1"
}
```

<!--SECTION END: Peer Dependencies-->