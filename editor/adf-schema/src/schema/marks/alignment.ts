import { MarkSpec } from 'prosemirror-model';
import { ALIGNMENT, INDENTATION } from '../groups';

/** TODO: Flip these positions for RTL */
export const alignmentPositionMap: { [key: string]: string } = {
  end: 'right',
  right: 'end',
  center: 'center',
};

export interface AlignmentAttributes {
  align: 'center' | 'end';
}

/**
 * @name alignment_mark
 */
export interface AlignmentMarkDefinition {
  type: 'alignment';
  attrs: AlignmentAttributes;
}

export const alignment: MarkSpec = {
  excludes: `alignment ${INDENTATION}`,
  group: ALIGNMENT,
  attrs: {
    align: {},
  },
  parseDOM: [
    {
      tag: 'div.fabric-editor-block-mark',
      getAttrs: (dom) => {
        const align = (dom as Element).getAttribute('data-align');
        return align ? { align } : false;
      },
    },
  ],
  toDOM(mark) {
    return [
      'div',
      {
        class: `fabric-editor-block-mark fabric-editor-alignment fabric-editor-align-${mark.attrs.align}`,
        'data-align': mark.attrs.align,
      },
      0,
    ];
  },
};
