// THIS FILE IS GENERATED. DO NOT MODIFY IT MANUALLY.
export {};

describe('track-changes wrapper', () => {
	it('check ./track-changes exports all the same variables as the original', () => {
		const original = require('@atlaskit/editor-plugin-track-changes');
		const wrapper = require('../track-changes/index');
		const originalKeys = Object.keys(original).sort();
		const wrapperKeys = Object.keys(wrapper).sort();
		expect(originalKeys).toEqual(wrapperKeys);
	});

	it('check ./track-changes/track-changes-plugin exports all the same variables as the original', () => {
		const original = require('@atlaskit/editor-plugin-track-changes/track-changes-plugin');
		const wrapper = require('../track-changes/entry-points/track-changes-plugin');
		const originalKeys = Object.keys(original).sort();
		const wrapperKeys = Object.keys(wrapper).sort();
		expect(originalKeys).toEqual(wrapperKeys);
	});

	it('check ./track-changes/track-changes-plugin-type exports all the same variables as the original', () => {
		const original = require('@atlaskit/editor-plugin-track-changes/track-changes-plugin-type');
		const wrapper = require('../track-changes/entry-points/track-changes-plugin-type');
		const originalKeys = Object.keys(original).sort();
		const wrapperKeys = Object.keys(wrapper).sort();
		expect(originalKeys).toEqual(wrapperKeys);
	});
});
