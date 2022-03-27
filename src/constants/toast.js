import { toast } from 'react-toastify';

const TOAST_TIMEOUT = 5000;
const TOAST_TYPES = {
  success: 'success',
  error: 'error',
};

const handleToast = (type, message) =>
  toast.success(message, {
    position: 'top-right',
    autoClose: TOAST_TIMEOUT,
    hideProgressBar: false,
    closeOnClick: true,
    pauseOnHover: false,
    draggable: false,
    // progress: undefined,
  });

export { handleToast, TOAST_TYPES };
