import React from 'react';

import { render } from '@testing-library/react';
import createFocusTrap from 'focus-trap';
import { replaceRaf, Stub } from 'raf-stub';

import Popup, { Props } from '../../../../ui/Popup';

const mockFocusTrap = {
  activate: jest.fn(),
  deactivate: jest.fn(),
  pause: jest.fn(),
  unpause: jest.fn(),
};

jest.mock('focus-trap', () => {
  const originalModule = jest.requireActual('focus-trap');

  return {
    __esModule: true,
    ...originalModule,
    default: jest.fn(() => mockFocusTrap),
  };
});

replaceRaf();

const asStub = (raf: typeof requestAnimationFrame) => raf as unknown as Stub;

describe('Popup', () => {
  const raf: Stub = asStub(requestAnimationFrame);

  beforeEach(() => {
    raf.reset();
    jest.clearAllMocks();
  });

  const setup = (props: Partial<Props> = {}) => {
    const target = document.createElement('div');
    const component = render(<Popup target={target} {...props} />);

    return {
      target,
      component,
      rerender: (props: Partial<Props> = {}) =>
        component.rerender(<Popup target={target} {...props} />),
    };
  };

  describe('focus trap', () => {
    it('should initialize focus trap if `focusTrap` is `true`', () => {
      setup({ focusTrap: true });

      raf.flush();

      expect(createFocusTrap).toHaveBeenCalled();
      expect(mockFocusTrap.activate).toHaveBeenCalled();
    });

    it('should not initialize focus trap if `focusTrap` by default', () => {
      setup({ focusTrap: undefined });

      raf.flush();

      expect(createFocusTrap).not.toHaveBeenCalled();
    });

    it('should not initialize focus trap if `focusTrap` is `false`', () => {
      setup({ focusTrap: false });

      raf.flush();

      expect(createFocusTrap).not.toHaveBeenCalled();
    });

    it('should destroy focus trap on component unmount', () => {
      const { component } = setup({ focusTrap: true });

      raf.flush();
      expect(createFocusTrap).toHaveBeenCalled();
      expect(mockFocusTrap.activate).toHaveBeenCalled();

      component.unmount();

      expect(mockFocusTrap.deactivate).toHaveBeenCalled();
    });

    it('should cancel focus trap initialisation if unmounted before raf called', () => {
      const { component } = setup({ focusTrap: true });

      component.unmount();
      raf.flush();

      expect(createFocusTrap).not.toHaveBeenCalled();
    });

    it('should initialise the popup if `focusTrap` changes from `false` to `true`', () => {
      const { rerender } = setup({ focusTrap: false });

      raf.flush();

      expect(createFocusTrap).not.toHaveBeenCalled();

      rerender({ focusTrap: true });

      raf.flush();

      expect(createFocusTrap).toHaveBeenCalled();
      expect(mockFocusTrap.activate).toHaveBeenCalled();
    });

    it('should pause the focus trap if `focusTrap` changes from `true` to `false`', () => {
      const { rerender } = setup({ focusTrap: true });

      raf.flush();

      expect(createFocusTrap).toHaveBeenCalled();
      expect(mockFocusTrap.pause).not.toHaveBeenCalled();

      rerender({ focusTrap: false });

      expect(mockFocusTrap.pause).toHaveBeenCalled();
      expect(mockFocusTrap.unpause).not.toHaveBeenCalled();

      rerender({ focusTrap: true });

      expect(mockFocusTrap.unpause).toHaveBeenCalled();
    });
  });
});
