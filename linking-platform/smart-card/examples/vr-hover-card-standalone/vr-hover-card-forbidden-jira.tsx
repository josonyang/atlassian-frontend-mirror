import React from 'react';

import { type JsonLd } from '@atlaskit/json-ld-types';
import { type CardProviderStoreOpts, SmartCardProvider as Provider } from '@atlaskit/link-provider';

import { getMockForbiddenDirectAccessResponse } from '../../src/view/HoverCard/__tests__/__mocks__/mocks';
import { HoverCardComponent } from '../../src/view/HoverCard/components/HoverCardComponent';
import VRTestWrapper from '../utils/vr-test-wrapper';

const mockUrl = 'https://www.mockurl.com';

const getStoreOptions = (
	accessType: string,
	visibility?: JsonLd.Primitives.Visibility,
): CardProviderStoreOpts => ({
	initialState: {
		[mockUrl]: {
			status: 'forbidden',
			lastUpdatedAt: 1624877833614,
			details: getMockForbiddenDirectAccessResponse(accessType, visibility),
			metadataStatus: 'resolved',
		},
	},
});

const ForbiddenHoverCard = ({
	accessType,
	visibility,
}: {
	accessType: string;
	visibility?: JsonLd.Primitives.Visibility;
}) => {
	const name = visibility ? `${accessType}-${visibility}` : accessType;
	return (
		<Provider storeOptions={getStoreOptions(accessType, visibility)}>
			<HoverCardComponent url={mockUrl} noFadeDelay={true}>
				<button data-testid={name}>{name}</button>
			</HoverCardComponent>
		</Provider>
	);
};

export default () => (
	<VRTestWrapper>
		<ForbiddenHoverCard accessType="DIRECT_ACCESS" />
		<ForbiddenHoverCard accessType="REQUEST_ACCESS" />
		<ForbiddenHoverCard accessType="PENDING_REQUEST_EXISTS" />
		<ForbiddenHoverCard accessType="DENIED_REQUEST_EXISTS" />
		<ForbiddenHoverCard accessType="ACCESS_EXISTS" visibility="not_found" />
		<ForbiddenHoverCard accessType="ACCESS_EXISTS" visibility="restricted" />
		<ForbiddenHoverCard accessType="FORBIDDEN" />
	</VRTestWrapper>
);
