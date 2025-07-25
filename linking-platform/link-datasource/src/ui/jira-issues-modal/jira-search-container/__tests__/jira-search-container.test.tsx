import React from 'react';

import { act, render, type RenderResult, screen, within } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { IntlProvider } from 'react-intl-next';
import invariant from 'tiny-invariant';

import { AnalyticsListener } from '@atlaskit/analytics-next';
import { JQLEditor, type JQLEditorProps } from '@atlaskit/jql-editor';
import {
	fieldValuesResponseForStatusesMapped,
	mockSite,
} from '@atlaskit/link-test-helpers/datasource';
import { asMock } from '@atlaskit/link-test-helpers/jest';

import { EVENT_CHANNEL } from '../../../../analytics';
import { type SelectOption } from '../../../common/modal/popup-select/types';
import { useFilterOptions } from '../../basic-filters/hooks/useFilterOptions';
import {
	type HydrateJqlState,
	useHydrateJqlQuery,
} from '../../basic-filters/hooks/useHydrateJqlQuery';
import { type BasicFilterFieldType } from '../../basic-filters/types';
import { availableBasicFilterTypes } from '../../basic-filters/ui';
import { type JiraIssueDatasourceParameters } from '../../types';
import { DEFAULT_JQL_QUERY, JiraSearchContainer, type SearchContainerProps } from '../index';

jest.mock('../../basic-filters/hooks/useHydrateJqlQuery');

jest.mock('../../basic-filters/hooks/useFilterOptions');

jest.mock('@atlaskit/jql-editor-autocomplete-rest', () => ({
	useAutocompleteProvider: jest.fn().mockReturnValue('useAutocompleteProvider-call-result'),
}));

jest.mock('@atlaskit/jql-editor', () => ({
	JQLEditor: jest.fn().mockReturnValue(<div data-testid={'mocked-jql-editor'}></div>),
}));

let mockRequest = jest.fn();

jest.mock('@atlaskit/linking-common', () => {
	const originalModule = jest.requireActual('@atlaskit/linking-common');
	return {
		...originalModule,
		request: (...args: any) => mockRequest(...args),
	};
});

const onAnalyticFireEvent = jest.fn();

const initialParameters: JiraIssueDatasourceParameters = {
	cloudId: '12345',
	jql: DEFAULT_JQL_QUERY,
};

const rerenderHelper = (
	rerender: any,
	propsOverride: Partial<
		SearchContainerProps & {
			hydratedOptions: HydrateJqlState['hydratedOptions'];
		}
	> = {},
) => {
	return rerender(
		<AnalyticsListener channel={EVENT_CHANNEL} onEvent={onAnalyticFireEvent}>
			<IntlProvider locale="en">
				<JiraSearchContainer
					onSearch={jest.fn()}
					onSearchMethodChange={jest.fn()}
					initialSearchMethod={'jql'}
					parameters={{ ...initialParameters }}
					setSearchBarJql={jest.fn()}
					{...propsOverride}
				/>
			</IntlProvider>
		</AnalyticsListener>,
	);
};

const setup = (
	propsOverride: Partial<
		SearchContainerProps & {
			hydratedOptions: HydrateJqlState['hydratedOptions'];
			hydrationStatus: HydrateJqlState['status'];
		}
	> = {},
) => {
	const mockFetchHydratedJqlOptions = jest.fn();
	asMock(useHydrateJqlQuery).mockReturnValue({
		fetchHydratedJqlOptions: mockFetchHydratedJqlOptions,
		hydratedOptions: propsOverride.hydratedOptions || {},
		status: propsOverride.hydrationStatus || 'resolved',
	});
	asMock(useFilterOptions).mockReturnValue({
		filterOptions: fieldValuesResponseForStatusesMapped as SelectOption[],
		status: 'resolved',
		fetchFilterOptions: jest.fn(),
		reset: jest.fn(),
	});

	const mockOnSearch = jest.fn();
	const mockOnSearchMethodChange = jest.fn();
	const mockSetSearchBarJql = jest.fn();

	const component = render(
		<AnalyticsListener channel={EVENT_CHANNEL} onEvent={onAnalyticFireEvent}>
			<IntlProvider locale="en">
				<JiraSearchContainer
					onSearch={mockOnSearch}
					onSearchMethodChange={mockOnSearchMethodChange}
					initialSearchMethod={'jql'}
					parameters={{ ...initialParameters }}
					setSearchBarJql={mockSetSearchBarJql}
					site={mockSite}
					{...propsOverride}
				/>
			</IntlProvider>
		</AnalyticsListener>,
	);

	const getLatestJQLEditorProps = () => {
		let calls = asMock(JQLEditor).mock.calls;
		return calls[calls.length - 1][0] as JQLEditorProps;
	};

	return {
		...component,
		mockOnSearch,
		mockOnSearchMethodChange,
		mockSetSearchBarJql,
		getLatestJQLEditorProps,
		mockFetchHydratedJqlOptions,
	};
};

