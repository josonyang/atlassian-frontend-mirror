import type { isLegacyElevation } from '../utils/is-elevation';

export const getElevationTokenExample = (
	elevation: Exclude<ReturnType<typeof isLegacyElevation>, false>,
) => `\`\`\`
import { token } from '@atlaskit/tokens';

css({
  backgroundColor: token('${elevation.background}');
  boxShadow: token('${elevation.shadow}');
});
\`\`\``;
