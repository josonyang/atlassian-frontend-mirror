import { type GetManualRulesResponse, type ManualRule, UserInputType } from './types';

const mockScope = { resources: [] };
export const mockRules: GetManualRulesResponse = {
	data: [
		{
			id: 0,
			name: 'Test rule 0 (no inputs)',
			ruleScope: mockScope,
			userInputs: [],
		},
		{
			id: 1,
			name: 'Test rule 1 (has inputs)',
			ruleScope: mockScope,
			userInputs: [
				{
					defaultValue: '',
					displayName: 'Test user input',
					inputType: UserInputType.TEXT,
					required: false,
					variableName: 'testUserInput',
				},
			],
		},
		{
			id: 2,
			name: 'Test rule 2 (has multiple inputs)',
			ruleScope: mockScope,
			userInputs: [
				{
					defaultValue: '',
					displayName: 'Text user input',
					inputType: UserInputType.TEXT,
					required: false,
					variableName: 'textUserInput',
				},
				{
					defaultValue: '',
					displayName: 'Number user input',
					inputType: UserInputType.NUMBER,
					required: false,
					variableName: 'numberUserInput',
				},
				{
					defaultValue: true,
					displayName: 'Boolean user input',
					inputType: UserInputType.BOOLEAN,
					required: false,
					variableName: 'booleanUserInput',
				},
				{
					defaultValue: [''],
					displayName: 'Dropdown user input',
					inputType: UserInputType.DROPDOWN,
					required: false,
					variableName: 'dropdownUserInput',
				},
				{
					defaultValue: '',
					displayName: 'Paragraph user input',
					inputType: UserInputType.PARAGRAPH,
					required: false,
					variableName: 'paragraphUserInput',
				},
			],
		},
	],
};

export const mockTransformedRules: ManualRule[] = [
	{
		...mockRules.data[0],
		userInputPrompts: mockRules.data[0].userInputs,
	},
	{
		...mockRules.data[1],
		userInputPrompts: mockRules.data[1].userInputs,
	},
	{
		...mockRules.data[2],
		userInputPrompts: mockRules.data[2].userInputs,
	},
];

export const mockGetUrl = 'https://test-api/get/rules';
export const mockInvokeUrl = 'https://test-api/invoke';
