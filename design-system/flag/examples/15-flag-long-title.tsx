import React from 'react';

import { UNSAFE_Text as Text } from '@atlaskit/ds-explorations';
import noop from '@atlaskit/ds-lib/noop';
import SuccessIcon from '@atlaskit/icon/glyph/check-circle';
import { G300 } from '@atlaskit/theme/colors';
import { token } from '@atlaskit/tokens';

import Flag, { FlagGroup } from '../src';

export default () => (
  <>
    <Text> Flag with long title text that is wrapped</Text>
    <FlagGroup>
      <Flag
        icon={
          <SuccessIcon
            label="Success"
            primaryColor={token('color.icon.success', G300)}
          />
        }
        id="success"
        key="success"
        title="This is a flag with a very long title, inlcuding this_really_long_filename_that_spans_longer_than_the_container.png. The text should wrap and the Flag should grow in height. It should not truncate."
        description="All wires now hooked up."
        actions={[{ content: 'Alrighty then', onClick: noop }]}
      />
    </FlagGroup>
  </>
);
