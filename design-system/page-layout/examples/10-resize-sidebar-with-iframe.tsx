/** @jsx jsx */
import { FC, Fragment, useCallback, useEffect, useState } from 'react';

import { css, jsx } from '@emotion/react';
import { bind } from 'bind-event-listener';

import { token } from '@atlaskit/tokens';
import Tooltip from '@atlaskit/tooltip';

import {
  Banner,
  Content,
  LeftPanel,
  LeftSidebar,
  LeftSidebarState,
  Main,
  PageLayout,
  RightPanel,
  RightSidebar,
  TopNavigation,
  usePageLayoutResize,
} from '../src';

import {
  ScrollableContent,
  SlotLabel,
  SlotWrapper,
  Toggle,
  ToggleBox,
} from './common';

type SlotName =
  | 'Banner'
  | 'TopNavigation'
  | 'LeftPanel'
  | 'LeftSidebar'
  | 'Main'
  | 'RightSidebar'
  | 'RightPanel'
  | 'PageLayout';

const ExpandKeyboardShortcut: FC = () => {
  const { isLeftSidebarCollapsed, expandLeftSidebar, collapseLeftSidebar } =
    usePageLayoutResize();

  const toggleSidebarCollapse = useCallback(() => {
    if (isLeftSidebarCollapsed) {
      expandLeftSidebar();
    } else {
      collapseLeftSidebar();
    }
  }, [isLeftSidebarCollapsed, expandLeftSidebar, collapseLeftSidebar]);

  useEffect(() => {
    const toggle = (event: KeyboardEvent) => {
      if (event.which === 219) {
        toggleSidebarCollapse();
      }
    };

    return bind(document, {
      type: 'keydown',
      listener: toggle,
    });
  }, [toggleSidebarCollapse]);

  return null;
};

const iframeStyles = css({
  width: '100%',
  height: '100%',
  background: token('color.background.accent.green.subtle', 'green'),
});

const initialState = {
  isBannerShown: false,
  isTopNavigationShown: true,
  isLeftPanelShown: false,
  isLeftSidebarShown: true,
  isMainShown: true,
  isRightSidebarShown: false,
  isRightPanelShown: false,
  isBannerFixed: true,
  isTopNavigationFixed: true,
  isLeftPanelFixed: false,
  isLeftPanelScrollable: false,
  isLeftSidebarFixed: true,
  isLeftSidebarScrollable: false,
  isMainScrollable: false,
  isMainExtraWide: false,
  isRightSidebarFixed: false,
  isRightSidebarScrollable: false,
  isRightPanelFixed: false,
  isRightPanelScrollable: false,
  isPageLayoutShown: true,
};

const iframeLabelStyles = css({
  padding: token('space.050', '0'),
  position: 'absolute',
  background: token('color.background.inverse.subtle', 'black'),
  color: token('color.text.inverse', 'white'),
  fontSize: token('font.size.400', '16px'),
  lineHeight: token('font.lineHeight.400', '16px'),
  pointerEvents: 'none',
});

