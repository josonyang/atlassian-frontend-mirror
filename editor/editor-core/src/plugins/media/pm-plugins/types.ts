import type { RichMediaLayout as MediaSingleLayout } from '@atlaskit/adf-schema';
import type { Dispatch } from '@atlaskit/editor-common/event-dispatcher';
import type {
  ContextIdentifierProvider,
  MediaProvider,
} from '@atlaskit/editor-common/provider-factory';
import type { Node as PMNode } from '@atlaskit/editor-prosemirror/model';
import type { EditorView } from '@atlaskit/editor-prosemirror/view';
import type { MediaClientConfig } from '@atlaskit/media-core';

import type { MediaPluginOptions } from '../media-plugin-options';
import type { MediaStateEventSubscriber } from '../picker-facade';
import type PickerFacade from '../picker-facade';
import type {
  MediaOptions,
  MediaState,
  ProsemirrorGetPosHandler,
} from '../types';

export interface MediaNodeWithPosHandler {
  node: PMNode;
  getPos: ProsemirrorGetPosHandler;
}

export interface MediaPluginState {
  allowsUploads: boolean;
  mediaClientConfig?: MediaClientConfig;
  uploadMediaClientConfig?: MediaClientConfig;
  ignoreLinks: boolean;
  waitForMediaUpload: boolean;
  allUploadsFinished: boolean;
  showDropzone: boolean;
  isFullscreen: boolean;
  element?: HTMLElement;
  layout: MediaSingleLayout;
  mediaNodes: MediaNodeWithPosHandler[];
  options: MediaPluginOptions;
  mediaProvider?: MediaProvider;
  pickers: PickerFacade[];
  pickerPromises: Array<Promise<PickerFacade>>;
  editingMediaSinglePos?: number;
  showEditingDialog?: boolean;
  mediaOptions?: MediaOptions;
  isResizing: boolean;
  resizingWidth: number;
  currentMaxWidth?: number;
  dispatch?: Dispatch;
  onContextIdentifierProvider: (
    _name: string,
    provider?: Promise<ContextIdentifierProvider>,
  ) => Promise<void>;
  setMediaProvider: (mediaProvider?: Promise<MediaProvider>) => Promise<void>;
  getMediaOptions: () => MediaPluginOptions;
  insertFile: (
    mediaState: MediaState,
    onMediaStateChanged: MediaStateEventSubscriber,
    pickerType?: string,
  ) => void;
  addPendingTask: (promise: Promise<any>) => void;
  splitMediaGroup: () => boolean;
  onPopupPickerClose: () => void;
  showMediaPicker: () => void;
  setBrowseFn: (browseFn: () => void) => void;
  onPopupToggle: (onPopupToogleCallback: (isOpen: boolean) => void) => void;
  waitForPendingTasks: (
    timeout?: number,
    lastTask?: Promise<MediaState | null>,
  ) => Promise<MediaState | null>;
  handleMediaNodeRemoval: (
    node: PMNode | undefined,
    getPos: ProsemirrorGetPosHandler,
  ) => void;
  handleMediaNodeMount: (
    node: PMNode,
    getPos: ProsemirrorGetPosHandler,
  ) => void;
  handleMediaNodeUnmount: (oldNode: PMNode) => void;
  handleMediaGroupUpdate: (oldNodes: PMNode[], newNodes: PMNode[]) => void;
  findMediaNode: (id: string) => MediaNodeWithPosHandler | null;
  updateMediaSingleNodeAttrs: (
    id: string,
    attrs: object,
  ) => undefined | boolean;
  removeSelectedMediaContainer: () => boolean;
  selectedMediaContainerNode: () => PMNode | undefined;
  handleDrag: (dragState: 'enter' | 'leave') => void;

  updateElement(): void;
  setIsResizing(isResizing: boolean): void;
  setResizingWidth(width: number): void;

  setView(view: EditorView): void;

  destroy(): void;

  updateAndDispatch(
    props: Partial<
      Pick<this, 'allowsUploads' | 'allUploadsFinished' | 'isFullscreen'>
    >,
  ): void;
}
