/**
 * @jsxRuntime classic
 * @jsx jsx
 */
import { useLayoutEffect, useRef } from 'react';

import { css, jsx } from '@compiled/react';

import { fg } from '@atlaskit/platform-feature-flags';

import { MinHeightContainer } from '../../../../common/ui/min-height-container';

import { SearchResultsContainerOld } from './old';

const flexColumn = css({
	display: 'flex',
	flexDirection: 'column',
	justifyContent: 'flex-start',
	width: '100%',
});

type SearchResultsContainerProps = {
	adaptiveHeight: boolean;
	isLoadingResults: boolean;
	hasTabs?: boolean;
	children?: React.ReactNode;
};

export const SearchResultsContainerNew = ({
	hasTabs,
	adaptiveHeight,
	isLoadingResults,
	children,
}: SearchResultsContainerProps): JSX.Element => {
	const ref = useRef<HTMLDivElement>(null);
	const currentHeight: React.MutableRefObject<number | null> = useRef<number>(null);

	const fixedMinHeight = hasTabs ? '347px' : '302px';
	const adaptiveMinHeight =
		isLoadingResults && !!currentHeight.current ? `${currentHeight.current}px` : 'auto';
	const minheight = adaptiveHeight ? adaptiveMinHeight : fixedMinHeight;

	useLayoutEffect(() => {
		if (ref.current && adaptiveHeight && !isLoadingResults) {
			currentHeight.current = ref.current.getBoundingClientRect().height;
		}
	});

	return (
		<MinHeightContainer ref={ref} minHeight={minheight} css={flexColumn}>
			{children}
		</MinHeightContainer>
	);
};

export const SearchResultsContainer = (props: SearchResultsContainerProps) => {
	if (fg('platform_bandicoots-link-picker-css')) {
		return <SearchResultsContainerNew {...props} />;
	}
	return <SearchResultsContainerOld {...props} />;
};
