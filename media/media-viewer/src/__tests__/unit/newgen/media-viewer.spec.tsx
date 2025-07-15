jest.mock('@atlaskit/media-client-react', () => {
	const actualModule = jest.requireActual('@atlaskit/media-client-react');
	return { __esModule: true, ...actualModule };
});

jest.mock('pdfjs-dist/legacy/build/pdf', () => ({
	__esModule: true,
	getDocument: jest.fn().mockImplementation(() => {
		return jest.fn();
	}),
	GlobalWorkerOptions: {
		workerSrc: '',
	},
	version: '',
}));

jest.mock('pdfjs-dist/legacy/web/pdf_viewer', () => ({
	__esModule: true,
	PDFViewer: jest.fn().mockImplementation(() => {
		return {
			setDocument: jest.fn(),
			firstPagePromise: new Promise(() => {}),
		};
	}),
	EventBus: jest.fn(),
	PDFLinkService: jest.fn().mockImplementation(() => {
		return {
			setDocument: jest.fn(),
			setViewer: jest.fn(),
		};
	}),
}));

import React from 'react';
import { type MediaClientConfig, getFileStreamsCache } from '@atlaskit/media-client';
import { AnalyticsListener } from '@atlaskit/analytics-next';
import EditorPanelIcon from '@atlaskit/icon/core/migration/information--editor-panel';
import { MockedMediaClientProvider } from '@atlaskit/media-client-react/test-helpers';
import { createMockedMediaClientProvider } from './utils/mockedMediaClientProvider/_MockedMediaClientProvider';
import { MediaViewer } from '../../../';
import { type MediaViewerExtensions } from '../../../components/types';
import {
	createMockedMediaApi,
	createServerUnauthorizedError,
} from '@atlaskit/media-client/test-helpers';
import { generateSampleFileItem } from '@atlaskit/media-test-data';
import * as analytics from '../../../analytics';
import * as ufoWrapper from '../../../analytics/ufoExperiences';
import * as downloadUrlModule from '@atlaskit/media-common/downloadUrl';

const fireAnalyticsMock = jest.spyOn(analytics, 'fireAnalytics');
const mocksucceedMediaFileUfoExperience = jest.spyOn(ufoWrapper, 'succeedMediaFileUfoExperience');
const mockfailMediaFileUfoExperience = jest.spyOn(ufoWrapper, 'failMediaFileUfoExperience');
const mockstartMediaFileUfoExperience = jest.spyOn(ufoWrapper, 'startMediaFileUfoExperience');

