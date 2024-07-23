/**
 * @jsxRuntime classic
 * @jsx jsx
 */
// eslint-disable-next-line @atlaskit/ui-styling-standard/use-compiled -- Ignored via go/DSP-18766
import { jsx } from '@emotion/react';

import { wrapperStyles, actionsBarClassName } from './styles';
import { type ActionBarWrapperProps } from './types';

export const ActionsBarWrapper = (props: ActionBarWrapperProps) => {
	return (
		<div
			id="actionsBarWrapper"
			// eslint-disable-next-line @atlaskit/design-system/consistent-css-prop-usage, @atlaskit/ui-styling-standard/no-imported-style-values -- Ignored via go/DSP-18766
			css={wrapperStyles(props.isFixed)}
			// eslint-disable-next-line @atlaskit/ui-styling-standard/no-classname-prop -- Ignored via go/DSP-18766
			className={actionsBarClassName}
		>
			{props.children}
		</div>
	);
};
