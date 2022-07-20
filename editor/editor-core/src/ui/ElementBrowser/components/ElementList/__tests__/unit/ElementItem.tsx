import React from 'react';
import { mount } from 'enzyme';

import { ButtonItem } from '@atlaskit/menu';

import { ElementItem } from '../../ElementList';

describe('ElementItem', () => {
  const mockInsertItem = jest.fn();
  const mockSetFocusedItemIndex = jest.fn();
  const item = {
    name: 'item-1',
    title: 'Item 1',
    action: jest.fn(),
    description: 'Item 1 description',
  };
  const props = {
    onInsertItem: mockInsertItem,
    setFocusedItemIndex: mockSetFocusedItemIndex,
    index: 0,
    selected: true,
    focus: true,
    item,
  };

  beforeEach(() => {
    jest.resetAllMocks();
  });

  describe('Inline mode', () => {
    it('should insert on keypress', () => {
      const component = mount(<ElementItem inlineMode={true} {...props} />);
      component
        .find(ButtonItem)
        .first()
        .simulate('click', { nativeEvent: { detail: 0 } });
      expect(mockSetFocusedItemIndex).toHaveBeenCalledWith(0);
      expect(mockInsertItem).toHaveBeenCalledWith(item);
    });
    it('should insert on single click', () => {
      const component = mount(<ElementItem inlineMode={true} {...props} />);
      component
        .find(ButtonItem)
        .first()
        .simulate('click', { nativeEvent: { detail: 1 } });
      expect(mockSetFocusedItemIndex).toHaveBeenCalledWith(0);
      expect(mockInsertItem).toHaveBeenCalledWith(item);
    });
    it('should not insert on double click', () => {
      const component = mount(<ElementItem inlineMode={true} {...props} />);
      component
        .find(ButtonItem)
        .first()
        .simulate('click', { nativeEvent: { detail: 2 } });
      expect(mockSetFocusedItemIndex).toHaveBeenCalledWith(0);
      expect(mockInsertItem).not.toHaveBeenCalled();
    });
  });

  describe('Full mode', () => {
    it('should insert on keypress', () => {
      const component = mount(<ElementItem inlineMode={false} {...props} />);
      component
        .find(ButtonItem)
        .first()
        .simulate('click', { nativeEvent: { detail: 0 } });
      expect(mockSetFocusedItemIndex).toHaveBeenCalledWith(0);
      expect(mockInsertItem).toHaveBeenCalled();
    });
    it('should not insert on single click', () => {
      const component = mount(<ElementItem inlineMode={false} {...props} />);
      component
        .find(ButtonItem)
        .first()
        .simulate('click', { nativeEvent: { detail: 1 } });
      expect(mockSetFocusedItemIndex).toHaveBeenCalledWith(0);
      expect(mockInsertItem).not.toHaveBeenCalled();
    });
    it('should insert on double click', () => {
      const component = mount(<ElementItem inlineMode={false} {...props} />);
      component
        .find(ButtonItem)
        .first()
        .simulate('click', { nativeEvent: { detail: 2 } });
      expect(mockSetFocusedItemIndex).toHaveBeenCalledWith(0);
      expect(mockInsertItem).toHaveBeenCalledWith(item);
    });
  });
});
