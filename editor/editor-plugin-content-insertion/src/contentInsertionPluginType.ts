import type { NextEditorPlugin } from '@atlaskit/editor-common/types';
import type { AnalyticsPlugin } from '@atlaskit/editor-plugin-analytics';

import type { InsertNodeAPI } from './types';

export type ContentInsertionDependencies = [AnalyticsPlugin];

export type ContentInsertionPlugin = NextEditorPlugin<
	'contentInsertion',
	{
		dependencies: ContentInsertionDependencies;
	} & InsertNodeAPI
>;
