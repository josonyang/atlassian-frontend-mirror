/**
 * @jsxRuntime classic
 * @jsx jsx
 */
// eslint-disable-next-line @atlaskit/ui-styling-standard/use-compiled -- Ignored via go/DSP-18766
import { css, jsx } from '@emotion/react';
import VRTestWrapper from '../utils/vr-test-wrapper';
import RelatedLinksBaseModal from '../../src/view/RelatedLinksModal/components/RelatedLinksBaseModal';
import RelatedLinksResolvingView from '../../src/view/RelatedLinksModal/views/resolving';

export default () => (
	<VRTestWrapper
		overrideCss={css({
			height: '700px',
		})}
	>
		<RelatedLinksBaseModal onClose={() => {}} showModal={true}>
			<RelatedLinksResolvingView />
		</RelatedLinksBaseModal>
	</VRTestWrapper>
);
