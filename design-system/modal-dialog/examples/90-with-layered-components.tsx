import React, { Fragment, type ReactNode, useCallback, useRef, useState } from 'react';

import Lorem from 'react-lorem-component';

import AvatarGroup from '@atlaskit/avatar-group';
import Button, { IconButton } from '@atlaskit/button/new';
import Checkbox from '@atlaskit/checkbox';
import { cssMap } from '@atlaskit/css';
import { DatePicker } from '@atlaskit/datetime-picker';
import DropdownMenu, { DropdownItem, DropdownItemGroup } from '@atlaskit/dropdown-menu';
import noop from '@atlaskit/ds-lib/noop';
import Flag, { FlagGroup } from '@atlaskit/flag';
import { Field } from '@atlaskit/form';
import Info from '@atlaskit/icon/glyph/info';
import AddCommentIcon from '@atlaskit/icon/glyph/media-services/add-comment';
import ModalDialog, {
	ModalBody,
	ModalFooter,
	ModalHeader,
	ModalTitle,
	ModalTransition,
} from '@atlaskit/modal-dialog';
import Popup from '@atlaskit/popup';
import { Box } from '@atlaskit/primitives/compiled';
import Select, { PopupSelect } from '@atlaskit/select';
import { layers } from '@atlaskit/theme/constants';
import { token } from '@atlaskit/tokens';
import Tooltip from '@atlaskit/tooltip';

const Break = () => <br />;

export default () => {
	const [isOpen, setIsOpen] = useState(false);
	const [isPopupOpen, setIsPopupOpen] = useState(false);
	const [shouldScrollInViewport, setShouldScrollInViewPort] = useState(false);

	const middleRef = useRef<HTMLDivElement>(null);
	const bottomRef = useRef<HTMLDivElement>(null);

	const open = useCallback(() => setIsOpen(true), []);
	const close = useCallback(() => setIsOpen(false), []);

	const scrollToMiddle = useCallback(
		() => middleRef.current && middleRef.current.scrollIntoView(true),
		[],
	);
	const scrollToBottom = useCallback(
		() => bottomRef.current && bottomRef.current.scrollIntoView(true),
		[],
	);

	return (
		<Box padding="space.200" testId="container">
			<Field name="sb" label="Scrolling behavior">
				{() => (
					<Checkbox
						label="Should scroll within the viewport"
						name="scroll"
						testId="scroll"
						onChange={(e) => setShouldScrollInViewPort(e.target.checked)}
						isChecked={shouldScrollInViewport}
					/>
				)}
			</Field>

			<Break />
			<Button aria-haspopup="dialog" appearance="primary" onClick={open} testId="open-modal">
				Open modal
			</Button>

			<ModalTransition>
				{isOpen && (
					<ModalDialog
						onClose={close}
						shouldScrollInViewport={shouldScrollInViewport}
						testId="modal"
					>
						<ModalHeader hasCloseButton>
							<ModalTitle>Modal Title</ModalTitle>
						</ModalHeader>
						<ModalBody>
							<Lorem count={4} />
							<div ref={middleRef} />
							<Break />
							<Popup
								shouldRenderToParent
								isOpen={isPopupOpen}
								onClose={() => setIsPopupOpen(false)}
								placement="bottom-start"
								zIndex={layers.modal()}
								content={() => (
									// eslint-disable-next-line @atlaskit/ui-styling-standard/enforce-style-prop -- Ignored via go/DSP-18766
									<Box style={{ padding: '5px' }}>I'm a little popup!</Box>
								)}
								trigger={(triggerProps) => (
									<Fragment>
										<IconButton
											{...triggerProps}
											testId="popup-trigger"
											isSelected={isPopupOpen}
											onClick={() => setIsPopupOpen(!isPopupOpen)}
											icon={AddCommentIcon}
											label="Add"
										/>
										<Break />
									</Fragment>
								)}
							/>
							<Break />
							<Tooltip testId="tooltip" position="left" content="I'm a little tooltip">
								<Button testId="tooltip-trigger">Hover on me to view tooltip!</Button>
								<Break />
							</Tooltip>
							<Break />
							<PopupSelect
								placeholder="PopupSelect"
								options={selectOptions}
								target={({ ref }: { ref: React.RefObject<any> }) => (
									<Fragment>
										<Button testId="popup-select-trigger" ref={ref}>
											I'm a pop up select, click me!
										</Button>
										<Break />
									</Fragment>
								)}
								popperProps={{ placement: 'bottom' }}
								searchThreshold={10}
							/>
							<Break />
							{/* This replicates the bug reported in
              https://ecosystem.atlassian.net/browse/DS-7622,
              but 'fixed' by setting the menuPosition. */}
							<Select
								// eslint-disable-next-line @atlaskit/ui-styling-standard/no-classname-prop -- Ignored via go/DSP-18766
								className="select-zindex-fixed"
								placeholder="zIndex: 9999, menuPortalTarget: document.body, menuPosition: fixed"
								options={selectOptions}
								menuPortalTarget={document.body}
								styles={{ menuPortal: (base) => ({ ...base, zIndex: 9999 }) }}
								menuPosition="fixed"
								formatOptionLabel={({ label }) => (
									<Tooltip position="bottom" content="I'm a little tooltip">
										<div>{label}</div>
									</Tooltip>
								)}
							/>
							<Break />
							<Select
								// eslint-disable-next-line @atlaskit/ui-styling-standard/no-classname-prop -- Ignored via go/DSP-18766
								className="select-fixed"
								placeholder="menuPosition: fixed"
								options={selectOptions}
								menuPosition="fixed"
								formatOptionLabel={({ label }) => (
									<Tooltip position="bottom" content="I'm a little tooltip">
										<div>{label}</div>
									</Tooltip>
								)}
							/>
							<Break />
							<Select
								// eslint-disable-next-line @atlaskit/ui-styling-standard/no-classname-prop -- Ignored via go/DSP-18766
								className="select-absolute"
								placeholder="menuPosition: absolute"
								options={selectOptions}
								menuPosition="absolute"
								formatOptionLabel={({ label }) => (
									<Tooltip position="bottom" content="I'm a little tooltip">
										<div>{label}</div>
									</Tooltip>
								)}
							/>
							<Break />
							<FlagGroupExample />
							<Break />
							<Lorem count={5} />
							<Break />
							<AvatarGroup
								testId="avatar-group"
								appearance="stack"
								data={avatarGroupUsers.map((d) => ({
									email: d.email,
									key: d.email,
									name: d.name,
									href: '#',
								}))}
							/>
							<Break />
							<DatePicker shouldShowCalendarButton testId="date-picker" />
							<Break />
							<DropdownMenu testId="dropdown-menu" trigger="I'm a dropdown menu, click me!">
								<DropdownItemGroup>
									<DropdownItem>Edit</DropdownItem>
									<DropdownItem>Share</DropdownItem>
									<DropdownItem>Move</DropdownItem>
								</DropdownItemGroup>
							</DropdownMenu>
							<Break />
							<div ref={bottomRef} />
						</ModalBody>
						<ModalFooter>
							<Button appearance="subtle" onClick={scrollToMiddle} testId="scroll-to-middle">
								Scroll to middle
							</Button>
							<Button appearance="subtle" onClick={scrollToBottom} testId="scroll-to-bottom">
								Scroll to bottom
							</Button>
							<Button appearance="primary" onClick={close}>
								Close
							</Button>
						</ModalFooter>
					</ModalDialog>
				)}
			</ModalTransition>
		</Box>
	);
};

