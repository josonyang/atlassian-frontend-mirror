import React, { Component } from 'react';

import Lorem from 'react-lorem-component';
import { Transition } from 'react-transition-group';

import { Spotlight, SpotlightManager, SpotlightTransition } from '@atlaskit/onboarding';
import { fg } from '@atlaskit/platform-feature-flags';
import { token } from '@atlaskit/tokens';

import { Highlight } from './styled';

interface State {
	drawerIsVisible: boolean;
	spotlightIsVisible: boolean;
}

type AnimationState = { [key: string]: any };

// eslint-disable-next-line @repo/internal/react/no-class-components
export default class SpotlightNodeExample extends Component<Object, State> {
	drawer = React.createRef<HTMLElement>();
	nodeRef = React.createRef<HTMLElement>();
	state = { drawerIsVisible: false, spotlightIsVisible: false };

	showDrawer = () => {
		this.setState({ drawerIsVisible: true });
	};

	hideDrawer = () => {
		this.setState({ drawerIsVisible: false });
	};

	toggleDrawer = () => {
		if (this.state.drawerIsVisible) {
			this.hideDrawer();
		} else {
			this.showDrawer();
		}
	};

	showSpotlight = () => {
		this.setState({ spotlightIsVisible: true });
	};

	hideSpotlight = () => {
		this.setState({ spotlightIsVisible: false });
	};

	render() {
		const { drawerIsVisible, spotlightIsVisible } = this.state;
		const duration = 300;
		return (
			<SpotlightManager>
				{/* eslint-disable-next-line @atlaskit/ui-styling-standard/enforce-style-prop -- Ignored via go/DSP-18766 */}
				<p style={{ marginBottom: token('space.200', '1em') }}>
					Use <code>targetNode</code> when you can&apos;t wrap the target in a{' '}
					<code>{'<SpotlightTarget />'}</code>. For example you need to wait for the node to be
					present in the DOM.
				</p>

				<button type="button" onClick={this.toggleDrawer}>
					{drawerIsVisible ? 'Close' : 'Open'}
				</button>

				<Transition
					in={drawerIsVisible}
					mountOnEnter
					unmountOnExit
					appear
					timeout={duration}
					onExit={this.hideSpotlight}
					onEntered={() => window.setTimeout(this.showSpotlight, duration)}
					{...(fg('platform_design_system_team_transition_group_r18') && {
						nodeRef: this.nodeRef,
					})}
				>
					{(state: string) => {
						if (state === 'exited') {
							return null;
						}
						const base = {
							transition: `opacity ${duration}ms, transform ${duration}ms`,
							marginTop: token('space.250', '20px'),
						};
						const anim: Record<string, AnimationState> = {
							entering: { opacity: 0, transform: 'translateX(-100%)' },
							entered: { opacity: 1, transform: 'translateX(0)' },
							exiting: { opacity: 0, transform: 'translateX(-50%)' },
						};
						const style = { ...base, ...anim[state] };
						return (
							// eslint-disable-next-line @atlaskit/ui-styling-standard/enforce-style-prop -- Ignored via go/DSP-18766
							<div style={style}>
								<Highlight ref={this.drawer} color="green">
									{/* eslint-disable-next-line @atlaskit/ui-styling-standard/enforce-style-prop -- Ignored via go/DSP-18766 */}
									<div style={{ width: 240 }}>
										{/* eslint-disable-next-line @atlaskit/ui-styling-standard/enforce-style-prop -- Ignored via go/DSP-18766 */}
										<h3 style={{ marginBottom: token('space.250', '20px') }}>Animated Element</h3>
										<Lorem count={2} />
									</div>
								</Highlight>
							</div>
						);
					}}
				</Transition>
				<SpotlightTransition>
					{spotlightIsVisible && this.drawer.current ? (
						<Spotlight
							actions={[
								{
									onClick: this.hideSpotlight,
									text: 'Done',
								},
							]}
							dialogPlacement="right middle"
							heading="Waits for node availability"
							targetNode={this.drawer.current}
						>
							<Lorem count={1} />
						</Spotlight>
					) : null}
				</SpotlightTransition>
			</SpotlightManager>
		);
	}
}
