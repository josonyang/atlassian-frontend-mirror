import React from 'react';
import type { WrappedComponentProps } from 'react-intl-next';
import type { ReactWrapper } from 'enzyme';
import { mountWithIntl } from '../../../../../__tests__/__helpers/enzyme';
// eslint-disable-next-line import/no-extraneous-dependencies -- Removed import for fixing circular dependencies
import { mockAddEventListener } from '@atlaskit/editor-test-helpers/mock-add-event-listener';

import type { FindReplaceToolbarButtonProps } from '../../../ui/FindReplaceToolbarButton';
import FindReplaceToolbarButton from '../../../ui/FindReplaceToolbarButton';
import FindReplace from '../../../ui/FindReplace';
import ReactEditorViewContext from '../../../../../create-editor/ReactEditorViewContext';

describe('FindReplaceToolbarButton', () => {
  let findReplaceToolbarButton: ReactWrapper<
    FindReplaceToolbarButtonProps & WrappedComponentProps
  >;

  const editorRef = {
    current: document.createElement('div'),
  };

  const mountComponent = (props: Partial<FindReplaceToolbarButtonProps> = {}) =>
    mountWithIntl<FindReplaceToolbarButtonProps & WrappedComponentProps, any>(
      <ReactEditorViewContext.Provider
        value={{
          editorRef,
        }}
      >
        <FindReplaceToolbarButton
          findText=""
          index={0}
          isActive
          numMatches={0}
          replaceText=""
          shouldFocus
          shouldMatchCase
          onToggleMatchCase={jest.fn()}
          onActivate={jest.fn()}
          onCancel={jest.fn()}
          onFind={jest.fn()}
          onFindBlur={jest.fn()}
          onFindNext={jest.fn()}
          onFindPrev={jest.fn()}
          onReplace={jest.fn()}
          onReplaceAll={jest.fn()}
          takeFullWidth={false}
          {...props}
        />
      </ReactEditorViewContext.Provider>,
    );

  describe('when isActive=true', () => {
    it('displays find/replace component', () => {
      findReplaceToolbarButton = mountComponent({ isActive: true });
      expect(findReplaceToolbarButton.find(FindReplace).exists()).toBe(true);
    });

    describe('and toolbar button clicked', () => {
      const onCancelSpy = jest.fn();

      afterEach(() => {
        onCancelSpy.mockClear();
      });

      it('calls props.onCancel', () => {
        findReplaceToolbarButton = mountComponent({
          isActive: true,
          onCancel: onCancelSpy,
        });
        findReplaceToolbarButton
          .find('button[aria-haspopup]')
          .simulate('click');
        expect(onCancelSpy).toHaveBeenCalled();
      });
    });

    describe('and escape key pressed down', () => {
      const onCancelSpy = jest.fn();

      afterEach(() => {
        onCancelSpy.mockClear();
      });

      it('calls props.onCancel', () => {
        const { trigger, spy } = mockAddEventListener({
          element: editorRef.current,
        });
        findReplaceToolbarButton = mountComponent({
          isActive: true,
          onCancel: onCancelSpy,
        });
        trigger('keydown', new KeyboardEvent('keydown', { code: 'Escape' }));
        expect(onCancelSpy).toHaveBeenCalled();
        spy.mockRestore();
      });
    });
  });

  describe('when isActive=false', () => {
    it('hides find/replace component', () => {
      findReplaceToolbarButton = mountComponent({ isActive: false });
      expect(findReplaceToolbarButton.find(FindReplace).exists()).toBe(false);
    });

    describe('and toolbar button clicked', () => {
      const onActivateSpy = jest.fn();

      afterEach(() => {
        onActivateSpy.mockClear();
      });

      it('calls props.onActivate', () => {
        findReplaceToolbarButton = mountComponent({
          isActive: false,
          onActivate: onActivateSpy,
        });
        findReplaceToolbarButton
          .find('button[aria-haspopup]')
          .simulate('click');
        expect(onActivateSpy).toHaveBeenCalled();
      });
    });

    describe('and escape key pressed down', () => {
      const onCancelSpy = jest.fn();

      afterEach(() => {
        onCancelSpy.mockClear();
      });

      it('does not call props.onCancel', () => {
        const { trigger, spy } = mockAddEventListener();
        findReplaceToolbarButton = mountComponent({
          isActive: false,
          onCancel: onCancelSpy,
        });
        trigger('keydown', { code: 'Escape' });
        expect(onCancelSpy).not.toHaveBeenCalled();
        spy.mockRestore();
      });
    });
  });
});
