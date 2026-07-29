// THIS FILE IS GENERATED. DO NOT MODIFY IT MANUALLY.
export {};

describe('date wrapper', () => {
	it('check ./date exports all the same variables as the original', () => {
		const original = require('@atlaskit/editor-plugin-date');
		const wrapper = require('../date/index');
		const originalKeys = Object.keys(original).sort();
		const wrapperKeys = Object.keys(wrapper).sort();
		expect(originalKeys).toEqual(wrapperKeys);
	});

	it('check ./date/datePlugin exports all the same variables as the original', () => {
		const original = require('@atlaskit/editor-plugin-date/datePlugin');
		const wrapper = require('../date/entry-points/datePlugin');
		const originalKeys = Object.keys(original).sort();
		const wrapperKeys = Object.keys(wrapper).sort();
		expect(originalKeys).toEqual(wrapperKeys);
	});

	it('check ./date/datePluginType exports all the same variables as the original', () => {
		const original = require('@atlaskit/editor-plugin-date/datePluginType');
		const wrapper = require('../date/entry-points/datePluginType');
		const originalKeys = Object.keys(original).sort();
		const wrapperKeys = Object.keys(wrapper).sort();
		expect(originalKeys).toEqual(wrapperKeys);
	});

	it('check ./date/types exports all the same variables as the original', () => {
		const original = require('@atlaskit/editor-plugin-date/types');
		const wrapper = require('../date/entry-points/types');
		const originalKeys = Object.keys(original).sort();
		const wrapperKeys = Object.keys(wrapper).sort();
		expect(originalKeys).toEqual(wrapperKeys);
	});
});
