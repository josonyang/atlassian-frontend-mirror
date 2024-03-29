// eslint-disable-next-line import/no-extraneous-dependencies -- Removed import for fixing circular dependencies
import {
  expectToMatchSelection,
  fullpage,
  setProseMirrorTextSelection,
} from '@atlaskit/editor-test-helpers/integration/helpers';
// eslint-disable-next-line import/no-extraneous-dependencies -- Removed import for fixing circular dependencies
import {
  goToEditorTestingWDExample,
  mountEditor,
} from '@atlaskit/editor-test-helpers/testing-example-page';
import { BrowserTestCase } from '@atlaskit/webdriver-runner/runner';

import tableAdf from './__fixtures__/table-and-paragraph-adf';

BrowserTestCase(
  'meta-arrowup-cursor-in-first-row.ts: pressing command/ctrl + arrow up should move cursor into first row',
  {},
  async (client: any) => {
    const page = await goToEditorTestingWDExample(
      client,
      'editor-plugin-table',
    );
    await mountEditor(page, {
      appearance: fullpage.appearance,
      allowTables: {
        advanced: true,
      },
      defaultValue: tableAdf,
    });

    await setProseMirrorTextSelection(page, { anchor: 49 });

    const keys = page.isWindowsPlatform()
      ? ['Control', 'Home']
      : ['Meta', 'ArrowUp'];

    await page.keys(keys, true);

    await expectToMatchSelection(page, { type: 'text', anchor: 4, head: 4 });
  },
);
