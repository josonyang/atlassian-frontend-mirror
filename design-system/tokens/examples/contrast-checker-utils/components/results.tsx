/** @jsx jsx */
import { Fragment, useMemo, useState } from 'react';

import { jsx } from '@emotion/react';
import { VariableSizeList as List } from 'react-window';

import Button from '@atlaskit/button';
import { Checkbox } from '@atlaskit/checkbox';
import Heading from '@atlaskit/heading';
import { Box, Inline, Stack, xcss } from '@atlaskit/primitives';
import SectionMessage from '@atlaskit/section-message';

import rawTokensDark from '../../../src/artifacts/tokens-raw/atlassian-dark';
import rawTokensLight from '../../../src/artifacts/tokens-raw/atlassian-light';
import checkThemePairContrasts, {
  darkResults,
  lightResults,
} from '../utils/check-pair-contrasts';
import { downloadResultsAsCSV } from '../utils/csv-generator';
import { ColorMode, Theme, TokenName } from '../utils/types';

import Accordion from './accordion';
import { baseTokens } from './base-token-editor';
import ContrastCard from './contrast-card';

type ResultsAccordionDisplayProps = {
  appearance: 'information' | 'warning' | 'danger' | 'success';
  description: string;
  resultList: string[];
};

const STANDARD_RESULT_HEIGHT = 88;
const TRANSPARENT_RESULT_HEIGHT = 128;
const ACCORDION_MAX_HEIGHT = 500;

/**
 * Displays contrast check results in an accordion, with cards for
 * each result. Takes some appearance properties and a list of results to display
 */
const ResultsAccordion = ({
  appearance,
  description,
  resultList,
  baseThemeType,
  customTheme,
  rawTokensCustom,
  resultsBaseTheme,
  resultsCustom,
}: ResultsAccordionDisplayProps & {
  baseThemeType: ColorMode;
  customTheme: Theme;
  rawTokensCustom: typeof rawTokensLight;
  resultsBaseTheme: typeof lightResults;
  resultsCustom: typeof lightResults;
}) => {
  const PairingCard = ({ index, style }: { index: number; style: any }) => {
    const pairing = resultList[index];
    const { foreground, middleLayer, background } =
      resultsBaseTheme.fullResults[pairing];
    return (
      <ContrastCard
        key={pairing}
        style={style}
        foregroundName={foreground as TokenName}
        middleLayerName={middleLayer as TokenName}
        backgroundName={background as TokenName}
        foregroundValue={
          rawTokensCustom.find((token) => token.cleanName === foreground)
            ?.value as string
        }
        middleLayerValue={
          rawTokensCustom.find((token) => token.cleanName === middleLayer)
            ?.value as string
        }
        backgroundValue={
          rawTokensCustom.find((token) => token.cleanName === background)
            ?.value as string
        }
        contrastBase={resultsBaseTheme.fullResults[
          pairing
        ].contrast.toPrecision(4)}
        baseThemeType={baseThemeType}
        contrastCustom={
          customTheme.length
            ? resultsCustom?.fullResults[pairing].contrast.toPrecision(4)
            : undefined
        }
      />
    );
  };

  function getItemSize(index: number) {
    return resultsBaseTheme.fullResults[resultList[index]].middleLayer
      ? TRANSPARENT_RESULT_HEIGHT
      : STANDARD_RESULT_HEIGHT;
  }
  return (
    <Accordion
      appearance={appearance}
      description={description}
      size={resultList.length}
    >
      <List
        height={Math.min(
          TRANSPARENT_RESULT_HEIGHT * resultList.length,
          ACCORDION_MAX_HEIGHT,
        )}
        innerElementType="ul" // TODO is this the right semantics for a virtual list?
        itemCount={resultList.length}
        itemSize={getItemSize}
        width="100%"
      >
        {PairingCard}
      </List>
    </Accordion>
  );
};

/**
 * A contrast checker, and results display.
 * Takes a custom theme and custom base tokens, and checks each pair of tokens for expected contrast, using
 * the list of generated pairs generated at build time.
 * Results are displayed in groups, with basic filtering options and an option to download as CSV.
 */
