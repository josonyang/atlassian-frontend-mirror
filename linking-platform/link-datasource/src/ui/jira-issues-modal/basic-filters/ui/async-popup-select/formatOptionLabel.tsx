import React from 'react';

import Avatar from '@atlaskit/avatar';
import Lozenge from '@atlaskit/lozenge';
import { Box, Flex, xcss } from '@atlaskit/primitives';

import {
  AvatarLabelOption,
  FormatOptionLabel,
  IconLabelOption,
  LozengeLabelOption,
} from '../../types';

const commonLabelStyles = xcss({
  overflow: 'hidden',
  textOverflow: 'ellipsis',
});

const avatarOptionLabelStyles = xcss({
  marginLeft: 'space.050',
});

const IconOptionLabel = ({ data }: { data: IconLabelOption }) => {
  const { label, icon: avatar, value } = data;

  const avatarOptionLabelData: AvatarLabelOption = {
    label,
    avatar,
    value,
    optionType: 'avatarLabel',
    isSquare: true,
  };

  return (
    <AvatarOptionLabel
      data={avatarOptionLabelData}
      testId="jlol-basic-filter-popup-select-option--icon-label"
    />
  );
};

const LozengeOptionLabel = ({ data }: { data: LozengeLabelOption }) => {
  return (
    <Lozenge
      appearance={data.appearance}
      testId="jlol-basic-filter-popup-select-option--lozenge"
    >
      <Box xcss={[commonLabelStyles]}>{data.label}</Box>
    </Lozenge>
  );
};

const AvatarOptionLabel = ({
  data,
  testId,
}: {
  data: AvatarLabelOption;
  testId?: string;
}) => {
  return (
    <Flex
      alignItems="center"
      testId={testId || 'jlol-basic-filter-popup-select-option--avatar'}
    >
      <Avatar
        appearance={data.isSquare ? 'square' : 'circle'}
        src={data.avatar}
        size="xsmall"
      />
      <Box xcss={[commonLabelStyles, avatarOptionLabelStyles]} testId="nidhin">
        {data.label}
      </Box>
    </Flex>
  );
};

const formatOptionLabel: FormatOptionLabel = data => {
  if (data.optionType === 'lozengeLabel') {
    return <LozengeOptionLabel data={data} />;
  }

  if (data.optionType === 'avatarLabel') {
    return <AvatarOptionLabel data={data} />;
  }

  return <IconOptionLabel data={data} />;
};

export default formatOptionLabel;
