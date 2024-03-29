// eslint-disable-next-line import/no-extraneous-dependencies -- Removed import for fixing circular dependencies
import {
  p,
  table,
  td,
  th,
  tr,
} from '@atlaskit/editor-test-helpers/doc-builder';
// eslint-disable-next-line import/no-extraneous-dependencies -- Removed import for fixing circular dependencies
import defaultSchema from '@atlaskit/editor-test-helpers/schema';
import { ffTest } from '@atlassian/feature-flags-test-utils';

import {
  generateColgroup,
  getColgroupChildrenLength,
} from '../../../../plugins/table/pm-plugins/table-resizing/utils';
import { isMinCellWidthTable } from '../../../../plugins/table/pm-plugins/table-resizing/utils/colgroup';

describe('table-resizing/colgroup', () => {
  describe('#generateColgroup', () => {
    describe('creates col with correct widths', () => {
      describe('based on colwidth cell attributes', () => {
        ffTest(
          'platform.editor.custom-table-width',
          () => {
            const result = generateColgroup(
              getTable([
                {
                  colwidth: [10],
                  colspan: 1,
                },
                {
                  colwidth: [20],
                  colspan: 1,
                },
              ]),
            );

            expect(result).toEqual([
              ['col', { style: 'width: 47.5px;' }],
              ['col', { style: 'width: 47.5px;' }],
            ]);
          },
          () => {
            const result = generateColgroup(
              getTable([
                {
                  colwidth: [10],
                  colspan: 1,
                },
                {
                  colwidth: [20],
                  colspan: 1,
                },
              ]),
            );

            expect(result).toEqual([
              ['col', { style: 'width: 10px;' }],
              ['col', { style: 'width: 20px;' }],
            ]);
          },
        );
      });

      describe('when colwidth is not an array', () => {
        ffTest(
          'platform.editor.custom-table-width',
          () => {
            const result = generateColgroup(
              getTable([
                {
                  colwidth: 10,
                  colspan: 1,
                },
                {
                  colwidth: null,
                  colspan: 1,
                },
                {
                  colwidth: undefined,
                  colspan: 1,
                },
              ]),
            );

            expect(result).toEqual([
              ['col', { style: 'width: 48px;' }],
              ['col', { style: 'width: 48px;' }],
              ['col', { style: 'width: 48px;' }],
            ]);
          },
          () => {
            const result = generateColgroup(
              getTable([
                {
                  colwidth: 10,
                  colspan: 1,
                },
                {
                  colwidth: null,
                  colspan: 1,
                },
                {
                  colwidth: undefined,
                  colspan: 1,
                },
              ]),
            );

            expect(result).toEqual([
              ['col', {}],
              ['col', {}],
              ['col', {}],
            ]);
          },
        );
      });

      describe('when colwidth has falsy values', () => {
        ffTest(
          'platform.editor.custom-table-width',
          () => {
            const result = generateColgroup(
              getTable([
                {
                  colwidth: [0],
                  colspan: 1,
                },
                {
                  colwidth: [null],
                  colspan: 1,
                },
                {
                  colwidth: [undefined],
                  colspan: 1,
                },
              ]),
            );

            expect(result).toEqual(
              expect.arrayContaining([
                // (.666*) -> match unknown number of 6's
                // (.?) -> match rounding errors e.g. 47.6666664px
                [
                  'col',
                  { style: expect.stringMatching(/^width: 47.666*.?px/) },
                ],
                [
                  'col',
                  { style: expect.stringMatching(/^width: 47.666*.?px/) },
                ],
                [
                  'col',
                  { style: expect.stringMatching(/^width: 47.666*.?px/) },
                ],
              ]),
            );
          },
          () => {
            const result = generateColgroup(
              getTable([
                {
                  colwidth: [0],
                  colspan: 1,
                },
                {
                  colwidth: [null],
                  colspan: 1,
                },
                {
                  colwidth: [undefined],
                  colspan: 1,
                },
              ]),
            );
            expect(result).toEqual([
              ['col', {}],
              ['col', {}],
              ['col', {}],
            ]);
          },
        );
      });

      function getTable(cellAttributes: { [key: string]: any }[]) {
        return table({
          isNumberColumnEnabled: true,
        })(tr(...cellAttributes.map((attrs) => td(attrs)(p('text')))))(
          defaultSchema,
        );
      }
    });
  });

  //isMinCellWidthTable function test
  describe('#isMinCellWidthTable', () => {
    describe('check if a table has all the columns with minimum width', () => {
      it('when input table has all columns in minimum width', () => {
        const result = isMinCellWidthTable(getMinCellWidthTable());

        expect(result).toEqual(true);
      });

      it('when input table has a column that is not minimum width', () => {
        const result = isMinCellWidthTable(getNonMinCellWidthTable());

        expect(result).toEqual(false);
      });

      function getMinCellWidthTable() {
        return table()(
          tr(
            td({ colwidth: [48] })(p('')),
            td({ colwidth: [48] })(p('')),
            td({ colwidth: [48] })(p('')),
          ),
        )(defaultSchema);
      }

      function getNonMinCellWidthTable() {
        return table()(
          tr(
            td({ colwidth: [200] })(p('')),
            td({ colwidth: [200] })(p('')),
            td({ colwidth: [48] })(p('')),
          ),
        )(defaultSchema);
      }
    });
  });

  describe('#getColgroupChildrenLength', () => {
    it('returns 1 when table only have 1 column', () => {
      expect(
        getColgroupChildrenLength(table()(tr(td()(p(''))))(defaultSchema)),
      ).toBe(1);
    });

    it('returns 3 when table have 3 column', () => {
      expect(
        getColgroupChildrenLength(
          table()(tr(td()(p('')), td()(p('')), td()(p(''))))(defaultSchema),
        ),
      ).toBe(3);
    });

    it('returns 5 when table have 5 column', () => {
      expect(
        getColgroupChildrenLength(
          table()(
            tr(td()(p('')), td()(p('')), td()(p('')), td()(p('')), td()(p(''))),
          )(defaultSchema),
        ),
      ).toBe(5);
    });

    it('returns correct number when table have merged header column', () => {
      expect(
        getColgroupChildrenLength(
          table()(
            tr(th({ colspan: 2 })(p('')), th()(p(''))),
            tr(td()(p('')), td()(p('')), td()(p(''))),
          )(defaultSchema),
        ),
      ).toBe(3);
    });
  });
});
