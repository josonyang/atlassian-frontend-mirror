import { ComponentType } from 'react';
import { Mark } from '@atlaskit/editor-prosemirror/model';
import Code from './code';
import Em from './em';
import Link from './link';
import Strike from './strike';
import Strong from './strong';
import Subsup from './subsup';
import TextColor from './textColor';
import Underline from './underline';
import Breakout from './breakout';
import Alignment from './alignment';
import Indentation from './indentation';
import UnsupportedMark from './unsupportedMark';
import UnsupportedNodeAttribute from './unsupportedNodeAttribute';
import DataConsumer from './data-consumer';
import FragmentMark from './fragment';
import Annotation, { isAnnotationMark } from './annotation';

// Stage0
import ConfluenceInlineComment from './confluence-inline-comment';

export const markToReact: { [key: string]: ComponentType<any> } = {
  code: Code,
  em: Em,
  link: Link,
  strike: Strike,
  strong: Strong,
  subsup: Subsup,
  textColor: TextColor,
  underline: Underline,
  annotation: Annotation,

  // Stage0
  confluenceInlineComment: ConfluenceInlineComment,
  breakout: Breakout,
  alignment: Alignment,
  indentation: Indentation,
  unsupportedMark: UnsupportedMark,
  unsupportedNodeAttribute: UnsupportedNodeAttribute,
  dataConsumer: DataConsumer,
  fragment: FragmentMark,
};

export const toReact = (mark: Mark): ComponentType<any> => {
  return markToReact[mark.type.name];
};

export {
  Code,
  Em,
  Link,
  Strike,
  Strong,
  Subsup,
  TextColor,
  Underline,
  Breakout,
  Annotation,
  UnsupportedMark,
  isAnnotationMark,
  UnsupportedNodeAttribute,
  DataConsumer,
  FragmentMark,
};
