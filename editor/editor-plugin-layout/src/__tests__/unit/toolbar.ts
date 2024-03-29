import type { MessageDescriptor } from 'react-intl-next';
import { createIntl } from 'react-intl-next';

// eslint-disable-next-line import/no-extraneous-dependencies
import type {
  CreateUIAnalyticsEvent,
  UIAnalyticsEvent,
} from '@atlaskit/analytics-next';
import { LAYOUT_TYPE } from '@atlaskit/editor-common/analytics';
import commonMessages, {
  layoutMessages as toolbarMessages,
} from '@atlaskit/editor-common/messages';
import type {
  Command,
  DocBuilder,
  FloatingToolbarConfig,
  FloatingToolbarItem,
} from '@atlaskit/editor-common/types';
import type { EditorView } from '@atlaskit/editor-prosemirror/view';
// eslint-disable-next-line import/no-extraneous-dependencies -- Removed import for fixing circular dependencies
import { createEditorFactory } from '@atlaskit/editor-test-helpers/create-editor';
// eslint-disable-next-line import/no-extraneous-dependencies -- Removed import for fixing circular dependencies
import { doc } from '@atlaskit/editor-test-helpers/doc-builder';
// eslint-disable-next-line import/no-extraneous-dependencies -- Removed import for fixing circular dependencies
import {
  findToolbarBtn,
  getToolbarItems,
} from '@atlaskit/editor-test-helpers/floating-toolbar';

import { buildToolbar } from '../../toolbar';

import { buildLayoutForWidths } from './_utils';

