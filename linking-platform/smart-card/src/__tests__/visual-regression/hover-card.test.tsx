import {
  enableTooltips,
  PuppeteerPage,
} from '@atlaskit/visual-regression/helper';
import { getURL, setup, takeSnapshot } from '../__utils__/vr-helpers';

describe('Hover Card', () => {
  const snapshotOptions = {
    // set tolerance to 0.1% to reduce false positives
    failureThreshold: '0.001',
    failureThresholdType: 'percent',
  };

  const renderHoverCard = async (
    height: number = 800,
    mode?: 'dark' | 'light' | 'none',
  ) => {
    const url = getURL('vr-hover-cards', mode);
    const page = await setup(url);

    await page.setViewport({
      width: 800,
      height: height,
    });

    await page.waitForSelector('[data-testid="inline-card-resolved-view"]');
    await page.hover('[data-testid="inline-card-resolved-view"]');
    await page.waitForSelector('[data-testid="hover-card"]');
    await page.waitForSelector(
      '[data-testid="smart-element-icon-icon--wrapper"]',
    );
    await page.waitForSelector(
      '[data-testid="authorgroup-metadata-element--avatar-0--person"]',
    );

    return page;
  };

  const renderUnauthorisedHoverCard = async (height: number = 500) => {
    const url = getURL('vr-unauthorised-hover-cards');
    const page = await setup(url);
    await enableTooltips(page);

    await page.setViewport({
      width: 500,
      height: height,
    });

    await page.waitForSelector('[data-testid="inline-card-unauthorized-view"]');
    await page.hover('[data-testid="inline-card-unauthorized-view"]');
    await page.waitForSelector('[data-testid="hover-card-unauthorised-view"]');

    return page;
  };

  const renderHoverCardWithSSR = async () => {
    const url = getURL('vr-hover-cards-ssr');
    const page = await setup(url);

    return page;
  };

  const waitForHoverPreview = async (page: PuppeteerPage) => {
    await page.waitForSelector('.smart-links-hover-preview');
    await page.waitForSelector(
      '[data-testid="smart-element-icon-icon--wrapper"]',
    );
    await page.waitForSelector(
      '[data-testid="authorgroup-metadata-element--avatar-0--person"]',
    );
  };

  // FIXME: This test was automatically skipped due to failure on 13/04/2023: https://product-fabric.atlassian.net/browse/EDM-6381
  it.skip('should open below trigger component when there is room below in viewport', async () => {
    const height = 650;

    const page = await renderHoverCard(height);

    const image = await takeSnapshot(page, height);
    expect(image).toMatchProdImageSnapshot(snapshotOptions);
  });

  it('should open on top of trigger component when there is no room below and there is room above in viewport', async () => {
    const height = 350;

    const page = await renderHoverCard(height);

    const image = await takeSnapshot(page, height);
    expect(image).toMatchProdImageSnapshot(snapshotOptions);
  });

  // FIXME: This test was automatically skipped due to failure on 19/07/2022: https://product-fabric.atlassian.net/browse/EDM-3923
  it.skip('should open preview modal', async () => {
    const page = await renderHoverCard();

    await page.click('[data-testid="preview-content"]');
    await page.waitForSelector('[data-testid="smart-links-preview-modal"]');
    await page.waitForSelector('[data-testid="hover-card"]', {
      hidden: true,
    });

    const image = await takeSnapshot(page, 800, 0);
    expect(image).toMatchProdImageSnapshot(snapshotOptions);
  });
  describe('SSR links', () => {
    it('should open with loading state', async () => {
      const page = await renderHoverCardWithSSR();

      await page.waitForSelector(
        '[data-testid="ssr-hover-card-loading-resolved-view"]',
      );
      await page.hover('[data-testid="ssr-hover-card-loading-resolved-view"]');
      await page.waitForSelector('[data-testid="hover-card"]');
      await page.waitForSelector('[data-testid="hover-card-loading-view"]');

      const image = await takeSnapshot(page, 300);
      expect(image).toMatchProdImageSnapshot(snapshotOptions);
    });

    it('should render with available data in case of error', async () => {
      const page = await renderHoverCardWithSSR();

      await page.waitForSelector(
        '[data-testid="ssr-hover-card-errored-resolved-view"]',
      );
      await page.hover('[data-testid="ssr-hover-card-errored-resolved-view"]');
      await page.waitForSelector('[data-testid="hover-card"]');

      const image = await takeSnapshot(page, 150);
      expect(image).toMatchProdImageSnapshot(snapshotOptions);
    });

    it('should render an unauthorised tooltip in case the smart link is unauthorised', async () => {
      const height = 360;

      const page = await renderUnauthorisedHoverCard(height);

      await page.waitForSelector('[data-testid="smart-element-icon-image"]');
      await page.waitForSelector(
        '[data-testid="unauthorised-view-content-learn-more"]',
      );
      await page.waitForSelector(
        '[data-testid="smart-action-tooltip--container"]',
      );

      const image = await takeSnapshot(page, height);
      expect(image).toMatchProdImageSnapshot(snapshotOptions);
    });
  });

  // FIXME: This test was automatically skipped due to failure on 04/04/2023: https://product-fabric.atlassian.net/browse/EDM-6304
  it.skip('shows tooltip on an action in hover previews', async () => {
    const height = 300;

    const url = getURL('vr-hover-cards');
    const page = await setup(url);
    await enableTooltips(page);

    await page.setViewport({
      width: 800,
      height: height,
    });

    await page.waitForSelector('[data-testid="inline-card-resolved-view"]');
    await page.hover('[data-testid="inline-card-resolved-view"]');
    await page.waitForSelector('[data-testid="hover-card"]');
    await page.waitForSelector('[data-testid="preview-content"]');
    await page.hover('[data-testid="preview-content"]');
    await page.waitForSelector('[data-testid="preview-content-tooltip"]');

    const image = await takeSnapshot(page, height);
    expect(image).toMatchProdImageSnapshot(snapshotOptions);
  });

  // FIXME: This test was automatically skipped due to failure on 18/01/2023: https://product-fabric.atlassian.net/browse/EDM-5506
  it.skip('shows when wrapping simple span element', async () => {
    const height = 400;

    const url = getURL('vr-hover-card-on-span');
    const page = await setup(url);

    await page.setViewport({
      width: 800,
      height: height,
    });

    await page.waitForSelector('[data-testid="hover-test-span"]');
    await page.hover('[data-testid="hover-test-span"]');
    await page.waitForSelector('[data-testid="hover-card"]');
    await page.waitForSelector('[data-testid="smart-links-container"]');

    const image = await takeSnapshot(page, height);
    expect(image).toMatchProdImageSnapshot(snapshotOptions);
  });

  it('renders hover preview in dark mode', async () => {
    const height = 650;

    const page = await renderHoverCard(height, 'dark');

    const image = await takeSnapshot(page, height);
    expect(image).toMatchProdImageSnapshot(snapshotOptions);
  });

  it('renders hover preview with server actions', async () => {
    const url = getURL('vr-hover-card-action');
    const page = await setup(url);

    await page.waitForSelector('[data-testid="inline-card-resolved-view"]');
    await page.hover('[data-testid="inline-card-resolved-view"]');
    await page.waitForSelector('[data-testid="hover-card"]');

    const testId = 'state-metadata-element';
    await page.waitForSelector(`[data-testid="${testId}--trigger"]`);
    await page.click(`[data-testid="${testId}--trigger"]`);
    await page.waitForSelector(`[data-testid="${testId}-item-group"]`);
    await page.hover(`[data-testid="${testId}-item-1"]`);

    const image = await takeSnapshot(page, 300);

    expect(image).toMatchProdImageSnapshot();
  });

  // FIXME: This test was automatically skipped due to failure on 11/05/2023: https://product-fabric.atlassian.net/browse/EDM-6647
  it.skip('successfully renders error embed modal when action is failed', async () => {
    const url = getURL('vr-hover-card-action-with-error-embed');
    const page = await setup(url);

    await page.waitForSelector('[data-testid="inline-card-resolved-view"]');
    await page.hover('[data-testid="inline-card-resolved-view"]');
    await page.waitForSelector('[data-testid="hover-card"]');

    const testId = 'state-metadata-element';
    await page.waitForSelector(`[data-testid="${testId}--trigger"]`);
    await page.click(`[data-testid="${testId}--trigger"]`);
    await page.waitForSelector(`[data-testid="${testId}-error-item-group"]`);

    await page.click(`[data-testid="${testId}-open-embed"]`);
    await page.waitForSelector(
      '[data-testid="smart-embed-preview-modal-embed"]',
    );

    const image = await takeSnapshot(page, 600, 0);
    expect(image).toMatchProdImageSnapshot();
  });

  it('renders hover preview following mouse position', async () => {
    const height = 400;
    const url = getURL('vr-hover-card-can-open-positioning', 'light');
    const page = await setup(url);

    await page.setViewport({ width: 800, height });

    // Hover over first child element, hover preview should open on the left
    const leftSelector = '[data-testid="hover-test-can-open-left"]';
    await page.waitForSelector(leftSelector);
    await page.hover(leftSelector);
    await waitForHoverPreview(page);
    const image1 = await takeSnapshot(page, height);
    expect(image1).toMatchProdImageSnapshot(snapshotOptions);

    // Hover over second child element, hover preview should close
    const centerSelector = '[data-testid="hover-test-cannot-open"]';
    await page.waitForSelector(centerSelector);
    await page.hover(centerSelector);
    await page.waitForSelector('.smart-links-hover-preview', {
      hidden: true,
    });
    const image2 = await takeSnapshot(page, height);
    expect(image2).toMatchProdImageSnapshot(snapshotOptions);

    // Hover over third child element, hover preview should open on the right
    const rightSelector = '[data-testid="hover-test-can-open-right"]';
    await page.waitForSelector(rightSelector);
    await page.hover(rightSelector);
    await waitForHoverPreview(page);

    const image3 = await takeSnapshot(page, height);
    expect(image3).toMatchProdImageSnapshot(snapshotOptions);
  });
});
