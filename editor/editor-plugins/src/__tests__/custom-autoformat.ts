// THIS FILE IS GENERATED. DO NOT MODIFY IT MANUALLY.
export {};

describe('custom-autoformat wrapper', () => {
	it('check ./custom-autoformat exports all the same variables as the original', () => {
		const original = require('@atlaskit/editor-plugin-custom-autoformat');
		const wrapper = require('../custom-autoformat/index');
		const originalKeys = Object.keys(original).sort();
		const wrapperKeys = Object.keys(wrapper).sort();
		expect(originalKeys).toEqual(wrapperKeys);
	});

	it('check ./custom-autoformat/customAutoformatPlugin exports all the same variables as the original', () => {
		const original = require('@atlaskit/editor-plugin-custom-autoformat/customAutoformatPlugin');
		const wrapper = require('../custom-autoformat/entry-points/customAutoformatPlugin');
		const originalKeys = Object.keys(original).sort();
		const wrapperKeys = Object.keys(wrapper).sort();
		expect(originalKeys).toEqual(wrapperKeys);
	});

	it('check ./custom-autoformat/customAutoformatPluginType exports all the same variables as the original', () => {
		const original = require('@atlaskit/editor-plugin-custom-autoformat/customAutoformatPluginType');
		const wrapper = require('../custom-autoformat/entry-points/customAutoformatPluginType');
		const originalKeys = Object.keys(original).sort();
		const wrapperKeys = Object.keys(wrapper).sort();
		expect(originalKeys).toEqual(wrapperKeys);
	});

	it('check ./custom-autoformat/types exports all the same variables as the original', () => {
		const original = require('@atlaskit/editor-plugin-custom-autoformat/types');
		const wrapper = require('../custom-autoformat/entry-points/types');
		const originalKeys = Object.keys(original).sort();
		const wrapperKeys = Object.keys(wrapper).sort();
		expect(originalKeys).toEqual(wrapperKeys);
	});
});
