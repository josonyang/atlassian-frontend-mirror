// THIS FILE IS GENERATED. DO NOT MODIFY IT MANUALLY.
export {};

describe('block-type wrapper', () => {
	it('check ./block-type exports all the same variables as the original', () => {
		const original = require('@atlaskit/editor-plugin-block-type');
		const wrapper = require('../block-type/index');
		const originalKeys = Object.keys(original).sort();
		const wrapperKeys = Object.keys(wrapper).sort();
		expect(originalKeys).toEqual(wrapperKeys);
	});

	it('check ./block-type/block-type exports all the same variables as the original', () => {
		const original = require('@atlaskit/editor-plugin-block-type/block-type');
		const wrapper = require('../block-type/entry-points/block-type');
		const originalKeys = Object.keys(original).sort();
		const wrapperKeys = Object.keys(wrapper).sort();
		expect(originalKeys).toEqual(wrapperKeys);
	});

	it('check ./block-type/block-types exports all the same variables as the original', () => {
		const original = require('@atlaskit/editor-plugin-block-type/block-types');
		const wrapper = require('../block-type/entry-points/block-types');
		const originalKeys = Object.keys(original).sort();
		const wrapperKeys = Object.keys(wrapper).sort();
		expect(originalKeys).toEqual(wrapperKeys);
	});

	it('check ./block-type/blockTypePlugin exports all the same variables as the original', () => {
		const original = require('@atlaskit/editor-plugin-block-type/blockTypePlugin');
		const wrapper = require('../block-type/entry-points/blockTypePlugin');
		const originalKeys = Object.keys(original).sort();
		const wrapperKeys = Object.keys(wrapper).sort();
		expect(originalKeys).toEqual(wrapperKeys);
	});

	it('check ./block-type/blockTypePluginType exports all the same variables as the original', () => {
		const original = require('@atlaskit/editor-plugin-block-type/blockTypePluginType');
		const wrapper = require('../block-type/entry-points/blockTypePluginType');
		const originalKeys = Object.keys(original).sort();
		const wrapperKeys = Object.keys(wrapper).sort();
		expect(originalKeys).toEqual(wrapperKeys);
	});

	it('check ./block-type/consts/block-types exports all the same variables as the original', () => {
		const original = require('@atlaskit/editor-plugin-block-type/consts/block-types');
		const wrapper = require('../block-type/entry-points/consts-block-types');
		const originalKeys = Object.keys(original).sort();
		const wrapperKeys = Object.keys(wrapper).sort();
		expect(originalKeys).toEqual(wrapperKeys);
	});

	it('check ./block-type/consts exports all the same variables as the original', () => {
		const original = require('@atlaskit/editor-plugin-block-type/consts');
		const wrapper = require('../block-type/ui/consts');
		const originalKeys = Object.keys(original).sort();
		const wrapperKeys = Object.keys(wrapper).sort();
		expect(originalKeys).toEqual(wrapperKeys);
	});

	it('check ./block-type/main exports all the same variables as the original', () => {
		const original = require('@atlaskit/editor-plugin-block-type/main');
		const wrapper = require('../block-type/entry-points/main');
		const originalKeys = Object.keys(original).sort();
		const wrapperKeys = Object.keys(wrapper).sort();
		expect(originalKeys).toEqual(wrapperKeys);
	});

	it('check ./block-type/ToolbarBlockType exports all the same variables as the original', () => {
		const original = require('@atlaskit/editor-plugin-block-type/ToolbarBlockType');
		const wrapper = require('../block-type/entry-points/ToolbarBlockType');
		const originalKeys = Object.keys(original).sort();
		const wrapperKeys = Object.keys(wrapper).sort();
		expect(originalKeys).toEqual(wrapperKeys);
	});

	it('check ./block-type/types exports all the same variables as the original', () => {
		const original = require('@atlaskit/editor-plugin-block-type/types');
		const wrapper = require('../block-type/entry-points/types');
		const originalKeys = Object.keys(original).sort();
		const wrapperKeys = Object.keys(wrapper).sort();
		expect(originalKeys).toEqual(wrapperKeys);
	});
});
