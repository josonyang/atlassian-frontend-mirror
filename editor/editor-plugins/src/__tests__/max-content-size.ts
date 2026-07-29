// THIS FILE IS GENERATED. DO NOT MODIFY IT MANUALLY.
export {};

describe('max-content-size wrapper', () => {
	it('check ./max-content-size exports all the same variables as the original', () => {
		const original = require('@atlaskit/editor-plugin-max-content-size');
		const wrapper = require('../max-content-size/index');
		const originalKeys = Object.keys(original).sort();
		const wrapperKeys = Object.keys(wrapper).sort();
		expect(originalKeys).toEqual(wrapperKeys);
	});

	it('check ./max-content-size/max-content-size-plugin exports all the same variables as the original', () => {
		const original = require('@atlaskit/editor-plugin-max-content-size/max-content-size-plugin');
		const wrapper = require('../max-content-size/entry-points/max-content-size-plugin');
		const originalKeys = Object.keys(original).sort();
		const wrapperKeys = Object.keys(wrapper).sort();
		expect(originalKeys).toEqual(wrapperKeys);
	});

	it('check ./max-content-size/max-content-size-plugin-type exports all the same variables as the original', () => {
		const original = require('@atlaskit/editor-plugin-max-content-size/max-content-size-plugin-type');
		const wrapper = require('../max-content-size/entry-points/max-content-size-plugin-type');
		const originalKeys = Object.keys(original).sort();
		const wrapperKeys = Object.keys(wrapper).sort();
		expect(originalKeys).toEqual(wrapperKeys);
	});
});
