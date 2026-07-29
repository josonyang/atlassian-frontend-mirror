// THIS FILE IS GENERATED. DO NOT MODIFY IT MANUALLY.
export {};

describe('text-color wrapper', () => {
	it('check ./text-color exports all the same variables as the original', () => {
		const original = require('@atlaskit/editor-plugin-text-color');
		const wrapper = require('../text-color/index');
		const originalKeys = Object.keys(original).sort();
		const wrapperKeys = Object.keys(wrapper).sort();
		expect(originalKeys).toEqual(wrapperKeys);
	});

	it('check ./text-color/main exports all the same variables as the original', () => {
		const original = require('@atlaskit/editor-plugin-text-color/main');
		const wrapper = require('../text-color/entry-points/main');
		const originalKeys = Object.keys(original).sort();
		const wrapperKeys = Object.keys(wrapper).sort();
		expect(originalKeys).toEqual(wrapperKeys);
	});

	it('check ./text-color/text-color-plugin exports all the same variables as the original', () => {
		const original = require('@atlaskit/editor-plugin-text-color/text-color-plugin');
		const wrapper = require('../text-color/entry-points/text-color-plugin');
		const originalKeys = Object.keys(original).sort();
		const wrapperKeys = Object.keys(wrapper).sort();
		expect(originalKeys).toEqual(wrapperKeys);
	});

	it('check ./text-color/text-color-plugin-type exports all the same variables as the original', () => {
		const original = require('@atlaskit/editor-plugin-text-color/text-color-plugin-type');
		const wrapper = require('../text-color/entry-points/text-color-plugin-type');
		const originalKeys = Object.keys(original).sort();
		const wrapperKeys = Object.keys(wrapper).sort();
		expect(originalKeys).toEqual(wrapperKeys);
	});

	it('check ./text-color/types exports all the same variables as the original', () => {
		const original = require('@atlaskit/editor-plugin-text-color/types');
		const wrapper = require('../text-color/entry-points/types');
		const originalKeys = Object.keys(original).sort();
		const wrapperKeys = Object.keys(wrapper).sort();
		expect(originalKeys).toEqual(wrapperKeys);
	});
});
