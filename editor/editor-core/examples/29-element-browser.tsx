/**
 * @jsxRuntime classic
 * @jsx jsx
 */
import { useCallback } from 'react';

// eslint-disable-next-line @atlaskit/ui-styling-standard/use-compiled -- Ignored via go/DSP-18766
import { css, jsx } from '@emotion/react';
import type { WrappedComponentProps } from 'react-intl-next';
import { injectIntl, IntlProvider } from 'react-intl-next';

import type { AnalyticsEventPayload } from '@atlaskit/analytics-next';
import { AnalyticsListener } from '@atlaskit/analytics-next';
import { ElementBrowser } from '@atlaskit/editor-common/element-browser';
import type { QuickInsertItem } from '@atlaskit/editor-common/provider-factory';

import { getCategories } from '../example-helpers/quick-insert-categories';
import { useDefaultQuickInsertGetItems } from '../example-helpers/use-default-quickinsert-get-items';
import { default as EditorContext } from '../src/ui/EditorContext';

const wrapper = css({
	display: 'flex',
	height: '100%',
});

const onInsertItem = (item: QuickInsertItem) => {
	console.log('Inserting item ', item);
};
const RenderElementBrowser = (
	props: {
		getItems: (query?: string, category?: string) => QuickInsertItem[];
	} & WrappedComponentProps,
) => (
	<div css={wrapper}>
		<ElementBrowser
			categories={getCategories(props.intl)}
			getItems={props.getItems}
			showSearch={true}
			showCategories={true}
			mode="full"
			defaultCategory="all"
			onInsertItem={onInsertItem}
		/>
	</div>
);

const ElementBrowserWithIntl = injectIntl(RenderElementBrowser);

const ElementBrowserComp = () => {
	const getItems = useDefaultQuickInsertGetItems();
	const handleAnalytics = useCallback((event: AnalyticsEventPayload) => {
		console.groupCollapsed('gasv3 event:', event.payload.action);
		console.log(event.payload);
		console.groupEnd();
	}, []);

	return (
		<AnalyticsListener channel="editor" onEvent={handleAnalytics}>
			<IntlProvider locale="en">
				<ElementBrowserWithIntl getItems={getItems} />
			</IntlProvider>
		</AnalyticsListener>
	);
};

export default () => (
	<EditorContext>
		<ElementBrowserComp />
	</EditorContext>
);
