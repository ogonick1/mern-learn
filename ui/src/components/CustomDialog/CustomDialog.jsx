import Button from '@mui/material/Button';
import { styled } from '@mui/material/styles';
import Dialog from '@mui/material/Dialog';
import DialogTitle from '@mui/material/DialogTitle';
import DialogContent from '@mui/material/DialogContent';
import DialogActions from '@mui/material/DialogActions';
import IconButton from '@mui/material/IconButton';
import CloseIcon from '@mui/icons-material/Close';
import Typography from '@mui/material/Typography';
import { useTranslation } from 'react-i18next';

const BootstrapDialog = styled(Dialog)(({ theme }) => ({
  '& .MuiDialogContent-root': {
    padding: theme.spacing(2),
  },
  '& .MuiDialogActions-root': {
    padding: theme.spacing(1),
  },
}));

function BootstrapDialogTitle(props) {
  const { children, onClose, ...other } = props;

  return (
    <DialogTitle sx={{ m: 0, p: 2 }} {...other}>
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
  const { t } = useTranslation(['common']);

  const {
   title,
  //  size,
  //  loading = false,
   children,
   closeDialog,
   onSubmit,
  //  closeButton = true,
   cancelButtonText = t('common:buttons.close'),
   submitButtonText = t('common:buttons.saveChanges'),
   cancelButtonVariant = 'error',
   submitButtonVariant = 'primary',
  //  customFooter,
  //  cancelButtonDisabled = false,
  //  submitButtonDisabled = false,
  //  cancelButtonTextVariant,
  //  submitButtonTextVariant,
  //  bodyClass,
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
