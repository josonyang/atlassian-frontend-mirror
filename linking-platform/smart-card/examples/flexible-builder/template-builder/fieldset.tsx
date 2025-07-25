import React, { type PropsWithChildren, useCallback, useState } from 'react';

import { IconButton } from '@atlaskit/button/new';
// eslint-disable-next-line @atlaskit/design-system/no-emotion-primitives -- to be migrated to @atlaskit/primitives/compiled – go/akcss
import { Box, Grid, Pressable, xcss } from '@atlaskit/primitives';

import ChevronIcon from './chevron-icon';

const buttonStyles = xcss({
	textAlign: 'left',
	width: '100%',
});

const Fieldset = ({
	children,
	defaultOpen = true,
	legend,
}: PropsWithChildren<{
	legend?: string;
	defaultOpen?: boolean;
}>) => {
	const [open, setOpen] = useState<boolean>(defaultOpen);
	const handleOnClick = useCallback(() => setOpen(!open), [open]);

	return (
		<Box paddingBlockEnd="space.025" paddingBlockStart="space.100">
			<Pressable
				backgroundColor="color.background.neutral.subtle"
				onClick={handleOnClick}
				xcss={buttonStyles}
			>
				<Grid alignItems="center" columnGap="space.100" templateColumns="1fr 24px">
					<h6>{legend}</h6>
					<IconButton spacing="compact" icon={() => <ChevronIcon open={open} />} label="" />
				</Grid>
			</Pressable>
			{open && children}
		</Box>
	);
};

export default Fieldset;
