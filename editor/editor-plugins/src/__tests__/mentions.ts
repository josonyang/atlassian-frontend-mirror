// THIS FILE IS GENERATED. DO NOT MODIFY IT MANUALLY.
export {};

describe('mentions wrapper', () => {
	it('check ./mentions exports all the same variables as the original', () => {
		const original = require('@atlaskit/editor-plugin-mentions');
		const wrapper = require('../mentions/index');
		const originalKeys = Object.keys(original).sort();
		const wrapperKeys = Object.keys(wrapper).sort();
		expect(originalKeys).toEqual(wrapperKeys);
	});

	it('check ./mentions/editor-commands exports all the same variables as the original', () => {
		const original = require('@atlaskit/editor-plugin-mentions/editor-commands');
		const wrapper = require('../mentions/entry-points/editor-commands');
		const originalKeys = Object.keys(original).sort();
		const wrapperKeys = Object.keys(wrapper).sort();
		expect(originalKeys).toEqual(wrapperKeys);
	});

	it('check ./mentions/mentions-plugin exports all the same variables as the original', () => {
		const original = require('@atlaskit/editor-plugin-mentions/mentions-plugin');
		const wrapper = require('../mentions/entry-points/mentions-plugin');
		const originalKeys = Object.keys(original).sort();
		const wrapperKeys = Object.keys(wrapper).sort();
		expect(originalKeys).toEqual(wrapperKeys);
	});

	it('check ./mentions/mentions-plugin-type exports all the same variables as the original', () => {
		const original = require('@atlaskit/editor-plugin-mentions/mentions-plugin-type');
		const wrapper = require('../mentions/entry-points/mentions-plugin-type');
		const originalKeys = Object.keys(original).sort();
		const wrapperKeys = Object.keys(wrapper).sort();
		expect(originalKeys).toEqual(wrapperKeys);
	});

	it('check ./mentions/types exports all the same variables as the original', () => {
		const original = require('@atlaskit/editor-plugin-mentions/types');
		const wrapper = require('../mentions/entry-points/types');
		const originalKeys = Object.keys(original).sort();
		const wrapperKeys = Object.keys(wrapper).sort();
		expect(originalKeys).toEqual(wrapperKeys);
	});
});
