// THIS FILE IS GENERATED. DO NOT MODIFY IT MANUALLY.
export {};

describe('base wrapper', () => {
	it('check ./base exports all the same variables as the original', () => {
		const original = require('@atlaskit/editor-plugin-base');
		const wrapper = require('../base/index');
		const originalKeys = Object.keys(original).sort();
		const wrapperKeys = Object.keys(wrapper).sort();
		expect(originalKeys).toEqual(wrapperKeys);
	});

	it('check ./base/basePlugin exports all the same variables as the original', () => {
		const original = require('@atlaskit/editor-plugin-base/basePlugin');
		const wrapper = require('../base/entry-points/basePlugin');
		const originalKeys = Object.keys(original).sort();
		const wrapperKeys = Object.keys(wrapper).sort();
		expect(originalKeys).toEqual(wrapperKeys);
	});

	it('check ./base/basePluginType exports all the same variables as the original', () => {
		const original = require('@atlaskit/editor-plugin-base/basePluginType');
		const wrapper = require('../base/entry-points/basePluginType');
		const originalKeys = Object.keys(original).sort();
		const wrapperKeys = Object.keys(wrapper).sort();
		expect(originalKeys).toEqual(wrapperKeys);
	});

	it('check ./base/plugin exports all the same variables as the original', () => {
		const original = require('@atlaskit/editor-plugin-base/plugin');
		const wrapper = require('../base/entry-points/plugin');
		const originalKeys = Object.keys(original).sort();
		const wrapperKeys = Object.keys(wrapper).sort();
		expect(originalKeys).toEqual(wrapperKeys);
	});
});
