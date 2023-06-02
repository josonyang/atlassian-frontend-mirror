import { BrowserTestCase } from '@atlaskit/webdriver-runner/runner';

import { clickOnExtension } from '@atlaskit/editor-test-helpers/page-objects/extensions';

import {
  fullpage,
  animationFrame,
} from '@atlaskit/editor-test-helpers/integration/helpers';

import {
  goToEditorTestingWDExample,
  mountEditor,
} from '@atlaskit/editor-test-helpers/testing-example-page';
import * as Adf from './extensionSafariTestAdf.json';
const copyButtonSelector = 'button[aria-label="Copy"]';

describe(`test copy extension in Safari`, () => {
  BrowserTestCase(
    'Should works with polyfill',
    { skip: ['chrome', 'firefox'] },
    async (client: any, testName: string) => {
      const page = await goToEditorTestingWDExample(client);
      await mountEditor(page, {
        appearance: fullpage.appearance,
        featureFlags: {
          floatingToolbarCopyButton: true,
        },
        allowExtension: true,
        defaultValue: JSON.stringify(Adf),
      });

      let extensionSelector = `[extensionType="com.atlassian.forge"][extensionKey="awesome:list"]`;
      await clickOnExtension(page, 'com.atlassian.forge', 'awesome:list');

      // Wait for floating toolbar to render
      await page.waitForSelector(copyButtonSelector);
      await animationFrame(page);

      // Click the Copy button
      await page.isClickable(copyButtonSelector);
      await page.click(copyButtonSelector);

      // Move to end of document
      await page.keys(['ArrowDown', 'ArrowDown', 'ArrowDown', 'ArrowDown']);

      // Paste
      await page.paste();
      const hasCopied = await page.waitForElementCount(extensionSelector, 2);
      expect(hasCopied).toEqual(true);
    },
  );
});