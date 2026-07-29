// THIS FILE IS GENERATED. DO NOT MODIFY IT MANUALLY.
export {};

describe('placeholder-text wrapper', () => {
	it('check ./placeholder-text exports all the same variables as the original', () => {
		const original = require('@atlaskit/editor-plugin-placeholder-text');
		const wrapper = require('../placeholder-text/index');
		const originalKeys = Object.keys(original).sort();
		const wrapperKeys = Object.keys(wrapper).sort();
		expect(originalKeys).toEqual(wrapperKeys);
	});

	it('check ./placeholder-text/placeholder-text-plugin exports all the same variables as the original', () => {
		const original = require('@atlaskit/editor-plugin-placeholder-text/placeholder-text-plugin');
		const wrapper = require('../placeholder-text/entry-points/placeholder-text-plugin');
		const originalKeys = Object.keys(original).sort();
		const wrapperKeys = Object.keys(wrapper).sort();
		expect(originalKeys).toEqual(wrapperKeys);
	});

	it('check ./placeholder-text/placeholder-text-plugin-type exports all the same variables as the original', () => {
		const original = require('@atlaskit/editor-plugin-placeholder-text/placeholder-text-plugin-type');
		const wrapper = require('../placeholder-text/entry-points/placeholder-text-plugin-type');
		const originalKeys = Object.keys(original).sort();
		const wrapperKeys = Object.keys(wrapper).sort();
		expect(originalKeys).toEqual(wrapperKeys);
	});
});