const setupBasicFilter = async ({
	openPicker = true,
	filterType = 'status',
}: RenderResult & {
	openPicker?: boolean;
	filterType?: BasicFilterFieldType;
}) => {
	// switch to basic search because default is JQL
	// in current implementation JQL doesn't have basic filters
	await userEvent.click(screen.getByTestId('mode-toggle-basic'));

	const triggerButton = screen.queryByTestId(`jlol-basic-filter-${filterType}-trigger`);

	if (openPicker) {
		invariant(triggerButton);
		await userEvent.click(triggerButton);
	}

	return { triggerButton };
};

describe('JiraSearchContainer', () => {
	beforeEach(() => {
		jest.clearAllMocks();
	});

	it('renders the JQL input when initially rendered without parameters', async () => {
		const { getByTestId } = setup();

		expect(getByTestId('mode-toggle-jql').querySelector('input')).toBeChecked();
		expect(getByTestId('mocked-jql-editor')).toBeInTheDocument();
	});

	it('renders the jql input when initially rendered with parameters', () => {
		const { getByTestId, queryByPlaceholderText } = setup({
			parameters: {
				cloudId: 'some-cloud-id',
				jql: 'some-jql',
			},
			searchBarJql: 'some-jql',
		});

		expect(queryByPlaceholderText('Search')).not.toBeInTheDocument();
		expect(getByTestId('mode-toggle-jql').querySelector('input')).toBeChecked();
	});

	it('changes to correct input mode when an option is selected', async () => {
		const { getByTestId } = setup();

		// switch to jql search
		await userEvent.click(getByTestId('mode-toggle-jql'));
		expect(getByTestId('mocked-jql-editor')).toBeInTheDocument();

		// switch to basic search
		await userEvent.click(getByTestId('mode-toggle-basic'));
		expect(getByTestId('jira-datasource-modal--basic-search-input')).toBeInTheDocument();
	});

	it('should call onSearchMethodChange when mode changes', async () => {
		const { getByTestId, mockOnSearchMethodChange } = setup();

		// switch to basic search
		await userEvent.click(getByTestId('mode-toggle-basic'));
		expect(mockOnSearchMethodChange).toHaveBeenCalledWith('basic');

		// switch to jql search
		await userEvent.click(getByTestId('mode-toggle-jql'));
		expect(mockOnSearchMethodChange).toHaveBeenCalledWith('jql');
	});

	it('displays an initial jql query', () => {
		const { getByTestId } = setup({
			parameters: {
				...initialParameters,
				jql: 'status = "0. On Hold"',
			},
			searchBarJql: 'status = "0. On Hold"',
		});

		expect(getByTestId('mode-toggle-jql').querySelector('input')).toBeChecked();

		expect(JQLEditor).toHaveBeenCalledWith(
			expect.objectContaining({ query: 'status = "0. On Hold"' }),
			expect.anything(),
		);
	});

	it('displays an initial jql query and does not switch back to jql search mode if user searches using basic text', async () => {
		const { getByTestId, mockOnSearch, mockSetSearchBarJql, rerender } = setup({
			parameters: {
				...initialParameters,
				jql: 'status = "0. On Hold"',
			},
			searchBarJql: 'status = "0. On Hold"',
		});
		// switch to jql search
		await userEvent.click(getByTestId('mode-toggle-jql'));

		expect(JQLEditor).toHaveBeenCalledWith(
			expect.objectContaining({ query: 'status = "0. On Hold"' }),
			expect.anything(),
		);
		// switch to basic, type, and search
		await userEvent.click(getByTestId('mode-toggle-basic'));
		const basicTextInput = getByTestId('jira-datasource-modal--basic-search-input');
		await userEvent.type(basicTextInput, 'testing');
		await userEvent.keyboard('{Enter}');

		expect(mockSetSearchBarJql).toHaveBeenCalledWith(
			'text ~ "testing*" or summary ~ "testing*" ORDER BY created DESC',
		);

		// re-render the component with new search bar jql since the state is stored and updated in the parent
		rerenderHelper(rerender, {
			onSearch: mockOnSearch,
			initialSearchMethod: 'basic',
			searchBarJql: 'text ~ "testing*" or summary ~ "testing*" ORDER BY created DESC',
		});

		await userEvent.click(getByTestId('jira-datasource-modal--basic-search-button'));
		expect(mockOnSearch).toHaveBeenCalledWith(
			{
				jql: 'text ~ "testing*" or summary ~ "testing*" ORDER BY created DESC',
			},
			{
				searchMethod: 'basic',
				basicFilterSelections: {},
				isQueryComplex: false,
			},
		);
		expect(getByTestId('mode-toggle-basic').querySelector('input')).toBeChecked();
	});

	it('displays an initial basic query', async () => {
		const { getByTestId } = setup({
			parameters: {
				...initialParameters,
				jql: '(text ~ "test*" OR summary ~ "test*") order by fakeKey ASC',
			},
			initialSearchMethod: 'basic',
			searchBarJql: '(text ~ "test*" OR summary ~ "test*") order by fakeKey ASC',
		});

		expect(getByTestId('mode-toggle-basic').querySelector('input')).toBeChecked();
	});

	it('should call onSearch with JQL user input', async () => {
		const { getByTestId, mockOnSearch, getLatestJQLEditorProps, mockSetSearchBarJql, rerender } =
			setup();

		// switch to jql search
		await userEvent.click(getByTestId('mode-toggle-jql'));

		act(() => {
			getLatestJQLEditorProps().onUpdate!('some-query', {
				represents: '',
				errors: [],
				query: undefined,
			});
		});

		expect(mockSetSearchBarJql).toHaveBeenCalledWith('some-query');

		// re-render the component with new search bar jql since the state is stored and updated in the parent
		rerenderHelper(rerender, {
			onSearch: mockOnSearch,
			searchBarJql: 'some-query',
		});

		getLatestJQLEditorProps().onSearch!('some-other-query', {
			represents: '',
			errors: [],
			query: undefined,
		});

		expect(mockOnSearch).toHaveBeenCalledWith(
			{
				jql: 'some-query',
			},
			{
				searchMethod: 'jql',
				basicFilterSelections: {},
				isQueryComplex: true, // it is not a valid JQL query so it comes up as complex
			},
		);
	});

	it('should call onSearch with JQL user input with correct isQueryComplex value if the query is complex', async () => {
		const { getByTestId, mockOnSearch, getLatestJQLEditorProps, mockSetSearchBarJql, rerender } =
			setup();

		// switch to jql search
		await userEvent.click(getByTestId('mode-toggle-jql'));

		act(() => {
			getLatestJQLEditorProps().onUpdate!('resoulution=none', {
				represents: '',
				errors: [],
				query: undefined,
			});
		});

		expect(mockSetSearchBarJql).toHaveBeenCalledWith('resoulution=none');

		// re-render the component with new search bar jql since the state is stored and updated in the parent
		rerenderHelper(rerender, {
			onSearch: mockOnSearch,
			searchBarJql: 'resoulution=none',
		});

		getLatestJQLEditorProps().onSearch!('resoulution=none', {
			represents: '',
			errors: [],
			query: undefined,
		});

		expect(mockOnSearch).toHaveBeenCalledWith(
			{
				jql: 'resoulution=none',
			},
			{
				searchMethod: 'jql',
				basicFilterSelections: {},
				isQueryComplex: true,
			},
		);
	});

	it('should open in jql search method on a rerender if the component is in the count view mode', async () => {
		const { rerender, getByTestId, mockOnSearch, getLatestJQLEditorProps, mockSetSearchBarJql } =
			setup();

		// switch to jql search
		await userEvent.click(getByTestId('mode-toggle-jql'));

		act(() => {
			getLatestJQLEditorProps().onUpdate!('some-query', {
				represents: '',
				errors: [],
				query: undefined,
			});
		});

		expect(mockSetSearchBarJql).toHaveBeenCalledWith('some-query');

		// re-render the component with new search bar jql since the state is stored and updated in the parent
		rerenderHelper(rerender, {
			onSearch: mockOnSearch,
			searchBarJql: 'some-query',
		});

		getLatestJQLEditorProps().onSearch!('some-other-query', {
			represents: '',
			errors: [],
			query: undefined,
		});
		expect(mockOnSearch).toHaveBeenCalledWith(
			{
				jql: 'some-query',
			},
			{
				searchMethod: 'jql',
				basicFilterSelections: {},
				isQueryComplex: true, // it is not a valid JQL query so it comes up as complex
			},
		);
		// re-render the component with count view mode
		rerender(
			<AnalyticsListener channel={EVENT_CHANNEL} onEvent={onAnalyticFireEvent}>
				<IntlProvider locale="en">
					<JiraSearchContainer
						onSearch={mockOnSearch}
						onSearchMethodChange={jest.fn()}
						initialSearchMethod={'jql'}
						setSearchBarJql={jest.fn()}
						searchBarJql={'some-query'}
						parameters={{ ...initialParameters }}
					/>
				</IntlProvider>
			</AnalyticsListener>,
		);
		// make sure JQL is showing as toggle method
		expect(getByTestId('mode-toggle-jql').querySelector('input')).toBeChecked();
	});

	it('calls onSearch with Basic search', async () => {
		const { getByTestId, mockOnSearch, mockSetSearchBarJql, rerender } = setup();

		await userEvent.click(getByTestId('mode-toggle-basic'));

		await userEvent.type(getByTestId('jira-datasource-modal--basic-search-input'), 'testing');
		await userEvent.keyboard('{Enter}');

		expect(mockSetSearchBarJql).toHaveBeenCalledWith(
			'text ~ "testing*" or summary ~ "testing*" ORDER BY created DESC',
		);

		// re-render the component with new search bar jql since the state is stored and updated in the parent
		rerenderHelper(rerender, {
			onSearch: mockOnSearch,
			searchBarJql: 'text ~ "testing*" or summary ~ "testing*" ORDER BY created DESC',
		});

		await userEvent.click(getByTestId('jira-datasource-modal--basic-search-button'));

		expect(mockOnSearch).toHaveBeenCalledWith(
			{
				jql: 'text ~ "testing*" or summary ~ "testing*" ORDER BY created DESC',
			},
			{
				searchMethod: 'basic',
				basicFilterSelections: {},
				isQueryComplex: false,
			},
		);
	});

	it('persists basic text search on toggle', async () => {
		const { getByTestId } = setup();

		await userEvent.click(getByTestId('mode-toggle-basic'));

		const basicTextInput = getByTestId('jira-datasource-modal--basic-search-input');
		await userEvent.type(basicTextInput, 'testing');
		await userEvent.keyboard('{Enter}');

		await userEvent.click(getByTestId('mode-toggle-jql'));
		await userEvent.click(getByTestId('mode-toggle-basic'));

		expect(basicTextInput).toHaveValue('testing');
	});

	it('persists jql order keys on basic text input changes', async () => {
		const { getByTestId, getLatestJQLEditorProps, mockSetSearchBarJql, rerender } = setup();

		await userEvent.click(getByTestId('mode-toggle-jql'));

		act(() => {
			getLatestJQLEditorProps().onUpdate!(
				'text ~ "test*" or summary ~ "test*" ORDER BY status ASC',
				{
					represents: '',
					errors: [],
					query: undefined,
				},
			);
		});

		expect(mockSetSearchBarJql).toHaveBeenCalledWith(
			'text ~ "test*" or summary ~ "test*" ORDER BY status ASC',
		);

		await userEvent.click(getByTestId('mode-toggle-basic'));

		const basicTextInput = getByTestId('jira-datasource-modal--basic-search-input');
		await userEvent.type(basicTextInput, 'testing');
		await userEvent.keyboard('{Enter}');

		await userEvent.click(getByTestId('mode-toggle-jql'));

		// re-render the component with new search bar jql since the state is stored and updated in the parent
		rerenderHelper(rerender, {
			searchBarJql: 'text ~ "testing*" or summary ~ "testing*" ORDER BY status ASC',
		});

		expect(getLatestJQLEditorProps().query).toEqual(
			'text ~ "testing*" or summary ~ "testing*" ORDER BY status ASC',
		);
	});

	it('uses default order keys if given invalid keys', async () => {
		const { getByTestId, getLatestJQLEditorProps, rerender, mockSetSearchBarJql } = setup();

		await userEvent.click(getByTestId('mode-toggle-jql'));

		act(() => {
			getLatestJQLEditorProps().onUpdate!(
				'text ~ "test*" or summary ~ "test*" ORDER BY fakeKey ASC',
				{
					represents: '',
					errors: [],
					query: undefined,
				},
			);
		});

		await userEvent.click(getByTestId('mode-toggle-basic'));

		await userEvent.type(getByTestId('jira-datasource-modal--basic-search-input'), 'testing');
		await userEvent.keyboard('{Enter}');

		expect(mockSetSearchBarJql).toHaveBeenCalledWith(
			'text ~ "testing*" or summary ~ "testing*" ORDER BY created DESC',
		);

		// re-render the component with new search bar jql since the state is stored and updated in the parent
		rerenderHelper(rerender, {
			initialSearchMethod: 'basic',
			searchBarJql: 'text ~ "testing*" or summary ~ "testing*" ORDER BY created DESC',
		});

		await userEvent.click(getByTestId('mode-toggle-jql'));

		expect(getLatestJQLEditorProps().query).toEqual(
			'text ~ "testing*" or summary ~ "testing*" ORDER BY created DESC',
		);
	});

	it('has default JQL query when basic search input is empty', async () => {
		const { getLatestJQLEditorProps, getByTestId, rerender, mockSetSearchBarJql } = setup();

		// has default query before any user input
		await userEvent.click(getByTestId('mode-toggle-jql'));
		expect(getLatestJQLEditorProps().query).toEqual('ORDER BY created DESC');

		// persists default query if user enters empty string to basic search
		await userEvent.click(getByTestId('mode-toggle-basic'));
		const basicTextInput = getByTestId('jira-datasource-modal--basic-search-input');
		await userEvent.type(basicTextInput, '  ');
		await userEvent.keyboard('{Enter}');

		// should be called with the default query if empty
		expect(mockSetSearchBarJql).toHaveBeenCalledWith('ORDER BY created DESC');

		// re-render the component with new search bar jql since the state is stored and updated in the parent
		rerenderHelper(rerender, {
			searchBarJql: 'ORDER BY created DESC',
		});

		await userEvent.click(getByTestId('mode-toggle-jql'));

		expect(getLatestJQLEditorProps().query).toEqual('ORDER BY created DESC');
	});

	it('BasicFilterContainer: should show basic filter container', async () => {
		const renderResult = setup({
			parameters: {
				cloudId: 'test-cloud-id',
				filter: 'project',
			},
		});

		const { mockOnSearchMethodChange } = renderResult;

		await setupBasicFilter({
			...renderResult,
			filterType: 'project',
			openPicker: false,
		});

		expect(mockOnSearchMethodChange).toHaveBeenCalledWith('basic');

		expect(screen.queryByTestId('jlol-basic-filter-container')).toBeInTheDocument();

		expect(screen.queryByTestId('jlol-basic-filter-project-trigger')).toBeInTheDocument();
		expect(screen.queryByTestId('jlol-basic-filter-status-trigger')).toBeInTheDocument();
		expect(screen.queryByTestId('jlol-basic-filter-assignee-trigger')).toBeInTheDocument();
		expect(screen.queryByTestId('jlol-basic-filter-type-trigger')).toBeInTheDocument();
	});

	it('BasicFilterContainer: should disable basic mode on search when the query is complex', () => {
		const { getLatestJQLEditorProps, getByTestId, rerender, mockSetSearchBarJql } = setup();

		act(() => {
			getLatestJQLEditorProps().onUpdate!(
				'text ~ "wrong" or summary ~ "value" ORDER BY status ASC',
				{
					represents: '',
					errors: [],
					query: undefined,
				},
			);
		});

		expect(mockSetSearchBarJql).toHaveBeenCalledWith(
			'text ~ "wrong" or summary ~ "value" ORDER BY status ASC',
		);

		// re-render the component with new search bar jql since the state is stored and updated in the parent
		rerenderHelper(rerender, {
			searchBarJql: 'text ~ "wrong" or summary ~ "value" ORDER BY status ASC',
		});

		act(() => {
			// triggers search
			getLatestJQLEditorProps().onSearch!('', {
				represents: '',
				errors: [],
				query: undefined,
			});
		});

		expect(getByTestId('mode-toggle-basic').querySelector('input')).toBeDisabled();
	});

	it('BasicFilterContainer: should disable basic mode when the modal loads if the query is complex', () => {
		const { getByTestId } = setup({
			parameters: {
				...initialParameters,
				jql: 'text ~ "wrong" or summary ~ "value" ORDER BY status ASC',
			},
			searchBarJql: 'text ~ "wrong" or summary ~ "value" ORDER BY status ASC',
		});

		expect(getByTestId('mode-toggle-basic').querySelector('input')).toBeDisabled();
	});

	it('BasicFilterContainer: should render options with those selected ordered first on menu reopen', async () => {
		const renderResult = setup({
			parameters: {
				cloudId: 'test-cloud-id',
				filter: 'status',
			},
		});

		const { triggerButton } = await setupBasicFilter(renderResult);

		const selectMenu = await screen.findByTestId('jlol-basic-filter-status-popup-select--menu');

		const initialLozengeOptions = within(selectMenu).queryAllByTestId(
			'basic-filter-popup-select-option--lozenge',
		);
		const secondOption = initialLozengeOptions[1];

		// Select second option ('Awaiting approval' lozenge)
		await userEvent.click(secondOption);

		// Close menu
		await userEvent.click(triggerButton!);

		// Check that the ordering has NOT yet have changed
		const expectedTextContentsOnClose = [
			'Authorize',
			'Awaiting approval',
			'Awaiting implementation',
			'Canceled',
			'Closed',
		];

		expectedTextContentsOnClose.forEach((expectedTextContent, index) => {
			expect(initialLozengeOptions[index]).toHaveTextContent(expectedTextContent);
		});

		// Reopen menu
		await userEvent.click(triggerButton!);

		const selectMenu2 = await screen.findByTestId('jlol-basic-filter-status-popup-select--menu');
		const updatedLozengeOptions = within(selectMenu2).queryAllByTestId(
			'basic-filter-popup-select-option--lozenge',
		);

		// Check that the ordering has been updated on reopen
		const expectedTextContentsOnReopen = [
			'Awaiting approval',
			'Authorize',
			'Awaiting implementation',
			'Canceled',
			'Closed',
		];

		expectedTextContentsOnReopen.forEach((expectedTextContent, index) => {
			expect(updatedLozengeOptions[index]).toHaveTextContent(expectedTextContent);
		});
	});

	it('BasicFilterContainer: should apply selection for each filter correctly', async () => {
		const renderResult = setup({
			parameters: {
				cloudId: 'test-cloud-id',
				filter: 'status',
			},
		});

		await setupBasicFilter(renderResult);

		const statusSelectMenu = await screen.findByTestId(
			'jlol-basic-filter-status-popup-select--menu',
		);

		const [firstStatus] = within(statusSelectMenu).queryAllByTestId(
			'basic-filter-popup-select-option--lozenge',
		);
		await userEvent.click(firstStatus);

		// Close menu
		const statusTriggerButton = await screen.findByTestId(`jlol-basic-filter-status-trigger`);
		await userEvent.click(statusTriggerButton);

		expect(screen.queryByTestId('jlol-basic-filter-container')).toHaveTextContent(
			'ProjectWork typeStatus: AuthorizeAssignee',
		);

		const projectTriggerButton = await screen.findByTestId(`jlol-basic-filter-project-trigger`);
		await userEvent.click(projectTriggerButton);

		const projectSelectMenu = await screen.findByTestId(
			'jlol-basic-filter-project-popup-select--menu',
		);

		const [firstProject] = within(projectSelectMenu).queryAllByTestId(
			'basic-filter-popup-select-option--lozenge',
		);
		await userEvent.click(firstProject);
		// Close menu
		await userEvent.click(projectTriggerButton);

		expect(screen.queryByTestId('jlol-basic-filter-container')).toHaveTextContent(
			'Project: AuthorizeWork typeStatus: AuthorizeAssignee',
		);
	});

	it('BasicFilterContainer: should reset filter labels when the cloudId changes', async () => {
		const renderResult = setup({
			parameters: {
				cloudId: 'test-cloud-id',
				filter: 'status',
			},
		});
		const { mockOnSearch, rerender } = renderResult;

		await setupBasicFilter(renderResult);

		const statusSelectMenu = await screen.findByTestId(
			'jlol-basic-filter-status-popup-select--menu',
		);

		const [firstStatus] = within(statusSelectMenu).queryAllByTestId(
			'basic-filter-popup-select-option--lozenge',
		);
		await userEvent.click(firstStatus);

		// Close menu
		const statusTriggerButton = await screen.findByTestId(`jlol-basic-filter-status-trigger`);
		await userEvent.click(statusTriggerButton);

		expect(screen.queryByTestId('jlol-basic-filter-container')).toHaveTextContent(
			'ProjectWork typeStatus: AuthorizeAssignee',
		);

		rerender(
			<AnalyticsListener channel={EVENT_CHANNEL} onEvent={onAnalyticFireEvent}>
				<IntlProvider locale="en">
					<JiraSearchContainer
						onSearch={mockOnSearch}
						onSearchMethodChange={jest.fn()}
						initialSearchMethod={'jql'}
						setSearchBarJql={jest.fn()}
						searchBarJql={'another-jql'}
						parameters={{ ...initialParameters, jql: 'another-jql' }}
					/>
				</IntlProvider>
			</AnalyticsListener>,
		);

		expect(screen.queryByTestId('jlol-basic-filter-container')).toHaveTextContent(
			'ProjectWork typeStatusAssignee',
		);
	});

	describe('BasicFilterContainer: should reset search term when the cloudId changes', () => {
		it('should reset jql when the cloudId changes', async () => {
			const previousJql =
				'(text ~ "testing*" or summary ~ "testing*") and status in (Authorize) ORDER BY created DESC';

			const renderResult = setup({
				searchBarJql: previousJql,
				parameters: { cloudId: 'some-cloud-id', jql: previousJql },
			});

			const { mockOnSearch, getByTestId, rerender, getLatestJQLEditorProps } = renderResult;

			expect(getLatestJQLEditorProps().query).toEqual(previousJql);

			rerender(
				<AnalyticsListener channel={EVENT_CHANNEL} onEvent={onAnalyticFireEvent}>
					<IntlProvider locale="en">
						<JiraSearchContainer
							onSearch={mockOnSearch}
							onSearchMethodChange={jest.fn()}
							initialSearchMethod={'jql'}
							setSearchBarJql={jest.fn()}
							parameters={{
								...initialParameters,
								cloudId: 'another-cloudId',
							}}
						/>
					</IntlProvider>
				</AnalyticsListener>,
			);

			await userEvent.click(getByTestId('mode-toggle-jql'));

			expect(getLatestJQLEditorProps().query).not.toEqual(previousJql);
			expect(getLatestJQLEditorProps().query).toEqual(DEFAULT_JQL_QUERY);
		});

		it('with basic filters', async () => {
			const renderResult = setup({
				parameters: {
					cloudId: 'test-cloud-id',
					filter: 'status',
				},
			});
			const { container, mockOnSearch, rerender } = renderResult;

			const { triggerButton } = await setupBasicFilter(renderResult);

			const input = container.parentElement?.querySelector(
				'#jlol-basic-filter-status-popup-select--input',
			);
			invariant(input);

			await userEvent.type(input, 'hello');
			await userEvent.keyboard('{Enter}');

			expect(container.parentElement?.querySelector('[data-value="hello"]')).not.toBeNull();

			// Close menu
			await userEvent.click(triggerButton!);

			rerender(
				<AnalyticsListener channel={EVENT_CHANNEL} onEvent={onAnalyticFireEvent}>
					<IntlProvider locale="en">
						<JiraSearchContainer
							onSearch={mockOnSearch}
							onSearchMethodChange={jest.fn()}
							initialSearchMethod={'jql'}
							setSearchBarJql={jest.fn()}
							searchBarJql={'another-jql'}
							parameters={{ ...initialParameters, jql: 'another-jql' }}
						/>
					</IntlProvider>
				</AnalyticsListener>,
			);

			// Open menu
			const newInstanceOfTriggerButton = screen.queryByTestId(`jlol-basic-filter-status-trigger`);

			invariant(newInstanceOfTriggerButton);
			await userEvent.click(newInstanceOfTriggerButton);

			expect(container.parentElement?.querySelector('[data-value="hello"]')).toBeNull();
		});
	});

	it('BasicFilterContainer: should call fetchHydratedJqlOptions on search if query is not complex', async () => {
		const renderResult = setup({
			parameters: {
				cloudId: 'test-cloud-id',
				filter: 'status',
			},
		});
		const { getByTestId, getLatestJQLEditorProps, mockFetchHydratedJqlOptions } = renderResult;

		// switch to jql search
		await userEvent.click(getByTestId('mode-toggle-jql'));

		act(() => {
			getLatestJQLEditorProps().onSearch!('some-query', {
				represents: '',
				errors: [],
				query: undefined,
			});
		});

		expect(mockFetchHydratedJqlOptions).toHaveBeenCalledTimes(1);
	});

	it('BasicFilterContainer: should not call fetchHydratedJqlOptions on search if query mode is basic', async () => {
		const renderResult = setup({
			parameters: {
				cloudId: 'test-cloud-id',
				filter: 'status',
			},
		});
		const { getByTestId, mockFetchHydratedJqlOptions } = renderResult;

		await setupBasicFilter({
			...renderResult,
			filterType: 'project',
			openPicker: false,
		});

		await userEvent.click(getByTestId('mode-toggle-basic'));
		const basicTextInput = getByTestId('jira-datasource-modal--basic-search-input');
		await userEvent.type(basicTextInput, 'testing');
		await userEvent.keyboard('{Enter}');

		await userEvent.click(getByTestId('jira-datasource-modal--basic-search-button'));

		expect(mockFetchHydratedJqlOptions).toHaveBeenCalledTimes(0);
	});

	it('BasicFilterContainer: should call fetchHydratedJqlOptions on initial dialog render if query is not complex and is not the default JQL query', async () => {
		const renderResult = setup({
			parameters: {
				cloudId: 'test-cloud-id',
				jql: 'status=DONE',
			},
			searchBarJql: 'status=DONE',
		});
		const { mockFetchHydratedJqlOptions } = renderResult;

		expect(mockFetchHydratedJqlOptions).toHaveBeenCalledTimes(1);
	});

	it('BasicFilterContainer: should show the loading state for trigger button when hydrating only if the corresponding field has value', async () => {
		const renderResult = setup({
			parameters: {
				cloudId: 'test-cloud-id',
				jql: 'status=DONE and project=Test',
			},
			hydrationStatus: 'loading',
			searchBarJql: 'status=DONE and project=Test',
		});

		const { getByTestId } = renderResult;

		await setupBasicFilter(renderResult);

		expect(getByTestId('jlol-basic-filter-status-trigger--loading-button')).toBeInTheDocument();
		expect(getByTestId('jlol-basic-filter-project-trigger--loading-button')).toBeInTheDocument();

		expect(getByTestId('jlol-basic-filter-assignee-trigger--button')).toBeInTheDocument();
		expect(getByTestId('jlol-basic-filter-type-trigger--button')).toBeInTheDocument();
	});

	it('BasicFilterContainer: should not show the loading state for trigger button if jql is empty', async () => {
		const renderResult = setup({
			parameters: {
				cloudId: 'test-cloud-id',
				jql: '',
			},
		});

		await setupBasicFilter(renderResult);

		availableBasicFilterTypes.forEach((filter) => {
			expect(
				screen.queryByTestId(`jlol-basic-filter-${filter}-trigger--loading-button`),
			).not.toBeInTheDocument();
			expect(
				screen.queryByTestId(`jlol-basic-filter-${filter}-trigger--button`),
			).toBeInTheDocument();
		});
	});

	it('BasicFilterContainer: should not call fetchHydratedJqlOptions on initial dialog render if query is the default JQL query', async () => {
		const renderResult = setup({
			parameters: {
				cloudId: 'test-cloud-id',
				jql: 'ORDER BY created DESC',
			},
			searchBarJql: 'ORDER BY created DESC',
		});
		const { mockFetchHydratedJqlOptions } = renderResult;

		expect(mockFetchHydratedJqlOptions).toHaveBeenCalledTimes(0);
	});

	it('BasicFilterContainer: should persist filter values when calling onSearch after an input is entered', async () => {
		const renderResult = setup();

		const { mockOnSearch, getByTestId, rerender, mockSetSearchBarJql } = renderResult;

		const { triggerButton } = await setupBasicFilter({
			...renderResult,
		});

		const selectMenu = await screen.findByTestId('jlol-basic-filter-status-popup-select--menu');

		const [firstOption] = within(selectMenu).queryAllByTestId(
			'basic-filter-popup-select-option--lozenge',
		);

		await userEvent.click(firstOption);

		// Close menu
		invariant(triggerButton);
		await userEvent.click(triggerButton);

		const basicTextInput = getByTestId('jira-datasource-modal--basic-search-input');
		await userEvent.type(basicTextInput, 'testing');
		await userEvent.keyboard('{Enter}');

		expect(mockSetSearchBarJql).toHaveBeenCalledWith(
			'(text ~ "testing*" or summary ~ "testing*") and status in (Authorize) ORDER BY created DESC',
		);

		// re-render the component with new search bar jql since the state is stored and updated in the parent
		rerenderHelper(rerender, {
			onSearch: mockOnSearch,
			initialSearchMethod: 'basic',
			searchBarJql:
				'(text ~ "testing*" or summary ~ "testing*") and status in (Authorize) ORDER BY created DESC',
		});

		await userEvent.click(getByTestId('jira-datasource-modal--basic-search-button'));

		expect(mockOnSearch).toHaveBeenCalledWith(
			{
				jql: '(text ~ "testing*" or summary ~ "testing*") and status in (Authorize) ORDER BY created DESC',
			},
			{
				searchMethod: 'basic',
				isQueryComplex: false,
				basicFilterSelections: {
					status: [
						{
							appearance: 'inprogress',
							label: 'Authorize',
							optionType: 'lozengeLabel',
							value: 'Authorize',
						},
					],
				},
			},
		);
	});

	it('BasicFilterContainer: should update jql query in JQL mode when the query changes in basic mode', async () => {
		const expectedJql =
			'(text ~ "testing*" or summary ~ "testing*") and status in (Authorize) ORDER BY created DESC';
		const renderResult = setup();

		const { mockOnSearch, getByTestId, getLatestJQLEditorProps, rerender, mockSetSearchBarJql } =
			renderResult;

		const { triggerButton } = await setupBasicFilter({
			...renderResult,
		});

		const selectMenu = await screen.findByTestId('jlol-basic-filter-status-popup-select--menu');

		const [firstOption] = within(selectMenu).queryAllByTestId(
			'basic-filter-popup-select-option--lozenge',
		);

		await userEvent.click(firstOption);

		// Close menu
		invariant(triggerButton);
		await userEvent.click(triggerButton);

		const basicTextInput = getByTestId('jira-datasource-modal--basic-search-input');
		await userEvent.type(basicTextInput, 'testing');
		await userEvent.keyboard('{Enter}');

		expect(mockSetSearchBarJql).toHaveBeenCalledWith(expectedJql);

		// re-render the component with new search bar jql since the state is stored and updated in the parent
		rerenderHelper(rerender, {
			onSearch: mockOnSearch,
			initialSearchMethod: 'basic',
			searchBarJql: expectedJql,
		});

		await userEvent.click(getByTestId('jira-datasource-modal--basic-search-button'));

		expect(mockOnSearch).toHaveBeenCalledWith(
			{
				jql: expectedJql,
			},
			{
				searchMethod: 'basic',
				isQueryComplex: false,
				basicFilterSelections: {
					status: [
						{
							appearance: 'inprogress',
							label: 'Authorize',
							optionType: 'lozengeLabel',
							value: 'Authorize',
						},
					],
				},
			},
		);

		await userEvent.click(getByTestId('mode-toggle-jql'));

		expect(getLatestJQLEditorProps().query).toEqual(expectedJql);
	});

	it('BasicFilterContainer: should pre-populate basic mode search text hydrate returns input text', async () => {
		const renderResult = setup({
			hydratedOptions: {
				basicInputTextValue: 'hello',
			},
		});

		await setupBasicFilter({ ...renderResult, openPicker: false });

		expect(screen.queryByTestId('jira-datasource-modal--basic-search-input')).toHaveValue('hello');
	});

	it('should capture and report a11y violations', async () => {
		const { container } = setup();

		await expect(container).toBeAccessible();
	});
});

