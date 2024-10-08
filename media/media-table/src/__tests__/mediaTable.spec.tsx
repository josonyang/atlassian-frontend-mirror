import React from 'react';
// eslint-disable-next-line import/no-extraneous-dependencies
import { IntlProvider, createIntl } from 'react-intl-next';
import { DynamicTableStateless } from '@atlaskit/dynamic-table';
import { type HeadType, type RowType } from '@atlaskit/dynamic-table/types';
import ImageIcon from '@atlaskit/icon-file-type/glyph/image/24';
import {
	type MediaClient,
	type MediaType,
	type MediaSubscribable,
	createMediaSubscribable,
	createMediaSubject,
	type FileState,
	fromObservable,
	FileFetcherImpl,
} from '@atlaskit/media-client';
import {
	fakeMediaClient,
	imageFileId,
	audioFileId,
	docFileId,
	nextTick,
	asMockFunction,
	expectFunctionToHaveBeenCalledWith,
	mountWithIntlContext,
	mountWithIntlWrapper,
	asMock,
} from '@atlaskit/media-test-helpers';
import { MediaViewer } from '@atlaskit/media-viewer';
import { toHumanReadableMediaSize } from '@atlaskit/media-ui';
import { type MediaTableProps, type MediaTableItem } from '../types';
import { MediaTable } from '../component/mediaTable';
import { NameCell } from '../component/nameCell';
import { act, render, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';

let mockMediaClient: MediaClient;

jest.mock('@atlaskit/media-client', () => ({
	...jest.requireActual<Object>('@atlaskit/media-client'),
	getMediaClient: jest.fn(() => mockMediaClient),
}));

describe('MediaTable', () => {
	const onSetPageMock = jest.fn();
	const onSortMock = jest.fn();
	const onPreviewOpenMock = jest.fn();
	const onPreviewCloseMock = jest.fn();

	let observables = [createMediaSubject(), createMediaSubject()];

	const mediaClient = fakeMediaClient();

	const defaultFileStates: FileState[] = [
		{
			id: audioFileId.id,
			status: 'processed',
			name: 'audio_file_name',
			size: 10,
			artifacts: {},
			mediaType: 'audio',
			mimeType: '',
			createdAt: 1476238235395,
		},
		{
			id: imageFileId.id,
			status: 'processed',
			name: 'image_file_name',
			size: 10,
			artifacts: {},
			mediaType: 'image',
			mimeType: '',
			createdAt: 1476238235395,
		},
	];

	beforeEach(() => {
		jest.spyOn(console, 'warn').mockImplementation(() => {});
		jest.clearAllMocks();

		jest.spyOn(FileFetcherImpl.prototype, 'getFileState').mockImplementation((id: string) => {
			return id === audioFileId.id
				? fromObservable(observables[0])
				: fromObservable(observables[1]);
		});

		asMock(mediaClient.file.getFileState).mockImplementation((id: string) => {
			return id === audioFileId.id
				? fromObservable(observables[0])
				: fromObservable(observables[1]);
		});

		observables[0].next(defaultFileStates[0]);
		observables[1].next(defaultFileStates[1]);
	});

	const defaultFileStateSubscribable = createMediaSubscribable(defaultFileStates[0]);

	const getDefaultMediaClient = (
		fileStateSubscribable: MediaSubscribable = defaultFileStateSubscribable,
	): MediaClient => {
		const mediaClient = fakeMediaClient();
		mockMediaClient = mediaClient;

		asMockFunction(mediaClient.file.getFileState).mockImplementation(() => fileStateSubscribable);

		return mediaClient;
	};

	const createMockFileData = (name: string, mediaType: MediaType) => {
		return <NameCell text={name} mediaType={mediaType} endFixedChars={4} />;
	};

	const defaultHeaders: HeadType = {
		cells: [
			{
				key: 'file',
				width: 50,
				content: 'File name',
				isSortable: true,
			},
			{
				key: 'size',
				width: 20,
				content: 'Size',
				isSortable: true,
			},
			{
				key: 'date',
				width: 50,
				content: 'Upload time',
				isSortable: false,
			},
			{
				key: 'download',
				content: '',
				width: 10,
			},
			{
				key: 'preview',
				content: '',
				width: 10,
			},
		],
	};

	const defaultItems: MediaTableItem[] = [
		{
			identifier: audioFileId,
			data: {
				file: createMockFileData('audio_file_name', 'audio'),
				size: toHumanReadableMediaSize(10),
				date: 'some date',
			},
		},
		{
			identifier: imageFileId,
			data: {
				file: createMockFileData('image_file_name', 'image'),
				size: toHumanReadableMediaSize(10),
				date: 'some date',
			},
		},
	];

	const createAnalyticsEventSpy = jest.fn();
	createAnalyticsEventSpy.mockReturnValue({ fire: jest.fn() });

	const defaultProps = {
		items: defaultItems,
		itemsPerPage: 3,
		totalItems: defaultItems.length,
		isLoading: false,
		columns: defaultHeaders,
		onSetPage: onSetPageMock,
		onSort: onSortMock,
		createAnalyticsEvent: createAnalyticsEventSpy,
		onPreviewOpen: onPreviewOpenMock,
		onPreviewClose: onPreviewCloseMock,
		intl: createIntl({ locale: 'en' }),
	};

	const setup = async (
		waitForItems: boolean = true,
		props?: Omit<MediaTableProps, 'mediaClient'>,
		mediaClient: MediaClient = getDefaultMediaClient(),
	) => {
		const mediaClientConfig = mediaClient.config;

		const mediaTable = mountWithIntlWrapper(
			<MediaTable mediaClient={mediaClient} {...defaultProps} {...props} />,
		);

		if (waitForItems) {
			await nextTick(); // wait for getFileState subscription + set state
			mediaTable.update();
		}

		return {
			mediaClient,
			mediaTable,
			mediaClientConfig,
			createAnalyticsEventSpy,
		};
	};

	const setupRTL = (props?: Omit<MediaTableProps, 'mediaClient'>) => {
		const mediaClientConfig = mediaClient.config;

		const { container } = render(
			<IntlProvider locale="en">
				<MediaTable mediaClient={mediaClient} {...defaultProps} {...props} />,
			</IntlProvider>,
		);

		return {
			user: userEvent.setup(),
			mediaClient,
			container,
			mediaClientConfig,
			createAnalyticsEventSpy,
		};
	};

	it('should open MediaViewer and call onPreviewOpen when a row is clicked', async () => {
		const { user } = setupRTL();

		// wait for table to appear
		expect(await screen.findByRole('table')).toBeInTheDocument();

		const rows = await screen.findAllByRole('row');

		// click first non-header row
		user.click(rows[1]);

		const mediaViewer = await screen.findByTestId('media-viewer-popup');

		expect(mediaViewer).toBeInTheDocument();
		expect(onPreviewOpenMock).toHaveBeenCalledTimes(1);
	});

	it('should open MediaViewer and call onPreviewOpen when pressing enter on a row', async () => {
		const { user } = setupRTL();

		// wait for table to appear
		expect(await screen.findByRole('table')).toBeInTheDocument();

		const rows = await screen.findAllByRole('row');

		// key press on first non-header row
		rows[1].focus();
		expect(rows[1]).toHaveFocus();
		user.keyboard('[Enter]');

		const mediaViewer = await screen.findByTestId('media-viewer-popup');

		expect(mediaViewer).toBeInTheDocument();
		expect(onPreviewOpenMock).toHaveBeenCalledTimes(1);
	});

	it('should open MediaViewer and call onPreviewOpen when a preview button is clicked', async () => {
		const { mediaTable } = await setup();
		mediaTable.find('button[data-testid="preview-button"]').first().simulate('click');

		expect(mediaTable.find(MediaViewer)).toHaveLength(1);
		expect(onPreviewOpenMock).toHaveBeenCalledTimes(1);
	});

	it('should close the MediaViwer and call onPreviewClose when the preview is closed', async () => {
		const { user } = setupRTL();

		// wait for table to appear
		expect(await screen.findByRole('table')).toBeInTheDocument();

		const rows = await screen.findAllByRole('row');

		// Open the MediaViewer
		// click first non-header row
		user.click(rows[1]);

		const mediaViewer = await screen.findByTestId('media-viewer-popup');

		// Close the MediaViewer
		const closeButton = await screen.findByLabelText('Close');
		user.click(closeButton);

		await waitFor(() => {
			expect(mediaViewer).not.toBeInTheDocument();
		});

		expect(onPreviewOpenMock).toHaveBeenCalledTimes(1);
		expect(onPreviewCloseMock).toHaveBeenCalledTimes(1);
	});

	it('MediaViewer should display the correct items, and have the correct selected item', async () => {
		const { user } = setupRTL();

		// wait for table to appear
		expect(await screen.findByRole('table')).toBeInTheDocument();

		const rows = await screen.findAllByRole('row');

		// click first non-header row
		user.click(rows[1]);

		await screen.findByTestId('media-viewer-popup');

		// selected item
		expect(await screen.findByTestId('media-viewer-file-name')).toHaveTextContent(
			'audio_file_name',
		);
		expect(await screen.findByTestId('media-viewer-file-metadata-text')).toHaveTextContent(
			/audio/i,
		);

		const nextButton = await screen.findByTestId('media-viewer-navigation-next');

		act(() => nextButton.click());

		// next item
		expect(await screen.findByTestId('media-viewer-file-name')).toHaveTextContent(
			'image_file_name',
		);
		expect(await screen.findByTestId('media-viewer-file-metadata-text')).toHaveTextContent(
			/image/i,
		);
	});

	it('should download file if download file is defined and fileState has been processed', async () => {
		const { mediaClient, mediaTable } = await setup(true);

		mediaTable.find('button[data-testid="download-button"]').first().simulate('click');

		expect(mediaClient.file.downloadBinary).toBeCalledTimes(1);
		expectFunctionToHaveBeenCalledWith(mediaClient.file.downloadBinary, [
			audioFileId.id,
			'audio_file_name',
			audioFileId.collectionName,
		]);
	});

	it('should download file if download file is defined and fileState is still processing', async () => {
		const processingFileSubscribable = createMediaSubscribable({
			id: imageFileId.id,
			status: 'processing',
			name: 'image_file_name',
			size: 10,
			mediaType: 'image',
			mimeType: '',
			createdAt: 1476238235395,
		});

		const { mediaClient, mediaTable } = await setup(
			true,
			defaultProps,
			getDefaultMediaClient(processingFileSubscribable),
		);

		mediaTable.find('button[data-testid="download-button"]').first().simulate('click');

		expect(mediaClient.file.downloadBinary).toBeCalledTimes(1);
	});

	it('should render right file size', async () => {
		expect.assertions(1);
		const { mediaTable } = await setup();
		const rows = mediaTable.find(DynamicTableStateless).prop('rows');

		if (rows) {
			expect(rows[0].cells[1].content).toEqual('10 B');
		}
	});

	it('should render right date', async () => {
		expect.assertions(1);
		const { mediaTable } = await setup();
		const rows = mediaTable.find(DynamicTableStateless).prop('rows');
		if (rows) {
			expect(rows[0].cells[2].content).toEqual('some date');
		}
	});

	it('should render file type icon', async () => {
		const { mediaTable } = await setup();

		expect(mediaTable.find(ImageIcon)).toHaveLength(1);
	});

	it('should render empty table with no rows if table has no items', async () => {
		const { mediaTable } = await setup(true, { ...defaultProps, items: [] });

		const rows = mediaTable.find(DynamicTableStateless).prop('rows');
		if (rows) {
			expect(rows.length).toEqual(0);
		}
	});

	it('should allow rendering of custom column lengths', async () => {
		const customColumns = {
			...defaultHeaders,
			cells: [
				...defaultHeaders.cells,
				{
					content: 'new column header',
					width: 20,
				},
			],
		};

		const { mediaTable } = await setup(true, {
			...defaultProps,
			columns: customColumns,
		});

		const head = mediaTable.find(DynamicTableStateless).prop('head');
		if (head) {
			const columnLength = head.cells.length;

			expect(columnLength).toEqual(6);
		}
	});

	it('should have matching row data length and column length', async () => {
		const { mediaTable } = await setup();

		const columnLength = mediaTable.find(DynamicTableStateless).prop('head')!.cells.length;
		const rowDataLength = mediaTable.find(DynamicTableStateless).prop('rows')![0].cells.length;

		expect(columnLength).toEqual(5);
		expect(rowDataLength).toEqual(columnLength);
	});

	it('should render empty column, if value not provided for that column', async () => {
		const customItems = [
			{
				identifier: audioFileId,
				data: {
					file: createMockFileData('audio_file_name', 'audio'),
					size: toHumanReadableMediaSize(10),
				},
			},
		];

		const { mediaTable } = await setup(true, {
			...defaultProps,
			items: customItems,
		});

		const columnValue = mediaTable.find(DynamicTableStateless).prop('rows')![0].cells[2].content;
		expect(columnValue).toEqual('');
	});

	it('should still render cell data for each row even if internal media API fails', async () => {
		const { mediaTable } = await setup(false);

		const rowDataLength = mediaTable.find(DynamicTableStateless).prop('rows')![0].cells.length;

		expect(rowDataLength).toEqual(5);
	});

	it('should have same number of table rows as rows passed in', async () => {
		const { mediaTable } = await setup();

		const rows = mediaTable.find(DynamicTableStateless).prop('rows');

		if (rows) {
			expect(rows.length).toEqual(2);
		}
	});

	it('should not show pagination when totalItems is less than itemsPerPage', async () => {
		const { mediaTable } = await setup(true, {
			...defaultProps,
			itemsPerPage: 6,
			totalItems: 5,
		});

		const rows = mediaTable.find(DynamicTableStateless).prop('rows');

		if (rows) {
			expect(rows.length).toEqual(2);
		}
	});

	it('should apply row props to specified rows', async () => {
		const { mediaTable } = await setup(true, {
			...defaultProps,
			items: [
				...defaultItems,
				{
					identifier: docFileId,
					rowProps: { className: 'test-class' },
					data: {
						file: createMockFileData('file_name', 'doc'),
						size: toHumanReadableMediaSize(10),
						date: 'some date',
					},
				},
			],
		});

		const tableRows = mediaTable.find(DynamicTableStateless).prop('rows');

		expect(tableRows![0].className).toEqual(undefined);
		expect(tableRows![1].className).toEqual(undefined);
		expect(tableRows![2].className).toEqual('test-class');
	});

	describe('loading spinner', () => {
		test('should be displayed when isLoading is set to true', async () => {
			const { mediaTable } = await setup(true, {
				...defaultProps,
				isLoading: true,
			});

			const isShowingLoadingSpinner = mediaTable.find(DynamicTableStateless).prop('isLoading');

			expect(isShowingLoadingSpinner).toEqual(true);
		});

		test('should not be displayed when isLoading is set to false', async () => {
			const { mediaTable } = await setup(true, {
				...defaultProps,
				isLoading: false,
			});

			const isShowingLoadingSpinner = mediaTable.find(DynamicTableStateless).prop('isLoading');

			expect(isShowingLoadingSpinner).toEqual(false);
		});
	});

	describe('onSort', () => {
		test('is called with correct data when a sortable header item is clicked', async () => {
			const { mediaTable } = await setup();

			mediaTable.find(DynamicTableStateless).prop('onSort')!({
				key: 'file',
				sortOrder: 'DESC',
				item: {
					content: 'File name',
					isSortable: true,
					key: 'file',
				},
			});

			expect(onSortMock).toHaveBeenCalledTimes(1);
			expect(onSortMock).toHaveBeenCalledWith('file', 'DESC');
		});

		test('is not called with correct data when a non-sortable header item is clicked', async () => {
			const { mediaTable } = await setup();

			mediaTable.find(DynamicTableStateless).prop('onSort')!({
				key: 'date',
				sortOrder: 'DESC',
				item: {
					content: 'Upload time',
					isSortable: false,
					key: 'file',
				},
			});

			expect(onSortMock).toHaveBeenCalledTimes(0);
		});
	});

	describe('onSetPage', () => {
		test('is called when navigating to another page', async () => {
			const { mediaTable } = await setup();

			mediaTable.find(DynamicTableStateless).prop('onSetPage')!(2);

			expect(onSetPageMock).toHaveBeenCalledTimes(1);
			expect(onSetPageMock).toHaveBeenCalledWith(2);
		});
	});

	describe('i18n', () => {
		it('does not render the IntlProvider internally if intl is present in context', () => {
			const wrapper = mountWithIntlContext(
				<MediaTable
					intl={createIntl({ locale: 'en' })}
					mediaClient={getDefaultMediaClient()}
					items={defaultItems}
					itemsPerPage={3}
					totalItems={defaultItems.length}
					isLoading={false}
					columns={defaultHeaders}
					createAnalyticsEvent={jest.fn()}
				/>,
			);

			const mediaTable = wrapper.find(MediaTable);
			expect(mediaTable.find(IntlProvider).exists()).toEqual(false);
		});

		it('renders the IntlProvider internally if intl is not present in context', async () => {
			const { mediaTable } = await setup();
			expect(mediaTable.find(IntlProvider).exists()).toEqual(true);
		});
	});

	describe('analyticsEvent', () => {
		it('should trigger UI analyticsEvent when mediaTable row is clicked', async () => {
			const { mediaTable, createAnalyticsEventSpy } = await setup();

			const rows = mediaTable.find(DynamicTableStateless).prop('rows');

			if (rows && rows[0].onClick) {
				rows[0].onClick({} as any);
			}

			expect(createAnalyticsEventSpy).toHaveBeenCalledWith({
				action: 'clicked',
				actionSubject: 'mediaFile',
				actionSubjectId: 'mediaFileRow',
				eventType: 'ui',
			});
		});

		it('should trigger UI analyticsEvent when mediaTable enter is pressed on a row', async () => {
			const { mediaTable, createAnalyticsEventSpy } = await setup();

			const rows = mediaTable.find(DynamicTableStateless).prop('rows');

			if (rows && rows[0].onKeyPress) {
				rows[0].onKeyPress({ key: 'Enter' } as any);
			}

			expect(createAnalyticsEventSpy).toHaveBeenCalledWith({
				eventType: 'ui',
				action: 'keyPressed',
				actionSubject: 'mediaFile',
				actionSubjectId: 'mediaFileRow',
			});
		});
	});

	describe('row clicking functionality - On click', () => {
		it('should trigger onRowClick when present', async () => {
			const onRowClick = jest.fn();
			const { mediaTable, createAnalyticsEventSpy } = await setup(true, {
				...defaultProps,
				onRowClick,
			});

			const rows: RowType[] | undefined = mediaTable.find(DynamicTableStateless).prop('rows');

			if (rows && rows[0].onClick) {
				rows[0].onClick({} as any);
			}

			expect(onRowClick).toHaveBeenCalledTimes(1);
			expect(createAnalyticsEventSpy).toHaveBeenCalledWith({
				eventType: 'ui',
				action: 'clicked',
				actionSubject: 'mediaFile',
				actionSubjectId: 'mediaFileRow',
			});
		});

		it('should prevent openPreview & allow onRowClick when onRowClick returns true', async () => {
			const onRowClick = jest.fn(() => true);
			const onPreviewOpen = jest.fn();
			const { mediaTable } = await setup(true, {
				...defaultProps,
				onRowClick,
				onPreviewOpen,
			});
			const items = defaultProps.items;

			const rows: RowType[] | undefined = mediaTable.find(DynamicTableStateless).prop('rows');

			if (rows && rows[0].onClick) {
				rows[0].onClick({} as any);
			}

			expect(onPreviewOpen).toHaveBeenCalledTimes(0);
			expect(onRowClick).toHaveBeenCalledTimes(1);
			expect(onRowClick).toHaveBeenCalledWith(items[0].data, 0);
		});
	});

	describe('row clicking functionality - Key press (Enter)', () => {
		it('should trigger onRowClick when present', async () => {
			const onRowClick = jest.fn();
			const { mediaTable, createAnalyticsEventSpy } = await setup(true, {
				...defaultProps,
				onRowClick,
			});

			const rows: RowType[] | undefined = mediaTable.find(DynamicTableStateless).prop('rows');

			if (rows && rows[0].onClick) {
				rows[0].onKeyPress?.({ key: 'Enter' } as any);
			}

			expect(onRowClick).toHaveBeenCalledTimes(1);
			expect(createAnalyticsEventSpy).toHaveBeenCalledWith({
				eventType: 'ui',
				action: 'keyPressed',
				actionSubject: 'mediaFile',
				actionSubjectId: 'mediaFileRow',
			});
		});

		it('should prevent openPreview & allow onRowClick when onRowClick returns true', async () => {
			const onRowClick = jest.fn(() => true);
			const onPreviewOpen = jest.fn();
			const { mediaTable } = await setup(true, {
				...defaultProps,
				onRowClick,
				onPreviewOpen,
			});
			const items = defaultProps.items;

			const rows: RowType[] | undefined = mediaTable.find(DynamicTableStateless).prop('rows');

			if (rows && rows[0].onClick) {
				rows[0].onKeyPress?.({ key: 'Enter' } as any);
			}

			expect(onPreviewOpen).toHaveBeenCalledTimes(0);
			expect(onRowClick).toHaveBeenCalledTimes(1);
			expect(onRowClick).toHaveBeenCalledWith(items[0].data, 0);
		});
	});
});
