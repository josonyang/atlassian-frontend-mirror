// THIS FILE IS GENERATED. DO NOT MODIFY IT MANUALLY.
export {};

describe('grid wrapper', () => {
	it('check ./grid exports all the same variables as the original', () => {
		const original = require('@atlaskit/editor-plugin-grid');
		const wrapper = require('../grid/index');
		const originalKeys = Object.keys(original).sort();
		const wrapperKeys = Object.keys(wrapper).sort();
		expect(originalKeys).toEqual(wrapperKeys);
	});

	it('check ./grid/gridPlugin exports all the same variables as the original', () => {
		const original = require('@atlaskit/editor-plugin-grid/gridPlugin');
		const wrapper = require('../grid/entry-points/gridPlugin');
		const originalKeys = Object.keys(original).sort();
		const wrapperKeys = Object.keys(wrapper).sort();
		expect(originalKeys).toEqual(wrapperKeys);
	});

	it('check ./grid/gridPluginType exports all the same variables as the original', () => {
		const original = require('@atlaskit/editor-plugin-grid/gridPluginType');
		const wrapper = require('../grid/entry-points/gridPluginType');
		const originalKeys = Object.keys(original).sort();
		const wrapperKeys = Object.keys(wrapper).sort();
		expect(originalKeys).toEqual(wrapperKeys);
	});

	it('check ./grid/types exports all the same variables as the original', () => {
		const original = require('@atlaskit/editor-plugin-grid/types');
		const wrapper = require('../grid/entry-points/types');
		const originalKeys = Object.keys(original).sort();
		const wrapperKeys = Object.keys(wrapper).sort();
		expect(originalKeys).toEqual(wrapperKeys);
	});
});
