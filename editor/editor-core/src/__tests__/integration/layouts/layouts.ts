import { BrowserTestCase } from '@atlaskit/webdriver-runner/runner';
import Page from '@atlaskit/webdriver-runner/wd-wrapper';
// eslint-disable-next-line import/no-extraneous-dependencies -- Removed import for fixing circular dependencies
import {
  getDocFromElement,
  fullpage,
  editable,
  insertMenuItem,
} from '@atlaskit/editor-test-helpers/integration/helpers';
import { messages as insertBlockMessages } from '../../../plugins/insert-block/ui/ToolbarInsertBlock/messages';

BrowserTestCase(
  `layouts: Backspacing within a layout shouldnt remove all contents`,
  {},
  async (client: any, testName: string) => {
    const page = new Page(client);
    await page.goto(fullpage.path);
    await page.waitForSelector(fullpage.placeholder);
    await page.click(fullpage.placeholder);

    await insertMenuItem(page, insertBlockMessages.columns.defaultMessage);
    await page.type(editable, '*');
    await page.keys('Space');
    await page.type(editable, 'abc');
    await page.keys('Return');
    await page.type(editable, '123');
    await page.keys(Array.from({ length: 3 }, (_) => 'Backspace'));

    const doc = await page.$eval(editable, getDocFromElement);
    expect(doc).toMatchCustomDocSnapshot(testName);
  },
);
