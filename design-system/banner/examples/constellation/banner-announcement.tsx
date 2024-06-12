import React from 'react';

import Banner from '../../src';

const BannerAnnouncementExample = () => {
	return (
		<Banner appearance="announcement">
			We’re making changes to our server and Data Center products, including the end of sale for new
			server licenses on February 2, 2021 and the end of support for server on February 2, 2024.{' '}
			<a href="/components/banner/examples">Upcoming product changes</a>
		</Banner>
	);
};

export default BannerAnnouncementExample;
