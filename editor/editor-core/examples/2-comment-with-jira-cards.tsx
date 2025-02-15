/* eslint-disable no-console */

import React from 'react';

import { EditorCardProvider } from '@atlaskit/editor-card-provider';
import { extensionHandlers } from '@atlaskit/editor-test-helpers/extensions';
import { CardClient, SmartCardProvider } from '@atlaskit/link-provider';

import { Editor } from '../src';
import EditorContext from '../src/ui/EditorContext';

// Ignored via go/ees005
// eslint-disable-next-line require-unicode-regexp
const jiraUrlMatch = /https?\:\/\/[a-zA-Z0-9]+\.atlassian\.net\/browse\//i;

/**
 * This class is responsible for telling the editor which URLs
 * can be converted to a card.
 */
export class JiraCardProvider extends EditorCardProvider {
	/**
	 * This method must resolve to a valid ADF that will be used to
	 * replace a blue link after user pastes URL.
	 */
	async resolve(...args: Parameters<EditorCardProvider['resolve']>): Promise<any> {
		const [url] = args;
		// This example uses a regex .match() but we could use a backend call here
		if (url.match(jiraUrlMatch)) {
			return {
				type: 'inlineCard', // we always want inline cards for Jira issues
				attrs: {
					url,
				},
			};
		}

		// If the URL doesn't look like something we should handle, try native provider
		return super.resolve.apply(this, args);
	}
}

/**
 * A Client is responsible for resolving URL to JSON-LD with metadata
 */
export class JiraCardClient extends CardClient {
	fetchData(url: string): ReturnType<CardClient['fetchData']> {
		if (!url.match(jiraUrlMatch)) {
			// This doesn't look like Jira URL, so let's use native resolver
			return super.fetchData(url);
		}

		// In this example, we will use mock response, but in real implementation
		// we would probably use window.fetch() to resolve the url and then map
		// it to JSON-LD format. To read more about the format, please visit:
		//   https://product-fabric.atlassian.net/wiki/spaces/CS/pages/615126630/Task
		//
		return new Promise((resolve) => {
			// We simulate a 2s load time
			window.setTimeout(() => {
				resolve({
					meta: {
						visibility: 'restricted',
						access: 'granted',
						auth: [],
						definitionId: 'jira-native-resolve',
					},
					data: {
						'@context': {
							'@vocab': 'https://www.w3.org/ns/activitystreams#',
							atlassian: 'https://schema.atlassian.com/ns/vocabulary#',
							schema: 'http://schema.org/',
						},
						'@type': ['atlassian:Task', 'Object'],
						name: 'PC-4820: Smart Card in Fabric Editor integration',
						tag: {
							'@type': 'Object',
							name: 'Shipped',
						},
						url,
					},
				});
			}, 2000);
		});
	}
}

const jiraClient = new JiraCardClient();
const cardProvider = new JiraCardProvider();

export default function CommentWithJiraCardsExample() {
	return (
		<EditorContext>
			<div>
				{/* We must wrap the <Editor> with a provider, passing jiraClient via prop */}
				<SmartCardProvider client={jiraClient}>
					<Editor
						appearance="comment"
						placeholder="What do you want to say?"
						shouldFocus={true}
						quickInsert={true}
						allowTextColor={true}
						allowRule={true}
						allowTables={true}
						allowHelpDialog={true}
						allowExtension={true}
						extensionHandlers={extensionHandlers}
						smartLinks={{
							// This is how we pass in the provider for smart cards
							provider: Promise.resolve(cardProvider),
						}}
						defaultValue={exampleDocument}
					/>
				</SmartCardProvider>
			</div>
		</EditorContext>
	);
}

const exampleDocument = {
	version: 1,
	type: 'doc',
	content: [
		{
			type: 'paragraph',
			content: [
				{
					type: 'text',
					text: 'Try copying and pasting back the following URL:',
				},
			],
		},
		{
			type: 'paragraph',
			content: [{ type: 'text', text: 'https://hello.atlassian.net/browse/PC-4820' }],
		},
	],
};
