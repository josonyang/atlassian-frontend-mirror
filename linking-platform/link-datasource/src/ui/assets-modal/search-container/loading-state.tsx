/** @jsx jsx */
import { jsx } from '@emotion/react';

import { AssetsAqlSearchInputSkeleton } from './aql-search-input/loading-state';
import { AssetsObjectSchemaSelectSkeleton } from './object-schema-select/loading-state';
import {
  FormContainer,
  FormRowContainer,
  SchemaSelectContainer,
} from './styled';

type AssetsSearchConatinerLoadingProps = {
  // This is due to ModalTitle needing a ModalDialog so should be passed down
  modalTitle?: JSX.Element;
};

export const AssetsSearchContainerLoading = ({
  modalTitle,
}: AssetsSearchConatinerLoadingProps) => {
  return (
    <FormContainer data-testid="assets-datasource-modal--search-container-skeleton">
      <FormRowContainer isNarrowGap>
        {modalTitle}
        <SchemaSelectContainer>
          <AssetsObjectSchemaSelectSkeleton />
        </SchemaSelectContainer>
      </FormRowContainer>
      <FormRowContainer>
        <AssetsAqlSearchInputSkeleton />
      </FormRowContainer>
    </FormContainer>
  );
};