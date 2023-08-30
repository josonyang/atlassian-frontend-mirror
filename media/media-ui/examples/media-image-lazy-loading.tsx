import { token } from '@atlaskit/tokens';
import React, { CSSProperties } from 'react';
import { IntlProvider } from 'react-intl-next';
import Page from '@atlaskit/page';
import { atlassianLogoUrl } from '../src/test-helpers/atlassianLogoUrl';

import { MediaImage } from '../src';

const paddingBoxStyle: CSSProperties = {
  height: '110vh',
  background: token('color.background.neutral', '#eee'),
  display: 'flex',
  flexDirection: 'column',
  justifyContent: 'space-between',
};
const imageBoxStyle: CSSProperties = {
  position: 'relative',
  height: '20rem',
  border: `1px solid ${token('color.border', 'black')}`,
};

export default () => {
  return (
    <IntlProvider locale={'en'}>
      <Page>
        <div
          style={{
            display: 'flex',
            flexDirection: 'column',
          }}
        >
          <div style={paddingBoxStyle}>
            <ol>
              <li>Open the network tab and disable cache.</li>
              <li>There should be network request to load the image. </li>
              <li>Scroll down.</li>
            </ol>
            <p>Right down.</p>
            <p>
              Check the network tab now. You'll see the network request to load
              the image.
            </p>
          </div>

          <div style={imageBoxStyle}>
            <MediaImage
              stretch={true}
              crop={false}
              onImageLoad={console.log}
              onImageError={console.error}
              dataURI={atlassianLogoUrl}
              loading="lazy"
            />
          </div>
        </div>
      </Page>
    </IntlProvider>
  );
};
