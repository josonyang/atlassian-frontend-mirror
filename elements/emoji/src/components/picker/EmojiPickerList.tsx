import React, {
	createRef,
	PureComponent,
	useCallback,
	useEffect,
	useImperativeHandle,
	useMemo,
	useRef,
	useState,
} from 'react';
import type { VirtualItem as VirtualItemContext } from '@tanstack/react-virtual';
import {
	customCategory,
	defaultEmojiPickerSize,
	frequentCategory,
	searchCategory,
	userCustomTitle,
	yourUploadsCategory,
} from '../../util/constants';
import type {
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
import { CategoryDescriptionMap, type CategoryGroupKey, type CategoryId } from './categories';
import CategoryTracker from './CategoryTracker';
import { sizes } from './EmojiPickerSizes';
import type * as Items from './EmojiPickerVirtualItems';
import {
	CategoryHeadingItem,
	EmojisRowItem,
	LoadingItem,
	type VirtualItem,
	virtualItemRenderer,
} from './EmojiPickerVirtualItems';
import EmojiActions from '../common/EmojiActions';
import type { OnUploadEmoji } from '../common/EmojiUploadPicker';
import type { OnDeleteEmoji } from '../common/EmojiDeletePreview';
import { emojiPickerHeightOffset, scrollToRow } from './utils';
import type { Props as CategoryHeadingProps } from './EmojiPickerCategoryHeading';
import type { Props as EmojiRowProps } from './EmojiPickerEmojiRow';
import { type ListRef, VirtualList } from './VirtualList';
import { EmojiPickerListContextProvider } from '../../context/EmojiPickerListContext';
import EmojiPickerTabPanel from './EmojiPickerTabPanel';

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

export type PickerListRef = {
	reveal: (category: CategoryId) => void;
	scrollToBottom: () => void;
	scrollToTop: () => void;
	scrollToRow: (index?: number) => void;
	scrollToRecentlyUploaded: (uploadedEmoji: EmojiDescription) => void;
};

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

export class EmojiPickerVirtualListInternalOld extends PureComponent<Props, State> {
	static defaultProps = {
		onEmojiSelected: () => {},
		onEmojiActive: () => {},
		onEmojiDelete: () => {},
		onCategoryActivated: () => {},
		onSearch: () => {},
		size: defaultEmojiPickerSize,
	};

	private allEmojiGroups!: EmojiGroup[];
	private virtualItems: VirtualItem<CategoryHeadingProps | EmojiRowProps | {}>[] = [];
	private categoryTracker: CategoryTracker = new CategoryTracker();
	private lastYourUploadsRow: number;

	private listRef = createRef<ListRef>();

	constructor(props: Props) {
		super(props);
		this.lastYourUploadsRow = 0;

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
				this.buildEmojiGroupedByCategory(nextProps.emojis, nextProps.currentUser);
			}
			this.buildVirtualItems(nextProps, nextState);
		}
	}

	private onEmojiActive = (emojiId: EmojiId, emoji?: EmojiDescription) => {
		if (this.props.onEmojiActive) {
			this.props.onEmojiActive(emojiId, emoji);
		}
	};

	private onSearch = (value: string) => {
		if (this.props.onSearch) {
			this.props.onSearch(value);
		}
	};

	private findEmojiRowAndColumnById = (emojiId: string) => {
		let columnIndex = -1;
		// for most of cases, it'd be in first emoji row, so should be quite fast to find in real world
		let rowIndex = this.virtualItems.findIndex((rowItem) => {
			if (rowItem instanceof EmojisRowItem) {
				// find uploaded emoji in each emoji row
				columnIndex = rowItem.props.emojis.findIndex((emoji) => emoji.id === emojiId);
				return columnIndex !== -1;
			}
			return false;
		});
		return {
			rowIndex,
			columnIndex,
		};
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

	scrollToRecentlyUploaded(uploadedEmoji: EmojiDescription) {
		// when search results is shown
		if (this.props.query) {
			const { rowIndex, columnIndex } = this.findEmojiRowAndColumnById(uploadedEmoji.id!);
			if (rowIndex !== -1) {
				this.listRef.current?.scrollToEmojiAndFocus(rowIndex, columnIndex);
			}
		} else {
			// when seeing all emojis
			const row = this.lastYourUploadsRow;
			if (row > 0) {
				this.listRef.current?.scrollToRowAndFocusLastEmoji(this.lastYourUploadsRow);
			}
		}
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
					category: group.category,
					emojis: rowEmojis,
					title: group.title,
					showDelete: group.title === userCustomTitle,
					onSelected: onEmojiSelected,
					onDelete: onEmojiDelete,
					onMouseMove: this.onEmojiActive,
					onFocus: this.onEmojiActive,
				}),
			);
		}

		return items;
	};

	private buildVirtualItems = (props: Props, _state: State): void => {
		const { emojis, loading, query } = props;

		let items: Items.VirtualItem<CategoryHeadingProps | EmojiRowProps | {}>[] = [];

		const prevFirstCategory = this.categoryTracker.getFirstCategory();

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
						category: searchCategory,
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
					this.categoryTracker.add(group.emojis[0].category as CategoryId, items.length);

					items = [...items, ...this.buildVirtualItemFromGroup(group)];

					if (group.category === yourUploadsCategory) {
						this.lastYourUploadsRow = items.length - 1;
					}
				});
			}
		}

		// make sure virtualItems is up-to-date before calling onRowsRendered
		this.virtualItems = items;
		if (!loading && !query) {
			if (this.categoryTracker.getFirstCategory() !== prevFirstCategory) {
				this.onRowsRendered({ startIndex: 0 });
			}
		}
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
		(categoryToGroupMap: CategoryKeyToGroup, emoji: EmojiDescription): CategoryKeyToGroup => {
			this.addToCategoryMap(categoryToGroupMap, emoji, emoji.category as CategoryId);
			// separate user emojis
			if (
				emoji.category === customCategory &&
				currentUser &&
				emoji.creatorUserId === currentUser.id
			) {
				this.addToCategoryMap(categoryToGroupMap, emoji, yourUploadsCategory);
			}
			return categoryToGroupMap;
		};

	private buildEmojiGroupedByCategory = (emojis: EmojiDescription[], currentUser?: User): void => {
		const categoryToGroupMap = emojis.reduce(
			this.groupByCategory(currentUser),
			{} as CategoryKeyToGroup,
		);

		this.allEmojiGroups = (Object.keys(categoryToGroupMap) as CategoryGroupKey[])
			.map((key: CategoryGroupKey) => categoryToGroupMap[key])
			.map((group) => {
				if (group.category !== frequentCategory) {
					group.emojis.sort(byOrder);
				}
				return group;
			})
			.sort(byOrder);
	};

	private findCategoryToActivate = (
		row: VirtualItem<CategoryHeadingProps | EmojiRowProps | {}>,
	) => {
		let category: CategoryGroupKey | null = null;

		if (row instanceof CategoryHeadingItem) {
			category = row.props.id;
		} else if (row instanceof EmojisRowItem) {
			category = row.props.category;
		}

		// your uploads is rendered, take it as upload category, so could be highlighted in category selector
		if (category === yourUploadsCategory) {
			return customCategory;
			// search results is rendered, return null so won't be highlighted for category selector
		} else if (category === searchCategory) {
			return null;
		}
		return category;
	};

	/**
	 * onRowsRendered callback function
	 *
	 * Check the category of top of rendered row and inform category selector to change active category
	 * Rove index of emoji picker list
	 */
	private onRowsRendered = (indexes: { startIndex: number }) => {
		const { startIndex } = indexes;
		const rowItem = this.virtualItems[startIndex];
		const list = this.listRef.current;

		// update tabIndex manually, startIndex is not 0 based here
		if (rowItem instanceof CategoryHeadingItem) {
			// if top of row rendered is category heading, update tabIndex for the next emoji row
			list?.updateFocusIndex(startIndex + 1);
		} else if (rowItem instanceof EmojisRowItem) {
			// if top of row rendered is emoji row, update it's tabIndex.
			list?.updateFocusIndex(startIndex);
		}

		if (!this.props.query) {
			// Calculate category in view - only relevant if categories shown, i.e. no query
			const currentCategory = this.findCategoryToActivate(rowItem);
			if (currentCategory !== null && this.props.activeCategoryId !== currentCategory) {
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

	/**
	 * After deleting emoji, we'll update the focus index to the first emoji of last row of your uploads, so when user navigate back focus will still work
	 * if last emoji in your uploads is deleted, the updated focus index will be outdated, as there will be no your uploads section
	 * however, it'll trigger onChange from VirtualList, which will update focus index automatically for us
	 */
	private handleOnCloseDelete = () => {
		const list = this.listRef.current;
		list?.updateFocusIndex(this.lastYourUploadsRow);
		this.props.onCloseDelete();
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
			onDeleteEmoji,
			onFileChooserClicked,
			onOpenUpload,
			size = defaultEmojiPickerSize,
			emojis,
		} = this.props;

		const virtualListHeight = sizes.listHeight + emojiPickerHeightOffset(size);

		return (
			<EmojiPickerTabPanel showSearchResults={!!query}>
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
					onCloseDelete={this.handleOnCloseDelete}
					onDeleteEmoji={onDeleteEmoji}
					onFileChooserClicked={onFileChooserClicked}
					onOpenUpload={onOpenUpload}
					query={query}
					onChange={this.onSearch}
					resultsCount={emojis.length}
				/>
				<EmojiPickerListContextProvider initialEmojisFocus={{ rowIndex: 1, columnIndex: 0 }}>
					<VirtualList
						ref={this.listRef}
						height={virtualListHeight}
						overscanRowCount={10}
						rowCount={this.virtualItems.length}
						rowHeight={this.rowSize}
						rowRenderer={this.renderRow}
						scrollToAlignment="start"
						width={sizes.listWidth}
						onRowsRendered={this.onRowsRendered}
					/>
				</EmojiPickerListContextProvider>
			</EmojiPickerTabPanel>
		);
	}
}

export const EmojiPickerVirtualListInternalNew = React.forwardRef<PickerListRef, Props>(
	(props, ref) => {
		const {
			emojis,
			currentUser,
			onEmojiSelected = () => {},
			onEmojiActive = () => {},
			onEmojiDelete = () => {},
			onCategoryActivated = () => {},
			onSearch = () => {},
			size = defaultEmojiPickerSize,
			query,
			loading,
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
			onDeleteEmoji,
			onCloseDelete,
			onFileChooserClicked,
			onOpenUpload,
			activeCategoryId,
		} = props;

		const listRef = useRef<ListRef>(null);
		const [allEmojiGroups, setAllEmojiGroups] = useState<EmojiGroup[]>([]);
		const [virtualItems, setVirtualItems] = useState<
			VirtualItem<CategoryHeadingProps | EmojiRowProps | {}>[]
		>([]);
		const [lastYourUploadsRow, setLastYourUploadsRow] = useState(0);
		const categoryTracker = useMemo(() => new CategoryTracker(), []);
		const [categoriesChanged, setCategoriesChanged] = useState(false);

		const groupByCategory = useCallback(
			(currentUser?: User) =>
				(categoryToGroupMap: CategoryKeyToGroup, emoji: EmojiDescription): CategoryKeyToGroup => {
					addToCategoryMap(categoryToGroupMap, emoji, emoji.category as CategoryId);
					// separate user emojis
					if (
						emoji.category === customCategory &&
						currentUser &&
						emoji.creatorUserId === currentUser.id
					) {
						addToCategoryMap(categoryToGroupMap, emoji, yourUploadsCategory);
					}
					return categoryToGroupMap;
				},
			[],
		);

		/**
		 * onRowsRendered callback function
		 *
		 * Check the category of top of rendered row and inform category selector to change active category
		 * Rove index of emoji picker list
		 */
		const onRowsRendered = useCallback(
			(indexes: { startIndex: number }) => {
				const { startIndex } = indexes;
				const rowItem = virtualItems[startIndex];
				const list = listRef.current;

				// update tabIndex manually, startIndex is not 0 based here
				if (rowItem instanceof CategoryHeadingItem) {
					// if top of row rendered is category heading, update tabIndex for the next emoji row
					list?.updateFocusIndex(startIndex + 1);
				} else if (rowItem instanceof EmojisRowItem) {
					// if top of row rendered is emoji row, update it's tabIndex.
					list?.updateFocusIndex(startIndex);
				}

				if (!query) {
					// Calculate category in view - only relevant if categories shown, i.e. no query
					const currentCategory = findCategoryToActivate(rowItem);
					if (currentCategory !== null && activeCategoryId !== currentCategory) {
						if (onCategoryActivated) {
							onCategoryActivated(currentCategory);
						}
					}
				}
			},
			[virtualItems, query, activeCategoryId, onCategoryActivated],
		);

		const buildEmojiGroupedByCategory = useCallback(
			(emojis: EmojiDescription[], currentUser?: User) => {
				const categoryToGroupMap = emojis.reduce(
					groupByCategory(currentUser),
					{} as CategoryKeyToGroup,
				);

				setAllEmojiGroups(
					(Object.keys(categoryToGroupMap) as CategoryGroupKey[])
						.map((key: CategoryGroupKey) => categoryToGroupMap[key])
						.map((group) => {
							if (group.category !== frequentCategory) {
								group.emojis.sort(byOrder);
							}
							return group;
						})
						.sort(byOrder),
				);
			},
			[groupByCategory],
		);

		const addToCategoryMap = (
			categoryToGroupMap: CategoryKeyToGroup,
			emoji: EmojiDescription,
			category: CategoryGroupKey,
		) => {
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

		const buildVirtualItemFromGroup = useCallback(
			(group: EmojiGroup) => {
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
							category: group.category,
							emojis: rowEmojis,
							title: group.title,
							showDelete: group.title === userCustomTitle,
							onSelected: onEmojiSelected,
							onDelete: onEmojiDelete,
							onMouseMove: onEmojiActive,
							onFocus: onEmojiActive,
						}),
					);
				}

				return items;
			},
			[onEmojiSelected, onEmojiDelete, onEmojiActive],
		);

		const buildVirtualItems = useCallback(() => {
			let items: Items.VirtualItem<CategoryHeadingProps | EmojiRowProps | {}>[] = [];

			const prevFirstCategory = categoryTracker.getFirstCategory();

			categoryTracker.reset();

			if (loading) {
				items.push(new LoadingItem());
			} else {
				if (query) {
					const search = CategoryDescriptionMap.SEARCH;
					// Only a single "result" category
					items = [
						...items,
						...buildVirtualItemFromGroup({
							category: searchCategory,
							title: search.name,
							emojis,
							order: search.order,
						}),
					];
				} else {
					// Group by category

					// Not searching show in categories.
					allEmojiGroups.forEach((group) => {
						// Optimisation - avoid re-rendering unaffected groups for the current selectedShortcut
						// by not passing it to irrelevant groups
						categoryTracker.add(group.emojis[0].category as CategoryId, items.length);

						items = [...items, ...buildVirtualItemFromGroup(group)];

						if (group.category === yourUploadsCategory) {
							setLastYourUploadsRow(items.length - 1);
						}
					});
				}
			}

			// make sure virtualItems is up-to-date before calling onRowsRendered
			setVirtualItems(items);
			if (!loading && !query) {
				if (categoryTracker.getFirstCategory() !== prevFirstCategory) {
					setCategoriesChanged(true);
				}
			}
			// eslint-disable-next-line react-hooks/exhaustive-deps
		}, [allEmojiGroups, loading, query, emojis]);

		const findCategoryToActivate = (
			row: VirtualItem<CategoryHeadingProps | EmojiRowProps | {}>,
		) => {
			let category: CategoryGroupKey | null = null;
			if (row instanceof CategoryHeadingItem) {
				category = row.props.id;
			} else if (row instanceof EmojisRowItem) {
				category = row.props.category;
			}
			// your uploads is rendered, take it as upload category, so could be highlighted in category selector
			if (category === yourUploadsCategory) {
				return customCategory;
				// search results is rendered, return null so won't be highlighted for category selector
			} else if (category === searchCategory) {
				return null;
			}
			return category;
		};

		const rowSize = (index: number) => virtualItems[index]?.height || sizes.categoryHeadingHeight;

		const renderRow = (context: VirtualItemContext) => {
			return virtualItemRenderer(virtualItems, context);
		};

		/**
		 * After deleting emoji, we'll update the focus index to the first emoji of last row of your uploads, so when user navigate back focus will still work
		 * if last emoji in your uploads is deleted, the updated focus index will be outdated, as there will be no your uploads section
		 * however, it'll trigger onChange from VirtualList, which will update focus index automatically for us
		 */
		const handleOnCloseDelete = () => {
			const list = listRef.current;
			list?.updateFocusIndex(lastYourUploadsRow);
			onCloseDelete();
		};

		const findEmojiRowAndColumnById = (emojiId: string) => {
			let columnIndex = -1;
			// for most of cases, it'd be in first emoji row, so should be quite fast to find in real world
			let rowIndex = virtualItems.findIndex((rowItem) => {
				if (rowItem instanceof EmojisRowItem) {
					// find uploaded emoji in each emoji row
					columnIndex = rowItem.props.emojis.findIndex((emoji) => emoji.id === emojiId);
					return columnIndex !== -1;
				}
				return false;
			});
			return {
				rowIndex,
				columnIndex,
			};
		};

		/**
		 * Scrolls to a category in the list view
		 */
		useImperativeHandle(ref, () => {
			return {
				reveal(category: CategoryId) {
					const row = categoryTracker.getRow(category);
					scrollToRow(listRef, row);
				},

				scrollToBottom() {
					scrollToRow(listRef, virtualItems.length);
				},

				scrollToTop() {
					scrollToRow(listRef, 0);
				},

				scrollToRow(index?: number) {
					scrollToRow(listRef, index);
				},

				scrollToRecentlyUploaded(uploadedEmoji: EmojiDescription) {
					// when search results is shown
					if (query) {
						const { rowIndex, columnIndex } = findEmojiRowAndColumnById(uploadedEmoji.id!);
						if (rowIndex !== -1) {
							listRef.current?.scrollToEmojiAndFocus(rowIndex, columnIndex);
						}
					} else {
						// when seeing all emojis
						const row = lastYourUploadsRow;
						if (row > 0) {
							listRef.current?.scrollToRowAndFocusLastEmoji(lastYourUploadsRow);
						}
					}
				},
			};
		});

		useEffect(() => {
			if (!query) {
				buildEmojiGroupedByCategory(emojis, currentUser);
			}
		}, [emojis, selectedTone, loading, query, currentUser, buildEmojiGroupedByCategory]);

		useEffect(() => {
			buildVirtualItems();
		}, [allEmojiGroups, buildVirtualItems]);

		useEffect(() => {
			if (categoriesChanged) {
				onRowsRendered({ startIndex: 0 });
			}
			// eslint-disable-next-line react-hooks/exhaustive-deps
		}, [virtualItems, categoriesChanged]);

		const virtualListHeight = useMemo(
			() => sizes.listHeight + emojiPickerHeightOffset(size),
			[size],
		);

		return (
			<EmojiPickerTabPanel showSearchResults={!!query}>
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
					onCloseDelete={handleOnCloseDelete}
					onDeleteEmoji={onDeleteEmoji}
					onFileChooserClicked={onFileChooserClicked}
					onOpenUpload={onOpenUpload}
					query={query}
					onChange={onSearch}
					resultsCount={emojis.length}
				/>
				<EmojiPickerListContextProvider initialEmojisFocus={{ rowIndex: 1, columnIndex: 0 }}>
					<VirtualList
						ref={listRef}
						height={virtualListHeight}
						overscanRowCount={10}
						rowCount={virtualItems.length}
						rowHeight={rowSize}
						rowRenderer={renderRow}
						scrollToAlignment="start"
						width={sizes.listWidth}
						onRowsRendered={onRowsRendered}
					/>
				</EmojiPickerListContextProvider>
			</EmojiPickerTabPanel>
		);
	},
);
