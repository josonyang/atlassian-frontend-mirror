/** @jsx jsx */
import { useMemo } from 'react';

import { css, jsx } from '@emotion/react';
import { useIntl } from 'react-intl-next';

import { LoadingButton } from '@atlaskit/button';
import SearchIcon from '@atlaskit/icon/glyph/editor/search';
import { getBooleanFF } from '@atlaskit/platform-feature-flags';
import Textfield from '@atlaskit/textfield';
import { token } from '@atlaskit/tokens';

import { basicSearchInputMessages } from './messages';

export interface BasicSearchInputProps {
  isDisabled?: boolean;
  isSearching?: boolean;
  onChange: React.FormEventHandler<HTMLInputElement>;
  onSearch: (searchTerm: string) => void;
  searchTerm: string;
  testId?: string;
}

const searchButtonStyles = css({
  marginRight: token('space.075', '6px'),
});

const formStyles = css({
  flex: 1,
});

const formWithMaxWidthStyles = css({
  flex: 1,
  maxWidth: 250,
});

export const BasicSearchInput = ({
  isDisabled,
  isSearching,
  onChange,
  onSearch,
  searchTerm,
  testId = 'jira-jql-datasource-modal--basic-search-input',
}: BasicSearchInputProps) => {
  const { formatMessage } = useIntl();

  const handleFormSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSearch(searchTerm);
  };

  const showBasicFilters = useMemo(() => {
    if (
      getBooleanFF(
        'platform.linking-platform.datasource.show-jlol-basic-filters',
      )
    ) {
      return true;
    }
    return false;
  }, []);

  return (
    <form
      css={showBasicFilters ? formWithMaxWidthStyles : formStyles}
      onSubmit={handleFormSubmit}
    >
      <Textfield
        elemAfterInput={
          <LoadingButton
            appearance="primary"
            css={searchButtonStyles}
            iconBefore={
              <SearchIcon
                label={formatMessage(
                  basicSearchInputMessages.basicTextSearchLabel,
                )}
                size="medium"
              />
            }
            isDisabled={isDisabled}
            isLoading={isSearching}
            onClick={() => onSearch(searchTerm)}
            spacing="none"
            testId="jira-jql-datasource-modal--basic-search-button"
          />
        }
        autoFocus
        onChange={onChange}
        placeholder={formatMessage(
          basicSearchInputMessages.basicTextSearchLabel,
        )}
        testId={testId}
        value={searchTerm}
      />
    </form>
  );
};
