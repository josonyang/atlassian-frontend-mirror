// THIS FILE IS GENERATED. DO NOT MODIFY IT MANUALLY.
export {};

describe('toolbar-lists-indentation wrapper', () => {
	it('check ./toolbar-lists-indentation exports all the same variables as the original', () => {
		const original = require('@atlaskit/editor-plugin-toolbar-lists-indentation');
		const wrapper = require('../toolbar-lists-indentation/index');
		const originalKeys = Object.keys(original).sort();
		const wrapperKeys = Object.keys(wrapper).sort();
		expect(originalKeys).toEqual(wrapperKeys);
	});

	it('check ./toolbar-lists-indentation/src/ui/toolbar-components/TaskListMenuItem exports all the same variables as the original', () => {
		const original = require('@atlaskit/editor-plugin-toolbar-lists-indentation/src/ui/toolbar-components/TaskListMenuItem');
		const wrapper = require('../toolbar-lists-indentation/ui/toolbar-components/TaskListMenuItem');
		const originalKeys = Object.keys(original).sort();
		const wrapperKeys = Object.keys(wrapper).sort();
		expect(originalKeys).toEqual(wrapperKeys);
	});

	it('check ./toolbar-lists-indentation/toolbar-lists-indentation-plugin exports all the same variables as the original', () => {
		const original = require('@atlaskit/editor-plugin-toolbar-lists-indentation/toolbar-lists-indentation-plugin');
		const wrapper = require('../toolbar-lists-indentation/entry-points/toolbar-lists-indentation-plugin');
		const originalKeys = Object.keys(original).sort();
		const wrapperKeys = Object.keys(wrapper).sort();
		expect(originalKeys).toEqual(wrapperKeys);
	});

	it('check ./toolbar-lists-indentation/toolbar-lists-indentation-plugin-type exports all the same variables as the original', () => {
		const original = require('@atlaskit/editor-plugin-toolbar-lists-indentation/toolbar-lists-indentation-plugin-type');
		const wrapper = require('../toolbar-lists-indentation/entry-points/toolbar-lists-indentation-plugin-type');
		const originalKeys = Object.keys(original).sort();
		const wrapperKeys = Object.keys(wrapper).sort();
		expect(originalKeys).toEqual(wrapperKeys);
	});
});
