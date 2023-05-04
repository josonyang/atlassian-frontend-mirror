import React from 'react';

import { render } from '@testing-library/react';

import {
  DraggableProvided,
  DraggableStateSnapshot,
} from '../../../../../../../src';
import { interactiveTagNames } from '../../../../../../../src/draggable/is-event-in-interactive-element';
import { setup } from '../../../../../_utils/setup';
import App, { Item } from '../../_utils/app';
import { Control, forEachSensor, simpleLift } from '../../_utils/controls';
import { isDragging } from '../../_utils/helpers';

beforeAll(() => {
  setup();
});

const mixedCase = (obj: Object): string[] => [
  ...Object.keys(obj).map(s => s.toLowerCase()),
  ...Object.keys(obj).map(s => s.toUpperCase()),
];

const forEachTagName = (fn: (tagName: string) => void) =>
  mixedCase(interactiveTagNames).forEach(fn);

// react will log a warning if using upper case
jest.spyOn(console, 'error').mockImplementation(() => {});

forEachSensor((control: Control) => {
  /**
   * Originally all controls were tested for here.
   *
   * In the migration layer, this behavior for pointer drags is determined
   * by the browser.
   */
  if (control.name === 'mouse') {
    return;
  }

  it('should not drag if the handle is an interactive element', () => {
    forEachTagName((tagName: string) => {
      const renderItem =
        (item: Item) =>
        (provided: DraggableProvided, snapshot: DraggableStateSnapshot) => {
          const TagName = tagName;
          return (
            <TagName
              {...provided.draggableProps}
              {...provided.dragHandleProps}
              // @ts-expect-error - we know these are native elements but TypeScript doesn't
              ref={provided.innerRef}
              data-is-dragging={snapshot.isDragging}
              data-testid={item.id}
            />
          );
        };

      const { unmount, getByTestId } = render(<App renderItem={renderItem} />);
      const handle: HTMLElement = getByTestId('0');

      simpleLift(control, handle);

      expect(isDragging(handle)).toBe(false);

      unmount();
    });
  });

  it('should allow dragging from an interactive handle if instructed', () => {
    mixedCase(interactiveTagNames).forEach((tagName: string) => {
      const items: Item[] = [{ id: '0', canDragInteractiveElements: true }];
      const renderItem =
        (item: Item) =>
        (provided: DraggableProvided, snapshot: DraggableStateSnapshot) => {
          const TagName = tagName;
          return (
            <TagName
              {...provided.draggableProps}
              {...provided.dragHandleProps}
              // @ts-expect-error - we know these are native elements but TypeScript doesn't
              ref={provided.innerRef}
              data-is-dragging={snapshot.isDragging}
              data-testid={item.id}
            />
          );
        };

      const { unmount, getByTestId } = render(
        <App items={items} renderItem={renderItem} />,
      );
      const handle: HTMLElement = getByTestId('0');

      simpleLift(control, handle);

      expect(isDragging(handle)).toBe(true);

      unmount();
    });
  });

  it('should not start a drag if the parent is interactive', () => {
    forEachTagName((tagName: string) => {
      const renderItem =
        (item: Item) =>
        (provided: DraggableProvided, snapshot: DraggableStateSnapshot) => {
          const TagName = tagName;
          return (
            <div
              {...provided.draggableProps}
              {...provided.dragHandleProps}
              ref={provided.innerRef}
              data-is-dragging={snapshot.isDragging}
              data-testid={`handle-${item.id}`}
            >
              <TagName data-testid={`inner-${item.id}`} />
            </div>
          );
        };

      const { unmount, getByTestId } = render(<App renderItem={renderItem} />);
      const inner: HTMLElement = getByTestId('inner-0');
      const handle: HTMLElement = getByTestId('handle-0');

      simpleLift(control, inner);

      expect(isDragging(handle)).toBe(false);

      unmount();
    });
  });

  it('should allow dragging from with an interactive parent if instructed', () => {
    forEachTagName((tagName: string) => {
      const items: Item[] = [{ id: '0', canDragInteractiveElements: true }];
      const renderItem =
        (item: Item) =>
        (provided: DraggableProvided, snapshot: DraggableStateSnapshot) => {
          const TagName = tagName;
          return (
            <div
              {...provided.draggableProps}
              {...provided.dragHandleProps}
              ref={provided.innerRef}
              data-is-dragging={snapshot.isDragging}
              data-testid={`handle-${item.id}`}
            >
              <TagName data-testid={`inner-${item.id}`} />
            </div>
          );
        };

      const { unmount, getByTestId } = render(
        <App items={items} renderItem={renderItem} />,
      );
      const handle: HTMLElement = getByTestId('handle-0');
      const inner: HTMLElement = getByTestId('inner-0');

      simpleLift(control, inner);

      expect(isDragging(handle)).toBe(true);

      unmount();
    });
  });
});
