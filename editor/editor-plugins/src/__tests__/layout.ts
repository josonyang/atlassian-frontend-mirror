// THIS FILE IS GENERATED. DO NOT MODIFY IT MANUALLY.
export {};

describe('layout wrapper', () => {
	it('check ./layout exports all the same variables as the original', () => {
		const original = require('@atlaskit/editor-plugin-layout');
		const wrapper = require('../layout/index');
		const originalKeys = Object.keys(original).sort();
		const wrapperKeys = Object.keys(wrapper).sort();
		expect(originalKeys).toEqual(wrapperKeys);
	});

	it('check ./layout/layout-plugin exports all the same variables as the original', () => {
		const original = require('@atlaskit/editor-plugin-layout/layout-plugin');
		const wrapper = require('../layout/entry-points/layout-plugin');
		const originalKeys = Object.keys(original).sort();
		const wrapperKeys = Object.keys(wrapper).sort();
		expect(originalKeys).toEqual(wrapperKeys);
	});

	it('check ./layout/layout-plugin-type exports all the same variables as the original', () => {
		const original = require('@atlaskit/editor-plugin-layout/layout-plugin-type');
		const wrapper = require('../layout/entry-points/layout-plugin-type');
		const originalKeys = Object.keys(original).sort();
		const wrapperKeys = Object.keys(wrapper).sort();
		expect(originalKeys).toEqual(wrapperKeys);
	});

	it('check ./layout/types exports all the same variables as the original', () => {
		const original = require('@atlaskit/editor-plugin-layout/types');
		const wrapper = require('../layout/entry-points/types');
		const originalKeys = Object.keys(original).sort();
		const wrapperKeys = Object.keys(wrapper).sort();
		expect(originalKeys).toEqual(wrapperKeys);
	});
});
