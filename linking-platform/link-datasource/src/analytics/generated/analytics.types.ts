/**
 * THIS FILE WAS CREATED VIA CODEGEN DO NOT MODIFY {@see http://go/af-codegen}
 *
 * Generates Typescript types for analytics events from analytics.spec.yaml
 *
 * @codegen <<SignedSource::6b271484f56c37f6170c6468edcab44c>>
 * @codegenCommand yarn workspace @atlassian/analytics-tooling run analytics:codegen link-datasource
 */
export type ComponentMetaDataType = {
	component: string;
};
export type AnalyticsContextType = {
	source: 'datasourceConfigModal';
};
export type AnalyticsContextAttributesType = {
	dataProvider: 'jira-issues' | 'jsm-assets' | 'confluence-search';
};

export type DatasourceModalDialogViewedAttributesType = {};
export type ModalReadyDatasourceAttributesType = {
	instancesCount: number | null;
	schemasCount: number | null;
};
export type JqlEditorSearchedAttributesType = {
	isQueryComplex: boolean;
};
export type FormSubmittedBasicSearchAttributesType = {};
export type EmptyResultShownDatasourceAttributesType = {};
export type ErrorShownAttributesType = {
	reason: 'network' | 'access';
};
export type ButtonClickedSyncAttributesType = {
	extensionKey: string | null;
	destinationObjectTypes: unknown[];
};
export type ButtonClickedInsertAttributesType = {
	searchCount: number;
	totalItemCount: number;
	displayedColumnCount: number | null;
	display: 'datasource_inline' | 'datasource_table' | 'inline';
	destinationObjectTypes: unknown[];
	searchMethod:
		| 'datasource_search_query'
		| 'datasource_basic_filter'
		| 'datasource_saved_filter'
		| null;
	extensionKey: string | null;
	actions: unknown[];
	isQueryComplex: boolean;
	projectBasicFilterSelectionCount: number;
	statusBasicFilterSelectionCount: number;
	typeBasicFilterSelectionCount: number;
	assigneeBasicFilterSelectionCount: number;
};
export type ButtonClickedCancelAttributesType = {
	searchCount: number;
	destinationObjectTypes: unknown[];
	extensionKey: string | null;
	actions: unknown[];
};
export type ButtonClickedWrapAttributesType = {};
export type ButtonClickedUnwrapAttributesType = {};
export type LinkClickedSingleItemAttributesType = {
	extensionKey: string | null;
	destinationObjectTypes: unknown[];
};
export type DatasourceRenderSuccessAttributesType = {
	totalItemCount: number;
	destinationObjectTypes: unknown[];
	displayedColumnCount: number | null;
	extensionKey: string | null;
	display: 'table';
};
export type DatasourceRenderFailureAttributesType = {};
export type DatasourceOperationFailedAttributesType = {
	errorLocation:
		| 'ProviderOnAuthRequest'
		| 'loadDatasourceDetails'
		| 'onNextPage'
		| 'actionDiscovery'
		| 'actionExecution'
		| 'fetchActionExecution'
		| null;
	traceId: string | null;
	status: number | null;
	reason: 'response' | 'network' | 'internal' | 'unknown' | null;
};
export type ProviderAuthSuccessAttributesType = {
	extensionKey: string | null;
	experience: 'datasource';
};
export type ProviderAuthFailureAttributesType = {
	extensionKey: string | null;
	experience: 'datasource';
	reason:
		| 'auth_window_closed'
		| 'invalid_request'
		| 'unauthorized_client'
		| 'access_denied'
		| 'unsupported_response_type'
		| 'invalid_scope'
		| 'server_error'
		| 'temporarily_unavailable'
		| 'authclientoauth2.autherror'
		| null;
};
export type NextItemLoadedAttributesType = {
	destinationObjectTypes: unknown[];
	extensionKey: string | null;
	loadedItemCount: number;
};
export type TableViewedDatasourceConfigModalAttributesType = {
	destinationObjectTypes: unknown[];
	totalItemCount: number;
	displayedColumnCount: number | null;
	searchMethod:
		| 'datasource_search_query'
		| 'datasource_basic_filter'
		| 'datasource_saved_filter'
		| null;
	extensionKey: string | null;
};
export type LinkViewedSingleItemAttributesType = {
	destinationObjectTypes: unknown[];
	searchMethod:
		| 'datasource_search_query'
		| 'datasource_basic_filter'
		| 'datasource_saved_filter'
		| null;
	extensionKey: string | null;
};
export type LinkViewedCountAttributesType = {
	destinationObjectTypes: unknown[];
	searchMethod:
		| 'datasource_search_query'
		| 'datasource_basic_filter'
		| 'datasource_saved_filter'
		| null;
	totalItemCount: number;
	extensionKey: string | null;
};
export type EmptyResultShownBasicSearchDropdownAttributesType = {
	filterName: string;
};
export type ErrorShownBasicSearchDropdownAttributesType = {
	filterName: string;
	reason: 'agg' | 'network' | 'unknown';
};
export type DropdownOpenedBasicSearchDropdownAttributesType = {
	filterName: string;
	selectionCount: number;
};
export type DropdownClosedBasicSearchDropdownAttributesType = {
	filterName: string;
	selectionCount: number;
};
export type ButtonClickedBasicSearchDropdownAttributesType = {
	filterName: string;
	type: 'showMore';
};
export type AqlEditorSearchedAttributesType = {};
export type LinkClickedPoweredByAttributesType = {};
export type GetWorkspaceIdSuccessAttributesType = {};
export type GetWorkspaceIdFailedAttributesType = {
	statusCodeGroup: '1xx' | '3xx' | '4xx' | '5xx' | 'unknown';
};
export type ValidateAqlSuccessAttributesType = {};
export type ValidateAqlFailedAttributesType = {
	statusCodeGroup: '1xx' | '3xx' | '4xx' | '5xx' | 'unknown';
};
export type ObjectSchemaSuccessAttributesType = {};
export type ObjectSchemaFailedAttributesType = {
	statusCodeGroup: '1xx' | '3xx' | '4xx' | '5xx' | 'unknown';
};
export type ObjectSchemasSuccessAttributesType = {};
export type ObjectSchemasFailedAttributesType = {
	statusCodeGroup: '1xx' | '3xx' | '4xx' | '5xx' | 'unknown';
};
export type ActionExecutionSuccessAttributesType = {
	integrationKey: string;
	experience: 'datasource';
};
export type FetchActionExecutionSuccessAttributesType = {
	integrationKey: string;
	experience: 'datasource';
};
export type ActionDiscoverySuccessAttributesType = {
	experience: 'datasource';
	entityType: string;
	integrationKey: string | null;
	datasourceId: string | null;
};
export type FormSubmittedInlineEditAttributesType = {};
export type InlineEditClickedDatasourceAttributesType = {
	entityType: string;
	integrationKey: string;
	fieldKey: string;
};
export type InlineEditCancelledDatasourceAttributesType = {
	entityType: string;
	integrationKey: string;
	fieldKey: string;
};
export type ErrorShownInlineEditAttributesType = {
	reason: 'access_denied' | 'request_failed';
};

