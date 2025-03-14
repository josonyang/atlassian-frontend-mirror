// eslint-disable-next-line @atlaskit/ui-styling-standard/use-compiled -- Ignored via go/DSP-18766
import { css, keyframes } from '@emotion/react';

import { token } from '@atlaskit/tokens';

const gapCursorBlink = keyframes({
	'from, to': {
		opacity: 0,
	},
	'50%': {
		opacity: 1,
	},
});

export const hideCaretModifier = 'ProseMirror-hide-gapcursor';
const gapCursor = '.ProseMirror-gapcursor';
const prosemirrorwidgetNotBlock =
	'.ProseMirror-widget:not([data-blocks-decoration-container="true"]):not([data-blocks-drag-handle-container="true"]):not([data-blocks-quick-insert-container="true"])';
const wrapLeft = '[layout="wrap-left"]';
const wrapRight = '[layout="wrap-right"]';

// eslint-disable-next-line @atlaskit/design-system/no-css-tagged-template-expression, @atlaskit/ui-styling-standard/no-exported-styles -- Ignored via go/DSP-18766, This needs manual remediation, it autofixes seemingly safely, but the code style and readability is destroyed.
export const gapCursorStyles = css`
	/* =============== GAP CURSOR ================== */
	.ProseMirror {
		&.${hideCaretModifier} {
			caret-color: transparent;
		}

		${gapCursor} {
			display: none;
			pointer-events: none;
			position: relative;

			& span {
				caret-color: transparent;
				position: absolute;
				height: 100%;
				width: 100%;
				display: block;
			}

			& span::after {
				animation: 1s ${gapCursorBlink} step-start infinite;
				border-left: 1px solid;
				content: '';
				display: block;
				position: absolute;
				top: 0;
				height: 100%;
			}
			&.-left span::after {
				left: ${token('space.negative.050', '-4px')};
			}
			&.-right span::after {
				right: ${token('space.negative.050', '-4px')};
			}
			& span[layout='full-width'],
			& span[layout='wide'],
			& span[layout='fixed-width'] {
				margin-left: 50%;
				transform: translateX(-50%);
			}
			&${wrapRight} {
				float: right;
			}

			/* fix vertical alignment of gap cursor */
			&:first-of-type + ul,
			&:first-of-type + span + ul,
			&:first-of-type + ol,
			&:first-of-type + span + ol,
			&:first-of-type + pre,
			&:first-of-type + span + pre,
			&:first-of-type + blockquote,
			&:first-of-type + span + blockquote {
				margin-top: 0;
			}
		}
		&.ProseMirror-focused ${gapCursor} {
			display: block;
			border-color: transparent;
		}
	}

	/* This hack below is for two images aligned side by side */
	${gapCursor}${wrapLeft} + span + ${wrapLeft},
  ${gapCursor}${wrapRight} + span + ${wrapRight},
  ${gapCursor} + ${wrapLeft} + ${wrapRight},
  ${gapCursor} + ${wrapLeft} + span + ${wrapRight},
  ${gapCursor} + ${wrapRight} + ${wrapLeft},
  ${gapCursor} + ${wrapRight} + span + ${wrapLeft},
  ${wrapLeft} + ${gapCursor} + ${wrapRight},
  ${wrapLeft} + ${gapCursor} + span ${wrapRight},
  ${wrapRight} + ${gapCursor} + ${wrapLeft},
  ${wrapRight} + ${gapCursor} + span + ${wrapLeft},
  ${wrapLeft} + ${gapCursor} {
		clear: none;
	}

	${wrapLeft} + ${gapCursor} + ${wrapRight} > div,
  ${wrapLeft} + ${gapCursor} + span + ${wrapRight} > div,
  ${wrapRight} + ${gapCursor} + ${wrapLeft} > div,
  ${wrapRight} + ${gapCursor} + span + ${wrapLeft} > div,
  ${gapCursor} + ${wrapRight} + ${wrapLeft} > div,
  ${gapCursor} + ${wrapRight} + span + ${wrapLeft} > div,
  ${gapCursor} + ${wrapLeft} + ${wrapRight} > div,
  ${gapCursor} + ${wrapLeft} + span + ${wrapRight} > div {
		margin-right: 0;
		margin-left: 0;
		margin-bottom: 0;
	}

	${wrapLeft} + ${gapCursor},
  ${wrapRight} + ${gapCursor} {
		float: left;
	}

	${gapCursor} + ${wrapLeft} + span + ${wrapRight}::after,
  ${gapCursor} + ${wrapRight} + span + ${wrapLeft}::after,
  ${wrapLeft} + ${gapCursor} + ${wrapRight}::after,
  ${wrapLeft} + ${gapCursor} + span + ${wrapRight}::after,
  ${wrapRight} + ${gapCursor} + ${wrapLeft}::after,
  ${wrapRight} + ${gapCursor} + span + ${wrapLeft}::after {
		visibility: hidden;
		display: block;
		font-size: 0;
		content: ' ';
		clear: both;
		height: 0;
	}

	${wrapLeft} + ${gapCursor} + ${wrapRight} + *,
  ${wrapLeft} + ${gapCursor} + ${wrapRight} + span + *,
  ${wrapRight} + ${gapCursor} + ${wrapLeft} + *,
  ${wrapRight} + ${gapCursor} + ${wrapLeft} + span + *,
  ${wrapLeft} + ${gapCursor} + span + ${wrapRight} + *,
  ${wrapRight} + ${gapCursor} + span + ${wrapLeft} + *,
  ${gapCursor} + ${wrapLeft} + span + ${wrapRight} + *,
  ${gapCursor} + ${wrapRight} + span + ${wrapLeft} + *,
  ${wrapLeft} + ${gapCursor} + ${wrapRight} + * > *,
  ${wrapLeft} + ${gapCursor} + ${wrapRight} + span + * > *,
  ${wrapRight} + ${gapCursor} + ${wrapLeft} + * > *,
  ${wrapRight} + ${gapCursor} + ${wrapLeft} + span + * > *,
  ${wrapLeft} + ${gapCursor} + span + ${wrapRight} + * > *,
  ${wrapRight} + ${gapCursor} + span + ${wrapLeft} + * > *,
  ${gapCursor} + ${wrapLeft} + span + ${wrapRight} + * > *,
  ${gapCursor} + ${wrapRight} + span + ${wrapLeft} + * > *,
  ${prosemirrorwidgetNotBlock} + ${gapCursor} + *,
  ${prosemirrorwidgetNotBlock} + ${gapCursor} + span + * {
		margin-top: 0;
	}
`;
