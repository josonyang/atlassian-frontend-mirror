// THIS FILE IS GENERATED. DO NOT MODIFY IT MANUALLY.
export {};

describe('selection-toolbar wrapper', () => {
	it('check ./selection-toolbar exports all the same variables as the original', () => {
		const original = require('@atlaskit/editor-plugin-selection-toolbar');
		const wrapper = require('../selection-toolbar/index');
		const originalKeys = Object.keys(original).sort();
		const wrapperKeys = Object.keys(wrapper).sort();
		expect(originalKeys).toEqual(wrapperKeys);
	});

	it('check ./selection-toolbar/selection-toolbar-plugin exports all the same variables as the original', () => {
		const original = require('@atlaskit/editor-plugin-selection-toolbar/selection-toolbar-plugin');
		const wrapper = require('../selection-toolbar/entry-points/selection-toolbar-plugin');
		const originalKeys = Object.keys(original).sort();
		const wrapperKeys = Object.keys(wrapper).sort();
		expect(originalKeys).toEqual(wrapperKeys);
	});

	it('check ./selection-toolbar/selection-toolbar-plugin-type exports all the same variables as the original', () => {
		const original = require('@atlaskit/editor-plugin-selection-toolbar/selection-toolbar-plugin-type');
		const wrapper = require('../selection-toolbar/entry-points/selection-toolbar-plugin-type');
		const originalKeys = Object.keys(original).sort();
		const wrapperKeys = Object.keys(wrapper).sort();
		expect(originalKeys).toEqual(wrapperKeys);
	});

	it('check ./selection-toolbar/types exports all the same variables as the original', () => {
		const original = require('@atlaskit/editor-plugin-selection-toolbar/types');
		const wrapper = require('../selection-toolbar/entry-points/types');
		const originalKeys = Object.keys(original).sort();
		const wrapperKeys = Object.keys(wrapper).sort();
		expect(originalKeys).toEqual(wrapperKeys);
	});
});
