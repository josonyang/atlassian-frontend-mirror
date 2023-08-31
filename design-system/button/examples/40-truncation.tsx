import React from 'react';

import ChevronDownIcon from '@atlaskit/icon/glyph/chevron-down';
import { Box, xcss } from '@atlaskit/primitives';

import variants from '../src/utils/variants';

const ContrainedWidthCell = ({ children }: { children: React.ReactNode }) => {
  return (
    <td>
      <Box
        xcss={xcss({
          width: 'size.600',
        })}
      >
        {children}
      </Box>
    </td>
  );
};

const label = 'A really long text label';

export default function TruncationExample() {
  return (
    <table>
      <thead>
        <tr>
          <th>Variant</th>
          <th>Default</th>
          <th>Icon before</th>
          <th>Icon after</th>
        </tr>
      </thead>
      <tbody>
        {variants.map(({ name, Component }) => (
          <tr key={name}>
            <th>{name}</th>
            <ContrainedWidthCell>
              <Component>{label}</Component>
            </ContrainedWidthCell>
            <ContrainedWidthCell>
              <Component iconBefore={<ChevronDownIcon label="" />}>
                {label}
              </Component>
            </ContrainedWidthCell>
            <ContrainedWidthCell>
              <Component iconAfter={<ChevronDownIcon label="" />}>
                {label}
              </Component>
            </ContrainedWidthCell>
            <ContrainedWidthCell>
              <Component
                iconBefore={<ChevronDownIcon label="" />}
                iconAfter={<ChevronDownIcon label="" />}
              >
                {label}
              </Component>
            </ContrainedWidthCell>
          </tr>
        ))}
      </tbody>
    </table>
  );
}
