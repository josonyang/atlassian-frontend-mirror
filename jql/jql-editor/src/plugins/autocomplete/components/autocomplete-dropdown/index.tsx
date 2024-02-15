import React, {
  useCallback,
  useEffect,
  useLayoutEffect,
  useMemo,
  useRef,
  useState,
} from 'react';

import Spinner from '@atlaskit/spinner';

import { ScreenReaderText } from '../../../../accessibility';
import { JQL_EDITOR_AUTOCOMPLETE_ID } from '../../../../common/constants';
import {
  useAutocomplete,
  useAutocompleteIsOpen,
  useAutocompletePosition,
  useIntl,
  useRichInlineNodesEnabled,
  useScopedId,
  useStoreActions,
} from '../../../../state';
import { PluginKeymap } from '../../../common/plugin-keymap';
import {
  ARROW_DOWN_KEY,
  ARROW_UP_KEY,
  CMD_ARROW_DOWN_KEY,
  CMD_ARROW_UP_KEY,
  END_KEY,
  ENTER_KEY,
  ESCAPE_KEY,
  HOME_KEY,
  TAB_KEY,
} from '../../constants';
import { messages } from '../../messages';
import AutocompleteOption from '../autocomplete-option';
import {
  AutocompleteAnalyticsAttributes,
  SelectableAutocompleteOption,
} from '../types';

import {
  AutocompleteContainer,
  AutocompleteLoadingFooter,
  AutocompleteOptionsContainer,
  OptionList,
} from './styled';

type Props = {
  options: SelectableAutocompleteOption[];
  loading: boolean;
  keymap: PluginKeymap;
  onClick: (
    option: SelectableAutocompleteOption,
    analyticsAttributes: AutocompleteAnalyticsAttributes,
  ) => void;
};

const getPreviousOptionId = (
  options: SelectableAutocompleteOption[],
  selectedOptionId: string | undefined,
) => {
  if (!selectedOptionId) {
    return options[options.length - 1].id;
  }
  const index = options.findIndex(option => option.id === selectedOptionId);
  if (index === -1) {
    return options[options.length - 1].id;
  }
  if (index > 0) {
    return options[index - 1].id;
  }
  return undefined;
};

const getNextOptionId = (
  options: SelectableAutocompleteOption[],
  selectedOptionId: string | undefined,
) => {
  if (!selectedOptionId) {
    return options[0].id;
  }
  const index = options.findIndex(option => option.id === selectedOptionId);
  if (index === -1) {
    return options[0].id;
  }
  if (index < options.length - 1) {
    return options[index + 1].id;
  }
  return undefined;
};

