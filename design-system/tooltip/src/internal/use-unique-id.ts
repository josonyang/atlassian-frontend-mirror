import { useIdSeed } from '@atlaskit/ds-lib/use-id';

/**
 * Generates unique ID.
 */
export default function useUniqueId(prefix: string, shouldRenderId: boolean) {
	const seed = useIdSeed();

	return shouldRenderId ? `${seed(prefix)}` : undefined;
}
