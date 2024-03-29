/** @jsx jsx */
import { ReactNode } from 'react';

import { css, jsx } from '@emotion/react';

import { Box, xcss } from '@atlaskit/primitives';
import { N20, N200 } from '@atlaskit/theme/colors';
import { token } from '@atlaskit/tokens';

import Tabs, { TabList, TabPanel, useTab } from '../../src';

const panelStyles = css({
  display: 'flex',
  marginTop: token('space.200', '16px'),
  marginBottom: token('space.100', '8px'),
  padding: token('space.400', '32px'),
  alignItems: 'center',
  justifyContent: 'center',
  flexDirection: 'column',
  flexGrow: 1,
  backgroundColor: token('color.background.neutral', N20),
  borderRadius: token('border.radius', '3px'),
  color: token('color.text.subtlest', N200),
  fontSize: '4em',
  fontWeight: 500,
});

export const Panel = ({ children }: { children: ReactNode }) => (
  <div css={panelStyles}>{children}</div>
);

const customTabStyles = xcss({
  fontSize: '16px',
});

const CustomTab = ({ label }: { label: string }) => {
  const tabAttributes = useTab();

  return (
    <Box xcss={customTabStyles} {...tabAttributes}>
      {label}
    </Box>
  );
};

const TabCustomExample = () => (
  <Tabs id="custom-tabs">
    <TabList>
      <CustomTab label="Tab 1" />
      <CustomTab label="Tab 2" />
      <CustomTab label="Tab 3" />
    </TabList>
    <TabPanel>
      <Panel>One</Panel>
    </TabPanel>
    <TabPanel>
      <Panel>Two</Panel>
    </TabPanel>
    <TabPanel>
      <Panel>Three</Panel>
    </TabPanel>
  </Tabs>
);

export default TabCustomExample;
