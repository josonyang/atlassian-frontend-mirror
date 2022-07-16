## API Report File for "@atlaskit/conversation"

> Do not edit this file. It is a report generated by [API Extractor](https://api-extractor.com/).

```ts
/// <reference types="react" />

import { CommentAction } from '@atlaskit/comment';
import { Component } from 'react-redux';
import { ComponentClass } from 'react-redux';
import { DispatchProp } from 'react-redux';
import { Editor } from '@atlaskit/editor-core';
import { EditorProps } from '@atlaskit/editor-core';
import { Omit as Omit_2 } from 'react-redux';
import { ProviderFactory } from '@atlaskit/editor-common/provider-factory';
import { default as React_2 } from 'react';
import { Store } from 'redux';
import { Unsubscribe } from 'redux';

// @public (undocumented)
export const ADD_COMMENT_ERROR = 'addCommentError';

// @public (undocumented)
export const ADD_COMMENT_REQUEST = 'addCommentRequest';

// @public (undocumented)
export const ADD_COMMENT_SUCCESS = 'addCommentSuccess';

// @public (undocumented)
const Comment_2: ComponentClass<
  Omit_2<
    {
      comments: Comment_3[];
      isHighlighted: boolean;
      comment: Comment_3;
      conversationId: string;
      objectId?: string | undefined;
      containerId?: string | undefined;
      renderComment: (props: any) => JSX.Element;
      user?: User | undefined;
      maxCommentNesting?: number | undefined;
      onAddComment?:
        | ((
            conversationId: string,
            parentId: string,
            value: any,
            localId?: string | undefined,
            onSuccess?: SuccessHandler | undefined,
          ) => void)
        | undefined;
      onUpdateComment?:
        | ((
            conversationId: string,
            commentId: string,
            value: any,
            onSuccess?: SuccessHandler | undefined,
          ) => void)
        | undefined;
      onDeleteComment?:
        | ((
            conversationId: string,
            commentId: string,
            onSuccess?: SuccessHandler | undefined,
          ) => void)
        | undefined;
      onRevertComment?:
        | ((conversationId: string, commentId: string) => void)
        | undefined;
      onCancelComment?:
        | ((conversationId: string, commentId: string) => void)
        | undefined;
      onCancel?: (() => void) | undefined;
      onHighlightComment?:
        | ((
            event: React_2.MouseEvent<HTMLAnchorElement, MouseEvent>,
            commentId: string,
          ) => void)
        | undefined;
      onEditorOpen?: (() => void) | undefined;
      onEditorClose?: (() => void) | undefined;
      onEditorChange?:
        | ((
            isLocal: boolean,
            value: any,
            conversationId: string,
            commentId: string | undefined,
            meta: any,
            objectId: string,
            containerId?: string | undefined,
          ) => void)
        | undefined;
      dataProviders?: ProviderFactory | undefined;
      onUserClick?: ((user: User) => void) | undefined;
      onRetry?: ((localId?: string | undefined) => void) | undefined;
      onCommentPermalinkClick?:
        | ((
            event: React_2.MouseEvent<HTMLAnchorElement, MouseEvent>,
            commentId: string,
          ) => void)
        | undefined;
      renderEditor?: RenderEditorWithComments | undefined;
      placeholder?: string | undefined;
      disableScrollTo?: boolean | undefined;
      allowFeedbackAndHelpButtons?: boolean | undefined;
      sendAnalyticsEvent: SendAnalyticsEvent;
      portal?: HTMLElement | undefined;
      renderAdditionalCommentActions?:
        | ((CommentAction: any, comment: Comment_3) => JSX.Element[])
        | undefined;
      renderAfterComment?: ((comment: Comment_3) => JSX.Element) | undefined;
    } & DispatchProp<any> &
      Props,
    'dispatch' | keyof Props
  > &
    Props
> & {
  WrappedComponent: Component<
    {
      comments: Comment_3[];
      isHighlighted: boolean;
      comment: Comment_3;
      conversationId: string;
      objectId?: string | undefined;
      containerId?: string | undefined;
      renderComment: (props: any) => JSX.Element;
      user?: User | undefined;
      maxCommentNesting?: number | undefined;
      onAddComment?:
        | ((
            conversationId: string,
            parentId: string,
            value: any,
            localId?: string | undefined,
            onSuccess?: SuccessHandler | undefined,
          ) => void)
        | undefined;
      onUpdateComment?:
        | ((
            conversationId: string,
            commentId: string,
            value: any,
            onSuccess?: SuccessHandler | undefined,
          ) => void)
        | undefined;
      onDeleteComment?:
        | ((
            conversationId: string,
            commentId: string,
            onSuccess?: SuccessHandler | undefined,
          ) => void)
        | undefined;
      onRevertComment?:
        | ((conversationId: string, commentId: string) => void)
        | undefined;
      onCancelComment?:
        | ((conversationId: string, commentId: string) => void)
        | undefined;
      onCancel?: (() => void) | undefined;
      onHighlightComment?:
        | ((
            event: React_2.MouseEvent<HTMLAnchorElement, MouseEvent>,
            commentId: string,
          ) => void)
        | undefined;
      onEditorOpen?: (() => void) | undefined;
      onEditorClose?: (() => void) | undefined;
      onEditorChange?:
        | ((
            isLocal: boolean,
            value: any,
            conversationId: string,
            commentId: string | undefined,
            meta: any,
            objectId: string,
            containerId?: string | undefined,
          ) => void)
        | undefined;
      dataProviders?: ProviderFactory | undefined;
      onUserClick?: ((user: User) => void) | undefined;
      onRetry?: ((localId?: string | undefined) => void) | undefined;
      onCommentPermalinkClick?:
        | ((
            event: React_2.MouseEvent<HTMLAnchorElement, MouseEvent>,
            commentId: string,
          ) => void)
        | undefined;
      renderEditor?: RenderEditorWithComments | undefined;
      placeholder?: string | undefined;
      disableScrollTo?: boolean | undefined;
      allowFeedbackAndHelpButtons?: boolean | undefined;
      sendAnalyticsEvent: SendAnalyticsEvent;
      portal?: HTMLElement | undefined;
      renderAdditionalCommentActions?:
        | ((CommentAction: any, comment: Comment_3) => JSX.Element[])
        | undefined;
      renderAfterComment?: ((comment: Comment_3) => JSX.Element) | undefined;
    } & DispatchProp<any> &
      Props
  >;
};
export { Comment_2 as Comment };

// @public (undocumented)
export class Conversation extends React_2.Component<ContainerProps, any> {
  constructor(props: ContainerProps);
  // (undocumented)
  render(): JSX.Element;
}

// @public (undocumented)
export class ConversationResource extends AbstractConversationResource {
  constructor(config: ConversationResourceConfig);
  addComment(
    conversationId: string,
    parentId: string,
    doc: any,
    localId?: string,
  ): Promise<Comment_3>;
  create(
    localId: string,
    value: any,
    meta: any,
    objectId: string,
    containerId?: string,
  ): Promise<Conversation_2>;
  // (undocumented)
  protected createComment(
    conversationId: string,
    parentId: string,
    doc: any,
    localId?: string,
  ): Comment_3;
  deleteComment(
    conversationId: string,
    commentId: string,
  ): Promise<Pick<Comment_3, 'conversationId' | 'commentId' | 'deleted'>>;
  // (undocumented)
  protected getComment(
    conversationId: string,
    commentId: string,
  ): Comment_3 | undefined;
  getConversations(
    objectId: string,
    containerId?: string,
  ): Promise<Conversation_2[]>;
  revertComment(
    conversationId: string,
    commentId: string,
  ): Promise<Pick<Comment_3, 'conversationId' | 'commentId'>>;
  updateComment(
    conversationId: string,
    commentId: string,
    document: any,
  ): Promise<Comment_3>;
  updateUser(user?: User): Promise<User | undefined>;
}

// @public (undocumented)
export interface ConversationResourceConfig {
  // (undocumented)
  url: string;
  // (undocumented)
  user?: User;
}

// @public (undocumented)
export const CREATE_CONVERSATION_ERROR = 'createConversationError';

// @public (undocumented)
export const CREATE_CONVERSATION_REQUEST = 'createConversationRequest';

// @public (undocumented)
export const CREATE_CONVERSATION_SUCCESS = 'createConversationSuccess';

// @public (undocumented)
export const DELETE_COMMENT_ERROR = 'deleteCommentError';

// @public (undocumented)
export const DELETE_COMMENT_REQUEST = 'deleteCommentRequest';

// @public (undocumented)
export const DELETE_COMMENT_SUCCESS = 'deleteCommentSuccess';

// @public (undocumented)
export const FETCH_CONVERSATIONS_REQUEST = 'fetchConversationsRequest';

// @public (undocumented)
export const FETCH_CONVERSATIONS_SUCCESS = 'fetchConversationsSuccess';

// @public (undocumented)
export const HIGHLIGHT_COMMENT = 'highlightComment';

// @public (undocumented)
export interface ResourceProvider {
  // (undocumented)
  addComment(
    conversationId: string,
    parentId: string,
    document: any,
    localId?: string,
  ): Promise<Comment_3>;
  // (undocumented)
  create(
    localId: string,
    value: any,
    meta: any,
    objectId: string,
    containerId?: string,
  ): Promise<Conversation_2>;
  // (undocumented)
  deleteComment(
    conversationId: string,
    commentId: string,
  ): Promise<Pick<Comment_3, 'conversationId' | 'commentId' | 'deleted'>>;
  // (undocumented)
  getConversations(
    objectId: string,
    containerId?: string,
  ): Promise<Conversation_2[]>;
  // (undocumented)
  revertComment(
    conversationId: string,
    commentId: string,
  ): Promise<Pick<Comment_3, 'conversationId' | 'commentId'>>;
  // (undocumented)
  saveDraft(
    isLocal: boolean,
    value: any,
    conversationId: string,
    commentId: string | undefined,
    meta: any,
    objectId: string,
    containerId?: string,
  ): void;
  // (undocumented)
  store: Store<State | undefined>;
  // (undocumented)
  subscribe(handler: Handler): Unsubscribe;
  // (undocumented)
  updateComment(
    conversationId: string,
    commentId: string,
    document: any,
  ): Promise<Comment_3>;
  // (undocumented)
  updateUser(user?: User): Promise<User | undefined>;
}

// @public (undocumented)
export const UPDATE_COMMENT_ERROR = 'updateCommentError';

// @public (undocumented)
export const UPDATE_COMMENT_REQUEST = 'updateCommentRequest';

// @public (undocumented)
export const UPDATE_COMMENT_SUCCESS = 'updateCommentSuccess';

// @public (undocumented)
export const UPDATE_USER_SUCCESS = 'updateUserSuccess';

// (No @packageDocumentation comment for this package)
```