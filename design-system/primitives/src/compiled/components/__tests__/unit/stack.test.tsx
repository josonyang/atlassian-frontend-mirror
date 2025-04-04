/**
 * @jsxRuntime classic
 * @jsx jsx
 */
import { jsx } from '@compiled/react';
import { render, screen } from '@testing-library/react';

import { cssMap } from '@atlaskit/css';
import { token } from '@atlaskit/tokens';

import { Stack } from '../../../index';

const testId = 'test';
const styles = cssMap({
	root: {
		justifyContent: 'space-around',
		alignItems: 'start',
		flexWrap: 'nowrap',
		flexGrow: '42',
		gap: token('space.100'),
	},
});

describe('Stack', () => {
	it('should render stack', () => {
		render(
			<Stack space="space.050">
				<div>1</div>
				<div>2</div>
			</Stack>,
		);
		expect(screen.getByText('1')).toBeInTheDocument();
		expect(screen.getByText('2')).toBeInTheDocument();
	});

	it('should render with a given test id', () => {
		render(
			<Stack space="space.050" testId={testId}>
				<div>1</div>
				<div>2</div>
			</Stack>,
		);
		const element = screen.getByTestId(testId);
		expect(element).toBeInTheDocument();
	});

	test('`xcss` should override props and result in expected css', () => {
		render(
			<Stack
				testId={testId}
				alignInline="end"
				alignBlock="end"
				spread="space-between"
				grow="fill"
				space="space.0"
				xcss={styles.root}
			>
				child
			</Stack>,
		);
		const element = screen.getByTestId(testId);
		expect(element).toBeInTheDocument();

		expect(element).toHaveCompiledCss({
			// Every value in here overrides the props values
			// eg. `props.alignInline="end"` is overridden by `xcss.justifyContent: 'start'`
			alignItems: 'start',
			justifyContent: 'space-around',
			flexWrap: 'nowrap',
			flexGrow: '42',
			gap: 'var(--ds-space-100,8px)',
		});
	});
});
