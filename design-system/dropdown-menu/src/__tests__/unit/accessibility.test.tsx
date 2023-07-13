import React from 'react';

import { render } from '@testing-library/react';

import {
  axe,
  jestAxeConfig,
  toHaveNoViolations,
} from '@af/accessibility-testing';

import DropdownMenu, {
  DropdownItem,
  DropdownItemCheckbox,
  DropdownItemCheckboxGroup,
  DropdownItemGroup,
  DropdownItemRadio,
  DropdownItemRadioGroup,
} from '../../index';

expect.extend(toHaveNoViolations);

it('Basic DropdownMenu should not fail aXe audit', async () => {
  const { container } = render(
    <DropdownMenu trigger="Page actions" isOpen>
      <DropdownItemGroup title="Example title">
        <DropdownItem>Move</DropdownItem>
        <DropdownItem>Clone</DropdownItem>
        <DropdownItem>Delete</DropdownItem>
      </DropdownItemGroup>
      <DropdownItemGroup title="Example title2">
        <DropdownItem>Hi</DropdownItem>
      </DropdownItemGroup>
    </DropdownMenu>,
  );
  const results = await axe(container, jestAxeConfig);

  expect(results).toHaveNoViolations();
});

it('Checkbox DropdownMenu should not fail aXe audit', async () => {
  const { container } = render(
    <DropdownMenu trigger="Filter cities" isOpen>
      <DropdownItemCheckboxGroup id="cities">
        <DropdownItemCheckbox id="adelaide">Adelaide</DropdownItemCheckbox>
        <DropdownItemCheckbox id="sydney">Sydney</DropdownItemCheckbox>
        <DropdownItemCheckbox id="newcastle" isSelected>
          Newcastle
        </DropdownItemCheckbox>
      </DropdownItemCheckboxGroup>
    </DropdownMenu>,
  );
  const results = await axe(container, jestAxeConfig);

  expect(results).toHaveNoViolations();
});

it('Radio DropdownMenu should not fail aXe audit', async () => {
  const { container } = render(
    <DropdownMenu trigger="Filter cities" isOpen>
      <DropdownItemRadioGroup id="cities">
        <DropdownItemRadio id="adelaide">Adelaide</DropdownItemRadio>
        <DropdownItemRadio id="sydney">Sydney</DropdownItemRadio>
        <DropdownItemRadio id="newcastle" isSelected>
          Newcastle
        </DropdownItemRadio>
      </DropdownItemRadioGroup>
    </DropdownMenu>,
  );
  const results = await axe(container, jestAxeConfig);

  expect(results).toHaveNoViolations();
});
