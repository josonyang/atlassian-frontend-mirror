import React from 'react';
import { Text } from '@atlaskit/primitives/compiled';
import { screen } from '@testing-library/react';
import { mockReactDomWarningGlobal, renderWithIntl } from '../__tests__/_testing-library';
import {
	FlashAnimation,
	type FlashAnimationProps,
	RENDER_FLASHANIMATION_TESTID,
} from './FlashAnimation';

describe('@atlaskit/reactions/components/FlashAnimation', () => {
	const renderFlash = (props: Partial<FlashAnimationProps> = {}) => (
		<FlashAnimation {...props}>
			<Text>my background will flash</Text>
		</FlashAnimation>
	);
	mockReactDomWarningGlobal();
	jest.useFakeTimers();

	it('should not include flash class', async () => {
		renderWithIntl(renderFlash());
		const elem = await screen.findByTestId(RENDER_FLASHANIMATION_TESTID);
		expect(elem).toBeInTheDocument();

		expect(getComputedStyle(elem).getPropertyValue('animation')).toBeFalsy();
		expect(getComputedStyle(elem).getPropertyValue('animationName')).toBeFalsy();
	});

	it('should include flash class', async () => {
		renderWithIntl(renderFlash({ flash: true }));
		const elem = await screen.findByTestId(RENDER_FLASHANIMATION_TESTID);
		expect(elem).toHaveCompiledCss({
			animationName: 'k1qrjcqm',
			animationDuration: '.7s',
			animationTimingFunction: 'ease-in-out',
		});
	});
});
