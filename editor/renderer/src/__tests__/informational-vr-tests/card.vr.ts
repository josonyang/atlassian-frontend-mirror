import { snapshotInformational } from '@af/visual-regression';
import {
	RendererBlockCard,
	RendererBlockCardErrored,
	RendererBlockCardForbidden,
	RendererBlockCardNotFound,
	RendererBlockCardResolving,
	RendererBlockCardUnauthorized,
	RendererEmbedCard,
	RendererEmbedCardWide,
	RendererEmbedCardCenterLayout100PercentWidth,
	RendererEmbedCardCenterLayout88PercentWidth,
	RendererEmbedCardCenterLayoutAndNoWidth,
	RendererEmbedCardCenterLayoutNoHeightAndNoMessage100PercentWidth,
	RendererEmbedCardCenterLayoutNoHeightAndNoMessage88PercentWidth,
	RendererEmbedCardCenterLayoutNoHeightAndNoMessageAndNoWidth,
	RendererEmbedCardComplex,
	RendererEmbedCardErrored,
	RendererEmbedCardForbidden,
	RendererEmbedCardNotFound,
	RendererEmbedCardResolving,
	RendererEmbedCardUnauthorized,
	RendererInlineCard,
	RendererInlineCardErrored,
	RendererInlineCardForbidden,
	RendererInlineCardNotFound,
	RendererInlineCardResolving,
	RendererInlineCardUnauthorized,
	RendererBlockCardFullWidthLayout,
	RendererBlockCardDefaultWidthLayout,
	RendererBlockCardWideWidthLayout,
	RendererInlineCardRequestAccess,
	RendererInlineCardForbiddenPendingRequestAccess,
	RendererInlineCardRequestAccessForbidden,
	RendererInlineCardRequestAccessDirectAccess,
	RendererInlineCardRequestAccessDeniedRequestExists,
	RendererInlineCardForbiddenRequestApprovedRequestExists,
	RendererInlineCardRequestAccessAccessExists,
	RendererBlockCardRequestAccess,
	RendererBlockCardForbiddenPendingRequestAccess,
	RendererBlockCardRequestAccessForbidden,
	RendererBlockCardRequestAccessDirectAccess,
	RendererBlockCardRequestAccessDeniedRequestExists,
	RendererBlockCardForbiddenRequestApprovedRequestExists,
	RendererBlockCardRequestAccessAccessExists,
	RendererEmbedCardRequestAccess,
	RendererEmbedCardForbiddenPendingRequestAccess,
	RendererEmbedCardRequestAccessForbidden,
	RendererEmbedCardRequestAccessDirectAccess,
	RendererEmbedCardRequestAccessDeniedRequestExists,
	RendererEmbedCardForbiddenRequestApprovedRequestExists,
	RendererEmbedCardRequestAccessAccessExists,
	RendererInlineCardXSS,
	RendererBlockCardXSS,
	RendererEmbedCardXSS,
} from './card.fixtures';

