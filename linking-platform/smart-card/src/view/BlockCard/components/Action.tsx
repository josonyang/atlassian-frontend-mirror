/**
 * @jsxRuntime classic
 * @jsx jsx
 */
// eslint-disable-next-line @atlaskit/ui-styling-standard/use-compiled -- Ignored via go/DSP-18766
import { css, jsx } from '@emotion/react';
import { useState } from 'react';

import { type Appearance } from '@atlaskit/button/types';
import { LoadingButton as Button } from '@atlaskit/button';
import { ActionIcon } from './ActionIcon';

export interface ActionProps {
	/* Id of the action for use by ??? */
	id: string;
	/* The text to be displayed in the action's button */
	text: React.ReactNode;
	/* The function to be called on clicking the action. This is a promise so the state can transition correctly after the action finishes */
	promise: () => Promise<any>;
	/* The atlaskit button style to use in showing the action. This is the only button prop you have access to. */
	buttonAppearance?: Appearance;
}

export type ActionState = 'init' | 'loading' | 'success' | 'failure';

export const spinnerDelay = 1000;

const baseTextStyles = css({
	transition: 'opacity 0.3s',
});

export const Action = ({ promise, text, buttonAppearance = 'default', id }: ActionProps) => {
	const [state, setState] = useState<ActionState>('init');

	return (
		<Button
			spacing="compact"
			appearance={buttonAppearance}
			isLoading={state === 'loading'}
			testId={`button-${id}`}
			onClick={(event) => {
				event.stopPropagation();
				event.preventDefault();
				if (state !== 'loading') {
					setState('loading');
					promise()
						.then(() => {
							setState('success');
						})
						.catch(() => {
							setState('failure');
						})
						.finally(() => {
							setTimeout(() => setState('init'), spinnerDelay);
						});
				}
			}}
		>
			{/* eslint-disable-next-line @atlaskit/design-system/consistent-css-prop-usage -- Ignored via go/DSP-18766 */}
			<div css={[baseTextStyles, { opacity: state !== 'init' ? 0 : 1 }]}>{text}</div>
			<ActionIcon state={state} />
		</Button>
	);
};
