import { avatar3 } from '../../images';

export const ConfluenceBlogPost = {
	meta: {
		visibility: 'restricted',
		access: 'granted',
		resourceType: 'blog',
		key: 'confluence-object-provider',
	},
	data: {
		'@context': {
			'@vocab': 'https://www.w3.org/ns/activitystreams#',
			atlassian: 'https://schema.atlassian.com/ns/vocabulary#',
			schema: 'http://schema.org/',
		},
		'@type': 'schema:BlogPosting',
		generator: {
			'@type': 'Application',
			'@id': 'https://www.atlassian.com/#Confluence',
			name: 'Confluence',
		},
		attributedTo: {
			'@type': 'Person',
			name: 'Eliza Pancake',
			icon: avatar3,
		},
		url: 'https://extranet.atlassian.com/pages/viewpage.action?pageId=3088533424',
		name: 'Founder Update 76: Hello, Trello!',
		summary: 'Today is a big day for Atlassian – we have entered into an agreement to buy Trello.',
	},
};

export const ConfluencePage = {
	meta: {
		visibility: 'restricted',
		access: 'granted',
		resourceType: 'page',
		key: 'confluence-object-provider',
	},
	data: {
		'@context': {
			'@vocab': 'https://www.w3.org/ns/activitystreams#',
			atlassian: 'https://schema.atlassian.com/ns/vocabulary#',
			schema: 'http://schema.org/',
		},
		'@type': 'schema:TextDigitalDocument',
		generator: {
			'@type': 'Application',
			'@id': 'https://www.atlassian.com/#Confluence',
			name: 'Confluence',
		},
		url: 'https://some/confluence/url',
		name: 'Tesla & Atlassian',
		summary: "Recently, we've been talking to Tesla about how they use JIRA. Read on!",
		'atlassian:ownedBy': {
			'@type': 'Person',
			name: 'Eliza Pancake',
			icon: avatar3,
		},
		'atlassian:reactCount': 7,
		'schema:commentCount': 12,
		updated: '2022-11-22T15:30:49.140+1100',
	},
};

export const ConfluenceTemplate = {
	meta: {
		visibility: 'restricted',
		access: 'granted',
		resourceType: 'template',
		key: 'confluence-object-provider',
	},
	data: {
		'@context': {
			'@vocab': 'https://www.w3.org/ns/activitystreams#',
			atlassian: 'https://schema.atlassian.com/ns/vocabulary#',
			schema: 'http://schema.org/',
		},
		'@type': 'atlassian:Template',
		generator: {
			'@type': 'Application',
			'@id': 'https://www.atlassian.com/#Confluence',
			name: 'Confluence',
		},
		url: 'https://some/confluence/url',
		name: 'Onboarding for new hires',
		summary: 'With a pre-populated checklist for all your newstarter needs 🔥',
	},
};

export const ConfluenceSpace = {
	meta: {
		visibility: 'restricted',
		access: 'granted',
		resourceType: 'space',
		key: 'confluence-object-provider',
	},
	data: {
		'@context': {
			'@vocab': 'https://www.w3.org/ns/activitystreams#',
			atlassian: 'https://schema.atlassian.com/ns/vocabulary#',
			schema: 'http://schema.org/',
		},
		'@type': 'atlassian:Project',
		generator: {
			'@type': 'Application',
			'@id': 'https://www.atlassian.com/#Confluence',
			name: 'Confluence',
		},
		icon: {
			'@type': 'Image',
			url: 'https://cdn2.iconfinder.com/data/icons/flaturici-set-4/512/rocket2-512.png',
		},
		url: 'https://some/space/url',
		name: 'Mars Mission',
		summary: 'The time has come to leave this planet...',
	},
};
