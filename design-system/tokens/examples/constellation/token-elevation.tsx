import React from 'react';

import token from '../../src/get-token';

import Card from './token-card-base';

export const TokenElevationCodeBlock = `// Sunken
label: 'Sunken',
backgroundColor: token('elevation.surface.sunken'),

// Default
label: 'Default',
backgroundColor: token('elevation.surface'),
border: \`1px solid \${token('color.border')}\`,

// Raised
backgroundColor: token('elevation.surface.raised'),
shadow: token('elevation.shadow.raised'),

// Overlay
backgroundColor: token('elevation.surface.overlay'),
shadow: token('elevation.shadow.overlay'),
`;

const elevationStyles = {
  sunken: {
    label: 'Sunken',
    backgroundColor: token('elevation.surface.sunken', '#F7F8F9'),
    shadow: 'none',
  },
  default: {
    label: 'Default',
    border: `1px solid ${token('color.border', '#091E4224')}`,
    backgroundColor: token('elevation.surface', '#FFFFFF'),
    shadow: 'none',
  },
  raised: {
    label: 'Raised',
    backgroundColor: token('elevation.surface.raised', '#FFFFFF'),
    shadow: token(
      'elevation.shadow.raised',
      '0px 1px 1px #091E4240, 0px 0px 1px #091E424F',
    ),
  },
  overlay: {
    label: 'Overlay',
    backgroundColor: token('elevation.surface.overlay', '#FFFFFF'),
    shadow: token(
      'elevation.shadow.overlay',
      '0px 8px 12px #091E4226, 0px 0px 1px #091E424F',
    ),
  },
};

export const TokenElevation = () => {
  return (
    <div
      style={{
        display: 'flex',
        gap: '24px',
        flexWrap: 'wrap',
      }}
    >
      {Object.entries(elevationStyles).map(([key, subStyle]) => (
        <Card key={key} tokenSet={subStyle} />
      ))}
    </div>
  );
};

export default { example: TokenElevation, code: TokenElevationCodeBlock };
