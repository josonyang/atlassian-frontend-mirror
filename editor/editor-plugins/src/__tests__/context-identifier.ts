// THIS FILE IS GENERATED. DO NOT MODIFY IT MANUALLY.
export {};

describe('context-identifier wrapper', () => {
	it('check ./context-identifier exports all the same variables as the original', () => {
		const original = require('@atlaskit/editor-plugin-context-identifier');
		const wrapper = require('../context-identifier/index');
		const originalKeys = Object.keys(original).sort();
		const wrapperKeys = Object.keys(wrapper).sort();
		expect(originalKeys).toEqual(wrapperKeys);
	});

	it('check ./context-identifier/contextIdentifierPlugin exports all the same variables as the original', () => {
		const original = require('@atlaskit/editor-plugin-context-identifier/contextIdentifierPlugin');
		const wrapper = require('../context-identifier/entry-points/contextIdentifierPlugin');
		const originalKeys = Object.keys(original).sort();
		const wrapperKeys = Object.keys(wrapper).sort();
		expect(originalKeys).toEqual(wrapperKeys);
	});

	it('check ./context-identifier/contextIdentifierPluginType exports all the same variables as the original', () => {
		const original = require('@atlaskit/editor-plugin-context-identifier/contextIdentifierPluginType');
		const wrapper = require('../context-identifier/entry-points/contextIdentifierPluginType');
		const originalKeys = Object.keys(original).sort();
		const wrapperKeys = Object.keys(wrapper).sort();
		expect(originalKeys).toEqual(wrapperKeys);
	});
});
