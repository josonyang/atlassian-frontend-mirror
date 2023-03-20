/** @jsx jsx */
import { createRef, PureComponent } from 'react';
import { jsx } from '@emotion/react';
import { VirtualItem as VirtualItemContext } from '@tanstack/react-virtual';
import {
  customCategory,
  defaultEmojiPickerSize,
  userCustomTitle,
} from '../../util/constants';
import {
  EmojiDescription,
  EmojiDescriptionWithVariations,
  EmojiId,
  Message,
  OnCategory,
  OnEmojiEvent,
  OnToneSelected,
  OnToneSelectorCancelled,
  PickerSize,
  ToneSelection,
  User,
} from '../../types';
import {
  CategoryDescriptionMap,
  CategoryGroupKey,
  CategoryId,
} from './categories';
import CategoryTracker from './CategoryTracker';
import { sizes } from './EmojiPickerSizes';
import * as Items from './EmojiPickerVirtualItems';
import {
  CategoryHeadingItem,
  EmojisRowItem,
  LoadingItem,
  VirtualItem,
  virtualItemRenderer,
} from './EmojiPickerVirtualItems';
import EmojiActions from '../common/EmojiActions';
import { OnUploadEmoji } from '../common/EmojiUploadPicker';
import { OnDeleteEmoji } from '../common/EmojiDeletePreview';
import { emojiPickerList } from './styles';
import { emojiPickerHeightOffset } from './utils';
import { Props as CategoryHeadingProps } from './EmojiPickerCategoryHeading';
import { Props as EmojiRowProps } from './EmojiPickerEmojiRow';
import { ListRef, VirtualList } from './VirtualList';

/**
 * Test id for wrapper Emoji Picker List div
 */
export const RENDER_EMOJI_PICKER_LIST_TESTID = 'render-emoji-picker-list';

const categoryClassname = 'emoji-category';

type CategoryKeyToGroup = { [key in CategoryGroupKey]: EmojiGroup };

export interface OnSearch {
  (query: string): void;
}

export interface Props {
  emojis: EmojiDescription[];
  currentUser?: User;
  onEmojiSelected?: OnEmojiEvent;
  onEmojiActive?: OnEmojiEvent;
  onEmojiDelete?: OnEmojiEvent;
  onCategoryActivated?: OnCategory;
  selectedTone?: ToneSelection;
  onSearch?: OnSearch;
  loading?: boolean;
  query?: string;
  initialUploadName?: string;
  onToneSelected?: OnToneSelected;
  onToneSelectorCancelled?: OnToneSelectorCancelled;
  toneEmoji?: EmojiDescriptionWithVariations;
  uploading: boolean;
  emojiToDelete?: EmojiDescription;
  uploadErrorMessage?: Message;
  uploadEnabled: boolean;
  onUploadEmoji: OnUploadEmoji;
  onUploadCancelled: () => void;
  onDeleteEmoji: OnDeleteEmoji;
  onCloseDelete: () => void;
  onFileChooserClicked?: () => void;
  onOpenUpload: () => void;
  size?: PickerSize;
  activeCategoryId?: CategoryId | null;
}

export interface State {}

/**
 * Emoji grouped by a category title ie. Frequent, Your Uploads, All Uploads
 */
interface EmojiGroup {
  emojis: EmojiDescription[];
  title: string;
  category: CategoryGroupKey;
  order: number;
}

type Orderable = {
  order?: number;
};

const byOrder = (orderableA: Orderable, orderableB: Orderable) =>
  (orderableA.order || 0) - (orderableB.order || 0);

export default class EmojiPickerVirtualList extends PureComponent<
  Props,
  State
