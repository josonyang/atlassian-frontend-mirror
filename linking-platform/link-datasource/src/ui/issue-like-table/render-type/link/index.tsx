import React, { useMemo } from 'react';

import { ErrorBoundary } from 'react-error-boundary';

import { Link } from '@atlaskit/linking-types';
import { Card } from '@atlaskit/smart-card';
import LinkUrl from '@atlaskit/smart-card/link-url';
import { N300 } from '@atlaskit/theme/colors';
import { h300 } from '@atlaskit/theme/typography';
import { token } from '@atlaskit/tokens';

interface LinkProps extends Link {
  testId?: string;
}

const linkStyles = {
  key: {
    ...h300(),
    color: token('color.text.subtlest', N300),
    fontWeight: 600,
  },
};

export const LINK_TYPE_TEST_ID = 'link-datasource-render-type--link';

const LinkRenderType = ({
  linkType,
  url,
  text,
  testId = LINK_TYPE_TEST_ID,
}: LinkProps) => {
  const style: React.CSSProperties = useMemo(() => {
    return (linkType && linkStyles[linkType]) || {};
  }, [linkType]);

  const anchor = useMemo(
    () => (
      <LinkUrl href={url} style={style} data-testid={testId}>
        {text || url}
      </LinkUrl>
    ),
    [style, url, text, testId],
  );

  const SmartCard = () => (
    <ErrorBoundary fallback={anchor}>
      <Card appearance="inline" url={url} testId={testId} />
    </ErrorBoundary>
  );

  return text ? anchor : <SmartCard />;
};

export default React.memo(LinkRenderType);
