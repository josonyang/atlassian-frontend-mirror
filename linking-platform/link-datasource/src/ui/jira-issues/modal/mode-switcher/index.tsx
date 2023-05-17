/** @jsx jsx */
import React from 'react';

import { css, jsx } from '@emotion/react';

import { N0, N20, N30A, N700 } from '@atlaskit/theme/colors';
import { token } from '@atlaskit/tokens';

export interface ModeSwitcherProps {
  isCompact?: boolean;
  isDisabled?: boolean;
  options: { label: string; value: string }[];
  onOptionValueChange: (selectedOptionValue: string) => void;
  selectedOptionValue?: string;
}

const modeSwitcherStyles = css({
  alignItems: 'center',
  background: token('color.background.neutral', N20),
  borderRadius: token('space.050', '4px'),
  boxSizing: 'border-box',
  display: 'inline-flex',
  gap: token('space.050', '4px'),
  lineHeight: token('space.200', '16px'),
  padding: token('space.075', '6px'),
  '&:disabled': {
    opacity: '0.5',
  },
});

const compactModeSwitcherStyles = css({
  padding: token('space.050', '4px'),
  gap: token('space.025', '2px'),
});

const modeInputStyles = css({
  display: 'none',
});

const modeSwitcherLabelStyles = css({
  color: token('color.text.subtlest', N700),
  fontSize: token('space.150', '12px'),
  fontWeight: '600',
  textTransform: 'uppercase',

  padding: `${token('space.050', '4px')}`,
  borderRadius: token('space.050', '4px'),
  ':hover': {
    cursor: 'pointer',
    backgroundColor: token('color.background.neutral.subtle.hovered', N30A),
  },
});

const modeSwitcherLabelSelectedStyles = css({
  backgroundColor: token('color.background.input.pressed', N0),
  borderRadius: token('space.050', '4px'),
  boxShadow: token(
    'elevation.shadow.overflow',
    '0px 0px 1px rgba(9, 30, 66, 0.12), 0px 0px 8px rgba(9, 30, 66, 0.16)',
  ),
  ':hover': {
    cursor: 'pointer',
    backgroundColor: token('color.background.input.pressed', N0),
  },
});

const modeSwitcherLabelDisabledStyles = css({
  ':hover': {
    cursor: 'not-allowed',
  },
});

const compactModeSwitcherLabelStyles = css({
  padding: `${token('space.025', '2px')} ${token('space.050', '4px')}`,
});

export const ModeSwitcher = (props: ModeSwitcherProps) => {
  const {
    isCompact,
    isDisabled,
    onOptionValueChange,
    options,
    selectedOptionValue = options[0]?.value,
  } = props;

  const handleModeChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    onOptionValueChange(event.currentTarget.value);
  };

  return options.length > 0 ? (
    <fieldset
      css={[modeSwitcherStyles, isCompact && compactModeSwitcherStyles]}
      data-testid="mode-toggle-container"
      disabled={isDisabled}
    >
      {options.map(({ value, label }) => {
        const isSelected = value === selectedOptionValue;
        return (
          <label
            key={value}
            css={[
              modeSwitcherLabelStyles,
              isCompact && compactModeSwitcherLabelStyles,
              isSelected && modeSwitcherLabelSelectedStyles,
              isDisabled && modeSwitcherLabelDisabledStyles,
            ]}
            data-testid={`mode-toggle-${value}`}
          >
            {label}
            <input
              aria-checked={isSelected}
              aria-disabled={isDisabled}
              checked={isSelected}
              css={modeInputStyles}
              disabled={isDisabled}
              onChange={handleModeChange}
              type="radio"
              value={value}
            />
          </label>
        );
      })}
    </fieldset>
  ) : null;
};
