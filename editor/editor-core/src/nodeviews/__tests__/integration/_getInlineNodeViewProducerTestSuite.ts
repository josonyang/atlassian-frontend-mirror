import { BrowserTestCase, Browser } from '@atlaskit/webdriver-runner/runner';
import { BrowserObject } from '@atlaskit/webdriver-runner/wd-wrapper';
import {
  goToEditorTestingWDExample,
  mountEditor,
} from '@atlaskit/editor-test-helpers/testing-example-page';

import {
  fullpage,
  expectToMatchSelection,
  setProseMirrorTextSelection,
  SelectionMatch,
} from '@atlaskit/editor-test-helpers/integration/helpers';
import { WebDriverPage } from '@atlaskit/editor-test-helpers/page-objects/types';

import {
  keyboardSelectLineFromLineEnd,
  clickAndDragSelectLineFromLineEnd,
  keyboardSelectLineFromLineStart,
  buildAdfTrailingSpaces,
  buildAdfNoTrailingSpaces,
  buildAdfMultiline,
  buildAdfMultipleNodesAcrossLines,
  holdShiftInChrome,
} from '../__helpers/_getInlineNodeViewProducer';

const testNames = [
  'Extend a selection to the start of the current line from the current position',
  'Extend a selection to the end of the current line from the current position',
  'Can click and drag to extend a selection to the start of the current line from the current position',
  'Can select [target] nodes with the left arrow key and move across them',
  'Can select [target] nodes with the right arrow key and move across them',
  'No trailing spaces: Extend a selection to the start of the current line from the current position',
  'No trailing spaces: Extend a selection to the end of the current line from the current position',
  'No trailing spaces: Can click and drag to extend a selection to the start of the current line from the current position',
  'No trailing spaces: Can select [target] nodes with the left arrow key and move across them',
  'No trailing spaces: Can select [target] nodes with the right arrow key and move across them',
  'No trailing spaces: Can move the selection down one line using down arrow key when [target] is the first node of each line',
  'No trailing spaces: Can move the selection up one line using up arrow key when [target] is the first node of each line',
  'No trailing spaces: Can move the selection down one line using down arrow key when in between [target] nodes',
  'No trailing spaces: Can move the selection up one line using up arrow key when in between [target] nodes',
  'No trailing spaces: Can extend the selection right by one with shift + right arrow key to select [target] node',
  'No trailing spaces: Can extend the selection left by one with shift + left arrow key to select [target] node',
  'No trailing spaces: Can extend the selection one line up with shift + arrow up',
  'No trailing spaces: Can extend the selection one line down with shift + arrow down',
  'No trailing spaces: Can insert text directly after the last node view in the same paragraph',
  'Multiline [target] no trailing spaces: Can insert text directly after the last node view in the same paragraph',
] as const;

type TestName = typeof testNames[number];

