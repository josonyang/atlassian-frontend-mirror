import React, { useState } from 'react';
import { token } from '@atlaskit/tokens';
import {
	createFileDetails,
	createIdentifier,
	FileStateFactory,
} from '@atlaskit/media-test-helpers';
import { MainWrapper } from '../example-helpers';
import { Card } from '../src/card/card';

const identifier = createIdentifier();
const fileStateFactory = new FileStateFactory(identifier, {
	fileDetails: createFileDetails(identifier.id, 'image'),
});
fileStateFactory.next('processed');

export default () => {
	const [clickCount, setClickCount] = useState(0);
	const renderCardsAt = [0, 2, 4, 20, 24, 40, 42, 44];
	const TestButton = ({ children }: { children: React.ReactNode }) => {
		return (
			<button
				style={{
					// eslint-disable-next-line @atlaskit/ui-styling-standard/enforce-style-prop -- Ignored via go/DSP-18766
					width: '100%',
					// eslint-disable-next-line @atlaskit/ui-styling-standard/enforce-style-prop -- Ignored via go/DSP-18766
					height: '100%',
					// eslint-disable-next-line @atlaskit/ui-styling-standard/enforce-style-prop -- Ignored via go/DSP-18766
					boxSizing: 'border-box',
				}}
				onClick={() => setClickCount((prevclickCount) => prevclickCount + 1)}
			>
				{children}
			</button>
		);
	};

	return (
		<MainWrapper disableFeatureFlagWrapper={true} developmentOnly>
			<div
				style={{
					// eslint-disable-next-line @atlaskit/ui-styling-standard/enforce-style-prop -- Ignored via go/DSP-18766
					boxSizing: 'border-box',
					// eslint-disable-next-line @atlaskit/ui-styling-standard/enforce-style-prop -- Ignored via go/DSP-18766
					height: '100vh',
					// eslint-disable-next-line @atlaskit/ui-styling-standard/enforce-style-prop -- Ignored via go/DSP-18766
					display: 'flex',
					// eslint-disable-next-line @atlaskit/ui-styling-standard/enforce-style-prop -- Ignored via go/DSP-18766
					justifyContent: 'center',
					// eslint-disable-next-line @atlaskit/ui-styling-standard/enforce-style-prop -- Ignored via go/DSP-18766
					flexWrap: 'wrap',
				}}
				id="wrapper"
			>
				{/* eslint-disable-next-line jsx-a11y/click-events-have-key-events, jsx-a11y/no-static-element-interactions, @atlassian/a11y/interactive-element-not-keyboard-focusable */}
				<div
					id="clickCounts"
					style={{
						// eslint-disable-next-line @atlaskit/ui-styling-standard/enforce-style-prop -- Ignored via go/DSP-18766
						position: 'absolute',
						// eslint-disable-next-line @atlaskit/ui-styling-standard/enforce-style-prop -- Ignored via go/DSP-18766
						zIndex: 200,
						// eslint-disable-next-line @atlaskit/ui-styling-standard/enforce-style-prop -- Ignored via go/DSP-18766
						alignSelf: 'center',
						// eslint-disable-next-line @atlaskit/ui-styling-standard/enforce-style-prop -- Ignored via go/DSP-18766
						justifySelf: 'center',
						// eslint-disable-next-line @atlaskit/ui-styling-standard/enforce-style-prop -- Ignored via go/DSP-18766
						fontSize: '3rem',
						// eslint-disable-next-line @atlaskit/ui-styling-standard/enforce-style-prop -- Ignored via go/DSP-18766
						backgroundColor: token('elevation.surface.overlay', 'white'),
						// eslint-disable-next-line @atlaskit/ui-styling-standard/enforce-style-prop -- Ignored via go/DSP-18766
						padding: token('space.600', '3rem'),
					}}
					onClick={() => setClickCount(clickCount + 1)}
				>
					{clickCount}
				</div>
				{Array(45)
					.fill('button')
					.map((value, index) => {
						const id = `${value}-${index}`;
						return (
							// eslint-disable-next-line @atlaskit/ui-styling-standard/enforce-style-prop -- Ignored via go/DSP-18766
							<div style={{ width: '20%' }} key={id} id={`itemNumber${index}`}>
								{renderCardsAt.includes(index) ? (
									<Card
										mediaClient={fileStateFactory.mediaClient}
										identifier={identifier}
										dimensions={{ width: '100%', height: '100%' }}
									/>
								) : (
									<TestButton key={id}>{id}</TestButton>
								)}
							</div>
						);
					})}
			</div>
		</MainWrapper>
	);
};
