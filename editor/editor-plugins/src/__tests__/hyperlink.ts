// THIS FILE IS GENERATED. DO NOT MODIFY IT MANUALLY.
export {};

describe('hyperlink wrapper', () => {
	it('check ./hyperlink exports all the same variables as the original', () => {
		const original = require('@atlaskit/editor-plugin-hyperlink');
		const wrapper = require('../hyperlink/index');
		const originalKeys = Object.keys(original).sort();
		const wrapperKeys = Object.keys(wrapper).sort();
		expect(originalKeys).toEqual(wrapperKeys);
	});

	it('check ./hyperlink/commands exports all the same variables as the original', () => {
		const original = require('@atlaskit/editor-plugin-hyperlink/commands');
		const wrapper = require('../hyperlink/entry-points/commands');
		const originalKeys = Object.keys(original).sort();
		const wrapperKeys = Object.keys(wrapper).sort();
		expect(originalKeys).toEqual(wrapperKeys);
	});

	it('check ./hyperlink/hyperlinkPlugin exports all the same variables as the original', () => {
		const original = require('@atlaskit/editor-plugin-hyperlink/hyperlinkPlugin');
		const wrapper = require('../hyperlink/entry-points/hyperlinkPlugin');
		const originalKeys = Object.keys(original).sort();
		const wrapperKeys = Object.keys(wrapper).sort();
		expect(originalKeys).toEqual(wrapperKeys);
	});

	it('check ./hyperlink/hyperlinkPluginType exports all the same variables as the original', () => {
		const original = require('@atlaskit/editor-plugin-hyperlink/hyperlinkPluginType');
		const wrapper = require('../hyperlink/entry-points/hyperlinkPluginType');
		const originalKeys = Object.keys(original).sort();
		const wrapperKeys = Object.keys(wrapper).sort();
		expect(originalKeys).toEqual(wrapperKeys);
	});
});
