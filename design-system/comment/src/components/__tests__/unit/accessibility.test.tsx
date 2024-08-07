import React from 'react';

import { render } from '@testing-library/react';

import { axe } from '@af/accessibility-testing';
import Avatar from '@atlaskit/avatar';
import Link from '@atlaskit/link';

import avatarImg from '../../../../examples/images/avatar_400x400.jpg';
import CommentAction from '../../../../src/components/action-item';
import CommentAuthor from '../../../../src/components/author';
import CommentEdited from '../../../../src/components/edited';
import CommentTime from '../../../../src/components/time';
import Comment from '../../comment';
import Footer from '../../footer';
import Header from '../../header';

const actions = [
	<CommentAction>Reply</CommentAction>,
	<CommentAction>Edit</CommentAction>,
	<CommentAction>Like</CommentAction>,
];

it('Basic Comment should not fail aXe audit', async () => {
	const { container } = render(
		<Comment
			avatar={<Avatar src={avatarImg} name="John Smith" size="medium" />}
			author={<CommentAuthor>John Smith</CommentAuthor>}
			type="author"
			edited={<CommentEdited>Edited</CommentEdited>}
			restrictedTo="Restricted to Admins Only"
			time={<CommentTime>30 August, 2023</CommentTime>}
			content={
				<p>
					Content goes here. This can include <Link href="/link">links</Link> and other content.
				</p>
			}
			actions={actions}
		/>,
	);
	await axe(container);
});

it('Basic Header should not fail aXe audit', async () => {
	const { container } = render(
		<Header
			author={<CommentAuthor>John Smith</CommentAuthor>}
			type="author"
			edited={<CommentEdited>Edited</CommentEdited>}
			restrictedTo="Restricted to Admins Only"
			time={<CommentTime>30 August, 2023</CommentTime>}
			headingLevel="3"
		/>,
	);
	await axe(container);
});

it('Basic Footer should not fail aXe audit', async () => {
	const { container } = render(<Footer actions={actions} errorIconLabel={''} isSaving={true} />);
	await axe(container);
});
