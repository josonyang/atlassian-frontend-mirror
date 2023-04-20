/** @jsx jsx */
import { jsx, css } from '@emotion/react';
import type { Dispatch, SetStateAction } from 'react';
import CopyButton from './codeBlockCopyButton';
import CodeWrapButton from './codeBlockWrapButton';
import { token } from '@atlaskit/tokens';
import { N0, N20, N30, N700 } from '@atlaskit/theme/colors';

export interface CodeBlockButtonContainerProps {
  allowCopyToClipboard?: boolean;
  allowWrapCodeBlock?: boolean;
  setWrapLongLines: Dispatch<SetStateAction<boolean>>;
  text: string;
  wrapLongLines: boolean;
}

const codeBlockButtonsWrapper = css({
  position: 'sticky',
  top: '0px',
});

const codeBlockButtonsStyle = css({
  display: 'flex',
  justifyContent: 'flex-end',
  position: 'absolute',
  height: '0',
  width: '100%',
  right: '6px',
  top: '4px',
  padding: '2px',
  button: {
    height: '32px',
    width: '32px',
    border: `2px solid ${token('color.border.inverse', N0)}`,
    borderRadius: '4px',
    marginLeft: '4px',
    padding: '2px',
    background: `${token('color.background.neutral.subtle', N20)}`,
    color: `${token('color.icon', 'rgb(66, 82, 110)')}`,

    '&:hover': {
      borderWidth: '2px',
      backgroundColor: `${token('color.background.neutral.hovered', N30)}`,
      height: '32px',
      width: '32px',
    },
    '&.clicked': {
      backgroundColor: `${token(
        'color.background.neutral.bold.pressed',
        N700,
      )}`,
      borderRadius: '4px',
      color: `${token('color.icon.inverse', N0)} !important`,
    },
  },
});

const CodeBlockButtonContainer = ({
  allowCopyToClipboard,
  allowWrapCodeBlock,
  setWrapLongLines,
  text,
  wrapLongLines,
}: CodeBlockButtonContainerProps) => {
  return (
    <div css={codeBlockButtonsWrapper}>
      <div css={codeBlockButtonsStyle}>
        {allowWrapCodeBlock && (
          <CodeWrapButton
            setWrapLongLines={setWrapLongLines}
            wrapLongLines={wrapLongLines}
          />
        )}
        {allowCopyToClipboard && <CopyButton content={text} />}
      </div>
    </div>
  );
};

export default CodeBlockButtonContainer;