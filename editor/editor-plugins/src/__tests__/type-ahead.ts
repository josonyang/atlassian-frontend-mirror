// THIS FILE IS GENERATED. DO NOT MODIFY IT MANUALLY.
export {};

describe('type-ahead wrapper', () => {
	it('check ./type-ahead exports all the same variables as the original', () => {
		const original = require('@atlaskit/editor-plugin-type-ahead');
		const wrapper = require('../type-ahead/index');
		const originalKeys = Object.keys(original).sort();
		const wrapperKeys = Object.keys(wrapper).sort();
		expect(originalKeys).toEqual(wrapperKeys);
	});

	it('check ./type-ahead/type-ahead-plugin exports all the same variables as the original', () => {
		const original = require('@atlaskit/editor-plugin-type-ahead/type-ahead-plugin');
		const wrapper = require('../type-ahead/entry-points/type-ahead-plugin');
		const originalKeys = Object.keys(original).sort();
		const wrapperKeys = Object.keys(wrapper).sort();
		expect(originalKeys).toEqual(wrapperKeys);
	});

	it('check ./type-ahead/type-ahead-plugin-type exports all the same variables as the original', () => {
		const original = require('@atlaskit/editor-plugin-type-ahead/type-ahead-plugin-type');
		const wrapper = require('../type-ahead/entry-points/type-ahead-plugin-type');
		const originalKeys = Object.keys(original).sort();
		const wrapperKeys = Object.keys(wrapper).sort();
		expect(originalKeys).toEqual(wrapperKeys);
	});

	it('check ./type-ahead/types exports all the same variables as the original', () => {
		const original = require('@atlaskit/editor-plugin-type-ahead/types');
		const wrapper = require('../type-ahead/entry-points/types');
		const originalKeys = Object.keys(original).sort();
		const wrapperKeys = Object.keys(wrapper).sort();
		expect(originalKeys).toEqual(wrapperKeys);
	});

	it('check ./type-ahead/commands exports all the same variables as the original', () => {
		const original = require('@atlaskit/editor-plugin-type-ahead/commands');
		const wrapper = require('../type-ahead/entry-points/commands');
		const originalKeys = Object.keys(original).sort();
		const wrapperKeys = Object.keys(wrapper).sort();
		expect(originalKeys).toEqual(wrapperKeys);
	});
});