describe('layout toolbar', () => {
  let createAnalyticsEvent: CreateUIAnalyticsEvent;
  const createEditor = createEditorFactory();
  const editor = (doc: DocBuilder) => {
    createAnalyticsEvent = jest.fn(() => ({ fire() {} } as UIAnalyticsEvent));
    return createEditor({
      doc,
      editorProps: { allowLayouts: true, allowAnalyticsGASV3: true },
      createAnalyticsEvent,
    });
  };

  const intl = createIntl({
    locale: 'en',
  });

  interface ExpectedLayoutButton {
    name: string;
    message: MessageDescriptor;
  }

  const stdLayoutButtons: ExpectedLayoutButton[] = [
    {
      name: LAYOUT_TYPE.TWO_COLS_EQUAL,
      message: toolbarMessages.twoColumns,
    },
    {
      name: LAYOUT_TYPE.THREE_COLS_EQUAL,
      message: toolbarMessages.threeColumns,
    },
  ];

  const stdLayoutButtonsWithSingleLayout: ExpectedLayoutButton[] = [
    {
      name: LAYOUT_TYPE.SINGLE_COL,
      message: toolbarMessages.singleColumn,
    },
    ...stdLayoutButtons,
  ];

  const sidebarLayoutButtons: ExpectedLayoutButton[] = [
    { name: LAYOUT_TYPE.LEFT_SIDEBAR, message: toolbarMessages.leftSidebar },
    { name: LAYOUT_TYPE.RIGHT_SIDEBAR, message: toolbarMessages.rightSidebar },
    {
      name: LAYOUT_TYPE.THREE_WITH_SIDEBARS,
      message: toolbarMessages.threeColumnsWithSidebars,
    },
  ];
  let editorView: EditorView;
  let editorAPI: any;
  let toolbar: FloatingToolbarConfig;
  let items: Array<FloatingToolbarItem<Command>>;

  const assertToolbarButtonPresent = (expectedButton: ExpectedLayoutButton) => {
    const btn = findToolbarBtn(
      items,
      intl.formatMessage(expectedButton.message),
    );
    expect(btn).toBeDefined();
    expect(btn.title).toBe(expectedButton.message.defaultMessage);
    expect(btn.testId).toBe(expectedButton.message.id);
  };

  beforeEach(() => {
    ({ editorView, editorAPI } = editor(
      doc(buildLayoutForWidths([50, 50], true)),
    ));
  });

  describe('with "addSidebarLayouts"', () => {
    beforeEach(() => {
      toolbar = buildToolbar(
        editorView.state,
        intl,
        0,
        true,
        true,
        false,
        editorAPI,
      ) as FloatingToolbarConfig;

      items = getToolbarItems(toolbar, editorView);
    });

    it('displays all 5 layout buttons', () => {
      stdLayoutButtons.forEach(assertToolbarButtonPresent);
      sidebarLayoutButtons.forEach(assertToolbarButtonPresent);
    });

    it('displays delete button', () => {
      assertToolbarButtonPresent({
        name: '',
        message: commonMessages.remove,
      });
    });
  });

  describe('without "addSidebarLayouts"', () => {
    beforeEach(() => {
      toolbar = buildToolbar(
        editorView.state,
        intl,
        0,
        true,
        false,
        false,
        editorAPI,
      ) as FloatingToolbarConfig;

      items = getToolbarItems(toolbar, editorView);
    });

    it('displays only 2 original layout buttons', () => {
      stdLayoutButtons.forEach(assertToolbarButtonPresent);
      sidebarLayoutButtons.forEach(button => {
        expect(
          findToolbarBtn(items, intl.formatMessage(button.message)),
        ).not.toBeDefined();
      });
    });

    it('displays delete button', () => {
      assertToolbarButtonPresent({
        name: '',
        message: commonMessages.remove,
      });
    });
  });

  describe('with "singleLayout"', () => {
    beforeEach(() => {
      toolbar = buildToolbar(
        editorView.state,
        intl,
        0,
        true,
        true,
        true,
        editorAPI,
      ) as FloatingToolbarConfig;

      items = getToolbarItems(toolbar, editorView);
    });

    it('displays all 5 layout buttons + single layout button', () => {
      stdLayoutButtonsWithSingleLayout.forEach(assertToolbarButtonPresent);
      sidebarLayoutButtons.forEach(assertToolbarButtonPresent);
    });
  });

  describe('without "singleLayout"', () => {
    beforeEach(() => {
      toolbar = buildToolbar(
        editorView.state,
        intl,
        0,
        true,
        true,
        false,
        editorAPI,
      ) as FloatingToolbarConfig;

      items = getToolbarItems(toolbar, editorView);
    });

    it('displays all 5 layout buttons minus the single layout button', () => {
      stdLayoutButtons.forEach(assertToolbarButtonPresent);
      sidebarLayoutButtons.forEach(assertToolbarButtonPresent);
    });
  });

  describe('analytics', () => {
    beforeEach(() => {
      toolbar = buildToolbar(
        editorView.state,
        intl,
        0,
        true,
        true,
        false,
        editorAPI,
      ) as FloatingToolbarConfig;

      items = getToolbarItems(toolbar, editorView);
    });

    [...stdLayoutButtons, ...sidebarLayoutButtons].forEach(button => {
      describe(`for "${button.name}" layout`, () => {
        let previousLayout: LAYOUT_TYPE;

        beforeEach(() => {
          previousLayout = LAYOUT_TYPE.TWO_COLS_EQUAL;

          // if we are testing clicking the 2 col btn (default layout), want to
          // select another layout first
          if (button.name === previousLayout) {
            previousLayout = LAYOUT_TYPE.THREE_COLS_EQUAL;
            findToolbarBtn(
              items,
              intl.formatMessage(toolbarMessages.threeColumns),
            ).onClick(editorView.state, editorView.dispatch);
          }

          findToolbarBtn(items, intl.formatMessage(button.message)).onClick(
            editorView.state,
            editorView.dispatch,
          );
        });

        it('fires analytics event when click layout button', () => {
          expect(createAnalyticsEvent).toHaveBeenCalledWith({
            action: 'changedLayout',
            actionSubject: 'layout',
            attributes: expect.objectContaining({
              previousLayout,
              newLayout: button.name,
            }),
            eventType: 'track',
          });
        });

        it('fires analytics event when click delete button', () => {
          findToolbarBtn(
            items,
            intl.formatMessage(commonMessages.remove),
          ).onClick(editorView.state, editorView.dispatch);
          expect(createAnalyticsEvent).toHaveBeenCalledWith({
            action: 'deleted',
            actionSubject: 'layout',
            attributes: expect.objectContaining({ layout: button.name }),
            eventType: 'track',
          });
        });
      });
    });
  });
});
