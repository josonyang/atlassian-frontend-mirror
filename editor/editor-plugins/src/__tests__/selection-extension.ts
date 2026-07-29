// THIS FILE IS GENERATED. DO NOT MODIFY IT MANUALLY.
export {};

describe('selection-extension wrapper', () => {
	it('check ./selection-extension exports all the same variables as the original', () => {
		const original = require('@atlaskit/editor-plugin-selection-extension');
		const wrapper = require('../selection-extension/index');
		const originalKeys = Object.keys(original).sort();
		const wrapperKeys = Object.keys(wrapper).sort();
		expect(originalKeys).toEqual(wrapperKeys);
	});

	it('check ./selection-extension/selection-extension-plugin exports all the same variables as the original', () => {
		const original = require('@atlaskit/editor-plugin-selection-extension/selection-extension-plugin');
		const wrapper = require('../selection-extension/entry-points/selection-extension-plugin');
		const originalKeys = Object.keys(original).sort();
		const wrapperKeys = Object.keys(wrapper).sort();
		expect(originalKeys).toEqual(wrapperKeys);
	});

	it('check ./selection-extension/selection-extension-plugin-type exports all the same variables as the original', () => {
		const original = require('@atlaskit/editor-plugin-selection-extension/selection-extension-plugin-type');
		const wrapper = require('../selection-extension/entry-points/selection-extension-plugin-type');
		const originalKeys = Object.keys(original).sort();
		const wrapperKeys = Object.keys(wrapper).sort();
		expect(originalKeys).toEqual(wrapperKeys);
	});

	it('check ./selection-extension/types exports all the same variables as the original', () => {
		const original = require('@atlaskit/editor-plugin-selection-extension/types');
		const wrapper = require('../selection-extension/entry-points/types');
		const originalKeys = Object.keys(original).sort();
		const wrapperKeys = Object.keys(wrapper).sort();
		expect(originalKeys).toEqual(wrapperKeys);
	});
});
