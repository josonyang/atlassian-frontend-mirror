import type { TableAttributes } from '@atlaskit/adf-schema';
import type { DocBuilder } from '@atlaskit/editor-common/types';
// eslint-disable-next-line import/no-extraneous-dependencies -- Removed import for fixing circular dependencies
import { analyticsPlugin } from '@atlaskit/editor-plugin-analytics';
import { contentInsertionPlugin } from '@atlaskit/editor-plugin-content-insertion';
import { featureFlagsPlugin } from '@atlaskit/editor-plugin-feature-flags';
import { guidelinePlugin } from '@atlaskit/editor-plugin-guideline';
import { selectionPlugin } from '@atlaskit/editor-plugin-selection';
import { widthPlugin } from '@atlaskit/editor-plugin-width';
import type { Node as PMNode } from '@atlaskit/editor-prosemirror/model';
import type { EditorView } from '@atlaskit/editor-prosemirror/view';
// eslint-disable-next-line import/no-extraneous-dependencies
import type { LightEditorPlugin } from '@atlaskit/editor-test-helpers/create-prosemirror-editor';
// eslint-disable-next-line import/no-extraneous-dependencies -- Removed import for fixing circular dependencies
import {
  createProsemirrorEditorFactory,
  Preset,
} from '@atlaskit/editor-test-helpers/create-prosemirror-editor';
// eslint-disable-next-line import/no-extraneous-dependencies -- Removed import for fixing circular dependencies
import {
  doc,
  p,
  table,
  td,
  tdCursor,
  tdEmpty,
  tr,
} from '@atlaskit/editor-test-helpers/doc-builder';
// eslint-disable-next-line import/no-extraneous-dependencies -- Removed import for fixing circular dependencies
import defaultSchema from '@atlaskit/editor-test-helpers/schema';

import tablePlugin from '../../../plugins/table';
import { hoverRows } from '../../../plugins/table/commands';
import TableView from '../../../plugins/table/nodeviews/table';
import { pluginKey } from '../../../plugins/table/pm-plugins/plugin-key';

describe('table -> nodeviews -> table.tsx', () => {
  const createEditor = createProsemirrorEditorFactory();
  const createTableNode =
    (attrs?: TableAttributes) =>
    (...args: any) =>
      table(attrs)(...args)(defaultSchema);

  describe('TableView', () => {
    const editor = (doc: DocBuilder) =>
      createEditor({
        doc,
        preset: new Preset<LightEditorPlugin>()
          .add([featureFlagsPlugin, {}])
          .add([analyticsPlugin, {}])
          .add(contentInsertionPlugin)
          .add(widthPlugin)
          .add(guidelinePlugin)
          .add(selectionPlugin)
          .add([
            tablePlugin,
            {
              tableOptions: {},
            },
          ]),
        pluginKey,
      });

    describe('on view update', () => {
      let tableNode: PMNode,
        tableNodeView: TableView,
        renderSpy: jest.SpyInstance,
        view: EditorView;
      beforeEach(() => {
        tableNode = createTableNode({
          isNumberColumnEnabled: true,
        })(tr(td()(p('{<>}text')), tdEmpty, tdEmpty));
        const { editorView, portalProviderAPI, eventDispatcher } = editor(
          doc(p('text'), table()(tr(tdCursor, tdEmpty), tr(tdEmpty, tdEmpty))),
        );
        view = editorView;
        tableNodeView = new TableView({
          node: tableNode,
          allowColumnResizing: false,
          view: editorView,
          portalProviderAPI,
          eventDispatcher,
          getPos: () => 1,
          getEditorContainerWidth: () => ({ width: 500 }),
          getEditorFeatureFlags: () => ({}),
          hasIntlContext: true,
        }).init();

        renderSpy = jest.spyOn(tableNodeView, 'render');
      });

      it('does not rerender if attributes or table width did not change', () => {
        const newNodeWithUnchangedAttributesOrWidth = createTableNode({
          isNumberColumnEnabled: true,
        })(tr(td()(p('{<>}text1')), tdEmpty, tdEmpty));
        tableNodeView.update(newNodeWithUnchangedAttributesOrWidth, []);
        expect(renderSpy).not.toHaveBeenCalled();
      });

      it('rerenders when table width changes', () => {
        const newNodeWithUnchangedAttributesAndExtraColumn = createTableNode({
          isNumberColumnEnabled: true,
        })(tr(td()(p('{<>}text1')), tdEmpty, tdEmpty, tdEmpty));
        tableNodeView.update(newNodeWithUnchangedAttributesAndExtraColumn, []);
        expect(renderSpy).toHaveBeenCalled();
      });

      it('rerenders when attributes change', () => {
        const newNodeWithChangedAttributes = createTableNode({
          isNumberColumnEnabled: false,
        })(tr(td()(p('{<>}text1')), tdEmpty));

        tableNodeView.update(newNodeWithChangedAttributes, []);
        expect(renderSpy).toHaveBeenCalled();
      });

      it('rerenders when hovered rows change but attributes dont change', () => {
        const newNodeWithUnchangedAttributes = createTableNode({
          isNumberColumnEnabled: true,
        })(tr(td()(p('{<>}text1')), tdEmpty));

        hoverRows([1])(view.state, view.dispatch);
        tableNodeView.update(newNodeWithUnchangedAttributes, []);
        expect(renderSpy).toHaveBeenCalled();
      });
    });
  });
});
