import {
	type EventType,
	type GasPurePayload,
	type GasPureScreenEventPayload,
} from '@atlaskit/analytics-gas-types';
import {
	createAndFireEvent,
	withAnalyticsEvents,
	type WithAnalyticsEventsProps,
	type AnalyticsEventPayload,
	withAnalyticsContext,
} from '@atlaskit/analytics-next';
import Button from '@atlaskit/button/new';
import { token } from '@atlaskit/tokens';
import React from 'react';
import { FabricChannel } from '../../src/types';

export type OwnProps = {
	onClick: (e: React.SyntheticEvent) => void;
};

export type Props = WithAnalyticsEventsProps & OwnProps;

const CustomButton = ({
	onClick,
	text,
}: {
	onClick: React.MouseEventHandler<HTMLDivElement>;
	text?: string;
}) => (
	// eslint-disable-next-line jsx-a11y/click-events-have-key-events, jsx-a11y/no-static-element-interactions, @atlassian/a11y/interactive-element-not-keyboard-focusable
	<div
		id="dummy"
		onClick={onClick}
		// eslint-disable-next-line @atlaskit/ui-styling-standard/enforce-style-prop -- Ignored via go/DSP-18766
		style={{ paddingBottom: token('space.150', '12px') }}
	>
		<Button>{text || 'Test'}</Button>
	</div>
);

export class DummyElementsComponent extends React.Component<Props> {
	render() {
		return <CustomButton text={FabricChannel.elements} onClick={this.props.onClick} />;
	}
}

export class DummyAtlaskitComponent extends React.Component<Props> {
	render() {
		return <CustomButton text={FabricChannel.atlaskit} onClick={this.props.onClick} />;
	}
}

export class DummyNavigationComponent extends React.Component<Props> {
	render() {
		return <CustomButton text={FabricChannel.navigation} onClick={this.props.onClick} />;
	}
}

export class DummyEditorComponent extends React.Component<Props> {
	render() {
		return <CustomButton text={FabricChannel.editor} onClick={this.props.onClick} />;
	}
}

export class DummyMediaComponent extends React.Component<Props> {
	render() {
		return <CustomButton text={FabricChannel.media} onClick={this.props.onClick} />;
	}
}

export class DummyPeopleTeamsComponent extends React.Component<Props> {
	render() {
		return <CustomButton text={FabricChannel.peopleTeams} onClick={this.props.onClick} />;
	}
}

export class DummyNotificationsComponent extends React.Component<Props> {
	render() {
		return <CustomButton text={FabricChannel.notifications} onClick={this.props.onClick} />;
	}
}

export class DummyRecentWorkComponent extends React.Component<Props> {
	render() {
		return <CustomButton text={FabricChannel.recentWork} onClick={this.props.onClick} />;
	}
}

export class DummyAtlasComponent extends React.Component<Props> {
	render() {
		return <CustomButton text={FabricChannel.atlas} onClick={this.props.onClick} />;
	}
}
export class DummyLinkingPlatformComponent extends React.Component<Props> {
	render() {
		return <CustomButton text={FabricChannel.linkingPlatform} onClick={this.props.onClick} />;
	}
}

export class DummyCrossFlowComponent extends React.Component<Props> {
	render() {
		return <CustomButton text={FabricChannel.crossFlow} onClick={this.props.onClick} />;
	}
}

export class DummyPostOfficeComponent extends React.Component<Props> {
	render() {
		return <CustomButton text={FabricChannel.postOffice} onClick={this.props.onClick} />;
	}
}

export class DummyAIMateComponent extends React.Component<Props> {
	render() {
		return <CustomButton text={FabricChannel.aiMate} onClick={this.props.onClick} />;
	}
}

export class DummyAVPComponent extends React.Component<Props> {
	render() {
		return <CustomButton text={FabricChannel.avp} onClick={this.props.onClick} />;
	}
}

export class DummyGrowthComponent extends React.Component<Props> {
	render() {
		return <CustomButton text={FabricChannel.growth} onClick={this.props.onClick} />;
	}
}

