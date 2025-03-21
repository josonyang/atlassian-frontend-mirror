/**
 * @jsxRuntime classic
 * @jsx jsx
 */
import React, { useCallback, useState } from 'react';

// eslint-disable-next-line @atlaskit/ui-styling-standard/use-compiled -- Ignored via go/DSP-18766
import { css, jsx } from '@compiled/react';

import Button from '@atlaskit/button/new';
import { Checkbox } from '@atlaskit/checkbox';
import { token } from '@atlaskit/tokens';

import { ContextualSurvey, type OnDismissArgs, SurveyMarshal } from '../src';

const styles = css({
	paddingTop: token('space.100', '8px'),
	font: token('font.body.large'),
});
export default function BasicUsage() {
	const [showSurvey, setShowSurvey] = useState(false);
	const [hasUserAnswered, setHasUserAnswered] = useState(false);
	const onClick = useCallback(() => {
		setShowSurvey(true);
	}, [setShowSurvey]);

	const onDismiss = useCallback(
		(args: OnDismissArgs) => {
			console.log('dismiss called with', args);
			setShowSurvey(false);
		},
		[setShowSurvey],
	);

	return (
		<React.Fragment>
			<Button appearance="primary" onClick={onClick}>
				Show survey
			</Button>
			<div css={styles}>
				<Checkbox
					isChecked={hasUserAnswered}
					label="Has the user previously answered the mailing list question?"
					onChange={() => setHasUserAnswered((value: boolean): boolean => !value)}
					isDisabled={showSurvey}
					name="checkbox-basic"
				/>
			</div>
			<SurveyMarshal shouldShow={showSurvey}>
				{() => (
					<ContextualSurvey
						question="How strongly do you agree or disagree with this statement"
						statement="It is easy to find what I'm looking for in Jira"
						onDismiss={onDismiss}
						getUserHasAnsweredMailingList={() =>
							new Promise((resolve) => {
								console.log(
									'Discovering if user has previously answered. Result will be:',
									hasUserAnswered,
								);
								setTimeout(() => resolve(hasUserAnswered), 1000);
							})
						}
						onMailingListAnswer={(answer: boolean) =>
							new Promise((resolve) => {
								console.log('Did sign up to mailing list:', answer);
								setTimeout(resolve, 1000);
							})
						}
						onSubmit={(formValues) =>
							new Promise((resolve) => {
								console.log('submitted value', formValues);
								setTimeout(resolve, 1000);
							})
						}
					/>
				)}
			</SurveyMarshal>
		</React.Fragment>
	);
}
