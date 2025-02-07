/**
 * @jsxRuntime classic
 * @jsx jsx
 */
import { type FC, useCallback, useState } from 'react';

// eslint-disable-next-line @atlaskit/ui-styling-standard/use-compiled -- Ignored via go/DSP-18766
import { css, jsx } from '@emotion/react';

import Button from '@atlaskit/button/new';
import Popup from '@atlaskit/popup';
import { Box, xcss } from '@atlaskit/primitives';

const contentStyles = xcss({
	margin: 'space.200',
});

type PopupExampleProps = {
	name: string;
};

const PopupExample: FC<PopupExampleProps> = ({ name }) => {
	const [isOpen, setIsOpen] = useState(false);

	const onClick = useCallback(() => {
		console.log('onClick', name);
		setIsOpen(!isOpen);
	}, [isOpen, name, setIsOpen]);

	const onClose = useCallback(() => {
		console.log('onClose', name);
		setIsOpen(false);
	}, [name, setIsOpen]);

	return (
		<Popup
			isOpen={isOpen}
			onClose={onClose}
			content={() => <Box xcss={contentStyles}>content</Box>}
			trigger={(triggerProps) => (
				<Button {...triggerProps} onClick={onClick}>
					{isOpen ? 'Close' : 'Open'} {name} popup
				</Button>
			)}
			placement="bottom-start"
		/>
	);
};

const containerStyles = css({
	display: 'flex',
});

export default () => (
	<div css={containerStyles}>
		<PopupExample name="foo" />
		<PopupExample name="bar" />
		<PopupExample name="baz" />
	</div>
);
