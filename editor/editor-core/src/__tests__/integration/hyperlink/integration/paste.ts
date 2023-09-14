// eslint-disable-next-line import/no-extraneous-dependencies -- Removed import for fixing circular dependencies
import {
  editable,
  fullpage,
  getDocFromElement,
} from '@atlaskit/editor-test-helpers/integration/helpers';
// eslint-disable-next-line import/no-extraneous-dependencies -- Removed import for fixing circular dependencies
import { copyHyperlink } from '@atlaskit/editor-test-helpers/page-objects/hyperlink';
// eslint-disable-next-line import/no-extraneous-dependencies -- Removed import for fixing circular dependencies
import {
  goToEditorTestingWDExample,
  mountEditor,
} from '@atlaskit/editor-test-helpers/testing-example-page';
import { BrowserTestCase } from '@atlaskit/webdriver-runner/runner';
import Page from '@atlaskit/webdriver-runner/wd-wrapper';

BrowserTestCase(
  'can paste hyperlink into paragraph',
  {},
  async (client: any, testName: string) => {
    const page = new Page(client);
    await copyHyperlink(page, 'http://atlassian.com/');

    await goToEditorTestingWDExample(client);
    await mountEditor(page, {
      appearance: fullpage.appearance,
    });
    await page.paste();

    const doc = await page.$eval(editable, getDocFromElement);
    expect(doc).toMatchCustomDocSnapshot(testName);
  },
);

BrowserTestCase(
  'can paste hyperlink into list',
  {},
  async (client: any, testName: string) => {
    const page = new Page(client);
    await copyHyperlink(page, 'http://atlassian.com/');

    await goToEditorTestingWDExample(client);
    await mountEditor(page, {
      appearance: fullpage.appearance,
    });
    await page.type(editable, '* ');
    await page.paste();

    const doc = await page.$eval(editable, getDocFromElement);
    expect(doc).toMatchCustomDocSnapshot(testName);
  },
);
