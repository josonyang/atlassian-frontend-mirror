import { createEditorFactory } from '@atlaskit/editor-test-helpers/create-editor';
import defaultSchema from '@atlaskit/editor-test-helpers/schema';
import {
  decisionItem,
  doc,
  p,
} from '@atlaskit/editor-test-helpers/doc-builder';

import { EventDispatcher } from '@atlaskit/editor-common/event-dispatcher';
import ReactNodeView from '@atlaskit/editor-common/react-node-view';

import { decisionItemNodeView } from '../../../../../plugins/tasks-and-decisions/nodeviews/decisionItem';

describe('Decision Item - NodeView', () => {
  const createEditor = createEditorFactory();
  const portalProviderAPI = { render() {}, remove() {} } as any;
  const eventDispatcher = {} as EventDispatcher;

  it('should render a contentDOM of `div` inside `li`', () => {
    const { editorView } = createEditor({
      doc: doc(p()),
    });
    const node = decisionItem()('this is the decision')(defaultSchema);

    const nodeView = decisionItemNodeView(portalProviderAPI, eventDispatcher)(
      node,
      editorView,
      () => -1,
    );

    if (nodeView instanceof ReactNodeView) {
      const contentDOM = nodeView.contentDOM as HTMLElement;

      expect(contentDOM.tagName).toBe('DIV');
      expect(contentDOM.parentElement!.tagName).toBe('LI');

      editorView.destroy();
      nodeView.destroy();
    }
  });
});
