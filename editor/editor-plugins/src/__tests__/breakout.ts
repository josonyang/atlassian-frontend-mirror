// THIS FILE IS GENERATED. DO NOT MODIFY IT MANUALLY.
export {};

describe('breakout wrapper', () => {
	it('check ./breakout exports all the same variables as the original', () => {
		const original = require('@atlaskit/editor-plugin-breakout');
		const wrapper = require('../breakout/index');
		const originalKeys = Object.keys(original).sort();
		const wrapperKeys = Object.keys(wrapper).sort();
		expect(originalKeys).toEqual(wrapperKeys);
	});

	it('check ./breakout/breakoutPlugin exports all the same variables as the original', () => {
		const original = require('@atlaskit/editor-plugin-breakout/breakoutPlugin');
		const wrapper = require('../breakout/entry-points/breakoutPlugin');
		const originalKeys = Object.keys(original).sort();
		const wrapperKeys = Object.keys(wrapper).sort();
		expect(originalKeys).toEqual(wrapperKeys);
	});

	it('check ./breakout/breakoutPluginType exports all the same variables as the original', () => {
		const original = require('@atlaskit/editor-plugin-breakout/breakoutPluginType');
		const wrapper = require('../breakout/entry-points/breakoutPluginType');
		const originalKeys = Object.keys(original).sort();
		const wrapperKeys = Object.keys(wrapper).sort();
		expect(originalKeys).toEqual(wrapperKeys);
	});
});
