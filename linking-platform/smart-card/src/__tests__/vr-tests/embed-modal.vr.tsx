import { snapshot } from '@af/visual-regression';

import EmbedModal from '../../../examples/vr-embed-modal/vr-embed-modal';
import EmbedModalWithFlexibleUiIcon from '../../../examples/vr-embed-modal/vr-embed-modal-with-flexible-ui-icon';

snapshot(EmbedModal, {
	description: 'renders embed modal',
	featureFlags: {
		'bandicoots-compiled-migration-smartcard': [true, false],
	},
});

snapshot(EmbedModalWithFlexibleUiIcon, {
	description: 'renders embed modal with flexible ui icon',
	featureFlags: {
		'bandicoots-compiled-migration-smartcard': [true, false],
	},
});