export async function runInlineNodeViewTestSuite({
  nodeName,
  editorOptions,
  node,
  multiLineNode,
  customBeforeEach,
  skipTests,
}: {
  nodeName: string;
  editorOptions?: { [key: string]: any };
  node: { type: string; attrs: { [key: string]: any } };
  multiLineNode: boolean;
  customBeforeEach?: (page: WebDriverPage) => Promise<void>;
  skipTests?: { [key in TestName]?: Browser[] };
}) {
  let testCaseName: TestName;

  describe(`NodeView Producer test suite [${nodeName}]: `, () => {
    // The ADF is generated by the test suite to enforce a structure
    // where we have three of the same inline node view within a paragraph.
    // Tests that use the LAST_NODE_SELECTOR also wait
    // for the selector to be ready before proceeding.
    const LAST_NODE_SELECTOR = `p .${nodeName}View-content-wrap:nth-child(3)`;

    const initEditor = async ({
      client,
      selection,
      adf,
    }: {
      client: BrowserObject;
      selection: { anchor: number; head: number };
      adf: string;
    }): Promise<WebDriverPage> => {
      const page = await goToEditorTestingWDExample(client);
      // Multiline node tests results in an ADF with a table with a narrow
      // cell to ensure nodes are broken across multiple lines
      const props = {
        appearance: fullpage.appearance,
        defaultValue: adf,
        allowTextAlignment: true,
        allowTables: {
          advanced: true,
          allowColumnResizing: true,
        },
        ...editorOptions,
      };

      await mountEditor(page, props, undefined, { clickInEditor: false });
      // clear any modifier keys in chrome
      if (page.isBrowser('chrome')) {
        await page.keys(['NULL']);
      }

      if (customBeforeEach) {
        await customBeforeEach(page);
      }

      await page.waitForSelector(LAST_NODE_SELECTOR);
      // clicking paragraphs to set selection was causing flaky results
      await setProseMirrorTextSelection(page, selection);

      return page;
    };

    describe(`[${nodeName}] with trailing spaces`, () => {
      testCaseName =
        'Extend a selection to the start of the current line from the current position';
      BrowserTestCase(
        testCaseName,
        {
          skip: skipTests?.[testCaseName],
        },
        async (client: BrowserObject) => {
          const page = await initEditor({
            client,
            selection: { anchor: 7, head: 7 },
            adf: JSON.stringify(buildAdfTrailingSpaces({ node })),
          });
          await keyboardSelectLineFromLineEnd(page);
          await page.waitForSelector('.ak-editor-selected-node ');
          await expectToMatchSelection(page, {
            type: 'text',
            anchor: 7,
            head: 1,
          });
        },
      );

      testCaseName =
        'Extend a selection to the end of the current line from the current position';
      BrowserTestCase(
        testCaseName,
        {
          skip: skipTests?.[testCaseName],
        },
        async (client: BrowserObject) => {
          const page = await initEditor({
            client,
            selection: { anchor: 1, head: 1 },
            adf: JSON.stringify(buildAdfTrailingSpaces({ node })),
          });
          await keyboardSelectLineFromLineStart(page);
          await page.waitForSelector('.ak-editor-selected-node ');
          await expectToMatchSelection(page, {
            type: 'text',
            anchor: 1,
            head: 7,
          });
        },
      );

      testCaseName =
        'Can click and drag to extend a selection to the start of the current line from the current position';
      BrowserTestCase(
        testCaseName,
        {
          skip: skipTests?.[testCaseName],
        },
        async (client: BrowserObject) => {
          const page = await initEditor({
            client,
            selection: { anchor: 7, head: 7 },
            adf: JSON.stringify(buildAdfTrailingSpaces({ node })),
          });
          await clickAndDragSelectLineFromLineEnd({
            page,
            selector: LAST_NODE_SELECTOR,
          });
          await expectToMatchSelection(page, {
            type: 'text',
            anchor: 7,
            head: 1,
          });
        },
      );

      testCaseName =
        'Can select [target] nodes with the left arrow key and move across them';
      BrowserTestCase(
        testCaseName,
        {
          skip: skipTests?.[testCaseName],
        },
        async (client: BrowserObject) => {
          const page = await initEditor({
            client,
            selection: { anchor: 7, head: 7 },
            adf: JSON.stringify(buildAdfTrailingSpaces({ node })),
          });
          const expectedSelections: SelectionMatch[] = [
            { type: 'text', from: 6 },
            { type: 'node', from: 5 },
            { type: 'text', from: 5 },
            { type: 'text', from: 4 },
            { type: 'node', from: 3 },
            { type: 'text', from: 3 },
            { type: 'text', from: 2 },
            { type: 'node', from: 1 },
            { type: 'text', from: 1 },
          ];
          for (const selection of expectedSelections) {
            await page.keys(['ArrowLeft']);
            await expectToMatchSelection(page, selection);
          }
        },
      );

      testCaseName =
        'Can select [target] nodes with the right arrow key and move across them';
      BrowserTestCase(
        testCaseName,
        {
          skip: skipTests?.[testCaseName],
        },
        async (client: BrowserObject) => {
          const page = await initEditor({
            client,
            selection: { anchor: 1, head: 1 },
            adf: JSON.stringify(buildAdfTrailingSpaces({ node })),
          });
          const expectedSelections: SelectionMatch[] = [
            { type: 'node', from: 1 },
            { type: 'text', from: 2 },
            { type: 'text', from: 3 },
            { type: 'node', from: 3 },
            { type: 'text', from: 4 },
            { type: 'text', from: 5 },
            { type: 'node', from: 5 },
            { type: 'text', from: 6 },
          ];
          for (const selection of expectedSelections) {
            await page.keys(['ArrowRight']);
            await expectToMatchSelection(page, selection);
          }
        },
      );
    });

    describe(`[${nodeName}] with no trailing spaces`, () => {
      testCaseName =
        'No trailing spaces: Extend a selection to the start of the current line from the current position';
      BrowserTestCase(
        testCaseName,
        {
          skip: skipTests?.[testCaseName],
        },
        async (client: BrowserObject) => {
          const page = await initEditor({
            client,
            selection: { anchor: 4, head: 4 },
            adf: JSON.stringify(buildAdfNoTrailingSpaces({ node })),
          });

          await keyboardSelectLineFromLineEnd(page);

          await expectToMatchSelection(page, {
            type: 'text',
            anchor: 4,
            head: 1,
          });
        },
      );

      testCaseName =
        'No trailing spaces: Extend a selection to the end of the current line from the current position';
      BrowserTestCase(
        testCaseName,
        {
          skip: skipTests?.[testCaseName],
        },
        async (client: BrowserObject) => {
          const page = await initEditor({
            client,
            selection: { anchor: 1, head: 1 },
            adf: JSON.stringify(buildAdfNoTrailingSpaces({ node })),
          });

          await keyboardSelectLineFromLineStart(page);

          await expectToMatchSelection(page, {
            type: 'text',
            anchor: 1,
            head: 4,
          });
        },
      );

      //TODO Fix this test for Chrome
      // Click and drag via the test is currently not working as expected in
      // Chrome however works when manually testing in the browser
      testCaseName =
        'No trailing spaces: Can click and drag to extend a selection to the start of the current line from the current position';
      BrowserTestCase(
        testCaseName,
        {
          skip: ['chrome', ...(skipTests?.[testCaseName] || [])],
        },
        async (client: BrowserObject) => {
          const page = await initEditor({
            client,
            selection: { anchor: 4, head: 4 },
            adf: JSON.stringify(buildAdfNoTrailingSpaces({ node })),
          });

          await clickAndDragSelectLineFromLineEnd({
            page,
            selector: LAST_NODE_SELECTOR,
          });

          await expectToMatchSelection(page, {
            type: 'text',
            anchor: 4,
            head: 1,
          });
        },
      );

      testCaseName =
        'No trailing spaces: Can select [target] nodes with the left arrow key and move across them';
      BrowserTestCase(
        testCaseName,
        {
          skip: skipTests?.[testCaseName],
        },
        async (client: BrowserObject) => {
          const page = await initEditor({
            client,
            selection: { anchor: 4, head: 4 },
            adf: JSON.stringify(buildAdfNoTrailingSpaces({ node })),
          });

          const expectedSelections: SelectionMatch[] = [
            { type: 'node', from: 3 },
            { type: 'text', from: 3 },
            { type: 'node', from: 2 },
            { type: 'text', from: 2 },
            { type: 'node', from: 1 },
            { type: 'text', from: 1 },
          ];

          for (const selection of expectedSelections) {
            await page.keys(['ArrowLeft']);
            await expectToMatchSelection(page, selection);
          }
        },
      );

      testCaseName =
        'No trailing spaces: Can select [target] nodes with the right arrow key and move across them';
      BrowserTestCase(
        testCaseName,
        {
          skip: skipTests?.[testCaseName],
        },
        async (client: BrowserObject) => {
          const page = await initEditor({
            client,
            selection: { anchor: 1, head: 1 },
            adf: JSON.stringify(buildAdfNoTrailingSpaces({ node })),
          });

          const expectedSelections: SelectionMatch[] = [
            { type: 'node', from: 1 },
            { type: 'text', from: 2 },
            { type: 'node', from: 2 },
            { type: 'text', from: 3 },
            { type: 'node', from: 3 },
            { type: 'text', from: 4 },
          ];

          for (const selection of expectedSelections) {
            await page.keys(['ArrowRight']);
            await expectToMatchSelection(page, selection);
          }
        },
      );

      testCaseName =
        'No trailing spaces: Can move the selection down one line using down arrow key when [target] is the first node of each line';
      BrowserTestCase(
        testCaseName,
        {
          skip: skipTests?.[testCaseName],
        },
        async (client: BrowserObject) => {
          const page = await initEditor({
            client,
            selection: { anchor: 1, head: 1 },
            adf: JSON.stringify(buildAdfMultipleNodesAcrossLines({ node })),
          });
          // At the time of creating this test, Chrome and Safari move the selection to the same
          // positions. This behaviour needs to be fixed so it is consistent across all browsers
          // however for now we are just making sure that the selection moves and isn't blocked.
          let expectedSelections: SelectionMatch[] = [
            { type: 'text', from: 6 },
            { type: 'text', from: 11 },
            { type: 'text', from: 16 },
            { type: 'text', from: 18 },
          ];

          if (page.isBrowser('firefox')) {
            expectedSelections = [
              { type: 'text', from: 3 },
              { type: 'text', from: 8 },
              { type: 'text', from: 13 },
            ];
          }

          for (const selection of expectedSelections) {
            await page.keys(['ArrowDown']);
            await expectToMatchSelection(page, selection);
          }
        },
      );

      testCaseName =
        'No trailing spaces: Can move the selection up one line using up arrow key when [target] is the first node of each line';
      BrowserTestCase(
        testCaseName,
        {
          skip: skipTests?.[testCaseName],
        },
        async (client: BrowserObject) => {
          const page = await initEditor({
            client,
            selection: { anchor: 18, head: 18 },
            adf: JSON.stringify(buildAdfMultipleNodesAcrossLines({ node })),
          });
          // At the time of creating this test, Chrome and Safari move the selection to the same
          // positions. This behaviour needs to be fixed so it is consistent across all browsers
          // however for now we are just making sure that the selection moves and isn't blocked.
          let expectedSelections: SelectionMatch[] = [
            { type: 'text', from: 16 },
            { type: 'text', from: 11 },
            { type: 'text', from: 6 },
            { type: 'text', from: 1 },
          ];

          if (page.isBrowser('firefox')) {
            expectedSelections = [
              { type: 'text', from: 13 },
              { type: 'text', from: 8 },
              { type: 'text', from: 3 },
              { type: 'text', from: 1 },
            ];
          }

          for (const selection of expectedSelections) {
            await page.keys(['ArrowUp']);
            await expectToMatchSelection(page, selection);
          }
        },
      );

      testCaseName =
        'No trailing spaces: Can move the selection down one line using down arrow key when in between [target] nodes';
      BrowserTestCase(
        testCaseName,
        {
          skip: skipTests?.[testCaseName],
        },
        async (client: BrowserObject) => {
          const page = await initEditor({
            client,
            selection: { anchor: 4, head: 4 },
            adf: JSON.stringify(buildAdfMultipleNodesAcrossLines({ node })),
          });
          // At the time of creating this test, Chrome and Safari move the selection to the same
          // positions. This behaviour needs to be fixed so it is consistent across all browsers
          // however for now we are just making sure that the selection moves and isn't blocked.
          let expectedSelections: SelectionMatch[] = [
            { type: 'text', from: 11 },
            { type: 'text', from: 16 },
            { type: 'text', from: 18 },
          ];

          if (page.isBrowser('firefox')) {
            expectedSelections = [
              { type: 'text', from: 9 },
              { type: 'text', from: 14 },
              { type: 'text', from: 18 },
            ];
          }

          for (const selection of expectedSelections) {
            await page.keys(['ArrowDown']);
            await expectToMatchSelection(page, selection);
          }
        },
      );

      testCaseName =
        'No trailing spaces: Can move the selection up one line using up arrow key when in between [target] nodes';
      BrowserTestCase(
        testCaseName,
        {
          skip: skipTests?.[testCaseName],
        },
        async (client: BrowserObject) => {
          const page = await initEditor({
            client,
            selection: { anchor: 14, head: 14 },
            adf: JSON.stringify(buildAdfMultipleNodesAcrossLines({ node })),
          });
          // At the time of creating this test, Chrome and Safari move the selection to the same
          // positions. This behaviour needs to be fixed so it is consistent across all browsers
          // however for now we are just making sure that the selection moves and isn't blocked.
          let expectedSelections: SelectionMatch[] = [
            { type: 'text', from: 11 },
            { type: 'text', from: 6 },
            { type: 'text', from: 1 },
          ];

          if (page.isBrowser('firefox')) {
            expectedSelections = [
              { type: 'text', from: 9 },
              { type: 'text', from: 4 },
              { type: 'text', from: 1 },
            ];
          }

          for (const selection of expectedSelections) {
            await page.keys(['ArrowUp']);
            await expectToMatchSelection(page, selection);
          }
        },
      );

      // TODO To unskip this test we need to fix the behaviour in Firefox and Chrome to match Safari
      // Firefox: Extends selection to the end of the line
      // Chrome: Selects two nodes at a time
      // Safari: Extends selection by one as expected
      testCaseName = `No trailing spaces: Can extend the selection right by one with shift + right arrow key to select [target] node`;
      BrowserTestCase(
        testCaseName,
        {
          skip: ['firefox', 'chrome', ...(skipTests?.[testCaseName] || [])],
        },
        async (client: BrowserObject) => {
          const page = await initEditor({
            client,
            selection: { anchor: 1, head: 1 },
            adf: JSON.stringify(buildAdfNoTrailingSpaces({ node })),
          });
          const expectedSelections: SelectionMatch[] = [
            { type: 'text', anchor: 1, head: 2 },
            { type: 'text', anchor: 1, head: 3 },
            { type: 'text', anchor: 1, head: 4 },
          ];

          await holdShiftInChrome(page);
          for (const selection of expectedSelections) {
            page.isBrowser('chrome')
              ? await page.keys(['ArrowRight'])
              : await page.keys(['Shift', 'ArrowRight'], true);

            await expectToMatchSelection(page, selection);
          }
        },
      );

      // TODO: To unskip this test we need to fix the behaviour in Firefox to match Safari & Chrome
      // Firefox: Extends selection to the start of the line
      // Safari + Chrome: Extends selection by one as expected
      testCaseName =
        'No trailing spaces: Can extend the selection left by one with shift + left arrow key to select [target] node';
      BrowserTestCase(
        testCaseName,
        {
          skip: ['firefox', ...(skipTests?.[testCaseName] || [])],
        },
        async (client: BrowserObject) => {
          const page = await initEditor({
            client,
            selection: { anchor: 4, head: 4 },
            adf: JSON.stringify(buildAdfNoTrailingSpaces({ node })),
          });
          const expectedSelections: SelectionMatch[] = [
            { type: 'text', anchor: 4, head: 3 },
            { type: 'text', anchor: 4, head: 2 },
            { type: 'text', anchor: 4, head: 1 },
          ];

          await holdShiftInChrome(page);
          for (const selection of expectedSelections) {
            page.isBrowser('chrome')
              ? await page.keys(['ArrowLeft'])
              : await page.keys(['Shift', 'ArrowLeft'], true);

            await expectToMatchSelection(page, selection);
          }
        },
      );

      // TODO To unskip this test we need to fix the behaviour in Chrome + Safari to match Firefox
      // Firefox: Extends selection to same vertical position one line up
      // Chrome + Safari: Extends selection to position after the last node on the line above
      testCaseName =
        'No trailing spaces: Can extend the selection one line up with shift + arrow up';
      BrowserTestCase(
        testCaseName,
        {
          skip: ['safari', 'chrome', ...(skipTests?.[testCaseName] || [])],
        },
        async (client: BrowserObject) => {
          const page = await initEditor({
            client,
            selection: { anchor: 18, head: 18 },
            adf: JSON.stringify(buildAdfMultipleNodesAcrossLines({ node })),
          });
          const expectedSelections: SelectionMatch[] = [
            { type: 'text', anchor: 18, head: 13 },
            { type: 'text', anchor: 18, head: 8 },
            { type: 'text', anchor: 18, head: 3 },
            { type: 'text', anchor: 18, head: 1 },
          ];

          await holdShiftInChrome(page);
          for (const selection of expectedSelections) {
            page.isBrowser('chrome')
              ? await page.keys(['ArrowUp'])
              : await page.keys(['Shift', 'ArrowUp'], true);

            await expectToMatchSelection(page, selection);
          }
        },
      );

      // TODO To unskip this test we need to fix the behaviour in Chrome + Safari to match Firefox
      // Firefox: Extends selection to same vertical position one line down
      // Chrome + Safari: Extends selection to position after the last node on the line below
      testCaseName =
        'No trailing spaces: Can extend the selection one line down with shift + arrow down';
      BrowserTestCase(
        testCaseName,
        {
          skip: ['safari', 'chrome', ...(skipTests?.[testCaseName] || [])],
        },
        async (client: BrowserObject) => {
          const page = await initEditor({
            client,
            selection: { anchor: 1, head: 1 },
            adf: JSON.stringify(buildAdfMultipleNodesAcrossLines({ node })),
          });
          const expectedSelections: SelectionMatch[] = [
            { type: 'text', anchor: 1, head: 3 },
            { type: 'text', anchor: 1, head: 8 },
            { type: 'text', anchor: 1, head: 13 },
            { type: 'text', anchor: 1, head: 18 },
          ];

          await holdShiftInChrome(page);
          for (const selection of expectedSelections) {
            page.isBrowser('chrome')
              ? await page.keys(['ArrowDown'])
              : await page.keys(['Shift', 'ArrowDown'], true);

            await expectToMatchSelection(page, selection);
          }
        },
      );

      testCaseName =
        'No trailing spaces: Can insert text directly after the last node view in the same paragraph';
      BrowserTestCase(
        testCaseName,
        {
          skip: skipTests?.[testCaseName],
        },
        async (client: BrowserObject) => {
          const page = await initEditor({
            client,
            selection: { anchor: 4, head: 4 },
            adf: JSON.stringify(buildAdfNoTrailingSpaces({ node })),
          });

          await page.keyboard.type('test', []);

          // See https://product-fabric.atlassian.net/browse/ED-12003
          await expectToMatchSelection(page, {
            type: 'text',
            anchor: 8,
            head: 8,
          });
        },
      );
    });

    if (multiLineNode) {
      // Skipped test in all browsers as it was flaking, however behaviour is as expected when tetsing manually in browser
      describe(`Multiline [${nodeName}] with no trailing spaces`, () => {
        testCaseName =
          'Multiline [target] no trailing spaces: Can insert text directly after the last node view in the same paragraph';
        BrowserTestCase(
          testCaseName,
          {
            skip: skipTests?.[testCaseName],
          },
          async (client: BrowserObject) => {
            const page = await initEditor({
              client,
              selection: { anchor: 7, head: 7 },
              adf: JSON.stringify(buildAdfMultiline({ node })),
            });

            await page.keyboard.type('test', []);

            await expectToMatchSelection(page, {
              type: 'text',
              anchor: 11,
              head: 11,
            });
          },
        );
      });
    }
  });
}
