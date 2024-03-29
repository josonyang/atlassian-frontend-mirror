import { snapshot } from '@af/visual-regression';

import {
  CreateFormFooterSubmitting,
  CreateFormFooterSubmittingWithErrorMessage,
  CreateFormFooterWithErrorMessage,
} from '../../examples/vr/vr-form-footer';

type OptionsType = Parameters<typeof snapshot>[1];

const options: OptionsType = {
  variants: [
    {
      name: 'default',
      environment: {},
    },
    {
      name: 'light mode',
      environment: {
        colorScheme: 'light',
      },
    },
    {
      name: 'dark mode',
      environment: {
        colorScheme: 'dark',
      },
    },
  ],
};

snapshot(CreateFormFooterWithErrorMessage, options);
snapshot(CreateFormFooterSubmitting, options);
snapshot(CreateFormFooterSubmittingWithErrorMessage, options);
