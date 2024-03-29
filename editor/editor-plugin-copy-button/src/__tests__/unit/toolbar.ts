// eslint-disable-next-line import/no-extraneous-dependencies -- Removed import for fixing circular dependencies
import { createIntl } from 'react-intl-next';

import type {
  Command,
  FloatingToolbarItem,
} from '@atlaskit/editor-common/types';
// eslint-disable-next-line import/no-extraneous-dependencies -- Removed import for fixing circular dependencies
import { defaultSchema } from '@atlaskit/editor-test-helpers/schema';

import { copyButtonPluginKey } from '../../pm-plugins/plugin-key';
import { processCopyButtonItems } from '../../toolbar';

describe('process copy button', () => {
  const intl = createIntl({
    locale: 'en',
  });

  const config = {
    state: {
      plugins: [
        {
          // @ts-ignore copyButtonPluginKey.key
          key: copyButtonPluginKey.key,
        },
      ],
    },
    nodeType: defaultSchema.nodes.table,
    formatMessage: intl.formatMessage,
  } as any;

  const statePluginEnabled = {
    plugins: [
      {
        // @ts-ignore copyButtonPluginKey.key
        key: copyButtonPluginKey.key,
      },
    ],
  } as any;

  const statePluginDisabled = {
    plugins: [],
  } as any;

  it('should do nothing if items empty', () => {
    const items = [] as Array<FloatingToolbarItem<Command>>;

    const newItems = processCopyButtonItems(undefined)(statePluginEnabled)(
      items,
      undefined,
    );

    expect(newItems.length).toEqual(0);
  });

  it('should do nothing if no copy button', () => {
    const items = [
      {
        id: 'editor.table.delete',
        type: 'button',
        appearance: 'danger',
      },
    ] as Array<FloatingToolbarItem<Command>>;

    const newItems = processCopyButtonItems(undefined)(statePluginEnabled)(
      items,
      undefined,
    );

    expect(newItems.length).toEqual(1);

    expect(newItems).toEqual([
      {
        id: 'editor.table.delete',
        type: 'button',
        appearance: 'danger',
      },
    ]);
  });

  it('should insert copy button', () => {
    const items = [
      {
        type: 'copy-button',
        items: [
          config,
          {
            type: 'separator',
          },
        ],
      },
      {
        id: 'editor.table.delete',
        type: 'button',
        appearance: 'danger',
      },
    ] as Array<FloatingToolbarItem<Command>>;

    const newItems = processCopyButtonItems(undefined)(statePluginEnabled)(
      items,
      undefined,
    );

    expect(newItems.length).toEqual(3);

    expect(newItems[0]).toEqual(
      expect.objectContaining({ id: 'editor.floatingToolbar.copy' }),
    );
  });

  it('should hide copy button if hidden', () => {
    const items = [
      {
        type: 'copy-button',
        items: [
          config,
          {
            type: 'separator',
          },
        ],
        hidden: true,
      },
      {
        id: 'editor.table.delete',
        type: 'button',
        appearance: 'danger',
      },
    ] as Array<FloatingToolbarItem<Command>>;

    const newItems = processCopyButtonItems(undefined)(statePluginEnabled)(
      items,
      undefined,
    );

    expect(newItems.length).toEqual(1);

    expect(newItems[0]).toEqual(
      expect.objectContaining({
        id: 'editor.table.delete',
        type: 'button',
        appearance: 'danger',
      }),
    );
  });

  it('should remove copy button item if copy button plugin not enabled', () => {
    const items = [
      {
        type: 'copy-button',
        items: [
          config,
          {
            type: 'separator',
          },
        ],
      },
      {
        id: 'editor.table.delete',
        type: 'button',
        appearance: 'danger',
      },
    ] as Array<FloatingToolbarItem<Command>>;

    const newItems = processCopyButtonItems(undefined)(statePluginDisabled)(
      items,
      undefined,
    );

    expect(newItems).toEqual([
      {
        id: 'editor.table.delete',
        type: 'button',
        appearance: 'danger',
      },
    ]);
  });
});
