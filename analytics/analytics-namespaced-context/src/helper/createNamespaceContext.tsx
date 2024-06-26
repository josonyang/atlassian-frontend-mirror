import React from 'react';
import { AnalyticsContext } from '@atlaskit/analytics-next';

export type Props = React.PropsWithChildren<{
	data: {};
}>;

const createNamespaceContext = <T extends Props>(
	namespace: string,
	displayName = 'NamespacedContext',
) => {
	const Component = (props: T) => {
		const newData = {
			[namespace]: props.data,
		};
		return (
			<AnalyticsContext data={newData}>{React.Children.only(props.children)}</AnalyticsContext>
		);
	};
	Component.displayName = displayName;
	return Component;
};

export default createNamespaceContext;
