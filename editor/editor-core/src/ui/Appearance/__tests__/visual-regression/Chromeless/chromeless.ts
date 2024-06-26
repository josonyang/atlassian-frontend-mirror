// eslint-disable-next-line import/no-extraneous-dependencies -- Removed import for fixing circular dependencies
import {
	initChromelessEditorWithAdf,
	snapshot,
} from '@atlaskit/editor-test-helpers/vr-utils/base-utils';
import type { PuppeteerPage } from '@atlaskit/visual-regression/helper';

import { createDocumentWithParagraphs } from '../__fixtures/paragraph-content';

describe('Chromeless', () => {
	let page: PuppeteerPage;
	beforeAll(() => {
		page = global.page;
	});

	afterEach(async () => {
		await snapshot(page);
	});

	test('empty content', async () => {
		await initChromelessEditorWithAdf(page, {});
	});

	test('empty content with minHeight', async () => {
		await initChromelessEditorWithAdf(page, {}, undefined, undefined, {
			minHeight: 250,
		});
	});

	test('with short content', async () => {
		await initChromelessEditorWithAdf(page, createDocumentWithParagraphs());
	});

	test('with long content', async () => {
		await initChromelessEditorWithAdf(page, createDocumentWithParagraphs(10));
	});

	test('with long content but maxHeight set', async () => {
		await initChromelessEditorWithAdf(
			page,
			createDocumentWithParagraphs(10),
			undefined,
			undefined,
			{ maxHeight: 150 },
		);
	});
});
