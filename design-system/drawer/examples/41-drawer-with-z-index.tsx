import React, { Component, type SyntheticEvent } from 'react';

import Button from '@atlaskit/button/new';
import Drawer, { DrawerCloseButton, DrawerContent, DrawerSidebar } from '@atlaskit/drawer';
import Modal, { ModalHeader, ModalTitle } from '@atlaskit/modal-dialog';
import { layers } from '@atlaskit/theme/constants';

interface State {
	isDrawerOpen: boolean;
}

// eslint-disable-next-line @repo/internal/react/no-class-components
export default class DrawersExample extends Component<{}, State> {
	state = {
		isDrawerOpen: false,
	};

	openDrawer = () =>
		this.setState({
			isDrawerOpen: true,
		});

	onClose = (...args: [SyntheticEvent<HTMLElement>, any]) => {
		console.log('onClose', args);
		this.setState({
			isDrawerOpen: false,
		});
	};

	onCloseComplete = (args: any) => console.log('onCloseComplete', args);

	onOpenComplete = (args: any) => console.log('onOpenComplete', args);

	render() {
		return (
			// eslint-disable-next-line @atlaskit/ui-styling-standard/enforce-style-prop -- Ignored via go/DSP-18766
			<div style={{ padding: '2rem' }}>
				<Modal>
					<ModalHeader hasCloseButton>
						<ModalTitle>Drawer modal</ModalTitle>
					</ModalHeader>
					<Drawer
						onClose={this.onClose}
						onCloseComplete={this.onCloseComplete}
						onOpenComplete={this.onOpenComplete}
						isOpen={this.state.isDrawerOpen}
						width="wide"
						zIndex={layers.modal()}
						label="Drawer layer precedence"
					>
						<DrawerSidebar>
							<DrawerCloseButton />
						</DrawerSidebar>
						<DrawerContent>
							<code>Content</code>
						</DrawerContent>
					</Drawer>

					<Button id="open-drawer" type="button" onClick={this.openDrawer}>
						Open drawer
					</Button>
				</Modal>
			</div>
		);
	}
}
