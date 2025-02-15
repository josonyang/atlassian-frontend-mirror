import React from 'react';

import { type ActivityProvider } from '@atlaskit/activity-provider';

import { type ProviderFactory, WithProviders } from '../../provider-factory';
// eslint-disable-next-line no-duplicate-imports
import type { Providers } from '../../provider-factory';
import type { Diff } from '../../utils';

export interface ExpandedActivityProviderProps {
	providerFactory: ProviderFactory;
}

export interface WithActivityProviderProps {
	activityProvider: ActivityProvider;
}

export default function withActivityProvider<Props>(
	WrappedComponent: React.ComponentType<React.PropsWithChildren<Props & WithActivityProviderProps>>,
) {
	return class WithActivityProvider extends React.Component<
		Diff<Props, WithActivityProviderProps> & ExpandedActivityProviderProps
	> {
		renderNode = (providers: Providers) => {
			const { providerFactory, ...props } = this.props as ExpandedActivityProviderProps;
			const { activityProvider } = providers;

			// Ignored via go/ees005
			// eslint-disable-next-line @typescript-eslint/no-explicit-any, react/jsx-props-no-spreading
			return <WrappedComponent activityProvider={activityProvider as any} {...(props as Props)} />;
		};

		render() {
			const { providerFactory } = this.props;
			return (
				<WithProviders
					providers={['activityProvider']}
					providerFactory={providerFactory}
					renderNode={this.renderNode}
				/>
			);
		}
	};
}
