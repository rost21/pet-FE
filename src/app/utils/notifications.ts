import { toast } from 'react-toastify';

type Type = 'info' | 'success' | 'warning' | 'error' | 'default';

export const showNotification = (message: string, type: Type) =>
  toast(message, {
    type: type,
    position: 'bottom-center',
    autoClose: 3000,
    hideProgressBar: true,
    closeOnClick: true
  });
