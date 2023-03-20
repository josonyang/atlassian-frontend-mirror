import React, { FC, useState } from 'react';

import Button from '@atlaskit/button/standard-button';
import Box from '@atlaskit/ds-explorations/box';
import Inline from '@atlaskit/primitives/inline';

import { ProgressIndicator } from '../src';

const SpreadInlineLayout: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  return (
    <Inline space="100" spread="space-between" alignBlock="center">
      {children}
    </Inline>
  );
};

interface ExampleProps {
  selectedIndex: number;
  values: string[];
}

const Example: FC<ExampleProps> = ({ values = ['one', 'two', 'three'] }) => {
  const [selectedIndex, setSelectedIndex] = useState(0);

  const handleSelect = ({
    event,
    index: selectedIndex,
  }: {
    event: React.MouseEvent<HTMLButtonElement>;
    index: number;
  }): void => {
    setSelectedIndex(selectedIndex);
  };

  const handlePrev = () => {
    setSelectedIndex((prevState) => prevState - 1);
  };

  const handleNext = () => {
    setSelectedIndex((prevState) => prevState + 1);
  };

  return (
    <Box paddingInline="space.200" paddingBlock="space.200" display="block">
      <SpreadInlineLayout>
        <Button isDisabled={selectedIndex === 0} onClick={handlePrev}>
          Prev
        </Button>
        <ProgressIndicator
          onSelect={handleSelect}
          selectedIndex={selectedIndex}
          values={values}
          size="default"
        />
        <Button
          isDisabled={selectedIndex === values.length - 1}
          onClick={handleNext}
        >
          Next
        </Button>
      </SpreadInlineLayout>
    </Box>
  );
};

export default Example;
