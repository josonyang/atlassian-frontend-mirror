import { css } from '@emotion/react';
import { token } from '@atlaskit/tokens';
import { checkeredBg } from '../src/image-placer/styles';
export const labelStyles = css`
  display: block;

  > input {
    margin-left: 10px;
  }

  > span {
    display: inline-block;
    min-width: 120px;
    text-align: right;
  }
`;
export const exportedImageStyles = css`
  border: 1px solid ${token('color.border', '#ccc')};
`;

export const exportedImageWrapperStyles = css`
  display: inline-block;
  background: url('${checkeredBg}');
  margin-top: 20px;
  position: relative;
`;

export const layoutStyles = css`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: space-around;
  height: 80vh;
`;

export const wrapperStyles = css`
  margin: 10px;
`;
