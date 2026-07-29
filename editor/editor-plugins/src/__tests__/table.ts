// THIS FILE IS GENERATED. DO NOT MODIFY IT MANUALLY.
export {};

describe('table wrapper', () => {
	it('check ./table exports all the same variables as the original', () => {
		const original = require('@atlaskit/editor-plugin-table');
		const wrapper = require('../table/index');
		const originalKeys = Object.keys(original).sort();
		const wrapperKeys = Object.keys(wrapper).sort();
		expect(originalKeys).toEqual(wrapperKeys);
	});

	it('check ./table/table-plugin exports all the same variables as the original', () => {
		const original = require('@atlaskit/editor-plugin-table/table-plugin');
		const wrapper = require('../table/entry-points/table-plugin');
		const originalKeys = Object.keys(original).sort();
		const wrapperKeys = Object.keys(wrapper).sort();
		expect(originalKeys).toEqual(wrapperKeys);
	});

	it('check ./table/table-plugin-type exports all the same variables as the original', () => {
		const original = require('@atlaskit/editor-plugin-table/table-plugin-type');
		const wrapper = require('../table/entry-points/table-plugin-type');
		const originalKeys = Object.keys(original).sort();
		const wrapperKeys = Object.keys(wrapper).sort();
		expect(originalKeys).toEqual(wrapperKeys);
	});

	it('check ./table/types exports all the same variables as the original', () => {
		const original = require('@atlaskit/editor-plugin-table/types');
		const wrapper = require('../table/entry-points/types');
		const originalKeys = Object.keys(original).sort();
		const wrapperKeys = Object.keys(wrapper).sort();
		expect(originalKeys).toEqual(wrapperKeys);
	});

	it('check ./table/ui/common-styles exports all the same variables as the original', () => {
		const original = require('@atlaskit/editor-plugin-table/ui/common-styles');
		const wrapper = require('../table/entry-points/ui-common-styles');
		const originalKeys = Object.keys(original).sort();
		const wrapperKeys = Object.keys(wrapper).sort();
		expect(originalKeys).toEqual(wrapperKeys);
	});
});
