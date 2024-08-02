import {
	EditorDateModel,
	EditorEmojiModel,
	EditorMainToolbarModel,
	EditorNodeContainerModel,
	EditorPopupModel,
	expect,
	fixTest,
	editorTestCase as test,
} from '@af/editor-libra';

import { adfDate, emptyDocument } from './escape-keydown.spec.ts-fixtures';

test.describe('Escape Keydown: date', () => {
	test.use({
		editorProps: {
			appearance: 'full-page',
			allowDate: true,
		},
		adf: adfDate,
	});

	test('escape keydown event should not bubble to document when menu open', async ({ editor }) => {
		fixTest({ jiraIssueId: 'ED-17195', reason: 'Not working' });
		await editor.page.evaluate(() => {
			document.addEventListener('keydown', (event) => {
				if (event.key === 'Escape') {
					const elem = document.createElement('div');
					elem.setAttribute('data-testid', 'bubble');
					document.body.appendChild(elem);
				}
			});
		});

		const popupModel = EditorPopupModel.from(editor);
		const nodes = EditorNodeContainerModel.from(editor);
		const dateModel = EditorDateModel.from(nodes.date.first());
		await dateModel.openCalendar(popupModel);

		await editor.keyboard.press('Escape');
		await expect(editor.page.locator('[data-testid="bubble"]')).toHaveCount(0);

		await editor.keyboard.press('Escape');
		await expect(editor.page.locator('[data-testid="bubble"]')).toHaveCount(0);

		await editor.keyboard.press('Escape');
		await expect(editor.page.locator('[data-testid="bubble"]')).toHaveCount(1);
	});
});

test.describe('Escape Keydown: insert block', () => {
	test.use({
		editorProps: {
			appearance: 'full-page',
		},
		platformFeatureFlags: {
			'editor-fix-esc-main-toolbar-navigation': true,
		},
	});

	test('escape keydown event should not bubble to document when menu open', async ({ editor }) => {
		await editor.page.evaluate(() => {
			document.addEventListener('keydown', (event) => {
				if (event.key === 'Escape') {
					const elem = document.createElement('div');
					elem.setAttribute('data-testid', 'bubble');
					document.body.appendChild(elem);
				}
			});
		});

		const toolbar = EditorMainToolbarModel.from(editor);
		await toolbar.openInsertMenu();

		await editor.keyboard.press('Escape');
		await expect(editor.page.locator('[data-testid="bubble"]')).toHaveCount(0);

		await editor.keyboard.press('Escape');
		await expect(editor.page.locator('[data-testid="bubble"]')).toHaveCount(0);

		await editor.keyboard.press('Escape');
		await expect(editor.page.locator('[data-testid="bubble"]')).toHaveCount(1);
	});
});

test.describe('Escape Keydown: text color', () => {
	test.use({
		editorProps: {
			appearance: 'full-page',
			allowTextColor: true,
		},
		adf: emptyDocument,
		platformFeatureFlags: {
			'editor-fix-esc-main-toolbar-navigation': true,
		},
	});

	test('escape keydown event should not bubble to document when menu open', async ({ editor }) => {
		await editor.page.evaluate(() => {
			document.addEventListener('keydown', (event) => {
				if (event.key === 'Escape') {
					const elem = document.createElement('div');
					elem.setAttribute('data-testid', 'bubble');
					document.body.appendChild(elem);
				}
			});
		});

		const toolbar = EditorMainToolbarModel.from(editor);
		await toolbar.clickAt('Text color');
		const popup = EditorPopupModel.from(editor);
		const textColorPalette = popup.locator('[data-testid="text-color-palette"]');
		await textColorPalette.waitFor({ state: 'visible' });
		await editor.keyboard.press('Escape');
		await expect(editor.page.locator('[data-testid="bubble"]')).toHaveCount(0);

		await editor.keyboard.press('Escape');
		await expect(editor.page.locator('[data-testid="bubble"]')).toHaveCount(0);

		await editor.keyboard.press('Escape');
		await expect(editor.page.locator('[data-testid="bubble"]')).toHaveCount(1);
	});
});

test.describe('Escape Keydown: font style', () => {
	test.use({
		editorProps: {
			appearance: 'full-page',
		},
		platformFeatureFlags: {
			'editor-fix-esc-main-toolbar-navigation': true,
		},
	});

	test('escape keydown event should not bubble to document when menu open', async ({ editor }) => {
		await editor.page.evaluate(() => {
			document.addEventListener('keydown', (event) => {
				if (event.key === 'Escape') {
					const elem = document.createElement('div');
					elem.setAttribute('data-testid', 'bubble');
					document.body.appendChild(elem);
				}
			});
		});

		const toolbar = EditorMainToolbarModel.from(editor);
		await toolbar.clickAt('Text styles');

		await editor.keyboard.press('Escape');
		await expect(editor.page.locator('[data-testid="bubble"]')).toHaveCount(0);

		await editor.keyboard.press('Escape');
		await expect(editor.page.locator('[data-testid="bubble"]')).toHaveCount(0);

		await editor.keyboard.press('Escape');
		await expect(editor.page.locator('[data-testid="bubble"]')).toHaveCount(1);
	});
});

