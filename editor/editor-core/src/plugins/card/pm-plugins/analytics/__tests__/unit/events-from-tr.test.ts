import { Fragment, Slice } from 'prosemirror-model';

import { addLinkMetadata } from '@atlaskit/editor-common/card';
import { ACTION, INPUT_METHOD } from '@atlaskit/editor-common/analytics';
import { createEditorState } from '@atlaskit/editor-test-helpers/create-editor-state';
import {
  doc,
  p,
  a,
  inlineCard,
} from '@atlaskit/editor-test-helpers/doc-builder';

import { queueCardsFromChangedTr } from '../../../doc';
import { findChangedLinks } from '../../events-from-tr';

describe('findChangedLinks', () => {
  it('should find 1 inserted link when inserting into the document into a position that is not already a link', () => {
    const href = 'https://atlassian.com';
    const state = createEditorState(doc(p('{}')));

    const tr = state.tr;
    const linkFragment = Fragment.from(a({ href })(href)(state.schema));
    tr.insert(0, linkFragment);

    const { inserted, removed, updated } = findChangedLinks(tr, state);

    expect(inserted).toHaveLength(1);
    expect(removed).toHaveLength(0);
    expect(updated).toHaveLength(0);
  });

  it('should find 1 removed link when replacing a range that includes a an entire link', () => {
    const href = 'https://atlassian.com';
    const state = createEditorState(doc(p(a({ href })(href))));

    const tr = state.tr;
    const slice = new Slice(
      Fragment.from(p('Hello world')(state.schema)),
      0,
      0,
    );
    tr.replaceRange(0, state.doc.content.size, slice);

    const { inserted, removed, updated } = findChangedLinks(tr, state);

    expect(inserted).toHaveLength(0);
    expect(removed).toHaveLength(1);
    expect(updated).toHaveLength(0);
  });

  it('should consider any links to be created/updated/deleted when part of the link is modified', () => {
    const href = 'https://atlassian.com';
    const state = createEditorState(doc(p(a({ href })(href))));

    const tr = state.tr;
    const slice = new Slice(
      Fragment.from(p('Hello world')(state.schema)),
      0,
      0,
    );
    tr.replaceRange(5, state.doc.content.size, slice);

    const { inserted, removed, updated } = findChangedLinks(tr, state);

    expect(inserted).toHaveLength(0);
    expect(removed).toHaveLength(0);
    expect(updated).toHaveLength(0);
  });

  it('should find 1 inserted link and 1 deleted link when replacing a range that includes an entire link, with another link', () => {
    const href = 'https://atlassian.com';
    const state = createEditorState(doc(p(a({ href })(href))));

    const tr = state.tr;
    const slice = new Slice(
      Fragment.from(p(a({ href })(href))(state.schema)),
      0,
      0,
    );
    tr.replaceRange(0, state.doc.content.size, slice);

    const { inserted, removed, updated } = findChangedLinks(tr, state);

    expect(inserted).toHaveLength(1);
    expect(removed).toHaveLength(1);
    expect(updated).toHaveLength(0);
  });

  it('should find 1 inserted link and 2 deleted links when replacing a range that includes 2 entire links, with another link', () => {
    const href = 'https://atlassian.com';
    const state = createEditorState(
      doc(p(a({ href })(href), ' some more text ', a({ href })(href))),
    );

    const tr = state.tr;
    const slice = new Slice(
      Fragment.from(p(a({ href })(href))(state.schema)),
      0,
      0,
    );
    tr.replaceRange(0, state.doc.content.size, slice);

    const { inserted, removed, updated } = findChangedLinks(tr, state);

    expect(inserted).toHaveLength(1);
    expect(removed).toHaveLength(2);
    expect(updated).toHaveLength(0);
  });

  it('should find 2 inserted links and 2 deleted links when replacing a range that includes 2 entire links, with a slice that contains 2 links', () => {
    const href = 'https://atlassian.com';
    const state = createEditorState(
      doc(p(a({ href })(href), ' some more text ', a({ href })(href))),
    );

    const tr = state.tr;
    const slice = new Slice(
      Fragment.from(
        p(
          inlineCard({ url: href })(),
          ' some more text ',
          inlineCard({ url: href })(),
        )(state.schema),
      ),
      0,
      0,
    );
    tr.replaceRange(0, state.doc.content.size, slice);

    const { inserted, removed, updated } = findChangedLinks(tr, state);

    expect(inserted).toHaveLength(2);
    expect(removed).toHaveLength(2);
    expect(updated).toHaveLength(0);
  });

  describe('updates', () => {
    it('should find 2 updated links when replacing a range that includes 2 entire links, with a slice that contains 2 links and is marked as an update', () => {
      const href = 'https://atlassian.com';
      const state = createEditorState(
        doc(p(a({ href })(href), ' some more text ', a({ href })(href))),
      );

      const tr = state.tr;
      const slice = new Slice(
        Fragment.from(
          p(
            inlineCard({ url: href })(),
            ' some more text ',
            inlineCard({ url: href })(),
          )(state.schema),
        ),
        0,
        0,
      );

      tr.replaceRange(0, state.doc.content.size, slice);

      addLinkMetadata(state.selection, tr, {
        action: ACTION.UPDATED,
      });

      const { inserted, removed, updated } = findChangedLinks(tr, state);

      expect(inserted).toHaveLength(0);
      expect(removed).toHaveLength(0);
      expect(updated).toHaveLength(2);
    });

    it('should find no changes if inserted link positons are queued for upgrade', () => {
      const href = 'https://atlassian.com';
      const state = createEditorState(
        doc(p(a({ href })(href), ' some more text ', a({ href })(href))),
      );

      const tr = state.tr;

      const slice = new Slice(
        Fragment.from(
          p(
            a({ href })(href),
            ' some more text ',
            a({ href })(href),
          )(state.schema),
        ),
        0,
        0,
      );

      tr.replaceRange(0, state.doc.content.size, slice);

      queueCardsFromChangedTr(
        state,
        tr,
        INPUT_METHOD.FLOATING_TB,
        ACTION.UPDATED,
      );

      const { inserted, removed, updated } = findChangedLinks(tr, state);

      expect(inserted).toHaveLength(0);
      expect(removed).toHaveLength(0);
      expect(updated).toHaveLength(0);
    });
  });
});