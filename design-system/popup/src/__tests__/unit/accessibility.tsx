import React from 'react';

import { cleanup, render } from '@testing-library/react';

import {
  axe,
  jestAxeConfig,
  toHaveNoViolations,
} from '@af/accessibility-testing';

import PopupExample from '../../../examples/10-popup';

expect.extend(toHaveNoViolations);

// As we're testing on the JSDOM, color-contrast testing can't run.
// The types of results fetched are limited for performance reasons
it('popup should not fail an aXe audit', async () => {
  const { container } = render(<PopupExample />);
  const results = await axe(container, jestAxeConfig);

  expect(results).toHaveNoViolations();

  // Only tests we explicitly skip can be incomplete
  expect(results.incomplete).toHaveLength(0);
  cleanup();
});
