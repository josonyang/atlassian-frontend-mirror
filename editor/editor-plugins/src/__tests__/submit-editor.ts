// THIS FILE IS GENERATED. DO NOT MODIFY IT MANUALLY.
export {};

describe('submit-editor wrapper', () => {
	it('check ./submit-editor exports all the same variables as the original', () => {
		const original = require('@atlaskit/editor-plugin-submit-editor');
		const wrapper = require('../submit-editor/index');
		const originalKeys = Object.keys(original).sort();
		const wrapperKeys = Object.keys(wrapper).sort();
		expect(originalKeys).toEqual(wrapperKeys);
	});

	it('check ./submit-editor/submit-editor-plugin exports all the same variables as the original', () => {
		const original = require('@atlaskit/editor-plugin-submit-editor/submit-editor-plugin');
		const wrapper = require('../submit-editor/entry-points/submit-editor-plugin');
		const originalKeys = Object.keys(original).sort();
		const wrapperKeys = Object.keys(wrapper).sort();
		expect(originalKeys).toEqual(wrapperKeys);
	});

	it('check ./submit-editor/submit-editor-plugin-type exports all the same variables as the original', () => {
		const original = require('@atlaskit/editor-plugin-submit-editor/submit-editor-plugin-type');
		const wrapper = require('../submit-editor/entry-points/submit-editor-plugin-type');
		const originalKeys = Object.keys(original).sort();
		const wrapperKeys = Object.keys(wrapper).sort();
		expect(originalKeys).toEqual(wrapperKeys);
	});
});
