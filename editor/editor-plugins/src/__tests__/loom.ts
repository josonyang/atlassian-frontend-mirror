// THIS FILE IS GENERATED. DO NOT MODIFY IT MANUALLY.
export {};

describe('loom wrapper', () => {
	it('check ./loom exports all the same variables as the original', () => {
		const original = require('@atlaskit/editor-plugin-loom');
		const wrapper = require('../loom/index');
		const originalKeys = Object.keys(original).sort();
		const wrapperKeys = Object.keys(wrapper).sort();
		expect(originalKeys).toEqual(wrapperKeys);
	});

	it('check ./loom/loom-plugin exports all the same variables as the original', () => {
		const original = require('@atlaskit/editor-plugin-loom/loom-plugin');
		const wrapper = require('../loom/entry-points/loom-plugin');
		const originalKeys = Object.keys(original).sort();
		const wrapperKeys = Object.keys(wrapper).sort();
		expect(originalKeys).toEqual(wrapperKeys);
	});

	it('check ./loom/loom-plugin-state-type exports all the same variables as the original', () => {
		const original = require('@atlaskit/editor-plugin-loom/loom-plugin-state-type');
		const wrapper = require('../loom/entry-points/loom-plugin-state-type');
		const originalKeys = Object.keys(original).sort();
		const wrapperKeys = Object.keys(wrapper).sort();
		expect(originalKeys).toEqual(wrapperKeys);
	});

	it('check ./loom/loom-plugin-type exports all the same variables as the original', () => {
		const original = require('@atlaskit/editor-plugin-loom/loom-plugin-type');
		const wrapper = require('../loom/entry-points/loom-plugin-type');
		const originalKeys = Object.keys(original).sort();
		const wrapperKeys = Object.keys(wrapper).sort();
		expect(originalKeys).toEqual(wrapperKeys);
	});

	it('check ./loom/types exports all the same variables as the original', () => {
		const original = require('@atlaskit/editor-plugin-loom/types');
		const wrapper = require('../loom/entry-points/types');
		const originalKeys = Object.keys(original).sort();
		const wrapperKeys = Object.keys(wrapper).sort();
		expect(originalKeys).toEqual(wrapperKeys);
	});
});
