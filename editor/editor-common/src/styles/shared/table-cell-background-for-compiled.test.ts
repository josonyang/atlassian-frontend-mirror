import { tableCellBackgroundColorVariablesForCompiled } from './table-cell-background-for-compiled';

describe('tableCellBackgroundColorVariablesForCompiled', () => {
	// If this snapshot test fails, that means the css variables are updated,
	// we need to update the tableCellBackgroundColorOverrides in EditorContentContainer-compiled.tsx accordingly.
	// for example, if new entry is added, we need to add new entry in tableCellBackgroundColorOverrides as well.
	it('derives CSS variables for every named table cell background color', () => {
		expect(tableCellBackgroundColorVariablesForCompiled).toMatchInlineSnapshot(`
		{
		  "--ak-editor-table-cell-background-blue": "var(--ds-background-accent-blue-subtler)",
		  "--ak-editor-table-cell-background-bold-blue": "var(--ds-background-accent-blue-subtler-hovered)",
		  "--ak-editor-table-cell-background-bold-gray": "var(--ds-background-accent-gray-subtler-hovered)",
		  "--ak-editor-table-cell-background-bold-green": "var(--ds-background-accent-green-subtler-hovered)",
		  "--ak-editor-table-cell-background-bold-lime": "var(--ds-background-accent-lime-subtler-hovered)",
		  "--ak-editor-table-cell-background-bold-magenta": "var(--ds-background-accent-magenta-subtler-hovered)",
		  "--ak-editor-table-cell-background-bold-orange": "var(--ds-background-accent-orange-subtler-hovered)",
		  "--ak-editor-table-cell-background-bold-purple": "var(--ds-background-accent-purple-subtler-hovered)",
		  "--ak-editor-table-cell-background-bold-red": "var(--ds-background-accent-red-subtler-hovered)",
		  "--ak-editor-table-cell-background-bold-teal": "var(--ds-background-accent-teal-subtler-hovered)",
		  "--ak-editor-table-cell-background-bold-yellow": "var(--ds-background-accent-yellow-subtler-hovered)",
		  "--ak-editor-table-cell-background-green": "var(--ds-background-accent-green-subtler)",
		  "--ak-editor-table-cell-background-light-blue": "var(--ds-background-accent-blue-subtlest)",
		  "--ak-editor-table-cell-background-light-gray": "var(--ds-background-accent-gray-subtlest)",
		  "--ak-editor-table-cell-background-light-green": "var(--ds-background-accent-green-subtlest)",
		  "--ak-editor-table-cell-background-light-purple": "var(--ds-background-accent-purple-subtlest)",
		  "--ak-editor-table-cell-background-light-red": "var(--ds-background-accent-red-subtlest)",
		  "--ak-editor-table-cell-background-light-teal": "var(--ds-background-accent-teal-subtlest)",
		  "--ak-editor-table-cell-background-light-yellow": "var(--ds-background-accent-yellow-subtlest)",
		  "--ak-editor-table-cell-background-lime": "var(--ds-background-accent-lime-subtler)",
		  "--ak-editor-table-cell-background-magenta": "var(--ds-background-accent-magenta-subtler)",
		  "--ak-editor-table-cell-background-orange": "var(--ds-background-accent-orange-subtler)",
		  "--ak-editor-table-cell-background-purple": "var(--ds-background-accent-purple-subtler)",
		  "--ak-editor-table-cell-background-red": "var(--ds-background-accent-red-subtler)",
		  "--ak-editor-table-cell-background-subtle-lime": "var(--ds-background-accent-lime-subtlest)",
		  "--ak-editor-table-cell-background-subtle-magenta": "var(--ds-background-accent-magenta-subtlest)",
		  "--ak-editor-table-cell-background-subtle-orange": "var(--ds-background-accent-orange-subtlest)",
		  "--ak-editor-table-cell-background-teal": "var(--ds-background-accent-teal-subtler)",
		  "--ak-editor-table-cell-background-white": "var(--ds-surface)",
		  "--ak-editor-table-cell-background-yellow": "var(--ds-background-accent-yellow-subtler)",
		}
	`);
	});
});
