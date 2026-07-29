// THIS FILE IS GENERATED. DO NOT MODIFY IT MANUALLY.
export {};

describe('collab-edit wrapper', () => {
	it('check ./collab-edit exports all the same variables as the original', () => {
		const original = require('@atlaskit/editor-plugin-collab-edit');
		const wrapper = require('../collab-edit/index');
		const originalKeys = Object.keys(original).sort();
		const wrapperKeys = Object.keys(wrapper).sort();
		expect(originalKeys).toEqual(wrapperKeys);
	});

	it('check ./collab-edit/collabEditPlugin exports all the same variables as the original', () => {
		const original = require('@atlaskit/editor-plugin-collab-edit/collabEditPlugin');
		const wrapper = require('../collab-edit/entry-points/collabEditPlugin');
		const originalKeys = Object.keys(original).sort();
		const wrapperKeys = Object.keys(wrapper).sort();
		expect(originalKeys).toEqual(wrapperKeys);
	});

	it('check ./collab-edit/collabEditPluginType exports all the same variables as the original', () => {
		const original = require('@atlaskit/editor-plugin-collab-edit/collabEditPluginType');
		const wrapper = require('../collab-edit/entry-points/collabEditPluginType');
		const originalKeys = Object.keys(original).sort();
		const wrapperKeys = Object.keys(wrapper).sort();
		expect(originalKeys).toEqual(wrapperKeys);
	});

	it('check ./collab-edit/types exports all the same variables as the original', () => {
		const original = require('@atlaskit/editor-plugin-collab-edit/types');
		const wrapper = require('../collab-edit/entry-points/types');
		const originalKeys = Object.keys(original).sort();
		const wrapperKeys = Object.keys(wrapper).sort();
		expect(originalKeys).toEqual(wrapperKeys);
	});
});
