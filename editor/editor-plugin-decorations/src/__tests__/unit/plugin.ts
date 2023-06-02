import type { NextEditorPlugin } from '@atlaskit/editor-common/types';
import {
  createProsemirrorEditorFactory,
  LightEditorPlugin,
  Preset,
} from '@atlaskit/editor-test-helpers/create-prosemirror-editor';
import {
  doc,
  DocBuilder,
  layoutColumn,
  layoutSection,
  mention,
  p,
  panel,
} from '@atlaskit/editor-test-helpers/doc-builder';

// TODO: These should be updated once we extract these plugins to separate packages
// eslint-disable-next-line @atlassian/tangerine/import/no-relative-package-imports
import layoutPlugin from '../../../../editor-core/src/plugins/layout';
// eslint-disable-next-line @atlassian/tangerine/import/no-relative-package-imports
import { deleteActiveLayoutNode } from '../../../../editor-core/src/plugins/layout/actions';
// eslint-disable-next-line @atlassian/tangerine/import/no-relative-package-imports
import mentionsPlugin from '../../../../editor-core/src/plugins/mentions';
// eslint-disable-next-line @atlassian/tangerine/import/no-relative-package-imports
import panelPlugin from '../../../../editor-core/src/plugins/panel';
import { decorationsPlugin } from '../../plugin';
import type { DecorationState } from '../../pm-plugin';

const ref: { current: any | null } = { current: null };

const mockPlugin: NextEditorPlugin<
  'test',
  { dependencies: [typeof decorationsPlugin] }
> = (_, api) => {
  ref.current = api;
  return {
    name: 'test',
  };
};

describe('decoration', () => {
  const createEditor = createProsemirrorEditorFactory();

  const editor = (doc: DocBuilder) => {
    return createEditor({
      doc,
      preset: new Preset<LightEditorPlugin>()
        .add(decorationsPlugin)
        .add(mockPlugin)
        .add(panelPlugin)
        .add(layoutPlugin)
        .add(mentionsPlugin),
    });
  };

  const getState = () => {
    return ref.current?.dependencies.decorations.sharedState.currentState();
  };

  const getHoverDecoration = () =>
    ref.current?.dependencies.decorations.actions ?? {};

  it('adds a decoration', () => {
    const { editorView } = editor(doc(panel()(p('he{<>}llo'))));
    const { dispatch } = editorView;

    getHoverDecoration().hoverDecoration?.(
      editorView.state.schema.nodes.panel,
      true,
    )(editorView.state, dispatch);
    const pluginState: DecorationState = getState();

    expect(pluginState.decoration).toBeDefined();
    expect(pluginState.decoration!.from).toBe(0);
  });

  it('adds decoration when node selection is set on the same node', () => {
    const { editorView } = editor(doc('{<node>}', panel()(p('hello'))));
    const { dispatch } = editorView;

    getHoverDecoration().hoverDecoration?.(
      editorView.state.schema.nodes.panel,
      true,
    )(editorView.state, dispatch);
    const pluginState: DecorationState = getState();

    expect(pluginState.decoration).toBeDefined();
    expect(pluginState.decoration!.from).toBe(0);
  });

  it('adds decoration to parent when node selection is set on a child node', () => {
    const helgaMention = mention({ id: '1234', text: '@helga' });
    const { editorView } = editor(doc(panel()(p('{<node>}', helgaMention()))));
    const { dispatch } = editorView;

    getHoverDecoration().hoverDecoration?.(
      editorView.state.schema.nodes.panel,
      true,
    )(editorView.state, dispatch);
    const pluginState: DecorationState = getState();

    expect(pluginState.decoration).toBeDefined();
    expect(pluginState.decoration!.from).toBe(0);
  });

  it('removes decoration when node is deleted from document', () => {
    const { editorView } = editor(
      doc(
        panel()(p('hello')),
        layoutSection(
          layoutColumn({ width: 50 })(p('{<>}')),
          layoutColumn({ width: 50 })(p('')),
        ),
      ),
    );

    const {
      dispatch,
      state: {
        schema: { nodes },
      },
    } = editorView;

    getHoverDecoration().hoverDecoration?.(nodes.layoutSection, true)(
      editorView.state,
      dispatch,
    );
    deleteActiveLayoutNode(editorView.state, dispatch);

    const pluginState = getState();
    expect(pluginState.decoration).toBeUndefined();
  });
});