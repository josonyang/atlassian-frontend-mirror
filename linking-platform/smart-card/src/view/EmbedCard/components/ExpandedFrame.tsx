import React, { FC, MouseEvent } from 'react';
import {
  className,
  LinkWrapper,
  Wrapper,
  Header,
  IconWrapper,
  TextWrapper,
  Content,
} from './styled';
import { handleClickCommon } from '../../BlockCard/utils/handlers';
import useMouseDownEvent from '../../../state/analytics/useMouseDownEvent';

export interface ExpandedFrameProps {
  isPlaceholder?: boolean;
  href?: string;
  icon?: React.ReactNode;
  text?: React.ReactNode;
  minWidth?: number;
  maxWidth?: number;
  children?: React.ReactNode;
  /** A flag that determines whether the card is selected in edit mode. */
  isSelected?: boolean;
  /** will show the frame regardless of user interaction */
  isFrameVisible?: boolean;
  /** A flag that determines whether the frame is visible. */
  isVisible?: boolean;
  /** The optional click handler */
  onClick?: (evt: React.MouseEvent) => void;
  /** For testing purposes only */
  testId?: string;
  /** If dimensions of the card are to be inherited from the parent */
  inheritDimensions?: boolean;
  /** To enable scrolling in use cases where the content will not have it's own scrollbar */
  allowScrollBar?: boolean;
}

export const ExpandedFrame: FC<ExpandedFrameProps> = ({
  isPlaceholder = false,
  children,
  onClick,
  icon,
  text,
  isSelected,
  isFrameVisible,
  isVisible,
  href,
  minWidth,
  maxWidth,
  testId = 'expanded-frame',
  inheritDimensions,
  allowScrollBar = false,
}) => {
  const isInteractive = () =>
    !isPlaceholder && (Boolean(href) || Boolean(onClick));
  const handleClick = (event: MouseEvent) => handleClickCommon(event, onClick);
  const handleMouseDown = useMouseDownEvent();

  const renderHeader = () => (
    <Header className="embed-header">
      <IconWrapper isPlaceholder={isPlaceholder}>
        {!isPlaceholder && icon}
      </IconWrapper>
      <TextWrapper isPlaceholder={isPlaceholder}>
        {!isPlaceholder && (
          <a href={href} onClick={handleClick} onMouseDown={handleMouseDown}>
            {text}
          </a>
        )}
      </TextWrapper>
    </Header>
  );
  const renderContent = () => (
    <Content
      data-testid="embed-content-wrapper"
      allowScrollBar={allowScrollBar}
      isInteractive={isInteractive()}
    >
      {children}
    </Content>
  );

  if (!isPlaceholder && href) {
    return (
      <LinkWrapper
        className={className}
        isInteractive={isInteractive()}
        isSelected={isSelected}
        isFrameVisible={isFrameVisible}
        minWidth={minWidth}
        maxWidth={maxWidth}
        isVisible={isVisible}
        data-testid={testId}
        data-trello-do-not-use-override={testId}
        // Due to limitations of testing library, we can't assert ::after
        data-is-selected={isSelected}
        // Due to limitation of testing library, we can't match background colors #ebecf0 and rgb(235, 236, 240)
        data-is-frame-visible={isFrameVisible}
        inheritDimensions={inheritDimensions}
      >
        {renderHeader()}
        {renderContent()}
      </LinkWrapper>
    );
  } else {
    return (
      <Wrapper
        className={className}
        isInteractive={isInteractive()}
        isSelected={isSelected}
        minWidth={minWidth}
        maxWidth={maxWidth}
        isVisible={isVisible}
        data-testid={testId}
        data-trello-do-not-use-override={testId}
        data-is-selected={isSelected}
        data-is-visible={isVisible}
        data-wrapper-type="default"
        data-is-interactive={isInteractive()}
      >
        {renderHeader()}
        {renderContent()}
      </Wrapper>
    );
  }
};
