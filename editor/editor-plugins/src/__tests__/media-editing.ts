// THIS FILE IS GENERATED. DO NOT MODIFY IT MANUALLY.
export {};

describe('media-editing wrapper', () => {
	it('check ./media-editing exports all the same variables as the original', () => {
		const original = require('@atlaskit/editor-plugin-media-editing');
		const wrapper = require('../media-editing/index');
		const originalKeys = Object.keys(original).sort();
		const wrapperKeys = Object.keys(wrapper).sort();
		expect(originalKeys).toEqual(wrapperKeys);
	});

	it('check ./media-editing/media-editing-plugin exports all the same variables as the original', () => {
		const original = require('@atlaskit/editor-plugin-media-editing/media-editing-plugin');
		const wrapper = require('../media-editing/entry-points/media-editing-plugin');
		const originalKeys = Object.keys(original).sort();
		const wrapperKeys = Object.keys(wrapper).sort();
		expect(originalKeys).toEqual(wrapperKeys);
	});

	it('check ./media-editing/media-editing-plugin-type exports all the same variables as the original', () => {
		const original = require('@atlaskit/editor-plugin-media-editing/media-editing-plugin-type');
		const wrapper = require('../media-editing/entry-points/media-editing-plugin-type');
		const originalKeys = Object.keys(original).sort();
		const wrapperKeys = Object.keys(wrapper).sort();
		expect(originalKeys).toEqual(wrapperKeys);
	});
});
