/**
 * @jsxRuntime classic
 * @jsx jsx
 */

import { cssMap, jsx } from '@compiled/react';
import { FormattedMessage } from 'react-intl-next';

import Button from '@atlaskit/button';
import ErrorIcon from '@atlaskit/icon/core/migration/error';
import { Box, Inline } from '@atlaskit/primitives/compiled';
import { R300 } from '@atlaskit/theme/colors';
import { token } from '@atlaskit/tokens';

import { messages } from '../../../messages';
import { Frame } from '../components/ErrorFrame';

export interface ErroredViewProps {
	onRetry?: (val: any) => void;
	isSelected?: boolean;
	testId?: string;
	inheritDimensions?: boolean;
}

const styles = cssMap({
	boxStyles: {
		paddingLeft: token('space.050'),
		paddingRight: token('space.050'),
	},
});

export const EmbedCardErroredView = ({
	onRetry,
	isSelected = false,
	testId = 'embed-card-errored-view',
	inheritDimensions,
}: ErroredViewProps) => (
	<Frame
		inheritDimensions={inheritDimensions}
		compact={true}
		isSelected={isSelected}
		testId={testId}
	>
		<ErrorIcon LEGACY_size="small" color={token('color.icon.danger', R300)} label="error-icon" />
		<Box xcss={styles.boxStyles}>
			<Inline>
				<FormattedMessage {...messages.could_not_load_link} />
			</Inline>
		</Box>
		<Button testId="err-view-retry" appearance="link" spacing="none" onClick={onRetry}>
			<FormattedMessage {...messages.try_again} />
		</Button>
	</Frame>
);
