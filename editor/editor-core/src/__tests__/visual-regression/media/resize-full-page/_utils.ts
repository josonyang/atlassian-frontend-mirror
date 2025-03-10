/* eslint-disable import/no-extraneous-dependencies -- Removed from package.json to fix  circular depdencies */
import {
	animationFrame,
	getEditorWidth,
	selectors,
} from '@atlaskit/editor-test-helpers/page-objects/editor';
import type { TestPageConfig } from '@atlaskit/editor-test-helpers/page-objects/media';
import {
	changeMediaLayout,
	clickMediaInPosition,
	isLayoutAvailable,
	MediaLayout,
	MediaResizeSide,
	resizeMediaInPositionWithSnapshot,
	scrollToMedia,
	waitForMediaToBeLoaded,
} from '@atlaskit/editor-test-helpers/page-objects/media';
/* eslint-disable import/no-extraneous-dependencies -- Removed from package.json to fix  circular depdencies */
import {
	initFullPageEditorWithAdf,
	snapshot,
} from '@atlaskit/editor-test-helpers/vr-utils/base-utils';
import { type PuppeteerPage, waitForFloatingControl } from '@atlaskit/visual-regression/helper';

/* eslint-disable import/no-extraneous-dependencies -- Removed from package.json to fix  circular depdencies */
import type { EditorProps } from '../../../../types';
import mediaSelectionAdf from '../__fixtures__/mediaSingle-image.adf.json';
import bulletListAdf from '../__fixtures__/mediaSingle-in-buttetList.adf.json';
import * as layout2Col from '../__fixtures__/mediaSingle-in-column.adf.json';

export function createResizeFullPageForConfig(config: TestPageConfig) {
	const initEditor = async (
		page: PuppeteerPage,
		editorProps: Partial<EditorProps>,
		viewport?: { width: number; height: number },
		defaultValue?: Object,
	) => {
		await initFullPageEditorWithAdf(page, defaultValue || {}, undefined, viewport, editorProps);
		// wait for editor
		await page.waitForSelector(selectors.editor);
		await page.click(selectors.editor);
	};

	describe('Snapshot Test: Media', () => {
		describe('full page editor', () => {
			let page: PuppeteerPage;
			beforeAll(async () => {
				page = global.page;
			});

			// run the suite of tests for each viewport/prop combination
			const {
				viewport: { width, height },
			} = config;

			describe(`at ${width}x${height}, without allow resizing`, () => {
				beforeEach(async () => {
					// setup the editor
					await initEditor(
						page,
						{
							media: { allowResizing: false },
						},
						{ width, height },
						mediaSelectionAdf,
					);
				});

				// Ignored via go/ees007
				// eslint-disable-next-line @atlaskit/editor/enforce-todo-comment-format
				// FIXME: Skipping theses tests as it has been failing on master on CI due to "Screenshot comparison failed" issue.
				// Build URL: https://bitbucket.org/atlassian/atlassian-frontend/pipelines/results/2319963/steps/%7B31b3ca1c-6917-4861-88ed-d816d6fae22f%7D
				if (isLayoutAvailable(MediaLayout.wide, width)) {
					it.skip('can make an image wide', async () => {
						await waitForMediaToBeLoaded(page);
						await clickMediaInPosition(page, 0);
						await animationFrame(page);
						await changeMediaLayout(page, MediaLayout.wide);
						await clickMediaInPosition(page, 0);
						await animationFrame(page);
						await scrollToMedia(page);
						await animationFrame(page);
						await snapshot(page);
					});
				}

				if (isLayoutAvailable(MediaLayout.fullWidth, width)) {
					it('can make an image full-width', async () => {
						await waitForMediaToBeLoaded(page);
						await clickMediaInPosition(page, 0);
						await animationFrame(page);
						await changeMediaLayout(page, MediaLayout.fullWidth);
						await animationFrame(page);
						await clickMediaInPosition(page, 0);
						await waitForFloatingControl(page, 'Media floating controls');
						await scrollToMedia(page);
						await animationFrame(page);
						await snapshot(page);
					});
				}
			});

			describe(`at ${width}x${height}`, () => {
				let editorWidth: number;

				beforeEach(async () => {
					// setup the editor
					await initEditor(page, {}, { width, height }, mediaSelectionAdf);
					editorWidth = await getEditorWidth(page);
				});

				describe('center layout', () => {
					[2, 6, 10].forEach((cols) => {
						it(`can make an image ${cols} columns wide`, async () => {
							const distance = -((editorWidth / 2) * ((12 - cols) / 12));
							await waitForMediaToBeLoaded(page);
							await scrollToMedia(page);
							await animationFrame(page);
							await resizeMediaInPositionWithSnapshot(page, 0, distance);
						});
					});
				});

				describe('wrap-left layout', () => {
					[2, 6, 10].forEach((cols) => {
						it(`can make an wrap-left image ${cols} columns wide`, async () => {
							const distance = -((editorWidth / 12) * (12 - cols));
							await waitForMediaToBeLoaded(page);
							await scrollToMedia(page);
							await animationFrame(page);
							await clickMediaInPosition(page, 0);
							await changeMediaLayout(page, MediaLayout.wrapLeft);

							await resizeMediaInPositionWithSnapshot(page, 0, distance);
						});
					});
				});

				describe('wrap-right layout', () => {
					[2, 6, 10].forEach((cols) => {
						it(`can make an wrap-right image ${cols} columns wide`, async () => {
							const distance = (editorWidth / 12) * (12 - cols);
							await waitForMediaToBeLoaded(page);
							await scrollToMedia(page);
							await animationFrame(page);
							await clickMediaInPosition(page, 0);
							await animationFrame(page);
							await changeMediaLayout(page, MediaLayout.wrapRight);
							await animationFrame(page);

							await resizeMediaInPositionWithSnapshot(page, 0, distance, MediaResizeSide.left);
						});
					});
				});

				describe('lists', () => {
					[2, 6, 10].forEach((cols) => {
						it(`can make an image in a list ${cols} columns wide`, async () => {
							await initEditor(page, {}, { width, height }, bulletListAdf);
							await waitForMediaToBeLoaded(page);
							await scrollToMedia(page);
							await animationFrame(page);
							const distance = -((editorWidth / 12) * (12 - cols));
							await resizeMediaInPositionWithSnapshot(page, 0, distance);
						});
					});
				});

				describe('in columns', () => {
					it(`can resize images inside a column`, async () => {
						await initEditor(
							page,
							{
								allowLayouts: {
									allowBreakout: true,
									UNSAFE_addSidebarLayouts: true,
								},
							},
							{ width, height },
							layout2Col,
						);
						await waitForMediaToBeLoaded(page);
						const editorWidth = await getEditorWidth(page);
						const distance = -((editorWidth / 12) * 10);

						const firstLayoutColSelector = 'div[data-layout-section] > div:first-of-type';
						await page.waitForSelector(firstLayoutColSelector);
						await page.click(firstLayoutColSelector);
						await animationFrame(page);
						await resizeMediaInPositionWithSnapshot(page, 0, distance);
					});
				});
			});
		});
	});
}
