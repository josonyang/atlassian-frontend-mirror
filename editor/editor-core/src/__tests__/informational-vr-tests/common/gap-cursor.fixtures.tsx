import React from 'react';

import { createDefaultPreset } from '@atlaskit/editor-core/preset-default';
import { layoutPlugin } from '@atlaskit/editor-plugins/layout';
import { mentionsPlugin } from '@atlaskit/editor-plugins/mentions';
import { rulePlugin } from '@atlaskit/editor-plugins/rule';
import { statusPlugin } from '@atlaskit/editor-plugins/status';
import { tasksAndDecisionsPlugin } from '@atlaskit/editor-plugins/tasks-and-decisions';
import { mentionResourceProvider } from '@atlaskit/util-data-test/mention-story-data';

import { ComposableEditor } from '../../../composable-editor';
import { Editor } from '../../../index';
import gapcursor from '../../visual-regression/common/__fixtures__/gap-cursor-adf.json';
import gapcursorLayout from '../../visual-regression/common/__fixtures__/gap-cursor-layout-adf.json';

export function EditorGapCursorDefault() {
  return (
    <Editor
      defaultValue={gapcursor}
      allowTables={{ advanced: true }}
      allowPanel
      appearance="full-page"
    />
  );
}

export function EditorGapCursorLayout() {
  const preset = createDefaultPreset({
    base: { allowScrollGutter: undefined },
    paste: {},
  })
    .add(rulePlugin)
    .add(layoutPlugin)
    .add(mentionsPlugin)
    .add(tasksAndDecisionsPlugin)
    .add(statusPlugin);

  return (
    <ComposableEditor
      defaultValue={gapcursorLayout}
      appearance="full-page"
      preset={preset}
      mentionProvider={Promise.resolve(mentionResourceProvider)}
    />
  );
}
