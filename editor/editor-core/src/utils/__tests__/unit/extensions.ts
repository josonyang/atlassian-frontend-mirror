import type { CreateUIAnalyticsEvent } from '@atlaskit/analytics-next/types';
import { INPUT_METHOD } from '@atlaskit/editor-common/analytics';
import { DefaultExtensionProvider } from '@atlaskit/editor-common/extensions';
import type {
	ExtensionManifest,
	ExtensionModule,
	ExtensionProvider,
} from '@atlaskit/editor-common/extensions';
import type { EditorState } from '@atlaskit/editor-prosemirror/state';
// eslint-disable-next-line import/no-extraneous-dependencies -- Removed import for fixing circular dependencies
import { createFakeExtensionManifest } from '@atlaskit/editor-test-helpers/extensions';

import type EditorActions from '../../../actions';
import { extensionProviderToQuickInsertProvider } from '../../extensions';

function replaceCustomQuickInsertModules(
	manifest: ExtensionManifest,
	quickInsertModule: ExtensionModule,
): ExtensionManifest {
	manifest.modules.quickInsert = [quickInsertModule];
	return manifest;
}

function setup(customManifests: ExtensionManifest[] = []) {
	const dummyExtension1 = createFakeExtensionManifest({
		title: 'First dummy extension',
		type: 'com.atlassian.forge',
		extensionKey: 'first',
	});

	const dummyExtension2 = createFakeExtensionManifest({
		title: 'Second dummy extension',
		type: 'com.atlassian.forge',
		extensionKey: 'second',
	});

	return new DefaultExtensionProvider([dummyExtension1, dummyExtension2, ...customManifests]);
}

describe('#extensionProviderToQuickInsertProvider', () => {
	let dummyExtensionProvider: ExtensionProvider;
	beforeEach(() => {
		dummyExtensionProvider = setup();
	});
	it('should returns quickInsert items from all extensions', async () => {
		const quickInsertProvider = await extensionProviderToQuickInsertProvider(
			dummyExtensionProvider,
			{} as EditorActions,
		);

		const items = await quickInsertProvider.getItems();

		expect(items).toMatchObject([
			{ title: 'First dummy extension' },
			{ title: 'Second dummy extension' },
		]);
	});

	it('should create analytics event when inserted', async () => {
		const dummyExtensionProvider = setup();
		const createAnalyticsEvent = jest.fn(() => ({ fire() {} }));
		const quickInsertProvider = await extensionProviderToQuickInsertProvider(
			dummyExtensionProvider,
			{} as EditorActions,
			createAnalyticsEvent as unknown as CreateUIAnalyticsEvent,
		);

		const items = await quickInsertProvider.getItems();

		items[0].action(jest.fn(), {} as EditorState);

		expect(createAnalyticsEvent).toHaveBeenCalledWith(
			expect.objectContaining({
				action: 'inserted',
				actionSubject: 'document',
				actionSubjectId: 'extension',
				attributes: {
					extensionType: 'com.atlassian.forge',
					extensionKey: 'first',
					key: 'first:default',
					inputMethod: 'quickInsert',
				},
				eventType: 'track',
			}),
		);
	});

	it('should create analytics with inputMethod as toolbar event when inserted', async () => {
		const dummyExtensionProvider = setup();
		const createAnalyticsEvent = jest.fn(() => ({ fire() {} }));
		const quickInsertProvider = await extensionProviderToQuickInsertProvider(
			dummyExtensionProvider,
			{} as EditorActions,
			createAnalyticsEvent as unknown as CreateUIAnalyticsEvent,
		);

		const items = await quickInsertProvider.getItems();

		items[0].action(jest.fn(), {} as EditorState, INPUT_METHOD.TOOLBAR);

		expect(createAnalyticsEvent).toHaveBeenCalledWith(
			expect.objectContaining({
				action: 'inserted',
				actionSubject: 'document',
				actionSubjectId: 'extension',
				attributes: {
					extensionType: 'com.atlassian.forge',
					extensionKey: 'first',
					key: 'first:default',
					inputMethod: 'toolbar',
				},
				eventType: 'track',
			}),
		);
	});

	describe('with an async quickInsert item', () => {
		beforeEach(() => {
			const asyncDummyExtension3 = replaceCustomQuickInsertModules(
				createFakeExtensionManifest({
					title: 'Async dummy extension',
					type: 'com.atlassian.forge',
					extensionKey: 'async',
				}),
				{
					key: 'default-async',
					action: () =>
						Promise.resolve({
							__esModule: true,
							default: { type: 'br' },
						}),
				},
			);

			dummyExtensionProvider = setup([asyncDummyExtension3]);
		});

		it('should create analytics event when inserted async', async () => {
			const createAnalyticsEvent = jest.fn(() => ({ fire() {} }));
			const quickInsertProvider = await extensionProviderToQuickInsertProvider(
				dummyExtensionProvider,
				{ replaceSelection: () => {} } as unknown as EditorActions,
				createAnalyticsEvent as unknown as CreateUIAnalyticsEvent,
			);

			const items = await quickInsertProvider.getItems();

			items[2].action(jest.fn(), {} as EditorState);

			// We need to wait for the next tick, to resolve the external module.
			await new Promise((resolve) => process.nextTick(resolve));

			expect(createAnalyticsEvent).toHaveBeenCalledWith(
				expect.objectContaining({
					action: 'inserted',
					actionSubject: 'document',
					actionSubjectId: 'extension',
					attributes: {
						extensionKey: 'async',
						extensionType: 'com.atlassian.forge',
						key: 'async:default-async',
						inputMethod: 'quickInsert',
					},
					eventType: 'track',
				}),
			);
		});
	});
});
