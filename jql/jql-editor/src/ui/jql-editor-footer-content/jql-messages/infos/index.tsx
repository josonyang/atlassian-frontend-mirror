import React, { type ReactNode } from 'react';

import { di } from 'react-magnetic-di';

import { HelperMessage } from '@atlaskit/form';
import LegacyInfoIcon from '@atlaskit/icon/glyph/info';
import InfoIcon from '@atlaskit/icon/utility/information';
import { Box } from '@atlaskit/primitives/compiled';
import * as colors from '@atlaskit/theme/colors';
import { token } from '@atlaskit/tokens';

import { useEditorViewHasInfos } from '../../../../hooks/use-editor-view-has-infos';
import { useExternalMessages } from '../../../../state';
import { FormatMessages, MessageContainer } from '../format';

export const useFormattedInfoMessage = (): ReactNode => {
	di(useExternalMessages, useEditorViewHasInfos);

	const [{ infos: externalInfos }] = useExternalMessages();
	const hasInfos = useEditorViewHasInfos();

	if (!hasInfos) {
		return null;
	}

	return <FormatMessages messages={externalInfos} />;
};

export const InfoMessages = () => {
	di(useFormattedInfoMessage);

	const infoMessage = useFormattedInfoMessage();

	return infoMessage != null ? (
		<MessageContainer>
			<HelperMessage testId="jql-editor-info-message">
				<Box as="span" paddingInlineEnd="space.050">
					<InfoIcon
						label=""
						color={token('color.icon.information', colors.B500)}
						LEGACY_size="small"
						LEGACY_fallbackIcon={LegacyInfoIcon}
						LEGACY_margin="0 -4px 0 0"
					/>
				</Box>
				{infoMessage}
			</HelperMessage>
		</MessageContainer>
	) : null;
};
