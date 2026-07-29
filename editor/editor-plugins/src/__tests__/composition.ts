// THIS FILE IS GENERATED. DO NOT MODIFY IT MANUALLY.
export {};

describe('composition wrapper', () => {
	it('check ./composition exports all the same variables as the original', () => {
		const original = require('@atlaskit/editor-plugin-composition');
		const wrapper = require('../composition/index');
		const originalKeys = Object.keys(original).sort();
		const wrapperKeys = Object.keys(wrapper).sort();
		expect(originalKeys).toEqual(wrapperKeys);
	});

	it('check ./composition/compositionPlugin exports all the same variables as the original', () => {
		const original = require('@atlaskit/editor-plugin-composition/compositionPlugin');
		const wrapper = require('../composition/entry-points/compositionPlugin');
		const originalKeys = Object.keys(original).sort();
		const wrapperKeys = Object.keys(wrapper).sort();
		expect(originalKeys).toEqual(wrapperKeys);
	});

	it('check ./composition/compositionPluginType exports all the same variables as the original', () => {
		const original = require('@atlaskit/editor-plugin-composition/compositionPluginType');
		const wrapper = require('../composition/entry-points/compositionPluginType');
		const originalKeys = Object.keys(original).sort();
		const wrapperKeys = Object.keys(wrapper).sort();
		expect(originalKeys).toEqual(wrapperKeys);
	});
});
