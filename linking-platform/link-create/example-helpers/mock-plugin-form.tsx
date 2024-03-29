import React, { useCallback, useMemo } from 'react';

import {
  AsyncSelect,
  CreateForm,
  CreateFormProps,
  TextField,
  useLinkCreateCallback,
  Validator,
} from '../src';

interface pluginProps {
  shouldThrowError?: boolean;
}

export function MockPluginForm({ shouldThrowError }: pluginProps) {
  const { onCreate, onFailure, onCancel } = useLinkCreateCallback();

  type MockOptions = {
    label: string;
    value: string;
  };

  const mockHandleSubmit = async () => {
    if (onCreate) {
      await onCreate({
        url: 'https://atlassian.com/product/new-object-id',
        objectId: 'new-object-id',
        objectType: 'object-type',
        data: {},
        ari: 'example-ari',
      });
    }
  };

  const mockValidator: Validator = useMemo(
    () => ({
      isValid: (val: unknown) => !!val,
      errorMessage: 'Validation Error: You need to provide a value.',
    }),
    [],
  );

  const mockLoadOptions = useCallback(async () => {
    const exampleOptions = [
      { label: 'Option 1', value: 'option-1' },
      { label: 'Option 2', value: 'option-2' },
    ];

    try {
      if (shouldThrowError) {
        throw new Error('This is an error message.');
      }
      return exampleOptions;
    } catch (error) {
      if (error instanceof Error) {
        onFailure && onFailure(error);
      }
      return [];
    }
  }, [onFailure, shouldThrowError]);

  return (
    <div>
      This is a mocked plugin.
      <CreateForm<CreateFormProps<FormData>>
        onSubmit={mockHandleSubmit}
        onCancel={onCancel}
      >
        <TextField
          name={'textField-name'}
          label={'Enter some Text'}
          placeholder={'Type something here...'}
          validators={[mockValidator]}
          autoFocus
          maxLength={255}
        />
        <AsyncSelect<MockOptions>
          isRequired
          isSearchable
          name={'asyncSelect-name'}
          label={'Select an Option'}
          validators={[mockValidator]}
          defaultOptions={true}
          loadOptions={mockLoadOptions}
        ></AsyncSelect>
      </CreateForm>
    </div>
  );
}
