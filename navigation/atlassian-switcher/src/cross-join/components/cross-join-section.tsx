import React, { FunctionComponent } from 'react';
import messages from '../../common/utils/messages';
import {
  Section,
  ItemWithAvatarGroup,
  FormattedMessage,
} from '../../ui/primitives';
import { SwitcherItemType } from '../../common/utils/links';
import { JoinableSiteItemType } from '../../cross-join/utils/cross-join-links';
import { Appearance } from '../../ui/theme/types';
import {
  JoinableSiteClickHandler,
  SyntheticProviderResults,
  ProviderResults,
} from '../../types';
import {
  NavigationAnalyticsContext,
  getItemAnalyticsContext,
} from '../../common/utils/analytics';

interface CrossJoinSectionProps {
  licensedProductLinks: SwitcherItemType[];
  joinableSiteLinks?: JoinableSiteItemType[];
  appearance?: Appearance;
  onJoinableSiteClicked?: JoinableSiteClickHandler;
  onClose?: () => void;
  rawProviderResults: ProviderResults & SyntheticProviderResults;
}

export const CrossJoinSection: FunctionComponent<CrossJoinSectionProps> = props => {
  const {
    appearance,
    joinableSiteLinks = [],
    onJoinableSiteClicked,
    onClose,
    licensedProductLinks,
  } = props;
  return (
    <Section
      sectionId="join"
      title={<FormattedMessage {...messages.join} />}
      appearance={appearance}
    >
      {joinableSiteLinks.map(
        (
          { cloudId, description, href, Icon, label, productType, users },
          groupIndex: number,
        ) => (
          <NavigationAnalyticsContext
            key={groupIndex}
            data={getItemAnalyticsContext(
              groupIndex,
              cloudId,
              'join',
              href,
              productType,
            )}
          >
            <ItemWithAvatarGroup
              icon={<Icon theme="product" />}
              description={description}
              users={users}
              href={href}
              onItemClick={(event: React.SyntheticEvent) => {
                if (onJoinableSiteClicked) {
                  onJoinableSiteClicked({
                    event,
                    href,
                    cloudId,
                    productType,
                    availableProducts: licensedProductLinks,
                  });
                } else {
                  onClose && onClose();
                }
              }}
              target="_blank"
              rel="noreferrer"
            >
              {label}
            </ItemWithAvatarGroup>
          </NavigationAnalyticsContext>
        ),
      )}
    </Section>
  );
};