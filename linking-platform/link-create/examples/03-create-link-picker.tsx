import React, { useMemo, useState } from 'react';

import { IntlProvider } from 'react-intl-next';

import Button from '@atlaskit/button/standard-button';
import LinkCreate from '@atlaskit/link-create';
import { LinkPicker } from '@atlaskit/link-picker';
import Popup from '@atlaskit/popup';
import { createConfluencePageLinkCreatePlugin } from '@atlassian/link-create-confluence';
import {
  mockCreatePage,
  mockFetchPage,
  mockFetchSpace,
} from '@atlassian/link-create-confluence/mocks';
import { createDefaultPluginPresets } from '@atlassian/link-create-presets';
import {
  LinkPickerCreateOnSubmitHandler,
  useLinkPickerCreate,
} from '@atlassian/link-picker-plugins';

// Mocks
mockFetchPage();
mockFetchSpace();
mockCreatePage();

// This is the cloud id for pug.jira-dev.com
const CLOUD_ID = 'DUMMY-a5a01d21-1cc3-4f29-9565-f2bb8cd969f5';

const LinkPickerCreate = () => {
  const [link, setLink] = useState<string | null>(null);
  const [showPicker, setShowPicker] = useState(true);

  // Plugin configuration
  // We can take specific create plugins, presets or both,
  // specific plugin configs will take priority over presets
  const linkPickerCreateconfigs = useMemo(
    () => [
      {
        product: 'confluence',
        cloudId: CLOUD_ID,
        create: createConfluencePageLinkCreatePlugin(CLOUD_ID),
      },
    ],
    [],
  );

  // Event handlers
  const onCancel = () => setShowPicker(false);
  const onSubmit: LinkPickerCreateOnSubmitHandler = payload => {
    setLink(payload.url);
    console.log(payload);
  };

  // Hook
  const { createProps, pickerProps } = useLinkPickerCreate(
    onSubmit,
    onCancel,
    linkPickerCreateconfigs,
    createDefaultPluginPresets(CLOUD_ID),
  );

  return (
    <div style={{ padding: '20px' }}>
      {link && (
        <div style={{ marginBottom: '1rem' }}>
          <a href={link} target="_blank" rel="noopener noreferrer nofollow">
            {link}
          </a>
        </div>
      )}
      <Popup
        isOpen={showPicker}
        autoFocus={false}
        onClose={onCancel}
        content={() => <LinkPicker {...pickerProps} />}
        trigger={props => (
          <Button
            {...props}
            appearance="primary"
            onClick={() => setShowPicker(!showPicker)}
          >
            Toggle
          </Button>
        )}
      />
      <LinkCreate {...createProps} />
    </div>
  );
};

export default function Create() {
  return (
    <IntlProvider locale="en">
      <LinkPickerCreate />
    </IntlProvider>
  );
}