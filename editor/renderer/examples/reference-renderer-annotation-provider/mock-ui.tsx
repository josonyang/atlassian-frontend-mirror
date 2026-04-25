/**
 * @jsxRuntime classic
 * @jsx jsx
 */
import React from 'react';

/* eslint-disable @typescript-eslint/consistent-type-imports, @atlaskit/ui-styling-standard/use-compiled -- Ignored via go/DSP-18766; jsx required at runtime for @jsxRuntime classic */
import { jsx, css } from '@emotion/react';

export function ExampleBarMenu({ children }: { children: React.ReactNode }): jsx.JSX.Element {
	return <menu css={menuStyles}>{children}</menu>;
}

const menuStyles = css({
	display: 'flex',
	flexDirection: 'row',
	gap: '20px',
	padding: 0,
	margin: 0,
	border: '1px solid grey',
});

ExampleHighlightMenu.Item = function BarMenuItem({ children }: { children: React.ReactNode }) {
	return <div css={menuItemStyles}>{children}</div>;
};
const menuItemStyles = css({});

export function ExampleHighlightMenu({ children }: { children: React.ReactNode }): jsx.JSX.Element {
	return <ExampleBarMenu>{children}</ExampleBarMenu>;
}
// eslint-disable-next-line @typescript-eslint/no-namespace
export declare namespace ExampleHighlightMenu {
	// eslint-disable-next-line no-var
	export var Item: ({ children }: { children: React.ReactNode }) => jsx.JSX.Element;
}
