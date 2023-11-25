export const emailValidation = (email) => {
    var pattern = /^[\w\.-]+@[a-zA-Z\d\.-]+\.[a-zA-Z]{2,}$/ ;
    if (!pattern.test(email)) return  "Please enter a valid email address.";
}

export const passwordValidation = (password) => {
    if (password.length > 15) return "Password is too lengthy";
    else if (password.length < 8) return "Password is too short";
    let regex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@.#$!%*?&])[A-Za-z\d@.#$!^%*?&]{8,15}$/; 
    if (!regex.test(password)) return  "Your password must contain min 8 Characters, with at least a special character and numbers."
    
}

export const stausLabel = (data) => {
    if(data === "processing") return "bg-yellow-400";
    if(data === "approved") return "bg-green-400";
    if(data === "declined") return "bg-red-400";
}

export const transformToDate = (input) => {
    if(input) return String(input).split("T")[0];
}