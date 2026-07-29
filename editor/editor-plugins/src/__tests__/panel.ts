// THIS FILE IS GENERATED. DO NOT MODIFY IT MANUALLY.
export {};

describe('panel wrapper', () => {
	it('check ./panel exports all the same variables as the original', () => {
		const original = require('@atlaskit/editor-plugin-panel');
		const wrapper = require('../panel/index');
		const originalKeys = Object.keys(original).sort();
		const wrapperKeys = Object.keys(wrapper).sort();
		expect(originalKeys).toEqual(wrapperKeys);
	});

	it('check ./panel/panel-plugin exports all the same variables as the original', () => {
		const original = require('@atlaskit/editor-plugin-panel/panel-plugin');
		const wrapper = require('../panel/entry-points/panel-plugin');
		const originalKeys = Object.keys(original).sort();
		const wrapperKeys = Object.keys(wrapper).sort();
		expect(originalKeys).toEqual(wrapperKeys);
	});

	it('check ./panel/panel-plugin-type exports all the same variables as the original', () => {
		const original = require('@atlaskit/editor-plugin-panel/panel-plugin-type');
		const wrapper = require('../panel/entry-points/panel-plugin-type');
		const originalKeys = Object.keys(original).sort();
		const wrapperKeys = Object.keys(wrapper).sort();
		expect(originalKeys).toEqual(wrapperKeys);
	});
});
