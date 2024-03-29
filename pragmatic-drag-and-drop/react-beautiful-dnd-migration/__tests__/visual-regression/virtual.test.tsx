// eslint-disable-next-line import/no-extraneous-dependencies
import type { ElementHandle, Page } from 'puppeteer';
import invariant from 'tiny-invariant';

import { getExampleUrl, loadPage } from '@atlaskit/visual-regression/helper';

import { customAttributes } from '../../src/utils/attributes';

async function getBySelector(
  page: Page,
  selector: string,
): Promise<ElementHandle<Element>> {
  const element = await page.$(selector);
  invariant(element !== null);
  return element;
}

function getDraggableSelector(draggableId: string) {
  return `[data-testid="item-${draggableId}"]`;
}

describe('virtual lists', () => {
  const url = getExampleUrl(
    'pragmatic-drag-and-drop',
    'react-beautiful-dnd-migration',
    'react-window',
    global.__BASEURL__,
    'light',
  );

  describe('keyboard drag', () => {
    it('should not error when the draggable remounts during a drag', async () => {
      const { page } = global;
      await loadPage(page, url);

      await page.setDragInterception(true);

      const selectorA0 = getDraggableSelector('A0');
      const cardA0 = await getBySelector(page, selectorA0);

      /**
       * The `parentElement` is the positioning div created by `react-window`.
       *
       * It will unmount when it the draggable it contains has scrolled out
       * of view.
       */
      const cardA0Container = await page.evaluateHandle((cardA0: Element) => {
        const { parentElement } = cardA0;
        if (!parentElement) {
          throw new Error('parent should exist');
        }
        return parentElement;
      }, cardA0);

      await cardA0.focus();
      await cardA0.press('Space');

      /**
       * Move down to the bottom of the list.
       *
       * NOTE: Previously this only went down 8, which seemed to land
       * around the exact threshold where `react-window` unmounts the Draggable.
       *
       * This led to flakiness, as the Draggable would unmount but then remount
       * immediately after.
       *
       * Moving to the bottom seems to result in the Draggable staying
       * consistently unmounted, so no flakiness!
       */
      for (let i = 0; i < 9; i++) {
        await page.keyboard.press('ArrowDown');
      }

      const isConnected = await page.evaluate((cardA0Container: Element) => {
        return cardA0Container.isConnected;
      }, cardA0Container);

      // The draggable should have unmounted now
      expect(isConnected).toBe(false);

      // Move back up so the Draggable remounts
      for (let i = 0; i < 8; i++) {
        await page.keyboard.press('ArrowUp');
      }

      // Drop the item
      await page.keyboard.press('Space');

      const index = await page.$eval(
        selectorA0,
        (cardA0, attribute) => {
          return cardA0.getAttribute(attribute as string);
        },
        customAttributes.draggable.index,
      );

      // The index should have updated, indicating a successful drop
      expect(index).toBe('1');
    });
  });
});