> {
  static defaultProps = {
    onEmojiSelected: () => {},
    onEmojiActive: () => {},
    onEmojiDelete: () => {},
    onCategoryActivated: () => {},
    onSearch: () => {},
    size: defaultEmojiPickerSize,
  };

  private allEmojiGroups!: EmojiGroup[];
  private virtualItems: VirtualItem<
    CategoryHeadingProps | EmojiRowProps | {}
  >[] = [];
  private categoryTracker: CategoryTracker = new CategoryTracker();

  private listRef = createRef<ListRef>();

  constructor(props: Props) {
    super(props);

    this.buildEmojiGroupedByCategory(props.emojis, props.currentUser);
    this.buildVirtualItems(props, this.state);
  }

  UNSAFE_componentWillUpdate(nextProps: Props, nextState: State) {
    if (
      this.props.emojis !== nextProps.emojis ||
      this.props.selectedTone !== nextProps.selectedTone ||
      this.props.loading !== nextProps.loading ||
      this.props.query !== nextProps.query
    ) {
      if (!nextProps.query) {
        // Only refresh if no query
        this.buildEmojiGroupedByCategory(
          nextProps.emojis,
          nextProps.currentUser,
        );
      }
      this.buildVirtualItems(nextProps, nextState);
    }
  }

  private onEmojiMouseEnter = (emojiId: EmojiId, emoji?: EmojiDescription) => {
    if (this.props.onEmojiActive) {
      this.props.onEmojiActive(emojiId, emoji);
    }
  };

  private onSearch = (value: string) => {
    if (this.props.onSearch) {
      this.props.onSearch(value);
    }
  };

  /**
   * Scrolls to a category in the list view
   */
  reveal(category: CategoryId) {
    const row = this.categoryTracker.getRow(category);
    this.scrollToRow(row);
  }

  scrollToBottom() {
    this.scrollToRow(this.virtualItems.length);
  }

  scrollToTop() {
    this.scrollToRow(0);
  }

  scrollToRow(index?: number) {
    this.listRef.current?.scrollToRow(index);
  }

  private buildVirtualItemFromGroup = (
    group: EmojiGroup,
  ): VirtualItem<CategoryHeadingProps | EmojiRowProps | {}>[] => {
    const { onEmojiSelected, onEmojiDelete } = this.props;
    const items: VirtualItem<CategoryHeadingProps | EmojiRowProps>[] = [];

    items.push(
      new CategoryHeadingItem({
        id: group.category,
        title: group.title,
        className: categoryClassname,
      }),
    );

    let remainingEmojis = group.emojis;
    while (remainingEmojis.length > 0) {
      const rowEmojis = remainingEmojis.slice(0, sizes.emojiPerRow);
      remainingEmojis = remainingEmojis.slice(sizes.emojiPerRow);

      items.push(
        new EmojisRowItem({
          emojis: rowEmojis,
          title: group.title,
          showDelete: group.title === userCustomTitle,
          onSelected: onEmojiSelected,
          onDelete: onEmojiDelete,
          onMouseMove: this.onEmojiMouseEnter,
        }),
      );
    }

    return items;
  };

  private buildVirtualItems = (props: Props, _state: State): void => {
    const { emojis, loading, query } = props;

    let items: Items.VirtualItem<CategoryHeadingProps | EmojiRowProps | {}>[] =
      [];

    this.categoryTracker.reset();

    if (loading) {
      items.push(new LoadingItem());
    } else {
      if (query) {
        const search = CategoryDescriptionMap.SEARCH;
        // Only a single "result" category
        items = [
          ...items,
          ...this.buildVirtualItemFromGroup({
            category: 'SEARCH',
            title: search.name,
            emojis,
            order: search.order,
          }),
        ];
      } else {
        // Group by category

        // Not searching show in categories.
        this.allEmojiGroups.forEach((group) => {
          // Optimisation - avoid re-rendering unaffected groups for the current selectedShortcut
          // by not passing it to irrelevant groups
          this.categoryTracker.add(
            group.emojis[0].category as CategoryId,
            items.length,
          );

          items = [...items, ...this.buildVirtualItemFromGroup(group)];
        });
      }
    }

    this.virtualItems = items;
  };

  private addToCategoryMap = (
    categoryToGroupMap: CategoryKeyToGroup,
    emoji: EmojiDescription,
    category: CategoryGroupKey,
  ): CategoryKeyToGroup => {
    if (!categoryToGroupMap[category]) {
      const categoryDefinition = CategoryDescriptionMap[category];
      categoryToGroupMap[category] = {
        emojis: [],
        title: categoryDefinition.name,
        category,
        order: categoryDefinition.order,
      };
    }
    categoryToGroupMap[category].emojis.push(emoji);
    return categoryToGroupMap;
  };

  private groupByCategory =
    (currentUser?: User) =>
    (
      categoryToGroupMap: CategoryKeyToGroup,
      emoji: EmojiDescription,
    ): CategoryKeyToGroup => {
      this.addToCategoryMap(
        categoryToGroupMap,
        emoji,
        emoji.category as CategoryId,
      );
      // separate user emojis
      if (
        emoji.category === customCategory &&
        currentUser &&
        emoji.creatorUserId === currentUser.id
      ) {
        this.addToCategoryMap(categoryToGroupMap, emoji, 'USER_CUSTOM');
      }
      return categoryToGroupMap;
    };

  private buildEmojiGroupedByCategory = (
    emojis: EmojiDescription[],
    currentUser?: User,
  ): void => {
    const categoryToGroupMap = emojis.reduce(
      this.groupByCategory(currentUser),
      {} as CategoryKeyToGroup,
    );

    this.allEmojiGroups = (
      Object.keys(categoryToGroupMap) as CategoryGroupKey[]
    )
      .map((key: CategoryGroupKey) => categoryToGroupMap[key])
      .map((group) => {
        if (group.category !== 'FREQUENT') {
          group.emojis.sort(byOrder);
        }
        return group;
      })
      .sort(byOrder);
  };

  /**
   * Checks if list is showing a new CategoryId
   * to inform selector to change active category
   */
  private checkCategoryIdChange = (indexes: { startIndex: number }) => {
    const { startIndex } = indexes;

    if (!this.props.query) {
      // Calculate category in view - only relevant if categories shown, i.e. no query
      const list = this.listRef.current;
      const currentCategory = this.categoryTracker.findNearestCategoryAbove(
        startIndex,
        list,
      );

      if (currentCategory && this.props.activeCategoryId !== currentCategory) {
        if (this.props.onCategoryActivated) {
          this.props.onCategoryActivated(currentCategory);
        }
      }
    }
  };

  private rowSize = (index: number) =>
    this.virtualItems[index]?.height || sizes.categoryHeadingHeight;

  private renderRow = (context: VirtualItemContext) => {
    return virtualItemRenderer(this.virtualItems, context);
  };

  render() {
    const {
      query,
      selectedTone,
      onToneSelected,
      onToneSelectorCancelled,
      toneEmoji,
      uploading,
      uploadEnabled,
      emojiToDelete,
      initialUploadName,
      uploadErrorMessage,
      onUploadCancelled,
      onUploadEmoji,
      onCloseDelete,
      onDeleteEmoji,
      onFileChooserClicked,
      onOpenUpload,
      size = defaultEmojiPickerSize,
    } = this.props;

    const virtualListHeight = sizes.listHeight + emojiPickerHeightOffset(size);

    return (
      <div
        ref="root"
        css={emojiPickerList}
        data-testid={RENDER_EMOJI_PICKER_LIST_TESTID}
      >
        <EmojiActions
          selectedTone={selectedTone}
          onToneSelected={onToneSelected}
          onToneSelectorCancelled={onToneSelectorCancelled}
          toneEmoji={toneEmoji}
          uploading={uploading}
          uploadEnabled={uploadEnabled}
          emojiToDelete={emojiToDelete}
          initialUploadName={initialUploadName}
          uploadErrorMessage={uploadErrorMessage}
          onUploadCancelled={onUploadCancelled}
          onUploadEmoji={onUploadEmoji}
          onCloseDelete={onCloseDelete}
          onDeleteEmoji={onDeleteEmoji}
          onFileChooserClicked={onFileChooserClicked}
          onOpenUpload={onOpenUpload}
          query={query}
          onChange={this.onSearch}
        />
        <VirtualList
          ref={this.listRef}
          height={virtualListHeight}
          overscanRowCount={10}
          rowCount={this.virtualItems.length}
          rowHeight={this.rowSize}
          rowRenderer={this.renderRow}
          scrollToAlignment="start"
          width={sizes.listWidth}
          onRowsRendered={this.checkCategoryIdChange}
        />
      </div>
    );
  }
}
