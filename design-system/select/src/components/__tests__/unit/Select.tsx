import React from 'react';

import { act, fireEvent, render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import selectEvent from 'react-select-event';

import AtlaskitSelect from '../../..';

jest.mock('../../../utils/grouped-options-announcement', () => {
	const originalModule = jest.requireActual<
		typeof import('../../../utils/grouped-options-announcement')
	>('../../../utils/grouped-options-announcement');

	return {
		__esModule: true,
		...originalModule,
		onFocus: () => 'overwrite native ariaLiveMessages onFocus method',
	};
});

const user = userEvent.setup();

const OPTIONS = [
	{ label: '0', value: 'zero' },
	{ label: '1', value: 'one' },
	{ label: '2', value: 'two' },
	{ label: '3', value: 'three' },
	{ label: '4', value: 'four' },
];

describe('Select', () => {
	// temporarily skip this test as part of DST-2476 resolution
	it.skip('should load the animated component as default', () => {
		render(<AtlaskitSelect aria-label="Options" />);

		expect(screen.getByText('Transition')).toBeInTheDocument();
	});

	it('should toggle the menu on dropdown indicator click', async () => {
		render(<AtlaskitSelect classNamePrefix="react-select" aria-label="Options" />);

		// Menu closed by default
		expect(screen.getByRole('combobox')).toHaveAttribute('aria-expanded', 'false');

		act(() => {
			selectEvent.openMenu(screen.getByText('Select...'));
		});

		// Menu to open
		expect(screen.getByRole('combobox')).toHaveAttribute('aria-expanded', 'true');
	});

	describe('Grouped value Select', () => {
		it('should pass onFocus to react-select if options are grouped', async () => {
			const groupedOptions = [
				{
					label: 'group',
					options: [
						{ value: 1, label: '1' },
						{ value: 2, label: '2' },
					],
				},
			];

			const { rerender } = render(
				<AtlaskitSelect options={groupedOptions} menuIsOpen aria-label="Options" />,
			);

			selectEvent.openMenu(screen.getByText('Select...'));
			const ele = screen.getByRole('combobox');
			fireEvent.focus(ele);
			expect(
				screen.getByText(/overwrite native ariaLiveMessages onFocus method/),
			).toBeInTheDocument();

			rerender(<AtlaskitSelect options={OPTIONS} menuIsOpen aria-label="Options" />);

			await user.click(screen.getByText('Select...'));
			expect(
				screen.queryByText(/overwrite native ariaLiveMessages onFocus method/),
			).not.toBeInTheDocument();
		});
	});

	describe('single value select', () => {
		it('should show the default AtlaskitSelected value', () => {
			render(<AtlaskitSelect options={OPTIONS} value={OPTIONS[0]} aria-label="Options" />);

			// Hides options cause the menu is closed
			expect(screen.queryByText('1')).not.toBeInTheDocument();
			// Displays the provided value
			expect(screen.getByText('0')).toBeInTheDocument();
		});

		//default value is there, no placeholder, no passed aria == no aria describedby
		it('should have no id aria-describedby', () => {
			render(<AtlaskitSelect options={OPTIONS} value={OPTIONS[0]} aria-label="Options" />);

			expect(screen.getByRole('combobox')).not.toHaveAttribute('aria-describedby');
		});

		//default value is there, no placeholder, yes passed aria == yes aria describedby --> passed aria
		it('should show passed id as aria-describedby', () => {
			render(
				<AtlaskitSelect
					options={OPTIONS}
					value={OPTIONS[0]}
					aria-describedby="descriptive-id"
					aria-label="Options"
				/>,
			);
			const element = screen.getByRole('combobox').getAttribute('aria-describedby');
			expect(element).toBe('descriptive-id');
		});

		//default value is yes there, yes placeholder, yes passed aria == yes aria describedby --> passed aria
		it('should show passed id as aria-describedby with placeholder', () => {
			render(
				<AtlaskitSelect
					options={OPTIONS}
					value={OPTIONS[0]}
					placeholder="Placeholder"
					aria-describedby="descriptive-id"
					aria-label="Options"
				/>,
			);

			const element = screen.getByRole('combobox').getAttribute('aria-describedby');
			expect(element).toBe('descriptive-id');
		});

		//default value is not there, yes placeholder, yes passed aria == yes aria describedby --> passed aria, placeholder
		it('should show placeholder id and passed id as aria-describedby', () => {
			render(
				<AtlaskitSelect
					options={OPTIONS}
					placeholder="Placeholder"
					aria-describedby="descriptive-id"
					aria-label="Options"
				/>,
			);

			const placeholder = screen.queryByText('Placeholder');
			expect(placeholder).toBeInTheDocument();
			const placeholderId = placeholder?.id;
			const element = screen.getByRole('combobox').getAttribute('aria-describedby');
			expect(element).toBe(`descriptive-id ${placeholderId}`);
		});

		//default value is not there, yes placeholder, no passed aria == yes aria describedby --> placeholder
		it('should show placeholder id as aria-describedby', () => {
			render(<AtlaskitSelect options={OPTIONS} placeholder="Placeholder" aria-label="Options" />);

			const placeholder = screen.queryByText('Placeholder');
			expect(placeholder).toBeInTheDocument();
			const placeholderId = placeholder?.id;
			const element = screen.getByRole('combobox').getAttribute('aria-describedby');
			expect(element).toBe(placeholderId);
		});
	});

	it('should show placeholder id and passed aria-describedby as aria-describedby when isSearchable is false', () => {
		render(
			<AtlaskitSelect
				options={OPTIONS}
				placeholder="Placeholder"
				isSearchable={false}
				aria-describedby="descriptionId"
				aria-label="Options"
			/>,
		);

		const placeholder = screen.queryByText('Placeholder');
		expect(placeholder).toBeInTheDocument();
		const placeholderId = placeholder?.id;
		const element = screen.getByRole('combobox').getAttribute('aria-describedby');
		expect(element).toBe(`descriptionId ${placeholderId}`);
	});

	describe('multi value select', () => {
		it('should show the default AtlaskitSelected value', () => {
			render(
				<AtlaskitSelect
					options={OPTIONS}
					isMulti
					value={[OPTIONS[0], OPTIONS[3]]}
					aria-label="Options"
				/>,
			);

			// Hides options cause the menu is closed
			expect(screen.queryByText('1')).not.toBeInTheDocument();
			// Displays the provided values
			expect(screen.getByText('0')).toBeInTheDocument();
			expect(screen.getByText('3')).toBeInTheDocument();
		});

		it('should show clear icons on selections plus clear icon for whole select', () => {
			render(
				<AtlaskitSelect
					classNamePrefix="react-select"
					defaultValue={OPTIONS.slice(3, 5)}
					options={OPTIONS}
					isMulti
					aria-label="Options"
				/>,
			);

			const clearIcons = screen.getAllByTestId('show-clear-icon');

			expect(clearIcons.length).toBe(2);
		});

		it('disabled multiselect should not show clear icon on selections or select itself', () => {
			render(
				<AtlaskitSelect
					isDisabled
					classNamePrefix="react-select"
					defaultValue={OPTIONS.slice(3, 5)}
					options={OPTIONS}
					isMulti
					aria-label="Options"
				/>,
			);

			const clearIcons = screen.getAllByTestId('hide-clear-icon');

			expect(clearIcons.length).toBe(2);
		});
	});

	it('should disable options if isDisabled prop is true', async () => {
		const { container } = render(
			<AtlaskitSelect
				isDisabled
				classNamePrefix="react-select"
				options={OPTIONS}
				isMulti
				aria-label="Options"
			/>,
		);

		expect(screen.getByText('Select...')).toBeInTheDocument();

		// eslint-disable-next-line testing-library/no-container, testing-library/no-node-access
		const selectControl = container.getElementsByClassName('react-select__control--is-disabled');

		expect(selectControl).toHaveLength(1);
		expect(selectControl[0]).toHaveStyle('pointer-events: none');
	});

	it('should not disable options if isDisabled prop is false', async () => {
		render(
			<AtlaskitSelect
				isDisabled={false}
				classNamePrefix="react-select"
				options={OPTIONS}
				isMulti
				aria-label="Options"
			/>,
		);

		act(() => {
			selectEvent.openMenu(screen.getByText('Select...'));
		});

		expect(screen.getByRole('combobox')).toHaveAttribute('aria-expanded', 'true');
		expect(screen.getByText('1')).toBeInTheDocument();
	});

	it('should display options with group inside menu', () => {
		const options = [
			{
				label: 'group',
				options: [
					{ value: 1, label: '1' },
					{ value: 2, label: '2' },
				],
			},
		];
		render(<AtlaskitSelect options={options} menuIsOpen aria-label="Options" />);

		expect(screen.getByText('group')).toBeInTheDocument();
		expect(screen.getAllByText('group')).toHaveLength(1);

		// eslint-disable-next-line testing-library/no-node-access
		const groupContainer = screen.getByText('group').parentNode;

		if (groupContainer) {
			expect(groupContainer).toBeInTheDocument();

			const optionWrapper = groupContainer.childNodes[1];

			expect(optionWrapper).toHaveTextContent('1');
			expect(optionWrapper).toHaveTextContent('2');
		} else {
			fail('expected group container to exist');
		}
	});

	it('should  render only groups with a match when filtering', async () => {
		const options = [
			{
				label: 'group 1',
				options: [
					{ value: 1, label: '1' },
					{ value: 2, label: '2' },
				],
			},
			{
				label: 'group 2',
				options: [
					{ value: 3, label: '3' },
					{ value: 4, label: '4' },
				],
			},
		];
		render(<AtlaskitSelect options={options} menuIsOpen aria-label="Options" />);

		await user.click(screen.getByRole('combobox'));
		await user.keyboard('1');

		expect(screen.getByRole('combobox')).toHaveValue('1');
		expect(screen.getByText('group 1')).toBeInTheDocument();
		expect(screen.getByText('1')).toBeInTheDocument();
		expect(screen.queryByText('2')).not.toBeInTheDocument();
		expect(screen.queryByText('group 2')).not.toBeInTheDocument();
	});

	it('should not render any groups when there is no match when filtering', async () => {
		const options = [
			{
				label: 'group 1',
				options: [
					{ value: 1, label: '1' },
					{ value: 2, label: '2' },
				],
			},
			{
				label: 'group 2',
				options: [
					{ value: 3, label: '3' },
					{ value: 4, label: '4' },
				],
			},
		];
		render(<AtlaskitSelect options={options} menuIsOpen aria-label="Options" />);

		await user.click(screen.getByRole('combobox'));
		await user.keyboard('5');

		expect(screen.getByRole('combobox')).toHaveValue('5');
		expect(screen.queryByText('group 1')).not.toBeInTheDocument();
		expect(screen.queryByText('group 2')).not.toBeInTheDocument();
	});

	it('should autoFocus on the AtlaskitSelect when autoFocus is set to true', async () => {
		render(<AtlaskitSelect options={OPTIONS} autoFocus aria-label="Options" />);

		await user.keyboard('5');

		expect(screen.getByRole('combobox')).toHaveValue('5');
	});

	it('should not autoFocus on the AtlaskitSelect when autoFocus is set to false', async () => {
		render(<AtlaskitSelect options={OPTIONS} autoFocus={false} aria-label="Options" />);

		await user.keyboard('5');

		expect(screen.getByRole('combobox')).toHaveValue('');
	});

	it('should pass the className down to react-select', () => {
		const customClass = 'custom-class-name';

		const { container } = render(
			<AtlaskitSelect
				// eslint-disable-next-line @atlaskit/ui-styling-standard/no-classname-prop
				className={customClass}
				aria-label="Options"
			/>,
		);

		// eslint-disable-next-line testing-library/no-container, testing-library/no-node-access
		const selectWrapper = container.getElementsByClassName('custom-class-name');

		expect(selectWrapper).toHaveLength(1);
	});

	it('should render a hidden form field when name prop is passed', () => {
		const { container } = render(<AtlaskitSelect name="test-name" aria-label="Options" />);

		// eslint-disable-next-line testing-library/no-container, testing-library/no-node-access
		const inputs = container.getElementsByTagName('input');

		expect(inputs).toHaveLength(2);
		expect(inputs[1]).toHaveValue('');
		expect(inputs[1]).toHaveAttribute('type', 'hidden');
	});

	/**
	 * FilterOption is getting called multiple for a change in inputValue.
	 */
	it.skip('should call filterOption when input of select is changed', async () => {
		const filterOptionSpy = jest.fn();
		render(
			<AtlaskitSelect options={OPTIONS} filterOption={filterOptionSpy} aria-label="Options" />,
		);

		await user.keyboard('5');
		await user.clear(screen.getByText('Select...'));
		await user.keyboard('1');

		expect(filterOptionSpy).toHaveBeenCalledTimes(2);
	});
	/* eslint-enable jest/no-disabled-tests */
});

describe('Select input', () => {
	it('should respect explicit aria-described attribute value', () => {
		const errorId = 'error';

		render(
			<AtlaskitSelect
				options={OPTIONS}
				aria-invalid={true}
				aria-describedby={errorId}
				aria-label="Options"
			/>,
		);

		screen.getByRole('combobox').focus();
		screen.getByRole('combobox').blur();

		expect(screen.getByRole('combobox')).toHaveAttribute(
			'aria-describedby',
			expect.stringContaining(`${errorId}`),
		);
	});

	it('should respect explicit aria-describedby when there is components prop', () => {
		const labelId = 'label-1';

		render(
			<AtlaskitSelect
				options={OPTIONS}
				aria-describedby={labelId}
				isSearchable={true} // To bypass the componentDidMount solution
				components={{
					DropdownIndicator: null,
				}}
				aria-label="Options"
			/>,
		);

		expect(screen.getByRole('combobox')).toHaveAttribute(
			'aria-describedby',
			expect.stringContaining(labelId),
		);
	});

	it('should respect dynamically updated explicit aria-describedby', async () => {
		const label = 'label-1';
		const newLabel = 'newLabel-2';

		const { rerender } = render(
			<AtlaskitSelect
				options={OPTIONS}
				aria-describedby={label}
				value={OPTIONS[0]}
				isSearchable={true} // To bypass the componentDidMount solution
				components={{
					DropdownIndicator: null,
				}}
				aria-label="Options"
			/>,
		);

		expect(screen.getByRole('combobox')).toHaveAttribute('aria-describedby', label);

		rerender(
			<AtlaskitSelect
				options={OPTIONS}
				aria-describedby={newLabel}
				value={OPTIONS[0]}
				isSearchable={true} // To bypass the componentDidMount solution
				components={{
					DropdownIndicator: null,
				}}
				aria-label="Options"
			/>,
		);

		// It shouldn't contain the old aria-describedby
		expect(screen.getByRole('combobox')).toHaveAttribute('aria-describedby', newLabel);
	});

	it("should respect dynamically updated explicit aria-describedby when the placeholder's ID is passed to aria-describedby", () => {
		const label = 'label-1';
		const newLabel = 'newLabel-2';

		const { rerender } = render(
			<AtlaskitSelect
				options={OPTIONS}
				aria-describedby={label}
				value={OPTIONS[0]}
				isSearchable={true} // To bypass the componentDidMount solution
				components={{
					DropdownIndicator: null,
				}}
				aria-label="Options"
			/>,
		);

		expect(screen.getByRole('combobox')).toHaveAttribute('aria-describedby', label);

		rerender(
			<AtlaskitSelect
				options={OPTIONS}
				aria-describedby={newLabel}
				value={null} // Clear the value so that react-select adds the placeholder aria-describedby
				isSearchable={true} // To bypass the componentDidMount solution
				components={{
					DropdownIndicator: null,
				}}
				aria-label="Options"
			/>,
		);

		const input = screen.getByRole('combobox');
		expect(input).toHaveAttribute('aria-describedby', expect.stringContaining(`${newLabel}`));
		expect(input).toHaveAttribute('aria-describedby', expect.stringContaining('placeholder'));
	});
});
