// THIS FILE IS GENERATED. DO NOT MODIFY IT MANUALLY.
export {};

describe('text-formatting wrapper', () => {
	it('check ./text-formatting exports all the same variables as the original', () => {
		const original = require('@atlaskit/editor-plugin-text-formatting');
		const wrapper = require('../text-formatting/index');
		const originalKeys = Object.keys(original).sort();
		const wrapperKeys = Object.keys(wrapper).sort();
		expect(originalKeys).toEqual(wrapperKeys);
	});

	it('check ./text-formatting/text-formatting-plugin exports all the same variables as the original', () => {
		const original = require('@atlaskit/editor-plugin-text-formatting/text-formatting-plugin');
		const wrapper = require('../text-formatting/entry-points/text-formatting-plugin');
		const originalKeys = Object.keys(original).sort();
		const wrapperKeys = Object.keys(wrapper).sort();
		expect(originalKeys).toEqual(wrapperKeys);
	});

	it('check ./text-formatting/text-formatting-plugin-type exports all the same variables as the original', () => {
		const original = require('@atlaskit/editor-plugin-text-formatting/text-formatting-plugin-type');
		const wrapper = require('../text-formatting/entry-points/text-formatting-plugin-type');
		const originalKeys = Object.keys(original).sort();
		const wrapperKeys = Object.keys(wrapper).sort();
		expect(originalKeys).toEqual(wrapperKeys);
	});

	it('check ./text-formatting/types exports all the same variables as the original', () => {
		const original = require('@atlaskit/editor-plugin-text-formatting/types');
		const wrapper = require('../text-formatting/entry-points/types');
		const originalKeys = Object.keys(original).sort();
		const wrapperKeys = Object.keys(wrapper).sort();
		expect(originalKeys).toEqual(wrapperKeys);
	});
});
