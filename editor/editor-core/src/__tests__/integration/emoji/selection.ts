import { BrowserTestCase } from '@atlaskit/webdriver-runner/runner';
// eslint-disable-next-line import/no-extraneous-dependencies -- Removed import for fixing circular dependencies
import {
  goToEditorTestingWDExample,
  mountEditor,
} from '@atlaskit/editor-test-helpers/testing-example-page';
// eslint-disable-next-line import/no-extraneous-dependencies -- Removed import for fixing circular dependencies
import { getBoundingRect } from '@atlaskit/editor-test-helpers/page-objects/editor';
// eslint-disable-next-line import/no-extraneous-dependencies -- Removed import for fixing circular dependencies
import { emojiSelectors } from '@atlaskit/editor-test-helpers/page-objects/emoji';
// eslint-disable-next-line import/no-extraneous-dependencies -- Removed import for fixing circular dependencies
import {
  fullpage,
  expectToMatchSelection,
} from '@atlaskit/editor-test-helpers/integration/helpers';
import emojiAdf from './__fixtures__/emoji-single.adf.json';

// FIXME: This test was automatically skipped due to failure on 24/05/2023: https://product-fabric.atlassian.net/browse/ED-18045
BrowserTestCase(
  'selection.ts: Clicking after an emoji produces a text selection to its right',
  {
    skip: ['*'],
  },
  async (client: any, testName: string) => {
    const page = await goToEditorTestingWDExample(client);
    await mountEditor(page, {
      appearance: fullpage.appearance,
      allowStatus: true,
      defaultValue: emojiAdf,
    });
    await page.waitForSelector(emojiSelectors.standard);
    const positionAfterEmoji = 2;

    // Click after the emoji
    const bounds = await getBoundingRect(page, emojiSelectors.standard);
    const xOffset = Math.ceil(bounds.width) * 2;
    const yOffset = Math.ceil(bounds.height) * 0.9;
    await page.moveTo(emojiSelectors.standard, xOffset, yOffset);
    await page.click();

    await expectToMatchSelection(page, {
      anchor: positionAfterEmoji,
      head: positionAfterEmoji,
      type: 'text',
    });
  },
);
