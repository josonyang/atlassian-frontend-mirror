import React from 'react';

import { type EditorProps, EditorContext, ToolbarHelp } from '@atlaskit/editor-core';
import { type ExtractInjectionAPI } from '@atlaskit/editor-common/types';
import { type HelpDialogPlugin } from '@atlaskit/editor-plugins/help-dialog';
import { ComposableEditor } from '@atlaskit/editor-core/composable-editor';
import { useUniversalPreset } from '@atlaskit/editor-core/preset-universal';
import { usePreset } from '@atlaskit/editor-core/use-preset';
import {
	type MentionResourceConfig,
	AbstractMentionResource,
	type ResolvingMentionProvider,
	type MentionNameDetails,
	MentionNameStatus,
} from '../src/resource';
// These imports are not included in the manifest file to avoid circular package dependencies blocking our Typescript and bundling tooling
// eslint-disable-next-line import/no-extraneous-dependencies
import { mentionTestResult } from '@atlaskit/util-data-test/mention-test-data';

/**
 * The user resolver resolves pre-mentioned users, using their IDs, by mapping
 * it to their names
 */
export const resolveUser = async (aaid: string): Promise<MentionNameDetails> => {
	const usersClient = Promise.resolve({
		id: aaid,
		name: 'Raina Halper',
		status: MentionNameStatus.OK,
	});

	// use a resolver here to hydrate the aaid
	const hydratedUser: MentionNameDetails = await usersClient;

	return Promise.resolve({
		id: aaid,
		name: hydratedUser.name,
		status: MentionNameStatus.OK,
	});
};

/**
 * Extend AbstractMentionResource to connect your custom mentions provider
 * and resolver
 */
export class ExampleMentionResource
	extends AbstractMentionResource
	implements ResolvingMentionProvider
{
	private config: MentionResourceConfig;

	productName?: string;
	shouldEnableInvite: boolean;

	constructor(config: MentionResourceConfig) {
		super();

		this.config = config;
		this.productName = config.productName;
		this.shouldEnableInvite = !!config.shouldEnableInvite;
	}

	/**
	 * Create a client to your mention provider
	 */
	filter(query?: string): void {
		setTimeout(async () => {
			const mentions = await Promise.resolve(mentionTestResult);

			this._notifyListeners({ mentions, query: query || '' }, {});
			this._notifyAllResultsListeners({ mentions, query: query || '' });
		}, 30 + 1);
		return;
	}

	/**
	 * Connect your user ID resolver
	 */
	resolveMentionName(id: string): Promise<MentionNameDetails> | MentionNameDetails {
		if (!this.config.mentionNameResolver) {
			return {
				id,
				name: '',
				status: MentionNameStatus.UNKNOWN,
			};
		}
		return this.config.mentionNameResolver.lookupName(id);
	}

	/**
	 * Cache your resolved mentions
	 */
	cacheMentionName(id: string, name: string) {
		if (this.config.mentionNameResolver) {
			this.config.mentionNameResolver.cacheName(id, name);
		}
	}

	/**
	 * Connect your user ID resolver
	 */
	supportsMentionNameResolving() {
		const supported = !!this.config.mentionNameResolver;
		return supported;
	}
}

export type Props = {
	editorProps?: EditorProps;
	replacementDoc?: any;
};

export type State = {
	isExpanded?: boolean;
	defaultValue?: Node | string | Object;
};

export class MentionEditor extends React.Component<Props, State> {
	mentionNames: Map<string, MentionNameDetails> = new Map();

	state = {
		defaultValue: 'dasdasdsa',
	};

	// Create a provider by instantiating an AbstractMentionResource
	mentionResourceProvider = new ExampleMentionResource({
		url: '',
		mentionNameResolver: {
			lookupName: async (id: string) => {
				const resolved = await resolveUser(id);
				return resolved;
			},
			cacheName: (id: string, name: string) =>
				this.mentionNames.set(id, { id, name, status: MentionNameStatus.OK }),
		},
	});

	onFocus = () => this.setState((prevState) => ({ isExpanded: !prevState.isExpanded }));

	render() {
		return (
			<EditorContext>
				<ComposableEditorWrapper
					appearance="comment"
					shouldFocus={true}
					disabled={false}
					mentionProvider={Promise.resolve(this.mentionResourceProvider)} // Plug in your Mentions provider
					allowPanel={true}
				/>
			</EditorContext>
		);
	}
}

const ComposableEditorWrapper = (props: EditorProps) => {
	const universalPreset = useUniversalPreset({ props });
	const { preset, editorApi } = usePreset(() => universalPreset, [universalPreset]);

	return (
		<ComposableEditor
			preset={preset}
			{...props}
			primaryToolbarComponents={[
				<ToolbarHelp
					titlePosition="top"
					title="Help"
					key="help"
					editorApi={
						props.allowHelpDialog ? (editorApi as ExtractInjectionAPI<HelpDialogPlugin>) : undefined
					}
				/>,
			]}
		/>
	);
};

export default function MentionEditorExample(props?: Props) {
	return <MentionEditor {...props} />;
}
