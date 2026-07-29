// THIS FILE IS GENERATED. DO NOT MODIFY IT MANUALLY.
export {};

describe('clipboard wrapper', () => {
	it('check ./clipboard exports all the same variables as the original', () => {
		const original = require('@atlaskit/editor-plugin-clipboard');
		const wrapper = require('../clipboard/index');
		const originalKeys = Object.keys(original).sort();
		const wrapperKeys = Object.keys(wrapper).sort();
		expect(originalKeys).toEqual(wrapperKeys);
	});

	it('check ./clipboard/clipboardPlugin exports all the same variables as the original', () => {
		const original = require('@atlaskit/editor-plugin-clipboard/clipboardPlugin');
		const wrapper = require('../clipboard/entry-points/clipboardPlugin');
		const originalKeys = Object.keys(original).sort();
		const wrapperKeys = Object.keys(wrapper).sort();
		expect(originalKeys).toEqual(wrapperKeys);
	});

	it('check ./clipboard/clipboardPluginType exports all the same variables as the original', () => {
		const original = require('@atlaskit/editor-plugin-clipboard/clipboardPluginType');
		const wrapper = require('../clipboard/entry-points/clipboardPluginType');
		const originalKeys = Object.keys(original).sort();
		const wrapperKeys = Object.keys(wrapper).sort();
		expect(originalKeys).toEqual(wrapperKeys);
	});
});
