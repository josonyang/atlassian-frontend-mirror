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
          width: '100%',
          height: '100%',
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
          boxSizing: 'border-box',
          height: '100vh',
          display: 'flex',
          justifyContent: 'center',
          flexWrap: 'wrap',
        }}
        id="wrapper"
      >
        <div
          id="clickCounts"
          style={{
            position: 'absolute',
            zIndex: 200,
            alignSelf: 'center',
            justifySelf: 'center',
            fontSize: '3rem',
            backgroundColor: token('elevation.surface.overlay', 'white'),
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
