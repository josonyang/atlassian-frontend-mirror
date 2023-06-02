import React, { ComponentProps } from 'react';

import { render } from '@testing-library/react';
import {
  axe,
  type JestAxeConfigureOptions,
  toHaveNoViolations,
} from 'jest-axe';

import ProgressBar from '../../components/progress-bar';
import SuccessProgressBar from '../../components/success-progress-bar';
import TransparentProgressBar from '../../components/transparent-progress-bar';

expect.extend(toHaveNoViolations);

const axeRules: JestAxeConfigureOptions = {
  rules: {
    // As we're testing on the JSDOM, color-contrast testing can't run.

    'color-contrast': { enabled: false },
  },

  // The types of results fetched are limited for performance reasons

  resultTypes: ['violations', 'incomplete', 'inapplicable'],
};

type ProgressBarProps = ComponentProps<typeof ProgressBar>;

describe('ProgressBar', () => {
  const defaultProps: ProgressBarProps = {
    ariaLabel: 'Axe test label',
  };

  it('passes basic aXe audit on the initial rendered state', async () => {
    const wrapper = render(
      <ProgressBar {...defaultProps} appearance="default" />,
    );

    const results = await axe(wrapper.container, axeRules);

    expect(results).toHaveNoViolations();
  });

  it('passes basic aXe audit on the inverse state', async () => {
    const wrapper = render(
      <ProgressBar {...defaultProps} appearance="inverse" />,
    );

    const results = await axe(wrapper.container, axeRules);

    expect(results).toHaveNoViolations();
  });

  it('passes basic aXe audit on the success state', async () => {
    const wrapper = render(
      <ProgressBar {...defaultProps} appearance="success" />,
    );

    const results = await axe(wrapper.container, axeRules);

    expect(results).toHaveNoViolations();
  });

  it('passes basic aXe audit on the indeterminate state', async () => {
    const wrapper = render(<ProgressBar {...defaultProps} isIndeterminate />);

    const results = await axe(wrapper.container, axeRules);

    expect(results).toHaveNoViolations();
  });
});

type SuccessProgressBarProps = ComponentProps<typeof ProgressBar>;

describe('SuccessProgressBar', () => {
  const defaultProps: SuccessProgressBarProps = {
    ariaLabel: 'Axe test label',
  };

  it('passes basic aXe audit on the initial rendered (success) state', async () => {
    const wrapper = render(<SuccessProgressBar {...defaultProps} />);

    const results = await axe(wrapper.container, axeRules);

    expect(results).toHaveNoViolations();
  });

  it('passes basic aXe audit on the default appearance with indeterminate state', async () => {
    const wrapper = render(
      <SuccessProgressBar {...defaultProps} isIndeterminate />,
    );

    const results = await axe(wrapper.container, axeRules);

    expect(results).toHaveNoViolations();
  });

  it('passes basic aXe audit on the default appearance when value less than 1', async () => {
    const wrapper = render(
      <SuccessProgressBar {...defaultProps} value={0.5} />,
    );

    const results = await axe(wrapper.container, axeRules);

    expect(results).toHaveNoViolations();
  });
});

type TransparentProgressBarProps = ComponentProps<typeof ProgressBar>;

describe('TransparentProgressBar', () => {
  const defaultProps: TransparentProgressBarProps = {
    ariaLabel: 'Axe test label',
  };

  it('passes basic aXe audit on the initial rendered (inverse) state', async () => {
    const wrapper = render(<TransparentProgressBar {...defaultProps} />);

    const results = await axe(wrapper.container, axeRules);

    expect(results).toHaveNoViolations();
  });

  it('passes basic aXe audit on the indeterminate state', async () => {
    const wrapper = render(
      <TransparentProgressBar {...defaultProps} isIndeterminate />,
    );

    const results = await axe(wrapper.container, axeRules);

    expect(results).toHaveNoViolations();
  });
});