const BasicGrid = () => {
  const [gridState, setGridState] = useState(initialState);

  const ToggleFixed = useCallback(
    ({ slotName }: { slotName: SlotName }) => {
      const gridKey = `is${slotName}Fixed` as keyof typeof gridState;
      return (
        <Toggle
          id={`${slotName}--fixed`}
          isChecked={gridState[gridKey]}
          onChange={() =>
            setGridState({ ...gridState, [gridKey]: !gridState[gridKey] })
          }
        >
          Toggle fixed
        </Toggle>
      );
    },
    [gridState],
  );

  const ToggleScrollable = useCallback(
    ({ slotName }: { slotName: SlotName }) => {
      const gridKey = `is${slotName}Scrollable` as keyof typeof gridState;
      return (
        <Fragment>
          <Toggle
            data-toggle-scrollable
            id={`${slotName}--scrollable`}
            isChecked={gridState[gridKey]}
            onChange={() =>
              setGridState({ ...gridState, [gridKey]: !gridState[gridKey] })
            }
          >
            Toggle scrollable content
          </Toggle>
          {gridState[gridKey] && <ScrollableContent />}
        </Fragment>
      );
    },
    [gridState],
  );

  const ToggleShown = useCallback(
    ({ slotName }: { slotName: SlotName }) => {
      const gridKey = `is${slotName}Shown` as keyof typeof gridState;
      return (
        <Toggle
          id={`${slotName}--shown`}
          onChange={() =>
            setGridState({ ...gridState, [gridKey]: !gridState[gridKey] })
          }
          isChecked={gridState[gridKey] !== initialState[gridKey]}
        >{`${gridState[gridKey] ? 'Unmount' : 'Mount'} ${slotName}`}</Toggle>
      );
    },
    [gridState],
  );

  return (
    <Fragment>
      {gridState.isPageLayoutShown && (
        <PageLayout
          onLeftSidebarExpand={(state: LeftSidebarState) =>
            console.log('onExpand', state)
          }
          onLeftSidebarCollapse={(state: LeftSidebarState) =>
            console.log('onCollapse', state)
          }
        >
          {gridState.isBannerShown && (
            <Banner height={60} isFixed={gridState.isBannerFixed}>
              <SlotWrapper
                borderColor={token('color.border.accent.yellow', 'gold')}
              >
                <SlotLabel>Banner</SlotLabel>
                <ToggleFixed slotName="Banner" />
              </SlotWrapper>
            </Banner>
          )}
          {gridState.isTopNavigationShown && (
            <TopNavigation height={60} isFixed={gridState.isTopNavigationFixed}>
              <SlotWrapper
                borderColor={token('color.border.accent.blue', 'blue')}
              >
                <SlotLabel>TopNavigation</SlotLabel>
                <ToggleFixed slotName="TopNavigation" />
              </SlotWrapper>
            </TopNavigation>
          )}
          {gridState.isLeftPanelShown && (
            <LeftPanel isFixed={gridState.isLeftPanelFixed} width={200}>
              <SlotWrapper
                borderColor={token('color.border.accent.orange', 'orange')}
              >
                <SlotLabel>LeftPanel</SlotLabel>
                <ToggleFixed slotName="LeftPanel" />
                <ToggleScrollable slotName="LeftPanel" />
              </SlotWrapper>
            </LeftPanel>
          )}
          <Content testId="content">
            {gridState.isLeftSidebarShown && (
              <LeftSidebar
                testId="left-sidebar"
                id="left-sidebar"
                skipLinkTitle="Left sidebar"
                isFixed={gridState.isLeftSidebarFixed}
                onResizeStart={(state: LeftSidebarState) =>
                  console.log('onResizeStart', state)
                }
                onResizeEnd={(state: LeftSidebarState) =>
                  console.log('onResizeEnd', state)
                }
                onFlyoutExpand={() => console.log('onFlyoutExpand')}
                onFlyoutCollapse={() => console.log('onFlyoutCollapse')}
                // eslint-disable-next-line @repo/internal/react/no-unsafe-overrides
                overrides={{
                  ResizeButton: {
                    render: (Component, props) => (
                      <Tooltip
                        content={
                          props.isLeftSidebarCollapsed ? 'Expand' : 'Collapse'
                        }
                        hideTooltipOnClick
                        position="right"
                        testId="tooltip"
                      >
                        <Component {...props} />
                      </Tooltip>
                    ),
                  },
                }}
              >
                <SlotWrapper hasExtraPadding hasHorizontalScrollbar={false}>
                  <SlotLabel>LeftSidebar</SlotLabel>
                  <ToggleFixed slotName="LeftSidebar" />
                  <ToggleScrollable slotName="LeftSidebar" />
                </SlotWrapper>
                <ExpandKeyboardShortcut />
              </LeftSidebar>
            )}
            {gridState.isMainShown && (
              <Main id="main" skipLinkTitle="Main">
                <SlotWrapper>
                  <Fragment>
                    <code css={iframeLabelStyles}>{'<iframe>'}</code>
                    <iframe
                      src="about:blank"
                      title="example iframe"
                      frameBorder="0"
                      css={iframeStyles}
                    />
                  </Fragment>
                </SlotWrapper>
              </Main>
            )}
            {gridState.isRightSidebarShown && (
              <RightSidebar isFixed={gridState.isRightSidebarFixed} width={200}>
                <SlotWrapper
                  borderColor={token('color.border.accent.green', 'darkgreen')}
                >
                  <SlotLabel>RightSidebar</SlotLabel>
                  <ToggleFixed slotName="RightSidebar" />
                  <ToggleScrollable slotName="RightSidebar" />
                </SlotWrapper>
              </RightSidebar>
            )}
          </Content>
          {gridState.isRightPanelShown && (
            <RightPanel isFixed={gridState.isRightPanelFixed} width={200}>
              <SlotWrapper
                borderColor={token('color.border.accent.orange', 'orange')}
              >
                <SlotLabel>RightPanel</SlotLabel>
                <ToggleFixed slotName="RightPanel" />
                <ToggleScrollable slotName="RightPanel" />
              </SlotWrapper>
            </RightPanel>
          )}
        </PageLayout>
      )}
      <ToggleBox>
        <ToggleShown slotName="Banner" />
        <ToggleShown slotName="TopNavigation" />
        <ToggleShown slotName="LeftPanel" />
        <ToggleShown slotName="LeftSidebar" />
        <ToggleShown slotName="Main" />
        <ToggleShown slotName="RightSidebar" />
        <ToggleShown slotName="RightPanel" />
        <ToggleShown slotName="PageLayout" />
      </ToggleBox>
    </Fragment>
  );
};
export default BasicGrid;