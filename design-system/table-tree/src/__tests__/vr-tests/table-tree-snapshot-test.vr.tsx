import { snapshot } from '@af/visual-regression';

import ControlledExpandedState from '../../../examples/controlled-expanded-state';
import VrLoading from '../../../examples/vr-loading';
import VrLoadingNested from '../../../examples/vr-loading-nested';
import VrOverflow from '../../../examples/vr-overflow-behavior';

snapshot(ControlledExpandedState, {
	variants: [
		{
			name: 'Default',
			environment: {},
		},
		{
			name: 'Light',
			environment: {
				colorScheme: 'light',
			},
		},
		{
			name: 'Dark',
			environment: {
				colorScheme: 'dark',
			},
		},
	],
});
snapshot(VrLoading, {
	variants: [
		{
			name: 'Default',
			environment: {},
		},
		{
			name: 'Light',
			environment: {
				colorScheme: 'light',
			},
		},
		{
			name: 'Dark',
			environment: {
				colorScheme: 'dark',
			},
		},
	],
});
snapshot(VrLoadingNested, {
	variants: [
		{
			name: 'Default',
			environment: {},
		},
		{
			name: 'Light',
			environment: {
				colorScheme: 'light',
			},
		},
		{
			name: 'Dark',
			environment: {
				colorScheme: 'dark',
			},
		},
	],
});
snapshot(VrOverflow, {
	variants: [
		{
			name: 'Light',
			environment: {
				colorScheme: 'light',
			},
		},
	],
});
