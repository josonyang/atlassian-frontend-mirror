import React from 'react';

import { AtlassianInternalWarning, code, md } from '@atlaskit/docs';
import { createEditorUseOnlyNotice } from '@atlaskit/editor-core/docs/editor-use-only';
import { token } from '@atlaskit/tokens';

export default md`

${createEditorUseOnlyNotice('Editor Plugin Text Formatting', [
  { name: 'Editor Core', link: '/packages/editor/editor-core' },
])}


  ${(
    <div style={{ marginTop: token('space.100', '8px') }}>
      <AtlassianInternalWarning />
    </div>
  )}

  This package includes the text formatting plugin used by \`@atlaskit/editor-core\`.

  ## Usage
---

The \`dependencies\`, \`configuration\`, \`state\`, \`actions\`, and \`commands\` of the plugin are defined
below:  

${code`
type TextFormattingPlugin = NextEditorPlugin<
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
`}


  ## Support
---
For internal Atlassian, visit the slack channel [#help-editor](https://atlassian.slack.com/archives/CFG3PSQ9E) for support or visit [go/editor-help](https://go/editor-help) to submit a bug.
## License
---
 Please see [Atlassian Frontend - License](https://developer.atlassian.com/cloud/framework/atlassian-frontend/#license) for more licensing information.
`;