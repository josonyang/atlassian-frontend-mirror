import React from 'react';
import { screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { EmojiProvider } from '@atlaskit/emoji';
import { getTestEmojiResource } from '@atlaskit/util-data-test/get-test-emoji-resource';
import {
  mockReactDomWarningGlobal,
  renderWithIntl,
  useFakeTimers,
} from '../../__tests__/_testing-library';
import { DefaultReactions } from '../../shared/constants';
import { ReactionPicker } from '../ReactionPicker';
import { RENDER_BUTTON_TESTID } from '../EmojiButton';
import { RENDER_TRIGGER_BUTTON_TESTID } from '../Trigger/Trigger';
import { RENDER_REACTIONPICKERPANEL_TESTID } from './ReactionPicker';
import { RENDER_SHOWMORE_TESTID } from '../ShowMore';
import { replaceRaf } from 'raf-stub';

// override requestAnimationFrame letting us execute it when we need
replaceRaf();

// TODO: fix warnings of this test
// the focus involve requestAnimationFrame, better to be stubbed

describe('@atlaskit/reactions/components/ReactionPicker', () => {
  let user: ReturnType<typeof userEvent.setup>;

  beforeEach(() => {
    user = userEvent.setup({ delay: null });
  });

  const renderPicker = (
    onSelection: (emojiId: string) => void = () => {},
    disabled = false,
    onCancel?: () => {},
  ) => {
    return (
      <ReactionPicker
        emojiProvider={getTestEmojiResource() as Promise<EmojiProvider>}
        onSelection={onSelection}
        allowAllEmojis
        pickerQuickReactionEmojiIds={DefaultReactions}
        disabled={disabled}
        onCancel={onCancel}
      />
    );
  };
  const animStub = window.cancelAnimationFrame;
  const onSelectionSpy = jest.fn();
  mockReactDomWarningGlobal(
    () => {
      window.cancelAnimationFrame = () => {};
    },
    () => {
      window.cancelAnimationFrame = animStub;
    },
  );
  useFakeTimers(() => {
    onSelectionSpy.mockClear();
  });

  it('should render a trigger button', async () => {
    renderWithIntl(renderPicker());
    const triggerPickerButton = await screen.findByLabelText('Add reaction');

    const btn = triggerPickerButton.closest('button');
    expect(btn).toBeInTheDocument();
  });

  it('should render selector options when trigger button is clicked, and should not auto focus the first emoji', async () => {
    renderWithIntl(renderPicker());
    const triggerPickerButton = await screen.findByLabelText('Add reaction');

    const btn = triggerPickerButton.closest('button');
    expect(btn).toBeInTheDocument();
    if (btn) {
      user.click(btn);
    }
    const selectorButtons = await screen.findAllByTestId(RENDER_BUTTON_TESTID);
    expect(selectorButtons).toBeDefined();
    expect(selectorButtons.length).toEqual(DefaultReactions.length);
    expect(selectorButtons[0]).not.toHaveFocus();
  });

  it('should call "onSelection" when an emoji is seleted', async () => {
    renderWithIntl(renderPicker(onSelectionSpy));
    const triggerPickerButton = await screen.findByLabelText('Add reaction');
    const btn = triggerPickerButton.closest('button');
    expect(btn).toBeInTheDocument();
    if (btn) {
      user.click(btn);
    }

    const selectorButtons = await screen.findAllByTestId(RENDER_BUTTON_TESTID);

    const firstEmoji = selectorButtons[0];
    expect(firstEmoji).toBeInTheDocument();

    user.click(firstEmoji);
    await waitFor(() => {
      expect(onSelectionSpy).toHaveBeenCalled();
    });
  });

  it('should disable trigger', async () => {
    renderWithIntl(renderPicker(onSelectionSpy, true));

    const triggerPickerButton = screen
      .getByLabelText('Add reaction')
      .closest('button');
    expect(triggerPickerButton).toBeInTheDocument();
    if (triggerPickerButton) {
      const prop = triggerPickerButton.getAttribute('disabled');
      expect(prop).toBeDefined();
    }
  });

  it('should close emoji picker when `ESC` is pressed', async () => {
    const mockOnCancel = jest.fn();
    renderWithIntl(renderPicker(undefined, false, mockOnCancel));
    const triggerPickerButton = await screen.getByTestId(
      RENDER_TRIGGER_BUTTON_TESTID,
    );
    expect(triggerPickerButton).toBeInTheDocument();
    await user.click(triggerPickerButton);
    //@ts-ignore
    requestAnimationFrame.step();
    const selectorButtons = await screen.findAllByTestId(RENDER_BUTTON_TESTID);
    expect(selectorButtons).toBeDefined();
    const firstEmoji = selectorButtons[0];
    firstEmoji.focus();

    // esc to close the popup
    await user.keyboard('{Esc}');
    //@ts-ignore
    requestAnimationFrame.step();
    expect(mockOnCancel).toHaveBeenCalled();
    expect(
      screen.queryByTestId(RENDER_REACTIONPICKERPANEL_TESTID),
    ).not.toBeInTheDocument();
    // should focus on trigger button when esc
    expect(triggerPickerButton).toHaveFocus();
  });

  it('should trap focus within reaction picker', async () => {
    renderWithIntl(renderPicker());

    const triggerPickerButton = await screen.getByTestId(
      RENDER_TRIGGER_BUTTON_TESTID,
    );
    expect(triggerPickerButton).toBeInTheDocument();
    await user.click(triggerPickerButton);
    //@ts-ignore
    requestAnimationFrame.step();
    expect(triggerPickerButton).not.toHaveFocus();

    // should show default reaction emojis
    const selectorButtons = await screen.findAllByTestId(RENDER_BUTTON_TESTID);
    expect(selectorButtons).toBeDefined();

    // should not auto focus first element
    expect(selectorButtons[0]).not.toHaveFocus();

    // tab to focus on first element
    await user.tab();
    expect(selectorButtons[0]).toHaveFocus();

    // shift tab should focus on last element
    await user.tab({
      shift: true,
    });
    const showMoreButton = await screen.getByTestId(RENDER_SHOWMORE_TESTID);
    expect(showMoreButton).toHaveFocus();
  });
});
