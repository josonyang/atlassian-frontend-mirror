// THIS FILE IS GENERATED. DO NOT MODIFY IT MANUALLY.
export {};

describe('metrics wrapper', () => {
	it('check ./metrics exports all the same variables as the original', () => {
		const original = require('@atlaskit/editor-plugin-metrics');
		const wrapper = require('../metrics/index');
		const originalKeys = Object.keys(original).sort();
		const wrapperKeys = Object.keys(wrapper).sort();
		expect(originalKeys).toEqual(wrapperKeys);
	});

	it('check ./metrics/metrics-plugin-type exports all the same variables as the original', () => {
		const original = require('@atlaskit/editor-plugin-metrics/metrics-plugin-type');
		const wrapper = require('../metrics/entry-points/metrics-plugin-type');
		const originalKeys = Object.keys(original).sort();
		const wrapperKeys = Object.keys(wrapper).sort();
		expect(originalKeys).toEqual(wrapperKeys);
	});

	it('check ./metrics/metrics-plugin exports all the same variables as the original', () => {
		const original = require('@atlaskit/editor-plugin-metrics/metrics-plugin');
		const wrapper = require('../metrics/entry-points/metrics-plugin');
		const originalKeys = Object.keys(original).sort();
		const wrapperKeys = Object.keys(wrapper).sort();
		expect(originalKeys).toEqual(wrapperKeys);
	});

	it('check ./metrics/metrics-state-type exports all the same variables as the original', () => {
		const original = require('@atlaskit/editor-plugin-metrics/metrics-state-type');
		const wrapper = require('../metrics/entry-points/metrics-state-type');
		const originalKeys = Object.keys(original).sort();
		const wrapperKeys = Object.keys(wrapper).sort();
		expect(originalKeys).toEqual(wrapperKeys);
	});
});
