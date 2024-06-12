import React, { type ComponentProps } from 'react';
import OldButton from '@atlaskit/button';
import Button, { IconButton } from '@atlaskit/button/new';

import AddIconOld from '../glyph/add';
import HipchatChevronDownOld from '../glyph/hipchat/chevron-down';
import AddIcon from '../core/add';
import ChevronDownIcon from '../utility/chevron-down';

import { Inline, Stack, xcss } from '@atlaskit/primitives';
import Heading from '@atlaskit/heading';

const FFAddIcon = ({ label, spacing, ...iconProps }: ComponentProps<typeof AddIcon>) => (
	<AddIcon
		spacing={spacing}
		LEGACY_fallbackIcon={AddIconOld}
		LEGACY_size="medium"
		label={label}
		// eslint-disable-next-line @repo/internal/react/no-unsafe-spread-props
		{...iconProps}
	/>
);

const FFChevronDown = ({ ...iconProps }: ComponentProps<typeof AddIcon>) => (
	<ChevronDownIcon
		LEGACY_fallbackIcon={HipchatChevronDownOld}
		// eslint-disable-next-line @repo/internal/react/no-unsafe-spread-props
		{...iconProps}
	/>
);

const styles = xcss({ padding: 'space.200' });
const IconSizeExample = () => {
	return (
		<Stack space="space.200" alignInline="start" xcss={styles}>
			<Heading size="small">Icon button examples</Heading>
			{[true, false].map((isSelected: boolean) => (
				<>
					<Heading size="xsmall">{isSelected ? 'Selected buttons' : 'Not selected'}</Heading>
					<Inline space="space.100" alignBlock="center">
						<OldButton
							isSelected={isSelected}
							iconBefore={<AddIconOld label="" />}
							iconAfter={<HipchatChevronDownOld label="" />}
						>
							Button
						</OldButton>
						<OldButton isSelected={isSelected} iconBefore={<AddIconOld label="" />}>
							Button
						</OldButton>
						<OldButton isSelected={isSelected} iconBefore={<AddIconOld label="Add" />} />
						Old button, old icon
					</Inline>
					<Inline space="space.100" alignBlock="center">
						<Button
							isSelected={isSelected}
							iconBefore={AddIconOld}
							iconAfter={HipchatChevronDownOld}
						>
							Button
						</Button>
						<Button isSelected={isSelected} iconBefore={AddIconOld}>
							Button
						</Button>
						<IconButton label="add" isSelected={isSelected} icon={AddIconOld} />
						New button, old icon
					</Inline>
					<Inline space="space.100" alignBlock="center">
						<OldButton
							isSelected={isSelected}
							iconBefore={<FFAddIcon label="" color="currentColor" />}
							iconAfter={<FFChevronDown label="" color="currentColor" />}
						>
							Button
						</OldButton>
						<OldButton
							isSelected={isSelected}
							iconBefore={<FFAddIcon label="" color="currentColor" />}
						>
							Button
						</OldButton>
						<OldButton
							isSelected={isSelected}
							iconBefore={<FFAddIcon label="add" spacing="spacious" color="currentColor" />}
						/>
						Old button, new icon - with legacy fallback (feature flagged)
					</Inline>
					<Inline space="space.100" alignBlock="center">
						<Button isSelected={isSelected} iconBefore={FFAddIcon} iconAfter={FFChevronDown}>
							Button
						</Button>
						<Button isSelected={isSelected} iconBefore={FFAddIcon}>
							Button
						</Button>
						<IconButton isSelected={isSelected} label="add" icon={FFAddIcon} />
						New button, new icon - with legacy fallback (feature flagged)
					</Inline>
					<Inline space="space.100" alignBlock="center">
						<OldButton
							isSelected={isSelected}
							iconBefore={<AddIcon label="" color="currentColor" />}
							iconAfter={<ChevronDownIcon label="" color="currentColor" />}
						>
							Button
						</OldButton>
						<OldButton
							isSelected={isSelected}
							iconBefore={<AddIcon label="" color="currentColor" />}
						>
							Button
						</OldButton>
						<OldButton
							isSelected={isSelected}
							iconBefore={<AddIcon label="add" spacing="spacious" color="currentColor" />}
						/>
						Old button, new icon
					</Inline>
					<Inline space="space.100" alignBlock="center">
						<Button isSelected={isSelected} iconBefore={AddIcon} iconAfter={ChevronDownIcon}>
							Button
						</Button>
						<Button isSelected={isSelected} iconBefore={AddIcon}>
							Button
						</Button>
						<IconButton isSelected={isSelected} label="add" icon={AddIcon} />
						New button, new icon
					</Inline>
				</>
			))}
		</Stack>
	);
};

export default IconSizeExample;
