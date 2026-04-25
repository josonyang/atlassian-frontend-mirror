/* eslint-disable @repo/internal/fs/filename-pattern-match */

export const getOptionValue = <Option>(option: Option): string =>
	(option as { value?: unknown }).value as string;
