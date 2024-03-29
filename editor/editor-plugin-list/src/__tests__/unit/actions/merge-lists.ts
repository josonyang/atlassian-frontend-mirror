// eslint-disable-next-line import/no-extraneous-dependencies -- Removed import for fixing circular dependencies
import { createEditorState } from '@atlaskit/editor-test-helpers/create-editor-state';
// eslint-disable-next-line import/no-extraneous-dependencies -- Removed import for fixing circular dependencies
import { doc, li, ol, p, ul } from '@atlaskit/editor-test-helpers/doc-builder';

import { mergeNextListAtPosition } from '../../../actions/merge-lists';

describe('list -> actions -> merge-lists', () => {
  it('should merge the current list selected with the next sibling', () => {
    // prettier-ignore
    const documentCase = doc(
      '{<>}',
      ul(
        li(
          p('A'),
        ),
      ),
      ul(
        li(
          p('B'),
        ),
      ),
    );
    // prettier-ignore
    const documentExpected = doc(
      ul(
        li(
          p('A'),
        ),
        li(
          p('B'),
        ),
      ),
    );
    const state = createEditorState(documentCase);
    const {
      tr,
      selection: { $from },
    } = state;

    mergeNextListAtPosition({ tr, listPosition: $from.pos });

    expect(tr.docChanged).toBe(true);
    expect(tr.doc).toEqualDocument(documentExpected);
  });

  describe('when the next list has a different type', () => {
    it('should merge and keep the the type of the sibling list ', () => {
      // prettier-ignore
      const documentCase = doc(
        '{<>}',
        ul(
          li(
            p('A'),
          ),
        ),
        ol()(
          li(
            p('B'),
          ),
        ),
      );
      // prettier-ignore
      const documentExpected = doc(
        ol()(
          li(
            p('A'),
          ),
          li(
            p('B'),
          ),
        ),
      );
      const state = createEditorState(documentCase);
      const {
        tr,
        selection: { $from },
      } = state;

      mergeNextListAtPosition({ tr, listPosition: $from.pos });

      expect(tr.docChanged).toBe(true);
      expect(tr.doc).toEqualDocument(documentExpected);
    });
  });
});
