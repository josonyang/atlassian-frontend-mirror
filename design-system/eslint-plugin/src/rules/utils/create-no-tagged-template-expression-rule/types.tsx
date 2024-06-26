// Original source from Compiled https://github.com/atlassian-labs/compiled/blob/master/packages/eslint-plugin/src/utils/create-no-tagged-template-expression-rule/types.ts
export type Literal = {
	type: 'literal';
	value: string | number;
};

export type Expression = {
	type: 'expression';
	expression: string;
};

export type DeclarationValue = Literal | Expression;

export type Declaration = {
	type: 'declaration';
	property: string;
	value: DeclarationValue;
};

export type Rule = {
	type: 'rule';
	selector: string;
	declarations: Argument[];
};

export type Block = Declaration | Rule;

export type DeclarationBlock = {
	type: 'block';
	blocks: Block[];
};

export type Argument = Expression | DeclarationBlock;

export type RuleConfig = {
	importSources?: string[];
};
