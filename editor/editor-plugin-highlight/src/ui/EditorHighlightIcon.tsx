import React from 'react';

import { SteppedRainbowIconDecoration } from '@atlaskit/editor-common/icons';
import EditFilledIcon from '@atlaskit/icon/glyph/edit-filled';
import { Box } from '@atlaskit/primitives';

type EditorHighlightIconProps = {
  disabled: boolean;
  selectedColor?: string | null;
};

export const EditorHighlightIcon = ({
  disabled,
  selectedColor,
}: EditorHighlightIconProps) => (
  <Box paddingInline="space.050">
    <SteppedRainbowIconDecoration
      selectedColor={selectedColor}
      disabled={disabled}
      icon={<EditFilledIcon size="small" label="" />}
    />
  </Box>
);
