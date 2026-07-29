// THIS FILE IS GENERATED. DO NOT MODIFY IT MANUALLY.
export {};

describe('content-insertion wrapper', () => {
	it('check ./content-insertion exports all the same variables as the original', () => {
		const original = require('@atlaskit/editor-plugin-content-insertion');
		const wrapper = require('../content-insertion/index');
		const originalKeys = Object.keys(original).sort();
		const wrapperKeys = Object.keys(wrapper).sort();
		expect(originalKeys).toEqual(wrapperKeys);
	});

	it('check ./content-insertion/contentInsertionPlugin exports all the same variables as the original', () => {
		const original = require('@atlaskit/editor-plugin-content-insertion/contentInsertionPlugin');
		const wrapper = require('../content-insertion/entry-points/contentInsertionPlugin');
		const originalKeys = Object.keys(original).sort();
		const wrapperKeys = Object.keys(wrapper).sort();
		expect(originalKeys).toEqual(wrapperKeys);
	});

	it('check ./content-insertion/contentInsertionPluginType exports all the same variables as the original', () => {
		const original = require('@atlaskit/editor-plugin-content-insertion/contentInsertionPluginType');
		const wrapper = require('../content-insertion/entry-points/contentInsertionPluginType');
		const originalKeys = Object.keys(original).sort();
		const wrapperKeys = Object.keys(wrapper).sort();
		expect(originalKeys).toEqual(wrapperKeys);
	});

	it('check ./content-insertion/types exports all the same variables as the original', () => {
		const original = require('@atlaskit/editor-plugin-content-insertion/types');
		const wrapper = require('../content-insertion/entry-points/types');
		const originalKeys = Object.keys(original).sort();
		const wrapperKeys = Object.keys(wrapper).sort();
		expect(originalKeys).toEqual(wrapperKeys);
	});
});
