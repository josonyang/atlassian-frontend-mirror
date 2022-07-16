## API Report File for "@atlaskit/textarea"

> Do not edit this file. It is a report generated by [API Extractor](https://api-extractor.com/).

```ts
/// <reference types="react" />

import { ComponentType } from 'react';
import { default as React_2 } from 'react';
import { ReactNode } from 'react';
import { ThemeProp } from '@atlaskit/theme/components';
import { WithAnalyticsEventsProps } from '@atlaskit/analytics-next';

// @public (undocumented)
const TextArea: React_2.MemoExoticComponent<React_2.ForwardRefExoticComponent<
  Pick<
    Props,
    | 'appearance'
    | 'color'
    | 'maxHeight'
    | 'resize'
    | 'hidden'
    | 'style'
    | 'wrap'
    | 'minimumRows'
    | 'isMonospaced'
    | 'autoComplete'
    | 'autoFocus'
    | 'cols'
    | 'dirName'
    | 'form'
    | 'maxLength'
    | 'minLength'
    | 'name'
    | 'placeholder'
    | 'readOnly'
    | 'rows'
    | 'value'
    | 'onChange'
    | 'defaultChecked'
    | 'defaultValue'
    | 'suppressContentEditableWarning'
    | 'suppressHydrationWarning'
    | 'accessKey'
    | 'className'
    | 'contentEditable'
    | 'contextMenu'
    | 'dir'
    | 'draggable'
    | 'id'
    | 'lang'
    | 'slot'
    | 'spellCheck'
    | 'tabIndex'
    | 'title'
    | 'inputMode'
    | 'is'
    | 'radioGroup'
    | 'role'
    | 'about'
    | 'datatype'
    | 'inlist'
    | 'prefix'
    | 'property'
    | 'resource'
    | 'typeof'
    | 'vocab'
    | 'autoCapitalize'
    | 'autoCorrect'
    | 'autoSave'
    | 'itemProp'
    | 'itemScope'
    | 'itemType'
    | 'itemID'
    | 'itemRef'
    | 'results'
    | 'security'
    | 'unselectable'
    | 'aria-activedescendant'
    | 'aria-atomic'
    | 'aria-autocomplete'
    | 'aria-busy'
    | 'aria-checked'
    | 'aria-colcount'
    | 'aria-colindex'
    | 'aria-colspan'
    | 'aria-controls'
    | 'aria-current'
    | 'aria-describedby'
    | 'aria-details'
    | 'aria-disabled'
    | 'aria-dropeffect'
    | 'aria-errormessage'
    | 'aria-expanded'
    | 'aria-flowto'
    | 'aria-grabbed'
    | 'aria-haspopup'
    | 'aria-hidden'
    | 'aria-invalid'
    | 'aria-keyshortcuts'
    | 'aria-label'
    | 'aria-labelledby'
    | 'aria-level'
    | 'aria-live'
    | 'aria-modal'
    | 'aria-multiline'
    | 'aria-multiselectable'
    | 'aria-orientation'
    | 'aria-owns'
    | 'aria-placeholder'
    | 'aria-posinset'
    | 'aria-pressed'
    | 'aria-readonly'
    | 'aria-relevant'
    | 'aria-required'
    | 'aria-roledescription'
    | 'aria-rowcount'
    | 'aria-rowindex'
    | 'aria-rowspan'
    | 'aria-selected'
    | 'aria-setsize'
    | 'aria-sort'
    | 'aria-valuemax'
    | 'aria-valuemin'
    | 'aria-valuenow'
    | 'aria-valuetext'
    | 'children'
    | 'dangerouslySetInnerHTML'
    | 'onCopy'
    | 'onCopyCapture'
    | 'onCut'
    | 'onCutCapture'
    | 'onPaste'
    | 'onPasteCapture'
    | 'onCompositionEnd'
    | 'onCompositionEndCapture'
    | 'onCompositionStart'
    | 'onCompositionStartCapture'
    | 'onCompositionUpdate'
    | 'onCompositionUpdateCapture'
    | 'onFocus'
    | 'onFocusCapture'
    | 'onBlur'
    | 'onBlurCapture'
    | 'onChangeCapture'
    | 'onBeforeInput'
    | 'onBeforeInputCapture'
    | 'onInput'
    | 'onInputCapture'
    | 'onReset'
    | 'onResetCapture'
    | 'onSubmit'
    | 'onSubmitCapture'
    | 'onInvalid'
    | 'onInvalidCapture'
    | 'onLoad'
    | 'onLoadCapture'
    | 'onError'
    | 'onErrorCapture'
    | 'onKeyDown'
    | 'onKeyDownCapture'
    | 'onKeyPress'
    | 'onKeyPressCapture'
    | 'onKeyUp'
    | 'onKeyUpCapture'
    | 'onAbort'
    | 'onAbortCapture'
    | 'onCanPlay'
    | 'onCanPlayCapture'
    | 'onCanPlayThrough'
    | 'onCanPlayThroughCapture'
    | 'onDurationChange'
    | 'onDurationChangeCapture'
    | 'onEmptied'
    | 'onEmptiedCapture'
    | 'onEncrypted'
    | 'onEncryptedCapture'
    | 'onEnded'
    | 'onEndedCapture'
    | 'onLoadedData'
    | 'onLoadedDataCapture'
    | 'onLoadedMetadata'
    | 'onLoadedMetadataCapture'
    | 'onLoadStart'
    | 'onLoadStartCapture'
    | 'onPause'
    | 'onPauseCapture'
    | 'onPlay'
    | 'onPlayCapture'
    | 'onPlaying'
    | 'onPlayingCapture'
    | 'onProgress'
    | 'onProgressCapture'
    | 'onRateChange'
    | 'onRateChangeCapture'
    | 'onSeeked'
    | 'onSeekedCapture'
    | 'onSeeking'
    | 'onSeekingCapture'
    | 'onStalled'
    | 'onStalledCapture'
    | 'onSuspend'
    | 'onSuspendCapture'
    | 'onTimeUpdate'
    | 'onTimeUpdateCapture'
    | 'onVolumeChange'
    | 'onVolumeChangeCapture'
    | 'onWaiting'
    | 'onWaitingCapture'
    | 'onAuxClick'
    | 'onAuxClickCapture'
    | 'onClick'
    | 'onClickCapture'
    | 'onContextMenu'
    | 'onContextMenuCapture'
    | 'onDoubleClick'
    | 'onDoubleClickCapture'
    | 'onDrag'
    | 'onDragCapture'
    | 'onDragEnd'
    | 'onDragEndCapture'
    | 'onDragEnter'
    | 'onDragEnterCapture'
    | 'onDragExit'
    | 'onDragExitCapture'
    | 'onDragLeave'
    | 'onDragLeaveCapture'
    | 'onDragOver'
    | 'onDragOverCapture'
    | 'onDragStart'
    | 'onDragStartCapture'
    | 'onDrop'
    | 'onDropCapture'
    | 'onMouseDown'
    | 'onMouseDownCapture'
    | 'onMouseEnter'
    | 'onMouseLeave'
    | 'onMouseMove'
    | 'onMouseMoveCapture'
    | 'onMouseOut'
    | 'onMouseOutCapture'
    | 'onMouseOver'
    | 'onMouseOverCapture'
    | 'onMouseUp'
    | 'onMouseUpCapture'
    | 'onSelect'
    | 'onSelectCapture'
    | 'onTouchCancel'
    | 'onTouchCancelCapture'
    | 'onTouchEnd'
    | 'onTouchEndCapture'
    | 'onTouchMove'
    | 'onTouchMoveCapture'
    | 'onTouchStart'
    | 'onTouchStartCapture'
    | 'onPointerDown'
    | 'onPointerDownCapture'
    | 'onPointerMove'
    | 'onPointerMoveCapture'
    | 'onPointerUp'
    | 'onPointerUpCapture'
    | 'onPointerCancel'
    | 'onPointerCancelCapture'
    | 'onPointerEnter'
    | 'onPointerEnterCapture'
    | 'onPointerLeave'
    | 'onPointerLeaveCapture'
    | 'onPointerOver'
    | 'onPointerOverCapture'
    | 'onPointerOut'
    | 'onPointerOutCapture'
    | 'onGotPointerCapture'
    | 'onGotPointerCaptureCapture'
    | 'onLostPointerCapture'
    | 'onLostPointerCaptureCapture'
    | 'onScroll'
    | 'onScrollCapture'
    | 'onWheel'
    | 'onWheelCapture'
    | 'onAnimationStart'
    | 'onAnimationStartCapture'
    | 'onAnimationEnd'
    | 'onAnimationEndCapture'
    | 'onAnimationIteration'
    | 'onAnimationIterationCapture'
    | 'onTransitionEnd'
    | 'onTransitionEndCapture'
    | 'css'
    | 'isCompact'
    | 'isDisabled'
    | 'isReadOnly'
    | 'isRequired'
    | 'isInvalid'
    | 'theme'
    | 'testId'
    | 'createAnalyticsEvent'
  > &
    React_2.RefAttributes<HTMLTextAreaElement>
>>;
export default TextArea;

// @public (undocumented)
export const Theme: {
  Consumer: ComponentType<
    {
      children: (tokens: ThemeTokens) => ReactNode;
    } & ThemeProps
  >;
  Provider: ComponentType<{
    children?: ReactNode;
    value?: ThemeProp<ThemeTokens, ThemeProps> | undefined;
  }>;
  useTheme: (props: ThemeProps) => ThemeTokens;
};

// @public (undocumented)
export type ThemeAppearance = 'standard' | 'subtle' | 'none';

// @public (undocumented)
export type ThemeProps = {
  appearance: ThemeAppearance;
  mode: 'dark' | 'light';
};

// @public (undocumented)
export type ThemeTokens = {
  borderColor: string;
  borderColorFocus: string;
  backgroundColor: string;
  backgroundColorFocus: string;
  backgroundColorHover: string;
  disabledRules: {
    backgroundColor: string;
    backgroundColorFocus: string;
    backgroundColorHover: string;
    borderColor: string;
    borderColorFocus: string;
    textColor: string;
  };
  invalidRules: {
    borderColor: string;
    borderColorFocus: string;
    backgroundColor: string;
    backgroundColorFocus: string;
    backgroundColorHover: string;
  };
  textColor: string;
  placeholderTextColor: string;
};

// @public (undocumented)
export const themeTokens: {
  borderColor: {
    standard: {
      light: 'var(--ds-border-input)';
      dark: 'var(--ds-border-input)';
    };
    subtle: {
      light: string;
      dark: string;
    };
    none: {
      light: string;
      dark: string;
    };
  };
  borderColorFocus: {
    standard: {
      light: 'var(--ds-border-focused)';
      dark: 'var(--ds-border-focused)';
    };
    subtle: {
      light: 'var(--ds-border-focused)';
      dark: 'var(--ds-border-focused)';
    };
    none: {
      light: string;
      dark: string;
    };
  };
  backgroundColor: {
    standard: {
      light: 'var(--ds-background-neutral)';
      dark: 'var(--ds-background-neutral)';
    };
    subtle: {
      light: string;
      dark: string;
    };
    none: {
      light: string;
      dark: string;
    };
  };
  backgroundColorFocus: {
    standard: {
      light: 'var(--ds-background-input-pressed)';
      dark: 'var(--ds-background-input-pressed)';
    };
    subtle: {
      light: 'var(--ds-background-input-pressed)';
      dark: 'var(--ds-background-input-pressed)';
    };
    none: {
      light: string;
      dark: string;
    };
  };
  backgroundColorHover: {
    standard: {
      light: 'var(--ds-background-input-hovered)';
      dark: 'var(--ds-background-input-hovered)';
    };
    subtle: {
      light: 'var(--ds-background-neutral-subtle-hovered)';
      dark: 'var(--ds-background-neutral-subtle-hovered)';
    };
    none: {
      light: string;
      dark: string;
    };
  };
  disabledRules: {
    light: {
      backgroundColor: 'var(--ds-background-disabled)';
      backgroundColorFocus: 'var(--ds-background-disabled)';
      backgroundColorHover: 'var(--ds-background-disabled)';
      borderColor: 'var(--ds-border-disabled)';
      borderColorFocus: 'var(--ds-border-focused)';
      textColor: 'var(--ds-text-disabled)';
    };
    dark: {
      backgroundColor: 'var(--ds-background-disabled)';
      backgroundColorFocus: 'var(--ds-background-disabled)';
      backgroundColorHover: 'var(--ds-background-disabled)';
      borderColor: 'var(--ds-border-disabled)';
      borderColorFocus: 'var(--ds-border-focused)';
      textColor: 'var(--ds-text-disabled)';
    };
  };
  invalidRules: {
    light: {
      borderColor: 'var(--ds-border-danger)';
      borderColorFocus: 'var(--ds-border-focused)';
      backgroundColor: 'var(--ds-background-neutral)';
      backgroundColorFocus: 'var(--ds-background-input-pressed)';
      backgroundColorHover: 'var(--ds-background-input-hovered)';
    };
    dark: {
      borderColor: 'var(--ds-border-danger)';
      borderColorFocus: 'var(--ds-border-focused)';
      backgroundColor: 'var(--ds-background-neutral)';
      backgroundColorFocus: 'var(--ds-background-input-pressed)';
      backgroundColorHover: 'var(--ds-background-input-hovered)';
    };
  };
  textColor: {
    light: 'var(--ds-text)';
    dark: 'var(--ds-text)';
  };
  placeholderTextColor: {
    light: 'var(--ds-text-subtlest)';
    dark: 'var(--ds-text-subtlest)';
  };
};

// (No @packageDocumentation comment for this package)
```