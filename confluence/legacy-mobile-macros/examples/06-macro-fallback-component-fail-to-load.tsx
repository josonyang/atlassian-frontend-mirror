import React from 'react';

import { IntlProvider } from 'react-intl-next';

import { MacroFallbackComponent } from '../src/ui';

export default function MacroFallbackComponentFailToLoadExample() {
  const createPromise = () => ({
    submit: () => {
      throw new Error('something bad happened');
    },
  });
  const eventDispatcher = {
    on: () => {},
    off: () => {},
    emit: () => {},
  };
  const extension = {
    extensionKey: 'toc',
    extensionType: 'macro',
    parameters: {
      macroMetadata: {
        macroId: 'MacroID',
        title: 'Macro Title',
      },
    },
  };

  return (
    <IntlProvider locale="en">
      <div style={{ padding: '50px' }}>
        <MacroFallbackComponent
          createPromise={createPromise}
          eventDispatcher={eventDispatcher}
          extension={extension}
          openInBrowser={false}
        />
      </div>
    </IntlProvider>
  );
}