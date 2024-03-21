import pick from 'lodash/pick';

import { Jast } from '../types';

import {
  printAstToDoc,
  PrintOptions as PrintAstToDocOptions,
} from './print-ast-to-doc';
import {
  printDocToString,
  PrintOptions as PrintDocToStringOptions,
} from './print-doc-to-string';

type PrintOptions = PrintAstToDocOptions & PrintDocToStringOptions;

/**
 * Print the provided AST object into a formatted JQL string.
 */
export const print = (jast: Jast, options: PrintOptions = {}): string => {
  return printDocToString(
    printAstToDoc(jast, pick(options, ['operatorCase'])),
    pick(options, ['printWidth']),
  );
};
