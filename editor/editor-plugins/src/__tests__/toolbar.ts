// THIS FILE IS GENERATED. DO NOT MODIFY IT MANUALLY.
export {};

describe('toolbar wrapper', () => {
	it('check ./toolbar exports all the same variables as the original', () => {
		const original = require('@atlaskit/editor-plugin-toolbar');
		const wrapper = require('../toolbar/index');
		const originalKeys = Object.keys(original).sort();
		const wrapperKeys = Object.keys(wrapper).sort();
		expect(originalKeys).toEqual(wrapperKeys);
	});

	it('check ./toolbar/plugin-key exports all the same variables as the original', () => {
		const original = require('@atlaskit/editor-plugin-toolbar/plugin-key');
		const wrapper = require('../toolbar/entry-points/plugin-key');
		const originalKeys = Object.keys(original).sort();
		const wrapperKeys = Object.keys(wrapper).sort();
		expect(originalKeys).toEqual(wrapperKeys);
	});

	it('check ./toolbar/toolbar-plugin exports all the same variables as the original', () => {
		const original = require('@atlaskit/editor-plugin-toolbar/toolbar-plugin');
		const wrapper = require('../toolbar/entry-points/toolbar-plugin');
		const originalKeys = Object.keys(original).sort();
		const wrapperKeys = Object.keys(wrapper).sort();
		expect(originalKeys).toEqual(wrapperKeys);
	});

	it('check ./toolbar/toolbar-plugin-type exports all the same variables as the original', () => {
		const original = require('@atlaskit/editor-plugin-toolbar/toolbar-plugin-type');
		const wrapper = require('../toolbar/entry-points/toolbar-plugin-type');
		const originalKeys = Object.keys(original).sort();
		const wrapperKeys = Object.keys(wrapper).sort();
		expect(originalKeys).toEqual(wrapperKeys);
	});

	it('check ./toolbar/types exports all the same variables as the original', () => {
		const original = require('@atlaskit/editor-plugin-toolbar/types');
		const wrapper = require('../toolbar/entry-points/types');
		const originalKeys = Object.keys(original).sort();
		const wrapperKeys = Object.keys(wrapper).sort();
		expect(originalKeys).toEqual(wrapperKeys);
	});
});
