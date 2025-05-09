import React, { useContext } from 'react';

import { FormattedDate, type MessageDescriptor } from 'react-intl-next';

import { fg } from '@atlaskit/platform-feature-flags';

import { ElementName, IconType, SmartLinkInternalTheme } from '../../../../constants';
import { messages } from '../../../../messages';
import { FlexibleUiContext } from '../../../../state/flexible-ui-context';
import { type FlexibleUiDataContext } from '../../../../state/flexible-ui-context/types';
import { isProfileType } from '../../../../utils';

import AppliedToComponentsCount from './applied-to-components-count';
import AtlaskitBadge from './atlaskit-badge';
import { type AtlaskitBadgeProps } from './atlaskit-badge/types';
import AvatarGroup from './avatar-group';
import { type AvatarGroupProps, type AvatarItemProps } from './avatar-group/types';
import Badge from './badge';
import { type BadgeProps } from './badge/types';
import DateTime from './date-time';
import { type DateTimeProps } from './date-time/types';
import Icon from './icon';
import Link from './link';
import { type LinkProps } from './link/types';
import Lozenge from './lozenge';
import { type LozengeProps } from './lozenge/types';
import Media from './media';
import Text from './text';
import { type TextProps } from './text/types';

const elementMappings: {
	[key in ElementName]?: { component: React.ComponentType<any> | undefined; props?: any };
} = {
	[ElementName.AppliedToComponentsCount]: {
		component: AppliedToComponentsCount,
		props: { icon: IconType.Component },
	},
	[ElementName.AttachmentCount]: {
		component: Badge,
		props: { icon: IconType.Attachment },
	},
	[ElementName.AuthorGroup]: { component: AvatarGroup },
	[ElementName.ChecklistProgress]: {
		component: Badge,
		props: { icon: IconType.CheckItem },
	},
	[ElementName.CollaboratorGroup]: { component: AvatarGroup },
	[ElementName.CommentCount]: {
		component: Badge,
		props: { icon: IconType.Comment },
	},
	[ElementName.ViewCount]: {
		component: Badge,
		props: { icon: IconType.View },
	},
	[ElementName.ReactCount]: {
		component: Badge,
		props: { icon: IconType.React },
	},
	[ElementName.VoteCount]: {
		component: Badge,
		props: { icon: IconType.Vote },
	},
	[ElementName.CreatedBy]: { component: Text },
	[ElementName.OwnedBy]: { component: Text },
	[ElementName.AssignedTo]: { component: Text },
	[ElementName.AssignedToGroup]: { component: AvatarGroup },
	[ElementName.OwnedByGroup]: { component: AvatarGroup },
	[ElementName.CreatedOn]: { component: DateTime },
	[ElementName.DueOn]: { component: Lozenge },
	[ElementName.LatestCommit]: {
		component: Badge,
		props: { icon: IconType.Commit },
	},
	[ElementName.LinkIcon]: { component: Icon },
	[ElementName.ModifiedBy]: { component: Text },
	[ElementName.ModifiedOn]: { component: DateTime },
	[ElementName.Preview]: { component: Media },
	[ElementName.Priority]: { component: Badge },
	[ElementName.ProgrammingLanguage]: {
		component: Badge,
		props: { icon: IconType.ProgrammingLanguage },
	},
	[ElementName.Provider]: { component: Badge },
	[ElementName.ReadTime]: { component: Text },
	[ElementName.SentOn]: { component: DateTime },
	[ElementName.SourceBranch]: { component: Text },
	[ElementName.State]: { component: Lozenge },
	[ElementName.SubscriberCount]: {
		component: Badge,
		props: { icon: IconType.Subscriber },
	},
	[ElementName.SubTasksProgress]: {
		component: Badge,
		props: { icon: IconType.SubTasksProgress },
	},
	[ElementName.StoryPoints]: {
		component: AtlaskitBadge,
	},
	[ElementName.TargetBranch]: { component: Text },
	[ElementName.Title]: { component: Link },
	[ElementName.Location]: {
		component: Link,
		props: { theme: SmartLinkInternalTheme.Grey },
	},
};

const getContextKey = (name: ElementName) => {
	// Attempt to predict context prop name in advance to reduce the amount of
	// code run during runtime
	return name.length > 0 ? name.charAt(0).toLowerCase() + name.slice(1) : undefined;
};

