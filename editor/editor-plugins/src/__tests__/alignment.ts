// THIS FILE IS GENERATED. DO NOT MODIFY IT MANUALLY.
export {};

describe('alignment wrapper', () => {
	it('check ./alignment exports all the same variables as the original', () => {
		const original = require('@atlaskit/editor-plugin-alignment');
		const wrapper = require('../alignment/index');
		const originalKeys = Object.keys(original).sort();
		const wrapperKeys = Object.keys(wrapper).sort();
		expect(originalKeys).toEqual(wrapperKeys);
	});

	it('check ./alignment/alignmentPlugin exports all the same variables as the original', () => {
		const original = require('@atlaskit/editor-plugin-alignment/alignmentPlugin');
		const wrapper = require('../alignment/entry-points/alignmentPlugin');
		const originalKeys = Object.keys(original).sort();
		const wrapperKeys = Object.keys(wrapper).sort();
		expect(originalKeys).toEqual(wrapperKeys);
	});

	it('check ./alignment/alignmentPluginType exports all the same variables as the original', () => {
		const original = require('@atlaskit/editor-plugin-alignment/alignmentPluginType');
		const wrapper = require('../alignment/entry-points/alignmentPluginType');
		const originalKeys = Object.keys(original).sort();
		const wrapperKeys = Object.keys(wrapper).sort();
		expect(originalKeys).toEqual(wrapperKeys);
	});

	it('check ./alignment/types exports all the same variables as the original', () => {
		const original = require('@atlaskit/editor-plugin-alignment/types');
		const wrapper = require('../alignment/entry-points/types');
		const originalKeys = Object.keys(original).sort();
		const wrapperKeys = Object.keys(wrapper).sort();
		expect(originalKeys).toEqual(wrapperKeys);
	});
});
