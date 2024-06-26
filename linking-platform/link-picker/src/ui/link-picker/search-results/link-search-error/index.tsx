/** @jsx jsx */
// eslint-disable-next-line @atlaskit/ui-styling-standard/use-compiled -- Ignored via go/DSP-18766
import { jsx } from '@emotion/react';
import { defineMessages, FormattedMessage, useIntl } from 'react-intl-next';

import Button from '@atlaskit/button';

import { GenericErrorSVG } from '../../../../common/generic-error-svg';
import { EmptyState } from '../../../../common/ui/empty-state';

export const CONTACT_SUPPORT_LINK = 'https://support.atlassian.com/contact/';

export const messages = defineMessages({
	searchErrorHeader: {
		id: 'fabric.linkPicker.search.error.heading',
		defaultMessage: 'We’re having trouble loading data.',
		description: 'Heading message shown when a search throws an error',
	},
	searchErrorDescription: {
		id: 'fabric.linkPicker.search.error.description',
		defaultMessage:
			'Refresh the page, or contact <a>Atlassian Support</a> if this keeps happening.',
		description: 'Describes possible actions when search throws an error',
	},
});

export const testIds = {
	searchError: 'link-search-error',
};

export const LinkSearchError = () => {
	const intl = useIntl();

	return (
		<EmptyState
			testId={testIds.searchError}
			header={intl.formatMessage(messages.searchErrorHeader)}
			description={
				<FormattedMessage
					{...messages.searchErrorDescription}
					values={{
						a: (label: React.ReactNode[]) => (
							<Button
								appearance="link"
								spacing="none"
								href={CONTACT_SUPPORT_LINK}
								target="_blank"
								rel="noopener noreferrer"
							>
								{label}
							</Button>
						),
					}}
				/>
			}
			renderImage={() => <GenericErrorSVG />}
		/>
	);
};
