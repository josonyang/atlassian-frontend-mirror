import React from 'react';

import capitalize from 'lodash/capitalize';

import ChevronDownIcon from '@atlaskit/icon/glyph/chevron-down';
import { Stack } from '@atlaskit/primitives';

import appearances from '../src/utils/appearances';
import variants from '../src/utils/variants';

export default function AppearancesExample() {
  return (
    <Stack space="space.100" alignInline="start">
      {variants.map(({ name, Component }) => (
        <Stack space="space.150" key={name}>
          <h2>{name}</h2>
          <table>
            <thead>
              <tr>
                <th>Appearance</th>
                <th>Default</th>
                <th>Icon after</th>
                <th>Selected</th>
              </tr>
            </thead>
            <tbody>
              {appearances.map((appearance) => (
                <tr key={appearance}>
                  <th>{capitalize(appearance)}</th>
                  <td>
                    <Component appearance={appearance}>Default</Component>
                  </td>
                  <td>
                    <Component
                      appearance={appearance}
                      iconAfter={<ChevronDownIcon label="" />}
                    >
                      Icon after
                    </Component>
                  </td>
                  <td>
                    <Component appearance={appearance} isSelected>
                      Selected
                    </Component>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </Stack>
      ))}
    </Stack>
  );
}