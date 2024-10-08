/**
 * @jsxRuntime classic
 * @jsx jsx
 */

// eslint-disable-next-line @atlaskit/ui-styling-standard/use-compiled -- Ignored via go/DSP-18766
import { css, jsx } from '@emotion/react';

import DecisionIcon from '@atlaskit/icon/core/migration/decision--editor-decision';

import Item from './Item';
import { type Appearance, type ContentRef } from '../types';
import { token } from '@atlaskit/tokens';

const iconStyles = (showPlaceholder: boolean | undefined) => {
	return css({
		flex: '0 0 16px',
		height: '16px',
		width: '16px',
		margin: `${token('space.050', '4px')} ${token('space.150', '12px')} 0 0`,
		// eslint-disable-next-line @atlaskit/ui-styling-standard/no-unsafe-values -- Ignored via go/DSP-18766
		color: showPlaceholder ? token('color.icon.subtle') : token('color.icon.success'),
		display: 'flex',
		alignItems: 'center',
		justifyContent: 'center',
	});
};

export interface Props {
	children?: any;
	contentRef?: ContentRef;
	placeholder?: string;
	showPlaceholder?: boolean;
	appearance?: Appearance;
	dataAttributes?: { [key: string]: string | number };
}

const DecisionItem = ({
	appearance,
	children,
	contentRef,
	placeholder,
	showPlaceholder,
	dataAttributes,
}: Props) => {
	const icon = (
		// eslint-disable-next-line @atlaskit/design-system/consistent-css-prop-usage -- Ignored via go/DSP-18766
		<span contentEditable={false} css={iconStyles(showPlaceholder)}>
			<DecisionIcon label="Decision" spacing="spacious" color="currentColor" LEGACY_size="large" />
		</span>
	);

	return (
		<Item
			appearance={appearance}
			contentRef={contentRef}
			icon={icon}
			placeholder={placeholder}
			showPlaceholder={showPlaceholder}
			itemType="DECISION"
			dataAttributes={dataAttributes}
		>
			{children}
		</Item>
	);
};

export default DecisionItem;
