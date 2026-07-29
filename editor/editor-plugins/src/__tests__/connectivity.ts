// THIS FILE IS GENERATED. DO NOT MODIFY IT MANUALLY.
export {};

describe('connectivity wrapper', () => {
	it('check ./connectivity exports all the same variables as the original', () => {
		const original = require('@atlaskit/editor-plugin-connectivity');
		const wrapper = require('../connectivity/index');
		const originalKeys = Object.keys(original).sort();
		const wrapperKeys = Object.keys(wrapper).sort();
		expect(originalKeys).toEqual(wrapperKeys);
	});

	it('check ./connectivity/connectivityPlugin exports all the same variables as the original', () => {
		const original = require('@atlaskit/editor-plugin-connectivity/connectivityPlugin');
		const wrapper = require('../connectivity/entry-points/connectivityPlugin');
		const originalKeys = Object.keys(original).sort();
		const wrapperKeys = Object.keys(wrapper).sort();
		expect(originalKeys).toEqual(wrapperKeys);
	});

	it('check ./connectivity/connectivityPluginType exports all the same variables as the original', () => {
		const original = require('@atlaskit/editor-plugin-connectivity/connectivityPluginType');
		const wrapper = require('../connectivity/entry-points/connectivityPluginType');
		const originalKeys = Object.keys(original).sort();
		const wrapperKeys = Object.keys(wrapper).sort();
		expect(originalKeys).toEqual(wrapperKeys);
	});
});
