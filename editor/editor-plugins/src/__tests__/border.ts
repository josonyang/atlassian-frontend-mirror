// THIS FILE IS GENERATED. DO NOT MODIFY IT MANUALLY.
export {};

describe('border wrapper', () => {
	it('check ./border exports all the same variables as the original', () => {
		const original = require('@atlaskit/editor-plugin-border');
		const wrapper = require('../border/index');
		const originalKeys = Object.keys(original).sort();
		const wrapperKeys = Object.keys(wrapper).sort();
		expect(originalKeys).toEqual(wrapperKeys);
	});

	it('check ./border/borderPlugin exports all the same variables as the original', () => {
		const original = require('@atlaskit/editor-plugin-border/borderPlugin');
		const wrapper = require('../border/entry-points/borderPlugin');
		const originalKeys = Object.keys(original).sort();
		const wrapperKeys = Object.keys(wrapper).sort();
		expect(originalKeys).toEqual(wrapperKeys);
	});

	it('check ./border/borderPluginType exports all the same variables as the original', () => {
		const original = require('@atlaskit/editor-plugin-border/borderPluginType');
		const wrapper = require('../border/entry-points/borderPluginType');
		const originalKeys = Object.keys(original).sort();
		const wrapperKeys = Object.keys(wrapper).sort();
		expect(originalKeys).toEqual(wrapperKeys);
	});
});
