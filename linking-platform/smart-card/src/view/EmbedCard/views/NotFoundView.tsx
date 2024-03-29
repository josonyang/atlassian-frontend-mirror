import React, { FC } from 'react';
import { EmbedCardUnresolvedView } from './UnresolvedView';
import { ExpandedFrame } from '../components/ExpandedFrame';
import { ImageIcon } from '../components/ImageIcon';
import { ContextViewModel } from '../types';
import { getUnresolvedEmbedCardImage } from '../utils';
import { di } from 'react-magnetic-di';

export interface EmbedCardNotFoundViewProps {
  context?: ContextViewModel;
  link: string;
  isSelected?: boolean;
  testId?: string;
  inheritDimensions?: boolean;
  onClick?: (evt: React.MouseEvent) => void;
}

/**
 * @deprecated {@link https://product-fabric.atlassian.net/browse/EDM-7977 Internal documentation for deprecation (no external access)}\
 * @deprecated Replaced by not-found-view
 */
export const EmbedCardNotFoundView: FC<EmbedCardNotFoundViewProps> = ({
  link,
  context,
  isSelected,
  inheritDimensions,
  testId = 'embed-card-not-found-view',
  onClick,
}) => {
  di(getUnresolvedEmbedCardImage);

  const icon = context && context.icon && (
    <ImageIcon
      src={typeof context.icon === 'string' ? context.icon : undefined}
    />
  );
  return (
    <ExpandedFrame
      href={link}
      icon={icon}
      text={context && context.text}
      frameStyle="show"
      isSelected={isSelected}
      inheritDimensions={inheritDimensions}
      onClick={onClick}
      testId={testId}
      allowScrollBar={true}
    >
      <EmbedCardUnresolvedView
        image={getUnresolvedEmbedCardImage('notFound')}
        title="not_found_title"
        description="not_found_description"
        context={context && context.text}
        testId={testId}
      />
    </ExpandedFrame>
  );
};
