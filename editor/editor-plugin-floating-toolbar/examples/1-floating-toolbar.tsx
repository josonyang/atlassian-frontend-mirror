/* eslint-disable no-console */
/** @jsx jsx */

import { Component } from 'react';

import { css, jsx } from '@emotion/react';
import { IntlProvider } from 'react-intl-next';

import ButtonGroup from '@atlaskit/button/button-group';
import Button from '@atlaskit/button/standard-button';
import type { FloatingToolbarItem } from '@atlaskit/editor-common/types';
import {
  cellBackgroundColorPalette,
  ColorPalette,
} from '@atlaskit/editor-common/ui-color';
import { content } from '@atlaskit/editor-core/example-helpers/styles';
import { Skeleton } from '@atlaskit/icon';
import { G500, R500, Y500 } from '@atlaskit/theme/colors';

import Toolbar from '../src/ui/Toolbar';

const SAVE_ACTION = () => console.log('Save');
// const analyticsHandler = (actionName, props) => console.log(actionName, props);

// eslint-disable-next-line @atlaskit/design-system/consistent-css-prop-usage
const container = css`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 100%;
  height: calc(100vh - 96px);
`;

const RedIcon = () => <Skeleton weight="strong" color={R500} />;
const YellowIcon = () => <Skeleton weight="strong" color={Y500} />;
const GreenIcon = () => <Skeleton weight="strong" color={G500} />;

const BUTTONS: Array<FloatingToolbarItem<Function>> = [
  {
    type: 'button',
    icon: RedIcon,
    onClick: () => {},
    title: 'Red button',
    hidden: true,
  },
  {
    type: 'button',
    icon: YellowIcon,
    onClick: () => {},
    title: 'Yellow button',
  },
  {
    type: 'button',
    icon: GreenIcon,
    onClick: () => {},
    title: 'Green button',
  },
];

const BUTTONS_WITH_SEPARATORS: Array<FloatingToolbarItem<Function>> = [
  {
    type: 'button',
    icon: RedIcon,
    onClick: () => {},
    title: 'Red button',
    hidden: true,
  },
  {
    type: 'separator',
    hidden: true,
  },
  {
    type: 'button',
    icon: YellowIcon,
    onClick: () => {},
    title: 'Yellow button',
  },
  {
    type: 'separator',
  },
  {
    type: 'button',
    icon: GreenIcon,
    onClick: () => {},
    title: 'Green button',
  },
];

const DROPDOWNS: Array<FloatingToolbarItem<Function>> = [
  {
    type: 'dropdown',
    title: 'Yellow dropdown',
    icon: YellowIcon,
    options: [
      {
        title: 'Header row',
        selected: false,
        onClick: () => {},
      },
      {
        title: 'Header column',
        selected: true,
        onClick: () => {},
      },
      {
        title: 'Number column',
        selected: false,
        onClick: () => {},
      },
    ],
  },
  {
    type: 'dropdown',
    title: 'Green dropdown',
    icon: GreenIcon,
    options: {
      render: ({ hide }) => (
        <ColorPalette
          paletteOptions={{
            palette: cellBackgroundColorPalette,
          }}
          selectedColor={null}
          onClick={() => {
            SAVE_ACTION();
            hide();
          }}
        />
      ),
      width: 146,
      height: 72,
    },
  },
];

// eslint-disable-next-line @repo/internal/react/no-class-components
export default class Example extends Component {
  state = {
    active: 'buttons',
  };
  render() {
    // eslint-disable-next-line @atlaskit/design-system/consistent-css-prop-usage
    const Container = () => (
      <div css={container}>
        <Toolbar
          items={this.getActiveItems()}
          // these examples aren't prosemirror specific
          node={undefined as any}
          dispatchCommand={() => SAVE_ACTION}
          featureFlags={{}}
          api={undefined}
        />
      </div>
    );

    const Content = () => (
      // eslint-disable-next-line @atlaskit/design-system/consistent-css-prop-usage
      <div css={content}>
        <Container />
        <div className="toolsDrawer">
          <div>
            <ButtonGroup>
              {this.renderButton('buttons', 'Buttons')}
              {this.renderButton(
                'buttons-with-separators',
                'Buttons with separator',
              )}
              {this.renderButton('dropdowns', 'Dropdowns')}
            </ButtonGroup>
          </div>
        </div>
      </div>
    );
    return (
      <IntlProvider locale="en">
        <Content />
      </IntlProvider>
    );
  }

  renderButton = (name: string, label: string) => (
    <Button
      spacing="compact"
      aria-label={name}
      appearance={this.state.active === name ? 'primary' : 'default'}
      onClick={() => this.setState({ active: name })}
    >
      {label}
    </Button>
  );

  getActiveItems = () => {
    switch (this.state.active) {
      case 'buttons-with-separators':
        return BUTTONS_WITH_SEPARATORS;
      case 'dropdowns':
        return DROPDOWNS;
      default:
        return BUTTONS;
    }
  };
}
