import React from 'react';

import { render } from '@testing-library/react';
import { axe, JestAxeConfigureOptions, toHaveNoViolations } from 'jest-axe';

import { AtlassianLogo } from '../../index';

expect.extend(toHaveNoViolations);

const axeRules: JestAxeConfigureOptions = {
  rules: {
    // As we're testing on the JSDOM, color-contrast testing can't run.
    'color-contrast': { enabled: false },
  },
  // The types of results fetched are limited for performance reasons
  resultTypes: ['violations', 'incomplete', 'inapplicable'],
};
describe('Logo basic accessibility unit tests audit with jest-axe', () => {
  it('Logo should not fail an aXe audit', async () => {
    const { container } = render(<AtlassianLogo appearance="brand" />);
    const results = await axe(container, axeRules);

    expect(results).toHaveNoViolations();
  });
});
