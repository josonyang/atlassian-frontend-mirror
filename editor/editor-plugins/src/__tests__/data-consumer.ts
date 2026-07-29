// THIS FILE IS GENERATED. DO NOT MODIFY IT MANUALLY.
export {};

describe('data-consumer wrapper', () => {
	it('check ./data-consumer exports all the same variables as the original', () => {
		const original = require('@atlaskit/editor-plugin-data-consumer');
		const wrapper = require('../data-consumer/index');
		const originalKeys = Object.keys(original).sort();
		const wrapperKeys = Object.keys(wrapper).sort();
		expect(originalKeys).toEqual(wrapperKeys);
	});

	it('check ./data-consumer/dataConsumerPlugin exports all the same variables as the original', () => {
		const original = require('@atlaskit/editor-plugin-data-consumer/dataConsumerPlugin');
		const wrapper = require('../data-consumer/entry-points/dataConsumerPlugin');
		const originalKeys = Object.keys(original).sort();
		const wrapperKeys = Object.keys(wrapper).sort();
		expect(originalKeys).toEqual(wrapperKeys);
	});

	it('check ./data-consumer/dataConsumerPluginType exports all the same variables as the original', () => {
		const original = require('@atlaskit/editor-plugin-data-consumer/dataConsumerPluginType');
		const wrapper = require('../data-consumer/entry-points/dataConsumerPluginType');
		const originalKeys = Object.keys(original).sort();
		const wrapperKeys = Object.keys(wrapper).sort();
		expect(originalKeys).toEqual(wrapperKeys);
	});
});
