// THIS FILE IS GENERATED. DO NOT MODIFY IT MANUALLY.
export {};

describe('editor-viewmode-effects wrapper', () => {
	it('check ./editor-viewmode-effects exports all the same variables as the original', () => {
		const original = require('@atlaskit/editor-plugin-editor-viewmode-effects');
		const wrapper = require('../editor-viewmode-effects/index');
		const originalKeys = Object.keys(original).sort();
		const wrapperKeys = Object.keys(wrapper).sort();
		expect(originalKeys).toEqual(wrapperKeys);
	});

	it('check ./editor-viewmode-effects/editorViewmodeEffectsPlugin exports all the same variables as the original', () => {
		const original = require('@atlaskit/editor-plugin-editor-viewmode-effects/editorViewmodeEffectsPlugin');
		const wrapper = require('../editor-viewmode-effects/entry-points/editorViewmodeEffectsPlugin');
		const originalKeys = Object.keys(original).sort();
		const wrapperKeys = Object.keys(wrapper).sort();
		expect(originalKeys).toEqual(wrapperKeys);
	});

	it('check ./editor-viewmode-effects/editorViewmodeEffectsPluginType exports all the same variables as the original', () => {
		const original = require('@atlaskit/editor-plugin-editor-viewmode-effects/editorViewmodeEffectsPluginType');
		const wrapper = require('../editor-viewmode-effects/entry-points/editorViewmodeEffectsPluginType');
		const originalKeys = Object.keys(original).sort();
		const wrapperKeys = Object.keys(wrapper).sort();
		expect(originalKeys).toEqual(wrapperKeys);
	});
});
