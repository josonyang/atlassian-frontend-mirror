// THIS FILE IS GENERATED. DO NOT MODIFY IT MANUALLY.
export {};

describe('extension wrapper', () => {
	it('check ./extension exports all the same variables as the original', () => {
		const original = require('@atlaskit/editor-plugin-extension');
		const wrapper = require('../extension/index');
		const originalKeys = Object.keys(original).sort();
		const wrapperKeys = Object.keys(wrapper).sort();
		expect(originalKeys).toEqual(wrapperKeys);
	});

	it('check ./extension/extensionPlugin exports all the same variables as the original', () => {
		const original = require('@atlaskit/editor-plugin-extension/extensionPlugin');
		const wrapper = require('../extension/entry-points/extensionPlugin');
		const originalKeys = Object.keys(original).sort();
		const wrapperKeys = Object.keys(wrapper).sort();
		expect(originalKeys).toEqual(wrapperKeys);
	});

	it('check ./extension/extensionPluginType exports all the same variables as the original', () => {
		const original = require('@atlaskit/editor-plugin-extension/extensionPluginType');
		const wrapper = require('../extension/entry-points/extensionPluginType');
		const originalKeys = Object.keys(original).sort();
		const wrapperKeys = Object.keys(wrapper).sort();
		expect(originalKeys).toEqual(wrapperKeys);
	});
});
