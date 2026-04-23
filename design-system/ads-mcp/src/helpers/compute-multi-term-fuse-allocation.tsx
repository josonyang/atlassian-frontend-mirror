export function computeMultiTermFuseAllocation(
	limit: number,
	termCount: number,
): {
	/**
	 * The amount token by each term, minimum of 1.
	 */
	perTermTake: number;
	/**
	 * Hits to take from the spaced combined query.
	 */
	combinedTake: number;
	/**
	 * The total amount of hits to take, minimum of 1.
	 */
	totalTake: number;
} {
	if (termCount <= 1) return { perTermTake: 1, combinedTake: 0, totalTake: 1 };

	const perTermTake = Math.max(Math.round(limit / termCount), 1);
	const combinedTake = Math.max(limit * termCount - termCount * perTermTake, 1);
	const totalTake = Math.max(perTermTake * termCount + combinedTake, 1);
	return { perTermTake, combinedTake, totalTake };
}
