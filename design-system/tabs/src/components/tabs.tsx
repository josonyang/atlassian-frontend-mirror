/** @jsx jsx */
import {
  Children,
  Fragment,
  ReactNode,
  useCallback,
  useRef,
  useState,
} from 'react';

import { css, jsx } from '@emotion/react';

import UIAnalyticsEvent from '@atlaskit/analytics-next/UIAnalyticsEvent';
import { usePlatformLeafEventHandler } from '@atlaskit/analytics-next/usePlatformLeafEventHandler';

import { TabListContext, TabPanelContext } from '../internal/context';
import { getTabsStyles } from '../internal/styles';
import { SelectedType, TabsProps } from '../types';

const baseStyles = css({
  display: 'flex',
  maxWidth: '100%',
  minHeight: '0%',
  flexBasis: '100%',
  flexDirection: 'column',
  flexGrow: 1,
});

// eslint-disable-next-line @atlaskit/design-system/consistent-css-prop-usage
const tabsStyles = getTabsStyles();

const analyticsAttributes = {
  componentName: 'tabs',
  packageName: process.env._PACKAGE_NAME_ as string,
  packageVersion: process.env._PACKAGE_VERSION_ as string,
};

const getTabPanelWithContext = ({
  tabPanel,
  index,
  isSelected,
  tabsId,
}: {
  tabPanel?: ReactNode;
  isSelected: boolean;
  index: SelectedType;
  tabsId: string;
}) =>
  // Ensure tabPanel exists in case it has been removed
  tabPanel && (
    <TabPanelContext.Provider
      value={{
        role: 'tabpanel',
        id: `${tabsId}-${index}-tab`,
        hidden: isSelected ? undefined : true,
        'aria-labelledby': `${tabsId}-${index}`,
        tabIndex: isSelected ? 0 : -1,
      }}
      key={index}
    >
      {tabPanel}
    </TabPanelContext.Provider>
  );

/**
 * __Tabs__
 *
 * Tabs acts as a container for all Tab components.
 *
 * - [Examples](https://atlassian.design/components/tabs/examples)
 * - [Code](https://atlassian.design/components/tabs/code)
 * - [Usage](https://atlassian.design/components/tabs/usage)
 */
const Tabs = (props: TabsProps) => {
  const {
    shouldUnmountTabPanelOnChange = false,
    selected: SelectedType,
    defaultSelected,
    onChange: onChangeProp,
    id,
    analyticsContext,
    children,
    testId,
  } = props;
  const [selectedState, setSelected] = useState(
    SelectedType || defaultSelected || 0,
  );
  const selected = SelectedType === undefined ? selectedState : SelectedType;

  const childrenArray = Children.toArray(children)
    // Don't include any conditional children
    .filter((child) => Boolean(child));
  // First child should be a tabList followed by tab panels
  const [tabList, ...tabPanels] = childrenArray;

  // Keep track of visited and add to a set
  const visited = useRef<Set<SelectedType>>(new Set([selected]));
  if (!visited.current.has(selected)) {
    visited.current.add(selected);
  }

  const onChange = useCallback(
    (index: SelectedType, analyticsEvent: UIAnalyticsEvent) => {
      if (onChangeProp) {
        onChangeProp(index, analyticsEvent);
      }
      setSelected(index);
    },
    [onChangeProp],
  );

  const onChangeAnalytics = usePlatformLeafEventHandler({
    fn: onChange,
    action: 'clicked',
    analyticsData: analyticsContext,
    ...analyticsAttributes,
  });

  const tabPanelsWithContext = shouldUnmountTabPanelOnChange
    ? getTabPanelWithContext({
        tabPanel: tabPanels[selected],
        index: selected,
        isSelected: true,
        tabsId: id,
      })
    : // If a panel has already been visited, don't unmount it
      Array.from(visited.current).map((tabIndex: SelectedType) =>
        getTabPanelWithContext({
          tabPanel: tabPanels[tabIndex],
          index: tabIndex,
          isSelected: tabIndex === selected,
          tabsId: id,
        }),
      );

  return (
    // Only styles that affect the Tabs container itself have been applied via primitives.
    // The other styles applied through the CSS prop are there for styling children
    // through inheritance. This is important for custom cases that use the useTabPanel(),
    // which applies accessibility attributes that we use as a styling hook.
    <div
      data-testid={testId}
      // eslint-disable-next-line @atlaskit/design-system/consistent-css-prop-usage
      css={[baseStyles, tabsStyles]}
    >
      <TabListContext.Provider
        value={{ selected, onChange: onChangeAnalytics, tabsId: id }}
      >
        {tabList}
      </TabListContext.Provider>
      {/* Fragment is a workaround as Box types don't allow ReactNode children */}
      <Fragment>{tabPanelsWithContext}</Fragment>
    </div>
  );
};

export default Tabs;
