import { useState, useCallback } from 'react';

interface UseDialogReturn {
  open: boolean;
  handleOpen: () => void;
  handleClose: () => void;
  toggle: () => void;
}

export function useDialog(initialState: boolean = false): UseDialogReturn {
  const [open, setOpen] = useState(initialState);

  const handleOpen = useCallback(() => {
    setOpen(true);
  }, []);

  const handleClose = useCallback(() => {
    setOpen(false);
  }, []);

  const toggle = useCallback(() => {
    setOpen((prev) => !prev);
  }, []);

  return {
    open,
    handleOpen,
    handleClose,
    toggle,
  };
}

export default useDialog;