const AutocompleteDropdown = ({ options, loading, keymap, onClick }: Props) => {
  const containerRef = useRef<HTMLElement | null>(null);
  const scrollContainerRef = useRef<HTMLElement | null>(null);
  const selectedItemRef = useRef<HTMLLIElement | null>(null);
  const [navigatingWithKeyboard, setNavigatingWithKeyboard] = useState(false);

  const [intl] = useIntl();

  const [, { onEditorViewFocus, onEditorViewBlur }] = useStoreActions();

  const [
    { selectedOptionId },
    {
      closeAutocomplete,
      setAutocompleteContainer,
      setSelectedAutocompleteOptionId,
    },
  ] = useAutocomplete();

  const [isAutocompleteOpen] = useAutocompleteIsOpen();

  const [{ top, left }] = useAutocompletePosition();

  const [areRichInlineNodesEnabled] = useRichInlineNodesEnabled();

  const [autocompleteId] = useScopedId(JQL_EDITOR_AUTOCOMPLETE_ID);

  const onContainerRef = useCallback(
    (container: HTMLElement | null) => {
      containerRef.current = container;
      setAutocompleteContainer(container);
    },
    [containerRef, setAutocompleteContainer],
  );

  const onScrollContainerRef = useCallback(
    (container: HTMLElement | null) => {
      scrollContainerRef.current = container;
    },
    [scrollContainerRef],
  );

  const handleClick = useCallback(
    (
      option: SelectableAutocompleteOption,
      optionIndex: number,
      keyboard: boolean,
    ) => {
      closeAutocomplete();
      onClick(option, {
        keyboard,
        numberOfOptions: options.length,
        optionIndex,
        optionType: option.type,
        queryLength: option.matchedText.length,
        nodeType:
          areRichInlineNodesEnabled && option.valueType !== undefined
            ? option.valueType
            : 'text',
      });
    },
    [options, onClick, closeAutocomplete, areRichInlineNodesEnabled],
  );

  const onMouseMove = useCallback(() => {
    if (navigatingWithKeyboard) {
      setNavigatingWithKeyboard(false);
    }
  }, [navigatingWithKeyboard, setNavigatingWithKeyboard]);

  useEffect(() => {
    keymap.bindKey(ARROW_UP_KEY, () => {
      if (!isAutocompleteOpen) {
        return false;
      }
      !navigatingWithKeyboard && setNavigatingWithKeyboard(true);
      const previousOptionId = getPreviousOptionId(options, selectedOptionId);
      setSelectedAutocompleteOptionId(previousOptionId);
      return true;
    });

    keymap.bindKey(ARROW_DOWN_KEY, () => {
      if (!isAutocompleteOpen) {
        return false;
      }
      !navigatingWithKeyboard && setNavigatingWithKeyboard(true);
      const nextOptionId = getNextOptionId(options, selectedOptionId);
      setSelectedAutocompleteOptionId(nextOptionId);
      return true;
    });

    keymap.bindMultipleKeys([ENTER_KEY, TAB_KEY], () => {
      if (!isAutocompleteOpen) {
        return false;
      }
      const selectedOptionIndex = options.findIndex(
        option => option.id === selectedOptionId,
      );
      if (selectedOptionId && selectedOptionIndex !== -1) {
        if (options[selectedOptionIndex].isDeprecated) {
          return true;
        }
        handleClick(options[selectedOptionIndex], selectedOptionIndex, true);
        return true;
      }
      // Open with no option selected, so we let PM do its stuff (a.k.a. keep inserting new lines)
      return false;
    });

    keymap.bindKey(ESCAPE_KEY, () => {
      if (!isAutocompleteOpen) {
        return false;
      }
      closeAutocomplete();
      return true;
    });

    keymap.bindMultipleKeys([HOME_KEY, CMD_ARROW_UP_KEY], () => {
      if (!isAutocompleteOpen) {
        return false;
      }
      !navigatingWithKeyboard && setNavigatingWithKeyboard(true);
      setSelectedAutocompleteOptionId(options[0]?.id);
      return true;
    });

    keymap.bindMultipleKeys([END_KEY, CMD_ARROW_DOWN_KEY], () => {
      if (!isAutocompleteOpen) {
        return false;
      }
      !navigatingWithKeyboard && setNavigatingWithKeyboard(true);
      setSelectedAutocompleteOptionId(options[options.length - 1]?.id);
      return true;
    });

    // New bindings should also be registered in plugins/autocomplete/index.tsx

    return () => {
      keymap.unbindKey(ARROW_UP_KEY);
      keymap.unbindKey(ARROW_DOWN_KEY);
      keymap.unbindKey(ENTER_KEY);
      keymap.unbindKey(TAB_KEY);
      keymap.unbindKey(ESCAPE_KEY);
      keymap.unbindKey(HOME_KEY);
      keymap.unbindKey(END_KEY);
      keymap.unbindKey(CMD_ARROW_UP_KEY);
      keymap.unbindKey(CMD_ARROW_DOWN_KEY);
    };
  }, [
    keymap,
    isAutocompleteOpen,
    closeAutocomplete,
    navigatingWithKeyboard,
    setNavigatingWithKeyboard,
    options,
    selectedOptionId,
    setSelectedAutocompleteOptionId,
    handleClick,
  ]);

  useEffect(() => {
    // Reset to no selection when:
    // - autocomplete is closed
    // - we get new options and those don't include the currently selected option
    if (
      !isAutocompleteOpen ||
      !options.some(option => option.id === selectedOptionId)
    ) {
      setSelectedAutocompleteOptionId(undefined);
    }
  }, [
    isAutocompleteOpen,
    options,
    selectedOptionId,
    setSelectedAutocompleteOptionId,
  ]);

  useLayoutEffect(() => {
    requestAnimationFrame(() => {
      if (containerRef.current) {
        containerRef.current.style.top = `${top}px`;
        containerRef.current.style.left = `${left}px`;
      }
    });
  }, [top, left]);

  useLayoutEffect(() => {
    if (navigatingWithKeyboard) {
      selectedItemRef.current?.scrollIntoView({ block: 'nearest' });
    }
  }, [navigatingWithKeyboard, selectedOptionId, selectedItemRef]);

  useLayoutEffect(() => {
    selectedItemRef.current?.scrollIntoView({ block: 'nearest' });
  }, [options, selectedItemRef]);

  useLayoutEffect(() => {
    if (isAutocompleteOpen && !selectedOptionId && scrollContainerRef.current) {
      scrollContainerRef.current.scrollTop = 0;
    }
  }, [isAutocompleteOpen, selectedOptionId]);

  const announcedMessage = useMemo(() => {
    if (!isAutocompleteOpen || !options.length) {
      return '';
    }
    return intl.formatMessage(messages.optionsFound);
  }, [isAutocompleteOpen, intl, options]);

  return (
    <>
      <AutocompleteContainer
        data-testid="jql-editor-autocomplete"
        tabIndex={-1}
        ref={onContainerRef}
        isOpen={isAutocompleteOpen}
        onBlur={onEditorViewBlur}
        onFocus={onEditorViewFocus}
      >
        <AutocompleteOptionsContainer
          ref={onScrollContainerRef}
          onMouseMove={onMouseMove}
        >
          <OptionList role="listbox" id={autocompleteId}>
            {options.map((option, index) => {
              const isSelected = option.id === selectedOptionId;
              return (
                <AutocompleteOption
                  key={option.value}
                  isSelected={isSelected}
                  {...(isSelected && { ref: selectedItemRef })}
                  option={option}
                  onClick={() => handleClick(option, index, false)}
                  onMouseMove={() => {
                    if (options[index]?.id !== selectedOptionId) {
                      setSelectedAutocompleteOptionId(options[index]?.id);
                    }
                  }}
                />
              );
            })}
          </OptionList>
        </AutocompleteOptionsContainer>
        {loading && (
          <AutocompleteLoadingFooter
            data-testid="jql-editor-autocomplete-loading"
            hasOptions={!!options.length}
          >
            <Spinner size="small" />
          </AutocompleteLoadingFooter>
        )}
      </AutocompleteContainer>
      <ScreenReaderText role="status" aria-live="polite">
        {announcedMessage}
      </ScreenReaderText>
    </>
  );
};

export default AutocompleteDropdown;
