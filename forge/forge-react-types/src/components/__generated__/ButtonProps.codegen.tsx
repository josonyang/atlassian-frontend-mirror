/**
 * THIS FILE WAS CREATED VIA CODEGEN DO NOT MODIFY {@see http://go/af-codegen}
 *
 * Extract component prop types from UIKit 2 components - ButtonProps
 *
 * @codegen <<SignedSource::8d3c96f4416729b792a7d3460ae23a27>>
 * @codegenCommand yarn workspace @atlaskit/forge-react-types codegen
 * @codegenDependency ../../../../forge-ui/src/components/UIKit/button/__generated__/index.partial.tsx <<SignedSource::f9a16b36e0a307a53ee30a009373ab49>>
 */
/* eslint @repo/internal/codegen/signed-source-integrity: "warn" */

import type { ButtonProps as PlatformButtonProps } from '@atlaskit/button/new';

export type Icon =
	| 'activity'
	| 'add'
	| 'add-circle'
	| 'add-item'
	| 'addon'
	| 'app-access'
	| 'app-switcher'
	| 'archive'
	| 'arrow-down'
	| 'arrow-down-circle'
	| 'arrow-left'
	| 'arrow-left-circle'
	| 'arrow-right'
	| 'arrow-right-circle'
	| 'arrow-up'
	| 'arrow-up-circle'
	| 'attachment'
	| 'audio'
	| 'audio-circle'
	| 'backlog'
	| 'billing'
	| 'billing-filled'
	| 'bitbucket-branches'
	| 'bitbucket-builds'
	| 'bitbucket-clone'
	| 'bitbucket-commits'
	| 'bitbucket-compare'
	| 'bitbucket-forks'
	| 'bitbucket-output'
	| 'bitbucket-pipelines'
	| 'bitbucket-pullrequests'
	| 'bitbucket-repos'
	| 'bitbucket-snippets'
	| 'bitbucket-source'
	| 'board'
	| 'book'
	| 'bullet-list'
	| 'calendar'
	| 'calendar-filled'
	| 'camera'
	| 'camera-filled'
	| 'camera-rotate'
	| 'camera-take-picture'
	| 'canvas'
	| 'check'
	| 'check-circle'
	| 'check-circle-outline'
	| 'checkbox'
	| 'checkbox-indeterminate'
	| 'chevron-down'
	| 'chevron-down-circle'
	| 'chevron-left'
	| 'chevron-left-circle'
	| 'chevron-left-large'
	| 'chevron-right'
	| 'chevron-right-circle'
	| 'chevron-right-large'
	| 'chevron-up'
	| 'chevron-up-circle'
	| 'child-issues'
	| 'code'
	| 'comment'
	| 'component'
	| 'copy'
	| 'creditcard'
	| 'creditcard-filled'
	| 'cross'
	| 'cross-circle'
	| 'dashboard'
	| 'decision'
	| 'department'
	| 'detail-view'
	| 'discover'
	| 'discover-filled'
	| 'document'
	| 'document-filled'
	| 'documents'
	| 'download'
	| 'drag-handler'
	| 'dropbox'
	| 'edit'
	| 'edit-filled'
	| 'editor-add'
	| 'editor-addon'
	| 'editor-advanced'
	| 'editor-align-center'
	| 'editor-align-image-center'
	| 'editor-align-image-left'
	| 'editor-align-image-right'
	| 'editor-align-left'
	| 'editor-align-right'
	| 'editor-attachment'
	| 'editor-background-color'
	| 'editor-bold'
	| 'editor-bullet-list'
	| 'editor-close'
	| 'editor-code'
	| 'editor-collapse'
	| 'editor-date'
	| 'editor-decision'
	| 'editor-divider'
	| 'editor-done'
	| 'editor-edit'
	| 'editor-emoji'
	| 'editor-error'
	| 'editor-expand'
	| 'editor-feedback'
	| 'editor-file'
	| 'editor-file-preview'
	| 'editor-help'
	| 'editor-hint'
	| 'editor-horizontal-rule'
	| 'editor-image'
	| 'editor-image-border'
	| 'editor-image-resize'
	| 'editor-indent'
	| 'editor-info'
	| 'editor-italic'
	| 'editor-layout-single'
	| 'editor-layout-three-equal'
	| 'editor-layout-three-with-sidebars'
	| 'editor-layout-two-equal'
	| 'editor-layout-two-left-sidebar'
	| 'editor-layout-two-right-sidebar'
	| 'editor-link'
	| 'editor-media-center'
	| 'editor-media-full-width'
	| 'editor-media-wide'
	| 'editor-media-wrap-left'
	| 'editor-media-wrap-right'
	| 'editor-mention'
	| 'editor-more'
	| 'editor-note'
	| 'editor-number-list'
	| 'editor-open'
	| 'editor-outdent'
	| 'editor-panel'
	| 'editor-photo'
	| 'editor-quote'
	| 'editor-recent'
	| 'editor-redo'
	| 'editor-remove'
	| 'editor-remove-emoji'
	| 'editor-search'
	| 'editor-settings'
	| 'editor-strikethrough'
	| 'editor-success'
	| 'editor-table'
	| 'editor-table-display-options'
	| 'editor-task'
	| 'editor-text-color'
	| 'editor-text-style'
	| 'editor-underline'
	| 'editor-undo'
	| 'editor-unlink'
	| 'editor-warning'
	| 'email'
	| 'emoji'
	| 'emoji-add'
	| 'emoji-activity'
	| 'emoji-atlassian'
	| 'emoji-custom'
	| 'emoji-emoji'
	| 'emoji-flags'
	| 'emoji-food'
	| 'emoji-frequent'
	| 'emoji-keyboard'
	| 'emoji-nature'
	| 'emoji-objects'
	| 'emoji-people'
	| 'emoji-productivity'
	| 'emoji-symbols'
	| 'emoji-travel'
	| 'error'
	| 'export'
	| 'feedback'
	| 'file'
	| 'filter'
	| 'flag-filled'
	| 'folder'
	| 'folder-filled'
	| 'followers'
	| 'following'
	| 'googledrive'
	| 'graph-bar'
	| 'graph-line'
	| 'gsuite'
	| 'highlights'
	| 'hipchat-audio-only'
	| 'hipchat-chevron-double-down'
	| 'hipchat-chevron-double-up'
	| 'hipchat-chevron-down'
	| 'hipchat-chevron-up'
	| 'hipchat-dial-out'
	| 'hipchat-lobby'
	| 'hipchat-media-attachment-count'
	| 'hipchat-outgoing-sound'
	| 'hipchat-sd-video'
	| 'home'
	| 'home-circle'
	| 'image'
	| 'image-border'
	| 'image-resize'
	| 'info'
	| 'invite-team'
	| 'issue'
	| 'issue-raise'
	| 'issues'
	| 'jira-capture'
	| 'jira-failed-build-status'
	| 'jira-labs'
	| 'jira-test-session'
	| 'label'
	| 'lightbulb'
	| 'lightbulb-filled'
	| 'like'
	| 'link'
	| 'link-filled'
	| 'list'
	| 'location'
	| 'lock'
	| 'lock-circle'
	| 'lock-filled'
	| 'marketplace'
	| 'media-services-actual-size'
	| 'media-services-add-comment'
	| 'media-services-annotate'
	| 'media-services-arrow'
	| 'media-services-audio'
	| 'media-services-blur'
	| 'media-services-brush'
	| 'media-services-button-option'
	| 'media-services-code'
	| 'media-services-document'
	| 'media-services-filter'
	| 'media-services-fit-to-page'
	| 'media-services-full-screen'
	| 'media-services-grid'
	| 'media-services-image'
	| 'media-services-line'
	| 'media-services-line-thickness'
	| 'media-services-no-image'
	| 'media-services-open-mediaviewer'
	| 'media-services-oval'
	| 'media-services-pdf'
	| 'media-services-preselected'
	| 'media-services-presentation'
	| 'media-services-rectangle'
	| 'media-services-scale-large'
	| 'media-services-scale-small'
	| 'media-services-spreadsheet'
	| 'media-services-text'
	| 'media-services-unknown'
	| 'media-services-video'
	| 'media-services-zip'
	| 'media-services-zoom-in'
	| 'media-services-zoom-out'
	| 'mention'
	| 'menu'
	| 'menu-expand'
	| 'mobile'
	| 'more'
	| 'more-vertical'
	| 'notification'
	| 'notification-all'
	| 'notification-direct'
	| 'office-building'
	| 'office-building-filled'
	| 'open'
	| 'overview'
	| 'page'
	| 'page-filled'
	| 'pdf'
	| 'people'
	| 'people-group'
	| 'person'
	| 'person-circle'
	| 'person-with-circle'
	| 'person-with-cross'
	| 'person-with-tick'
	| 'portfolio'
	| 'preferences'
	| 'premium'
	| 'presence-active'
	| 'presence-busy'
	| 'presence-unavailable'
	| 'question'
	| 'question-circle'
	| 'questions'
	| 'queues'
	| 'quote'
	| 'radio'
	| 'recent'
	| 'redo'
	| 'refresh'
	| 'retry'
	| 'roadmap'
	| 'room-menu'
	| 'schedule'
	| 'schedule-filled'
	| 'screen'
	| 'search'
	| 'select-clear'
	| 'send'
	| 'settings'
	| 'share'
	| 'ship'
	| 'shortcut'
	| 'sign-in'
	| 'sign-out'
	| 'sprint'
	| 'star'
	| 'star-filled'
	| 'star-large'
	| 'status'
	| 'stopwatch'
	| 'subtask'
	| 'suitcase'
	| 'switcher'
	| 'table'
	| 'task'
	| 'teams'
	| 'trash'
	| 'tray'
	| 'undo'
	| 'unlink'
	| 'unlock'
	| 'unlock-circle'
	| 'unlock-filled'
	| 'upload'
	| 'user-avatar-circle'
	| 'vid-audio-muted'
	| 'vid-audio-on'
	| 'vid-backward'
	| 'vid-camera-off'
	| 'vid-camera-on'
	| 'vid-connection-circle'
	| 'vid-forward'
	| 'vid-full-screen-off'
	| 'vid-full-screen-on'
	| 'vid-hang-up'
	| 'vid-hd-circle'
	| 'vid-pause'
	| 'vid-play'
	| 'vid-raised-hand'
	| 'vid-share-screen'
	| 'vid-speaking-circle'
	| 'vid-volume-full'
	| 'vid-volume-half'
	| 'vid-volume-muted'
	| 'video-circle'
	| 'video-filled'
	| 'warning'
	| 'watch'
	| 'watch-filled'
	| 'world'
	| 'world-small';
type IconType = Icon;


export type ButtonProps = Pick<
	PlatformButtonProps,
	| 'children'
	| 'autoFocus'
	| 'isDisabled'
	| 'isSelected'
	| 'onBlur'
	| 'onClick'
	| 'onFocus'
	| 'testId'
	| 'shouldFitContainer'
	| 'appearance'
	| 'type'
> & {
	iconBefore?: IconType;
	iconAfter?: IconType;
	spacing?: PlatformButtonProps['spacing'] | 'none';
};

/**
 * A button triggers an event or action. They let users know what will happen next.
 *
 * @see [Button](https://developer.atlassian.com/platform/forge/ui-kit/components/button/) in UI Kit documentation for more information
 */
export type TButton<T> = (props: ButtonProps) => T;