
import React from 'react';
import Icon from '@atlaskit/icon/UNSAFE_base-new';

declare const EpicIcon: {
  (props: Omit<React.ComponentProps<typeof Icon>, 'dangerouslySetGlyph' | 'type'>): JSX.Element;
  displayName: string;
};
export default EpicIcon;
