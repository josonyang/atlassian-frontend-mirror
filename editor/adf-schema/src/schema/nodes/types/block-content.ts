import { ExpandDefinition as Expand } from '../expand';
import { BodiedExtensionDefinition as BodiedExtension } from '../bodied-extension';
import { PanelDefinition as Panel } from '../panel';
import {
  ParagraphDefinition as Paragraph,
  ParagraphWithMarksDefinition as ParagraphWithMarks,
} from '../paragraph';
import { BlockQuoteDefinition as Blockquote } from '../blockquote';
import { OrderedListDefinition as OrderedList } from '../types/list';
import { BulletListDefinition as BulletList } from '../types/list';
import { RuleDefinition as Rule } from '../rule';
import {
  HeadingDefinition as Heading,
  HeadingWithMarksDefinition as HeadingWithMarks,
} from '../heading';
import { CodeBlockDefinition as CodeBlock } from '../code-block';
import { MediaGroupDefinition as MediaGroup } from '../media-group';
import { MediaSingleDefinition as MediaSingle } from '../media-single';
import { DecisionListDefinition as DecisionList } from '../decision-list';
import { TaskListDefinition as TaskList } from '../task-list';
import { TableDefinition as Table } from '../tableNodes';
import { ExtensionDefinition as Extension } from '../extension';
import { BlockCardDefinition as BlockCard } from '../block-card';
import { EmbedCardDefinition as EmbedCard } from '../embed-card';

// NOTE: BlockContent is only being used by layoutColumn now.

/**
 * @name block_content
 */
export type BlockContent =
  | Panel
  | Paragraph
  | ParagraphWithMarks
  | Blockquote
  | OrderedList
  | BulletList
  | Rule
  | Heading
  | HeadingWithMarks
  | CodeBlock
  | MediaGroup
  | MediaSingle
  | DecisionList
  | TaskList
  | Table
  | Expand
  | Extension
  | BodiedExtension
  | BlockCard
  | EmbedCard;
