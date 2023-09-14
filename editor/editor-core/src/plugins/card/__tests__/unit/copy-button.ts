import { _getCopyButtonTestSuite } from '../../../copy-button/__tests__/unit/_getCopyButtonTestSuite';
// eslint-disable-next-line import/no-extraneous-dependencies -- Removed import for fixing circular dependencies
import {
  doc,
  blockCard,
  embedCard,
} from '@atlaskit/editor-test-helpers/doc-builder';
// eslint-disable-next-line import/no-extraneous-dependencies -- Removed import for fixing circular dependencies
import { ConfluenceCardProvider } from '@atlaskit/editor-test-helpers/confluence-card-provider';

const cardProviderPromise = Promise.resolve(new ConfluenceCardProvider('prod'));

_getCopyButtonTestSuite({
  nodeType: 'blockCard',
  editorOptions: {
    smartLinks: {
      provider: cardProviderPromise,
      allowBlockCards: true,
      allowEmbeds: true,
    },
  },
  doc: doc(blockCard({ url: 'https://google.com' })()),
});

_getCopyButtonTestSuite({
  nodeType: 'embedCard',
  editorOptions: {
    smartLinks: {
      provider: cardProviderPromise,
      allowBlockCards: true,
      allowEmbeds: true,
    },
  },
  doc: doc(
    embedCard({
      url: 'https://some/url',
      layout: 'center',
      width: 100,
    })(),
  ),
});
