import type { RuleTester } from 'eslint';

import { tester } from '../../__tests__/utils/_tester';
import rule from '../index';

type InvalidTestCase = Omit<RuleTester.InvalidTestCase, 'errors'>;

const createInvalidTestCases = (tests: InvalidTestCase[]) =>
	tests.map((t) => ({
		...t,
		errors: [{ messageId: 'unexpectedTaggedTemplate' }],
	}));

tester.run('no-keyframes-tagged-template-expression', rule, {
	valid: [
		`
      import { keyframes } from 'keyframes';

      keyframes\`from { opacity: 1 } to { opacity: 0 }\`;
    `,
		`
      import { keyframes } from '@compiled/react-clone';

      keyframes\`from { opacity: 1 } to { opacity: 0 }\`;
    `,
	],
	invalid: createInvalidTestCases([
		{
			filename: 'single-line-empty.ts',
			code: `
      import { keyframes } from '@compiled/react';

      keyframes\`\`;
    `,
			output: `
      import { keyframes } from '@compiled/react';

      keyframes({});
    `,
		},
		{
			filename: 'single-line-static-rule.ts',
			code: `
      import { keyframes } from '@compiled/react';

      keyframes\`from, 25% { opacity: 1 } to { opacity: 0 }\`;
    `,
			output: `
      import { keyframes } from '@compiled/react';

      keyframes({
        "from, 25%": {
          opacity: 1
        },
        to: {
          opacity: 0
        }
      });
    `,
		},
		{
			filename: 'multiline-empty.ts',
			code: `
      import { keyframes } from '@compiled/react';

      keyframes\`
      \`;
    `,
			output: `
      import { keyframes } from '@compiled/react';

      keyframes({});
    `,
		},
		{
			filename: 'multiline-static-rules.ts',
			code: `
      import { keyframes } from '@compiled/react';

      keyframes\`
        from, 25% {
          color: darkblue;
          opacity: 1;
        }
        25% {
          color: darkblue;
          opacity: 0.75;
        }
        50% {
          color: blue;
          opacity: 0.5;
        }
        to {
          color: blue;
          opacity: 0;
        }
      \`;
    `,
			output: `
      import { keyframes } from '@compiled/react';

      keyframes({
        "from, 25%": {
          color: "darkblue",
          opacity: 1
        },
        "25%": {
          color: "darkblue",
          opacity: 0.75
        },
        "50%": {
          color: "blue",
          opacity: 0.5
        },
        to: {
          color: "blue",
          opacity: 0
        }
      });
    `,
		},
		{
			filename: 'no-trailing-semicolon-multiline-static-rules.ts',
			code: `
      import { keyframes } from '@compiled/react';

      keyframes\`
        from, 25% {
          color: darkblue;
          opacity: 1
        }
        25% {
          color: darkblue;
          opacity: 0.75
        }
        50% {
          color: blue;
          opacity: 0.5
        }
        to {
          color: blue;
          opacity: 0
        }
      \`;
    `,
			output: `
      import { keyframes } from '@compiled/react';

      keyframes({
        "from, 25%": {
          color: "darkblue",
          opacity: 1
        },
        "25%": {
          color: "darkblue",
          opacity: 0.75
        },
        "50%": {
          color: "blue",
          opacity: 0.5
        },
        to: {
          color: "blue",
          opacity: 0
        }
      });
    `,
		},
		{
			filename: 'multiline-static-rules-comments.ts',
			code: `
      import { keyframes } from '@compiled/react';

      keyframes\`
        /* before selector 1 */
        from, 25% {
          /* before declaration 1 */
          color: /* inline declaration 1 */ darkblue;
          /* after declaration 1 */
          /* before declaration 2 */
          opacity: /* inline declaration 2 */ 1;
          /* after declaration 2 */
        }
        /* after selector 1 */
        /*
        * before selector 2
        */
        25% {
          /*
          * before declaration 3
          */
          color: darkblue;
          /*
          * after declaration 3
          */
          opacity: 0.75;
          /*
          * after declaration 4
          */
        }
        /*
        * after selector 2
        */
        /* before selector 3 */
        50% {
          color: blue;
          opacity: 0.5;
        }
        /* after selector 3 */
        to {
          color: blue;
          opacity: 0;
        }
        /* after selector 4 */
      \`;
    `,
			output: `
      import { keyframes } from '@compiled/react';

      keyframes({
        "from, 25%": {
          color: "darkblue",
          opacity: 1
        },
        "25%": {
          color: "darkblue",
          opacity: 0.75
        },
        "50%": {
          color: "blue",
          opacity: 0.5
        },
        to: {
          color: "blue",
          opacity: 0
        }
      });
    `,
		},
		{
			filename: 'interpolated-declaration-values.ts',
			code: `
      import { keyframes } from '@compiled/react';

      const from = {
        color: 'darkblue',
        opacity: 1
      };

      const toColor = 'blue';
      const toOpacity = 0;

      keyframes\`
        from {
          color: \${from.color};
          opacity: \${from.opacity};
        }
        to {
          color: \${toColor};
          opacity: \${toOpacity};
        }
      \`;
    `,
			output: `
      import { keyframes } from '@compiled/react';

      const from = {
        color: 'darkblue',
        opacity: 1
      };

      const toColor = 'blue';
      const toOpacity = 0;

      keyframes({
        from: {
          color: from.color,
          opacity: from.opacity
        },
        to: {
          color: toColor,
          opacity: toOpacity
        }
      });
    `,
		},
		{
			filename: 'interpolated-declaration-values-comments.ts',
			code: `
      import { keyframes } from '@compiled/react';

      const from = {
        color: 'darkblue',
        opacity: 1
      };

      const toColor = 'blue';
      const toOpacity = 0;

      keyframes\`
        from {
          color: /* before interpolation 1 */ \${from.color} /* after interpolation 1 */;
          opacity:
            /*
            * before interpolation 2
            */
            \${from.opacity};
            /*
            * after interpolation 2
            */
        }
        to {
          color: \${toColor};
          opacity: \${toOpacity};
        }
      \`;
    `,
			output: `
      import { keyframes } from '@compiled/react';

      const from = {
        color: 'darkblue',
        opacity: 1
      };

      const toColor = 'blue';
      const toOpacity = 0;

      keyframes({
        from: {
          color: from.color,
          opacity: from.opacity
        },
        to: {
          color: toColor,
          opacity: toOpacity
        }
      });
    `,
		},
		{
			filename: 'affixed-rules.ts',
			code: `
      import { keyframes } from '@compiled/react';

      const size = 8;

      keyframes\`
        from {
          margin: \${size}px \${size * 3}px;
          padding: calc(\${size} * 2);
        }
        to {
          margin: \${size}px \${size * 6}px;
          padding: calc(\${size} * 4);
        }
      \`;
    `,
			output: `
      import { keyframes } from '@compiled/react';

      const size = 8;

      keyframes({
        from: {
          margin: \`\${size}px \${size * 3}px\`,
          padding: \`calc(\${size} * 2)\`
        },
        to: {
          margin: \`\${size}px \${size * 6}px\`,
          padding: \`calc(\${size} * 4)\`
        }
      });
    `,
		},
		{
			filename: 'export-default-declaration.ts',
			code: `
      import { keyframes } from '@compiled/react';

      export default keyframes\`from, 25% { opacity: 1 } to { opacity: 0 }\`;
    `,
			output: `
      import { keyframes } from '@compiled/react';

      export default keyframes({
        "from, 25%": {
          opacity: 1
        },
        to: {
          opacity: 0
        }
      });
    `,
		},
		{
			filename: 'export-named-declaration.ts',
			code: `
      import { keyframes } from '@compiled/react';

      export const fadeOut = keyframes\`from, 25% { opacity: 1 } to { opacity: 0 }\`;
    `,
			output: `
      import { keyframes } from '@compiled/react';

      export const fadeOut = keyframes({
        "from, 25%": {
          opacity: 1
        },
        to: {
          opacity: 0
        }
      });
    `,
		},
		{
			filename: 'named-declaration.ts',
			code: `
      import { keyframes } from '@compiled/react';

      const fadeOut = keyframes\`from, 25% { opacity: 1 } to { opacity: 0 }\`;
    `,
			output: `
      import { keyframes } from '@compiled/react';

      const fadeOut = keyframes({
        "from, 25%": {
          opacity: 1
        },
        to: {
          opacity: 0
        }
      });
    `,
		},
		{
			filename: 'aliased.ts',
			code: `
      import { keyframes as keyframes2 } from '@compiled/react';

      const fadeOut = keyframes2\`from, 25% { opacity: 1 } to { opacity: 0 }\`;
    `,
			output: `
      import { keyframes as keyframes2 } from '@compiled/react';

      const fadeOut = keyframes2({
        "from, 25%": {
          opacity: 1
        },
        to: {
          opacity: 0
        }
      });
    `,
		},
	]),
});
