/** @jsx jsx */
import React from 'react';
import { FormattedMessage } from 'react-intl-next';
import { css, jsx, type SerializedStyles } from '@emotion/react';

import { token } from '@atlaskit/tokens';
import { LinkIcon } from '../../../elements';
import { type TitleBlockViewProps } from '../types';
import Block from '../../block';
import {
  SmartLinkAlignment,
  SmartLinkDirection,
  SmartLinkSize,
} from '../../../../../../constants';
import {
  getLinkLineHeight,
  getLinkSizeStyles,
  getTruncateStyles,
} from '../../../utils';
import ElementGroup from '../../element-group';

const actionStyles: SerializedStyles = css({
  cursor: 'pointer',
  ':hover': {
    color: token('color.text.subtle', '#8993A4'),
    textDecoration: 'underline',
  },
});

const getMessageStyles = (
  size: SmartLinkSize,
  hasAction: boolean,
): SerializedStyles => {
  const sizeStyles = getLinkSizeStyles(size);
  return css(
    {
      flex: '1 1 auto',
      justifyContent: 'flex-end',
    },
    hasAction ? actionStyles : '',
    sizeStyles,
    getTruncateStyles(1, getLinkLineHeight(size)),
    {
      color: token('color.text.disabled', '#6B778C'),
      ':focus': {
        outline: `${token('color.border.focused', '#388BFF')} solid 2px`,
      },
    },
  );
};

/**
 * Represents an Errored TitleBlock view.
 * This will render when a Smart Link did not successfully resolve.
 * This may be a result of a Smart Link not having the correct credentials,
 * or the backend response was errored or malformed.
 * @see TitleBlock
 */
const TitleBlockErroredView: React.FC<TitleBlockViewProps> = ({
  actionGroup,
  retry,
  position,
  testId,
  title,
  icon,
  hideIcon,
  ...blockProps
}) => {
  const { descriptor, onClick, values } = retry || {};
  const { size = SmartLinkSize.Medium } = blockProps;
  const hasAction = onClick !== undefined;
  return (
    <Block {...blockProps} testId={`${testId}-errored-view`}>
      {!hideIcon && <LinkIcon overrideIcon={icon} position={position} />}
      {title}
      {descriptor && (
        <ElementGroup
          direction={SmartLinkDirection.Horizontal}
          align={SmartLinkAlignment.Right}
        >
          <span
// eslint-disable-next-line @atlaskit/ui-styling-standard/no-classname-prop -- Ignored via go/DSP-18766
            className={hasAction ? 'has-action' : ''}
            css={getMessageStyles(size, hasAction)}
            onClick={onClick}
            data-testid={`${testId}-errored-view-message`}
            tabIndex={hasAction ? 0 : -1}
          >
            <FormattedMessage {...descriptor} values={values} />
          </span>
        </ElementGroup>
      )}
      {actionGroup}
    </Block>
  );
};

export default TitleBlockErroredView;
