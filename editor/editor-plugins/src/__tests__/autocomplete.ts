// THIS FILE IS GENERATED. DO NOT MODIFY IT MANUALLY.
export {};

describe('autocomplete wrapper', () => {
	it('check ./autocomplete exports all the same variables as the original', () => {
		const original = require('@atlaskit/editor-plugin-autocomplete');
		const wrapper = require('../autocomplete/index');
		const originalKeys = Object.keys(original).sort();
		const wrapperKeys = Object.keys(wrapper).sort();
		expect(originalKeys).toEqual(wrapperKeys);
	});

	it('check ./autocomplete/src/pm-plugins/autocomplete-plugin exports all the same variables as the original', () => {
		const original = require('@atlaskit/editor-plugin-autocomplete/src/pm-plugins/autocomplete-plugin');
		const wrapper = require('../autocomplete/pm-plugins/autocomplete-plugin');
		const originalKeys = Object.keys(original).sort();
		const wrapperKeys = Object.keys(wrapper).sort();
		expect(originalKeys).toEqual(wrapperKeys);
	});

	it('check ./autocomplete/src/pm-plugins/slow-lane-client exports all the same variables as the original', () => {
		const original = require('@atlaskit/editor-plugin-autocomplete/src/pm-plugins/slow-lane-client');
		const wrapper = require('../autocomplete/pm-plugins/slow-lane-client');
		const originalKeys = Object.keys(original).sort();
		const wrapperKeys = Object.keys(wrapper).sort();
		expect(originalKeys).toEqual(wrapperKeys);
	});

	it('check ./autocomplete/src/pm-plugins/text-predictor exports all the same variables as the original', () => {
		const original = require('@atlaskit/editor-plugin-autocomplete/src/pm-plugins/text-predictor');
		const wrapper = require('../autocomplete/pm-plugins/text-predictor');
		const originalKeys = Object.keys(original).sort();
		const wrapperKeys = Object.keys(wrapper).sort();
		expect(originalKeys).toEqual(wrapperKeys);
	});
});
