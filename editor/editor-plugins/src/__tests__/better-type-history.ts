// THIS FILE IS GENERATED. DO NOT MODIFY IT MANUALLY.
export {};

describe('better-type-history wrapper', () => {
	it('check ./better-type-history exports all the same variables as the original', () => {
		const original = require('@atlaskit/editor-plugin-better-type-history');
		const wrapper = require('../better-type-history/index');
		const originalKeys = Object.keys(original).sort();
		const wrapperKeys = Object.keys(wrapper).sort();
		expect(originalKeys).toEqual(wrapperKeys);
	});

	it('check ./better-type-history/betterTypeHistoryPlugin exports all the same variables as the original', () => {
		const original = require('@atlaskit/editor-plugin-better-type-history/betterTypeHistoryPlugin');
		const wrapper = require('../better-type-history/entry-points/betterTypeHistoryPlugin');
		const originalKeys = Object.keys(original).sort();
		const wrapperKeys = Object.keys(wrapper).sort();
		expect(originalKeys).toEqual(wrapperKeys);
	});

	it('check ./better-type-history/betterTypeHistoryPluginType exports all the same variables as the original', () => {
		const original = require('@atlaskit/editor-plugin-better-type-history/betterTypeHistoryPluginType');
		const wrapper = require('../better-type-history/entry-points/betterTypeHistoryPluginType');
		const originalKeys = Object.keys(original).sort();
		const wrapperKeys = Object.keys(wrapper).sort();
		expect(originalKeys).toEqual(wrapperKeys);
	});
});
