import { BrowserTestCase } from '@atlaskit/webdriver-runner/runner';
import {
  mountEditor,
  goToEditorTestingWDExample,
} from '@atlaskit/editor-test-helpers/testing-example-page';
import { animationFrame } from '@atlaskit/editor-test-helpers/integration/helpers';

BrowserTestCase(
  'emoji-4.ts: emoji picker should be scrollable',
  // TODO: Skipped safari, need to unskip again after fixing: https://product-fabric.atlassian.net/browse/ED-16306
  { skip: ['chrome', 'firefox', 'safari'] }, // { only: ['safari'] }
  async (client: any) => {
    const emojiButton = 'button[aria-label*="Emoji"]';
    const emojiList = '[data-emoji-picker-container] .ReactVirtualized__List';

    const page = await goToEditorTestingWDExample(client);
    await mountEditor(page, { appearance: 'full-page' });

    await page.waitFor(emojiButton);

    // Equivalent with page.click(emojiButton) which
    // which did not work for SafariDriver in this case
    await client.execute((emojiButton: string) => {
      const el = document.querySelector(emojiButton) as HTMLElement;
      el.click();
    }, emojiButton);

    await page.waitFor(emojiList);

    await client.execute((emojiList: string) => {
      const el = document.querySelector(emojiList) as HTMLElement;
      el.dispatchEvent(new WheelEvent('wheel', { deltaY: 100 }));
    }, emojiList);

    await animationFrame(page);

    const scrollTop = await client.execute((emojiList: string) => {
      const el = document.querySelector(emojiList) as HTMLElement;
      return el.scrollTop;
    }, emojiList);

    expect(scrollTop).toBe(100);
  },
);
