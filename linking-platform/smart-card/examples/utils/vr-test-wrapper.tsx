/** @jsx jsx */
import React from 'react';
import { DiProvider, injectable } from 'react-magnetic-di';
import { css, jsx, type SerializedStyles } from '@emotion/react';
import { IntlProvider } from 'react-intl-next';
import { global } from './vr-test';
import { imageForbidden, imageNotFound, imageUnauthorised } from '../images';
import { getUnresolvedEmbedCardImage } from '../../src/view/EmbedCard/utils';
import { IFrame } from '../../src/view/EmbedCard/components/IFrame';

const styles = css`
  padding: 10px;
`;

const mockGetEmbedCardImage = injectable(
  getUnresolvedEmbedCardImage,
  (status: 'forbidden' | 'unauthorized' | 'notFound') => {
    switch (status) {
      case 'forbidden':
        return imageForbidden;
      case 'notFound':
        return imageNotFound;
      case 'unauthorized':
        return imageUnauthorised;
    }
  },
);

const iframeContent = `
<html>
  <body style="font-family:sans-serif;text-align:center;background-color:#091E4208">
    VR TEST: EMBED CONTENT
  </body>
</html>
`;

const MockIFrame: typeof IFrame = injectable(
  IFrame,
  ({ childRef, ...props }) => (
    <iframe ref={childRef} {...props} srcDoc={iframeContent} />
  ),
);

const dependencies = [mockGetEmbedCardImage, MockIFrame];

export type VRTestWrapperProps = {
  overrideCss?: SerializedStyles;
};
const VRTestWrapper: React.FC<VRTestWrapperProps> = ({
  children,
  overrideCss,
}) => {
  return (
    <DiProvider use={dependencies}>
      <IntlProvider locale="en">
        <div className="vr-test-wrapper" css={[styles, overrideCss]}>
          {global}
          {children}
        </div>
      </IntlProvider>
    </DiProvider>
  );
};

export default VRTestWrapper;
