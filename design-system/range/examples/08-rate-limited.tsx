/**
 * @jsxRuntime classic
 * @jsx jsx
 */
import { Fragment, useCallback, useEffect, useState } from 'react';

import debounce from 'lodash/debounce';
import throttle from 'lodash/throttle';

import { cssMap, jsx } from '@atlaskit/css';
import { Label } from '@atlaskit/form';
import { Box, Text } from '@atlaskit/primitives/compiled';
import Range from '@atlaskit/range';
import { token } from '@atlaskit/tokens';

const styles = cssMap({
	root: {
		paddingTop: token('space.100'),
		paddingRight: token('space.100'),
		paddingBottom: token('space.100'),
		paddingLeft: token('space.100'),
		display: 'flex',
		flexDirection: 'column',
	},
});

function RateLimitedRange() {
	const [value, setValue] = useState(50);
	const [onChangeCallCount, setOnChangeCallCount] = useState(0);
	const [debouncedCallCount, setDebouncedCallCount] = useState(0);
	const [throttledCallCount, setThrottledCallCount] = useState(0);

	// AFP-2511 TODO: Fix automatic suppressions below
	// eslint-disable-next-line react-hooks/exhaustive-deps
	const debounced = useCallback(
		debounce(() => {
			setDebouncedCallCount((current) => current + 1);
		}, 100),
		[],
	);

	// AFP-2511 TODO: Fix automatic suppressions below
	// eslint-disable-next-line react-hooks/exhaustive-deps
	const throttled = useCallback(
		throttle(() => {
			setThrottledCallCount((current) => current + 1);
		}, 100),
		[],
	);

	// Ensure any pending debounces and throttles are cleared when
	// the component is removed
	useEffect(
		function mount() {
			return function unmount() {
				debounced.cancel();
				throttled.cancel();
			};
		},
		[debounced, throttled],
	);

	return (
		<Fragment>
			<Box xcss={styles.root}>
				<Text>
					The content displayed beneath the range slider dynamically updates as you adjust the
					slider's range.
				</Text>
			</Box>
			<Box xcss={styles.root}>
				<Label htmlFor="range-limited">Range limited</Label>
			</Box>
			<Range
				id="range-limited"
				step={1}
				value={value}
				onChange={(currentValue) => {
					setValue(currentValue);
					setOnChangeCallCount((current) => current + 1);
					debounced();
					throttled();
				}}
			/>
			<Box aria-live="assertive" aria-atomic="true" xcss={styles.root}>
				<Text>The current value is: {value}</Text>
				<Text>onChange called: {onChangeCallCount}</Text>
				<Text>debounced called: {debouncedCallCount}</Text>
				<Text>throttled called: {throttledCallCount}</Text>
			</Box>
		</Fragment>
	);
}

export default RateLimitedRange;
