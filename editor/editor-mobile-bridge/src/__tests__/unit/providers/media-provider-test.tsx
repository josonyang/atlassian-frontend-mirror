jest.mock('@atlaskit/media-client');
jest.mock('@atlaskit/media-client-react');

import React from 'react';
import type {
	ContextIdentifierProvider,
	MediaProvider,
} from '@atlaskit/editor-common/provider-factory';
import { ProviderFactory } from '@atlaskit/editor-common/provider-factory';

import type { MediaOptions, MediaState } from '@atlaskit/editor-plugin-media/types';
// eslint-disable-next-line @atlassian/tangerine/import/entry-points
import { insertMediaSingleNode } from '@atlaskit/editor-plugin-media/src/plugin';

import { doc, p, mediaSingle, media } from '@atlaskit/editor-test-helpers/doc-builder';
import type { DocBuilder } from '@atlaskit/editor-common/types';
import { randomId } from '@atlaskit/editor-test-helpers/random-id';
import { sleep } from '@atlaskit/editor-test-helpers/sleep';
import { createEditorFactory } from '@atlaskit/editor-test-helpers/create-editor';

import type { Auth, AuthProvider, MediaClientConfig } from '@atlaskit/media-core';
import type { MediaClient, ProcessedFileState } from '@atlaskit/media-client';
import { isFileIdentifier, createMediaSubscribable } from '@atlaskit/media-client';

import {
	getMediaClient,
	withMediaClient,
	useFileState,
	useMediaClient,
} from '@atlaskit/media-client-react';
import uuid from 'uuid/v4';
import {
	asMock,
	asMockReturnValue,
	expectFunctionToHaveBeenCalledWith,
	fakeMediaClient,
} from '@atlaskit/media-test-helpers';
import { INPUT_METHOD } from '@atlaskit/editor-common/analytics';

// Quick patch for isFileIdentifier
// TODO: please, don't mock the full @atlaskit/media-client package
asMock(isFileIdentifier).mockImplementation(
	jest.requireActual('@atlaskit/media-client').isFileIdentifier,
);

let testFileId: string;

let testMediaAuth: Auth;

const createMediaState = (collection: string, width = 256, height = 128): MediaState => ({
	id: testFileId,
	collection,
	status: 'ready',
	dimensions: { width, height },
});

const createMedia = (collection: string, width = 256, height = 128) =>
	media({
		type: 'file',
		id: testFileId,
		collection,
		width,
		height,
	})();

describe('Mobile MediaProvider', () => {
	const createEditor = createEditorFactory();

	let promisedMediaProvider: Promise<MediaProvider>;
	let promisedIdentifierProvider: Promise<ContextIdentifierProvider>;
	let mockAuthProvider: jest.Mock<AuthProvider>;
	let providerFactory: ProviderFactory;
	let testFileState: ProcessedFileState;
	let mediaClient: MediaClient;

	beforeEach(() => {
		testFileState = {
			status: 'processed',
			id: testFileId,
			name: 'image.jpeg',
			size: 100,
			artifacts: {},
			mediaType: 'image',
			mimeType: 'image/jpeg',
			representations: {
				image: {},
			},
		};

		testFileId = uuid();
		testMediaAuth = {
			clientId: `media-plugin-mock-clientId-${randomId()}`,
			token: 'some-token',
			baseUrl: '/',
		};

		mockAuthProvider = jest.fn<AuthProvider, any>(() => () => Promise.resolve(testMediaAuth));
		const mediaClientConfig: MediaClientConfig = {
			authProvider: mockAuthProvider as any,
		};
		mediaClient = fakeMediaClient();
		asMockReturnValue(getMediaClient, mediaClient);
		asMock(withMediaClient).mockImplementation(
			(Component: React.ComponentType<React.PropsWithChildren<unknown>>) => (props: any) => (
				<Component {...props} mediaClient={mediaClient} />
			),
		);

		asMockReturnValue(mediaClient.file.getFileState, createMediaSubscribable(testFileState));
		asMockReturnValue(useFileState, { fileState: testFileState });
		asMockReturnValue(useMediaClient, mediaClient);

		promisedMediaProvider = Promise.resolve({
			viewMediaClientConfig: mediaClientConfig,
			uploadMediaClientConfig: mediaClientConfig,
			uploadParams: {
				collection: '',
			},
		});

		promisedIdentifierProvider = Promise.resolve({
			containerId: 'come-container-id',
			objectId: 'some-object-id',
		});

		providerFactory = ProviderFactory.create({
			mediaProvider: promisedMediaProvider,
			contextIdentifierProvider: promisedIdentifierProvider,
		});
	});

	const editor = (doc: DocBuilder, mediaOptions: MediaOptions) =>
		createEditor({
			doc,
			editorProps: {
				media: mediaOptions,
				appearance: 'mobile',
			},
			providerFactory,
		});

	afterAll(() => {
		providerFactory.destroy();
	});

	describe('rendering mediaSingle', () => {
		describe('having collection name', () => {
			it("should call media's AuthProvider", async () => {
				/**
				 * NOTE: Due to a change in ProseMirror it's not possible render media as a last item
				 * without rendering the Media NodeView. If we require such test, they need to be
				 * rewritten as integration test.
				 */
				const { editorView } = editor(doc(p('text{<>}'), p()), {
					allowMediaSingle: true,
					provider: promisedMediaProvider,
				});

				const testCollectionName = `media-plugin-mock-collection-${randomId()}`;

				await promisedMediaProvider;

				insertMediaSingleNode(
					editorView,
					createMediaState(testCollectionName, 128, 256),
					INPUT_METHOD.CLIPBOARD,
					testCollectionName,
				);

				expect(editorView.state.doc).toEqualDocument(
					doc(
						p('text'),
						mediaSingle({ layout: 'center' })(createMedia(testCollectionName, 128, 256)),
						p(),
					),
				);

				// flushes promise resolution queue so that the async media API calls mockAuthProvider
				await sleep(0);

				expectFunctionToHaveBeenCalledWith(useFileState, [
					testFileId,
					{ collectionName: testCollectionName, occurrenceKey: undefined, skipRemote: false },
				]);
			});
		});

		describe('having empty collection name', () => {
			it("should call media's AuthProvider", async () => {
				/**
				 * NOTE: Due to a change in ProseMirror it's not possible render media as a last item
				 * without rendering the Media NodeView. If we require such test, they need to be
				 * rewritten as integration test.
				 */
				const { editorView } = editor(doc(p('text{<>}'), p()), {
					allowMediaSingle: true,
					provider: promisedMediaProvider,
				});

				const emptyCollectionName = '';

				await promisedMediaProvider;

				insertMediaSingleNode(
					editorView,
					createMediaState(emptyCollectionName, 128, 256),
					INPUT_METHOD.CLIPBOARD,
					emptyCollectionName,
				);

				expect(editorView.state.doc).toEqualDocument(
					doc(
						p('text'),
						mediaSingle({ layout: 'center' })(createMedia(emptyCollectionName, 128, 256)),
						p(),
					),
				);

				// flushes promise resolution queue so that the async media API calls mockAuthProvider
				await sleep(0);

				expectFunctionToHaveBeenCalledWith(useFileState, [
					testFileId,
					{ collectionName: emptyCollectionName, occurrenceKey: undefined, skipRemote: false },
				]);
			});
		});
	});
});
