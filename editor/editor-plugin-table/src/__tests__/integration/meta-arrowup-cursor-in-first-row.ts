import { BrowserTestCase } from '@atlaskit/webdriver-runner/runner';
import {
  fullpage,
  setProseMirrorTextSelection,
  expectToMatchSelection,
} from '@atlaskit/editor-test-helpers/integration/helpers';
import {
  goToEditorTestingWDExample,
  mountEditor,
} from '@atlaskit/editor-test-helpers/testing-example-page';
import tableAdf from './__fixtures__/table-and-paragraph-adf.json';

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
      allowTables: {},
      defaultValue: tableAdf,
    });

    await setProseMirrorTextSelection(page, { anchor: 49 });

    const keys = page.isWindowsPlatform()
      ? ['Control', 'Home']
      : ['Meta', 'ArrowUp'];

    await page.keys(keys, true);

    await expectToMatchSelection(page, { type: 'text', to: 4, from: 4 });
  },
);