snapshotInformational(RendererInlineCardXSS, {
	featureFlags: {
		'platform-linking-visual-refresh-v1': true,
	},
});
snapshotInformational(RendererInlineCard, {
	prepare: async (page) => {
		await page.getByTestId('inline-card-resolved-view').waitFor({ state: 'visible' });
	},
	featureFlags: {
		'platform-linking-visual-refresh-v1': true,
	},
});
snapshotInformational(RendererInlineCardResolving, {
	prepare: async (page) => {
		await page.getByTestId('inline-card-resolving-view').waitFor({ state: 'visible' });
	},
	featureFlags: {
		'platform-linking-visual-refresh-v1': true,
	},
});
snapshotInformational(RendererInlineCardUnauthorized, {
	prepare: async (page) => {
		await page.getByTestId('inline-card-unauthorized-view').waitFor({ state: 'visible' });
	},
	featureFlags: {
		'platform-linking-visual-refresh-v1': true,
	},
});
snapshotInformational(RendererInlineCardForbidden, {
	prepare: async (page) => {
		await page.getByTestId('inline-card-forbidden-view').waitFor({ state: 'visible' });
	},
	featureFlags: {
		'platform-linking-visual-refresh-v1': true,
	},
});
snapshotInformational(RendererInlineCardNotFound, {
	prepare: async (page) => {
		await page.getByTestId('inline-card-not-found-view').waitFor({ state: 'visible' });
	},
	featureFlags: {
		'platform-linking-visual-refresh-v1': true,
	},
});
snapshotInformational(RendererInlineCardErrored, {
	prepare: async (page) => {
		await page.getByTestId('inline-card-errored-view').waitFor({ state: 'visible' });
	},
	featureFlags: {
		'platform-linking-visual-refresh-v1': true,
	},
});
snapshotInformational(RendererBlockCard, {
	prepare: async (page) => {
		await page.getByTestId('smart-block-resolved-view').waitFor({ state: 'visible' });
	},
	featureFlags: {
		'platform-linking-visual-refresh-v1': true,
	},
});
snapshotInformational(RendererBlockCard, {
	prepare: async (page) => {
		await page.getByTestId('smart-block-resolved-view').waitFor({ state: 'visible' });
	},
	featureFlags: {
		'platform-linking-visual-refresh-v1': true,
		platform_ssr_smartlink_cards: [true, false],
	},
});
snapshotInformational(RendererBlockCardXSS, {
	featureFlags: {
		'platform-linking-visual-refresh-v1': true,
	},
});
snapshotInformational(RendererBlockCardResolving, {
	prepare: async (page) => {
		await page.getByTestId('smart-block-resolving-view').waitFor({ state: 'visible' });
	},
	featureFlags: {
		'platform-linking-visual-refresh-v1': true,
	},
});
snapshotInformational(RendererBlockCardUnauthorized, {
	prepare: async (page) => {
		await page.getByTestId('smart-block-unauthorized-view').waitFor({ state: 'visible' });
	},
	featureFlags: {
		'platform-linking-visual-refresh-v1': true,
	},
});
snapshotInformational(RendererBlockCardForbidden, {
	prepare: async (page) => {
		await page.getByTestId('smart-block-forbidden-view').waitFor({ state: 'visible' });
	},
	featureFlags: {
		'platform-linking-visual-refresh-v1': true,
	},
});
snapshotInformational(RendererBlockCardNotFound, {
	prepare: async (page) => {
		await page.getByTestId('smart-block-not-found-view').waitFor({ state: 'visible' });
	},
	featureFlags: {
		'platform-linking-visual-refresh-v1': true,
	},
});
snapshotInformational(RendererBlockCardErrored, {
	prepare: async (page) => {
		await page.getByTestId('smart-block-errored-view').waitFor({ state: 'visible' });
	},
	featureFlags: {
		'platform-linking-visual-refresh-v1': true,
	},
});
snapshotInformational(RendererEmbedCard, {
	prepare: async (page) => {
		await page.getByTestId('embed-card-resolved-view').waitFor({ state: 'visible' });
	},
	featureFlags: {},
});
snapshotInformational(RendererEmbedCard, {
	prepare: async (page) => {
		await page.getByTestId('embed-card-resolved-view').waitFor({ state: 'visible' });
	},
	description: 'renderer embed card hovered',
	states: [
		{
			selector: { byTestId: 'embed-card-resolved-view' },
			state: 'hovered',
		},
	],
	featureFlags: {},
});
snapshotInformational(RendererEmbedCardXSS, {
	featureFlags: {},
});
snapshotInformational(RendererEmbedCardWide, {
	prepare: async (page) => {
		await page.getByTestId('embed-card-not-found-view').waitFor({ state: 'visible' });
	},
	featureFlags: {},
});
snapshotInformational(RendererEmbedCardComplex, {
	prepare: async (page) => {
		await page.getByTestId('embed-card-not-found-view').waitFor({ state: 'visible' });
	},
	featureFlags: {},
});
snapshotInformational(RendererEmbedCardErrored, {
	prepare: async (page) => {
		await page.getByTestId('embed-card-errored-view').waitFor({ state: 'visible' });
	},
	featureFlags: {},
});
snapshotInformational(RendererEmbedCardForbidden, {
	prepare: async (page) => {
		await page.getByTestId('embed-card-forbidden-view').waitFor({ state: 'visible' });
	},
	featureFlags: {},
});
snapshotInformational(RendererEmbedCardNotFound, {
	prepare: async (page) => {
		await page.getByTestId('embed-card-not-found-view').waitFor({ state: 'visible' });
	},
	featureFlags: {},
});
snapshotInformational(RendererEmbedCardResolving, {
	prepare: async (page) => {
		await page.getByTestId('embed-card-resolving-view').waitFor({ state: 'visible' });
	},
	featureFlags: {},
});
snapshotInformational(RendererEmbedCardUnauthorized, {
	prepare: async (page) => {
		await page.getByTestId('embed-card-unauthorized-view').waitFor({ state: 'visible' });
	},
	featureFlags: {
		'platform-linking-visual-refresh-v1': true,
	},
});
snapshotInformational(RendererBlockCardFullWidthLayout, {
	prepare: async (page) => {
		await page.getByTestId('renderer-datasource-table').waitFor({ state: 'visible' });
	},
	featureFlags: {},
});
snapshotInformational(RendererBlockCardDefaultWidthLayout, {
	prepare: async (page) => {
		await page.getByTestId('renderer-datasource-table').waitFor({ state: 'visible' });
	},
	featureFlags: {},
});
snapshotInformational(RendererBlockCardWideWidthLayout, {
	prepare: async (page) => {
		await page.getByTestId('renderer-datasource-table').waitFor({ state: 'visible' });
	},
	featureFlags: {},
});
snapshotInformational(RendererEmbedCardCenterLayoutAndNoWidth, {
	prepare: async (page) => {
		await page.getByTestId('embed-card-resolved-view').waitFor({ state: 'visible' });
	},
	featureFlags: {},
});
snapshotInformational(RendererEmbedCardCenterLayout100PercentWidth, {
	prepare: async (page) => {
		await page.getByTestId('embed-card-resolved-view').waitFor({ state: 'visible' });
	},
	featureFlags: {},
});
snapshotInformational(RendererEmbedCardCenterLayout88PercentWidth, {
	prepare: async (page) => {
		await page.getByTestId('embed-card-resolved-view').waitFor({ state: 'visible' });
	},
	featureFlags: {},
});
snapshotInformational(RendererEmbedCardCenterLayoutNoHeightAndNoMessageAndNoWidth, {
	prepare: async (page) => {
		await page.getByTestId('embed-card-resolved-view').waitFor({ state: 'visible' });
	},
	featureFlags: {},
});
snapshotInformational(RendererEmbedCardCenterLayoutNoHeightAndNoMessage100PercentWidth, {
	prepare: async (page) => {
		await page.getByTestId('embed-card-resolved-view').waitFor({ state: 'visible' });
	},
	featureFlags: {},
});

