/**
 * @jsxRuntime classic
 * @jsx jsx
 */
import { useMemo, useState } from 'react';

import { css, jsx } from '@compiled/react';

import Button from '@atlaskit/button/new';
import {
	DatasourceTableView,
	JIRA_LIST_OF_LINKS_DATASOURCE_ID,
	JiraIssuesConfigModal,
} from '@atlaskit/link-datasource';
import { CardClient as SmartCardClient, SmartCardProvider } from '@atlaskit/link-provider';
import { forceBaseUrl } from '@atlaskit/link-test-helpers/datasource';
import { type DatasourceAdf, type InlineCardAdf } from '@atlaskit/linking-common/types';
import { Card } from '@atlaskit/smart-card';

import {
	type JiraIssueDatasourceParameters,
	type JiraIssuesDatasourceAdf,
} from '../src/ui/jira-issues-modal/types';

const tableContainerStyles = css({
	width: '700px',
	height: '400px',
	overflow: 'scroll',
});

forceBaseUrl('https://pug.jira-dev.com');

export default () => {
	const [generatedAdf, setGeneratedAdf] = useState<
		InlineCardAdf | JiraIssuesDatasourceAdf | DatasourceAdf | null
	>(null);
	const [showModal, setShowModal] = useState(true);
	const [parameters, setParameters] = useState<JiraIssueDatasourceParameters | undefined>(
		undefined,
	);
	const [visibleColumnKeys, setVisibleColumnKeys] = useState<string[] | undefined>(undefined);
	const toggleIsOpen = () => setShowModal((prevOpenState) => !prevOpenState);
	const closeModal = () => setShowModal(false);

	const onInsert = (adf: InlineCardAdf | JiraIssuesDatasourceAdf | DatasourceAdf) => {
		if (adf.type === 'blockCard') {
			setParameters(adf.attrs.datasource.parameters as JiraIssueDatasourceParameters);
			setVisibleColumnKeys(adf.attrs.datasource.views[0].properties?.columns.map((c) => c.key));
		}
		setGeneratedAdf(adf);
		closeModal();
	};

	const resultingComponent = useMemo(() => {
		if (!generatedAdf) {
			return null;
		}

		if (generatedAdf.type === 'blockCard') {
			if (parameters) {
				return (
					<div>
						<div css={tableContainerStyles}>
							In renderer:
							<DatasourceTableView
								datasourceId={generatedAdf.attrs.datasource.id}
								parameters={parameters}
								visibleColumnKeys={visibleColumnKeys}
								onVisibleColumnKeysChange={undefined} // readonly
							/>
						</div>
						<div css={tableContainerStyles}>
							In Editor:
							<DatasourceTableView
								datasourceId={generatedAdf.attrs.datasource.id}
								parameters={parameters}
								visibleColumnKeys={visibleColumnKeys}
								onVisibleColumnKeysChange={setVisibleColumnKeys}
							/>
						</div>
					</div>
				);
			}
		} else {
			return <Card url={generatedAdf.attrs.url} appearance={'inline'} />;
		}
	}, [generatedAdf, parameters, visibleColumnKeys]);

	return (
		<SmartCardProvider client={new SmartCardClient('staging')}>
			<Button appearance="primary" onClick={toggleIsOpen}>
				Toggle Modal
			</Button>
			{resultingComponent}
			{showModal && (
				<JiraIssuesConfigModal
					datasourceId={JIRA_LIST_OF_LINKS_DATASOURCE_ID}
					visibleColumnKeys={visibleColumnKeys}
					parameters={parameters}
					onCancel={closeModal}
					onInsert={onInsert}
				/>
			)}
		</SmartCardProvider>
	);
};
