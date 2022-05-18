/** @jsx jsx */
import { css, jsx } from '@emotion/core';
import { token } from '@atlaskit/tokens';
import { ElementName, MetadataBlock } from '../../src';
import ExampleContainer from './example-container';

const styles = css`
  background-color: ${token(
    'color.background.accent.blue.subtlest',
    '#E9F2FF',
  )};
  border-radius: 24px;
  padding: 8px;
`;

export default () => (
  <ExampleContainer>
    <MetadataBlock
      primary={[
        { name: ElementName.CollaboratorGroup },
        { name: ElementName.ModifiedOn },
      ]}
      overrideCss={styles}
    />
  </ExampleContainer>
);
