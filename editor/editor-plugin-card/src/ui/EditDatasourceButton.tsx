/** @jsx jsx */
import { css, jsx } from '@emotion/react';
import type { IntlShape } from 'react-intl-next';

import type { EditorAnalyticsAPI } from '@atlaskit/editor-common/analytics';
import { cardMessages as messages } from '@atlaskit/editor-common/messages';
import {
	FloatingToolbarButton as Button,
	FloatingToolbarSeparator as Separator,
	SmallerEditIcon,
} from '@atlaskit/editor-common/ui';
import type { EditorState } from '@atlaskit/editor-prosemirror/state';
import type { EditorView } from '@atlaskit/editor-prosemirror/view';
import type { CardContext } from '@atlaskit/link-provider';
import { Flex } from '@atlaskit/primitives';

import { editDatasource } from '../pm-plugins/doc';
import { isDatasourceConfigEditable } from '../utils';

import { CardContextProvider } from './CardContextProvider';
import { useFetchDatasourceInfo } from './useFetchDatasourceInfo';

export interface EditDatasourceButtonProps {
	intl: IntlShape;
	editorAnalyticsApi?: EditorAnalyticsAPI;
	url?: string;
	editorView?: EditorView;
	editorState: EditorState;
	cardContext?: CardContext;
}

const buttonStyles = css({
	pointerEvents: 'auto',
});

// Edit button in toolbar to open datasource modal. This button is shown for inline, block, and embed cards
// if they can resolve into a datasource.
const EditDatasourceButtonWithCardContext = ({
	cardContext,
	intl,
	editorAnalyticsApi,
	url,
	editorView,
	editorState,
}: EditDatasourceButtonProps) => {
	const { datasourceId } = useFetchDatasourceInfo({
		isRegularCardNode: true,
		url,
		cardContext,
	});

	if (!datasourceId || !isDatasourceConfigEditable(datasourceId)) {
		return null;
	}

	if (url) {
		const urlState = cardContext?.store?.getState()[url];
		if (urlState?.error?.kind === 'fatal') {
			return null;
		}
	}

	const dispatchCommand = (fn?: Function) => {
		fn && fn(editorState, editorView && editorView.dispatch);
		if (editorView && !editorView.hasFocus()) {
			editorView.focus();
		}
	};

	return (
		<Flex>
			<Button
				css={buttonStyles}
				title={intl.formatMessage(messages.datasourceTitle)}
				icon={<SmallerEditIcon />}
				selected={false}
				onClick={() => dispatchCommand(editDatasource(datasourceId, editorAnalyticsApi))}
				testId={'card-edit-datasource-button'}
			/>
			<Separator />
		</Flex>
	);
};

export const EditDatasourceButton = ({
	intl,
	editorAnalyticsApi,
	url,
	editorView,
	editorState,
}: EditDatasourceButtonProps) => {
	return (
		<CardContextProvider>
			{({ cardContext }) => (
				<EditDatasourceButtonWithCardContext
					url={url}
					intl={intl}
					editorAnalyticsApi={editorAnalyticsApi}
					editorView={editorView}
					editorState={editorState}
					cardContext={cardContext}
				/>
			)}
		</CardContextProvider>
	);
};
