/**
 * @jsxRuntime classic
 * @jsx jsx
 */
import { useMemo } from 'react';

import { cssMap, jsx } from '@compiled/react';
import { type MessageDescriptor, useIntl } from 'react-intl-next';

import { Box } from '@atlaskit/primitives/compiled';
import Select, { type OptionType, type ValueType } from '@atlaskit/select';
import { token } from '@atlaskit/tokens';

import type { Site } from '../../../../common/types';

import { siteSelectorMessages } from './messages';

const styles = cssMap({
	dropdownContainerStyles: {
		display: 'flex',
		alignItems: 'center',
		gap: token('space.100'),
		minHeight: '40px', // to prevent vertical shifting when site selector pops in
	},
});

export interface SiteSelectorProps {
	availableSites: Site[] | undefined;
	onSiteSelection: (selectedSite: Site) => void;
	label: MessageDescriptor;
	selectedSite?: Site;
	testId: string;
}

export const SiteSelector = (props: SiteSelectorProps) => {
	const { availableSites, onSiteSelection, selectedSite, label, testId } = props;

	const { formatMessage } = useIntl();

	const onChange = (newValue: ValueType<OptionType>) => {
		const selectedSite = availableSites?.find((site) => site.cloudId === newValue?.value);

		if (selectedSite) {
			onSiteSelection(selectedSite);
		}
	};

	const availableSitesOptions = useMemo(
		() =>
			availableSites?.map((site) => ({
				label: site.displayName,
				value: site.cloudId,
			})),
		[availableSites],
	);

	const selectedSiteOption = selectedSite && {
		label: selectedSite.displayName,
		value: selectedSite.cloudId,
	};

	return (
		<Box xcss={styles.dropdownContainerStyles}>
			{formatMessage(label)}
			{availableSites && availableSites.length > 1 && (
				<span data-testid={`${testId}--trigger`}>
					<Select
						classNamePrefix={testId}
						isLoading={!availableSites}
						onChange={onChange}
						options={availableSitesOptions}
						placeholder={formatMessage(siteSelectorMessages.chooseSite)}
						styles={{
							container: (css) => ({
								...css,
								font: token('font.body'),
								// eslint-disable-next-line @atlaskit/ui-styling-standard/no-imported-style-values, @atlaskit/ui-styling-standard/no-unsafe-values -- Ignored via go/DSP-18766
								zIndex: 11,
							}),
							// prevents the popup menu with available sites from being too narrow
							// if the selected site is much shorter than the other options
							menu: ({ width, ...css }) => ({
								...css,
								minWidth: '100%',
								width: 'max-content',
								// font-weight has to be overridden here so that it gets applied after the font styles in teh css element above
								fontWeight: token('font.weight.medium', '500'),
							}),
							valueContainer: ({ width, ...css }) => ({
								...css,
								// font-weight has to be overridden here so that it gets applied after the font styles in teh css element above
								fontWeight: token('font.weight.medium', '500'),
							}),
						}}
						testId={testId}
						value={selectedSiteOption}
						label={formatMessage(siteSelectorMessages.chooseSite)}
					/>
				</span>
			)}
		</Box>
	);
};