snapshotInformational(RendererEmbedCardCenterLayoutNoHeightAndNoMessage88PercentWidth, {
	prepare: async (page) => {
		await page.getByTestId('embed-card-resolved-view').waitFor({ state: 'visible' });
	},
	featureFlags: {},
});

snapshotInformational(RendererInlineCardRequestAccess, {
	prepare: async (page) => {
		await page.getByTestId('inline-card-forbidden-view').waitFor({ state: 'visible' });
	},
	featureFlags: {
		'platform-linking-visual-refresh-v1': true,
	},
});
snapshotInformational(RendererInlineCardForbiddenPendingRequestAccess, {
	prepare: async (page) => {
		await page.getByTestId('inline-card-forbidden-view').waitFor({ state: 'visible' });
	},
	featureFlags: {
		'platform-linking-visual-refresh-v1': true,
	},
});
snapshotInformational(RendererInlineCardRequestAccessForbidden, {
	prepare: async (page) => {
		await page.getByTestId('inline-card-forbidden-view').waitFor({ state: 'visible' });
	},
	featureFlags: {
		'platform-linking-visual-refresh-v1': true,
	},
});
snapshotInformational(RendererInlineCardRequestAccessDirectAccess, {
	prepare: async (page) => {
		await page.getByTestId('inline-card-forbidden-view').waitFor({ state: 'visible' });
	},
	featureFlags: {
		'platform-linking-visual-refresh-v1': true,
	},
});
snapshotInformational(RendererInlineCardRequestAccessDeniedRequestExists, {
	prepare: async (page) => {
		await page.getByTestId('inline-card-forbidden-view').waitFor({ state: 'visible' });
	},
	featureFlags: {
		'platform-linking-visual-refresh-v1': true,
	},
});
snapshotInformational(RendererInlineCardForbiddenRequestApprovedRequestExists, {
	prepare: async (page) => {
		await page.getByTestId('inline-card-forbidden-view').waitFor({ state: 'visible' });
	},
	featureFlags: {
		'platform-linking-visual-refresh-v1': true,
	},
});
snapshotInformational(RendererInlineCardRequestAccessAccessExists, {
	prepare: async (page) => {
		await page.getByTestId('inline-card-forbidden-view').waitFor({ state: 'visible' });
	},
	featureFlags: {
		'platform-linking-visual-refresh-v1': true,
	},
});

