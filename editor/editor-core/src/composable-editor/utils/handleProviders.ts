import type { ExtensionProvider } from '@atlaskit/editor-common/extensions';
import type {
	ProviderFactory,
	Providers,
	QuickInsertProvider,
} from '@atlaskit/editor-common/provider-factory';
import { fg } from '@atlaskit/platform-feature-flags';

/**
 *
 * Utility to set all the providers on a provider factory
 *
 * @param providerFactory
 * @param props
 * @param extensionProvider
 * @param quickInsertProvider
 */
export default function handleProviders(
	providerFactory: ProviderFactory,
	{
		emojiProvider,
		mentionProvider,
		taskDecisionProvider,
		contextIdentifierProvider,
		collabEditProvider,
		activityProvider,
		presenceProvider,
		macroProvider,
		imageUploadProvider,
		mediaProvider,
		autoformattingProvider,
		searchProvider,
		cardProvider,
	}: Providers,
	extensionProvider?: ExtensionProvider,
	quickInsertProvider?: Promise<QuickInsertProvider>,
): void {
	if (!fg('platform_editor_get_emoji_provider_from_config')) {
		providerFactory.setProvider('emojiProvider', emojiProvider);
	}
	providerFactory.setProvider('mentionProvider', mentionProvider);
	providerFactory.setProvider('taskDecisionProvider', taskDecisionProvider);
	providerFactory.setProvider('contextIdentifierProvider', contextIdentifierProvider);

	providerFactory.setProvider('imageUploadProvider', imageUploadProvider);
	providerFactory.setProvider('collabEditProvider', collabEditProvider);
	providerFactory.setProvider('activityProvider', activityProvider);
	providerFactory.setProvider('searchProvider', searchProvider);
	providerFactory.setProvider('presenceProvider', presenceProvider);
	providerFactory.setProvider('macroProvider', macroProvider);

	if (!fg('platform_editor_af_provider_from_plugin_config')) {
		providerFactory.setProvider('autoformattingProvider', autoformattingProvider);
	}

	if (extensionProvider) {
		providerFactory.setProvider('extensionProvider', Promise.resolve(extensionProvider));
	}

	if (quickInsertProvider) {
		providerFactory.setProvider('quickInsertProvider', quickInsertProvider);
	}
}
