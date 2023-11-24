import { toast } from 'react-toastify';

export const successToast =  toast.success("Success Notification !", { position: toast.POSITION.TOP_LEFT});

export const errorToast = toast.error("Error Notification !", { position: toast.POSITION.TOP_LEFT});

export const warnToast = toast.warn("Warning Notification !", { position: toast.POSITION.TOP_LEFT});

export const infoToast = toast.info("Info Notification !", { position: toast.POSITION.TOP_LEFT});



