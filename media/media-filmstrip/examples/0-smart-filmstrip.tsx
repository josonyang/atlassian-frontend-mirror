/**
 * @jsxRuntime classic
 * @jsx jsx
 */
// eslint-disable-next-line @atlaskit/ui-styling-standard/use-compiled -- Ignored via go/DSP-18766
import { jsx } from '@emotion/react';
import { Component, type SyntheticEvent } from 'react';
import {
	createUploadMediaClient,
	genericFileId,
	audioFileId,
	errorFileId,
	gifFileId,
	externalImageIdentifier,
	defaultCollectionName,
} from '@atlaskit/media-test-helpers';
import { type CardEvent, type CardAction } from '@atlaskit/media-card';
import EditorCloseIcon from '@atlaskit/icon/core/migration/cross--editor-close';
import {
	type FileItem,
	type FileState,
	type UploadableFile,
	type MediaClient,
	type FileIdentifier,
} from '@atlaskit/media-client';
import Button from '@atlaskit/button/new';
import { filmstripWrapperStyles } from '../example-helpers/styles';
import { Filmstrip, type FilmstripItem } from '../src';

export interface ExampleState {
	items: FilmstripItem[];
	mediaClient?: MediaClient;
	shouldOpenMediaViewer: boolean;
}

const defaultMediaClient = createUploadMediaClient();

class Example extends Component<{}, ExampleState> {
	onCardClick = (result: CardEvent) => {
		const { items } = this.state;

		if (!result.mediaItemDetails) {
			return;
		}
		const selectedId = (result.mediaItemDetails as FileIdentifier).id;
		const currentItemIndex = this.getItemIndex(selectedId);

		if (currentItemIndex > -1) {
			const item = items[currentItemIndex];
			const newItem = {
				...item,
				selected: !item.selected,
			};
			items[currentItemIndex] = newItem;

			this.setState({
				items,
			});
		}
	};

	getItemIndex = (id: string | Promise<string>): number => {
		const { items } = this.state;
		const item = items.find((item) => (item.identifier as FileIdentifier).id === id);

		if (item) {
			return items.indexOf(item);
		}

		return -1;
	};

	onClose = (item?: FileItem) => {
		if (!item) {
			return;
		}

		const { items } = this.state;
		const index = this.getItemIndex(item.details.id);

		if (index > -1) {
			items.splice(index, 1);
			this.setState({
				items,
			});
		}
	};

	cardProps: Partial<FilmstripItem> = {
		selectable: true,
		onClick: this.onCardClick,
		actions: [
			{
				handler: this.onClose,
				icon: <EditorCloseIcon color="currentColor" spacing="spacious" label="close" />,
			},
		],
	};

	state: ExampleState = {
		items: [
			{
				identifier: genericFileId,
				...this.cardProps,
			},
			{
				identifier: externalImageIdentifier,
				...this.cardProps,
			},
			{
				identifier: audioFileId,
				...this.cardProps,
			},
			{
				identifier: errorFileId,
				...this.cardProps,
			},
			{
				identifier: gifFileId,
				...this.cardProps,
			},
		],
		mediaClient: defaultMediaClient,
		shouldOpenMediaViewer: false,
	};

	createOnClickFromId = (id: string) => (event: any) => {
		this.onCardClick({
			event,
			mediaItemDetails: {
				id,
			},
		});
	};

	createActionsFromId = (id: string): CardAction[] => {
		const handler = () => {
			this.onClose({
				type: 'file',
				details: {
					id,
				},
			});
		};

		return [
			{
				handler,
				icon: <EditorCloseIcon color="currentColor" spacing="spacious" label="close" />,
			},
		];
	};

	uploadFile = async (event: SyntheticEvent<HTMLInputElement>) => {
		const { mediaClient } = this.state;
		if (!event.currentTarget.files || !event.currentTarget.files.length || !mediaClient) {
			return;
		}

		const file = event.currentTarget.files[0];
		const uploadableFile: UploadableFile = {
			content: file,
			name: file.name,
			collection: defaultCollectionName,
		};

		mediaClient.file.upload(uploadableFile).subscribe({
			next: (state: FileState) => {
				if (state.status === 'uploading') {
					const { id } = state;
					// prevent adding the same file id mutliple times
					if (
						this.state.items.some(
							(item) => item.identifier.mediaItemType === 'file' && item.identifier.id === id,
						)
					) {
						return;
					}
					const { items } = this.state;
					const newItem: FilmstripItem = {
						...this.cardProps,
						onClick: this.createOnClickFromId(id),
						actions: this.createActionsFromId(id),
						identifier: {
							id,
							mediaItemType: 'file',
							collectionName: defaultCollectionName,
						},
						selected: true,
					};

					this.setState({
						items: [newItem, ...items],
					});
				}
			},
			error(error: Error) {
				console.log('subscription', error);
			},
		});
	};

	toggleMediaClient = () => {
		const { mediaClient: currentMediaClient } = this.state;

		this.setState({
			mediaClient: currentMediaClient ? undefined : defaultMediaClient,
		});
	};

	toggleMediaViewer = () => {
		const { shouldOpenMediaViewer } = this.state;

		this.setState({
			shouldOpenMediaViewer: !shouldOpenMediaViewer,
		});
	};

	render() {
		const { items, mediaClient, shouldOpenMediaViewer } = this.state;

		return (
			<div>
				{/* eslint-disable-next-line @atlaskit/design-system/consistent-css-prop-usage, @atlaskit/ui-styling-standard/no-imported-style-values -- Ignored via go/DSP-18766 */}
				<div css={filmstripWrapperStyles}>
					<Filmstrip
						mediaClientConfig={mediaClient && mediaClient.config}
						items={items}
						shouldOpenMediaViewer={shouldOpenMediaViewer}
					/>
				</div>
				<div>
					Upload file <input type="file" onChange={this.uploadFile} />
				</div>
				<div>
					<Button appearance="primary" onClick={this.toggleMediaClient}>
						toggle mediaClient
					</Button>
					MediaClient is: {mediaClient ? 'ON' : 'OFF'}
				</div>
				<div>
					<Button appearance="primary" onClick={this.toggleMediaViewer}>
						toggle mediaViewer
					</Button>
					MediaClient is: {shouldOpenMediaViewer ? 'ON' : 'OFF'}
				</div>
			</div>
		);
	}
}

export default () => <Example />;
