/**
 * @jsxRuntime classic
 * @jsx jsx
 */
import { useCallback, useState } from 'react';

// eslint-disable-next-line @atlaskit/ui-styling-standard/use-compiled -- Ignored via go/DSP-18766
import { jsx } from '@emotion/react';
import { type JsonLd } from 'json-ld-types';

import Button from '@atlaskit/button/new';
import { CardClient as Client, SmartCardProvider as Provider } from '@atlaskit/link-provider';
import { type CardStore } from '@atlaskit/linking-common';
import { Card } from '@atlaskit/smart-card';

import { BitbucketFile1 } from '../examples-helpers/_jsonLDExamples';

import { VRTestWrapper } from './utils/vr-test';

class CustomClient extends Client {
	fetchData() {
		return Promise.resolve(BitbucketFile1 as JsonLd.Response<JsonLd.Data.Document>);
	}
}

export default () => {
	const [initialState, setInitialState] = useState<CardStore>({});
	const resetInitialStoreState = useCallback(() => {
		setInitialState({});
	}, [setInitialState]);
	return (
		<VRTestWrapper title="Edge case: reload links when redux store is has been reset">
			<Provider client={new CustomClient('staging')} storeOptions={{ initialState }}>
				<Button
					testId={'reset-redux-store-button'}
					appearance={'primary'}
					onClick={resetInitialStoreState}
				>
					Reset store initial state
				</Button>
				<br />
				<br />
				<Card
					appearance="inline"
					testId="inline-card"
					url={'https://bitbucket.org/atlassian/atlassian-frontend/src/master/README.md'}
				/>
			</Provider>
		</VRTestWrapper>
	);
};
