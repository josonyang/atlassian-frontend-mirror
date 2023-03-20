import { name } from '../../../version-wrapper';
import { render, screen } from '@testing-library/react';
import { renderWithIntl } from '@atlaskit/editor-test-helpers/rtl';
import React from 'react';
import Editor from '../../../editor-next/editor-migration-component';
import EditorNext from '../../../editor-next';
import EditorOld from '../../../editor';
import CollapsedEditor from '../../../ui/CollapsedEditor';
import { IntlProvider } from 'react-intl-next';

const featureFlagOptions = [{ useEditorNext: true }, { useEditorNext: false }];

describe.each(featureFlagOptions)(name, (flags) => {
  describe('CollapsedEditor', () => {
    it('should load even if IntlProvider is not provided', () => {
      const { container } = render(
        <CollapsedEditor isExpanded={false}>
          <Editor featureFlags={flags} />
        </CollapsedEditor>,
      );

      const editorElement = container.getElementsByClassName('akEditor');
      expect(editorElement.length).toBe(0);
      expect(screen.queryByTestId('chrome-collapsed')).not.toBeNull();
    });

    it('should not render the editor when isExpanded is false', () => {
      const { container } = renderWithIntl(
        <CollapsedEditor isExpanded={false}>
          <Editor featureFlags={flags} />
        </CollapsedEditor>,
      );

      const editorElement = container.getElementsByClassName('akEditor');
      expect(editorElement.length).toBe(0);
      expect(screen.queryByTestId('chrome-collapsed')).not.toBeNull();
    });

    it('should render the editor when isExpanded is true', () => {
      const { container } = renderWithIntl(
        <CollapsedEditor isExpanded={true}>
          <Editor featureFlags={flags} />
        </CollapsedEditor>,
      );
      const editorElement = container.getElementsByClassName('akEditor');
      expect(editorElement.length).toBe(1);
      expect(screen.queryByTestId('chrome-collapsed')).toBeNull();
    });

    it('should call onFocus when collapsed editor is clicked', () => {
      const onFocus = jest.fn();
      renderWithIntl(
        <CollapsedEditor onFocus={onFocus}>
          <Editor featureFlags={flags} />
        </CollapsedEditor>,
      );
      screen.getByRole('textbox').focus();
      expect(onFocus).toHaveBeenCalledTimes(1);
    });

    it('should not call onExpand when the editor is initially expanded', () => {
      const onExpand = jest.fn();
      renderWithIntl(
        <CollapsedEditor isExpanded={true} onExpand={onExpand}>
          <Editor featureFlags={flags} />
        </CollapsedEditor>,
      );
      expect(onExpand).toHaveBeenCalledTimes(0);
    });

    it('should call onExpand after the editor is expanded and mounted', () => {
      const onExpand = jest.fn();
      const { rerender } = render(
        <IntlProvider locale="en">
          <CollapsedEditor isExpanded={false} onExpand={onExpand}>
            <Editor featureFlags={flags} />
          </CollapsedEditor>
        </IntlProvider>,
      );
      rerender(
        <IntlProvider locale="en">
          <CollapsedEditor isExpanded={true} onExpand={onExpand}>
            <Editor featureFlags={flags} />
          </CollapsedEditor>
        </IntlProvider>,
      );
      expect(onExpand).toHaveBeenCalledTimes(1);
    });

    it('should allow setting a ref on the editor component', () => {
      let editorRef = {};
      const setRef = (ref: Editor) => {
        editorRef = ref;
      };
      renderWithIntl(
        <CollapsedEditor isExpanded={true}>
          <Editor ref={setRef} featureFlags={flags} />
        </CollapsedEditor>,
      );
      expect(editorRef instanceof Editor).toBe(true);
    });
  });
});

// Test that the components called by the editor also pass ref tests
describe('CollapsedEditor with individual components', () => {
  it('should allow setting a ref on the editor component', () => {
    let editorRef = {};
    const setRef = (ref: EditorOld) => {
      editorRef = ref;
    };
    renderWithIntl(
      <CollapsedEditor isExpanded={true}>
        <EditorOld ref={setRef} />
      </CollapsedEditor>,
    );
    expect(editorRef instanceof EditorOld).toBe(true);
  });

  it('should allow setting a ref on the editor component', () => {
    let editorRef = {};
    const setRef = (ref: EditorNext) => {
      editorRef = ref;
    };
    renderWithIntl(
      <CollapsedEditor isExpanded={true}>
        <EditorNext ref={setRef} />
      </CollapsedEditor>,
    );
    expect(editorRef instanceof EditorNext).toBe(true);
  });
});
