// THIS FILE IS GENERATED. DO NOT MODIFY IT MANUALLY.
export {};

describe('save-on-enter wrapper', () => {
	it('check ./save-on-enter exports all the same variables as the original', () => {
		const original = require('@atlaskit/editor-plugin-save-on-enter');
		const wrapper = require('../save-on-enter/index');
		const originalKeys = Object.keys(original).sort();
		const wrapperKeys = Object.keys(wrapper).sort();
		expect(originalKeys).toEqual(wrapperKeys);
	});

	it('check ./save-on-enter/save-on-enter-plugin exports all the same variables as the original', () => {
		const original = require('@atlaskit/editor-plugin-save-on-enter/save-on-enter-plugin');
		const wrapper = require('../save-on-enter/entry-points/save-on-enter-plugin');
		const originalKeys = Object.keys(original).sort();
		const wrapperKeys = Object.keys(wrapper).sort();
		expect(originalKeys).toEqual(wrapperKeys);
	});

	it('check ./save-on-enter/save-on-enter-plugin-type exports all the same variables as the original', () => {
		const original = require('@atlaskit/editor-plugin-save-on-enter/save-on-enter-plugin-type');
		const wrapper = require('../save-on-enter/entry-points/save-on-enter-plugin-type');
		const originalKeys = Object.keys(original).sort();
		const wrapperKeys = Object.keys(wrapper).sort();
		expect(originalKeys).toEqual(wrapperKeys);
	});
});
