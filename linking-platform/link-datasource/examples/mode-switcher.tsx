/** @jsx jsx */
import { useState } from 'react';

import { css, jsx } from '@emotion/react';

import { ModeSwitcher } from '../src/ui/jira-issues-modal/mode-switcher';

const exampleModes = [
  { value: 'basic', label: 'Basic' },
  { value: 'jql', label: 'JQL' },
  { value: 'other', label: 'Other' },
];

const containerStyles = css({
  display: 'flex',
  flexDirection: 'column',
});

const lineStyles = css({
  margin: '10px',
});

export default () => {
  const [currentMode, setCurrentMode] = useState('basic');

  const onModeChange = (selectedMode: string) => {
    setCurrentMode(selectedMode);
  };

  return (
    <div css={containerStyles} data-testid={'mode-switcher-example-container'}>
      <div css={lineStyles}>
        <ModeSwitcher
          isCompact={false}
          options={exampleModes}
          onOptionValueChange={onModeChange}
          selectedOptionValue={currentMode}
        />
      </div>
      <div css={lineStyles}>
        <ModeSwitcher
          isCompact={true}
          options={exampleModes}
          onOptionValueChange={onModeChange}
          selectedOptionValue={currentMode}
        />
      </div>
      <div css={lineStyles}>
        <ModeSwitcher
          isDisabled={true}
          options={exampleModes}
          onOptionValueChange={onModeChange}
          selectedOptionValue={currentMode}
        />
      </div>
    </div>
  );
};