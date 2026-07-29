// THIS FILE IS GENERATED. DO NOT MODIFY IT MANUALLY.
export {};

describe('copy-button wrapper', () => {
	it('check ./copy-button exports all the same variables as the original', () => {
		const original = require('@atlaskit/editor-plugin-copy-button');
		const wrapper = require('../copy-button/index');
		const originalKeys = Object.keys(original).sort();
		const wrapperKeys = Object.keys(wrapper).sort();
		expect(originalKeys).toEqual(wrapperKeys);
	});

	it('check ./copy-button/copyButtonPlugin exports all the same variables as the original', () => {
		const original = require('@atlaskit/editor-plugin-copy-button/copyButtonPlugin');
		const wrapper = require('../copy-button/entry-points/copyButtonPlugin');
		const originalKeys = Object.keys(original).sort();
		const wrapperKeys = Object.keys(wrapper).sort();
		expect(originalKeys).toEqual(wrapperKeys);
	});

	it('check ./copy-button/copyButtonPluginType exports all the same variables as the original', () => {
		const original = require('@atlaskit/editor-plugin-copy-button/copyButtonPluginType');
		const wrapper = require('../copy-button/entry-points/copyButtonPluginType');
		const originalKeys = Object.keys(original).sort();
		const wrapperKeys = Object.keys(wrapper).sort();
		expect(originalKeys).toEqual(wrapperKeys);
	});
});
