import { runInlineNodeViewTestSuite } from '../../../../../nodeviews/__tests__/integration/_getInlineNodeViewProducerTestSuite';

runInlineNodeViewTestSuite({
  nodeName: 'emoji',
  node: {
    type: 'emoji',
    attrs: {
      shortName: ':grinning:',
      id: '1f600',
      text: '😀',
    },
  },
  multiLineNode: false,
  skipTests: {
    // FIXME: This test was automatically skipped due to failure on Works when manually tested but sometimes flaky
    'Extend a selection to the end of the current line from the current position':
      //['firefox'], // Skipped in ED-17195
      ['*'],
  },
});
