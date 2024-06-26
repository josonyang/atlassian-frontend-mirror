## API Report File for "@atlaskit/embedded-document"

> Do not edit this file. It is a report generated by [API Extractor](https://api-extractor.com/).

```ts
/// <reference types="react" />

import { Component } from 'react';
import { EditorProps } from '@atlaskit/editor-core';
import { PureComponent } from 'react';
import { default as React_2 } from 'react';
import { ReactElement } from 'react';
import { RendererProps } from '@atlaskit/renderer';
import { ServiceConfig } from '@atlaskit/util-service-support';

declare interface Config extends ServiceConfig {}

declare interface Document_2 {
	documentId: string;
	objectId: string;
	containerId?: string;
	createdBy: User;
	language?: string;
	title?: string;
	body: string;
}
export { Document_2 as Document };

declare interface DocumentActions {
	createDocument(value: any): Promise<Document_2>;
	editDocument(): void;
	cancelEdit(): void;
	updateDocument(value: any): Promise<Document_2>;
}

export declare class DocumentBody extends PureComponent<Props_2> {
	private renderChild;
	private stateMapper;
	private renderPropsMapper;
	render(): JSX.Element;
}

export declare type DocumentMode = 'view' | 'edit' | 'create';

export declare class EmbeddedDocument extends Component<Props, State> {
	private actions;
	private provider;
	constructor(props: Props);
	componentDidMount(): Promise<void>;
	private getDocumentByObjectId;
	private getDocument;
	private setDocumentMode;
	private updateDocument;
	private createDocument;
	private setDocumentState;
	/**
	 * Toolbar will only be rendered here if we're in "view"-mode.
	 *
	 * In all other modes, the toolbar rendering will be triggered
	 * by the Document-component.
	 */
	private renderToolbar;
	/**
	 * Title will only be rendered here if we're in "view"-mode.
	 *
	 * In all other modes, the title rendering will be triggered
	 * by the Document-component.
	 */
	private renderTitle;
	private renderContent;
	render(): JSX.Element;
}

declare interface Props extends ProviderProps {
	objectId: string;
	documentId?: string;
	containerId?: string;
	language?: string;
	mode?: DocumentMode;
	renderTitle?: (mode: DocumentMode, doc?: any) => ReactElement<any>;
	renderToolbar?: (mode: DocumentMode, editorActions?: any) => ReactElement<any>;
}

declare interface Props_2 {
	editorProps?: Partial<EditorProps>;
	rendererProps?: Partial<RendererProps>;
}

declare interface Props_3 {
	render(actions: DocumentActions): React_2.ReactNode;
}

export declare interface Provider {
	getDocument(documentId: string, language?: string): Promise<Document_2 | null>;
	getDocumentByObjectId(objectId: string, language?: string): Promise<Document_2 | null>;
	updateDocument(
		documentId: string,
		body: string,
		objectId: string,
		title?: string,
		language?: string,
	): Promise<Document_2 | null>;
	createDocument(
		body: string,
		objectId: string,
		title?: string,
		language?: string,
	): Promise<Document_2 | null>;
}

declare interface ProviderProps {
	provider?: Provider;
	url?: string;
}

export declare class ServiceProvider implements Provider {
	private config;
	constructor(config: Config);
	getDocument(documentId: string, language?: string): Promise<Document_2 | null>;
	getDocumentByObjectId(objectId: string, language?: string): Promise<Document_2 | null>;
	updateDocument(
		documentId: string,
		body: string,
		objectId: string,
		title?: string,
		language?: string,
	): Promise<Document_2 | null>;
	createDocument(
		body: string,
		objectId: string,
		title?: string,
		language?: string,
	): Promise<Document_2 | null>;
}

declare interface State {
	doc?: Document_2;
	isLoading?: boolean;
	hasError?: boolean;
	mode?: DocumentMode;
}

export declare const Toolbar: (props: { mode: DocumentMode; editorActions?: any }) => JSX.Element;

declare interface User {}

export declare class WithDocumentActions extends PureComponent<Props_3> {
	private actionsMapper;
	render(): JSX.Element;
}

export {};
```
