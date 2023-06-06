import { BitbucketTransformer } from '../..';
import { uuid } from '@atlaskit/adf-schema';
import { bitbucketSchema as schema } from '@atlaskit/adf-schema/schema-bitbucket';
import {
  a,
  blockquote,
  code_block,
  doc,
  h1,
  h2,
  h3,
  h4,
  h5,
  h6,
  hr,
  li,
  emoji,
  mention,
  code,
  ol,
  p,
  ul,
  table,
  tr,
  th,
  td,
  strong,
  em,
  strike,
  mediaSingle,
  media,
  inlineCard,
} from '@atlaskit/editor-test-helpers/doc-builder';
import type { Node as PMNode } from 'prosemirror-model';
import { Mark } from 'prosemirror-model';

const transformer = new BitbucketTransformer(schema);
const parse = (html: string) => transformer.parse(html);
const TABLE_LOCAL_ID = 'test-table-local-id';

export const textWithMarks = (obj: PMNode, text: string, marks: Mark[]) => {
  let matched = false;
  obj.descendants((node) => {
    if (node.isText && node.text === text) {
      if (Mark.sameSet(node.marks, marks)) {
        matched = true;
      }
    }
  });

  return matched;
};

// Based on https://bitbucket.org/tutorials/markdowndemo
describe('BitbucketTransformer: parser', () => {
  beforeAll(() => {
    uuid.setStatic(TABLE_LOCAL_ID);
  });

  afterAll(() => {
    uuid.setStatic(false);
  });

  describe('block elements', () => {
    it('should support level 1 to 6 headings', () => {
      expect(parse('<h1>text</h1>')).toEqualDocument(doc(h1('text')));
      expect(parse('<h2>text</h2>')).toEqualDocument(doc(h2('text')));
      expect(parse('<h3>text</h3>')).toEqualDocument(doc(h3('text')));
      expect(parse('<h4>text</h4>')).toEqualDocument(doc(h4('text')));
      expect(parse('<h5>text</h5>')).toEqualDocument(doc(h5('text')));
      expect(parse('<h6>text</h6>')).toEqualDocument(doc(h6('text')));
    });

    it('should support paragraphs', () => {
      expect(parse('<p>text</p>')).toEqualDocument(doc(p('text')));
    });

    it('should remove all zero-with-non-joiners', () => {
      expect(
        parse('<p>foo</p><p>&zwnj;</p><p>&zwnj;</p><p>bar</p>'),
      ).toEqualDocument(doc(p('foo'), p(''), p(''), p('bar')));
    });

    it('should support horizontal rules', () => {
      expect(parse('<hr>')).toEqualDocument(doc(hr()));
    });
  });

  describe('images', () => {
    it('should support images', () => {
      const parsed = parse(
        '<p><img alt="Alt text" src="http://path/to/image.jpg"></p>',
      );

      expect(parsed).toEqualDocument(
        doc(
          mediaSingle()(
            media({
              url: 'http://path/to/image.jpg',
              type: 'external',
              alt: 'Alt text',
            })(),
          ),
        ),
      );
    });

    it('should parse images inside links generated by bitbucket', () => {
      const parsed = parse(
        '<p><a href="https://example.com"><img alt="Alt text" src="http://path/to/image.jpg"></a></p>',
      );

      expect(parsed).toEqualDocument(
        doc(
          mediaSingle()(
            media({
              url: 'http://path/to/image.jpg',
              type: 'external',
              alt: 'Alt text',
            })(),
          ),
        ),
      );
    });

    it('should parse smart links', () => {
      const parsed = parse(
        `<p><a data-inline-card="" href="https://hello.atlassian.net/wiki/spaces/WPT/pages/442895750/Forge">https://hello.atlassian.net/wiki/spaces/WPT/pages/442895750/Forge</a></p>`,
      );
      expect(parsed).toEqualDocument(
        doc(
          p(
            inlineCard({
              url: 'https://hello.atlassian.net/wiki/spaces/WPT/pages/442895750/Forge',
            })(),
          ),
        ),
      );
    });

    it('should parse images inside external links', () => {
      const parsed = parse(
        '<p><a href="https://example.com" data-is-external-link="true">' +
          'Great idea see: <img alt="Alt text" src="http://path/to/image.jpg">' +
          '</a></p>',
      );

      expect(parsed).toEqualDocument(
        doc(
          p(a({ href: 'https://example.com' })('Great idea see:')),
          mediaSingle()(
            media({
              url: 'http://path/to/image.jpg',
              type: 'external',
              alt: 'Alt text',
            })(),
          ),
        ),
      );
    });

    it('should support images in lists', () => {
      const parsed = parse(`
        <ul>
          <li>
            Hello
            <img src="http://path/to/image.jpg" alt="Alt text" />
            World
          </li>
        </ul>
      `);

      expect(parsed).toEqualDocument(
        doc(
          ul(
            li(
              p('Hello'),
              mediaSingle()(
                media({
                  url: 'http://path/to/image.jpg',
                  type: 'external',
                  alt: 'Alt text',
                })(),
              ),
              p(' World'),
            ),
          ),
        ),
      );
    });

    it('shoud split paragraphs with images', () => {
      const parsed = parse(`
        <p>Hello <img src="http://path/to/image.jpg"> World</p>
      `);

      expect(parsed).toEqualDocument(
        doc(
          p('Hello'),
          mediaSingle()(
            media({
              url: 'http://path/to/image.jpg',
              type: 'external',
            })(),
          ),
          p('World'),
        ),
      );
    });

    it('should split blockquotes with images', () => {
      const parsed = parse(`
        <blockquote>
          <p>Hello</p>
          <p><img src="http://path/to/image.jpg"></p>
          <p>World</p>
        </blockquote>
      `);

      const parsed2 = parse(`
        <blockquote>
          <p>Hello</p>
          <p>Look <img src="http://path/to/image.jpg"> Here</p>
          <p>World</p>
        </blockquote>
      `);

      expect(parsed).toEqualDocument(
        doc(
          blockquote(p('Hello')),
          mediaSingle()(
            media({
              url: 'http://path/to/image.jpg',
              type: 'external',
            })(),
          ),
          blockquote(p('World')),
        ),
      );

      expect(parsed2).toEqualDocument(
        doc(
          blockquote(p('Hello'), p('Look')),
          mediaSingle()(
            media({
              url: 'http://path/to/image.jpg',
              type: 'external',
            })(),
          ),
          blockquote(p('Here'), p('World')),
        ),
      );
    });
  });

  describe('inline elements', () => {
    it('should support emphasis', () => {
      const em = schema.marks.em.create();
      expect(textWithMarks(parse('<p><em>text</em></p>'), 'text', [em])).toBe(
        true,
      );
    });

    it('should support strong', () => {
      const strong = schema.marks.strong.create();
      expect(
        textWithMarks(parse('<p><strong>text</strong></p>'), 'text', [strong]),
      ).toBe(true);
    });

    it('should support strikethrough', () => {
      const strike = schema.marks.strike.create();
      expect(
        textWithMarks(parse('<p><strike>text</strike></p>'), 'text', [strike]),
      ).toBe(true);
    });

    it('should support code', () => {
      const code = schema.marks.code.create();
      expect(
        textWithMarks(
          parse('<p><span style="font-family: monospace;">text</span></p>'),
          'text',
          [code],
        ),
      ).toBe(true);
    });

    it('should support links', () => {
      const link = schema.marks.link.create({ href: 'http://example.com' });
      expect(
        textWithMarks(
          parse(
            '<p><a href="http://example.com" data-is-external-link="true">example link</a></p>',
          ),
          'example link',
          [link],
        ),
      ).toBe(true);
    });

    it('should support both strong and em', () => {
      const em = schema.marks.em.create();
      const strong = schema.marks.strong.create();
      expect(
        textWithMarks(parse('<p><strong><em>text</em></strong></p>'), 'text', [
          em,
          strong,
        ]),
      ).toBe(true);
    });
  });

  describe('blockquotes', () => {
    it('should be parsed', () => {
      expect(parse('<blockquote><p>text</p></blockquote>')).toEqualDocument(
        doc(blockquote(p('text'))),
      );
    });
  });

  describe('lists', () => {
    it('that are unordered should be parsed', () => {
      expect(
        parse('<ul>' + '<li>foo</li>' + '<li>bar</li>' + '</ul>'),
      ).toEqualDocument(doc(ul(li(p('foo')), li(p('bar')))));
    });

    it('that are ordered should be parsed', () => {
      expect(
        parse('<ol>' + '<li>foo</li>' + '<li>bar</li>' + '</ol>'),
      ).toEqualDocument(doc(ol()(li(p('foo')), li(p('bar')))));
    });

    describe('custom start numbers (restartNumberedLists)', () => {
      it('that are ordered starting from 99 should be parsed (start from 99)', () => {
        expect(
          parse('<ol start="99">' + '<li>foo</li>' + '<li>bar</li>' + '</ol>'),
        ).toEqualDocument(doc(ol({ order: 99 })(li(p('foo')), li(p('bar')))));
      });

      it('that are ordered starting from 0 should be parsed (start from 0)', () => {
        expect(
          parse('<ol start="0">' + '<li>foo</li>' + '<li>bar</li>' + '</ol>'),
        ).toEqualDocument(doc(ol({ order: 0 })(li(p('foo')), li(p('bar')))));
      });

      it('that are ordered starting from 1 should be parsed (start from 1)', () => {
        expect(
          parse('<ol start="1">' + '<li>foo</li>' + '<li>bar</li>' + '</ol>'),
        ).toEqualDocument(doc(ol({ order: 1 })(li(p('foo')), li(p('bar')))));
      });

      it('that are ordered starting from -2 should be parsed (start from 1)', () => {
        expect(
          parse('<ol start="-2">' + '<li>foo</li>' + '<li>bar</li>' + '</ol>'),
        ).toEqualDocument(doc(ol({ order: 1 })(li(p('foo')), li(p('bar')))));
      });

      it('that are ordered starting from 2.9 should be parsed (round down to 2)', () => {
        expect(
          parse('<ol start="2.9">' + '<li>foo</li>' + '<li>bar</li>' + '</ol>'),
        ).toEqualDocument(doc(ol({ order: 2 })(li(p('foo')), li(p('bar')))));
      });
    });

    it('that are nested and homogeneous should be parsed', () => {
      expect(
        parse(
          '<ol>' +
            '<li>foo</li>' +
            '<li>bar' +
            '<ol>' +
            '<li>baz</li>' +
            '</ol>' +
            '</li>' +
            '</ol>',
        ),
      ).toEqualDocument(
        doc(ol()(li(p('foo')), li(p('bar'), ol()(li(p('baz')))))),
      );

      expect(
        parse(
          '<ul>' +
            '<li>foo</li>' +
            '<li>bar' +
            '<ul>' +
            '<li>baz</li>' +
            '</ul>' +
            '</li>' +
            '</ul>',
        ),
      ).toEqualDocument(doc(ul(li(p('foo')), li(p('bar'), ul(li(p('baz')))))));
    });

    it('that are nested and heterogeneous should be parsed', () => {
      expect(
        parse(
          '<ul>' +
            '<li>foo</li>' +
            '<li>bar' +
            '<ol>' +
            '<li>baz</li>' +
            '</ol>' +
            '</li>' +
            '</ul>',
        ),
      ).toEqualDocument(
        doc(ul(li(p('foo')), li(p('bar'), ol()(li(p('baz')))))),
      );
    });

    it('with multiple paragraphs should be parsed', () => {
      expect(
        parse(
          '<ul>' +
            '<li>' +
            '<p>foo</p>' +
            '<p>bar</p>' +
            '<ol>' +
            '<li>nested foo</li>' +
            '</ol>' +
            '<p>baz</p>' +
            '</li>' +
            '</ul>',
        ),
      ).toEqualDocument(
        doc(ul(li(p('foo'), p('bar'), ol()(li(p('nested foo'))), p('baz')))),
      );
    });
  });

  describe('tables', () => {
    it('with header, multiple rows and columns should be converted into table', () => {
      expect(
        parse(
          '<table>' +
            '<thead>' +
            '<tr>' +
            '<th>First Header</th>' +
            '<th>Second Header</th>' +
            '<th>Third Header</th>' +
            '</tr>' +
            '</thead>' +
            '<tbody>' +
            '<tr>' +
            '<td>Content Cell</td>' +
            '<td>Content Cell</td>' +
            '<td>Content Cell</td>' +
            '</tr>' +
            '<tr>' +
            '<td>Content Cell</td>' +
            '<td>Content Cell</td>' +
            '<td>Content Cell</td>' +
            '</tr>' +
            '</tbody>' +
            '</table>',
        ),
      ).toEqualDocument(
        doc(
          table({ localId: TABLE_LOCAL_ID })(
            tr(
              th({})(p('First Header')),
              th({})(p('Second Header')),
              th({})(p('Third Header')),
            ),
            tr(
              td({})(p('Content Cell')),
              td({})(p('Content Cell')),
              td({})(p('Content Cell')),
            ),
            tr(
              td({})(p('Content Cell')),
              td({})(p('Content Cell')),
              td({})(p('Content Cell')),
            ),
          ),
        ),
      );
    });

    it('with a single column should be converted into table', () => {
      const result = parse(
        '<table>' +
          '<thead>' +
          '<tr>' +
          '<th>First Header</th>' +
          '</tr>' +
          '</thead>' +
          '<tbody>' +
          '<tr>' +
          '<td>Content Cell</td>' +
          '</tr>' +
          '<tr>' +
          '<td>Content Cell</td>' +
          '</tr>' +
          '</tbody>' +
          '</table>',
      );

      expect(result).toEqualDocument(
        doc(
          table({ localId: TABLE_LOCAL_ID })(
            tr(th({})(p('First Header'))),
            tr(td({})(p('Content Cell'))),
            tr(td({})(p('Content Cell'))),
          ),
        ),
      );
    });

    it('with a empty cells', () => {
      const result = parse(
        '<table>' +
          '<thead>' +
          '<tr>' +
          '<th></th>' +
          '</tr>' +
          '</thead>' +
          '<tbody>' +
          '<tr>' +
          '<td></td>' +
          '</tr>' +
          '<tr>' +
          '<td></td>' +
          '</tr>' +
          '</tbody>' +
          '</table>',
      );

      expect(result).toEqualDocument(
        doc(
          table({ localId: TABLE_LOCAL_ID })(
            tr(th({})(p())),
            tr(td({})(p())),
            tr(td({})(p())),
          ),
        ),
      );
    });

    it('with inline styling', () => {
      const result = parse(
        '<table>' +
          '<thead>' +
          '<tr>' +
          '<th><strong>testing</strong></th>' +
          '</tr>' +
          '</thead>' +
          '<tbody>' +
          '<tr>' +
          '<td><em>testing</em></td>' +
          '</tr>' +
          '<tr>' +
          '<td><strike>testing</strike></td>' +
          '</tr>' +
          '</tbody>' +
          '</table>',
      );

      expect(result).toEqualDocument(
        doc(
          table({ localId: TABLE_LOCAL_ID })(
            tr(th({})(p(strong('testing')))),
            tr(td({})(p(em('testing')))),
            tr(td({})(p(strike('testing')))),
          ),
        ),
      );
    });

    it('with images ', () => {
      const result = parse(
        '<table>' +
          '<thead>' +
          '<tr>' +
          '<th>Hello there <img src="http://path/to/image.jpg" /> <strong>hi</strong></th>' +
          '</tr>' +
          '</thead>' +
          '<tbody>' +
          '<tr>' +
          '<td><em><img src="http://path/to/image.jpg" /></em></td>' +
          '</tr>' +
          '</tbody>' +
          '</table>',
      );

      expect(result).toEqualDocument(
        doc(
          table({ localId: TABLE_LOCAL_ID })(
            tr(
              th({})(
                p('Hello there'),
                mediaSingle()(
                  media({
                    url: 'http://path/to/image.jpg',
                    type: 'external',
                  })(),
                ),
                p(strong('hi')),
              ),
            ),
            tr(
              td({})(
                mediaSingle()(
                  media({
                    url: 'http://path/to/image.jpg',
                    type: 'external',
                  })(),
                ),
              ),
            ),
          ),
        ),
      );
    });
  });

  describe('code', () => {
    it('inline should be parsed', () => {
      expect(
        parse('foo <span style="font-family: monospace;">bar </span>baz'),
      ).toEqualDocument(doc(p('foo ', code('bar '), 'baz')));
    });
  });

  describe('code block', () => {
    it('parses block with specified language', () => {
      const js = code_block({ language: 'javascript' });

      expect(
        parse(
          '<p>foo</p>' +
            '<div class="codehilite language-javascript"><pre><span></span>    bar\n       baz</pre></div>',
        ),
      ).toEqualDocument(doc(p('foo'), js('    bar\n       baz')));
    });
  });

  describe('mentions', () => {
    ['mention', 'ap-mention'].forEach((mentionClass) => {
      it(`should be parsed preserving display name and user id for ${mentionClass}`, () => {
        expect(
          parse(
            '<p>' +
              'foo ' +
              `<a href="/abodera/" rel="nofollow" title="@abodera" class="${mentionClass} mention-me">Artur Bodera</a>` +
              ' bar' +
              '</p>',
          ),
        ).toEqualDocument(
          doc(
            p(
              'foo ',
              mention({
                text: '@Artur Bodera',
                id: 'abodera',
              })(),
              ' bar',
            ),
          ),
        );
      });
    });

    ['mention', 'ap-mention'].forEach((mentionClass) => {
      it(`should prefer Atlassian ID over username if present, for ${mentionClass}`, () => {
        expect(
          parse(
            '<p>' +
              'foo ' +
              `<a href="/abodera/" rel="nofollow" title="@abodera" class="${mentionClass} mention-me" data-atlassian-id="5c09bf77ec71bd223bbe866f">Artur Bodera</a>` +
              ' bar' +
              '</p>',
          ),
        ).toEqualDocument(
          doc(
            p(
              'foo ',
              mention({
                text: '@Artur Bodera',
                id: '{5c09bf77ec71bd223bbe866f}',
              })(),
              ' bar',
            ),
          ),
        );
      });
    });

    it('should keep Bitbucket mention span tags', () => {
      expect(
        parse(
          '<p>' +
            'hi ' +
            '<span class="ap-mention" data-atlassian-id="5c09bf77ec71bd223bbe866f">@Scott Demo</span>' +
            ' test' +
            '</p>',
        ),
      ).toEqualDocument(
        doc(
          p(
            'hi ',
            mention({
              text: '@Scott Demo',
              id: '{5c09bf77ec71bd223bbe866f}',
            })(),
            ' test',
          ),
        ),
      );
    });
  });

  describe('emojis', () => {
    it('should be parsed from data attribute on the img', () => {
      expect(
        parse(
          '<p>' +
            'foo ' +
            '<img ' +
            'data-emoji-short-name=":diamond_shape_with_a_dot_inside:"' +
            'src="https://pf-emoji-service--cdn.useast.atlassian.io/standard/551c9814-1d37-4573-819d-afab3afeaf32/32x32/1f4a0.png"' +
            'alt="diamond shape with a dot inside" ' +
            'title="diamond shape with a dot inside" ' +
            'class="emoji"' +
            '>' +
            ' bar' +
            '</p>',
        ),
      ).toEqualDocument(
        doc(
          p(
            'foo ',
            emoji({ shortName: ':diamond_shape_with_a_dot_inside:' })(),
            ' bar',
          ),
        ),
      );
    });

    it('should fallback to parsing from img src if data attribute not present', () => {
      expect(
        parse(
          '<p>' +
            'foo ' +
            '<img ' +
            'src="https://d301sr5gafysq2.cloudfront.net/207268dc597d/emoji/img/diamond_shape_with_a_dot_inside.svg" ' +
            'alt="diamond shape with a dot inside" ' +
            'title="diamond shape with a dot inside" ' +
            'class="emoji"' +
            '>' +
            ' bar' +
            '</p>',
        ),
      ).toEqualDocument(
        doc(
          p(
            'foo ',
            emoji({ shortName: ':diamond_shape_with_a_dot_inside:' })(),
            ' bar',
          ),
        ),
      );
    });
  });

  describe('links', () => {
    it('created manually by the user should be recreated', () => {
      const link = a({
        href: 'http://www.atlassian.com',
      });

      // The following HTML is rendered from an absolute link in markdown:
      //   [Atlassian](http://www.atlassian.com)
      expect(
        parse(
          '<p>' +
            'foo ' +
            '<a href="http://www.atlassian.com" data-is-external-link="true">Atlassian</a>' +
            ' baz' +
            '</p>',
        ),
      ).toEqualDocument(doc(p('foo ', link('Atlassian'), ' baz')));
    });

    it('with title, created manually, should be preserved', () => {
      const link = a({
        href: 'http://www.atlassian.com',
        title: 'bar',
      });

      // The following HTML is rendered from an absolute link in markdown:
      //   [Atlassian](http://www.atlassian.com)
      expect(
        parse(
          '<p>' +
            'foo ' +
            '<a href="http://www.atlassian.com" title="bar" data-is-external-link="true">Atlassian</a>' +
            ' baz' +
            '</p>',
        ),
      ).toEqualDocument(doc(p('foo ', link('Atlassian'), ' baz')));
    });

    it('created automatically by bitbucket should be removed', () => {
      expect(
        parse(
          '<p>' +
            'foo ' +
            '<a href="http://www.atlassian.com">#1234</a>' +
            ' baz' +
            '</p>',
        ),
      ).toEqualDocument(doc(p('foo #1234 baz')));
    });

    it('created manually by bitbucket should not be removed if disableBitbucketLinkStripping is true', () => {
      const transformer = new BitbucketTransformer(schema, {
        disableBitbucketLinkStripping: true,
      });

      expect(
        transformer.parse(
          '<p>' +
            'foo ' +
            '<a href="http://www.atlassian.com">#1234</a>' +
            ' baz' +
            '</p>',
        ),
      ).toEqualDocument(
        doc(
          p('foo ', a({ href: 'http://www.atlassian.com' })('#1234'), ' baz'),
        ),
      );
    });
  });
});
