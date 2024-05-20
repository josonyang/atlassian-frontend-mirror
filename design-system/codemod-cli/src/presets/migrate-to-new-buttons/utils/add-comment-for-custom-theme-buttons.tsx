import type { API, Collection } from 'jscodeshift';
import { addCommentBefore } from '@atlaskit/codemod-utils';

import { entryPointsMapping, customThemeButtonComment } from './constants';

export const addCommentForCustomThemeButtons = (
  fileSource: Collection<any>,
  j: API['jscodeshift'],
) => {
  let customThemeButtonImportName: string | undefined;
  fileSource
    .find(j.ImportDeclaration)
    .filter(
      (path) => path.node.source.value === entryPointsMapping.CustomThemeButton,
    )
    ?.forEach((path) => {
      path.node.specifiers?.forEach((specifier) => {
        if (specifier.type === 'ImportDefaultSpecifier') {
          customThemeButtonImportName = specifier.local?.name;
        }
      });
    });
  if (!customThemeButtonImportName) {
    return;
  }

  const customThemeButtonElement = fileSource
    .find(j.JSXElement)
    .filter(
      (path) =>
        path.value.openingElement.name.type === 'JSXIdentifier' &&
        path.value.openingElement.name.name === customThemeButtonImportName,
    );

  if (!customThemeButtonElement.length) {
    return;
  }

  addCommentBefore(
    j,
    j(customThemeButtonElement.get(0).node.openingElement),
    customThemeButtonComment,
    'line',
  );
};
