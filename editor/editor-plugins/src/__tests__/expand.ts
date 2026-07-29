// THIS FILE IS GENERATED. DO NOT MODIFY IT MANUALLY.
export {};

describe('expand wrapper', () => {
	it('check ./expand exports all the same variables as the original', () => {
		const original = require('@atlaskit/editor-plugin-expand');
		const wrapper = require('../expand/index');
		const originalKeys = Object.keys(original).sort();
		const wrapperKeys = Object.keys(wrapper).sort();
		expect(originalKeys).toEqual(wrapperKeys);
	});

	it('check ./expand/plugin exports all the same variables as the original', () => {
		const original = require('@atlaskit/editor-plugin-expand/plugin');
		const wrapper = require('../expand/entry-points/plugin');
		const originalKeys = Object.keys(original).sort();
		const wrapperKeys = Object.keys(wrapper).sort();
		expect(originalKeys).toEqual(wrapperKeys);
	});

	it('check ./expand/types exports all the same variables as the original', () => {
		const original = require('@atlaskit/editor-plugin-expand/types');
		const wrapper = require('../expand/entry-points/types');
		const originalKeys = Object.keys(original).sort();
		const wrapperKeys = Object.keys(wrapper).sort();
		expect(originalKeys).toEqual(wrapperKeys);
	});
});
