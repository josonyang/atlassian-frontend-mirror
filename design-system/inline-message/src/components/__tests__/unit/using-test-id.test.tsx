import React from 'react';

import { render } from '@testing-library/react';
import userEvent from '@testing-library/user-event';

import InlineMessage from '../../../index';

const MessageContent = (
  <div>
    <h4>It is so great to use data-testid</h4>
    <span>
      Visit{' '}
      <a href="https://hello.atlassian.net/wiki/spaces/AF/pages/2634728893/Testing+in+Atlassian+Frontend">
        our testing website
      </a>{' '}
      for more information
    </span>
  </div>
);

const createWrapper = (testId?: string) => (
  <InlineMessage
    appearance="error"
    title="My testing Inline Message"
    secondaryText="Use data-testid to reliable testing"
    testId={testId ? testId : undefined}
  >
    {MessageContent}
  </InlineMessage>
);

describe('Inline message should be found by data-testid', () => {
  const user = userEvent.setup();

  test('Using getByTestId()', async () => {
    const inlineMessageBtn = 'the-inline-message--button';
    const inlineMessageComponent = 'the-inline-message';
    const inlineMessageTitle = 'the-inline-message--title';
    const inlineMessageText = 'the-inline-message--text';
    const inlineMessageContent = 'the-inline-message--inline-dialog';

    const { getByTestId } = render(createWrapper('the-inline-message'));
    expect(getByTestId(inlineMessageBtn)).toBeInTheDocument();
    expect(getByTestId(inlineMessageComponent)).toBeInTheDocument();
    expect(getByTestId(inlineMessageTitle)).toBeInTheDocument();
    expect(getByTestId(inlineMessageText)).toBeInTheDocument();
    // the content is only displayed when it is clicked on the inline-message.
    await user.click(getByTestId(inlineMessageBtn));
    expect(getByTestId(inlineMessageContent)).toBeInTheDocument();
  });
});