snapshotInformational(RendererBlockCardRequestAccess, {
	prepare: async (page) => {
		await page.getByTestId('smart-block-forbidden-view').waitFor({ state: 'visible' });
	},
	featureFlags: {
		'platform-linking-visual-refresh-v1': true,
	},
});
snapshotInformational(RendererBlockCardForbiddenPendingRequestAccess, {
	prepare: async (page) => {
		await page.getByTestId('smart-block-forbidden-view').waitFor({ state: 'visible' });
	},
	featureFlags: {
		'platform-linking-visual-refresh-v1': true,
	},
});
snapshotInformational(RendererBlockCardRequestAccessForbidden, {
	prepare: async (page) => {
		await page.getByTestId('smart-block-forbidden-view').waitFor({ state: 'visible' });
	},
	featureFlags: {
		'platform-linking-visual-refresh-v1': true,
	},
});
snapshotInformational(RendererBlockCardRequestAccessDirectAccess, {
	prepare: async (page) => {
		await page.getByTestId('smart-block-forbidden-view').waitFor({ state: 'visible' });
	},
	featureFlags: {
		'platform-linking-visual-refresh-v1': true,
	},
});
snapshotInformational(RendererBlockCardRequestAccessDeniedRequestExists, {
	prepare: async (page) => {
		await page.getByTestId('smart-block-forbidden-view').waitFor({ state: 'visible' });
	},
	featureFlags: {
		'platform-linking-visual-refresh-v1': true,
	},
});
snapshotInformational(RendererBlockCardForbiddenRequestApprovedRequestExists, {
	prepare: async (page) => {
		await page.getByTestId('smart-block-forbidden-view').waitFor({ state: 'visible' });
	},
	featureFlags: {
		'platform-linking-visual-refresh-v1': true,
	},
});
snapshotInformational(RendererBlockCardRequestAccessAccessExists, {
	prepare: async (page) => {
		await page.getByTestId('smart-block-forbidden-view').waitFor({ state: 'visible' });
	},
	featureFlags: {
		'platform-linking-visual-refresh-v1': true,
	},
});

snapshotInformational(RendererEmbedCardRequestAccess, {
	prepare: async (page) => {
		await page.getByTestId('embed-card-forbidden-view').waitFor({ state: 'visible' });
	},
	featureFlags: {},
});
snapshotInformational(RendererEmbedCardForbiddenPendingRequestAccess, {
	prepare: async (page) => {
		await page.getByTestId('embed-card-forbidden-view').waitFor({ state: 'visible' });
	},
	featureFlags: {},
});
snapshotInformational(RendererEmbedCardRequestAccessForbidden, {
	prepare: async (page) => {
		await page.getByTestId('embed-card-forbidden-view').waitFor({ state: 'visible' });
	},
	featureFlags: {},
});
snapshotInformational(RendererEmbedCardRequestAccessDirectAccess, {
	prepare: async (page) => {
		await page.getByTestId('embed-card-forbidden-view').waitFor({ state: 'visible' });
	},
	featureFlags: {},
});
snapshotInformational(RendererEmbedCardRequestAccessDeniedRequestExists, {
	prepare: async (page) => {
		await page.getByTestId('embed-card-forbidden-view').waitFor({ state: 'visible' });
	},
	featureFlags: {},
});
snapshotInformational(RendererEmbedCardForbiddenRequestApprovedRequestExists, {
	prepare: async (page) => {
		await page.getByTestId('embed-card-forbidden-view').waitFor({ state: 'visible' });
	},
	featureFlags: {},
});
snapshotInformational(RendererEmbedCardRequestAccessAccessExists, {
	prepare: async (page) => {
		await page.getByTestId('embed-card-forbidden-view').waitFor({ state: 'visible' });
	},
	featureFlags: {},
});
