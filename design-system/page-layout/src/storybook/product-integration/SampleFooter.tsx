/** @jsx jsx */
import React, { Fragment } from 'react';

import { jsx } from '@emotion/core';

/* eslint-disable import/no-extraneous-dependencies */
import { CustomItemComponentProps } from '@atlaskit/menu';
import { Footer } from '@atlaskit/side-navigation';
/* eslint-enable import/no-extraneous-dependencies */
import { B400, N200 } from '@atlaskit/theme/colors';

const Container: React.FC<CustomItemComponentProps> = props => {
  return <div {...props} />;
};

// This example footer conforms to a design taken from Jira designs found at
// https://www.figma.com/file/GA22za6unqO2WsBWM0Ddxk/Jira-navigation-3?node-id=124%3A7194
const ExampleFooter = () => {
  const linkCSS = {
    fontSize: 12,
    color: N200,
    '&:hover': {
      color: B400,
      textDecoration: 'none',
      cursor: 'pointer',
    },
  };

  return (
    <Footer
      component={Container}
      description={
        <Fragment>
          <a css={linkCSS}>Give feedback</a> {' ∙ '}
          <a css={linkCSS}>Learn more</a>
        </Fragment>
      }
    >
      You're in a next-gen project
    </Footer>
  );
};

export default ExampleFooter;
