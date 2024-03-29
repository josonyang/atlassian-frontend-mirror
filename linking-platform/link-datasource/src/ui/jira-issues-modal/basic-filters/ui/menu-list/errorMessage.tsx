import React, { useEffect } from 'react';

import { useDebouncedCallback } from 'use-debounce';

import ErrorIcon from '@atlaskit/icon/glyph/error';
import { N500 } from '@atlaskit/theme/colors';
import { token } from '@atlaskit/tokens';

import { useDatasourceAnalyticsEvents } from '../../../../../analytics';
import { ErrorShownBasicSearchDropdownAttributesType } from '../../../../../analytics/generated/analytics.types';
import { FilterOptionsState } from '../../hooks/useFilterOptions';
import { BasicFilterFieldType } from '../../types';
import { SEARCH_DEBOUNCE_MS } from '../async-popup-select';

import { asyncPopupSelectMessages } from './messages';
import CustomSelectMessage from './selectMessage';

const getErrorReasonType = (
  errors?: FilterOptionsState['errors'],
): ErrorShownBasicSearchDropdownAttributesType['reason'] => {
  const [error] = errors || [];

  if (error instanceof Error) {
    return 'network';
  }

  if (errors && errors.length > 0) {
    return 'agg';
  }

  return 'unknown';
};

const CustomErrorMessage = ({
  filterType,
  errors,
}: {
  filterType: BasicFilterFieldType;
  errors?: FilterOptionsState['errors'];
}) => {
  const { fireEvent } = useDatasourceAnalyticsEvents();

  /**
   * Debounce is required because our search is debounced
   * ref: ./noOptionsMessage.tsx
   */
  const [debouncedAnalyticsCallback] = useDebouncedCallback(() => {
    fireEvent('ui.error.shown.basicSearchDropdown', {
      filterType,
      reason: getErrorReasonType(errors),
    });
  }, SEARCH_DEBOUNCE_MS);

  useEffect(debouncedAnalyticsCallback, [debouncedAnalyticsCallback]);

  return (
    <CustomSelectMessage
      icon={
        <ErrorIcon
          primaryColor={token('color.icon', N500)}
          label=""
          size="xlarge"
        />
      }
      message={asyncPopupSelectMessages.errorMessage}
      testId="jlol-basic-filter-popup-select--error-message"
    />
  );
};

export default CustomErrorMessage;
