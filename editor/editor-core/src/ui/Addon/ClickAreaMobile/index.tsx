/**
 * @jsxRuntime classic
 * @jsx jsx
 */
import React from 'react';

// eslint-disable-next-line @atlaskit/ui-styling-standard/use-compiled -- Ignored via go/DSP-18766
import { css, jsx } from '@emotion/react';

import type { EditorView } from '@atlaskit/editor-prosemirror/view';

import { clickAreaClickHandler } from '../click-area-helper';

/**
 * Fills the visible viewport height so that it can filter
 * clicks/taps within or below the content (e.g. if the content
 * doesn't exceed the viewport, or whether it overflows it).
 */
const clickWrapper = ({ isExpanded, minHeight }: { isExpanded?: boolean; minHeight: number }) =>
	css(
		{
			height: '100%',
		},
		// eslint-disable-next-line @atlaskit/ui-styling-standard/no-unsafe-values -- Ignored via go/DSP-18766
		isExpanded && minHeight ? `min-height: ${minHeight}px` : '',
	);

export interface Props {
	editorView?: EditorView;
	minHeight: number;
	children?: React.ReactNode;
	persistScrollGutter?: boolean;
	isExpanded?: boolean;
	editorDisabled?: boolean;
}

/**
 * Click Area is responsible for improving UX by ensuring the user
 * can always tap beneath the content area, to insert more content.
 *
 * This is achieved by inserting a new empty paragraph at the end of
 * the document (if one doesn't already exist).
 *
 * This is particularly important when the content exceeds the visible
 * viewport height, and if the last content node captures text selection
 * e.g. table, layouts, codeblock, etc.
 *
 * This relies on the Scroll Gutter plugin which inserts additional
 * whitespace at the end of the document when it overflows the viewport.
 */
// Ignored via go/ees005
// eslint-disable-next-line @repo/internal/react/no-class-components
export default class ClickAreaMobile extends React.Component<Props> {
	private clickElementRef = React.createRef<HTMLDivElement>();

	private handleClick = (event: React.MouseEvent<HTMLElement>) => {
		const { editorView: view, editorDisabled } = this.props;
		if (!view) {
			return;
		}
		if (!editorDisabled) {
			// if the editor is disabled -- we don't want to intercept any click events
			clickAreaClickHandler(view, event);
		}
		const scrollGutterClicked = event.clientY > view.dom.getBoundingClientRect().bottom;
		// Reset the default prosemirror scrollIntoView logic by
		// clamping the scroll position to the bottom of the viewport.
		if (scrollGutterClicked) {
			event.preventDefault();
			if (this.clickElementRef.current) {
				this.clickElementRef.current.scrollIntoView(false);
			}
		}
	};

	render() {
		return (
			// eslint-disable-next-line jsx-a11y/click-events-have-key-events, jsx-a11y/no-static-element-interactions
			<div
				// eslint-disable-next-line @atlaskit/design-system/consistent-css-prop-usage -- Ignored via go/DSP-18766
				css={clickWrapper({
					isExpanded: this.props.isExpanded,
					minHeight: this.props.minHeight,
				})}
				// eslint-disable-next-line @atlaskit/ui-styling-standard/no-classname-prop -- Ignored via go/DSP-18766
				className="editor-click-wrapper"
				onClick={this.handleClick}
				ref={this.clickElementRef}
			>
				{this.props.children}
			</div>
		);
	}
}
