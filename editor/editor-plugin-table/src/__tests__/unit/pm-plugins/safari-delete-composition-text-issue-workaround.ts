import {
  createProsemirrorEditorFactory,
  LightEditorPlugin,
  Preset,
} from '@atlaskit/editor-test-helpers/create-prosemirror-editor';
import {
  doc,
  DocBuilder,
  p,
  table,
  td,
  tr,
} from '@atlaskit/editor-test-helpers/doc-builder';
import { pluginKey } from '../../../plugins/table/pm-plugins/plugin-key';
import tablePlugin from '../../../plugins/table-plugin';
import { analyticsPlugin } from '@atlaskit/editor-plugin-analytics';
import featureFlagsPlugin from '@atlaskit/editor-plugin-feature-flags';
import { contentInsertionPlugin } from '@atlaskit/editor-plugin-content-insertion';

describe('table/safari-delete-composition-text-issue-workaround', () => {
  let editor: any;
  beforeEach(() => {
    const createEditor = createProsemirrorEditorFactory();
    editor = (doc: DocBuilder) =>
      createEditor({
        doc,
        preset: new Preset<LightEditorPlugin>()
          .add([featureFlagsPlugin, {}])
          .add([analyticsPlugin, {}])
          .add(contentInsertionPlugin)
          .add([tablePlugin, { tableOptions: { allowColumnResizing: true } }]),
        pluginKey,
      });
  });

  beforeAll(() => {
    const container = document.createTextNode('');
    //@ts-ignore
    jest.spyOn(window, 'getSelection').mockImplementation(() => ({
      type: 'Range',
      rangeCount: 1,
      getRangeAt: () => ({
        startContainer: container,
        endContainer: container,
        endOffset: 0,
        startOffset: 0,
      }),
    }));
  });

  afterAll(() => {
    (window.getSelection as jest.Mock).mockRestore();
  });

  it('should render empty span on beforeinput then remove it on input on safari', async () => {
    const { editorView: view } = editor(
      doc(table()(tr(td()(p('{<>}')), td()(p()), td()(p())))),
    );

    const beforeinputEvent = new InputEvent('beforeinput', {
      data: 'あああ',
      isComposing: true,
      inputType: 'deleteCompositionText',
    });

    view.dom.dispatchEvent(beforeinputEvent);

    const spanElement = view.dom.querySelector(
      'table tr td:nth-of-type(1) span',
    );

    expect(spanElement).toBeTruthy();
    expect(spanElement.tagName).toBe('SPAN');
    expect(spanElement.textContent).toBeFalsy();

    const inputEvent = new InputEvent('input', {
      data: 'あああ',
      isComposing: true,
      inputType: 'deleteCompositionText',
    });

    view.dom.dispatchEvent(inputEvent);

    const emptyElement = view.dom.querySelector(
      'table tr td:nth-of-type(1) span',
    );

    expect(emptyElement).toBeNull();
  });
});
