import React, { useState } from 'react';

import Button from '@atlaskit/button/standard-button';
import { AtlassianIcon } from '@atlaskit/logo';

import Breadcrumbs, { BreadcrumbsItem } from '../src';

const StatelessExample = () => {
  const [isExpanded, setIsExpanded] = useState(false);

  return (
    <div>
      <p>
        This is a stateless breadcrumbs example, which doesn't have expand and
        collapse support. To expand or collapse items, use the "Toggle" button.
      </p>
      <Breadcrumbs
        isExpanded={isExpanded}
        maxItems={2}
        testId="MyBreadcrumbsTestId"
      >
        <BreadcrumbsItem href="/pages" text="Pages" />
        <BreadcrumbsItem href="/pages/home" text="Home" />
        <BreadcrumbsItem
          href="/item"
          iconBefore={<AtlassianIcon label="Test icon" size="small" />}
          text="Icon Before"
        />
        <BreadcrumbsItem
          href="/item"
          iconAfter={<AtlassianIcon label="Test icon" size="small" />}
          text="Icon After"
        />
      </Breadcrumbs>
      <Button appearance="primary" onClick={() => setIsExpanded(!isExpanded)}>
        Toggle
      </Button>
    </div>
  );
};

export default StatelessExample;