const Results = ({
  customTheme,
  customBaseTokens,
  baseThemeType,
}: {
  customTheme: Theme;
  customBaseTokens: typeof baseTokens;
  baseThemeType: ColorMode;
}) => {
  const [includeTransparencies, setIncludeTransparencies] =
    useState<boolean>(false);
  const [includeInteractions, setIncludeInteractions] = useState<boolean>(true);

  const baseRawTokens =
    baseThemeType === 'light' ? rawTokensLight : rawTokensDark;
  const resultsBaseTheme =
    baseThemeType === 'light' ? lightResults : darkResults;

  // Generate custom theme from input
  const rawTokensCustom = useMemo(() => {
    const rawTokens: typeof rawTokensLight = JSON.parse(
      JSON.stringify(baseRawTokens),
    );
    rawTokens.forEach((token) => {
      // set metadata based on custom theme value (base token or raw hex)
      const index = customTheme.findIndex((t) => t?.name === token?.cleanName);
      if (index !== -1) {
        // If a base token has been chosen, update metadata
        if (Object.keys(baseTokens).includes(customTheme[index].value)) {
          token.original.value = customTheme[index].value;
          token.value = baseTokens[customTheme[index].value as string];
        } else {
          token.value = customTheme[index].value;
        }
      }
      // Update value if the chosen base token has been customized
      if (token.attributes.group === 'paint') {
        const baseTokenValue =
          customBaseTokens[token?.original?.value as string];
        if (baseTokenValue) {
          token.value = baseTokenValue;
        }
      }
    });
    return rawTokens;
  }, [customTheme, customBaseTokens, baseRawTokens]);

  // Generate results (should be debounced)
  const resultsCustom = useMemo(() => {
    var results: typeof lightResults | undefined;
    try {
      results = checkThemePairContrasts(rawTokensCustom, 'custom');
    } catch (e) {
      console.error(e);
    }
    return results;
  }, [rawTokensCustom]);

  // Generate list of new violations in custom theme
  const betterContrast: string[] = [];
  const worseContrast: string[] = [];
  const newViolations: string[] = [];
  const solvedViolations: string[] = [];
  const bothViolations: string[] = [];
  const bothPassing: string[] = [];

  if (resultsCustom && resultsCustom.fullResults) {
    Object.keys(resultsCustom.fullResults).forEach((combination) => {
      if (
        (!includeTransparencies &&
          resultsBaseTheme.fullResults[combination].middleLayer !==
            undefined) ||
        (!includeInteractions &&
          resultsBaseTheme.fullResults[combination].isInteraction)
      ) {
        return;
      }
      const combinationBase = resultsBaseTheme.fullResults[combination];
      const combinationCustom = (resultsCustom as typeof resultsBaseTheme)
        .fullResults[combination];
      if (combinationCustom.contrast > combinationBase.contrast) {
        betterContrast.push(combination);
      }
      if (combinationCustom.contrast < combinationBase.contrast) {
        worseContrast.push(combination);
      }
      if (
        combinationBase.meetsRequiredContrast === 'FAIL' &&
        combinationCustom.meetsRequiredContrast === 'PASS'
      ) {
        solvedViolations.push(combination);
      }
      if (
        combinationBase.meetsRequiredContrast === 'PASS' &&
        combinationCustom.meetsRequiredContrast === 'FAIL'
      ) {
        newViolations.push(combination);
      }
      if (
        combinationBase.meetsRequiredContrast === 'FAIL' &&
        combinationCustom.meetsRequiredContrast === 'FAIL'
      ) {
        bothViolations.push(combination);
      }
      if (
        combinationBase.meetsRequiredContrast === 'PASS' &&
        combinationCustom.meetsRequiredContrast === 'PASS'
      ) {
        bothPassing.push(combination);
      }
    });
  }

  const ResultsAccordionData = ({
    appearance,
    description,
    resultList,
  }: ResultsAccordionDisplayProps) => {
    return (
      <ResultsAccordion
        appearance={appearance}
        description={description}
        resultList={resultList}
        baseThemeType={baseThemeType}
        customTheme={customTheme}
        rawTokensCustom={rawTokensCustom}
        resultsBaseTheme={resultsBaseTheme}
        resultsCustom={resultsCustom as typeof resultsBaseTheme}
      ></ResultsAccordion>
    );
  };

  return (
    <Stack space="space.200">
      <Inline spread="space-between">
        <Heading level="h800">Results:</Heading>
        <Button
          onClick={() => {
            const fullCustomResults =
              customTheme.length > 0
                ? checkThemePairContrasts(rawTokensCustom, 'custom', true)
                : undefined;
            downloadResultsAsCSV(fullCustomResults?.fullResults);
          }}
        >
          Download CSV
        </Button>
      </Inline>
      <p>
        Checking WCAG 2.1 contrast for "recommended pairings" of tokens,
        automatically generated by the <code>typescript-token-pairings</code>{' '}
        formatter.
      </p>
      <SectionMessage appearance="discovery" title="This tool is in beta">
        Some pairs of tokens listed below may not require the listed contrast,
        and some valid pairings may be missing.
      </SectionMessage>
      <Inline shouldWrap={true} space="space.200">
        <Checkbox
          value="include_interactions"
          label="Include interaction tokens"
          isChecked={includeInteractions}
          onChange={(e) => setIncludeInteractions(e.target.checked)}
          name="include_interactions"
        />
        <Checkbox
          value="include_transparencies"
          label="Include transparent tokens"
          isChecked={includeTransparencies}
          onChange={(e) => setIncludeTransparencies(e.target.checked)}
          name="include_transparencies"
        />
      </Inline>
      {resultsCustom ? (
        <Fragment>
          <Box xcss={xcss({ overflow: 'auto', height: '100%' })}>
            <Stack space="space.200">
              {(customTheme.length > 0 ||
                Object.keys(customBaseTokens).length > 0) && (
                <Fragment>
                  <ResultsAccordionData
                    appearance="danger"
                    description="Pairings that now breach:"
                    resultList={newViolations}
                  />
                  <ResultsAccordionData
                    appearance="success"
                    description="Pairings that no longer breach:"
                    resultList={solvedViolations}
                  />
                  <ResultsAccordionData
                    appearance="success"
                    description="Pairings with better contrast:"
                    resultList={betterContrast}
                  />
                  <ResultsAccordionData
                    appearance="warning"
                    description="Pairings with worse contrast:"
                    resultList={worseContrast}
                  />
                </Fragment>
              )}
              <ResultsAccordionData
                appearance="warning"
                description={
                  customTheme.length > 0
                    ? 'Failing in both'
                    : 'Failing contrast'
                }
                resultList={bothViolations}
              />
              <ResultsAccordionData
                appearance="success"
                description={
                  customTheme.length > 0
                    ? 'Passing in both'
                    : 'Passing contrast'
                }
                resultList={bothPassing}
              />
            </Stack>
          </Box>
        </Fragment>
      ) : (
        <SectionMessage appearance="warning" title="Invalid theme provided">
          Check the syntax of your custom theme
        </SectionMessage>
      )}
    </Stack>
  );
};

export default Results;