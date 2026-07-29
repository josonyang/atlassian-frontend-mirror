// THIS FILE IS GENERATED. DO NOT MODIFY IT MANUALLY.
export {};

describe('image-upload wrapper', () => {
	it('check ./image-upload exports all the same variables as the original', () => {
		const original = require('@atlaskit/editor-plugin-image-upload');
		const wrapper = require('../image-upload/index');
		const originalKeys = Object.keys(original).sort();
		const wrapperKeys = Object.keys(wrapper).sort();
		expect(originalKeys).toEqual(wrapperKeys);
	});

	it('check ./image-upload/imageUploadPlugin exports all the same variables as the original', () => {
		const original = require('@atlaskit/editor-plugin-image-upload/imageUploadPlugin');
		const wrapper = require('../image-upload/entry-points/imageUploadPlugin');
		const originalKeys = Object.keys(original).sort();
		const wrapperKeys = Object.keys(wrapper).sort();
		expect(originalKeys).toEqual(wrapperKeys);
	});

	it('check ./image-upload/imageUploadPluginType exports all the same variables as the original', () => {
		const original = require('@atlaskit/editor-plugin-image-upload/imageUploadPluginType');
		const wrapper = require('../image-upload/entry-points/imageUploadPluginType');
		const originalKeys = Object.keys(original).sort();
		const wrapperKeys = Object.keys(wrapper).sort();
		expect(originalKeys).toEqual(wrapperKeys);
	});
});
