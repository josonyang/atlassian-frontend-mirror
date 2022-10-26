import type { Rule } from 'eslint';
import {
  callExpression,
  Identifier,
  identifier,
  isNodeOfType,
  literal,
  node as nodeFn,
  property,
} from 'eslint-codemod-utils';

import spacingScale from '@atlaskit/tokens/spacing-raw';

import { isDecendantOfGlobalToken } from '../utils/is-node';

const spacingValueToToken = Object.fromEntries(
  spacingScale.map((token) => [token.value, token.name]),
);

/**
 * @example
 * ```
 * '8px' => token('spacing.scale.100', '8px')
 * ```
 */
function pixelValueToSpacingTokenNode(pixelValueString: string) {
  return callExpression({
    callee: identifier({ name: 'token' }),
    arguments: [
      literal({
        value: `'${spacingValueToToken[pixelValueString] ?? ''}'`,
      }),
      literal(`'${pixelValueString}'`),
    ],
    optional: false,
  });
}

import {
  convertHyphenatedNameToCamelCase,
  emToPixels,
  getValue,
  getValueFromShorthand,
  isSpacingProperty,
  isValidSpacingValue,
} from './utils';

const rule: Rule.RuleModule = {
  meta: {
    type: 'problem',
    fixable: 'code',
    docs: {
      description:
        'Rule ensures all spacing CSS properties apply a matching spacing token',
      recommended: true,
    },
    messages: {
      noMarginProperties:
        'The use of margin is considered a dangerous as it breaks the component model. Prefer the application of `gap` via CSS Flexbox or Grid to achieve the same result and control the layout from the parent.',
      noRawSpacingValues:
        'The use of spacing primitives or tokens is preferred over the direct application of spacing properties.\n\n@meta <<{{payload}}>>',
    },
  },
  create(context) {
    return {
      // CSSObjectExpression
      // const styles = css({ color: 'red', margin: '4px' })
      'CallExpression[callee.name=css] > ObjectExpression': (
        parentNode: Rule.Node,
      ) => {
        if (!isNodeOfType(parentNode, 'ObjectExpression')) {
          return;
        }

        /**
         * We do this in case the fontSize for a style object is declared alongside the `em` or `lineHeight` declaration
         */
        const fontSizeNode = parentNode.properties.find((node) => {
          if (!isNodeOfType(node, 'Property')) {
            return;
          }

          if (!isNodeOfType(node.key, 'Identifier')) {
            return;
          }

          return node.key.name === 'fontSize';
        });

        const fontSizeValue = getValue(
          // @ts-ignore
          isNodeOfType(fontSizeNode, 'Property') && fontSizeNode.value,
          context,
        );

        const fontSize = Array.isArray(fontSizeValue)
          ? fontSizeValue[0]
          : fontSizeValue;

        parentNode.properties.forEach((node) => {
          if (!isNodeOfType(node, 'Property')) {
            return;
          }

          if (!isNodeOfType(node.key, 'Identifier')) {
            return;
          }

          if (!isSpacingProperty(node.key.name)) {
            return;
          }

          if (isDecendantOfGlobalToken(node.value)) {
            return;
          }

          if (
            node.value.type === 'Literal' &&
            !isValidSpacingValue(node.value.value, fontSize)
          ) {
            context.report({
              node,
              messageId: 'noRawSpacingValues',
              data: {
                payload: `NaN:${node.value.value}`,
              },
            });
            return;
          }

          const value = getValue(node.value, context);

          // value is either NaN or it can't be resolved eg, em, 100% etc...
          if (!(value && isValidSpacingValue(value, fontSize))) {
            return context.report({
              node,
              messageId: 'noRawSpacingValues',
              data: {
                payload: `NaN:${value}`,
              },
            });
          }

          const values = Array.isArray(value) ? value : [value];

          // value is a single value so we can apply a more robust approach to our fix
          if (values.length === 1) {
            const [value] = values;
            const pixelValue = emToPixels(value, fontSize);
            return context.report({
              node,
              messageId: 'noRawSpacingValues',
              data: {
                payload: `${(node.key as Identifier).name}:${pixelValue}`,
              },
              fix: (fixer) => {
                if (!/padding|margin|gap/.test((node.key as Identifier).name)) {
                  return null;
                }

                const pixelValueString = `${pixelValue}px`;
                const tokenName = spacingValueToToken[pixelValueString];

                if (!tokenName) {
                  return null;
                }

                return [
                  fixer.insertTextBefore(
                    node,
                    `// TODO Delete this comment after verifying spacing token -> previous value \`${nodeFn(
                      node.value,
                    )}\`\n${' '.padStart(node.loc?.start.column || 0)}`,
                  ),
                  fixer.replaceText(
                    node,
                    property({
                      ...node,
                      value: pixelValueToSpacingTokenNode(pixelValueString),
                    }).toString(),
                  ),
                ];
              },
            });
          }

          /**
           * Compound values are hard to deal with / replace because we need to find/replace strings inside an
           * estree node.
           *
           * @example
           * { padding: '8px 0px' } // two values we don't try and apply the fixer
           */
          values.forEach((val, index) => {
            const pixelValue = emToPixels(val, fontSize);
            context.report({
              node,
              messageId: 'noRawSpacingValues',
              data: {
                payload: `${(node.key as Identifier).name}:${pixelValue}`,
              },
              fix:
                index === 0
                  ? (fixer) => {
                      const allResolvableValues = values.every(
                        (value) => !Number.isNaN(emToPixels(value, fontSize)),
                      );
                      if (!allResolvableValues) {
                        return null;
                      }
                      return fixer.replaceText(
                        node.value,
                        `\`${values
                          .map((value) => {
                            const pixelValue = emToPixels(value, fontSize);
                            const pixelValueString = `${pixelValue}px`;
                            return `\${${pixelValueToSpacingTokenNode(
                              pixelValueString,
                            )}}`;
                          })
                          .join(' ')}\``,
                      );
                    }
                  : undefined,
            });
          });
        });
      },

      // CSSTemplateLiteral and StyledTemplateLiteral
      // const cssTemplateLiteral = css`color: red; padding: 12px`;
      // const styledTemplateLiteral = styled.p`color: red; padding: 8px`;
      'TaggedTemplateExpression[tag.name="css"],TaggedTemplateExpression[tag.object.name="styled"]': (
        node: Rule.Node,
      ) => {
        if (node.type !== 'TaggedTemplateExpression') {
          return;
        }

        const combinedString = node.quasi.quasis
          .map((q, i) => {
            return `${q.value.raw}${
              node.quasi.expressions[i]
                ? getValue(node.quasi.expressions[i], context)
                : ''
            }`;
          })
          .join('');
        /**
         * Attempts to remove all non-essential words & characters from a style block.
         * Including selectors and queries
         * Adapted from ensure-design-token-usage
         */
        const cssProperties = combinedString
          .split('\n')
          .filter((line) => !line.trim().startsWith('@'))
          .join('\n')
          .replace(/\n/g, '')
          .split(/;|{|}/)
          .map((el) => el.trim() || '');

        cssProperties.forEach((style) => {
          const [rawProperty, value] = style.split(':');
          const property = convertHyphenatedNameToCamelCase(rawProperty);

          if (!isSpacingProperty(property)) {
            return;
          }

          if (!isValidSpacingValue(value)) {
            return context.report({
              node,
              messageId: 'noRawSpacingValues',
              data: {
                payload: `NaN:${value}`,
              },
            });
          }

          const values = getValueFromShorthand(value);
          for (const val of values) {
            // could be array of values e.g. padding: 8px 12px 3px
            context.report({
              node,
              messageId: 'noRawSpacingValues',
              data: {
                payload: `${property}:${val}`,
              },
            });
          }
        });
      },
    };
  },
};

export default rule;