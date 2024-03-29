import React, { useContext } from 'react';
import type {
  WithMediaClientConfigProps,
  WithMediaClientFunction,
} from '@atlaskit/media-client-react';
import Loadable from 'react-loadable';

import { CardLoading } from '../utils/lightCards/cardLoading';
import type { CardBaseProps } from './card';
import type { MediaCardAnalyticsErrorBoundaryProps } from './media-card-analytics-error-boundary';

export type CardWithMediaClientConfigProps =
  WithMediaClientConfigProps<CardBaseProps>;

const MediaCardContext = React.createContext({});

const CardLoadingWithContext: React.FC<{}> = () => {
  const props = useContext(MediaCardContext);
  return <CardLoading {...props} />;
};

const MediaCard = Loadable({
  loader: (): Promise<React.ComponentType<CardBaseProps>> =>
    import(
      /* webpackChunkName: "@atlaskit-internal_media-card" */ './card'
    ).then((mod) => mod.Card),
  loading: () => <CardLoadingWithContext />,
});

const MediaCardErrorBoundary = Loadable({
  loader: (): Promise<
    React.ComponentType<MediaCardAnalyticsErrorBoundaryProps>
  > =>
    import(
      /* webpackChunkName: "@atlaskit-internal_media-card-error-boundary" */ './media-card-analytics-error-boundary'
    ).then((mod) => mod.default),
  loading: () => <CardLoadingWithContext />,
});

const MediaCardWithMediaClient = Loadable({
  loader: () =>
    import(
      /* webpackChunkName: "@atlaskit-internal_media-client-react" */ '@atlaskit/media-client-react'
    ),
  loading: () => <CardLoadingWithContext />,
  render: (loaded, props: CardWithMediaClientConfigProps) => (
    <CardWithMediaClient {...props} withMediaClient={loaded.withMediaClient} />
  ),
});

const CardWithMediaClient: React.FC<
  CardWithMediaClientConfigProps & {
    withMediaClient: WithMediaClientFunction;
  }
> = (props) => {
  const { withMediaClient, dimensions, onClick } = props;
  const Card = React.useMemo(() => {
    return withMediaClient(MediaCard);
  }, [withMediaClient]);
  return (
    // onClick is passed into MediaCardErrorBoundary so MediaGroup items can get the toolbar menu in Editor
    <MediaCardErrorBoundary dimensions={dimensions} onClick={onClick}>
      <Card {...props} />
    </MediaCardErrorBoundary>
  );
};

const CardLoader: React.FC<CardWithMediaClientConfigProps> = (props) => {
  return (
    <MediaCardContext.Provider value={props}>
      <MediaCardWithMediaClient {...props} />
    </MediaCardContext.Provider>
  );
};

export default CardLoader;
