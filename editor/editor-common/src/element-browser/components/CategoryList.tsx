/**
 * @jsxRuntime classic
 * @jsx jsx
 */
import React, { Fragment, memo, useCallback } from 'react';

// eslint-disable-next-line @atlaskit/ui-styling-standard/use-compiled -- Ignored via go/DSP-18766
import { css, jsx } from '@emotion/react';

import type { WithAnalyticsEventsProps } from '@atlaskit/analytics-next';
import withAnalyticsContext from '@atlaskit/analytics-next/withAnalyticsContext';
import Button, { type ThemeProps, type ThemeTokens } from '@atlaskit/button/custom-theme-button';
import { token } from '@atlaskit/tokens';

import {
	ACTION,
	ACTION_SUBJECT,
	ACTION_SUBJECT_ID,
	EVENT_TYPE,
	fireAnalyticsEvent,
} from '../../analytics';
import { DEVICE_BREAKPOINT_NUMBERS, GRID_SIZE } from '../constants';
import useFocus from '../hooks/use-focus';
import type { Category } from '../types';

interface Props {
	categories?: Category[];
	onSelectCategory: (category: Category) => void;
	selectedCategory?: string;
	focusedCategoryIndex?: number;
	setFocusedCategoryIndex: (index: number) => void;
	setFocusedItemIndex: (index: number) => void;
	setFocusOnSearch?: () => void;
}

const arrowsKeys = new Set(['ArrowUp', 'ArrowDown']);
function CategoryList({
	categories = [],
	...props
}: Props & WithAnalyticsEventsProps): JSX.Element {
	const { focusedCategoryIndex, setFocusedCategoryIndex, onSelectCategory } = props;

	return (
		<Fragment>
			{categories.map<JSX.Element>((category, index) => {
				const categoriesLength = categories?.length;
				let selectNextCategory;
				let selectPreviousCategory;
				if (categoriesLength > 1) {
					selectNextCategory = () => {
						if (index !== categoriesLength - 1) {
							setFocusedCategoryIndex(index + 1);
							onSelectCategory(categories[index + 1]);
						} else {
							setFocusedCategoryIndex(0);
							onSelectCategory(categories[0]);
						}

						return;
					};

					selectPreviousCategory = () => {
						if (index !== 0) {
							setFocusedCategoryIndex(index - 1);
							onSelectCategory(categories[index - 1]);
						} else {
							setFocusedCategoryIndex(categoriesLength - 1);
							onSelectCategory(categories[categoriesLength - 1]);
						}
						return;
					};
				}
				return (
					<CategoryListItem
						key={category.title}
						index={index}
						category={category}
						focus={focusedCategoryIndex === index}
						// Ignored via go/ees005
						// eslint-disable-next-line react/jsx-props-no-spreading
						{...props}
						setFocusedCategoryIndex={setFocusedCategoryIndex}
						selectPreviousCategory={selectPreviousCategory}
						selectNextCategory={selectNextCategory}
					/>
				);
			})}
		</Fragment>
	);
}

type CategoryListItemProps = {
	category: Category;
	onSelectCategory: (category: Category) => void;
	selectedCategory?: string;
	index: number;
	focus: boolean;
	setFocusedCategoryIndex: (index: number) => void;
	setFocusedItemIndex?: (index: number) => void;
	setFocusOnSearch?: () => void;
	selectPreviousCategory?: () => void;
	selectNextCategory?: () => void;
};

