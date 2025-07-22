import { Device, snapshotInformational } from '@af/visual-regression';

import DefaultModal from '../../../examples/00-default-modal';
import ExplicitFontStyles from '../../../examples/02-explicit-font-styles';
import Appearance from '../../../examples/10-appearance';
import Autofocus from '../../../examples/20-autofocus';
import PlaygroundExample from '../../../examples/40-multiple';
import Form from '../../../examples/45-form';
import FormAsContainer from '../../../examples/46-form-as-container';
import FullScreenModalExample from '../../../examples/51-full-screen';
import ModalBodyWithoutInlinePaddingExample from '../../../examples/53-modal-body-without-inline-padding';
import Scroll from '../../../examples/55-scroll';
import MultiLineTitles from '../../../examples/65-multi-line-titles';
import WithHiddenBlanket from '../../../examples/92-with-hidden-blanket';
import WithCurrentSurface from '../../../examples/96-with-current-surface';

snapshotInformational(DefaultModal, {
	variants: [
		{
			name: 'desktop',
			device: Device.DESKTOP_CHROME,
		},
		{
			name: 'mobile',
			device: Device.MOBILE_CHROME,
		},
	],
	drawsOutsideBounds: true,
	prepare: async (page) => {
		await page.getByRole('button').click();
	},
});

snapshotInformational(Scroll, {
	description: 'viewport scrolling',
	variants: [
		{
			name: 'desktop',
			device: Device.DESKTOP_CHROME,
		},
		{
			name: 'mobile',
			device: Device.MOBILE_CHROME,
		},
	],
	drawsOutsideBounds: true,
	prepare: async (page) => {
		// Set shouldScrollInViewport={true}
		await page.getByRole('checkbox', { name: 'Should scroll within the viewport' }).check();
		await page.getByRole('button').click();
	},
});

snapshotInformational(Scroll, {
	description: 'scroll top',
	drawsOutsideBounds: true,
	prepare: async (page) => {
		await page.getByRole('button').click();
	},
});

snapshotInformational(Scroll, {
	description: 'scroll middle',
	drawsOutsideBounds: true,
	prepare: async (page) => {
		await page.getByRole('button').click();
		await page
			.locator('[data-testid="modal--scrollable"]')
			.evaluate((element) => (element.scrollTop = 200));
	},
});

snapshotInformational(Scroll, {
	description: 'scroll bottom',
	drawsOutsideBounds: true,
	prepare: async (page) => {
		await page.getByRole('button').click();
		await page
			.locator('[data-testid="modal--scrollable"]')
			.evaluate((element) => (element.scrollTop = element.scrollHeight));
	},
});

snapshotInformational(Form, {
	drawsOutsideBounds: true,
	prepare: async (page) => {
		await page.getByRole('button').click();
	},
});

snapshotInformational(FormAsContainer, {
	drawsOutsideBounds: true,
	prepare: async (page) => {
		await page.getByRole('button').click();
	},
});

snapshotInformational(Autofocus, {
	drawsOutsideBounds: true,
	prepare: async (page) => {
		await page.getByRole('button', { name: 'using autoFocus prop' }).click();
	},
});

snapshotInformational(Appearance, {
	description: 'Appearance - warning',
	drawsOutsideBounds: true,
	prepare: async (page) => {
		await page.getByRole('button', { name: 'Open: warning' }).click();
	},
});

snapshotInformational(Appearance, {
	description: 'Appearance - danger',
	drawsOutsideBounds: true,
	prepare: async (page) => {
		await page.getByRole('button', { name: 'Open: danger' }).click();
	},
});

snapshotInformational(MultiLineTitles, {
	drawsOutsideBounds: true,
	prepare: async (page) => {
		await page.getByRole('button').click();
	},
});

snapshotInformational(WithCurrentSurface, {
	drawsOutsideBounds: true,
	prepare: async (page) => {
		await page.getByRole('button').click();
	},
});

snapshotInformational(WithHiddenBlanket, {
	drawsOutsideBounds: true,
	prepare: async (page) => {
		await page.getByRole('button').click();
	},
});

