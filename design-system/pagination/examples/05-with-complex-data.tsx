import React, { SyntheticEvent, useState } from 'react';

import { Code } from '@atlaskit/code';
import Text from '@atlaskit/ds-explorations/text';
import Stack from '@atlaskit/primitives/stack';

import Pagination from '../src';

const PAGES = [...Array(10)].map((_, i) => ({
  label: i + 1,
  href: `page-${i + 1}`,
}));

export default function ComplexDataExample() {
  const [onChangeEvent, setOnChangeEvent] = useState({
    label: 1,
    href: 'page-1',
  });

  const handleChange = (event: SyntheticEvent, newPage: any) =>
    setOnChangeEvent(newPage);

  const getLabel = ({ label }: any) => label;

  return (
    <Stack space="space.150">
      <Pagination
        testId="pagination"
        pages={PAGES}
        onChange={handleChange}
        getPageLabel={getLabel}
        nextLabel="Next"
        label="Complex Data Page"
        pageLabel="Page"
        previousLabel="Previous"
      />
      <Text as="p">Received onChange event:</Text>
      <Code>
        {JSON.stringify(
          {
            label: onChangeEvent.label,
            href: onChangeEvent.href,
          },
          null,
          2,
        )}
      </Code>
    </Stack>
  );
}
