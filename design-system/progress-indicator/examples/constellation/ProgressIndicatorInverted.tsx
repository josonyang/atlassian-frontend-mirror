import React, { Component } from 'react';

import styled from 'styled-components';

import Button from '@atlaskit/button';

import { ProgressIndicator } from '../../src';

const Footer = styled.div`
  align-items: center;
  display: flex;
  justify-content: space-between;
  padding: 1em;
`;

interface Props {
  selectedIndex: number;
  values: Array<string>;
}

interface State {
  selectedIndex: number;
}

// eslint-disable-next-line import/no-anonymous-default-export
export default class extends Component<Props, State> {
  static defaultProps = {
    selectedIndex: 0,
    values: ['first', 'second', 'third'],
  };

  state = {
    selectedIndex: this.props.selectedIndex,
  };

  handlePrev = () => {
    this.setState(prevState => ({
      selectedIndex: prevState.selectedIndex - 1,
    }));
  };

  handleNext = () => {
    this.setState(prevState => ({
      selectedIndex: prevState.selectedIndex + 1,
    }));
  };

  render() {
    const { values } = this.props;
    const { selectedIndex } = this.state;
    return (
      <Footer style={{ backgroundColor: '#1b2638' }}>
        <Button
          isDisabled={selectedIndex === 0}
          onClick={this.handlePrev}
          appearance={'primary'}
        >
          Prev
        </Button>
        <ProgressIndicator
          selectedIndex={selectedIndex}
          values={values}
          appearance={'inverted'}
        />
        <Button
          isDisabled={selectedIndex === values.length - 1}
          onClick={this.handleNext}
          appearance={'primary'}
        >
          Next
        </Button>
      </Footer>
    );
  }
}
