import React from 'react';

import { render, screen } from '@testing-library/react';

import { BaseTheme } from '@atlaskit/editor-common/ui';
import { akEditorFullPageDefaultFontSize } from '@atlaskit/editor-shared-styles';
import { fg } from '@atlaskit/platform-feature-flags';
import { eeTest } from '@atlaskit/tmp-editor-statsig/editor-experiments-test-utils';
import { setupEditorExperiments } from '@atlaskit/tmp-editor-statsig/setup';
import { setGlobalTheme } from '@atlaskit/tokens/set-global-theme';
jest.mock('@atlaskit/platform-feature-flags', () => ({
	fg: jest.fn(),
}));
const fgMock = fg as jest.Mock;

import { EditorContentContainerEmotion } from '../../../ui/EditorContentContainer/EditorContentContainer-emotion';

// jest doesn't support @container styles in css
// so we need to mock the css function to remove them
jest.mock('@emotion/react', () => {
	const originalModule = jest.requireActual('@emotion/react');
	return {
		...originalModule,
		css: (...args: any[]) => {
			const styles = originalModule.css(...args);
			// Remove or mock @container styles
			return {
				...styles,
				// eslint-disable-next-line require-unicode-regexp
				styles: styles.styles.replace(/@container[^{]*{[^{}]*({[^{}]*}[^{}]*)*}/g, ''),
			};
		},
	};
});

// this test is mainly to check if dev only updated legacy styles, and forget to update in the new styles
// if the new styles are not updated, we will see a difference in the snapshot
// and dev should update the new styles, and then update the snapshot
describe('Editor Content styles', () => {
	beforeEach(() => {
		setGlobalTheme({ typography: 'typography' });
		fgMock.mockReturnValue(true);
	});

	afterEach(() => {
		setupEditorExperiments('test', {});
		jest.clearAllMocks();
	});

	describe('full page editor', () => {
		it('should render scroll container styles in new editor styles', async () => {
			render(
				<BaseTheme baseFontSize={akEditorFullPageDefaultFontSize}>
					<EditorContentContainerEmotion
						appearance="full-page"
						// eslint-disable-next-line @atlaskit/ui-styling-standard/no-classname-prop
						className="fabric-editor-popup-scroll-parent"
						// featureFlags={}
						viewMode={'edit'}
						isScrollable
					>
						<div data-testid="child-component">Full page</div>
					</EditorContentContainerEmotion>
				</BaseTheme>,
			);

			const results = screen.getByTestId('editor-content-container');
			expect(results).toBeInTheDocument();
			expect(results).toHaveCompiledCss({
				flexGrow: '1',
				height: '100%',
				overflowY: 'scroll',
				position: 'relative',
				display: 'flex',
				flexDirection: 'column',
				scrollBehavior: 'smooth',
				// style from scrollbarStyles
				'-ms-overflow-style': '-ms-autohiding-scrollbar',
			});

			await expect(document.body).toBeAccessible();
		});
	});

	eeTest
		.describe('platform_editor_table_css_overflow_shadow', 'CSS-only table overflow shadow styles')
		.variant(true, () => {
			it('renders the table overflow shadow styles from the editor content container', () => {
				render(
					<BaseTheme baseFontSize={akEditorFullPageDefaultFontSize}>
						<EditorContentContainerEmotion appearance="full-page" viewMode="edit">
							{/* eslint-disable-next-line @atlaskit/ui-styling-standard/no-classname-prop */}
							<div className="ProseMirror">
								{/* eslint-disable-next-line @atlaskit/ui-styling-standard/no-classname-prop */}
								<div className="pm-table-container">
									{/* eslint-disable-next-line @atlaskit/ui-styling-standard/no-classname-prop */}
									<div className="pm-table-wrapper pm-table-scroll-inline-shadow" />
									<div data-testid="table-overflow-shadow" data-table-overflow-shadow="start" />
								</div>
							</div>
						</EditorContentContainerEmotion>
					</BaseTheme>,
				);

				const emotionStyles = Array.from(document.querySelectorAll('style[data-emotion]'))
					.map((style) => style.textContent)
					.join('');

				expect(emotionStyles).toContain('data-table-overflow-shadow');
				expect(emotionStyles).toContain('animation-timeline:--editor-table-inline-scroll');
				expect(emotionStyles).toContain('position:absolute');
			});
		});

	eeTest
		.describe('editor_tinymce_full_width_mode', 'when max width mode feature is enabled')
		.variant(true, () => {
			eeTest
				.describe(
					'confluence_max_width_content_appearance',
					'when max width mode feature is enabled',
				)
				.variant(true, () => {
					describe('max width editor', () => {
						it('should render scroll container styles in new editor styles', async () => {
							render(
								<BaseTheme baseFontSize={akEditorFullPageDefaultFontSize}>
									<EditorContentContainerEmotion
										appearance="max"
										// eslint-disable-next-line @atlaskit/ui-styling-standard/no-classname-prop
										className="fabric-editor-popup-scroll-parent"
										viewMode={'edit'}
										isScrollable
									>
										<div data-testid="child-component">Full page</div>
									</EditorContentContainerEmotion>
								</BaseTheme>,
							);

							const results = screen.getByTestId('editor-content-container');
							expect(results).toBeInTheDocument();
							expect(results).toHaveCompiledCss({
								flexGrow: '1',
								height: '100%',
								overflowY: 'scroll',
								position: 'relative',
								display: 'flex',
								flexDirection: 'column',
								scrollBehavior: 'smooth',
								// style from scrollbarStyles
								'-ms-overflow-style': '-ms-autohiding-scrollbar',
							});

							await expect(document.body).toBeAccessible();
						});
					});
				});
		});

	describe('comment editor', () => {
		it('should render comment specific styles in new editor styles', async () => {
			render(
				<BaseTheme baseFontSize={akEditorFullPageDefaultFontSize}>
					<EditorContentContainerEmotion
						appearance="comment"
						// eslint-disable-next-line @atlaskit/ui-styling-standard/no-classname-prop
						className="fabric-editor-popup-scroll-parent"
						// featureFlags={}
						viewMode={'edit'}
						isScrollable
					>
						<div data-testid="child-component">Comment</div>
					</EditorContentContainerEmotion>
				</BaseTheme>,
			);

			const results = screen.getByTestId('editor-content-container');
			expect(results).toBeInTheDocument();
			expect(results).toHaveCompiledCss({
				flexGrow: '1',
				overflowX: 'clip',
				lineHeight: '24px',
			});

			// Check for tableCommentEditorStyles
			const emotionStyles = Array.from(document.querySelectorAll('style[data-emotion]')).map(
				(el) => el.textContent,
			);
			const tableCommentEditorEmotionStyles: string[] = [];
			emotionStyles.forEach((es) => {
				if (es?.includes('.ProseMirror .pm-table-wrapper>table')) {
					tableCommentEditorEmotionStyles.push(es);
				}
			});
			expect(tableCommentEditorEmotionStyles.length).toBeGreaterThan(0);
			expect(tableCommentEditorEmotionStyles[0]).toContain(
				'margin-left:0;margin-right:0;-ms-overflow-style:-ms-autohiding-scrollbar;',
			);

			await expect(document.body).toBeAccessible();
		});
	});

	eeTest.describe('platform_editor_floating_toc', 'when disabled').variant(false, () => {
		it('does not apply heading scroll margin', () => {
			render(
				<EditorContentContainerEmotion appearance="full-page" viewMode="edit">
					{/* eslint-disable-next-line @atlaskit/ui-styling-standard/no-classname-prop -- ProseMirror class is required to exercise editor content styles. */}
					<div className="ProseMirror">
						<h1>Heading 1</h1>
					</div>
				</EditorContentContainerEmotion>,
			);

			expect(window.getComputedStyle(screen.getByRole('heading')).scrollMarginTop).toBe('');
		});
	});

	eeTest.describe('platform_editor_floating_toc', 'when enabled').variant(true, () => {
		it('applies scroll margin to every heading level', () => {
			render(
				<EditorContentContainerEmotion appearance="full-page" viewMode="edit">
					{/* eslint-disable-next-line @atlaskit/ui-styling-standard/no-classname-prop -- ProseMirror class is required to exercise editor content styles. */}
					<div className="ProseMirror">
						<h1>Heading 1</h1>
						<h2>Heading 2</h2>
						<h3>Heading 3</h3>
						<h4>Heading 4</h4>
						<h5>Heading 5</h5>
						<h6>Heading 6</h6>
					</div>
				</EditorContentContainerEmotion>,
			);

			screen.getAllByRole('heading').forEach((heading) => {
				expect(window.getComputedStyle(heading).scrollMarginTop).toMatch(
					/^var\(--ds-space-300,\s?24px\)$/u,
				);
			});
		});
	});
});
