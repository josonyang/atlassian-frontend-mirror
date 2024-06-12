import { expect, test } from '@af/integration-testing';

const selectDefault = '.react-select__value-container';
const selectMenu = '.react-select__menu';
const selectMenuItem1 = '.react-select__option:nth-child(1)';

const selectMultiAdelaide = '[tabIndex="-1"]:nth-child(1)';
const selectMultiBrisbane = '[tabIndex="-1"]:nth-child(2)';

const selectRadioAdelaide = '[tabindex="-1"]:nth-child(1)';

const selectCheckbox = '.select__control';
const selectCheckboxMenu = '.select__menu';

const selectedValue = '.react-select__value-container';
const selectedValueContainer = '.select__value-container';

test(`Single-select should display a menu once clicked and select a menu item`, async ({
	page,
}) => {
	await page.visitExample('design-system', 'select', 'single-select');
	await page.locator(selectDefault).first().click();
	await expect(page.locator(selectMenu)).toBeVisible();
	await page.locator(selectMenuItem1).first().click();
	await expect(page.locator(selectedValue)).not.toHaveText('Choose a City');
});

test(`Multi-select should display a menu once clicked and not throwing errors`, async ({
	page,
}) => {
	await page.visitExample('design-system', 'select', 'multi-select');
	await page.locator(selectDefault).first().click();
	await expect(page.locator(selectMenu)).toBeVisible();
	await page.locator(selectMultiAdelaide).first().click();
	await page.locator(selectDefault).first().click();
	await page.locator(selectMultiBrisbane).first().click();
	await expect(page.locator(selectedValue)).not.toHaveText('Choose a City');
});

test(`Radio-select should display a menu once clicked and not throwing errors`, async ({
	page,
}) => {
	await page.visitExample('design-system', 'select', 'radio-select');
	await page.locator(selectDefault).first().click();
	await expect(page.locator(selectMenu)).toBeVisible();
	await page.locator(selectRadioAdelaide).first().click();
	await expect(page.locator(selectedValue)).not.toHaveText('Choose a City');
});

test(`Async-select should display a menu once clicked and not throwing errors`, async ({
	page,
}) => {
	await page.visitExample('design-system', 'select', 'async-select-with-callback');
	await page.locator(selectDefault).first().click();
	await expect(page.locator(selectMenu)).toBeVisible();
	await page.locator(selectRadioAdelaide).first().click();
	await expect(page.locator(selectedValue)).not.toHaveText('Choose a City');
});

test(`Checkbox-select should display a menu once clicked and not throwing errors`, async ({
	page,
}) => {
	await page.visitExample('design-system', 'select', 'checkbox-select');
	await page.locator(selectCheckbox).first().click();
	await expect(page.locator(selectCheckboxMenu)).toBeVisible();
	await page.locator(selectRadioAdelaide).first().click();
	await page.locator(selectedValueContainer).first().click();
	await expect(page.locator(selectedValueContainer)).not.toHaveText('Choose a City');
});
