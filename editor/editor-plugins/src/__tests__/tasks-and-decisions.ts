// THIS FILE IS GENERATED. DO NOT MODIFY IT MANUALLY.
export {};

describe('tasks-and-decisions wrapper', () => {
	it('check ./tasks-and-decisions exports all the same variables as the original', () => {
		const original = require('@atlaskit/editor-plugin-tasks-and-decisions');
		const wrapper = require('../tasks-and-decisions/index');
		const originalKeys = Object.keys(original).sort();
		const wrapperKeys = Object.keys(wrapper).sort();
		expect(originalKeys).toEqual(wrapperKeys);
	});

	it('check ./tasks-and-decisions/tasks-and-decisions-plugin exports all the same variables as the original', () => {
		const original = require('@atlaskit/editor-plugin-tasks-and-decisions/tasks-and-decisions-plugin');
		const wrapper = require('../tasks-and-decisions/entry-points/tasks-and-decisions-plugin');
		const originalKeys = Object.keys(original).sort();
		const wrapperKeys = Object.keys(wrapper).sort();
		expect(originalKeys).toEqual(wrapperKeys);
	});

	it('check ./tasks-and-decisions/tasks-and-decisions-plugin-type exports all the same variables as the original', () => {
		const original = require('@atlaskit/editor-plugin-tasks-and-decisions/tasks-and-decisions-plugin-type');
		const wrapper = require('../tasks-and-decisions/entry-points/tasks-and-decisions-plugin-type');
		const originalKeys = Object.keys(original).sort();
		const wrapperKeys = Object.keys(wrapper).sort();
		expect(originalKeys).toEqual(wrapperKeys);
	});

	it('check ./tasks-and-decisions/types exports all the same variables as the original', () => {
		const original = require('@atlaskit/editor-plugin-tasks-and-decisions/types');
		const wrapper = require('../tasks-and-decisions/entry-points/types');
		const originalKeys = Object.keys(original).sort();
		const wrapperKeys = Object.keys(wrapper).sort();
		expect(originalKeys).toEqual(wrapperKeys);
	});
});
