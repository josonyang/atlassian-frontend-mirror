import { isConfluenceSlideUrl } from '../url-checkers';

describe('isConfluenceSlideUrl', () => {
	it.each<[string, string]>([
		['numeric content ID', 'https://hello.atlassian.net/wiki/spaces/TEAM/slide/6822455429'],
		[
			'user space with tilde',
			'https://hello.atlassian.net/wiki/spaces/~63749c02a593cb822e92b8ec/slide/6822455429',
		],
		[
			'UUID content ID',
			'https://hello.atlassian.net/wiki/spaces/TEAM/slide/8fb8c642-803d-59fe-8d1c-066610e860c6',
		],
		['with query params', 'https://hello.atlassian.net/wiki/spaces/TEAM/slide/6822455429?foo=bar'],
		['jira-dev host', 'https://pug.jira-dev.com/wiki/spaces/BT2/slide/452724424706'],
	])('should return true for a slide URL with %s', (_label, url) => {
		expect(isConfluenceSlideUrl(url)).toBe(true);
	});

	it.each<[string, string]>([
		['a whiteboard URL', 'https://hello.atlassian.net/wiki/spaces/TEAM/whiteboard/12345'],
		['a database URL', 'https://hello.atlassian.net/wiki/spaces/TEAM/database/12345'],
		['a regular page URL', 'https://hello.atlassian.net/wiki/spaces/TEAM/pages/12345'],
		['a Jira URL', 'https://hello.atlassian.net/browse/PROJ-123'],
		['an empty string', ''],
		[
			'a URL with slide in a different path position',
			'https://hello.atlassian.net/slide/wiki/spaces/TEAM/12345',
		],
		[
			'a URL with slide as a query param',
			'https://hello.atlassian.net/wiki/spaces/TEAM/pages/12345?type=slide',
		],
	])('should return false for %s', (_label, url) => {
		expect(isConfluenceSlideUrl(url)).toBe(false);
	});
});
