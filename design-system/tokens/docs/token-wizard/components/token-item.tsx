/** @jsx jsx */
import { ReactNode } from 'react';

import { css, jsx } from '@emotion/core';

import {
  N0,
  N20,
  N30,
  N40A,
  N50A,
  N60,
  N800,
  N90,
} from '@atlaskit/theme/colors';
import { borderRadius, fontSize, gridSize } from '@atlaskit/theme/constants';

import { token } from '../../../src';
import { cleanTokenName, getBoxShadow, getTextContrast } from '../../utils';
import type { Token as TokenType } from '../types';

import CopyPasteBlock from './copy-paste-block';

const cardsWrapperStyles = css({
  display: 'flex',
  margin: `${gridSize()}px 0 ${gridSize()}px`,
});

const tokenNameStyled = css({
  padding: `${gridSize() * 0.5}px`,
  background: token('color.background.neutral', N20),
  borderRadius: borderRadius(),
  color: token('color.text', N800),
  cursor: 'copy',
  fontSize: '12px',
  lineHeight: '24px',
  span: {
    color: token('color.icon.subtle', N90),
    verticalAlign: 'middle',
  },
  ':hover': {
    background: token('color.background.neutral.hovered', N30),
  },
  ':active': {
    background: token('color.background.neutral.pressed', N60),
  },
});

const colorBlockStyles = css({
  minWidth: gridSize() * 12,
  borderRadius: 3,
  cursor: 'copy',
  fontSize: fontSize(),
  lineHeight: '24px',
  textAlign: 'center',
});

const subheadingStyles = css({
  fontSize: fontSize(),
  lineHeight: '16px',
});

const descriptionStyles = css({
  marginTop: gridSize(),
  paddingBottom: gridSize() * 2,
  fontSize: fontSize(),
  lineHeight: '24px',
});

const valueCardStyles = css({
  minWidth: gridSize() * 6,
  marginRight: gridSize() * 0.5,
  padding: 2,
  background: token('elevation.surface.raised', N0),
  borderRadius: borderRadius(),
  boxShadow: token(
    'elevation.shadow.raised',
    `0 1px 1px ${N50A}, 0 0 1px 1px ${N40A}`,
  ),
});

const themeTextStyles = css({
  margin: '0 12px',
  textAlign: 'center',
});
/**
 * __TokenItem__
 *
 * A suggested token item on the result panel.
 *
 */
const TokenItem = ({
  lightTokenRaw,
  darkTokenRaw,
}: {
  lightTokenRaw: TokenType;
  darkTokenRaw: TokenType;
}) => {
  const {
    name,
    value: lightValue,
    original: { value: lightBaseToken },
    attributes: { group, description },
  } = lightTokenRaw;
  const {
    value: darkValue,
    original: { value: darkBaseToken },
  } = darkTokenRaw;
  const tokenName = cleanTokenName(name);

  const tokenValue = (theme: 'light' | 'dark') =>
    group === 'shadow'
      ? getBoxShadow(theme === 'light' ? lightValue : (darkValue as any))
      : theme === 'light'
      ? lightBaseToken
      : darkBaseToken;

  const getShadowBlockStyles = (value: any) => ({
    height: gridSize() * 3,
    // eslint-disable-next-line @atlaskit/design-system/ensure-design-token-usage
    backgroundColor: 'white',
    // eslint-disable-next-line @atlaskit/design-system/ensure-design-token-usage
    color: 'black',
    boxShadow: getBoxShadow(value as any),
  });

  const getBaseTokenBlockStyles = (value: any) => ({
    background: value,
    color: getTextContrast(value),
  });

  return (
    <div>
      <CopyPasteBlock
        text={tokenName}
        renderWrapper={(children) => (
          <code css={tokenNameStyled}>{children}</code>
        )}
      />
      <div css={cardsWrapperStyles}>
        <div css={valueCardStyles}>
          {group === 'shadow' ? (
            <div style={getShadowBlockStyles(lightValue)} />
          ) : (
            <CopyPasteBlock
              text={tokenValue('light')}
              renderWrapper={(children) => (
                <div
                  css={colorBlockStyles}
                  style={getBaseTokenBlockStyles(lightValue)}
                >
                  {children}
                </div>
              )}
            />
          )}
          <p css={themeTextStyles}>Light Mode</p>
        </div>

        <div css={valueCardStyles}>
          {group === 'shadow' ? (
            <div style={getShadowBlockStyles(darkValue)} />
          ) : (
            <CopyPasteBlock
              text={tokenValue('dark')}
              renderWrapper={(children: ReactNode) => (
                <div
                  css={colorBlockStyles}
                  style={getBaseTokenBlockStyles(darkValue)}
                >
                  {children}
                </div>
              )}
            />
          )}
          <p css={themeTextStyles}>Dark Mode</p>
        </div>
      </div>
      <h5 css={subheadingStyles}>Description</h5>
      <p css={descriptionStyles}>{description}</p>
    </div>
  );
};

export default TokenItem;
