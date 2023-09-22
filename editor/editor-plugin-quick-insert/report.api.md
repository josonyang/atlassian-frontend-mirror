<!-- API Report Version: 2.3 -->

## API Report File for "@atlaskit/editor-plugin-quick-insert"

> Do not edit this file. This report is auto-generated using [API Extractor](https://api-extractor.com/).
> [Learn more about API reports](https://hello.atlassian.net/wiki/spaces/UR/pages/1825484529/Package+API+Reports)

### Table of contents

- [Main Entry Types](#main-entry-types)
- [Peer Dependencies](#peer-dependencies)

### Main Entry Types

<!--SECTION START: Main Entry Types-->

```ts
import type { Command } from '@atlaskit/editor-common/types';
import type { EditorCommand } from '@atlaskit/editor-common/types';
import type { NextEditorPlugin } from '@atlaskit/editor-common/types';
import type { QuickInsertItem } from '@atlaskit/editor-common/provider-factory';
import type { QuickInsertPluginOptions } from '@atlaskit/editor-common/types';
import type { QuickInsertSearchOptions } from '@atlaskit/editor-common/types';
import type { QuickInsertSharedState } from '@atlaskit/editor-common/types';

// @public (undocumented)
export type QuickInsertPlugin = NextEditorPlugin<
  'quickInsert',
  {
    pluginConfiguration: QuickInsertPluginOptions | undefined;
    sharedState: QuickInsertSharedState | null;
    actions: {
      insertItem: (item: QuickInsertItem) => Command;
      getSuggestions: (
        searchOptions: QuickInsertSearchOptions,
      ) => QuickInsertItem[];
    };
    commands: {
      openElementBrowserModal: EditorCommand;
    };
  }
>;

// @public (undocumented)
export const quickInsertPlugin: QuickInsertPlugin;

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