// If you make any change here, copy it to above file as well
//  and notify about the change in #team-fc-editor-ai-dev channel.
import React from 'react';

import Button from '@atlaskit/button/standard-button';
import type { ButtonProps } from '@atlaskit/button/standard-button';
import { expValEquals } from '@atlaskit/tmp-editor-statsig/exp-val-equals';

const toolbarButtonStyle = {
	alignItems: 'center',
};

const _default_1: React.ForwardRefExoticComponent<ButtonProps & React.RefAttributes<HTMLElement>> =
	React.forwardRef<HTMLElement, ButtonProps>((props, ref) => {
		return (
			<Button
				ref={ref}
				// Ignored via go/ees005
				// eslint-disable-next-line react/jsx-props-no-spreading
				{...props}
				// Ignored via go/ees007
				// eslint-disable-next-line @atlaskit/editor/enforce-todo-comment-format
				// TODO: (from codemod) Buttons with "component", "css" or "style" prop can't be automatically migrated with codemods. Please migrate it manually.
				// eslint-disable-next-line @atlaskit/ui-styling-standard/enforce-style-prop
				style={
					expValEquals('platform_editor_perf_lint_cleanup', 'isEnabled', true)
						? toolbarButtonStyle
						: {
								alignItems: 'center',
						  }
				}
			/>
		);
	});
export default _default_1;
