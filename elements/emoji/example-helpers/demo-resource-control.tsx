import React, {
  type ReactElement,
  cloneElement,
  type ChangeEvent,
  useState,
} from 'react';
import {
  EmojiResource,
  type EmojiProvider,
  type EmojiResourceConfig,
} from '../src/resource';

export function getEmojiConfig(allowUpload = true) {
  let emojiConfig;
  try {
    // eslint-disable-next-line import/no-unresolved
    emojiConfig = require('../local-config')['default'] as EmojiResourceConfig;
  } catch (e) {
    emojiConfig = require('../local-config-example')[
      'default'
    ] as EmojiResourceConfig;
  }

  emojiConfig.allowUpload = allowUpload;
  return emojiConfig;
}

// get emojiProvider
export function getRealEmojiResource() {
  const resource = new EmojiResource(getEmojiConfig());
  return resource;
}

// get promise emojiProvider for dataProviders in editor/renderer
export function getRealEmojiProvider() {
  const resource = getRealEmojiResource();
  return resource.getEmojiProvider();
}

export interface Props {
  children: ReactElement<any>;
  emojiConfig: EmojiResourceConfig;
  customEmojiProvider?: Promise<EmojiProvider>;
  customPadding?: number;
}

export const ResourcedEmojiControl = (
  props: React.PropsWithChildren<Props>,
) => {
  const { customEmojiProvider, children, emojiConfig, customPadding } = props;
  const paddingBottom = customPadding ? `${customPadding}px` : '30px';

  const [emojiProvider, setEmojiProvider] = useState<Promise<EmojiProvider>>(
    customEmojiProvider || Promise.resolve(new EmojiResource(emojiConfig)),
  );

  const refreshEmoji = (emojiConfig: EmojiResourceConfig) => {
    setEmojiProvider(Promise.resolve(new EmojiResource(emojiConfig)));
  };

  const emojiConfigChange = (event: ChangeEvent<HTMLTextAreaElement>) => {
    // eslint-disable-next-line no-new-func
    const config = new Function('', `return (${event.target.value})`)();
    refreshEmoji(config);
  };

  return (
// eslint-disable-next-line @atlaskit/ui-styling-standard/enforce-style-prop -- Ignored via go/DSP-18766
    <div style={{ padding: '10px' }}>
{/* eslint-disable-next-line @atlaskit/ui-styling-standard/enforce-style-prop -- Ignored via go/DSP-18766 */}
      <div style={{ paddingBottom }}>
        {cloneElement(children, { emojiProvider })}
      </div>
      <div>
        <p>
          <label htmlFor="emoji-urls">EmojiLoader config</label>
        </p>
        <p>
          <textarea
            id="emoji-urls"
            rows={15}
// eslint-disable-next-line @atlaskit/ui-styling-standard/enforce-style-prop -- Ignored via go/DSP-18766
            style={{ height: '280px', width: '500px' }}
            onChange={emojiConfigChange}
            defaultValue={JSON.stringify(emojiConfig, null, 2)}
          />
        </p>
      </div>
    </div>
  );
};
