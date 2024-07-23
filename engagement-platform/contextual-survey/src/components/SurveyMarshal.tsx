/**
 * @jsxRuntime classic
 * @jsx jsx
 */
import { type ReactNode } from 'react';

// eslint-disable-next-line @atlaskit/ui-styling-standard/use-compiled -- Ignored via go/DSP-18766
import { css, jsx } from '@emotion/react';
import { Transition } from 'react-transition-group';

import { layers } from '@atlaskit/theme/constants';

import { surveyInnerWidth, surveyOffset } from '../constants';

type TransitionState = 'entering' | 'entered' | 'exiting' | 'exited' | 'unmounted';

const animationDuration: number = 300;
const offscreen = {
	translateX: `${surveyInnerWidth + surveyOffset}px`,
	opacity: '0',
};

const getAnimationProps = (state: TransitionState) => {
	switch (state) {
		case 'entered': {
			return {
				translateX: '0',
				opacity: '1',
			};
		}
		case 'entering':
		case 'unmounted':
		case 'exited':
		case 'exiting': {
			return offscreen;
		}
	}
};

type Props = {
	/** Whether the form should be rendered */
	shouldShow: boolean;
	/** A function that returns Node to be rendered (`<ContextualSurvey/>`)
	 * Using a function as child so that the child node does
	 * not need to be evaluated if it is not mounted
	 */
	children: () => ReactNode;
};

export default function SurveyMarshal(props: Props) {
	const { children, shouldShow } = props;

	return (
		<Transition in={shouldShow} timeout={animationDuration} unmountOnExit>
			{(state: TransitionState) => {
				const { translateX, opacity } = getAnimationProps(state);

				return (
					<div
						// eslint-disable-next-line @atlaskit/design-system/consistent-css-prop-usage, @atlaskit/ui-styling-standard/no-imported-style-values -- Ignored via go/DSP-18766
						css={css({
							position: 'fixed',
							// eslint-disable-next-line @atlaskit/ui-styling-standard/no-imported-style-values, @atlaskit/ui-styling-standard/no-unsafe-values -- Ignored via go/DSP-18766
							right: `${surveyOffset}px`,
							// eslint-disable-next-line @atlaskit/ui-styling-standard/no-imported-style-values, @atlaskit/ui-styling-standard/no-unsafe-values -- Ignored via go/DSP-18766
							bottom: `${surveyOffset}px`,
							zIndex: layers.flag(),
							// eslint-disable-next-line @atlaskit/ui-styling-standard/no-unsafe-values -- Ignored via go/DSP-18766
							transform: `translateX(${translateX})`,
							// eslint-disable-next-line @atlaskit/ui-styling-standard/no-unsafe-values -- Ignored via go/DSP-18766
							opacity: opacity,
							transition: `all ${animationDuration}ms ease-in-out`,
							transitionProperty: 'transform, opacity',
						})}
					>
						{children()}
					</div>
				);
			}}
		</Transition>
	);
}
