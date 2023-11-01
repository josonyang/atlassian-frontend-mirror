import React from 'react';
import { PureComponent } from 'react';
import {
  ResourcedEmojiControl,
  getEmojiConfig,
  getRealEmojiProvider,
} from '../example-helpers/demo-resource-control';
import type { EmojiProvider, OnEmojiProviderChange } from '../src/resource';
import { ResourcedEmoji } from '../src/element';
import { customCategory } from '../src/util/constants';
import { toEmojiId } from '../src/util/type-helpers';
import type { EmojiDescription, EmojiSearchResult } from '../src/types';
import { IntlProvider } from 'react-intl-next';

const customFilter = (emoji: EmojiDescription) =>
  emoji.category === customCategory;

interface FilteredProps {
  emojiProvider: Promise<EmojiProvider>;
  fitToHeight?: number;
}

interface FilteredState {
  unfilteredEmojis: EmojiDescription[];
  emojis: EmojiDescription[];
}

class ResourcedFilteredEmojiList extends PureComponent<
  FilteredProps,
  FilteredState
> {
  constructor(props: FilteredProps) {
    super(props);
    this.state = {
      unfilteredEmojis: [],
      emojis: [],
    };
  }

  UNSAFE_componentWillReceiveProps(nextProps: FilteredProps) {
    if (this.props.emojiProvider !== nextProps.emojiProvider) {
      if (this.props.emojiProvider) {
        this.props.emojiProvider.then((provider) => {
          provider.unsubscribe(this.onProviderChange);
        });
      }
      if (nextProps.emojiProvider) {
        nextProps.emojiProvider.then((provider: EmojiProvider) => {
          provider.subscribe(this.onProviderChange);
          provider.filter('');
        });
      }
    }
  }

  componentDidMount() {
    if (this.props.emojiProvider) {
      this.props.emojiProvider.then((provider) => {
        provider.subscribe(this.onProviderChange);
        provider.filter('');
      });
    }
  }

  componentWillUnmount() {
    if (this.props.emojiProvider) {
      this.props.emojiProvider.then((provider) => {
        provider.unsubscribe(this.onProviderChange);
      });
    }
  }

  private onSearchResult = (result: EmojiSearchResult) => {
    this.setState({
      unfilteredEmojis: result.emojis,
      emojis: result.emojis.filter(customFilter),
    });
  };

  private onProviderChange: OnEmojiProviderChange = {
    result: this.onSearchResult,
  };

  render() {
    const { emojis } = this.state;
    const { emojiProvider, fitToHeight } = this.props;

    return (
      <p style={{ padding: '10px', lineHeight: '24px' }}>
        {emojis.map((emoji) => (
          <ResourcedEmoji
            key={emoji.id || `${emoji.shortName}-${emoji.category}`}
            emojiProvider={emojiProvider}
            emojiId={toEmojiId(emoji)}
            fitToHeight={fitToHeight}
            showTooltip={true}
          />
        ))}
      </p>
    );
  }
}

export default function Example() {
  const emojiProvider = getRealEmojiProvider();
  const emojiList = (
    <ResourcedFilteredEmojiList emojiProvider={emojiProvider} />
  );
  return (
    <IntlProvider locale="en">
      <ResourcedEmojiControl
        emojiConfig={getEmojiConfig()}
        customEmojiProvider={emojiProvider}
        children={emojiList}
      />
    </IntlProvider>
  );
}
