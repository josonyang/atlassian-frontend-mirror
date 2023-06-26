import React, { useCallback, useState } from 'react';

import { IntlProvider } from 'react-intl-next';

import Button from '@atlaskit/button/standard-button';
import { createConfluencePageLinkCreatePlugin } from '@atlassian/link-create-confluence';
import {
  mockCreatePage,
  mockFetchPage,
  mockFetchSpace,
} from '@atlassian/link-create-confluence/mocks';

import LinkCreate from '../src';
import { CreatePayload } from '../src/common/types';

// This is the cloud id for pug.jira-dev.com
const CLOUD_ID = 'DUMMY-a5a01d21-1cc3-4f29-9565-f2bb8cd969f5';

mockFetchPage();
mockFetchSpace();
mockCreatePage();

function CreateBasic() {
  const [link, setLink] = useState<string | null>();
  const [active, setActive] = useState(false);

  const plugins = [
    createConfluencePageLinkCreatePlugin(CLOUD_ID, 'https://pug.jira-dev.com'),
  ];

  const handleCreate = useCallback(async (payload: CreatePayload) => {
    await new Promise<void>(resolve => {
      setTimeout(() => resolve(), 2000);
    });
    console.log(payload.data);
    setLink(payload.url);
    setActive(false);
  }, []);

  const handleFailure = useCallback(() => {
    console.log('An error');
  }, []);

  const handleCancel = useCallback(() => {
    setActive(false);
  }, []);

  const handleCloseComplete = useCallback(() => {
    console.log('Modal closed');
  }, []);

  const handleOpenComplete = useCallback(() => {
    console.log('Modal opened');
  }, []);

  return (
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
        active={active}
        plugins={plugins}
        testId="link-create"
        triggeredFrom="example"
        entityKey="confluence-page"
        onCreate={handleCreate}
        onFailure={handleFailure}
        onCancel={handleCancel}
        onOpenComplete={handleOpenComplete}
        onCloseComplete={handleCloseComplete}
      />
    </div>
  );
}

export default function Create() {
  return (
    <IntlProvider locale="en">
      <CreateBasic />
    </IntlProvider>
  );
}
