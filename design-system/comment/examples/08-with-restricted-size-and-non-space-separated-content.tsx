import React from 'react';

import Comment, { CommentAuthor } from '../src';

import avatarImg from './images/avatar_400x400.jpg';

const getNonSpacedSampleText = () =>
  'Cookiemacaroonliquorice.Marshmallowdonutlemondropscandycanesmarshmallowtoppingchocolatecake.Croissantpastrysouffléwafflecakefruitcake.Brownieoatcakesugarplum.';

export default () => (
  <div style={{ width: 500 }}>
    <Comment
      author={<CommentAuthor>John Smith</CommentAuthor>}
      avatar={<img src={avatarImg} alt="" height="40" width="40" />}
      content={<p>{getNonSpacedSampleText()}</p>}
    />
  </div>
);
