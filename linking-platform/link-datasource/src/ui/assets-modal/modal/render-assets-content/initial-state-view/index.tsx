/** @jsx jsx */

import { css, jsx } from '@emotion/react';
import { useIntl } from 'react-intl-next';

import { token } from '@atlaskit/tokens';

import { CrystalBallSVG } from './assets/crystal-ball-svg';
import { initialStateViewMessages } from './messages';

const initialStateViewContainerStyles = css({
  display: 'flex',
  justifyContent: 'center',
  height: '100%',
});
const svgAndTextsWrapperStyles = css({
  textAlign: 'center',
  alignSelf: 'center',
});
const searchTitleStyles = css({
  fontWeight: token('font.weight.semibold', '600'),
  fontSize: token('font.size.200', '16px'),
  lineHeight: token('font.lineHeight.300', '24px'),
  paddingTop: token('space.200', '16px'),
  paddingBottom: token('space.100', '8px'),
});
export const InitialStateView = () => {
  const { formatMessage } = useIntl();
  return (
    <div
      css={initialStateViewContainerStyles}
      data-testid="assets-aql-datasource-modal--initial-state-view"
    >
      <div css={svgAndTextsWrapperStyles}>
        <CrystalBallSVG />
        <div css={searchTitleStyles}>
          {formatMessage(initialStateViewMessages.searchTitle)}
        </div>
        <div>{formatMessage(initialStateViewMessages.searchDescription)}</div>
        <a>{formatMessage(initialStateViewMessages.learnMoreLink)}</a>
      </div>
    </div>
  );
};