test.describe('Escape Keydown: text alignment', () => {
	test.use({
		editorProps: {
			appearance: 'full-page',
			allowTextAlignment: true,
		},
		adf: emptyDocument,
		platformFeatureFlags: {
			'editor-fix-esc-main-toolbar-navigation': true,
		},
	});

	test('escape keydown event should not bubble to document when menu open', async ({ editor }) => {
		await editor.page.evaluate(() => {
			document.addEventListener('keydown', (event) => {
				if (event.key === 'Escape') {
					const elem = document.createElement('div');
					elem.setAttribute('data-testid', 'bubble');
					document.body.appendChild(elem);
				}
			});
		});

		const toolbar = EditorMainToolbarModel.from(editor);

		await toolbar.clickAt('Text alignment');

		await editor.keyboard.press('Escape');
		await expect(editor.page.locator('[data-testid="bubble"]')).toHaveCount(0);

		await editor.keyboard.press('Escape');
		await expect(editor.page.locator('[data-testid="bubble"]')).toHaveCount(0);

		await editor.keyboard.press('Escape');
		await expect(editor.page.locator('[data-testid="bubble"]')).toHaveCount(1);
	});
});

test.describe('Escape Keydown: more formatting', () => {
	test.use({
		editorProps: {
			appearance: 'full-page',
		},
		platformFeatureFlags: {
			'editor-fix-esc-main-toolbar-navigation': true,
		},
	});

	test('escape keydown event should not bubble to document when menu open', async ({ editor }) => {
		await editor.page.evaluate(() => {
			document.addEventListener('keydown', (event) => {
				if (event.key === 'Escape') {
					const elem = document.createElement('div');
					elem.setAttribute('data-testid', 'bubble');
					document.body.appendChild(elem);
				}
			});
		});

		await editor.selection.set({ anchor: 2, head: 2 });

		const toolbar = EditorMainToolbarModel.from(editor);
		const moreFormattingMenu = await toolbar.openMoreFormattingMenu();
		await expect(moreFormattingMenu.menu).toBeVisible();

		await editor.keyboard.press('Escape');
		await expect(editor.page.locator('[data-testid="bubble"]')).toHaveCount(0);

		await editor.keyboard.press('Escape');
		await expect(editor.page.locator('[data-testid="bubble"]')).toHaveCount(0);

		await editor.keyboard.press('Escape');
		await expect(editor.page.locator('[data-testid="bubble"]')).toHaveCount(1);
	});
});

test.describe('Escape Keydown: Emoji', () => {
	test.use({
		editorProps: {
			appearance: 'full-page',
		},
	});

	test('escape keydown event should not bubble to document when menu open', async ({ editor }) => {
		await editor.page.evaluate(() => {
			document.addEventListener('keydown', (event) => {
				if (event.key === 'Escape') {
					const elem = document.createElement('div');
					elem.setAttribute('data-testid', 'bubble');
					document.body.appendChild(elem);
				}
			});
		});

		const nodes = EditorNodeContainerModel.from(editor);
		const emojiModel = EditorEmojiModel.from(nodes.emoji, editor);
		await emojiModel.search('smile');

		await editor.keyboard.press('Escape');
		await expect(editor.page.locator('[data-testid="bubble"]')).toHaveCount(0);

		await editor.keyboard.press('Escape');
		await expect(editor.page.locator('[data-testid="bubble"]')).toHaveCount(1);
	});
});

test.describe('Escape Keydown: Quick Insert', () => {
	test.use({
		editorProps: {
			appearance: 'full-page',
		},
	});

	test('escape keydown event should not bubble to document when menu open', async ({ editor }) => {
		await editor.page.evaluate(() => {
			document.addEventListener('keydown', (event) => {
				if (event.key === 'Escape') {
					const elem = document.createElement('div');
					elem.setAttribute('data-testid', 'bubble');
					document.body.appendChild(elem);
				}
			});
		});

		await editor.typeAhead.search('');

		await editor.keyboard.press('Escape');
		await expect(editor.page.locator('[data-testid="bubble"]')).toHaveCount(0);

		await editor.keyboard.press('Escape');
		await expect(editor.page.locator('[data-testid="bubble"]')).toHaveCount(1);
	});
});
