import { waitFor } from '@testing-library/react';
import { act, renderHook } from '@testing-library/react-hooks';

import { asMock } from '@atlaskit/link-test-helpers/jest';

import { fetchObjectSchemas } from '../../services/cmdbService';
import { type FetchObjectSchemasResponse } from '../../types/assets/types';
import { type FetchObjectSchemasDetails, useObjectSchemas } from '../useObjectSchemas';

jest.mock('../../services/cmdbService');

describe('useObjectSchemas', () => {
	const workspaceId = 'workspaceId';
	const schemaQuery = 'schemaQuery';

	const mockFetchObjectSchemasResponse = {
		startAt: 0,
		maxResults: 20,
		total: 2,
		values: [
			{
				id: '1',
				name: 'schemaOne',
			},
			{
				id: '2',
				name: 'schemaTwo',
			},
		],
		isLast: true,
	};

	const mockFetchObjectSchemas = asMock(fetchObjectSchemas);

	beforeEach(() => {
		jest.resetAllMocks();
	});

	it('should return initial state on mount', async () => {
		const { result } = renderHook(() => useObjectSchemas(workspaceId));
		await waitFor(() => {
			expect(result.current.objectSchemas).toEqual(undefined);
			expect(result.current.objectSchemasError).toEqual(undefined);
			expect(result.current.objectSchemasLoading).toEqual(false);
			expect(result.current.fetchObjectSchemas).toEqual(expect.any(Function));
		});
	});

	it('should return objectSchemas and totalObjectSchemas when fetchObjectSchemas resolves', async () => {
		mockFetchObjectSchemas.mockResolvedValue(mockFetchObjectSchemasResponse);
		const { result } = renderHook(() => useObjectSchemas(workspaceId));
		const fetchObjectSchemas = result.current.fetchObjectSchemas;
		let fetchObjectSchemasResponse: FetchObjectSchemasDetails | undefined;
		await act(async () => {
			fetchObjectSchemasResponse = await fetchObjectSchemas(schemaQuery);
		});
		await waitFor(() => {
			expect(mockFetchObjectSchemas).toHaveBeenCalledWith(workspaceId, schemaQuery);
			expect(fetchObjectSchemasResponse).toMatchObject({
				objectSchemas: mockFetchObjectSchemasResponse.values,
				totalObjectSchemas: mockFetchObjectSchemasResponse.total,
			});
			expect(result.current.objectSchemas).toMatchObject(mockFetchObjectSchemasResponse.values);
			expect(result.current.totalObjectSchemas).toEqual(mockFetchObjectSchemasResponse.total);
			expect(result.current.objectSchemasError).toBe(undefined);
		});
	});

	it('should return an error when fetchObjectSchemas rejects', async () => {
		// PermissionError and FetchError extend Error so this test verifies they propogate up
		const mockError = new Error();
		mockFetchObjectSchemas.mockRejectedValue(mockError);
		const { result } = renderHook(() => useObjectSchemas(workspaceId));
		const fetchObjectSchemas = result.current.fetchObjectSchemas;
		let fetchObjectSchemasResponse: FetchObjectSchemasDetails | undefined;
		await act(async () => {
			fetchObjectSchemasResponse = await fetchObjectSchemas(schemaQuery);
		});
		await waitFor(() => {
			expect(fetchObjectSchemasResponse).toMatchObject({
				objectSchemas: undefined,
				totalObjectSchemas: undefined,
			});
			expect(result.current.objectSchemas).toBe(undefined);
			expect(result.current.totalObjectSchemas).toBe(undefined);
			expect(result.current.objectSchemasError).toBe(mockError);
		});
	});

	it('should return a newly constructed error when fetchObjectSchemas rejects with a non error type', async () => {
		const mockError = { error: 'fake error message' };
		mockFetchObjectSchemas.mockRejectedValue(mockError);
		const { result, waitForNextUpdate } = renderHook(() => useObjectSchemas(workspaceId));
		const fetchObjectSchemas = result.current.fetchObjectSchemas;
		act(() => {
			fetchObjectSchemas(schemaQuery);
		});
		await waitForNextUpdate();
		expect(result.current.objectSchemasError?.message).toEqual(`Unexpected error occured`);
	});

	it('should correctly set objectSchemasLoading when fetchObjectSchemas is called', async () => {
		let fetchObjectSchemasResolveFn: (
			value: FetchObjectSchemasResponse | PromiseLike<FetchObjectSchemasResponse>,
		) => void = () => {};
		const deferredPromise = new Promise((resolve) => (fetchObjectSchemasResolveFn = resolve));
		mockFetchObjectSchemas.mockReturnValue(deferredPromise);
		const { result, waitForNextUpdate } = renderHook(() => useObjectSchemas(workspaceId));
		const fetchObjectSchemas = result.current.fetchObjectSchemas;
		act(() => {
			fetchObjectSchemas(schemaQuery);
		});
		expect(result.current.objectSchemasLoading).toBe(true);
		act(() => {
			fetchObjectSchemasResolveFn(mockFetchObjectSchemasResponse);
		});
		await waitForNextUpdate();
		expect(result.current.objectSchemasLoading).toBe(false);
	});
});
