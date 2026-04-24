/* eslint-disable @repo/internal/fs/filename-pattern-match */


export const isOptionDisabled = <Option>(option: Option): boolean =>
	!!(option as { isDisabled?: unknown }).isDisabled;
