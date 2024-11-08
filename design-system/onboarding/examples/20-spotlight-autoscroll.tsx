import React, { Component, Fragment } from 'react';

import Lorem from 'react-lorem-component';

import {
	Spotlight,
	SpotlightManager,
	SpotlightTarget,
	SpotlightTransition,
} from '@atlaskit/onboarding';
import { token } from '@atlaskit/tokens';

import { Highlight, HighlightGroup } from './styled';

interface State {
	spotlight: 'target-one' | 'target-two' | 'off';
}

const Paragraph = ({ position }: { position: number }) => (
	<Fragment>
		<h3>{position}</h3>
		{/* eslint-disable-next-line @atlaskit/ui-styling-standard/enforce-style-prop -- Ignored via go/DSP-18766 */}
		<div style={{ marginBottom: token('space.250', '20px') }}>
			<Lorem count={1} />
		</div>
	</Fragment>
);

// eslint-disable-next-line @repo/internal/react/no-class-components
export default class SpotlightAutoscrollExample extends Component<{}, State> {
	readonly state: State = {
		spotlight: 'off',
	};

	highlightOne = () => this.setState({ spotlight: 'target-one' });

	highlightTwo = () => this.setState({ spotlight: 'target-two' });

	close = () => this.setState({ spotlight: 'off' });

	render() {
		const { spotlight } = this.state;
		return (
			// eslint-disable-next-line @atlaskit/ui-styling-standard/enforce-style-prop -- Ignored via go/DSP-18766
			<div style={{ paddingBottom: token('space.500', '40px') }}>
				<SpotlightManager>
					<p>
						To save some time for consumers and provide a delightfull experience to users we check
						whether the target element is within the viewport before rendering each spotlight
						dialog.
					</p>
					<p>Scroll down to see the target element.</p>
					{/* eslint-disable-next-line @atlaskit/ui-styling-standard/enforce-style-prop -- Ignored via go/DSP-18766 */}
					<p style={{ marginBottom: token('space.200', '1em') }}>
						<button type="button" onClick={this.highlightOne}>
							Show
						</button>
					</p>

					{[1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map((i) => (
						<Paragraph key={i} position={i} />
					))}

					<HighlightGroup>
						<SpotlightTarget name="target-one">
							<Highlight color="red">
								I&apos;m out of view{' '}
								<span role="img" aria-label="sad face">
									😞
								</span>
							</Highlight>
						</SpotlightTarget>
					</HighlightGroup>

					{[11, 12, 13, 14, 15, 16, 17, 18, 19, 20].map((i) => (
						<Paragraph key={i} position={i} />
					))}

					<HighlightGroup>
						<SpotlightTarget name="target-two">
							<Highlight color="red">
								I&apos;m also out of view{' '}
								<span role="img" aria-label="sad face">
									😞
								</span>
							</Highlight>
						</SpotlightTarget>
					</HighlightGroup>

					{/* eslint-disable-next-line @atlaskit/ui-styling-standard/enforce-style-prop -- Ignored via go/DSP-18766 */}
					<p style={{ marginBottom: token('space.200', '1em') }}>
						<button type="button" onClick={this.highlightTwo}>
							Show
						</button>
					</p>

					<SpotlightTransition>
						{spotlight !== 'off' && (
							<Spotlight
								actions={
									spotlight === 'target-one'
										? [
												{
													onClick: this.highlightTwo,
													text: 'Next',
												},
												{
													onClick: this.close,
													appearance: 'subtle',
													text: 'Dismiss',
												},
											]
										: [
												{
													onClick: this.close,
													text: 'Got it',
												},
												{
													onClick: this.highlightOne,
													appearance: 'subtle',
													text: 'Go back',
												},
											]
								}
								dialogPlacement="bottom left"
								heading="Aww, yiss!"
								key={spotlight}
								target={spotlight}
							>
								<Lorem count={1} />
							</Spotlight>
						)}
					</SpotlightTransition>
				</SpotlightManager>
			</div>
		);
	}
}
