/**
 * This file contains export components and API for FlexibleCard components.
 * For internal usage for access to all available props, please use following
 * - ./components/elements for metadata component
 * - ./components/actions for action component
 *
 * DO NOT add a new prop to these components until we are ready to support it externally.
 */
import React from 'react';

import {
	AssignedTo,
	AssignedToGroup,
	AttachmentCount,
	AuthorGroup,
	ChecklistProgress,
	CollaboratorGroup,
	CommentCount,
	CreatedBy,
	CreatedOn,
	DueOn,
	LatestCommit,
	LinkIcon,
	Location,
	ModifiedBy,
	ModifiedOn,
	OwnedBy,
	OwnedByGroup,
	Preview,
	Priority,
	ProgrammingLanguage,
	Provider,
	ReactCount,
	ReadTime,
	SentOn,
	Snippet,
	SourceBranch,
	State,
	StoryPoints,
	SubscriberCount,
	SubTasksProgress,
	TargetBranch,
	Title,
	ViewCount,
	VoteCount,
} from './components/elements';
import { type LinkProps } from './components/elements/link/types';
import type { TextProps } from './components/elements/text/types';

// ---- EXPORTED METADATA COMPONENT ---- //
export const AssignedToElement = () => <AssignedTo />;
export const AssignedToGroupElement = () => <AssignedToGroup />;
export const AttachmentCountElement = () => <AttachmentCount />;
export const AuthorGroupElement = () => <AuthorGroup />;
export const ChecklistProgressElement = () => <ChecklistProgress />;
export const CollaboratorGroupElement = () => <CollaboratorGroup />;
export const CommentCountElement = () => <CommentCount />;
export const CreatedOnElement = () => <CreatedOn />;
export const CreatedByElement = () => <CreatedBy />;
export const DueOnElement = () => <DueOn />;
export const LatestCommitElement = () => <LatestCommit />;
export const LinkIconElement = () => <LinkIcon />;
export const LocationElement = () => <Location />;
export const ModifiedByElement = () => <ModifiedBy />;
export const ModifiedOnElement = () => <ModifiedOn />;
export const OwnedByElement = () => <OwnedBy />;
export const OwnedByGroupElement = () => <OwnedByGroup />;
export const PreviewElement = () => <Preview />;
export const PriorityElement = () => <Priority />;
export const ProgrammingLanguageElement = () => <ProgrammingLanguage />;
export const ProviderElement = () => <Provider />;
export const ReactCountElement = () => <ReactCount />;
export const ReadTimeElement = () => <ReadTime />;
export const SentOnElement = () => <SentOn />;

export type SnippetElementProps = Pick<TextProps, 'maxLines'> & { text?: TextProps['content'] };
export const SnippetElement = (props: SnippetElementProps) => (
	<Snippet maxLines={props.maxLines} content={props.text} />
);

export const SourceBranchElement = () => <SourceBranch />;
export const StateElement = () => <State />;
export const StoryPointsElement = () => <StoryPoints />;
export const SubscriberCountElement = () => <SubscriberCount />;
export const SubTasksProgressElement = () => <SubTasksProgress />;
export const TargetBranchElement = () => <TargetBranch />;

export type TitleElementProps = Pick<LinkProps, 'hideTooltip' | 'maxLines' | 'target' | 'text'>;
export const TitleElement = (props: TitleElementProps) => (
	<Title
		hideTooltip={props?.hideTooltip}
		maxLines={props?.maxLines}
		target={props?.target}
		{...(props?.text ? { text: props?.text } : undefined)}
	/>
);
export const ViewCountElement = () => <ViewCount />;
export const VoteCountElement = () => <VoteCount />;
