import React from 'react';

import ReactDOM from 'react-dom';

import type { MediaADFAttrs, MediaBaseAttributes } from '@atlaskit/adf-schema';
import type { FileIdentifier, Identifier, MediaClientConfig } from '@atlaskit/media-client';
import { MediaViewer } from '@atlaskit/media-viewer';
import { editorExperiment } from '@atlaskit/tmp-editor-statsig/experiments';

import { isExternalMedia } from '../../toolbar/utils';

interface RenderMediaViewerProps {
	mediaClientConfig: MediaClientConfig;
	onClose: () => void;
	selectedNodeAttrs: MediaADFAttrs;
}

const getIdentifier = (attrs: MediaADFAttrs): Identifier => {
	if (isExternalMedia(attrs)) {
		return {
			mediaItemType: 'external-image',
			dataURI: attrs.url,
		};
	} else {
		const { id, collection = '' } = attrs;
		return {
			id,
			mediaItemType: 'file',
			collectionName: collection,
		};
	}
};

export const RenderMediaViewer = ({
	mediaClientConfig,
	onClose,
	selectedNodeAttrs,
}: RenderMediaViewerProps) => {
	if (editorExperiment('add-media-from-url', true)) {
		const identifier = getIdentifier(selectedNodeAttrs);
		const collectionName = isExternalMedia(selectedNodeAttrs) ? '' : selectedNodeAttrs.collection;

		return ReactDOM.createPortal(
			<MediaViewer
				collectionName={collectionName}
				items={[]}
				mediaClientConfig={mediaClientConfig!}
				selectedItem={identifier}
				onClose={onClose}
			/>,
			document.body,
		);
	}

	const { id, collection = '' } = selectedNodeAttrs as MediaBaseAttributes;
	const identifier: FileIdentifier = {
		id,
		mediaItemType: 'file',
		collectionName: collection,
	};

	return ReactDOM.createPortal(
		<MediaViewer
			collectionName={collection}
			items={[]}
			mediaClientConfig={mediaClientConfig!}
			selectedItem={identifier}
			onClose={onClose}
		/>,
		document.body,
	);
};
