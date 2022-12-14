import React, { FC, useRef, ChangeEventHandler } from 'react';

import AkButton from '@atlaskit/button/custom-theme-button';

export interface Props {
  label: string;
  ariaDescribedBy?: string;
  onChange?: ChangeEventHandler<any>;
  onClick?: () => void;
  accept?: string;
  isDisabled?: boolean;
}

export const chooseFileButtonTestId = 'choose-file-button';
export const fileUploadInputTestId = 'file-upload';

const FileChooser: FC<Props> = (props) => {
  const { accept, ariaDescribedBy, isDisabled, label, onChange, onClick } =
    props;
  const filePickerRef = useRef<HTMLInputElement>(null);

  const handleOnChooseFile = () => {
    if (!filePickerRef.current) {
      return;
    }

    if (onClick) {
      onClick();
    }
    filePickerRef.current.click();
  };

  return (
    <span>
      <AkButton
        onClick={handleOnChooseFile}
        isDisabled={isDisabled}
        aria-describedby={ariaDescribedBy}
        testId={chooseFileButtonTestId}
      >
        {label}
      </AkButton>
      <input
        className="emojiUploadFileInput"
        ref={filePickerRef}
        onChange={onChange}
        type="file"
        accept={accept}
        style={{ display: 'none' }}
        data-testid={fileUploadInputTestId}
      />
    </span>
  );
};

export default FileChooser;
