import {
  doc,
  ul,
  li,
  mediaSingle,
  media,
  DocBuilder,
  alignment,
  a as link,
} from '@atlaskit/editor-test-helpers/doc-builder';
import {
  createProsemirrorEditorFactory,
  LightEditorPlugin,
  Preset,
} from '@atlaskit/editor-test-helpers/create-prosemirror-editor';
import listPlugin from '../../../plugins/list';
import basePlugin from '../../../plugins/base';
import mediaPlugin from '../../../plugins/media';
import widthPlugin from '../../../plugins/width';
import gridPlugin from '../../../plugins/grid';

import hyperlinkPlugin from '../../../plugins/hyperlink';
import alignmentPlugin from '../../../plugins/alignment';
import featureFlagsPlugin from '@atlaskit/editor-plugin-feature-flags';
import { analyticsPlugin } from '@atlaskit/editor-plugin-analytics';

import { createWrappingJoinRule } from '../../input-rules';

describe('createWrappingJoinRule()', () => {
  const createEditor = createProsemirrorEditorFactory();
  const editor = (doc: DocBuilder) => {
    const editorTemp = createEditor({
      doc,
      preset: new Preset<LightEditorPlugin>()
        .add([featureFlagsPlugin, {}])
        .add([analyticsPlugin, {}])
        .add(basePlugin)
        .add(listPlugin)
        .add(hyperlinkPlugin)
        .add(alignmentPlugin)
        .add(widthPlugin)
        .add(gridPlugin)
        .add([mediaPlugin, { allowMediaSingle: true }]),
    });
    return editorTemp;
  };

  describe('with a mediaSingle node', () => {
    describe('without marks', () => {
      it('should wrap in a list', () => {
        const { editorView } = editor(
          // prettier-ignore
          doc(
          mediaSingle()(
            media({
              id: 'a559980d-cd47-43e2-8377-27359fcb905f',
              type: 'file',
              collection: 'MediaServicesSample',
            })(),
          ),
        ),
        );
        const {
          state: {
            schema: {
              nodes: { bulletList },
            },
          },
          state,
        } = editorView;
        const { handler } = createWrappingJoinRule({
          match: new RegExp(''),
          nodeType: bulletList,
        });
        const matchResult = /(\w)/.exec('a');
        const tr = handler(state, matchResult!, 1, 1);
        expect(tr!.doc).toEqualDocument(
          // prettier-ignore
          doc(
          ul(
            li(
              mediaSingle()(
                media({
                  id: 'a559980d-cd47-43e2-8377-27359fcb905f',
                  type: 'file',
                  collection: 'MediaServicesSample',
                })(),
              ),
            ),
          ),
        ),
        );
      });
    });
    describe('with a link mark', () => {
      it('should wrap in a list and keep link mark', () => {
        const { editorView } = editor(
          // prettier-ignore
          doc(
            mediaSingle()(
              link({ href: 'http://www.atlassian.com' })(
                media({
                  id: 'a559980d-cd47-43e2-8377-27359fcb905f',
                  type: 'file',
                  collection: 'MediaServicesSample',
                })(),
              ),
            ),
          ),
        );
        const {
          state: {
            schema: {
              nodes: { bulletList },
            },
          },
          state,
        } = editorView;
        const { handler } = createWrappingJoinRule({
          match: new RegExp(''),
          nodeType: bulletList,
        });
        const matchResult = /(\w)/.exec('a');
        const tr = handler(state, matchResult!, 1, 1);
        expect(tr!.doc).toEqualDocument(
          // prettier-ignore
          doc(
          ul(
            li(
                mediaSingle()(
                  link({ href: 'http://www.atlassian.com' })(
                    media({
                      id: 'a559980d-cd47-43e2-8377-27359fcb905f',
                      type: 'file',
                      collection: 'MediaServicesSample',
                    })(),
                  ),
                ),
              ),
            ),
          ),
        );
      });
    });
    describe('with link and alignment marks', () => {
      it('should wrap in a list and remove the alignment mark', () => {
        const { editorView } = editor(
          // prettier-ignore
          doc(
          alignment({ align: 'center' })(
              mediaSingle()(
                link({ href: 'http://www.atlassian.com' })(
                  media({
                    id: 'a559980d-cd47-43e2-8377-27359fcb905f',
                    type: 'file',
                    collection: 'MediaServicesSample',
                  })(),
                ),
              ),
            ),
          ),
        );
        const {
          state: {
            schema: {
              nodes: { bulletList },
            },
          },
          state,
        } = editorView;
        const { handler } = createWrappingJoinRule({
          match: new RegExp(''),
          nodeType: bulletList,
        });
        const matchResult = /(\w)/.exec('a');
        const tr = handler(state, matchResult!, 1, 1);
        expect(tr!.doc).toEqualDocument(
          // prettier-ignore
          doc(
          ul(
            li(
                mediaSingle()(
                  link({ href: 'http://www.atlassian.com' })(
                    media({
                      id: 'a559980d-cd47-43e2-8377-27359fcb905f',
                      type: 'file',
                      collection: 'MediaServicesSample',
                    })(),
                  ),
                ),
              ),
            ),
          ),
        );
      });
    });
  });
});
