/* eslint-disable import/no-extraneous-dependencies -- Removed from package.json to fix  circular depdencies */
import { contextPanelSelectors } from '@atlaskit/editor-test-helpers/page-objects/context-panel';
import { animationFrame } from '@atlaskit/editor-test-helpers/page-objects/editor';
import {
  insertTable,
  tableSelectors,
} from '@atlaskit/editor-test-helpers/page-objects/table';
import { retryUntilStablePosition } from '@atlaskit/editor-test-helpers/page-objects/toolbar';
import {
  focusEditor,
  snapshot,
} from '@atlaskit/editor-test-helpers/vr-utils/base-utils';
import type { PuppeteerPage } from '@atlaskit/visual-regression/helper';
import { getExampleUrl, loadPage } from '@atlaskit/visual-regression/helper';
/* eslint-disable import/no-extraneous-dependencies -- Removed from package.json to fix  circular depdencies */
export async function goToFullPageWithTemplateContextPanel() {
  const url = getExampleUrl(
    'editor',
    'editor-core',
    'full-page-template-context-panel',
  );
  const { page } = global;
  await loadPage(page, url, {
    // allow side effects
    allowedSideEffects: {
      animation: true,
      transition: true,
    },
  });
  await page.waitForSelector(contextPanelSelectors.contextPanelPanel);
  return page;
}
const waitForFloatingToolbar = async (page: PuppeteerPage) => {
  await retryUntilStablePosition(
    page,
    async () => {
      await page.waitForSelector(tableSelectors.floatingToolbar);
    },
    tableSelectors.floatingToolbar,
  );
};

describe('Full page with template context panel', () => {
  // TODO currently there is an table overflown issue and we can unskipped the test once the issue #ED-22806 is fixed
  it.skip('should reposition popup components on insert table', async () => {
    const page = await goToFullPageWithTemplateContextPanel();
    await focusEditor(page);
    await insertTable(page);
    await animationFrame(page);
    await animationFrame(page);
    await waitForFloatingToolbar(page);
    await snapshot(page, { useUnsafeThreshold: true, tolerance: 0.01 }, 'body');
  });
});
