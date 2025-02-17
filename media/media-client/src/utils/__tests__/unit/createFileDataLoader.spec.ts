import Dataloader from 'dataloader';
import { asMock, asMockFunctionReturnValue } from '@atlaskit/media-common/test-helpers';
import { fakeMediaClient } from '../../../test-helpers';

import {
	type ItemsPayload,
	type MediaItemDetails,
	type MediaStore,
	type MediaStoreResponse,
	type ResponseFileItem,
} from '../../..';

import {
	type DataloaderKey,
	createBatchLoadingFunc,
	createFileDataloader,
	getItemsFromKeys,
} from '../../createFileDataLoader';

describe('createFileDataLoader', () => {
	const setup = () => {
		const mediaClient = fakeMediaClient();

		const itemsResponse: Promise<MediaStoreResponse<ItemsPayload>> = Promise.resolve({
			data: {
				items: [],
			},
		});

		const mediaStore = {
			...mediaClient.mediaStore,
			getItems: asMockFunctionReturnValue(mediaClient.mediaStore.getItems, itemsResponse),
		} as jest.Mocked<MediaStore>;

		const dataLoader = createFileDataloader(mediaStore);

		const defaultDetails: Omit<MediaItemDetails, 'name'> = {
			mediaType: 'image',
			mimeType: 'image/jpeg',
			processingStatus: 'pending',
			size: 0,
			artifacts: {},
			representations: {},
			metadataTraceContext: expect.any(Object),
		};

		const defaultError = new Error('Sorry buddy!');

		return { dataLoader, defaultDetails, defaultError, mediaStore };
	};

	afterEach(() => {
		jest.restoreAllMocks();
	});

	describe('getItemsFromKeys()', () => {
		const details = {} as any;

		it('should return the same array with same length', () => {
			const keys: DataloaderKey[] = [
				{
					id: '1',
				},
				{
					id: '2',
				},
				{
					id: '2',
					collectionName: 'user-collection',
				},
			];

			const items: ResponseFileItem[] = [
				{
					id: '1',
					type: 'file',
					details,
				},
			];

			expect(getItemsFromKeys(keys, items)).toHaveLength(keys.length);
		});

		it('should respect order', () => {
			const keys: DataloaderKey[] = [
				{
					id: '1',
				},
				{
					id: '2',
				},
				{
					id: '2',
					collectionName: 'user-collection',
				},
			];

			const items: ResponseFileItem[] = [
				{
					id: '2',
					type: 'file',
					details: {
						...details,
						name: 'file-2',
					},
				},
				{
					id: '1',
					type: 'file',
					details: {
						...details,
						name: 'file-1',
					},
				},
			];

			const result = getItemsFromKeys(keys, items);

			expect(result[0]).toEqual({
				name: 'file-1',
			});
			expect(result[1]).toEqual({
				name: 'file-2',
			});
			expect(result[2]).toEqual({
				id: '2',
				type: 'not-found',
			});
		});

		it('should use collection name to find item', () => {
			const keys: DataloaderKey[] = [
				{
					id: '1',
					collectionName: 'first-collection',
				},
				{
					id: '1',
					collectionName: 'other-collection',
				},
				{
					id: '2',
					collectionName: 'user-collection',
				},
			];

			const items: ResponseFileItem[] = [
				{
					id: '2',
					type: 'file',
					collection: 'user-collection',
					details: {
						...details,
						name: 'file-2',
					},
				},
				{
					id: '1',
					type: 'file',
					collection: 'first-collection',
					details: {
						...details,
						name: 'file-1',
					},
				},
			];

			const result = getItemsFromKeys(keys, items);

			expect(result).toEqual([
				{
					name: 'file-1',
					metadataTraceContext: undefined,
				},
				{
					id: '1',
					type: 'not-found',
				},
				{
					name: 'file-2',
					metadataTraceContext: undefined,
				},
			]);
		});

		it('should return id and type for not found files', () => {
			const keys: DataloaderKey[] = [
				{
					id: '1',
					collectionName: 'a',
				},
				{
					id: '2',
					collectionName: 'b',
				},
			];

			const items: ResponseFileItem[] = [
				{
					id: '2',
					type: 'file',
					details: {
						...details,
						name: 'file-2',
					},
				},
			];

			const result = getItemsFromKeys(keys, items);

			expect(result).toEqual([
				{ id: '1', type: 'not-found' },
				{ id: '2', type: 'not-found' },
			]);
		});
	});

	describe('batchLoadingFunc()', () => {
		it('should return empty array when empty keys', async () => {
			const { mediaStore } = setup();
			const result = await createBatchLoadingFunc(mediaStore)([]);
			expect(result).toEqual([]);
		});

		it('should return results matching all keys (same collection)', async () => {
			const { defaultDetails, mediaStore } = setup();

			const collectionName = 'collection';

			const keys: DataloaderKey[] = [
				{ id: 'item-1', collectionName },
				{ id: 'item-2', collectionName },
				{ id: 'item-3', collectionName },
				{ id: 'item-4', collectionName },
			];

			const mockedDetails: MediaItemDetails[] = [
				{
					...defaultDetails,
					name: 'filename-1',
				},
				{
					...defaultDetails,
					name: 'filename-2',
				},
				{
					...defaultDetails,
					name: 'filename-3',
				},
				{
					...defaultDetails,
					name: 'filename-4',
				},
			];

			asMock(mediaStore.getItems).mockResolvedValue({
				data: {
					items: [
						{
							id: 'item-1',
							type: 'file',
							details: mockedDetails[0],
							collection: collectionName,
						},
						{
							id: 'item-2',
							type: 'file',
							details: mockedDetails[1],
							collection: collectionName,
						},
						{
							id: 'item-3',
							type: 'file',
							details: mockedDetails[2],
							collection: collectionName,
						},
						{
							id: 'item-4',
							type: 'file',
							details: mockedDetails[3],
							collection: collectionName,
						},
					],
				},
			});

			const result = await createBatchLoadingFunc(mediaStore)(keys);
			expect(result).toEqual(mockedDetails);
		});

		it('should return results matching all keys (different collections)', async () => {
			const { defaultDetails, mediaStore } = setup();

			const collection1 = 'collection1';
			const collection2 = 'collection2';

			const keys: DataloaderKey[] = [
				{ id: 'item-1', collectionName: collection1 },
				{ id: 'item-2', collectionName: collection1 },
				{ id: 'item-3', collectionName: collection2 },
				{ id: 'item-4', collectionName: collection2 },
			];

			const mockedDetails: MediaItemDetails[] = [
				{
					...defaultDetails,
					name: 'filename-1',
				},
				{
					...defaultDetails,
					name: 'filename-2',
				},
				{
					...defaultDetails,
					name: 'filename-3',
				},
				{
					...defaultDetails,
					name: 'filename-4',
				},
			];

			asMock(mediaStore.getItems).mockResolvedValueOnce({
				data: {
					items: [
						{
							id: 'item-1',
							type: 'file',
							details: mockedDetails[0],
							collection: collection1,
						},
						{
							id: 'item-2',
							type: 'file',
							details: mockedDetails[1],
							collection: collection1,
						},
					],
				},
			});

			asMock(mediaStore.getItems).mockResolvedValueOnce({
				data: {
					items: [
						{
							id: 'item-3',
							type: 'file',
							details: mockedDetails[2],
							collection: collection2,
						},
						{
							id: 'item-4',
							type: 'file',
							details: mockedDetails[3],
							collection: collection2,
						},
					],
				},
			});

			const result = await createBatchLoadingFunc(mediaStore)(keys);
			expect(result).toEqual(mockedDetails);
		});

		it('should return errors from mediaStore.getItems', async () => {
			const { defaultDetails, defaultError, mediaStore } = setup();

			const collection1 = 'collection1';
			const collection2 = 'collection2';

			const keys: DataloaderKey[] = [
				{ id: 'item-1', collectionName: collection1 },
				{ id: 'item-2', collectionName: collection1 },
				{ id: 'item-3', collectionName: collection2 },
				{ id: 'item-4', collectionName: collection2 },
			];

			const mockedDetails: MediaItemDetails[] = [
				{
					...defaultDetails,
					name: 'filename-1',
				},
				{
					...defaultDetails,
					name: 'filename-2',
				},
				{
					...defaultDetails,
					name: 'filename-3',
				},
				{
					...defaultDetails,
					name: 'filename-4',
				},
			];

			asMock(mediaStore.getItems).mockResolvedValueOnce({
				data: {
					items: [
						{
							id: 'item-1',
							type: 'file',
							details: mockedDetails[0],
							collection: collection1,
						},
						{
							id: 'item-2',
							type: 'file',
							details: mockedDetails[1],
							collection: collection1,
						},
					],
				},
			});

			asMock(mediaStore.getItems).mockRejectedValueOnce(defaultError);

			const result = await createBatchLoadingFunc(mediaStore)(keys);
			expect(result).toEqual([
				{
					...defaultDetails,
					name: 'filename-1',
				},
				{
					...defaultDetails,
					name: 'filename-2',
				},
				defaultError,
				defaultError,
			]);
		});
	});

	describe('createFileDataLoader()', () => {
		it('should create a DataLoader', () => {
			const { dataLoader } = setup();
			expect(dataLoader instanceof Dataloader).toBeTruthy();
		});

		it('should load items details from successful response', async () => {
			const { dataLoader, defaultDetails, mediaStore } = setup();
			const collectionName = 'collection';

			const mockedDetails: MediaItemDetails[] = [
				{
					...defaultDetails,
					name: 'filename-1',
				},
				{
					...defaultDetails,
					name: 'filename-2',
				},
				{
					...defaultDetails,
					name: 'filename-3',
				},
				{
					...defaultDetails,
					name: 'filename-4',
				},
			];

			// request for item-3/item-4 details would return this payload
			asMock(mediaStore.getItems).mockResolvedValue({
				data: {
					items: [
						{
							id: 'item-1',
							type: 'file',
							details: mockedDetails[0],
							collection: collectionName,
						},
						{
							id: 'item-2',
							type: 'file',
							details: mockedDetails[1],
							collection: collectionName,
						},
						{
							id: 'item-3',
							type: 'file',
							details: mockedDetails[2],
							collection: collectionName,
						},
						{
							id: 'item-4',
							type: 'file',
							details: mockedDetails[3],
							collection: collectionName,
						},
					],
				},
			});

			const result = await dataLoader.load({
				id: 'item-1',
				collectionName,
			});
			expect(result).toEqual(mockedDetails[0]);
		});

		it('should load items details from mixed successful and unsuccessful responses', async () => {
			const { dataLoader, defaultDetails, defaultError, mediaStore } = setup();
			const collectionName = 'collection';

			const mockedDetails: MediaItemDetails[] = [
				{
					...defaultDetails,
					name: 'filename-1',
				},
				{
					...defaultDetails,
					name: 'filename-2',
				},
			];

			asMock(mediaStore.getItems).mockResolvedValueOnce({
				data: {
					items: [
						{
							id: 'item-1',
							type: 'file',
							details: mockedDetails[0],
							collection: collectionName,
						},
						{
							id: 'item-2',
							type: 'file',
							details: mockedDetails[1],
							collection: collectionName,
						},
					],
				},
			});

			// request for item-3/item-4 details would return an error
			asMock(mediaStore.getItems).mockRejectedValueOnce(defaultError);

			const result = await dataLoader.load({
				id: 'item-2',
				collectionName,
			});
			expect(result).toEqual(mockedDetails[1]);
		});

		it('should batch calls to getItems within same tick', async () => {
			const { dataLoader, defaultDetails, mediaStore } = setup();
			const collectionName = 'collection';

			const mockedDetails: MediaItemDetails[] = [
				{
					...defaultDetails,
					name: 'filename-1',
				},
				{
					...defaultDetails,
					name: 'filename-2',
				},
				{
					...defaultDetails,
					name: 'filename-3',
				},
				{
					...defaultDetails,
					name: 'filename-4',
				},
			];

			// request for item-3/item-4 details would return this payload
			asMock(mediaStore.getItems).mockResolvedValue({
				data: {
					items: [
						{
							id: 'item-1',
							type: 'file',
							details: mockedDetails[0],
							collection: collectionName,
						},
						{
							id: 'item-2',
							type: 'file',
							details: mockedDetails[1],
							collection: collectionName,
						},
						{
							id: 'item-3',
							type: 'file',
							details: mockedDetails[2],
							collection: collectionName,
						},
						{
							id: 'item-4',
							type: 'file',
							details: mockedDetails[3],
							collection: collectionName,
						},
					],
				},
			});

			const results = await Promise.all([
				dataLoader.load({ id: 'item-1', collectionName }),
				dataLoader.load({ id: 'item-2', collectionName }),
			]);

			expect(results).toEqual([mockedDetails[0], mockedDetails[1]]);
			expect(mediaStore.getItems).toHaveBeenCalledTimes(1);
		});

		it('should re-throw error from unsuccessful request', async () => {
			const { dataLoader, defaultError, mediaStore } = setup();
			const collectionName = 'collection';

			// request returns an error
			asMock(mediaStore.getItems).mockRejectedValueOnce(defaultError);

			try {
				await dataLoader.load({
					id: 'item-1',
					collectionName,
				});
			} catch (err) {
				expect(err).toEqual(defaultError);
			}

			expect.assertions(1);
		});

		it('should return id, collection, metadata trace context and type for not found files', async () => {
			const { dataLoader } = setup();
			const collectionName = 'collection';

			const result = await dataLoader.load({
				id: 'item-not-found',
				collectionName,
			});

			expect(result).toEqual({
				id: 'item-not-found',
				collection: collectionName,
				metadataTraceContext: { traceId: expect.any(String), spanId: expect.any(String) },
				type: 'not-found',
			});
		});
	});
});
