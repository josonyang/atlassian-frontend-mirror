import React from 'react';

import { ButtonItem, MenuGroup, Section } from '@atlaskit/menu';

import ImgIcon from '../common/img-icon';
import MenuGroupContainer from '../common/menu-group-container';
import battery from '../icons/battery.png';
import cloud from '../icons/cloud.png';
import Drill from '../icons/drill.png';
import koala from '../icons/koala.png';
import ui from '../icons/ui.png';
import wallet from '../icons/wallet.png';
import Yeti from '../icons/yeti.png';

export default () => {
	return (
		<MenuGroupContainer>
			<MenuGroup maxHeight={300}>
				<Section title="starred">
					<ButtonItem
						iconBefore={<ImgIcon src={Yeti} alt={'Yeti'} />}
						description="Next-gen software project"
					>
						Navigation System
					</ButtonItem>
					<ButtonItem
						iconBefore={<ImgIcon src={Drill} alt={'Drill'} />}
						description="Next-gen service desk"
					>
						Analytics Platform
					</ButtonItem>
				</Section>
				<Section title="Recent">
					<ButtonItem
						iconBefore={<ImgIcon src={battery} alt={'Battery'} />}
						description="Next-gen software project"
					>
						Fabric Editor
					</ButtonItem>
					<ButtonItem
						iconBefore={<ImgIcon src={cloud} alt={'Cloud'} />}
						description="Classic business project"
					>
						Content Services
					</ButtonItem>
					<ButtonItem
						iconBefore={<ImgIcon src={wallet} alt={'Wallet'} />}
						description="Next-gen software project"
					>
						Trinity Mobile
					</ButtonItem>
					<ButtonItem
						iconBefore={<ImgIcon src={koala} alt={'Koala'} />}
						description="Classic service desk"
					>
						Customer Feedback
					</ButtonItem>
					<ButtonItem
						iconBefore={<ImgIcon src={ui} alt={'UI'} />}
						description="Classic software project"
					>
						Design System
					</ButtonItem>
				</Section>
				<Section hasSeparator>
					<ButtonItem>View all projects</ButtonItem>
					<ButtonItem>Create project</ButtonItem>
				</Section>
			</MenuGroup>
		</MenuGroupContainer>
	);
};
