/** @jsx jsx */
import React from 'react';
import { Component } from 'react';

import { jsx } from '@emotion/react';

import { panelTextInput } from '@atlaskit/editor-common/ui';

export interface Props {
  mountPoint?: HTMLElement;
  boundariesElement?: HTMLElement;
  defaultValue?: string;
  placeholder?: string;
  onBlur?: (text: string) => void;
  onSubmit?: (text: string) => void;
}

export interface State {
  text: string;
}

// eslint-disable-next-line @repo/internal/react/no-class-components
export default class TextField extends Component<Props, State> {
  constructor(props: Props) {
    super(props);
    this.state = {
      text: props.defaultValue || '',
    };
  }

  UNSAFE_componentWillReceiveProps(nextProps: Props) {
    if (this.state.text !== nextProps.defaultValue) {
      this.setState({
        text: nextProps.defaultValue || '',
      });
    }
  }

  handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    this.setState({ text: e.target.value });
  };

  handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (this.props.onSubmit) {
      this.props.onSubmit(this.state.text);
    }
  };

  handleBlur = (e: React.FocusEvent<{}>) => {
    e.preventDefault();
    if (this.props.onBlur) {
      this.props.onBlur(this.state.text);
    }
  };

  render() {
    const { placeholder } = this.props;
    return (
      <form onSubmit={this.handleSubmit}>
        <input
          // eslint-disable-next-line @atlaskit/design-system/consistent-css-prop-usage
          css={panelTextInput}
          value={this.state.text}
          onChange={this.handleChange}
          placeholder={placeholder}
          onBlur={this.handleBlur}
        />
      </form>
    );
  }
}