const getData = (
	elementName: ElementName,
	contextKey?: string,
	context?: FlexibleUiDataContext,
) => {
	if (!context) {
		return undefined;
	}

	const data = context[contextKey as keyof typeof context];

	switch (elementName) {
		case ElementName.AssignedToGroup:
		case ElementName.AuthorGroup:
		case ElementName.CollaboratorGroup:
		case ElementName.OwnedByGroup:
			const AvatarGroupsWithFallback = [ElementName.AssignedToGroup];
			const showFallbackAvatar = AvatarGroupsWithFallback.includes(elementName);
			return toAvatarGroupProps(data as AvatarItemProps[], showFallbackAvatar);
		case ElementName.AppliedToComponentsCount:
		case ElementName.AttachmentCount:
		case ElementName.ChecklistProgress:
		case ElementName.CommentCount:
		case ElementName.ViewCount:
		case ElementName.ReactCount:
		case ElementName.VoteCount:
		case ElementName.ProgrammingLanguage:
		case ElementName.SubscriberCount:
		case ElementName.LatestCommit:
		case ElementName.SubTasksProgress:
			return toBadgeProps(data as string);
		case ElementName.StoryPoints:
			return toAtlaskitBadgeProps(data as number);
		case ElementName.CreatedBy:
			return toFormattedTextProps(messages.created_by, context.createdBy);
		case ElementName.AssignedTo:
			return toFormattedTextProps(messages.assigned_to, context.assignedTo);
		case ElementName.OwnedBy:
			return toFormattedTextProps(messages.owned_by, context.ownedBy);
		case ElementName.CreatedOn:
			return toDateTimeProps('created', context.createdOn);
		case ElementName.DueOn:
			return toDateLozengeProps(context.dueOn);
		case ElementName.ModifiedBy:
			return toFormattedTextProps(messages.modified_by, context.modifiedBy);
		case ElementName.ModifiedOn:
			return toDateTimeProps('modified', context.modifiedOn);
		case ElementName.SentOn:
			return toDateTimeProps('sent', context.sentOn);
		case ElementName.ReadTime:
			return toFormattedTextProps(messages.read_time, data as string);
		case ElementName.SourceBranch:
		case ElementName.TargetBranch:
			return toTextProps(data as string | undefined);
		case ElementName.Title:
			return toLinkProps(context.title, context.url);
		case ElementName.LinkIcon:
			if (fg('platform-linking-visual-refresh-v2')) {
				return toLinkIconProps(data, context.type);
			}
			return typeof data === 'object' ? data : undefined;
		default:
			return typeof data === 'object' ? data : undefined;
	}
};

const toAvatarGroupProps = (
	items?: AvatarItemProps[],
	showFallbackAvatar?: boolean,
): Partial<AvatarGroupProps> | undefined => {
	return items ? { items } : showFallbackAvatar ? { items: [] } : undefined;
};

const toBadgeProps = (label?: string): Partial<BadgeProps> | undefined => {
	return label ? { label } : undefined;
};

const toAtlaskitBadgeProps = (value?: number): Partial<AtlaskitBadgeProps> | undefined => {
	return value ? { value } : undefined;
};

const toDateLozengeProps = (dateString?: string): Partial<LozengeProps> | undefined => {
	if (dateString) {
		const text = Date.parse(dateString) ? (
			<FormattedDate
				value={new Date(dateString)}
				year="numeric"
				month="short"
				day="numeric"
				formatMatcher="best fit"
			/>
		) : (
			dateString
		);
		return { text };
	}
};

const toDateTimeProps = (
	type: 'created' | 'modified' | 'sent',
	dateString?: string,
): Partial<DateTimeProps> | undefined => {
	return dateString ? { date: new Date(dateString), type } : undefined;
};

const toFormattedTextProps = (
	descriptor: MessageDescriptor,
	context?: string,
): Partial<TextProps> | undefined => {
	if (fg('platform-linking-additional-flexible-element-props')) {
		return context ? { message: { descriptor, values: { context } }, content: context } : undefined;
	}
	return context ? { message: { descriptor, values: { context } } } : undefined;
};

const toLinkProps = (text?: string, url?: string): Partial<LinkProps> | undefined => {
	return text ? { text, url } : undefined;
};

const toTextProps = (content?: string): Partial<TextProps> | undefined => {
	return content ? { content } : undefined;
};

const toLinkIconProps = (
	data: FlexibleUiDataContext[keyof FlexibleUiDataContext] | undefined,
	type: FlexibleUiDataContext['type'],
) => {
	const isDataLinkIcon = (_data: typeof data): _data is FlexibleUiDataContext['linkIcon'] => {
		return typeof _data === 'object' && _data !== null && ('icon' in _data || 'url' in _data);
	};

	if (!isDataLinkIcon(data)) {
		return typeof data === 'object' ? data : undefined;
	}

	const isImageRound = isProfileType(type);

	return { ...data, appearance: isImageRound ? 'round' : 'square' };
};

export const createElement = <P extends {}>(name: ElementName): React.ComponentType<P> => {
	const { component: BaseElement, props } = elementMappings[name] || {};
	const contextKey = getContextKey(name);

	if (!BaseElement) {
		throw Error(`Element ${name} does not exist.`);
	}

	return (overrides: P) => {
		const context = useContext(FlexibleUiContext);
		const data = getData(name, contextKey, context);
		return data ? <BaseElement {...props} {...data} {...overrides} name={name} /> : null;
	};
};
