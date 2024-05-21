import React, { Fragment } from 'react';
import { type NewIconProps } from '../../src/types';

import { IconTile } from '../../src';
import AddIcon from '../../core/add';

import { Inline } from '@atlaskit/primitives';

const IconSizeExample = () => {
  const sizes = ['24', '32', '40', '48'] as const;
  const appearances = [
    'blue',
    'blueBold',
    'green',
    'greenBold',
    'lime',
    'limeBold',
    'magenta',
    'magentaBold',
    'orange',
    'orangeBold',
    'purple',
    'purpleBold',
    'red',
    'redBold',
    'teal',
    'tealBold',
    'yellow',
    'yellowBold',
  ] as const;
  const shapes = ['square', 'circle'] as const;

  return (
    <div>
      {sizes.map((size) => (
        <Inline space="space.100" shouldWrap={true} key={size}>
          {appearances.map((appearance) => (
            <Fragment key={appearance}>
              {shapes.map((shape) => (
                <IconTile
                  key={shape}
                  icon={(props: NewIconProps) => <AddIcon {...props} />}
                  label=""
                  appearance={appearance}
                  shape={shape}
                  size={size}
                />
              ))}
            </Fragment>
          ))}
        </Inline>
      ))}
    </div>
  );
};

export default IconSizeExample;
