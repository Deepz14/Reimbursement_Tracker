import Swal from 'sweetalert2'
import { toast } from 'react-toastify';

export const successToast =  toast.success("Success Notification !", { position: toast.POSITION.TOP_LEFT});

export const errorToast = toast.error("Error Notification !", { position: toast.POSITION.TOP_LEFT});

export const warnToast = toast.warn("Warning Notification !", { position: toast.POSITION.TOP_LEFT});

export const infoToast = toast.info("Info Notification !", { position: toast.POSITION.TOP_LEFT});


export const showSuccessPrompt = (message) => {
    Swal.fire({
        icon: "success",
        title: message,
        showConfirmButton: false,
        timer: 1500
      });
}

export const showConfirmationPrompt = () => {
    return Swal.fire({
        title: "Do you want to update the record?",
        showCancelButton: true,
        confirmButtonText: "Confirm",
        denyButtonText: `Cancel`
    })
}

export const showErrorPrompt = (message) => {
    Swal.fire({
        icon: "error",
        title: message,
        showConfirmButton: true,
    });
}

export const showWarningPrompt = (message) => {
    Swal.fire({
        icon: "warning",
        title: message,
        showConfirmButton: true,
    });
}

export const showInfoPrompt = (message) => {
    Swal.fire({
        icon: "info",
        title: message,
        showConfirmButton: false,
    });
}



