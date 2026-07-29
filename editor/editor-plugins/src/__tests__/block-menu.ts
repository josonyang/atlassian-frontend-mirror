// THIS FILE IS GENERATED. DO NOT MODIFY IT MANUALLY.
export {};

describe('block-menu wrapper', () => {
	it('check ./block-menu exports all the same variables as the original', () => {
		const original = require('@atlaskit/editor-plugin-block-menu');
		const wrapper = require('../block-menu/index');
		const originalKeys = Object.keys(original).sort();
		const wrapperKeys = Object.keys(wrapper).sort();
		expect(originalKeys).toEqual(wrapperKeys);
	});

	it('check ./block-menu/blockMenuPlugin exports all the same variables as the original', () => {
		const original = require('@atlaskit/editor-plugin-block-menu/blockMenuPlugin');
		const wrapper = require('../block-menu/entry-points/blockMenuPlugin');
		const originalKeys = Object.keys(original).sort();
		const wrapperKeys = Object.keys(wrapper).sort();
		expect(originalKeys).toEqual(wrapperKeys);
	});

	it('check ./block-menu/blockMenuPluginType exports all the same variables as the original', () => {
		const original = require('@atlaskit/editor-plugin-block-menu/blockMenuPluginType');
		const wrapper = require('../block-menu/entry-points/blockMenuPluginType');
		const originalKeys = Object.keys(original).sort();
		const wrapperKeys = Object.keys(wrapper).sort();
		expect(originalKeys).toEqual(wrapperKeys);
	});

	it('check ./block-menu/types exports all the same variables as the original', () => {
		const original = require('@atlaskit/editor-plugin-block-menu/types');
		const wrapper = require('../block-menu/entry-points/types');
		const originalKeys = Object.keys(original).sort();
		const wrapperKeys = Object.keys(wrapper).sort();
		expect(originalKeys).toEqual(wrapperKeys);
	});
});
