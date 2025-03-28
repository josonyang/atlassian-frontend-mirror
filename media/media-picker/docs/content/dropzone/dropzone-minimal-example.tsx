/**
 * @jsxRuntime classic
 * @jsx jsx
 */
// eslint-disable-next-line @atlaskit/ui-styling-standard/use-compiled -- Ignored via go/DSP-18766
import { jsx } from '@emotion/react';
import { useState } from 'react';
import { createUploadMediaClientConfig } from '@atlaskit/media-test-helpers';
import { MediaClient, type FileIdentifier } from '@atlaskit/media-client';
import { type DropzoneConfig, type UploadEndEventPayload } from '../../../src/types';
import { NativeMediaViewer } from '../../../example-helpers/NativeMediaViewer';
import { Dropzone } from '../../../src';

const mediaClientConfig = createUploadMediaClientConfig();
const dropzoneMediaClient = new MediaClient(mediaClientConfig);

const DropzoneExample = () => {
	const [uploadEnd, setUploadEnd] = useState<boolean>(false);
	const [isDropped, setIsDropped] = useState<boolean>(false);
	const [identifier, setIdentifier] = useState<FileIdentifier>({
		mediaItemType: 'file',
		id: '',
	});

	const onEnd = (payload: UploadEndEventPayload) => {
		setUploadEnd(true);
		setIsDropped(false);
		setIdentifier((state) => {
			return { ...state, id: payload.file.id };
		});
	};

	const onDrop = () => {
		setIdentifier((state) => {
			return { ...state, id: '' };
		});
		setIsDropped(true);
		setUploadEnd(false);
	};

	const getConfig = () => {
		const config: DropzoneConfig = {
			container: document.getElementById('dropZone')!,
			uploadParams: {},
		};
		return config;
	};

	return (
		<div
			style={{
				// eslint-disable-next-line @atlaskit/ui-styling-standard/enforce-style-prop -- Ignored via go/DSP-18766
				height: '300px',
			}}
			id="dropZone"
		>
			Drag and drop your file, and you can see preview after it is uploaded !!
			{/* eslint-disable-next-line @atlaskit/design-system/use-primitives-text */}
			{isDropped && !uploadEnd && <p>Upload in Progress !!</p>}
			<Dropzone
				mediaClientConfig={dropzoneMediaClient.config}
				config={getConfig()}
				onEnd={onEnd}
				onDrop={onDrop}
			/>
			{uploadEnd && (
				// eslint-disable-next-line @atlaskit/ui-styling-standard/enforce-style-prop -- Ignored via go/DSP-18766
				<div style={{ maxWidth: '300px', maxHeight: '250px' }}>
					<NativeMediaViewer id={identifier.id} mediaClient={dropzoneMediaClient} />
				</div>
			)}
		</div>
	);
};

export default DropzoneExample;
