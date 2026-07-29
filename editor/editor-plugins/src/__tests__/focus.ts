// THIS FILE IS GENERATED. DO NOT MODIFY IT MANUALLY.
export {};

describe('focus wrapper', () => {
	it('check ./focus exports all the same variables as the original', () => {
		const original = require('@atlaskit/editor-plugin-focus');
		const wrapper = require('../focus/index');
		const originalKeys = Object.keys(original).sort();
		const wrapperKeys = Object.keys(wrapper).sort();
		expect(originalKeys).toEqual(wrapperKeys);
	});

	it('check ./focus/focusPlugin exports all the same variables as the original', () => {
		const original = require('@atlaskit/editor-plugin-focus/focusPlugin');
		const wrapper = require('../focus/entry-points/focusPlugin');
		const originalKeys = Object.keys(original).sort();
		const wrapperKeys = Object.keys(wrapper).sort();
		expect(originalKeys).toEqual(wrapperKeys);
	});

	it('check ./focus/focusPluginType exports all the same variables as the original', () => {
		const original = require('@atlaskit/editor-plugin-focus/focusPluginType');
		const wrapper = require('../focus/entry-points/focusPluginType');
		const originalKeys = Object.keys(original).sort();
		const wrapperKeys = Object.keys(wrapper).sort();
		expect(originalKeys).toEqual(wrapperKeys);
	});

	it('check ./focus/types exports all the same variables as the original', () => {
		const original = require('@atlaskit/editor-plugin-focus/types');
		const wrapper = require('../focus/entry-points/types');
		const originalKeys = Object.keys(original).sort();
		const wrapperKeys = Object.keys(wrapper).sort();
		expect(originalKeys).toEqual(wrapperKeys);
	});
});
