import React, { useCallback, useState } from 'react';

import { IntlProvider } from 'react-intl-next';

import Button from '@atlaskit/button/standard-button';
import { createConfluencePageLinkCreatePlugin } from '@atlassian/link-create-confluence';

import LinkCreate from '../src';

// This is the cloud id for pug.jira-dev.com
const CLOUD_ID = 'DUMMY-a5a01d21-1cc3-4f29-9565-f2bb8cd969f5';

export default function Basic() {
  const [link, setLink] = useState<string | null>();
  const [active, setActive] = useState(false);

  const plugins = [
    createConfluencePageLinkCreatePlugin(CLOUD_ID, 'https://pug.jira-dev.com'),
  ];

  const handleCreate = useCallback((url: string) => {
    setLink(url);
    setActive(false);
  }, []);

  const handleFailure = useCallback(() => {
    console.log('An error');
  }, []);

  const handleCancel = useCallback(() => {
    setActive(false);
  }, []);

  return (
    <IntlProvider locale="en">
      <div style={{ padding: '20px' }}>
        {link && (
          <div style={{ marginBottom: '1rem' }}>
            <a href={link} target="_blank" rel="noopener noreferrer nofollow">
              {link}
            </a>
          </div>
        )}

        <Button
          testId="link-create-show"
          appearance="primary"
          onClick={() => setActive(true)}
        >
          Create
        </Button>
        <LinkCreate
          testId="link-create"
          plugins={plugins}
          entityKey={'undefined' as any} // Rip
          onCreate={handleCreate}
          onCancel={handleCancel}
          onFailure={handleFailure}
          active={active}
        />
      </div>
    </IntlProvider>
  );
}