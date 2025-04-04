import React, { Component } from 'react';
// eslint-disable-next-line @atlaskit/ui-styling-standard/use-compiled -- Ignored via go/DSP-18766
import styled from 'styled-components';
import Navigation, { AkNavigationItem } from '@atlaskit/navigation';
import ChevronDownIcon from '@atlaskit/icon/utility/chevron-down';
import ChevronRightIcon from '@atlaskit/icon/utility/chevron-right';
import Spinner from '@atlaskit/spinner';
import Button from '@atlaskit/button/new';
import { token } from '@atlaskit/tokens';
import Tree, {
	mutateTree,
	type RenderItemParams,
	type TreeItem,
	type TreeData,
	type ItemId,
	type Path,
} from '../src';
import { range } from '../src/utils/handy';

// eslint-disable-next-line @atlaskit/ui-styling-standard/no-styled -- To migrate as part of go/ui-styling-standard
const Container = styled.div({
	display: 'flex',
});

// eslint-disable-next-line @atlaskit/ui-styling-standard/no-styled -- To migrate as part of go/ui-styling-standard
const Dot = styled.span({
	display: 'flex',
	width: '24px',
	height: '32px',
	justifyContent: 'center',
	fontSize: '12px',
	lineHeight: '32px',
});

// eslint-disable-next-line @atlaskit/ui-styling-standard/no-styled -- To migrate as part of go/ui-styling-standard
const SpinnerContainer = styled.span({
	display: 'flex',
	width: '24px',
	height: '32px',
	justifyContent: 'center',
	fontSize: '12px',
	lineHeight: '32px',
	paddingTop: token('space.100', '8px'),
});

type State = {
	tree: TreeData;
};

const addRandomChildren = (tree: TreeData, itemId: ItemId, path: Path, n: number): TreeData => {
	const newChildrenHash: Record<string, TreeItem> = {};
	range(n)
		.map(() => {
			return {
				id: Math.random(),
				children: [],
				hasChildren: true,
				isExpanded: false,
				isChildrenLoading: false,
				data: { title: `Title ${path.length}` },
			};
		})
		.forEach((c) => {
			newChildrenHash[c.id] = c;
		});
	const newChildren = [...tree.items[itemId].children, ...Object.keys(newChildrenHash)];
	const newTree = {
		rootId: tree.rootId,
		items: {
			...tree.items,
			...newChildrenHash,
		},
	};
	return mutateTree(newTree, itemId, { children: newChildren });
};

const starterTree = {
	rootId: '1',
	items: {
		'1': {
			id: '1',
			children: [],
			hasChildren: true,
			isExpanded: true,
			isChildrenLoading: false,
			data: {},
		},
	},
};

export default class InfiniteTree extends Component<void, State> {
	state = {
		tree: addRandomChildren(starterTree, starterTree.rootId, [], 20),
	};

	static getIcon(
		item: TreeItem,
		onExpand: (item: ItemId) => void,
		onCollapse: (item: ItemId) => void,
	) {
		if (item.isChildrenLoading) {
			return (
				<SpinnerContainer onClick={() => onCollapse(item.id)}>
					<Spinner size={16} />
				</SpinnerContainer>
			);
		}
		if (item.hasChildren) {
			return item.isExpanded ? (
				<Button appearance="subtle" onClick={() => onCollapse(item.id)}>
					<ChevronDownIcon color="currentColor" label="" />
				</Button>
			) : (
				<Button appearance="subtle" onClick={() => onExpand(item.id)}>
					<ChevronRightIcon color="currentColor" label="" />
				</Button>
			);
		}
		return <Dot>&bull;</Dot>;
	}

	renderItem = ({ item, onExpand, onCollapse, provided }: RenderItemParams) => {
		return (
			<div ref={provided.innerRef} {...provided.draggableProps}>
				<AkNavigationItem
					text={item.data ? item.data.title : ''}
					icon={InfiniteTree.getIcon(item, onExpand, onCollapse)}
					dnd={{ dragHandleProps: provided.dragHandleProps }}
				/>
			</div>
		);
	};

	onExpand = (itemId: ItemId, path: Path) => {
		const { tree }: State = this.state;
		const newTree = mutateTree(tree, itemId, { isExpanded: true });
		const newerTree = addRandomChildren(newTree, itemId, path, 20);
		this.setState({
			tree: newerTree,
		});
	};

	onCollapse = (itemId: ItemId) => {
		const { tree }: State = this.state;
		this.setState({
			tree: mutateTree(tree, itemId, {
				isExpanded: false,
				isChildrenLoading: false,
			}),
		});
	};

	render() {
		const { tree } = this.state;

		return (
			<Container>
				<Navigation>
					<Tree
						tree={tree}
						renderItem={this.renderItem}
						onExpand={this.onExpand}
						onCollapse={this.onCollapse}
					/>
				</Navigation>
			</Container>
		);
	}
}
