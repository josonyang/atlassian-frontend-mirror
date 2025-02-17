/**
 * @jsxRuntime classic
 * @jsx jsx
 */

// eslint-disable-next-line @atlaskit/ui-styling-standard/use-compiled -- Ignored via go/DSP-18766
import { css } from '@emotion/react';
// eslint-disable-next-line @atlaskit/ui-styling-standard/use-compiled -- Ignored via go/DSP-18766
import styled from '@emotion/styled';
import * as colors from '@atlaskit/theme/colors';
import { token } from '@atlaskit/tokens';

export const truncate = (width: string = '100%') =>
	css({
		overflowX: 'hidden',
		textOverflow: 'ellipsis',
		whiteSpace: 'nowrap',
		// eslint-disable-next-line @atlaskit/ui-styling-standard/no-unsafe-values -- Ignored via go/DSP-18766
		width: width,
	});

// eslint-disable-next-line @atlaskit/ui-styling-standard/no-styled, @atlaskit/ui-styling-standard/no-exported-styles, @atlaskit/ui-styling-standard/no-unsafe-values -- Ignored via go/DSP-18766
export const RelatedArticlesTitle = styled.div({
	// eslint-disable-next-line @atlaskit/ui-styling-standard/no-imported-style-values -- Ignored via go/DSP-18766
	color: token('color.text', colors.N800),
	font: token('font.heading.small'),
	padding: `${token('space.200', '16px')} 0`,
});

/**
 * Loading styled-components
 */
// eslint-disable-next-line @atlaskit/ui-styling-standard/no-styled, @atlaskit/ui-styling-standard/no-exported-styles -- Ignored via go/DSP-18766
export const LoadignRelatedArticleSection = styled.div({
	marginTop: token('space.100', '8px'),
});

// eslint-disable-next-line @atlaskit/ui-styling-standard/no-styled, @atlaskit/ui-styling-standard/no-exported-styles -- Ignored via go/DSP-18766
export const LoadignRelatedArticleList = styled.ul({
	width: '100%',
	margin: 0,
	padding: 0,
	boxSizing: 'border-box',
});

// eslint-disable-next-line @atlaskit/ui-styling-standard/no-styled, @atlaskit/ui-styling-standard/no-exported-styles -- Ignored via go/DSP-18766
export const LoadignRelatedArticleListItem = styled.li({
	display: 'block',
	width: '100%',
	padding: token('space.100', '8px'),
	marginBottom: token('space.200', '16px'),
	boxSizing: 'border-box',
});
