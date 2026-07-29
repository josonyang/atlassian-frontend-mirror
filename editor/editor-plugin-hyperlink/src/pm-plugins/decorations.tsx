import React, { type MouseEvent } from 'react';

import { render } from 'react-dom';
import { createRoot, type Root } from 'react-dom/client';
import { IntlProvider, type IntlShape } from 'react-intl';

import { type HyperlinkState, LinkAction, OverlayButton } from '@atlaskit/editor-common/link';
import type { PluginKey } from '@atlaskit/editor-prosemirror/state';
import type { EditorView } from '@atlaskit/editor-prosemirror/view';
import { fg } from '@atlaskit/platform-feature-flags';
const reactRoots = new WeakMap<Element, Root>();

/** Mounts `element` into `mountPoint`: uses the React 18/19 `createRoot` API when `nike_r19_render_unmount` is on, else the legacy render path. */
const renderToMountPoint = (element: React.ReactElement, mountPoint: Element) => {
	if (fg('nike_r19_render_unmount')) {
		let root = reactRoots.get(mountPoint);

		if (!root) {
			root = createRoot(mountPoint);
			reactRoots.set(mountPoint, root);
		}

		root.render(element);
	} else {
		render(element, mountPoint);
	}
};

export const ButtonWrapper = ({
	editorView,
	pos,
	stateKey,
	intl,
	onOpenLinkClick,
}: {
	editorView: EditorView;
	intl: IntlShape;
	/** Callback fired when the Open Link dropdown item is clicked */
	onOpenLinkClick: (event: MouseEvent<HTMLAnchorElement>) => void;
	pos?: number;
	stateKey: PluginKey<HyperlinkState>;
}): HTMLSpanElement => {
	const wrapper = document.createElement('span');
	wrapper.style.position = 'relative';
	const nonBreakingCharacter = '\u2060';

	const onDropdownChange = (isOpen: boolean) => {
		editorView.dispatch(
			editorView.state.tr.setMeta(stateKey, {
				type: LinkAction.SET_CONFIGURE_DROPDOWN_OPEN,
				isOpen,
			}),
		);
	};

	renderToMountPoint(
		<IntlProvider locale={intl.locale || 'en'} messages={intl.messages} formats={intl.formats}>
			<OverlayButton
				targetElementPos={pos}
				editorView={editorView}
				onDropdownChange={onDropdownChange}
				onOpenLinkClick={onOpenLinkClick}
			/>
			{nonBreakingCharacter}
		</IntlProvider>,
		wrapper,
	);

	return wrapper;
};
