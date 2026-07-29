// THIS FILE IS GENERATED. DO NOT MODIFY IT MANUALLY.
export {};

describe('analytics wrapper', () => {
	it('check ./analytics exports all the same variables as the original', () => {
		const original = require('@atlaskit/editor-plugin-analytics');
		const wrapper = require('../analytics/index');
		const originalKeys = Object.keys(original).sort();
		const wrapperKeys = Object.keys(wrapper).sort();
		expect(originalKeys).toEqual(wrapperKeys);
	});

	it('check ./analytics/analyticsPlugin exports all the same variables as the original', () => {
		const original = require('@atlaskit/editor-plugin-analytics/analyticsPlugin');
		const wrapper = require('../analytics/entry-points/analyticsPlugin');
		const originalKeys = Object.keys(original).sort();
		const wrapperKeys = Object.keys(wrapper).sort();
		expect(originalKeys).toEqual(wrapperKeys);
	});

	it('check ./analytics/analyticsPluginType exports all the same variables as the original', () => {
		const original = require('@atlaskit/editor-plugin-analytics/analyticsPluginType');
		const wrapper = require('../analytics/entry-points/analyticsPluginType');
		const originalKeys = Object.keys(original).sort();
		const wrapperKeys = Object.keys(wrapper).sort();
		expect(originalKeys).toEqual(wrapperKeys);
	});

	it('check ./analytics/attach-payload-into-transaction exports all the same variables as the original', () => {
		const original = require('@atlaskit/editor-plugin-analytics/attach-payload-into-transaction');
		const wrapper = require('../analytics/entry-points/attach-payload-into-transaction');
		const originalKeys = Object.keys(original).sort();
		const wrapperKeys = Object.keys(wrapper).sort();
		expect(originalKeys).toEqual(wrapperKeys);
	});
});
