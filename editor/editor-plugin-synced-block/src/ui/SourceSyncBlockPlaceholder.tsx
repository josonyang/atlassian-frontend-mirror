/**
 * @jsxRuntime classic
 * @jsx jsx
 */
import { useMemo } from 'react';

// Plugin content components need a global selector because the ProseMirror content is not a child
// of this component. This follows the existing layout placeholder pattern.
// eslint-disable-next-line @atlaskit/ui-styling-standard/no-global-styles, @atlaskit/ui-styling-standard/use-compiled, @typescript-eslint/consistent-type-imports
import { css, Global, jsx } from '@emotion/react';
import { useIntl } from 'react-intl';

import { placeholderTextMessages } from '@atlaskit/editor-common/messages';
import { BodiedSyncBlockSharedCssClassName } from '@atlaskit/editor-common/sync-block';
import { token } from '@atlaskit/tokens';

const getSourceSyncBlockPlaceholderStyles = (placeholderText: string) =>
	css({
		// ProseMirror represents an empty paragraph with a trailing break. Keeping this visual state
		// in CSS means typing, deletion, undo/redo, and remote changes update it without decorations.
		// :has() ensures the placeholder only appears when that trailing break is the paragraph's
		// only child, rather than when the paragraph contains editable content.
		// eslint-disable-next-line @atlaskit/ui-styling-standard/no-imported-style-values, @atlaskit/ui-styling-standard/no-nested-selectors, @atlaskit/ui-styling-standard/no-unsafe-selectors, @atlaskit/ui-styling-standard/no-unsafe-values
		[`.ProseMirror .${BodiedSyncBlockSharedCssClassName.prefix} .${BodiedSyncBlockSharedCssClassName.content}[contenteditable="true"] > p:only-child:has(.ProseMirror-trailingBreak:only-child)`]:
			{
				position: 'relative',

				'&::before': {
					// JSON.stringify produces a quoted and escaped CSS string.
					// eslint-disable-next-line @atlaskit/ui-styling-standard/no-unsafe-values
					content: placeholderText,
					position: 'absolute',
					boxSizing: 'border-box',
					color: token('color.text.subtlest'),
					font: 'inherit',
					insetInlineStart: 0,
					width: '100%',
					pointerEvents: 'none',
					userSelect: 'none',
				},
			},
	});

export const SourceSyncBlockPlaceholder = (): JSX.Element => {
	const { formatMessage } = useIntl();
	const placeholderStyles = useMemo(
		() =>
			getSourceSyncBlockPlaceholderStyles(
				JSON.stringify(formatMessage(placeholderTextMessages.sourceSyncBlockPlaceholderText)),
			),
		[formatMessage],
	);

	return <Global styles={placeholderStyles} />;
};
