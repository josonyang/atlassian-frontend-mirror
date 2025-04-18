import { snapshot } from '@af/visual-regression';

import FlexUiAtlaskitBadgeView from '../../../examples/vr-flexible-card/vr-flexible-ui-element-atlaskit-badge';

snapshot(FlexUiAtlaskitBadgeView, {
	featureFlags: {
		'platform-component-visual-refresh': [true, false],
		'platform-linking-visual-refresh-v1': [true, false],
	},
});
