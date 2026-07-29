// THIS FILE IS GENERATED. DO NOT MODIFY IT MANUALLY.
export {};

describe('card wrapper', () => {
	it('check ./card exports all the same variables as the original', () => {
		const original = require('@atlaskit/editor-plugin-card');
		const wrapper = require('../card/index');
		const originalKeys = Object.keys(original).sort();
		const wrapperKeys = Object.keys(wrapper).sort();
		expect(originalKeys).toEqual(wrapperKeys);
	});

	it('check ./card/cardPlugin exports all the same variables as the original', () => {
		const original = require('@atlaskit/editor-plugin-card/cardPlugin');
		const wrapper = require('../card/entry-points/cardPlugin');
		const originalKeys = Object.keys(original).sort();
		const wrapperKeys = Object.keys(wrapper).sort();
		expect(originalKeys).toEqual(wrapperKeys);
	});

	it('check ./card/cardPluginType exports all the same variables as the original', () => {
		const original = require('@atlaskit/editor-plugin-card/cardPluginType');
		const wrapper = require('../card/entry-points/cardPluginType');
		const originalKeys = Object.keys(original).sort();
		const wrapperKeys = Object.keys(wrapper).sort();
		expect(originalKeys).toEqual(wrapperKeys);
	});

	it('check ./card/types exports all the same variables as the original', () => {
		const original = require('@atlaskit/editor-plugin-card/types');
		const wrapper = require('../card/entry-points/types');
		const originalKeys = Object.keys(original).sort();
		const wrapperKeys = Object.keys(wrapper).sort();
		expect(originalKeys).toEqual(wrapperKeys);
	});
});
