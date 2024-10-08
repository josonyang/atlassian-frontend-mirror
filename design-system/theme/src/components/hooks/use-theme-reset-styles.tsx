import { type MutableRefObject, useEffect, useRef } from 'react';

import { token } from '@atlaskit/tokens';

import { B100, B300, B400, B500, N200, N800, N900 } from '../../colors';

export const SELECTOR = 'old-ds-theme-mode';

/* eslint-disable @atlaskit/design-system/ensure-design-token-usage */
const baseResetStyles = [{ mode: 'light' }, { mode: 'dark' }]
	.map(
		(theme) => `
  .${theme.mode}-${SELECTOR} {
    color: ${token('color.text', N900)};
  }
  .${theme.mode}-${SELECTOR} a {
    color: ${token('color.link', B400)};
  }
  .${theme.mode}-${SELECTOR} a:hover {
    color: ${token('color.link.pressed', B300)};
  }
  .${theme.mode}-${SELECTOR} a:active {
    color: ${token('color.link.pressed', B500)};
  }
  .${theme.mode}-${SELECTOR} a:focus {
    outlineColor: ${token('color.border.focused', B100)};
  }
  .${theme.mode}-${SELECTOR} h1,
  .${theme.mode}-${SELECTOR} h2,
  .${theme.mode}-${SELECTOR} h3,
  .${theme.mode}-${SELECTOR} h4,
  .${theme.mode}-${SELECTOR} h5 {
    color: ${token('color.text', N800)};
  }
  .${theme.mode}-${SELECTOR} h6 {
    color: ${token('color.text.subtlest', N200)};
  }
  .${theme.mode}-${SELECTOR} small {
    color: ${token('color.text.subtlest', N200)};
  }`,
	)
	.join('\n');
/* eslint-enable @atlaskit/design-system/ensure-design-token-usage */

const getStylesheetResetCSS = (backgroundColor: string) =>
	`body { background: ${backgroundColor}; }`;

const UNIQUE_INTERNAL_ID = 'ds--theme--ak-theme-provider';
const UNIQUE_BODY_BG_ID = 'ds--theme--ak-body-background';

/**
 * This hooks conditionally sets body styles based on the theme mode applied.
 *
 * @param backgroundColor The background color to be applied at the root level of the application
 */
const useThemeResetStyles = (backgroundColor: string) => {
	const stylesheet: MutableRefObject<HTMLStyleElement | null> = useRef<HTMLStyleElement>(null);

	const bgColorNode: MutableRefObject<HTMLStyleElement | null> = useRef<HTMLStyleElement>(null);

	useEffect(() => {
		const hasNode = document.getElementById(UNIQUE_INTERNAL_ID);

		// Bail out if the AKThemeProvider has already set the body and there is already a theme stylesheet
		// Child nodes should not take precedence over a root node setting body bg
		if (hasNode) {
			return;
		}

		stylesheet.current = document.createElement('style');

		if (document && document.head) {
			stylesheet.current.id = UNIQUE_INTERNAL_ID;

			// prepend the theme reset styles
			document.head.prepend(stylesheet.current);

			stylesheet.current.innerHTML = baseResetStyles;

			return () => {
				// document && document.head is needed here most likely because of RTL or React DOM causing
				// document.head to be null if removed
				if (stylesheet.current && document && document.head) {
					document.head.removeChild(stylesheet.current);
					stylesheet.current = null;
				}
			};
		}
	}, []);

	useEffect(() => {
		const hasBodyNode = document.getElementById(UNIQUE_BODY_BG_ID);

		if (document && document.head) {
			if (!hasBodyNode) {
				// if there is no body element node already, set it up and append to document.head
				bgColorNode.current = document.createElement('style');
				bgColorNode.current.id = UNIQUE_BODY_BG_ID;
				document.head.append(bgColorNode.current);
			}

			// body element node already exists so just update the backgroundColor
			if (bgColorNode.current) {
				const cssBgColor = getStylesheetResetCSS(backgroundColor);
				bgColorNode.current.innerHTML = cssBgColor;
			}

			return () => {
				if (bgColorNode.current && document && document.head) {
					document.head.removeChild(bgColorNode.current);
					bgColorNode.current = null;
				}
			};
		}
	}, [backgroundColor]);
};

export default useThemeResetStyles;
