// THIS FILE IS GENERATED. DO NOT MODIFY IT MANUALLY.
export {};

describe('show-diff wrapper', () => {
	it('check ./show-diff exports all the same variables as the original', () => {
		const original = require('@atlaskit/editor-plugin-show-diff');
		const wrapper = require('../show-diff/index');
		const originalKeys = Object.keys(original).sort();
		const wrapperKeys = Object.keys(wrapper).sort();
		expect(originalKeys).toEqual(wrapperKeys);
	});

	it('check ./show-diff/show-diff-plugin exports all the same variables as the original', () => {
		const original = require('@atlaskit/editor-plugin-show-diff/show-diff-plugin');
		const wrapper = require('../show-diff/entry-points/show-diff-plugin');
		const originalKeys = Object.keys(original).sort();
		const wrapperKeys = Object.keys(wrapper).sort();
		expect(originalKeys).toEqual(wrapperKeys);
	});

	it('check ./show-diff/show-diff-plugin-type exports all the same variables as the original', () => {
		const original = require('@atlaskit/editor-plugin-show-diff/show-diff-plugin-type');
		const wrapper = require('../show-diff/entry-points/show-diff-plugin-type');
		const originalKeys = Object.keys(original).sort();
		const wrapperKeys = Object.keys(wrapper).sort();
		expect(originalKeys).toEqual(wrapperKeys);
	});

	it('check ./show-diff/calculate-diff exports all the same variables as the original', () => {
		const original = require('@atlaskit/editor-plugin-show-diff/calculate-diff');
		const wrapper = require('../show-diff/entry-points/calculate-diff');
		const originalKeys = Object.keys(original).sort();
		const wrapperKeys = Object.keys(wrapper).sort();
		expect(originalKeys).toEqual(wrapperKeys);
	});
});
