// THIS FILE IS GENERATED. DO NOT MODIFY IT MANUALLY.
export {};

describe('guideline wrapper', () => {
	it('check ./guideline exports all the same variables as the original', () => {
		const original = require('@atlaskit/editor-plugin-guideline');
		const wrapper = require('../guideline/index');
		const originalKeys = Object.keys(original).sort();
		const wrapperKeys = Object.keys(wrapper).sort();
		expect(originalKeys).toEqual(wrapperKeys);
	});

	it('check ./guideline/guidelinePlugin exports all the same variables as the original', () => {
		const original = require('@atlaskit/editor-plugin-guideline/guidelinePlugin');
		const wrapper = require('../guideline/entry-points/guidelinePlugin');
		const originalKeys = Object.keys(original).sort();
		const wrapperKeys = Object.keys(wrapper).sort();
		expect(originalKeys).toEqual(wrapperKeys);
	});

	it('check ./guideline/guidelinePluginType exports all the same variables as the original', () => {
		const original = require('@atlaskit/editor-plugin-guideline/guidelinePluginType');
		const wrapper = require('../guideline/entry-points/guidelinePluginType');
		const originalKeys = Object.keys(original).sort();
		const wrapperKeys = Object.keys(wrapper).sort();
		expect(originalKeys).toEqual(wrapperKeys);
	});
});
