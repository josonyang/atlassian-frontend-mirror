// THIS FILE IS GENERATED. DO NOT MODIFY IT MANUALLY.
export {};

describe('editor-disabled wrapper', () => {
	it('check ./editor-disabled exports all the same variables as the original', () => {
		const original = require('@atlaskit/editor-plugin-editor-disabled');
		const wrapper = require('../editor-disabled/index');
		const originalKeys = Object.keys(original).sort();
		const wrapperKeys = Object.keys(wrapper).sort();
		expect(originalKeys).toEqual(wrapperKeys);
	});

	it('check ./editor-disabled/editorDisabledPlugin exports all the same variables as the original', () => {
		const original = require('@atlaskit/editor-plugin-editor-disabled/editorDisabledPlugin');
		const wrapper = require('../editor-disabled/entry-points/editorDisabledPlugin');
		const originalKeys = Object.keys(original).sort();
		const wrapperKeys = Object.keys(wrapper).sort();
		expect(originalKeys).toEqual(wrapperKeys);
	});

	it('check ./editor-disabled/editorDisabledPluginType exports all the same variables as the original', () => {
		const original = require('@atlaskit/editor-plugin-editor-disabled/editorDisabledPluginType');
		const wrapper = require('../editor-disabled/entry-points/editorDisabledPluginType');
		const originalKeys = Object.keys(original).sort();
		const wrapperKeys = Object.keys(wrapper).sort();
		expect(originalKeys).toEqual(wrapperKeys);
	});
});
