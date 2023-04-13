/** @jsx jsx */
import { css, jsx } from '@emotion/react';

import { Box, Inline, Stack, xcss } from '../src';

const fixedSizeContainerStyles = css({ maxWidth: '300px' });
const blockStyles = xcss({ borderRadius: 'radius.050' });

export default () => (
  <Box testId="inline-example" padding="space.100">
    <div css={fixedSizeContainerStyles}>
      <Stack space="200">
        <div>
          true
          <Box xcss={blockStyles} padding="space.050" backgroundColor="neutral">
            <Inline space="200" shouldWrap={true}>
              {[...Array(25)].map((_, index) => (
                <Box
                  key={index}
                  xcss={blockStyles}
                  padding="space.200"
                  backgroundColor="discovery.bold"
                />
              ))}
            </Inline>
          </Box>
        </div>
        <div>
          false
          <Box xcss={blockStyles} padding="space.050" backgroundColor="neutral">
            <Inline space="200" shouldWrap={false}>
              {[...Array(25)].map((_, index) => (
                <Box
                  key={index}
                  xcss={blockStyles}
                  padding="space.200"
                  backgroundColor="discovery.bold"
                />
              ))}
            </Inline>
          </Box>
        </div>
      </Stack>
    </div>
  </Box>
);
