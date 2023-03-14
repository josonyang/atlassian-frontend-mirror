import { runBlockNodeSelectionTestSuite } from '@atlaskit/editor-test-helpers/integration/selection';

runBlockNodeSelectionTestSuite({
  nodeName: 'blockquote',
  selector: 'blockquote',
  adfNode: {
    type: 'blockquote',
    content: [
      {
        type: 'paragraph',
        content: [],
      },
    ],
  },
  skipTests: {},
});
