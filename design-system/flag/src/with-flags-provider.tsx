import React from 'react';

import { FlagsProvider } from './flags-provider';

// eslint-disable-next-line @atlaskit/volt-strict-mode/no-multiple-exports
export const withFlagsProvider: (fn: () => React.ReactNode) => React.JSX.Element = (
	fn: () => React.ReactNode,
): React.JSX.Element => <FlagsProvider>{fn()}</FlagsProvider>;
