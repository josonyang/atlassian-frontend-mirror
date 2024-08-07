
import React from 'react';
import Icon from '@atlaskit/icon/UNSAFE_base-new';

declare const NotificationIconMigration: {
  (props: Omit<React.ComponentProps<typeof Icon>, 'dangerouslySetGlyph' | 'type' | 'LEGACY_fallbackIcon'> ): JSX.Element;
  displayName: string;
};
export default NotificationIconMigration;
