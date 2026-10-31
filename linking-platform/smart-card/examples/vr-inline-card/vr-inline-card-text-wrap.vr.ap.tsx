/**
 * @jsxRuntime classic
 * @jsx jsx
 */
import { css, jsx } from '@compiled/react';

import { SmartCardProvider } from '@atlaskit/link-provider/smart-card-provider';

import { InlineCardResolvedView as ResolvedView } from '../../src/view/InlineCard/ResolvedView';
import { VRTestCase } from '../utils/common';

const styles = css({
	maxWidth: '50px',
});

export default (): JSX.Element => {
	return (
		<VRTestCase title="Inline card text wrap">
			{() => (
				<SmartCardProvider>
					<div css={styles}>
						<ResolvedView
							isSelected={false}
							icon={'broken-url'}
							title="hyphens - CSS: Cascading Style Sheets | MDN"
							lozenge={{
								text: 'in progress',
								appearance: 'inprogress',
							}}
						/>
					</div>
				</SmartCardProvider>
			)}
		</VRTestCase>
	);
};
