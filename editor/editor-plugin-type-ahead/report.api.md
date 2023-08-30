<!-- API Report Version: 2.3 -->

## API Report File for "@atlaskit/editor-plugin-type-ahead"

> Do not edit this file. This report is auto-generated using [API Extractor](https://api-extractor.com/).
> [Learn more about API reports](https://hello.atlassian.net/wiki/spaces/UR/pages/1825484529/Package+API+Reports)

### Table of contents

- [Main Entry Types](#main-entry-types)
- [Peer Dependencies](#peer-dependencies)

### Main Entry Types

<!--SECTION START: Main Entry Types-->

```ts
import type { CreateUIAnalyticsEvent } from '@atlaskit/analytics-next';
import type { EditorCommand } from '@atlaskit/editor-common/types';
import type { INPUT_METHOD } from '@atlaskit/editor-common/analytics';
import type { NextEditorPlugin } from '@atlaskit/editor-common/types';
import type { TypeAheadHandler } from '@atlaskit/editor-common/types';

// @public (undocumented)
type OpenTypeAheadAtCursorType = (props: Props) => EditorCommand;

// @public (undocumented)
type Props = {
  triggerHandler: TypeAheadHandler;
  inputMethod: TypeAheadInputMethod;
  query?: string;
};

// @public (undocumented)
export type TypeAheadInputMethod =
  | INPUT_METHOD.INSERT_MENU
  | INPUT_METHOD.KEYBOARD
  | INPUT_METHOD.QUICK_INSERT
  | INPUT_METHOD.TOOLBAR;

// @public
export type TypeAheadPlugin = NextEditorPlugin<
  'typeAhead',
  {
    pluginConfiguration: TypeAheadPluginOptions | undefined;
    commands: {
      openTypeAheadAtCursor: OpenTypeAheadAtCursorType;
    };
  }
>;

// @public (undocumented)
export type TypeAheadPluginOptions = {
  isMobile?: boolean;
  createAnalyticsEvent?: CreateUIAnalyticsEvent;
};

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