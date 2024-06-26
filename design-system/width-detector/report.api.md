<!-- API Report Version: 2.3 -->

## API Report File for "@atlaskit/width-detector"

> Do not edit this file. This report is auto-generated using
> [API Extractor](https://api-extractor.com/).
> [Learn more about API reports](https://hello.atlassian.net/wiki/spaces/UR/pages/1825484529/Package+API+Reports)

### Table of contents

- [Main Entry Types](#main-entry-types)
- [Peer Dependencies](#peer-dependencies)

### Main Entry Types

<!--SECTION START: Main Entry Types-->

```ts
import { default as React_2 } from 'react';

// @public (undocumented)
type Props = {
	children: (width?: number) => React_2.ReactNode;
	onResize?: (width: number) => void;
	containerStyle?: React_2.CSSProperties;
};

// @public (undocumented)
type ResizeObject = HTMLObjectElement & {
	data: String;
	contentDocument: HTMLDocument;
};

// @public (undocumented)
type State = {
	width?: number;
};

// @public @deprecated (undocumented)
class WidthDetector extends React_2.Component<Props, State> {
	constructor(props: Props);
	// (undocumented)
	componentDidMount(): void;
	// (undocumented)
	componentWillUnmount(): void;
	// (undocumented)
	container?: HTMLDivElement;
	// (undocumented)
	static defaultProps: {
		containerStyle: {};
	};
	// (undocumented)
	handleContainerRef: (ref: HTMLDivElement) => void;
	// (undocumented)
	handleObjectLoad: () => void;
	// (undocumented)
	handleObjectRef: (ref: ResizeObject) => void;
	// (undocumented)
	handleResize: (() => void) & {
		cancel(): void;
	};
	// (undocumented)
	render(): JSX.Element;
	// (undocumented)
	resizeObject?: ResizeObject;
	// (undocumented)
	resizeObjectDocument?: Window;
	// (undocumented)
	state: State;
}
export default WidthDetector;

// @public
export const WidthObserver: React_2.MemoExoticComponent<(props: WidthObserverProps) => JSX.Element>;

// @public (undocumented)
type WidthObserverProps = {
	setWidth: (width: number) => void;
	offscreen?: boolean;
};

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
