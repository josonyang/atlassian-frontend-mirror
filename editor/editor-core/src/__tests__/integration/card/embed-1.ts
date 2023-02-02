import { BrowserTestCase } from '@atlaskit/webdriver-runner/runner';
import {
  getDocFromElement,
  editable,
} from '@atlaskit/editor-test-helpers/integration/helpers';
import {
  goToEditorTestingWDExample,
  mountEditor,
} from '@atlaskit/editor-test-helpers/testing-example-page';
import { ConfluenceCardProvider } from '@atlaskit/editor-test-helpers/confluence-card-provider';
import * as embedCardAdf from './_fixtures_/embed-card.adf.json';
import { waitForEmbedCardSelection } from '@atlaskit/media-integration-test-helpers';

type ClientType = Parameters<typeof goToEditorTestingWDExample>[0];

BrowserTestCase(
  'card: changing the link label of an embed link should convert it to a "dumb" link',
  {},
  async (client: ClientType, testName: string) => {
    const page = await goToEditorTestingWDExample(client);

    const cardProviderPromise = Promise.resolve(
      new ConfluenceCardProvider('prod'),
    );

    await mountEditor(page, {
      appearance: 'full-page',
      allowTextAlignment: true,
      defaultValue: JSON.stringify(embedCardAdf),
      smartLinks: {
        provider: cardProviderPromise,
        allowBlockCards: true,
        allowEmbeds: true,
      },
    });

    await waitForEmbedCardSelection(page);
    const editLinkButtonSelector = 'button[aria-label="Edit link"]';
    await page.waitForSelector(editLinkButtonSelector);
    await page.click(editLinkButtonSelector);

    // Clear the Link Label field before typing
    const linkLabelSelector = '[data-testid="link-label"]';
    await page.waitForSelector(linkLabelSelector, {
      timeout: 20000,
    });
    await page.clear(linkLabelSelector);
    // Change the 'text to display' field to 'New heading' and press enter
    await page.type(linkLabelSelector, 'New heading');
    await page.keys(['Enter']);

    expect(
      await page.$eval(editable, getDocFromElement),
    ).toMatchCustomDocSnapshot(testName);
  },
);
