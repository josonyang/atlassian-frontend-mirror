import React from 'react';

import { render } from '@testing-library/react';
import { EditorView } from 'prosemirror-view';

import { DatasourceModalType } from '@atlaskit/editor-common/types';

import ModalWithState from '../DatasourceModal/ModalWithState';

const getMockAPI: any = (
  datasourceModalType?: DatasourceModalType,
  showDatasourceModal?: boolean,
) => ({
  dependencies: {
    card: {
      sharedState: {
        getSharedState: () => {},
        currentState: () => ({ datasourceModalType, showDatasourceModal }),
        onChange: () => {},
      },
    },
  },
});

const mockEditorView = {
  state: {},
  dispatch: jest.fn(),
} as unknown as EditorView;

describe('ModalWithState', () => {
  const modalTypes: DatasourceModalType[] = ['jira', 'assets'];

  it.each(modalTypes)(
    'should render DatasourceModal when datasourceModalType is defined',
    modalType => {
      const { getByTestId } = render(
        <ModalWithState
          editorView={mockEditorView}
          api={getMockAPI(modalType, true)}
        />,
      );

      const modal = getByTestId(`${modalType}-config-modal`);
      expect(modal).toBeInTheDocument();
    },
  );

  it('should not render DatasourceModal when datasourceModalType is undefined', () => {
    const { container } = render(
      <ModalWithState editorView={mockEditorView} api={getMockAPI()} />,
    );

    expect(container).toMatchInlineSnapshot(`<div />`);
  });
});