snapshotInformational(ExplicitFontStyles, {
	drawsOutsideBounds: true,
	prepare: async (page) => {
		await page.getByRole('button').click();
	},
	featureFlags: {
		platform_ads_explicit_font_styles: [true, false],
	},
});

snapshotInformational(ModalBodyWithoutInlinePaddingExample, {
	drawsOutsideBounds: true,
	prepare: async (page) => {
		await page.getByRole('button').click();
	},
});

snapshotInformational(FullScreenModalExample, {
	variants: [
		{
			name: 'desktop',
			device: Device.DESKTOP_CHROME,
		},
		{
			name: 'mobile',
			device: Device.MOBILE_CHROME,
		},
	],
	drawsOutsideBounds: true,
	prepare: async (page) => {
		await page.getByRole('button').click();
	},
});

snapshotInformational(PlaygroundExample, {
	description: 'full screen with shouldScrollInViewport={false}',
	drawsOutsideBounds: true,
	prepare: async (page) => {
		// Set shouldScrollInViewport={false}
		await page.getByRole('checkbox', { name: 'Should scroll within the viewport' }).uncheck();
		// Use long content
		await page.getByRole('checkbox', { name: 'Long content' }).check();
		// Set isFullScreen={true}
		await page.getByRole('checkbox', { name: 'Full screen' }).check();
		await page.getByRole('button', { name: 'Open' }).click();
	},
});

snapshotInformational(PlaygroundExample, {
	description: 'full screen with shouldScrollInViewport={true}',
	drawsOutsideBounds: true,
	prepare: async (page) => {
		// Set shouldScrollInViewport={true}
		await page.getByRole('checkbox', { name: 'Should scroll within the viewport' }).check();
		// Use long content
		await page.getByRole('checkbox', { name: 'Long content' }).check();
		// Set isFullScreen={true}
		await page.getByRole('checkbox', { name: 'Full screen' }).check();
		await page.getByRole('button', { name: 'Open' }).click();
	},
});

snapshotInformational(PlaygroundExample, {
	description: 'full screen with nesting',
	drawsOutsideBounds: true,
	prepare: async (page) => {
		// Set isFullScreen={true}
		await page.getByRole('checkbox', { name: 'Full screen' }).check();
		// Use long content
		await page.getByRole('checkbox', { name: 'Long content' }).check();
		// Open the first modal
		await page.getByRole('button', { name: 'Open' }).click();
		await page.getByText('Modal: large').waitFor({ state: 'visible' });
		// Open the nested modal
		await page.getByRole('button', { name: 'Open: medium' }).click();
		await page.getByText('Modal: medium').waitFor({ state: 'visible' });
	},
});

snapshotInformational(PlaygroundExample, {
	description: 'nested with shouldScrollInViewport={false}',
	drawsOutsideBounds: true,
	prepare: async (page) => {
		// Set shouldScrollInViewport={false}
		await page.getByRole('checkbox', { name: 'Should scroll within the viewport' }).uncheck();
		// Open the first modal
		await page.getByRole('button', { name: 'Open' }).click();
		await page.getByText('Modal: large').waitFor({ state: 'visible' });
		// Open the second modal
		await page.getByRole('button', { name: 'Open: medium' }).click();
		await page.getByText('Modal: medium').waitFor({ state: 'visible' });
		// Open the third modal
		await page.getByRole('button', { name: 'Open: small' }).click();
		await page.getByText('Modal: small').waitFor({ state: 'visible' });
	},
});

snapshotInformational(PlaygroundExample, {
	description: 'nested with shouldScrollInViewport={true}',
	drawsOutsideBounds: true,
	prepare: async (page) => {
		// Set shouldScrollInViewport={true}
		await page.getByRole('checkbox', { name: 'Should scroll within the viewport' }).check();
		// Open the first modal
		await page.getByRole('button', { name: 'Open' }).click();
		await page.getByText('Modal: large').waitFor({ state: 'visible' });
		// Open the second modal
		await page.getByRole('button', { name: 'Open: medium' }).click();
		await page.getByText('Modal: medium').waitFor({ state: 'visible' });
		// Open the third modal
		await page.getByRole('button', { name: 'Open: small' }).click();
		await page.getByText('Modal: small').waitFor({ state: 'visible' });
	},
});
