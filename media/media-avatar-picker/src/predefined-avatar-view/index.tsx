/**@jsx jsx */
import { jsx } from '@emotion/react';
import { PureComponent } from 'react';
import { FormattedMessage, useIntl } from 'react-intl-next';
import { messages } from '@atlaskit/media-ui';
import { predefinedAvatarViewWrapperStyles } from './styles';
import { Avatar } from '../avatar-list';

import ArrowLeftIcon from '@atlaskit/icon/glyph/arrow-left';
import Button from '@atlaskit/button/custom-theme-button';
import { LargeAvatarImage } from './largeImageAvatar';
import { imageButton } from '../avatar-list/styles';

export interface BackBtnProps {
  onClick?: () => void;
}

const BackBtn = ({ onClick }: BackBtnProps) => {
  const intl = useIntl();

  return (
    <Button
      aria-label={intl.formatMessage(messages.avatar_picker_back_btn_label)}
      className="back-button"
      iconAfter={<ArrowLeftIcon label="" />}
      onClick={onClick}
    />
  );
};

export interface PredefinedAvatarViewProps {
  avatars: Array<Avatar>;
  onGoBack?: () => void;
  onAvatarSelected: (avatar: Avatar) => void;
  selectedAvatar?: Avatar;
  predefinedAvatarsText?: string;
}

export class PredefinedAvatarView extends PureComponent<
  PredefinedAvatarViewProps,
  {}
> {
  static defaultProps: PredefinedAvatarViewProps = {
    avatars: [],
    onAvatarSelected() {},
  };

  render() {
    const { avatars, selectedAvatar, onGoBack, predefinedAvatarsText } =
      this.props;
    const cards = avatars.map((avatar, idx) => {
      const elementKey = `predefined-avatar-${idx}`;

      return (
        <li key={elementKey}>
          <button
            onClick={this.createOnItemClickHandler(avatar)}
            aria-label={avatar.name || undefined}
            css={imageButton({ isSelected: avatar === selectedAvatar })}
          >
            <LargeAvatarImage
              isSelected={avatar === selectedAvatar}
              src={avatar.dataURI}
              alt={avatar.name || undefined}
            />
          </button>
        </li>
      );
    });

    return (
      <div
        css={predefinedAvatarViewWrapperStyles}
        id="predefined-avatar-view-wrapper"
      >
        <div className="header">
          <BackBtn onClick={onGoBack} />
          <div className="description">
            {predefinedAvatarsText || (
              <FormattedMessage {...messages.default_avatars} />
            )}
          </div>
        </div>
        <ul>{cards}</ul>
      </div>
    );
  }

  createOnItemClickHandler(avatar: Avatar) {
    const { onAvatarSelected } = this.props;
    return () => {
      if (onAvatarSelected) {
        onAvatarSelected(avatar);
      }
    };
  }
}
