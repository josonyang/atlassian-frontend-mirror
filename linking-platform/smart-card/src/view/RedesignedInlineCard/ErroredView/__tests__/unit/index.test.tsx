import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import { InlineCardErroredView } from '../..';
import { IntlProvider } from 'react-intl-next';
import WarningIcon from '@atlaskit/icon/glyph/warning';

const URL =
  'http://product.example.com/lorem/ipsum/dolor/sit/amet/consectetur/adipiscing/volutpat/';

describe('Errored view', () => {
  it('should do click if try again clicked', async () => {
    const onRetrySpy = jest.fn();
    render(
      <IntlProvider locale={'en'}>
        <InlineCardErroredView url={URL} message="Error" onRetry={onRetrySpy} />
      </IntlProvider>,
    );
    fireEvent.click(await screen.findByRole('button', { name: 'Try again' }));
    expect(onRetrySpy).toHaveBeenCalledTimes(1);
  });

  it('should accept custom icon', async () => {
    const onRetrySpy = jest.fn();
    render(
      <IntlProvider locale={'en'}>
        <InlineCardErroredView
          url={URL}
          message="Error"
          onRetry={onRetrySpy}
          icon={<WarningIcon label="my-icon" testId="warning-icon" />}
        />
      </IntlProvider>,
    );
    fireEvent.click(await screen.findByRole('button', { name: 'Try again' }));
    expect(onRetrySpy).toHaveBeenCalledTimes(1);
    expect(await screen.findByTestId('warning-icon')).toBeVisible();
  });

  it('should render error icon by default', async () => {
    const onRetrySpy = jest.fn();
    render(
      <IntlProvider locale={'en'}>
        <InlineCardErroredView url={URL} message="Error" onRetry={onRetrySpy} />
      </IntlProvider>,
    );
    fireEvent.click(await screen.findByRole('button', { name: 'Try again' }));
    expect(onRetrySpy).toHaveBeenCalledTimes(1);
    expect(
      await screen.findByTestId('errored-view-default-icon'),
    ).toBeVisible();
  });

  it('should not call onClick if onRetry was triggered', async () => {
    const onClickSpy = jest.fn();
    const onRetrySpy = jest.fn();
    render(
      <IntlProvider locale={'en'}>
        <InlineCardErroredView
          url={URL}
          onRetry={onRetrySpy}
          message="Error"
          onClick={onClickSpy}
        />
      </IntlProvider>,
    );
    fireEvent.click(await screen.findByRole('button', { name: 'Try again' }));
    expect(onRetrySpy).toHaveBeenCalledTimes(1);
    expect(onClickSpy).not.toHaveBeenCalled();
  });
});