describe('Analytics: JiraSearchContainer', () => {
	beforeEach(() => {
		jest.clearAllMocks();
	});

	describe('ui.form.submitted.basicSearch', () => {
		it('should fire event on search button click', async () => {
			const { getByTestId } = setup();

			await userEvent.click(getByTestId('mode-toggle-basic'));
			const basicTextInput = getByTestId('jira-datasource-modal--basic-search-input');
			await userEvent.type(basicTextInput, 'testing');

			await userEvent.click(getByTestId('jira-datasource-modal--basic-search-button'));

			expect(onAnalyticFireEvent).toBeFiredWithAnalyticEventOnce(
				{
					payload: {
						action: 'submitted',
						actionSubject: 'form',
						actionSubjectId: 'basicSearch',
						attributes: {},
						eventType: 'ui',
					},
				},
				EVENT_CHANNEL,
			);
		});

		it('should fire event on enter key press', async () => {
			const { getByTestId } = setup();

			await userEvent.click(getByTestId('mode-toggle-basic'));
			const basicTextInput = getByTestId('jira-datasource-modal--basic-search-input');
			await userEvent.type(basicTextInput, 'testing');
			await userEvent.keyboard('{Enter}');

			expect(onAnalyticFireEvent).toBeFiredWithAnalyticEventOnce(
				{
					payload: {
						action: 'submitted',
						actionSubject: 'form',
						actionSubjectId: 'basicSearch',
						attributes: {},
						eventType: 'ui',
					},
				},
				EVENT_CHANNEL,
			);
		});
	});

	it('should fire "ui.jqlEditor.searched" with correct attributes when search is initiated via jql input and query is not complex', async () => {
		const { getLatestJQLEditorProps, getByTestId } = setup();

		await userEvent.click(getByTestId('mode-toggle-jql'));

		getLatestJQLEditorProps().onSearch!('some-other-query', {
			represents: '',
			errors: [],
			query: undefined,
		});

		expect(onAnalyticFireEvent).toBeFiredWithAnalyticEventOnce(
			{
				payload: {
					action: 'searched',
					actionSubject: 'jqlEditor',
					attributes: {
						isQueryComplex: false,
					},
					eventType: 'ui',
				},
			},
			EVENT_CHANNEL,
		);
	});

	it('should fire "ui.jqlEditor.searched" with correct attributes when search is initiated via jql input and query is complex', async () => {
		const { getLatestJQLEditorProps, getByTestId, rerender, mockSetSearchBarJql } = setup();

		await userEvent.click(getByTestId('mode-toggle-jql'));

		act(() => {
			getLatestJQLEditorProps().onUpdate!('resoulution=none', {
				represents: '',
				errors: [],
				query: undefined,
			});
		});

		expect(mockSetSearchBarJql).toHaveBeenCalledWith('resoulution=none');

		// re-render the component with new search bar jql since the state is stored and updated in the parent
		rerenderHelper(rerender, { searchBarJql: 'resoulution=none' });

		getLatestJQLEditorProps().onSearch!('resoulution=done', {
			represents: '',
			errors: [],
			query: undefined,
		});

		expect(onAnalyticFireEvent).toBeFiredWithAnalyticEventOnce(
			{
				payload: {
					action: 'searched',
					actionSubject: 'jqlEditor',
					attributes: {
						isQueryComplex: true,
					},
					eventType: 'ui',
				},
			},
			EVENT_CHANNEL,
		);
	});
});
