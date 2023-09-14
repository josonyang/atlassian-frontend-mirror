import { BrowserTestCase } from '@atlaskit/webdriver-runner/runner';
import { Node } from '@atlaskit/editor-prosemirror/model';
// eslint-disable-next-line import/no-extraneous-dependencies -- Removed import for fixing circular dependencies
import sampleSchema from '@atlaskit/editor-test-helpers/schema';

// eslint-disable-next-line import/no-extraneous-dependencies -- Removed import for fixing circular dependencies
import {
  fullpage,
  quickInsert,
  sendKeyNumTimes,
  editable,
  getDocFromElement,
  setProseMirrorTextSelection,
} from '@atlaskit/editor-test-helpers/integration/helpers';
// eslint-disable-next-line import/no-extraneous-dependencies -- Removed import for fixing circular dependencies
import {
  goToEditorTestingWDExample,
  mountEditor,
} from '@atlaskit/editor-test-helpers/testing-example-page';
// eslint-disable-next-line import/no-extraneous-dependencies -- Removed import for fixing circular dependencies
import { selectors } from '@atlaskit/editor-test-helpers/page-objects/editor';
import type { WebDriverPage } from '@atlaskit/editor-test-helpers/page-objects/types';
import { spaceAtEnd } from './__fixtures__/base-adfs';
// eslint-disable-next-line import/no-extraneous-dependencies -- Removed import for fixing circular dependencies
import { doc, p, h1, h5 } from '@atlaskit/editor-test-helpers/doc-builder';

describe('typeahead: up & down arrow navigation', () => {
  const startEditor = async (client: any, adf: any): Promise<WebDriverPage> => {
    const page = await goToEditorTestingWDExample(client);

    await mountEditor(page, {
      appearance: fullpage.appearance,
      defaultValue: adf,
    });

    return page;
  };

  const sendArrowUpKey = async (
    page: WebDriverPage,
    opts: { numTimes?: number } = {},
  ) => {
    await sendKeyNumTimes(page, 'ArrowUp', opts);
  };

  const sendArrowDownKey = async (
    page: WebDriverPage,
    opts: { numTimes?: number } = {},
  ) => {
    await sendKeyNumTimes(page, 'ArrowDown', opts);
  };

  describe('when cursor is inside of query and arrow down is used with ENTER to select', () => {
    BrowserTestCase(
      'it navigates to the typeahead search result below',
      { skip: [] },
      async (client: any, testName: string) => {
        const page = await startEditor(client, spaceAtEnd);
        await setProseMirrorTextSelection(page, { anchor: 1, head: 1 });

        const title = 'heading';
        await page.keys(['X', 'Space']);
        await quickInsert(page, title, false);
        await sendArrowDownKey(page, { numTimes: 2 });
        await page.keys('Enter');
        await page.keys('X');

        const jsonDocument = await page.$eval(editable, getDocFromElement);

        const pmDocument = Node.fromJSON(sampleSchema, jsonDocument);
        const expectedDocument = doc(p('X  '), h1('X'));
        expect(pmDocument).toEqualDocument(expectedDocument);
      },
    );
  });

  describe('when cursor is inside of query and arrow down is used with CLICK to select', () => {
    BrowserTestCase(
      'it navigates to the typeahead search result below',
      { skip: [] },
      async (client: any, testName: string) => {
        const page = await startEditor(client, spaceAtEnd);
        await setProseMirrorTextSelection(page, { anchor: 1, head: 1 });

        const title = 'heading';
        await page.keys(['X', 'Space']);
        await quickInsert(page, title, false);
        await sendArrowDownKey(page, { numTimes: 2 });
        await page.click(
          `[aria-label="Popup"] [role="listbox"] [role="option"][aria-selected="true"]`,
        );
        await page.click(editable);
        await page.keys('X');

        const jsonDocument = await page.$eval(editable, getDocFromElement);

        const pmDocument = Node.fromJSON(sampleSchema, jsonDocument);
        const expectedDocument = doc(p('X  '), h1('X'));
        expect(pmDocument).toEqualDocument(expectedDocument);
      },
    );
  });

  describe('when cursor is inside of query and arrow up is used with ENTER to select', () => {
    BrowserTestCase(
      'it navigates to the last typeahead search result',
      {
        skip: [],
      },
      async (client: any, testName: string) => {
        const page = await startEditor(client, spaceAtEnd);
        await setProseMirrorTextSelection(page, { anchor: 1, head: 1 });
        const title = 'heading';
        await page.keys(['X', 'Space']);
        await quickInsert(page, title, false);
        await sendArrowUpKey(page, { numTimes: 1 });
        // wait until option is actually selected before pressing enter,
        // going to end of list can sometimes be flaky otherwise
        const h5Selector =
          ' [role="option"][aria-label="Heading 5"][aria-selected="true"]';
        await page.waitForSelector(selectors.typeaheadPopup.concat(h5Selector));
        await page.keys('Enter');
        await page.keys('X');
        const jsonDocument = await page.$eval(editable, getDocFromElement);
        const pmDocument = Node.fromJSON(sampleSchema, jsonDocument);
        const expectedDocument = doc(p('X  '), h5('X'));
        expect(pmDocument).toEqualDocument(expectedDocument);
      },
    );
  });
});
