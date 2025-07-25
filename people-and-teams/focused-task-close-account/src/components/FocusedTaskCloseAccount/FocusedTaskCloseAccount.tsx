import React from 'react';
import { FormattedMessage } from 'react-intl-next';
import Button from '@atlaskit/button';
import { Drawer, DrawerCloseButton, DrawerContent, DrawerSidebar } from '@atlaskit/drawer';
import CrossIcon from '@atlaskit/icon/core/migration/cross';

import * as Styled from './styled';
import Footer from '../Footer';
import { commonMessages } from '../../messages';
import MessagesIntlProvider from '../MessagesIntlProvider';

export interface Props {
	isOpen: boolean;
	onClose: () => void;
	screens: React.ReactNode[];
	submitButton: React.ReactNode;
	learnMoreLink: string;
}

export interface State {
	currentScreenIdx: number;
}

export class FocusedTaskCloseAccount extends React.Component<Props, State> {
	state: State = {
		currentScreenIdx: 0,
	};

	nextScreen = () => {
		const { screens } = this.props;
		const { currentScreenIdx } = this.state;
		const nextScreenIdx =
			currentScreenIdx < screens.length - 1 ? currentScreenIdx + 1 : screens.length - 1;
		this.setState({ currentScreenIdx: nextScreenIdx });
	};

	previousScreen = () => {
		const { currentScreenIdx } = this.state;
		const previousScreenIdx = currentScreenIdx - 1 >= 0 ? currentScreenIdx - 1 : 0;
		this.setState({ currentScreenIdx: previousScreenIdx });
	};

	renderCurrentScreen = () => {
		const currentScreen = this.props.screens[this.state.currentScreenIdx];
		return currentScreen;
	};

	render() {
		const { isOpen, onClose, screens, submitButton, learnMoreLink } = this.props;
		const { currentScreenIdx } = this.state;

		return (
			<MessagesIntlProvider>
				<Drawer isOpen={isOpen} onClose={onClose} width="full">
					<DrawerSidebar>
						<DrawerCloseButton
							icon={(props: any) => (
								<CrossIcon color="currentColor" label="" {...props} LEGACY_size="medium" />
							)}
						/>
					</DrawerSidebar>
					<DrawerContent>
						<Styled.DrawerInner>
							{this.renderCurrentScreen()}
							<Footer
								numScreens={screens.length}
								currentScreenIdx={currentScreenIdx}
								onCancel={onClose}
								onNext={this.nextScreen}
								onPrevious={this.previousScreen}
								secondaryActions={
									learnMoreLink && (
										<Button
											appearance="subtle-link"
											spacing="none"
											href={learnMoreLink}
											target="_blank"
										>
											<FormattedMessage {...commonMessages.learnMore} />{' '}
										</Button>
									)
								}
								submitButton={submitButton}
							/>
						</Styled.DrawerInner>
					</DrawerContent>
				</Drawer>
			</MessagesIntlProvider>
		);
	}
}

export default FocusedTaskCloseAccount;
