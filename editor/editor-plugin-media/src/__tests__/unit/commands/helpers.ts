// eslint-disable-next-line import/no-extraneous-dependencies -- Removed import for fixing circular dependencies
import {
  doc,
  media,
  mediaGroup,
  mediaSingle,
} from '@atlaskit/editor-test-helpers/doc-builder';
// eslint-disable-next-line import/no-extraneous-dependencies -- Removed import for fixing circular dependencies
import {
  testMediaGroup,
  testMediaSingle,
} from '@atlaskit/editor-test-helpers/media-mock';

import {
  findAllMediaSingleNodes,
  findMediaSingleNode,
} from '../../../commands/helpers';
import type { MediaPluginState } from '../../../pm-plugins/types';
import { mediaEditor, testCollectionName } from '../_utils';

const mediaImageSingle = media({
  id: testMediaSingle.id,
  type: 'file',
  collection: testCollectionName,
})();

const mediaImageGroup = media({
  id: testMediaGroup.id,
  type: 'file',
  collection: testCollectionName,
})();

describe('Media commands helpers', () => {
  let pluginState: MediaPluginState;

  beforeEach(() => {
    ({ pluginState } = mediaEditor(
      doc(
        mediaSingle({
          layout: 'center',
        })(mediaImageSingle),
        mediaSingle({
          layout: 'center',
        })(mediaImageSingle),
        mediaGroup(mediaImageGroup),
      ),
    ));
  });

  describe('Find media node', () => {
    it('should find media single node', () => {
      const node = findMediaSingleNode(pluginState, testMediaSingle.id);

      expect(node).not.toBeNull();
    });

    it('should find first stored media single node (We stored in reverse order)', () => {
      const node = findMediaSingleNode(pluginState, testMediaSingle.id);

      expect(node!.getPos()).toBe(4);
    });

    it('does not support media group node', () => {
      const node = findMediaSingleNode(pluginState, testMediaGroup.id);
      expect(node).toBeNull();
    });
  });

  describe('Find all media single nodes', () => {
    it('should find all two media single nodes', () => {
      const nodes = findAllMediaSingleNodes(pluginState, testMediaSingle.id);

      expect(nodes).toHaveLength(2);
    });

    it('should return it in inverse order', () => {
      const nodes = findAllMediaSingleNodes(pluginState, testMediaSingle.id);

      expect(nodes.map(({ getPos }) => getPos())).toEqual([4, 1]);
    });
  });
});
