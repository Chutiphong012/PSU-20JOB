'use client';

import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  IconButton,
} from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
import { DialogProps } from '@/types';

export default function InfoDialog({
  open,
  onClose,
  title,
  children,
}: DialogProps) {
  return (
    <Dialog
      open={open}
      onClose={onClose}
      maxWidth="sm"
      fullWidth
      aria-labelledby="info-dialog-title"
    >
      {title && (
        <DialogTitle id="info-dialog-title" sx={{ pr: 6 }}>
          {title}
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
        </DialogTitle>
      )}
      <DialogContent dividers>{children}</DialogContent>
      <DialogActions sx={{ padding: 2 }}>
        <Button onClick={onClose} variant="contained">
          ปิด
        </Button>
      </DialogActions>
    </Dialog>
  );
}
