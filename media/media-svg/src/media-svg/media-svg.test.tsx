import React from 'react';

import { fireEvent, render, screen, waitFor } from '@testing-library/react';

import { generateSampleFileItem } from '@atlaskit/media-test-data';

import * as svgRendererModule from '../media-svg/svgRenderer';
import { failDataURIConversionOnce } from '../test-helpers';

import { createMockedMediaClientProvider } from './__tests__/utils/mockedMediaClientProvider/_MockedMediaClientProvider';
import { MediaSVGError } from './errors';
import MediaSvg from './media-svg';

describe('MediaSvg', () => {
	it('should capture and report a11y violations', async () => {
		const [fileItem, identifier] = generateSampleFileItem.svg();
		const { MockedMediaClientProvider } = createMockedMediaClientProvider({
			initialItems: fileItem,
		});
		const testId = 'media-svg';
		const alt = 'some-alt';
		const onMouseDown = jest.fn();
		const onLoad = jest.fn();
		const { container } = render(
			<MockedMediaClientProvider>
				<MediaSvg
					testId={testId}
					identifier={identifier}
					alt={alt}
					onMouseDown={onMouseDown}
					onLoad={onLoad}
				/>
				,
			</MockedMediaClientProvider>,
		);

		await expect(container).toBeAccessible();
	});

	it('should fetch and render the original contents of an SVG file', async () => {
		const [fileItem, identifier] = generateSampleFileItem.svg();
		const { MockedMediaClientProvider, mediaApi } = createMockedMediaClientProvider({
			initialItems: fileItem,
		});

		/* Delay the binary to observe the loading screen */
		let resolveBinary: any;
		const baseGetFileBinary = mediaApi.getFileBinary;
		mediaApi.getFileBinary = jest.fn(async (...args) => {
			await new Promise((resolve) => {
				resolveBinary = resolve;
			});
			return baseGetFileBinary(...args);
		});

		const testId = 'media-svg';
		const alt = 'some-alt';
		const onMouseDown = jest.fn();
		const onLoad = jest.fn();
		const style = { backgroundColor: 'red' };

		render(
			<MockedMediaClientProvider>
				<MediaSvg
					testId={testId}
					identifier={identifier}
					alt={alt}
					onMouseDown={onMouseDown}
					onLoad={onLoad}
					// eslint-disable-next-line @atlaskit/ui-styling-standard/enforce-style-prop -- Ignored via go/DSP-18766
					style={style}
				/>
				,
			</MockedMediaClientProvider>,
		);

		const loading = await screen.findByRole('status');
		expect(loading).toBeTruthy();

		await waitFor(() => expect(mediaApi.getFileBinary).toHaveBeenCalled());

		resolveBinary();

		const elem = (await screen.findByTestId(testId)) as unknown as HTMLImageElement;
		expect(elem.getAttribute('data-fileid')).toBe(identifier.id);
		expect(elem.getAttribute('data-filecollection')).toBe(identifier.collectionName);

		expect(elem.style.backgroundColor).toBe(style.backgroundColor);

		fireEvent.load(elem);
		expect(onLoad).toBeCalledTimes(1);

		fireEvent.mouseDown(elem);
		expect(onMouseDown).toBeCalledTimes(1);

		expect(mediaApi.getFileBinary).toBeCalledTimes(1);
	});

	it('should refetch the file when the identifier changes', async () => {
		const [fileItem1, identifier1] = generateSampleFileItem.svg();
		const [fileItem2, identifier2] = generateSampleFileItem.svg();
		const { MockedMediaClientProvider, mediaApi } = createMockedMediaClientProvider({
			initialItems: [fileItem1, fileItem2],
		});

		jest.spyOn(mediaApi, 'getFileBinary');

		const testId = 'media-svg';

		const { findByTestId, rerender } = render(
			<MockedMediaClientProvider>
				<MediaSvg testId={testId} identifier={identifier1} />,
			</MockedMediaClientProvider>,
		);
		const elem = (await findByTestId(testId)) as unknown as HTMLImageElement;
		expect(elem.getAttribute('data-fileid')).toBe(identifier1.id);

		rerender(
			<MockedMediaClientProvider>
				<MediaSvg testId={testId} identifier={identifier2} />,
			</MockedMediaClientProvider>,
		);

		await waitFor(() => expect(elem.getAttribute('data-fileid')).toBe(identifier2.id));
		await waitFor(() => expect(mediaApi.getFileBinary).toHaveBeenCalledTimes(2));
	});

	it('should call onError prop with binary-fetch if binary fetch fails', async () => {
		const [fileItem, identifier] = generateSampleFileItem.svg();
		const { MockedMediaClientProvider, mediaApi } = createMockedMediaClientProvider({
			initialItems: fileItem,
		});

		jest.spyOn(mediaApi, 'getFileBinary').mockRejectedValue(new Error('some-getFileBinary-error'));

		const onError = jest.fn();
		const error = new MediaSVGError('binary-fetch');

		render(
			<MockedMediaClientProvider>
				<MediaSvg identifier={identifier} onError={onError} />,
			</MockedMediaClientProvider>,
		);

		await waitFor(() => expect(onError).toBeCalledTimes(1));
		expect(onError).toHaveBeenCalledWith(error);
	});

	it('should call onError prop with blob-to-datauri if blob fails to convert to dataUri', async () => {
		const [fileItem, identifier] = generateSampleFileItem.svg();
		const { MockedMediaClientProvider } = createMockedMediaClientProvider({
			initialItems: fileItem,
		});

		// Simulate error on SVG Blob to DataURI conversion
		const conversionError = new Error('failed to convert Blob');
		failDataURIConversionOnce(conversionError);

		const onError = jest.fn();
		const error = new MediaSVGError('blob-to-datauri');

		render(
			<MockedMediaClientProvider>
				<MediaSvg identifier={identifier} onError={onError} />,
			</MockedMediaClientProvider>,
		);

		await waitFor(() => expect(onError).toBeCalledTimes(1));
		expect(onError).toHaveBeenCalledWith(error);
	});

	it('should call onError prop with img-error if IMG tag throws an error', async () => {
		const [fileItem, identifier] = generateSampleFileItem.svg();
		const { MockedMediaClientProvider } = createMockedMediaClientProvider({
			initialItems: fileItem,
		});

		const testId = 'media-svg';

		const onError = jest.fn();
		const error = new MediaSVGError('img-error');

		render(
			<MockedMediaClientProvider>
				<MediaSvg testId={testId} identifier={identifier} onError={onError} />,
			</MockedMediaClientProvider>,
		);

		const img = (await screen.findByTestId(testId)) as unknown as HTMLImageElement;
		fireEvent.error(img);

		await waitFor(() => expect(onError).toBeCalledTimes(1));
		expect(onError).toHaveBeenCalledWith(error);
	});

	it('should render the local binary if available', async () => {
		const [fileItem, identifier] = generateSampleFileItem.svg();
		const { MockedMediaClientProvider, uploadItem, mediaApi } = createMockedMediaClientProvider({});

		jest.spyOn(mediaApi, 'getFileBinary');

		// Adds a local preview to the state
		uploadItem(fileItem, 0.8);

		const testId = 'media-svg';

		render(
			<MockedMediaClientProvider>
				<MediaSvg testId={testId} identifier={identifier} />,
			</MockedMediaClientProvider>,
		);

		const elem = (await screen.findByTestId(testId)) as unknown as HTMLImageElement;
		expect(elem.getAttribute('data-source')).toBe('local');
		expect(mediaApi.getFileBinary).toBeCalledTimes(0);
	});

	// Cannot spy on the `SvgRenderer` property because it is not a function; object given instead.
	it.skip('should catch unexpected errors', async () => {
		const SvgRendererSpy = jest.spyOn(svgRendererModule, 'SvgRenderer');
		// Simulate an unexpected error
		SvgRendererSpy.mockImplementationOnce(() => {
			throw new Error('unexpected error');
		});

		const [fileItem, identifier] = generateSampleFileItem.svg();
		const { MockedMediaClientProvider } = createMockedMediaClientProvider({
			initialItems: fileItem,
		});

		const onError = jest.fn();

		render(
			<MockedMediaClientProvider>
				<MediaSvg identifier={identifier} onError={onError} />,
			</MockedMediaClientProvider>,
		);

		await waitFor(() => expect(onError).toBeCalledTimes(1));
	});
});
