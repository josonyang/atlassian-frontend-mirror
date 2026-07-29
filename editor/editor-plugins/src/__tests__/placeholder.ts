// THIS FILE IS GENERATED. DO NOT MODIFY IT MANUALLY.
export {};

describe('placeholder wrapper', () => {
	it('check ./placeholder exports all the same variables as the original', () => {
		const original = require('@atlaskit/editor-plugin-placeholder');
		const wrapper = require('../placeholder/index');
		const originalKeys = Object.keys(original).sort();
		const wrapperKeys = Object.keys(wrapper).sort();
		expect(originalKeys).toEqual(wrapperKeys);
	});

	it('check ./placeholder/placeholder-plugin-type exports all the same variables as the original', () => {
		const original = require('@atlaskit/editor-plugin-placeholder/placeholder-plugin-type');
		const wrapper = require('../placeholder/entry-points/placeholder-plugin-type');
		const originalKeys = Object.keys(original).sort();
		const wrapperKeys = Object.keys(wrapper).sort();
		expect(originalKeys).toEqual(wrapperKeys);
	});

	it('check ./placeholder/placeholder-plugin exports all the same variables as the original', () => {
		const original = require('@atlaskit/editor-plugin-placeholder/placeholder-plugin');
		const wrapper = require('../placeholder/entry-points/placeholder-plugin');
		const originalKeys = Object.keys(original).sort();
		const wrapperKeys = Object.keys(wrapper).sort();
		expect(originalKeys).toEqual(wrapperKeys);
	});
});
