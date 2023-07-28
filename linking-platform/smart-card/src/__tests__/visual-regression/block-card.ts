import { waitForResolvedBlockCard } from '@atlaskit/media-integration-test-helpers';
import { getURL, setup, takeSnapshot } from '../__utils__/vr-helpers';

describe('Block Card', () => {
  // FIXME: This test was automatically skipped due to failure on 08/06/2023: https://product-fabric.atlassian.net/browse/EDM-6951
  // FIXME: This test was automatically skipped due to failure on 09/06/2023: https://product-fabric.atlassian.net/browse/EDM-6956
  it.skip.each([
    ['shows collaborators on block cards', 'vr-block-card-collaborators'],
    ['shows default icon on block cards', 'vr-block-card-default-icon'],
    ['renders lozenge correctly on block cards', 'vr-block-card-lozenge'],
    ['shows preview button on block cards', 'vr-block-card-preview'],
  ])('%s', async (_: string, testName: string) => {
    const url = getURL(testName);
    const page = await setup(url);

    await waitForResolvedBlockCard(page);

    const image = await takeSnapshot(page, 280, 0);
    expect(image).toMatchProdImageSnapshot();
  });

  it('shows actions popup menu', async () => {
    const url = getURL('vr-block-card-actions-menu');
    const page = await setup(url);

    await waitForResolvedBlockCard(page);

    await page.click('button[data-testid="dropdown-trigger"]');

    const image = await takeSnapshot(page, 280, 0);
    expect(image).toMatchProdImageSnapshot();
  });

  it('shows flexible views', async () => {
    const url = getURL('vr-block-card-flexible-views');
    const page = await setup(url);
    await page.waitForSelector('[data-testid="smart-block-resolved-view"]');

    const image = await takeSnapshot(page, 520);
    expect(image).toMatchProdImageSnapshot();
  });
});
