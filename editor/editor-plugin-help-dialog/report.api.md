<!-- API Report Version: 2.3 -->

## API Report File for "@atlaskit/editor-plugin-help-dialog"

> Do not edit this file. This report is auto-generated using
> [API Extractor](https://api-extractor.com/).
> [Learn more about API reports](https://hello.atlassian.net/wiki/spaces/UR/pages/1825484529/Package+API+Reports)

### Table of contents

- [Main Entry Types](#main-entry-types)
- [Peer Dependencies](#peer-dependencies)

### Main Entry Types

<!--SECTION START: Main Entry Types-->

```ts
import type { AnalyticsPlugin } from '@atlaskit/editor-plugin-analytics';
import type { NextEditorPlugin } from '@atlaskit/editor-common/types';
import type { OptionalPlugin } from '@atlaskit/editor-common/types';
import type { QuickInsertPlugin } from '@atlaskit/editor-plugin-quick-insert';
import type { Transaction } from '@atlaskit/editor-prosemirror/state';

// @public (undocumented)
export const deprecatedOpenHelpCommand: (tr: Transaction, dispatch?: Function) => boolean;

// @public (undocumented)
export type HelpDialogPlugin = NextEditorPlugin<
	'helpDialog',
	{
		dependencies: [OptionalPlugin<AnalyticsPlugin>, OptionalPlugin<QuickInsertPlugin>];
		pluginConfiguration: boolean;
		sharedState: HelpDialogSharedState | null;
	}
>;

// @public (undocumented)
export const helpDialogPlugin: HelpDialogPlugin;

// @public (undocumented)
export interface HelpDialogSharedState {
	// (undocumented)
	imageEnabled: boolean;
	// (undocumented)
	isVisible: boolean;
}

// (No @packageDocumentation comment for this package)
```

<!--SECTION END: Main Entry Types-->

### Peer Dependencies

<!--SECTION START: Peer Dependencies-->

```json
{
	"react": "^16.8.0"
}
```

<!--SECTION END: Peer Dependencies-->
