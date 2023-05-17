import React from 'react';
import { IntlProvider } from 'react-intl-next';
import Page from '@atlaskit/page';

interface VRTestCaseOpts {
  title: string;
  children: () => JSX.Element;
}

export const VRTestCase = ({ title, children }: VRTestCaseOpts) => {
  return (
    <IntlProvider locale={'en'}>
      <Page>
        <div style={{ padding: '30px' }}>
          <h6>{title}</h6>
          {children()}
        </div>
      </Page>
    </IntlProvider>
  );
};
