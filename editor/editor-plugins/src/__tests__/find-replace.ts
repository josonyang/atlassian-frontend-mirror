// THIS FILE IS GENERATED. DO NOT MODIFY IT MANUALLY.
export {};

describe('find-replace wrapper', () => {
	it('check ./find-replace exports all the same variables as the original', () => {
		const original = require('@atlaskit/editor-plugin-find-replace');
		const wrapper = require('../find-replace/index');
		const originalKeys = Object.keys(original).sort();
		const wrapperKeys = Object.keys(wrapper).sort();
		expect(originalKeys).toEqual(wrapperKeys);
	});

	it('check ./find-replace/findReplacePlugin exports all the same variables as the original', () => {
		const original = require('@atlaskit/editor-plugin-find-replace/findReplacePlugin');
		const wrapper = require('../find-replace/entry-points/findReplacePlugin');
		const originalKeys = Object.keys(original).sort();
		const wrapperKeys = Object.keys(wrapper).sort();
		expect(originalKeys).toEqual(wrapperKeys);
	});

	it('check ./find-replace/findReplacePluginType exports all the same variables as the original', () => {
		const original = require('@atlaskit/editor-plugin-find-replace/findReplacePluginType');
		const wrapper = require('../find-replace/entry-points/findReplacePluginType');
		const originalKeys = Object.keys(original).sort();
		const wrapperKeys = Object.keys(wrapper).sort();
		expect(originalKeys).toEqual(wrapperKeys);
	});

	it('check ./find-replace/styles exports all the same variables as the original', () => {
		const original = require('@atlaskit/editor-plugin-find-replace/styles');
		const wrapper = require('../find-replace/entry-points/styles');
		const originalKeys = Object.keys(original).sort();
		const wrapperKeys = Object.keys(wrapper).sort();
		expect(originalKeys).toEqual(wrapperKeys);
	});

	it('check ./find-replace/types exports all the same variables as the original', () => {
		const original = require('@atlaskit/editor-plugin-find-replace/types');
		const wrapper = require('../find-replace/entry-points/types');
		const originalKeys = Object.keys(original).sort();
		const wrapperKeys = Object.keys(wrapper).sort();
		expect(originalKeys).toEqual(wrapperKeys);
	});
});
