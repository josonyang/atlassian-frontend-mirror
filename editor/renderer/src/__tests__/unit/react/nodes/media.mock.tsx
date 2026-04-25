/** Extracted into its own file so the mock variables can be instantiated before other imports in the test file that would otherwise be hoisted before it */
import type { MediaClient } from '@atlaskit/media-client';
import { fakeMediaClient } from '@atlaskit/media-test-helpers';
export const mockMediaClient: MediaClient = fakeMediaClient();
jest.mock('@atlaskit/media-client-react', () => {
	const module = jest.requireActual('@atlaskit/media-client-react');
	return {
		...module,
		__esModule: true,
		getMediaClient: jest.fn(() => mockMediaClient),
	};
});
