<!-- API Report Version: 2.3 -->

## API Report File for "@atlaskit/editor-plugin-text-formatting"

> Do not edit this file. This report is auto-generated using [API Extractor](https://api-extractor.com/).
> [Learn more about API reports](https://hello.atlassian.net/wiki/spaces/UR/pages/1825484529/Package+API+Reports)

### Table of contents

- [Main Entry Types](#main-entry-types)
- [Peer Dependencies](#peer-dependencies)

### Main Entry Types

<!--SECTION START: Main Entry Types-->

```ts
import type { analyticsPlugin } from '@atlaskit/editor-plugin-analytics';
import type { EditorCommand } from '@atlaskit/editor-common/types';
import type { InputMethodBasic } from '@atlaskit/editor-common/types';
import type { NextEditorPlugin } from '@atlaskit/editor-common/types';
import type { OptionalPlugin } from '@atlaskit/editor-common/types';
import type { TextFormattingOptions } from '@atlaskit/editor-common/types';
import type { TextFormattingState } from '@atlaskit/editor-common/types';

// @public (undocumented)
export type TextFormattingPlugin = NextEditorPlugin<
  'textFormatting',
  {
    pluginConfiguration: TextFormattingOptions | undefined;
    dependencies: [OptionalPlugin<typeof analyticsPlugin>];
    commands: {
      toggleSuperscript: ToggleMarkEditorCommand;
      toggleSubscript: ToggleMarkEditorCommand;
      toggleStrike: ToggleMarkEditorCommand;
      toggleCode: ToggleMarkEditorCommand;
      toggleUnderline: ToggleMarkEditorCommand;
      toggleEm: ToggleMarkEditorCommand;
      toggleStrong: ToggleMarkEditorCommand;
    };
    sharedState: TextFormattingState | undefined;
  }
>;

// @public
export const textFormattingPlugin: TextFormattingPlugin;

// @public (undocumented)
export type ToggleMarkEditorCommand = (
  inputMethod: InputMethodBasic,
) => EditorCommand;

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