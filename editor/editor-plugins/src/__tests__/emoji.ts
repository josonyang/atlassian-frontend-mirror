// THIS FILE IS GENERATED. DO NOT MODIFY IT MANUALLY.
export {};

describe('emoji wrapper', () => {
	it('check ./emoji exports all the same variables as the original', () => {
		const original = require('@atlaskit/editor-plugin-emoji');
		const wrapper = require('../emoji/index');
		const originalKeys = Object.keys(original).sort();
		const wrapperKeys = Object.keys(wrapper).sort();
		expect(originalKeys).toEqual(wrapperKeys);
	});

	it('check ./emoji/EmojiNodeDataProvider exports all the same variables as the original', () => {
		const original = require('@atlaskit/editor-plugin-emoji/EmojiNodeDataProvider');
		const wrapper = require('../emoji/entry-points/EmojiNodeDataProvider');
		const originalKeys = Object.keys(original).sort();
		const wrapperKeys = Object.keys(wrapper).sort();
		expect(originalKeys).toEqual(wrapperKeys);
	});

	it('check ./emoji/emojiPlugin exports all the same variables as the original', () => {
		const original = require('@atlaskit/editor-plugin-emoji/emojiPlugin');
		const wrapper = require('../emoji/entry-points/emojiPlugin');
		const originalKeys = Object.keys(original).sort();
		const wrapperKeys = Object.keys(wrapper).sort();
		expect(originalKeys).toEqual(wrapperKeys);
	});

	it('check ./emoji/emojiPluginType exports all the same variables as the original', () => {
		const original = require('@atlaskit/editor-plugin-emoji/emojiPluginType');
		const wrapper = require('../emoji/entry-points/emojiPluginType');
		const originalKeys = Object.keys(original).sort();
		const wrapperKeys = Object.keys(wrapper).sort();
		expect(originalKeys).toEqual(wrapperKeys);
	});
});
