// THIS FILE IS GENERATED. DO NOT MODIFY IT MANUALLY.
export {};

describe('editor-viewmode wrapper', () => {
	it('check ./editor-viewmode exports all the same variables as the original', () => {
		const original = require('@atlaskit/editor-plugin-editor-viewmode');
		const wrapper = require('../editor-viewmode/index');
		const originalKeys = Object.keys(original).sort();
		const wrapperKeys = Object.keys(wrapper).sort();
		expect(originalKeys).toEqual(wrapperKeys);
	});

	it('check ./editor-viewmode/editorViewmodePlugin exports all the same variables as the original', () => {
		const original = require('@atlaskit/editor-plugin-editor-viewmode/editorViewmodePlugin');
		const wrapper = require('../editor-viewmode/entry-points/editorViewmodePlugin');
		const originalKeys = Object.keys(original).sort();
		const wrapperKeys = Object.keys(wrapper).sort();
		expect(originalKeys).toEqual(wrapperKeys);
	});

	it('check ./editor-viewmode/editorViewmodePluginType exports all the same variables as the original', () => {
		const original = require('@atlaskit/editor-plugin-editor-viewmode/editorViewmodePluginType');
		const wrapper = require('../editor-viewmode/entry-points/editorViewmodePluginType');
		const originalKeys = Object.keys(original).sort();
		const wrapperKeys = Object.keys(wrapper).sort();
		expect(originalKeys).toEqual(wrapperKeys);
	});
});