export type AnalyticsEventAttributes = {
	/**
	 * Fires when user sees modal dialog. */
	'screen.datasourceModalDialog.viewed': DatasourceModalDialogViewedAttributesType;
	/**
	 * Fires when the datasource modal is ready for searching and displaying search results. */
	'ui.modal.ready.datasource': ModalReadyDatasourceAttributesType;
	/**
	 * Fires when search is initiated via the search icon or enter key press for jql editor input field. */
	'ui.jqlEditor.searched': JqlEditorSearchedAttributesType;
	/**
	 * Fires when search is initiated via the search icon or enter key press from the basic input textfield. */
	'ui.form.submitted.basicSearch': FormSubmittedBasicSearchAttributesType;
	/**
	 * Fires when datasource results are empty. */
	'ui.emptyResult.shown.datasource': EmptyResultShownDatasourceAttributesType;
	/**
	 * Fires when datasource errors state is shown. */
	'ui.error.shown': ErrorShownAttributesType;
	/**
	 * Fired when user clicks on datasource table sync button */
	'ui.button.clicked.sync': ButtonClickedSyncAttributesType;
	/**
	 * Fired on insert button click */
	'ui.button.clicked.insert': ButtonClickedInsertAttributesType;
	/**
	 * Fired on cancel button click */
	'ui.button.clicked.cancel': ButtonClickedCancelAttributesType;
	/**
	 * Fired on wrap button click */
	'ui.button.clicked.wrap': ButtonClickedWrapAttributesType;
	/**
	 * Fired on unwrap button click */
	'ui.button.clicked.unwrap': ButtonClickedUnwrapAttributesType;
	/**
	 * Fired when user clicks on datasource items */
	'ui.link.clicked.singleItem': LinkClickedSingleItemAttributesType;
	/**
	 * Fired when an inserted datasource resolves / renders. */
	'ui.datasource.renderSuccess': DatasourceRenderSuccessAttributesType;
	/**
	 * Fired when an inserted datasource fails to render */
	'operational.datasource.renderFailure': DatasourceRenderFailureAttributesType;
	/**
	 * Fired when a generic operation failed */
	'operational.datasource.operationFailed': DatasourceOperationFailedAttributesType;
	/**
	 * Fired when an auth provider connection is successful. */
	'operational.provider.authSuccess': ProviderAuthSuccessAttributesType;
	/**
	 * Fired when an auth provider connection failed to complete. */
	'operational.provider.authFailure': ProviderAuthFailureAttributesType;
	/**
	 * Fired when user scrolls to the next page/list of the objects */
	'track.nextItem.loaded': NextItemLoadedAttributesType;
	/**
	 * Fired when the datasource results are displayed as table inside of datasource configuration modal */
	'ui.table.viewed.datasourceConfigModal': TableViewedDatasourceConfigModalAttributesType;
	/**
	 * Fired when the datasource results are displayed as link(may be smart-link) for a single item */
	'ui.link.viewed.singleItem': LinkViewedSingleItemAttributesType;
	/**
	 * Fired when the datasource results are displayed as link( smart-link) in count mode. */
	'ui.link.viewed.count': LinkViewedCountAttributesType;
	/**
	 * Fired when the basic filter search results are empty */
	'ui.emptyResult.shown.basicSearchDropdown': EmptyResultShownBasicSearchDropdownAttributesType;
	/**
	 * Fired when the basic filter search dropdown shows an error UI */
	'ui.error.shown.basicSearchDropdown': ErrorShownBasicSearchDropdownAttributesType;
	/**
	 * Fired when the basic filter dropdown is opened */
	'ui.dropdown.opened.basicSearchDropdown': DropdownOpenedBasicSearchDropdownAttributesType;
	/**
	 * Fired when the basic filter dropdown is closed */
	'ui.dropdown.closed.basicSearchDropdown': DropdownClosedBasicSearchDropdownAttributesType;
	/**
	 * Fired when the “show more” button inside the dropdown menu is clicked */
	'ui.button.clicked.basicSearchDropdown': ButtonClickedBasicSearchDropdownAttributesType;
	/**
	 * Fired when search is initiated via the search icon or enter key press for aql editor input field. */
	'ui.aqlEditor.searched': AqlEditorSearchedAttributesType;
	/**
	 * Fired when the power by link on the issue like table footer is clicked. */
	'ui.link.clicked.poweredBy': LinkClickedPoweredByAttributesType;
	/**
	 * Fired when fetching a workspace Id is successful. */
	'operational.getWorkspaceId.success': GetWorkspaceIdSuccessAttributesType;
	/**
	 * Fired when fetching a workspace Id fails. */
	'operational.getWorkspaceId.failed': GetWorkspaceIdFailedAttributesType;
	/**
	 * Fired when making a request to validateAQL is successful. */
	'operational.validateAql.success': ValidateAqlSuccessAttributesType;
	/**
	 * Fired when making a request to validateAQL fails. */
	'operational.validateAql.failed': ValidateAqlFailedAttributesType;
	/**
	 * Fired when fetching an object schema is successful. */
	'operational.objectSchema.success': ObjectSchemaSuccessAttributesType;
	/**
	 * Fired when fetching an object schema fails. */
	'operational.objectSchema.failed': ObjectSchemaFailedAttributesType;
	/**
	 * Fired when fetching object schemas is successful. */
	'operational.objectSchemas.success': ObjectSchemasSuccessAttributesType;
	/**
	 * Fired when fetching object schemas fails. */
	'operational.objectSchemas.failed': ObjectSchemasFailedAttributesType;
	/**
	 * Fired when an atomic action execution is successful */
	'operational.actionExecution.success': ActionExecutionSuccessAttributesType;
	/**
	 * Fired when a fetch atomic action execution is successful */
	'operational.fetchActionExecution.success': FetchActionExecutionSuccessAttributesType;
	/**
	 * Fired when the action discovery and permissions request is successful. */
	'operational.actionDiscovery.success': ActionDiscoverySuccessAttributesType;
	/**
	 * Fired when the user initiates an update via inline edit through enter key press or submit */
	'ui.form.submitted.inlineEdit': FormSubmittedInlineEditAttributesType;
	/**
	 * Fired when inline edit is clicked to show edit mode */
	'ui.inlineEdit.clicked.datasource': InlineEditClickedDatasourceAttributesType;
	/**
	 * Fired when the user initiates an update via inline edit through enter key press or submit */
	'ui.inlineEdit.cancelled.datasource': InlineEditCancelledDatasourceAttributesType;
	/**
	 * Fired when the inline edit failed and the error flag is shown. */
	'ui.error.shown.inlineEdit': ErrorShownInlineEditAttributesType;
};

export type EventKey = keyof AnalyticsEventAttributes;