export class DummyOmniChannelComponent extends React.Component<Props> {
	render() {
		return <CustomButton text={FabricChannel.omniChannel} onClick={this.props.onClick} />;
	}
}

class MyButton extends React.Component<Props> {
	static displayName = 'MyButton';
	render() {
		return (
			<button id="dummy" onClick={this.props.onClick}>
				Test [click on me]
			</button>
		);
	}
}

const componentChannels = {
	[FabricChannel.atlaskit]: DummyAtlaskitComponent,
	[FabricChannel.elements]: DummyElementsComponent,
	[FabricChannel.navigation]: DummyNavigationComponent,
	[FabricChannel.editor]: DummyEditorComponent,
	[FabricChannel.media]: DummyMediaComponent,
	[FabricChannel.peopleTeams]: DummyPeopleTeamsComponent,
	[FabricChannel.notifications]: DummyNotificationsComponent,
	[FabricChannel.recentWork]: DummyNotificationsComponent,
	[FabricChannel.atlas]: DummyAtlasComponent,
	[FabricChannel.linkingPlatform]: DummyLinkingPlatformComponent,
	[FabricChannel.crossFlow]: DummyCrossFlowComponent,
	[FabricChannel.postOffice]: DummyPostOfficeComponent,
	[FabricChannel.aiMate]: DummyAIMateComponent,
	[FabricChannel.avp]: DummyAVPComponent,
	[FabricChannel.growth]: DummyGrowthComponent,
	[FabricChannel.omniChannel]: DummyOmniChannelComponent,
};

export const createComponentWithAnalytics = (channel: FabricChannel) =>
	withAnalyticsEvents({
		onClick: createAndFireEvent(channel)({
			action: 'someAction',
			actionSubject: 'someComponent',
			eventType: 'ui',
		}),
	})(componentChannels[channel]);

export const createComponentWithAttributesWithAnalytics = (channel: FabricChannel) =>
	withAnalyticsEvents({
		onClick: createAndFireEvent(channel)({
			action: 'someAction',
			actionSubject: 'someComponent',
			eventType: 'ui',
			attributes: {
				packageName: '@atlaskit/foo',
				packageVersion: '1.0.0',
				componentName: 'foo',
				fooBar: 'yay',
			},
		}),
	})(componentChannels[channel]);

export const createTaggedComponentWithAnalytics = (channel: FabricChannel, tag: string) =>
	withAnalyticsEvents({
		onClick: createAndFireEvent(channel)({
			action: 'someAction',
			actionSubject: 'someComponent',
			eventType: 'ui',
			tags: [tag, 'foo'],
		}),
	})(componentChannels[channel]);

export const IncorrectEventType = (channel: FabricChannel) =>
	withAnalyticsEvents({
		onClick: createAndFireEvent(channel)({
			action: 'someAction',
			actionSubject: 'someComponent',
			eventType: 'unknown' as EventType,
		}),
	})(componentChannels[channel]);

export const createButtonWithAnalytics = (
	payload: GasPurePayload,
	channel: FabricChannel,
	context: AnalyticsEventPayload[] = [], // Context should incluide all data in the same order that AnalyticsListener would receive it
): typeof MyButton => {
	const ButtonWithAnalyticsEvents = withAnalyticsEvents({
		onClick: createAndFireEvent(channel)(payload),
	})(MyButton);

	const reversedContext = [...context].reverse();
	return reversedContext.reduce(
		(ButtonWithAnalyticsContext, contextData: AnalyticsEventPayload) =>
			withAnalyticsContext(contextData)(ButtonWithAnalyticsContext as React.FunctionComponent),
		ButtonWithAnalyticsEvents,
	) as typeof MyButton;
};

export const createAnalyticsWebClientMock = () => ({
	sendUIEvent: (event: GasPurePayload) => {
		console.log('sendUIEvent: ', event);
	},
	sendOperationalEvent: (event: GasPurePayload) => {
		console.log('sendOperationalEvent: ', event);
	},
	sendTrackEvent: (event: GasPurePayload) => {
		console.log('sendTrackEvent: ', event);
	},
	sendScreenEvent: (event: GasPureScreenEventPayload) => {
		console.log('sendScreenEvent: ', event);
	},
});
