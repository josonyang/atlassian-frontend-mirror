import {
  AbstractJastVisitor,
  Clause,
  CompoundClause,
  ListOperand,
  NotClause,
  Query,
  TerminalClause,
  ValueOperand,
} from '@atlaskit/jql-ast';

/**
 * Given an AST with parse errors, this visitor returns a valid query that is equivalent for hydration purposes
 * (i.e. just fields, operators and values). Resulting query is generated on a best-effort basis and depends on
 * a successful parser error recovery.
 *
 * Example 1:
 * - Original query: "assignee in (abc-123-def"
 * - Equivalent query: "assignee in (abc-123-def)"
 *
 * Example 2:
 * - Original query: "project = EM and status in (Done, currentUser(), EMPTY) and reporter in"
 * - Equivalent query: "project = EM and status in (Done)"
 */
export class ValidQueryVisitor extends AbstractJastVisitor<string> {
  visitQuery = (query: Query): string => {
    if (!query.where) {
      return '';
    }
    return query.where.accept(this);
  };

  visitCompoundClause = (compoundClause: CompoundClause): string => {
    return compoundClause.clauses
      .map((clause: Clause) => clause.accept(this))
      .filter(value => !!value)
      .join(' and ');
  };

  visitTerminalClause = (terminalClause: TerminalClause): string => {
    const { field, operator, operand } = terminalClause;
    if (!operator || !operand) {
      return '';
    }
    const operandValue = operand.accept(this);
    if (!operandValue) {
      return '';
    }
    return `${field.text} ${operator.value} ${operandValue}`;
  };

  visitNotClause = (notClause: NotClause): string => {
    return notClause.clause.accept(this);
  };

  visitValueOperand = (valueOperand: ValueOperand): string => {
    return valueOperand.text;
  };

  visitListOperand = (listOperand: ListOperand): string => {
    return `(${listOperand.values
      .map(value => value.accept(this))
      .filter(value => !!value)
      .join(', ')})`;
  };

  protected defaultResult(): string {
    return '';
  }
}