import { fireEvent, render, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { getDocument } from 'pdfjs-dist/legacy/build/pdf';
import { failDataURIConversionOnce } from '@atlaskit/media-svg/test-helpers';

const fakeMediaClientConfig = {} as MediaClientConfig;

describe('<MediaViewer />', () => {
	const user = userEvent.setup();
	const onEvent = jest.fn();

	beforeEach(() => {
		getFileStreamsCache().removeAll();
		jest.clearAllMocks();
	});

	afterEach(() => {
		onEvent.mockClear();
	});

	// We are keeping the test for this data-testid since JIRA is still using it in their codebase to perform checks. Before removing this test, we need to ensure this 'media-viewer-popup' test id is not being used anywhere else in other codebases
	// Related ticket https://product-fabric.atlassian.net/browse/MPT-15
	it('should attach data-testid to the blanket', async () => {
		const [fileItem, identifier] = generateSampleFileItem.workingVideo();
		const { mediaApi } = createMockedMediaApi(fileItem);

		render(
			<MockedMediaClientProvider mockedMediaApi={mediaApi}>
				<MediaViewer
					selectedItem={identifier}
					items={[identifier]}
					collectionName={identifier.collectionName || ''}
					mediaClientConfig={fakeMediaClientConfig}
				/>
			</MockedMediaClientProvider>,
		);

		await waitFor(() => {
			// the query below should return a Blanket component, there is no other sure way to query the Blanket element at the moment rather than
			const blanketComponent = document.querySelector(
				'.media-viewer-popup[data-testid="media-viewer-popup"]',
			);
			expect(blanketComponent).toBeInTheDocument();
		});
	});

	describe('Opening Media Viewer', () => {
		it('should render local preview for pdf documents', async () => {
			const [fileItem, identifier] = generateSampleFileItem.workingPdfWithLocalPreview();
			const { MockedMediaClientProvider, uploadItem } = createMockedMediaClientProvider({});
			const fileAttributes = {
				fileId: identifier.id,
				fileMediatype: fileItem.details.mediaType,
				fileMimetype: fileItem.details.mimeType,
				fileSize: fileItem.details.size,
			};
			// Adds a local preview to the state
			uploadItem(fileItem, 0.8);

			render(
				<MockedMediaClientProvider>
					<MediaViewer
						selectedItem={identifier}
						items={[identifier]}
						collectionName={identifier.collectionName || ''}
						mediaClientConfig={fakeMediaClientConfig}
					/>
				</MockedMediaClientProvider>,
			);

			const pdfContent = await screen.findByTestId('media-viewer-pdf-content');
			expect(pdfContent).toBeInTheDocument();
			expect(getDocument).toHaveBeenCalledWith(
				expect.objectContaining({
					url: expect.stringMatching('mock result of URL.createObjectURL()'),
					CMapReaderFactory: expect.any(Function),
					isEvalSupported: false,
				}),
			);
			await waitFor(() => {
				expect(analytics.fireAnalytics).toHaveBeenCalledWith(
					expect.objectContaining({
						action: 'commenced',
						actionSubject: 'mediaFile',
						attributes: {
							fileAttributes: {
								fileId: identifier.id,
							},
							traceContext: { traceId: expect.any(String) },
						},
						eventType: 'operational',
					}),
					expect.anything(),
				);
			});
			await waitFor(() => {
				expect(analytics.fireAnalytics).toHaveBeenLastCalledWith(
					expect.objectContaining({
						action: 'loadSucceeded',
						actionSubject: 'mediaFile',
						attributes: {
							fileAttributes,
							fileMediatype: fileAttributes.fileMediatype,
							fileMimetype: fileAttributes.fileMimetype,
							status: 'success',
							traceContext: undefined,
							featureFlags: {
								media_document_viewer: false,
							},
						},
						eventType: 'operational',
					}),
					expect.anything(),
				);
			});
			await waitFor(() => {
				expect(mockstartMediaFileUfoExperience).toHaveBeenCalledTimes(1);
			});
			await waitFor(() => {
				expect(mocksucceedMediaFileUfoExperience).toHaveBeenCalledWith(
					expect.objectContaining({
						fileAttributes,
						fileStateFlags: { wasStatusProcessing: false, wasStatusUploading: true },
					}),
				);
			});
		});

		it('should not render local preview for non-pdf docs', async () => {
			const [fileItem, identifier] = generateSampleFileItem.workingExcelWithLocalPreview();
			const { MockedMediaClientProvider, uploadItem, processItem } =
				createMockedMediaClientProvider({});
			const fileAttributes = {
				fileId: identifier.id,
				fileMediatype: fileItem.details.mediaType,
				fileMimetype: fileItem.details.mimeType,
				fileSize: fileItem.details.size,
			};
			// Adds a local preview to the state
			uploadItem(fileItem, 0.8);

			render(
				<MockedMediaClientProvider>
					<MediaViewer
						selectedItem={identifier}
						items={[identifier]}
						collectionName={identifier.collectionName || ''}
						mediaClientConfig={fakeMediaClientConfig}
					/>
				</MockedMediaClientProvider>,
			);

			// Check if the loading indicator is shown
			expect(
				await screen.findByRole('img', {
					name: /loading file/i,
				}),
			).toBeInTheDocument();

			expect(getDocument).toHaveBeenCalledTimes(0);

			uploadItem(fileItem, 1);
			processItem(fileItem, 1);

			const pdfContent = await screen.findByTestId('media-viewer-pdf-content');
			expect(pdfContent).toBeInTheDocument();
			expect(getDocument).toHaveBeenCalledWith(
				expect.objectContaining({
					url: expect.stringMatching('artifact/document.pdf/binary'),
					CMapReaderFactory: expect.any(Function),
					isEvalSupported: false,
				}),
			);
			await waitFor(() => {
				expect(analytics.fireAnalytics).toHaveBeenCalledWith(
					expect.objectContaining({
						action: 'commenced',
						actionSubject: 'mediaFile',
						attributes: {
							fileAttributes: {
								fileId: identifier.id,
							},
							traceContext: { traceId: expect.any(String) },
						},
						eventType: 'operational',
					}),
					expect.anything(),
				);
			});
			await waitFor(() => {
				expect(analytics.fireAnalytics).toHaveBeenLastCalledWith(
					expect.objectContaining({
						action: 'loadSucceeded',
						actionSubject: 'mediaFile',
						attributes: {
							fileAttributes,
							fileMediatype: fileAttributes.fileMediatype,
							fileMimetype: fileAttributes.fileMimetype,
							status: 'success',
							traceContext: undefined,
							featureFlags: {
								media_document_viewer: false,
							},
						},
						eventType: 'operational',
					}),
					expect.anything(),
				);
			});
			await waitFor(() => {
				expect(mockstartMediaFileUfoExperience).toHaveBeenCalledTimes(1);
			});
			await waitFor(() => {
				expect(mocksucceedMediaFileUfoExperience).toHaveBeenCalledWith(
					expect.objectContaining({
						fileAttributes,
						fileStateFlags: { wasStatusProcessing: true, wasStatusUploading: true },
					}),
				);
			});
		});
	});

	describe('Closing Media Viewer', () => {
		it("should trigger onClose function Media Viewer on 'Escape' key press", async () => {
			const [fileItem, identifier] = generateSampleFileItem.workingVideo();
			const { mediaApi } = createMockedMediaApi(fileItem);

			const { unmount } = render(
				<MockedMediaClientProvider mockedMediaApi={mediaApi}>
					<MediaViewer
						selectedItem={identifier}
						items={[]}
						onClose={() => unmountFunction()}
						collectionName={identifier.collectionName || ''}
						mediaClientConfig={fakeMediaClientConfig}
					/>
				</MockedMediaClientProvider>,
			);
			const unmountFunction = unmount;

			// The presence of closeButton means that the mediaViewer opened
			const closeButton = screen.getByLabelText('Close');
			expect(closeButton).toBeInTheDocument();
			await user.keyboard('{Escape}');
			expect(closeButton).not.toBeInTheDocument();
		});

		it('should not trigger onClose function Media Viewer when clicking on other button on Header', async () => {
			const [fileItem, identifier] = generateSampleFileItem.workingVideo();
			const { mediaApi } = createMockedMediaApi(fileItem);

			const { unmount } = render(
				<MockedMediaClientProvider mockedMediaApi={mediaApi}>
					<MediaViewer
						selectedItem={identifier}
						items={[]}
						onClose={() => unmountFunction()}
						collectionName={identifier.collectionName || ''}
						mediaClientConfig={fakeMediaClientConfig}
					/>
				</MockedMediaClientProvider>,
			);
			const unmountFunction = unmount;

			const downloadButton = screen.getByRole('button', {
				name: /download/i,
			});

			// The presence of closeButton means that the mediaViewer opened
			const closeButton = screen.getByLabelText('Close');
			expect(closeButton).toBeInTheDocument();
			await user.click(downloadButton);
			expect(closeButton).toBeInTheDocument();
		});

		it('should trigger onClose function the Media Viewer when clicking on the Close button', async () => {
			const [fileItem, identifier] = generateSampleFileItem.workingVideo();
			const { mediaApi } = createMockedMediaApi(fileItem);

			const { unmount } = render(
				<MockedMediaClientProvider mockedMediaApi={mediaApi}>
					<MediaViewer
						selectedItem={identifier}
						items={[identifier]}
						onClose={() => unmountFunction()}
						collectionName={identifier.collectionName || ''}
						mediaClientConfig={fakeMediaClientConfig}
					/>
				</MockedMediaClientProvider>,
			);
			const unmountFunction = unmount;

			// The presence of closeButton means that the mediaViewer opened
			const closeButton = screen.getByLabelText('Close');
			expect(closeButton).toBeInTheDocument();
			await user.click(closeButton);
			expect(closeButton).not.toBeInTheDocument();
		});
	});

	describe('Analytics', () => {
		it('should trigger the screen event when the component loads', () => {
			const [fileItem, identifier] = generateSampleFileItem.workingVideo();
			const { mediaApi } = createMockedMediaApi(fileItem);

			render(
				<AnalyticsListener channel="media" onEvent={onEvent}>
					<MockedMediaClientProvider mockedMediaApi={mediaApi}>
						<MediaViewer
							selectedItem={identifier}
							items={[identifier]}
							collectionName={identifier.collectionName || ''}
							mediaClientConfig={fakeMediaClientConfig}
						/>
					</MockedMediaClientProvider>
				</AnalyticsListener>,
			);
			expect(onEvent.mock.calls[0][0].payload).toEqual({
				action: 'viewed',
				actionSubject: 'mediaViewerModal',
				eventType: 'screen',
				name: 'mediaViewerModal',
			});
		});

		it('should send analytics when closed with button', async () => {
			const [fileItem, identifier] = generateSampleFileItem.workingVideo();
			const { mediaApi } = createMockedMediaApi(fileItem);

			render(
				<AnalyticsListener channel="media" onEvent={onEvent}>
					<MockedMediaClientProvider mockedMediaApi={mediaApi}>
						<MediaViewer
							selectedItem={identifier}
							items={[identifier]}
							collectionName={identifier.collectionName || ''}
							mediaClientConfig={fakeMediaClientConfig}
						/>
					</MockedMediaClientProvider>
				</AnalyticsListener>,
			);

			const closeButton = screen.getByLabelText('Close');
			await user.click(closeButton);
			expect(onEvent).toHaveBeenCalled();
			// Here, we check if any event has been called with the attribute input = button, not just the last call.
			// This is because the onEvent call stack can get out of order sometimes due to React 18's batched updates
			expect(
				onEvent.mock.calls.some((call) => call[0].payload.attributes?.input === 'button'),
			).toBeTruthy();
		});

		// TODO: this test is flaky on pipeline, that's why its skipped for now and needs to be unskipped in the future

		/* it('should send analytics when closed with esc key', async () => {
      render(
        <AnalyticsListener channel="media" onEvent={onEvent}>
          <MockedMediaClientProvider
            mockedMediaApi={mediaApi}

          >
            <MediaViewer
              selectedItem={workingVideoIdentifier}
              items={[workingVideoIdentifier]}
            />
          </MockedMediaClientProvider>
        </AnalyticsListener>,
      );

      await user.keyboard('[Escape]');
      expect(onEvent).toHaveBeenCalled();
      const closeEvent: any =
        onEvent.mock.calls[onEvent.mock.calls.length - 1][0];
      expect(closeEvent.payload.attributes.input).toEqual('escKey');
    }); */
	});

	describe('Sidebar integration', () => {
		let sidebarExtension: MediaViewerExtensions;
		let mockSidebarRenderer: jest.Mock<any, any>;

		beforeEach(() => {
			mockSidebarRenderer = jest.fn().mockImplementation(() => <div>Sidebar Content</div>);

			sidebarExtension = {
				sidebar: {
					icon: <EditorPanelIcon color="currentColor" spacing="spacious" label="sidebar" />,
					renderer: mockSidebarRenderer,
				},
			};
		});

		describe('renderer', () => {
			it('should render sidebar with default selected identifier if not set in state', async () => {
				const [fileItem1, identifier1] = generateSampleFileItem.workingVideo();
				const [fileItem2, identifier2] = generateSampleFileItem.workingGif();
				const { mediaApi } = createMockedMediaApi([fileItem1, fileItem2]);

				render(
					<MockedMediaClientProvider mockedMediaApi={mediaApi}>
						<MediaViewer
							selectedItem={identifier1}
							items={[identifier2]}
							extensions={sidebarExtension}
							collectionName={identifier1.collectionName || ''}
							mediaClientConfig={fakeMediaClientConfig}
						/>
					</MockedMediaClientProvider>,
				);

				const sidebarButton = screen.getByLabelText('sidebar');
				await user.click(sidebarButton);
				expect(screen.queryByText('Sidebar Content')).toBeInTheDocument();
				expect(mockSidebarRenderer).toHaveBeenLastCalledWith(identifier1, {
					close: expect.any(Function),
				});
			});

			it('should render sidebar with selected identifier in state', async () => {
				const [fileItem1, identifier1] = generateSampleFileItem.workingVideo();
				const [fileItem2, identifier2] = generateSampleFileItem.workingGif();
				const { mediaApi } = createMockedMediaApi([fileItem1, fileItem2]);

				render(
					<MockedMediaClientProvider mockedMediaApi={mediaApi}>
						<MediaViewer
							selectedItem={identifier1}
							items={[identifier1, identifier2]}
							extensions={sidebarExtension}
							collectionName={identifier1.collectionName || ''}
							mediaClientConfig={fakeMediaClientConfig}
						/>
					</MockedMediaClientProvider>,
				);

				const sidebarButton = screen.getByLabelText('sidebar');

				await user.click(sidebarButton);
				expect(screen.queryByText('Sidebar Content')).toBeInTheDocument();
				expect(mockSidebarRenderer).toHaveBeenLastCalledWith(identifier1, {
					close: expect.any(Function),
				});

				await user.keyboard('[ArrowRight]');
				expect(mockSidebarRenderer).toHaveBeenLastCalledWith(identifier2, {
					close: expect.any(Function),
				});

				await user.keyboard('[ArrowLeft]');
				expect(mockSidebarRenderer).toHaveBeenLastCalledWith(identifier1, {
					close: expect.any(Function),
				});
			});

			it("should not show sidebar if extensions is not defined or sidebar's renderer is not defined", async () => {
				const [fileItem1, identifier1] = generateSampleFileItem.workingVideo();
				const [fileItem2, identifier2] = generateSampleFileItem.workingGif();
				const { mediaApi } = createMockedMediaApi([fileItem1, fileItem2]);

				render(
					<MockedMediaClientProvider mockedMediaApi={mediaApi}>
						<MediaViewer
							selectedItem={identifier1}
							items={[identifier1]}
							collectionName={identifier1.collectionName || ''}
							mediaClientConfig={fakeMediaClientConfig}
						/>
					</MockedMediaClientProvider>,
				);

				const sidebarButton = screen.queryByLabelText('sidebar');
				expect(sidebarButton).not.toBeInTheDocument();

				render(
					<MockedMediaClientProvider mockedMediaApi={mediaApi}>
						<MediaViewer
							selectedItem={identifier1}
							items={[identifier1, identifier2]}
							extensions={{}}
							collectionName={identifier1.collectionName || ''}
							mediaClientConfig={fakeMediaClientConfig}
						/>
					</MockedMediaClientProvider>,
				);
				expect(sidebarButton).not.toBeInTheDocument();
			});
		});

		it('should toggle visibility of sidebar correctly', async () => {
			const [fileItem, identifier] = generateSampleFileItem.workingVideo();
			const { mediaApi } = createMockedMediaApi(fileItem);

			render(
				<MockedMediaClientProvider mockedMediaApi={mediaApi}>
					<MediaViewer
						selectedItem={identifier}
						items={[identifier]}
						extensions={sidebarExtension}
						collectionName={identifier.collectionName || ''}
						mediaClientConfig={fakeMediaClientConfig}
					/>
				</MockedMediaClientProvider>,
			);
			const sidebarButton = screen.getByLabelText('sidebar');
			await user.click(sidebarButton);
			expect(screen.queryByText('Sidebar Content')).toBeInTheDocument();
			await user.click(sidebarButton);
			expect(screen.queryByText('Sidebar Content')).not.toBeInTheDocument();
		});
	});

	describe('SVG Native Rendering', () => {
		describe('Media Viewer ', () => {
			it('should render SVG natively', async () => {
				const [fileItem, identifier] = generateSampleFileItem.svg();
				const { mediaApi } = createMockedMediaApi(fileItem);

				render(
					<MockedMediaClientProvider mockedMediaApi={mediaApi}>
						<MediaViewer
							selectedItem={identifier}
							items={[identifier]}
							collectionName={identifier.collectionName || ''}
							mediaClientConfig={fakeMediaClientConfig}
						/>
					</MockedMediaClientProvider>,
				);

				const elem = await screen.findByTestId('media-viewer-svg');
				expect(elem).toBeDefined();
				expect((elem as unknown as HTMLElement).nodeName.toLowerCase()).toBe('img');
				const imgElement = elem as unknown as HTMLImageElement;
				fireEvent.load(imgElement);

				const fileAttributes = {
					fileId: identifier.id,
					fileMediatype: fileItem.details.mediaType,
					fileMimetype: fileItem.details.mimeType,
					fileSize: fileItem.details.size,
				};

				expect(fireAnalyticsMock).toHaveBeenLastCalledWith(
					expect.objectContaining({
						action: 'loadSucceeded',
						actionSubject: 'mediaFile',
						attributes: {
							fileAttributes,
							fileMediatype: 'image',
							fileMimetype: fileAttributes.fileMimetype,
							status: 'success',
							traceContext: { traceId: expect.any(String) },
							featureFlags: {
								media_document_viewer: false,
							},
						},
						eventType: 'operational',
					}),
					expect.anything(),
				);

				expect(mockstartMediaFileUfoExperience).toBeCalledTimes(1);
				expect(mocksucceedMediaFileUfoExperience).toBeCalledWith(
					expect.objectContaining({
						fileAttributes,
						fileStateFlags: { wasStatusProcessing: false, wasStatusUploading: false },
					}),
				);
			});

			it('should render error screen when SVG binary fails to load', async () => {
				const [fileItem, identifier] = generateSampleFileItem.svg();
				const { mediaApi } = createMockedMediaApi(fileItem);

				// simulate error
				jest.spyOn(mediaApi, 'getFileBinary').mockRejectedValue(createServerUnauthorizedError());

				render(
					<MockedMediaClientProvider mockedMediaApi={mediaApi}>
						<MediaViewer
							selectedItem={identifier}
							items={[identifier]}
							collectionName={identifier.collectionName || ''}
							mediaClientConfig={fakeMediaClientConfig}
						/>
						,
					</MockedMediaClientProvider>,
				);

				const errorIcon = await screen.findByAltText(/error loading file/i);
				expect(errorIcon).toBeInTheDocument();

				expect(screen.getByText(/something went wrong\./i)).toBeInTheDocument();

				const fileAttributes = {
					fileId: identifier.id,
					fileMediatype: fileItem.details.mediaType,
					fileMimetype: fileItem.details.mimeType,
					fileSize: fileItem.details.size,
				};

				expect(fireAnalyticsMock).toHaveBeenLastCalledWith(
					{
						eventType: 'operational',
						action: 'loadFailed',
						actionSubject: 'mediaFile',
						attributes: {
							error: 'serverUnauthorized',
							errorDetail: 'inner error message',
							failReason: 'svg-binary-fetch',
							fileMimetype: fileAttributes.fileMimetype,
							fileAttributes,
							request: {
								attempts: 5,
								clientExhaustedRetries: true,
								mediaEnv: 'test-media-env',
								mediaRegion: 'test-media-region',
								statusCode: 403,
								traceContext: {
									spanId: 'some-span',
									traceId: 'some-trace',
								},
							},
							status: 'fail',
							traceContext: {
								traceId: expect.any(String),
							},
						},
					},
					expect.anything(),
				);

				expect(mockstartMediaFileUfoExperience).toBeCalledTimes(1);
				expect(mockfailMediaFileUfoExperience).toBeCalledWith(
					expect.objectContaining({
						error: 'serverUnauthorized',
						errorDetail: 'inner error message',
						failReason: 'svg-binary-fetch',
						fileAttributes,
						fileStateFlags: {
							wasStatusProcessing: false,
							wasStatusUploading: false,
						},
						request: {
							attempts: 5,
							clientExhaustedRetries: true,
							mediaEnv: 'test-media-env',
							mediaRegion: 'test-media-region',
							statusCode: 403,
							traceContext: { spanId: 'some-span', traceId: 'some-trace' },
						},
						traceContext: {
							traceId: expect.any(String),
						},
					}),
				);
			});

			it('should render error screen when SVG binary fails to convert to DataURI', async () => {
				const [fileItem, identifier] = generateSampleFileItem.svg();
				const { mediaApi } = createMockedMediaApi(fileItem);

				// Simulate error on SVG Blob to DataURI conversion
				const conversionError = new Error('failed to convert Blob');
				failDataURIConversionOnce(conversionError);

				render(
					<MockedMediaClientProvider mockedMediaApi={mediaApi}>
						<MediaViewer
							selectedItem={identifier}
							items={[identifier]}
							collectionName={identifier.collectionName || ''}
							mediaClientConfig={fakeMediaClientConfig}
						/>
						,
					</MockedMediaClientProvider>,
				);

				const errorIcon = await screen.findByAltText(/error loading file/i);
				expect(errorIcon).toBeInTheDocument();

				expect(screen.getByText(/something went wrong\./i)).toBeInTheDocument();

				const fileAttributes = {
					fileId: identifier.id,
					fileMediatype: fileItem.details.mediaType,
					fileMimetype: fileItem.details.mimeType,
					fileSize: fileItem.details.size,
				};

				expect(fireAnalyticsMock).toHaveBeenLastCalledWith(
					{
						eventType: 'operational',
						action: 'loadFailed',
						actionSubject: 'mediaFile',
						attributes: {
							failReason: 'svg-blob-to-datauri',
							error: 'nativeError',
							errorDetail: 'failed to convert Blob',
							fileMimetype: fileAttributes.fileMimetype,
							fileAttributes,
							request: undefined,
							traceContext: {
								traceId: expect.any(String),
							},
							status: 'fail',
						},
					},
					expect.anything(),
				);

				expect(mockstartMediaFileUfoExperience).toBeCalledTimes(1);
				expect(mockfailMediaFileUfoExperience).toBeCalledWith(
					expect.objectContaining({
						error: 'nativeError',
						errorDetail: 'failed to convert Blob',
						failReason: 'svg-blob-to-datauri',
						fileAttributes,
						fileStateFlags: {
							wasStatusProcessing: false,
							wasStatusUploading: false,
						},
						request: undefined,
						traceContext: {
							traceId: expect.any(String),
						},
					}),
				);
			});

			it('should render error screen when image tag fails to render the file', async () => {
				const [fileItem, identifier] = generateSampleFileItem.svg();
				const { mediaApi } = createMockedMediaApi(fileItem);

				render(
					<MockedMediaClientProvider mockedMediaApi={mediaApi}>
						<MediaViewer
							selectedItem={identifier}
							items={[identifier]}
							collectionName={identifier.collectionName || ''}
							mediaClientConfig={fakeMediaClientConfig}
						/>
						,
					</MockedMediaClientProvider>,
				);

				const elem = await screen.findByTestId('media-viewer-svg');
				expect(elem).toBeDefined();
				expect((elem as unknown as HTMLElement).nodeName.toLowerCase()).toBe('img');
				const imgElement = elem as unknown as HTMLImageElement;
				fireEvent.error(imgElement);

				const errorIcon = await screen.findByAltText(/error loading file/i);
				expect(errorIcon).toBeInTheDocument();

				expect(screen.getByText(/something went wrong\./i)).toBeInTheDocument();

				const fileAttributes = {
					fileId: identifier.id,
					fileMediatype: fileItem.details.mediaType,
					fileMimetype: fileItem.details.mimeType,
					fileSize: fileItem.details.size,
				};

				expect(fireAnalyticsMock).toHaveBeenLastCalledWith(
					{
						eventType: 'operational',
						action: 'loadFailed',
						actionSubject: 'mediaFile',
						attributes: {
							error: 'unknown',
							errorDetail: 'unknown',
							failReason: 'svg-img-error',
							fileMimetype: fileAttributes.fileMimetype,
							fileAttributes,
							request: undefined,
							status: 'fail',
							traceContext: {
								traceId: expect.any(String),
							},
						},
					},
					expect.anything(),
				);

				expect(mockstartMediaFileUfoExperience).toBeCalledTimes(1);
				expect(mockfailMediaFileUfoExperience).toBeCalledWith(
					expect.objectContaining({
						error: 'unknown',
						errorDetail: 'unknown',
						failReason: 'svg-img-error',
						fileAttributes,
						fileStateFlags: {
							wasStatusProcessing: false,
							wasStatusUploading: false,
						},
						request: undefined,
						traceContext: {
							traceId: expect.any(String),
						},
					}),
				);
			});
		});
	});

	describe('Download Button', () => {
		const downloadUrlSpy = jest.spyOn(downloadUrlModule, 'downloadUrl');

		it('should download the binary when clicking download button', async () => {
			const [fileItem, identifier] = generateSampleFileItem.workingVideo();
			const { mediaApi } = createMockedMediaApi(fileItem);

			const binaryUrl = 'binary-url';
			const getFileBinaryURL = jest
				.spyOn(mediaApi, 'getFileBinaryURL')
				.mockResolvedValue(binaryUrl);
			const testUrl = jest.spyOn(mediaApi, 'testUrl');

			render(
				<MockedMediaClientProvider mockedMediaApi={mediaApi}>
					<MediaViewer
						selectedItem={identifier}
						items={[identifier]}
						collectionName={identifier.collectionName || ''}
						mediaClientConfig={fakeMediaClientConfig}
					/>
					,
				</MockedMediaClientProvider>,
			);

			const downloadButton = await screen.findByTestId('media-viewer-download-button');
			expect(downloadButton).toBeInTheDocument();

			await user.click(downloadButton);

			expect(getFileBinaryURL).toHaveBeenCalledWith(fileItem.id, fileItem.collection);
			expect(testUrl).toHaveBeenCalledWith(binaryUrl, {
				traceContext: { traceId: expect.any(String) },
			});

			expect(downloadUrlSpy).toHaveBeenCalledWith(expect.any(String), {
				name: fileItem.details.name,
			});

			const fileAttributes = {
				fileId: identifier.id,
				fileMediatype: fileItem.details.mediaType,
				fileMimetype: fileItem.details.mimeType,
				fileSize: fileItem.details.size,
			};

			expect(fireAnalyticsMock).toHaveBeenCalledWith(
				{
					eventType: 'ui',
					action: 'clicked',
					actionSubject: 'button',
					actionSubjectId: 'downloadButton',
					attributes: {
						fileAttributes,
						fileProcessingStatus: 'processed',
					},
				},
				expect.anything(),
			);
			expect(fireAnalyticsMock).toHaveBeenCalledWith(
				{
					eventType: 'operational',
					actionSubject: 'mediaFile',
					action: 'downloadSucceeded',
					attributes: {
						status: 'success',
						fileMediatype: fileItem.details.mediaType,
						fileMimetype: fileItem.details.mimeType,
						fileAttributes,
						traceContext: {
							traceId: expect.any(String),
						},
					},
				},
				expect.anything(),
			);
		});

		it('should block downloads when DSP is enabled', async () => {
			const [fileItem, identifier] = generateSampleFileItem.workingPdfWithRemotePreview();
			const { MockedMediaClientProvider, mediaApi } = createMockedMediaClientProvider({
				initialItems: fileItem,
				mediaClientConfig: { enforceDataSecurityPolicy: true },
			});

			const binaryUrl = 'binary-url';
			const getFileBinaryURL = jest
				.spyOn(mediaApi, 'getFileBinaryURL')
				.mockResolvedValue(binaryUrl);
			const testUrl = jest.spyOn(mediaApi, 'testUrl');

			render(
				<MockedMediaClientProvider>
					<MediaViewer
						selectedItem={identifier}
						items={[identifier]}
						collectionName={identifier.collectionName || ''}
						mediaClientConfig={fakeMediaClientConfig}
					/>
					,
				</MockedMediaClientProvider>,
			);

			const downloadButton = await screen.findByTestId('media-viewer-download-button');
			expect(downloadButton).toBeInTheDocument();

			await user.click(downloadButton);

			expect(getFileBinaryURL).not.toHaveBeenCalled();
			expect(testUrl).not.toHaveBeenCalled();

			expect(downloadUrlSpy).not.toHaveBeenCalled();

			expect(fireAnalyticsMock).not.toHaveBeenCalledWith(
				expect.objectContaining({
					action: 'downloadSucceeded',
					attributes: expect.objectContaining({
						status: 'success',
					}),
				}),
				expect.anything(),
			);
		});

		it('should download the binary when clicking download button on error view', async () => {
			const [fileItem, identifier] = generateSampleFileItem.failedVideo();
			const { mediaApi } = createMockedMediaApi(fileItem);

			const binaryUrl = 'binary-url';
			const getFileBinaryURL = jest
				.spyOn(mediaApi, 'getFileBinaryURL')
				.mockResolvedValue(binaryUrl);
			const testUrl = jest.spyOn(mediaApi, 'testUrl');

			render(
				<MockedMediaClientProvider mockedMediaApi={mediaApi}>
					<MediaViewer
						selectedItem={identifier}
						items={[identifier]}
						collectionName={identifier.collectionName || ''}
						mediaClientConfig={fakeMediaClientConfig}
					/>
					,
				</MockedMediaClientProvider>,
			);

			const downloadButton = await screen.findByTestId('media-viewer-error-download-button');

			expect(downloadButton).toBeInTheDocument();
			await user.click(downloadButton);

			expect(getFileBinaryURL).toHaveBeenCalledWith(fileItem.id, fileItem.collection);
			expect(testUrl).toHaveBeenCalledWith(binaryUrl, {
				traceContext: { traceId: expect.any(String) },
			});

			expect(downloadUrlSpy).toHaveBeenCalledWith(expect.any(String), {
				name: fileItem.details.name,
			});

			const fileAttributes = {
				fileId: identifier.id,
				fileMediatype: fileItem.details.mediaType,
				fileMimetype: fileItem.details.mimeType,
				fileSize: fileItem.details.size,
			};

			expect(fireAnalyticsMock).toHaveBeenCalledWith(
				{
					eventType: 'ui',
					action: 'clicked',
					actionSubject: 'button',
					actionSubjectId: 'failedPreviewDownloadButton',
					attributes: {
						failReason: 'itemviewer-file-failed-processing-status',
						fileAttributes,
						fileProcessingStatus: 'failed-processing',
					},
				},
				expect.anything(),
			);
			expect(fireAnalyticsMock).toHaveBeenCalledWith(
				{
					eventType: 'operational',
					actionSubject: 'mediaFile',
					action: 'downloadSucceeded',
					attributes: {
						status: 'success',
						fileMediatype: fileItem.details.mediaType,
						fileMimetype: fileItem.details.mimeType,
						fileAttributes,
						traceContext: {
							traceId: expect.any(String),
						},
					},
				},
				expect.anything(),
			);
		});

		it('should block downloads when DSP is enabled on error view', async () => {
			const [fileItem, identifier] = generateSampleFileItem.failedVideo();
			const { MockedMediaClientProvider, mediaApi } = createMockedMediaClientProvider({
				initialItems: fileItem,
				mediaClientConfig: { enforceDataSecurityPolicy: true },
			});

			const binaryUrl = 'binary-url';
			const getFileBinaryURL = jest
				.spyOn(mediaApi, 'getFileBinaryURL')
				.mockResolvedValue(binaryUrl);
			const testUrl = jest.spyOn(mediaApi, 'testUrl');

			render(
				<MockedMediaClientProvider>
					<MediaViewer
						selectedItem={identifier}
						items={[identifier]}
						collectionName={identifier.collectionName || ''}
						mediaClientConfig={fakeMediaClientConfig}
					/>
					,
				</MockedMediaClientProvider>,
			);

			const downloadButton = await screen.findByTestId('media-viewer-error-download-button');
			expect(downloadButton).toBeInTheDocument();

			await user.click(downloadButton);

			expect(getFileBinaryURL).not.toHaveBeenCalled();
			expect(testUrl).not.toHaveBeenCalled();

			expect(downloadUrlSpy).not.toHaveBeenCalled();

			expect(fireAnalyticsMock).not.toHaveBeenCalledWith(
				expect.objectContaining({
					action: 'downloadSucceeded',
					attributes: expect.objectContaining({
						status: 'success',
					}),
				}),
				expect.anything(),
			);
		});

		it('should display a warning message when the downloading file is marked as abusive', async () => {
			const [fileItem, identifier] = generateSampleFileItem.abuseImage();
			const { mediaApi } = createMockedMediaApi(fileItem);

			const binaryUrl = 'binary-url';
			const getFileBinaryURL = jest
				.spyOn(mediaApi, 'getFileBinaryURL')
				.mockResolvedValue(binaryUrl);
			const testUrl = jest.spyOn(mediaApi, 'testUrl');

			render(
				<MockedMediaClientProvider mockedMediaApi={mediaApi}>
					<MediaViewer
						selectedItem={identifier}
						items={[identifier]}
						collectionName={identifier.collectionName || ''}
						mediaClientConfig={fakeMediaClientConfig}
					/>
					,
				</MockedMediaClientProvider>,
			);

			const downloadButton = await screen.findByTestId('media-viewer-download-button');
			expect(downloadButton).toBeInTheDocument();

			await user.click(downloadButton);

			const warningMsg = await screen.findByTestId('mediaAbuseModal');
			expect(warningMsg).toBeInTheDocument();

			const proceed = await screen.findByText('Proceed with download');
			await user.click(proceed);

			expect(getFileBinaryURL).toHaveBeenCalledWith(fileItem.id, fileItem.collection);
			expect(testUrl).toHaveBeenCalledWith(binaryUrl, {
				traceContext: { traceId: expect.any(String) },
			});

			expect(downloadUrlSpy).toHaveBeenCalledWith(expect.any(String), {
				name: fileItem.details.name,
			});

			const fileAttributes = {
				fileId: identifier.id,
				fileMediatype: fileItem.details.mediaType,
				fileMimetype: fileItem.details.mimeType,
				fileSize: fileItem.details.size,
			};

			expect(fireAnalyticsMock).toHaveBeenCalledWith(
				{
					eventType: 'ui',
					action: 'clicked',
					actionSubject: 'button',
					actionSubjectId: 'downloadButton',
					attributes: {
						fileAttributes,
						fileProcessingStatus: 'processed',
					},
				},
				expect.anything(),
			);
			expect(fireAnalyticsMock).toHaveBeenCalledWith(
				{
					eventType: 'operational',
					actionSubject: 'mediaFile',
					action: 'downloadSucceeded',
					attributes: {
						status: 'success',
						fileMediatype: fileItem.details.mediaType,
						fileMimetype: fileItem.details.mimeType,
						fileAttributes,
						traceContext: {
							traceId: expect.any(String),
						},
					},
				},
				expect.anything(),
			);
		});

		it('should not download when cancelling from the abuse warning message', async () => {
			const [fileItem, identifier] = generateSampleFileItem.abuseImage();
			const { mediaApi } = createMockedMediaApi(fileItem);

			const binaryUrl = 'binary-url';
			const getFileBinaryURL = jest
				.spyOn(mediaApi, 'getFileBinaryURL')
				.mockResolvedValue(binaryUrl);
			const testUrl = jest.spyOn(mediaApi, 'testUrl');

			render(
				<MockedMediaClientProvider mockedMediaApi={mediaApi}>
					<MediaViewer
						selectedItem={identifier}
						items={[identifier]}
						collectionName={identifier.collectionName || ''}
						mediaClientConfig={fakeMediaClientConfig}
					/>
					,
				</MockedMediaClientProvider>,
			);

			const downloadButton = await screen.findByTestId('media-viewer-download-button');
			expect(downloadButton).toBeInTheDocument();

			await user.click(downloadButton);

			const warningMsg = await screen.findByTestId('mediaAbuseModal');
			expect(warningMsg).toBeInTheDocument();

			const cancel = await screen.findByText('Cancel');
			await user.click(cancel);

			expect(getFileBinaryURL).toHaveBeenCalledTimes(1); // one call from image viewer
			expect(testUrl).not.toHaveBeenCalled();

			expect(downloadUrlSpy).not.toHaveBeenCalled();

			expect(fireAnalyticsMock).not.toHaveBeenCalledWith(
				expect.objectContaining({
					action: 'downloadSucceeded',
					attributes: expect.objectContaining({
						status: 'success',
					}),
				}),
				expect.anything(),
			);
		});

		it('should display a warning message when the downloading file is marked as abusive on error view', async () => {
			const [fileItem, identifier] = generateSampleFileItem.abuseFailedVideo();
			const { mediaApi } = createMockedMediaApi(fileItem);

			const binaryUrl = 'binary-url';
			const getFileBinaryURL = jest
				.spyOn(mediaApi, 'getFileBinaryURL')
				.mockResolvedValue(binaryUrl);
			const testUrl = jest.spyOn(mediaApi, 'testUrl');

			render(
				<MockedMediaClientProvider mockedMediaApi={mediaApi}>
					<MediaViewer
						selectedItem={identifier}
						items={[identifier]}
						collectionName={identifier.collectionName || ''}
						mediaClientConfig={fakeMediaClientConfig}
					/>
					,
				</MockedMediaClientProvider>,
			);

			const downloadButton = await screen.findByTestId('media-viewer-error-download-button');
			expect(downloadButton).toBeInTheDocument();

			await user.click(downloadButton);

			const warningMsg = await screen.findByTestId('mediaAbuseModal');
			expect(warningMsg).toBeInTheDocument();

			const proceed = await screen.findByText('Proceed with download');
			await user.click(proceed);

			expect(getFileBinaryURL).toHaveBeenCalledWith(fileItem.id, fileItem.collection);
			expect(testUrl).toHaveBeenCalledWith(binaryUrl, {
				traceContext: { traceId: expect.any(String) },
			});

			expect(downloadUrlSpy).toHaveBeenCalledWith(expect.any(String), {
				name: fileItem.details.name,
			});

			const fileAttributes = {
				fileId: identifier.id,
				fileMediatype: fileItem.details.mediaType,
				fileMimetype: fileItem.details.mimeType,
				fileSize: fileItem.details.size,
			};

			expect(fireAnalyticsMock).toHaveBeenCalledWith(
				{
					eventType: 'ui',
					action: 'clicked',
					actionSubject: 'button',
					actionSubjectId: 'failedPreviewDownloadButton',
					attributes: {
						failReason: 'itemviewer-file-failed-processing-status',
						fileAttributes,
						fileProcessingStatus: 'failed-processing',
					},
				},
				expect.anything(),
			);
			expect(fireAnalyticsMock).toHaveBeenCalledWith(
				{
					eventType: 'operational',
					actionSubject: 'mediaFile',
					action: 'downloadSucceeded',
					attributes: {
						status: 'success',
						fileMediatype: fileItem.details.mediaType,
						fileMimetype: fileItem.details.mimeType,
						fileAttributes,
						traceContext: {
							traceId: expect.any(String),
						},
					},
				},
				expect.anything(),
			);
		});

		it('should not download when cancelling from the abuse warning message on error view', async () => {
			const [fileItem, identifier] = generateSampleFileItem.abuseFailedVideo();
			const { mediaApi } = createMockedMediaApi(fileItem);

			const binaryUrl = 'binary-url';
			const getFileBinaryURL = jest
				.spyOn(mediaApi, 'getFileBinaryURL')
				.mockResolvedValue(binaryUrl);
			const testUrl = jest.spyOn(mediaApi, 'testUrl');

			render(
				<MockedMediaClientProvider mockedMediaApi={mediaApi}>
					<MediaViewer
						selectedItem={identifier}
						items={[identifier]}
						collectionName={identifier.collectionName || ''}
						mediaClientConfig={fakeMediaClientConfig}
					/>
					,
				</MockedMediaClientProvider>,
			);

			const downloadButton = await screen.findByTestId('media-viewer-error-download-button');
			expect(downloadButton).toBeInTheDocument();

			await user.click(downloadButton);

			const warningMsg = await screen.findByTestId('mediaAbuseModal');
			expect(warningMsg).toBeInTheDocument();

			const cancel = await screen.findByText('Cancel');
			await user.click(cancel);

			expect(getFileBinaryURL).not.toHaveBeenCalled();
			expect(testUrl).not.toHaveBeenCalled();

			expect(downloadUrlSpy).not.toHaveBeenCalled();

			expect(fireAnalyticsMock).not.toHaveBeenCalledWith(
				expect.objectContaining({
					action: 'downloadSucceeded',
					attributes: expect.objectContaining({
						status: 'success',
					}),
				}),
				expect.anything(),
			);
		});

		it('should log failed event when download fails', async () => {
			const [fileItem, identifier] = generateSampleFileItem.workingVideo();
			const { mediaApi } = createMockedMediaApi(fileItem);

			const binaryUrl = 'binary-url';
			const getFileBinaryURL = jest
				.spyOn(mediaApi, 'getFileBinaryURL')
				.mockResolvedValue(binaryUrl);
			const testUrl = jest
				.spyOn(mediaApi, 'testUrl')
				.mockRejectedValue(createServerUnauthorizedError());

			render(
				<MockedMediaClientProvider mockedMediaApi={mediaApi}>
					<MediaViewer
						selectedItem={identifier}
						items={[identifier]}
						collectionName={identifier.collectionName || ''}
						mediaClientConfig={fakeMediaClientConfig}
					/>
					,
				</MockedMediaClientProvider>,
			);

			const downloadButton = await screen.findByTestId('media-viewer-download-button');
			expect(downloadButton).toBeInTheDocument();

			// Clearing Media Viewer reliability calls for easier debugging
			fireAnalyticsMock.mockClear();

			await user.click(downloadButton);

			expect(getFileBinaryURL).toHaveBeenCalledWith(fileItem.id, fileItem.collection);
			expect(testUrl).toHaveBeenCalledWith(binaryUrl, {
				traceContext: { traceId: expect.any(String) },
			});

			expect(downloadUrlSpy).toHaveBeenCalledWith(expect.any(String), {
				name: fileItem.details.name,
			});

			const fileAttributes = {
				fileId: identifier.id,
				fileMediatype: fileItem.details.mediaType,
				fileMimetype: fileItem.details.mimeType,
				fileSize: fileItem.details.size,
			};

			expect(fireAnalyticsMock).toHaveBeenCalledWith(
				{
					eventType: 'ui',
					action: 'clicked',
					actionSubject: 'button',
					actionSubjectId: 'downloadButton',
					attributes: {
						fileAttributes,
						fileProcessingStatus: 'processed',
					},
				},
				expect.anything(),
			);
			expect(fireAnalyticsMock).toHaveBeenCalledWith(
				{
					eventType: 'operational',
					actionSubject: 'mediaFile',
					action: 'downloadFailed',
					attributes: {
						error: 'serverUnauthorized',
						errorDetail: 'inner error message',
						failReason: 'download',
						status: 'fail',
						fileMediatype: fileItem.details.mediaType,
						fileMimetype: fileItem.details.mimeType,
						fileAttributes,
						traceContext: {
							traceId: expect.any(String),
						},
						request: {
							attempts: 5,
							clientExhaustedRetries: true,
							mediaEnv: 'test-media-env',
							mediaRegion: 'test-media-region',
							statusCode: 403,
							traceContext: {
								traceId: expect.any(String),
								spanId: expect.any(String),
							},
						},
					},
				},
				expect.anything(),
			);
		});

		it('should log failed event when download fails on error view', async () => {
			const [fileItem, identifier] = generateSampleFileItem.failedVideo();
			const { mediaApi } = createMockedMediaApi(fileItem);

			const binaryUrl = 'binary-url';
			const getFileBinaryURL = jest
				.spyOn(mediaApi, 'getFileBinaryURL')
				.mockResolvedValue(binaryUrl);
			const testUrl = jest
				.spyOn(mediaApi, 'testUrl')
				.mockRejectedValue(createServerUnauthorizedError());

			render(
				<MockedMediaClientProvider mockedMediaApi={mediaApi}>
					<MediaViewer
						selectedItem={identifier}
						items={[identifier]}
						collectionName={identifier.collectionName || ''}
						mediaClientConfig={fakeMediaClientConfig}
					/>
					,
				</MockedMediaClientProvider>,
			);

			const downloadButton = await screen.findByTestId('media-viewer-error-download-button');

			expect(downloadButton).toBeInTheDocument();
			await user.click(downloadButton);

			expect(getFileBinaryURL).toHaveBeenCalledWith(fileItem.id, fileItem.collection);
			expect(testUrl).toHaveBeenCalledWith(binaryUrl, {
				traceContext: { traceId: expect.any(String) },
			});

			expect(downloadUrlSpy).toHaveBeenCalledWith(expect.any(String), {
				name: fileItem.details.name,
			});

			const fileAttributes = {
				fileId: identifier.id,
				fileMediatype: fileItem.details.mediaType,
				fileMimetype: fileItem.details.mimeType,
				fileSize: fileItem.details.size,
			};

			expect(fireAnalyticsMock).toHaveBeenCalledWith(
				{
					eventType: 'ui',
					action: 'clicked',
					actionSubject: 'button',
					actionSubjectId: 'failedPreviewDownloadButton',
					attributes: {
						failReason: 'itemviewer-file-failed-processing-status',
						fileAttributes,
						fileProcessingStatus: 'failed-processing',
					},
				},
				expect.anything(),
			);
			expect(fireAnalyticsMock).toHaveBeenCalledWith(
				{
					eventType: 'operational',
					actionSubject: 'mediaFile',
					action: 'downloadFailed',
					attributes: {
						error: 'serverUnauthorized',
						errorDetail: 'inner error message',
						failReason: 'download',
						status: 'fail',
						fileMediatype: fileItem.details.mediaType,
						fileMimetype: fileItem.details.mimeType,
						fileAttributes,
						traceContext: {
							traceId: expect.any(String),
						},
						request: {
							attempts: 5,
							clientExhaustedRetries: true,
							mediaEnv: 'test-media-env',
							mediaRegion: 'test-media-region',
							statusCode: 403,
							traceContext: {
								traceId: expect.any(String),
								spanId: expect.any(String),
							},
						},
					},
				},
				expect.anything(),
			);
		});
	});
});
