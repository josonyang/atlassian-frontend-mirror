import { BrowserTestCase } from '@atlaskit/webdriver-runner/runner';

// eslint-disable-next-line import/no-extraneous-dependencies -- Removed import for fixing circular dependencies
import {
  copyToClipboard,
  editable,
  fullpage,
  getDocFromElement,
  insertBlockMenuItem,
  insertMentionUsingClick,
} from '@atlaskit/editor-test-helpers/integration/helpers';
// eslint-disable-next-line import/no-extraneous-dependencies -- Removed import for fixing circular dependencies
import {
  goToEditorTestingWDExample,
  mountEditor,
} from '@atlaskit/editor-test-helpers/testing-example-page';
import WebdriverPage from '@atlaskit/webdriver-runner/wd-wrapper';

export const loadActionButton = '[aria-label*="Action item"]';
const TYPE_AHEAD_MENU_LIST = `[aria-label="Popup"] [role="listbox"]`;

/*
 * Safari adds special characters that end up in the snapshot
 */

BrowserTestCase(
  'task-decision-2.ts: can paste rich text into an action',
  {},
  async (client: any, testName: string) => {
    const page = new WebdriverPage(client);

    await copyToClipboard(
      page,
      '<p>this is a link <a href="http://www.google.com">www.google.com</a></p><p>more elements with some <strong>format</strong></p><p>some addition<em> formatting</em></p>',
      'html',
    );

    const browser = await goToEditorTestingWDExample(client);
    await mountEditor(browser, {
      appearance: fullpage.appearance,
      allowPanel: true,
    });

    await browser.waitFor(editable);
    await browser.type(editable, '[] ');
    await browser.waitForSelector('div[data-node-type="actionList"]');
    await browser.paste();
    const doc = await browser.$eval(editable, getDocFromElement);
    expect(doc).toMatchCustomDocSnapshot(testName);
  },
);

BrowserTestCase(
  'task-decision-2.ts: can paste plain text into an action',
  {},
  async (client: any, testName: string) => {
    const page = new WebdriverPage(client);
    await copyToClipboard(
      page,
      'this is a link http://www.google.com more elements with some **format** some addition *formatting*',
    );

    const browser = await goToEditorTestingWDExample(client);
    await mountEditor(browser, {
      appearance: fullpage.appearance,
      allowPanel: true,
    });

    await browser.waitFor(editable);
    await browser.type(editable, '[] ');
    await browser.waitForSelector('div[data-node-type="actionList"]');
    await browser.paste();
    const doc = await browser.$eval(editable, getDocFromElement);
    expect(doc).toMatchCustomDocSnapshot(testName);
  },
);

BrowserTestCase(
  'task-decision-2.ts: can type into decision',
  {},
  async (client: any, testName: string) => {
    const browser = await goToEditorTestingWDExample(client);
    await mountEditor(browser, {
      appearance: fullpage.appearance,
      allowPanel: true,
    });

    await browser.waitForSelector('button[aria-label*="Action item"]');
    await browser.click(loadActionButton);
    await browser.waitForSelector(
      'div[data-node-type="actionList"] span + div',
    );
    await browser.click('div[data-node-type="actionList"] span + div');
    await browser.type(editable, 'adding action');
    const doc = await browser.$eval(editable, getDocFromElement);
    expect(doc).toMatchCustomDocSnapshot(testName);
  },
);

// FIXME: This test was automatically skipped due to failure on 26/05/2023: https://product-fabric.atlassian.net/browse/ED-18082
BrowserTestCase(
  'task-decision-2.ts: can insert mention into an action using click',
  { skip: ['*'] },
  async (client: any, testName: string) => {
    const browser = await goToEditorTestingWDExample(client);
    await mountEditor(browser, {
      appearance: fullpage.appearance,
      allowPanel: true,
    });

    await browser.waitFor(editable);
    await browser.type(editable, '[] ');
    await browser.waitForSelector('div[data-node-type="actionList"]');
    await insertMentionUsingClick(browser, '0');
    const doc = await browser.$eval(editable, getDocFromElement);
    expect(doc).toMatchCustomDocSnapshot(testName);
  },
);

// FIXME: This test was automatically skipped due to failure on 11/07/2023: https://product-fabric.atlassian.net/browse/ED-19051
BrowserTestCase(
  'task-decision-2.ts: joins actions regardless of insert method',
  {
    skip: ['*'],
  },
  async (client: any, testName: string) => {
    const browser = await goToEditorTestingWDExample(client);
    await mountEditor(browser, {
      appearance: fullpage.appearance,
      allowPanel: true,
    });

    await browser.waitFor(editable);
    // Insert an action via menu
    await insertBlockMenuItem(browser, 'Action item', undefined, true);
    // Type 'a', press 'Enter' to create a new action below
    // Type 'Enter' again to remove a new action
    await browser.keys(['a', 'Enter', 'Enter']);
    // Insert an action via input rule
    await browser.type(editable, '[] ');
    await browser.waitForSelector('div[data-node-type="actionList"]');
    // Type 'b', press 'Enter' to create a new action below
    // Type 'Enter' again to remove a new action
    await browser.keys(['b', 'Enter', 'Enter']);
    // Insert an action via quickinsert/typeahead
    await browser.keys('/Action Item'.split(''));
    await browser.waitForVisible(TYPE_AHEAD_MENU_LIST);
    await browser.keys(['ArrowDown', 'Enter', 'c']);

    const doc = await browser.$eval(editable, getDocFromElement);
    expect(doc).toMatchCustomDocSnapshot(testName);
  },
);

// FIXME: This test was automatically skipped due to failure on 11/07/2023: https://product-fabric.atlassian.net/browse/ED-19052
BrowserTestCase(
  'task-decision-2.ts: inserts new action item via typeahead on the same level as the previous action item even when it was empty',
  {
    skip: ['*'],
  },
  async (client: any, testName: string) => {
    const browser = await goToEditorTestingWDExample(client);
    await mountEditor(browser, {
      appearance: fullpage.appearance,
      allowPanel: true,
    });

    await browser.waitFor(editable);
    // Create a non-empty action item
    await insertBlockMenuItem(browser, 'Action item', undefined, true);
    await browser.keys(['a', 'Space']);
    // Insert a new action via quickinsert when the cursor is inside of a non-empty action
    await browser.keys('/Action Item'.split(''));
    await browser.waitForVisible(TYPE_AHEAD_MENU_LIST);
    await browser.keys(['ArrowDown', 'Enter']);
    // Insert a new action via quickinsert when the cursor is inside of an empty action
    await browser.keys('/Action Item'.split(''));
    await browser.waitForVisible(TYPE_AHEAD_MENU_LIST);
    await browser.keys(['ArrowDown', 'Enter', 'c']);

    const doc = await browser.$eval(editable, getDocFromElement);
    expect(doc).toMatchCustomDocSnapshot(testName);
  },
);
