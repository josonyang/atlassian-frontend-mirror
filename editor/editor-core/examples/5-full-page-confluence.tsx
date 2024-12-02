/* eslint-disable @atlaskit/design-system/ensure-design-token-usage/preview */
/**
 * @jsxRuntime classic
 * @jsx jsx
 */
import { useEffect, useState } from 'react';

// eslint-disable-next-line @atlaskit/ui-styling-standard/use-compiled -- Ignored via go/DSP-18766
import { css, jsx } from '@emotion/react';

import type { EditorAppearance } from '@atlaskit/editor-common/types';
import Spinner from '@atlaskit/spinner';
import { createCollabEditProvider } from '@atlaskit/synchrony-test-helpers';

import SidebarContainer from '../example-helpers/SidebarContainer';

import { InviteToEditButton } from './3-collab';
import FullPageExample, { getAppearance, LOCALSTORAGE_defaultDocKey } from './5-full-page';

const disabledBlanket = css({
	position: 'absolute',
	top: '0px',
	left: '0px',
	width: '100%',
	height: '100%',
	background: 'rgba(0, 0, 0, 0.03)',
	// eslint-disable-next-line @atlaskit/ui-styling-standard/no-nested-selectors -- Ignored via go/DSP-18766
	'> *': {
		marginTop: '50vh',
		marginLeft: '50vw',
	},
});

/**
 * Example designed to be similar to how the editor is within Confluence's Edit mode
 * Has:
 *  - 64px sidebar on the left
 *  - collab editing enabled
 */
const ExampleEditorComponent = () => {
	const [disabled, setDisabled] = useState(true);
	const [appearance, setAppearance] = useState<EditorAppearance>('full-page');

	const collabSessionId = 'quokka';

	useEffect(() => {
		// Simulate async nature of confluence fetching appearance
		const timeout = Math.floor(Math.random() * (1500 - 750 + 1)) + 750;
		console.log(`async delay is ${timeout}`);
		const appearanceTimeoutId = window.setTimeout(() => {
			setDisabled(false);
			setAppearance(getAppearance());
		}, timeout);

		return () => {
			window.clearTimeout(appearanceTimeoutId);
		};
	}, []);

	const defaultDoc =
		(localStorage && localStorage.getItem(LOCALSTORAGE_defaultDocKey)) || undefined;

	return (
		<SidebarContainer>
			{disabled && (
				<div css={disabledBlanket}>
					<Spinner size="large" />
				</div>
			)}
			<FullPageExample
				editorProps={{
					collabEdit: {
						provider: createCollabEditProvider({
							userId: collabSessionId,
							defaultDoc,
						}),
						inviteToEditComponent: InviteToEditButton,
					},
					elementBrowser: {
						showModal: true,
						replacePlusMenu: true,
					},
					disabled,
					appearance,
					shouldFocus: true,
				}}
			/>
		</SidebarContainer>
	);
};

export default ExampleEditorComponent;
