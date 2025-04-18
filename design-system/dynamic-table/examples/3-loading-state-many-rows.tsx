import React, { useState } from 'react';

import Button from '@atlaskit/button/new';
import { DynamicTableStateless } from '@atlaskit/dynamic-table';

import { head, rows } from './content/sample-data';

const LoadingLargePageExample = () => {
	const [isLoading, setIsLoading] = useState(true);
	return (
		<div>
			<Button onClick={() => setIsLoading((loading) => !loading)} testId="toggle-loading">
				Toggle loading
			</Button>
			<DynamicTableStateless
				head={head}
				rows={rows}
				rowsPerPage={20}
				page={1}
				isLoading={isLoading}
				testId="the-table"
			/>
		</div>
	);
};

export default LoadingLargePageExample;
