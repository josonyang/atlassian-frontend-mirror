// THIS FILE IS GENERATED. DO NOT MODIFY IT MANUALLY.
export {};

describe('unsupported-content wrapper', () => {
	it('check ./unsupported-content exports all the same variables as the original', () => {
		const original = require('@atlaskit/editor-plugin-unsupported-content');
		const wrapper = require('../unsupported-content/index');
		const originalKeys = Object.keys(original).sort();
		const wrapperKeys = Object.keys(wrapper).sort();
		expect(originalKeys).toEqual(wrapperKeys);
	});

	it('check ./unsupported-content/unsupported-content-plugin exports all the same variables as the original', () => {
		const original = require('@atlaskit/editor-plugin-unsupported-content/unsupported-content-plugin');
		const wrapper = require('../unsupported-content/entry-points/unsupported-content-plugin');
		const originalKeys = Object.keys(original).sort();
		const wrapperKeys = Object.keys(wrapper).sort();
		expect(originalKeys).toEqual(wrapperKeys);
	});

	it('check ./unsupported-content/unsupported-content-plugin-type exports all the same variables as the original', () => {
		const original = require('@atlaskit/editor-plugin-unsupported-content/unsupported-content-plugin-type');
		const wrapper = require('../unsupported-content/entry-points/unsupported-content-plugin-type');
		const originalKeys = Object.keys(original).sort();
		const wrapperKeys = Object.keys(wrapper).sort();
		expect(originalKeys).toEqual(wrapperKeys);
	});
});
