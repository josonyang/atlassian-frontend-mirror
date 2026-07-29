// THIS FILE IS GENERATED. DO NOT MODIFY IT MANUALLY.
export {};

describe('decorations wrapper', () => {
	it('check ./decorations exports all the same variables as the original', () => {
		const original = require('@atlaskit/editor-plugin-decorations');
		const wrapper = require('../decorations/index');
		const originalKeys = Object.keys(original).sort();
		const wrapperKeys = Object.keys(wrapper).sort();
		expect(originalKeys).toEqual(wrapperKeys);
	});

	it('check ./decorations/decorationsPlugin exports all the same variables as the original', () => {
		const original = require('@atlaskit/editor-plugin-decorations/decorationsPlugin');
		const wrapper = require('../decorations/entry-points/decorationsPlugin');
		const originalKeys = Object.keys(original).sort();
		const wrapperKeys = Object.keys(wrapper).sort();
		expect(originalKeys).toEqual(wrapperKeys);
	});

	it('check ./decorations/decorationsPluginType exports all the same variables as the original', () => {
		const original = require('@atlaskit/editor-plugin-decorations/decorationsPluginType');
		const wrapper = require('../decorations/entry-points/decorationsPluginType');
		const originalKeys = Object.keys(original).sort();
		const wrapperKeys = Object.keys(wrapper).sort();
		expect(originalKeys).toEqual(wrapperKeys);
	});

	it('check ./decorations/main exports all the same variables as the original', () => {
		const original = require('@atlaskit/editor-plugin-decorations/main');
		const wrapper = require('../decorations/entry-points/main');
		const originalKeys = Object.keys(original).sort();
		const wrapperKeys = Object.keys(wrapper).sort();
		expect(originalKeys).toEqual(wrapperKeys);
	});
});
