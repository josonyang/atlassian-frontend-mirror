import React from 'react';

import {
  createAndFireEvent,
  withAnalyticsContext,
  withAnalyticsEvents,
  WithAnalyticsEventsProps,
} from '@atlaskit/analytics-next';

import Div from './styled';

const packageName = process.env._PACKAGE_NAME_ as string;
const packageVersion = process.env._PACKAGE_VERSION_ as string;

interface Props extends WithAnalyticsEventsProps {
  /** Whether mouse events can pierce the blanket. If true, onBlanketClicked will not be fired */
  canClickThrough?: boolean;
  /** Whether the blanket has a tinted background color. */
  isTinted?: boolean;
  /** Handler function to be called when the blanket is clicked */
  onBlanketClicked?: (event: React.MouseEvent<HTMLDivElement>) => void;
}

class Blanket extends React.Component<Props, {}> {
  static defaultProps = {
    canClickThrough: false,
    isTinted: false,
    onBlanketClicked: () => {},
  };

  render() {
    const { canClickThrough, isTinted, onBlanketClicked } = this.props;
    const onClick = canClickThrough ? undefined : onBlanketClicked;
    const containerProps = { canClickThrough, isTinted, onClick };

    return <Div {...containerProps} />;
  }
}

export { Blanket as BlanketWithoutAnalytics };
const createAndFireEventOnAtlaskit = createAndFireEvent('atlaskit');

export default withAnalyticsContext({
  componentName: 'blanket',
  packageName,
  packageVersion,
})(
  withAnalyticsEvents({
    onBlanketClicked: createAndFireEventOnAtlaskit({
      action: 'clicked',
      actionSubject: 'blanket',

      attributes: {
        componentName: 'blanket',
        packageName,
        packageVersion,
      },
    }),
  })(Blanket),
);
