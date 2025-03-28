import React from 'react';
import { screen, fireEvent } from '@testing-library/react';
import { matchers } from '@emotion/jest';
import { mockReactDomWarningGlobal, renderWithIntl } from '../../__tests__/_testing-library';
import { Trigger } from './Trigger';

// Add the custom matchers provided by '@emotion/jest'
expect.extend(matchers);

const mockIcon = <div>CoolIcon</div>;

describe('@atlaskit/reactions/components/Trigger', () => {
	mockReactDomWarningGlobal();
	it('should render a button', async () => {
		renderWithIntl(<Trigger tooltipContent="" />);
		const btn = await screen.findByLabelText('Add reaction');
		expect(btn).toBeInTheDocument();
	});

	it('should render "Add a reaction" text when showAddReactionText is true', async () => {
		renderWithIntl(<Trigger tooltipContent="" showAddReactionText />);
		await screen.findByLabelText('Add reaction');
		const addReactionText = screen.getByText('Add a reaction');
		expect(addReactionText).toBeInTheDocument();
	});

	it('should have miniMode css when miniMode is true', async () => {
		renderWithIntl(<Trigger tooltipContent="" miniMode />);

		const button = await screen.findByLabelText('Add reaction');
		expect(button).toBeInTheDocument();
		expect(button).toHaveStyleRule('width', '16px');
	});

	it('should disable the button when disabled is true', async () => {
		renderWithIntl(<Trigger tooltipContent="" disabled />);
		const btn = await screen.findByRole('button');
		expect(btn).toBeInTheDocument();
		expect(btn).toHaveAttribute('disabled');
	});

	it('should call "onClick" when clicked', async () => {
		const mockOnClick = jest.fn();
		renderWithIntl(<Trigger tooltipContent="" onClick={mockOnClick} />);
		const button = await screen.findByLabelText('Add reaction');
		fireEvent.click(button);
		expect(mockOnClick).toHaveBeenCalled();
	});

	it('should disable button', async () => {
		const mockOnClick = jest.fn();
		renderWithIntl(<Trigger tooltipContent="" disabled onClick={mockOnClick} />);
		fireEvent.click(await screen.findByLabelText('Add reaction'));
		expect(mockOnClick).not.toHaveBeenCalled();
	});

	it('should have opaque css when showOpaqueBackground is true', async () => {
		renderWithIntl(<Trigger tooltipContent="" miniMode={false} showOpaqueBackground />);

		const button = await screen.findByTestId('render-trigger-button');
		expect(button).toBeInTheDocument();
		expect(button).toHaveCompiledCss('background-color', 'var(--ds-surface, #FFFFFF)');
	});

	it('should render custom icon if reactionPickerTriggerIcon is passed in', async () => {
		renderWithIntl(<Trigger tooltipContent="" reactionPickerTriggerIcon={mockIcon} />);

		const button = await screen.findByTestId('render-trigger-button');
		expect(button).toBeInTheDocument();
		const customIcon = await screen.findByText('CoolIcon');
		expect(customIcon).toBeInTheDocument();

		const defaultIcon = screen.queryByTestId('emoji-add-icon');
		expect(defaultIcon).not.toBeInTheDocument();
	});

	it('should render default icon reactionPickerTriggerIcon is not passed in', async () => {
		renderWithIntl(<Trigger tooltipContent="" />);

		const button = await screen.findByTestId('render-trigger-button');
		expect(button).toBeInTheDocument();
		const icon = await screen.findByTestId('emoji-add-icon');
		expect(icon).toBeInTheDocument();

		const customIcon = screen.queryByText('CoolIcon');
		expect(customIcon).not.toBeInTheDocument();
	});
});
