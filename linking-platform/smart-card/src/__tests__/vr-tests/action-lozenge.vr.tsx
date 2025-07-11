import { snapshot } from '@af/visual-regression';

import ActionItem from '../../../examples/vr-flexible-card/vr-action-lozenge-action-item';
import ActionItemsGroup from '../../../examples/vr-flexible-card/vr-action-lozenge-action-items-group';
import ActionTrigger from '../../../examples/vr-flexible-card/vr-action-lozenge-action-trigger';
import ErrorAction from '../../../examples/vr-flexible-card/vr-action-lozenge-error-action';
import ErrorActionWithUrl from '../../../examples/vr-flexible-card/vr-action-lozenge-error-action-with-url';

snapshot(ActionItem, {
	featureFlags: {
		'platform-component-visual-refresh': [true, false],
	},
});

snapshot(ActionTrigger, {
	featureFlags: {
		'platform-component-visual-refresh': [true, false],
		'platform-linking-visual-refresh-v2': true,
	},
});

snapshot(ActionItemsGroup, {
	featureFlags: {
		'platform-component-visual-refresh': [true, false],
	},
});

snapshot(ErrorAction);
snapshot(ErrorActionWithUrl);
