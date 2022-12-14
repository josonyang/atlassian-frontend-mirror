/* eslint-disable @atlaskit/design-system/ensure-design-token-usage */
import React from 'react';
import { StatusPickerWithoutAnalytcs as StatusPicker } from '../../../../../plugins/status/ui/statusPicker';
import { FABRIC_CHANNEL } from '../../../../../plugins/status/analytics';
import { AnalyticsEventPayload } from '@atlaskit/analytics-next';
import { mountWithIntl } from '@atlaskit/editor-test-helpers/enzyme';

const packageName = process.env._PACKAGE_NAME_;
const packageVersion = process.env._PACKAGE_VERSION_;

describe('StatusPicker', () => {
  const closeStatusPicker = jest.fn();
  const createAnalyticsEvent = jest.fn();
  const onSelect = jest.fn();
  const onTextChanged = jest.fn();
  const onEnter = jest.fn();
  const fireEvent = jest.fn();
  const preventDefault = jest.fn();
  const stopPropagation = jest.fn();
  const stopImmediatePropagation = jest.fn();
  const event = {
    preventDefault,
    stopPropagation,
    nativeEvent: { stopImmediatePropagation },
  };

  beforeEach(() => {
    createAnalyticsEvent.mockReturnValue({
      fire: fireEvent,
    });
    document.body.innerHTML = "<div id='first'></div><div id='second'></div>";
  });

  afterEach(() => {
    createAnalyticsEvent.mockReset();
    fireEvent.mockReset();
    preventDefault.mockReset();
    stopPropagation.mockReset();
    stopImmediatePropagation.mockReset();
    onEnter.mockReset();
    onSelect.mockReset();
    onTextChanged.mockReset();
    closeStatusPicker.mockReset();
  });

  const mountStatusPicker = () =>
    mountWithIntl(
      <StatusPicker
        target={document.getElementById('first')}
        closeStatusPicker={closeStatusPicker}
        onSelect={onSelect}
        onTextChanged={onTextChanged}
        onEnter={onEnter}
        isNew={true}
        createAnalyticsEvent={createAnalyticsEvent}
        defaultColor="purple"
        defaultText="Hello"
        defaultLocalId="12345"
      />,
    );

  const createPayloadPopupOpened = (
    action: string,
    localId: string,
    selectedColor: string,
    textLength: number,
    state: string,
  ) => ({
    action,
    actionSubject: 'statusPopup',
    attributes: expect.objectContaining({
      componentName: 'status',
      localId,
      packageName: packageName,
      packageVersion: packageVersion,
      selectedColor,
      textLength,
      state,
    }),
  });

  const createPayloadPopupClosed = (
    action: string,
    localId: string,
    selectedColor: string,
    textLength: number,
    state: string,
  ) => ({
    action,
    actionSubject: 'statusPopup',
    attributes: expect.objectContaining({
      componentName: 'status',
      duration: expect.any(Number),
      inputMethod: 'blur',
      localId,
      packageName: packageName,
      packageVersion: packageVersion,
      selectedColor,
      state,
      textLength,
    }),
  });

  const assertAnalyticsPayload = (payload: AnalyticsEventPayload) => {
    expect(createAnalyticsEvent).toBeCalledWith(
      expect.objectContaining(payload),
    );
    expect(fireEvent).toBeCalledWith(FABRIC_CHANNEL);
  };

  const registerDocumentListeners = (map: Record<any, any> = {}) => {
    document.addEventListener = jest.fn((event, cb) => {
      map[event] = cb;
    });
  };

  describe('analytics', () => {
    it('should fire statusPopup.opened analytics when StatusPicker is mounted', () => {
      const wrapper = mountStatusPicker();
      wrapper.unmount();
      assertAnalyticsPayload(
        createPayloadPopupOpened('opened', '12345', 'purple', 5, 'new'),
      );
      assertAnalyticsPayload(
        createPayloadPopupClosed('closed', '12345', 'purple', 5, 'new'),
      );
    });

    it('should fire statusPopup.closed for previous Status instance and statusPopup.opened for the new Status', () => {
      const wrapper = mountStatusPicker();
      wrapper.setProps({
        defaultColor: 'red',
        defaultText: 'Boo',
        defaultLocalId: '45678',
        isNew: false,
        target: document.getElementById('second'),
      });
      wrapper.unmount();

      assertAnalyticsPayload(
        createPayloadPopupOpened('opened', '12345', 'purple', 5, 'new'),
      );
      assertAnalyticsPayload(
        createPayloadPopupClosed('closed', '12345', 'purple', 5, 'new'),
      );
      assertAnalyticsPayload(
        createPayloadPopupOpened('opened', '45678', 'red', 3, 'update'),
      );
      assertAnalyticsPayload(
        createPayloadPopupClosed('closed', '45678', 'red', 3, 'update'),
      );
    });
  });

  describe('StatusPicker callbacks', () => {
    it('should fire props.onEnter callback when Enter is pressed in the input field', () => {
      const wrapper = mountStatusPicker();
      const input = wrapper.find('input');
      input.simulate('keypress', { which: 'enter', key: 'Enter', keyCode: 13 });
      expect(onEnter).toHaveBeenCalled();
    });

    it('should fire props.onEnter callback when Escape is pressed in the input field', () => {
      const map: any = {};
      registerDocumentListeners(map);

      mountStatusPicker();
      map.keydown({ code: 'Escape', preventDefault, stopPropagation });

      expect(preventDefault).toHaveBeenCalled();
      expect(onEnter).toHaveBeenCalled();
    });
    describe('close status picker', () => {
      let windowSpy: jest.MockInstance<any, any[]>;
      let map: any;
      beforeEach(() => {
        windowSpy = jest.spyOn(window, 'getSelection');
        registerListenersAndMountPicker();
      });
      afterEach(() => jest.clearAllMocks());

      const registerListenersAndMountPicker = () => {
        map = {};
        registerDocumentListeners(map);
        mountStatusPicker();
      };

      it('should fire props.close callback when user clicks outside the popup', () => {
        windowSpy.mockImplementation(() => null);
        // simulate user clicking outside the popup
        map.click({ ...event, target: document.createElement('BUTTON') });
        expect(preventDefault).toHaveBeenCalled();
        expect(closeStatusPicker).toHaveBeenCalled();
      });

      it('should NOT fire props.close callback when user selecting text and mouseup outside popup', () => {
        windowSpy.mockImplementation(() => ({
          key: 'here',
        }));
        // simulate user clicking outside the popup
        map.click({ ...event, target: document.createElement('BUTTON') });
        expect(preventDefault).toHaveBeenCalled();
        expect(closeStatusPicker).not.toHaveBeenCalled();
      });
    });
  });
});
