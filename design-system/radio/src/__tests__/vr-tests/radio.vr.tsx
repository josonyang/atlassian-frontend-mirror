import { snapshot } from '@af/visual-regression';

import RadioExample from '../../../examples/02-form-example';

snapshot(RadioExample, {
	description: 'Legacy style',
});

snapshot(RadioExample, {
	description: 'Legacy style - unchecked - hover',
	states: [
		{
			state: 'hovered',
			selector: {
				byTestId: 'color-red--radio-input',
			},
		},
	],
});

snapshot(RadioExample, {
	description: 'Legacy style - unchecked - focused',
	states: [
		{
			state: 'focused',
			selector: {
				byTestId: 'color-red--radio-input',
			},
		},
	],
});

snapshot(RadioExample, {
	description: 'Legacy style - unchecked - hovered and focused',
	states: [
		{
			state: 'hovered',
			selector: {
				byTestId: 'color-red--radio-input',
			},
		},
		{
			state: 'focused',
			selector: {
				byTestId: 'color-red--radio-input',
			},
		},
	],
});

snapshot(RadioExample, {
	description: 'Legacy style - checked - hover',
	states: [
		{
			state: 'hovered',
			selector: {
				byTestId: 'color-blue--radio-input',
			},
		},
	],
});

snapshot(RadioExample, {
	description: 'Legacy style - checked - focused',
	states: [
		{
			state: 'focused',
			selector: {
				byTestId: 'color-blue--radio-input',
			},
		},
	],
});

snapshot(RadioExample, {
	description: 'Legacy style - checked - hovered and focused',
	states: [
		{
			state: 'hovered',
			selector: {
				byTestId: 'color-blue--radio-input',
			},
		},
		{
			state: 'focused',
			selector: {
				byTestId: 'color-blue--radio-input',
			},
		},
	],
});

snapshot(RadioExample, {
	description: 'Legacy style - unchecked - disabled',
	states: [
		{
			state: 'focused',
			selector: {
				byTestId: 'weather-cloudy--radio-input',
			},
		},
	],
});

snapshot(RadioExample, {
	description: 'Legacy style - checked - disabled',
	states: [
		{
			state: 'focused',
			selector: {
				byTestId: 'weather-sunny--radio-input',
			},
		},
	],
});

snapshot(RadioExample, {
	description: 'Legacy style - checked - disabled - hovered',
	states: [
		{
			state: 'hovered',
			selector: {
				byTestId: 'weather-sunny--radio-input',
			},
		},
	],
});

snapshot(RadioExample, {
	description: 'Legacy style - checked - disabled - hovered and focused',
	states: [
		{
			state: 'hovered',
			selector: {
				byTestId: 'weather-sunny--radio-input',
			},
		},
		{
			state: 'focused',
			selector: {
				byTestId: 'weather-sunny--radio-input',
			},
		},
	],
});

snapshot(RadioExample, {
	description: 'Visual refresh style',
	featureFlags: {
		'platform-visual-refresh-icons': true,
	},
});

snapshot(RadioExample, {
	description: 'Visual refresh style - unchecked - hover',
	featureFlags: {
		'platform-visual-refresh-icons': true,
	},
	states: [
		{
			state: 'hovered',
			selector: {
				byTestId: 'color-red--radio-input',
			},
		},
	],
});

snapshot(RadioExample, {
	description: 'Visual refresh style - unchecked - focused',
	featureFlags: {
		'platform-visual-refresh-icons': true,
	},
	states: [
		{
			state: 'focused',
			selector: {
				byTestId: 'color-red--radio-input',
			},
		},
	],
});

snapshot(RadioExample, {
	description: 'Visual refresh style - unchecked - hovered and focused',
	featureFlags: {
		'platform-visual-refresh-icons': true,
	},
	states: [
		{
			state: 'hovered',
			selector: {
				byTestId: 'color-red--radio-input',
			},
		},
		{
			state: 'focused',
			selector: {
				byTestId: 'color-red--radio-input',
			},
		},
	],
});

snapshot(RadioExample, {
	description: 'Visual refresh style - checked - hover',
	featureFlags: {
		'platform-visual-refresh-icons': true,
	},
	states: [
		{
			state: 'hovered',
			selector: {
				byTestId: 'color-blue--radio-input',
			},
		},
	],
});

snapshot(RadioExample, {
	description: 'Visual refresh style - checked - focused',
	featureFlags: {
		'platform-visual-refresh-icons': true,
	},
	states: [
		{
			state: 'focused',
			selector: {
				byTestId: 'color-blue--radio-input',
			},
		},
	],
});

snapshot(RadioExample, {
	description: 'Visual refresh style - checked - hovered and focused',
	featureFlags: {
		'platform-visual-refresh-icons': true,
	},
	states: [
		{
			state: 'hovered',
			selector: {
				byTestId: 'color-blue--radio-input',
			},
		},
		{
			state: 'focused',
			selector: {
				byTestId: 'color-blue--radio-input',
			},
		},
	],
});

snapshot(RadioExample, {
	description: 'Visual refresh style - unchecked - disabled',
	featureFlags: {
		'platform-visual-refresh-icons': true,
	},
	states: [
		{
			state: 'focused',
			selector: {
				byTestId: 'weather-cloudy--radio-input',
			},
		},
	],
});

snapshot(RadioExample, {
	description: 'Visual refresh style - checked - disabled',
	featureFlags: {
		'platform-visual-refresh-icons': true,
	},
	states: [
		{
			state: 'focused',
			selector: {
				byTestId: 'weather-sunny--radio-input',
			},
		},
	],
});

snapshot(RadioExample, {
	description: 'Visual refresh style - checked - disabled - hovered',
	featureFlags: {
		'platform-visual-refresh-icons': true,
	},
	states: [
		{
			state: 'hovered',
			selector: {
				byTestId: 'weather-sunny--radio-input',
			},
		},
	],
});

snapshot(RadioExample, {
	description: 'Visual refresh style - checked - disabled - hovered and focused',
	featureFlags: {
		'platform-visual-refresh-icons': true,
	},
	states: [
		{
			state: 'hovered',
			selector: {
				byTestId: 'weather-sunny--radio-input',
			},
		},
		{
			state: 'focused',
			selector: {
				byTestId: 'weather-sunny--radio-input',
			},
		},
	],
});
