import React from 'react';

import { render, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { PopupSelect, OptionsType } from '../../..';

const user = userEvent.setup();

const OPTIONS: OptionsType = [
  { label: '0', value: 'zero' },
  { label: '1', value: 'one' },
  { label: '2', value: 'two' },
  { label: '3', value: 'three' },
  { label: '4', value: 'four' },
];

const addedListeners = () => {
  //@ts-ignore
  const { mock } = global.window.addEventListener as jest.Mock;
  const results = mock.calls.filter((call) => call[0] !== 'error');
  return results;
};

const removedListeners = () => {
  //@ts-ignore
  const { mock } = global.window.removeEventListener as jest.Mock;
  const results = mock.calls.filter((call) => call[0] !== 'error');
  return results;
};

describe('Popup Select', () => {
  beforeEach(() => {
    //@ts-ignore
    jest.spyOn(global.window, 'addEventListener');
    //@ts-ignore
    jest.spyOn(global.window, 'removeEventListener');
  });

  afterEach(() => {
    //@ts-ignore
    global.window.addEventListener.mockRestore();
    //@ts-ignore
    global.window.removeEventListener.mockRestore();
  });

  it('should maintain focus in select element after tabbing when open', async () => {
    const onChangeMock = jest.fn();
    render(
      <React.Fragment>
        <PopupSelect
          options={OPTIONS}
          value={OPTIONS[0]}
          testId={'PopupSelect'}
          onChange={(value) => onChangeMock(value)}
          target={({ ref }) => (
            <button ref={ref} data-testid="select-trigger">
              Target
            </button>
          )}
        />
      </React.Fragment>,
    );

    const selectTrigger = screen.getByText('Target');

    await user.click(selectTrigger);

    await waitFor(() => {
      expect(selectTrigger).not.toHaveFocus();
      expect(
        document.body.querySelector('#react-select-2-input'),
      ).toHaveFocus();
    });

    await user.tab();

    await waitFor(() => {
      expect(selectTrigger).not.toHaveFocus();
      expect(
        document.body.querySelector('#react-select-2-input'),
      ).toHaveFocus();
    });
  });

  it('should return focus to trigger element on close', async () => {
    const onChangeMock = jest.fn();
    render(
      <React.Fragment>
        <PopupSelect
          options={OPTIONS}
          value={OPTIONS[0]}
          testId={'PopupSelect'}
          onChange={(value) => onChangeMock(value)}
          target={({ ref }) => (
            <button ref={ref} data-testid="select-trigger">
              Target
            </button>
          )}
        />
      </React.Fragment>,
    );

    const selectTrigger = screen.getByText('Target');

    await user.click(selectTrigger);
    await user.click(screen.getByText('1'));

    expect(onChangeMock).toHaveBeenCalledWith({ label: '1', value: 'one' });
    expect(selectTrigger).toHaveFocus();
  });

  it('should return focus to trigger element on escape', async () => {
    const onChangeMock = jest.fn();
    render(
      <React.Fragment>
        <PopupSelect
          options={OPTIONS}
          value={OPTIONS[0]}
          testId={'PopupSelect'}
          onChange={(value) => onChangeMock(value)}
          target={({ ref }) => (
            <button ref={ref} data-testid="select-trigger">
              Target
            </button>
          )}
        />
      </React.Fragment>,
    );

    const selectTrigger = screen.getByText('Target');

    await user.click(selectTrigger);

    const escapeKeyDownEvent: KeyboardEvent = new KeyboardEvent('keydown', {
      key: 'Escape',
    });

    document.dispatchEvent(escapeKeyDownEvent);

    expect(onChangeMock).not.toHaveBeenCalled();
    expect(selectTrigger).toHaveFocus();
  });

  it('should stay open when cleared', async () => {
    render(
      <PopupSelect
        options={OPTIONS}
        value={OPTIONS[0]}
        isClearable
        target={({ ref }) => <button ref={ref}>Target</button>}
      />,
    );

    const selectTrigger = screen.getByText('Target');

    await user.click(selectTrigger);

    const clearIndicator = screen.getAllByRole('presentation')[0];

    expect(clearIndicator).toBeInTheDocument();

    // can't click indicator icon, cause it has `focusable="false"` attribute
    if (clearIndicator.parentElement) {
      await user.click(clearIndicator.parentElement);
    } else {
      fail('clear indicator should have focusable parent');
    }

    // Menu should still be open
    expect(screen.getByRole('combobox')).toHaveAttribute(
      'aria-expanded',
      'true',
    );
  });

  it('should clean up event listeners', () => {
    const { unmount } = render(
      <PopupSelect
        options={OPTIONS}
        value={OPTIONS[0]}
        isClearable
        target={({ ref }) => <button ref={ref}>Target</button>}
      />,
    );

    expect(addedListeners().length).toBe(1);

    unmount();

    expect(removedListeners().length).toBe(1);
  });

  it('should clean up event listeners added after being opened', async () => {
    const { unmount } = render(
      <PopupSelect
        options={OPTIONS}
        value={OPTIONS[0]}
        isClearable
        target={({ ref }) => <button ref={ref}>Target</button>}
      />,
    );

    const selectTrigger = screen.getByText('Target');

    await user.click(selectTrigger);

    expect(addedListeners().length).toBe(9);

    unmount();

    expect(removedListeners().length).toBe(9);
  });

  it('should trigger onMenuClose method when closed', async () => {
    const onMenuCloseMock = jest.fn();
    render(
      <React.Fragment>
        <PopupSelect
          options={OPTIONS}
          value={OPTIONS[0]}
          testId={'PopupSelect'}
          onClose={onMenuCloseMock}
          target={({ ref }) => (
            <button ref={ref} data-testid="select-trigger">
              Target
            </button>
          )}
        />
        <button data-testid="focus-decoy">Focus decoy</button>
      </React.Fragment>,
    );

    const selectTrigger = screen.getByText('Target');

    await user.click(selectTrigger);

    expect(screen.getByText('Select...')).toBeInTheDocument();

    await user.click(selectTrigger);

    expect(onMenuCloseMock).toHaveBeenCalled();
  });

  it('event listeners should continue to work when stopPropagation is called in parent', async () => {
    render(
      // eslint-disable-next-line jsx-a11y/click-events-have-key-events,jsx-a11y/no-static-element-interactions
      <div onClick={(e) => e.stopPropagation()}>
        <PopupSelect
          options={OPTIONS}
          value={OPTIONS[0]}
          target={({ ref }) => <button ref={ref}>Target</button>}
        />
      </div>,
    );

    await user.click(screen.getByText('Target'));

    expect(screen.getByText('Select...')).toBeInTheDocument();
  });

  const PopupSelectOpenTest = ({
    isOpen,
    defaultIsOpen,
  }: {
    isOpen?: boolean;
    defaultIsOpen?: boolean;
  }) => (
    <PopupSelect
      options={OPTIONS}
      value={OPTIONS[0]}
      isOpen={isOpen}
      defaultIsOpen={defaultIsOpen}
      classNamePrefix="popup-select"
      target={({ ref }) => (
        <button ref={ref} data-testid="target">
          Target
        </button>
      )}
    />
  );

  describe('isOpen prop', () => {
    it('should open and close the menu', () => {
      const { container, rerender } = render(<PopupSelectOpenTest />, {
        container: document.body,
      });

      // No prop is set, so initially the popup should be closed
      expect(
        container.getElementsByClassName('popup-select__menu-list').length,
      ).toBe(0);

      // Change `isOpen` to `true`
      rerender(<PopupSelectOpenTest isOpen />);

      // Menu should be open
      expect(
        container.getElementsByClassName('popup-select__menu-list').length,
      ).toBe(1);

      // Change `isOpen` to `false`
      rerender(<PopupSelectOpenTest isOpen={false} />);

      // Menu should be closed
      expect(
        container.getElementsByClassName('popup-select__menu-list').length,
      ).toBe(0);
    });

    it('should not allow the popup to close when set to true', () => {
      const { container, getByTestId } = render(
        <>
          <PopupSelectOpenTest isOpen />
          <button data-testid="close-decoy">Close decoy</button>
        </>,
        { container: document.body },
      );

      // Click elsewhere to trigger close
      const closeDecoy = getByTestId('close-decoy');
      closeDecoy.click();

      // Popup should remain open
      expect(
        container.getElementsByClassName('popup-select__menu-list').length,
      ).toBe(1);
    });

    it('should not allow the popup to open when set to false', async () => {
      const { container } = render(<PopupSelectOpenTest isOpen={false} />, {
        container: document.body,
      });

      // Click target to trigger open
      const target = screen.getByTestId('target');
      await user.click(target);

      // Popup should remain closed
      expect(
        container.getElementsByClassName('popup-select__menu-list').length,
      ).toBe(0);
    });

    it('should have preference over the `defaultIsOpen` prop', () => {
      const { container: closedContainer } = render(
        <PopupSelectOpenTest isOpen={false} defaultIsOpen />,
        { container: document.body },
      );

      // Popup should be closed
      expect(
        closedContainer.getElementsByClassName('popup-select__menu-list')
          .length,
      ).toBe(0);

      const { container: openContainer } = render(
        <PopupSelectOpenTest isOpen defaultIsOpen={false} />,
        { container: document.body },
      );

      // Popup should be open
      expect(
        openContainer.getElementsByClassName('popup-select__menu-list').length,
      ).toBe(1);
    });
  });

  describe('defaultIsOpen prop', () => {
    it('should open the popup on mount when set to true', () => {
      const { container } = render(<PopupSelectOpenTest defaultIsOpen />, {
        container: document.body,
      });

      // Popup should be open
      expect(
        container.getElementsByClassName('popup-select__menu-list').length,
      ).toBe(1);
    });

    it('should not open the popup on mount when set to false', () => {
      const { container } = render(
        <PopupSelectOpenTest defaultIsOpen={false} />,
        { container: document.body },
      );

      // Popup should be closed
      expect(
        container.getElementsByClassName('popup-select__menu-list').length,
      ).toBe(0);
    });

    it('should not open the popup if set to true after mount', () => {
      const { container, rerender } = render(
        <PopupSelectOpenTest defaultIsOpen={false} />,
        {
          container: document.body,
        },
      );

      // Popup should be closed
      expect(
        container.getElementsByClassName('popup-select__menu-list').length,
      ).toBe(0);

      rerender(<PopupSelectOpenTest defaultIsOpen />);

      // Popup should remain closed
      expect(
        container.getElementsByClassName('popup-select__menu-list').length,
      ).toBe(0);
    });
  });

  describe('trigger button', () => {
    const renderPopupSelect = () => {
      const renderResult = render(
        <PopupSelect
          options={OPTIONS}
          target={({ isOpen, ...triggerProps }) => (
            <button {...triggerProps}>Target</button>
          )}
        />,
      );

      return { ...renderResult, trigger: screen.getByText('Target') };
    };

    it('should have aria-haspopup attribute', () => {
      const { trigger } = renderPopupSelect();
      expect(trigger.getAttribute('aria-haspopup')).toBe('true');
    });

    it('should have aria-expanded attribute', async () => {
      const { trigger } = renderPopupSelect();

      expect(trigger.getAttribute('aria-expanded')).toBe('false');

      await user.click(trigger);

      expect(trigger.getAttribute('aria-expanded')).toBe('true');
    });

    it('when open, should have aria-controls attribute which is equal to the popup container id', async () => {
      const { trigger, container } = renderPopupSelect();

      expect(trigger.getAttribute('aria-controls')).toBeNull();
      // opens popup
      await user.click(trigger);

      const controledId = trigger.getAttribute('aria-controls');
      expect(controledId).toBeDefined();

      const body = container.parentElement as HTMLBodyElement;

      const popupWrapper = body.querySelector(`#${controledId}`);
      expect(popupWrapper).toBeDefined();
    });
  });
});
