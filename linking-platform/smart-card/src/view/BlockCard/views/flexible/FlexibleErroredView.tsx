import React, { useMemo } from 'react';
import FlexibleCard from '../../../FlexibleCard';
import TitleBlock from '../../../FlexibleCard/components/blocks/title-block';
import { messages } from '../../../../messages';
import { token } from '@atlaskit/tokens';
import { R300 } from '@atlaskit/theme/colors';
import WarningIcon from '@atlaskit/icon/glyph/warning';
import BlockCardFooter from '../../components/flexible/footer';
import { RetryAction } from '../../actions/flexible/RetryAction';
import { ActionItem } from '../../../FlexibleCard/components/blocks/types';
import { CustomBlock } from '../../../FlexibleCard/components/blocks';
import Text from '../../../FlexibleCard/components/elements/text';
import { SmartLinkStatus } from '../../../../constants';
import { FlexibleBlockCardProps } from './types';

/**
 * This view represents a Block Card with an 'Errored' status.
 *
 * @see SmartLinkStatus
 * @see FlexibleCardProps
 */
const FlexibleErroredView = ({
  cardState,
  onAuthorize,
  onError,
  ui,
  url,
  onClick,
  testId = 'smart-block-errored-view',
}: FlexibleBlockCardProps) => {
  const status = cardState.status as SmartLinkStatus;

  const actions = useMemo<ActionItem[]>(
    () => (onAuthorize ? [RetryAction(onAuthorize)] : []),
    [onAuthorize],
  );

  return (
    <FlexibleCard
      cardState={cardState}
      onAuthorize={onAuthorize}
      onClick={onClick}
      onError={onError}
      testId={testId}
      ui={ui}
      url={url}
    >
      <TitleBlock hideRetry={true} />
      <CustomBlock>
        <WarningIcon
          label="errored-warning-icon"
          size="small"
          primaryColor={token('color.icon.warning', R300)}
          testId={`${testId}-warning-icon`}
        />
        <Text
          message={{
            descriptor: messages.could_not_load_link,
          }}
        />
      </CustomBlock>
      <CustomBlock>
        <BlockCardFooter actions={actions} status={status} />
      </CustomBlock>
    </FlexibleCard>
  );
};

export default FlexibleErroredView;
