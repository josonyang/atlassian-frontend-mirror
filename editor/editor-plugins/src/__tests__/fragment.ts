// THIS FILE IS GENERATED. DO NOT MODIFY IT MANUALLY.
export {};

describe('fragment wrapper', () => {
	it('check ./fragment exports all the same variables as the original', () => {
		const original = require('@atlaskit/editor-plugin-fragment');
		const wrapper = require('../fragment/index');
		const originalKeys = Object.keys(original).sort();
		const wrapperKeys = Object.keys(wrapper).sort();
		expect(originalKeys).toEqual(wrapperKeys);
	});

	it('check ./fragment/fragmentPlugin exports all the same variables as the original', () => {
		const original = require('@atlaskit/editor-plugin-fragment/fragmentPlugin');
		const wrapper = require('../fragment/entry-points/fragmentPlugin');
		const originalKeys = Object.keys(original).sort();
		const wrapperKeys = Object.keys(wrapper).sort();
		expect(originalKeys).toEqual(wrapperKeys);
	});

	it('check ./fragment/fragmentPluginType exports all the same variables as the original', () => {
		const original = require('@atlaskit/editor-plugin-fragment/fragmentPluginType');
		const wrapper = require('../fragment/entry-points/fragmentPluginType');
		const originalKeys = Object.keys(original).sort();
		const wrapperKeys = Object.keys(wrapper).sort();
		expect(originalKeys).toEqual(wrapperKeys);
	});
});
