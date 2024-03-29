import { BrowserTestCase } from '@atlaskit/webdriver-runner/runner';
import { getExampleUrl } from '@atlaskit/webdriver-runner/utils/example';
import Page from '@atlaskit/webdriver-runner/wd-wrapper';

const urlDateTimePicker = getExampleUrl(
  'design-system',
  'datetime-picker',
  'date-picker-states',
);
const urlDatePickerTabCheck = getExampleUrl(
  'design-system',
  'datetime-picker',
  'date-picker-tabcheck',
);
/* Css used for the test */
const datePicker = '[data-testid="datepicker-1--container"]';
const calendar = `[aria-label='calendar']`;
const previousMonthButton = 'button[data-testid$="previous-month"]';
const nextMonthButton = 'button[data-testid$="next-month"]';
const calendarDates = '[data-testid$="calendar-dates"]';
const date = '[role=gridcell]:nth-child(6)';
const focusedDate = '[data-focused="true"]';
const input = 'input#react-select-datepicker-1-input';
const tabcheckDatePickerInputOutsidePopup = 'input#react-select-custom-input';
const tabcheckDatePickerInputInsidePopup = 'input#react-select-value1-input';
const toggle = 'label[for="toggle"]';

const value = `${datePicker} > div`;

BrowserTestCase(
  'When DatePicker is focused & backspace pressed, the input should be cleared and defaulted to the place holder date',
  {},
  async (client: any) => {
    const page = new Page(client);

    await page.goto(urlDateTimePicker);
    await page.click(datePicker);

    await page.waitForSelector(calendar);
    await page.click(date);

    await page.waitForSelector(input);
    await page.type(input, ['1/2/2001']);

    await page.waitForSelector(input);
    // As Safari, FF and IE may have some issues with Enter keys, I replaced by the uni code.
    // Enter is pressed twice to avoid inconsitent tests results while browser loading.
    await page.keys('\uE007');

    await page.keys('\uE007');

    await page.waitForSelector(datePicker);

    const currentDate = await page.getText(datePicker);
    // There is small issue in IE11, Safari where there is a blob of text added.
    expect(currentDate.trim()).toContain('1/2/2001');

    await page.keys(['\uE003']);

    await page.waitForSelector(input);

    const nextDate = await page.getText(datePicker);
    // There is small issue in IE11, Safari where there is a blob of text added.
    expect(nextDate.trim()).toContain('2/18/1993');

    await page.checkConsoleErrors();
  },
);

BrowserTestCase(
  'When choosing another day in a Datetime picker focused, the date should be updated to the new value',
  {},
  async (client: any) => {
    const page = new Page(client);

    await page.goto(urlDateTimePicker);
    await page.click(datePicker);
    await page.waitForSelector(calendar);
    await page.click(date);

    const previousDate = await page.getText(value);

    await page.click(datePicker);

    await page.keys(['Tab']);
    await page.keys(['ArrowLeft']);
    await page.keys(['ArrowLeft']);
    await page.keys(['Enter']);

    expect(await page.getText(value)).not.toBe(previousDate);
    await page.checkConsoleErrors();
  },
);

BrowserTestCase(
  'Clicking a disabled datepicker should not toggle its internal open state, resulting in it being open once enabled',
  {},
  async (client: any) => {
    const url = getExampleUrl(
      'design-system',
      'datetime-picker',
      'disable-toggle',
    );

    const page = new Page(client);

    await page.goto(url);

    /* Clicking on the disabled date picker does not open it */
    await page.click(datePicker);
    expect(await page.waitForSelector(calendar, {}, true)).toBe(true);

    /* Un-disabling the date picker after its been clicked does not open it */
    await page.click(toggle);
    expect(await page.waitForSelector(calendar, {}, true)).toBe(true);

    /* After un-disabling the date picker can be opened by clicking */
    await page.click(datePicker);
    expect(await page.waitForSelector(calendar)).toBe(true);
  },
);

BrowserTestCase(
  'Should tab through all interactive elements inside datepicker',
  {},
  async (client: any) => {
    const page = new Page(client);
    await page.goto(urlDatePickerTabCheck);

    await page.click('input#text1');

    await page.keys('Tab');
    expect(
      await page.waitForSelector(tabcheckDatePickerInputOutsidePopup),
    ).toBe(true);
    expect(await page.hasFocus(tabcheckDatePickerInputOutsidePopup)).toBe(true);

    await page.keys('Tab');
    expect(await page.hasFocus(previousMonthButton)).toBe(true);
    await page.keys('Tab');
    expect(await page.hasFocus(nextMonthButton)).toBe(true);
    await page.keys('Tab');
    expect(await page.hasFocus(calendarDates)).toBe(true);
    await page.keys('Tab');
    expect(await page.hasFocus(focusedDate)).toBe(true);

    await page.keys('Tab');
    expect(await page.hasFocus('input#text2')).toBe(true);
  },
);

BrowserTestCase(
  'Should tab from input component to datepicker to next input in popup',
  {},
  async (client: any) => {
    const page = new Page(client);
    await page.goto(urlDatePickerTabCheck);

    await page.click('button#popup-trigger');
    await page.click('input#text3');

    await page.keys('Tab');
    expect(await page.waitForSelector(tabcheckDatePickerInputInsidePopup)).toBe(
      true,
    );
    expect(await page.hasFocus(tabcheckDatePickerInputInsidePopup)).toBe(true);

    await page.keys('Tab');
    expect(await page.hasFocus(previousMonthButton)).toBe(true);
    await page.keys('Tab');
    expect(await page.hasFocus(nextMonthButton)).toBe(true);
    await page.keys('Tab');
    expect(await page.hasFocus(calendarDates)).toBe(true);
    await page.keys('Tab');
    expect(await page.hasFocus(focusedDate)).toBe(true);

    await page.keys('Tab');
    expect(await page.hasFocus('input#text4')).toBe(true);
  },
);

BrowserTestCase(
  'When DatePicker is focused & another element is focused outside of DatePicker, the calendar should close',
  {},
  async (client: any) => {
    const page = new Page(client);
    await page.goto(urlDatePickerTabCheck);

    await page.click('input#text1');
    await page.keys('Tab');

    expect(await page.waitForSelector(calendar)).toBe(true);

    await page.execute("document.querySelector('input#text1').focus()");
    // Calendar should not exist
    expect(await page.waitForSelector(calendar, undefined, true)).toBe(true);
  },
);

BrowserTestCase(
  'When DatePicker is focused & another element is focused inside of DatePicker, the calendar should not close',
  {},
  async (client: any) => {
    const page = new Page(client);
    await page.goto(urlDatePickerTabCheck);

    await page.click('input#text1');
    await page.keys('Tab');

    expect(await page.waitForSelector(calendar)).toBe(true);

    await page.execute(
      `document.querySelector('${previousMonthButton}').focus()`,
    );
    expect(await page.waitForSelector(calendar)).toBe(true);
  },
);
