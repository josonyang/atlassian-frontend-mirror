// THIS FILE IS GENERATED. DO NOT MODIFY IT MANUALLY.
export {};

describe('batch-attribute-updates wrapper', () => {
	it('check ./batch-attribute-updates exports all the same variables as the original', () => {
		const original = require('@atlaskit/editor-plugin-batch-attribute-updates');
		const wrapper = require('../batch-attribute-updates/index');
		const originalKeys = Object.keys(original).sort();
		const wrapperKeys = Object.keys(wrapper).sort();
		expect(originalKeys).toEqual(wrapperKeys);
	});

	it('check ./batch-attribute-updates/batchAttributeUpdatesPlugin exports all the same variables as the original', () => {
		const original = require('@atlaskit/editor-plugin-batch-attribute-updates/batchAttributeUpdatesPlugin');
		const wrapper = require('../batch-attribute-updates/entry-points/batchAttributeUpdatesPlugin');
		const originalKeys = Object.keys(original).sort();
		const wrapperKeys = Object.keys(wrapper).sort();
		expect(originalKeys).toEqual(wrapperKeys);
	});

	it('check ./batch-attribute-updates/batchAttributeUpdatesPluginType exports all the same variables as the original', () => {
		const original = require('@atlaskit/editor-plugin-batch-attribute-updates/batchAttributeUpdatesPluginType');
		const wrapper = require('../batch-attribute-updates/entry-points/batchAttributeUpdatesPluginType');
		const originalKeys = Object.keys(original).sort();
		const wrapperKeys = Object.keys(wrapper).sort();
		expect(originalKeys).toEqual(wrapperKeys);
	});
});
