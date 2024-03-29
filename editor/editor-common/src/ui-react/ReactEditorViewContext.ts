import React from 'react';

import { EditorView } from '@atlaskit/editor-prosemirror/view';

type ReactEditorViewContextProps = {
  editorView?: EditorView;
  editorRef?: React.RefObject<HTMLDivElement>;
};

const ReactEditorViewContext = React.createContext<ReactEditorViewContextProps>(
  {},
);

export default ReactEditorViewContext;
