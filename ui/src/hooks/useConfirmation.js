import React from 'react';
import { useDialog } from '../providers/DialogManagerProvider/useDialog';
import { CustomDialog } from '../components/CustomDialog';

export const useConfirmation = () => {
  const { openDialog } = useDialog();

  return (args) => {
    const {
      title,
      text,
      confirmButtonText,
      confirmButtonVariant,
      confirmButtonAction,
      cancelButtonText,
      cancelButtonVariant,
      cancelButtonAction,
      confirmButtonTextVariant,
      cancelButtonTextVariant,
    } = args;

    openDialog(({ closeDialog }) => {
      const onSubmit = async () => {
        if (confirmButtonAction) {
          await confirmButtonAction();
        }
        closeDialog();
      };
      const onClose = async () => {
        if (cancelButtonAction) {
          await cancelButtonAction();
        }
        closeDialog();
      };

      const props = {
        title,
        cancelButtonVariant,
        cancelButtonText,
        cancelButtonTextVariant,
        submitButtonVariant: confirmButtonVariant,
        submitButtonTextVariant: confirmButtonTextVariant,
        submitButtonText: confirmButtonText,
        children: React.createElement('div', null, text),
        onSubmit,
        closeDialog: onClose,
      };
      return React.createElement(CustomDialog, props);
    });
  };
};
