<!-- API Report Version: 2.3 -->

## API Report File for "@atlaskit/progress-tracker"

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

import { jsx } from '@emotion/react';
import { PureComponent } from 'react';

// @public (undocumented)
interface LinkComponentProps {
	// (undocumented)
	item: Stage;
}

// @public (undocumented)
export class ProgressTracker extends PureComponent<ProgressTrackerProps, State> {
	// (undocumented)
	static defaultProps: {
		items: never[];
		spacing: string;
		render: {
			link: ({ item }: LinkComponentProps) => jsx.JSX.Element;
		};
		animated: boolean;
		label: string;
	};
	// (undocumented)
	render(): jsx.JSX.Element;
	// (undocumented)
	state: {
		prevStages: {
			percentageComplete: number;
			id: string;
			label: string;
			status: Status;
			noLink?: boolean | undefined;
			href?: string | undefined;
			onClick?: (() => void) | undefined;
		}[];
	};
	// (undocumented)
	UNSAFE_componentWillReceiveProps(nextProps: ProgressTrackerProps): void;
}

// @public (undocumented)
export interface ProgressTrackerProps {
	animated: boolean;
	items: Stages;
	label?: string;
	render: ProgressTrackerStageRenderProp;
	spacing: Spacing;
	testId?: string;
}

// @public (undocumented)
interface ProgressTrackerStageRenderProp {
	// (undocumented)
	link: (props: LinkComponentProps) => JSX.Element;
}

// @public (undocumented)
type Spacing = keyof typeof spacing;

// @public
const spacing: {
	readonly comfortable: 'var(--ds-space-500)';
	readonly cosy: 'var(--ds-space-200)';
	readonly compact: 'var(--ds-space-050)';
};

// @public (undocumented)
export interface Stage {
	// (undocumented)
	href?: string;
	// (undocumented)
	id: string;
	// (undocumented)
	label: string;
	// (undocumented)
	noLink?: boolean;
	// (undocumented)
	onClick?: () => void;
	// (undocumented)
	percentageComplete: number;
	// (undocumented)
	status: Status;
}

// @public (undocumented)
export type Stages = Stage[];

// @public (undocumented)
interface State {
	// (undocumented)
	prevStages: Stages;
}

// @public (undocumented)
type Status = 'current' | 'disabled' | 'unvisited' | 'visited';

// (No @packageDocumentation comment for this package)
```

<!--SECTION END: Main Entry Types-->

### Peer Dependencies

<!--SECTION START: Peer Dependencies-->

```json
{
	"react": "^16.8.0"
}
```

<!--SECTION END: Peer Dependencies-->
