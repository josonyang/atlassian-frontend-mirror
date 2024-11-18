import React from 'react';

import { SuccessProgressBar } from '@atlaskit/progress-bar';

const SuccessProgressBarIncompleteExample = () => {
	return <SuccessProgressBar ariaLabel="Done: 8 of 10 issues" value={0.8} />;
};

export default SuccessProgressBarIncompleteExample;
