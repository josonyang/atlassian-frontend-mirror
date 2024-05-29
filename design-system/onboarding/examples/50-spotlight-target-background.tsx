/** @jsx jsx */
import { Component } from 'react';

import { css, jsx } from '@emotion/react';
import Lorem from 'react-lorem-component';

import { Code } from '@atlaskit/code';
import { token } from '@atlaskit/tokens';

import { Spotlight, SpotlightManager, SpotlightTarget } from '../src';

import { Highlight, HighlightGroup } from './styled';

const wrapperStyles = css({
  padding: token('space.500', '40px'),
  backgroundColor: token('elevation.surface.raised'),
  borderRadius: token('border.radius', '4px'),
});

interface State {
  active: number | null;
}

/* eslint-disable react/sort-comp */
export default class SpotlightTargetBackgroundExample extends Component<
  Object,
  State
> {
  state: State = { active: null };

  start = () => this.setState({ active: 0 });

  next = () =>
    this.setState((state) => ({
      active: state.active != null ? state.active + 1 : null,
    }));

  prev = () =>
    this.setState((state) => ({
      active: state.active != null ? state.active - 1 : null,
    }));

  finish = () => this.setState({ active: null });

  renderActiveSpotlight() {
    const variants = [
      <Spotlight
        actions={[
          {
            onClick: this.next,
            text: 'Moving along',
          },
        ]}
        dialogPlacement="bottom left"
        heading="Eew, gross!"
        key="without"
        target="without"
      >
        <Lorem count={1} />
      </Spotlight>,
      <Spotlight
        actions={[
          { onClick: this.finish, text: 'Got it' },
          { onClick: this.prev, text: 'Back', appearance: 'subtle' },
        ]}
        dialogPlacement="bottom right"
        heading="Aah, that's better!"
        key="with"
        target="with"
        targetBgColor="white"
      >
        <Lorem count={1} />
      </Spotlight>,
    ];

    return this.state.active == null ? null : variants[this.state.active];
  }

  render() {
    return (
      <div css={wrapperStyles}>
        <SpotlightManager>
          <HighlightGroup>
            <SpotlightTarget name="without">
              {/* eslint-disable-next-line @atlaskit/design-system/ensure-design-token-usage */}
              <Highlight bg="transparent" color="red">
                No Target BG
              </Highlight>
            </SpotlightTarget>
            <SpotlightTarget name="with">
              {/* eslint-disable-next-line @atlaskit/design-system/ensure-design-token-usage */}
              <Highlight bg="transparent" color="green">
                White Target BG
              </Highlight>
            </SpotlightTarget>
          </HighlightGroup>

{/* eslint-disable-next-line @atlaskit/ui-styling-standard/enforce-style-prop -- Ignored via go/DSP-18766 */}
          <p style={{ marginBottom: '1em' }}>
            Sometimes your target relies on an ancestor&apos;s background color,
            which is lost when the blanket is applied. Pass any color value to{' '}
            <Code>targetBgColor</Code> to fix this.
          </p>
          <button type="button" onClick={this.start}>
            Start
          </button>

          {this.renderActiveSpotlight()}
        </SpotlightManager>
      </div>
    );
  }
}
