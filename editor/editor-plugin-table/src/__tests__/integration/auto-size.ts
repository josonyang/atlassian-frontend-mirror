import {
  editable,
  fullpage,
  getDocFromElement,
} from '@atlaskit/editor-test-helpers/integration/helpers';
import sleep from '@atlaskit/editor-test-helpers/sleep';
import {
  goToEditorTestingWDExample,
  mountEditor,
} from '@atlaskit/editor-test-helpers/testing-example-page';
import { BrowserTestCase } from '@atlaskit/webdriver-runner/runner';

import {
  autoSizeToDefaultLayout,
  autoSizeToFullWidthLayout,
  autoSizeToWideLayout,
} from './__fixtures__/auto-size-documents';

async function loadAndRetrieveDocument(
  page: any,
  document: object,
  expectedLayout = 'default',
) {
  await mountEditor(page, {
    appearance: fullpage.appearance,
    defaultValue: JSON.stringify(document),
    allowPanel: true,
    allowTables: {
      advanced: true,
    },
  });

  await page.waitForSelector(`table[data-layout="${expectedLayout}"]`);
  await sleep(500);

  const doc = await page.$eval(editable, getDocFromElement);
  return doc;
}

BrowserTestCase(
  'Doesnt scale past default',
  {
    skip: ['*'],
  },
  async (client: any, testName: string) => {
    const page = await goToEditorTestingWDExample(
      client,
      'editor-plugin-table',
    );
    const doc = await loadAndRetrieveDocument(page, autoSizeToDefaultLayout);
    expect(doc).toMatchCustomDocSnapshot(testName);
  },
);

BrowserTestCase(
  'Scales to wide',
  {
    skip: ['*'],
  },
  async (client: any, testName: string) => {
    const page = await goToEditorTestingWDExample(
      client,
      'editor-plugin-table',
    );
    const doc = await loadAndRetrieveDocument(
      page,
      autoSizeToWideLayout,
      'wide',
    );
    expect(doc).toMatchCustomDocSnapshot(testName);
  },
);

BrowserTestCase(
  'Scales to full-width',
  { skip: ['safari', 'firefox'] },
  async (client: any, testName: string) => {
    const page = await goToEditorTestingWDExample(
      client,
      'editor-plugin-table',
    );
    const doc = await loadAndRetrieveDocument(
      page,
      autoSizeToFullWidthLayout,
      'full-width',
    );
    expect(doc).toMatchCustomDocSnapshot(testName);
  },
);
