import React, { type ReactNode, useState } from 'react';

import Button from '@atlaskit/button/new';
import { Box, Inline } from '@atlaskit/primitives';

import { ProgressIndicator } from '../src';
import { type DotsAppearance } from '../src/components/types';

const SpreadInlineLayout = ({ children }: { children: ReactNode }) => {
	return (
		<Inline space="space.100" spread="space-between" alignBlock="center">
			{children}
		</Inline>
	);
};

interface ExampleProps {
	selectedIndex: number;
	values: DotsAppearance[];
}

const Example = ({ values = ['default', 'inverted', 'primary', 'help'] }: ExampleProps) => {
	const [selectedIndex, setSelectedIndex] = useState(0);

	const handlePrev = () => {
		setSelectedIndex((prevState) => prevState - 1);
	};

	const handleNext = () => {
		setSelectedIndex((prevState) => prevState + 1);
	};

	return (
		<Box paddingInline="space.200" paddingBlock="space.200">
			<SpreadInlineLayout>
				<Button isDisabled={selectedIndex === 0} onClick={handlePrev}>
					Previous
				</Button>
				<ProgressIndicator
					selectedIndex={selectedIndex}
					values={values}
					appearance={values[selectedIndex]}
				/>
				<Button isDisabled={selectedIndex === values.length - 1} onClick={handleNext}>
					Next
				</Button>
			</SpreadInlineLayout>
		</Box>
	);
};

export default Example;
