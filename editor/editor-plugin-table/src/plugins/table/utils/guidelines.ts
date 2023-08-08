import { createFixedGuidelinesFromLengths } from '@atlaskit/editor-common/guideline';
import type { GuidelineConfig } from '@atlaskit/editor-common/guideline';
import {
  akEditorDefaultLayoutWidth,
  akEditorFullWidthLayoutWidth,
  akEditorWideLayoutWidth,
} from '@atlaskit/editor-shared-styles';

const numberOfLanesInDefaultLayoutWidth = 12;

const calculateGuidelineWidthsInDefaultLayoutWidth = () => {
  let widths: number[] = [];
  for (let i = 0; i <= numberOfLanesInDefaultLayoutWidth / 2; i++) {
    widths.push(
      (akEditorDefaultLayoutWidth / numberOfLanesInDefaultLayoutWidth) * i * 2,
    );
  }
  return widths;
};

export const defaultGuidelineWidths = [
  ...calculateGuidelineWidthsInDefaultLayoutWidth(),
  akEditorDefaultLayoutWidth,
  akEditorWideLayoutWidth,
  akEditorFullWidthLayoutWidth,
];

export const defaultGuidelines = createFixedGuidelinesFromLengths(
  defaultGuidelineWidths,
) as GuidelineConfig[];