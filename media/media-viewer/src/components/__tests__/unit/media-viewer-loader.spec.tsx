import React from 'react';
import { mount } from 'enzyme';
import { fakeMediaClient, nextTick } from '@atlaskit/media-test-helpers';
import { type Identifier } from '@atlaskit/media-client';

import { ModalSpinner } from '@atlaskit/media-ui';
import AsyncMediaViewer, {
	type MediaViewerWithMediaClientConfigProps,
	type AsyncMediaViewerState,
	AsyncMediaViewer as OriginalAsyncMediaViewer,
} from '../../media-viewer-loader';

const mediaClient = fakeMediaClient();

const identifier: Identifier = {
	id: '123',
	mediaItemType: 'file',
	collectionName: 'some-name',
};

const props = {
	mediaClientConfig: mediaClient.config,
	selectedItem: identifier,
	items: [identifier],
	collectionName: `${identifier.collectionName}`,
};

describe('Async Media Viewer Loader', () => {
	afterEach(() => {
		jest.clearAllMocks();
	});

	describe('When the async import returns with error', () => {
		beforeEach(() => {
			jest.mock('../../media-viewer', () => {
				throw new Error('Forcing async import error');
			});
		});

		it('should render ModalSpinner with invertSpinnerColor if the async components were NOT resolved', async () => {
			const wrapper = mount<MediaViewerWithMediaClientConfigProps, AsyncMediaViewerState>(
				<AsyncMediaViewer {...props} />,
			);

			await nextTick();

			expect(wrapper.find(ModalSpinner).prop('invertSpinnerColor')).toBeTruthy();

			expect(wrapper.find(OriginalAsyncMediaViewer).state().MediaViewer).toBeUndefined();
		});
	});
	describe('When the async import for Error Boundary returns with error', () => {
		beforeEach(() => {
			jest.unmock('../../media-viewer');
			jest.mock('../../media-viewer-analytics-error-boundary', () => {
				throw new Error('Forcing error boundary async import error');
			});
		});

		it('should render ModalSpinner with invertSpinnerColor if the async components were NOT resolved', async () => {
			const wrapper = mount<MediaViewerWithMediaClientConfigProps, AsyncMediaViewerState>(
				<AsyncMediaViewer {...props} />,
			);

			await nextTick();

			expect(wrapper.find(ModalSpinner).prop('invertSpinnerColor')).toBeTruthy();

			expect(wrapper.find(OriginalAsyncMediaViewer).state().MediaViewer).toBeUndefined();
		});
	});

	describe('When the async import returns with success', () => {
		let MediaViewerAnalyticsErrorBoundary: React.ReactComponentElement<any>;
		beforeEach(() => {
			jest.unmock('../../media-viewer');
			jest.unmock('../../media-viewer-analytics-error-boundary');
			MediaViewerAnalyticsErrorBoundary = jest.requireActual(
				'../../media-viewer-analytics-error-boundary',
			).default;
		});

		it('should render MediaViewer component', async () => {
			const wrapper = mount<MediaViewerWithMediaClientConfigProps, AsyncMediaViewerState>(
				<AsyncMediaViewer {...props} />,
			);

			await nextTick();
			await nextTick();
			await nextTick();

			expect(wrapper.find(OriginalAsyncMediaViewer).state().MediaViewer).toBeDefined();
		});

		it('should render Error boundary component', async () => {
			const wrapper = mount<MediaViewerWithMediaClientConfigProps, AsyncMediaViewerState>(
				<AsyncMediaViewer {...props} />,
			);

			await nextTick();

			expect(wrapper.find(MediaViewerAnalyticsErrorBoundary)).toBeDefined();
		});
	});
});
