import Button from '@mui/material/Button';
import { styled } from '@mui/material/styles';
import Dialog from '@mui/material/Dialog';
import DialogTitle from '@mui/material/DialogTitle';
import DialogContent from '@mui/material/DialogContent';
import DialogActions from '@mui/material/DialogActions';
import IconButton from '@mui/material/IconButton';
import CloseIcon from '@mui/icons-material/Close';
import { useTranslation } from 'react-i18next';
import PropTypes from 'prop-types';

const BootstrapDialog = styled(Dialog)(({ theme }) => ({
  '& .MuiDialogContent-root': {
    padding: theme.spacing(2),
  },
  '& .MuiDialogActions-root': {
    padding: theme.spacing(1),
  },
}));

function BootstrapDialogTitle(props) {
  const { children, onClose, id } = props;

  return (
    <DialogTitle sx={{ m: 0, p: 2 }} id={id}>
      {children}
      {onClose ? (
        <IconButton
          aria-label="close"
          onClick={onClose}
          sx={{
            position: 'absolute',
            right: 8,
            top: 8,
            color: (theme) => theme.palette.grey[500],
          }}
        >
          <CloseIcon />
        </IconButton>
      ) : null}
    </DialogTitle>
  );
}

export const CustomDialog = (props) => {
  const { t } = useTranslation(['customDialog']);

  const {
    title,
    children,
    closeDialog,
    onSubmit,
    cancelButtonText = t('customDialog.buttonClose'),
    submitButtonText = t('customDialog.buttonConfirm'),
    cancelButtonVariant = 'error',
    submitButtonVariant = 'primary',
  } = props;

  return (
    <BootstrapDialog
      onClose={closeDialog}
      aria-labelledby="customized-dialog-title"
      open
    >
      <BootstrapDialogTitle id="customized-dialog-title" onClose={closeDialog}>
        {title}
      </BootstrapDialogTitle>
      <DialogContent dividers>
        {children}
      </DialogContent>
      <DialogActions>
        <Button
          onClick={closeDialog}
          color={cancelButtonVariant}
        >
          {cancelButtonText}
        </Button>
        <Button
          autoFocus
          onClick={onSubmit}
          color={submitButtonVariant}
        >
          {submitButtonText}
        </Button>
      </DialogActions>
    </BootstrapDialog>
  );
};

CustomDialog.propTypes = {
  title: PropTypes.string,
  children: PropTypes.string,
  closeDialog: PropTypes.func,
  onSubmit: PropTypes.func,
  cancelButtonText: PropTypes.string,
  submitButtonText: PropTypes.string,
  cancelButtonVariant: PropTypes.string,
  submitButtonVariant: PropTypes.string,

};
PropTypes.checkPropTypes();
