import { EditorState } from 'prosemirror-state';
import {
  findParentNodeOfType,
  findSelectedNodeOfType,
} from 'prosemirror-utils';

import { createEditorFactory } from '@atlaskit/editor-test-helpers/create-editor';
import {
  dataConsumer,
  doc,
  DocBuilder,
  extension,
  fragmentMark,
  p,
} from '@atlaskit/editor-test-helpers/doc-builder';

import { setNodeSelection } from '../index';
import { removeConnectedNodes } from '../referentiality';

export const getSelectedExtension = (
  state: EditorState,
  searchParent: boolean = false,
) => {
  const { inlineExtension, extension, bodiedExtension } = state.schema.nodes;
  const nodeTypes = [extension, bodiedExtension, inlineExtension];
  return (
    findSelectedNodeOfType(nodeTypes)(state.selection) ||
    (searchParent && findParentNodeOfType(nodeTypes)(state.selection)) ||
    undefined
  );
};

describe('Referentiality API', () => {
  const createEditor = createEditorFactory();
  const editor = (doc: DocBuilder) => {
    const instance = createEditor({
      doc,
      editorProps: {
        allowExtension: true,
        allowTables: {
          advanced: true,
        },
        allowFragmentMark: true,
        allowStatus: true,
      },
    });

    return instance;
  };

  describe('removeConnectedNodes', () => {
    it('should delete all related extension', () => {
      const { editorView } = editor(
        doc(
          p('hello'),
          fragmentMark({ localId: 'frag_A1', name: 'Ext A1' })(
            extension({
              localId: 'id_A1',
              extensionType: 'com.atlassian.extensions.extension',
              extensionKey: 'A1',
              parameters: {},
            })(),
          ),
          fragmentMark({ localId: 'frag_B1', name: 'Ext B1' })(
            dataConsumer({ sources: ['frag_A1'] })(
              extension({
                localId: 'id_B1',
                extensionType: 'com.atlassian.extensions.extension',
                extensionKey: 'B1',
                parameters: {},
              })(),
            ),
          ),
          fragmentMark({ localId: 'frag_C1', name: 'Ext C1' })(
            dataConsumer({ sources: ['frag_A1'] })(
              extension({
                localId: 'id_C1',
                extensionType: 'com.atlassian.extensions.extension',
                extensionKey: 'C1',
                parameters: {},
              })(),
            ),
          ),
        ),
      );
      const positionOfDeletingNode = 7;

      setNodeSelection(editorView, positionOfDeletingNode);
      const extensionObj = getSelectedExtension(editorView.state, true);

      editorView.dispatch(
        removeConnectedNodes(editorView.state, extensionObj?.node),
      );
      expect(editorView.state.doc).toEqualDocument(doc(p('hello')));
    });

    it('should NOT delete extension not connected', () => {
      const { editorView } = editor(
        doc(
          p('hello'),
          fragmentMark({ localId: 'frag_A1', name: 'Ext A1' })(
            extension({
              localId: 'id_A1',
              extensionType: 'com.atlassian.extensions.extension',
              extensionKey: 'A1',
              parameters: {},
            })(),
          ),
          fragmentMark({ localId: 'frag_B1', name: 'Ext B1' })(
            extension({
              localId: 'id_B1',
              extensionType: 'com.atlassian.extensions.extension',
              extensionKey: 'B1',
              parameters: {},
            })(),
          ),
          fragmentMark({ localId: 'frag_C1', name: 'Ext C1' })(
            dataConsumer({ sources: ['frag_B1'] })(
              extension({
                localId: 'id_C1',
                extensionType: 'com.atlassian.extensions.extension',
                extensionKey: 'C1',
                parameters: {},
              })(),
            ),
          ),
        ),
      );
      const positionOfDeletingNode = 7;

      setNodeSelection(editorView, positionOfDeletingNode);
      const extensionObj = getSelectedExtension(editorView.state, true);

      editorView.dispatch(
        removeConnectedNodes(editorView.state, extensionObj?.node),
      );

      expect(editorView.state.doc).toEqualDocument(
        doc(
          p('hello'),
          fragmentMark({ localId: 'frag_B1', name: 'Ext B1' })(
            extension({
              localId: 'id_B1',
              extensionType: 'com.atlassian.extensions.extension',
              extensionKey: 'B1',
              parameters: {},
            })(),
          ),
          fragmentMark({ localId: 'frag_C1', name: 'Ext C1' })(
            dataConsumer({ sources: ['frag_B1'] })(
              extension({
                localId: 'id_C1',
                extensionType: 'com.atlassian.extensions.extension',
                extensionKey: 'C1',
                parameters: {},
              })(),
            ),
          ),
        ),
      );
    });
  });

  // describe('getChildrenInfo', () => {
  // TODO: write tests which validate this functionality via the public API
  // });
});
