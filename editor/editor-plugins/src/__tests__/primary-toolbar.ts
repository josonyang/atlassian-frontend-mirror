// THIS FILE IS GENERATED. DO NOT MODIFY IT MANUALLY.
export {};

describe('primary-toolbar wrapper', () => {
	it('check ./primary-toolbar exports all the same variables as the original', () => {
		const original = require('@atlaskit/editor-plugin-primary-toolbar');
		const wrapper = require('../primary-toolbar/index');
		const originalKeys = Object.keys(original).sort();
		const wrapperKeys = Object.keys(wrapper).sort();
		expect(originalKeys).toEqual(wrapperKeys);
	});

	it('check ./primary-toolbar/primary-toolbar-plugin exports all the same variables as the original', () => {
		const original = require('@atlaskit/editor-plugin-primary-toolbar/primary-toolbar-plugin');
		const wrapper = require('../primary-toolbar/entry-points/primary-toolbar-plugin');
		const originalKeys = Object.keys(original).sort();
		const wrapperKeys = Object.keys(wrapper).sort();
		expect(originalKeys).toEqual(wrapperKeys);
	});

	it('check ./primary-toolbar/primary-toolbar-plugin-type exports all the same variables as the original', () => {
		const original = require('@atlaskit/editor-plugin-primary-toolbar/primary-toolbar-plugin-type');
		const wrapper = require('../primary-toolbar/entry-points/primary-toolbar-plugin-type');
		const originalKeys = Object.keys(original).sort();
		const wrapperKeys = Object.keys(wrapper).sort();
		expect(originalKeys).toEqual(wrapperKeys);
	});
});
