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

	it('check ./autocomplete/autocompletePlugin exports all the same variables as the original', () => {
		const original = require('@atlaskit/editor-plugin-autocomplete/autocompletePlugin');
		const wrapper = require('../autocomplete/entry-points/autocompletePlugin');
		const originalKeys = Object.keys(original).sort();
		const wrapperKeys = Object.keys(wrapper).sort();
		expect(originalKeys).toEqual(wrapperKeys);
	});

	it('check ./autocomplete/autocompletePluginType exports all the same variables as the original', () => {
		const original = require('@atlaskit/editor-plugin-autocomplete/autocompletePluginType');
		const wrapper = require('../autocomplete/entry-points/autocompletePluginType');
		const originalKeys = Object.keys(original).sort();
		const wrapperKeys = Object.keys(wrapper).sort();
		expect(originalKeys).toEqual(wrapperKeys);
	});

	it('check ./autocomplete/src/pm-plugins/autocomplete-plugin exports all the same variables as the original', () => {
		const original = require('@atlaskit/editor-plugin-autocomplete/src/pm-plugins/autocomplete-plugin');
		const wrapper = require('../autocomplete/entry-points/src-pm-plugins-autocomplete-plugin');
		const originalKeys = Object.keys(original).sort();
		const wrapperKeys = Object.keys(wrapper).sort();
		expect(originalKeys).toEqual(wrapperKeys);
	});

	it('check ./autocomplete/src/pm-plugins/slow-lane-client exports all the same variables as the original', () => {
		const original = require('@atlaskit/editor-plugin-autocomplete/src/pm-plugins/slow-lane-client');
		const wrapper = require('../autocomplete/entry-points/src-pm-plugins-slow-lane-client');
		const originalKeys = Object.keys(original).sort();
		const wrapperKeys = Object.keys(wrapper).sort();
		expect(originalKeys).toEqual(wrapperKeys);
	});

	it('check ./autocomplete/src/pm-plugins/text-predictor exports all the same variables as the original', () => {
		const original = require('@atlaskit/editor-plugin-autocomplete/src/pm-plugins/text-predictor');
		const wrapper = require('../autocomplete/entry-points/src-pm-plugins-text-predictor');
		const originalKeys = Object.keys(original).sort();
		const wrapperKeys = Object.keys(wrapper).sort();
		expect(originalKeys).toEqual(wrapperKeys);
	});

	it('check ./autocomplete/CANONICAL_FIX__DO_NOT_USE_ME_A exports all the same variables as the original', () => {
		const original = require('@atlaskit/editor-plugin-autocomplete/CANONICAL_FIX__DO_NOT_USE_ME_A');
		const wrapper = require('../autocomplete/pm-plugins/autocomplete-plugin');
		const originalKeys = Object.keys(original).sort();
		const wrapperKeys = Object.keys(wrapper).sort();
		expect(originalKeys).toEqual(wrapperKeys);
	});

	it('check ./autocomplete/CANONICAL_FIX__DO_NOT_USE_ME_B exports all the same variables as the original', () => {
		const original = require('@atlaskit/editor-plugin-autocomplete/CANONICAL_FIX__DO_NOT_USE_ME_B');
		const wrapper = require('../autocomplete/pm-plugins/slow-lane-client');
		const originalKeys = Object.keys(original).sort();
		const wrapperKeys = Object.keys(wrapper).sort();
		expect(originalKeys).toEqual(wrapperKeys);
	});

	it('check ./autocomplete/CANONICAL_FIX__DO_NOT_USE_ME_C exports all the same variables as the original', () => {
		const original = require('@atlaskit/editor-plugin-autocomplete/CANONICAL_FIX__DO_NOT_USE_ME_C');
		const wrapper = require('../autocomplete/pm-plugins/text-predictor');
		const originalKeys = Object.keys(original).sort();
		const wrapperKeys = Object.keys(wrapper).sort();
		expect(originalKeys).toEqual(wrapperKeys);
	});
});
