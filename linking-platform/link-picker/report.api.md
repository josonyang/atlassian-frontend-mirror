<!-- API Report Version: 2.3 -->

## API Report File for "@atlaskit/link-picker"

> Do not edit this file. This report is auto-generated using
> [API Extractor](https://api-extractor.com/).
> [Learn more about API reports](https://hello.atlassian.net/wiki/spaces/UR/pages/1825484529/Package+API+Reports)

### Table of contents

- [Main Entry Types](#main-entry-types)
- [Peer Dependencies](#peer-dependencies)

### Main Entry Types

<!--SECTION START: Main Entry Types-->

```ts
/// <reference types="react" />

import { jsx } from '@compiled/react';
import { MessageDescriptor } from 'react-intl-next';
import { default as React_2 } from 'react';
import { ReactNode } from 'react';
import { UIAnalyticsEvent } from '@atlaskit/analytics-next';

// @public (undocumented)
export type LinkInputType = 'manual' | 'typeAhead';

// @public (undocumented)
export const LinkPicker: React_2.MemoExoticComponent<(props: LinkPickerProps) => jsx.JSX.Element>;

// @public (undocumented)
export interface LinkPickerPlugin {
	action?: LinkPickerPluginAction;
	emptyStateNoResults?: LinkPickerPluginEmptyStateNoResults;
	errorFallback?: LinkPickerPluginErrorFallback;
	meta?: {
		source?: string;
	};
	// (undocumented)
	resolve: (
		state: LinkPickerState,
	) => AsyncGenerator<ResolveResult, ResolveResult> | Promise<ResolveResult>;
	tabKey?: string;
	tabTitle?: string;
	UNSAFE_onActivation?: () => void;
}

// @public (undocumented)
export interface LinkPickerPluginAction {
	// (undocumented)
	callback: () => void;
	// (undocumented)
	label: MessageDescriptor | string;
}

// @public (undocumented)
export type LinkPickerPluginEmptyStateNoResults = () => ReactNode;

// @public (undocumented)
export type LinkPickerPluginErrorFallback = (error: unknown, retry: () => void) => ReactNode;

// @public (undocumented)
export interface LinkPickerProps {
	component?: React.ComponentType<
		Partial<LinkPickerProps> & {
			children: React.ReactElement;
		}
	>;
	disableWidth?: boolean;
	displayText?: null | string;
	// (undocumented)
	featureFlags?: Record<string, unknown>;
	hideDisplayText?: boolean;
	isLoadingPlugins?: boolean;
	onCancel: () => void;
	onContentResize?: () => void;
	onSubmit: (arg: OnSubmitParameter, analytic?: UIAnalyticsEvent | null) => void;
	paddingBottom?: string;
	paddingLeft?: string;
	paddingRight?: string;
	paddingTop?: string;
	plugins?: LinkPickerPlugin[];
	url?: string;
}

// @public (undocumented)
export interface LinkPickerState {
	query: string;
}

// @public (undocumented)
export interface LinkSearchListItemData {
	container?: string;
	icon:
		| React.ComponentType<{
				alt: string;
		  }>
		| string;
	iconAlt: MessageDescriptor | string;
	lastUpdatedDate?: Date;
	lastViewedDate?: Date;
	meta?: {
		source?: string;
	};
	name: string;
	objectId: string;
	prefetch?: boolean;
	url: string;
}

// @public (undocumented)
interface Meta {
	inputMethod: LinkInputType;
}

// @public (undocumented)
interface OnSubmitParameter {
	displayText: null | string;
	meta: Meta;
	rawUrl?: string;
	title: null | string;
	url: string;
}

// @public (undocumented)
interface ResolveResult {
	// (undocumented)
	data: LinkSearchListItemData[];
}

// @public (undocumented)
export class UnauthenticatedError extends Error {
	constructor(iconUrl: string, authUrl: string, description: string);
	// (undocumented)
	authUrl: string;
	// (undocumented)
	description: string;
	// (undocumented)
	iconUrl: string;
}

// (No @packageDocumentation comment for this package)
```

<!--SECTION END: Main Entry Types-->

### Peer Dependencies

<!--SECTION START: Peer Dependencies-->

```json
{
	"react": "^16.8.0",
	"react-intl-next": "npm:react-intl@^5.18.1"
}
```

<!--SECTION END: Peer Dependencies-->
