// @ts-ignore
import { ruleTester } from '@atlassian/eslint-utils';

import { linesOnly } from '../../../__tests__/utils/_strings';
import rule from '../../index';

ruleTester.run('no-html-anchor', rule, {
	valid: [
		`
      // JSX Element > ignores React components
      import { css } from '@emotion/react';
      const paddingStyles = css({ padding: '8px' });
      <A href="/" css={paddingStyles}></A>
    `,
		`
      // JSX Element > ignores Anchor
      <Anchor href="/">Hello, World!</Anchor>
    `,
	],
	invalid: [
		{
			code: linesOnly`
        // JSX Element > reports for an anchor element and shows correct message
        <a>Hello, World!</a>
      `,
			errors: [
				{
					message:
						'This <a> should be replaced with a link component from the Atlassian Design System, such as the "Link" or "LinkButton" component when suitable. For custom links use the "Anchor" primitive. ADS links include event tracking, automatic router configuration, ensure accessible implementations, and provide access to ADS styling features like design tokens.',
					suggestions: [
						{
							desc: 'Replace with Link component from @atlaskit/link',
							output: linesOnly`
				// JSX Element > reports for an anchor element and shows correct message
                import Link from '@atlaskit/link';
                <Link>Hello, World!</Link>
              `,
						},
						{
							desc: 'Replace with LinkButton component from @atlaskit/button/new',
							output: linesOnly`
				// JSX Element > reports for an anchor element and shows correct message
                import { LinkButton } from '@atlaskit/button/new';
                <LinkButton>Hello, World!</LinkButton>
              `,
						},
					],
				},
			],
		},
		{
			code: linesOnly`
        // JSX Element > reports for an anchor with href
        <a href="/">Hello, World!</a>
      `,
			errors: [
				{
					messageId: 'noHtmlAnchor',
					suggestions: [
						{
							desc: 'Replace with Link component from @atlaskit/link',
							output: linesOnly`
                // JSX Element > reports for an anchor with href
                import Link from '@atlaskit/link';
                <Link href="/">Hello, World!</Link>
              `,
						},
						{
							desc: 'Replace with LinkButton component from @atlaskit/button/new',
							output: linesOnly`
                // JSX Element > reports for an anchor with href
                import { LinkButton } from '@atlaskit/button/new';
                <LinkButton href="/">Hello, World!</LinkButton>
              `,
						},
					],
				},
			],
		},
		{
			code: linesOnly`
        // JSX Element > reports for a self-closing anchor
        <a />
      `,
			errors: [
				{
					messageId: 'noHtmlAnchor',
					suggestions: [
						{
							desc: 'Replace with Link component from @atlaskit/link',
							output: linesOnly`
                // JSX Element > reports for a self-closing anchor
                import Link from '@atlaskit/link';
                <Link />
              `,
						},
						{
							desc: 'Replace with LinkButton component from @atlaskit/button/new',
							output: linesOnly`
				// JSX Element > reports for a self-closing anchor
                import { LinkButton } from '@atlaskit/button/new';
                <LinkButton />
              `,
						},
					],
				},
			],
		},
		{
			code: linesOnly`
        // JSX Element > existing Link import with different name
        import CustomLink from '@atlaskit/link';
        <a href="/">Hello, World!</a>
      `,
			errors: [
				{
					messageId: 'noHtmlAnchor',
					suggestions: [
						{
							desc: 'Replace with Link component from @atlaskit/link',
							output: linesOnly`
                // JSX Element > existing Link import with different name
                import CustomLink from '@atlaskit/link';
                <CustomLink href="/">Hello, World!</CustomLink>
              `,
						},
						{
							desc: 'Replace with LinkButton component from @atlaskit/button/new',
							output: linesOnly`
				// JSX Element > existing Link import with different name
                import { LinkButton } from '@atlaskit/button/new';
                import CustomLink from '@atlaskit/link';
                <LinkButton href="/">Hello, World!</LinkButton>
              `,
						},
					],
				},
			],
		},
		{
			code: linesOnly`
			// JSX Element > existing LinkButton import with different name
			import { LinkButton as CustomLinkButton } from '@atlaskit/button/new';
			<a href="/">Hello, World!</a>
		  `,
			errors: [
				{
					messageId: 'noHtmlAnchor',
					suggestions: [
						{
							desc: 'Replace with Link component from @atlaskit/link',
							output: linesOnly`
				  // JSX Element > existing LinkButton import with different name
				  import Link from '@atlaskit/link';
				  import { LinkButton as CustomLinkButton } from '@atlaskit/button/new';
				  <Link href="/">Hello, World!</Link>
				`,
						},
						{
							desc: 'Replace with LinkButton component from @atlaskit/button/new',
							output: linesOnly`
				  // JSX Element > existing LinkButton import with different name
				  import { LinkButton as CustomLinkButton } from '@atlaskit/button/new';
				  <CustomLinkButton href="/">Hello, World!</CustomLinkButton>
				`,
						},
					],
				},
			],
		},
		{
			code: linesOnly`
			  // Existing Link import with same name from another package
			  import Link from 'another-package';
			  <a href="/">Hello, World!</a>
			`,
			errors: [
				{
					messageId: 'noHtmlAnchor',
					suggestions: [
						{
							desc: 'Replace with Link component from @atlaskit/link',
							output: linesOnly`
					  // Existing Link import with same name from another package
					  import Link1 from '@atlaskit/link';
					  import Link from 'another-package';
					  <Link1 href="/">Hello, World!</Link1>
					`,
						},
						{
							desc: 'Replace with LinkButton component from @atlaskit/button/new',
							output: linesOnly`
					  // Existing Link import with same name from another package
					  import { LinkButton } from '@atlaskit/button/new';
					  import Link from 'another-package';
					  <LinkButton href="/">Hello, World!</LinkButton>
					`,
						},
					],
				},
			],
		},
		{
			code: linesOnly`
			  // Existing LinkButton import with same name from another package
			  import { LinkButton } from 'another-package';
			  <a href="/">Hello, World!</a>
			`,
			errors: [
				{
					messageId: 'noHtmlAnchor',
					suggestions: [
						{
							desc: 'Replace with Link component from @atlaskit/link',
							output: linesOnly`
					  // Existing LinkButton import with same name from another package
					  import Link from '@atlaskit/link';
					  import { LinkButton } from 'another-package';
					  <Link href="/">Hello, World!</Link>
					`,
						},
						{
							desc: 'Replace with LinkButton component from @atlaskit/button/new',
							output: linesOnly`
					  // Existing LinkButton import with same name from another package
					  import { LinkButton1 } from '@atlaskit/button/new';
					  import { LinkButton } from 'another-package';
					  <LinkButton1 href="/">Hello, World!</LinkButton1>
					`,
						},
					],
				},
			],
		},
		{
			code: linesOnly`
			  // Existing Link, Link1, and Link2 imports
			  import Link from 'another-package';
			  import Link1 from 'yet-another-package';
			  import Link2 from '@some/package';
			  <a href="/">Hello, World!</a>
			`,
			errors: [
				{
					messageId: 'noHtmlAnchor',
					suggestions: [
						{
							desc: 'Replace with Link component from @atlaskit/link',
							output: linesOnly`
					  // Existing Link, Link1, and Link2 imports
					  import Link3 from '@atlaskit/link';
					  import Link from 'another-package';
					  import Link1 from 'yet-another-package';
					  import Link2 from '@some/package';
					  <Link3 href="/">Hello, World!</Link3>
					`,
						},
						{
							desc: 'Replace with LinkButton component from @atlaskit/button/new',
							output: linesOnly`
					  // Existing Link, Link1, and Link2 imports
					  import { LinkButton } from '@atlaskit/button/new';
					  import Link from 'another-package';
					  import Link1 from 'yet-another-package';
					  import Link2 from '@some/package';
					  <LinkButton href="/">Hello, World!</LinkButton>
					`,
						},
					],
				},
			],
		},
		{
			code: linesOnly`
			  // Existing LinkButton, LinkButton1, and LinkButton2 imports
			  import { LinkButton } from 'another-package';
			  import { LinkButton as LinkButton1 } from 'yet-another-package';
			  import { LinkButton as LinkButton2 } from '@some/package';
			  <a href="/">Hello, World!</a>
			`,
			errors: [
				{
					messageId: 'noHtmlAnchor',
					suggestions: [
						{
							desc: 'Replace with Link component from @atlaskit/link',
							output: linesOnly`
					  // Existing LinkButton, LinkButton1, and LinkButton2 imports
					  import Link from '@atlaskit/link';
					  import { LinkButton } from 'another-package';
					  import { LinkButton as LinkButton1 } from 'yet-another-package';
					  import { LinkButton as LinkButton2 } from '@some/package';
					  <Link href="/">Hello, World!</Link>
					`,
						},
						{
							desc: 'Replace with LinkButton component from @atlaskit/button/new',
							output: linesOnly`
					  // Existing LinkButton, LinkButton1, and LinkButton2 imports
					  import { LinkButton3 } from '@atlaskit/button/new';
					  import { LinkButton } from 'another-package';
					  import { LinkButton as LinkButton1 } from 'yet-another-package';
					  import { LinkButton as LinkButton2 } from '@some/package';
					  <LinkButton3 href="/">Hello, World!</LinkButton3>
					`,
						},
					],
				},
			],
		},
		{
			code: linesOnly`
        // JSX Element > reports for a self-closing div with role="link"
        <div role="link" />
      `,
			errors: [
				{
					messageId: 'noHtmlAnchor',
					suggestions: [
						{
							output: linesOnly`
                                // JSX Element > reports for a self-closing div with role="link"
                                import Link from '@atlaskit/link';
                                <Link role="link" />
							`,
							desc: 'Replace with Link component from @atlaskit/link',
						},
						{
							output: linesOnly`
                                // JSX Element > reports for a self-closing div with role="link"
                                import { LinkButton } from '@atlaskit/button/new';
                                <LinkButton role="link" />
							`,
							desc: 'Replace with LinkButton component from @atlaskit/button/new',
						},
					],
				},
			],
		},
		{
			code: linesOnly`
        // JSX Element > reports for a div with role="link"
        <div role="link">Hello, World!</div>
      `,
			errors: [
				{
					messageId: 'noHtmlAnchor',
					suggestions: [
						{
							output: linesOnly`
                                // JSX Element > reports for a div with role="link"
                                import Link from '@atlaskit/link';
                                <Link role="link">Hello, World!</Link>
							`,
							desc: 'Replace with Link component from @atlaskit/link',
						},
						{
							output: linesOnly`
                                // JSX Element > reports for a div with role="link"
                                import { LinkButton } from '@atlaskit/button/new';
                                <LinkButton role="link">Hello, World!</LinkButton>
							`,
							desc: 'Replace with LinkButton component from @atlaskit/button/new',
						},
					],
				},
			],
		},
		{
			code: linesOnly`
        // JSX Element > reports for a span with role="link"
        <span role="link">Hello, World!</span>
      `,
			errors: [
				{
					messageId: 'noHtmlAnchor',
					suggestions: [
						{
							output: linesOnly`
                                // JSX Element > reports for a span with role="link"
                                import Link from '@atlaskit/link';
                                <Link role="link">Hello, World!</Link>
							`,
							desc: 'Replace with Link component from @atlaskit/link',
						},
						{
							output: linesOnly`
                                // JSX Element > reports for a span with role="link"
                                import { LinkButton } from '@atlaskit/button/new';
                                <LinkButton role="link">Hello, World!</LinkButton>
							`,
							desc: 'Replace with LinkButton component from @atlaskit/button/new',
						},
					],
				},
			],
		},
		{
			code: linesOnly`
        // JSX Element > reports for a button with role="link"
        <button role="link">Hello, World!</button>
      `,
			errors: [
				{
					messageId: 'noHtmlAnchor',
					suggestions: [
						{
							output: linesOnly`
                                // JSX Element > reports for a button with role="link"
                                import Link from '@atlaskit/link';
							    <Link role="link">Hello, World!</Link>
							`,
							desc: 'Replace with Link component from @atlaskit/link',
						},
						{
							output: linesOnly`
                                // JSX Element > reports for a button with role="link"
                                import { LinkButton } from '@atlaskit/button/new';
                                <LinkButton role="link">Hello, World!</LinkButton>
							`,
							desc: 'Replace with LinkButton component from @atlaskit/button/new',
						},
					],
				},
			],
		},
		{
			code: linesOnly`
        // JSX Element > reports for a main with role="link"
        <main role="link">Hello, World!</main>
      `,
			errors: [
				{
					messageId: 'noHtmlAnchor',
					suggestions: [
						{
							output: linesOnly`
							// JSX Element > reports for a main with role="link"
							import Link from '@atlaskit/link';
							<Link role="link">Hello, World!</Link>
						`,
							desc: 'Replace with Link component from @atlaskit/link',
						},
						{
							output: linesOnly`
							// JSX Element > reports for a main with role="link"
							import { LinkButton } from '@atlaskit/button/new';
							<LinkButton role="link">Hello, World!</LinkButton>
						`,
							desc: 'Replace with LinkButton component from @atlaskit/button/new',
						},
					],
				},
			],
		},
	],
});
