import { getURL, setup, takeSnapshot } from '../__utils__/vr-helpers';

describe('Hover Card', () => {
  const renderHoverCard = async (height: number = 800) => {
    const url = getURL('vr-hover-cards');
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

    return page;
  };

  it('should open below trigger component when there is room below in viewport', async () => {
    const height = 650;

    const page = await renderHoverCard(height);

    const image = await takeSnapshot(page, height);
    expect(image).toMatchProdImageSnapshot();
  });

  it('should open on top of trigger component when there is no room below and there is room above in viewport', async () => {
    const height = 350;

    const page = await renderHoverCard(height);

    const image = await takeSnapshot(page, height);
    expect(image).toMatchProdImageSnapshot();
  });

  it('should open preview modal', async () => {
    const page = await renderHoverCard();

    await page.click('[data-testid="preview-content"]');
    await page.waitForSelector('[data-testid="hover-card"]', {
      hidden: true,
    });
    await page.waitForSelector('[data-testid="smart-links-preview-modal"]');

    const image = await takeSnapshot(page, 800, 0);
    expect(image).toMatchProdImageSnapshot();
  });
});
