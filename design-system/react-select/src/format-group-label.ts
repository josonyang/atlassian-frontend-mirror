/* eslint-disable @repo/internal/fs/filename-pattern-match */


import type { GroupBase } from './types';

export const formatGroupLabel = <Option, Group extends GroupBase<Option>>(group: Group): string =>
	group.label as string;
