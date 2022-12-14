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
import * as blockCardAdf from './_fixtures_/block-card.adf.json';
import { waitForBlockCardSelection } from '@atlaskit/media-integration-test-helpers';
import { linkPickerSelectors } from '@atlaskit/editor-test-helpers/page-objects/hyperlink';

type ClientType = Parameters<typeof goToEditorTestingWDExample>[0];

BrowserTestCase(
  'card: changing the link label of a block link should convert it to a "dumb" link',
  {},
  async (client: ClientType, testName: string) => {
    const page = await goToEditorTestingWDExample(client);

    const cardProviderPromise = Promise.resolve(
      new ConfluenceCardProvider('prod'),
    );

    await mountEditor(page, {
      appearance: 'full-page',
      allowTextAlignment: true,
      defaultValue: JSON.stringify(blockCardAdf),
      smartLinks: {
        provider: cardProviderPromise,
        allowBlockCards: true,
      },
    });

    await waitForBlockCardSelection(page);
    await page.click('button[aria-label="Edit link"]');
    // Clear the Link Label field before typing
    await page.clear('[data-testid="link-label"]');
    // Change the 'text to display' field to 'New heading' and press enter
    await page.type('[data-testid="link-label"]', 'New heading');
    await page.keys(['Enter']);

    expect(
      await page.$eval(editable, getDocFromElement),
    ).toMatchCustomDocSnapshot(testName);
  },
);

describe('with feature flag: lp-link-picker', () => {
  BrowserTestCase(
    'card: changing the link label of a block link should convert it to a "dumb" link',
    {},
    async (client: ClientType, testName: string) => {
      const page = await goToEditorTestingWDExample(client);

      const cardProviderPromise = Promise.resolve(
        new ConfluenceCardProvider('prod'),
      );

      await mountEditor(
        page,
        {
          appearance: 'full-page',
          allowTextAlignment: true,
          defaultValue: JSON.stringify(blockCardAdf),
          smartLinks: {
            provider: cardProviderPromise,
            allowBlockCards: true,
          },
          featureFlags: {
            'lp-link-picker': true,
          },
        },
        {
          withLinkPickerOptions: true,
        },
      );

      await waitForBlockCardSelection(page);
      await page.click('button[aria-label="Edit link"]');
      // Clear the Link Label field before typing
      await page.clear(linkPickerSelectors.linkDisplayTextInput);
      // Change the 'text to display' field to 'New heading' and press enter
      await page.type(linkPickerSelectors.linkDisplayTextInput, 'New heading');
      await page.keys(['Enter']);

      expect(
        await page.$eval(editable, getDocFromElement),
      ).toMatchCustomDocSnapshot(testName);
    },
  );
});
