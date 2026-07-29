// THIS FILE IS GENERATED. DO NOT MODIFY IT MANUALLY.
export {};

describe('highlight wrapper', () => {
	it('check ./highlight exports all the same variables as the original', () => {
		const original = require('@atlaskit/editor-plugin-highlight');
		const wrapper = require('../highlight/index');
		const originalKeys = Object.keys(original).sort();
		const wrapperKeys = Object.keys(wrapper).sort();
		expect(originalKeys).toEqual(wrapperKeys);
	});

	it('check ./highlight/highlightPlugin exports all the same variables as the original', () => {
		const original = require('@atlaskit/editor-plugin-highlight/highlightPlugin');
		const wrapper = require('../highlight/entry-points/highlightPlugin');
		const originalKeys = Object.keys(original).sort();
		const wrapperKeys = Object.keys(wrapper).sort();
		expect(originalKeys).toEqual(wrapperKeys);
	});

	it('check ./highlight/highlightPluginType exports all the same variables as the original', () => {
		const original = require('@atlaskit/editor-plugin-highlight/highlightPluginType');
		const wrapper = require('../highlight/entry-points/highlightPluginType');
		const originalKeys = Object.keys(original).sort();
		const wrapperKeys = Object.keys(wrapper).sort();
		expect(originalKeys).toEqual(wrapperKeys);
	});

	it('check ./highlight/main exports all the same variables as the original', () => {
		const original = require('@atlaskit/editor-plugin-highlight/main');
		const wrapper = require('../highlight/entry-points/main');
		const originalKeys = Object.keys(original).sort();
		const wrapperKeys = Object.keys(wrapper).sort();
		expect(originalKeys).toEqual(wrapperKeys);
	});
});
