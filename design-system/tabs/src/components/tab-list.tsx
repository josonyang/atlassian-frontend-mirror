/**
 * @jsxRuntime classic
 * @jsx jsx
 */
import { Children, createRef, type KeyboardEvent, type ReactNode, useCallback } from 'react';

// eslint-disable-next-line @atlaskit/ui-styling-standard/use-compiled -- Ignored via go/DSP-18766
import { css, jsx } from '@emotion/react';

import { fg } from '@atlaskit/platform-feature-flags';
import { token } from '@atlaskit/tokens';

import { useTabList } from '../hooks';
import { TabContext } from '../internal/context';
import { getTabListStyles, getTabListStylesOld } from '../internal/styles';
import { type TabListProps } from '../types';

const baseStyles = css({
	display: 'flex',
	padding: token('space.0', '0px'),
	position: 'relative',
});

// eslint-disable-next-line @atlaskit/design-system/consistent-css-prop-usage
const tabListStyles = getTabListStyles();
// eslint-disable-next-line @atlaskit/design-system/consistent-css-prop-usage
const tabListStylesOld = getTabListStylesOld();

/**
 * __TabList__
 *
 * A TabList groups `Tab` components together.
 *
 * - [Examples](https://atlassian.design/components/tabs/examples)
 * - [Code](https://atlassian.design/components/tabs/code)
 * - [Usage](https://atlassian.design/components/tabs/usage)
 */
const TabList = ({ children }: TabListProps) => {
	const { tabsId, selected, onChange } = useTabList();

	const ref = createRef<HTMLDivElement>();

	// Don't include any conditional children
	const childrenArray = Children.toArray(children).filter(Boolean);
	const length = childrenArray.length;

	const selectTabByIndex = useCallback(
		(index: number) => {
			const newSelectedNode: HTMLElement | undefined | null = ref.current?.querySelector(
				`[id='${tabsId}-${index}']`,
			);

			if (newSelectedNode) {
				newSelectedNode.focus();
			}
			onChange(index);
		},
		[tabsId, ref, onChange],
	);

	const onKeyDown = useCallback(
		(e: KeyboardEvent<HTMLElement>) => {
			if (!['ArrowRight', 'ArrowLeft', 'Home', 'End'].includes(e.key)) {
				return;
			}

			// preventing horizontal or vertical scroll
			e.preventDefault();
			const lastTabIndex = length - 1;

			if (['Home', 'End'].includes(e.key)) {
				const newSelected = e.key === 'Home' ? 0 : lastTabIndex;
				selectTabByIndex(newSelected);
				return;
			}

			// We use aria-posinset so we don't rely on the selected variable
			// If we used the selected variable this would regenerate each time
			// and create an unstable reference
			const selectedIndex = parseInt(e.currentTarget.getAttribute('aria-posinset') || '0') - 1;

			const modifier = e.key === 'ArrowRight' ? 1 : -1;
			let newSelected = selectedIndex + modifier;

			if (newSelected < 0 || newSelected >= length) {
				// Cycling focus to move from last to first and from first to last
				newSelected = newSelected < 0 ? lastTabIndex : 0;
			}

			selectTabByIndex(newSelected);
		},
		[length, selectTabByIndex],
	);

	// Memoized so the function isn't recreated each time
	const getTabWithContext = useCallback(
		({ tab, isSelected, index }: { tab: ReactNode; isSelected: boolean; index: number }) => (
			<TabContext.Provider
				value={{
					onClick: () => onChange(index),
					onKeyDown,
					'aria-setsize': length,
					role: 'tab',
					id: `${tabsId}-${index}`,
					'aria-posinset': index + 1,
					'aria-selected': isSelected,
					'aria-controls': `${tabsId}-${index}-tab`,
					tabIndex: isSelected ? 0 : -1,
				}}
				key={index}
			>
				{tab}
			</TabContext.Provider>
		),
		[length, onKeyDown, onChange, tabsId],
	);

	return (
		// Only styles that affect the TabList itself have been applied via primitives.
		// The other styles applied through the CSS prop are there for styling children
		// through inheritance. This is important for custom cases that use the useTab(),
		// which applies accessibility atributes that we use as a styling hook.
		<div
			role="tablist"
			ref={ref}
			// eslint-disable-next-line @atlaskit/design-system/consistent-css-prop-usage
			css={[baseStyles, fg('platform-component-visual-refresh') ? tabListStyles : tabListStylesOld]}
		>
			{childrenArray.map((child, index) =>
				getTabWithContext({
					tab: child,
					index,
					isSelected: index === selected,
				}),
			)}
		</div>
	);
};

export default TabList;
