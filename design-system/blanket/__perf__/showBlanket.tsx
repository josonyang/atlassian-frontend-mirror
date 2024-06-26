// eslint-disable-next-line @repo/internal/fs/filename-pattern-match
import React, { useState } from 'react';

import { fireEvent } from '@testing-library/dom';
import { type InteractionTaskArgs, type PublicInteractionTask } from 'storybook-addon-performance';

import Blanket from '../src';

const BlanketPerformance = () => {
	const [isBlanketVisible, setIsBlanketVisible] = useState(false);

	const toggleBlanketVisibility = () => {
		setIsBlanketVisible(!isBlanketVisible);
	};

	return (
		<>
			<button type="button" onClick={toggleBlanketVisibility} data-testid="toggleButton">
				Toggle blanket
			</button>
			<Blanket isTinted={isBlanketVisible} shouldAllowClickThrough={true} />
		</>
	);
};

const interactionTasks: PublicInteractionTask[] = [
	{
		name: 'onShow',
		description: 'Show blanket by changing its isTinted prop',
		run: async ({ container, controls }: InteractionTaskArgs): Promise<void> => {
			const toggleButton = container.querySelector(`[data-testid="toggleButton"]`)!;
			await controls.time(async () => {
				await fireEvent.click(toggleButton);
			});
		},
	},
];

BlanketPerformance.story = {
	name: 'Show Blanklet',
	parameters: {
		performance: {
			interactions: interactionTasks,
		},
	},
};

export default BlanketPerformance;
