import { BrowserTestCase } from '@atlaskit/webdriver-runner/runner';

import {
  goToEditorTestingWDExample,
  mountEditor,
} from '@atlaskit/editor-test-helpers/testing-example-page';
import { layoutSelectors } from '@atlaskit/editor-test-helpers/page-objects/layouts';
import {
  fullpage,
  getProsemirrorSelection,
} from '@atlaskit/editor-test-helpers/integration/helpers';

import layoutAdf from './__fixtures__/basic-layout-adf.json';
import { calcUserDragAndDropFromMidPoint } from '@atlaskit/editor-test-helpers/e2e-helpers';

BrowserTestCase(
  "doesn't select layout section node if click and drag before releasing mouse",
  {},
  async (client: any) => {
    const page = await goToEditorTestingWDExample(client);
    await mountEditor(page, {
      appearance: fullpage.appearance,
      allowLayouts: true,
      defaultValue: layoutAdf,
    });

    // click and drag from centre of layout col out to padding
    const boundingRect = await page.getBoundingRect(layoutSelectors.column);
    await page.simulateUserDragAndDrop(
      ...calcUserDragAndDropFromMidPoint(boundingRect, 5),
    );

    const prosemirrorSelection = await getProsemirrorSelection(page);
    if (!prosemirrorSelection) {
      throw new Error('Unable to get Prosemirror selection');
    }
    expect(prosemirrorSelection.type).not.toBe('node');
  },
);