function CategoryListItem({
	category,
	onSelectCategory,
	selectedCategory,
	index,
	focus,
	setFocusedCategoryIndex,
	createAnalyticsEvent,
	setFocusedItemIndex,
	setFocusOnSearch,
	selectPreviousCategory,
	selectNextCategory,
}: CategoryListItemProps & WithAnalyticsEventsProps) {
	const ref = useFocus(focus);
	const onClick = useCallback(() => {
		/**
		 * When user double clicks on same category, focus on first item.
		 */
		if (selectedCategory === category.name) {
			setFocusedCategoryIndex(0);
		} else {
			setFocusedCategoryIndex(index);
		}

		onSelectCategory(category);
		fireAnalyticsEvent(createAnalyticsEvent)({
			payload: {
				action: ACTION.CLICKED,
				actionSubject: ACTION_SUBJECT.BUTTON,
				actionSubjectId: ACTION_SUBJECT_ID.BUTTON_CATEGORY,
				eventType: EVENT_TYPE.TRACK,
			},
		});
	}, [
		onSelectCategory,
		category,
		index,
		selectedCategory,
		setFocusedCategoryIndex,
		createAnalyticsEvent,
	]);

	const onFocus = useCallback(() => {
		if (!focus) {
			setFocusedCategoryIndex(index);
		}
	}, [focus, index, setFocusedCategoryIndex]);
	const getTheme = useCallback(
		(currentTheme: (props: ThemeProps) => ThemeTokens, themeProps: ThemeProps): ThemeTokens => {
			const { buttonStyles, ...rest } = currentTheme(themeProps);

			return {
				buttonStyles: {
					...buttonStyles,
					textAlign: 'start' as const,
					marginLeft: token('space.025', '2px'),
					height: '100%',
					width: '100%',
					color:
						category.name !== selectedCategory ? token('color.text') : token('color.text.selected'),
					...(category.name === selectedCategory && {
						background: token('color.background.selected'),
					}),
				},
				...rest,
			};
		},
		[category.name, selectedCategory],
	);
	const onTabPress = useCallback(
		(e: React.KeyboardEvent<HTMLElement>) => {
			const isShiftPressed = e.shiftKey;
			if (!isShiftPressed) {
				// set focus from focused category to first item in it
				if (setFocusedItemIndex) {
					setFocusedItemIndex(0);
					e.preventDefault();
				}
			} else {
				// jump from first category back to search
				if (setFocusOnSearch) {
					setFocusOnSearch();
					e.preventDefault();
				}
			}
			return;
		},
		[setFocusedItemIndex, setFocusOnSearch],
	);

	const onArrowPress = useCallback(
		(e: React.KeyboardEvent<HTMLElement>) => {
			if (e.key === 'ArrowUp' && selectPreviousCategory) {
				return selectPreviousCategory();
			}
			if (e.key === 'ArrowDown' && selectNextCategory) {
				return selectNextCategory();
			}
		},
		[selectPreviousCategory, selectNextCategory],
	);

	const onKeyDown = useCallback(
		(e: React.KeyboardEvent<HTMLElement>) => {
			const isTabPressed = e.key === 'Tab';
			const isArrowPressed = arrowsKeys.has(e.key);
			if (isTabPressed) {
				return onTabPress(e);
			}

			if (isArrowPressed) {
				return onArrowPress(e);
			}
		},
		[onTabPress, onArrowPress],
	);

	return (
		<div css={buttonWrapper} role="presentation">
			{/* TODO: (from codemod) CustomThemeButton will be deprecated. Please consider migrating to Pressable or Anchor Primitives with custom styles. */}
			<Button
				appearance="subtle"
				isSelected={selectedCategory === category.name}
				onClick={onClick}
				onFocus={onFocus}
				onKeyDown={onKeyDown}
				theme={getTheme}
				role="tab"
				aria-selected={selectedCategory === category.name ? 'true' : 'false'}
				aria-controls={`browse-category-${category.name}-tab`}
				id={`browse-category--${category.name}-button`}
				ref={ref}
				testId="element-browser-category-item"
				tabIndex={-1}
			>
				{category.title}
			</Button>
		</div>
	);
}

const buttonWrapper = css({
	// eslint-disable-next-line @atlaskit/ui-styling-standard/no-imported-style-values, @atlaskit/ui-styling-standard/no-unsafe-values -- Ignored via go/DSP-18766
	height: `${GRID_SIZE * 4}px`,
	margin: `${token('space.050', '4px')} ${token('space.050', '4px')} ${token(
		'space.050',
		'4px',
	)} 0`,
	// eslint-disable-next-line @atlaskit/ui-styling-standard/no-unsafe-values, @atlaskit/ui-styling-standard/no-imported-style-values -- Ignored via go/DSP-18766
	[`@media (min-width: ${DEVICE_BREAKPOINT_NUMBERS.medium}px)`]: {
		// eslint-disable-next-line @atlaskit/ui-styling-standard/no-unsafe-selectors -- Ignored via go/DSP-18766
		':not(:last-child)': {
			marginBottom: 0,
		},
	},
});

const MemoizedCategoryListWithAnalytics = memo(
	withAnalyticsContext({
		component: 'CategoryList',
	})(CategoryList),
);

export default MemoizedCategoryListWithAnalytics;
