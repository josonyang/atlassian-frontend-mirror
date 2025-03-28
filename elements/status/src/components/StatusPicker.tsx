/**
 * @jsxRuntime classic
 * @jsx jsx
 */
import TextField from '@atlaskit/textfield';
import { token } from '@atlaskit/tokens';
import React, { type FormEvent, PureComponent } from 'react';
import { injectIntl, type WrappedComponentProps } from 'react-intl-next';
import { css, jsx } from '@compiled/react';
import ColorPalette from './internal/color-palette';
import { type Color } from './Status';
import { messages } from './i18n';

export type ColorType = Color;

const fieldTextWrapperStyles = css({
	marginTop: 0,
	marginBottom: 0,
	marginRight: token('space.100'),
	marginLeft: token('space.100'),
	// eslint-disable-next-line @atlaskit/ui-styling-standard/no-nested-selectors -- Ignored via go/DSP-18766
	'& [data-ds--text-field--container]': {
		borderColor: token('color.border.bold'),
	},
});

export interface Props {
	selectedColor: ColorType;
	text: string;
	onEnter: () => void;
	onColorClick: (value: ColorType) => void;
	onColorHover?: (value: ColorType) => void;
	onTextChanged: (value: string) => void;
	autoFocus?: boolean;
}

class Picker extends PureComponent<Props & WrappedComponentProps, any> {
	private inputRef: HTMLInputElement | undefined;
	private autofocusTimeout: NodeJS.Timeout | undefined;
	private fieldTextWrapperKey = Math.random().toString();
	private colorPaletteKey = Math.random().toString();

	static defaultProps = {
		autoFocus: true,
	};

	render() {
		const { text, selectedColor, onColorClick, onColorHover, intl } = this.props;

		// Using <React.Fragment> instead of [] to workaround Enzyme
		// (https://github.com/airbnb/enzyme/issues/1149)
		return (
			<React.Fragment>
				<div css={fieldTextWrapperStyles} key={this.fieldTextWrapperKey}>
					<TextField
						value={text}
						isCompact
						ref={this.handleInputRef}
						onChange={this.onChange}
						onKeyPress={this.onKeyPress}
						spellCheck={false}
						autoComplete="off"
						aria-label={intl.formatMessage(messages.statusInputLabel)}
					/>
				</div>
				<ColorPalette
					key={this.colorPaletteKey}
					onClick={onColorClick}
					onHover={onColorHover}
					selectedColor={selectedColor}
				/>
			</React.Fragment>
		);
	}

	private onChange = (evt: FormEvent<HTMLInputElement>) => {
		// @ts-ignore
		this.props.onTextChanged(evt.target.value);
	};

	private onKeyPress = (event: React.KeyboardEvent<HTMLInputElement>) => {
		if (event.key === 'Enter') {
			this.props.onEnter();
		}
	};

	private handleInputRef = (ref?: HTMLInputElement) => {
		this.inputRef = ref;
		if (ref && this.props.autoFocus) {
			this.focusInput();
		}
	};

	private focusInput = () => {
		if (!this.inputRef) {
			return;
		}
		// Defer to prevent editor scrolling to top
		this.autofocusTimeout = setTimeout(() => {
			this.inputRef?.focus();
		});
	};

	componentDidUpdate() {
		if (this.inputRef && this.props.autoFocus) {
			this.focusInput();
		}
	}

	componentWillUnmount() {
		if (this.autofocusTimeout !== undefined) {
			clearTimeout(this.autofocusTimeout);
		}
	}
}

export const StatusPicker = injectIntl(Picker);
