import type { Node } from '@atlaskit/editor-prosemirror/model';
import { Fragment, Slice } from '@atlaskit/editor-prosemirror/model';
// eslint-disable-next-line import/no-extraneous-dependencies -- Removed import for fixing circular dependencies
import {
  clean,
  code_block,
  layoutColumn,
  layoutSection,
  p,
} from '@atlaskit/editor-test-helpers/doc-builder';
// eslint-disable-next-line import/no-extraneous-dependencies -- Removed import for fixing circular dependencies
import defaultSchema from '@atlaskit/editor-test-helpers/schema';

import { transformSliceToJoinAdjacentCodeBlocks } from '../../utils';

const fragment = (...args: any) =>
  Fragment.from(args.map((i: any) => clean(i)(defaultSchema)) as Node[]);

describe('codeBlock utils', () => {
  describe('transformSliceToJoinAdjacentCodeBlocks', () => {
    it('should join adjacent code-blocks in a slice with a newline', () => {
      const slice = new Slice(
        fragment(
          code_block({ langauge: 'javascript' })('hello world'),
          code_block()('goodbye world'),
        ),
        0,
        0,
      );
      expect(transformSliceToJoinAdjacentCodeBlocks(slice)).toEqual(
        new Slice(
          fragment(
            code_block({ langauge: 'javascript' })(
              'hello world\ngoodbye world',
            ),
          ),
          0,
          0,
        ),
      );
    });

    it('should not join code-blocks when they are not adjacent', () => {
      const slice = new Slice(
        fragment(
          code_block()('hello world'),
          p('gap'),
          code_block()('goodbye world'),
        ),
        0,
        0,
      );
      expect(transformSliceToJoinAdjacentCodeBlocks(slice)).toEqual(slice);
    });

    it('should join nested adjacent code-blocks in a slice with a newline', () => {
      const slice = new Slice(
        fragment(
          layoutSection(
            layoutColumn({ width: 50 })(
              code_block()('hello world'),
              code_block()('goodbye world'),
            ),
            layoutColumn({ width: 50 })(
              code_block()('left'),
              code_block()('right'),
            ),
          ),
        ),
        0,
        0,
      );
      expect(transformSliceToJoinAdjacentCodeBlocks(slice)).toEqual(
        new Slice(
          fragment(
            layoutSection(
              layoutColumn({ width: 50 })(
                code_block()('hello world\ngoodbye world'),
              ),
              layoutColumn({ width: 50 })(code_block()('left\nright')),
            ),
          ),
          0,
          0,
        ),
      );
    });
  });
});
