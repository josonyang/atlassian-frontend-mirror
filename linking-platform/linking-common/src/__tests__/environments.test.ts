import { getResolverUrl } from '../environments';

describe('getResolverUrl', () => {
	it('should return a dev environment when passed a dev key', () => {
		expect(getResolverUrl('dev')).toBe('https://api-private.dev.atlassian.com/object-resolver');
		expect(getResolverUrl('development')).toBe(
			'https://api-private.dev.atlassian.com/object-resolver',
		);
	});

	it('should return a stg environment when passed a stg key', () => {
		expect(getResolverUrl('stg')).toBe('https://pug.jira-dev.com/gateway/api/object-resolver');
		expect(getResolverUrl('staging')).toBe('https://pug.jira-dev.com/gateway/api/object-resolver');
	});

	it('should return a prod environment when passed a prod key', () => {
		expect(getResolverUrl('prd')).toBe('https://api-private.atlassian.com/object-resolver');
		expect(getResolverUrl('prod')).toBe('https://api-private.atlassian.com/object-resolver');
		expect(getResolverUrl('production')).toBe('https://api-private.atlassian.com/object-resolver');
	});

	it('should return a the edge proxy url when no environment is passed', () => {
		expect(getResolverUrl()).toBe('/gateway/api/object-resolver');
	});

	it('should use custom baseUrl when provided', () => {
		expect(getResolverUrl('prod', 'https://trellis.coffee/gateway/api')).toBe(
			'https://trellis.coffee/gateway/api/object-resolver',
		);
	});
});
