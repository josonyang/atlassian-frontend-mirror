/** @jsx jsx */
import { ComponentType, forwardRef, ReactNode, Ref } from 'react';

import { css, jsx } from '@emotion/react';

import Button, {
  Theme as ButtonTheme,
} from '@atlaskit/button/custom-theme-button';
import Heading from '@atlaskit/heading';
import { N0, N50A, N60A, P300 } from '@atlaskit/theme/colors';
import { createTheme, ThemeProp } from '@atlaskit/theme/components';
import { layers } from '@atlaskit/theme/constants';
import { token } from '@atlaskit/tokens';

import { DialogActionItem, DialogActionItemContainer } from '../styled/dialog';
import { Actions } from '../types';

import { spotlightButtonTheme } from './theme';

const bodyStyles = css({
  display: 'flex',
  padding: `${token('space.200', '16px')} ${token('space.250', '20px')}`,
  flexDirection: 'column',
});

const imageStyles = css({
  display: 'block',
});

const defaultHeaderStyles = css({
  display: 'flex',
  alignItems: 'baseline',
  justifyContent: 'space-between',
  paddingBlockEnd: token('space.100', '8px'),
});

const DefaultHeader = ({ children }: { children: ReactNode }) => (
  <div css={defaultHeaderStyles}>{children}</div>
);

const defaultFooterStyles = css({
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'space-between',
  paddingBlockStart: token('space.100', '8px'),
});

const DefaultFooter = ({ children }: { children: ReactNode }) => (
  <div css={defaultFooterStyles}>{children}</div>
);

const containerStyles = css({
  height: 'fit-content',
  zIndex: layers.spotlight() + 1,
  background: token('color.background.discovery.bold', P300),
  borderRadius: token('border.radius', '3px'),
  color: token('color.text.inverse', N0),
  overflow: 'auto',
});

const containerShadowStyles = css({
  boxShadow: token(
    'elevation.shadow.raised',
    `0 4px 8px -2px ${N50A}, 0 0 1px ${N60A}`,
  ),
});

/**
 * @deprecated
 */
const Theme = createTheme<CardTokens, {}>(() => ({
  container: {},
}));

/**
 * @deprecated
 */
interface CardTokens {
  /**
   * @deprecated
   */
  container: Record<string, string | undefined>;
}

interface SpotlightCardProps {
  /**
   * Buttons to render in the footer
   */
  actions?: Actions;
  /**
   * An optional element rendered to the left of the footer actions
   */
  actionsBeforeElement?: ReactNode;
  /**
   * The content of the card
   */
  children?: ReactNode;
  /**
   * The container elements rendered by the component
   */
  components?: {
    Header?: ComponentType<any>;
    Footer?: ComponentType<any>;
  };
  /**
   * The heading to be rendered above the body
   */
  heading?: ReactNode;
  /**
   * An optional element rendered to the right of the heading
   */
  headingAfterElement?: ReactNode;
  /**
   * The image src to render above the heading
   */
  image?: string | ReactNode;
  /**
   * Removes elevation styles if set
   */
  isFlat?: boolean;
  /**
   * @deprecated
   * Theme prop is deprecated and will be removed in the future.
   */
  // eslint-disable-next-line @repo/internal/react/consistent-props-definitions
  theme?: ThemeProp<CardTokens, {}>;

  /**
   * Specifies the width of the card component. Accepts either a number or the string '100%'.
   * When a number is provided, the width is set in pixels. When '100%' is provided, the width
   * is set to occupy 100% of the parent container's width. Regardless of whether `width` is set,
   * the width is constrained to a minimum width of 160px and a maximum width of 600px.
   */
  width?: number | '100%';
  /**
   * @deprecated
   * Use `ref` instead.
   */
  innerRef?: Ref<HTMLDivElement> | null;
  /**
   * A `testId` prop is provided for specified elements,
   * which is a unique string that appears as a data attribute `data-testid` in the rendered code,
   * serving as a hook for automated tests.
   */
  testId?: string;
  /**
   * The id of heading
   */
  headingId?: string;
}

/**
 * __Spotlight card__
 *
 * A spotlight card is for onboarding messages that need a more flexible layout, or don't require a dialog.
 *
 * - [Examples](https://atlassian.design/components/onboarding/spotlight-card/examples)
 * - [Code](https://atlassian.design/components/onboarding/spotlight-card/code)
 * - [Usage](https://atlassian.design/components/onboarding/spotlight-card/usage)
 */
const SpotlightCard = forwardRef<HTMLDivElement, SpotlightCardProps>(
  (props: SpotlightCardProps, ref) => {
    const {
      actions = [],
      actionsBeforeElement,
      children,
      components = {},
      heading,
      headingAfterElement,
      image,
      innerRef,
      isFlat,
      testId,
      theme,
      width = 400,
      headingId,
    } = props;
    const { Header = DefaultHeader, Footer = DefaultFooter } = components;

    return (
      <ButtonTheme.Provider value={spotlightButtonTheme}>
        <Theme.Provider value={theme}>
          <Theme.Consumer>
            {({ container }) => {
              return (
                <div
                  css={[
                    containerStyles,
                    !isFlat && containerShadowStyles,
                    // eslint-disable-next-line @atlaskit/design-system/consistent-css-prop-usage
                    container,
                  ]}
                  style={{
                    minWidth: '160px',
                    maxWidth: '600px',
                    width: typeof width === 'string' ? width : `${width}px`,
                  }}
                  ref={ref || innerRef}
                  data-testid={testId}
                >
                  {typeof image === 'string' ? (
                    <img css={imageStyles} src={image} alt="" />
                  ) : (
                    image
                  )}
                  <div css={bodyStyles}>
                    {heading || headingAfterElement ? (
                      <Header>
                        <Heading
                          id={headingId}
                          color="inverse"
                          level="h600"
                          as="h4"
                        >
                          {heading}
                        </Heading>
                        {headingAfterElement}
                      </Header>
                    ) : null}
                    {children}

                    {actions.length > 0 || actionsBeforeElement ? (
                      <Footer>
                        {/* Always need an element so space-between alignment works */}
                        {actionsBeforeElement || <span />}
                        <DialogActionItemContainer>
                          {actions.map(({ text, key, ...rest }, idx) => {
                            return (
                              <DialogActionItem
                                key={
                                  key ||
                                  (typeof text === 'string' ? text : `${idx}`)
                                }
                              >
                                <Button {...rest}>{text}</Button>
                              </DialogActionItem>
                            );
                          })}
                        </DialogActionItemContainer>
                      </Footer>
                    ) : null}
                  </div>
                </div>
              );
            }}
          </Theme.Consumer>
        </Theme.Provider>
      </ButtonTheme.Provider>
    );
  },
);

SpotlightCard.displayName = 'SpotlightCard';

export default SpotlightCard;
