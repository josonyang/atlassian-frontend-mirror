import { type TaskListDefinition, type TaskListContent } from '@atlaskit/adf-schema';

export const taskList =
	(attrs: TaskListDefinition['attrs']) =>
	(...content: TaskListContent): TaskListDefinition => ({
		type: 'taskList',
		attrs,
		content,
	});
