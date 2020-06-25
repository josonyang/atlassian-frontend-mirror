import { EditorView } from 'prosemirror-view';
import { Page } from 'puppeteer';
import {
  ExampleCreateInlineCommentComponent,
  ExampleViewInlineCommentComponent,
} from '@atlaskit/editor-test-helpers';
import {
  scrollToBottom,
  scrollToElement,
} from '../../../../__tests__/__helpers/page-objects/_editor';
import {
  snapshot,
  initFullPageEditorWithAdf,
} from '../../../../__tests__/visual-regression/_utils';
import adf from '../__fixtures__/toolbar-position.adf.json';
import adfWithTable from '../__fixtures__/toolbar-position-table.adf.json';
import { annotationSelectors, getState } from '../_utils';

const evaluateCoordinates = async (page: Page, pos: number) => {
  return await page.evaluate(p => {
    const editor = (window as any).__editorView as EditorView;
    const coords = editor.coordsAtPos(p);

    // returning coords immediately causes it to fail
    return {
      top: coords.top,
      left: coords.left,
      right: coords.right,
      bottom: coords.bottom,
    };
  }, pos);
};

const selectAtPos = async (page: Page, startPos: number, endPos: number) => {
  const start = await evaluateCoordinates(page, startPos);
  const end = await evaluateCoordinates(page, endPos);

  await page.mouse.click(start.left, start.top);
  await page.keyboard.down('Shift');
  await page.mouse.click(end.left, end.top);
  await page.keyboard.up('Shift');
};

const selectAtPosForBreakout = async (
  page: Page,
  startPos: number,
  endPos: number,
) => {
  return await page.evaluate(
    (startPos, endPos) => {
      const view = (window as any).__editorView as any;
      view.dispatch(
        view.state.tr.setSelection(
          // Re-use the current selection (presumed TextSelection) to use our new positions.
          view.state.selection.constructor.create(
            view.state.doc,
            startPos,
            endPos,
          ),
        ),
      );
      view.focus();
    },
    startPos,
    endPos,
  );
};

const init = async (page: Page, adf: Object) => {
  return await initFullPageEditorWithAdf(
    page,
    adf,
    undefined,
    { width: 1366, height: 768 },
    {
      annotationProviders: {
        inlineComment: {
          createComponent: ExampleCreateInlineCommentComponent,
          viewComponent: ExampleViewInlineCommentComponent,
          getState,
        },
      },
    },
  );
};

describe('Annotation toolbar positioning', () => {
  let page: Page;

  describe(`should disable comment button`, () => {
    it(`when selection includes inline nodes`, async () => {
      page = global.page;
      await init(page, adf);
      await scrollToBottom(page);

      await selectAtPos(page, 1654, 1666);
      await snapshot(page);

      // ensure it is disabled
      await page.waitForSelector(
        `${annotationSelectors.floatingToolbarCreate}[disabled]`,
      );
    });
  });

  describe(`should show annotation toolbar`, () => {
    beforeEach(async () => {
      page = global.page;
      await init(page, adf);
    });

    it(`toolbar left by top-line left boundary`, async () => {
      await selectAtPos(page, 108, 249);
      await snapshot(page);
    });

    it(`toolbar left by left editor boundary`, async () => {
      // select upwards
      await selectAtPos(page, 788, 661);
      await snapshot(page);
    });

    it(`toolbar right by top-line right boundary`, async () => {
      await selectAtPos(page, 7, 73);
      await snapshot(page);
    });

    it(`toolbar right by right editor boundary`, async () => {
      await selectAtPos(page, 45, 127);
      await snapshot(page);
    });

    it(`align to mouse cursor and update as selection changes`, async () => {
      await selectAtPos(page, 142, 281);
      await snapshot(page);

      // update selection
      const lastPosition = await evaluateCoordinates(page, 296);
      await page.keyboard.down('Shift');
      await page.mouse.click(lastPosition.left, lastPosition.top);
      await page.keyboard.up('Shift');
      await snapshot(page);
    });

    it(`across multiple nodes on same line`, async () => {
      await selectAtPos(page, 1018, 1047);
      await snapshot(page);
    });

    it(`across multiple nodes on different lines`, async () => {
      await selectAtPos(page, 1018, 1114);
      await snapshot(page);
    });

    it(`when only whitespace is selected`, async () => {
      await selectAtPos(page, 8, 7);
      await snapshot(page);
    });

    it(`text selection in table cell`, async () => {
      await scrollToElement(page, 'table');

      await selectAtPos(page, 1365, 1390);
      await snapshot(page);
    });

    it(`text selection in wide breakout node`, async () => {
      await selectAtPos(page, 1, 2);
      await scrollToBottom(page);
      await selectAtPosForBreakout(page, 1712, 1686);
      await snapshot(page);
    });

    it(`text selection in full width breakout node (left side)`, async () => {
      await scrollToBottom(page);
      await selectAtPosForBreakout(page, 2305, 2279);
      await snapshot(page);
    });

    it(`text selection in full width breakout node (right side)`, async () => {
      await scrollToBottom(page);
      await selectAtPosForBreakout(page, 3010, 3041);
      await snapshot(page);
    });
  });

  describe(`should not show annotation toolbar`, () => {
    beforeEach(async () => {
      page = global.page;
      await init(page, adfWithTable);
    });
    it(`text selection across table cells`, async () => {
      await scrollToElement(page, 'table');

      await selectAtPos(page, 9, 104);
      await page.waitForSelector('.pm-table-column__selected');
      await snapshot(page);
    });
  });
});
