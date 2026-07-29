// THIS FILE IS GENERATED. DO NOT MODIFY IT MANUALLY.
export {};

describe('before-primary-toolbar wrapper', () => {
	it('check ./before-primary-toolbar exports all the same variables as the original', () => {
		const original = require('@atlaskit/editor-plugin-before-primary-toolbar');
		const wrapper = require('../before-primary-toolbar/index');
		const originalKeys = Object.keys(original).sort();
		const wrapperKeys = Object.keys(wrapper).sort();
		expect(originalKeys).toEqual(wrapperKeys);
	});

	it('check ./before-primary-toolbar/beforePrimaryToolbarPlugin exports all the same variables as the original', () => {
		const original = require('@atlaskit/editor-plugin-before-primary-toolbar/beforePrimaryToolbarPlugin');
		const wrapper = require('../before-primary-toolbar/entry-points/beforePrimaryToolbarPlugin');
		const originalKeys = Object.keys(original).sort();
		const wrapperKeys = Object.keys(wrapper).sort();
		expect(originalKeys).toEqual(wrapperKeys);
	});

	it('check ./before-primary-toolbar/beforePrimaryToolbarPluginType exports all the same variables as the original', () => {
		const original = require('@atlaskit/editor-plugin-before-primary-toolbar/beforePrimaryToolbarPluginType');
		const wrapper = require('../before-primary-toolbar/entry-points/beforePrimaryToolbarPluginType');
		const originalKeys = Object.keys(original).sort();
		const wrapperKeys = Object.keys(wrapper).sort();
		expect(originalKeys).toEqual(wrapperKeys);
	});

	it('check ./before-primary-toolbar/ReactComponents exports all the same variables as the original', () => {
		const original = require('@atlaskit/editor-plugin-before-primary-toolbar/ReactComponents');
		const wrapper = require('../before-primary-toolbar/entry-points/ReactComponents');
		const originalKeys = Object.keys(original).sort();
		const wrapperKeys = Object.keys(wrapper).sort();
		expect(originalKeys).toEqual(wrapperKeys);
	});
});
