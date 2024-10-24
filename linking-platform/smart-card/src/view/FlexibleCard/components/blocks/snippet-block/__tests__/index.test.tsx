import React from 'react';
import { render, waitFor, screen } from '@testing-library/react';
// eslint-disable-next-line @atlaskit/ui-styling-standard/use-compiled -- Ignored via go/DSP-18766
import { css } from '@emotion/react';
import { FlexibleUiContext } from '../../../../../../state/flexible-ui-context';
import context from '../../../../../../__fixtures__/flexible-ui-data-context';
import { SmartLinkStatus } from '../../../../../../constants';
import SnippetBlock from '../index';

describe('SnippetBlock', () => {
	it('renders SnippetBlock', async () => {
		const testId = 'test-smart-block-snippet';
		render(
			<FlexibleUiContext.Provider value={context}>
				<SnippetBlock status={SmartLinkStatus.Resolved} testId={testId} />
			</FlexibleUiContext.Provider>,
		);

		const block = await screen.findByTestId(`${testId}-resolved-view`);

		expect(block).toBeDefined();
		expect(block.textContent).toBe('Lorem ipsum dolor sit amet, consectetur adipiscing elit.');
	});

	describe('with maxLines', () => {
		it('renders with default maxLines', async () => {
			const testId = 'smart-element-text';
			render(
				<FlexibleUiContext.Provider value={context}>
					<SnippetBlock status={SmartLinkStatus.Resolved} />
				</FlexibleUiContext.Provider>,
			);

			const element = await screen.findByTestId(testId);

			expect(element).toHaveStyleDeclaration('-webkit-line-clamp', '3');
		});

		it('renders with specific maxLines', async () => {
			const testId = 'smart-element-text';
			render(
				<FlexibleUiContext.Provider value={context}>
					<SnippetBlock maxLines={2} status={SmartLinkStatus.Resolved} />
				</FlexibleUiContext.Provider>,
			);

			const element = await screen.findByTestId(testId);

			expect(element).toHaveStyleDeclaration('-webkit-line-clamp', '2');
		});

		it('renders specific maxLines above the default maxlines', async () => {
			const testId = 'smart-element-text';
			render(
				<FlexibleUiContext.Provider value={context}>
					<SnippetBlock maxLines={6} status={SmartLinkStatus.Resolved} />
				</FlexibleUiContext.Provider>,
			);

			const element = await screen.findByTestId(testId);

			expect(element).toHaveStyleDeclaration('-webkit-line-clamp', '6');
		});

		it('renders with default maximum maxLines when maxLines exceed maximum', async () => {
			const testId = 'smart-element-text';
			render(
				<FlexibleUiContext.Provider value={context}>
					<SnippetBlock maxLines={7} status={SmartLinkStatus.Resolved} />
				</FlexibleUiContext.Provider>,
			);

			const element = await screen.findByTestId(testId);

			expect(element).toHaveStyleDeclaration('-webkit-line-clamp', '3');
		});
	});

	it('should not render text for a non resolved state', async () => {
		const testId = 'smart-element-text';
		render(
			<FlexibleUiContext.Provider value={context}>
				<SnippetBlock status={SmartLinkStatus.Resolving} />
			</FlexibleUiContext.Provider>,
		);
		await waitFor(() => {
			expect(screen.queryByTestId(testId)).toBeNull();
		});
	});

	it('renders with text for a non resolved state when text is overridden', async () => {
		const testId = 'smart-element-text';
		render(
			<FlexibleUiContext.Provider value={context}>
				<SnippetBlock
					text="text override for a non resolved state"
					status={SmartLinkStatus.Resolving}
				/>
			</FlexibleUiContext.Provider>,
		);

		const block = await screen.findByTestId(testId);

		expect(block.textContent).toBe('text override for a non resolved state');
	});

	it('renders with override text', async () => {
		const testId = 'smart-element-text';
		render(
			<FlexibleUiContext.Provider value={context}>
				<SnippetBlock text="text override" status={SmartLinkStatus.Resolved} />
			</FlexibleUiContext.Provider>,
		);

		const block = await screen.findByTestId(testId);

		expect(block.textContent).toBe('text override');
	});

	it('renders with override css', async () => {
		const overrideCss = css({
			backgroundColor: 'blue',
		});
		render(
			<FlexibleUiContext.Provider value={context}>
				<SnippetBlock overrideCss={overrideCss} status={SmartLinkStatus.Resolved} testId="css" />
			</FlexibleUiContext.Provider>,
		);

		const block = await screen.findByTestId('css-resolved-view');

		expect(block).toHaveStyleDeclaration('background-color', 'blue');
	});
});
