/**
 * @jsxRuntime classic
 * @jsx jsx
 */
import { css, jsx } from '@compiled/react';
import { render, screen } from '@testing-library/react';
import { IntlProvider } from 'react-intl-next';

import context from '../../../../../../__fixtures__/flexible-ui-data-context';
import { ElementName, SmartLinkStatus } from '../../../../../../constants';
import { FlexibleUiContext } from '../../../../../../state/flexible-ui-context';
import MetadataBlock from '../index';
import { type MetadataBlockProps } from '../types';

describe('MetadataBlock', () => {
	const renderMetadataBlock = (props?: MetadataBlockProps) => {
		return render(
			<IntlProvider locale="en">
				<FlexibleUiContext.Provider value={context}>
					<MetadataBlock status={SmartLinkStatus.Resolved} {...props} />
				</FlexibleUiContext.Provider>
			</IntlProvider>,
		);
	};

	it('renders with override css', async () => {
		const testId = 'test-smart-block-metadata';
		const overrideCss = css({
			backgroundColor: 'blue',
		});

		render(
			<IntlProvider locale="en">
				<FlexibleUiContext.Provider value={context}>
					<MetadataBlock
						status={SmartLinkStatus.Resolved}
						primary={[{ name: ElementName.ProgrammingLanguage }]}
						css={overrideCss}
						testId={testId}
					/>
				</FlexibleUiContext.Provider>
			</IntlProvider>,
		);

		const block = await screen.findByTestId(`${testId}-resolved-view`);

		expect(block).toHaveStyle({ 'background-color': 'rgb(0, 0, 255)' });
	});

	it('renders MetadataBlock', async () => {
		const testId = 'test-smart-block-metadata';
		renderMetadataBlock({
			primary: [{ name: ElementName.ProgrammingLanguage }],
			secondary: [{ name: ElementName.State }],
			testId,
		});

		const block = await screen.findByTestId(`${testId}-resolved-view`);

		expect(block).toBeDefined();
	});

	it('does not render when there is no metadata elements', async () => {
		const { container } = await renderMetadataBlock();
		expect(container.children.length).toEqual(0);
	});

	it('renders primary metadata', async () => {
		renderMetadataBlock({
			primary: [{ name: ElementName.ProgrammingLanguage }],
		});

		const element = await screen.findByTestId('smart-element-badge');

		expect(element).toBeDefined();
	});

	it('renders secondary metadata', async () => {
		renderMetadataBlock({
			secondary: [{ name: ElementName.State }],
		});

		const element = await screen.findByTestId('smart-element-lozenge');

		expect(element).toBeDefined();
	});

	describe('with specific status', () => {
		it('renders MetadataBlock when status is resolved', async () => {
			renderMetadataBlock({
				primary: [{ name: ElementName.ProgrammingLanguage }],
			});

			const block = await screen.findByTestId('smart-block-metadata-resolved-view');

			expect(block).toBeDefined();
		});

		it.each([
			[SmartLinkStatus.Resolving],
			[SmartLinkStatus.Forbidden],
			[SmartLinkStatus.Errored],
			[SmartLinkStatus.NotFound],
			[SmartLinkStatus.Unauthorized],
			[SmartLinkStatus.Fallback],
		])('does not renders MetadataBlock when status is %s', async (status: SmartLinkStatus) => {
			const { container } = renderMetadataBlock({
				primary: [{ name: ElementName.ProgrammingLanguage }],
				status,
			});
			expect(container.children.length).toEqual(0);
		});
	});
});
