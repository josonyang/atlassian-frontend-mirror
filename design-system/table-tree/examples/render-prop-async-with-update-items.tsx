import React, { Component } from 'react';

import SectionMessage from '@atlaskit/section-message';
import TableTree, {
	Cell,
	Header,
	Headers,
	Row,
	Rows,
	TableTreeDataHelper,
} from '@atlaskit/table-tree';

let uuid = 0;

const ROOTS = [
	{
		title: 'Chapter 1: Clean code',
		id: ++uuid,
		page: 1,
		numbering: '1',
		hasChildren: true,
	},
	{
		title: 'Chapter 2: Meaningful names',
		id: ++uuid,
		page: 17,
		numbering: '2',
	},
	{
		title: 'Chapter 3: Functions',
		id: ++uuid,
		page: 17,
		numbering: '3',
		hasChildren: true,
	},
	{
		title: 'Chapter 4: Comments',
		id: ++uuid,
		page: 53,
		numbering: '4',
		children: [],
	},
	{
		title: 'Chapter 5: Formatting',
		id: ++uuid,
		page: 75,
		numbering: '5',
		children: [],
	},
];

function getChildren() {
	return [
		{
			title: 'There will be code',
			id: ++uuid,
			page: 2,
			numbering: '1.1',
			hasChildren: true,
		},
		{
			title: 'Bad code',
			id: ++uuid,
			page: 3,
			numbering: '1.2',
		},
		{
			title: 'The cost of owning a mess',
			id: ++uuid,
			page: 4,
			numbering: '1.3',
			hasChildren: true,
		},
	];
}

function fetchRoots() {
	return Promise.resolve(ROOTS);
}

function fetchChildrenOf() {
	return Promise.resolve(getChildren());
}

function getData(parentItem?: any) {
	return !parentItem ? fetchRoots() : fetchChildrenOf();
}

const tableTreeHelper = new TableTreeDataHelper({ key: 'id' });

// eslint-disable-next-line import/no-anonymous-default-export
export default class extends Component {
	state = {
		items: [],
	};

	componentDidMount() {
		this.loadTableData();
	}

	loadTableData = (parentItem?: any) => {
		if (parentItem && parentItem.childIds) {
			return;
		}

		getData(parentItem).then((items) => {
			this.setState({
				items: tableTreeHelper.updateItems(items, this.state.items, parentItem),
			});
		});
	};

	render() {
		const { items } = this.state;
		return (
			<div>
				<SectionMessage appearance="discovery">
					<p>
						This examples uses{' '}
						<b>
							<i>updateItems</i>
						</b>{' '}
						method. There are two methods in TableTreeDataHelper class, <b>appendItems</b> and{' '}
						<b>updateItems</b>.
					</p>
					<p>
						Use <i>appendItems</i> when you want the new items to be appended to the items.
					</p>
					<p>
						Use <i>updateItems</i> when you want the new items to replace the existing items.
					</p>
					<p>
						If there are no items present the <i>appendItems</i> adds them to the list working just
						like <i>updateItems</i> just for this case.
					</p>
				</SectionMessage>
				<TableTree>
					<Headers>
						<Header width={300}>Chapter title</Header>
						<Header width={120}>Numbering</Header>
						<Header width={100}>Page</Header>
					</Headers>
					<Rows
						items={items}
						render={({ title, numbering, page, hasChildren, children }) => (
							<Row
								expandLabel="Expand"
								collapseLabel="Collapse"
								itemId={numbering}
								onExpand={this.loadTableData}
								items={children}
								hasChildren={hasChildren}
							>
								<Cell singleLine>{title}</Cell>
								<Cell singleLine>{numbering}</Cell>
								<Cell singleLine>{page}</Cell>
							</Row>
						)}
					/>
				</TableTree>
			</div>
		);
	}
}
