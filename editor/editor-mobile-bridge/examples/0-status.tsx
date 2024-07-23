// TODO: https://product-fabric.atlassian.net/browse/DSP-4044
/**
 * @jsxRuntime classic
 * @jsx jsx
 */
// eslint-disable-next-line @atlaskit/ui-styling-standard/use-compiled -- Ignored via go/DSP-18766
import { css, jsx } from '@emotion/react';
import React from 'react';
import type { Color as StatusColor } from '@atlaskit/status/element';
import Form, { Field, FormFooter } from '@atlaskit/form';
import AkButton from '@atlaskit/button/new';
import Textfield from '@atlaskit/textfield';
import AkSelect from '@atlaskit/select';
import MobileEditor from '../src/editor/mobile-editor-element';
import WebToNativeReporter from '../example-helpers/WebToNativeReporter';
import { createEditorProviders } from '../src/providers';
import { fetchProxy } from '../src/utils/fetch-proxy';
import WebBridgeImpl from '../src/editor/native-to-web';
import { getBridge } from '../src/editor/native-to-web/bridge-initialiser';
import { useEditorConfiguration } from '../src/editor/hooks/use-editor-configuration';

// Disable tokens for the file - this package is deprecated, it's an example and it's not worth the effort of migrating
/* eslint-disable @atlaskit/design-system/ensure-design-token-usage/preview */

export interface Props {
	text: string;
	color: { value: string; label: string };
	uuid: string;
	bridge: WebBridgeImpl;
}

const divStyle = (height: string) =>
	css({
		// eslint-disable-next-line @atlaskit/ui-styling-standard/no-unsafe-values -- Ignored via go/DSP-18766
		height: height ? height : 'auto',
		border: '1px solid #ddd',
		margin: '16px 0',
		padding: '8px',
	});

const colorOptions = [
	{ value: 'neutral', label: 'Neutral' },
	{ value: 'purple', label: 'Purple' },
	{ value: 'blue', label: 'Blue' },
	{ value: 'red', label: 'Red' },
	{ value: 'yellow', label: 'Yellow' },
	{ value: 'green', label: 'Green' },
];

function MobileEditorWithFetchProxy() {
	const bridge = getBridge();
	const editorConfiguration = useEditorConfiguration(bridge);

	const props = {
		...createEditorProviders(fetchProxy),
		bridge,
		editorConfiguration,
		locale: editorConfiguration.getLocale(),
	};
	return <MobileEditor {...props} />;
}

export default class Example extends React.Component<Props, {}> {
	static defaultProps = {
		text: '',
		color: colorOptions[0],
		uuid: '1234',
		bridge: new WebBridgeImpl(),
	};

	private onStatusPickerDismissed = () => {
		this.props.bridge.onStatusPickerDismissed();
	};

	private submitOnStatusUpdate = (data: any) => {
		const { text, color, uuid } = data;
		this.props.bridge.onStatusUpdate(text, color.value as StatusColor, uuid);
	};

	render() {
		const { text, color, uuid } = this.props;
		return (
			// eslint-disable-next-line @atlaskit/ui-styling-standard/enforce-style-prop -- Ignored via go/DSP-18766
			<div style={{ display: 'flex', width: '100%' }}>
				{/* eslint-disable-next-line @atlaskit/ui-styling-standard/enforce-style-prop -- Ignored via go/DSP-18766 */}
				<div style={{ flex: '1 0 300px', padding: 8, margin: 16 }}>
					<h3>Native to Web</h3>
					<Form onSubmit={this.submitOnStatusUpdate}>
						{({ formProps }: { formProps: any }) => (
							<form {...formProps}>
								<Field name="text" label="Text" defaultValue={text}>
									{({ fieldProps }: { fieldProps: any }) => <Textfield {...fieldProps} />}
								</Field>
								<Field name="color" label="Color" defaultValue={color}>
									{({ fieldProps: { id, ...rest } }: { fieldProps: any }) => (
										<AkSelect
											// eslint-disable-next-line @atlaskit/ui-styling-standard/no-classname-prop -- Ignored via go/DSP-18766
											className="single-select"
											classNamePrefix="react-select"
											options={colorOptions}
											inputId={id}
											{...rest}
										/>
									)}
								</Field>
								<Field name="uuid" label="uuid" defaultValue={uuid}>
									{({ fieldProps }: { fieldProps: any }) => <Textfield {...fieldProps} />}
								</Field>
								<FormFooter>
									<AkButton type="submit">onStatusUpdate</AkButton>
								</FormFooter>
							</form>
						)}
					</Form>
					<Form onSubmit={this.onStatusPickerDismissed}>
						{({ formProps }: { formProps: any }) => (
							<form {...formProps}>
								<FormFooter>
									<AkButton type="submit">onStatusPickerDismissed</AkButton>
								</FormFooter>
							</form>
						)}
					</Form>
				</div>
				{/* eslint-disable-next-line @atlaskit/ui-styling-standard/enforce-style-prop -- Ignored via go/DSP-18766 */}
				<div style={{ flex: '1 0 100%' }}>
					{/* eslint-disable-next-line @atlaskit/design-system/consistent-css-prop-usage -- Ignored via go/DSP-18766 */}
					<div css={divStyle('250px')}>
						<h3>Mobile editor</h3>
						<MobileEditorWithFetchProxy />
					</div>
					{/* eslint-disable-next-line @atlaskit/design-system/consistent-css-prop-usage -- Ignored via go/DSP-18766 */}
					<div css={divStyle('200px')}>
						<h3>Web to native</h3>
						<WebToNativeReporter filter={['statusBridge']} />
					</div>
				</div>
			</div>
		);
	}
}
