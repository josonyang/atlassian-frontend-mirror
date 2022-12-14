/** @jsx jsx */
import styled from '@emotion/styled';
import { fontSize, gridSize } from '@atlaskit/theme/constants';
import * as colors from '@atlaskit/theme/colors';
import { token } from '@atlaskit/tokens';

type ArticlesListItemWrapperProps = {
  styles: any;
};

export const ArticlesListItemWrapper = styled.a<ArticlesListItemWrapperProps>(
  {
    position: `relative`,
    boxSizing: `border-box`,
    padding: `${gridSize()}px`,
    display: `block`,
    textDecoration: `none`,
    cursor: `pointer`,
    color: `${token('color.text.subtlest', colors.N200)}`,
    borderRadius: `3px`,
    backgroundColor: `${token(
      'color.background.neutral.subtle',
      'transparent',
    )}`,

    '&:hover, &:focus, &:visited, &:active': {
      textDecoration: `none`,
      outline: `none`,
      outlineOffset: `none`,
    },

    '&:focus': {
      boxShadow: `${token(
        'color.border.focused',
        colors.B100,
      )} 0px 0px 0px 2px inset`,
    },

    '&:hover': {
      backgroundColor: `${token(
        'color.background.neutral.subtle.hovered',
        colors.N30,
      )}`,
    },

    '&:active': {
      backgroundColor: `${token(
        'color.background.neutral.subtle.pressed',
        colors.B50,
      )}`,
    },
  },
  (props: any) => props.styles,
);

export const ArticlesListItemContainer = styled.div`
  width: 100%;
  white-space: nowrap;
`;

export const ArticlesListItemTypeTitle = styled.div`
  font-weight: bold;
  font-size: 11px;
  line-height: ${gridSize() * 2}px;
  color: ${token('color.text.subtlest', colors.N200)};
  padding-bottom: ${gridSize() / 2}px;
`;

export const ArticlesListItemLinkIcon = styled.span`
  align-self: auto;
  padding-inline-start: 5px;
  vertical-align: middle;
`;

export const ArticlesListItemTitleText = styled.span`
  text-decoration: none;
  color: ${token('color.text', colors.N800)};
  font-size: ${fontSize()}px;
  font-weight: 600;
  display: inline-block;
  line-height: ${gridSize() * 2.5}px;
  white-space: normal;
  overflow-x: hidden;
  margin-bottom: ${gridSize()}px;
`;

export const ArticlesListItemDescription = styled.p`
  display: block;
  line-height: ${gridSize() * 2.5}px;
  color: ${token('color.text.subtle', colors.N400)};
  margin: 0;
`;
