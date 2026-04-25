/* eslint-disable @repo/internal/fs/filename-pattern-match */

export const getOptionLabel = <Option>(option: Option): string =>
	(option as { label?: unknown }).label as string;
