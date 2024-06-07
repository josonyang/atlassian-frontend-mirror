import { expect, type Locator, type Page } from '@af/integration-testing';

export class MediaCardPageObject {
	readonly mediaViewer: Locator;
	constructor(readonly page: Page) {
		this.mediaViewer = page.locator('[data-testid="media-viewer-image"]');
	}

	init = async (exampleId: string) => {
		await this.page.visitExample('media', 'media-card', exampleId);
	};

	validateShowingLoadingIcon = async (selector: string) => {
		const loadingIcon = this.page.locator(`${selector} [data-testid="media-card-loading"]`);
		await expect(loadingIcon).toBeVisible();
	};

	async launchMediaViewer(selector: string) {
		await this.page.click(selector);
	}

	validateMediaViewerLaunched = async () => {
		await expect(this.mediaViewer).toBeVisible();
	};

	validateCardVisible = async (selector: string) => {
		await expect(this.page.locator(selector)).toBeVisible();
	};
}
