// THIS FILE IS GENERATED. DO NOT MODIFY IT MANUALLY.
export {};

describe('rule wrapper', () => {
	it('check ./rule exports all the same variables as the original', () => {
		const original = require('@atlaskit/editor-plugin-rule');
		const wrapper = require('../rule/index');
		const originalKeys = Object.keys(original).sort();
		const wrapperKeys = Object.keys(wrapper).sort();
		expect(originalKeys).toEqual(wrapperKeys);
	});

	it('check ./rule/rule-plugin exports all the same variables as the original', () => {
		const original = require('@atlaskit/editor-plugin-rule/rule-plugin');
		const wrapper = require('../rule/entry-points/rule-plugin');
		const originalKeys = Object.keys(original).sort();
		const wrapperKeys = Object.keys(wrapper).sort();
		expect(originalKeys).toEqual(wrapperKeys);
	});

	it('check ./rule/rule-plugin-type exports all the same variables as the original', () => {
		const original = require('@atlaskit/editor-plugin-rule/rule-plugin-type');
		const wrapper = require('../rule/entry-points/rule-plugin-type');
		const originalKeys = Object.keys(original).sort();
		const wrapperKeys = Object.keys(wrapper).sort();
		expect(originalKeys).toEqual(wrapperKeys);
	});
});
