import React, { Fragment } from 'react';
import { FormattedMessage } from 'react-intl-next';
import { messages } from '@atlaskit/media-ui';
import deepEqual from 'deep-equal';
import { type MediaClient, type FileState, globalMediaEventEmitter } from '@atlaskit/media-client';
import { type Outcome } from '../domain';
import ErrorMessage from '../errorMessage';
import { Spinner } from '../loading';
import { ErrorViewDownloadButton } from '../download';
import { type MediaViewerError } from '../errors';
import { type MediaTraceContext } from '@atlaskit/media-common';

export type BaseProps = {
	mediaClient: MediaClient;
	item: FileState;
	collectionName?: string;
	traceContext: MediaTraceContext;
};

export type BaseState<Content> = {
	content: Outcome<Content, MediaViewerError>;
};

export abstract class BaseViewer<
	Content,
	Props extends BaseProps,
	State extends BaseState<Content> = BaseState<Content>,
> extends React.Component<Props, State> {
	state = this.getInitialState();
	protected mounted: boolean = false;

	componentDidMount() {
		this.mounted = true;
		this.init();
	}

	componentWillUnmount() {
		this.mounted = false;
		this.release();
	}

	protected safeSetState(newState: Partial<State>) {
		if (this.mounted) {
			this.setState({ ...this.state, ...newState });
		}
	}

	// NOTE: We've moved parts of the logic to reset a component into this method
	// to optimise the performance. Resetting the state before the `componentDidUpdate`
	// lifecycle event allows us avoid one additional render cycle.
	// However, this lifecycle method might eventually be deprecated, so be careful
	// when working with it.
	UNSAFE_componentWillReceiveProps(nextProps: Readonly<Props>): void {
		if (this.needsReset(nextProps, this.props)) {
			this.release();
			this.setState(this.initialState);
		}
	}

	componentDidUpdate(prevProps: Props) {
		if (this.needsReset(prevProps, this.props)) {
			this.init();
		}
	}

	render() {
		return this.state.content.match({
			pending: () => <Spinner />,
			successful: (content) => <Fragment>{this.renderSuccessful(content)}</Fragment>,
			failed: (error) => {
				const { item } = this.props;
				return (
					<ErrorMessage
						fileId={item.id}
						fileState={item}
						error={error}
						supressAnalytics={true} // item-viewer.tsx will send
					>
						{/* eslint-disable-next-line @atlaskit/design-system/use-primitives-text */}
						<p>
							<FormattedMessage {...messages.try_downloading_file} />
						</p>
						{this.renderDownloadButton(error)}
					</ErrorMessage>
				);
			},
		});
	}

	// Accessing abstract getters in a constructor is not allowed
	private getInitialState() {
		return this.initialState;
	}

	private renderDownloadButton(error: MediaViewerError) {
		const { item, mediaClient, collectionName, traceContext } = this.props;
		return (
			<ErrorViewDownloadButton
				fileState={item}
				mediaClient={mediaClient}
				error={error}
				collectionName={collectionName}
				traceContext={traceContext}
			/>
		);
	}

	protected onMediaDisplayed = () => {
		const { item } = this.props;
		globalMediaEventEmitter.emit('media-viewed', {
			fileId: item.id,
			viewingLevel: 'full',
		});
	};

	protected needsReset(propsA: Props, propsB: Props) {
		return !deepEqual(propsA.item, propsB.item) || propsA.collectionName !== propsB.collectionName;
	}

	protected abstract init(): void;
	protected abstract release(): void;
	protected abstract get initialState(): State;
	protected abstract renderSuccessful(content: Content): React.ReactNode;
}
