import Swal from 'sweetalert2'

export const showSuccessPrompt = (message) => {
    Swal.fire({
        icon: "success",
        title: message,
        showConfirmButton: false,
        html: `
            <a style="color: blue; text-decoration: underline;" href="${process.env.REACT_APP_HR_ACCOUNT_CREATION_REDIRECTION}/auth">
            Click here</a>
            to login into the application
        `
      });
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