const selectOptions = [
	{ label: 'Sydney', value: 'sydney' },
	{ label: 'Tokyo', value: 'tokyo' },
	{ label: 'New York', value: 'new york' },
	{ label: 'Jakarta', value: 'jakarta' },
];

const avatarGroupUsers = [
	{ email: 'chaki@me.com', name: 'Chaki Caronni' },
	{ email: 'nanop@outlook.com', name: 'Nanop Rgiersig' },
	{ email: 'dowdy@outlook.com', name: 'Dowdy Metzzo' },
	{ email: 'daveewart@msn.com', name: 'Daveewart Grdschl' },
	{ email: 'fwitness@optonline.net', name: 'Fwitness Tezbo' },
	{ email: 'nighthawk@yahoo.com', name: 'Nighthawk Wikinerd' },
	{ email: 'naupa@me.com', name: 'Naupa Telbij' },
	{ email: 'jsmith@verizon.net', name: 'Jsmith Rnelson' },
	{ email: 'maneesh@msn.com', name: 'Maneesh Solomon' },
	{ email: 'kiddailey@yahoo.com', name: 'Kiddailey Kodeman' },
	{ email: 'kodeman@att.net', name: 'Kodeman Kiddailey' },
	{ email: 'solomon@att.net', name: 'Solomon Maneesh' },
	{ email: 'rnelson@optonline.net', name: 'Rnelson Jsmith' },
	{ email: 'telbij@msn.com', name: 'Telbij Naupa' },
];

type FlagData = {
	created: number;
	description: string;
	icon: ReactNode;
	id: number;
	key: number;
	title: string;
};

const flagGroupContainerStyles = cssMap({
	root: {
		width: '100%',
		textAlign: 'right',
	},
});

const FlagGroupExample = () => {
	const [flags, setFlags] = useState<Array<FlagData>>([]);

	const addFlag = () => {
		setFlags((current) => [generateFlagData(flags), ...current]);
	};

	const dismissFlag = useCallback(
		(id: string | number) => {
			setFlags((current) => current.filter((flag) => flag.id !== id));
		},
		[setFlags],
	);

	return (
		<Box xcss={flagGroupContainerStyles.root}>
			<Button testId="flag-trigger" appearance="primary" onClick={addFlag}>
				Add flag
			</Button>
			<FlagGroup onDismissed={dismissFlag}>
				{flags.map((flag, index) => (
					<Flag
						testId={`flag-${index + 1}`}
						actions={[
							{ content: 'Nice one!', onClick: noop },
							{ content: 'No, thanks', onClick: () => dismissFlag(flag.id) },
						]}
						{...flag}
					/>
				))}
			</FlagGroup>
		</Box>
	);
};

const generateFlagData = (flags: FlagData[]): FlagData => ({
	created: Date.now(),
	description: 'Velit duis sit officia eiusmod Lorem aliqua enim laboris do dolor eiusmod.',
	icon: <Info label="Info icon" primaryColor={token('color.icon.discovery')} />,
	id: flags.length,
	key: flags.length,
	title: `${flags.length + 1}: Whoa a new flag!`,
});
